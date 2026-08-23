// Casa Rural Bonavista — api/disponibilitat.js
// Versió: v1.0 — 14 agost 2026
// Funció serverless de Vercel que llegeix els calendaris iCal (.ics) reals
// de Booking.com i EscapadaRural per a cada suite, els combina, i retorna
// les dates realment ocupades. La web fa servir aquest resultat en lloc de
// l'antic array fictici BLOCKED.
//
// COL·LOCACIÓ: aquest fitxer ha d'anar a l'arrel del projecte, dins la
// carpeta "api" (mateix nivell que "src" i "public"), igual que reserva.js:
//   /api/disponibilitat.js
//
// LIMITACIONS CONEGUDES:
// - Booking.com i EscapadaRural actualitzen els seus propis exports iCal
//   cada 6-12h aproximadament (no en temps real), així que la disponibilitat
//   mostrada pot tenir aquest marge de desfasament respecte a una reserva
//   acabada de fer a qualsevol dels dos portals.
// - Reserves telefòniques o directes (fora de Booking/EscapadaRural/la web)
//   no queden reflectides aquí — cal bloquejar-les manualment als dos
//   portals perquè apareguin també a la web.
// - Si un dels 6 enllaços deixa de funcionar (canvia, es revoca, etc.), es
//   registra a "errors" de la resposta però no atura la resta: es continua
//   mostrant la disponibilitat de les fonts que sí han funcionat.

// Un enllaç iCal (.ics) per suite i per portal. Actualitza aquests
// enllaços si mai es regeneren des de Booking.com o EscapadaRural.
const FEEDS = {
  "Suite 1": [
    { portal: "Booking.com", url: "https://ical.booking.com/v1/export?t=0e09ab4b-9f8e-4daf-8d3b-2a9e3299d927" },
    { portal: "EscapadaRural", url: "https://static.escapadarural.com/ical-export/calendar-6a842a4ccccab.ics" },
  ],
  "Suite 2": [
    { portal: "Booking.com", url: "https://ical.booking.com/v1/export?t=9cf45dc6-7cb1-48b0-984d-ec139c75c559" },
    { portal: "EscapadaRural", url: "https://static.escapadarural.com/ical-export/calendar-6a842a640b8cc.ics" },
  ],
  "Suite 3": [
    { portal: "Booking.com", url: "https://ical.booking.com/v1/export?t=57a1a8f0-8407-44f1-81c9-74b056a8ed45" },
    { portal: "EscapadaRural", url: "https://static.escapadarural.com/ical-export/calendar-6a842afc61a5e.ics" },
  ],
};

// Extreu del text .ics el conjunt de dates (YYYY-MM-DD) ocupades. Cada
// VEVENT representa una reserva amb DTSTART (entrada, inclosa) i DTEND
// (sortida, exclosa — el dia de sortida no es bloqueja, ja que podria
// haver-hi una entrada nova aquell mateix dia).
function parseBlockedDates(icsText) {
  const dates = new Set();
  if (!icsText) return dates;
  const events = icsText.split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    const dtStartMatch = ev.match(/DTSTART[^:\r\n]*:(\d{8})/);
    if (!dtStartMatch) continue;
    const dtEndMatch = ev.match(/DTEND[^:\r\n]*:(\d{8})/);
    const start = dtStartMatch[1];
    const end = dtEndMatch ? dtEndMatch[1] : start;
    const toDate = (s) => new Date(`${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}T00:00:00Z`);
    const startDate = toDate(start);
    const endDate = toDate(end);
    if (endDate <= startDate) {
      dates.add(startDate.toISOString().slice(0, 10));
      continue;
    }
    for (let d = new Date(startDate); d < endDate; d.setUTCDate(d.getUTCDate() + 1)) {
      dates.add(d.toISOString().slice(0, 10));
    }
  }
  return dates;
}

export default async function handler(req, res) {
  const blocked = {};
  const errors = [];

  await Promise.all(
    Object.entries(FEEDS).map(async ([suite, fonts]) => {
      const merged = new Set();
      await Promise.all(
        fonts.map(async ({ portal, url }) => {
          try {
            const r = await fetch(url);
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const text = await r.text();
            parseBlockedDates(text).forEach((d) => merged.add(d));
          } catch (err) {
            errors.push(`${suite} (${portal}): ${err.message}`);
          }
        })
      );
      blocked[suite] = Array.from(merged).sort();
    })
  );

  // Cache curta a nivell de xarxa: els calendaris d'origen no canvien en
  // temps real, així que no cal tornar a llegir els 6 enllaços a cada
  // càrrega de pàgina.
  res.setHeader("Cache-Control", "public, max-age=1800, stale-while-revalidate=3600");
  res.status(200).json({ blocked, errors, updatedAt: new Date().toISOString() });
}
