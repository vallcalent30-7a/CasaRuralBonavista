// Casa Rural Bonavista — api/reserva.js
// Versió: v1.0 — 21 juliol 2026
// Funció serverless de Vercel que rep les sol·licituds de reserva del
// formulari de la web (POST des de /api/reserva) i les envia per email a
// contacta@casaruralbonavista.cat mitjançant l'API de Resend.
//
// COL·LOCACIÓ: aquest fitxer ha d'anar a l'arrel del projecte, dins d'una
// carpeta anomenada "api" (mateix nivell que "src" i "public"):
//   /api/reserva.js
// Vercel detecta automàticament els fitxers dins de "api/" i els desplega
// com a funcions serverless — no cal cap configuració extra a vercel.json.
//
// CONFIGURACIÓ NECESSÀRIA (fora d'aquest fitxer, un sol cop):
// 1. Crear un compte gratuït a https://resend.com
// 2. A Resend, afegir el domini casaruralbonavista.cat ("Domains" → "Add
//    Domain") i configurar a IONOS els registres DNS (normalment TXT per
//    a SPF, i uns quants CNAME per al DKIM) que Resend indiqui, fins que
//    el domini quedi marcat com "Verified".
// 3. Crear una API key a Resend (Settings → API Keys → Create API Key).
// 4. A Vercel, obrir el projecte → Settings → Environment Variables i
//    afegir-hi una variable anomenada RESEND_API_KEY amb el valor de la
//    clau creada al pas 3. Tornar a desplegar el projecte perquè la
//    variable s'apliqui (Redeploy).
// 5. Un cop el domini estigui verificat a Resend, els emails s'enviaran
//    des de reserves@casaruralbonavista.cat. Fins que el domini no estigui
//    verificat, Resend rebutjarà l'enviament des d'aquesta adreça.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Mètode no permès" });
    return;
  }

  try {
    const {
      suite, nits, dataInici, dataFi, pax, preuTotal,
      packRomantic, nitPack, nom, email, tel, notes,
    } = req.body || {};

    if (!nom || !email) {
      res.status(400).json({ error: "Falten dades obligatòries (nom i email)." });
      return;
    }

    const linies = [
      "Nova sol·licitud de reserva — Casa Rural Bonavista",
      "",
      `Suite: ${suite || "—"}`,
      `Dates: ${dataInici || "—"} → ${dataFi || "—"} (${nits || 0} nits)`,
      `Persones: ${pax || "—"}`,
      packRomantic ? `Pack Romàntic: sí (nit del ${nitPack || "—"})` : "Pack Romàntic: no",
      `Preu total: ${preuTotal || 0}€`,
      "",
      "Dades de contacte:",
      `Nom: ${nom}`,
      `Email: ${email}`,
      `Telèfon: ${tel || "—"}`,
      `Notes: ${notes || "—"}`,
    ];

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Reserves Casa Rural Bonavista <reserves@casaruralbonavista.cat>",
        to: ["contacta@casaruralbonavista.cat"],
        reply_to: email,
        subject: `Nova sol·licitud — ${suite || "Reserva"} (${nits || 0} nits)`,
        text: linies.join("\n"),
      }),
    });

    if (!resendRes.ok) {
      const detall = await resendRes.text();
      console.error("Error de Resend:", detall);
      res.status(502).json({ error: "No s'ha pogut enviar l'email." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Error a /api/reserva:", err);
    res.status(500).json({ error: "Error intern del servidor." });
  }
}
