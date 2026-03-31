import { useState } from "react";

const NAV = ["Inici", "Habitacions", "La Casa", "L'Entorn", "Reserves", "Contacte"];

const SERVICES = [
  { icon: "❄️", label: "Aire condicionat" },
  { icon: "🔥", label: "Calefacció" },
  { icon: "📶", label: "WiFi gratuït" },
  { icon: "📺", label: "Smart TV" },
  { icon: "🧊", label: "Nevera" },
  { icon: "🍷", label: "Servei de sopars" },
  { icon: "🥐", label: "Esmorzar" },
  { icon: "🪵", label: "Llar de foc" },
  { icon: "🐾", label: "Mascotes" },
  { icon: "🗺️", label: "Què fer" },
  { icon: "📚", label: "Biblioteca" },
  { icon: "🍸", label: "Gin & Tonic" },
];

const ROOM_IMGS = [
  { label: "Suite 1", color: "#b5a48a" },
  { label: "Suite 2", color: "#9a8a72" },
  { label: "Suite 3", color: "#c4b09a" },
];
const HOUSE_IMGS = [
  { color: "#c8b89a" },
  { color: "#baa88a" },
  { color: "#d4c4a8" },
];
const ENTORN_IMGS = [
  { color: "#7a9a68" },
  { color: "#8aaa78" },
  { color: "#6a8a58" },
];

export default function App() {
  const [page, setPage] = useState("Inici");
  const go = (p) => setPage(p);

  const s = {
    wrap: { fontFamily: "'Georgia', serif", color: "#2c2a25", background: "#faf8f4" },
    nav: {
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2rem", height: 56, background: "#fff",
      borderBottom: "0.5px solid #e0dbd0", position: "sticky", top: 0, zIndex: 100
    },
    logo: { fontWeight: 600, fontSize: 17, letterSpacing: "0.03em", color: "#5a3e28", fontFamily: "Georgia, serif", cursor: "pointer" },
    navLinks: { display: "flex", gap: 2 },
    navBtn: (active) => ({
      background: active ? "#f0ebe2" : "transparent", border: "none",
      padding: "6px 13px", borderRadius: 20, cursor: "pointer",
      fontSize: 13, color: active ? "#5a3e28" : "#777",
      fontWeight: active ? 600 : 400, fontFamily: "Arial, sans-serif"
    }),
  };

  if (page !== "Inici") {
    return (
      <div style={s.wrap}>
        <nav style={s.nav}>
          <span style={s.logo} onClick={() => go("Inici")}>Casa Rural Bonavista</span>
          <div style={s.navLinks}>
            {NAV.map(n => <button key={n} style={s.navBtn(page === n)} onClick={() => go(n)}>{n}</button>)}
          </div>
        </nav>
        <div style={{ padding: "3rem 2rem", maxWidth: 820, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Georgia, serif", color: "#3a2a18", fontWeight: 500 }}>{page}</h2>
          <p style={{ color: "#888", fontFamily: "Arial, sans-serif", fontSize: 14 }}>Contingut de la secció "{page}" — pròximament.</p>
          <button onClick={() => go("Inici")} style={{ background: "#5a3e28", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 14 }}>← Tornar a l'inici</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <nav style={s.nav}>
        <span style={s.logo}>Casa Rural Bonavista</span>
        <div style={s.navLinks}>
          {NAV.map(n => <button key={n} style={s.navBtn(n === "Inici")} onClick={() => go(n)}>{n}</button>)}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", width: "100%", minHeight: 520, background: "#c4b090", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/El_Lloar_%28Priorat%29.jpg/1440px-El_Lloar_%28Priorat%29.jpg"
          alt="El Lloar, Priorat"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,12,4,0.35) 0%, rgba(20,12,4,0.55) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem 5rem" }}>
          <p style={{ fontSize: 13, color: "#f0e0c0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.5rem", fontFamily: "Arial, sans-serif" }}>Turisme rural · El Lloar · Priorat</p>
          <h1 style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif", fontSize: 54, fontWeight: 700, color: "#fff", margin: "0 0 0.6rem", letterSpacing: "0.04em", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
            Casa rural Bonavista
          </h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 22, color: "#f0e8d8", margin: "0 0 1.2rem", fontWeight: 400, textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
            Benvinguts al cor del Priorat
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#f5e8d0", fontStyle: "italic" }}>Only Adults</span>
            <span style={{ color: "#c8a878" }}>·</span>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#f5e8d0", fontStyle: "italic" }}>Vine amb el teu animal de companyia</span>
          </div>
          <button onClick={() => go("Reserves")} style={{ background: "#5a3e28", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "14px 44px", borderRadius: 4, fontSize: 15, cursor: "pointer", fontFamily: "Arial, sans-serif", fontWeight: 700, letterSpacing: "0.12em" }}>
            RESERVAR
          </button>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
            <path d="M0,20 C300,70 900,0 1440,50 L1440,70 L0,70 Z" fill="#faf8f4" />
          </svg>
        </div>
      </div>

      {/* HABITACIONS */}
      <div style={{ background: "#faf8f4", padding: "3rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>Habitacions</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#999", margin: "0 0 2rem" }}>2 suites dobles · 1 suite quàdruple · Màx. 8 persones</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
          {ROOM_IMGS.map((r) => (
            <div key={r.label} onClick={() => go("Habitacions")} style={{ cursor: "pointer", position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "2/3", background: r.color }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 600, color: "#fff", letterSpacing: "0.04em" }}>{r.label}</p>
                <p style={{ margin: "2px 0 0", fontFamily: "Arial, sans-serif", fontSize: 12, color: "#e0d0c0" }}>Veure detalls →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70, marginBottom: -1 }}>
        <path d="M0,0 C400,70 1000,10 1440,55 L1440,70 L0,70 Z" fill="#f0ebe2" />
      </svg>

      {/* LA CASA */}
      <div style={{ background: "#f0ebe2", padding: "2rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>La Casa</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#9a8060", margin: "0 0 2rem" }}>Casa de pedra restaurada al nucli d'El Lloar</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
          {HOUSE_IMGS.map((r, i) => (
            <div key={i} onClick={() => go("La Casa")} style={{ cursor: "pointer", position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", background: r.color }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
              <div style={{ position: "absolute", bottom: 8, right: 12 }}>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#fff", opacity: 0.8 }}>Veure →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70, marginBottom: -1 }}>
        <path d="M0,55 C500,0 900,70 1440,20 L1440,70 L0,70 Z" fill="#e8f0e0" />
      </svg>

      {/* L'ENTORN */}
      <div style={{ background: "#e8f0e0", padding: "2rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#2a3a20", textAlign: "center", margin: "0 0 0.4rem" }}>L'Entorn</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#6a8060", margin: "0 0 2rem" }}>Vinyes, gorgs, cellers i paisatge de pissarra</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
          {ENTORN_IMGS.map((r, i) => (
            <div key={i} onClick={() => go("L'Entorn")} style={{ cursor: "pointer", position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "4/3", background: r.color }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
              <div style={{ position: "absolute", bottom: 8, right: 12 }}>
                <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#fff", opacity: 0.8 }}>Descobrir →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70, marginBottom: -1 }}>
        <path d="M0,30 C360,70 1080,0 1440,45 L1440,70 L0,70 Z" fill="#fdf8f0" />
      </svg>

      {/* SERVEIS */}
      <div style={{ background: "#fdf8f0", padding: "2rem 2rem 3.5rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>Serveis</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#9a8060", margin: "0 0 2.5rem" }}>Tot el que necessites per gaudir al màxim</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, maxWidth: 820, margin: "0 auto" }}>
          {SERVICES.map(sv => (
            <div key={sv.label} style={{ background: "#fff", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1.25rem 0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{sv.icon}</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#7a5a3a", fontWeight: 500, lineHeight: 1.4 }}>{sv.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#3a2a18", color: "#c8b89a", textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, letterSpacing: "0.05em" }}>CASA RURAL BONAVISTA</p>
        <p style={{ margin: 0, opacity: 0.6, fontSize: 13 }}>El Lloar · Priorat · casabonavista.cat</p>
      </div>
    </div>
  );
}