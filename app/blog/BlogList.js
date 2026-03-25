"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, ChevronRight, Search } from "lucide-react"

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

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim()
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`
}

function getCategories(post) {
  const terms = post._embedded?.["wp:term"]?.[0] || []
  return terms.filter((cat) => cat.slug !== "uncategorized")
}

export default function BlogList({ posts }) {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("전체")

  // 카테고리 목록 추출 (uncategorized 제외, 중복 제거)
  const categories = [
    "전체",
    ...Array.from(
      new Set(
        posts
          .flatMap((p) => getCategories(p))
          .map((cat) => cat.name)
      )
    ),
  ]

  const filtered = posts.filter((post) => {
    const postCategories = getCategories(post)
    const matchCategory =
      activeCategory === "전체" ||
      postCategories.some((cat) => cat.name === activeCategory)

    if (!query.trim()) return matchCategory

    const q = query.toLowerCase()
    return (
      matchCategory &&
      (stripHtml(post.title.rendered).toLowerCase().includes(q) ||
        stripHtml(post.excerpt.rendered).toLowerCase().includes(q) ||
        postCategories.some((cat) => cat.name.toLowerCase().includes(q)))
    )
  })

  return (
    <>
      {/* 검색창 */}
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="relative max-w-md mx-auto">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: COLORS.textMuted }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="글 제목, 내용, 카테고리 검색..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200"
            style={{
              backgroundColor: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text,
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
          />
        </div>

        {/* 카테고리 탭 */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                style={{
                  backgroundColor:
                    activeCategory === cat ? COLORS.accent : COLORS.white,
                  color:
                    activeCategory === cat ? COLORS.white : COLORS.textLight,
                  border: `1px solid ${activeCategory === cat ? COLORS.accent : COLORS.border}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 글 목록 */}
      <div className="max-w-5xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={40} style={{ color: COLORS.textMuted }} className="mx-auto mb-4" />
            <p className="text-base" style={{ color: COLORS.textMuted }}>
              {query.trim()
                ? `"${query}"에 대한 검색 결과가 없습니다.`
                : "아직 게시된 글이 없습니다."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => {
              const featuredImage =
                post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null
              const postCategories = getCategories(post)

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
                    {/* 카테고리 뱃지 */}
                    {postCategories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {postCategories.map((cat) => (
                          <span
                            key={cat.id}
                            className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: COLORS.accentLight,
                              color: COLORS.accent,
                            }}
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
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
    </>
  )
}
