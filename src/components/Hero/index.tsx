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

    const goTo = $((idx: number) => {
        current.value = (idx + slides.length) % slides.length;
    });

    // Auto-advance every 5 seconds
    useVisibleTask$(({ cleanup }) => {
        const timer = setInterval(() => {
            current.value = (current.value + 1) % slides.length;
        }, 5000);
        cleanup(() => clearInterval(timer));
    });

    const slide = slides[current.value];

    return (
        <>
            <style>{`
                @keyframes hero-fade-up {
                    from { opacity: 0; transform: translateY(32px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes hero-bg-pan {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50%      { transform: translateY(-12px); }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                @keyframes badge-pop {
                    0%   { transform: scale(0.8); opacity: 0; }
                    100% { transform: scale(1);   opacity: 1; }
                }
                .hero-slide-content {
                    animation: hero-fade-up 0.6s cubic-bezier(.22,1,.36,1) both;
                }
                .hero-icon-wrap {
                    animation: float 4s ease-in-out infinite;
                }
                .hero-badge {
                    animation: badge-pop 0.5s cubic-bezier(.34,1.56,.64,1) 0.15s both;
                }
                .hero-bg {
                    transition: background 0.8s ease;
                    background-size: 200% 200%;
                    animation: hero-bg-pan 15s ease infinite;
                }
                .dot-btn {
                    transition: all 0.3s ease;
                }
                .dot-btn.active {
                    width: 2rem;
                }
                .highlight-chip {
                    animation: hero-fade-up 0.5s ease both;
                }
                .highlight-chip:nth-child(1) { animation-delay: 0.3s; }
                .highlight-chip:nth-child(2) { animation-delay: 0.45s; }
                .highlight-chip:nth-child(3) { animation-delay: 0.6s; }
            `}</style>

            <section
                id="home"
                class="hero-bg relative overflow-hidden"
                style={{ background: slide.bg, minHeight: "100vh" }}
            >
                {/* Animated mesh/grid overlay */}
                <div
                    class="absolute inset-0 z-0 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Glowing orbs */}
                <div
                    class="absolute top-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 z-0"
                    style={{ background: slide.accent, transition: "background 0.8s" }}
                />
                <div
                    class="absolute bottom-1/4 left-1/4 w-60 h-60 rounded-full blur-3xl opacity-15 z-0"
                    style={{ background: slide.accent, transition: "background 0.8s" }}
                />

                {/* Content */}
                <div
                    class="relative z-10 flex flex-col items-center justify-center px-4 text-center"
                    style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px" }}
                >
                    <div key={current.value} class="hero-slide-content mx-auto max-w-4xl">

                        {/* Badge */}
                        <span
                            class="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold mb-8"
                            style={{
                                background: `${slide.accent}22`,
                                border: `1px solid ${slide.accent}55`,
                                color: "#fff",
                            }}
                        >
                            <span
                                class="inline-block w-2 h-2 rounded-full"
                                style={{ background: slide.accent, boxShadow: `0 0 8px ${slide.accent}` }}
                            />
                            {slide.badge}
                        </span>

                        {/* Big icon */}
                        <div class="hero-icon-wrap text-7xl mb-6 select-none">{slide.icon}</div>

                        {/* Headline */}
                        <h1
                            class="mb-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl"
                            style={{ textShadow: `0 0 40px ${slide.accent}66` }}
                        >
                            {slide.title}
                        </h1>

                        {/* Description */}
                        <p class="mb-8 text-lg leading-relaxed text-white/70 sm:text-xl max-w-2xl mx-auto">
                            {slide.description}
                        </p>

                        {/* Feature chips */}
                        <div class="flex flex-wrap justify-center gap-3 mb-10">
                            {slide.highlights.map((h) => (
                                <span
                                    key={h}
                                    class="highlight-chip inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium"
                                    style={{
                                        background: "rgba(255,255,255,0.08)",
                                        border: "1px solid rgba(255,255,255,0.15)",
                                        color: "#fff",
                                        backdropFilter: "blur(4px)",
                                    }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke={slide.accent} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {h}
                                </span>
                            ))}
                        </div>

                        {/* CTA buttons */}
                        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <button
                                onClick$={scrollToAbout}
                                class="rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
                                style={{
                                    background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                                    boxShadow: `0 8px 32px ${slide.accent}55`,
                                }}
                            >
                                {slide.cta} →
                            </button>
                            <button
                                onClick$={scrollToAbout}
                                class="rounded-xl px-8 py-4 text-base font-semibold text-white/80 transition-all duration-300 hover:text-white hover:scale-105 cursor-pointer"
                                style={{
                                    background: "rgba(255,255,255,0.07)",
                                    border: "1px solid rgba(255,255,255,0.18)",
                                    backdropFilter: "blur(8px)",
                                }}
                            >
                                Pelajari Lebih Lanjut 💡
                            </button>
                        </div>
                    </div>

                    {/* Slide counter */}
                    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                        {/* Dot indicators */}
                        <div class="flex items-center gap-2">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    onClick$={() => goTo(i)}
                                    class={`dot-btn h-2 rounded-full cursor-pointer ${i === current.value ? "active" : "w-2"}`}
                                    style={{
                                        background: i === current.value ? slide.accent : "rgba(255,255,255,0.3)",
                                        boxShadow: i === current.value ? `0 0 8px ${slide.accent}` : "none",
                                    }}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Prev / Next arrows */}
                        <div class="flex gap-3">
                            <button
                                onClick$={() => goTo(current.value - 1)}
                                class="flex h-9 w-9 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    color: "#fff",
                                }}
                                aria-label="Previous slide"
                            >
                                ‹
                            </button>
                            <span class="flex items-center text-xs text-white/40 font-mono">
                                {current.value + 1} / {slides.length}
                            </span>
                            <button
                                onClick$={() => goTo(current.value + 1)}
                                class="flex h-9 w-9 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110"
                                style={{
                                    background: "rgba(255,255,255,0.1)",
                                    border: "1px solid rgba(255,255,255,0.2)",
                                    color: "#fff",
                                }}
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
