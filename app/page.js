"use client"

import { useState } from "react"
import {
  Phone,
  ChevronDown,
  Check,
  ExternalLink,
  MapPin,
  MessageSquare,
  Send,
  Youtube,
  User,
  FileText,
  Scale,
  Shield,
  Search,
  Users,
  BadgeCheck,
  ArrowRight,
  Clock,
  Lock,
  TrendingUp,
  Target,
  Gavel,
  ChevronRight,
} from "lucide-react"

/* ── FAQ 컴포넌트 ── */
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: isOpen ? "#f7f5f0" : "#ffffff",
        border: isOpen ? "1px solid #c9a227" : "1px solid #e5e2da",
      }}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-all duration-300"
        style={{ color: "#1a1a1a" }}
      >
        <span className="font-semibold text-sm md:text-base leading-relaxed">{question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: isOpen ? "#c9a227" : "#999999" }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p
          className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed"
          style={{ color: "#4a4a4a" }}
          dangerouslySetInnerHTML={{ __html: answer }}
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
        '물론입니다. 모든 상담 내용은 <strong style="color:#c9a227;">변호사-의뢰인 비밀유지 의무</strong>에 따라 철저히 보호됩니다. 가족을 포함한 제3자에게 절대 알리지 않으며, 사무실 방문이 어려우실 경우 별도 장소 상담도 가능합니다.',
    },
    {
      question: "배우자가 재산을 숨기거나 빼돌리면 어떻게 하나요?",
      answer:
        '<strong style="color:#c9a227;">법원 사실조회 제도</strong>를 활용하여 은행, 보험, 부동산, 증권 등 모든 금융자산을 조회합니다. 또한 이혼 소송 전 <strong style="color:#c9a227;">재산보전 처분(가압류)</strong>을 통해 재산 은닉을 사전에 차단할 수 있습니다.',
    },
    {
      question: "증거가 부족한데 상간 소송이 가능한가요?",
      answer:
        '카카오톡 메시지, 카드 내역, CCTV 등 <strong style="color:#c9a227;">간접증거만으로도 승소한 사례</strong>가 다수 있습니다. 증거 수집 방법부터 소송 전략까지 체계적으로 안내해 드리며, 증거가 부족하다고 판단되더라도 상담을 통해 새로운 가능성을 찾을 수 있습니다.',
    },
    {
      question: "전업주부인데 재산분할을 제대로 받을 수 있나요?",
      answer:
        '대법원 판례에 따르면 전업주부의 <strong style="color:#c9a227;">가사노동 기여도는 30~50%</strong>로 인정됩니다. 혼인 기간, 자녀 양육, 가사 전담 정도에 따라 기여도를 최대한 높여 주장하며, 특유재산과 공동재산을 명확히 구분하여 최대 분할을 이끌어냅니다.',
    },
    {
      question: "이혼 후 빚 문제도 함께 해결할 수 있나요?",
      answer:
        '조아라 변호사는 <strong style="color:#c9a227;">이혼 전문 + 채무자회생/파산 전문</strong> 이중 자격을 보유하고 있습니다. 이혼 과정에서 발생하는 채무 문제까지 원스톱으로 해결하여, 진정한 새출발을 설계해 드립니다.',
    },
  ]

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>

      {/* ═══════════ S1. 히어로 ═══════════ */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-5"
        style={{
          background: "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 50%, #0f0f1a 100%)",
        }}
      >
        {/* 배경 장식 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(201,162,39,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201,162,39,0.04) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(201,162,39,0.03) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* 라벨 */}
          <span
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-widest mb-8 uppercase"
            style={{
              color: "#c9a227",
              backgroundColor: "rgba(201,162,39,0.08)",
              border: "1px solid rgba(201,162,39,0.25)",
              letterSpacing: "0.15em",
            }}
          >
            법무법인 김앤파트너스 창원 · 이혼/상간 전문
          </span>

          {/* 메인 카피 */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
            style={{ color: "#ffffff" }}
          >
            감정은 덜어내고,
            <br />
            <span
              style={{
                color: "#c9a227",
                textShadow: "0 0 40px rgba(201,162,39,0.25)",
              }}
            >
              팩트로 승부합니다.
            </span>
          </h1>

          {/* 서브 카피 */}
          <p
            className="text-base md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            울어주는 변호사보다 필요한 건,
          </p>
          <p
            className="text-lg md:text-2xl font-bold mb-10"
            style={{ color: "#ffffff" }}
          >
            이겨주는 변호사입니다.
          </p>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:055-266-7200"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                background: "linear-gradient(135deg, #c9a227 0%, #b08d1e 100%)",
                color: "#0a0a0a",
                boxShadow: "0 4px 24px rgba(201,162,39,0.35)",
              }}
            >
              <Phone size={20} />
              전화상담 신청하기
            </a>
            <button
              onClick={() => scrollToSection("consultation")}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg font-bold text-base transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{
                backgroundColor: "transparent",
                color: "#ffffff",
                border: "2px solid rgba(255,255,255,0.25)",
              }}
            >
              1:1 비공개 상담 신청
            </button>
          </div>

          {/* 하단 태그 */}
          <div className="flex flex-wrap gap-3 justify-center">
            {["재산분할 전문", "상간소송 전문", "양육권/양육비", "채무조정 연계"].map((tag, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full text-sm transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 문제 공감 ═══════════ */}
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, #0a0a0a 0%, #111827 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-12 md:mb-16">
            <p
              className="text-base md:text-lg mb-3 font-medium"
              style={{ color: "#c9a227" }}
            >
              억울해서 잠이 안 오는데,
            </p>
            <h2 className="text-xl md:text-3xl font-bold" style={{ color: "#ffffff" }}>
              법적으로는 불리하다고요?
            </h2>
          </div>

          {/* 불안 체크리스트 */}
          <div className="max-w-2xl mx-auto flex flex-col gap-5">
            {[
              { text: '"증거가 부족한데 상간 소송 가능할까요?"', icon: Search },
              { text: '"전업주부인데 재산분할 제대로 받을 수 있나요?"', icon: Scale },
              { text: '"남편이 재산을 숨기거나 빚만 남겨두면 어떡하죠?"', icon: Shield },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 px-6 py-5 md:px-8 md:py-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "rgba(201,162,39,0.1)" }}
                >
                  <item.icon size={20} style={{ color: "#c9a227" }} />
                </span>
                <span
                  className="text-sm md:text-base leading-relaxed font-medium"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* 전환 메시지 */}
          <div className="text-center mt-12 md:mt-16">
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              감정적으로 대응하다가 증거도 재산도 잃으실 수 있습니다.
            </p>
            <p className="text-base md:text-lg font-bold mt-2" style={{ color: "#ffffff" }}>
              지금 필요한 건 <span style={{ color: "#c9a227" }}>냉철한 전략</span>입니다.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ S3. 솔루션 (Why Us) ═══════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold mb-3" style={{ color: "#c9a227" }}>
              SOLUTION
            </p>
            <h2 className="text-xl md:text-3xl font-bold leading-snug" style={{ color: "#1a1a1a" }}>
              당신의 분노가 '정당한 권리'가 되도록,
              <br />
              <span style={{ color: "#c9a227" }}>철저하게 계산된 승소 전략</span>을 제시합니다.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: Target,
                title: "T성향의 팩트 폭격",
                desc: "감정에 호소하지 않습니다. 증거와 논리로 상대방을 압박하고, 법리적 근거를 하나하나 쌓아 판사를 설득합니다.",
                tag: "#냉철한_증거분석",
              },
              {
                num: "02",
                icon: Search,
                title: "디테일한 집요함",
                desc: "문자 한 통, 카드 내역 하나에서 은닉 재산을 찾아냅니다. 작은 단서도 놓치지 않는 집요한 분석력이 판결을 바꿉니다.",
                tag: "#은닉재산_추적",
              },
              {
                num: "03",
                icon: Shield,
                title: "빚까지 해결하는 Total Care",
                desc: "이혼 전문 + 회생/파산 전문 이중 자격 보유. 이혼 과정의 채무 문제까지 원스톱으로 해결하여 완전한 새출발을 설계합니다.",
                tag: "#이혼+채무_원스톱",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden"
                style={{
                  backgroundColor: "#f7f5f0",
                  borderTop: "4px solid #c9a227",
                }}
              >
                <div
                  className="absolute top-6 right-6 text-6xl font-extrabold"
                  style={{ color: "rgba(201,162,39,0.07)" }}
                >
                  {card.num}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(201,162,39,0.1)" }}
                >
                  <card.icon size={24} style={{ color: "#c9a227" }} />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
                  {card.title}
                </h4>
                <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: "#4a4a4a" }}>
                  {card.desc}
                </p>
                <span
                  className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: "rgba(201,162,39,0.1)", color: "#8b6914" }}
                >
                  {card.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S4. 성공 사례 ═══════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f7f5f0" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold mb-3" style={{ color: "#c9a227" }}>
              PROOF
            </p>
            <h2 className="text-xl md:text-3xl font-bold" style={{ color: "#1a1a1a" }}>
              판결문으로 증명하는
              <br />
              <span style={{ color: "#c9a227" }}>실제 승소 사례</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                type: "재산분할",
                before: "12억 자산가 남편의 특유재산 주장",
                result: "6억 2천만 원 분할 인용",
                icon: Scale,
              },
              {
                type: "상간소송",
                before: "증거 부족, 100만 원 합의서 뿐",
                result: "위자료 1,500만 원 승소",
                icon: Gavel,
              },
              {
                type: "양육비",
                before: '소득 0원 주장하는 "배드파더"',
                result: "월 100만 원 양육비 판결",
                icon: Users,
              },
            ].map((caseItem, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e2da",
                }}
              >
                {/* 케이스 헤더 */}
                <div
                  className="px-6 py-4 flex items-center gap-3"
                  style={{ backgroundColor: "#1a1a2e" }}
                >
                  <caseItem.icon size={20} style={{ color: "#c9a227" }} />
                  <span className="text-sm font-bold" style={{ color: "#c9a227" }}>
                    {caseItem.type}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Before */}
                  <div className="mb-5">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded mb-2"
                      style={{ backgroundColor: "#fef2f2", color: "#991b1b" }}
                    >
                      BEFORE
                    </span>
                    <p className="text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>
                      {caseItem.before}
                    </p>
                  </div>

                  {/* 화살표 */}
                  <div className="flex justify-center my-2">
                    <ChevronDown size={20} style={{ color: "#c9a227" }} />
                  </div>

                  {/* After */}
                  <div
                    className="p-4 rounded-xl text-center mt-auto"
                    style={{ backgroundColor: "#1a1a2e" }}
                  >
                    <span className="block text-xs mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                      RESULT
                    </span>
                    <span className="text-lg font-bold" style={{ color: "#c9a227" }}>
                      {caseItem.result}
                    </span>
                    <span className="block text-lg mt-1">🏆</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S5. 전문가 소개 ═══════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <p className="text-sm font-semibold mb-3" style={{ color: "#c9a227" }}>
            AUTHORITY
          </p>
          <h2 className="text-xl md:text-3xl font-bold mb-4 leading-snug" style={{ color: "#1a1a1a" }}>
            감정이 아닌 <span style={{ color: "#c9a227" }}>전략</span>으로
            <br />
            당신의 권리를 증명합니다.
          </h2>

          <div
            className="p-6 md:p-8 rounded-2xl mb-8"
            style={{
              backgroundColor: "#f7f5f0",
              border: "1px solid #e5e2da",
            }}
          >
            <blockquote
              className="text-base md:text-lg leading-relaxed italic"
              style={{ color: "#4a4a4a", borderLeft: "3px solid #c9a227", paddingLeft: "1.25rem" }}
            >
              "이혼은 불행이 아닙니다.
              <br />
              정당하게 홀로 서기 위한 <strong style={{ color: "#1a1a1a" }}>'복구'의 과정</strong>입니다."
            </blockquote>
          </div>

          {/* 프로필 이미지 + 정보 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* 이미지 */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div
                className="w-full aspect-[3/4] rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #e8e4dc 0%, #d9d3c7 100%)" }}
              >
                <span className="text-sm" style={{ color: "#8b8378" }}>
                  조아라 변호사 사진
                </span>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm" style={{ color: "#8b8378" }}>
                  법무법인 김앤파트너스 창원사무소
                </p>
                <p className="text-lg font-bold mt-1" style={{ color: "#1a1a1a" }}>
                  조아라 변호사
                </p>
              </div>
            </div>

            {/* 이력 */}
            <div className="flex-1">
              <h4
                className="text-lg font-bold mb-5 pb-3"
                style={{ color: "#1a1a1a", borderBottom: "1px solid #e5e2da" }}
              >
                주요 이력
              </h4>
              <ul className="space-y-3.5">
                {[
                  "대한변호사협회 등록 이혼 전문 변호사",
                  "대한변호사협회 등록 채무자회생 및 파산 전문 변호사",
                  '유튜브 "조아라 창원변호사" 채널 운영',
                  "법무법인 김앤파트너스 창원사무소 소속",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm" style={{ color: "#4a4a4a" }}>
                    <BadgeCheck
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: "#c9a227" }}
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
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}
              >
                <Youtube size={18} style={{ color: "#c9a227" }} />
                유튜브에서 전문성 확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 긴급 CTA 띠 ═══════════ */}
      <section
        className="py-10 md:py-12"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          borderTop: "1px solid rgba(201,162,39,0.2)",
          borderBottom: "1px solid rgba(201,162,39,0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
            <div>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                이혼 소송, 골든타임을 놓치면
              </p>
              <p className="text-base md:text-lg font-bold" style={{ color: "#ffffff" }}>
                증거도 재산도 사라집니다.
              </p>
            </div>
            <a
              href="tel:055-266-7200"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-0.5 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #c9a227 0%, #b08d1e 100%)",
                color: "#0a0a0a",
                boxShadow: "0 4px 20px rgba(201,162,39,0.3)",
              }}
            >
              <Phone size={20} />
              긴급 전화상담
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S6-A. 프로세스 ═══════════ */}
      <section
        className="py-16 md:py-24"
        style={{ background: "linear-gradient(180deg, #fafaf7 0%, #ffffff 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm font-semibold mb-3" style={{ color: "#c9a227" }}>
              PROCESS
            </p>
            <h2 className="text-xl md:text-3xl font-bold" style={{ color: "#1a1a1a" }}>
              정당한 권리를 되찾기 위한
              <br />
              <span style={{ color: "#c9a227" }}>5단계 승소 전략</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* 연결선 */}
            <div
              className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(180deg, #c9a227 0%, #e5e2da 100%)" }}
            />

            {[
              {
                num: "01",
                title: "1:1 심층 상담",
                desc: "비밀이 보장되는 안전한 환경에서, 변호사가 직접 만나 현재 상황을 정밀하게 분석합니다.",
                tag: "비밀보장",
              },
              {
                num: "02",
                title: "맞춤 전략 수립 & 증거수집",
                desc: "사건의 유형과 상대방의 약점을 파악하여, 승소 확률을 최대로 높이는 맞춤 전략을 설계합니다.",
                tag: "전략설계",
              },
              {
                num: "03",
                title: "소장/서면 작성",
                desc: "변호사가 직접 작성합니다. 판사를 설득할 수 있는 논리적 구조와 증거 배치로 완성도를 높입니다.",
                tag: "변호사 직접",
              },
              {
                num: "04",
                title: "재판/조정 대리",
                desc: "법정에서 의뢰인의 이익을 최우선으로 변론합니다. 조정 과정에서도 유리한 합의를 이끌어냅니다.",
                tag: "법정대리",
              },
              {
                num: "05",
                title: "판결 및 집행",
                desc: "승소 판결 후 실제 집행까지 책임집니다. 재산분할 이행, 양육비 직접지급명령 등 결과를 현실로 만듭니다.",
                tag: "끝까지 책임",
              },
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-5 md:gap-7 mb-8 md:mb-10 relative group">
                <div
                  className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-extrabold relative z-10 transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: "#1a1a2e",
                    color: "#c9a227",
                    boxShadow: "0 4px 15px rgba(26,26,46,0.25)",
                  }}
                >
                  {step.num}
                </div>
                <div
                  className="flex-1 p-5 md:p-7 rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    backgroundColor: "#ffffff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    border: "1px solid #e5e2da",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-base md:text-lg font-bold" style={{ color: "#1a1a1a" }}>
                      {step.title}
                    </h4>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "rgba(201,162,39,0.1)", color: "#8b6914" }}
                    >
                      {step.tag}
                    </span>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: "#4a4a4a" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S6-B. FAQ ═══════════ */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold mb-3" style={{ color: "#c9a227" }}>
              FAQ
            </p>
            <h2 className="text-xl md:text-3xl font-bold" style={{ color: "#1a1a1a" }}>
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
        className="py-16 md:py-24 relative"
        style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)" }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16"
          style={{ background: "linear-gradient(180deg, #c9a227, transparent)" }}
        />

        <div className="max-w-xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-lg md:text-2xl font-bold mb-4" style={{ color: "#ffffff" }}>
              <span style={{ color: "#c9a227" }}>1:1 비공개 상담</span> 신청
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              남겨주시는 내용은 조아라 변호사에게 직접 전달됩니다.
              <br />
              가장 빠른 시간 내에{" "}
              <strong style={{ color: "#ffffff" }}>변호사가 직접 연락</strong>드립니다.
            </p>
          </div>

          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* 사건 유형 체크 */}
            <div className="mb-6">
              <p className="text-sm mb-3 font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                해당 사항을 체크해 주세요
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["재산분할", "상간소송", "양육권/양육비", "채무조정", "이혼조정/소송", "기타"].map(
                  (type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300"
                      style={{
                        backgroundColor: formData.caseTypes.includes(type)
                          ? "rgba(201,162,39,0.12)"
                          : "rgba(255,255,255,0.04)",
                        border: formData.caseTypes.includes(type)
                          ? "1px solid rgba(201,162,39,0.4)"
                          : "1px solid rgba(255,255,255,0.08)",
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
                          backgroundColor: formData.caseTypes.includes(type) ? "#c9a227" : "transparent",
                          border: formData.caseTypes.includes(type)
                            ? "none"
                            : "2px solid rgba(255,255,255,0.25)",
                        }}
                      >
                        {formData.caseTypes.includes(type) && (
                          <Check size={12} style={{ color: "#0a0a0a" }} />
                        )}
                      </span>
                      <span className="text-sm font-medium" style={{ color: "#ffffff" }}>
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
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                }}
              />
              <input
                type="tel"
                placeholder="연락처"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
                }}
              />
              <textarea
                placeholder="사건 내용을 간략히 적어주세요 (비밀보장)"
                rows={4}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="col-span-2 w-full px-4 py-3.5 rounded-lg text-sm transition-all duration-300 focus:outline-none resize-y min-h-[120px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ffffff",
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
                    backgroundColor: formData.privacyAgree ? "#c9a227" : "transparent",
                    border: formData.privacyAgree ? "none" : "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  {formData.privacyAgree && <Check size={12} style={{ color: "#0a0a0a" }} />}
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
                  [필수] 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg, #c9a227 0%, #b08d1e 100%)",
                color: "#0a0a0a",
                boxShadow: "0 4px 24px rgba(201,162,39,0.35)",
              }}
            >
              <Lock size={18} />
              1:1 비공개 상담 신청하기
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                야간/주말 문자 상담 가능 · 접수 후 24시간 내 회신
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 최종 CTA ═══════════ */}
      <section
        className="py-10"
        style={{
          backgroundColor: "#0a0a0a",
          borderTop: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <p
            className="text-sm md:text-base mb-4 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            감정이 아닌 전략으로, 당신의 정당한 권리를 되찾으세요.
          </p>
          <button
            onClick={() => scrollToSection("consultation")}
            className="inline-block px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #b08d1e 100%)",
              color: "#0a0a0a",
            }}
          >
            지금 바로 상담하기
          </button>
        </div>
      </section>

      {/* ═══════════ 푸터 ═══════════ */}
      <footer className="py-10" style={{ backgroundColor: "#050508" }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <a
            href="https://revival.kimnpartners.co.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold mb-4 transition-all duration-300 hover:opacity-80"
            style={{ color: "#ffffff" }}
          >
            법무법인 김앤파트너스 창원사무소
            <ExternalLink size={14} style={{ opacity: 0.4 }} />
          </a>

          <div
            className="flex items-center justify-center gap-2 mb-4"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <MapPin size={16} style={{ opacity: 0.5 }} />
            <span className="text-sm">경상남도 창원시 성산구 창이대로689번길 4-4 가야빌딩 4층</span>
          </div>

          <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
            본 페이지의 내용은 법률 상담의 일반적인 정보 제공을 목적으로 하며,
            <br className="hidden md:block" />
            구체적인 법률 문제에 대해서는 반드시 전문가와 상담하시기 바랍니다.
          </p>

          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025. 법무법인 김앤파트너스 All rights reserved.
          </p>
        </div>
      </footer>

      {/* ═══════════ 플로팅 버튼 ═══════════ */}
      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 flex flex-col gap-2 z-50">
        <a
          href="tel:055-266-7200"
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #b08d1e 100%)",
            color: "#0a0a0a",
            boxShadow: "0 4px 15px rgba(201,162,39,0.3)",
          }}
        >
          <Phone size={18} />
          <span className="hidden md:inline">전화상담</span>
        </a>
        <a
          href="https://pf.kakao.com/_qFXib/chat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "#FEE500",
            color: "#3C1E1E",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
          }}
        >
          <MessageSquare size={18} />
          <span className="hidden md:inline">카카오톡</span>
        </a>
        <button
          onClick={() => scrollToSection("consultation")}
          className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{
            backgroundColor: "#1a1a2e",
            color: "#c9a227",
            border: "1px solid rgba(201,162,39,0.3)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          <FileText size={18} />
          <span className="hidden md:inline">비공개상담</span>
        </button>
      </div>
    </div>
  )
}