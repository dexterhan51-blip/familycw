import { NextResponse } from "next/server"
import { google } from "googleapis"

// 구글 시트 설정 상수
const SPREADSHEET_ID = "1pDe71kcg1AZHTNheV9EIsb6zxFyInwoV5bf_Q-eLtyM"
const SHEET_GID = 1929186399

// Base64로 인코딩된 서비스 계정 JSON을 디코딩하여 인증 객체 생성
function getGoogleAuth() {
  const decoded = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_BASE64, "base64").toString("utf-8")
  )

  return new google.auth.GoogleAuth({
    credentials: {
      client_email: decoded.client_email,
      private_key: decoded.private_key,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

// gid로 시트 이름을 조회하는 함수
async function getSheetNameByGid(sheets) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  })

  // gid에 해당하는 시트 이름 찾기
  const targetSheet = spreadsheet.data.sheets.find(
    (s) => s.properties.sheetId === SHEET_GID
  )

  if (!targetSheet) {
    throw new Error(`gid ${SHEET_GID}에 해당하는 시트를 찾을 수 없습니다.`)
  }

  return targetSheet.properties.title
}

// 구글 시트에 상담 데이터를 저장하는 함수
async function sendToGoogleSheet({ name, phone, caseTypeText, content, utmSource }) {
  const auth = getGoogleAuth()
  const sheets = google.sheets({ version: "v4", auth })

  // 시트 이름 조회
  const sheetName = await getSheetNameByGid(sheets)

  // 현재 한국 시간 생성
  const timestamp = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  })

  // 시트에 새 행 추가 (utm_source 포함)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${sheetName}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[timestamp, name, phone, caseTypeText, content || "내용 없음", utmSource]],
    },
  })
}

// 잔디 웹훅으로 상담 알림을 보내는 함수
async function sendToJandi({ name, phone, caseTypeText, content }) {
  const jandiUrl = process.env.JANDI_WEBHOOK_URL

  // 웹훅 URL이 설정되지 않은 경우 건너뜀
  if (!jandiUrl) {
    console.warn("JANDI_WEBHOOK_URL이 설정되지 않아 잔디 알림을 건너뜁니다.")
    return
  }

  // 잔디 웹훅으로 상담 알림 전송
  const response = await fetch(jandiUrl, {
    method: "POST",
    headers: {
      Accept: "application/vnd.tosslab.jandi-v2+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: "📋 새로운 상담 신청이 접수되었습니다.",
      connectColor: "#1e3a5f",
      connectInfo: [
        {
          title: "성함",
          description: name,
        },
        {
          title: "연락처",
          description: phone,
        },
        {
          title: "사건 유형",
          description: caseTypeText,
        },
        {
          title: "상담 내용",
          description: content || "내용 없음",
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`잔디 알림 전송 실패: ${response.status}`)
  }
}

export async function POST(request) {
  try {
    const { caseTypes, name, phone, content, utmSource = "" } = await request.json()

    // 유효성 검사
    if (!name || !phone) {
      return NextResponse.json(
        { error: "성함과 연락처는 필수입니다." },
        { status: 400 }
      )
    }

    const caseTypeText = caseTypes.length > 0 ? caseTypes.join(", ") : "미선택"

    // 구글 시트 저장과 잔디 알림을 동시에 실행
    const results = await Promise.allSettled([
      sendToGoogleSheet({ name, phone, caseTypeText, content, utmSource }),
      sendToJandi({ name, phone, caseTypeText, content }),
    ])

    const [sheetResult, jandiResult] = results

    // 구글 시트 저장 실패 시 경고 로그
    if (sheetResult.status === "rejected") {
      console.error("구글 시트 저장 실패:", sheetResult.reason)
    }

    // 잔디 알림 실패 시 경고 로그
    if (jandiResult.status === "rejected") {
      console.error("잔디 알림 전송 실패:", jandiResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("상담 신청 처리 실패:", error)
    return NextResponse.json(
      { error: "상담 신청 중 오류가 발생했습니다." },
      { status: 500 }
    )
  }
}
