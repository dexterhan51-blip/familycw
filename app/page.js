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
  primary: "#1e3a5f",      // 딥 네이비 - 헤더, CTA 띠, 상담폼 배경
  accent: "#5eb5e4",       // 스카이블루 - 버튼, 태그, 강조 포인트
  accentLight: "#e8f4fb",  // 연한 스카이블루 - 아이콘/라벨 배경
  primaryBg: "#f0f4f8",    // 아주 연한 배경
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
        backgroundColor: isOpen ? COLORS.accentLight : COLORS.white,
        border: isOpen ? `1px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
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
          style={{ color: isOpen ? COLORS.accent : COLORS.textMuted }}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <p
          className="px-5 md:px-6 pb-5 md:pb-6 text-sm leading-relaxed"
          style={{ color: COLORS.textLight }}
          dangerouslySetInnerHTML={{ __html: answer.replace(/#c9a227/g, COLORS.accent) }}
        />
      </div>
    </div>
  )
}

/* ── 메인 랜딩 ── */
export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [openPost, setOpenPost] = useState(null)
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
      question: "이혼 상담을 받고 싶은데, 주변이나 가족에게 알려질까 봐 걱정돼요.",
      answer:
        `모든 상담은 변호사법에 따라 <strong style="color:${COLORS.accent};">철저히 비밀이 보장</strong>됩니다. 기록이 남지 않는 보안 시스템을 운영하며, 가족이나 직장에 알려지지 않도록 안심하고 상담받으실 수 있는 환경을 약속드립니다.`,
    },
    {
      question: "창원 지역 변호사를 꼭 찾아야 하는 이유가 있나요?",
      answer:
        `이혼/상간 소송은 지역 법원마다의 판결 성향과 위자료 기준이 미묘하게 다릅니다. 저희는 <strong style="color:${COLORS.accent};">창원 성산구에서 창원지방법원의 특성을 가장 잘 이해</strong>하고 있는 지역 밀착형 전문가로서 최적의 전략을 제시합니다.`,
    },
    {
      question: "남편이 빚만 몇 억이라는데, 제가 대신 갚아야 하거나 재산을 못 받을까 봐 무서워요.",
      answer:
        `배우자의 은닉 재산(예금, 부동산, 주식 등)은 <strong style="color:${COLORS.accent};">법적 절차로 끝까지 찾아내며</strong>, 혼인 중 형성된 빚은 철저히 따져 의뢰인에게 부당한 책임이 전가되지 않도록 당신의 정당한 재산권을 지켜드립니다.`,
    },
    {
      question: "증거가 하나도 없는데 승소할 수 있을까요?",
      answer:
        `물증이 부족하더라도 <strong style="color:${COLORS.accent};">정황 증거와 법적 조력을 통한 사실조회 신청</strong>으로 충분히 입증 가능합니다. 불법적인 증거 수집으로 피해를 보지 않도록, 안전하고 확실한 증거 확보를 처음부터 끝까지 도와드립니다.`,
    },
    {
      question: "변호사 선임 비용이 너무 비싸지는 않을까요?",
      answer:
        `<strong style="color:${COLORS.accent};">투명하고 합리적인 수임 제도</strong>를 운영하고 있습니다. 사건 난이도에 맞는 정직한 비용을 안내해 드리며, 승소 시 상대방에게 변호사 비용을 청구하여 의뢰인의 경제적 부담을 최소화하는 전략도 함께 세워드립니다.`,
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
                  color: COLORS.accent,
                  backgroundColor: COLORS.accentLight,
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
                <span style={{ color: COLORS.accent }}>팩트로 승부합니다.</span>
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
                    backgroundColor: COLORS.accent,
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

              {/* 하단 태그 - 클릭시 유튜브 섹션으로 이동 */}
              <div className="flex flex-wrap gap-2">
                {["이혼소송", "상간소송", "위자료", "재산분할", "양육권/양육비"].map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection("youtube")}
                    className="px-3 py-1.5 rounded-lg text-sm transition-all duration-300 hover:opacity-70 cursor-pointer"
                    style={{
                      backgroundColor: COLORS.accentLight,
                      color: COLORS.accent,
                    }}
                  >
                    {tag}
                  </button>
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
                  style={{ backgroundColor: COLORS.accentLight }}
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
      <section id="youtube" className="py-20 md:py-28" style={{ backgroundColor: COLORS.white }}>
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              MEET FIRST
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: COLORS.text }}>
              상담 전, 영상으로 먼저 만나보세요
            </h2>
            <p className="text-base" style={{ color: COLORS.textLight }}>
              어떤 변호사인지 미리 확인하고 상담하세요
            </p>
          </div>

          {/* 영상 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                id: "FfmtVR9BQ_4",
                url: "https://go.knp-law.com/4ko6jLE",
                title: "이혼절차 총정리",
                desc: "이혼 전 꼭 알아야 할 절차, 변호사가 직접 설명해 드립니다",
                icon: FileText,
              },
              {
                id: "LlkoShrE6pU",
                url: "https://go.knp-law.com/4qqfpZN",
                title: "재산분할",
                desc: "12억 남편 vs 200만 원 아내, 재산분할 충격 결과는?",
                icon: Scale,
              },
              {
                id: "MigyrrJ8UVY",
                url: "https://go.knp-law.com/4r4OaoG",
                title: "상간소송",
                desc: "내가 받을 수 있는 위자료는 얼마일까? 금액 산정 기준의 모든 것",
                icon: Gavel,
              },
              {
                id: "o7_VRL3seVQ",
                url: "https://go.knp-law.com/4ayWpU1",
                title: "양육비·양육권",
                desc: "양육비 줄 돈은 없다더니 카드값은 200? 양육비 안 주는 전남편 대처법",
                icon: Users,
              },
            ].map((video) => (
              <a
                key={video.id}
                href={video.url}
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
                      style={{ backgroundColor: COLORS.accent }}
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
                    <video.icon size={16} style={{ color: COLORS.accent }} />
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
              href="https://go.knp-law.com/46zmnUZ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: COLORS.accentLight,
                color: COLORS.accent,
              }}
            >
              <Youtube size={18} />
              유튜브 채널에서 더 많은 영상 보기
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ S2. 문제 공감 (익명 게시판 스타일) ═══════════ */}
      <section className="py-20 md:py-28" style={{ backgroundColor: COLORS.bg }}>
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          {/* 헤더 */}
          <div className="text-center mb-14">
            <p className="text-base md:text-lg mb-3" style={{ color: COLORS.accent }}>
              지금 이 순간에도
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              같은 고민을 하고 있는 분들이 있습니다.
            </h2>
          </div>

          {/* 익명 게시판 */}
          <div
            className="max-w-2xl mx-auto rounded-2xl overflow-hidden"
            style={{ backgroundColor: COLORS.white, border: `1px solid ${COLORS.border}` }}
          >
            {/* 게시판 헤더 */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ backgroundColor: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}
            >
              <span className="text-xs font-semibold" style={{ color: COLORS.textMuted }}>이혼 고민 게시판</span>
              <span className="text-xs" style={{ color: COLORS.textMuted }}>오늘의 글</span>
            </div>

            {/* 게시글 목록 */}
            <div className="flex flex-col">
              {[
                {
                  nickname: "alks***",
                  time: "2시간 전",
                  text: "증거가 부족한데 상간 소송 가능할까요?",
                  detail: "결혼 8년 차인데 남편이 바람을 피우고 있다는 걸 알게 됐어요. 그런데 확실한 사진이나 영상 같은 증거가 없고, 카톡 대화 몇 개랑 늦은 귀가 정도밖에 없어요. 주변에서는 증거 없으면 소송해도 진다고 하는데… 정말 이것만으로는 안 되는 건가요? 너무 억울해서 밤마다 잠을 못 자고 있습니다.",
                  views: "1,247",
                  comments: "12",
                },
                {
                  nickname: "hmj0***",
                  time: "5시간 전",
                  text: "전업주부인데 재산분할 제대로 받을 수 있나요?",
                  detail: "결혼 15년 동안 아이 둘 키우면서 집안일만 했어요. 남편 명의로 된 아파트, 자동차, 예금 전부 남편이 번 돈이라 제 몫이 없다고 하더라고요. 시어머니까지 나서서 '니가 뭘 했다고 재산을 달라는 거냐'고… 정말 전업주부는 아무것도 받을 수 없는 건가요?",
                  views: "2,031",
                  comments: "23",
                },
                {
                  nickname: "sun8***",
                  time: "8시간 전",
                  text: "남편 빚만 몇 천인데, 저보고 대신 갚으라고 하면 어쩌죠?",
                  detail: "남편이 사업한다면서 제 모르게 대출을 엄청 받아놨어요. 최근에 알게 됐는데 몇 천만 원이 넘더라고요. 이혼하면 빚도 반반 나눠야 한다는 말이 있던데, 제가 모르는 사이에 진 빚도 제가 갚아야 하나요? 아이도 있는데 정말 막막합니다.",
                  views: "3,482",
                  comments: "7",
                },
              ].map((post, index) => (
                <div
                  key={index}
                  style={{ borderBottom: index < 2 ? `1px solid ${COLORS.border}` : "none" }}
                >
                  <button
                    onClick={() => setOpenPost(openPost === index ? null : index)}
                    className="w-full px-5 py-4 text-left transition-all duration-300 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{ backgroundColor: COLORS.accentLight, color: COLORS.accent }}
                      >
                        익
                      </span>
                      <span className="text-xs font-medium" style={{ color: COLORS.textMuted }}>{post.nickname}</span>
                      <span className="text-xs" style={{ color: COLORS.textMuted }}>·</span>
                      <span className="text-xs" style={{ color: COLORS.textMuted }}>{post.time}</span>
                    </div>
                    <p className="text-sm md:text-base font-medium leading-relaxed mb-2" style={{ color: COLORS.text }}>
                      {post.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xs" style={{ color: COLORS.textMuted }}>조회 {post.views}</span>
                        <span className="text-xs" style={{ color: COLORS.textMuted }}>댓글 {post.comments}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-300 ${openPost === index ? "rotate-180" : ""}`}
                        style={{ color: COLORS.textMuted }}
                      />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openPost === index ? "max-h-[500px]" : "max-h-0"}`}>
                    <div className="px-5 pb-5">
                      <div
                        className="p-4 rounded-xl text-sm leading-relaxed mb-4"
                        style={{ backgroundColor: COLORS.bg, color: COLORS.textLight }}
                      >
                        {post.detail}
                      </div>
                      <button
                        onClick={() => scrollToSection("consultation")}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
                      >
                        <MessageSquare size={16} />
                        내 상황과 비슷하다면? 지금 바로 상담 신청
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                title: "내 일처럼 해결하는 변호사",
                desc: "사무장 없이 변호사가 직접 의뢰인과 소통하며 사건을 진행합니다. 높은 품질의 서비스를 위해 수임 건수를 제한하고 있으며, 맡은 사건 하나하나에 최선을 다합니다.",
              },
              {
                num: "02",
                icon: Search,
                title: "디테일한 집요함",
                desc: "문자 한 통, 카드 내역 하나, SNS 게시물 하나도 놓치지 않습니다. 법원 사실조회·금융거래 추적·부동산 등기 분석까지, 작은 단서에서 시작해 승소의 결정적 증거를 만들어냅니다.",
              },
              {
                num: "03",
                icon: Shield,
                title: "재산분할에 특화된 변호사",
                desc: "이혼 전문 + 회생/파산 전문 이중 자격을 보유한 변호사가 상대방의 은닉 재산을 끝까지 찾아내고, 최대한의 재산분할을 이끌어냅니다.",
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
                  style={{ color: COLORS.accentLight }}
                >
                  {card.num}
                </div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: COLORS.accentLight }}
                >
                  <card.icon size={24} style={{ color: COLORS.accent }} />
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
          <div className="text-center mb-6">
            <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
              REAL CASES
            </p>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: COLORS.text }}>
              판결문으로 증명하는 실제 승소 사례
            </h2>
            <p className="text-sm mt-3" style={{ color: COLORS.textMuted }}>
              * 의뢰인 보호를 위해 개인정보는 비공개 처리되었습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                type: "재산분할",
                icon: Scale,
                image: "/images/successful case 1.png",
                title: "비상장 주식까지 추적, 재산분할 7억 확보",
                desc: "남편이 비상장 주식·법인 명의 자산으로 재산을 숨겼으나, 법원 사실조회와 기업 회계 분석을 통해 은닉 자산을 전부 밝혀냈습니다. 아내의 가사노동 기여도를 적극 주장하여 재산분할 7억 원을 확보한 사례입니다.",
                result: "재산분할 7억 원 확보",
              },
              {
                type: "이혼소송",
                icon: Gavel,
                image: "/images/successful case 2.png",
                title: "바람피운 남편 상대 이혼 승소 + 위자료 확보",
                desc: "남편의 반복적인 외도로 혼인관계가 파탄난 사건. 카드 내역·숙박 기록·메신저 대화 등 정황 증거를 체계적으로 정리하여 유책배우자임을 입증하고, 이혼 판결과 함께 재산분할과 더불어 위자료까지 받아낸 사례입니다.",
                result: "이혼 승소 + 위자료 인용",
              },
              {
                type: "상간소송",
                icon: Users,
                image: "/images/successful case 3.png",
                title: "인스타그램 증거로 상간 관계 입증 성공",
                desc: "요즘 많이 사용하는 인스타그램 게시물·스토리·위치 태그·댓글 등 SNS 증거를 활용하여 배우자와 상간자의 부정행위를 입증했습니다. 디지털 증거 분석 전략이 판결을 이끌어낸 대표적인 승소 사례입니다.",
                result: "상간 위자료 전액 인용",
              },
            ].map((caseItem, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {/* 케이스 헤더 */}
                <div
                  className="px-6 py-4 flex items-center justify-between"
                  style={{ backgroundColor: COLORS.bg, borderBottom: `1px solid ${COLORS.border}` }}
                >
                  <div className="flex items-center gap-3">
                    <caseItem.icon size={18} style={{ color: COLORS.accent }} />
                    <span className="text-sm font-semibold" style={{ color: COLORS.text }}>
                      {caseItem.type}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: COLORS.textMuted }}>
                    실제 판결
                  </span>
                </div>

                {/* 판결문 이미지 */}
                <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ backgroundColor: COLORS.bg }}>
                  <Image
                    src={caseItem.image}
                    alt={`${caseItem.type} 판결문`}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* 사건 제목 */}
                  <h4 className="text-base font-bold mb-3 leading-snug" style={{ color: COLORS.text }}>
                    {caseItem.title}
                  </h4>

                  {/* 사건 설명 */}
                  <p className="text-sm leading-relaxed mb-5" style={{ color: COLORS.textLight }}>
                    {caseItem.desc}
                  </p>

                  {/* 판결 결과 */}
                  <div
                    className="p-4 rounded-xl text-center mt-auto"
                    style={{ backgroundColor: COLORS.accentLight, border: `1px solid ${COLORS.accent}30` }}
                  >
                    <span className="block text-xs mb-1 font-semibold" style={{ color: COLORS.accent }}>
                      판결 결과
                    </span>
                    <span className="block text-lg font-bold" style={{ color: COLORS.accent }}>
                      {caseItem.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 더 많은 성공사례 버튼 */}
          <div className="text-center mt-10">
            <a
              href="https://go.knp-law.com/4cbA2VR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: COLORS.accentLight,
                color: COLORS.accent,
              }}
            >
              <ExternalLink size={16} />
              더 많은 성공사례 확인하기
            </a>
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
                  style={{ backgroundColor: COLORS.accentLight }}
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
              <p className="text-sm font-medium mb-2" style={{ color: COLORS.accent }}>
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
                  style={{ color: COLORS.textLight, borderLeft: `3px solid ${COLORS.accent}`, paddingLeft: "1rem" }}
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
                  '유튜브 "조아라하는창원변호사" 채널 운영',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm" style={{ color: COLORS.textLight }}>
                    <BadgeCheck
                      size={18}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: COLORS.accent }}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* 유튜브 링크 */}
              <a
                href="https://go.knp-law.com/46zmnUZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:opacity-80"
                style={{ backgroundColor: COLORS.accent, color: COLORS.white }}
              >
                <Youtube size={18} />
                유튜브에서 확인하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 긴급 CTA 띠 ═══════════ */}
      <section className="py-10" style={{ backgroundColor: COLORS.bg, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div>
              <p className="text-sm mb-1" style={{ color: COLORS.textMuted }}>
                이혼 소송, 골든타임을 놓치면
              </p>
              <p className="text-base md:text-lg font-semibold" style={{ color: COLORS.text }}>
                증거도 재산도 사라집니다.
              </p>
            </div>
            <a
              href="tel:055-266-7200"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.white,
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
                    backgroundColor: COLORS.accent,
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
                          backgroundColor: formData.caseTypes.includes(type) ? COLORS.accent : "transparent",
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
                    backgroundColor: formData.privacyAgree ? COLORS.accent : "transparent",
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
                backgroundColor: COLORS.accent,
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
            href="https://go.knp-law.com/4afkhdV"
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
