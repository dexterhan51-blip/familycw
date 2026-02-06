import Link from "next/link"
import { ChevronLeft, Phone, MessageSquare } from "lucide-react"

const WP_API = "https://wordpress-1568541-6194044.cloudwaysapps.com/wp-json/wp/v2"

const COLORS = {
  primary: "#1e3a5f",
  accent: "#5eb5e4",
  accentLight: "#e8f4fb",
  text: "#1a1a1a",
  textLight: "#666666",
  textMuted: "#999999",
  border: "#e5e7eb",
  white: "#ffffff",
  bg: "#fafafa",
}

async function getPost(slug) {
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  const posts = await res.json()
  return posts[0] || null
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim()
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "글을 찾을 수 없습니다" }
  return {
    title: `${stripHtml(post.title.rendered)} - 조아라 변호사 블로그`,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: COLORS.text }}>글을 찾을 수 없습니다</h1>
          <Link href="/blog" className="text-sm font-medium" style={{ color: COLORS.accent }}>
            블로그로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", backgroundColor: COLORS.white }}>
      {/* 헤더 */}
      <header
        className="py-5 px-6"
        style={{ borderBottom: `1px solid ${COLORS.border}` }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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

      {/* 글 내용 */}
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* 뒤로가기 */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm mb-8 transition-all duration-300 hover:opacity-70"
            style={{ color: COLORS.accent }}
          >
            <ChevronLeft size={16} />
            블로그 목록
          </Link>

          {/* 제목 */}
          <div className="mb-8">
            <p className="text-sm mb-3" style={{ color: COLORS.textMuted }}>
              {formatDate(post.date)}
            </p>
            <h1
              className="text-2xl md:text-3xl font-bold leading-snug mb-4"
              style={{ color: COLORS.text }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div className="w-12 h-1 rounded-full" style={{ backgroundColor: COLORS.accent }} />
          </div>

          {/* 본문 */}
          <div
            className="prose prose-lg max-w-none"
            style={{ color: COLORS.textLight, lineHeight: "1.9" }}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* 상담 유도 */}
          <div
            className="mt-14 p-6 md:p-8 rounded-2xl text-center"
            style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
          >
            <p className="text-base font-bold mb-2" style={{ color: COLORS.text }}>
              비슷한 상황으로 고민 중이신가요?
            </p>
            <p className="text-sm mb-6" style={{ color: COLORS.textLight }}>
              변호사가 직접 상담해 드립니다. 비밀보장 약속드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:055-266-7200"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
              >
                <Phone size={16} />
                전화상담
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
              >
                <MessageSquare size={16} />
                1:1 비공개 상담
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* 푸터 */}
      <footer className="py-8 text-center" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <p className="text-xs" style={{ color: COLORS.textMuted }}>
          © 2025. 법무법인 김앤파트너스 All rights reserved.
        </p>
      </footer>
    </div>
  )
}
