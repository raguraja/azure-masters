'use strict';

// ── State ──────────────────────────────────────────────────────────────────────
let currentRoute = 'hub';
let currentExam = null;
let currentDomain = null;
let currentSection = null;
let quizState = {};
const visited = JSON.parse(localStorage.getItem('az-visited') || '{}');

// ── Theme ─────────────────────────────────────────────────────────────────────
(function initTheme() {
  if (localStorage.getItem('az-theme') === 'light') {
    document.body.classList.add('light');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = '☀️';
  }
})();
function toggleTheme() {
  const light = document.body.classList.toggle('light');
  localStorage.setItem('az-theme', light ? 'light' : 'dark');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = light ? '☀️' : '🌙';
  // Re-init map so node/link colors update immediately
  window._mapInited = {};
  const overlay = document.getElementById('mapOverlay');
  if (overlay && overlay.style.display !== 'none') {
    initAzureMap('mapTree');
    window._mapInited.mapTree = true;
    renderMapLegend();
  }
}

// ── Keyboard Navigation ────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  if (!currentExam || !currentDomain || !currentSection) return;
  const exam = window.EXAMS?.[currentExam];
  if (!exam) return;
  const allSecs = exam.domains.flatMap(d => d.sections.map(s => ({domainId:d.id,sectionId:s.id})));
  const idx = allSecs.findIndex(s => s.domainId===currentDomain && s.sectionId===currentSection);
  if (e.key === 'ArrowRight' && allSecs[idx+1]) navigate(`${currentExam}/${allSecs[idx+1].domainId}/${allSecs[idx+1].sectionId}`);
  if (e.key === 'ArrowLeft' && allSecs[idx-1]) navigate(`${currentExam}/${allSecs[idx-1].domainId}/${allSecs[idx-1].sectionId}`);
  if (e.key === 'q' || e.key === 'Q') navigate(`${currentExam}/quiz`);
  if (e.key === 'Escape') navigate(currentExam);
});

// ── Cheat Sheet ────────────────────────────────────────────────────────────────
function openCheatSheet(examId) {
  const exam = window.EXAMS?.[examId];
  if (!exam) return;
  const existing = document.getElementById('cheatSheetOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'cheatSheetOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(5,8,15,0.97);z-index:600;overflow-y:auto;padding:0;display:flex;flex-direction:column';

  const header = `<div style="position:sticky;top:0;background:rgba(5,8,15,0.98);border-bottom:1px solid var(--border);padding:16px 28px;display:flex;align-items:center;gap:16px;backdrop-filter:blur(12px)">
    <span style="font-size:22px;font-weight:900;color:${exam.meta.color}">${exam.meta.icon} ${exam.meta.code}</span>
    <span style="font-size:14px;color:var(--text-dim)">Quick Reference Cheat Sheet</span>
    <div style="margin-left:auto;display:flex;gap:8px">
      <span style="font-size:11px;color:var(--text-muted);align-self:center">← → navigate · Q quiz · Esc close</span>
      <button onclick="document.getElementById('cheatSheetOverlay').remove()" style="padding:6px 16px;background:rgba(255,255,255,0.06);border:1px solid var(--border);color:var(--text);border-radius:7px;cursor:pointer;font-family:inherit;font-size:12px">✕ Close</button>
    </div>
  </div>`;

  const content = exam.domains.map(domain => `
    <div style="padding:24px 28px;border-bottom:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <div style="width:4px;height:24px;border-radius:2px;background:${domain.color}"></div>
        <h2 style="font-size:16px;font-weight:700;color:${domain.color}">${domain.name}</h2>
        <span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:10px;background:${domain.color}15;color:${domain.color};border:1px solid ${domain.color}30">${domain.weight}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px">
        ${domain.sections.map(sec => `
          <div onclick="document.getElementById('cheatSheetOverlay').remove();navigate('${examId}/${domain.id}/${sec.id}')"
               style="padding:14px;border-radius:9px;background:rgba(255,255,255,0.03);border:1px solid ${domain.color}25;cursor:pointer;transition:all 0.15s"
               onmouseover="this.style.background='rgba(255,255,255,0.06)';this.style.borderColor='${domain.color}50'"
               onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.borderColor='${domain.color}25'">
            <div style="font-size:16px;margin-bottom:6px">${sec.icon}</div>
            <div style="font-size:13px;font-weight:700;color:${domain.color};margin-bottom:6px">${sec.title}</div>
            ${getCheatSheetFacts(examId, domain.id, sec.id)}
          </div>`).join('')}
      </div>
    </div>`).join('');

  overlay.innerHTML = header + `<div style="flex:1">${content}</div>`;
  document.body.appendChild(overlay);
}

function getCheatSheetFacts(examId, domainId, sectionId) {
  const facts = CHEAT_FACTS[`${examId}/${domainId}/${sectionId}`] || [];
  if (!facts.length) return `<div style="font-size:11px;color:var(--text-muted)">Click to study this section →</div>`;
  return facts.map(f => `<div style="font-size:11px;color:var(--text-dim);margin-bottom:3px;display:flex;gap:6px"><span style="color:var(--text-muted);flex-shrink:0">›</span>${f}</div>`).join('');
}

const CHEAT_FACTS = {
  'az104/identity/azure-ad': ['Azure AD ≠ Windows AD (OAuth not LDAP)','PHS = hash in cloud, works offline','PTA = realtime validation, needs connectivity','Managed Identity = no credentials to manage'],
  'az104/identity/rbac': ['Owner > Contributor > Reader > User Access Admin','Locks override RBAC — even Owner blocked','Policy Deny > Audit > Modify > DeployIfNotExists','Tags NOT inherited — use Policy to enforce'],
  'az104/storage/storage-accounts': ['LRS→ZRS→GRS→GZRS (protection level)','RA-GZRS = max availability + read access','Hot/Cool/Cold/Archive tiers (access vs cost)','User Delegation SAS = most secure'],
  'az104/compute/vms': ['Avail Set: 3FD, 20UD, same DC, 99.95%','Avail Zone: separate DCs, 99.99%','Premium SSD → Ultra Disk (IOPS order)','VMSS: OldestVM / NewestVM / Default scale-in'],
  'az104/networking/vnets': ['VNet peering: non-transitive, no overlap','NSG: lower priority # = higher precedence','UDR 0.0.0.0/0→NVA = force-tunneling','Service EP: free, VNet-only. PE: paid, cross-VNet'],
  'az104/networking/lb': ['LB=L4 regional. AppGW=L7 regional. TM=DNS global. FD=CDN+L7 global','TM routing: Priority/Weighted/Performance/Geographic','VpnGw1+ for BGP and active-active','ExpressRoute = private (no internet), up to 100Gbps'],
  'az104/networking/dns': ['Alias record for apex domain → Azure resources','Private DNS zone: link to each VNet needing resolution','168.63.129.16 = Azure DNS resolver in VNets','Private Endpoint needs privatelink.*.zone or DNS fails'],
  'az104/monitoring/monitor': ['Metrics: 93d retention, numeric, near-realtime','Logs: 30-730d, KQL, Log Analytics workspace','DiagSettings→LA→Storage→EventHub','Soft Delete = 14d. Immutable vault = permanent lock'],
  'az500/identity-access/conditional-access': ['CA: IF (signals) THEN (grant/block/session)','Report-only mode = test without enforcing','MFA factors: know/have/are — need 2 categories','PIM: eligible→activate→active (time-limited)'],
  'az500/network-security/firewall': ['Firewall Standard: FQDN, ThreatIntel, rules','Firewall Premium adds: IDPS + TLS inspection','WAF: Detection (log) → Prevention (block)','DDoS Basic=free. Standard=paid+SLA+analytics'],
  'az500/compute-security/defender': ['Secure Score 0-100. Higher=better posture','JIT: deny RDP/SSH by default, open on request','Soft Delete=14d. Immutable vault=permanent','MMK=default. CMK=customer controls keys in KV'],
  'az500/security-ops/sentinel': ['SIEM+SOAR. Workspace-based (Log Analytics)','Rules: Scheduled/NRT/MSSecurity/Anomaly/Fusion','Fusion = ML correlation → high-fidelity incidents','Playbooks = Logic Apps for automated response'],
  'az400/source-control/git-strategy': ['GitFlow: long-lived branches (main/develop/feature)','GitHub Flow: short-lived, deploy from main','Trunk-Based: all commit to main daily + feature flags','Branch policies: min reviewers, build validation'],
  'az400/pipelines/yaml-pipelines': ['Pipeline>Stages>Jobs>Steps hierarchy','dependsOn + condition: succeeded()','Environments: approval gates, deployment history','OIDC = keyless auth from GitHub→Azure'],
  'az400/pipelines/iac': ['ARM=verbose JSON. Bicep=clean DSL→ARM. TF=multi-cloud','what-if / terraform plan before apply','Bicep modules = reusable components','IaC scanning: Checkov, tfsec, Defender for DevOps'],
  'az400/security-pipelines/devsecops': ['SAST=static code. DAST=running app. SCA=dependencies','Shift Left = security earlier in SDLC','Secret scan: GitLeaks, GitHub Secret Scanning','Container scan: Trivy, Grype, ACR Task scanning'],
  'az305/identity-governance-monitoring/governance-design': ['MG: 6 levels deep, 10k MGs per tenant','CAF phases: Strategy→Plan→Ready→Adopt→Govern→Manage','Landing Zones = governed Azure foundation','WAF pillars: Reliability,Security,Cost,Performance,OpsEx'],
  'az305/data-storage/storage-decisions': ['Cosmos: Strong>BoundedStaleness>Session>ConsistentPrefix>Eventual','Session = default, read-your-writes, most used','Hyperscale = 100TB SQL. BusinessCritical = highest perf','ADLS Gen2 = Blob + hierarchical namespace for analytics'],
  'az305/business-continuity/ha-dr': ['RPO=data loss tolerance. RTO=downtime tolerance','Active-Active: RTO≈0, RPO≈0, 2x cost','Active-Passive: minutes RTO, minutes RPO','6Rs: Rehost/Refactor/Rearchitect/Rebuild/Replace/Retire'],
  'az700/hybrid-networking/vpn-expressroute': ['VPN: encrypted, over internet, up to 10Gbps','ExpressRoute: private, NOT internet, up to 100Gbps','Active-Active VPN: 2 IPs, 2 BGP peers, no SPOF','FastPath: bypass GW for data plane, needs UltraPerf GW'],
  'az700/core-networking/dns-design': ['Azure DNS: 100% SLA, anycast, alias records for apex','Private DNS: link to VNet, autoregistration, privatelink.*','Split-horizon: same name→private inside, public outside','168.63.129.16 = magic Azure DNS IP in every VNet'],
  'az700/routing/routing-deep': ['UDR > BGP routes > System routes (priority order)','Longer prefix always wins (more specific route)','Route Server: BGP peering for NVAs, no VPN GW needed','0.0.0.0/0→NVA = force-tunnel all internet traffic'],
  'az700/private-access/private-link': ['PE: private IP in VNet, works across peering/VPN/ER','Service EP: VNet-only, free, no private IP','Private Link Service: publish YOUR service behind PE','Must link private DNS zone to ALL resolving VNets'],
};


// ── Router ─────────────────────────────────────────────────────────────────────
function navigate(route) {
  // route formats: 'hub', 'map', 'az104', 'az104/identity', 'az104/identity/azure-ad', 'az104/quiz'
  currentRoute = route;
  const parts = route.split('/');
  const examId = parts[0];
  const domainId = parts[1];
  const sectionId = parts[2];

  // Update exam pills
  document.querySelectorAll('.ep-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-route="${examId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (route === 'hub') { renderHub(); renderHubSidebar(); return; }
  if (route === 'map') { renderHub(); renderHubSidebar(); openMap(); return; }

  const exam = window.EXAMS?.[examId];
  if (!exam) { renderHub(); return; }

  currentExam = examId;
  currentDomain = domainId || null;
  currentSection = sectionId || null;

  renderExamSidebar(exam, domainId, sectionId);

  if (domainId === 'quiz') {
    renderQuizPage(exam);
  } else if (domainId && sectionId) {
    renderSection(exam, domainId, sectionId);
  } else if (domainId) {
    renderDomainOverview(exam, domainId);
  } else {
    renderExamOverview(exam);
  }

  window.scrollTo(0, 0);
}

// ── Sidebar ────────────────────────────────────────────────────────────────────
function renderHubSidebar() {
  const sb = document.getElementById('sidebarContent');
  if (!sb) return;
  sb.innerHTML = `
    <div style="padding:12px 16px;border-bottom:1px solid var(--border)">
      <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="openMap()">🗺️ Azure Service Map</button>
    </div>
    <div style="padding:20px 16px;border-bottom:1px solid var(--border)">
      <div style="font-size:22px;font-weight:900;background:linear-gradient(135deg,#50abf1,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Azure</div>
      <div style="font-size:11px;color:var(--text-dim);margin-top:4px">SRE & Administration Hub</div>
    </div>
    <div style="padding:12px 16px;border-bottom:1px solid var(--border)">
      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:10px">EXAM PATHS</div>
      ${Object.values(window.EXAMS || {}).map(e=>`
        <div onclick="navigate('${e.meta.code.toLowerCase().replace('-','')}');" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:all 0.15s;margin-bottom:4px" onmouseover="this.style.background='rgba(255,255,255,0.04)'" onmouseout="this.style.background='transparent'">
          <span style="font-size:16px">${e.meta.icon}</span>
          <div><div style="font-size:12px;font-weight:700;color:${e.meta.color}">${e.meta.code}</div><div style="font-size:10px;color:var(--text-muted)">${e.meta.level}</div></div>
        </div>`).join('')}
    </div>`;
}

function renderExamSidebar(exam, activeDomain, activeSection) {
  const sb = document.getElementById('sidebarContent');
  if (!sb) return;
  const id = exam.meta.code.toLowerCase().replace('-','');

  // Overall progress for this exam
  const allSections = exam.domains.flatMap(d => d.sections.map(s => `${id}/${d.id}/${s.id}`));
  const visitedCount = allSections.filter(k => visited[k]).length;
  const progPct = allSections.length ? Math.round((visitedCount / allSections.length) * 100) : 0;

  sb.innerHTML = `
    <div class="sb-exam-badge" style="border-bottom:3px solid ${exam.meta.color}20">
      <div class="sb-badge-code" style="color:${exam.meta.color}">${exam.meta.icon} ${exam.meta.code}</div>
      <div class="sb-badge-name">${exam.meta.name}</div>
      <div class="sb-badge-meta">
        <span class="sb-badge-tag" style="border-color:${exam.meta.color}40;color:${exam.meta.color};background:${exam.meta.color}15">${exam.meta.level}</span>
        <span class="sb-badge-tag" style="border-color:var(--border);color:var(--text-dim)">⏱ ${exam.meta.duration}min</span>
        <span class="sb-badge-tag" style="border-color:var(--border);color:var(--text-dim)">✓ ${exam.meta.passing}</span>
      </div>
    </div>
    <div class="sb-progress">
      <div class="sb-prog-label"><span>Progress</span><span>${progPct}%</span></div>
      <div class="sb-prog-bar"><div class="sb-prog-fill" style="width:${progPct}%;background:${exam.meta.color}"></div></div>
    </div>
    <div class="sb-section-label">DOMAINS</div>
    ${exam.domains.map(domain => {
      const isOpen = domain.id === activeDomain;
      return `<div class="sb-domain ${isOpen?'open':''}" id="sbdomain-${domain.id}">
        <div class="sb-domain-header ${isOpen?'open':''}" onclick="toggleDomain('${domain.id}')">
          <span>${domain.name}</span>
          <span class="sb-domain-weight">${domain.weight}</span>
          <span class="sb-domain-arrow">›</span>
        </div>
        <div class="sb-domain-sections">
          ${domain.sections.map(sec => {
            const key = `${id}/${domain.id}/${sec.id}`;
            const isActive = domain.id === activeDomain && sec.id === activeSection;
            const isVisited = !!visited[key];
            return `<div class="sb-section-link ${isActive?'active':''} ${isVisited?'visited':''}"
              onclick="navigate('${id}/${domain.id}/${sec.id}')" style="color:${isActive?domain.color:''}">
              ${sec.icon} ${sec.title}
              <div class="sb-section-dot"></div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}
    <div style="height:1px;background:var(--border);margin:8px 16px"></div>
    <div class="sb-quiz-link" onclick="navigate('${id}/quiz')" style="color:${currentSection==='quiz'?exam.meta.color:''}">
      🎯 Practice Quiz <span style="margin-left:auto;font-size:11px;color:var(--text-muted)">${exam.quiz.length}Q</span>
    </div>
    <div class="sb-quiz-link" onclick="openCheatSheet('${id}')" style="color:var(--text-dim)">
      📋 Cheat Sheet <span style="margin-left:auto;font-size:10px;color:var(--text-muted)">Quick Ref</span>
    </div>
    <div style="padding:12px 16px">
      <div class="sb-section-label" style="padding:0 0 8px 0">PREREQUISITES</div>
      <div style="font-size:11px;color:var(--text-dim)">${exam.meta.prereq}</div>
    </div>`;
}

function toggleDomain(domainId) {
  const el = document.getElementById(`sbdomain-${domainId}`);
  if (el) el.classList.toggle('open');
  const hdr = el?.querySelector('.sb-domain-header');
  if (hdr) hdr.classList.toggle('open');
}

// ── Hub Page ───────────────────────────────────────────────────────────────────
function renderHub() {
  const pg = document.getElementById('pageContent');
  if (!pg) return;

  const roleGroups = {
    'Fundamentals': ['az900'],
    'SRE / Platform Engineering': ['az104','az400'],
    'Architecture': ['az305'],
    'Security': ['az500'],
    'Networking': ['az700']
  };

  pg.innerHTML = `
    <div class="hub-hero">
      <div class="hub-title"><span class="hub-grad">Azure</span><br>Azure for SRE &amp; Administration</div>
      <p class="hub-desc">Comprehensive exam prep for 6 Azure certifications. Interactive flowcharts, service hierarchies, and 100+ practice questions.</p>
      <div class="hub-cta">
        <button class="btn btn-primary" onclick="navigate('az104')">⚙️ Start with AZ-104 Admin</button>
        <button class="btn btn-secondary" onclick="openMap()">🗺️ Explore Azure Services Map</button>
      </div>
      <div class="hub-stats">
        <div><div class="hub-stat-num">6</div><div class="hub-stat-label">Exams Covered</div></div>
        <div><div class="hub-stat-num">100+</div><div class="hub-stat-label">Practice Questions</div></div>
        <div><div class="hub-stat-num">200+</div><div class="hub-stat-label">Azure Services Mapped</div></div>
        <div><div class="hub-stat-num">AZ-900→AZ-700</div><div class="hub-stat-label">All Levels</div></div>
      </div>
    </div>
    ${Object.entries(roleGroups).map(([role, examIds]) => `
      <div class="hub-role-group">
        <div class="hub-role-label">📂 ${role}</div>
        <div class="grid g${Math.min(examIds.length,3)}">
          ${examIds.map(id => {
            const e = window.EXAMS?.[id];
            if (!e) return '';
            return `<div class="exam-card" onclick="navigate('${id}')" style="border-color:${e.meta.color}30">
              <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${e.meta.color};border-radius:var(--radius) var(--radius) 0 0"></div>
              <div class="exam-card-code" style="color:${e.meta.color}">${e.meta.icon} ${e.meta.code}</div>
              <div class="exam-card-name">${e.meta.name}</div>
              <div class="exam-card-tags">
                <span class="exam-card-tag" style="border-color:${e.meta.color}40;color:${e.meta.color};background:${e.meta.color}15">${e.meta.level}</span>
                <span class="exam-card-tag" style="border-color:var(--border);color:var(--text-dim)">${e.meta.duration}min</span>
              </div>
              <div class="exam-card-domains">${e.domains.map(d=>`${d.name} (${d.weight})`).join(' · ')}</div>
              <div class="exam-card-footer">
                <span>👥 ${e.meta.roles.slice(0,2).join(', ')}</span>
                <span style="color:${e.meta.color}">Study →</span>
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>`).join('')}`;
}

// ── Exam Overview ──────────────────────────────────────────────────────────────
function renderExamOverview(exam) {
  const pg = document.getElementById('pageContent');
  if (!pg) return;
  const id = exam.meta.code.toLowerCase().replace('-','');
  pg.innerHTML = `
    <div style="margin-bottom:32px">
      <div class="section-tag" style="border-color:${exam.meta.color}40;color:${exam.meta.color};background:${exam.meta.color}15">${exam.meta.level}</div>
      <h1 class="section-title">${exam.meta.icon} ${exam.meta.code} <span style="background:linear-gradient(135deg,${exam.meta.color},#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent">${exam.meta.name}</span></h1>
      <p class="section-desc">${exam.meta.roles.join(' · ')} · Prerequisite: ${exam.meta.prereq}</p>
    </div>
    <div class="grid g4" style="margin-bottom:32px">
      ${[['⏱️','Duration',exam.meta.duration+' min'],['❓','Questions',exam.meta.questions],['✅','Passing Score',exam.meta.passing+'/1000'],['📋','Level',exam.meta.level]].map(([i,l,v])=>`<div class="card"><div style="font-size:20px;margin-bottom:6px">${i}</div><div style="font-size:11px;color:var(--text-dim);text-transform:uppercase;letter-spacing:1px">${l}</div><div style="font-size:20px;font-weight:800;color:${exam.meta.color};margin-top:4px">${v}</div></div>`).join('')}
    </div>
    <h3 style="margin-bottom:16px;font-size:14px">Exam Domains</h3>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:32px">
      ${exam.domains.map(d=>`
        <div onclick="navigate('${id}/${d.id}')" style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:var(--radius);border:1px solid var(--border);background:var(--card);cursor:pointer;transition:all 0.2s" onmouseover="this.style.borderColor='${d.color}40'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="width:3px;height:40px;border-radius:2px;background:${d.color}"></div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:13px">${d.name}</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:2px">${d.sections.length} sections</div>
          </div>
          <div style="font-size:13px;font-weight:700;color:${d.color}">${d.weight}</div>
          <span style="color:var(--text-dim)">›</span>
        </div>`).join('')}
    </div>
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="navigate('${id}/quiz')" style="font-size:14px;padding:12px 24px">🎯 Take Practice Quiz (${exam.quiz.length} Questions)</button>
      <button class="btn btn-secondary" onclick="openCheatSheet('${id}')" style="font-size:14px;padding:12px 24px">📋 Quick Reference Sheet</button>
    </div>`;
}

// ── Domain Overview ────────────────────────────────────────────────────────────
function renderDomainOverview(exam, domainId) {
  const domain = exam.domains.find(d => d.id === domainId);
  if (!domain) { renderExamOverview(exam); return; }
  const id = exam.meta.code.toLowerCase().replace('-','');
  const pg = document.getElementById('pageContent');
  pg.innerHTML = `
    <div style="margin-bottom:32px">
      <div class="section-tag" style="border-color:${domain.color}40;color:${domain.color};background:${domain.color}15">${exam.meta.code} · ${domain.weight}</div>
      <h1 class="section-title">${domain.name}</h1>
    </div>
    <div class="grid g3">
      ${domain.sections.map(sec => {
        const key = `${id}/${domain.id}/${sec.id}`;
        const isVisited = !!visited[key];
        return `<div onclick="navigate('${id}/${domainId}/${sec.id}')" class="card card-hover-lift" style="cursor:pointer;border-color:${isVisited?domain.color+'40':'var(--border)'}">
          <div style="font-size:24px;margin-bottom:10px">${sec.icon}</div>
          <div style="font-weight:700;font-size:14px;margin-bottom:4px">${sec.title}</div>
          ${isVisited?`<div style="font-size:10px;color:${domain.color};margin-top:8px">✓ Visited</div>`:'<div style="font-size:10px;color:var(--text-muted);margin-top:8px">→ Study this section</div>'}
        </div>`;
      }).join('')}
    </div>`;
}

// ── Section Renderer ───────────────────────────────────────────────────────────
function renderSection(exam, domainId, sectionId) {
  const domain = exam.domains.find(d => d.id === domainId);
  if (!domain) return;
  const section = domain.sections.find(s => s.id === sectionId);
  if (!section) return;

  const id = exam.meta.code.toLowerCase().replace('-','');
  const key = `${id}/${domainId}/${sectionId}`;
  visited[key] = true;
  localStorage.setItem('az-visited', JSON.stringify(visited));

  // Update sidebar dot
  document.querySelectorAll('.sb-section-link').forEach(l => {
    if (l.getAttribute('onclick')?.includes(`'${key}'`)) l.classList.add('visited');
  });

  const pg = document.getElementById('pageContent');
  pg.innerHTML = `
    <div style="margin-bottom:24px">
      <div class="section-tag" style="border-color:${domain.color}40;color:${domain.color};background:${domain.color}15">${exam.meta.code} · ${domain.name} · ${domain.weight}</div>
      <h1 class="section-title">${section.icon} ${section.title}</h1>
    </div>
    <div id="sectionBody">${section.render()}</div>
    <div style="margin-top:40px;padding-top:24px;border-top:1px solid var(--border);display:flex;gap:10px;flex-wrap:wrap">
      ${getNavButtons(exam, domainId, sectionId)}
    </div>`;

  // Init any D3 trees or interactive elements defined in the section
  if (section.afterRender) section.afterRender(document.getElementById('sectionBody'));
}

function getNavButtons(exam, domainId, sectionId) {
  const id = exam.meta.code.toLowerCase().replace('-','');
  const allSections = exam.domains.flatMap(d => d.sections.map(s => ({domainId:d.id, sectionId:s.id})));
  const idx = allSections.findIndex(s => s.domainId===domainId && s.sectionId===sectionId);
  const prev = allSections[idx-1];
  const next = allSections[idx+1];
  return `
    ${prev?`<button class="btn btn-secondary" onclick="navigate('${id}/${prev.domainId}/${prev.sectionId}')">← Previous</button>`:''}
    <button class="btn btn-ghost" onclick="navigate('${id}')">Overview</button>
    ${next?`<button class="btn btn-primary" onclick="navigate('${id}/${next.domainId}/${next.sectionId}')">Next →</button>`:`<button class="btn btn-primary" onclick="navigate('${id}/quiz')">Take Quiz 🎯</button>`}`;
}

// ── Inner Tabs (within sections) ───────────────────────────────────────────────
function switchTabInner(group, tab) {
  const btn = event.target.closest('.tab') || event.target;
  const tabsEl = btn.closest('.tabs');
  if (tabsEl) tabsEl.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll(`[id^="${group}-"]`).forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`${group}-${tab}`);
  if (panel) panel.classList.add('active');
  btn.classList.add('active');
}

// ── Quiz Engine ────────────────────────────────────────────────────────────────
function renderQuizPage(exam) {
  const id = exam.meta.code.toLowerCase().replace('-','');
  const pg = document.getElementById('pageContent');
  pg.innerHTML = `
    <div style="margin-bottom:24px">
      <div class="section-tag" style="border-color:${exam.meta.color}40;color:${exam.meta.color};background:${exam.meta.color}15">Practice Exam</div>
      <h1 class="section-title">🎯 ${exam.meta.code} Quiz</h1>
      <p class="section-desc">${exam.quiz.length} questions covering all exam domains. Immediate feedback with explanations.</p>
    </div>
    <div class="quiz-wrap">
      <div class="quiz-prog-bar"><div class="quiz-prog-fill" id="quizProg"></div></div>
      <div id="quizBody"></div>
    </div>`;

  quizState[id] = { q: 0, score: 0, answered: false, results: [] };
  renderQuestion(exam, id);
}

function renderQuestion(exam, id) {
  const qs = quizState[id];
  const q = exam.quiz[qs.q];
  const body = document.getElementById('quizBody');
  if (!body) return;
  const pct = (qs.q / exam.quiz.length) * 100;
  const progEl = document.getElementById('quizProg');
  if (progEl) progEl.style.width = pct + '%';

  body.innerHTML = `
    <div class="qz-num">Question ${qs.q+1} of ${exam.quiz.length}</div>
    <div class="qz-domain-tag" style="background:${q.domainColor};color:${q.domainText}">${q.domain}</div>
    <div class="qz-text">${q.q}</div>
    <div class="qz-options" id="qzOpts">
      ${q.opts.map((opt,i)=>`<button class="qz-opt" onclick="answerQ(${i},'${exam.meta.code.toLowerCase().replace('-','')}')">
        <strong style="color:var(--text-dim);margin-right:8px">${String.fromCharCode(65+i)}.</strong> ${opt}
      </button>`).join('')}
    </div>
    <div class="qz-exp" id="qzExp">${q.exp}</div>
    <div class="qz-nav">
      <div style="font-size:13px;color:var(--text-dim)">Score: <strong style="color:#50abf1">${qs.score}/${qs.q}</strong></div>
      <button class="btn btn-primary" id="nextQBtn" onclick="nextQ('${id}')" style="display:none">${qs.q < exam.quiz.length-1 ? 'Next →':'See Results 🎯'}</button>
    </div>`;
  qs.answered = false;
}

function answerQ(idx, id) {
  const qs = quizState[id];
  if (qs.answered) return;
  qs.answered = true;
  const exam = window.EXAMS[id];
  const q = exam.quiz[qs.q];
  const opts = document.querySelectorAll('.qz-opt');
  opts.forEach(o => { o.disabled = true; });
  opts[idx].classList.add(idx === q.a ? 'correct' : 'wrong');
  if (idx !== q.a) opts[q.a].classList.add('correct');
  if (idx === q.a) qs.score++;
  qs.results.push({ qIdx: qs.q, correct: idx === q.a, domain: q.domain });
  const exp = document.getElementById('qzExp');
  if (exp) exp.classList.add('show');
  const nxt = document.getElementById('nextQBtn');
  if (nxt) nxt.style.display = 'inline-flex';
}

function nextQ(id) {
  const qs = quizState[id];
  qs.q++;
  const exam = window.EXAMS[id];
  if (qs.q >= exam.quiz.length) {
    showQuizResults(exam, id);
  } else {
    renderQuestion(exam, id);
  }
}

function showQuizResults(exam, id) {
  const qs = quizState[id];
  const pct = Math.round((qs.score / exam.quiz.length) * 100);
  const body = document.getElementById('quizBody');
  const progEl = document.getElementById('quizProg');
  if (progEl) progEl.style.width = '100%';

  let band, bandClass;
  if (pct >= 70) { band = '🏆 PASSED!'; bandClass = 'qr-pass'; }
  else if (pct >= 55) { band = '📚 Almost there!'; bandClass = 'qr-close'; }
  else { band = '🔄 Keep studying!'; bandClass = 'qr-fail'; }

  const scoreColor = pct >= 70 ? '#4cffb3' : pct >= 55 ? '#ff9500' : '#ff6b6b';

  // Domain breakdown
  const domains = {};
  qs.results.forEach(r => {
    if (!domains[r.domain]) domains[r.domain] = {c:0,t:0};
    domains[r.domain].t++;
    if (r.correct) domains[r.domain].c++;
  });

  body.innerHTML = `
    <div class="quiz-result">
      <div class="qr-score" style="color:${scoreColor}">${pct}%</div>
      <div class="qr-sub">${qs.score} of ${exam.quiz.length} correct</div>
      <div class="qr-band ${bandClass}">${band}</div>
      <div style="margin:28px 0;text-align:left">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:var(--text-muted);margin-bottom:14px">DOMAIN BREAKDOWN</div>
        ${Object.entries(domains).map(([d,s])=>{
          const dp = Math.round((s.c/s.t)*100);
          const dc = dp>=70?'#4cffb3':dp>=50?'#ff9500':'#ff6b6b';
          return `<div class="domain-bar">
            <div class="domain-bar-label">${d}</div>
            <div class="domain-bar-track"><div class="domain-bar-fill" style="width:${dp}%;background:${dc}"></div></div>
            <div class="domain-bar-score" style="color:${dc}">${s.c}/${s.t}</div>
          </div>`;
        }).join('')}
      </div>
      <div class="exam-tip">🎯 AZ-900 passing = 700/1000 (~70%). Higher-level exams also require 700. Budget 1 attempt per month if you need to retake.</div>
      <div style="margin-top:24px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="retakeQuiz('${id}')">🔄 Retake Quiz</button>
        <button class="btn btn-secondary" onclick="navigate('${id}')">📚 Review Content</button>
      </div>
    </div>`;
}

function retakeQuiz(id) {
  const exam = window.EXAMS[id];
  quizState[id] = { q:0, score:0, answered:false, results:[] };
  document.getElementById('quizProg').style.width = '0%';
  renderQuestion(exam, id);
}

// ── Azure Map (Bird's Eye View) ────────────────────────────────────────────────
function openMap() {
  document.getElementById('mapOverlay').style.display = 'flex';
  document.getElementById('mapOverlay').style.flexDirection = 'column';
  window._mapInited = window._mapInited || {};
  if (!window._mapInited.mapTree) { initAzureMap('mapTree'); window._mapInited.mapTree = true; }
  renderMapLegend();
}

function closeMap() {
  document.getElementById('mapOverlay').style.display = 'none';
  dismissNodePopup();
}

function renderMapLegend() {
  const lg = document.getElementById('mapLegend');
  if (!lg || !window.MAP_LEGEND) return;
  lg.innerHTML = window.MAP_LEGEND.map(l => `<div class="map-legend-item"><div class="map-legend-dot" style="background:${l.color}"></div>${l.label}</div>`).join('');
}

function initAzureMap(containerId = 'mapTree') {
  const container = document.getElementById(containerId);
  if (!container || !window.AZURE_TREE) return;
  container.querySelectorAll('svg, button, div.map-zoom-ctrl').forEach(el => el.remove());

  const W = container.clientWidth || 1200;
  const H = container.clientHeight || 650;

  const svg = d3.select(`#${containerId}`).append('svg')
    .attr('width', '100%').attr('height', '100%');

  const zoom = d3.zoom().scaleExtent([0.03, 4])
    .on('zoom', e => g.attr('transform', e.transform));
  svg.call(zoom);

  svg.append('rect')
    .attr('width', '100%').attr('height', '100%')
    .attr('fill', 'transparent')
    .on('click', () => dismissNodePopup());

  const g = svg.append('g');

  // ── Horizontal left→right tree ──
  const COL_WIDTH  = 280;  // horizontal gap between depth levels
  const ROW_HEIGHT = 26;   // vertical gap between sibling nodes (compact to reduce height)

  const tree = d3.tree()
    .nodeSize([ROW_HEIGHT, COL_WIDTH])
    .separation((a, b) => a.parent === b.parent ? 1.1 : 1.8);

  let root = d3.hierarchy(window.AZURE_TREE);
  root.x0 = 0; root.y0 = 0;

  root.descendants().forEach(d => {
    if (d.depth >= 2 && d.children) { d._children = d.children; d.children = null; }
  });

  const tooltip = document.getElementById('tooltip');

  function getColor(d) {
    let n = d; while (n) { if (n.data.color) return n.data.color; n = n.parent; } return '#0078d4';
  }

  function diagonal(s, d) {
    const mx = (s.y + d.y) / 2;
    return `M ${s.y} ${s.x} C ${mx} ${s.x}, ${mx} ${d.x}, ${d.y} ${d.x}`;
  }

  function update(source) {
    const treeData = tree(root);
    const nodes = treeData.descendants();
    const links  = treeData.links();

    // y = horizontal position (depth × col width), x = vertical position
    nodes.forEach(d => { d.y = d.depth * COL_WIDTH; });

    const link = g.selectAll('.link')
      .data(links, d => d.target.id || (d.target.id = ++_uid));

    link.enter().insert('path', 'g').attr('class', 'link')
      .attr('d', () => diagonal({ x: source.x0, y: source.y0 }, { x: source.x0, y: source.y0 }))
      .attr('fill', 'none')
      .attr('stroke-width', d => Math.max(0.8, 2.2 - d.target.depth * 0.5))
      .merge(link)
      .transition().duration(380)
      .attr('d', d => diagonal(d.source, d.target))
      .attr('stroke', d => getColor(d.target) + '35');

    link.exit().transition().duration(260)
      .attr('d', () => diagonal({ x: source.x, y: source.y }, { x: source.x, y: source.y }))
      .remove();

    const node = g.selectAll('.node')
      .data(nodes, d => d.id || (d.id = ++_uid));

    const nodeEnter = node.enter().append('g').attr('class', 'node')
      .attr('transform', () => `translate(${source.y0 || 0},${source.x0 || 0})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => {
        event.stopPropagation();
        tooltip.style.opacity = '0';
        if (d.children)       { d._children = d.children; d.children = null; }
        else if (d._children) { d.children = d._children; d._children = null; }
        update(d);
        showNodePopup(d, event.clientX, event.clientY);
      })
      .on('mouseover', (event, d) => {
        if (document.getElementById('mapNodePopup')) return;
        tooltip.style.opacity = '1';
        const short = d.data.desc ? d.data.desc.slice(0, 90) + (d.data.desc.length > 90 ? '…' : '') : '';
        tooltip.innerHTML = `<strong>${d.data.name}</strong>${short ? `<br><span style="color:var(--text-dim);font-size:11px">${short}</span>` : ''}`;
        tooltip.style.left = (event.clientX + 14) + 'px';
        tooltip.style.top  = (event.clientY - 24) + 'px';
      })
      .on('mouseout', () => { tooltip.style.opacity = '0'; });

    const truncate = (s, max) => s.length > max ? s.slice(0, max - 1) + '…' : s;
    const labelText = d => {
      const max = d.depth === 0 ? 30 : d.depth === 1 ? 24 : 28;
      return (d.data.icon ? d.data.icon + ' ' : '') + truncate(d.data.name, max);
    };

    nodeEnter.append('circle').attr('r', 0).attr('stroke-width', d => d.depth === 0 ? 3 : 2);

    nodeEnter.append('rect').attr('class', 'label-bg')
      .attr('rx', 4).attr('ry', 4).attr('opacity', 0)
      .attr('pointer-events', 'none').attr('fill', '#05080f');

    nodeEnter.append('text').attr('class', 'label-text').attr('dy', '0.32em').attr('opacity', 0);

    nodeEnter.append('text').attr('class', 'node-ctrl').attr('dy', '0.32em')
      .style('font-size', '9px').style('pointer-events', 'none');

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition().duration(380)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    nodeUpdate.select('circle').transition().duration(380)
      .attr('r', d => d.depth === 0 ? 13 : d.depth === 1 ? 8 : d._children ? 6 : 4)
      .attr('fill', d => getColor(d) + (d._children ? '18' : '28'))
      .attr('stroke', d => getColor(d))
      .style('filter', d => `drop-shadow(0 0 ${d.depth <= 1 ? 7 : 3}px ${getColor(d)}55)`);

    const isLight = document.body.classList.contains('light');
    nodeUpdate.select('.label-text').transition().duration(380)
      .attr('x', d => (d.children || d._children) ? -16 : 16)
      .attr('text-anchor', d => (d.children || d._children) ? 'end' : 'start')
      .text(labelText)
      .style('font-size', d => d.depth === 0 ? '14px' : d.depth === 1 ? '13px' : d.depth === 2 ? '11px' : '10px')
      .style('font-weight', d => d.depth <= 1 ? '700' : '400')
      .style('fill', d => d.depth === 0 ? (isLight ? '#0d1421' : '#e2e8f0') : d.depth === 1 ? getColor(d) : (isLight ? '#4a5568' : '#8892a4'))
      .attr('opacity', 1);

    nodeUpdate.each(function() {
      const sel = d3.select(this);
      const txt = sel.select('.label-text').node();
      if (!txt) return;
      try {
        const bb = txt.getBBox();
        sel.select('.label-bg')
          .attr('x', bb.x - 3).attr('y', bb.y - 1)
          .attr('width', bb.width + 6).attr('height', bb.height + 2)
          .attr('opacity', 0.78);
      } catch(e) {}
    });

    nodeUpdate.select('.node-ctrl')
      .attr('x', 0).attr('text-anchor', 'middle')
      .style('fill', d => getColor(d)).style('font-weight', '700')
      .text(d => d._children ? '+' : '');

    const nodeExit = node.exit().transition().duration(260)
      .attr('transform', () => `translate(${source.y},${source.x})`).remove();
    nodeExit.select('circle').attr('r', 0);
    nodeExit.selectAll('text').attr('opacity', 0);
    nodeExit.select('.label-bg').attr('opacity', 0);

    nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
  }

  let _uid = 0;
  update(root);

  function fitView() {
    const b = g.node().getBBox();
    if (!b.width) return null;
    const scaleX = (W - 60) / b.width;
    const scaleY = (H - 40) / b.height;
    const scale  = Math.min(scaleX, scaleY, 0.9);
    return { tx: 40 - b.x * scale, ty: H / 2 - (b.y + b.height / 2) * scale, scale };
  }

  setTimeout(() => {
    const f = fitView(); if (!f) return;
    svg.call(zoom.transform, d3.zoomIdentity.translate(f.tx, f.ty).scale(f.scale));
  }, 450);

  const btnBase = 'background:rgba(255,255,255,0.07);border:1px solid var(--border);color:var(--text-dim);border-radius:6px;cursor:pointer;font-family:inherit;transition:background 0.15s;';
  const ctrl = document.createElement('div');
  ctrl.className = 'map-zoom-ctrl';
  ctrl.style.cssText = 'position:absolute;top:8px;left:8px;display:flex;gap:4px;z-index:10';

  const resetBtn = document.createElement('button');
  resetBtn.textContent = '⌖ Reset';
  resetBtn.style.cssText = btnBase + 'padding:5px 10px;font-size:11px;';
  resetBtn.onclick = () => {
    const f = fitView(); if (!f) return;
    svg.transition().duration(500).call(zoom.transform, d3.zoomIdentity.translate(f.tx, f.ty).scale(f.scale));
  };

  const zoomInBtn = document.createElement('button');
  zoomInBtn.textContent = '+';
  zoomInBtn.style.cssText = btnBase + 'padding:5px 11px;font-size:15px;font-weight:700;';
  zoomInBtn.onclick = () => svg.transition().duration(250).call(zoom.scaleBy, 1.5);

  const zoomOutBtn = document.createElement('button');
  zoomOutBtn.textContent = '−';
  zoomOutBtn.style.cssText = btnBase + 'padding:5px 11px;font-size:15px;font-weight:700;';
  zoomOutBtn.onclick = () => svg.transition().duration(250).call(zoom.scaleBy, 0.67);

  ctrl.append(resetBtn, zoomOutBtn, zoomInBtn);
  container.style.position = 'relative';
  container.appendChild(ctrl);

  if (containerId === 'mapTree') {
    document.getElementById('mapSearch')?.addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      if (!q) {
        const il2 = document.body.classList.contains('light');
        g.selectAll('.label-text').attr('opacity', 1)
          .style('fill', d => d.depth === 0 ? (il2 ? '#0d1421' : '#e2e8f0') : d.depth === 1 ? getColor(d) : (il2 ? '#4a5568' : '#8892a4'));
        g.selectAll('.label-bg').attr('opacity', 0.78);
        g.selectAll('.link').attr('stroke', d => getColor(d.target) + '35');
        return;
      }
      const il = document.body.classList.contains('light');
      const match = d => d.data.name.toLowerCase().includes(q) || (d.data.desc || '').toLowerCase().includes(q);
      g.selectAll('.label-text').attr('opacity', d => match(d) ? 1 : 0.15)
        .style('fill', d => match(d) ? (il ? '#0d1421' : '#ffffff') : (il ? '#9aacbe' : '#444f62'));
      g.selectAll('.label-bg').attr('opacity', d => match(d) ? 0.9 : 0.3);
      g.selectAll('.link').attr('stroke', d => match(d.target) ? getColor(d.target) + '80' : (il ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)'));
    });
  }
}

function getExamColor(code) {
  const map = {'AZ-900':'#0078d4','AZ-104':'#f97316','AZ-305':'#8b5cf6','AZ-400':'#14b8a6','AZ-500':'#ef4444','AZ-700':'#22c55e'};
  return map[code] || '#0078d4';
}

// ── Map node popup (module scope so long-press handlers can call it) ──
function _getColor(d) {
  let n = d;
  while (n) { if (n.data.color) return n.data.color; n = n.parent; }
  return '#0078d4';
}

function showNodePopup(d, clientX, clientY) {
  dismissNodePopup();
  const c = _getColor(d);
  const childCount = (d.children || d._children || []).length;
  const desc = d.data.desc || 'An Azure service in the Microsoft cloud.';
  const exams = (d.data.exams || []);
  const docsUrl = getDocsUrl(d);

  const isLight = document.body.classList.contains('light');
  const popup = document.createElement('div');
  popup.id = 'mapNodePopup';
  popup.style.cssText = `
    position:fixed;background:${isLight ? '#ffffff' : '#0b1120'};border:1px solid ${c}50;border-left:3px solid ${c};
    border-radius:10px;padding:14px 16px;width:320px;z-index:700;
    box-shadow:0 24px 70px rgba(0,0,0,${isLight ? '0.18' : '0.85'});animation:fadeUp 0.18s ease;
    pointer-events:auto;
  `;

  // ── Position FAR from press point so finger/cursor doesn't obscure ──
  const vw = window.innerWidth, vh = window.innerHeight;
  const pw = 320, ph = 240;          // approximate popup size
  const PRESS_OFFSET = 80;            // distance from press
  let left, top;

  // Prefer ABOVE press point (best for touch — finger is below)
  if (clientY - ph - PRESS_OFFSET > 10) {
    top  = clientY - ph - PRESS_OFFSET;
    left = clientX - pw / 2;
  } else if (clientY + PRESS_OFFSET + ph + 10 < vh) {
    // Below press point if no room above
    top  = clientY + PRESS_OFFSET;
    left = clientX - pw / 2;
  } else {
    // Sideways — anchor to opposite side of viewport
    top  = vh / 2 - ph / 2;
    left = clientX < vw / 2 ? clientX + PRESS_OFFSET : clientX - pw - PRESS_OFFSET;
  }
  // Clamp to viewport with margin
  if (left < 10) left = 10;
  if (left + pw > vw - 10) left = vw - pw - 10;
  if (top < 10) top = 10;
  if (top + ph > vh - 10) top = vh - ph - 10;
  popup.style.left = left + 'px';
  popup.style.top  = top  + 'px';

  popup.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:8px">
      ${d.data.icon ? `<span style="font-size:22px;flex-shrink:0;margin-top:1px">${d.data.icon}</span>` : ''}
      <div style="flex:1;min-width:0">
        <div style="font-size:14px;font-weight:700;color:${c};line-height:1.2">${d.data.name}</div>
        ${d.depth === 1 ? `<div style="font-size:10px;color:var(--text-muted);margin-top:2px;text-transform:uppercase;letter-spacing:1px">Category</div>` : ''}
      </div>
    </div>
    <p style="font-size:12.5px;color:${isLight ? '#4a5568' : '#a0adbf'};line-height:1.65;margin-bottom:8px">${desc}</p>
    ${d.data.tip ? `<div style="padding:7px 11px;background:rgba(0,212,255,0.07);border-left:2px solid #00d4ff;border-radius:4px;font-size:11px;color:#9de0f5;line-height:1.55;margin-bottom:8px">🎯 ${d.data.tip}</div>` : ''}
    ${exams.length ? `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px">${exams.map(e=>`<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid ${getExamColor(e)}40;color:${getExamColor(e)};background:${getExamColor(e)}15">${e}</span>`).join('')}</div>` : ''}
    <a href="${docsUrl}" target="_blank" rel="noopener noreferrer"
       style="display:inline-flex;align-items:center;gap:6px;padding:7px 14px;
              background:linear-gradient(135deg,${c},${c}cc);color:#fff;
              border-radius:6px;text-decoration:none;font-size:12px;
              font-weight:700;width:fit-content;
              transition:transform 0.15s,box-shadow 0.15s"
       onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 20px ${c}55'"
       onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='none'">
      📖 More Details on Microsoft Learn
      <span style="font-size:11px;opacity:0.85">↗</span>
    </a>
    <div style="font-size:10px;color:${isLight ? '#718096' : '#444f62'};padding-top:8px;margin-top:8px;border-top:1px solid var(--border)">
      ${childCount ? (d.children ? `▾ Expanded · ${childCount} items` : `▸ Collapsed · ${childCount} items inside`) : 'Leaf service'}
      &nbsp;·&nbsp; release to dismiss
    </div>`;

  document.getElementById('mapOverlay').appendChild(popup);
}

function dismissNodePopup() {
  document.getElementById('mapNodePopup')?.remove();
}

// ── Long-press progress indicator ──
function showPressIndicator(x, y, color) {
  hidePressIndicator();
  const c = color || '#00d4ff';
  const ind = document.createElement('div');
  ind.id = 'pressIndicator';
  ind.style.cssText = `
    position:fixed;left:${x - 24}px;top:${y - 24}px;
    width:48px;height:48px;pointer-events:none;z-index:800;
  `;
  // r=20 → circumference ≈ 125.66
  ind.innerHTML = `
    <svg width="48" height="48" viewBox="0 0 48 48" style="animation:pressIndicatorPop 0.18s ease-out">
      <circle cx="24" cy="24" r="20" fill="rgba(11,17,32,0.55)"
              stroke="${c}30" stroke-width="3"/>
      <circle cx="24" cy="24" r="20" fill="none" stroke="${c}" stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray="125.66"
              stroke-dashoffset="125.66"
              transform="rotate(-90 24 24)"
              style="animation:pressFillAnim 550ms linear forwards;
                     filter:drop-shadow(0 0 8px ${c}cc);"/>
    </svg>
  `;
  document.body.appendChild(ind);
}

function hidePressIndicator() {
  document.getElementById('pressIndicator')?.remove();
}

// ── Microsoft Learn doc URL resolver ──
// Maps Azure service names to canonical Microsoft Learn documentation URLs.
// Falls back to Microsoft Learn search for unknown services.
const DOC_URLS = {
  // Top-level categories
  'Microsoft Azure': 'https://learn.microsoft.com/en-us/azure/',
  'Compute': 'https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/compute-decision-tree',
  'Networking': 'https://learn.microsoft.com/en-us/azure/networking/fundamentals/networking-overview',
  'Storage': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-introduction',
  'Databases': 'https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/data-store-decision-tree',
  'Identity & Security': 'https://learn.microsoft.com/en-us/azure/security/fundamentals/overview',
  'Monitoring & Governance': 'https://learn.microsoft.com/en-us/azure/azure-monitor/overview',
  'DevOps & Integration': 'https://learn.microsoft.com/en-us/azure/devops/',
  'AI & Analytics': 'https://learn.microsoft.com/en-us/azure/ai-services/',
  'Migration & DR': 'https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview',
  // Compute
  'Virtual Machines': 'https://learn.microsoft.com/en-us/azure/virtual-machines/',
  'VM Scale Sets (VMSS)': 'https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/',
  'Availability Sets': 'https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview',
  'Azure Spot VMs': 'https://learn.microsoft.com/en-us/azure/virtual-machines/spot-vms',
  'Reserved Instances': 'https://learn.microsoft.com/en-us/azure/cost-management-billing/reservations/',
  'VM Extensions': 'https://learn.microsoft.com/en-us/azure/virtual-machines/extensions/overview',
  'Azure Dedicated Hosts': 'https://learn.microsoft.com/en-us/azure/virtual-machines/dedicated-hosts',
  'App Service': 'https://learn.microsoft.com/en-us/azure/app-service/',
  'Web Apps': 'https://learn.microsoft.com/en-us/azure/app-service/overview',
  'Deployment Slots': 'https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots',
  'App Service Plans': 'https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans',
  'App Service Environment (ASE)': 'https://learn.microsoft.com/en-us/azure/app-service/environment/',
  'Azure Kubernetes Service': 'https://learn.microsoft.com/en-us/azure/aks/',
  'Node Pools': 'https://learn.microsoft.com/en-us/azure/aks/use-multiple-node-pools',
  'Azure CNI': 'https://learn.microsoft.com/en-us/azure/aks/concepts-network-cni-overview',
  'Cluster Autoscaler': 'https://learn.microsoft.com/en-us/azure/aks/cluster-autoscaler',
  'Azure Functions': 'https://learn.microsoft.com/en-us/azure/azure-functions/',
  'Azure Container Instances (ACI)': 'https://learn.microsoft.com/en-us/azure/container-instances/',
  'Azure Container Apps': 'https://learn.microsoft.com/en-us/azure/container-apps/',
  'Azure Batch': 'https://learn.microsoft.com/en-us/azure/batch/',
  'Azure Virtual Desktop (AVD)': 'https://learn.microsoft.com/en-us/azure/virtual-desktop/',
  'Azure Spring Apps': 'https://learn.microsoft.com/en-us/azure/spring-apps/',
  // Networking
  'Virtual Network (VNet)': 'https://learn.microsoft.com/en-us/azure/virtual-network/',
  'Subnets': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-subnet',
  'Network Security Groups': 'https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview',
  'VNet Peering': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview',
  'Service Endpoints': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview',
  'Private Endpoints': 'https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview',
  'User-Defined Routes (UDR)': 'https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview',
  'Azure DNS': 'https://learn.microsoft.com/en-us/azure/dns/',
  'Azure Private DNS': 'https://learn.microsoft.com/en-us/azure/dns/private-dns-overview',
  'Azure Route Server': 'https://learn.microsoft.com/en-us/azure/route-server/',
  'Azure Load Balancer': 'https://learn.microsoft.com/en-us/azure/load-balancer/',
  'Application Gateway': 'https://learn.microsoft.com/en-us/azure/application-gateway/',
  'Azure Traffic Manager': 'https://learn.microsoft.com/en-us/azure/traffic-manager/',
  'Azure Front Door': 'https://learn.microsoft.com/en-us/azure/frontdoor/',
  'VPN Gateway': 'https://learn.microsoft.com/en-us/azure/vpn-gateway/',
  'Site-to-Site (S2S)': 'https://learn.microsoft.com/en-us/azure/vpn-gateway/tutorial-site-to-site-portal',
  'Point-to-Site (P2S)': 'https://learn.microsoft.com/en-us/azure/vpn-gateway/point-to-site-about',
  'ExpressRoute': 'https://learn.microsoft.com/en-us/azure/expressroute/',
  'ExpressRoute Direct': 'https://learn.microsoft.com/en-us/azure/expressroute/expressroute-erdirect-about',
  'Global Reach': 'https://learn.microsoft.com/en-us/azure/expressroute/expressroute-global-reach',
  'Azure Virtual WAN': 'https://learn.microsoft.com/en-us/azure/virtual-wan/',
  'Azure Firewall': 'https://learn.microsoft.com/en-us/azure/firewall/',
  'Azure DDoS Protection': 'https://learn.microsoft.com/en-us/azure/ddos-protection/',
  'Azure Bastion': 'https://learn.microsoft.com/en-us/azure/bastion/',
  'Web Application Firewall (WAF)': 'https://learn.microsoft.com/en-us/azure/web-application-firewall/',
  'Azure Private Link Service': 'https://learn.microsoft.com/en-us/azure/private-link/private-link-service-overview',
  // Storage
  'Azure Blob Storage': 'https://learn.microsoft.com/en-us/azure/storage/blobs/',
  'Block Blobs': 'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction',
  'Hot Tier': 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  'Cool Tier': 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  'Archive Tier': 'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  'Lifecycle Management': 'https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview',
  'Immutable Blobs': 'https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-storage-overview',
  'Storage Account Types & Replication': 'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy',
  'Azure Files': 'https://learn.microsoft.com/en-us/azure/storage/files/',
  'Azure Queue Storage': 'https://learn.microsoft.com/en-us/azure/storage/queues/',
  'Azure Table Storage': 'https://learn.microsoft.com/en-us/azure/storage/tables/',
  'Azure Disk Storage': 'https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview',
  'Ultra Disk': 'https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#ultra-disks',
  'Premium SSD v2': 'https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd-v2',
  'Azure Data Lake Storage Gen2': 'https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-introduction',
  'Azure NetApp Files': 'https://learn.microsoft.com/en-us/azure/azure-netapp-files/',
  // Databases
  'Azure SQL Database': 'https://learn.microsoft.com/en-us/azure/azure-sql/database/',
  'Azure SQL Managed Instance': 'https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/',
  'SQL on Azure VM': 'https://learn.microsoft.com/en-us/azure/azure-sql/virtual-machines/',
  'Azure Database for MySQL': 'https://learn.microsoft.com/en-us/azure/mysql/',
  'Azure Database for PostgreSQL': 'https://learn.microsoft.com/en-us/azure/postgresql/',
  'Azure Cosmos DB': 'https://learn.microsoft.com/en-us/azure/cosmos-db/',
  'Azure Cache for Redis': 'https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/',
  'Azure Synapse Analytics': 'https://learn.microsoft.com/en-us/azure/synapse-analytics/',
  'Azure Databricks': 'https://learn.microsoft.com/en-us/azure/databricks/',
  'Azure HDInsight': 'https://learn.microsoft.com/en-us/azure/hdinsight/',
  'Azure Stream Analytics': 'https://learn.microsoft.com/en-us/azure/stream-analytics/',
  'Azure Analysis Services': 'https://learn.microsoft.com/en-us/azure/analysis-services/',
  // Identity & Security
  'Azure Active Directory (Entra ID)': 'https://learn.microsoft.com/en-us/entra/identity/',
  'Users & Groups': 'https://learn.microsoft.com/en-us/entra/fundamentals/groups-view-azure-portal',
  'Enterprise Applications': 'https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/',
  'App Registrations': 'https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app',
  'Service Principals': 'https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals',
  'Managed Identities': 'https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/',
  'B2B Collaboration': 'https://learn.microsoft.com/en-us/entra/external-id/what-is-b2b',
  'Azure AD B2C': 'https://learn.microsoft.com/en-us/azure/active-directory-b2c/',
  'Azure AD DS': 'https://learn.microsoft.com/en-us/entra/identity/domain-services/',
  'Azure AD Connect': 'https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-azure-ad-connect',
  'MFA': 'https://learn.microsoft.com/en-us/entra/identity/authentication/concept-mfa-howitworks',
  'Conditional Access': 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/',
  'Identity Protection': 'https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection',
  'Privileged Identity Management (PIM)': 'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/',
  'RBAC': 'https://learn.microsoft.com/en-us/azure/role-based-access-control/',
  'Microsoft Defender for Cloud': 'https://learn.microsoft.com/en-us/azure/defender-for-cloud/',
  'Microsoft Sentinel': 'https://learn.microsoft.com/en-us/azure/sentinel/',
  'Azure Key Vault': 'https://learn.microsoft.com/en-us/azure/key-vault/',
  'Microsoft Purview': 'https://learn.microsoft.com/en-us/purview/',
  'Azure Information Protection': 'https://learn.microsoft.com/en-us/azure/information-protection/',
  // Monitoring & Governance
  'Azure Monitor': 'https://learn.microsoft.com/en-us/azure/azure-monitor/',
  'Metrics': 'https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/data-platform-metrics',
  'Logs (Log Analytics)': 'https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-overview',
  'Alerts': 'https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview',
  'Application Insights': 'https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview',
  'Workbooks': 'https://learn.microsoft.com/en-us/azure/azure-monitor/visualize/workbooks-overview',
  'Network Watcher': 'https://learn.microsoft.com/en-us/azure/network-watcher/',
  'Azure Policy': 'https://learn.microsoft.com/en-us/azure/governance/policy/',
  'Azure Blueprints': 'https://learn.microsoft.com/en-us/azure/governance/blueprints/',
  'Management Groups': 'https://learn.microsoft.com/en-us/azure/governance/management-groups/',
  'Resource Locks': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources',
  'Resource Tags': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources',
  'Azure Cost Management + Billing': 'https://learn.microsoft.com/en-us/azure/cost-management-billing/',
  'Azure Advisor': 'https://learn.microsoft.com/en-us/azure/advisor/',
  'Azure Service Health': 'https://learn.microsoft.com/en-us/azure/service-health/',
  'Azure Resource Manager (ARM)': 'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview',
  'Azure Arc': 'https://learn.microsoft.com/en-us/azure/azure-arc/',
  'Azure Automation': 'https://learn.microsoft.com/en-us/azure/automation/',
  'Azure Update Manager': 'https://learn.microsoft.com/en-us/azure/update-manager/overview',
  'Azure Lighthouse': 'https://learn.microsoft.com/en-us/azure/lighthouse/',
  // DevOps & Integration
  'Azure DevOps': 'https://learn.microsoft.com/en-us/azure/devops/',
  'Azure Boards': 'https://learn.microsoft.com/en-us/azure/devops/boards/',
  'Azure Repos': 'https://learn.microsoft.com/en-us/azure/devops/repos/',
  'Azure Pipelines': 'https://learn.microsoft.com/en-us/azure/devops/pipelines/',
  'Azure Test Plans': 'https://learn.microsoft.com/en-us/azure/devops/test/',
  'Azure Artifacts': 'https://learn.microsoft.com/en-us/azure/devops/artifacts/',
  'Azure Service Bus': 'https://learn.microsoft.com/en-us/azure/service-bus-messaging/',
  'Azure Event Grid': 'https://learn.microsoft.com/en-us/azure/event-grid/',
  'Azure Event Hubs': 'https://learn.microsoft.com/en-us/azure/event-hubs/',
  'Azure Logic Apps': 'https://learn.microsoft.com/en-us/azure/logic-apps/',
  'Azure API Management (APIM)': 'https://learn.microsoft.com/en-us/azure/api-management/',
  'Azure Data Factory': 'https://learn.microsoft.com/en-us/azure/data-factory/',
  'Azure Container Registry (ACR)': 'https://learn.microsoft.com/en-us/azure/container-registry/',
  'GitHub Actions (Azure)': 'https://learn.microsoft.com/en-us/azure/developer/github/github-actions',
  'Azure App Configuration': 'https://learn.microsoft.com/en-us/azure/azure-app-configuration/',
  'Azure Chaos Studio': 'https://learn.microsoft.com/en-us/azure/chaos-studio/',
  // AI & Analytics
  'Azure Machine Learning': 'https://learn.microsoft.com/en-us/azure/machine-learning/',
  'Azure OpenAI Service': 'https://learn.microsoft.com/en-us/azure/ai-services/openai/',
  'Azure AI Services (Cognitive Services)': 'https://learn.microsoft.com/en-us/azure/ai-services/',
  'Vision': 'https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/',
  'Speech': 'https://learn.microsoft.com/en-us/azure/ai-services/speech-service/',
  'Language': 'https://learn.microsoft.com/en-us/azure/ai-services/language-service/',
  'Decision': 'https://learn.microsoft.com/en-us/azure/ai-services/anomaly-detector/',
  'Azure AI Search': 'https://learn.microsoft.com/en-us/azure/search/',
  'Azure Bot Service': 'https://learn.microsoft.com/en-us/azure/bot-service/',
  // Migration
  'Azure Migrate': 'https://learn.microsoft.com/en-us/azure/migrate/',
  'Azure Database Migration Service': 'https://learn.microsoft.com/en-us/azure/dms/',
  'Azure Site Recovery (ASR)': 'https://learn.microsoft.com/en-us/azure/site-recovery/',
  'Azure Backup': 'https://learn.microsoft.com/en-us/azure/backup/',
  'Azure Databox': 'https://learn.microsoft.com/en-us/azure/databox/',
  'Azure Import/Export': 'https://learn.microsoft.com/en-us/azure/import-export/'
};

function getDocsUrl(d) {
  // Explicit override on the node
  if (d.data.docs) return d.data.docs;
  // Direct match on name
  if (DOC_URLS[d.data.name]) return DOC_URLS[d.data.name];
  // Fallback: Microsoft Learn search
  const term = encodeURIComponent('azure ' + d.data.name);
  return `https://learn.microsoft.com/en-us/search/?terms=${term}`;
}

// ── Search ─────────────────────────────────────────────────────────────────────
function initSearch() {
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  const index = [];
  Object.entries(window.EXAMS || {}).forEach(([eid, exam]) => {
    exam.domains.forEach(domain => {
      domain.sections.forEach(sec => {
        index.push({ exam: exam.meta.code, examColor: exam.meta.color, title: sec.title, route: `${eid}/${domain.id}/${sec.id}`, keywords: `${sec.title} ${domain.name}`.toLowerCase() });
      });
      index.push({ exam: exam.meta.code, examColor: exam.meta.color, title: domain.name, route: `${eid}/${domain.id}`, keywords: domain.name.toLowerCase() });
    });
  });

  input.addEventListener('input', function() {
    const q = this.value.toLowerCase().trim();
    if (!q) { results.classList.remove('show'); return; }
    const hits = index.filter(i => i.keywords.includes(q)).slice(0, 8);
    if (!hits.length) { results.classList.remove('show'); return; }
    results.innerHTML = hits.map(h => `<div class="search-result-item" onclick="navigate('${h.route}');document.getElementById('searchInput').value='';document.getElementById('searchResults').classList.remove('show')">
      <div class="sr-exam" style="color:${h.examColor}">${h.exam}</div>
      <div class="sr-title">${h.title}</div>
    </div>`).join('');
    results.classList.add('show');
  });
  document.addEventListener('click', e => { if (!input.contains(e.target) && !results.contains(e.target)) results.classList.remove('show'); });
}

// ── Mobile Sidebar ─────────────────────────────────────────────────────────────
document.getElementById('burgerBtn')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
});
document.addEventListener('click', e => {
  const sb = document.getElementById('sidebar');
  const burger = document.getElementById('burgerBtn');
  if (sb?.classList.contains('open') && !sb.contains(e.target) && e.target !== burger) sb.classList.remove('open');
});

// ── Keyboard hint ─────────────────────────────────────────────────────────────
function showKbHint() {
  let hint = document.getElementById('kbHint');
  if (!hint) {
    hint = document.createElement('div');
    hint.id = 'kbHint';
    hint.className = 'kb-hint';
    hint.innerHTML = '← → Navigate sections &nbsp;·&nbsp; Q Quiz &nbsp;·&nbsp; Esc Overview';
    document.body.appendChild(hint);
  }
  hint.classList.add('show');
  clearTimeout(hint._timer);
  hint._timer = setTimeout(() => hint.classList.remove('show'), 3000);
}

// Show hint on first section visit
let _kbHintShown = false;
const _origRenderSection = renderSection;
window.addEventListener('navigate-section', () => { if (!_kbHintShown) { showKbHint(); _kbHintShown = true; } });

// ── Init ───────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initSearch();
  navigate('hub');
  // Add domain progress bars to sidebar after render
});

// Exam pill click handlers
document.querySelectorAll('.ep-btn[data-route]').forEach(btn => {
  btn.addEventListener('click', () => navigate(btn.dataset.route));
});
