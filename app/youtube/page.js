"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Phone,
  Check,
  ExternalLink,
  MapPin,
  MessageSquare,
  Youtube,
  FileText,
  BadgeCheck,
  Clock,
  Lock,
  Scale,
  Shield,
  Heart,
  Gavel,
  Users,
  MessageCircle,
  ListChecks,
  CircleDollarSign,
  ClipboardList,
  X,
  Grid3X3,
} from "lucide-react"

/* ── 색상 상수 ── */
const COLORS = {
  primary: "#1e3a5f",
  accent: "#5eb5e4",
  accentLight: "#e8f4fb",
  primaryBg: "#f0f4f8",
  text: "#1a1a1a",
  textLight: "#666666",
  textMuted: "#999999",
  border: "#e5e7eb",
  white: "#ffffff",
  bg: "#fafafa",
}

/* ── 성공사례 데이터 ── */
const CASES = [
  {
    type: "재산분할",
    icon: Scale,
    image: "/images/successful case 1.png",
    title: "비상장 주식까지 추적, 재산분할 7억 확보",
    desc: "남편이 비상장 주식·법인 명의 자산으로 재산을 숨겼으나, 법원 사실조회와 기업 회계 분석을 통해 은닉 자산을 전부 밝혀냈습니다.",
    result: "재산분할 7억 원 확보",
    mobileResult: ["재산분할", "7억원 확보"],
  },
  {
    type: "이혼소송",
    icon: Gavel,
    image: "/images/successful case 2.png",
    title: "바람피운 남편 상대 이혼 승소 + 위자료 확보",
    desc: "남편의 반복적인 외도로 혼인관계가 파탄난 사건. 카드 내역·숙박 기록·메신저 대화 등 정황 증거를 체계적으로 정리하여 유책배우자임을 입증했습니다.",
    result: "이혼 승소 + 위자료 인용",
    mobileResult: ["이혼승소 +", "위자료 인용"],
  },
  {
    type: "상간소송",
    icon: Users,
    image: "/images/successful case 3.png",
    title: "인스타그램 증거로 상간 관계 입증 성공",
    desc: "인스타그램 게시물·스토리·위치 태그·댓글 등 SNS 증거를 활용하여 배우자와 상간자의 부정행위를 입증했습니다.",
    result: "상간 위자료 전액 인용",
    mobileResult: ["상간 위자료", "전액 인용"],
  },
  {
    type: "재산분할",
    icon: Scale,
    image: "/images/successful case 1.png",
    title: "부동산 은닉 적발, 재산분할 5억 확보",
    desc: "배우자가 가족 명의로 분산시킨 부동산을 추적하여 실질적 소유권을 입증하고 재산분할에 포함시켰습니다.",
    result: "재산분할 5억 원 확보",
    mobileResult: ["재산분할", "5억원 확보"],
  },
  {
    type: "이혼소송",
    icon: Gavel,
    image: "/images/successful case 2.png",
    title: "가정폭력 피해자 이혼소송 전면 승소",
    desc: "가정폭력 피해 사실을 진단서·112 신고 기록·CCTV 등으로 체계적으로 입증하여 이혼 및 위자료를 모두 인용받았습니다.",
    result: "이혼 승소 + 위자료 인용",
    mobileResult: ["이혼승소 +", "위자료 인용"],
  },
  {
    type: "상간소송",
    icon: Users,
    image: "/images/successful case 3.png",
    title: "직장 내 부정행위 상간자 위자료 청구 성공",
    desc: "같은 직장 동료와의 부정행위를 업무 메신저·출장 기록·카드 내역으로 입증하여 상간 위자료를 전액 인용받았습니다.",
    result: "상간 위자료 전액 인용",
    mobileResult: ["상간 위자료", "전액 인용"],
  },
]

/* ── 네비게이션 링크 ── */
const NAV_LINKS = [
  { label: "상담신청", href: "#consultation" },
  { label: "조아라변호사", href: "#profile" },
  { label: "서비스안내", href: "#service" },
  { label: "오시는길", href: "#contact" },
]

/* ── 유튜브 타임코드 ── */
const TIMECODES = [
  { label: "상담 서론", time: 23 },
  { label: "재산분할", time: 129 },
  { label: "양육권", time: 307 },
  { label: "진술서", time: 373 },
]

const BASE_YT_URL = "https://go.knp-law.com/4lRoc6m"

/* ── 메인 ── */
export default function YoutubeLanding() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const playerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const ids = NAV_LINKS.map((l) => l.href.replace("#", ""))
      let current = ""
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // YouTube IFrame Player API 로드
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer()
      return
    }

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => {
      createPlayer()
    }

    function createPlayer() {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId: "Hf2kQX5sDHo",
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "Hf2kQX5sDHo",
          controls: 1,
          rel: 0,
          playsinline: 1,
        },
      })
    }
  }, [])

  const seekTo = (seconds) => {
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seconds, true)
      playerRef.current.unMute()
      playerRef.current.playVideo()
    }
  }

  const [selectedCase, setSelectedCase] = useState(null)

  const [formData, setFormData] = useState({
    caseTypes: [],
    name: "",
    phone: "",
    content: "",
    privacyAgree: true,
  })
  const [submitState, setSubmitState] = useState("idle")

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone) {
      alert("성함과 연락처를 입력해 주세요.")
      return
    }
    if (!formData.privacyAgree) {
      alert("개인정보 수집 및 이용에 동의해 주세요.")
      return
    }

    setSubmitState("loading")
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseTypes: formData.caseTypes,
          name: formData.name,
          phone: formData.phone,
          content: formData.content,
        }),
      })

      if (!res.ok) throw new Error("발송 실패")

      setSubmitState("success")
      setFormData({ caseTypes: [], name: "", phone: "", content: "", privacyAgree: true })
    } catch {
      setSubmitState("error")
    }
  }

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

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>

      {/* ═══════════ 고정 네비게이션 ═══════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : COLORS.white,
          backdropFilter: scrolled ? "blur(8px)" : "none",
        }}
      >
        {/* 상단 바 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
              법무법인 김앤파트너스
            </span>

            {/* PC: 네비 링크 */}
            <div className="hidden sm:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace("#", "")
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                      isActive ? "font-semibold" : "hover:opacity-70"
                    }`}
                    style={{
                      color: isActive ? COLORS.accent : COLORS.textLight,
                      backgroundColor: isActive ? COLORS.accentLight : "transparent",
                    }}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          </div>

          <a
            href="tel:055-266-7200"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
          >
            <Phone size={14} />
            <span className="hidden sm:inline">055-266-7200</span>
            <span className="sm:hidden">전화</span>
          </a>
        </div>

        {/* 모바일: 탭 네비 */}
        <div
          className="sm:hidden flex overflow-x-auto no-scrollbar px-2"
          style={{ borderTop: `1px solid ${COLORS.border}`, backgroundColor: COLORS.white }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "")
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex-1 text-center text-sm font-semibold px-3 py-2.5 whitespace-nowrap transition-colors"
                style={{
                  color: isActive ? COLORS.accent : COLORS.textMuted,
                  borderBottom: isActive ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                }}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </nav>

      {/* ═══════════ S1. 히어로 ═══════════ */}
      <section className="relative overflow-hidden pt-24 sm:pt-11" style={{ backgroundColor: COLORS.primary }}>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* 좌측: 카피 + CTA */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                style={{ color: COLORS.white }}
              >
                감정은 덜어내고,
                <br />
                <span style={{ color: COLORS.accent }}>팩트</span>로 승부합니다
              </h1>

              <p
                className="text-lg lg:text-xl mb-8 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                대한변협 등록 이혼 전문 변호사 조아라
                <br />
                판결문으로 증명하는 실력, <br className="sm:hidden" />지금 바로 상담받아 보세요.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection("consultation")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                >
                  <Lock size={20} />
                  비공개 상담 신청
                </button>
                <a
                  href="tel:055-266-7200"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:bg-white/10"
                  style={{ color: COLORS.white, border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <Phone size={18} />
                  전화상담
                </a>
              </div>
            </div>

            {/* 우측: 유튜브 영상 */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <div id="yt-player" className="absolute inset-0 w-full h-full" />
              </div>

              {/* 타임코드 버튼 */}
              <div className="flex items-center gap-2 mt-4 mb-2 justify-center">
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
                <span className="text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
                  빠른 이동
                </span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.15)" }} />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {TIMECODES.map((tc) => (
                  <button
                    key={tc.time}
                    onClick={() => seekTo(tc.time)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-80"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.8)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    {tc.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 상담 폼 ═══════════ */}
      <section
        id="consultation"
        className="py-16 md:py-20"
        style={{ backgroundColor: COLORS.bg }}
      >
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: COLORS.text }}
            >
              <span style={{ background: `linear-gradient(transparent 60%, ${COLORS.accent}33 60%)` }}>1:1 비공개 상담 신청</span>
            </h2>
            <p
              className="text-base leading-relaxed"
              style={{ color: COLORS.textLight }}
            >
              남겨주시는 내용은 조아라 변호사에게 직접 전달됩니다.
              <br />
              빠른 시간 내에 확인 후 연락드리겠습니다.
            </p>
          </div>

          <div className="p-6 md:p-8 rounded-2xl shadow-sm" style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}` }}>
            {/* 사건 유형 체크 */}
            <div className="mb-6">
              <p
                className="text-base mb-3 font-medium"
                style={{ color: COLORS.textLight }}
              >
                해당되는 사항을 체크해 주세요
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "이혼소송",
                  "상간소송",
                  "양육권/양육비",
                  "재산분할",
                  "협의이혼",
                  "기타",
                ].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: formData.caseTypes.includes(type)
                        ? COLORS.accentLight
                        : COLORS.bg,
                      border: formData.caseTypes.includes(type)
                        ? `1px solid ${COLORS.accent}`
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
                        backgroundColor: formData.caseTypes.includes(type)
                          ? COLORS.accent
                          : "transparent",
                        border: formData.caseTypes.includes(type)
                          ? "none"
                          : `2px solid ${COLORS.border}`,
                      }}
                    >
                      {formData.caseTypes.includes(type) && (
                        <Check size={12} style={{ color: COLORS.white }} />
                      )}
                    </span>
                    <span className="text-base" style={{ color: COLORS.text }}>
                      {type === "양육권/양육비" ? (
                        <>
                          <span className="hidden md:inline">양육권/양육비</span>
                          <span className="md:hidden">양육권/<br />양육비</span>
                        </>
                      ) : type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 입력 필드 */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <input
                type="text"
                placeholder="성함"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-300 focus:outline-none"
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
                className="w-full px-4 py-3.5 rounded-lg text-base transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
              <textarea
                placeholder="사건 내용을 자유롭게 적어 주세요 (비밀보장)"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="col-span-2 w-full px-4 py-3.5 rounded-lg text-base transition-all duration-300 focus:outline-none resize-y min-h-[120px]"
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
                  onChange={(e) =>
                    setFormData({ ...formData, privacyAgree: e.target.checked })
                  }
                />
                <span
                  className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    backgroundColor: formData.privacyAgree
                      ? COLORS.accent
                      : "transparent",
                    border: formData.privacyAgree
                      ? "none"
                      : `2px solid ${COLORS.border}`,
                  }}
                >
                  {formData.privacyAgree && (
                    <Check size={12} style={{ color: COLORS.white }} />
                  )}
                </span>
                <span className="text-sm" style={{ color: COLORS.textLight }}>
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            {submitState === "success" ? (
              <div className="text-center py-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <Check size={28} style={{ color: COLORS.accent }} />
                </div>
                <p
                  className="text-lg font-bold mb-2"
                  style={{ color: COLORS.text }}
                >
                  상담 신청이 완료되었습니다
                </p>
                <p className="text-sm" style={{ color: COLORS.textLight }}>
                  빠른 시간 내에 변호사가 직접 연락드리겠습니다.
                </p>
                <button
                  onClick={() => setSubmitState("idle")}
                  className="mt-4 text-sm underline"
                  style={{ color: COLORS.accent }}
                >
                  추가 상담 신청
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitState === "loading"}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                  style={{
                    backgroundColor: COLORS.accent,
                    color: COLORS.white,
                  }}
                >
                  <Lock size={18} />
                  {submitState === "loading"
                    ? "발송 중..."
                    : "1:1 비공개 상담 신청하기"}
                </button>

                {submitState === "error" && (
                  <p
                    className="text-center text-sm mt-3"
                    style={{ color: "#e74c3c" }}
                  >
                    발송에 실패했습니다. 전화로 문의해 주세요.
                  </p>
                )}

              </>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════ S3. 인스타그램 스타일 프로필 + 그리드 ═══════════ */}
      <section id="profile" className="py-12 md:py-16" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-lg mx-auto px-4 sm:px-6">

          {/* --- 인스타 프로필 헤더 --- */}
          <div
            className="rounded-t-2xl px-5 py-5"
            style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}`, borderBottom: "none" }}
          >
            <div className="flex items-center gap-5">
              {/* 프로필 사진 */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent}, #a855f7, #ec4899)`,
                  padding: "3px",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden" style={{ border: `3px solid ${COLORS.white}` }}>
                  <Image
                    src="/images/insta-fix.png"
                    alt="조아라 변호사"
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                    style={{ objectPosition: "0% top" }}
                  />
                </div>
              </div>

              {/* 통계 */}
              <div className="flex-1 flex items-center justify-around text-center">
                {[
                  { num: "40+", label: "게시물" },
                  { num: "1,000+", label: "상담건수" },
                  { num: "이혼전문", label: "대한변협" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-bold leading-tight" style={{ color: COLORS.text }}>{stat.num}</p>
                    <p className="text-sm" style={{ color: COLORS.textMuted }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 이름 + 바이오 */}
            <div className="mt-4">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h2 className="text-base font-bold" style={{ color: COLORS.text }}>
                  조아라 변호사
                </h2>
                <BadgeCheck size={14} style={{ color: COLORS.accent }} />
              </div>
              <p className="text-sm mb-1" style={{ color: COLORS.textMuted }}>
                법무법인 김앤파트너스 창원사무소
              </p>
              <p className="text-base leading-relaxed" style={{ color: COLORS.textLight }}>
                이혼·상간 전문 변호사
                <br />
                감정은 덜어내고, 팩트로 승부합니다.
                <br />
                <span style={{ color: COLORS.accent }}>제 5회 변호사시험 합격 · 대한변협 등록 이혼 전문</span>
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => scrollToSection("consultation")}
                className="flex-1 py-2.5 rounded-lg text-base font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
              >
                상담 신청
              </button>
              <a
                href="https://go.knp-law.com/46zmnUZ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-lg text-base font-semibold transition-all hover:opacity-80"
                style={{ backgroundColor: COLORS.bg, color: COLORS.text, border: `1px solid ${COLORS.border}` }}
              >
                <Youtube size={14} />
                유튜브
              </a>
            </div>
          </div>

          {/* --- 탭 바 (게시물) --- */}
          <div
            className="flex items-center justify-center py-3"
            style={{
              backgroundColor: COLORS.white,
              borderLeft: `1px solid ${COLORS.border}`,
              borderRight: `1px solid ${COLORS.border}`,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            <div className="flex items-center gap-1.5" style={{ color: COLORS.text }}>
              <Grid3X3 size={12} />
              <span className="text-sm font-semibold uppercase tracking-wider">승소 사례</span>
            </div>
          </div>

          {/* --- 인스타 그리드 (3열) --- */}
          <div
            className="grid grid-cols-3 rounded-b-2xl overflow-hidden"
            style={{
              backgroundColor: COLORS.white,
              borderLeft: `1px solid ${COLORS.border}`,
              borderRight: `1px solid ${COLORS.border}`,
              borderBottom: `1px solid ${COLORS.border}`,
            }}
          >
            {CASES.map((caseItem, index) => (
              <button
                key={index}
                onClick={() => setSelectedCase(caseItem)}
                className="relative aspect-square overflow-hidden group cursor-pointer"
                style={{
                  borderRight: (index % 3 !== 2) ? `1px solid ${COLORS.border}` : "none",
                  borderBottom: (index < CASES.length - 3) ? `1px solid ${COLORS.border}` : "none",
                }}
              >
                <Image
                  src={caseItem.image}
                  alt={`${caseItem.type} 판결문`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-base font-bold px-2">{caseItem.type}</p>
                    <p className="text-sm mt-1 px-2">
                      {caseItem.mobileResult[0]}<br />{caseItem.mobileResult[1]}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* 더보기 */}
          <div className="text-center mt-5">
            <a
              href="https://go.knp-law.com/4cbA2VR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-base font-medium transition-all hover:opacity-70"
              style={{ color: COLORS.accent }}
            >
              더 많은 승소 사례 보기 <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ 인스타 상세 팝업 모달 ═══════════ */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setSelectedCase(null)}
        >
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 모달 본체 */}
          <div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
            style={{ backgroundColor: COLORS.white }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-70"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", color: COLORS.white }}
            >
              <X size={16} />
            </button>

            {/* 게시물 헤더 */}
            <div className="flex items-center gap-3 px-4 py-3">
              <div
                className="w-9 h-9 rounded-full overflow-hidden shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.accent}, #a855f7, #ec4899)`,
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
                  <Image
                    src="/images/insta-fix.png"
                    alt="조아라 변호사"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-base font-semibold truncate" style={{ color: COLORS.text }}>조아라 변호사</p>
                  <BadgeCheck size={12} style={{ color: COLORS.accent }} />
                </div>
                <p className="text-sm" style={{ color: COLORS.textMuted }}>{selectedCase.type} · 실제 판결</p>
              </div>
            </div>

            {/* 이미지 */}
            <div className="relative w-full aspect-square overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
              <Image
                src={selectedCase.image}
                alt={`${selectedCase.type} 판결문`}
                fill
                className="object-cover"
              />
            </div>

            {/* 액션 바 */}
            <div className="flex items-center gap-4 px-4 py-3">
              <Heart size={22} style={{ color: COLORS.text }} />
              <MessageCircle size={22} style={{ color: COLORS.text }} />
              <ExternalLink size={20} style={{ color: COLORS.text }} />
            </div>

            {/* 내용 */}
            <div className="px-4 pb-5">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-bold mb-2"
                style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
              >
                <Check size={10} />
                {selectedCase.result}
              </div>
              <p className="text-base leading-relaxed mb-4" style={{ color: COLORS.text }}>
                <span className="font-bold">조아라 변호사</span>{" "}
                <span style={{ color: COLORS.textLight }}>
                  {selectedCase.title} — {selectedCase.desc}
                </span>
              </p>

              {/* 상담 CTA */}
              <button
                onClick={() => {
                  setSelectedCase(null)
                  scrollToSection("consultation")
                }}
                className="w-full py-3 rounded-xl text-base font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
              >
                이 사례와 비슷한 상황이라면? 상담 신청하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ S4. 서비스 안내 (정보성) ═══════════ */}
      <section id="service" className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2 leading-snug"
              style={{ color: COLORS.text }}
            >
              어떤 상황이신가요?
              <br />
              <span style={{ backgroundImage: `linear-gradient(transparent 60%, ${COLORS.accent}40 60%)`, display: "inline" }}>이혼 전문 변호사</span>가 도와드립니다
            </h2>
            <p className="text-base" style={{ color: COLORS.textMuted }}>
              상황에 따라 최적의 법적 전략을 제시합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: Scale,
                badge: "이혼소송",
                title: "이혼을 결심하셨다면",
                summary: "재산분할, 양육권, 위자료까지 한 번에 해결합니다.",
                points: [
                  "협의이혼 vs 재판이혼 최적 전략 수립",
                  "재산분할 비율 극대화 (부동산·퇴직금·보험)",
                  "양육권·양육비 유리한 조건 확보",
                ],
                who: "이혼 준비 중이거나 소송이 필요할 때",
              },
              {
                icon: Shield,
                badge: "상간소송",
                title: "배우자의 외도를 알게 됐다면",
                summary: "부정행위 증거 확보부터 손해배상 청구까지 진행합니다.",
                points: [
                  "부정행위 입증을 위한 증거 수집 전략",
                  "상간자 대상 위자료 청구 (수천만 원 가능)",
                  "이혼소송과 병행 시 유리한 포지션 확보",
                ],
                who: "배우자의 외도로 피해를 입었을 때",
              },
            ].map((service) => (
              <div
                key={service.badge}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: COLORS.accentLight }}
                  >
                    <service.icon size={16} style={{ color: COLORS.accent }} />
                  </div>
                  <span className="text-xl font-bold" style={{ color: COLORS.text }}>
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.text }}>
                  {service.title}
                </h3>
                <p className="text-base mb-4" style={{ color: COLORS.textLight }}>
                  {service.summary}
                </p>

                <ul className="space-y-2 mb-4">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-base" style={{ color: COLORS.textLight }}>
                      <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: COLORS.accent }} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex-grow" />

                <div
                  className="rounded-lg px-4 py-3 flex items-center gap-2"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <Heart size={14} style={{ color: COLORS.accent }} />
                  <span className="text-base font-semibold" style={{ color: COLORS.primary }}>
                    {service.who}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S5. 상담 전 준비사항 ═══════════ */}
      <section id="checklist" className="py-16 lg:py-24" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: COLORS.text }}
            >
              <span style={{ background: `linear-gradient(transparent 60%, ${COLORS.accent}33 60%)` }}>상담 전 준비사항</span>
            </h2>
            <p className="text-base" style={{ color: COLORS.textMuted }}>
              아래 내용을 미리 정리해 오시면 <br className="sm:hidden" />더 정확한 상담이 가능합니다.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: ClipboardList,
                num: "1",
                label: "현재 혼인 상태 정리",
                desc: "결혼 기간, 별거 여부, 이혼 사유 (외도, 폭행, 성격차이 등)",
              },
              {
                icon: CircleDollarSign,
                num: "2",
                label: "재산·채무 현황 파악",
                desc: "부동산, 예·적금, 보험, 퇴직금, 대출금 등 대략적 규모",
              },
              {
                icon: Users,
                num: "3",
                label: "자녀 관련 사항 정리",
                desc: "자녀 수·나이, 현재 양육자, 희망하는 양육권·양육비 조건",
              },
              {
                icon: ListChecks,
                num: "4",
                label: "원하는 결과 생각해 오기",
                desc: "이혼 자체 / 재산분할 / 위자료 / 양육권 중 어디에 우선순위를 두는지",
              },
              {
                icon: MessageCircle,
                num: "5",
                label: "증거가 있다면 간단히 메모",
                desc: "카톡 대화, 사진, 녹음, 진단서 등 — 없어도 상담은 가능합니다",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-4 rounded-xl px-5 py-4"
                style={{
                  backgroundColor: COLORS.bg,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <span className="text-base font-bold" style={{ color: COLORS.accent }}>{item.num}</span>
                </div>
                <div>
                  <p className="text-lg font-semibold mb-0.5" style={{ color: COLORS.text }}>
                    {item.label}
                  </p>
                  <p className="text-base" style={{ color: COLORS.textMuted }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-center mt-5" style={{ color: COLORS.textMuted }}>
            * 정리가 안 되어 있어도 괜찮습니다. 상담하면서 변호사가 함께 정리해 드립니다.
          </p>
        </div>
      </section>

      {/* ═══════════ S5. 오시는 길 ═══════════ */}
      <section id="contact" className="py-20 lg:py-28" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-base mb-1" style={{ color: COLORS.textMuted }}>
              오시는 길
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ color: COLORS.text }}
            >
              <span style={{ background: `linear-gradient(transparent 60%, ${COLORS.accent}33 60%)` }}>법무법인 김앤파트너스 창원</span>
            </h2>
            <p className="text-base" style={{ color: COLORS.textLight }}>
              전국 어디든 전화 상담이 가능합니다.
            </p>
          </div>

          <a
            href="https://go.knp-law.com/4sil2dS"
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative rounded-xl overflow-hidden mb-5"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            <img
              src="https://knpblog.co.kr/wp-content/uploads/2025/09/창원사무소-오시는길_-수정스타벅스.jpg"
              alt="창원사무소 지도"
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-end justify-center pb-4">
              <span
                className="bg-white/90 backdrop-blur-sm text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: COLORS.textLight, border: `1px solid ${COLORS.border}` }}
              >
                <ExternalLink size={12} />
                네이버 지도에서 보기
              </span>
            </div>
          </a>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: COLORS.textMuted }} />
              <span className="text-base" style={{ color: COLORS.textLight }}>
                창원시 성산구 창이대로689번길 4-4, 가야빌딩 4층
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 shrink-0" style={{ color: COLORS.textMuted }} />
              <span className="text-base" style={{ color: COLORS.textLight }}>
                창원지방법원 정문에서 100m, 도보 2분
              </span>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => scrollToSection("consultation")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold transition-colors hover:opacity-90"
              style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
            >
              비공개 상담 신청하기
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════ 푸터 ═══════════ */}
      <footer
        className="py-12"
        style={{
          backgroundColor: COLORS.white,
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p
            className="text-xl font-semibold mb-4"
            style={{ color: COLORS.text }}
          >
            법무법인 김앤파트너스 창원사무소
          </p>

          <div
            className="flex items-center justify-center gap-2 mb-4"
            style={{ color: COLORS.textLight }}
          >
            <MapPin size={16} style={{ opacity: 0.5 }} />
            <span className="text-base">
              경상남도 창원시 성산구 창이대로689번길 4-4 <br className="sm:hidden" />가야빌딩 4층
            </span>
          </div>

          <p
            className="text-sm mb-4 leading-relaxed"
            style={{ color: COLORS.textMuted }}
          >
            본 페이지의 내용은 법률 상담의 일반적인 정보 제공을 목적으로 하며,
            <br className="hidden md:block" />
            구체적인 법률 문제에 대해서는 반드시 전문가와 상담하시기 바랍니다.
          </p>

          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            © 2026. 법무법인 김앤파트너스 All rights reserved.
          </p>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
            광고책임변호사 김민수
          </p>
        </div>
      </footer>

      {/* ═══════════ 플로팅 버튼 ═══════════ */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 z-50">
        <a
          href="tel:055-266-7200"
          className="flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-90 shadow-lg"
          style={{
            backgroundColor: COLORS.accent,
            color: COLORS.white,
          }}
        >
          <Phone size={18} />
          <span className="hidden md:inline">전화상담</span>
        </a>
        <a
          href="https://go.knp-law.com/4a1DfGd"
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
            color: COLORS.accent,
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
