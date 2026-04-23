import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { scrollToAbout } from "~/utils/scroll";

const slides = [
    {
        badge: "✏️ Edit Langsung",
        title: "Klik, Edit, Selesai!",
        description:
            "Lihat sesuatu yang ingin diubah? Klik saja. Ganti teks, judul, atau deskripsi halaman langsung di tempat — tanpa harus masuk ke dashboard yang rumit.",
        cta: "Coba Sekarang",
        accent: "#4A6CF7",
        bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        icon: "🖊️",
        highlights: ["Inline editing", "Auto-save", "No reload needed"],
    },
    {
        badge: "🖼️ Ganti Gambar",
        title: "Update Gambar Seketika",
        description:
            "Drag & drop gambar baru langsung ke hero, artikel, atau logo. Perubahan tampil real-time tanpa perlu refresh — pengunjung langsung melihat versi terbaru.",
        cta: "Lihat Demo",
        accent: "#7C3AED",
        bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        icon: "🖼️",
        highlights: ["Drag & drop upload", "Real-time preview", "WebP optimized"],
    },
    {
        badge: "📝 Manajemen Konten",
        title: "Artikel & Blog Tanpa Coding",
        description:
            "Tambah, edit, dan hapus artikel blog langsung dari halaman website. Rich text editor terintegrasi — cukup ketik dan publish, sesimple itu.",
        cta: "Mulai Menulis",
        accent: "#059669",
        bg: "linear-gradient(135deg, #0d1117 0%, #0a2a1a 50%, #064e3b 100%)",
        icon: "📝",
        highlights: ["Rich text editor", "Draft & publish", "SEO meta auto-fill"],
    },
    {
        badge: "⚙️ Pengaturan Website",
        title: "Ubah Nama & Identitas Situs",
        description:
            "Nama website, tagline, favicon, warna utama — semua bisa diubah langsung dari panel pengaturan yang muncul saat Anda klik. Perubahan aktif dalam hitungan detik.",
        cta: "Atur Sekarang",
        accent: "#D97706",
        bg: "linear-gradient(135deg, #1c0a00 0%, #2d1b00 50%, #1a0f00 100%)",
        icon: "⚙️",
        highlights: ["Live theme switcher", "Brand color picker", "Favicon upload"],
    },
    {
        badge: "👤 Manajemen User",
        title: "Kelola Akses & Role Pengguna",
        description:
            "Tambah admin baru, atur izin akses per bagian, dan pantau aktivitas user — langsung dari halaman website Anda. Tidak perlu SSH atau database editor.",
        cta: "Kelola User",
        accent: "#DC2626",
        bg: "linear-gradient(135deg, #1a0010 0%, #2d0020 50%, #1a0015 100%)",
        icon: "👤",
        highlights: ["Role-based access", "Activity log", "One-click invite"],
    },
];

export default component$(() => {
    const current = useSignal(0);
    const paused = useSignal(false);

    const goTo = $((idx: number) => {
        current.value = (idx + slides.length) % slides.length;
    });

    const togglePause = $(() => {
        paused.value = !paused.value;
    });

    // Auto-advance every 5 seconds (skipped when paused)
    useVisibleTask$(({ cleanup }) => {
        const timer = setInterval(() => {
            if (!paused.value) {
                current.value = (current.value + 1) % slides.length;
            }
        }, 5000);
        cleanup(() => clearInterval(timer));
    });

    const slide = slides[current.value];

    /* ── inline colour tokens (always dark bg, so force white text) ── */
    const white      = "#ffffff";
    const white70    = "rgba(255,255,255,0.70)";
    const white40    = "rgba(255,255,255,0.40)";
    const white18    = "rgba(255,255,255,0.18)";
    const white10    = "rgba(255,255,255,0.10)";
    const white08    = "rgba(255,255,255,0.08)";
    const white15    = "rgba(255,255,255,0.15)";

    return (
        <>
            <style>{`
                @keyframes hero-fade-up {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes hero-bg-pan {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float-icon {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-10px); }
                }
                @keyframes badge-pop {
                    0%   { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1);   opacity: 1; }
                }
                .hero-section {
                    transition: background 0.9s ease;
                    background-size: 200% 200%;
                    animation: hero-bg-pan 18s ease infinite;
                }
                .hero-slide-content {
                    animation: hero-fade-up 0.55s cubic-bezier(.22,1,.36,1) both;
                }
                .hero-icon {
                    animation: float-icon 4s ease-in-out infinite;
                    display: inline-block;
                }
                .hero-badge {
                    animation: badge-pop 0.45s cubic-bezier(.34,1.56,.64,1) 0.1s both;
                }
                .hero-chip {
                    animation: hero-fade-up 0.5s ease both;
                }
                .hero-chip:nth-child(1) { animation-delay: 0.25s; }
                .hero-chip:nth-child(2) { animation-delay: 0.38s; }
                .hero-chip:nth-child(3) { animation-delay: 0.51s; }
                .hero-dot {
                    height: 8px;
                    border-radius: 9999px;
                    transition: width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
                }
                .hero-dot.active { width: 32px; }
                .hero-dot:not(.active) { width: 8px; }
                .hero-ctrl-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: transform 0.2s ease, background 0.2s ease;
                    font-size: 18px;
                    line-height: 1;
                    border: 1px solid rgba(255,255,255,0.2);
                    background: rgba(255,255,255,0.10);
                    color: #fff;
                }
                .hero-ctrl-btn:hover { transform: scale(1.12); background: rgba(255,255,255,0.18); }
            `}</style>

            <section
                id="home"
                class="hero-section relative overflow-hidden"
                style={{ background: slide.bg }}
            >
                {/* Grid overlay */}
                <div
                    class="absolute inset-0 z-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px)," +
                            "linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)",
                        backgroundSize: "60px 60px",
                        opacity: "0.8",
                    }}
                />

                {/* Glowing orbs */}
                <div
                    class="absolute top-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl z-0"
                    style={{ background: slide.accent, opacity: "0.18", transition: "background 0.9s" }}
                />
                <div
                    class="absolute bottom-1/3 left-1/5 w-56 h-56 rounded-full blur-3xl z-0"
                    style={{ background: slide.accent, opacity: "0.12", transition: "background 0.9s" }}
                />

                {/* ── Main content ── */}
                <div
                    class="relative z-10 flex flex-col items-center justify-center px-4 text-center"
                    style={{ minHeight: "100vh", paddingTop: "130px", paddingBottom: "60px" }}
                >
                    {/* Slide content (re-keyed to re-trigger animation) */}
                    <div key={current.value} class="hero-slide-content mx-auto w-full max-w-3xl">

                        {/* Badge */}
                        <span
                            class="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold mb-6"
                            style={{
                                background: `${slide.accent}22`,
                                border: `1px solid ${slide.accent}55`,
                                color: white,
                            }}
                        >
                            <span
                                class="inline-block w-2 h-2 rounded-full"
                                style={{ background: slide.accent, boxShadow: `0 0 8px ${slide.accent}` }}
                            />
                            {slide.badge}
                        </span>

                        {/* Floating icon */}
                        <div class="hero-icon text-6xl mb-5 select-none">{slide.icon}</div>

                        {/* Headline — always white */}
                        <h1
                            class="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
                            style={{ color: white, textShadow: `0 0 40px ${slide.accent}55` }}
                        >
                            {slide.title}
                        </h1>

                        {/* Description — always white/70 */}
                        <p
                            class="mb-7 text-lg leading-relaxed sm:text-xl max-w-2xl mx-auto"
                            style={{ color: white70 }}
                        >
                            {slide.description}
                        </p>

                        {/* Feature chips */}
                        <div class="flex flex-wrap justify-center gap-3 mb-8">
                            {slide.highlights.map((h) => (
                                <span
                                    key={h}
                                    class="hero-chip inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium"
                                    style={{
                                        background: white08,
                                        border: `1px solid ${white15}`,
                                        color: white,
                                        backdropFilter: "blur(6px)",
                                    }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path
                                            d="M2 6l3 3 5-5"
                                            stroke={slide.accent}
                                            stroke-width="1.8"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row mb-10">
                            <button
                                onClick$={scrollToAbout}
                                class="rounded-xl px-8 py-4 text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                                style={{
                                    background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}bb)`,
                                    boxShadow: `0 8px 28px ${slide.accent}44`,
                                    color: white,
                                }}
                            >
                                {slide.cta} →
                            </button>
                            <button
                                onClick$={scrollToAbout}
                                class="rounded-xl px-8 py-4 text-base font-semibold transition-all duration-300 hover:scale-105 cursor-pointer"
                                style={{
                                    background: white10,
                                    border: `1px solid ${white18}`,
                                    backdropFilter: "blur(8px)",
                                    color: white70,
                                }}
                            >
                                Pelajari Lebih Lanjut 💡
                            </button>
                        </div>
                    </div>

                    {/* ── Slideshow controls (NOT absolute — sits below CTAs) ── */}
                    <div class="flex flex-col items-center gap-3">

                        {/* Dot indicators */}
                        <div class="flex items-center gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick$={() => goTo(i)}
                                    class={`hero-dot cursor-pointer ${i === current.value ? "active" : ""}`}
                                    style={{
                                        background: i === current.value ? slide.accent : "rgba(255,255,255,0.30)",
                                        boxShadow: i === current.value ? `0 0 8px ${slide.accent}` : "none",
                                    }}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Prev / Pause / Next row */}
                        <div class="flex items-center gap-3">
                            {/* Prev */}
                            <button
                                onClick$={() => goTo(current.value - 1)}
                                class="hero-ctrl-btn"
                                aria-label="Previous slide"
                            >
                                ‹
                            </button>

                            {/* Counter */}
                            <span
                                class="text-xs font-mono w-10 text-center select-none"
                                style={{ color: white40 }}
                            >
                                {current.value + 1}/{slides.length}
                            </span>

                            {/* Pause / Play */}
                            <button
                                onClick$={togglePause}
                                class="hero-ctrl-btn"
                                aria-label={paused.value ? "Play slideshow" : "Pause slideshow"}
                                title={paused.value ? "Play" : "Pause"}
                            >
                                {paused.value ? "▶" : "⏸"}
                            </button>

                            {/* Next */}
                            <button
                                onClick$={() => goTo(current.value + 1)}
                                class="hero-ctrl-btn"
                                aria-label="Next slide"
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
});
