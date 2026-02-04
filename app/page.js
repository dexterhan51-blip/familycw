"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Phone,
  ChevronDown,
  Check,
  ExternalLink,
  MapPin,
  MessageSquare,
  Youtube,
  FileText,
  Scale,
  Shield,
  Search,
  Users,
  BadgeCheck,
  Clock,
  Lock,
  Target,
  Gavel,
} from "lucide-react"

/* ── 색상 상수 ── */
const COLORS = {
  primary: "#1e3a5f",      // 딥 네이비 - 포인트 컬러
  primaryLight: "#2d4a6f", // 밝은 네이비
  primaryBg: "#f0f4f8",    // 아주 연한 네이비 배경
  text: "#1a1a1a",         // 본문 텍스트
  textLight: "#666666",    // 보조 텍스트
  textMuted: "#999999",    // 희미한 텍스트
  border: "#e5e7eb",       // 테두리
  white: "#ffffff",
  bg: "#fafafa",           // 배경
}

/* ── FAQ 컴포넌트 ── */
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: isOpen ? COLORS.primaryBg : COLORS.white,
        border: isOpen ? `1px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-all duration-300"
        style={{ color: COLORS.text }}
      >
        <span className="font-medium text-sm md:text-base leading-relaxed">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: isOpen ? COLORS.primary : COLORS.textMuted }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p
          className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed"
          style={{ color: COLORS.textLight }}
          dangerouslySetInnerHTML={{ __html: answer.replace(/#c9a227/g, COLORS.primary) }}
        />
      </div>
    </div>
  )
}

/* ── 메인 랜딩 ── */
export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [formData, setFormData] = useState({
    caseTypes: [],
    name: "",
    phone: "",
    content: "",
    privacyAgree: true,
  })

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  const handleCheckboxChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      caseTypes: prev.caseTypes.includes(value)
        ? prev.caseTypes.filter((v) => v !== value)
        : [...prev.caseTypes, value],
    }))
  }

  const faqData = [
    {
      question: "상담 내용은 비밀이 보장되나요?",
      answer:
        `물론입니다. 모든 상담 내용은 <strong style="color:${COLORS.primary};">변호사-의뢰인 비밀유지 의무</strong>에 따라 철저히 보호됩니다. 가족을 포함한 제3자에게 절대 알리지 않으며, 사무실 방문이 어려우실 경우 별도 장소 상담도 가능합니다.`,
    },
    {
      question: "배우자가 재산을 숨기거나 빼돌리면 어떻게 하나요?",
      answer:
        `<strong style="color:${COLORS.primary};">법원 사실조회 제도</strong>를 활용하여 은행, 보험, 부동산, 증권 등 모든 금융자산을 조회합니다. 또한 이혼 소송 전 <strong style="color:${COLORS.primary};">재산보전 처분(가압류)</strong>을 통해 재산 은닉을 사전에 차단할 수 있습니다.`,
    },
    {
      question: "증거가 부족한데 상간 소송이 가능한가요?",
      answer:
        `카카오톡 메시지, 카드 내역, CCTV 등 <strong style="color:${COLORS.primary};">간접증거만으로도 승소한 사례</strong>가 다수 있습니다. 증거 수집 방법부터 소송 전략까지 체계적으로 안내해 드리며, 증거가 부족하다고 판단되더라도 상담을 통해 새로운 가능성을 찾을 수 있습니다.`,
    },
    {
      question: "전업주부인데 재산분할을 제대로 받을 수 있나요?",
      answer:
        `대법원 판례에 따르면 전업주부의 <strong style="color:${COLORS.primary};">가사노동 기여도는 30~50%</strong>로 인정됩니다. 혼인 기간, 자녀 양육, 가사 전담 정도에 따라 기여도를 최대한 높여 주장하며, 특유재산과 공동재산을 명확히 구분하여 최대 분할을 이끌어냅니다.`,
    },
    {
      question: "이혼 후 빚 문제도 함께 해결할 수 있나요?",
      answer:
        `조아라 변호사는 <strong style="color:${COLORS.primary};">이혼 전문 + 채무자회생/파산 전문</strong> 이중 자격을 보유하고 있습니다. 이혼 과정에서 발생하는 채무 문제까지 원스톱으로 해결하여, 진정한 새출발을 설계해 드립니다.`,
    },
  ]

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', sans-serif", backgroundColor: COLORS.white }}>

      {/* ═══════════ S1. 히어로 ═══════════ */}
      <section className="min-h-screen flex items-center relative overflow-hidden" style={{ backgroundColor: COLORS.white }}>
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 텍스트 영역 */}
            <div className="order-2 lg:order-1">
              {/* 라벨 */}
              <span
                className="inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wide mb-8"
                style={{
                  color: COLORS.primary,
                  backgroundColor: COLORS.primaryBg,
                }}
              >
                이혼 · 상간 전문 변호사
              </span>

              {/* 메인 카피 */}
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
                style={{ color: COLORS.text }}
              >
                감정은 덜어내고,
                <br />
                <span style={{ color: COLORS.primary }}>팩트로 승부합니다.</span>
              </h1>

              {/* 서브 카피 */}
              <p
                className="text-base md:text-lg leading-relaxed mb-8"
                style={{ color: COLORS.textLight }}
              >
                울어주는 변호사보다 필요한 건,
                <br />
                <strong style={{ color: COLORS.text }}>이겨주는 변호사</strong>입니다.
              </p>

              {/* CTA 버튼 */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href="tel:055-266-7200"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                >
                  <Phone size={18} />
                  전화상담
                </a>
                <button
                  onClick={() => scrollToSection("consultation")}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:bg-gray-50"
                  style={{
                    backgroundColor: "transparent",
                    color: COLORS.text,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  1:1 비공개 상담
                </button>
              </div>

              {/* 하단 태그 */}
              <div className="flex flex-wrap gap-2">
                {["재산분할", "상간소송", "양육권", "채무조정"].map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      backgroundColor: COLORS.bg,
                      color: COLORS.textLight,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 이미지 영역 */}
            <div className="order-1 lg:order-2">
              <div
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden"
                style={{ backgroundColor: COLORS.bg }}
              >
                {/* 실제 이미지가 들어갈 자리 */}
                <Image
                  src="/images/profile-main.jpg"
                  alt="조아라 변호사"
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.querySelector('.placeholder').style.display = 'flex'
                  }}
                />
                <div
                  className="placeholder absolute inset-0 items-center justify-center hidden"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <div className="text-center">
                    <p className="text-sm mb-2" style={{ color: COLORS.textMuted }}>이미지 위치</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>/public/images/profile-main.jpg</p>
                  </div>
                </div>
                {/* 하단 정보 오버레이 */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                >
                  <p className="text-white text-sm opacity-80">법무법인 김앤파트너스 창원</p>
                  <p className="text-white text-xl font-bold">조아라 변호사</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S1-2. 유튜브 섹션 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
              MEET FIRST
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: COLORS.text }}>
              상담 전, 영상으로 먼저 만나보세요
            </h2>
            <p className="text-base" style={{ color: COLORS.textLight }}>
              어떤 변호사인지 미리 확인하고 상담하세요
            </p>
          </div>

          {/* 대표 영상 */}
          <div className="mb-8">
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden"
              style={{ backgroundColor: COLORS.bg }}
            >
              <iframe
                src="https://www.youtube.com/embed/FfmtVR9BQ_4"
                title="조아라 변호사 대표 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* 주제별 영상 썸네일 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: "LlkoShrE6pU",
                title: "재산분할",
                desc: "숨긴 재산 찾는 법",
                icon: Scale,
              },
              {
                id: "MigyrrJ8UVY",
                title: "상간소송",
                desc: "증거 없이도 가능할까?",
                icon: Gavel,
              },
              {
                id: "o7_VRL3seVQ",
                title: "양육비·양육권",
                desc: "확실하게 받는 방법",
                icon: Users,
              },
            ].map((video) => (
              <a
                key={video.id}
                href={`https://youtu.be/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ border: `1px solid ${COLORS.border}` }}
              >
                {/* 썸네일 */}
                <div className="relative aspect-video bg-gray-100">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 재생 버튼 오버레이 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: COLORS.primary }}
                    >
                      <svg
                        className="w-5 h-5 text-white ml-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* 정보 */}
                <div className="p-4" style={{ backgroundColor: COLORS.white }}>
                  <div className="flex items-center gap-2 mb-1">
                    <video.icon size={16} style={{ color: COLORS.primary }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.text }}>
                      {video.title}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: COLORS.textLight }}>
                    {video.desc}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* 유튜브 채널 링크 */}
          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@%EC%B0%BD%EC%9B%90%EB%B3%80%ED%98%B8%EC%82%AC%EC%A1%B0%EC%95%84%EB%9D%BC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: COLORS.primaryBg,
                color: COLORS.primary,
              }}
            >
              <Youtube size={18} />
              유튜브 채널에서 더 많은 영상 보기
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 문제 공감 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-14">
            <p className="text-base md:text-lg mb-3" style={{ color: COLORS.primary }}>
              억울해서 잠이 안 오는데,
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              법적으로는 불리하다고요?
            </h2>
          </div>

          {/* 불안 체크리스트 */}
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            {[
              { text: '"증거가 부족한데 상간 소송 가능할까요?"', icon: Search },
              { text: '"전업주부인데 재산분할 제대로 받을 수 있나요?"', icon: Scale },
              { text: '"남편이 재산을 숨기거나 빚만 남겨두면 어떡하죠?"', icon: Shield },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <item.icon size={20} style={{ color: COLORS.primary }} />
                </span>
                <span
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: COLORS.text }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* 전환 메시지 */}
          <div className="text-center mt-14">
            <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textLight }}>
              감정적으로 대응하다가 증거도 재산도 잃으실 수 있습니다.
            </p>
            <p className="text-base md:text-lg font-semibold mt-2" style={{ color: COLORS.text }}>
              지금 필요한 건 <span style={{ color: COLORS.primary }}>냉철한 전략</span>입니다.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ S3. 솔루션 (Why Us) ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold leading-snug" style={{ color: COLORS.text }}>
              당신의 분노가 '정당한 권리'가 되도록
            </h2>
            <p className="text-base mt-3" style={{ color: COLORS.textLight }}>
              철저하게 계산된 승소 전략을 제시합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: Target,
                title: "T성향의 팩트 폭격",
                desc: "감정에 호소하지 않습니다. 증거와 논리로 상대방을 압박하고, 법리적 근거를 하나하나 쌓아 판사를 설득합니다.",
              },
              {
                num: "02",
                icon: Search,
                title: "디테일한 집요함",
                desc: "문자 한 통, 카드 내역 하나에서 은닉 재산을 찾아냅니다. 작은 단서도 놓치지 않는 집요한 분석력이 판결을 바꿉니다.",
              },
              {
                num: "03",
                icon: Shield,
                title: "빚까지 해결하는 Total Care",
                desc: "이혼 전문 + 회생/파산 전문 이중 자격 보유. 이혼 과정의 채무 문제까지 원스톱으로 해결합니다.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl transition-all duration-300 hover:shadow-lg relative"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  className="absolute top-6 right-6 text-5xl font-bold"
                  style={{ color: COLORS.primaryBg }}
                >
                  {card.num}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <card.icon size={24} style={{ color: COLORS.primary }} />
                </div>
                <h4 className="text-lg font-bold mb-3" style={{ color: COLORS.text }}>
                  {card.title}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S4. 성공 사례 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              판결문으로 증명하는 실제 승소 사례
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "재산분할",
                before: "12억 자산가 남편의 특유재산 주장",
                result: "6억 2천만 원",
                icon: Scale,
              },
              {
                type: "상간소송",
                before: "증거 부족, 100만 원 합의서 뿐",
                result: "위자료 1,500만 원",
                icon: Gavel,
              },
              {
                type: "양육비",
                before: '소득 0원 주장하는 "배드파더"',
                result: "월 100만 원",
                icon: Users,
              },
            ].map((caseItem, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {/* 케이스 헤더 */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  <caseItem.icon size={18} style={{ color: COLORS.white }} />
                  <span className="text-sm font-semibold" style={{ color: COLORS.white }}>
                    {caseItem.type}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Before */}
                  <div className="mb-5">
                    <span
                      className="inline-block text-xs font-medium px-2.5 py-1 rounded mb-2"
                      style={{ backgroundColor: "#fef2f2", color: "#991b1b" }}
                    >
                      BEFORE
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
                      {caseItem.before}
                    </p>
                  </div>

                  {/* 화살표 */}
                  <div className="flex justify-center my-3">
                    <ChevronDown size={20} style={{ color: COLORS.primary }} />
                  </div>

                  {/* After */}
                  <div
                    className="p-4 rounded-xl text-center mt-auto"
                    style={{ backgroundColor: COLORS.primaryBg }}
                  >
                    <span className="block text-xs mb-1" style={{ color: COLORS.textLight }}>
                      RESULT
                    </span>
                    <span className="text-lg font-bold" style={{ color: COLORS.primary }}>
                      {caseItem.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S5. 전문가 소개 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 이미지 */}
            <div className="relative">
              <div
                className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative"
                style={{ backgroundColor: COLORS.bg }}
              >
                <Image
                  src="/images/profile-about.jpg"
                  alt="조아라 변호사"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.querySelector('.placeholder').style.display = 'flex'
                  }}
                />
                <div
                  className="placeholder absolute inset-0 items-center justify-center hidden"
                  style={{ backgroundColor: COLORS.primaryBg }}
                >
                  <div className="text-center">
                    <p className="text-sm mb-2" style={{ color: COLORS.textMuted }}>이미지 위치</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>/public/images/profile-about.jpg</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 정보 */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: COLORS.primary }}>
                ABOUT
              </p>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug" style={{ color: COLORS.text }}>
                감정이 아닌 전략으로
                <br />
                당신의 권리를 증명합니다.
              </h2>

              <div
                className="p-5 rounded-xl mb-8"
                style={{ backgroundColor: COLORS.bg }}
              >
                <blockquote
                  className="text-base leading-relaxed"
                  style={{ color: COLORS.textLight, borderLeft: `3px solid ${COLORS.primary}`, paddingLeft: "1rem" }}
                >
                  "이혼은 불행이 아닙니다.
                  <br />
                  정당하게 홀로 서기 위한 <strong style={{ color: COLORS.text }}>'복구'의 과정</strong>입니다."
                </blockquote>
              </div>

              <div className="mb-6">
                <p className="text-xs mb-1" style={{ color: COLORS.textMuted }}>법무법인 김앤파트너스 창원사무소</p>
                <p className="text-xl font-bold" style={{ color: COLORS.text }}>조아라 변호사</p>
              </div>

              {/* 이력 */}
              <ul className="space-y-3 mb-8">
                {[
                  "대한변호사협회 등록 이혼 전문 변호사",
                  "대한변호사협회 등록 채무자회생 및 파산 전문 변호사",
                  '유튜브 "조아라 창원변호사" 채널 운영',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm" style={{ color: COLORS.textLight }}>
                    <BadgeCheck
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: COLORS.primary }}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* 유튜브 링크 */}
              <a
                href="https://www.youtube.com/@%EC%B0%BD%EC%9B%90%EB%B3%80%ED%98%B8%EC%82%AC%EC%A1%B0%EC%95%84%EB%9D%BC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: COLORS.primary, color: COLORS.white }}
              >
                <Youtube size={18} />
                유튜브에서 확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 긴급 CTA 띠 ═══════════ */}
      <section className="py-10" style={{ backgroundColor: COLORS.primary }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>
                이혼 소송, 골든타임을 놓치면
              </p>
              <p className="text-base md:text-lg font-semibold" style={{ color: COLORS.white }}>
                증거도 재산도 사라집니다.
              </p>
            </div>
            <a
              href="tel:055-266-7200"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.white,
                color: COLORS.primary,
              }}
            >
              <Phone size={18} />
              긴급 전화상담
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S6-A. 프로세스 ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              정당한 권리를 되찾기 위한 5단계
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* 연결선 */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
              style={{ backgroundColor: COLORS.border }}
            />

            {[
              {
                num: "01",
                title: "1:1 심층 상담",
                desc: "비밀이 보장되는 안전한 환경에서, 변호사가 직접 만나 현재 상황을 정밀하게 분석합니다.",
              },
              {
                num: "02",
                title: "맞춤 전략 수립",
                desc: "사건의 유형과 상대방의 약점을 파악하여, 승소 확률을 최대로 높이는 맞춤 전략을 설계합니다.",
              },
              {
                num: "03",
                title: "소장/서면 작성",
                desc: "변호사가 직접 작성합니다. 판사를 설득할 수 있는 논리적 구조와 증거 배치로 완성도를 높입니다.",
              },
              {
                num: "04",
                title: "재판/조정 대리",
                desc: "법정에서 의뢰인의 이익을 최우선으로 변론합니다. 조정 과정에서도 유리한 합의를 이끌어냅니다.",
              },
              {
                num: "05",
                title: "판결 및 집행",
                desc: "승소 판결 후 실제 집행까지 책임집니다. 재산분할 이행, 양육비 직접지급명령 등 결과를 현실로 만듭니다.",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-5 md:gap-7 mb-8 relative">
                <div
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-bold relative z-10"
                  style={{
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="flex-1 p-5 md:p-6 rounded-xl"
                  style={{
                    backgroundColor: COLORS.bg,
                    border: `1px solid ${COLORS.border}`,
                  }}
                >
                  <h4 className="text-base md:text-lg font-bold mb-2" style={{ color: COLORS.text }}>
                    {step.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: COLORS.textLight }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S6-B. FAQ ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              자주 묻는 질문
            </h2>
          </div>

          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S7. 상담 폼 (CTA) ═══════════ */}
      <section
        id="consultation"
        className="py-20 md:py-28"
        style={{ backgroundColor: COLORS.primary }}
      >
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: COLORS.white }}>
              1:1 비공개 상담 신청
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              남겨주시는 내용은 조아라 변호사에게 직접 전달됩니다.
              <br />
              가장 빠른 시간 내에 변호사가 직접 연락드립니다.
            </p>
          </div>

          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{ backgroundColor: COLORS.white }}
          >
            {/* 사건 유형 체크 */}
            <div className="mb-6">
              <p className="text-sm mb-3 font-medium" style={{ color: COLORS.textLight }}>
                해당 사항을 체크해 주세요
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["재산분할", "상간소송", "양육권/양육비", "채무조정", "이혼조정/소송", "기타"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: formData.caseTypes.includes(type)
                          ? COLORS.primaryBg
                          : COLORS.bg,
                        border: formData.caseTypes.includes(type)
                          ? `1px solid ${COLORS.primary}`
                          : `1px solid ${COLORS.border}`,
                      }}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.caseTypes.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                      />
                      <span
                        className="w-5 h-5 rounded flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: formData.caseTypes.includes(type) ? COLORS.primary : "transparent",
                          border: formData.caseTypes.includes(type)
                            ? "none"
                            : `2px solid ${COLORS.border}`,
                        }}
                      >
                        {formData.caseTypes.includes(type) && (
                          <Check size={12} style={{ color: COLORS.white }} />
                        )}
                      </span>
                      <span className="text-sm" style={{ color: COLORS.text }}>
                        {type}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* 입력 필드 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <input
                type="text"
                placeholder="성함"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <input
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <textarea
                placeholder="사건 내용을 간략히 적어주세요 (비밀보장)"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="col-span-2 w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none resize-y min-h-[120px]"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="mb-5">
              <label className="flex items-center gap-2.5 px-1 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={formData.privacyAgree}
                  onChange={(e) => setFormData({ ...formData, privacyAgree: e.target.checked })}
                />
                <span
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: formData.privacyAgree ? COLORS.primary : "transparent",
                    border: formData.privacyAgree ? "none" : `2px solid ${COLORS.border}`,
                  }}
                >
                  {formData.privacyAgree && <Check size={12} style={{ color: COLORS.white }} />}
                </span>
                <span className="text-sm" style={{ color: COLORS.textLight }}>
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.white,
              }}
            >
              <Lock size={18} />
              1:1 비공개 상담 신청하기
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock size={14} style={{ color: COLORS.textMuted }} />
              <p className="text-xs" style={{ color: COLORS.textMuted }}>
                야간/주말 문자 상담 가능 · 접수 후 24시간 내 회신
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 푸터 ═══════════ */}
      <footer className="py-12" style={{ backgroundColor: COLORS.white, borderTop: `1px solid ${COLORS.border}` }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <a
            href="https://revival.kimnpartners.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold mb-4 transition-all duration-300 hover:opacity-70"
            style={{ color: COLORS.text }}
          >
            법무법인 김앤파트너스 창원사무소
            <ExternalLink size={14} style={{ opacity: 0.4 }} />
          </a>

          <div
            className="flex items-center justify-center gap-2 mb-4"
            style={{ color: COLORS.textLight }}
          >
            <MapPin size={16} style={{ opacity: 0.5 }} />
            <span className="text-sm">경상남도 창원시 성산구 창이대로689번길 4-4 가야빌딩 4층</span>
          </div>

          <p className="text-xs mb-4 leading-relaxed" style={{ color: COLORS.textMuted }}>
            본 페이지의 내용은 법률 상담의 일반적인 정보 제공을 목적으로 하며,
            <br className="hidden md:block" />
            구체적인 법률 문제에 대해서는 반드시 전문가와 상담하시기 바랍니다.
          </p>

          <p className="text-xs" style={{ color: COLORS.textMuted }}>
            © 2025. 법무법인 김앤파트너스 All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══════════ 플로팅 버튼 ═══════════ */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 z-50">
        <a
          href="tel:055-266-7200"
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: COLORS.primary,
            color: COLORS.white,
          }}
        >
          <Phone size={18} />
          <span className="hidden md:inline">전화상담</span>
        </a>
        <a
          href="https://pf.kakao.com/_qFXib/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: "#FEE500",
            color: "#3C1E1E",
          }}
        >
          <MessageSquare size={18} />
          <span className="hidden md:inline">카카오톡</span>
        </a>
        <button
          onClick={() => scrollToSection("consultation")}
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: COLORS.white,
            color: COLORS.primary,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <FileText size={18} />
          <span className="hidden md:inline">비공개상담</span>
        </button>
      </div>
    </div>
  )
}
