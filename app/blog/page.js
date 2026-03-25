import Link from "next/link"
import BlogList from "./BlogList"

const WP_API = "https://wordpress-1568541-6194044.cloudwaysapps.com/wp-json/wp/v2"

async function getPosts() {
  const res = await fetch(`${WP_API}/posts?per_page=12&_embed`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  return res.json()
}

export const metadata = {
  title: "블로그 - 조아라 변호사 | 이혼·상간 전문 법무법인 김앤파트너스",
  description: "이혼, 재산분할, 상간소송, 양육권 등 가사 법률 정보를 쉽게 알려드립니다.",
}

const COLORS = {
  accent: "#5eb5e4",
  accentLight: "#e8f4fb",
  text: "#1a1a1a",
  textLight: "#666666",
  textMuted: "#999999",
  border: "#e5e7eb",
  white: "#ffffff",
  bg: "#fafafa",
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", backgroundColor: COLORS.white }}>
      {/* 헤더 */}
      <header
        className="py-5 px-6"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-bold" style={{ color: COLORS.text }}>
            법무법인 김앤파트너스
          </Link>
          <Link
            href="/"
            className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:opacity-80"
            style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
          >
            상담 신청
          </Link>
        </div>
      </header>

      {/* 블로그 타이틀 */}
      <section className="py-16 text-center" style={{ backgroundColor: COLORS.bg }}>
        <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>BLOG</p>
        <h1 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
          이혼·상간 법률 정보
        </h1>
        <p className="text-sm mt-3" style={{ color: COLORS.textLight }}>
          알아두면 도움이 되는 가사 법률 이야기
        </p>
      </section>

      {/* 검색 + 글 목록 */}
      <section className="py-12">
        <BlogList posts={posts} />
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <p className="text-xs" style={{ color: COLORS.textMuted }}>
          © 2026. 법무법인 김앤파트너스 All rights reserved.
        </p>
      </footer>
    </div>
  )
}
