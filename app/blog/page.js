import Link from "next/link"
import { FileText, ChevronRight } from "lucide-react"

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

async function getPosts() {
  const res = await fetch(`${WP_API}/posts?per_page=12&_embed`, {
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  return res.json()
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim()
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
}

export const metadata = {
  title: "블로그 - 조아라 변호사 | 이혼·상간 전문 법무법인 김앤파트너스",
  description: "이혼, 재산분할, 상간소송, 양육권 등 가사 법률 정보를 쉽게 알려드립니다.",
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

      {/* 글 목록 */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={40} style={{ color: COLORS.textMuted }} className="mx-auto mb-4" />
              <p className="text-base" style={{ color: COLORS.textMuted }}>
                아직 게시된 글이 없습니다.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const featuredImage =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{ border: `1px solid ${COLORS.border}` }}
                  >
                    {/* 썸네일 */}
                    <div
                      className="relative w-full aspect-video overflow-hidden"
                      style={{ backgroundColor: COLORS.bg }}
                    >
                      {featuredImage ? (
                        <img
                          src={featuredImage}
                          alt={stripHtml(post.title.rendered)}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText size={32} style={{ color: COLORS.textMuted }} />
                        </div>
                      )}
                    </div>

                    {/* 글 정보 */}
                    <div className="p-5">
                      <p className="text-xs mb-2" style={{ color: COLORS.textMuted }}>
                        {formatDate(post.date)}
                      </p>
                      <h2
                        className="text-base font-bold mb-2 leading-snug line-clamp-2"
                        style={{ color: COLORS.text }}
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <p
                        className="text-sm leading-relaxed line-clamp-2 mb-3"
                        style={{ color: COLORS.textLight }}
                      >
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="flex items-center gap-1 text-sm font-medium" style={{ color: COLORS.accent }}>
                        자세히 보기
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="py-8 text-center" style={{ borderTop: `1px solid ${COLORS.border}` }}>
        <p className="text-xs" style={{ color: COLORS.textMuted }}>
          © 2025. 법무법인 김앤파트너스 All rights reserved.
        </p>
      </footer>
    </div>
  )
}
