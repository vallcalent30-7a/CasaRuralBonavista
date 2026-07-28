// Casa Rural Bonavista — App.jsx
// Versió: v2.0 — 20 juliol 2026
// Afegit el logo real (imatge) a la barra de navegació i al peu de pàgina,
// referenciat com a /logo.png. CAL pujar el fitxer logo.png a la carpeta
// "public/" de l'arrel del projecte a StackBlitz (mateix nivell que src/)
// perquè es serveixi correctament a producció.
// Versió: v1.9 — 20 juliol 2026
// - Renumeració de suites: Suite 3 = quàdruple amb balcó privatiu (la "més
//   especial"); Suite 1 = petita; Suite 2 = mitjana. Actualitzat a SUITES,
//   ROOM_IMGS, TARIFES i totes les condicions suite === "Suite X" a Reserves.
// - Eliminades totes les referències a sopar al balcó (mai se sopa al balcó).
// - Nou Pack Romàntic: experiència d'1 nit exclusiva de la Suite 3, 180€ tot
//   inclòs (detall de benvinguda, sopar amb espelmes, vi DOQ Priorat), es
//   reserva com a afegit a una nit ja reservada de la Suite 3 (pas 3 de
//   Reserves: casella + selector de nit, preu total i missatge de
//   confirmació actualitzats en conseqüència).
// - Preus de la pàgina Habitacions ara llegeixen sempre de TARIFES (font
//   única de veritat), coherents amb els preus mostrats a Reserves.
// Versió: v1.8 — 13 juliol 2026
// Afegida casella de consentiment RGPD obligatòria al pas 3 de Reserves
// (abans no n'hi havia cap, tot i recollir nom/email/telèfon/notes). Ara
// l'enviament es bloqueja sense acceptar, amb validació de nom/email i
// missatges d'error clars, igual que a Contacte.
// Versió: v1.7 — 13 juliol 2026
// Totes les graelles de columnes fixes (gridTemplateColumns: "1fr 1fr",
// "repeat(3, 1fr)", "repeat(4, 1fr)") s'han canviat a
// "repeat(auto-fit, minmax(Xpx, 1fr))", perquè s'apilin automàticament en
// pantalles estretes en lloc de comprimir-se en columnes massa fines.
// Versió: v1.6 — 13 juliol 2026
// CAUSA CONFIRMADA I RESOLTA del bug "Contacte en blanc": l'iframe incrustat
// de Google Maps trencava el render en producció (motiu exacte no confirmat:
// probablement una restricció de seguretat del navegador o de la xarxa que
// StackBlitz no aplica). Substituït per un enllaç "Obrir a Google Maps" que
// s'obre en pestanya nova — sense iframe, sense crash, i sense carregar cap
// recurs de Google fins que l'usuari hi clica.
//
// Historial: v1.3 va afegir l'ErrorBoundary d'App. v1.2 va corregir el
// plural "persona/persones". v1.1 va introduir la selecció de dates per
// rang a Reserves. v1.0 va corregir el formulari de Contacte (enviament
// mailto, honeypot, validació d'email).

import { useState, Component } from "react";

// Xarxa de seguretat: si qualsevol pàgina llança un error durant el render,
// React buida tot #root per defecte (sense menú ni contingut — pantalla en blanc).
// Aquest ErrorBoundary intercepta l'error i el mostra en pantalla, per poder
// diagnosticar-lo sense necessitat d'obrir la consola del navegador.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "3rem 2rem", maxWidth: 700, margin: "0 auto", color: "#3a2a18", background: "#faf8f4", minHeight: "100vh", boxSizing: "border-box" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, marginBottom: 8 }}>Hi ha hagut un error en aquesta pàgina</h1>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Fes una captura d'aquest missatge i envia'l per continuar el diagnòstic:</p>
          <pre style={{ background: "#f0ebe2", padding: "1rem", borderRadius: 8, overflow: "auto", fontSize: 13, whiteSpace: "pre-wrap", border: "0.5px solid #e0dbd0" }}>
            {String(this.state.error && this.state.error.message)}
          </pre>
          <button onClick={() => { this.setState({ error: null }); window.location.href = "/"; }} style={{ background: "#5a3e28", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, marginTop: 16 }}>
            Tornar a l'inici
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
  { icon: "🗺️", label: "Què fer" },
  { icon: "📚", label: "Biblioteca" },
  { icon: "🍸", label: "Gin & Tonic" },
];

// Numeració de suites (fixada): Suite 1 = petita, Suite 2 = mitjana,
// Suite 3 = quàdruple amb balcó privatiu (la "més especial").
const SUITES = [
  {
    id: "Suite 1", tipus: "Doble", color: "#9a8a72", capacitat: 2,
    descripcio: "Suite doble, la més petita de la casa, amb tots els elements per a una estada perfecta al Priorat. Tranquil·litat, confort i l'encant d'una casa de pedra restaurada al nucli d'El Lloar.",
    extras: ["Esmorzar inclòs"], badge: null,
    fotos: [
      { color: "#9a8a72", alt: "Suite 1 — Vista general" },
      { color: "#8a7a62", alt: "Suite 1 — Llit" },
      { color: "#aa9a82", alt: "Suite 1 — Bany" },
      { color: "#7a6a52", alt: "Suite 1 — Detalls" },
      { color: "#b0a090", alt: "Suite 1 — Ambient" },
    ]
  },
  {
    id: "Suite 2", tipus: "Doble", color: "#c4b09a", capacitat: 2,
    descripcio: "Suite doble de mida mitjana, amb caràcter rural i tots els serveis moderns. Perfecta per a una escapada en parella al cor del Priorat.",
    extras: ["Esmorzar inclòs"], badge: null,
    fotos: [
      { color: "#c4b09a", alt: "Suite 2 — Vista general" },
      { color: "#b4a08a", alt: "Suite 2 — Llit" },
      { color: "#d4c0aa", alt: "Suite 2 — Bany" },
      { color: "#a49080", alt: "Suite 2 — Detalls" },
      { color: "#c8b8a0", alt: "Suite 2 — Ambient" },
    ]
  },
  {
    id: "Suite 3", tipus: "Quàdruple · Balcó privatiu", color: "#b5a48a", capacitat: 4,
    descripcio: "La Suite 3 és la més especial de la casa. Disposa d'un balcó privatiu on podeu posar cadires i gaudir d'una vista magnífica de la comarca — ideal per esmorzar o fer un vermut. Esmorzar inclòs a la tarifa.",
    extras: ["Balcó privatiu amb vistes", "Esmorzar inclòs"],
    badge: "La més especial",
    fotos: [
      { color: "#b5a48a", alt: "Suite 3 — Vista general" },
      { color: "#a89478", alt: "Suite 3 — Llit" },
      { color: "#c4b09a", alt: "Suite 3 — Balcó" },
      { color: "#9a8468", alt: "Suite 3 — Bany" },
      { color: "#b0a080", alt: "Suite 3 — Detalls" },
    ]
  }
];

const SUITE_AMENITIES = [
  { icon: "🛏️", label: "Llit doble" }, { icon: "🚿", label: "Bany privat equipat" },
  { icon: "🧊", label: "Nevera" }, { icon: "📺", label: "Smart TV" },
  { icon: "❄️", label: "Aire condicionat" }, { icon: "🔥", label: "Calefacció" },
  { icon: "💻", label: "Escriptori" }, { icon: "📶", label: "Fibra i WiFi" },
];

const ROOM_IMGS = [
  { label: "Suite 1", color: "#9a8a72" },
  { label: "Suite 2", color: "#c4b09a" },
  { label: "Suite 3", color: "#b5a48a" },
];
const HOUSE_IMGS = [{ color: "#c8b89a" }, { color: "#baa88a" }, { color: "#d4c4a8" }];
const ENTORN_IMGS = [{ color: "#7a9a68" }, { color: "#8aaa78" }, { color: "#6a8a58" }];

const FOTOS_CASA = [
  { color: "#c8b89a", alt: "Vestíbul d'accés" },
  { color: "#b8a88a", alt: "Sala d'estar amb xemeneia" },
  { color: "#d4c4a8", alt: "Menjador" },
  { color: "#a89878", alt: "Cuina" },
  { color: "#c0b090", alt: "Terrassa amb vistes al Montsant" },
  { color: "#b0a080", alt: "Vistes a la Vall de Gratallops" },
  { color: "#c8b8a0", alt: "Detalls de pedra i fusta" },
];

// ─── MÒDUL: CONTACTE ────────────────────────────────────────────────────
// Component independent (no viu dins del render d'App) per evitar que es
// torni a crear i perdi l'estat del formulari en cada render del pare.
// Depèn únicament de props: go, s, NavBar, Footer, BackBtn.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Component independent (no viu dins del render d'App) per evitar que es
// torni a crear i perdi l'estat del formulari en cada render del pare.
// Depèn únicament de props: go, s, NavBar, Footer, BackBtn.
function ContactePage({ go, s, NavBar, Footer, BackBtn }) {
  const [cForm, setCForm] = useState({ nom: "", email: "", msg: "", website: "", consent: false });
  const [cEnviat, setCEnviat] = useState(false);
  const [intentValidar, setIntentValidar] = useState(false);
  const [errorEnviament, setErrorEnviament] = useState("");

  const emailValid = EMAIL_RE.test(cForm.email.trim());
  const cValid = Boolean(cForm.nom.trim() && emailValid && cForm.msg.trim() && cForm.consent);

  const errors = [];
  if (intentValidar && !cEnviat) {
    if (!cForm.nom.trim()) errors.push("Falta el nom.");
    if (!cForm.email.trim()) errors.push("Falta el correu electrònic.");
    else if (!emailValid) errors.push("El correu electrònic no té un format vàlid.");
    if (!cForm.msg.trim()) errors.push("Falta el missatge.");
    if (!cForm.consent) errors.push("Cal acceptar la Política de Privacitat per continuar.");
  }

  const enviar = () => {
    setIntentValidar(true);
    setErrorEnviament("");
    if (!cValid) return;

    if (cForm.website.trim() !== "") {
      setCEnviat(true);
      return;
    }

    try {
      const cos = `Nom: ${cForm.nom}\nEmail: ${cForm.email}\n\n${cForm.msg}`;
      const mailtoUrl = `mailto:contacta@casaruralbonavista.cat?subject=${encodeURIComponent("Missatge de contacte - web Casa Rural Bonavista")}&body=${encodeURIComponent(cos)}`;
      window.location.href = mailtoUrl;
      setCEnviat(true);
    } catch (err) {
      setErrorEnviament("No s'ha pogut obrir el client de correu. Escriu-nos directament a contacta@casaruralbonavista.cat.");
    }
  };

  return (
    <div style={s.wrap}>
      <NavBar />
      <div style={{ background: "#5a3e28", minHeight: 200, display: "flex", alignItems: "flex-end", padding: "0 2rem 2rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#fff", margin: 0 }}>Contacte</h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#f0e8d8", margin: "4px 0 0" }}>Estem aquí per ajudar-vos</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
            <path d="M0,10 C400,40 1000,0 1440,25 L1440,40 L0,40 Z" fill="#faf8f4" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 2rem 3rem" }}>
        <BackBtn to="Inici" label="Tornar a l'inici" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, marginBottom: 48 }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Envia'ns un missatge</h2>
            {!cEnviat ? (
              <>
                {[["Nom complet", "nom", "text"], ["Correu electrònic", "email", "email"]].map(([lbl, field, type]) => (
                  <div key={field} style={{ marginBottom: 12 }}>
                    <label style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>{lbl}</label>
                    <input type={type} value={cForm[field]} onChange={e => setCForm({ ...cForm, [field]: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>Missatge</label>
                  <textarea value={cForm.msg} onChange={e => setCForm({ ...cForm, msg: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, minHeight: 100, resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <input type="text" name="website" value={cForm.website} onChange={e => setCForm({ ...cForm, website: e.target.value })} style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12, padding: "12px", background: "#fdf8f0", borderRadius: 8, border: "0.5px solid #e8e0d0" }}>
                  <input type="checkbox" id="consent-contact" checked={cForm.consent} onChange={e => setCForm({ ...cForm, consent: e.target.checked })} style={{ marginTop: 2, flexShrink: 0 }} />
                  <label htmlFor="consent-contact" style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#666", lineHeight: 1.6, cursor: "pointer" }}>
                    He llegit i accepto la <span style={{ color: "#5a3e28", textDecoration: "underline", cursor: "pointer" }} onClick={() => go("Privacitat")}>Política de Privacitat</span>. Accepto que les meves dades siguin tractades per respondre a la meva consulta (Art. 6.1.a RGPD).
                  </label>
                </div>
                {errors.length > 0 && (
                  <div style={{ marginBottom: 16, padding: "10px 14px", background: "#fdeceb", border: "0.5px solid #e8b0aa", borderRadius: 8 }}>
                    {errors.map(e => (
                      <div key={e} style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#a03028" }}>• {e}</div>
                    ))}
                  </div>
                )}
                {errorEnviament && (
                  <div style={{ marginBottom: 16, padding: "10px 14px", background: "#fdeceb", border: "0.5px solid #e8b0aa", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 12, color: "#a03028" }}>
                    {errorEnviament}
                  </div>
                )}
                <button onClick={enviar} aria-disabled={!cValid} style={{ background: cValid ? "#5a3e28" : "#ccc", color: "#fff", border: "none", width: "100%", padding: "12px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>
                  Enviar missatge
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
                <h3 style={{ fontFamily: "Georgia, serif", fontWeight: 500, color: "#3a2a18" }}>S'ha obert el teu client de correu</h3>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666" }}>
                  Revisa el missatge preparat i prem "Enviar" des d'allà per completar l'enviament.<br />
                  Si no s'ha obert cap aplicació, escriu-nos directament a <strong>contacta@casaruralbonavista.cat</strong>.
                </p>
              </div>
            )}
          </div>

          <div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Informació</h2>
            {[
              { icon: "✉️", label: "Email", val: "contacta@casaruralbonavista.cat" },
              { icon: "📍", label: "Adreça", val: "Carrer del Pla More, 13\nEl Lloar · 43737 Tarragona" },
              { icon: "📞", label: "Telèfon", val: "Pròximament disponible" },
              { icon: "🕐", label: "Resposta", val: "En menys de 24 hores" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 20, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#9a8060", marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#3a2a18", whiteSpace: "pre-line" }}>{item.val}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, background: "#f0ebe2", borderRadius: 12, padding: "1rem 1.25rem" }}>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#7a5a3a", margin: 0, lineHeight: 1.7 }}>
                Per a sol·licituds de reserva, utilitza el formulari de <span style={{ color: "#5a3e28", fontWeight: 600, cursor: "pointer" }} onClick={() => go("Reserves")}>Reserves</span> per obtenir disponibilitat i preu en temps real.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", marginBottom: 20 }}>Com arribar</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
            {[
              { icon: "🚗", title: "Des de Barcelona", text: "AP-2 / N-420 fins a Falset, T-710 fins a Gratallops i T-712 fins a El Lloar. Aprox. 1h 45min." },
              { icon: "🚗", title: "Des de Tarragona", text: "N-420 fins a Falset, T-710 i T-712. Aprox. 1h 15min." },
              { icon: "🚗", title: "Des de Lleida", text: "C-12 fins a Garcia, N-420 fins a Falset, T-710 i T-712. Aprox. 1h 30min." },
              { icon: "🅿️", title: "Aparcament", text: "Aparcament gratuït disponible al costat de la casa." },
            ].map(item => (
              <div key={item.title} style={{ background: "#fff", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1rem 1.25rem" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 600, color: "#5a3e28", marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#888", lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#f0ebe2", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: 24 }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#7a5a3a", margin: 0 }}>
              📍 <strong>Carrer del Pla More, 13 · El Lloar · 43737 Tarragona</strong><br />
              <span style={{ fontSize: 12, color: "#9a8060" }}>Les instruccions d'accés detallades s'envien per correu un cop confirmada la reserva.</span>
            </p>
          </div>
          <div style={{ background: "#f0ebe2", borderRadius: 12, padding: "1.5rem", textAlign: "center" }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#7a5a3a", margin: "0 0 12px" }}>
              Consulta la ubicació exacta a Google Maps.
            </p>
            <a href="https://www.google.com/maps?q=El+Lloar,+Tarragona" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#5a3e28", color: "#fff", padding: "10px 24px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              📍 Obrir a Google Maps
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ─── MÒDUL: RESERVES ────────────────────────────────────────────────────
// Component independent (no viu dins del render d'App), pel mateix motiu
// que ContactePage. Depèn únicament de props: go, s, NavBar, Footer.
// NOTA: aquest mòdul encara NO envia realment la sol·licitud enlloc
// (mateix problema detectat a Contacte) — pendent de correcció en una
// altra sessió, fora de l'abast acordat per aquest canvi.

// Font única de veritat per als preus — Habitacions i Reserves llegeixen
// sempre d'aquí, mai un número fix escrit a mà, per evitar descoordinacions.
const TARIFES = {
  "Suite 1": { baixa: 120, alta: 144, extra: 0 },
  "Suite 2": { baixa: 120, alta: 144, extra: 0 },
  "Suite 3": { baixa: 160, alta: 192, extra: 40 },
};
const temporada = (mes) => (mes >= 6 && mes <= 7) ? "alta" : "baixa";
const BLOCKED = ["2026-04-10", "2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-18", "2026-04-19", "2026-05-01", "2026-05-02", "2026-05-03"];

// Pack Romàntic: experiència d'1 nit, exclusiva de la Suite 3. Preu fix,
// tot inclòs (detall de benvinguda, sopar amb espelmes i vi DOQ Priorat).
// Mai se sopa al balcó.
const PACK_ROMANTIC_PREU = 180;
const PACK_ROMANTIC_DESC = "Detall de benvinguda a l'habitació, sopar amb espelmes i una ampolla de vi DOQ Priorat.";

function ReservesPage({ go, s, NavBar, Footer }) {
  const [any, setAny] = useState(2026);
  const [mes, setMes] = useState(3);
  const [dataInici, setDataInici] = useState(null);
  const [dataFi, setDataFi] = useState(null);
  const [avisRang, setAvisRang] = useState("");
  const [suiteEsc, setSuiteEsc] = useState(null);
  const [pax, setPax] = useState(2);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nom: "", email: "", tel: "", notes: "", consent: false });
  const [enviat, setEnviat] = useState(false);
  const [intentValidarReserva, setIntentValidarReserva] = useState(false);
  const [packRomantic, setPackRomantic] = useState(false);
  const [nitPack, setNitPack] = useState(null);

  const rEmailValid = EMAIL_RE.test(form.email.trim());
  const rValid = Boolean(form.nom.trim() && rEmailValid && form.consent && (!packRomantic || nitPack));
  const rErrors = [];
  if (intentValidarReserva && !enviat) {
    if (!form.nom.trim()) rErrors.push("Falta el nom.");
    if (!form.email.trim()) rErrors.push("Falta el correu electrònic.");
    else if (!rEmailValid) rErrors.push("El correu electrònic no té un format vàlid.");
    if (!form.consent) rErrors.push("Cal acceptar la Política de Privacitat per continuar.");
    if (packRomantic && !nitPack) rErrors.push("Selecciona a quina nit vols el Pack Romàntic.");
  }
  const enviarReserva = () => {
    setIntentValidarReserva(true);
    if (rValid) setEnviat(true);
  };

  const mesos = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"];
  const dies = new Date(any, mes + 1, 0).getDate();
  const primer = (new Date(any, mes, 1).getDay() + 6) % 7;
  const toKey = (d) => `${any}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  // Comprova si hi ha algun dia bloquejat estrictament entre dues dates del mateix mes.
  const rangConteBloquejats = (keyA, keyB) => {
    const diaA = Number(keyA.slice(-2));
    const diaB = Number(keyB.slice(-2));
    const lo = Math.min(diaA, diaB), hi = Math.max(diaA, diaB);
    for (let d = lo + 1; d < hi; d++) {
      if (BLOCKED.includes(toKey(d))) return true;
    }
    return false;
  };

  // Selecció per rang: 1r clic = data d'entrada, 2n clic = data de sortida.
  // Un 3r clic (quan ja hi ha un rang complet) comença una nova selecció.
  const toggleDia = (d) => {
    const k = toKey(d);
    if (BLOCKED.includes(k)) return;
    setAvisRang("");

    if (!dataInici) {
      setDataInici(k);
      setDataFi(null);
      setSuiteEsc(null);
      return;
    }

    if (!dataFi) {
      if (k === dataInici) {
        setDataInici(null);
        return;
      }
      const inici = k < dataInici ? k : dataInici;
      const fi = k < dataInici ? dataInici : k;
      if (rangConteBloquejats(inici, fi)) {
        setAvisRang("Hi ha dies no disponibles dins del rang seleccionat. Tria altres dates.");
        return;
      }
      setDataInici(inici);
      setDataFi(fi);
      setSuiteEsc(null);
      return;
    }

    setDataInici(k);
    setDataFi(null);
    setSuiteEsc(null);
  };

  const nits = (dataInici && dataFi) ? Math.round((new Date(dataFi) - new Date(dataInici)) / 86400000) : 0;
  const temp = temporada(mes);

  const calcPreu = (suite) => {
    const t = TARIFES[suite];
    const base = t[temp] * nits;
    const extra = (suite === "Suite 3" && pax > 2) ? t.extra * (pax - 2) * nits : 0;
    return base + extra;
  };

  // Llista de nits concretes reservades (des de dataInici fins al dia abans de dataFi),
  // per poder triar a quina nit s'aplica el Pack Romàntic.
  const nitsReservades = () => {
    if (!dataInici || !dataFi) return [];
    const llista = [];
    let d = new Date(dataInici);
    const fi = new Date(dataFi);
    while (d < fi) {
      llista.push(d.toISOString().slice(0, 10));
      d = new Date(d.getTime() + 86400000);
    }
    return llista;
  };
  const formatData = (key) => {
    const [, m, d] = key.split("-");
    return `${d} ${mesos[Number(m) - 1]}`;
  };

  const preuTotal = suiteEsc ? calcPreu(suiteEsc) + (packRomantic ? PACK_ROMANTIC_PREU : 0) : 0;

  const suitesDisp = ["Suite 1", "Suite 2", "Suite 3"];

  return (
    <div style={s.wrap}>
      <NavBar />
      <div style={{ background: "#5a3e28", minHeight: 200, display: "flex", alignItems: "flex-end", padding: "0 2rem 2rem", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#fff", margin: 0 }}>Reserves</h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#f0e8d8", margin: "4px 0 0" }}>Selecciona dates, suite i completa la sol·licitud</p>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
            <path d="M0,10 C400,40 1000,0 1440,25 L1440,40 L0,40 Z" fill="#faf8f4" />
          </svg>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
          {["Dates", "Suite", "Sol·licitud"].map((st, i) => (
            <div key={st} style={{ flex: 1, textAlign: "center", padding: "10px", background: step === i + 1 ? "#5a3e28" : step > i + 1 ? "#f0ebe2" : "#fff", border: "0.5px solid #e0dbd0", fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? "#fff" : step > i + 1 ? "#5a3e28" : "#999", borderRadius: i === 0 ? "8px 0 0 8px" : i === 2 ? "0 8px 8px 0" : 0 }}>
              {i + 1}. {st} {step > i + 1 ? "✓" : ""}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <div style={{ background: "#fff", border: "0.5px solid #e0dbd0", borderRadius: 12, padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <button onClick={() => { if (mes === 0) { setMes(11); setAny(y => y - 1); } else setMes(m => m - 1); setDataInici(null); setDataFi(null); setAvisRang(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#5a3e28" }}>‹</button>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 500 }}>{mesos[mes]} {any}</span>
                <button onClick={() => { if (mes === 11) { setMes(0); setAny(y => y + 1); } else setMes(m => m + 1); setDataInici(null); setDataFi(null); setAvisRang(""); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#5a3e28" }}>›</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
                {["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"].map(d => <div key={d} style={{ textAlign: "center", fontSize: 11, color: "#999", padding: "4px 0", fontFamily: "Arial, sans-serif" }}>{d}</div>)}
                {Array(primer).fill(null).map((_, i) => <div key={"e" + i} />)}
                {Array(dies).fill(null).map((_, i) => {
                  const k = toKey(i + 1);
                  const blocked = BLOCKED.includes(k);
                  const isInici = k === dataInici;
                  const isFi = k === dataFi;
                  const isEnRang = Boolean(dataInici && dataFi && k > dataInici && k < dataFi);
                  return (
                    <div key={i} onClick={() => toggleDia(i + 1)} style={{ aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 13, cursor: blocked ? "not-allowed" : "pointer", background: blocked ? "#f0ece6" : (isInici || isFi) ? "#5a3e28" : isEnRang ? "#e0d0b8" : "transparent", color: blocked ? "#ccc" : (isInici || isFi) ? "#fff" : isEnRang ? "#5a3e28" : "#2c2a25", fontWeight: (isInici || isFi) ? 600 : 400, fontFamily: "Arial, sans-serif" }}>
                      {i + 1}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: "#aaa", fontFamily: "Arial, sans-serif", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span>■ <span style={{ color: "#ccc" }}>No disponible</span></span>
                <span style={{ color: "#5a3e28" }}>■ Entrada / Sortida</span>
                <span style={{ color: "#c8a878" }}>■ Nits incloses</span>
              </div>
              {avisRang && (
                <div style={{ marginTop: 10, padding: "8px 12px", background: "#fdeceb", border: "0.5px solid #e8b0aa", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 12, color: "#a03028" }}>
                  {avisRang}
                </div>
              )}
              <div style={{ marginTop: 10, fontFamily: "Arial, sans-serif", fontSize: 12, color: "#9a8060" }}>
                {!dataInici && "Selecciona la data d'entrada."}
                {dataInici && !dataFi && "Data d'entrada seleccionada. Ara selecciona la data de sortida."}
                {dataInici && dataFi && `Entrada: ${dataInici} · Sortida: ${dataFi}`}
              </div>
            </div>

            <div>
              <div style={{ background: "#f0ebe2", borderRadius: 12, padding: "1.5rem", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Tarifes {temp === "alta" ? "temporada alta" : "temporada baixa"}</h3>
                {Object.entries(TARIFES).map(([suite, t]) => (
                  <div key={suite} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #e0dbd0", fontFamily: "Arial, sans-serif", fontSize: 13 }}>
                    <span style={{ color: "#666" }}>{suite}</span>
                    <span style={{ fontWeight: 600, color: "#5a3e28" }}>{t[temp]}€<span style={{ fontWeight: 400, color: "#999" }}>/nit</span>{suite === "Suite 3" ? <span style={{ color: "#aaa", fontSize: 11 }}> +{t.extra}€/pax extra</span> : ""}</span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: "#aaa", margin: "8px 0 0", fontFamily: "Arial, sans-serif" }}>Temporada alta: Juliol–Agost (x1.2)</p>
              </div>

              {nits > 0 && (
                <div style={{ background: "#fff", border: "0.5px solid #e0dbd0", borderRadius: 12, padding: "1.5rem" }}>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", marginBottom: 12 }}>
                    <strong style={{ color: "#3a2a18" }}>{nits} nit{nits > 1 ? "s" : ""}</strong> seleccionada{nits > 1 ? "s" : ""}
                  </div>
                  <div style={{ marginBottom: 12 }}>
                    <label style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666" }}>Nombre de persones</label>
                    <select value={pax} onChange={e => setPax(Number(e.target.value))} style={{ width: "100%", padding: "8px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, marginTop: 4 }}>
                      {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n > 1 ? "persones" : "persona"}</option>)}
                    </select>
                  </div>
                  <button onClick={() => setStep(2)} style={{ background: "#5a3e28", color: "#fff", border: "none", width: "100%", padding: "12px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>Veure suites disponibles →</button>
                </div>
              )}
              {nits === 0 && <div style={{ background: "#fdf8f0", border: "0.5px solid #e0dbd0", borderRadius: 12, padding: "1.5rem", textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#aaa" }}>Selecciona les dates d'entrada i sortida al calendari</div>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#5a3e28", cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>← Canviar dates</button>
            <div style={{ background: "#f0ebe2", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: 24, fontFamily: "Arial, sans-serif", fontSize: 14, color: "#5a3e28" }}>
              📅 {nits} nit{nits > 1 ? "s" : ""} · {pax} {pax > 1 ? "persones" : "persona"} · Temporada {temp}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
              {suitesDisp.map(suite => {
                const preu = calcPreu(suite);
                const sel = suiteEsc === suite;
                return (
                  <div key={suite} onClick={() => setSuiteEsc(suite)} style={{ cursor: "pointer", background: "#fff", border: sel ? "2px solid #5a3e28" : "0.5px solid #e0dbd0", borderRadius: 12, padding: "1.5rem" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 600, color: "#3a2a18", marginBottom: 4 }}>{suite}</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#9a8060", marginBottom: 12 }}>{suite === "Suite 3" ? "Quàdruple · Balcó privatiu" : "Doble"}</div>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 600, color: "#5a3e28", marginBottom: 4 }}>{preu}€</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#aaa", marginBottom: 12 }}>total {nits} nit{nits > 1 ? "s" : ""}{suite === "Suite 3" && pax > 2 ? ` (incl. ${pax - 2} pax extra)` : ""}</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#5a3e28" }}>✓ Esmorzar inclòs · Estada mín. 2 nits</div>
                    {sel && <div style={{ marginTop: 12, background: "#5a3e28", color: "#fff", textAlign: "center", padding: "6px", borderRadius: 6, fontFamily: "Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>Seleccionada ✓</div>}
                  </div>
                );
              })}
            </div>
            {suiteEsc && (
              <button onClick={() => setStep(3)} style={{ background: "#5a3e28", color: "#fff", border: "none", width: "100%", padding: "14px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 15, cursor: "pointer", fontWeight: 600, marginTop: 24 }}>Continuar amb {suiteEsc} — {calcPreu(suiteEsc)}€ →</button>
            )}
          </div>
        )}

        {step === 3 && !enviat && (
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#5a3e28", cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 6 }}>← Canviar suite</button>
            <div style={{ background: "#f0ebe2", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: 16, display: "flex", justifyContent: "space-between", fontFamily: "Arial, sans-serif", fontSize: 14 }}>
              <span style={{ color: "#5a3e28", fontWeight: 600 }}>{suiteEsc}{packRomantic ? " + Pack Romàntic" : ""}</span>
              <span style={{ color: "#5a3e28", fontWeight: 600 }}>{preuTotal}€</span>
            </div>

            {suiteEsc === "Suite 3" && (
              <div style={{ marginBottom: 20, padding: "12px", background: "#fdf8f0", borderRadius: 8, border: "0.5px solid #e8e0d0" }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <input type="checkbox" id="pack-romantic" checked={packRomantic} onChange={e => { setPackRomantic(e.target.checked); if (!e.target.checked) setNitPack(null); }} style={{ marginTop: 2, flexShrink: 0 }} />
                  <label htmlFor="pack-romantic" style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#3a2a18", lineHeight: 1.6, cursor: "pointer" }}>
                    <strong>💐 Afegir Pack Romàntic (+{PACK_ROMANTIC_PREU}€)</strong><br />
                    <span style={{ fontSize: 12, color: "#666" }}>{PACK_ROMANTIC_DESC}</span>
                  </label>
                </div>
                {packRomantic && (
                  <div style={{ marginTop: 12 }}>
                    <label style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#666", display: "block", marginBottom: 4 }}>Per a quina nit?</label>
                    {nitsReservades().length > 1 ? (
                      <select value={nitPack || ""} onChange={e => setNitPack(e.target.value)} style={{ width: "100%", padding: "8px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 13 }}>
                        <option value="" disabled>Tria una nit</option>
                        {nitsReservades().map(k => <option key={k} value={k}>{formatData(k)}</option>)}
                      </select>
                    ) : (
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#3a2a18" }}>
                        {nitsReservades()[0] ? formatData(nitsReservades()[0]) : "—"}
                        {nitsReservades()[0] && nitPack !== nitsReservades()[0] && setNitPack(nitsReservades()[0])}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {[["Nom complet", "nom", "text"], ["Email", "email", "email"], ["Telèfon", "tel", "tel"]].map(([lbl, field, type]) => (
              <div key={field} style={{ marginBottom: 12 }}>
                <label style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>{lbl}</label>
                <input type={type} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", display: "block", marginBottom: 4 }}>Notes o peticions especials</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} style={{ width: "100%", padding: "10px 12px", border: "0.5px solid #e0dbd0", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, minHeight: 80, resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <div style={{ background: "#fdf8f0", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1rem 1.25rem", marginBottom: 20, fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", lineHeight: 1.7 }}>
              <strong style={{ color: "#3a2a18" }}>Política de cancel·lació:</strong> Cancel·lació gratuïta fins a 14 dies abans de l'entrada. Passats els 14 dies, la reserva no és reemborsable.<br />
              <strong style={{ color: "#3a2a18" }}>Condicions:</strong> Check-in a partir de les 15h. Check-out abans de les 11h. Estada mínima 2 nits.
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 16, padding: "12px", background: "#fdf8f0", borderRadius: 8, border: "0.5px solid #e8e0d0" }}>
              <input type="checkbox" id="consent-reserva" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} style={{ marginTop: 2, flexShrink: 0 }} />
              <label htmlFor="consent-reserva" style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#666", lineHeight: 1.6, cursor: "pointer" }}>
                He llegit i accepto la <span style={{ color: "#5a3e28", textDecoration: "underline", cursor: "pointer" }} onClick={() => go("Privacitat")}>Política de Privacitat</span>. Accepto que les meves dades siguin tractades per gestionar aquesta sol·licitud de reserva (Art. 6.1.b RGPD).
              </label>
            </div>
            {rErrors.length > 0 && (
              <div style={{ marginBottom: 16, padding: "10px 14px", background: "#fdeceb", border: "0.5px solid #e8b0aa", borderRadius: 8 }}>
                {rErrors.map(e => (
                  <div key={e} style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#a03028" }}>• {e}</div>
                ))}
              </div>
            )}
            <button onClick={enviarReserva} aria-disabled={!rValid} style={{ background: rValid ? "#5a3e28" : "#ccc", color: "#fff", border: "none", width: "100%", padding: "14px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>Enviar sol·licitud de reserva</button>
          </div>
        )}

        {enviat && (
          <div style={{ textAlign: "center", padding: "3rem 2rem" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#3a2a18", fontWeight: 500 }}>Sol·licitud enviada!</h2>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#666", lineHeight: 1.8 }}>
              Hem rebut la teva sol·licitud per <strong>{suiteEsc}</strong>{packRomantic ? <> amb <strong>Pack Romàntic</strong> per la nit del <strong>{nitPack ? formatData(nitPack) : ""}</strong></> : ""}.<br />
              Et contactarem en menys de 24 hores a <strong>{form.email}</strong> per confirmar la reserva i les instruccions de pagament.
            </p>
            <button onClick={() => { setStep(1); setDataInici(null); setDataFi(null); setSuiteEsc(null); setEnviat(false); setIntentValidarReserva(false); setForm({ nom: "", email: "", tel: "", notes: "", consent: false }); setPackRomantic(false); setNitPack(null); go("Inici"); }} style={{ background: "#5a3e28", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 8, fontFamily: "Arial, sans-serif", fontSize: 14, cursor: "pointer", marginTop: 16 }}>Tornar a l'inici</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mobileCSS = `
  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: block !important; }
  }
  @media (min-width: 769px) {
    .nav-desktop { display: flex !important; }
    .nav-hamburger { display: none !important; }
  }
`;

function AppInner() {
  const [page, setPage] = useState("Inici");
  const [menuObert, setMenuObert] = useState(false);

  if (typeof document !== "undefined") {
    let styleEl = document.getElementById("responsive-css");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "responsive-css";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = mobileCSS;
  }

  const go = (p) => setPage(p);

  const s = {
    wrap: { fontFamily: "'Georgia', serif", color: "#2c2a25", background: "#faf8f4" },
    nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", height: 56, background: "#fff", borderBottom: "0.5px solid #e0dbd0", position: "sticky", top: 0, zIndex: 100 },
    logo: { fontWeight: 600, fontSize: 17, letterSpacing: "0.03em", color: "#5a3e28", fontFamily: "Georgia, serif", cursor: "pointer" },
    navBtn: (active) => ({ background: active ? "#f0ebe2" : "transparent", border: "none", padding: "6px 13px", borderRadius: 20, cursor: "pointer", fontSize: 13, color: active ? "#5a3e28" : "#777", fontWeight: active ? 600 : 400, fontFamily: "Arial, sans-serif" }),
  };

  const NavBar = () => (
    <nav style={s.nav}>
      <img src="/logo.png" alt="Casa Rural Bonavista" onClick={() => { go("Inici"); setMenuObert(false); }} style={{ height: 34, cursor: "pointer", display: "block" }} />
      <div style={{ display: "flex", gap: 2 }} className="nav-desktop">
        {NAV.map(n => <button key={n} style={s.navBtn(page === n)} onClick={() => go(n)}>{n}</button>)}
      </div>
      <button onClick={() => setMenuObert(o => !o)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: 24, color: "#5a3e28", padding: "4px 8px" }} className="nav-hamburger">
        {menuObert ? "✕" : "☰"}
      </button>
      {menuObert && (
        <div style={{ position: "absolute", top: 56, left: 0, right: 0, background: "#fff", borderBottom: "0.5px solid #e0dbd0", zIndex: 200, padding: "0.5rem 0" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => { go(n); setMenuObert(false); }} style={{ display: "block", width: "100%", textAlign: "left", background: page === n ? "#f0ebe2" : "transparent", border: "none", padding: "12px 2rem", cursor: "pointer", fontSize: 15, color: page === n ? "#5a3e28" : "#555", fontWeight: page === n ? 600 : 400, fontFamily: "Arial, sans-serif" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <div style={{ background: "#3a2a18", color: "#c8b89a", textAlign: "center", padding: "2rem", fontFamily: "Arial, sans-serif", marginTop: "3rem" }}>
      <img src="/logo.png" alt="Casa Rural Bonavista" style={{ height: 44, margin: "0 0 12px", borderRadius: 6 }} />
      <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15, letterSpacing: "0.05em" }}>CASA RURAL BONAVISTA</p>
      <p style={{ margin: "0 0 8px", opacity: 0.6, fontSize: 13 }}>El Lloar · Priorat · casaruralbonavista.cat</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, opacity: 0.7 }}>
        <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => go("Privacitat")}>Política de Privacitat</span>
        <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => go("AvisLegal")}>Avís Legal</span>
      </div>
    </div>
  );

  const BackBtn = ({ to, label }) => (
    <button onClick={() => go(to)} style={{ background: "none", border: "none", color: "#5a3e28", cursor: "pointer", fontFamily: "Arial, sans-serif", fontSize: 14, padding: "0 0 2rem", display: "flex", alignItems: "center", gap: 6 }}>
      ← {label}
    </button>
  );

  const Galeria = ({ fotos }) => {
    const [idx, setIdx] = useState(0);
    const prev = () => setIdx(i => (i === 0 ? fotos.length - 1 : i - 1));
    const next = () => setIdx(i => (i === fotos.length - 1 ? 0 : i + 1));
    const foto = fotos[idx];
    return (
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", background: foto.color }}>
        {foto.src
          ? <img src={foto.src} alt={foto.alt || ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          : <div style={{ width: "100%", height: "100%", background: foto.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{foto.alt}</span>
            </div>
        }
        <button onClick={prev} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", fontSize: 22, width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
        <button onClick={next} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", border: "none", color: "#fff", fontSize: 22, width: 40, height: 40, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 }}>
          {fotos.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 8, height: 8, borderRadius: 4, background: i === idx ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "width 0.2s" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 16, fontFamily: "Arial, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{idx + 1} / {fotos.length}</div>
      </div>
    );
  };

  // PÀGINA HABITACIONS
  if (page === "Habitacions") {
    return (
      <div style={s.wrap}>
        <NavBar />
        <div style={{ background: "#f0ebe2", padding: "3rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 500, color: "#3a2a18", margin: "0 0 0.4rem" }}>Habitacions</h2>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#9a8060", margin: "0 0 2.5rem" }}>2 suites dobles · 1 suite quàdruple · Màx. 8 persones · Only Adults</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              {SUITES.map(suite => (
                <div key={suite.id} onClick={() => go(suite.id)} style={{ cursor: "pointer", background: "#fff", border: "0.5px solid #e0dbd0", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ position: "relative", background: suite.color, aspectRatio: "3/2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {suite.badge && <span style={{ position: "absolute", top: 12, left: 12, background: "#5a3e28", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "Arial, sans-serif", fontWeight: 600 }}>{suite.badge}</span>}
                    <span style={{ fontSize: 48 }}>🛏️</span>
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 600, color: "#3a2a18", marginBottom: 4 }}>{suite.id}</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#9a8060", marginBottom: 4 }}>{suite.tipus} · {suite.capacitat} persones</div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#5a3e28", fontWeight: 600, marginBottom: 12 }}>Des de {TARIFES[suite.id].baixa}€ <span style={{ color: "#9a8060", fontWeight: 400 }}>/nit</span></div>
                    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#5a3e28", fontWeight: 600 }}>Veure detalls →</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // PÀGINES INDIVIDUALS DE CADA SUITE
  const suiteActual = SUITES.find(su => su.id === page);
  if (suiteActual) {
    return (
      <div style={s.wrap}>
        <NavBar />
        <div style={{ background: suiteActual.color, minHeight: 280, display: "flex", alignItems: "flex-end", padding: "0 2rem 2rem", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            {suiteActual.badge && <span style={{ background: "#5a3e28", color: "#fff", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "Arial, sans-serif", fontWeight: 600, display: "inline-block", marginBottom: 8 }}>{suiteActual.badge}</span>}
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#fff", margin: "0 0 4px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{suiteActual.id}</h1>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#f0e8d8", margin: 0 }}>{suiteActual.tipus} · Màx. {suiteActual.capacitat} persones</p>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0,10 C400,40 1000,0 1440,25 L1440,40 L0,40 Z" fill="#faf8f4" />
            </svg>
          </div>
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 2rem 3rem" }}>
          <BackBtn to="Habitacions" label="Totes les habitacions" />
          <div style={{ marginBottom: 32 }}>
            <Galeria fotos={suiteActual.fotos} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Descripció</h3>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.8 }}>{suiteActual.descripcio}</p>
              <div style={{ marginTop: 16 }}>
                <h4 style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#5a3e28", marginBottom: 8 }}>Inclòs en aquesta suite</h4>
                {suiteActual.extras.map(e => (
                  <div key={e} style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", padding: "4px 0", display: "flex", gap: 8 }}>
                    <span style={{ color: "#5a3e28" }}>✓</span> {e}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Equipament</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
                {SUITE_AMENITIES.map(a => (
                  <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666" }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span> {a.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginTop: 32, background: "#f0ebe2", borderRadius: 12, padding: "1.5rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 600, color: "#3a2a18" }}>Des de {TARIFES[suiteActual.id].baixa}€ <span style={{ fontSize: 14, fontWeight: 400, color: "#999", fontFamily: "Arial, sans-serif" }}>/nit</span></div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#9a8060" }}>Esmorzar inclòs · Estada mínima 2 nits</div>
            </div>
            <button onClick={() => go("Reserves")} style={{ background: "#5a3e28", color: "#fff", border: "none", padding: "12px 32px", borderRadius: 8, fontSize: 15, cursor: "pointer", fontFamily: "Arial, sans-serif", fontWeight: 600 }}>Reservar</button>
          </div>
          {suiteActual.id === "Suite 3" && (
            <div style={{ marginTop: 16, background: "#fdf8f0", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1rem 1.5rem", fontFamily: "Arial, sans-serif", fontSize: 13, color: "#7a5a3a", lineHeight: 1.7 }}>
              💐 <strong>Pack Romàntic disponible amb aquesta suite</strong> — {PACK_ROMANTIC_DESC} +{PACK_ROMANTIC_PREU}€ (1 nit). Es tria a l'últim pas de la reserva.
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // PÀGINA LA CASA
  if (page === "La Casa") {
    return (
      <div style={s.wrap}>
        <NavBar />
        <div style={{ background: "#c8b89a", minHeight: 260, display: "flex", alignItems: "flex-end", padding: "0 2rem 2rem", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#f0e0c0", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>El Lloar · Priorat</p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#fff", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>La Casa</h1>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#f0e8d8", margin: "4px 0 0" }}>Casa de pedra restaurada al nucli d'El Lloar</p>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0,10 C400,40 1000,0 1440,25 L1440,40 L0,40 Z" fill="#faf8f4" />
            </svg>
          </div>
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem 2rem 0" }}>
          <BackBtn to="Inici" label="Tornar a l'inici" />
          <div style={{ marginBottom: 40 }}>
            <Galeria fotos={FOTOS_CASA} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>La Casa</h2>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.9 }}>Casa de pedra restaurada amb respecte pels materials originals — les vigues de fusta, la pedra vista i els terres de rajola tradicional conviuen amb totes les comoditats modernes.</p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.9 }}>A la planta baixa hi trobareu el vestíbul d'accés, un ampli menjador i sala d'estar amb llar de foc, cuina independent i una gran terrassa exclusiva per als clients amb vistes al riu Montsant i a la Vall de Gratallops.</p>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.9 }}>Les tres suites se situen al primer pis, cadascuna amb accés independent i vistes a la comarca.</p>
            </div>
            <div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", marginTop: 0 }}>Inclòs a l'estada</h2>
              {[
                { icon: "🥐", text: "Esmorzar casolà inclòs cada dia" },
                { icon: "🍷", text: "Servei de sopars opcionals — cuina casolana" },
                { icon: "🛏️", text: "Llençols i tovalloles inclosos" },
                { icon: "🧴", text: "Estris d'higiene a cada suite" },
                { icon: "📶", text: "Fibra òptica i WiFi a tota la casa" },
              ].map(item => (
                <div key={item.text} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{item.icon}</span>
                  <span style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#f0ebe2", borderRadius: 16, padding: "2rem", marginBottom: 40 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#5a3e28", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#f0e8d8", fontWeight: 600 }}>B</span>
              </div>
              <div>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 500, color: "#3a2a18", margin: "0 0 4px" }}>La Bàrbara</h2>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#9a7a5a", margin: "0 0 12px", fontStyle: "italic" }}>Propietària i amfitriona de Casa Rural Bonavista</p>
                <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.9, margin: 0 }}>La Bàrbara és molt més que una amfitriona. Amb una llarga trajectòria professional en cuines de restaurant i col·lectives, formadora de cursos de cuina i autora de llibres de gastronomia, porta a la taula un coneixement profund de la nutrició i la sanitat alimentària. Els seus esmorzars i sopars casolans, elaborats amb productes de proximitat, són una de les experiències més valorades de l'estada.</p>
              </div>
            </div>
          </div>

          <div style={{ background: "#e8f0e0", borderRadius: 16, padding: "1.5rem 2rem", marginBottom: 40, display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 32 }}>🥾</span>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 17, fontWeight: 500, color: "#2a3a20", margin: "0 0 6px" }}>La Ruta GR135 passa per davant de la porta</h3>
              <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#6a8060", margin: 0, lineHeight: 1.7 }}>El camí de gran recorregut GR135 discorre pel nucli d'El Lloar. Podeu sortir a caminar directament des de la casa, sense cotxe.</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // PÀGINA CONTACTE
  if (page === "Contacte") {
    return <ContactePage go={go} s={s} NavBar={NavBar} Footer={Footer} BackBtn={BackBtn} />;
  }

  // PÀGINA L'ENTORN
  if (page === "L'Entorn") {
    const seccions = [
      {
        id: "fires", icon: "🍷", titol: "Fires del vi", color: "#f0ebe2",
        items: [
          { nom: "Fira del Vi de Falset", lloc: "Falset", data: "1–4 maig 2026", desc: "La fira de referència de la comarca. Tastos, venda directa i activitats. Dilluns 4: jornada professional B2B." },
          { nom: "Tast de Carinyenes", lloc: "Porrera", data: "1 maig 2026", desc: "Sempre el divendres més proper a l'1 de maig. Sincronitzat amb la Fira de Falset." },
          { nom: "Nit de les Garnatxes", lloc: "Capçanes", data: "1 maig 2026 (nit)", desc: "Celebració nocturna de la garnatxa. Sincronitzada amb la Fira del Vi." },
          { nom: "Poboleda Vins", lloc: "Poboleda", data: "Abril 2026 (2a quinzena)", desc: "Habitualment dues setmanes abans de la Fira de Falset." },
          { nom: "Fira del Vi de Gratallops", lloc: "Gratallops", data: "Juny 2026", desc: "A 5 minuts d'El Lloar. Habitualment a mitjans de juny." },
          { nom: "Fira de cooperatives del Priorat", lloc: "Falset", data: "Dissabte Sant 2026", desc: "Data variable segons Setmana Santa cada any." },
        ]
      },
      {
        id: "senderisme", icon: "🥾", titol: "Senderisme i ciclisme", color: "#e8f0e0",
        items: [
          { nom: "GR-135 (pas per davant de la casa)", lloc: "El Lloar", data: "Tot l'any", desc: "El camí de gran recorregut passa directament pel nucli d'El Lloar. Sortida des de la porta." },
          { nom: "GR-174 · Ruta del Priorat", lloc: "Comarca del Priorat", data: "Tot l'any", desc: "Travessa diversos pobles del Priorat passant per Gratallops i amb connexió directa amb El Lloar." },
          { nom: "Camins del Siurana", lloc: "El Lloar – Gratallops – Bellmunt", data: "Tot l'any", desc: "Xarxa de camins històrics entre pobles de la comarca. Ideals per a caminades tranquil·les." },
          { nom: "Vinyes a vista d'ocell", lloc: "El Lloar → Damunt Roca → Rogerals", data: "Tot l'any", desc: "Excursió circular des del Lloar amb panorames espectaculars, vinyes i contrastos geològics entre pissarres, gresos i calcàries. Apta per a tothom, recomanable amb nens. Els més caminadors poden arribar fins a La Figuera pel GR-171." },
          { nom: "Rutes BTT del Priorat", lloc: "Gratallops · Bellmunt · El Lloar", data: "Tot l'any", desc: "Xarxa oficial Centre BTT Priorat. Traçats que connecten amb El Lloar." },
          { nom: "Carretera del vi (cicloturisme)", lloc: "Falset – Gratallops – El Lloar", data: "Tot l'any", desc: "Ruta circular molt popular entre ciclistes. El Lloar és parada obligada." },
        ]
      },
      {
        id: "historia", icon: "🪖", titol: "Història i patrimoni", color: "#faf8f4",
        items: [
          { nom: "Observatori de la Batalla de l'Ebre", lloc: "La Figuera (41.2407, 0.7625)", data: "Visita lliure", desc: "Trinxera circular excavada a la roca. Centre de tot el sistema defensiu republicà del Priorat amb vistes directes sobre el front de l'Ebre." },
          { nom: "Trinxeres de la Mola de Sant Pau", lloc: "La Figuera (41.2415, 0.7618)", data: "Visita lliure", desc: "Trinxeres excavades i reforçades amb formigó, connectades amb l'observatori. Restes visibles de parapets i refugis." },
          { nom: "Cartoixa d'Escaladei (Scala Dei)", lloc: "15–20 min en cotxe", data: "Visita guiada", desc: "Primer monestir cartoixà de la península Ibèrica i origen del nom 'Priorat'. Rutes associades: Camí de la Cartoixa, Ruta dels Cartoixans (PR-C 88)." },
          { nom: "Església de Sant Miquel", lloc: "El Lloar", data: "Visita lliure", desc: "Construïda entre 1777 i 1778. Estil neoclàssic amb tres naus, cor, cimbori i campanar. Bé Cultural d'Interès Local." },
          { nom: "Mirador del Priorat", lloc: "Carrer de Sant Miquel, El Lloar", data: "Sempre obert", desc: "Balconada natural al cor del poble amb vistes magnífiques al riu Montsant al fons de la vall." },
          { nom: "Coves dels Rogerals", lloc: "1,5 km del poble", data: "Visita lliure", desc: "Conjunt de coves prehistòriques prop del Nas del Quiuma (gran bloc d'arenisca rogenca) i la font de Minfami, d'origen sarraí." },
        ]
      },
    ];

    return (
      <div style={s.wrap}>
        <NavBar />
        <div style={{ background: "#7a9a68", minHeight: 260, display: "flex", alignItems: "flex-end", padding: "0 2rem 2rem", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#d0f0d0", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Priorat · Catalunya</p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: "#fff", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>L'Entorn</h1>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#d0e8d0", margin: "4px 0 0" }}>Vi, natura, història i cultura al Priorat</p>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 40 }}>
              <path d="M0,10 C400,40 1000,0 1440,25 L1440,40 L0,40 Z" fill="#faf8f4" />
            </svg>
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 2rem 3rem" }}>
          <BackBtn to="Inici" label="Tornar a l'inici" />
          {seccions.map(seccio => (
            <div key={seccio.id} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, paddingBottom: 12, borderBottom: "0.5px solid #e0dbd0" }}>
                <span style={{ fontSize: 28 }}>{seccio.icon}</span>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 500, color: "#3a2a18", margin: 0 }}>{seccio.titol}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                {seccio.items.map(item => (
                  <div key={item.nom} style={{ background: seccio.color, border: "0.5px solid #e0dbd0", borderRadius: 12, padding: "1.25rem" }}>
                    <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 600, color: "#3a2a18", marginBottom: 4 }}>{item.nom}</div>
                    <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#9a7a5a" }}>📍 {item.lloc}</span>
                      <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#9a7a5a" }}>📅 {item.data}</span>
                    </div>
                    <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
  }

  // PÀGINES LEGALS SIMPLES
  if (page === "Privacitat" || page === "AvisLegal") {
    const titol = page === "Privacitat" ? "Política de Privacitat" : "Avís Legal";
    return (
      <div style={s.wrap}>
        <NavBar />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "3rem 2rem" }}>
          <BackBtn to="Inici" label="Tornar a l'inici" />
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#3a2a18" }}>{titol}</h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 14, color: "#666", lineHeight: 1.8 }}>
            Responsable: Bàrbara Beaumont Sàenz — Casa Rural Bonavista (en procés de constitució).<br />
            DNI: [DNI]<br />
            Adreça: [adreça]<br />
            Contacte: contacta@casaruralbonavista.cat
          </p>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#999" }}>Contingut complet pendent de redacció final.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // PÀGINA RESERVES
  if (page === "Reserves") {
    return <ReservesPage go={go} s={s} NavBar={NavBar} Footer={Footer} />;
  }

  // HOME
  return (
    <div style={s.wrap}>
      <NavBar />
      <div style={{ position: "relative", width: "100%", minHeight: 520, background: "#c4b090", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <img src="/el-lloar1.jpg" alt="El Lloar, Priorat" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(20,12,4,0.35) 0%, rgba(20,12,4,0.55) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "4rem 2rem 5rem" }}>
          <p style={{ fontSize: 13, color: "#f0e0c0", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.5rem", fontFamily: "Arial, sans-serif" }}>Turisme rural · El Lloar · Priorat</p>
          <h1 style={{ fontFamily: "'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif", fontSize: "clamp(28px, 6vw, 54px)", fontWeight: 700, color: "#fff", margin: "0 0 0.6rem", letterSpacing: "0.04em", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>Casa rural Bonavista</h1>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 22, color: "#f0e8d8", margin: "0 0 1.2rem", fontWeight: 400, textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>Benvinguts al cor del Priorat</p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: "2rem" }}>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#f5e8d0", fontStyle: "italic" }}>Only Adults</span>
            <span style={{ color: "#c8a878" }}>·</span>
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#f5e8d0", fontStyle: "italic" }}>El Lloar, Priorat</span>
          </div>
          <button onClick={() => go("Reserves")} style={{ background: "#5a3e28", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", padding: "14px 44px", borderRadius: 4, fontSize: 15, cursor: "pointer", fontFamily: "Arial, sans-serif", fontWeight: 700, letterSpacing: "0.12em" }}>RESERVAR</button>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
            <path d="M0,20 C300,70 900,0 1440,50 L1440,70 L0,70 Z" fill="#faf8f4" />
          </svg>
        </div>
      </div>

      <div style={{ background: "#faf8f4", padding: "3.5rem 2rem 0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 13, color: "#9a7a5a", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 1rem" }}>El Lloar · Priorat</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 500, color: "#3a2a18", margin: "0 0 1.5rem", lineHeight: 1.4 }}>Una escapada autèntica al cor de la Catalunya rural</h2>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: 15, color: "#666", lineHeight: 1.9, margin: "0 0 2.5rem" }}>Envoltats de vinyes i muntanyes de pissarra, al nucli medieval d'El Lloar, Casa Rural Bonavista és molt més que un allotjament. És una casa de poble autèntica amb vistes excepcionals a la comarca del Priorat, on la natura, el vi i la tranquil·litat conviuen amb un servei càlid i personalitzat.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, marginBottom: "3rem" }}>
            {[
              { icon: "🏔️", text: "Vistes excepcionals" },
              { icon: "🍷", text: "DO Priorat a la porta" },
              { icon: "🥾", text: "Excursions i senderisme" },
              { icon: "🏊", text: "Piscina municipal" },
              { icon: "🍳", text: "Cuina casolana de mercat" },
            ].map(item => (
              <div key={item.text} style={{ background: "#fff", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1.25rem 0.75rem", textAlign: "center" }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#7a5a3a", fontWeight: 500, lineHeight: 1.4 }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: "#faf8f4", padding: "3rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>Habitacions</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#999", margin: "0 0 2rem" }}>2 suites dobles · 1 suite quàdruple · Màx. 8 persones</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
          {ROOM_IMGS.map((r) => (
            <div key={r.label} onClick={() => go(r.label)} style={{ cursor: "pointer", position: "relative", borderRadius: 10, overflow: "hidden", aspectRatio: "2/3", background: r.color }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem", background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
                <p style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 600, color: "#fff" }}>{r.label}</p>
                <p style={{ margin: "2px 0 0", fontFamily: "Arial, sans-serif", fontSize: 12, color: "#e0d0c0" }}>Veure detalls →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70, marginBottom: -1 }}>
        <path d="M0,0 C400,70 1000,10 1440,55 L1440,70 L0,70 Z" fill="#f0ebe2" />
      </svg>

      <div style={{ background: "#f0ebe2", padding: "2rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>La Casa</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#9a8060", margin: "0 0 2rem" }}>Casa de pedra restaurada al nucli d'El Lloar</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
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

      <div style={{ background: "#e8f0e0", padding: "2rem 2rem 0" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#2a3a20", textAlign: "center", margin: "0 0 0.4rem" }}>L'Entorn</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#6a8060", margin: "0 0 2rem" }}>Vinyes, gorgs, cellers i paisatge de pissarra</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, maxWidth: 900, margin: "0 auto 3rem" }}>
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

      <div style={{ background: "#fdf8f0", padding: "2rem 2rem 3.5rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 500, color: "#3a2a18", textAlign: "center", margin: "0 0 0.4rem" }}>Serveis</h2>
        <p style={{ textAlign: "center", fontFamily: "Arial, sans-serif", fontSize: 14, color: "#9a8060", margin: "0 0 2.5rem" }}>Tot el que necessites per gaudir al màxim</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16, maxWidth: 820, margin: "0 auto" }}>
          {SERVICES.map(sv => (
            <div key={sv.label} style={{ background: "#fff", border: "0.5px solid #e8e0d0", borderRadius: 12, padding: "1.25rem 0.75rem", textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{sv.icon}</div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#7a5a3a", fontWeight: 500, lineHeight: 1.4 }}>{sv.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}