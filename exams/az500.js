window.EXAMS = window.EXAMS || {};
window.EXAMS.az500 = {
  meta: { code:'AZ-500', name:'Azure Security Engineer Associate', icon:'🔒', color:'#ef4444', level:'Associate', duration:120, questions:'40-60', passing:700, roles:['Security Engineer','Cloud Security Architect','SRE Security Lead'], prereq:'AZ-104 recommended' },
  domains: [
    {
      id:'identity-access', name:'Manage Identity & Access', weight:'25-30%', color:'#7c4dff',
      sections: [
        { id:'conditional-access', title:'Conditional Access & MFA', icon:'🔐',
          render: () => `
<div class="section-desc">Conditional Access is the Zero Trust policy engine — it evaluates signals and makes access decisions. Think of it as an IF/THEN policy: IF (conditions) THEN (access control).</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Conditional Access Conditions (Signals)</h4>
    <ul>
      <li><strong>User / Group</strong> — Which users/groups the policy applies to</li>
      <li><strong>Cloud App</strong> — Which apps trigger the policy</li>
      <li><strong>Sign-in Risk</strong> — Identity Protection risk level (Low/Medium/High)</li>
      <li><strong>User Risk</strong> — Compromised credential risk level</li>
      <li><strong>Device Platform</strong> — iOS, Android, Windows, macOS</li>
      <li><strong>Device State</strong> — Compliant, Hybrid Azure AD Joined, or unmanaged</li>
      <li><strong>Location</strong> — Named locations (IP ranges), countries</li>
      <li><strong>Client Apps</strong> — Browser, mobile apps, Exchange ActiveSync</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Conditional Access Grant Controls</h4>
    <ul>
      <li><strong>Require MFA</strong> — Most common. Second factor required.</li>
      <li><strong>Require Compliant Device</strong> — Device must pass Intune compliance policies.</li>
      <li><strong>Require Hybrid Azure AD Joined</strong> — Must be domain-joined AND synced.</li>
      <li><strong>Require Approved Client App</strong> — Must use approved app (e.g. Outlook mobile).</li>
      <li><strong>Require App Protection Policy</strong> — MAM policy required on device.</li>
      <li><strong>Require Password Change</strong> — Force reset if high user risk.</li>
      <li><strong>Block Access</strong> — Hard block for specific conditions.</li>
    </ul>
    <div class="exam-tip">🎯 "Report-only" mode = evaluate the policy but don't enforce. Use to test impact before enabling.</div>
  </div>
</div>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">MFA Methods (Strength)</h4>
    <ol style="padding-left:16px;font-size:12px;color:var(--text-dim);line-height:2.2">
      <li>FIDO2 security key (strongest)</li>
      <li>Microsoft Authenticator (push)</li>
      <li>OATH TOTP hardware token</li>
      <li>OATH TOTP software (Authenticator app code)</li>
      <li>SMS / Voice call (weakest — SIM swappable)</li>
    </ol>
    <div class="exam-tip">🎯 SMS/voice are weakest. FIDO2 keys are phishing-resistant. Always prefer Authenticator app over SMS.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Identity Protection Risk Levels</h4>
    <p><strong>Sign-in Risk:</strong> Probability this authentication wasn't performed by the account owner.</p>
    <ul style="margin-top:6px">
      <li>Anonymous IP address (Tor)</li>
      <li>Atypical travel (impossible travel)</li>
      <li>Unfamiliar sign-in properties</li>
      <li>Malware-linked IP</li>
      <li>Password spray</li>
    </ul>
    <p style="margin-top:8px"><strong>User Risk:</strong> Probability the account is compromised (leaked credentials, etc.)</p>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">PIM — Privileged Identity Management</h4>
    <ul>
      <li><strong>Eligible</strong> — User has right to activate role (JIT)</li>
      <li><strong>Active</strong> — Role is currently active (with duration)</li>
      <li><strong>Time-bound</strong> — Active for limited time only</li>
      <li><strong>Approval workflow</strong> — Require approval to activate</li>
      <li><strong>MFA on activation</strong> — Always require MFA</li>
      <li><strong>Access Reviews</strong> — Periodic review of who has what access</li>
      <li><strong>Audit logs</strong> — Full history of activations and approvals</li>
    </ul>
    <div class="exam-tip">🎯 PIM requires Azure AD Premium P2. Eligible ≠ Active. Users must activate their eligible role (and it expires automatically).</div>
  </div>
</div>` },

        { id:'managed-identities', title:'Managed Identities & Service Principals', icon:'🤖',
          render: () => `
<div class="section-desc">Managed Identities eliminate the need to store credentials in code. Azure automatically manages the credential lifecycle.</div>
<table class="cmp-table" style="margin-bottom:16px"><thead><tr><th>Feature</th><th>System-Assigned MI</th><th>User-Assigned MI</th><th>Service Principal</th></tr></thead><tbody>
  <tr><td>Created by</td><td>Enabling on resource</td><td>Explicitly (standalone resource)</td><td>App Registration</td></tr>
  <tr><td>Lifecycle</td><td>Tied to resource (deleted with resource)</td><td>Independent, reusable</td><td>Manual management</td></tr>
  <tr><td>Shared across resources</td><td class="cmp-no">No (1:1)</td><td class="cmp-ok">Yes (many resources)</td><td class="cmp-ok">Yes</td></tr>
  <tr><td>Credentials managed by</td><td>Azure (automatic)</td><td>Azure (automatic)</td><td>You (rotate secrets/certs)</td></tr>
  <tr><td>Use when</td><td>Single resource needs identity</td><td>Multiple resources share identity</td><td>App not on Azure, cross-tenant</td></tr>
</tbody></table>
<div class="exam-tip">🎯 Never hardcode credentials in code. Use Managed Identities for Azure resources. Use Federated Identity (OIDC) for GitHub Actions → Azure without secrets.</div>
<div class="info-box" style="margin-top:12px;border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
  <h4 style="color:#50abf1">OAuth 2.0 Flows for Security Engineers</h4>
  <div class="grid g3">
    ${[
      ['Authorization Code + PKCE','Interactive user login. Best for SPAs and mobile apps. PKCE prevents auth code interception.'],
      ['Client Credentials','Service-to-service. No user. App authenticates with client secret or certificate.'],
      ['Device Code','Devices without browser (IoT, CLI). User enters code on another device.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(0,120,212,0.08);border:1px solid rgba(0,120,212,0.2)"><div style="font-weight:700;font-size:12px;color:#50abf1;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'app-proxy-defender-identity', title:'App Proxy, Defender for Identity & Easy Auth', icon:'🛡️',
          render: () => `
<div class="section-desc">Azure AD Application Proxy publishes on-prem apps externally without VPN. Defender for Identity protects on-prem AD. App Service Easy Auth handles authentication without code.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure AD Application Proxy</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Publish on-premises web apps to remote users without VPN. Apps appear in MyApps portal with SSO via Azure AD.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>Connector agent</strong> — Lightweight Windows service installed on-prem (no inbound firewall rules needed)</li>
      <li><strong>Outbound only</strong> — Connectors initiate outbound HTTPS to Azure AD</li>
      <li><strong>Pre-authentication</strong> — Azure AD authenticates user BEFORE traffic reaches on-prem</li>
      <li><strong>Conditional Access</strong> — Apply MFA, device compliance, location policies to on-prem apps</li>
      <li><strong>SSO modes</strong> — Integrated Windows Auth, header-based, password vaulting</li>
      <li><strong>Use cases</strong> — Internal SharePoint, Outlook Web Access, custom apps for remote workers</li>
    </ul>
    <div class="exam-tip">🎯 Application Proxy = "VPN-free remote access" for web apps. Replaces traditional reverse proxy + VPN setups. Requires Azure AD Premium P1.</div>
  </div>
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Microsoft Defender for Identity (MDI)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Cloud-based security solution that detects identity-based threats by monitoring on-premises Active Directory traffic and authentication.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>MDI Sensor</strong> — Installed on Domain Controllers. Reads AD traffic and Windows Event Logs.</li>
      <li><strong>Detects</strong> — Pass-the-hash, pass-the-ticket, golden ticket, DCSync, lateral movement, reconnaissance</li>
      <li><strong>Identity Security Posture</strong> — Score for AD configuration weaknesses (LDAP signing, weak passwords)</li>
      <li><strong>Integration</strong> — Feeds alerts into Microsoft Defender XDR + Microsoft Sentinel</li>
      <li><strong>UEBA</strong> — User and Entity Behavior Analytics. Detects anomalous authentication patterns.</li>
    </ul>
    <div class="exam-tip">🎯 MDI = on-prem AD threat detection. Different from Defender for Cloud (Azure resource security) and Defender for Endpoint (device security). All feed into Defender XDR.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
  <h4 style="color:#22c55e">App Service Authentication ("Easy Auth")</h4>
  <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Built-in authentication for App Service / Azure Functions / Container Apps — no code changes needed.</p>
  <div class="grid g3">
    ${[
      ['Identity Providers','Azure AD, Microsoft, Google, Facebook, Twitter, GitHub, OpenID Connect (any provider).'],
      ['How it works','HTTP module intercepts unauthenticated requests, redirects to login, then injects identity headers (X-MS-CLIENT-PRINCIPAL) into the app.'],
      ['Token store','Tokens cached server-side per user. App can call /.auth/me to get user info without parsing tokens.'],
      ['Authorization','Allow anonymous, require auth, or per-route policies. Supports Microsoft Graph token retrieval for Azure AD.'],
      ['CORS','Configure allowed origins for cross-origin auth flows. Can enforce token-only auth for APIs.'],
      ['Ideal for','Adding auth to existing apps without rewriting code. Lift-and-shift web apps that need modern auth.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2)"><div style="font-size:12px;font-weight:700;color:#22c55e;margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 Easy Auth runs OUTSIDE your app process — even if your app code crashes, auth still works. Toggle with: App Service → Settings → Authentication.</div>
</div>` }
      ]
    },
    {
      id:'network-security', name:'Secure Networking', weight:'20-25%', color:'#22c55e',
      sections: [
        { id:'firewall', title:'Azure Firewall & WAF', icon:'🔥',
          render: () => `
<div class="section-desc">Azure Firewall provides stateful network security as a fully managed service. WAF provides application-layer (L7) HTTP protection.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Azure Firewall Tiers</h4>
    <table class="cmp-table"><thead><tr><th>Feature</th><th>Standard</th><th>Premium</th></tr></thead><tbody>
      <tr><td>FQDN Filtering</td><td class="cmp-ok">✓</td><td class="cmp-ok">✓</td></tr>
      <tr><td>Network Rules</td><td class="cmp-ok">✓</td><td class="cmp-ok">✓</td></tr>
      <tr><td>Application Rules</td><td class="cmp-ok">✓</td><td class="cmp-ok">✓</td></tr>
      <tr><td>Threat Intelligence</td><td class="cmp-ok">✓ (Alert only)</td><td class="cmp-ok">✓ (Alert+Deny)</td></tr>
      <tr><td>IDPS (Intrusion Detection)</td><td class="cmp-no">✗</td><td class="cmp-ok">✓</td></tr>
      <tr><td>TLS Inspection</td><td class="cmp-no">✗</td><td class="cmp-ok">✓</td></tr>
      <tr><td>URL Filtering</td><td class="cmp-no">✗</td><td class="cmp-ok">✓</td></tr>
      <tr><td>Web Categories</td><td class="cmp-no">✗</td><td class="cmp-ok">✓</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Firewall Premium = IDPS + TLS inspection. Use for compliance workloads and when you need to inspect encrypted traffic.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">WAF (Web Application Firewall)</h4>
    <p>Deployed on: Application Gateway, Azure Front Door, Azure CDN.</p>
    <ul style="margin-top:10px">
      <li><strong>OWASP Core Rule Set (CRS)</strong> — 3.1, 3.2, 4.0. Protects OWASP Top 10.</li>
      <li><strong>Detection mode</strong> — Log threats, don't block. Use for initial tuning.</li>
      <li><strong>Prevention mode</strong> — Block and log threats. Production mode.</li>
      <li><strong>Custom rules</strong> — Allow/deny by IP, geo, headers, URI, query strings.</li>
      <li><strong>Exclusions</strong> — Exclude specific attributes from rule evaluation (false positive tuning).</li>
      <li><strong>Bot protection</strong> — Block bad bots, allow known good crawlers (search engines).</li>
    </ul>
    <div class="exam-tip">🎯 Start WAF in Detection mode, analyze logs, tune exclusions, then switch to Prevention mode.</div>
  </div>
</div>
<div class="grid g3">
  <div class="svc-card"><div class="svc-icon" style="background:rgba(239,68,68,0.15)">🌊</div><div class="svc-name">Azure DDoS Protection</div><div class="svc-desc"><strong>Basic:</strong> Free, auto-enabled, always-on.<br><strong>Standard:</strong> Paid. Adaptive tuning, attack analytics, mitigation reports, SLA guarantee ($3K credit for DDoS-caused costs), rapid response team.</div><div class="exam-tip">🎯 DDoS Standard = adaptive real-time tuning. Protects OSI layers 3, 4, and 7 (volumetric, protocol, application layer attacks).</div></div>
  <div class="svc-card"><div class="svc-icon" style="background:rgba(20,184,166,0.15)">🚪</div><div class="svc-name">Azure Bastion</div><div class="svc-desc">Browser-based RDP/SSH without public IPs on VMs.<br><strong>Basic:</strong> VM ↔ Bastion only.<br><strong>Standard:</strong> VNet peering, private-only bastion, file transfer, session recording, native client support.</div><div class="exam-tip">🎯 Bastion = no public IP on VMs = reduced attack surface. Audit all RDP/SSH sessions through NSG logs.</div></div>
  <div class="svc-card"><div class="svc-icon" style="background:rgba(124,77,255,0.15)">🔏</div><div class="svc-name">Private Endpoints (Security Angle)</div><div class="svc-desc">Bring PaaS services into your VNet with a private IP. Traffic never crosses the internet. Disable public access on the service after creating private endpoint. Requires private DNS zone for name resolution.</div><div class="exam-tip">🎯 Private Endpoint + disable public access = most secure PaaS connectivity pattern.</div></div>
</div>` }
      ]
    },
    {
      id:'compute-security', name:'Secure Compute, Storage & Databases', weight:'20-25%', color:'#f97316',
      sections: [
        { id:'defender', title:'Microsoft Defender for Cloud', icon:'🛡️',
          render: () => `
<div class="section-desc">Microsoft Defender for Cloud (formerly Security Center + Azure Defender) provides CSPM (Cloud Security Posture Management) and CWPP (Cloud Workload Protection).</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">CSPM — Cloud Security Posture Management</h4>
    <ul>
      <li><strong>Secure Score</strong> — Numeric measure of security posture (0-100). Higher is better. Each recommendation has a score impact.</li>
      <li><strong>Security Recommendations</strong> — Prioritized list of improvements. Grouped by control.</li>
      <li><strong>Regulatory Compliance</strong> — Map controls to NIST, PCI DSS, ISO 27001, CIS, Azure Security Benchmark.</li>
      <li><strong>Attack Path Analysis</strong> — Visual graph showing how attackers could chain vulnerabilities.</li>
      <li><strong>Cloud Security Graph</strong> — Context-based risk prioritization.</li>
    </ul>
    <div class="exam-tip">🎯 Free tier = CSPM + recommendations. Paid (Defender plans) = workload protection + threat detection per resource type.</div>
  </div>
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Defender Plans (Workload Protection)</h4>
    <ul>
      <li>Defender for <strong>Servers</strong> — VM security, JIT, adaptive controls, vulnerability assessment</li>
      <li>Defender for <strong>Containers</strong> — AKS security, image scanning, runtime protection</li>
      <li>Defender for <strong>SQL</strong> — SQL threat detection, vulnerability assessment</li>
      <li>Defender for <strong>Storage</strong> — Malware scanning, sensitive data discovery</li>
      <li>Defender for <strong>App Service</strong> — Web app threat detection</li>
      <li>Defender for <strong>Key Vault</strong> — Anomalous access patterns</li>
      <li>Defender for <strong>DNS</strong> — Detect DNS-based attacks (C2 via DNS)</li>
      <li>Defender for <strong>ARM</strong> — ARM-level attack detection</li>
    </ul>
  </div>
</div>
<div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
  <h4 style="color:#50abf1">Just-In-Time (JIT) VM Access</h4>
  <p>JIT locks down management ports (RDP 3389, SSH 22, WinRM 5985/5986) with a deny NSG rule by default. When access is needed, the user requests access through Defender for Cloud, which temporarily opens the port for a defined time period (max 3 hours) from a specific IP.</p>
  <div class="grid g3" style="margin-top:12px">
    ${[['Without JIT','RDP/SSH ports always open. Brute force attempts 24/7. Visible to internet scanners.','rgba(239,68,68,0.1)','#f87171'],['With JIT','Ports locked. Access only when requested. Only from approved IPs. Fully audited.','rgba(76,255,179,0.1)','#4cffb3'],['Adaptive Controls','JIT uses NSG rules. No impact on OS. Works with any firewall. ARM-integrated.','rgba(0,120,212,0.1)','#50abf1']].map(([n,d,bg,c])=>`<div style="padding:10px;border-radius:8px;background:${bg};border:1px solid ${c}40"><div style="font-weight:700;font-size:12px;color:${c};margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'keyvault', title:'Azure Key Vault', icon:'🔑',
          render: () => `
<div class="section-desc">Key Vault is the secret store for Azure. NEVER store secrets in code, config files, or environment variables — always use Key Vault.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['🔑','Secrets','Passwords, API keys, connection strings. Versioned. Up to 25KB per secret.'],
    ['🔐','Keys','RSA/EC cryptographic keys. HSM-backed (FIPS 140-2 Level 2/3). Used for envelope encryption.'],
    ['📜','Certificates','SSL/TLS certificates. Auto-renewal with DigiCert/GlobalSign. Expiry notifications.']
  ].map(([i,n,d])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(234,179,8,0.15)">${i}</div><div class="svc-name">${n}</div><div class="svc-desc">${d}</div></div>`).join('')}
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Access Models</h4>
    <p><strong>Vault Access Policy (legacy):</strong> Per-principal policies on secrets/keys/certs independently. Up to 1024 policies per vault.</p>
    <p style="margin-top:8px"><strong>RBAC (recommended):</strong> Standard Azure RBAC on data plane. Roles: Key Vault Administrator, Key Vault Secrets User, Key Vault Crypto User, Key Vault Certificate User.</p>
    <div class="exam-tip">🎯 Microsoft recommends Azure RBAC over access policies for new deployments. RBAC enables centralized management via Azure Policy.</div>
  </div>
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Protection Features</h4>
    <ul>
      <li><strong>Soft Delete</strong> — Deleted vaults/secrets retained 7-90 days. Enable by default now.</li>
      <li><strong>Purge Protection</strong> — Prevent permanent deletion during soft-delete period. Even admins can't purge.</li>
      <li><strong>RBAC scope</strong> — Assign roles at vault level or individual secret level.</li>
      <li><strong>Network access</strong> — Firewall (allow specific IPs/VNets), Private Endpoint, trusted services.</li>
      <li><strong>HSM (Premium tier)</strong> — Hardware Security Module. FIPS 140-2 Level 3. Keys never leave HSM.</li>
    </ul>
    <div class="exam-tip">🎯 Soft Delete + Purge Protection = ransomware protection for secrets. Cannot be disabled once enabled.</div>
  </div>
</div>` },

        { id:'encryption', title:'Azure Encryption & Data Protection', icon:'🔐',
          render: () => `
<div class="section-desc">Encryption is a foundational security control. Azure encrypts data at rest by default and enforces TLS for data in transit. Understanding the encryption models is critical for AZ-500.</div>
<div class="grid g3" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Encryption at Rest</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">All Azure Storage and managed disks are encrypted at rest by default using AES-256.</p>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[['MMK (Microsoft-Managed Keys)','Default. Zero config. Microsoft manages key rotation. Keys in Microsoft-owned HSMs.','rgba(0,120,212,0.08)','#50abf1'],['CMK (Customer-Managed Keys)','Keys in YOUR Azure Key Vault. You control rotation, expiry, and access. Required for some compliance frameworks.','rgba(124,77,255,0.08)','#a78bfa'],['BYOK (Bring Your Own Key)','Import YOUR keys generated on-premises (HSM) into Azure Key Vault. Highest control — keys originated outside Azure.','rgba(249,115,22,0.08)','#f97316']].map(([n,d,bg,c])=>`<div style="padding:8px 12px;border-radius:6px;background:${bg};border:1px solid ${c}30"><div style="font-weight:700;font-size:11px;color:${c};margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 ADE (Azure Disk Encryption) = BitLocker/dm-crypt inside the VM. SSE = server-side encryption managed by Azure storage. Both use Key Vault for CMK.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Encryption in Transit</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;margin-top:8px">
      <li><strong>TLS 1.2+</strong> — Enforced for all Azure storage endpoints</li>
      <li><strong>HTTPS only</strong> — Enable "Secure transfer required" on Storage</li>
      <li><strong>ExpressRoute MACsec</strong> — L2 encryption on ER Direct circuits</li>
      <li><strong>VPN Gateway</strong> — IPsec/IKEv2 tunnel encryption</li>
      <li><strong>Perfect Forward Secrecy</strong> — New session keys each connection</li>
      <li><strong>Azure SQL</strong> — Always Encrypted (data encrypted in app, DB never sees plaintext)</li>
      <li><strong>App Service</strong> — Minimum TLS version configurable (enforce 1.2)</li>
    </ul>
    <div class="exam-tip">🎯 "Secure transfer required" on Storage Account = reject HTTP, enforce HTTPS. Enable this on ALL storage accounts.</div>
  </div>
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Encryption in Use</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Protects data even while being processed (most restrictive, newest category).</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2">
      <li><strong>Confidential Computing</strong> — Intel SGX enclaves, AMD SEV-SNP. Code + data encrypted even from hypervisor.</li>
      <li><strong>Always Encrypted (SQL)</strong> — Client-side encryption. DB engine never decrypts. Keys stay with app.</li>
      <li><strong>Dynamic Data Masking</strong> — Mask sensitive fields for non-privileged users (partial masking, not true encryption).</li>
      <li><strong>Transparent Data Encryption (TDE)</strong> — SQL Server at-rest encryption. On by default for Azure SQL.</li>
    </ul>
    <div class="exam-tip">🎯 Always Encrypted ≠ TDE. TDE = at rest (file level). Always Encrypted = column-level, encrypted in client app, never decrypted by SQL engine.</div>
  </div>
</div>` },

        { id:'compliance-frameworks', title:'Regulatory Compliance & Purview', icon:'📋',
          render: () => `
<div class="section-desc">Azure security engineers must understand regulatory compliance frameworks, how Azure maps to them, and how to use Microsoft Purview for data governance.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Key Compliance Frameworks in Azure</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Framework</th><th>Focus</th><th>Azure Controls</th></tr></thead><tbody>
      <tr><td><strong>NIST SP 800-53</strong></td><td>US Federal security controls</td><td>Azure Government, FedRAMP</td></tr>
      <tr><td><strong>CIS Benchmarks</strong></td><td>Security configuration hardening</td><td>Defender for Cloud recommendations</td></tr>
      <tr><td><strong>PCI DSS</strong></td><td>Payment card data security</td><td>Encryption, access control, logging</td></tr>
      <tr><td><strong>HIPAA</strong></td><td>US healthcare data privacy</td><td>Azure HIPAA BAA, PHI encryption</td></tr>
      <tr><td><strong>GDPR</strong></td><td>EU personal data protection</td><td>Purview, data residency, right to erasure</td></tr>
      <tr><td><strong>ISO 27001</strong></td><td>Information security management</td><td>Azure ISO 27001 certification</td></tr>
      <tr><td><strong>SOC 2 Type II</strong></td><td>Service organization controls</td><td>Azure SOC reports (Trust Center)</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Azure holds 90+ compliance certifications. Access audit reports via: Azure Portal → Microsoft Defender for Cloud → Regulatory Compliance, or Microsoft Trust Center.</div>
  </div>
  <div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
    <h4 style="color:#a78bfa">Microsoft Purview</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">Unified data governance platform — discover, classify, protect, and manage data across your entire estate.</p>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        ['📊 Data Catalog','Discover and understand all data assets across Azure, M365, SQL, SAP, AWS. Business glossary.'],
        ['🏷️ Data Classification','Auto-classify sensitive data: PII, financial, health, credentials. 300+ built-in classifiers.'],
        ['🔐 Information Protection','Apply sensitivity labels (Public, Confidential, Highly Confidential). Labels follow data.'],
        ['📋 Data Map','Automated scanning and lineage tracking across data sources.'],
        ['⚖️ Compliance Manager','Risk assessment dashboard. Track compliance score for GDPR, HIPAA, etc.'],
        ['🔍 eDiscovery','Legal hold, content search, case management for regulatory investigations.']
      ].map(([n,d])=>`<div style="display:flex;gap:10px;font-size:12px;border-bottom:1px solid var(--border);padding:6px 0"><span style="font-weight:700;color:#a78bfa;min-width:120px;flex-shrink:0">${n}</span><span style="color:var(--text-dim)">${d}</span></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Sensitivity labels from Purview travel WITH the data — a labeled PDF emailed outside your org still enforces encryption. Labels persist regardless of location.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
  <h4 style="color:#eab308">Shared Responsibility for Compliance</h4>
  <div class="grid g3" style="margin-top:10px">
    ${[
      ['Microsoft Responsibility','Physical security, hypervisor, network infrastructure, service certifications, SOC/ISO audits, data center compliance'],
      ['Shared Responsibility','Identity management, application security, OS patching (IaaS), data classification, access control configuration'],
      ['Your Responsibility','Data governance, GDPR/CCPA compliance for your data, application compliance, user training, incident response']
    ].map(([n,d])=>`<div style="padding:12px;border-radius:8px;background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2)"><div style="font-size:12px;font-weight:700;color:#eab308;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'container-db-security', title:'Container & Database Security', icon:'🐳',
          render: () => `
<div class="section-desc">Securing container workloads and databases is a significant part of the AZ-500 exam. Defender for Containers and SQL security features are both tested.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">Microsoft Defender for Containers</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Image scanning</strong> — Scan ACR images for CVEs when pushed AND on schedule. Detect vulnerabilities before deployment.</li>
      <li><strong>Runtime protection</strong> — Monitor running containers for anomalous behavior: crypto mining, privilege escalation, unusual network connections.</li>
      <li><strong>Kubernetes security</strong> — Detect misconfigurations in K8s manifests (privileged pods, host network access, missing resource limits).</li>
      <li><strong>Control plane protection</strong> — Monitor Kubernetes API server audit logs for suspicious activity.</li>
      <li><strong>AKS security integration</strong> — Works with AKS, Arc-enabled K8s, GKE, EKS.</li>
    </ul>
    <div class="exam-tip">🎯 Enable Defender for Containers to get: ACR image scanning + AKS runtime threat detection + K8s config recommendations. Without it = no container security posture.</div>
  </div>
  <div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
    <h4 style="color:#a78bfa">Azure SQL Database Security</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Feature</th><th>What it does</th><th>Key detail</th></tr></thead><tbody>
      <tr><td><strong>TDE</strong></td><td>Encrypt data files at rest</td><td>On by default. Transparent to app. MMK or CMK.</td></tr>
      <tr><td><strong>Always Encrypted</strong></td><td>Column-level client-side encryption</td><td>DB engine never sees plaintext. App holds keys.</td></tr>
      <tr><td><strong>Dynamic Data Masking</strong></td><td>Mask sensitive data for non-privileged users</td><td>Real data in DB; non-admins see XXXX-XXXX. No encryption.</td></tr>
      <tr><td><strong>Row-Level Security</strong></td><td>Filter rows based on user identity</td><td>Predicate function. Users only see their own rows.</td></tr>
      <tr><td><strong>Ledger Tables</strong></td><td>Tamper-evident audit trail</td><td>Cryptographic proof of data integrity. Cannot alter history.</td></tr>
      <tr><td><strong>Defender for SQL</strong></td><td>Threat detection + vulnerability assessment</td><td>Detect SQL injection attempts, anomalous queries.</td></tr>
      <tr><td><strong>Azure AD Auth</strong></td><td>Use Azure AD identities for DB access</td><td>No SQL passwords. Use Managed Identities for apps.</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 DDM ≠ encryption. Dynamic Data Masking only HIDES data in query results — the actual data is still stored unencrypted. Use Always Encrypted for true column-level protection.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'security-ops', name:'Manage Security Operations', weight:'25-30%', color:'#ef4444',
      sections: [
        { id:'sentinel', title:'Microsoft Sentinel (SIEM/SOAR)', icon:'🔭',
          render: () => `
<div class="section-desc">Microsoft Sentinel is a cloud-native Security Information and Event Management (SIEM) and Security Orchestration, Automation, and Response (SOAR) platform. Built on Azure Monitor Log Analytics.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Sentinel Architecture</h4>
    <ul>
      <li><strong>Data Connectors</strong> — Ingest logs from Azure, M365, AWS, 3rd-party (200+). CEF, Syslog, REST API.</li>
      <li><strong>Log Analytics Workspace</strong> — Where all data is stored. Query with KQL.</li>
      <li><strong>Analytics Rules</strong> — Detect threats and create Incidents.</li>
      <li><strong>Incidents</strong> — Grouped alerts that represent a potential attack.</li>
      <li><strong>Playbooks (Logic Apps)</strong> — Automated response workflows triggered by incidents.</li>
      <li><strong>Watchlists</strong> — Reference data (IP allowlists, user rosters) for enrichment.</li>
      <li><strong>Threat Intelligence</strong> — STIX/TAXII feeds, Microsoft TI, custom IoCs.</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Analytics Rule Types</h4>
    <ul>
      <li><strong>Scheduled</strong> — KQL query runs on schedule. You write the detection logic.</li>
      <li><strong>Near Real-Time (NRT)</strong> — Runs every minute. Low latency detection.</li>
      <li><strong>Microsoft Security</strong> — Create incidents from Microsoft 365 Defender alerts.</li>
      <li><strong>Anomaly</strong> — ML-based baseline + anomaly detection (UEBA).</li>
      <li><strong>Fusion</strong> — ML correlates low-fidelity alerts into high-confidence incidents. Kill chain detection.</li>
    </ul>
    <div class="exam-tip">🎯 Fusion = the most powerful rule type. It uses ML to correlate signals from multiple sources into multi-stage attack scenarios.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
  <h4 style="color:#14b8a6">Sample Sentinel KQL — Detect Impossible Travel</h4>
  <div class="kql-block">
<span class="kql-kw">SigninLogs</span>
| <span class="kql-fn">where</span> ResultType == <span class="kql-str">"0"</span>  <span class="kql-op">// Successful logins</span>
| <span class="kql-fn">summarize</span> Locations = make_set(Location),
          LoginTimes = make_list(TimeGenerated) <span class="kql-kw">by</span> UserPrincipalName
| <span class="kql-fn">where</span> array_length(Locations) > <span class="kql-str">1</span>
| <span class="kql-fn">mv-expand</span> Locations
| <span class="kql-fn">where</span> Locations != <span class="kql-str">"Unknown"</span>
  </div>
</div>` }
      ]
    }
  ],
  quiz: [
    { q:'What Conditional Access grant control should you use to require users to authenticate with a second factor?', a:0, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Require MFA','Require Compliant Device','Block Access','Require Approved Client App'], exp:'Require MFA is the most common Conditional Access grant control. It forces users to complete an additional authentication step (Authenticator app, SMS, etc.) before being granted access.' },
    { q:'An application running in an Azure VM needs to access Azure Key Vault without storing credentials anywhere. What should you use?', a:2, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Store credentials in App Settings','Use a service principal with client secret','Enable System-Assigned Managed Identity on the VM and grant Key Vault access','Use Anonymous access to Key Vault'], exp:'System-Assigned Managed Identity creates an automatic service principal tied to the VM lifecycle. Azure manages credentials automatically. Grant this identity the "Key Vault Secrets User" role on the vault.' },
    { q:'What feature protects against accidental deletion of Key Vault secrets by retaining them for up to 90 days after deletion?', a:1, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Purge Protection','Soft Delete','Backup and Restore','Resource Lock'], exp:'Soft Delete retains deleted Key Vault objects (vaults, secrets, keys, certs) for a configurable period (7-90 days). During this period they can be recovered. Purge Protection prevents permanent deletion even during the soft-delete window.' },
    { q:'Azure Firewall Premium adds which capabilities NOT in Azure Firewall Standard?', a:3, domain:'Network Security', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Network rules and FQDN filtering','Threat intelligence-based filtering','Application rules','IDPS, TLS inspection, URL filtering, and web categories'], exp:'Azure Firewall Premium adds: Intrusion Detection and Prevention System (IDPS), TLS inspection (decrypt and inspect encrypted traffic), URL filtering (not just FQDN), and web category filtering. All these are absent in Standard.' },
    { q:'Which Microsoft Sentinel analytics rule type uses machine learning to correlate low-fidelity alerts from multiple sources into high-confidence multi-stage attack incidents?', a:2, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Scheduled','Near Real-Time (NRT)','Fusion','Anomaly'], exp:'Fusion rules use ML to correlate signals (alerts from Defender, sign-in logs, etc.) across the kill chain into coherent high-fidelity incidents. Example: "Anomalous sign-in → credential access → lateral movement → exfiltration" detected as one incident.' },
    { q:'A user has the Owner role on a Resource Group. There is a CanNotDelete lock on a VM inside that Resource Group. What happens when they try to delete the VM?', a:1, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['The VM is deleted because Owner overrides locks','The deletion fails — the lock must be removed first','Only the subscription owner can override the lock','The lock is automatically removed by the Owner role'], exp:'Resource locks override RBAC permissions. Even a subscription Owner cannot delete a locked resource without first removing the lock. This is a critical security control to prevent accidental/malicious deletion.' },
    { q:'What is the purpose of Just-In-Time (JIT) VM access in Microsoft Defender for Cloud?', a:0, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Lock management ports (RDP/SSH) by default and only open them temporarily when requested','Automatically patch VMs on a schedule','Encrypt VM disks using Key Vault keys','Scan VMs for vulnerabilities weekly'], exp:'JIT blocks RDP (3389) and SSH (22) with a deny NSG rule by default. When access is needed, users request it through Defender for Cloud, which temporarily allows access from a specific IP for a limited time (max 3 hours). Reduces exposure to brute-force attacks.' },
    { q:'Defender for Cloud\'s Secure Score primarily measures what?', a:2, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Number of security alerts detected','Cost of security controls','Overall security posture (0-100 scale based on completed recommendations)','Network bandwidth consumed by security tools'], exp:'Secure Score (0-100) measures how many security recommendations you\'ve implemented. Each control has a maximum score. Implementing recommendations increases your score. It\'s a quantitative measure of your security posture.' },
    { q:'Which Sentinel rule type is best for detecting threats that require correlating patterns over time (e.g. multiple failed logins followed by success)?', a:0, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Scheduled (KQL query on a schedule)','Microsoft Security connector rules','Fusion rules','Anomaly (UEBA)'], exp:'Scheduled rules use custom KQL queries that run on a schedule (e.g. every hour, looking back 24 hours). You can write complex queries that detect patterns over time, like brute-force followed by successful login.' },
    { q:'What is the difference between Azure AD Identity Protection User Risk and Sign-in Risk?', a:1, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['They are the same thing with different names','User Risk = probability account is compromised (e.g. leaked credentials); Sign-in Risk = probability this specific authentication wasn\'t by the legitimate user','Sign-in Risk = account compromise; User Risk = individual authentication','They only apply to admin accounts'], exp:'User Risk evaluates the probability that a user account is compromised (e.g., credentials found on the dark web). Sign-in Risk evaluates the probability that a specific sign-in wasn\'t performed by the legitimate user (e.g., sign-in from anonymous IP, impossible travel).' },
    { q:'Azure Storage data is encrypted at rest. Who manages the encryption keys by default?', a:0, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Microsoft (Microsoft-managed keys) — transparent, automatic, no configuration required','The customer must always configure their own keys','Keys are not used — Azure uses access control only','The customer\'s on-premises HSM manages all keys'], exp:'By default, Azure Storage uses Microsoft-managed keys (MMK) for encryption at rest. This is transparent and requires zero configuration. You can optionally use Customer-managed keys (CMK) stored in Azure Key Vault for compliance requirements that mandate key ownership.' },
    { q:'What is the difference between encryption at rest and encryption in transit?', a:2, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['At rest = database encryption only; in transit = VPN encryption','At rest = cheaper; in transit = more expensive','At rest = data stored on disk is encrypted; in transit = data moving over networks is encrypted (TLS/HTTPS)','They are the same concept with different names'], exp:'Encryption at rest protects stored data (disks, databases, backups) using algorithms like AES-256. Encryption in transit protects data moving between components using TLS 1.2/1.3. Azure enforces TLS by default for storage and enforces HTTPS for most services.' },
    { q:'A security team needs to detect when a user downloads an unusual amount of data from SharePoint Online. Which Azure service provides this capability?', a:1, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Azure Key Vault with audit logging','Microsoft Sentinel with Microsoft 365 Defender data connector','Azure Monitor with Activity Logs','Microsoft Defender for Cloud'], exp:'Microsoft Sentinel with the Microsoft 365 Defender (or Microsoft 365) data connector ingests logs from SharePoint, Exchange, Teams, etc. You can write KQL analytics rules or use UEBA anomaly detection to identify unusual data download volumes.' },
    { q:'Azure Policy "Audit" effect vs "Deny" effect — what is the key difference?', a:0, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Audit logs non-compliant resources but allows them to be created; Deny blocks resource creation','Audit is for storage; Deny is for compute resources','Audit costs more than Deny','Deny requires Premium tier; Audit is free'], exp:'Audit effect: evaluates resources, marks non-compliant ones in compliance dashboard, but ALLOWS creation to proceed. Use Audit first to understand impact. Deny effect: BLOCKS the creation/modification of non-compliant resources before they are deployed.' },
    { q:'Which feature of Microsoft Defender for Cloud automatically remediates security misconfigurations?', a:2, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Secure Score improvement','Regulatory Compliance dashboard','Quick Fix / one-click remediation on recommendations','Automated threat response playbooks'], exp:'Defender for Cloud provides "Quick Fix" buttons on many recommendations that apply remediation with one click (e.g., "Enable MFA", "Encrypt disk", "Apply NSG"). For bulk remediation, you can use Azure Policy DeployIfNotExists or Modify effects.' },
    { q:'An attacker compromises a service principal\'s client secret. To prevent this class of attack in future, what is the best architectural change?', a:1, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Rotate the client secret every 30 days','Replace service principal client secrets with Managed Identities or certificate-based authentication','Store the client secret in a more complex location','Use longer, more complex client secrets'], exp:'Managed Identities eliminate credentials entirely — Azure manages the underlying service principal automatically and provides tokens via the metadata endpoint. No client secret to steal or rotate. For workloads that can\'t use MI, use certificates (harder to steal than secrets).' },
    { q:'What does Microsoft Purview provide in the context of Azure security and compliance?', a:2, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Network perimeter security and firewall management','VM vulnerability assessment and patching','Data governance, cataloging, classification, and sensitivity labeling across the entire data estate','Identity and access management for Azure AD'], exp:'Microsoft Purview (formerly Azure Purview) provides: data catalog (discover and understand your data across Azure, M365, on-premises), data classification (automatically identify PII, financial, health data), sensitivity labels, information protection policies, and compliance management.' },
    { q:'In Azure Key Vault, what is the difference between Access Policies and Azure RBAC for data plane access?', a:1, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['They are identical; either can be used interchangeably','Access Policies: vault-level permissions per principal, limited to 1024. RBAC: standard Azure RBAC, can be scoped to individual secrets/keys/certs, recommended for new deployments','Access Policies support MFA; RBAC does not','RBAC is only for management plane; Access Policies are for data plane'], exp:'Access Policies (legacy): you grant a principal permissions for secrets/keys/certs separately, at vault level only, max 1024 policies. Azure RBAC (recommended): standard RBAC roles scoped to vault, secret, key, or cert level. Supports Privileged Identity Management and Conditional Access. Microsoft recommends RBAC for new deployments.' },
    { q:'Which Azure network security service provides IDPS (Intrusion Detection and Prevention) and TLS inspection capabilities?', a:2, domain:'Network Security', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure DDoS Protection Standard','Azure Firewall Standard','Azure Firewall Premium','Network Security Groups (NSG)'], exp:'Azure Firewall Premium adds: IDPS (signature-based intrusion detection and prevention), TLS inspection (decrypt and inspect HTTPS traffic for threats), URL filtering (granular), and web categories. Standard tier has application rules, FQDN filtering, and threat intelligence but no IDPS or TLS inspection.' },
    { q:'Microsoft Defender for Containers scans container images stored in Azure Container Registry. When does scanning occur?', a:2, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Only when images are first pushed to the registry','Only when a scan is manually triggered','When images are pushed AND on a regular schedule to detect newly published CVEs','Only when images are pulled for deployment'], exp:'Defender for Containers scans ACR images both: (1) on push — immediately when a new image is pushed to the registry, and (2) on schedule — periodically to detect CVEs that were published AFTER the image was originally scanned. This catches new vulnerabilities in existing images.' },
    { q:'What does Dynamic Data Masking do in Azure SQL Database?', a:1, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['It encrypts sensitive columns so the database engine cannot read the plaintext values','It shows masked values (e.g. XXXX-1234) to non-privileged users while privileged users see the real data — actual stored data is not encrypted','It applies row-level filtering so users only see rows belonging to them','It hashes sensitive values one-way so they cannot be reversed'], exp:'Dynamic Data Masking is a presentation-layer feature, NOT encryption. The data is stored in plaintext; the DB engine just returns masked values to non-privileged queries. Example: credit card shown as XXXX-XXXX-XXXX-1234 to application users, but full number visible to DBAs. Use Always Encrypted for actual protection.' },
    { q:'Azure AD Password Protection does what to improve identity security?', a:0, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Blocks commonly used weak passwords and organization-specific banned terms from being set as Azure AD or on-premises AD passwords','Forces password changes every 90 days for all users','Enables biometric authentication instead of passwords','Generates one-time passwords for all login attempts'], exp:'Azure AD Password Protection maintains a global banned password list (common weak passwords) and an organization-specific custom banned list. When users change passwords, Azure AD checks against both lists and rejects matches. Also extends to on-premises Windows Server AD via the Azure AD Password Protection proxy agent.' },
    { q:'A security engineer enables Microsoft Sentinel and connects the "Microsoft 365 Defender" data connector. What type of data starts flowing into Sentinel?', a:1, domain:'Security Operations', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Azure resource activity logs from all subscriptions','Security alerts and incidents from Defender for Endpoint, Defender for Office 365, Defender for Identity, and Defender for Cloud Apps','Network flow logs from all NSGs in the subscription','Authentication logs from Azure AD sign-in events'], exp:'The Microsoft 365 Defender data connector ingests: alerts and incidents from Defender for Endpoint (device security), Defender for Office 365 (email threats), Defender for Identity (AD threats), and Defender for Cloud Apps (shadow IT, risky OAuth apps). These are automatically correlated into unified incidents in Sentinel.' },
    { q:'What is the purpose of Row-Level Security (RLS) in Azure SQL Database?', a:2, domain:'Compute/Storage Security', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Encrypt individual rows based on a key stored in Key Vault','Mask sensitive columns based on the user\'s role','Filter which rows a user can see based on their identity using a security predicate function','Allow only certain IP addresses to read specific rows'], exp:'Row-Level Security uses a filter predicate (T-SQL function) to restrict which rows are returned for a given user. Example: sales reps only see their own customer records; managers see all. The filter is applied automatically at the DB engine — applications don\'t need modification. Transparent to the application layer.' },
    { q:'An application uses a system-assigned managed identity to access an Azure storage account. The storage account is then deleted and recreated with the same name. What must be done?', a:2, domain:'Identity & Access', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Nothing — the managed identity automatically reconnects to the new storage account','Rotate the managed identity credential','Re-assign the RBAC role to the managed identity on the new storage account — the old role assignment was deleted with the old storage account','Create a new system-assigned managed identity'], exp:'RBAC role assignments are attached to the specific resource instance. When the storage account is deleted, its role assignments are deleted too. Creating a new storage account with the same name creates a new resource ID — you must re-grant the managed identity\'s RBAC role (e.g. Storage Blob Data Contributor) on the new account.' },
  ]
};
