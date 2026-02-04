import "./globals.css";

export const metadata = {
  title: "조아라 변호사 - 이혼/상간 전문 법무법인 김앤파트너스",
  description: "감정은 덜어내고 팩트로 승부합니다. 창원 이혼·상간 소송 전문가 조아라 변호사 비공개 상담.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* 구글 폰트 적용을 위해 여기에 추가하거나 globals.css에서 처리할 수 있습니다 */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}