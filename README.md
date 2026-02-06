# Family CW

가족상담 웹사이트 프로젝트

## 요구 사항

- **Node.js** 18.17.0 이상
- **npm** (Node.js와 함께 설치됨)

Node.js가 설치되어 있지 않다면 [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전을 다운로드하세요.

## 설치 방법

### 1. 저장소 클론

```bash
git clone https://github.com/dexterhan51-blip/familycw.git
cd familycw
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 사용 가능한 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (핫 리로드 지원) |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | 코드 린트 검사 |

## 기술 스택

- [Next.js](https://nextjs.org/) 16 - React 프레임워크
- [React](https://react.dev/) 19 - UI 라이브러리
- [Tailwind CSS](https://tailwindcss.com/) 4 - CSS 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안정성

## 프로젝트 구조

```
family-cw/
├── app/           # Next.js App Router 페이지
├── public/        # 정적 파일 (이미지 등)
├── package.json   # 프로젝트 설정 및 의존성
└── tsconfig.json  # TypeScript 설정
```

## 문제 해결

### `npm install` 오류 시

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 포트 3000이 사용 중일 때

```bash
# 다른 포트로 실행
npm run dev -- -p 3001
```
