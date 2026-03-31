<!DOCTYPE html>
<html lang="ca">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Comptabilitat Casa Rural Bonavista</title>
<style>
:root {
  --bg:#f8f7f4; --bg2:#ffffff; --bg3:#f0eeea;
  --border:#e0ddd6; --border2:#c8c4bb;
  --text:#1a1a18; --text2:#5a5750; --text3:#9a9590;
  --green:#2d7a4f; --green-bg:#eaf5ee; --green-bd:#b0dcbe;
  --red:#c0392b; --red-bg:#fcecea; --red-bd:#f0b8b2;
  --amber:#a06010; --amber-bg:#fef6e4; --amber-bd:#f0d080;
  --blue:#1a5fa0; --blue-bg:#e8f2fb; --blue-bd:#a8cce8;
  --radius:8px; --radius-lg:12px;
  --font:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:var(--font);background:var(--bg);color:var(--text);font-size:14px;line-height:1.5;}
#app{display:flex;flex-direction:column;min-height:100vh;}
header{background:var(--bg2);border-bottom:1px solid var(--border);padding:12px 24px;display:flex;align-items:center;justify-content:space-between;}
header h1{font-size:17px;font-weight:500;}
#nav{background:var(--bg2);border-bottom:1px solid var(--border);padding:0 20px;display:flex;flex-wrap:wrap;gap:2px;}
.nav-btn{padding:10px 13px;font-size:13px;font-family:var(--font);background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;color:var(--text2);white-space:nowrap;}
.nav-btn:hover{color:var(--text);}
.nav-btn.active{color:var(--text);border-bottom-color:var(--text);font-weight:500;}
#main{flex:1;padding:20px 24px;max-width:1100px;margin:0 auto;width:100%;}
.tab{display:none;}.tab.active{display:block;}
.card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:18px;margin-bottom:14px;}
.card-title{font-size:14px;font-weight:500;margin-bottom:14px;}
.fg{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:10px;margin-bottom:12px;}
.fgroup{display:flex;flex-direction:column;gap:4px;}
label{font-size:12px;color:var(--text2);font-weight:500;}
input,select,textarea{font-family:var(--font);font-size:13px;color:var(--text);background:var(--bg);border:1px solid var(--border2);border-radius:var(--radius);padding:7px 10px;outline:none;transition:border-color .15s;width:100%;}
input:focus,select:focus,textarea:focus{border-color:var(--blue);background:var(--bg2);}
input[type=number]{text-align:right;}
.btn{font-family:var(--font);font-size:13px;font-weight:500;padding:8px 16px;border-radius:var(--radius);cursor:pointer;border:1px solid;display:inline-flex;align-items:center;gap:5px;transition:opacity .15s;}
.btn:active{opacity:.8;}
.btn-primary{background:var(--text);color:#fff;border-color:var(--text);}
.btn-secondary{background:var(--bg);color:var(--text);border-color:var(--border2);}
.btn-secondary:hover{background:var(--bg3);}
.btn-success{background:var(--green-bg);color:var(--green);border-color:var(--green-bd);}
.btn-danger{background:var(--red-bg);color:var(--red);border-color:var(--red-bd);}
.btn-warning{background:var(--amber-bg);color:var(--amber);border-color:var(--amber-bd);}
.btn-sm{padding:4px 9px;font-size:12px;}
.tbl-wrap{overflow-x:auto;}
table{width:100%;border-collapse:collapse;font-size:13px;}
thead th{background:var(--bg3);padding:7px 9px;text-align:left;font-size:11px;font-weight:500;color:var(--text2);border-bottom:1px solid var(--border);white-space:nowrap;text-transform:uppercase;letter-spacing:.4px;}
th.r,td.r{text-align:right;}
tbody tr{border-bottom:1px solid var(--border);}
tbody tr:hover{background:var(--bg3);}
td{padding:6px 9px;vertical-align:middle;}
td.muted{color:var(--text2);font-size:12px;}
td.mono{font-size:12px;font-family:monospace;}
.badge{display:inline-block;font-size:11px;font-weight:500;padding:2px 7px;border-radius:20px;white-space:nowrap;border:1px solid;}
.bg{background:var(--green-bg);color:var(--green);border-color:var(--green-bd);}
.br{background:var(--red-bg);color:var(--red);border-color:var(--red-bd);}
.ba{background:var(--amber-bg);color:var(--amber);border-color:var(--amber-bd);}
.bb{background:var(--blue-bg);color:var(--blue);border-color:var(--blue-bd);}
.bgr{background:var(--bg3);color:var(--text2);border-color:var(--border2);}
.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:16px;}
.metric{background:var(--bg3);border-radius:var(--radius);padding:12px 14px;}
.metric-lbl{font-size:11px;color:var(--text2);font-weight:500;text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px;}
.metric-val{font-size:20px;font-weight:500;}
.alert{padding:9px 13px;border-radius:var(--radius);font-size:13px;margin-bottom:10px;border:1px solid;}
.ae{background:var(--red-bg);color:var(--red);border-color:var(--red-bd);}
.as{background:var(--green-bg);color:var(--green);border-color:var(--green-bd);}
.aw{background:var(--amber-bg);color:var(--amber);border-color:var(--amber-bd);}
.ai{background:var(--blue-bg);color:var(--blue);border-color:var(--blue-bd);}
.hidden{display:none!important;}
.iva-prev{background:var(--bg3);border-radius:var(--radius);padding:9px 13px;font-size:12px;color:var(--text2);margin-bottom:10px;display:flex;gap:18px;flex-wrap:wrap;}
.iva-prev strong{color:var(--text);}
.exp-bar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px;}
#status-bar{position:fixed;bottom:0;left:0;right:0;background:var(--bg2);border-top:1px solid var(--border);padding:5px 24px;font-size:11px;color:var(--text3);display:flex;justify-content:space-between;z-index:100;}
.balanc-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media(max-width:600px){.balanc-grid{grid-template-columns:1fr;}}
.brow{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:13px;}
.brow span:first-child{color:var(--text2);}
.btotal{display:flex;justify-content:space-between;padding:7px 0 0;font-weight:500;font-size:14px;border-top:2px solid var(--border2);margin-top:3px;}
.fiscal-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;}
.fiscal-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius-lg);padding:15px;}
/* MODAL */
.modal-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.4);z-index:200;display:flex;align-items:center;justify-content:center;}
.modal{background:var(--bg2);border-radius:var(--radius-lg);padding:24px;width:90%;max-width:600px;max-height:90vh;overflow-y:auto;border:1px solid var(--border);}
.modal h2{font-size:16px;font-weight:500;margin-bottom:16px;}
.modal-footer{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;padding-top:14px;border-top:1px solid var(--border);}
</style>
</head>
<body>
<div id="app">
<header>
  <h1>🏡 Comptabilitat Casa Rural Bonavista</h1>
  <span id="last-save" style="font-size:12px;color:var(--text3);">Pendent de guardar</span>
</header>
<nav id="nav">
  <button class="nav-btn active" data-tab="diari">Entrada / Sortida</button>
  <button class="nav-btn" data-tab="reserves">Reserves</button>
  <button class="nav-btn" data-tab="tarifes">Tarifes</button>
  <button class="nav-btn" data-tab="cercar">Cercar</button>
  <button class="nav-btn" data-tab="nou-compte">Nou compte</button>
  <button class="nav-btn" data-tab="diari-lib">Llibre Diari</button>
  <button class="nav-btn" data-tab="major">Llibre Major</button>
  <button class="nav-btn" data-tab="balanc">Balanç i P&amp;G</button>
  <button class="nav-btn" data-tab="m303">Model 303</button>
  <button class="nav-btn" data-tab="m130">Model 130</button>
  <button class="nav-btn" data-tab="prestec">Préstec</button>
  <button class="nav-btn" data-tab="autonom">Autònom</button>
  <button class="nav-btn" data-tab="calendari">Calendari fiscal</button>
  <button class="nav-btn" data-tab="pla">Pla de comptes</button>
</nav>
<main id="main">

<!-- DIARI -->
<div class="tab active" id="tab-diari">
  <div class="card">
    <div class="card-title">Nou moviment</div>
    <div class="fg">
      <div class="fgroup"><label>Data</label><input type="date" id="mov-data"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Descripció</label><input type="text" id="mov-desc" placeholder="Ex: Compra rajoles reforma, factura llum..."></div>
      <div class="fgroup" style="grid-column:span 2"><label>Compte</label><select id="mov-compte"></select></div>
      <div class="fgroup"><label>Moviment</label>
        <select id="mov-sentit">
          <option value="sortida">Diners que surten</option>
          <option value="entrada">Diners que entren</option>
        </select>
      </div>
      <div class="fgroup"><label>Import total (IVA inclòs) €</label><input type="number" id="mov-import" min="0" step="0.01" placeholder="0,00"></div>
      <div class="fgroup"><label>% IVA</label>
        <select id="mov-iva">
          <option value="0">0% — Exempt</option>
          <option value="4">4% — Superreduït</option>
          <option value="10">10% — Reduït</option>
          <option value="21" selected>21% — General</option>
        </select>
      </div>
      <div class="fgroup" style="grid-column:span 2">
        <label>Com es paga / d'on ve</label>
        <select id="mov-contrapartida">
          <option value="572">Banc — compte corrent</option>
          <option value="570">Caixa (efectiu)</option>
          <option value="400">Pendent de pagar (proveïdor)</option>
          <option value="430">Pendent de cobrar (client)</option>
          <option value="170">Préstec bancari reforma</option>
        </select>
      </div>
      <div class="fgroup"><label>Canal restauració</label>
        <select id="mov-canal">
          <option value="">— No aplica —</option>
          <option value="hoste">Hoste allotjat</option>
          <option value="extern">Client extern</option>
        </select>
      </div>
      <div class="fgroup" style="grid-column:span 2"><label>Notes / Nº factura</label><input type="text" id="mov-notes" placeholder="Nº factura, referència..."></div>
    </div>
    <div class="iva-prev hidden" id="iva-prev">
      Base: <strong id="prev-base">—</strong> &nbsp;|&nbsp;
      IVA: <strong id="prev-iva-q">—</strong> &nbsp;|&nbsp;
      Total: <strong id="prev-total">—</strong>
    </div>
    <div class="alert ae hidden" id="mov-error"></div>
    <button class="btn btn-primary" id="btn-afegir-mov">+ Afegir moviment</button>
  </div>
  <div class="exp-bar">
    <button class="btn btn-secondary btn-sm" id="btn-export-csv">↓ Exportar CSV</button>
    <button class="btn btn-secondary btn-sm" id="btn-export-json">↓ Còpia de seguretat</button>
    <button class="btn btn-secondary btn-sm" id="btn-import-json">↑ Restaurar còpia</button>
    <input type="file" id="file-import" accept=".json" class="hidden">
  </div>
  <div class="card" style="padding:0;"><div class="tbl-wrap">
    <table><thead><tr>
      <th>Data</th><th>Descripció</th><th>Compte</th><th>Sentit</th>
      <th class="r">Base imp.</th><th class="r">IVA</th><th class="r">Total</th>
      <th>Notes</th><th style="width:80px"></th>
    </tr></thead>
    <tbody id="tbody-diari"><tr id="diari-buit"><td colspan="9" style="text-align:center;padding:32px;color:var(--text3)">Encara no hi ha moviments.</td></tr></tbody>
    </table>
  </div></div>
</div>

<!-- RESERVES -->
<div class="tab" id="tab-reserves">
  <div class="card">
    <div class="card-title">Nova reserva</div>
    <div class="fg">
      <div class="fgroup"><label>Nom client</label><input type="text" id="res-nom" placeholder="Nom i cognoms"></div>
      <div class="fgroup"><label>Telèfon</label><input type="text" id="res-tel" placeholder="6XX XXX XXX"></div>
      <div class="fgroup"><label>Habitació</label><select id="res-hab"></select></div>
      <div class="fgroup"><label>Entrada</label><input type="date" id="res-entrada"></div>
      <div class="fgroup"><label>Sortida</label><input type="date" id="res-sortida"></div>
      <div class="fgroup"><label>Règim</label>
        <select id="res-regim">
          <option value="allotjament">Allotjament</option>
          <option value="mp">Mitja pensió</option>
          <option value="pc">Pensió completa</option>
        </select>
      </div>
      <div class="fgroup"><label>Canal</label>
        <select id="res-canal">
          <option value="directe">Directe</option>
          <option value="booking">Booking.com</option>
          <option value="web">Web pròpia</option>
          <option value="telefon">Telèfon</option>
        </select>
      </div>
      <div class="fgroup"><label>Estat</label>
        <select id="res-estat">
          <option value="prereserva">Prereserva</option>
          <option value="confirmada">Confirmada</option>
          <option value="realitzada">Realitzada</option>
          <option value="cancellada">Cancel·lada</option>
        </select>
      </div>
      <div class="fgroup"><label>Senyal rebuda (€)</label><input type="number" id="res-senyal" min="0" step="0.01" placeholder="0,00"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Notes</label><input type="text" id="res-notes" placeholder="Al·lèrgies, preferències..."></div>
    </div>
    <div class="alert ai hidden" id="res-prev"></div>
    <div class="alert ae hidden" id="res-error"></div>
    <button class="btn btn-primary" id="btn-afegir-res">+ Afegir reserva</button>
  </div>
  <div class="metrics" id="metrics-res"></div>
  <div class="card" style="padding:0;"><div class="tbl-wrap">
    <table><thead><tr>
      <th>Client</th><th>Hab.</th><th>Entrada</th><th>Sortida</th>
      <th class="r">Nits</th><th>Règim</th><th>Canal</th><th>Estat</th>
      <th class="r">€/nit</th><th class="r">Total</th><th class="r">Senyal</th><th class="r">Pendent</th>
      <th style="width:90px"></th>
    </tr></thead>
    <tbody id="tbody-reserves"><tr><td colspan="13" style="text-align:center;padding:32px;color:var(--text3)">Encara no hi ha reserves.</td></tr></tbody>
    </table>
  </div></div>
</div>

<!-- TARIFES -->
<div class="tab" id="tab-tarifes">
  <div class="card">
    <div class="card-title">Tarifes per habitació i temporada</div>
    <div id="tarifes-wrap" class="tbl-wrap"></div>
    <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn btn-secondary" id="btn-nova-hab">+ Nova habitació</button>
      <button class="btn btn-success" id="btn-desar-tar">✓ Desar tarifes</button>
    </div>
    <div class="alert as hidden" id="tar-ok" style="margin-top:10px;"></div>
  </div>
</div>

<!-- CERCAR -->
<div class="tab" id="tab-cercar">
  <div class="card">
    <div class="card-title">Cerca per text lliure</div>
    <input type="text" id="cerca-text" placeholder="Escriu paraules separades per espai — ex: compres empresa reforma" style="margin-bottom:12px;">
    <div class="tbl-wrap"><table><thead><tr>
      <th>Codi</th><th>Nom</th><th>Natura</th><th>Grup</th><th class="r">IVA</th><th class="r">Saldo</th>
    </tr></thead><tbody id="tbody-cerca"></tbody></table></div>
  </div>
  <div class="card">
    <div class="card-title">Cerca per codi exacte</div>
    <input type="text" id="cerca-codi" placeholder="Ex: 628" style="max-width:160px;margin-bottom:12px;">
    <div id="cerca-codi-res"></div>
  </div>
</div>

<!-- NOU COMPTE -->
<div class="tab" id="tab-nou-compte">
  <div class="card" style="max-width:460px;">
    <div class="card-title">Alta de nou compte comptable</div>
    <div class="fg" style="grid-template-columns:1fr 1fr;">
      <div class="fgroup"><label>Codi PGC</label><input type="text" id="nc-codi" placeholder="Ex: 629.2"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Nom del compte</label><input type="text" id="nc-nom" placeholder="Ex: Material de neteja"></div>
      <div class="fgroup"><label>Natura</label>
        <select id="nc-natura">
          <option value="Despesa">Despesa</option>
          <option value="Ingrés">Ingrés</option>
          <option value="Actiu">Actiu</option>
          <option value="Passiu">Passiu</option>
        </select>
      </div>
      <div class="fgroup"><label>IVA habitual</label>
        <select id="nc-iva">
          <option value="0">0%</option><option value="4">4%</option>
          <option value="10">10%</option><option value="21" selected>21%</option>
        </select>
      </div>
    </div>
    <div class="alert ae hidden" id="nc-error"></div>
    <div class="alert as hidden" id="nc-ok"></div>
    <button class="btn btn-primary" id="btn-nc">+ Afegir compte</button>
  </div>
</div>

<!-- LLIBRE DIARI -->
<div class="tab" id="tab-diari-lib">
  <div class="exp-bar">
    <button class="btn btn-secondary btn-sm" id="btn-ld-csv">↓ Exportar CSV</button>
    <button class="btn btn-secondary btn-sm" id="btn-ld-print">🖨 Imprimir / PDF</button>
    <div style="display:flex;gap:8px;align-items:center;margin-left:8px;">
      <label style="font-size:12px;color:var(--text2);">De:</label>
      <input type="date" id="ld-des" style="width:145px;">
      <label style="font-size:12px;color:var(--text2);">Fins:</label>
      <input type="date" id="ld-fins" style="width:145px;">
      <button class="btn btn-secondary btn-sm" id="btn-ld-filtre">Aplicar</button>
      <button class="btn btn-secondary btn-sm" id="btn-ld-tot">Tots</button>
    </div>
  </div>
  <div class="card" style="padding:0;" id="ld-card">
    <div style="padding:16px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:15px;font-weight:500;">Llibre Diari</div>
        <div style="font-size:12px;color:var(--text2);">Casa Rural Bonavista · <span id="ld-periode">Tots els períodes</span></div>
      </div>
      <div style="font-size:12px;color:var(--text2);" id="ld-resum"></div>
    </div>
    <div class="tbl-wrap">
      <table id="tbl-ld">
        <thead><tr>
          <th style="width:90px;">Data</th>
          <th style="width:50px;">#</th>
          <th>Descripció</th>
          <th>Compte</th>
          <th class="r" style="width:120px;">Deure (€)</th>
          <th class="r" style="width:120px;">Haver (€)</th>
        </tr></thead>
        <tbody id="tbody-ld"></tbody>
        <tfoot id="tfoot-ld"></tfoot>
      </table>
    </div>
  </div>
</div>

<!-- MAJOR -->
<div class="tab" id="tab-major">
  <div class="card">
    <div class="card-title">Llibre Major — moviments per compte</div>
    <div style="display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px;">
      <div class="fgroup" style="min-width:280px;"><label>Compte</label><select id="major-compte"></select></div>
      <div id="major-saldo" style="font-size:14px;padding-bottom:2px;"></div>
    </div>
    <div class="tbl-wrap"><table><thead><tr>
      <th>Data</th><th>Descripció</th><th>Sentit</th>
      <th class="r">Base</th><th class="r">IVA</th><th class="r">Total</th><th class="r">Saldo acum.</th><th>Notes</th>
    </tr></thead><tbody id="tbody-major">
      <tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text3)">Selecciona un compte.</td></tr>
    </tbody></table></div>
  </div>
</div>

<!-- BALANÇ -->
<div class="tab" id="tab-balanc">
  <div id="balanc-alert" class="alert hidden" style="margin-bottom:14px;"></div>
  <div class="balanc-grid">
    <div class="card"><h4 style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:1px;color:var(--text2);margin-bottom:10px;">Actiu</h4>
      <div id="balanc-actiu"></div>
      <div class="btotal"><span>Total Actiu</span><span id="bt-actiu">0,00 €</span></div>
    </div>
    <div class="card"><h4 style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:1px;color:var(--text2);margin-bottom:10px;">Passiu + Patrimoni net</h4>
      <div id="balanc-passiu"></div>
      <div class="btotal"><span>Total Passiu + PN</span><span id="bt-passiu">0,00 €</span></div>
    </div>
  </div>
  <div class="card">
    <h4 style="font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:1px;color:var(--text2);margin-bottom:14px;">Compte de Pèrdues i Guanys</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
      <div><div style="font-size:12px;color:var(--text2);margin-bottom:8px;">Ingressos</div>
        <div id="pyg-ing"></div>
        <div class="btotal"><span>Total ingressos</span><span id="pyg-ting" style="color:var(--green)">0,00 €</span></div>
      </div>
      <div><div style="font-size:12px;color:var(--text2);margin-bottom:8px;">Despeses</div>
        <div id="pyg-des"></div>
        <div class="btotal"><span>Total despeses</span><span id="pyg-tdes" style="color:var(--red)">0,00 €</span></div>
      </div>
    </div>
    <div id="resultat-box" style="margin-top:16px;padding:14px 18px;border-radius:var(--radius);display:flex;justify-content:space-between;align-items:center;">
      <span style="font-weight:500;">Resultat de l'exercici</span>
      <span style="font-weight:500;font-size:18px;" id="resultat-val">0,00 €</span>
    </div>
  </div>
</div>

<!-- MODEL 303 -->
<div class="tab" id="tab-m303">
  <div class="card" style="max-width:560px;">
    <div class="card-title">Model 303 — Autoliquidació IVA trimestral</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px;">
      <div class="fgroup"><label>Any fiscal</label><input type="number" id="m303-any" style="width:90px;"></div>
      <div class="fgroup"><label>Trimestre</label>
        <select id="m303-trim" style="width:240px;">
          <option value="1">1r trimestre (gener – març)</option>
          <option value="2">2n trimestre (abril – juny)</option>
          <option value="3">3r trimestre (juliol – setembre)</option>
          <option value="4">4t trimestre (octubre – desembre)</option>
        </select>
      </div>
    </div>
    <div id="m303-cos"></div>
  </div>
</div>

<!-- MODEL 130 -->
<div class="tab" id="tab-m130">
  <div class="card" style="max-width:560px;">
    <div class="card-title">Model 130 — Pagament fraccionat IRPF</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:18px;">
      <div class="fgroup"><label>Any fiscal</label><input type="number" id="m130-any" style="width:90px;"></div>
      <div class="fgroup"><label>Fins a trimestre (acumulat)</label>
        <select id="m130-trim" style="width:260px;">
          <option value="1">1r trimestre (gen – mar)</option>
          <option value="2">2n trimestre (gen – jun)</option>
          <option value="3">3r trimestre (gen – set)</option>
          <option value="4">4t trimestre (gen – des)</option>
        </select>
      </div>
    </div>
    <div id="m130-cos"></div>
  </div>
</div>

<!-- PRÉSTEC -->
<div class="tab" id="tab-prestec">
  <div class="alert ai" style="margin-bottom:14px;">
    Quan tinguis el quadre d'amortització del banc, introdueix aquí les dades del préstec. Fins llavors, pots registrar els pagaments manualment indicant quant és capital i quant són interessos.
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">
    <div class="card">
      <div class="card-title">Dades del préstec</div>
      <div class="fg" style="grid-template-columns:1fr 1fr;">
        <div class="fgroup"><label>Capital inicial (€)</label><input type="number" id="pres-capital" min="0" step="0.01" placeholder="0,00"></div>
        <div class="fgroup"><label>Data formalització</label><input type="date" id="pres-data"></div>
        <div class="fgroup"><label>Termini (anys)</label><input type="number" id="pres-anys" min="1" max="30" placeholder="10"></div>
        <div class="fgroup"><label>Tipus d'interès anual (%)</label><input type="number" id="pres-tipus" min="0" step="0.01" placeholder="3,50"></div>
        <div class="fgroup"><label>Quota mensual total (€)</label><input type="number" id="pres-quota" min="0" step="0.01" placeholder="0,00"></div>
        <div class="fgroup"><label>Entitat bancària</label><input type="text" id="pres-banc" placeholder="Nom del banc"></div>
      </div>
      <button class="btn btn-primary" id="btn-desar-pres">Desar dades préstec</button>
      <div class="alert as hidden" id="pres-ok" style="margin-top:8px;"></div>
    </div>

    <div class="card">
      <div class="card-title">Resum préstec</div>
      <div class="metrics" id="pres-metrics" style="grid-template-columns:1fr 1fr;"></div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Registre de pagaments de quota</div>
    <div class="fg">
      <div class="fgroup"><label>Data pagament</label><input type="date" id="pres-pdata"></div>
      <div class="fgroup"><label>Capital retornat (€)</label><input type="number" id="pres-pcapital" min="0" step="0.01" placeholder="0,00"></div>
      <div class="fgroup"><label>Interessos (€)</label><input type="number" id="pres-pinteressos" min="0" step="0.01" placeholder="0,00"></div>
      <div class="fgroup"><label>Total quota (€)</label><input type="number" id="pres-ptotal" min="0" step="0.01" placeholder="0,00" readonly style="background:var(--bg3);color:var(--text2);"></div>
      <div class="fgroup"><label>Notes</label><input type="text" id="pres-pnotes" placeholder="Nº rebut, referència..."></div>
    </div>
    <div class="alert ae hidden" id="pres-err"></div>
    <div class="alert ai" style="margin-bottom:10px;font-size:12px;">
      Cada pagament generarà automàticament els apunts comptables corresponents: capital al compte <strong>170</strong> i interessos al compte <strong>662</strong>, amb contrapartida al <strong>572 · Banc</strong>.
    </div>
    <button class="btn btn-primary" id="btn-afegir-pres">+ Registrar pagament</button>
  </div>

  <div class="card" style="padding:0;">
    <div class="tbl-wrap">
      <table>
        <thead><tr>
          <th>Data</th><th class="r">Capital (€)</th><th class="r">Interessos (€)</th>
          <th class="r">Total quota (€)</th><th class="r">Capital pendent (€)</th>
          <th>Notes</th><th style="width:60px;"></th>
        </tr></thead>
        <tbody id="tbody-pres"></tbody>
        <tfoot id="tfoot-pres"></tfoot>
      </table>
    </div>
  </div>
</div>

<!-- AUTÒNOM -->
<div class="tab" id="tab-autonom">
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;">

    <div class="card">
      <div class="card-title">Dades de cotització</div>
      <div class="fg" style="grid-template-columns:1fr 1fr;">
        <div class="fgroup"><label>Any</label><input type="number" id="aut-any" style="width:90px;"></div>
        <div class="fgroup"><label>Base de cotització (€/mes)</label><input type="number" id="aut-base" min="0" step="0.01" placeholder="950,98"></div>
        <div class="fgroup"><label>Quota mensual RETA (€)</label><input type="number" id="aut-quota" min="0" step="0.01" placeholder="294,61"></div>
        <div class="fgroup"><label>Tram d'ingressos nets previstos</label>
          <select id="aut-tram">
            <option value="1">Fins a 670 €/mes</option>
            <option value="2">670 – 900 €/mes</option>
            <option value="3">900 – 1.166,70 €/mes</option>
            <option value="4">1.166,70 – 1.300 €/mes</option>
            <option value="5">1.300 – 1.500 €/mes</option>
            <option value="6">1.500 – 1.700 €/mes</option>
            <option value="7">1.700 – 1.850 €/mes</option>
            <option value="8" selected>1.850 – 2.030 €/mes</option>
            <option value="9">2.030 – 2.330 €/mes</option>
            <option value="10">2.330 – 2.760 €/mes</option>
            <option value="11">2.760 – 3.190 €/mes</option>
            <option value="12">Més de 3.190 €/mes</option>
          </select>
        </div>
        <div class="fgroup"><label>Bonificació activa</label>
          <select id="aut-bonif">
            <option value="cap">Cap</option>
            <option value="tarifa_plana">Tarifa plana (reducció 80%)</option>
            <option value="discapacitat">Discapacitat ≥33%</option>
            <option value="familiar">Alta familiar col·laborador</option>
          </select>
        </div>
      </div>
      <button class="btn btn-primary" id="btn-desar-aut" style="margin-top:4px;">Desar configuració</button>
      <div class="alert as hidden" id="aut-ok" style="margin-top:8px;"></div>
    </div>

    <div class="card">
      <div class="card-title">Resum anual quotes RETA</div>
      <div class="metrics" id="aut-metrics" style="grid-template-columns:1fr 1fr;"></div>
      <div class="alert ai" style="margin-top:8px;font-size:12px;">
        La quota RETA és deduïble a l'IRPF (Model 130) com a despesa del compte 642. Registra cada pagament mensual al full <strong>Entrada / Sortida</strong> amb el compte <strong>642 · Seguretat Social</strong> i 0% IVA.
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Registre de pagaments RETA</div>
    <div class="fg">
      <div class="fgroup"><label>Data pagament</label><input type="date" id="aut-data"></div>
      <div class="fgroup"><label>Import pagat (€)</label><input type="number" id="aut-imp" min="0" step="0.01" placeholder="0,00"></div>
      <div class="fgroup"><label>Mes corresponent</label>
        <select id="aut-mes">
          <option value="1">Gener</option><option value="2">Febrer</option>
          <option value="3">Març</option><option value="4">Abril</option>
          <option value="5">Maig</option><option value="6">Juny</option>
          <option value="7">Juliol</option><option value="8">Agost</option>
          <option value="9">Setembre</option><option value="10">Octubre</option>
          <option value="11">Novembre</option><option value="12">Desembre</option>
        </select>
      </div>
      <div class="fgroup"><label>Notes</label><input type="text" id="aut-notes" placeholder="Referència, observació..."></div>
    </div>
    <div class="alert ae hidden" id="aut-err"></div>
    <button class="btn btn-primary" id="btn-afegir-aut">+ Registrar pagament</button>
  </div>

  <div class="card" style="padding:0;">
    <div class="tbl-wrap">
      <table>
        <thead><tr>
          <th>Data</th><th>Mes</th><th class="r">Import pagat</th><th>Notes</th>
          <th style="width:60px;"></th>
        </tr></thead>
        <tbody id="tbody-aut"></tbody>
        <tfoot id="tfoot-aut"></tfoot>
      </table>
    </div>
  </div>

  <div class="card">
    <div class="card-title">Impacte al Model 130</div>
    <div id="aut-impacte130"></div>
  </div>
</div>

<!-- CALENDARI -->
<div class="tab" id="tab-calendari">
  <div style="display:flex;gap:12px;margin-bottom:18px;align-items:flex-end;">
    <div class="fgroup"><label>Any fiscal</label><input type="number" id="cal-any" style="width:90px;"></div>
  </div>
  <div class="fiscal-grid" id="fiscal-grid"></div>
  <div class="card" style="margin-top:14px;">
    <div class="card-title">Model 347 — Operacions amb tercers</div>
    <p style="font-size:13px;color:var(--text2);line-height:1.7;">Declaració informativa anual obligatòria per a operacions amb el mateix proveïdor o client que superin els <strong>3.005,06 €</strong> durant l'any. Es presenta al <strong>febrer de l'any següent</strong>.</p>
  </div>
  <div class="card">
    <div class="card-title">Model 390 — Resum anual IVA</div>
    <p style="font-size:13px;color:var(--text2);line-height:1.7;">Declaració informativa. Es presenta al <strong>gener de l'any següent</strong>, juntament amb el 4t trimestre del Model 303.</p>
  </div>
</div>

<!-- PLA DE COMPTES -->
<div class="tab" id="tab-pla">
  <div class="exp-bar">
    <button class="btn btn-secondary btn-sm" id="btn-exp-pla">↓ Exportar CSV</button>
  </div>
  <div class="card" style="padding:0;"><div class="tbl-wrap">
    <table><thead><tr>
      <th>Codi</th><th>Nom</th><th>Natura</th><th>Tipus</th><th class="r">IVA</th><th class="r">Saldo</th>
    </tr></thead><tbody id="tbody-pla"></tbody></table>
  </div></div>
</div>

</main>
</div>
<div id="status-bar">
  <span id="sb-info">Carregant...</span>
  <span id="sb-save"></span>
</div>

<!-- MODAL EDICIÓ MOVIMENT -->
<div class="modal-overlay hidden" id="modal-mov">
  <div class="modal">
    <h2>Editar moviment</h2>
    <div class="fg">
      <div class="fgroup"><label>Data</label><input type="date" id="edit-data"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Descripció</label><input type="text" id="edit-desc"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Compte</label><select id="edit-compte"></select></div>
      <div class="fgroup"><label>Moviment</label>
        <select id="edit-sentit">
          <option value="sortida">Diners que surten</option>
          <option value="entrada">Diners que entren</option>
        </select>
      </div>
      <div class="fgroup"><label>Import total (IVA inclòs) €</label><input type="number" id="edit-import" min="0" step="0.01"></div>
      <div class="fgroup"><label>% IVA</label>
        <select id="edit-iva">
          <option value="0">0%</option><option value="4">4%</option>
          <option value="10">10%</option><option value="21">21%</option>
        </select>
      </div>
      <div class="fgroup"><label>Canal restauració</label>
        <select id="edit-canal">
          <option value="">— No aplica —</option>
          <option value="hoste">Hoste allotjat</option>
          <option value="extern">Client extern</option>
        </select>
      </div>
      <div class="fgroup" style="grid-column:span 2"><label>Notes</label><input type="text" id="edit-notes"></div>
    </div>
    <div class="alert ae hidden" id="edit-error"></div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="btn-cancel-edit">Cancel·lar</button>
      <button class="btn btn-primary" id="btn-desar-edit">Desar canvis</button>
    </div>
  </div>
</div>

<!-- MODAL EDICIÓ RESERVA -->
<div class="modal-overlay hidden" id="modal-res">
  <div class="modal">
    <h2>Editar reserva</h2>
    <div class="fg">
      <div class="fgroup"><label>Nom client</label><input type="text" id="redit-nom"></div>
      <div class="fgroup"><label>Telèfon</label><input type="text" id="redit-tel"></div>
      <div class="fgroup"><label>Habitació</label><select id="redit-hab"></select></div>
      <div class="fgroup"><label>Entrada</label><input type="date" id="redit-entrada"></div>
      <div class="fgroup"><label>Sortida</label><input type="date" id="redit-sortida"></div>
      <div class="fgroup"><label>Règim</label>
        <select id="redit-regim">
          <option value="allotjament">Allotjament</option>
          <option value="mp">Mitja pensió</option>
          <option value="pc">Pensió completa</option>
        </select>
      </div>
      <div class="fgroup"><label>Canal</label>
        <select id="redit-canal">
          <option value="directe">Directe</option>
          <option value="booking">Booking.com</option>
          <option value="web">Web pròpia</option>
          <option value="telefon">Telèfon</option>
        </select>
      </div>
      <div class="fgroup"><label>Estat</label>
        <select id="redit-estat">
          <option value="prereserva">Prereserva</option>
          <option value="confirmada">Confirmada</option>
          <option value="realitzada">Realitzada</option>
          <option value="cancellada">Cancel·lada</option>
        </select>
      </div>
      <div class="fgroup"><label>Senyal (€)</label><input type="number" id="redit-senyal" min="0" step="0.01"></div>
      <div class="fgroup" style="grid-column:span 2"><label>Notes</label><input type="text" id="redit-notes"></div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="btn-cancel-res">Cancel·lar</button>
      <button class="btn btn-primary" id="btn-desar-res">Desar canvis</button>
    </div>
  </div>
</div>

<script>
// ============================================================
// DADES INICIALS
// ============================================================
const COMPTES_DEFAULT = [
  {codi:"100",nom:"Capital",natura:"Passiu",grup:"1",iva:0},
  {codi:"170",nom:"Deutes a llarg termini (crèdit reforma)",natura:"Passiu",grup:"1",iva:0},
  {codi:"520",nom:"Deutes a curt termini (fracció corrent crèdit)",natura:"Passiu",grup:"1",iva:0},
  {codi:"210",nom:"Terrenys i solars",natura:"Actiu",grup:"2",iva:0},
  {codi:"211",nom:"Construccions (immoble)",natura:"Actiu",grup:"2",iva:0},
  {codi:"216",nom:"Mobiliari",natura:"Actiu",grup:"2",iva:21},
  {codi:"217",nom:"Equips informàtics",natura:"Actiu",grup:"2",iva:21},
  {codi:"231",nom:"Immobilitzat material en curs (obra reforma)",natura:"Actiu",grup:"2",iva:21},
  {codi:"281",nom:"Amortització acumulada — construccions",natura:"Actiu",grup:"2",iva:0},
  {codi:"286",nom:"Amortització acumulada — mobiliari",natura:"Actiu",grup:"2",iva:0},
  {codi:"287",nom:"Amortització acumulada — equips informàtics",natura:"Actiu",grup:"2",iva:0},
  {codi:"300",nom:"Existències mercaderies (aliments i begudes)",natura:"Actiu",grup:"3",iva:10},
  {codi:"400",nom:"Proveïdors (general)",natura:"Passiu",grup:"4",iva:21},
  {codi:"400.1",nom:"Empresa Reforma 1",natura:"Passiu",grup:"4",iva:21},
  {codi:"400.2",nom:"Empresa Reforma 2",natura:"Passiu",grup:"4",iva:21},
  {codi:"400.3",nom:"Empresa Reforma 3",natura:"Passiu",grup:"4",iva:21},
  {codi:"410",nom:"Creditors per serveis professionals",natura:"Passiu",grup:"4",iva:21},
  {codi:"430",nom:"Clients allotjament",natura:"Actiu",grup:"4",iva:0},
  {codi:"431",nom:"Clients restauració externs",natura:"Actiu",grup:"4",iva:0},
  {codi:"435",nom:"Clients Booking (pendent liquidació)",natura:"Actiu",grup:"4",iva:0},
  {codi:"472",nom:"IVA suportat",natura:"Actiu",grup:"4",iva:0},
  {codi:"477",nom:"IVA repercutit",natura:"Passiu",grup:"4",iva:0},
  {codi:"475",nom:"Hisenda Pública creditora (IVA / IRPF)",natura:"Passiu",grup:"4",iva:0},
  {codi:"560",nom:"Fiances i senyals rebudes de clients",natura:"Passiu",grup:"5",iva:0},
  {codi:"570",nom:"Caixa (efectiu)",natura:"Actiu",grup:"5",iva:0},
  {codi:"572",nom:"Banc — compte corrent principal",natura:"Actiu",grup:"5",iva:0},
  {codi:"573",nom:"Banc — compte Booking",natura:"Actiu",grup:"5",iva:0},
  {codi:"600",nom:"Compres mercaderies (aliments i begudes)",natura:"Despesa",grup:"6",iva:10},
  {codi:"621",nom:"Arrendaments i cànons",natura:"Despesa",grup:"6",iva:21},
  {codi:"622",nom:"Reparacions i conservació",natura:"Despesa",grup:"6",iva:21},
  {codi:"623.1",nom:"Serveis de gestor / assessoria fiscal",natura:"Despesa",grup:"6",iva:21},
  {codi:"623.2",nom:"Serveis d'informàtica",natura:"Despesa",grup:"6",iva:21},
  {codi:"623.3",nom:"Serveis d'advocat",natura:"Despesa",grup:"6",iva:21},
  {codi:"624",nom:"Transports i missatgeria",natura:"Despesa",grup:"6",iva:21},
  {codi:"625",nom:"Primes d'assegurances",natura:"Despesa",grup:"6",iva:0},
  {codi:"626",nom:"Serveis bancaris i similars",natura:"Despesa",grup:"6",iva:0},
  {codi:"627",nom:"Publicitat (Booking, web, xarxes socials)",natura:"Despesa",grup:"6",iva:21},
  {codi:"628",nom:"Subministraments (llum, aigua, gas, internet)",natura:"Despesa",grup:"6",iva:21},
  {codi:"629",nom:"Altres serveis (neteja, bugaderia, consumibles)",natura:"Despesa",grup:"6",iva:21},
  {codi:"640",nom:"Sous i salaris",natura:"Despesa",grup:"6",iva:0},
  {codi:"642",nom:"Seguretat Social a càrrec empresa",natura:"Despesa",grup:"6",iva:0},
  {codi:"662",nom:"Interessos de deutes (quota crèdit — interessos)",natura:"Despesa",grup:"6",iva:0},
  {codi:"705.1",nom:"Ingressos allotjament — directes",natura:"Ingrés",grup:"7",iva:10},
  {codi:"705.2",nom:"Ingressos allotjament — via Booking",natura:"Ingrés",grup:"7",iva:10},
  {codi:"705.3",nom:"Ingressos restauració — hostes allotjats",natura:"Ingrés",grup:"7",iva:10},
  {codi:"705.4",nom:"Ingressos restauració — clients externs",natura:"Ingrés",grup:"7",iva:10},
  {codi:"754",nom:"Ingressos senyals no retornades (cancel·lacions)",natura:"Ingrés",grup:"7",iva:10},
];

const TEMPORADES = [
  {id:1,nom:"Baixa",mesos:[0,1,2,3,4,5]},
  {id:2,nom:"Alta",mesos:[6,7]},
  {id:3,nom:"Mitja",mesos:[8,9]},
  {id:4,nom:"Festius",mesos:[10,11]},
];

const HABS_DEFAULT = [
  {id:1,nom:"Doble Superior 1",capacitat:2,desc:"Habitació doble superior",preus:{1:60,2:90,3:75,4:80}},
  {id:2,nom:"Doble Superior 2",capacitat:2,desc:"Habitació doble superior",preus:{1:60,2:90,3:75,4:80}},
  {id:3,nom:"Quàdruple Superior",capacitat:4,desc:"Habitació quàdruple superior",preus:{1:90,2:130,3:110,4:120}},
];

// ============================================================
// ESTAT I PERSISTÈNCIA
// ============================================================
const LS = "crbonavista_v1";
let DB = {comptes:[],moviments:[],reserves:[],habitacions:[]};
let editMovId = null, editResId = null;

function desarDB() {
  localStorage.setItem(LS, JSON.stringify(DB));
  const h = new Date().toLocaleTimeString("ca-ES",{hour:"2-digit",minute:"2-digit"});
  document.getElementById("last-save").textContent = "Desat " + h;
  document.getElementById("sb-save").textContent = "Desat " + h;
}

function carregarDB() {
  try {
    const raw = localStorage.getItem(LS);
    if (raw) {
      const d = JSON.parse(raw);
      DB.comptes    = d.comptes    || JSON.parse(JSON.stringify(COMPTES_DEFAULT));
      DB.moviments  = d.moviments  || [];
      DB.reserves   = d.reserves   || [];
      DB.habitacions= d.habitacions|| JSON.parse(JSON.stringify(HABS_DEFAULT));
    } else {
      DB.comptes    = JSON.parse(JSON.stringify(COMPTES_DEFAULT));
      DB.habitacions= JSON.parse(JSON.stringify(HABS_DEFAULT));
    }
  } catch(e) {
    DB.comptes    = JSON.parse(JSON.stringify(COMPTES_DEFAULT));
    DB.habitacions= JSON.parse(JSON.stringify(HABS_DEFAULT));
  }
}

// ============================================================
// UTILITATS
// ============================================================
const fmtN = n => (parseFloat(n)||0).toLocaleString("ca-ES",{minimumFractionDigits:2,maximumFractionDigits:2});
const fmt  = n => fmtN(n) + " €";
const esc  = s => String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const bdg  = (t,c) => `<span class="badge b${c}">${esc(t)}</span>`;
const cm   = () => { const m={}; DB.comptes.forEach(c=>m[c.codi]=c); return m; };

function tipus(n) { return (n==="Ingrés"||n==="Despesa")?"Resultat":"Balanç"; }

function calcSaldos() {
  const s={}, map=cm();
  DB.comptes.forEach(c=>s[c.codi]={d:0,h:0});
  DB.moviments.forEach(m=>{
    const c=map[m.compte]; if(!c||!s[c.codi]) return;
    const v=parseFloat(m.importBrut)||0;
    if(m.sentit==="entrada"){
      if(c.natura==="Actiu"||c.natura==="Despesa") s[c.codi].d+=v; else s[c.codi].h+=v;
    } else {
      if(c.natura==="Actiu"||c.natura==="Despesa") s[c.codi].h+=v; else s[c.codi].d+=v;
    }
  });
  return s;
}

function saldo(codi, saldos) {
  const s=saldos[codi], c=cm()[codi];
  if(!s||!c) return 0;
  return (c.natura==="Actiu"||c.natura==="Despesa") ? s.d-s.h : s.h-s.d;
}

function calcBrut(base, pct) { return pct>0 ? base*(1+pct/100) : base; }
function calcBase(brut, pct) { return pct>0 ? brut/(1+pct/100) : brut; }

function tempPerData(ds) {
  const m = new Date(ds).getMonth();
  for(const t of TEMPORADES) if(t.mesos.includes(m)) return t.id;
  return 1;
}

function calcReserva(habId, entrada, sortida) {
  const hab=DB.habitacions.find(h=>h.id===parseInt(habId));
  if(!hab||!entrada||!sortida) return {nits:0,preuNit:0,total:0,tempNom:""};
  const nits=Math.max(0,Math.round((new Date(sortida)-new Date(entrada))/86400000));
  const tid=tempPerData(entrada);
  const preuNit=hab.preus[tid]||0;
  return {nits,preuNit,total:nits*preuNit,tempNom:TEMPORADES.find(t=>t.id===tid)?.nom||""};
}

// ============================================================
// DESPLEGABLES
// ============================================================
function omplirSelect(id, valor) {
  const sel=document.getElementById(id); if(!sel) return;
  const grups=["1","2","3","4","5","6","7"];
  let h=`<option value="">— Selecciona un compte —</option>`;
  grups.forEach(g=>{
    const cg=DB.comptes.filter(c=>c.grup===g); if(!cg.length) return;
    h+=`<optgroup label="Grup ${g}">`;
    cg.forEach(c=>h+=`<option value="${esc(c.codi)}"${c.codi===valor?" selected":""}>${esc(c.codi)} · ${esc(c.nom)}</option>`);
    h+=`</optgroup>`;
  });
  sel.innerHTML=h;
}

function omplirSelectHabs(id, valor) {
  const sel=document.getElementById(id); if(!sel) return;
  sel.innerHTML=DB.habitacions.map(h=>`<option value="${h.id}"${h.id===parseInt(valor)?" selected":""}>${esc(h.nom)} (${h.capacitat} pers.)</option>`).join("");
}

// ============================================================
// NAVEGACIÓ
// ============================================================
function initNav() {
  document.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll(".nav-btn").forEach(b=>b.classList.remove("active"));
      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("tab-"+btn.dataset.tab).classList.add("active");
      renderTab(btn.dataset.tab);
    });
  });
}

function renderTab(t) {
  const fn={diari:renderDiari,reserves:renderReserves,tarifes:renderTarifes,
    cercar:()=>renderCerca(""),    "diari-lib":()=>{renderLlibreDiari();},major:renderMajor,balanc:renderBalanc,
    "m303":()=>{renderM303();},
    "m130":()=>{renderM130();},
    "prestec":()=>{renderPrestec();},
    "autonom":()=>{renderAutonom();},
    "calendari":()=>{renderCalendari();},pla:renderPla};
  if(fn[t]) fn[t]();
}

// ============================================================
// DIARI
// ============================================================
function initDiari() {
  document.getElementById("mov-data").value = new Date().toISOString().slice(0,10);
  omplirSelect("mov-compte","");

  document.getElementById("mov-compte").addEventListener("change",e=>{
    const c=cm()[e.target.value];
    if(c) document.getElementById("mov-iva").value=String(c.iva);
    prevIva();
  });
  document.getElementById("mov-import").addEventListener("input",prevIva);
  document.getElementById("mov-iva").addEventListener("change",prevIva);
  document.getElementById("btn-afegir-mov").addEventListener("click",afegirMov);
  document.getElementById("btn-export-csv").addEventListener("click",exportCSV);
  document.getElementById("btn-export-json").addEventListener("click",exportJSON);
  document.getElementById("btn-import-json").addEventListener("click",()=>document.getElementById("file-import").click());
  document.getElementById("file-import").addEventListener("change",importJSON);
}

function prevIva() {
  const brut=parseFloat(document.getElementById("mov-import").value)||0;
  const pct=parseFloat(document.getElementById("mov-iva").value)||0;
  const el=document.getElementById("iva-prev");
  if(brut<=0){el.classList.add("hidden");return;}
  const base=calcBase(brut,pct), quota=brut-base;
  document.getElementById("prev-base").textContent=fmtN(base)+" €";
  document.getElementById("prev-iva-q").textContent=fmtN(quota)+" €";
  document.getElementById("prev-total").textContent=fmtN(brut)+" €";
  el.classList.remove("hidden");
}

function afegirMov() {
  const err=document.getElementById("mov-error");
  err.classList.add("hidden");
  const data=document.getElementById("mov-data").value;
  const desc=document.getElementById("mov-desc").value.trim();
  const compte=document.getElementById("mov-compte").value;
  const sentit=document.getElementById("mov-sentit").value;
  const imp=parseFloat(document.getElementById("mov-import").value);
  const pct=parseFloat(document.getElementById("mov-iva").value)||0;
  const canal=document.getElementById("mov-canal").value;
  const notes=document.getElementById("mov-notes").value.trim();

  if(!data){err.textContent="Cal indicar la data.";err.classList.remove("hidden");return;}
  if(new Date(data)>new Date()){err.textContent="La data no pot ser futura.";err.classList.remove("hidden");return;}
  if(!compte){err.textContent="Cal seleccionar un compte.";err.classList.remove("hidden");return;}
  if(!imp||imp<=0){err.textContent="Cal introduir un import vàlid.";err.classList.remove("hidden");return;}

  const c=cm()[compte];
  const base=parseFloat(calcBase(imp,pct).toFixed(2));
  const quota=parseFloat((imp-base).toFixed(2));

  const cContra = getComptesMap ? cm()[contrapartida] : null;

  // Apunt principal
  DB.moviments.push({
    id:Date.now()+Math.random(),data,desc,compte,
    nomCompte:c.nom,sentit,importBrut:imp,
    pctIva:pct,baseImp:base,quotaIva:quota,
    canal,notes,natura:c.natura,grup:c.grup,
    contrapartida, nomContrapartida: cContra?.nom||contrapartida
  });

  // Apunt contrapartida automàtic (sentit invers)
  if(contrapartida) {
    const sentitContra = sentit === "sortida" ? "entrada" : "sortida";
    DB.moviments.push({
      id:Date.now()+Math.random()+0.1, data,
      desc: "(Contrapartida) " + desc,
      compte: contrapartida,
      nomCompte: cContra?.nom||contrapartida,
      sentit: sentitContra,
      importBrut: imp, pctIva:0, baseImp:imp, quotaIva:0,
      canal:"", notes, natura:cContra?.natura||"Actiu",
      grup:cContra?.grup||"5", esContrapartida:true
    });
  }
  DB.moviments.sort((a,b)=>a.data.localeCompare(b.data));
  desarDB(); renderDiari();
  document.getElementById("mov-desc").value="";
  document.getElementById("mov-import").value="";
  document.getElementById("mov-notes").value="";
  document.getElementById("mov-contrapartida").value = "572";
  document.getElementById("mov-canal").value="";
  document.getElementById("iva-prev").classList.add("hidden");
}

function renderDiari() {
  const tbody=document.getElementById("tbody-diari");
  if(!DB.moviments.length){
    tbody.innerHTML=`<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text3)">Encara no hi ha moviments.</td></tr>`;
    document.getElementById("sb-info").textContent="Cap moviment registrat";
    return;
  }
  tbody.innerHTML=[...DB.moviments].reverse().map(m=>`<tr>
    <td class="mono">${esc(m.data)}</td>
    <td>${esc(m.desc||"—")}</td>
    <td class="muted">${esc(m.compte)} · ${esc(m.nomCompte)}</td>
    <td>${bdg(m.sentit==="entrada"?"Entrada":"Sortida",m.sentit==="entrada"?"g":"a")}</td>
    <td class="r">${fmtN(m.baseImp)} €</td>
    <td class="r muted">${m.pctIva>0?fmtN(m.quotaIva)+" €":"—"}</td>
    <td class="r"><strong>${fmtN(m.importBrut)} €</strong></td>
    <td class="muted">${esc(m.notes||"—")}</td>
    <td style="white-space:nowrap;">
      <button class="btn btn-warning btn-sm" onclick="obrirEditMov(${m.id})">✎ Editar</button>
      <button class="btn btn-danger btn-sm" onclick="eliminarMov(${m.id})" style="margin-left:4px;">✕</button>
    </td>
  </tr>`).join("");
  document.getElementById("sb-info").textContent=`${DB.moviments.length} moviment${DB.moviments.length!==1?"s":""} registrat${DB.moviments.length!==1?"s":""}`;
}

function eliminarMov(id) {
  if(!confirm("Segur que vols eliminar aquest moviment?")) return;
  DB.moviments=DB.moviments.filter(m=>m.id!==id);
  desarDB(); renderDiari();
}

// EDICIÓ MOVIMENT
function obrirEditMov(id) {
  const m=DB.moviments.find(x=>x.id===id); if(!m) return;
  editMovId=id;
  document.getElementById("edit-data").value=m.data;
  document.getElementById("edit-desc").value=m.desc||"";
  omplirSelect("edit-compte", m.compte);
  document.getElementById("edit-sentit").value=m.sentit;
  document.getElementById("edit-import").value=m.importBrut;
  document.getElementById("edit-iva").value=String(m.pctIva);
  document.getElementById("edit-canal").value=m.canal||"";
  document.getElementById("edit-notes").value=m.notes||"";
  document.getElementById("edit-error").classList.add("hidden");
  document.getElementById("modal-mov").classList.remove("hidden");
}

function tancarEditMov() {
  document.getElementById("modal-mov").classList.add("hidden");
  editMovId=null;
}

function desarEditMov() {
  const err=document.getElementById("edit-error");
  err.classList.add("hidden");
  const data=document.getElementById("edit-data").value;
  const compte=document.getElementById("edit-compte").value;
  const imp=parseFloat(document.getElementById("edit-import").value);
  const pct=parseFloat(document.getElementById("edit-iva").value)||0;
  if(!data){err.textContent="Cal indicar la data.";err.classList.remove("hidden");return;}
  if(!compte){err.textContent="Cal seleccionar un compte.";err.classList.remove("hidden");return;}
  if(!imp||imp<=0){err.textContent="Cal introduir un import vàlid.";err.classList.remove("hidden");return;}
  const c=cm()[compte];
  const base=parseFloat(calcBase(imp,pct).toFixed(2));
  const quota=parseFloat((imp-base).toFixed(2));
  DB.moviments=DB.moviments.map(m=>m.id===editMovId?{
    ...m,
    data, desc:document.getElementById("edit-desc").value.trim(),
    compte, nomCompte:c.nom,
    sentit:document.getElementById("edit-sentit").value,
    importBrut:imp,pctIva:pct,baseImp:base,quotaIva:quota,
    canal:document.getElementById("edit-canal").value,
    notes:document.getElementById("edit-notes").value.trim(),
    natura:c.natura, grup:c.grup
  }:m);
  DB.moviments.sort((a,b)=>a.data.localeCompare(b.data));
  desarDB(); renderDiari(); tancarEditMov();
}

// ============================================================
// RESERVES
// ============================================================
function initReserves() {
  omplirSelectHabs("res-hab","");
  ["res-hab","res-entrada","res-sortida"].forEach(id=>
    document.getElementById(id).addEventListener("change",prevReserva)
  );
  document.getElementById("btn-afegir-res").addEventListener("click",afegirReserva);
}

function prevReserva() {
  const {nits,preuNit,total,tempNom}=calcReserva(
    document.getElementById("res-hab").value,
    document.getElementById("res-entrada").value,
    document.getElementById("res-sortida").value
  );
  const el=document.getElementById("res-prev");
  if(!nits){el.classList.add("hidden");return;}
  el.textContent=`${nits} nit${nits>1?"s":""} · Temporada ${tempNom} · ${preuNit} €/nit · Total estimat: ${fmtN(total)} €`;
  el.classList.remove("hidden");
}

function afegirReserva() {
  const err=document.getElementById("res-error");
  err.classList.add("hidden");
  const nom=document.getElementById("res-nom").value.trim();
  const entrada=document.getElementById("res-entrada").value;
  const sortida=document.getElementById("res-sortida").value;
  if(!nom){err.textContent="Cal indicar el nom del client.";err.classList.remove("hidden");return;}
  if(!entrada||!sortida){err.textContent="Cal indicar les dates.";err.classList.remove("hidden");return;}
  if(new Date(entrada)>=new Date(sortida)){err.textContent="La sortida ha de ser posterior a l'entrada.";err.classList.remove("hidden");return;}
  const habId=parseInt(document.getElementById("res-hab").value);
  const hab=DB.habitacions.find(h=>h.id===habId);
  const {nits,preuNit,total,tempNom}=calcReserva(habId,entrada,sortida);
  DB.reserves.push({
    id:Date.now()+Math.random(),
    nom, tel:document.getElementById("res-tel").value.trim(),
    habId, habNom:hab?.nom||"—", entrada,sortida,nits,preuNit,total,tempNom,
    regim:document.getElementById("res-regim").value,
    canal:document.getElementById("res-canal").value,
    estat:document.getElementById("res-estat").value,
    senyal:parseFloat(document.getElementById("res-senyal").value)||0,
    notes:document.getElementById("res-notes").value.trim()
  });
  DB.reserves.sort((a,b)=>a.entrada.localeCompare(b.entrada));
  desarDB(); renderReserves();
  ["res-nom","res-tel","res-entrada","res-sortida","res-senyal","res-notes"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("res-prev").classList.add("hidden");
}

function renderReserves() {
  const conf=DB.reserves.filter(r=>r.estat==="confirmada").length;
  const ingPrev=DB.reserves.filter(r=>r.estat!=="cancellada").reduce((s,r)=>s+r.total,0);
  const senyals=DB.reserves.reduce((s,r)=>s+(r.senyal||0),0);
  document.getElementById("metrics-res").innerHTML=`
    <div class="metric"><div class="metric-lbl">Total reserves</div><div class="metric-val">${DB.reserves.length}</div></div>
    <div class="metric"><div class="metric-lbl">Confirmades</div><div class="metric-val" style="color:var(--green)">${conf}</div></div>
    <div class="metric"><div class="metric-lbl">Ingressos previstos</div><div class="metric-val">${fmtN(ingPrev)} €</div></div>
    <div class="metric"><div class="metric-lbl">Senyals rebudes</div><div class="metric-val" style="color:var(--amber)">${fmtN(senyals)} €</div></div>`;
  const ec={prereserva:"a",confirmada:"g",realitzada:"b",cancellada:"r"};
  const cc={booking:"b",web:"g",directe:"gr",telefon:"gr"};
  const rn={allotjament:"Allotjament",mp:"Mitja pensió",pc:"Pensió completa"};
  document.getElementById("tbody-reserves").innerHTML=!DB.reserves.length
    ?`<tr><td colspan="13" style="text-align:center;padding:32px;color:var(--text3)">Encara no hi ha reserves.</td></tr>`
    :[...DB.reserves].reverse().map(r=>{
      const pend=Math.max(0,r.total-(r.senyal||0));
      return `<tr>
        <td><strong>${esc(r.nom)}</strong>${r.tel?`<br><span class="muted">${esc(r.tel)}</span>`:""}</td>
        <td class="muted">${esc(r.habNom)}</td>
        <td class="mono">${esc(r.entrada)}</td><td class="mono">${esc(r.sortida)}</td>
        <td class="r">${r.nits}</td>
        <td class="muted">${esc(rn[r.regim]||r.regim)}</td>
        <td>${bdg(r.canal,cc[r.canal]||"gr")}</td>
        <td>${bdg(r.estat,ec[r.estat]||"gr")}</td>
        <td class="r">${fmtN(r.preuNit)} €</td>
        <td class="r"><strong>${fmtN(r.total)} €</strong></td>
        <td class="r">${r.senyal>0?fmtN(r.senyal)+" €":"—"}</td>
        <td class="r" style="color:var(--amber)">${pend>0?fmtN(pend)+" €":bdg("Pagat","g")}</td>
        <td style="white-space:nowrap;">
          <button class="btn btn-warning btn-sm" onclick="obrirEditRes(${r.id})">✎ Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarRes(${r.id})" style="margin-left:4px;">✕</button>
        </td>
      </tr>`;
    }).join("");
}

function eliminarRes(id) {
  if(!confirm("Segur que vols eliminar aquesta reserva?")) return;
  DB.reserves=DB.reserves.filter(r=>r.id!==id);
  desarDB(); renderReserves();
}

function obrirEditRes(id) {
  const r=DB.reserves.find(x=>x.id===id); if(!r) return;
  editResId=id;
  document.getElementById("redit-nom").value=r.nom;
  document.getElementById("redit-tel").value=r.tel||"";
  omplirSelectHabs("redit-hab",r.habId);
  document.getElementById("redit-entrada").value=r.entrada;
  document.getElementById("redit-sortida").value=r.sortida;
  document.getElementById("redit-regim").value=r.regim;
  document.getElementById("redit-canal").value=r.canal;
  document.getElementById("redit-estat").value=r.estat;
  document.getElementById("redit-senyal").value=r.senyal||"";
  document.getElementById("redit-notes").value=r.notes||"";
  document.getElementById("modal-res").classList.remove("hidden");
}

function tancarEditRes() {
  document.getElementById("modal-res").classList.add("hidden");
  editResId=null;
}

function desarEditRes() {
  const nom=document.getElementById("redit-nom").value.trim();
  const entrada=document.getElementById("redit-entrada").value;
  const sortida=document.getElementById("redit-sortida").value;
  if(!nom||!entrada||!sortida) return;
  const habId=parseInt(document.getElementById("redit-hab").value);
  const hab=DB.habitacions.find(h=>h.id===habId);
  const {nits,preuNit,total,tempNom}=calcReserva(habId,entrada,sortida);
  DB.reserves=DB.reserves.map(r=>r.id===editResId?{
    ...r, nom, tel:document.getElementById("redit-tel").value.trim(),
    habId, habNom:hab?.nom||"—", entrada,sortida,nits,preuNit,total,tempNom,
    regim:document.getElementById("redit-regim").value,
    canal:document.getElementById("redit-canal").value,
    estat:document.getElementById("redit-estat").value,
    senyal:parseFloat(document.getElementById("redit-senyal").value)||0,
    notes:document.getElementById("redit-notes").value.trim()
  }:r);
  DB.reserves.sort((a,b)=>a.entrada.localeCompare(b.entrada));
  desarDB(); renderReserves(); tancarEditRes();
}

// ============================================================
// TARIFES
// ============================================================
function initTarifes() {
  document.getElementById("btn-nova-hab").addEventListener("click",()=>{
    DB.habitacions.push({id:Date.now(),nom:`Habitació ${DB.habitacions.length+1}`,capacitat:2,desc:"",preus:{1:0,2:0,3:0,4:0}});
    renderTarifes(); omplirSelectHabs("res-hab",""); omplirSelectHabs("redit-hab","");
  });
  document.getElementById("btn-desar-tar").addEventListener("click",()=>{
    llegirTarifes(); desarDB();
    const ok=document.getElementById("tar-ok");
    ok.textContent="Tarifes desades correctament."; ok.classList.remove("hidden");
    setTimeout(()=>ok.classList.add("hidden"),3000);
  });
}

function renderTarifes() {
  document.getElementById("tarifes-wrap").innerHTML=`<table><thead><tr>
    <th>Habitació</th><th>Descripció</th><th class="r">Cap.</th>
    <th class="r">Baixa €/nit</th><th class="r">Alta €/nit</th><th class="r">Mitja €/nit</th><th class="r">Festius €/nit</th>
    <th></th>
  </tr></thead><tbody>${DB.habitacions.map(h=>`<tr data-hid="${h.id}">
    <td><input type="text" class="h-nom" value="${esc(h.nom)}" style="width:140px;"></td>
    <td><input type="text" class="h-desc" value="${esc(h.desc||"")}" placeholder="Descripció" style="width:120px;"></td>
    <td class="r"><input type="number" class="h-cap" value="${h.capacitat}" min="1" max="20" style="width:50px;"></td>
    ${[1,2,3,4].map(t=>`<td class="r"><input type="number" class="h-preu" data-t="${t}" value="${h.preus[t]||0}" min="0" step="5" style="width:75px;"></td>`).join("")}
    <td><button class="btn btn-danger btn-sm" onclick="eliminarHab(${h.id})">✕</button></td>
  </tr>`).join("")}</tbody></table>`;
}

function llegirTarifes() {
  document.querySelectorAll("#tarifes-wrap tbody tr[data-hid]").forEach(tr=>{
    const h=DB.habitacions.find(x=>x.id===parseInt(tr.dataset.hid)); if(!h) return;
    h.nom=tr.querySelector(".h-nom").value.trim()||h.nom;
    h.desc=tr.querySelector(".h-desc").value.trim();
    h.capacitat=parseInt(tr.querySelector(".h-cap").value)||2;
    tr.querySelectorAll(".h-preu").forEach(i=>h.preus[parseInt(i.dataset.t)]=parseFloat(i.value)||0);
  });
}

function eliminarHab(id) {
  if(!confirm("Eliminar aquesta habitació?")) return;
  DB.habitacions=DB.habitacions.filter(h=>h.id!==id);
  renderTarifes(); omplirSelectHabs("res-hab",""); omplirSelectHabs("redit-hab",""); desarDB();
}

// ============================================================
// CERCAR
// ============================================================
function initCerca() {
  document.getElementById("cerca-text").addEventListener("input",e=>renderCerca(e.target.value));
  document.getElementById("cerca-codi").addEventListener("input",e=>renderCercaCodi(e.target.value));
}

function renderCerca(text) {
  const pp=text.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const s=calcSaldos();
  const nb={Ingrés:"g",Despesa:"a",Actiu:"b",Passiu:"gr"};
  const res=DB.comptes.filter(c=>!pp.length||pp.every(p=>(c.codi+" "+c.nom).toLowerCase().includes(p)));
  document.getElementById("tbody-cerca").innerHTML=res.length
    ?res.map(c=>`<tr>
      <td class="mono">${esc(c.codi)}</td><td>${esc(c.nom)}</td>
      <td>${bdg(c.natura,nb[c.natura]||"gr")}</td>
      <td class="muted">Grup ${c.grup}</td>
      <td class="r muted">${c.iva>0?c.iva+"%":"—"}</td>
      <td class="r"><strong>${fmt(saldo(c.codi,s))}</strong></td>
    </tr>`).join("")
    :`<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--text3)">Cap resultat.</td></tr>`;
}

function renderCercaCodi(codi) {
  const el=document.getElementById("cerca-codi-res");
  if(!codi){el.innerHTML="";return;}
  const c=cm()[codi.trim()];
  if(!c){el.innerHTML=`<div class="alert ae">Codi no trobat.</div>`;return;}
  const s=calcSaldos();
  el.innerHTML=`<div class="card" style="max-width:380px;">
    <div style="font-size:15px;font-weight:500;margin-bottom:6px;">${esc(c.codi)} · ${esc(c.nom)}</div>
    <div style="font-size:12px;color:var(--text2);">Natura: ${c.natura} · Grup: ${c.grup} · IVA: ${c.iva}%</div>
    <div style="font-size:15px;margin-top:10px;">Saldo: <strong>${fmt(saldo(c.codi,s))}</strong></div>
  </div>`;
}

// ============================================================
// NOU COMPTE
// ============================================================
function initNouCompte() {
  document.getElementById("btn-nc").addEventListener("click",()=>{
    const err=document.getElementById("nc-error"), ok=document.getElementById("nc-ok");
    err.classList.add("hidden"); ok.classList.add("hidden");
    const codi=document.getElementById("nc-codi").value.trim();
    const nom=document.getElementById("nc-nom").value.trim();
    const natura=document.getElementById("nc-natura").value;
    const iva=parseInt(document.getElementById("nc-iva").value);
    if(!codi){err.textContent="Cal indicar un codi.";err.classList.remove("hidden");return;}
    if(!nom){err.textContent="Cal indicar un nom.";err.classList.remove("hidden");return;}
    if(cm()[codi]){err.textContent="Aquest codi ja existeix.";err.classList.remove("hidden");return;}
    DB.comptes.push({codi,nom,natura,grup:codi.charAt(0),iva});
    DB.comptes.sort((a,b)=>a.codi.localeCompare(b.codi,undefined,{numeric:true}));
    desarDB();
    omplirSelect("mov-compte",""); omplirSelect("major-compte","");
    omplirSelect("edit-compte","");
    ok.textContent=`Compte ${codi} · ${nom} afegit.`; ok.classList.remove("hidden");
    document.getElementById("nc-codi").value=""; document.getElementById("nc-nom").value="";
  });
}

// ============================================================
// LLIBRE DIARI
// ============================================================
function initLlibreDiari() {
  document.getElementById("ld-des").value = "";
  document.getElementById("ld-fins").value = "";
  document.getElementById("btn-ld-filtre").addEventListener("click", renderLlibreDiari);
  document.getElementById("btn-ld-tot").addEventListener("click", ()=>{
    document.getElementById("ld-des").value="";
    document.getElementById("ld-fins").value="";
    renderLlibreDiari();
  });
  document.getElementById("btn-ld-csv").addEventListener("click", exportLlibreDiariCSV);
  document.getElementById("btn-ld-print").addEventListener("click", ()=>{
    const orig = document.title;
    document.title = "Llibre_Diari_CasaRuralBonavista";
    window.print();
    document.title = orig;
  });
}

function getLlibreDiariEntrades(des, fins) {
  const map = cm();
  return DB.moviments
    .filter(m => {
      if(des && m.data < des) return false;
      if(fins && m.data > fins) return false;
      return true;
    })
    .map((m, i) => {
      const c = map[m.compte];
      const nat = c?.natura||"";
      // Lògica deure/haver per compte principal
      let deure = 0, haver = 0;
      if(m.sentit === "entrada") {
        if(nat==="Actiu"||nat==="Despesa") deure = m.importBrut; else haver = m.importBrut;
      } else {
        if(nat==="Actiu"||nat==="Despesa") haver = m.importBrut; else deure = m.importBrut;
      }
      // Línies de l'assentament (compte principal + IVA si aplica)
      const linies = [{compte: m.compte, nom: m.nomCompte, deure, haver}];
      if(m.pctIva > 0 && m.quotaIva > 0) {
        // Compte d'IVA contrapartida
        if(nat==="Ingrés") {
          linies[0].haver = m.baseImp;
          linies.push({compte:"477", nom:"IVA repercutit", deure:0, haver:m.quotaIva});
        } else {
          linies[0].deure = m.baseImp;
          linies.push({compte:"472", nom:"IVA suportat", deure:m.quotaIva, haver:0});
        }
      }
      return {id:m.id, num:i+1, data:m.data, desc:m.desc||"—", notes:m.notes||"", linies};
    });
}

function renderLlibreDiari() {
  const des  = document.getElementById("ld-des").value;
  const fins = document.getElementById("ld-fins").value;
  const entrades = getLlibreDiariEntrades(des, fins);

  document.getElementById("ld-periode").textContent =
    des||fins ? `${des||"inici"} → ${fins||"avui"}` : "Tots els períodes";

  let totalD=0, totalH=0;
  const tbody = document.getElementById("tbody-ld");

  if(!entrades.length) {
    tbody.innerHTML=`<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text3)">Cap moviment en aquest període.</td></tr>`;
    document.getElementById("tfoot-ld").innerHTML="";
    document.getElementById("ld-resum").textContent="";
    return;
  }

  tbody.innerHTML = entrades.map(e => {
    const files = e.linies.map((l,li) => {
      totalD += l.deure; totalH += l.haver;
      const isFirst = li===0;
      return `<tr style="border-bottom:${li===e.linies.length-1?"2px solid var(--border2)":"none"};">
        <td class="mono" style="color:var(--text2);font-size:12px;">${isFirst?esc(e.data):""}</td>
        <td style="font-size:12px;color:var(--text2);font-weight:500;">${isFirst?"#"+e.num:""}</td>
        <td>
          ${isFirst?`<span style="font-weight:500;">${esc(e.desc)}</span>${e.notes?`<span style="font-size:11px;color:var(--text3);margin-left:8px;">${esc(e.notes)}</span>`:""}`:
          `<span style="font-size:12px;color:var(--text2);padding-left:16px;">— contrapartida IVA</span>`}
        </td>
        <td class="muted" style="font-size:12px;${li>0?"padding-left:24px;":""}">${esc(l.compte)} · ${esc(l.nom)}</td>
        <td class="r" style="font-family:monospace;font-size:13px;">${l.deure>0?`<strong>${fmtN(l.deure)}</strong>`:""}</td>
        <td class="r" style="font-family:monospace;font-size:13px;">${l.haver>0?`<strong>${fmtN(l.haver)}</strong>`:""}</td>
      </tr>`;
    }).join("");
    return files;
  }).join("");

  document.getElementById("tfoot-ld").innerHTML=`
    <tr>
      <td colspan="4" style="text-align:right;font-size:13px;color:var(--text2);">TOTALS</td>
      <td class="r" style="font-family:monospace;font-weight:500;">${fmtN(totalD)} €</td>
      <td class="r" style="font-family:monospace;font-weight:500;">${fmtN(totalH)} €</td>
    </tr>
    <tr>
      <td colspan="4" style="text-align:right;font-size:12px;color:${Math.abs(totalD-totalH)<0.01?"var(--green)":"var(--red)"};">
        ${Math.abs(totalD-totalH)<0.01?"✓ Deure = Haver (quadra)":"⚠ Diferència: "+fmtN(Math.abs(totalD-totalH))+" €"}
      </td>
      <td colspan="2"></td>
    </tr>`;

  document.getElementById("ld-resum").textContent=
    `${entrades.length} assentament${entrades.length!==1?"s":""}`;
}

function exportLlibreDiariCSV() {
  const des  = document.getElementById("ld-des").value;
  const fins = document.getElementById("ld-fins").value;
  const entrades = getLlibreDiariEntrades(des, fins);
  if(!entrades.length){alert("Cap moviment per exportar.");return;}
  const cap=["Data","Num","Descripció","Compte","Nom compte","Deure","Haver"];
  const files=[];
  entrades.forEach(e=>e.linies.forEach((l,li)=>files.push([
    li===0?e.data:"", li===0?"#"+e.num:"",
    li===0?e.desc:"(IVA)", l.compte, l.nom,
    l.deure>0?fmtN(l.deure):"", l.haver>0?fmtN(l.haver):""
  ].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";"))));
  baixar("llibre_diari_"+new Date().toISOString().slice(0,10)+".csv",
    "\uFEFF"+[cap.join(";"),...files].join("\r\n"),"text/csv;charset=utf-8;");
}

// ============================================================
// LLIBRE MAJOR
// ============================================================
function initMajor() {
  document.getElementById("major-compte").addEventListener("change",renderMajor);
}

function renderMajor() {
  const compte=document.getElementById("major-compte").value;
  const tbody=document.getElementById("tbody-major");
  const saldoEl=document.getElementById("major-saldo");
  if(!compte){
    tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text3)">Selecciona un compte.</td></tr>`;
    saldoEl.innerHTML=""; return;
  }
  const s=calcSaldos(), sal=saldo(compte,s);
  const c=cm()[compte];
  saldoEl.innerHTML=`Saldo: <strong style="color:${sal>=0?"var(--green)":"var(--red)"}">${fmt(sal)}</strong>`;
  const movs=DB.moviments.filter(m=>m.compte===compte);
  if(!movs.length){tbody.innerHTML=`<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text3)">Cap moviment en aquest compte.</td></tr>`;return;}
  let acum=0;
  tbody.innerHTML=movs.map(m=>{
    const v=parseFloat(m.importBrut)||0;
    const delta=m.sentit==="entrada"?((c?.natura==="Actiu"||c?.natura==="Despesa")?v:-v):((c?.natura==="Actiu"||c?.natura==="Despesa")?-v:v);
    acum+=delta;
    return `<tr>
      <td class="mono">${esc(m.data)}</td><td>${esc(m.desc||"—")}</td>
      <td>${bdg(m.sentit==="entrada"?"Entrada":"Sortida",m.sentit==="entrada"?"g":"a")}</td>
      <td class="r">${fmtN(m.baseImp)} €</td>
      <td class="r muted">${m.pctIva>0?fmtN(m.quotaIva)+" €":"—"}</td>
      <td class="r">${fmtN(m.importBrut)} €</td>
      <td class="r"><strong style="color:${acum>=0?"var(--green)":"var(--red)"}">${fmtN(acum)} €</strong></td>
      <td class="muted">${esc(m.notes||"—")}</td>
    </tr>`;
  }).join("");
}

// ============================================================
// BALANÇ
// ============================================================
function renderBalanc() {
  const s=calcSaldos();
  let actiu=0,passiu=0,patNet=0,ing=0,des=0;
  const hA=DB.comptes.filter(c=>c.natura==="Actiu").map(c=>{const v=saldo(c.codi,s);if(!v)return"";actiu+=v;return`<div class="brow"><span>${esc(c.codi)} · ${esc(c.nom)}</span><span>${fmtN(v)} €</span></div>`;}).join("");
  const hP=DB.comptes.filter(c=>c.natura==="Passiu"||c.codi==="100").map(c=>{const v=saldo(c.codi,s);if(!v)return"";if(c.codi==="100")patNet+=v;else passiu+=v;return`<div class="brow"><span>${esc(c.codi)} · ${esc(c.nom)}</span><span>${fmtN(v)} €</span></div>`;}).join("");
  const hI=DB.comptes.filter(c=>c.natura==="Ingrés").map(c=>{const v=saldo(c.codi,s);if(!v)return"";ing+=v;return`<div class="brow"><span>${esc(c.nom)}</span><span style="color:var(--green)">${fmtN(v)} €</span></div>`;}).join("");
  const hD=DB.comptes.filter(c=>c.natura==="Despesa").map(c=>{const v=saldo(c.codi,s);if(!v)return"";des+=v;return`<div class="brow"><span>${esc(c.nom)}</span><span style="color:var(--red)">${fmtN(v)} €</span></div>`;}).join("");
  const res=ing-des, totP=passiu+patNet+res;
  const quadra=Math.abs(actiu-totP)<0.01;
  document.getElementById("balanc-actiu").innerHTML=hA||`<div class="brow"><span style="color:var(--text3)">Sense moviments</span><span>—</span></div>`;
  document.getElementById("balanc-passiu").innerHTML=(hP||"")+`<div class="brow"><span>Resultat de l'exercici</span><span style="color:${res>=0?"var(--green)":"var(--red)"}">${fmtN(res)} €</span></div>`;
  document.getElementById("bt-actiu").textContent=fmtN(actiu)+" €";
  document.getElementById("bt-passiu").textContent=fmtN(totP)+" €";
  document.getElementById("pyg-ing").innerHTML=hI||`<div class="brow"><span style="color:var(--text3)">Sense ingressos</span></div>`;
  document.getElementById("pyg-des").innerHTML=hD||`<div class="brow"><span style="color:var(--text3)">Sense despeses</span></div>`;
  document.getElementById("pyg-ting").textContent=fmtN(ing)+" €";
  document.getElementById("pyg-tdes").textContent=fmtN(des)+" €";
  document.getElementById("resultat-val").textContent=fmtN(res)+" €";
  const rb=document.getElementById("resultat-box");
  rb.style.background=res>=0?"var(--green-bg)":"var(--red-bg)";
  rb.style.color=res>=0?"var(--green)":"var(--red)";
  const qa=document.getElementById("balanc-alert");
  qa.className=`alert ${quadra?"as":"ae"}`;
  qa.textContent=quadra?"✓ Els comptes quadren (Actiu = Passiu + PN + Resultat)":`⚠ Diferència detectada: ${fmtN(Math.abs(actiu-totP))} €. Revisar apunts.`;
  qa.classList.remove("hidden");
}

// ============================================================
// MODEL 303
// ============================================================
function calcIva(any,trim) {
  const mm={1:[0,1,2],2:[3,4,5],3:[6,7,8],4:[9,10,11]}[trim]||[];
  let rB=0,rI=0,sB=0,sI=0;
  const map=cm();
  DB.moviments.forEach(m=>{
    const d=new Date(m.data);
    if(d.getFullYear()!==any||!mm.includes(d.getMonth())||(m.pctIva||0)<=0) return;
    const c=map[m.compte]; if(!c) return;
    if(c.natura==="Ingrés"){rB+=m.baseImp;rI+=m.quotaIva;}
    if(c.natura==="Despesa"||(c.natura==="Actiu"&&c.grup==="2")){sB+=m.baseImp;sI+=m.quotaIva;}
  });
  return {rB,rI,sB,sI,res:rI-sI};
}

function initM303() {
  document.getElementById("m303-any").value=new Date().getFullYear();
  ["m303-any","m303-trim"].forEach(id=>document.getElementById(id).addEventListener("change",renderM303));
}

function renderM303() {
  const any=parseInt(document.getElementById("m303-any").value)||new Date().getFullYear();
  const trim=parseInt(document.getElementById("m303-trim").value)||1;
  const d=calcIva(any,trim);
  const term={1:"20 d'abril",2:"20 de juliol",3:"20 d'octubre",4:"20 de gener (any seg.)"};
  document.getElementById("m303-cos").innerHTML=`
    <div style="background:var(--green-bg);border:1px solid var(--green-bd);border-radius:var(--radius);padding:13px 16px;margin-bottom:10px;">
      <div style="font-size:12px;color:var(--green);font-weight:500;margin-bottom:8px;">IVA REPERCUTIT (vendes)</div>
      <div style="display:flex;gap:32px;">
        <div><div style="font-size:11px;color:var(--text2);">Base imposable</div><div style="font-size:18px;font-weight:500;">${fmtN(d.rB)} €</div></div>
        <div><div style="font-size:11px;color:var(--text2);">Quota IVA</div><div style="font-size:18px;font-weight:500;color:var(--green);">${fmtN(d.rI)} €</div></div>
      </div>
    </div>
    <div style="background:var(--red-bg);border:1px solid var(--red-bd);border-radius:var(--radius);padding:13px 16px;margin-bottom:10px;">
      <div style="font-size:12px;color:var(--red);font-weight:500;margin-bottom:8px;">IVA SUPORTAT (compres i despeses)</div>
      <div style="display:flex;gap:32px;">
        <div><div style="font-size:11px;color:var(--text2);">Base imposable</div><div style="font-size:18px;font-weight:500;">${fmtN(d.sB)} €</div></div>
        <div><div style="font-size:11px;color:var(--text2);">Quota IVA</div><div style="font-size:18px;font-weight:500;color:var(--red);">${fmtN(d.sI)} €</div></div>
      </div>
    </div>
    <div style="background:${d.res>=0?"var(--red-bg)":"var(--green-bg)"};border:1px solid ${d.res>=0?"var(--red-bd)":"var(--green-bd)"};border-radius:var(--radius);padding:13px 18px;margin-bottom:12px;">
      <div style="font-size:12px;font-weight:500;color:${d.res>=0?"var(--red)":"var(--green)"};margin-bottom:4px;">${d.res>=0?"A INGRESSAR A HISENDA":"A COMPENSAR / RETORNAR"}</div>
      <div style="font-size:26px;font-weight:500;color:${d.res>=0?"var(--red)":"var(--green)"};">${fmtN(Math.abs(d.res))} €</div>
    </div>
    <div style="font-size:13px;color:var(--text2);">Termini: <strong style="color:var(--text)">${term[trim]}</strong></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:10px;" onclick="window.print()">🖨 Imprimir / PDF</button>`;
}

// ============================================================
// MODEL 130
// ============================================================
function calcIrpf(any,trim) {
  const mm=[];
  for(let t=1;t<=trim;t++)({1:[0,1,2],2:[3,4,5],3:[6,7,8],4:[9,10,11]}[t]||[]).forEach(m=>mm.push(m));
  let ing=0,des=0;
  const map=cm();
  DB.moviments.forEach(m=>{
    const d=new Date(m.data);
    if(d.getFullYear()!==any||!mm.includes(d.getMonth())) return;
    const c=map[m.compte]; if(!c) return;
    if(c.natura==="Ingrés") ing+=m.baseImp;
    if(c.natura==="Despesa") des+=m.baseImp;
  });
  const rend=ing-des;
  return {ing,des,rend,pag:Math.max(0,rend*0.20)};
}

function initM130() {
  document.getElementById("m130-any").value=new Date().getFullYear();
  ["m130-any","m130-trim"].forEach(id=>document.getElementById(id).addEventListener("change",renderM130));
}

function renderM130() {
  const any=parseInt(document.getElementById("m130-any").value)||new Date().getFullYear();
  const trim=parseInt(document.getElementById("m130-trim").value)||1;
  const d=calcIrpf(any,trim);
  const term={1:"20 d'abril",2:"20 de juliol",3:"20 d'octubre",4:"20 de gener (any seg.)"};
  document.getElementById("m130-cos").innerHTML=`
    <div style="border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px;">
        <span style="color:var(--text2);">Ingressos acumulats (base imposable)</span>
        <span style="font-weight:500;color:var(--green);">${fmtN(d.ing)} €</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--border);font-size:13px;">
        <span style="color:var(--text2);">Despeses deduïbles acumulades</span>
        <span style="font-weight:500;color:var(--red);">${fmtN(d.des)} €</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:10px 14px;font-size:14px;font-weight:500;">
        <span>Rendiment net</span>
        <span style="color:${d.rend>=0?"var(--text)":"var(--red)"};">${fmtN(d.rend)} €</span>
      </div>
    </div>
    <div style="background:var(--amber-bg);border:1px solid var(--amber-bd);border-radius:var(--radius);padding:13px 18px;margin-bottom:12px;">
      <div style="font-size:12px;color:var(--amber);font-weight:500;margin-bottom:4px;">PAGAMENT FRACCIONAT (20% rendiment net)</div>
      <div style="font-size:26px;font-weight:500;color:var(--amber);">${fmtN(d.pag)} €</div>
    </div>
    <div style="font-size:13px;color:var(--text2);">Termini: <strong style="color:var(--text)">${term[trim]}</strong></div>
    <button class="btn btn-secondary btn-sm" style="margin-top:10px;" onclick="window.print()">🖨 Imprimir / PDF</button>`;
}

// ============================================================
// PRÉSTEC
// ============================================================
function initPrestec() {
  document.getElementById("pres-pdata").value = new Date().toISOString().slice(0,10);
  const cfg = DB.prestecConfig||{};
  if(cfg.capital)   document.getElementById("pres-capital").value   = cfg.capital;
  if(cfg.data)      document.getElementById("pres-data").value      = cfg.data;
  if(cfg.anys)      document.getElementById("pres-anys").value      = cfg.anys;
  if(cfg.tipus)     document.getElementById("pres-tipus").value     = cfg.tipus;
  if(cfg.quota)     document.getElementById("pres-quota").value     = cfg.quota;
  if(cfg.banc)      document.getElementById("pres-banc").value      = cfg.banc;

  // Càlcul automàtic total quota
  ["pres-pcapital","pres-pinteressos"].forEach(id =>
    document.getElementById(id).addEventListener("input", () => {
      const cap = parseFloat(document.getElementById("pres-pcapital").value)||0;
      const int = parseFloat(document.getElementById("pres-pinteressos").value)||0;
      document.getElementById("pres-ptotal").value = (cap+int).toFixed(2);
    })
  );

  document.getElementById("btn-desar-pres").addEventListener("click", desarPrestec);
  document.getElementById("btn-afegir-pres").addEventListener("click", afegirPagamentPres);
}

function desarPrestec() {
  DB.prestecConfig = {
    capital: parseFloat(document.getElementById("pres-capital").value)||0,
    data:    document.getElementById("pres-data").value,
    anys:    parseInt(document.getElementById("pres-anys").value)||0,
    tipus:   parseFloat(document.getElementById("pres-tipus").value)||0,
    quota:   parseFloat(document.getElementById("pres-quota").value)||0,
    banc:    document.getElementById("pres-banc").value.trim(),
  };
  desarDB(); renderPrestec();
  const ok = document.getElementById("pres-ok");
  ok.textContent="Dades desades."; ok.classList.remove("hidden");
  setTimeout(()=>ok.classList.add("hidden"),3000);
}

function afegirPagamentPres() {
  const err = document.getElementById("pres-err");
  err.classList.add("hidden");
  const data  = document.getElementById("pres-pdata").value;
  const cap   = parseFloat(document.getElementById("pres-pcapital").value)||0;
  const int   = parseFloat(document.getElementById("pres-pinteressos").value)||0;
  const notes = document.getElementById("pres-pnotes").value.trim();

  if(!data){err.textContent="Cal indicar la data.";err.classList.remove("hidden");return;}
  if(cap<=0&&int<=0){err.textContent="Cal indicar almenys capital o interessos.";err.classList.remove("hidden");return;}

  const total = cap + int;
  if(!DB.pagamentsPres) DB.pagamentsPres=[];
  DB.pagamentsPres.push({id:Date.now()+Math.random(), data, cap, int, total, notes});
  DB.pagamentsPres.sort((a,b)=>a.data.localeCompare(b.data));

  // Generar apunts comptables automàtics
  const desc = "Quota préstec reforma" + (notes?" — "+notes:"");
  if(cap>0) {
    // Retorn capital: Deure 170 / Haver 572
    DB.moviments.push({id:Date.now()+Math.random()+0.2,data,
      desc,compte:"170",nomCompte:"Deutes a llarg termini (crèdit reforma)",
      sentit:"sortida",importBrut:cap,pctIva:0,baseImp:cap,quotaIva:0,
      canal:"",notes,natura:"Passiu",grup:"1",esContrapartida:false,
      contrapartida:"572",nomContrapartida:"Banc — compte corrent"
    });
    DB.moviments.push({id:Date.now()+Math.random()+0.3,data,
      desc:"(Contrapartida capital) "+desc,compte:"572",
      nomCompte:"Banc — compte corrent",sentit:"entrada",
      importBrut:cap,pctIva:0,baseImp:cap,quotaIva:0,
      canal:"",notes,natura:"Actiu",grup:"5",esContrapartida:true
    });
  }
  if(int>0) {
    // Interessos: Deure 662 / Haver 572
    DB.moviments.push({id:Date.now()+Math.random()+0.4,data,
      desc:"Interessos "+desc,compte:"662",
      nomCompte:"Interessos de deutes",
      sentit:"sortida",importBrut:int,pctIva:0,baseImp:int,quotaIva:0,
      canal:"",notes,natura:"Despesa",grup:"6",esContrapartida:false,
      contrapartida:"572",nomContrapartida:"Banc — compte corrent"
    });
    DB.moviments.push({id:Date.now()+Math.random()+0.5,data,
      desc:"(Contrapartida interessos) "+desc,compte:"572",
      nomCompte:"Banc — compte corrent",sentit:"entrada",
      importBrut:int,pctIva:0,baseImp:int,quotaIva:0,
      canal:"",notes,natura:"Actiu",grup:"5",esContrapartida:true
    });
  }

  DB.moviments.sort((a,b)=>a.data.localeCompare(b.data));
  desarDB(); renderPrestec(); renderDiari();

  document.getElementById("pres-pcapital").value="";
  document.getElementById("pres-pinteressos").value="";
  document.getElementById("pres-ptotal").value="";
  document.getElementById("pres-pnotes").value="";
}

function renderPrestec() {
  const cfg  = DB.prestecConfig||{};
  const pags = DB.pagamentsPres||[];
  const capitalInicial = cfg.capital||0;
  const totalCapRetornat = pags.reduce((s,p)=>s+p.cap,0);
  const totalInt         = pags.reduce((s,p)=>s+p.int,0);
  const capitalPendent   = Math.max(0, capitalInicial - totalCapRetornat);

  document.getElementById("pres-metrics").innerHTML=`
    <div class="metric"><div class="metric-lbl">Capital inicial</div><div class="metric-val">${fmtN(capitalInicial)} €</div></div>
    <div class="metric"><div class="metric-lbl">Capital retornat</div><div class="metric-val" style="color:var(--green)">${fmtN(totalCapRetornat)} €</div></div>
    <div class="metric"><div class="metric-lbl">Capital pendent</div><div class="metric-val" style="color:var(--red)">${fmtN(capitalPendent)} €</div></div>
    <div class="metric"><div class="metric-lbl">Interessos pagats</div><div class="metric-val" style="color:var(--amber)">${fmtN(totalInt)} €</div></div>
    <div class="metric"><div class="metric-lbl">Quotes pagades</div><div class="metric-val">${pags.length}</div></div>
    <div class="metric"><div class="metric-lbl">Entitat</div><div class="metric-val" style="font-size:14px;">${esc(cfg.banc||"—")}</div></div>`;

  if(!pags.length){
    document.getElementById("tbody-pres").innerHTML=`<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text3)">Cap pagament registrat.</td></tr>`;
    document.getElementById("tfoot-pres").innerHTML="";
    return;
  }

  let capAcum=0;
  document.getElementById("tbody-pres").innerHTML=pags.map(p=>{
    capAcum+=p.cap;
    const pendent=Math.max(0,capitalInicial-capAcum);
    return `<tr>
      <td class="mono">${esc(p.data)}</td>
      <td class="r">${fmtN(p.cap)} €</td>
      <td class="r" style="color:var(--amber)">${fmtN(p.int)} €</td>
      <td class="r"><strong>${fmtN(p.total)} €</strong></td>
      <td class="r" style="color:var(--red)">${fmtN(pendent)} €</td>
      <td class="muted">${esc(p.notes||"—")}</td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarPagPres(${p.id})">✕</button></td>
    </tr>`;
  }).join("");

  document.getElementById("tfoot-pres").innerHTML=`<tr>
    <td style="text-align:right;font-size:12px;color:var(--text2);">TOTALS</td>
    <td class="r">${fmtN(totalCapRetornat)} €</td>
    <td class="r" style="color:var(--amber)">${fmtN(totalInt)} €</td>
    <td class="r"><strong>${fmtN(totalCapRetornat+totalInt)} €</strong></td>
    <td class="r" style="color:var(--red)">${fmtN(capitalPendent)} €</td>
    <td colspan="2"></td>
  </tr>`;
}

function eliminarPagPres(id) {
  if(!confirm("Eliminar aquest pagament? Els apunts comptables associats també s'eliminaran.")) return;
  DB.pagamentsPres=(DB.pagamentsPres||[]).filter(p=>p.id!==id);
  desarDB(); renderPrestec(); renderDiari();
}

// ============================================================
// AUTÒNOM
// ============================================================
const MESOS = ["Gener","Febrer","Març","Abril","Maig","Juny","Juliol","Agost","Setembre","Octubre","Novembre","Desembre"];

function initAutonom() {
  const any = new Date().getFullYear();
  document.getElementById("aut-any").value = any;
  document.getElementById("aut-data").value = new Date().toISOString().slice(0,10);
  document.getElementById("aut-mes").value = String(new Date().getMonth()+1);

  // Carregar config desada
  const cfg = DB.autonomConfig || {};
  if(cfg.base)  document.getElementById("aut-base").value  = cfg.base;
  if(cfg.quota) document.getElementById("aut-quota").value = cfg.quota;
  if(cfg.tram)  document.getElementById("aut-tram").value  = cfg.tram;
  if(cfg.bonif) document.getElementById("aut-bonif").value = cfg.bonif;
  if(cfg.any)   document.getElementById("aut-any").value   = cfg.any;

  document.getElementById("btn-desar-aut").addEventListener("click", desarConfigAutonom);
  document.getElementById("btn-afegir-aut").addEventListener("click", afegirPagamentAut);
  document.getElementById("aut-any").addEventListener("change", renderAutonom);
}

function desarConfigAutonom() {
  DB.autonomConfig = {
    base:  parseFloat(document.getElementById("aut-base").value)||0,
    quota: parseFloat(document.getElementById("aut-quota").value)||0,
    tram:  document.getElementById("aut-tram").value,
    bonif: document.getElementById("aut-bonif").value,
    any:   parseInt(document.getElementById("aut-any").value),
  };
  desarDB(); renderAutonom();
  const ok = document.getElementById("aut-ok");
  ok.textContent="Configuració desada."; ok.classList.remove("hidden");
  setTimeout(()=>ok.classList.add("hidden"),3000);
}

function afegirPagamentAut() {
  const err = document.getElementById("aut-err");
  err.classList.add("hidden");
  const data = document.getElementById("aut-data").value;
  const imp  = parseFloat(document.getElementById("aut-imp").value)||0;
  const mes  = parseInt(document.getElementById("aut-mes").value);
  const notes= document.getElementById("aut-notes").value.trim();
  if(!data){err.textContent="Cal indicar la data.";err.classList.remove("hidden");return;}
  if(imp<=0){err.textContent="Cal indicar un import vàlid.";err.classList.remove("hidden");return;}

  if(!DB.pagamentsAut) DB.pagamentsAut=[];
  DB.pagamentsAut.push({id:Date.now()+Math.random(), data, imp, mes, notes});
  DB.pagamentsAut.sort((a,b)=>a.data.localeCompare(b.data));
  desarDB(); renderAutonom();

  document.getElementById("aut-imp").value="";
  document.getElementById("aut-notes").value="";
}

function renderAutonom() {
  const any = parseInt(document.getElementById("aut-any").value)||new Date().getFullYear();
  const cfg  = DB.autonomConfig||{};
  const pags = (DB.pagamentsAut||[]).filter(p=>new Date(p.data).getFullYear()===any);

  // Mètriques
  const totalPagat = pags.reduce((s,p)=>s+p.imp,0);
  const mesosP     = new Set(pags.map(p=>p.mes)).size;
  const quotaMens  = cfg.quota||0;
  const prevAnual  = quotaMens*12;
  document.getElementById("aut-metrics").innerHTML=`
    <div class="metric"><div class="metric-lbl">Quota mensual</div><div class="metric-val">${fmtN(quotaMens)} €</div></div>
    <div class="metric"><div class="metric-lbl">Total pagat ${any}</div><div class="metric-val" style="color:var(--red)">${fmtN(totalPagat)} €</div></div>
    <div class="metric"><div class="metric-lbl">Previsió anual</div><div class="metric-val">${fmtN(prevAnual)} €</div></div>
    <div class="metric"><div class="metric-lbl">Mesos registrats</div><div class="metric-val" style="color:${mesosP===12?"var(--green)":mesosP>0?"var(--amber)":"var(--text)"}">${mesosP}/12</div></div>`;

  // Taula pagaments
  const tbody = document.getElementById("tbody-aut");
  const tfoot = document.getElementById("tfoot-aut");
  if(!pags.length){
    tbody.innerHTML=`<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text3)">Cap pagament registrat per a ${any}.</td></tr>`;
    tfoot.innerHTML=""; return;
  }

  // Marcar mesos pagats
  const mesosPagats = new Set(pags.map(p=>p.mes));
  tbody.innerHTML=pags.map(p=>`<tr>
    <td class="mono">${esc(p.data)}</td>
    <td>${esc(MESOS[p.mes-1])}</td>
    <td class="r"><strong>${fmtN(p.imp)} €</strong></td>
    <td class="muted">${esc(p.notes||"—")}</td>
    <td><button class="btn btn-danger btn-sm" onclick="eliminarPagAut(${p.id})">✕</button></td>
  </tr>`).join("");

  tfoot.innerHTML=`<tr>
    <td colspan="2" style="text-align:right;font-size:12px;color:var(--text2);">TOTAL PAGAT ${any}</td>
    <td class="r" style="font-weight:500;">${fmtN(totalPagat)} €</td>
    <td colspan="2"></td>
  </tr>`;

  // Avís mesos sense registre
  const mesosFalta = MESOS.map((m,i)=>i+1).filter(m=>!mesosPagats.has(m));

  // Impacte Model 130
  const irpf = calcIrpf(any, 4); // acumulat anual
  const despesesSenseAut = irpf.des;
  const rendAmbAut  = irpf.ing - despesesSenseAut - totalPagat;
  const pagAmbAut   = Math.max(0, rendAmbAut * 0.20);
  const estalvi     = Math.max(0, irpf.pag - pagAmbAut);

  document.getElementById("aut-impacte130").innerHTML=`
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:14px;">
      <div class="metric"><div class="metric-lbl">Ingressos ${any}</div><div class="metric-val">${fmtN(irpf.ing)} €</div></div>
      <div class="metric"><div class="metric-lbl">Despeses (sense RETA)</div><div class="metric-val">${fmtN(despesesSenseAut)} €</div></div>
      <div class="metric"><div class="metric-lbl">Quotes RETA pagades</div><div class="metric-val" style="color:var(--red)">${fmtN(totalPagat)} €</div></div>
      <div class="metric"><div class="metric-lbl">Rendiment net final</div><div class="metric-val" style="color:${rendAmbAut>=0?"var(--text)":"var(--red)"}">${fmtN(rendAmbAut)} €</div></div>
      <div class="metric"><div class="metric-lbl">IRPF estimat (20%)</div><div class="metric-val" style="color:var(--amber)">${fmtN(pagAmbAut)} €</div></div>
      <div class="metric"><div class="metric-lbl">Estalvi fiscal RETA</div><div class="metric-val" style="color:var(--green)">${fmtN(estalvi)} €</div></div>
    </div>
    ${mesosFalta.length?`<div class="alert aw">Mesos sense pagament registrat: <strong>${mesosFalta.map(m=>MESOS[m-1]).join(", ")}</strong>. Recorda que les quotes s'han de registrar al full Entrada/Sortida amb el compte 642 perquè comptin com a despesa deduïble.</div>`:""}
    <div class="alert ai" style="font-size:12px;">
      El rendiment net mostrat inclou les quotes RETA com a despesa deduïble. Si al full Entrada/Sortida ja has registrat els pagaments de la quota (compte 642), <strong>no els dupliquis aquí</strong> — aquest registre és informatiu per fer el seguiment mensual.
    </div>`;
}

function eliminarPagAut(id) {
  if(!confirm("Eliminar aquest pagament?")) return;
  DB.pagamentsAut=(DB.pagamentsAut||[]).filter(p=>p.id!==id);
  desarDB(); renderAutonom();
}

// ============================================================
// CALENDARI
// ============================================================
function initCalendari() {
  document.getElementById("cal-any").value=new Date().getFullYear();
  document.getElementById("cal-any").addEventListener("change",renderCalendari);
}

function renderCalendari() {
  const any=parseInt(document.getElementById("cal-any").value)||new Date().getFullYear();
  const trims=[
    {t:1,p:"1r trimestre (gen–mar)",term:"20 d'abril"},
    {t:2,p:"2n trimestre (abr–jun)",term:"20 de juliol"},
    {t:3,p:"3r trimestre (jul–set)",term:"20 d'octubre"},
    {t:4,p:"4t trimestre (oct–des)",term:"20 de gener (any seg.)",extra:"390"},
  ];
  document.getElementById("fiscal-grid").innerHTML=trims.map(tr=>{
    const iv=calcIva(any,tr.t), ir=calcIrpf(any,tr.t);
    return `<div class="fiscal-card">
      <div style="font-weight:500;font-size:13px;margin-bottom:3px;">${tr.p}</div>
      <div style="font-size:11px;color:var(--text2);margin-bottom:10px;">Termini: <strong>${tr.term}</strong></div>
      <div style="margin-bottom:7px;">${bdg("Model 303","b")}<div style="font-size:11px;color:var(--text2);">IVA trimestral</div>
        <div style="font-size:13px;color:${iv.res>=0?"var(--red)":"var(--green)"};">${fmtN(Math.abs(iv.res))} € ${iv.res>=0?"a ingressar":"a compensar"}</div>
      </div>
      <div style="margin-bottom:7px;">${bdg("Model 130","a")}<div style="font-size:11px;color:var(--text2);">IRPF fraccionat</div>
        <div style="font-size:13px;color:var(--amber);">${fmtN(ir.pag)} € a ingressar</div>
      </div>
      ${tr.extra?`<div>${bdg("Model 390","g")}<div style="font-size:11px;color:var(--text2);">Resum anual IVA (informatiu)</div></div>`:""}
    </div>`;
  }).join("");
}

// ============================================================
// PLA DE COMPTES
// ============================================================
function renderPla() {
  const s=calcSaldos();
  const nb={Ingrés:"g",Despesa:"a",Actiu:"b",Passiu:"gr"};
  let h="";
  ["1","2","3","4","5","6","7"].forEach(g=>{
    const cg=DB.comptes.filter(c=>c.grup===g); if(!cg.length) return;
    h+=`<tr><td colspan="6" style="padding:9px 9px 3px;font-size:11px;font-weight:500;color:var(--text2);background:var(--bg3);letter-spacing:.8px;text-transform:uppercase;">Grup ${g}</td></tr>`;
    cg.forEach(c=>{
      const sv=saldo(c.codi,s);
      h+=`<tr><td class="mono">${esc(c.codi)}</td><td>${esc(c.nom)}</td>
        <td>${bdg(c.natura,nb[c.natura]||"gr")}</td>
        <td class="muted">${tipus(c.natura)}</td>
        <td class="r muted">${c.iva>0?c.iva+"%":"—"}</td>
        <td class="r" style="color:${sv===0?"var(--text3)":"var(--text)"}"><strong>${fmt(sv)}</strong></td>
      </tr>`;
    });
  });
  document.getElementById("tbody-pla").innerHTML=h;
}

// ============================================================
// EXPORTACIÓ
// ============================================================
function exportCSV() {
  if(!DB.moviments.length){alert("No hi ha moviments per exportar.");return;}
  const cap=["Data","Descripció","Compte","Nom compte","Sentit","Base imposable","% IVA","Quota IVA","Total","Canal","Notes"];
  const files=DB.moviments.map(m=>[m.data,m.desc||"",m.compte,m.nomCompte,m.sentit,
    fmtN(m.baseImp),m.pctIva,fmtN(m.quotaIva),fmtN(m.importBrut),m.canal||"",m.notes||""
  ].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";"));
  baixar("moviments_"+new Date().toISOString().slice(0,10)+".csv","\uFEFF"+[cap.join(";"),...files].join("\r\n"),"text/csv;charset=utf-8;");
}

function exportJSON() {
  baixar("copia_"+new Date().toISOString().slice(0,10)+".json",JSON.stringify(DB,null,2),"application/json");
}

function importJSON(e) {
  const f=e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=ev=>{
    try {
      const d=JSON.parse(ev.target.result);
      if(!d.comptes||!Array.isArray(d.moviments)) throw new Error("Format invàlid");
      if(!confirm(`Importar ${d.moviments.length} moviments i ${d.reserves?.length||0} reserves? Les dades actuals es sobreescriuran.`)) return;
      DB.comptes=d.comptes; DB.moviments=d.moviments;
      DB.reserves=d.reserves||[]; DB.habitacions=d.habitacions||JSON.parse(JSON.stringify(HABS_DEFAULT));
      desarDB(); renderTot(); alert("Còpia restaurada correctament.");
    } catch(err){alert("Error: "+err.message);}
    e.target.value="";
  };
  r.readAsText(f);
}

function baixar(nom,contingut,tipus) {
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([contingut],{type:tipus}));
  a.download=nom; document.body.appendChild(a); a.click();
  document.body.removeChild(a);
}

// ============================================================
// RENDER TOTAL + INIT
// ============================================================
function renderTot() {
  omplirSelect("mov-compte",""); omplirSelect("major-compte",""); omplirSelect("edit-compte","");
  omplirSelectHabs("res-hab",""); omplirSelectHabs("redit-hab","");
  renderDiari(); renderReserves(); renderTarifes();
  renderCerca(""); renderMajor(); renderBalanc();
  renderM303(); renderM130(); renderCalendari(); renderPla();
}

document.addEventListener("DOMContentLoaded",()=>{
  carregarDB();
  initNav(); initDiari(); initReserves(); initTarifes();
  initCerca(); initNouCompte();   initLlibreDiari();
  initMajor();
  initM303(); initM130();   initPrestec();
  initAutonom();
  initCalendari();

  document.getElementById("btn-exp-pla").addEventListener("click",()=>{
    const s=calcSaldos();
    const cap=["Codi","Nom","Natura","Tipus","IVA","Saldo"];
    const files=DB.comptes.map(c=>[c.codi,c.nom,c.natura,tipus(c.natura),c.iva+"%",fmtN(saldo(c.codi,s))].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(";"));
    baixar("pla_de_comptes.csv","\uFEFF"+[cap.join(";"),...files].join("\r\n"),"text/csv;charset=utf-8;");
  });

  // Modals edició moviment
  document.getElementById("btn-cancel-edit").addEventListener("click",tancarEditMov);
  document.getElementById("btn-desar-edit").addEventListener("click",desarEditMov);
  document.getElementById("modal-mov").addEventListener("click",e=>{if(e.target===e.currentTarget)tancarEditMov();});

  // Modals edició reserva
  document.getElementById("btn-cancel-res").addEventListener("click",tancarEditRes);
  document.getElementById("btn-desar-res").addEventListener("click",desarEditRes);
  document.getElementById("modal-res").addEventListener("click",e=>{if(e.target===e.currentTarget)tancarEditRes();});

  renderTot();
  setInterval(()=>{if(DB.moviments.length||DB.reserves.length)desarDB();},120000);
  document.getElementById("sb-info").textContent=`${DB.moviments.length} moviments carregats`;
});
</script>
</body>
</html>