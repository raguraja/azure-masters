window.EXAMS = window.EXAMS || {};
window.EXAMS.az104 = {
  meta: { code:'AZ-104', name:'Azure Administrator Associate', icon:'⚙️', color:'#f97316', level:'Associate', duration:120, questions:'40-60', passing:700, roles:['Azure Administrator','SRE','Cloud Engineer'], prereq:'AZ-900 recommended' },
  domains: [
    {
      id:'identity', name:'Identities & Governance', weight:'15-20%', color:'#7c4dff',
      sections: [
        { id:'azure-ad', title:'Azure Active Directory (Entra ID)', icon:'👤',
          render: () => `
<div class="section-desc">Azure AD is the cloud IAM backbone. It is NOT the same as Windows Server AD — it uses OAuth 2.0/OIDC (not LDAP/Kerberos) and is managed through a REST API, not Group Policy.</div>
<div class="tabs" id="aad-tabs">
  <button class="tab active" onclick="switchTabInner('aad','concepts')">Concepts</button>
  <button class="tab" onclick="switchTabInner('aad','sync')">Azure AD Connect</button>
  <button class="tab" onclick="switchTabInner('aad','identities')">Identity Types</button>
</div>
<div id="aad-concepts" class="tab-panel active">
  <div class="grid g3" style="margin-bottom:16px">
    ${[
      ['👤','Users','Cloud-only, synced (from on-prem), or guest (B2B). Each has a UPN (user@domain.com).'],
      ['👥','Groups','Security (RBAC) or Microsoft 365. Static membership or Dynamic (rule-based, e.g. dept=Finance).'],
      ['🏢','Tenants','An organization\'s Azure AD instance. Each tenant has a unique ID (GUID). One tenant = one org.'],
      ['📱','Devices','Azure AD Joined, Hybrid joined, or Registered. Conditional Access policies apply to device state.'],
      ['🔑','App Registrations','Register an app to get Client ID + credentials. Used for OAuth2/OIDC flows.'],
      ['🤖','Managed Identities','System-assigned (tied to resource lifecycle) or User-assigned (shared across resources). No passwords to rotate.']
    ].map(([icon,name,desc])=>`
    <div class="flip-card" style="height:160px" onclick="this.classList.toggle('flipped')">
      <div class="flip-card-inner">
        <div class="flip-card-front"><div class="fc-icon">${icon}</div><div class="fc-title">${name}</div><div class="fc-sub">Click to flip</div></div>
        <div class="flip-card-back"><div class="fc-back-text">${desc}</div></div>
      </div>
    </div>`).join('')}
  </div>
  <div class="exam-tip">🎯 Azure AD Joined = cloud-only device. Hybrid Azure AD Joined = synced with on-prem AD. Registered = personal/BYOD device with work account.</div>
</div>
<div id="aad-sync" class="tab-panel">
  <div class="grid g2">
    <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
      <h4 style="color:#50abf1">Azure AD Connect</h4>
      <p>Synchronizes on-premises Active Directory to Azure AD. Runs on a Windows Server on-prem.</p>
      <ul style="margin-top:10px">
        <li><strong>Password Hash Sync (PHS)</strong> — Hash of hash of password synced to Azure. Fastest, most resilient. Best for most orgs.</li>
        <li><strong>Pass-Through Auth (PTA)</strong> — Auth validated against on-prem AD in real time. No password hash in cloud.</li>
        <li><strong>Federation (AD FS)</strong> — Azure AD redirects to on-prem ADFS for auth. Most complex. For specific compliance needs.</li>
      </ul>
      <div class="exam-tip">🎯 PHS = hash stored in Azure AD (resilient, works offline). PTA = validates against on-prem (requires connectivity). Federation = complex, uses ADFS.</div>
    </div>
    <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
      <h4 style="color:#a78bfa">Sync Features</h4>
      <ul>
        <li><strong>Attribute filtering</strong> — Sync only specific OUs or attributes</li>
        <li><strong>Staging mode</strong> — Install additional connector but don't sync yet</li>
        <li><strong>Azure AD Connect Health</strong> — Monitor sync health in Azure portal</li>
        <li><strong>Writeback</strong> — Password writeback, group writeback, device writeback</li>
        <li><strong>Seamless SSO</strong> — Silent sign-in for domain-joined devices on corp network</li>
      </ul>
    </div>
  </div>
</div>
<div id="aad-identities" class="tab-panel">
  <table class="cmp-table"><thead><tr><th>Type</th><th>Authentication</th><th>Use Case</th><th>Password Managed by</th></tr></thead>
  <tbody>
    <tr><td>Cloud User</td><td>Azure AD directly</td><td>Cloud-only employees</td><td>Azure AD</td></tr>
    <tr><td>Synced User</td><td>On-prem AD (via Connect)</td><td>Hybrid employees</td><td>On-prem AD</td></tr>
    <tr><td>Guest User (B2B)</td><td>External IdP (Gmail, own Azure AD)</td><td>Partners, contractors</td><td>External</td></tr>
    <tr><td>Service Principal</td><td>Client secret or certificate</td><td>App authentication</td><td>App owner</td></tr>
    <tr><td>Managed Identity</td><td>Azure AD token (auto)</td><td>Azure resource auth</td><td>Azure (automatic)</td></tr>
  </tbody></table>
</div>` },

        { id:'sspr-devices', title:'SSPR, Device Management & Conditional Access', icon:'🔐',
          render: () => `
<div class="section-desc">Self-Service Password Reset and device management are core AZ-104 identity topics. Understanding device join types determines which Conditional Access controls can be applied.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Self-Service Password Reset (SSPR)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Allow users to reset their own password without calling the helpdesk. Requires Azure AD Premium P1.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Authentication methods</strong> — Mobile app notification, OATH code, SMS, email, security questions (2 required for reset)</li>
      <li><strong>Scope</strong> — Enable for All users or specific groups (pilot first)</li>
      <li><strong>Password writeback</strong> — Sync password reset back to on-premises AD (requires Azure AD Connect)</li>
      <li><strong>Notification</strong> — Alert user AND admin when password is reset</li>
      <li><strong>Customization</strong> — Custom help desk link, custom logo, custom email</li>
      <li><strong>Registration campaign</strong> — Prompt users to register SSPR methods on next login</li>
    </ul>
    <div class="exam-tip">🎯 SSPR + Password Writeback = users can reset their password on the Azure AD login page and it syncs back to on-premises AD. Requires Azure AD Connect + Premium P1.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Device Join Types</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Type</th><th>Who manages</th><th>Best for</th><th>CA: Compliant device</th></tr></thead><tbody>
      <tr><td><strong>Azure AD Joined</strong></td><td>Azure AD + Intune</td><td>Cloud-only Windows 10/11, no on-prem AD</td><td class="cmp-ok">✓ Supported</td></tr>
      <tr><td><strong>Hybrid Azure AD Joined</strong></td><td>On-prem AD + Azure AD</td><td>Existing domain-joined corporate machines</td><td class="cmp-ok">✓ Supported</td></tr>
      <tr><td><strong>Azure AD Registered</strong></td><td>User-managed, optional MDM</td><td>BYOD (personal phones/laptops)</td><td class="cmp-partial">⚠ Limited</td></tr>
    </tbody></table>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px;margin-top:10px">
      <li><strong>Hybrid AADJ requires</strong>: Azure AD Connect sync + Group Policy to register devices</li>
      <li><strong>Azure AD Join</strong>: user signs in with Azure AD credentials (no local AD), Intune enrolls device</li>
      <li><strong>Registered</strong>: used for personal BYOD — work account added to Settings</li>
      <li><strong>Intune compliance</strong>: define policies (encryption on, screen lock, no jailbreak) — non-compliant devices blocked by CA</li>
    </ul>
    <div class="exam-tip">🎯 "Require compliant device" Conditional Access = the device must be Azure AD Joined or Hybrid AADJ AND enrolled in Intune, AND meet all compliance policy requirements.</div>
  </div>
</div>` },

        { id:'rbac', title:'RBAC & Subscriptions', icon:'🔑',
          render: () => `
<div class="section-desc">Role-Based Access Control answers: WHO can do WHAT at which SCOPE. Always assign at the lowest scope needed (principle of least privilege).</div>
<div class="grid g2" style="margin-bottom:20px">
  <div class="card">
    <h4 style="margin-bottom:12px;font-size:13px">Built-in Roles</h4>
    ${[
      ['👑','Owner','Full access + assign roles to others'],
      ['🔧','Contributor','Create/manage resources, cannot assign roles'],
      ['👁️','Reader','View only, no changes'],
      ['👤','User Access Admin','Manage access (roles) only, no resource access']
    ].map(([i,n,d])=>`<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px"><span style="font-size:18px">${i}</span><div><div style="font-weight:700;font-size:13px">${n}</div><div style="font-size:12px;color:var(--text-dim)">${d}</div></div></div>`).join('')}
    <div class="exam-tip">🎯 Custom roles require Azure AD Premium P1 or P2. Define Actions, NotActions, DataActions, NotDataActions, AssignableScopes.</div>
  </div>
  <div class="card">
    <h4 style="margin-bottom:12px;font-size:13px">Scope Hierarchy (inherits down)</h4>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${[
        ['🌳','Root Management Group','Highest scope. Applies to everything.','rgba(255,214,0,0.15)','#ffd700'],
        ['🏛️','Management Groups','Organize subscriptions. Up to 6 levels.','rgba(0,120,212,0.15)','#50abf1'],
        ['💳','Subscriptions','Billing boundary. Each has an invoice.','rgba(124,77,255,0.15)','#a78bfa'],
        ['📦','Resource Groups','Lifecycle boundary. Resources share lifecycle.','rgba(76,255,179,0.15)','#4cffb3'],
        ['⚡','Resources','Individual services (VM, DB, etc.)','rgba(255,149,0,0.15)','#ff9500']
      ].map(([i,n,d,bg,c])=>`<div style="padding:8px 12px;border-radius:8px;background:${bg};border:1px solid ${c}40"><div style="font-size:12px;font-weight:700;color:${c}">${i} ${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
  </div>
</div>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure Policy</h4>
    <p>Enforces governance rules on Azure resources. Evaluated continuously. Effects:</p>
    <ul>
      <li><strong>Deny</strong> — Block non-compliant resource creation</li>
      <li><strong>Audit</strong> — Log but allow (monitoring only)</li>
      <li><strong>Modify</strong> — Add/replace properties (e.g. add tags)</li>
      <li><strong>Append</strong> — Add fields to existing resources</li>
      <li><strong>DeployIfNotExists</strong> — Deploy dependent resource if missing</li>
      <li><strong>AuditIfNotExists</strong> — Audit if a related resource is missing</li>
    </ul>
    <div class="exam-tip">🎯 Policy Initiatives = group of policies (e.g. PCI-DSS has 200+ policies). Assign initiative once instead of each policy separately.</div>
  </div>
  <div class="info-box" style="border-color:rgba(255,68,68,0.3);background:rgba(255,68,68,0.05)">
    <h4 style="color:#ff6b6b">Resource Locks</h4>
    <p>Applied at Subscription, RG, or Resource. Override RBAC — even Owner cannot delete without removing lock first.</p>
    <div style="margin-top:10px;display:flex;flex-direction:column;gap:6px">
      <div style="padding:8px;border-radius:6px;background:rgba(255,68,68,0.1);border:1px solid rgba(255,68,68,0.2)"><div style="font-weight:700;color:#ff6b6b;font-size:12px">🔒 CanNotDelete</div><div style="font-size:11px;color:var(--text-dim)">Read + Write allowed. Delete blocked.</div></div>
      <div style="padding:8px;border-radius:6px;background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.2)"><div style="font-weight:700;color:#ff9500;font-size:12px">🚫 ReadOnly</div><div style="font-size:11px;color:var(--text-dim)">Read only. No writes or deletes.</div></div>
    </div>
  </div>
  <div class="info-box" style="border-color:rgba(76,255,179,0.3);background:rgba(76,255,179,0.05)">
    <h4 style="color:#4cffb3">Tags & Blueprints</h4>
    <p><strong>Tags:</strong> Name-value pairs on resources. Used for cost tracking, automation. Max 50 tags per resource. NOT inherited by default.</p>
    <p style="margin-top:8px"><strong>Azure Blueprints:</strong> Package RGs + ARM templates + RBAC + Policies into a reusable definition. Deployment-level tracking. Locked resources.</p>
    <div class="exam-tip">🎯 Tags on RG don't auto-tag resources inside. Use Azure Policy (Modify effect) to enforce tag inheritance.</div>
  </div>
</div>`
        }
      ]
    },
    {
      id:'storage', name:'Implement & Manage Storage', weight:'15-20%', color:'#f97316',
      sections: [
        { id:'storage-accounts', title:'Storage Accounts', icon:'💾',
          render: () => `
<div class="section-desc">A storage account is the top-level namespace for Azure Storage services. Everything (Blob, Files, Queue, Table) lives inside a storage account.</div>
<table class="cmp-table" style="margin-bottom:20px"><thead><tr><th>Replication</th><th>Copies</th><th>Protects Against</th><th>Read Access</th><th>Best For</th></tr></thead><tbody>
  <tr><td>LRS</td><td>3 in 1 DC</td><td>Hardware failure</td><td>Primary only</td><td>Dev/test, non-critical</td></tr>
  <tr><td>ZRS</td><td>3 across 3 AZs</td><td>Datacenter failure</td><td>Primary only</td><td>HA without GRS cost</td></tr>
  <tr><td>GRS</td><td>6 (LRS+LRS in pair)</td><td>Region failure</td><td>Primary only</td><td>General DR</td></tr>
  <tr><td>GZRS</td><td>6 (ZRS+LRS in pair)</td><td>Zone + Region failure</td><td>Primary only</td><td>Max durability</td></tr>
  <tr><td>RA-GRS</td><td>6 (GRS)</td><td>Region failure</td><td>Primary + Secondary</td><td>Read-heavy global apps</td></tr>
  <tr><td>RA-GZRS</td><td>6 (GZRS)</td><td>Zone + Region</td><td>Primary + Secondary</td><td>Max availability</td></tr>
</tbody></table>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Access Methods</h4>
    <ul>
      <li><strong>Storage Account Keys</strong> — Root access. Full control. Rotate regularly.</li>
      <li><strong>Shared Access Signature (SAS)</strong> — Delegated access with time limit, IP restriction, allowed operations.</li>
      <li><strong>Azure AD RBAC</strong> — Best practice. Roles: Storage Blob Data Reader/Contributor/Owner.</li>
      <li><strong>Anonymous Access</strong> — Container-level or blob-level. Disable for sensitive data.</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Blob Access Tiers</h4>
    <ul>
      <li><strong>Hot</strong> — Default. Frequent access. Low access cost, high storage cost.</li>
      <li><strong>Cool</strong> — Infrequent. 30-day min. Lower storage, higher access cost.</li>
      <li><strong>Cold</strong> — Rare access. 90-day min.</li>
      <li><strong>Archive</strong> — Offline. 180-day min. Cheapest storage, hours to rehydrate.</li>
    </ul>
    <div class="exam-tip">🎯 Lifecycle management: auto-move blobs between tiers based on last-modified date rules. Archive ≠ immediate access.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Azure Files & File Sync</h4>
    <p>SMB (2.x, 3.x) and NFS (4.1) file shares. Mount as Z: drive on Windows.</p>
    <p style="margin-top:8px"><strong>Azure File Sync</strong> — Cache Azure file share on Windows Server on-prem. Cloud tiering: infrequent files stay in cloud, frequently accessed files cached locally.</p>
    <div class="exam-tip">🎯 File Sync = extend on-prem file server to Azure. The Windows Server becomes a local cache of the Azure file share.</div>
  </div>
</div>` }
        ,{ id:'storage-security', title:'Storage Security, Soft Delete & Versioning', icon:'🔐',
          render: () => `
<div class="section-desc">Storage accounts have multiple layers of security: network controls, access tiers, soft delete, and versioning. These are heavily tested in AZ-104.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Storage Account Firewall & Network Rules</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Default action</strong> — Allow or Deny. Set to Deny for secure storage.</li>
      <li><strong>Virtual network rules</strong> — Allow traffic from specific VNet subnets (via Service Endpoint)</li>
      <li><strong>IP rules</strong> — Allow specific public IP ranges (CIDR notation)</li>
      <li><strong>Resource instance rules</strong> — Allow specific Azure service instances by resource ID</li>
      <li><strong>Trusted Microsoft services</strong> — Allow Azure services (Backup, Monitor, Site Recovery) even when firewall is on</li>
      <li><strong>Private Endpoints</strong> — Best option: private IP in your VNet, firewall bypassed entirely</li>
    </ul>
    <div class="exam-tip">🎯 "Allow trusted Microsoft services" exception is needed for Azure Backup to access storage even when the firewall is set to Deny all. Don't forget this or backup fails.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Blob Soft Delete & Versioning</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      ${[
        ['🗑️ Blob Soft Delete','Deleted blobs retained for 1-365 days. Recover deleted blobs during retention period. Applies to blob deletes AND overwrites.'],
        ['🗂️ Container Soft Delete','Entire containers retained after deletion. Independent of blob soft delete retention period.'],
        ['📜 Blob Versioning','Every write creates a new version. Previous versions preserved automatically. Recover any previous version instantly.'],
        ['📸 Blob Snapshots','Manual point-in-time copy of a blob. Read-only. Must be deleted before deleting the base blob (or use --include-snapshot).'],
        ['🔒 Immutable Storage','WORM (Write Once Read Many). Legal hold or time-based retention. Cannot be modified or deleted during retention period.']
      ].map(([n,d])=>`<div style="padding:8px 12px;border-radius:6px;background:rgba(0,120,212,0.06);border:1px solid rgba(0,120,212,0.15)"><div style="font-size:12px;font-weight:700;color:#50abf1;margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Versioning vs Snapshots: Versioning = automatic on every write. Snapshots = manual at a point in time. Both keep previous states but versioning is always on.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'compute', name:'Deploy & Manage Compute', weight:'20-25%', color:'#3b82f6',
      sections: [
        { id:'vms', title:'Virtual Machines', icon:'🖥️',
          render: () => `
<div class="section-desc">Azure VMs are IaaS compute. You manage the OS and everything above. Azure manages the physical hardware.</div>
<div class="tabs" id="vm-tabs">
  <button class="tab active" onclick="switchTabInner('vm','availability')">Availability</button>
  <button class="tab" onclick="switchTabInner('vm','sizing')">Sizing & Disks</button>
  <button class="tab" onclick="switchTabInner('vm','vmss')">Scale Sets</button>
</div>
<div id="vm-availability" class="tab-panel active">
  <table class="cmp-table"><thead><tr><th>Feature</th><th>Availability Set</th><th>Availability Zone</th></tr></thead><tbody>
    <tr><td>What it protects</td><td>Hardware rack (single datacenter)</td><td>Physical datacenter (separate building)</td></tr>
    <tr><td>How it works</td><td>Fault Domains (racks) + Update Domains (maintenance windows)</td><td>3 physically separate zones per region</td></tr>
    <tr><td>SLA</td><td>99.95% (2+ VMs)</td><td>99.99% (2+ VMs across zones)</td></tr>
    <tr><td>Redundant disks</td><td>Managed disks in separate storage clusters</td><td>Zone-redundant storage</td></tr>
    <tr><td>Cost</td><td>Free feature</td><td>Data transfer costs between zones</td></tr>
    <tr><td>Best for</td><td>Can't use AZs, lower cost</td><td>Maximum HA, mission-critical workloads</td></tr>
  </tbody></table>
  <div class="exam-tip" style="margin-top:12px">🎯 Availability Sets: up to 3 Fault Domains, 20 Update Domains. Only 1 Update Domain reboots during planned maintenance. Availability Zones: completely separate power, cooling, networking.</div>
</div>
<div id="vm-sizing" class="tab-panel">
  <div class="grid g3">
    ${[
      ['B/D series','General Purpose','Balanced CPU/memory. Web servers, small databases, dev environments.','#3b82f6'],
      ['F series','Compute Optimized','High CPU-to-memory ratio. Batch jobs, gaming, analytics.','#8b5cf6'],
      ['E/M series','Memory Optimized','High memory. SAP HANA, Redis cache, large SQL databases.','#ec4899'],
      ['L series','Storage Optimized','High local disk IOPS. Cassandra, MongoDB, NoSQL.','#f97316'],
      ['N series (NC, ND)','GPU','Machine learning training, rendering, scientific compute.','#14b8a6'],
      ['H series','HPC','MPI jobs, molecular simulations, weather forecasting.','#22c55e']
    ].map(([s,n,d,c])=>`<div class="svc-card"><div class="svc-badge" style="background:${c}25;color:${c}">${s}</div><div class="svc-name">${n}</div><div class="svc-desc">${d}</div></div>`).join('')}
  </div>
  <div style="margin-top:16px">
    <h4 style="font-size:13px;margin-bottom:10px">Managed Disk Types</h4>
    <table class="cmp-table"><thead><tr><th>Type</th><th>Max IOPS</th><th>Max Throughput</th><th>Use Case</th></tr></thead><tbody>
      <tr><td>Ultra Disk</td><td>160,000</td><td>2,000 MB/s</td><td>SAP HANA, top SQL, sub-ms latency</td></tr>
      <tr><td>Premium SSD v2</td><td>80,000</td><td>1,200 MB/s</td><td>I/O-intensive, flexible sizing</td></tr>
      <tr><td>Premium SSD</td><td>20,000</td><td>900 MB/s</td><td>Production, consistent perf</td></tr>
      <tr><td>Standard SSD</td><td>6,000</td><td>750 MB/s</td><td>Web servers, lightly used apps</td></tr>
      <tr><td>Standard HDD</td><td>2,000</td><td>500 MB/s</td><td>Dev/test, backups</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Azure Disk Encryption (ADE) = BitLocker/dm-crypt. Keys stored in Key Vault. SSE = server-side encryption at rest (on by default, transparent).</div>
  </div>
</div>
<div id="vm-vmss" class="tab-panel">
  <div class="grid g2">
    <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
      <h4 style="color:#60a5fa">VM Scale Sets (VMSS)</h4>
      <ul>
        <li>Auto-scale up to 1,000 identical VMs (Uniform) or 600 (Flexible)</li>
        <li>Integrated with Azure Load Balancer and Application Gateway</li>
        <li>Rolling, blue-green, or canary upgrade policies</li>
        <li>Scaling trigger: CPU%, custom metrics, schedule, or queue length</li>
        <li>Scale-in policy: Default (balanced zones), OldestVM, NewestVM</li>
      </ul>
    </div>
    <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
      <h4 style="color:#14b8a6">Orchestration Modes</h4>
      <p><strong>Uniform:</strong> All VMs identical. Auto-scale, Azure-managed. Best for stateless apps.</p>
      <p style="margin-top:8px"><strong>Flexible:</strong> Mix VM sizes. Manual or auto-scale. Integrates with Availability Zones. Best for stateful apps with mix of sizes.</p>
      <div class="exam-tip">🎯 VMSS Flexible mode supports mixing VM sizes and can span Availability Zones for highest availability.</div>
    </div>
  </div>
</div>` },

        { id:'aks', title:'AKS & Container Services', icon:'☸️',
          render: () => `
<div class="section-desc">Azure Kubernetes Service (AKS) provides a managed Kubernetes control plane. You manage the worker nodes (node pools). Azure manages masters, etcd, API server.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">AKS Architecture</h4>
    <ul>
      <li><strong>Control Plane</strong> — Managed by Azure. Free. API server, etcd, scheduler, controller manager.</li>
      <li><strong>Node Pools</strong> — VMs you pay for. System pool (kube-system) + User pools (your workloads).</li>
      <li><strong>CNI: Azure CNI</strong> — Every pod gets a real VNet IP. Direct routing. Max ~250 pods per node (limited by IP space).</li>
      <li><strong>CNI: Kubenet</strong> — Pods get 10.x private IPs, NATed to node. Fewer VNet IPs needed. Extra hop for routing.</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Scaling in AKS</h4>
    <ul>
      <li><strong>HPA</strong> — Horizontal Pod Autoscaler. Scale pods based on CPU/memory/custom metrics.</li>
      <li><strong>VPA</strong> — Vertical Pod Autoscaler. Adjust pod CPU/memory requests/limits.</li>
      <li><strong>Cluster Autoscaler</strong> — Scale nodes (VMs) based on pending pod demand. Min/max per pool.</li>
      <li><strong>KEDA</strong> — Event-driven autoscaling. Scale on queue depth, HTTP traffic, etc.</li>
    </ul>
    <div class="exam-tip">🎯 HPA scales pods, Cluster Autoscaler scales nodes. Use both together for full elastic scaling.</div>
  </div>
</div>
<table class="cmp-table"><thead><tr><th>Service</th><th>Orchestration</th><th>Billing</th><th>Best For</th><th>Cold Start</th></tr></thead><tbody>
  <tr><td>Azure Functions</td><td>Serverless</td><td>Per execution</td><td>Event-driven, short tasks</td><td>Possible</td></tr>
  <tr><td>Container Apps</td><td>Managed (KEDA)</td><td>vCPU/memory</td><td>Microservices, HTTP APIs</td><td>Configurable</td></tr>
  <tr><td>ACI</td><td>None (single container)</td><td>Per second</td><td>Simple, fast, no cluster setup</td><td>Fast</td></tr>
  <tr><td>AKS</td><td>Full Kubernetes</td><td>Node VMs</td><td>Complex, stateful, large scale</td><td>None</td></tr>
</tbody></table>` },

        { id:'appservice', title:'App Service & Functions', icon:'🌐',
          render: () => `
<div class="section-desc">Azure App Service is the go-to PaaS for web workloads. No server management — just deploy your code.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div>
    <h4 style="font-size:13px;margin-bottom:10px">App Service Plan Tiers</h4>
    <table class="cmp-table"><thead><tr><th>Tier</th><th>Features</th><th>Use</th></tr></thead><tbody>
      <tr><td>Free (F1)</td><td>No custom domain, no SSL, shared</td><td>Dev/test only</td></tr>
      <tr><td>Shared (D1)</td><td>Custom domain, shared</td><td>Dev only</td></tr>
      <tr><td>Basic (B1-B3)</td><td>Dedicated, custom SSL</td><td>Dev/low-traffic</td></tr>
      <tr><td>Standard (S1-S3)</td><td>Auto-scale, slots, backups</td><td>Production</td></tr>
      <tr><td>Premium (P1v3-P3v3)</td><td>VNet integration, faster, more memory</td><td>High traffic, VNet</td></tr>
      <tr><td>Isolated (I1v2-I3v2)</td><td>Dedicated ASE, private VNet</td><td>Compliance, max scale</td></tr>
    </tbody></table>
  </div>
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Deployment Slots</h4>
    <p>Separate environments (staging, QA) in the same App Service Plan. Each slot has its own URL.</p>
    <ul style="margin-top:10px">
      <li><strong>Swap</strong> — Swap two slots instantly. Zero downtime deployments.</li>
      <li><strong>Warm up</strong> — Slot warms up before swap. Prevents cold starts in production.</li>
      <li><strong>Traffic split</strong> — Route X% to staging slot for canary testing.</li>
      <li><strong>Slot-sticky settings</strong> — Config that does NOT swap (prod-specific settings).</li>
    </ul>
    <div class="exam-tip">🎯 Standard tier required for deployment slots. The staging slot "warms up" before swap — this is the killer feature for zero-downtime deployments.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
  <h4 style="color:#a78bfa">Azure Functions — Hosting Plans</h4>
  <div class="grid g3">
    ${[
      ['Consumption','Pay per execution. Auto-scale to 200 instances. 10-min max timeout. Cold starts possible.'],
      ['Flex Consumption','New. Per-execution + VNet support. No cold starts with pre-provisioned instances.'],
      ['Premium','Always warm. VNet integration. VNET triggers. Larger instance sizes. No timeout limit.'],
      ['Dedicated (ASP)','Run on your App Service Plan. No auto-scale beyond plan limit. Predictable cost.'],
      ['Container Apps','Run Functions as containers. Full container ecosystem.'],
      ['AKS','Run Functions in your Kubernetes cluster (KEDA based).']
    ].map(([n,d])=>`<div style="padding:12px;border-radius:8px;background:rgba(124,77,255,0.08);border:1px solid rgba(124,77,255,0.2)"><div style="font-weight:700;font-size:12px;color:#a78bfa;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'vm-extensions-aci', title:'VM Extensions, ACI & Azure Virtual Desktop', icon:'🔧',
          render: () => `
<div class="section-desc">VM extensions add post-deployment configuration and automation to VMs. ACI and AVD are container and desktop compute options tested in AZ-104.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">VM Extensions</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Small applications that provide post-deployment configuration and automation on Azure VMs. Applied after VM creation, can be updated/removed.</p>
    <table class="cmp-table"><thead><tr><th>Extension</th><th>Purpose</th><th>Key Detail</th></tr></thead><tbody>
      <tr><td>Custom Script Extension</td><td>Run scripts after deployment</td><td>PowerShell/Bash. Download from Storage/URL. One-time execution.</td></tr>
      <tr><td>Azure Monitor Agent</td><td>Collect logs & metrics</td><td>Replaces MMA/OMS agents. Required for Log Analytics. Uses DCR.</td></tr>
      <tr><td>Desired State Configuration</td><td>Enforce OS config state</td><td>PowerShell DSC. Detect & remediate config drift.</td></tr>
      <tr><td>Microsoft Antimalware</td><td>Real-time endpoint protection</td><td>Free Microsoft Defender for Endpoint basic for Azure VMs.</td></tr>
      <tr><td>Azure Diagnostics</td><td>Send guest OS metrics to Monitor</td><td>CPU, memory, disk from INSIDE the VM (not just Azure metrics).</td></tr>
      <tr><td>VM Access</td><td>Reset password / SSH key</td><td>Recover locked-out VM without reinstalling. Reset admin credentials.</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Custom Script Extension = run a script once after deployment. DSC = enforce ongoing configuration state. AMA = collect monitoring data. These are different tools for different purposes.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure Container Instances (ACI)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Fastest way to run containers in Azure — no VM or cluster setup required.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>No infrastructure</strong> — Serverless containers, billed per second</li>
      <li><strong>Container groups</strong> — Multiple containers sharing lifecycle, network, storage</li>
      <li><strong>VNet integration</strong> — Deploy into a subnet for private networking</li>
      <li><strong>Restart policies</strong> — Always, Never, OnFailure</li>
      <li><strong>Environment variables</strong> — Pass config, can be marked secure (not shown in logs)</li>
      <li><strong>Volume mounts</strong> — Azure Files share, emptyDir, gitRepo, secret</li>
      <li><strong>Init containers</strong> — Run setup tasks before main containers start</li>
    </ul>
    <div style="margin-top:12px;padding:10px;border-radius:8px;background:rgba(20,184,166,0.06);border:1px solid rgba(20,184,166,0.2)">
      <div style="font-size:11px;font-weight:700;color:#14b8a6;margin-bottom:4px">ACI vs AKS</div>
      <div style="font-size:11px;color:var(--text-dim)">ACI = simple, single containers, no orchestration. Fast startup. AKS = complex, full orchestration, stateful apps, prod-grade. Use ACI for: CI steps, batch jobs, simple APIs. Use AKS for: production microservices.</div>
    </div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
  <h4 style="color:#a78bfa">Azure Virtual Desktop (AVD)</h4>
  <div class="grid g3" style="margin-top:10px">
    ${[['What it is','Cloud-hosted Windows 10/11 multi-session desktops and RemoteApps. Users connect from any device via browser or Remote Desktop client.'],['Host Pools','Collection of identical session hosts (VMs) serving users. Personal (dedicated VM per user) or Pooled (shared VMs, multiple users per VM).'],['Azure AD Integration','Users authenticate with Azure AD (MFA + Conditional Access). Session hosts can be Azure AD Joined or Hybrid Azure AD Joined.'],['FSLogix Profiles','User profiles stored in Azure Files share. Profiles follow users to any session host. Fast logon, persistent experience.'],['App Groups','Publish Desktop or specific RemoteApps (Word, Excel) to user groups. Control which apps users see.'],['Scaling Plans','Auto-scale session hosts based on schedule or demand. Deallocate VMs during off-hours to save cost.']].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(124,77,255,0.06);border:1px solid rgba(124,77,255,0.2)"><div style="font-size:12px;font-weight:700;color:#a78bfa;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
  <div class="exam-tip">🎯 AVD = VDI in the cloud. Key differentiators: Windows 10/11 multi-session (multiple users per VM, saves cost), FSLogix profiles (fast logon anywhere), Azure AD integration for MFA.</div>
</div>` }
      ]
    },
    {
      id:'networking', name:'Virtual Networking', weight:'15-20%', color:'#22c55e',
      sections: [
        { id:'vnets', title:'VNets, NSGs & Routing', icon:'🔗',
          render: () => `
<div class="section-desc">Virtual Networks are the foundation of Azure networking. Resources in the same VNet can communicate privately by default. Cross-VNet communication requires peering, VPN, or ExpressRoute.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">NSG Rules Deep Dive</h4>
    <p>Each NSG rule has: Priority (100-4096, lower = higher priority), Protocol, Source/Destination (IP, CIDR, Service Tag, ASG), Port ranges, Action (Allow/Deny).</p>
    <div class="code-block" style="margin-top:10px;font-size:11px">
Default Inbound Rules (cannot delete):
65000: AllowVnetInBound   → Allow
65001: AllowAzureLBInBound → Allow
65500: DenyAllInBound    → Deny ← catch-all

Default Outbound Rules:
65000: AllowVnetOutBound   → Allow
65001: AllowInternetOutBound → Allow
65500: DenyAllOutBound    → Deny
    </div>
    <div class="exam-tip">🎯 NSGs are stateful — if you allow inbound traffic, the return traffic is automatically allowed. No need for outbound rule for established connections.</div>
  </div>
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">User-Defined Routes (UDR)</h4>
    <p>Override Azure system routes. Applied to subnets. Next hop types:</p>
    <ul>
      <li><strong>Virtual Appliance</strong> — Route through NVA (firewall) by IP</li>
      <li><strong>Virtual Network Gateway</strong> — Route to VPN/ER gateway</li>
      <li><strong>None</strong> — Drop the packet (blackhole)</li>
      <li><strong>VNet Peering</strong> — Automatically created on peering</li>
      <li><strong>Internet</strong> — Direct to internet</li>
    </ul>
    <div class="exam-tip">🎯 Force-tunneling = UDR with 0.0.0.0/0 → Virtual Appliance. All internet traffic goes through your firewall/NVA first.</div>
  </div>
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Service Endpoints vs Private Endpoints</h4>
    <table class="cmp-table"><thead><tr><th>Feature</th><th>Service Endpoint</th><th>Private Endpoint</th></tr></thead><tbody>
      <tr><td>Traffic</td><td>Through Azure backbone but exits VNet boundary</td><td>Stays entirely in VNet (private IP)</td></tr>
      <tr><td>IP type</td><td>PaaS public IP (but optimal route)</td><td>Private IP from your VNet</td></tr>
      <tr><td>Cost</td><td>Free</td><td>Charged per endpoint per hour</td></tr>
      <tr><td>DNS</td><td>Same public DNS</td><td>Custom private DNS zone required</td></tr>
      <tr><td>Firewall bypass</td><td>Allow VNet subnet</td><td>No public access needed</td></tr>
    </tbody></table>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">VNet Peering Key Facts</h4>
    <ul>
      <li>Non-transitive — A↔B and B↔C does NOT mean A↔C</li>
      <li>Low latency (same as same VNet, under the hood)</li>
      <li>No VPN/gateway required (direct)</li>
      <li>Local peering (same region) vs Global peering (cross-region)</li>
      <li>Address spaces must NOT overlap</li>
      <li>Created in both directions (A→B and B→A)</li>
      <li>Hub-spoke: central hub VNet peered with spoke VNets</li>
    </ul>
    <div class="exam-tip">🎯 For transitive routing in hub-spoke, need Azure Firewall or NVA in hub + UDRs on spokes to route through hub.</div>
  </div>
</div>` },

        { id:'lb', title:'Load Balancing & Connectivity', icon:'⚖️',
          render: () => `
<div class="section-desc">Azure has 4 load balancing options for different scenarios: local vs global, L4 vs L7, internal vs external.</div>
<table class="cmp-table" style="margin-bottom:20px"><thead><tr><th>Service</th><th>Layer</th><th>Scope</th><th>Protocol</th><th>Features</th><th>Best For</th></tr></thead><tbody>
  <tr><td>Azure Load Balancer</td><td>L4 (TCP/UDP)</td><td>Regional</td><td>TCP, UDP</td><td>Health probes, NAT rules, HA ports</td><td>VMs, VMSS internal/external</td></tr>
  <tr><td>Application Gateway</td><td>L7 (HTTP/S)</td><td>Regional</td><td>HTTP, HTTPS, WS, WSS</td><td>WAF, SSL termination, path routing, multi-site</td><td>Web apps, APIs</td></tr>
  <tr><td>Traffic Manager</td><td>DNS</td><td>Global</td><td>Any (DNS-based)</td><td>Priority, Weighted, Performance, Geographic routing</td><td>Multi-region failover</td></tr>
  <tr><td>Azure Front Door</td><td>L7 (HTTP/S)</td><td>Global</td><td>HTTP, HTTPS</td><td>CDN + WAF + LB + anycast</td><td>Global web apps, CDN</td></tr>
</tbody></table>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Traffic Manager Routing Methods</h4>
    <ul>
      <li><strong>Priority</strong> — Primary/secondary failover. Route to #1 unless unhealthy.</li>
      <li><strong>Weighted</strong> — Split traffic by percentage (e.g. 80/20 for canary).</li>
      <li><strong>Performance</strong> — Route to endpoint with lowest latency to user.</li>
      <li><strong>Geographic</strong> — Route by user's geographic location (data residency).</li>
      <li><strong>Subnet</strong> — Route based on client IP subnet.</li>
      <li><strong>Multivalue</strong> — Return multiple healthy endpoints, client picks.</li>
    </ul>
    <div class="exam-tip">🎯 Traffic Manager = DNS-based (it returns an IP, not a proxy). Works for any protocol, not just HTTP.</div>
  </div>
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">VPN Gateway SKUs & Features</h4>
    <table class="cmp-table"><thead><tr><th>SKU</th><th>Bandwidth</th><th>Tunnels</th></tr></thead><tbody>
      <tr><td>Basic</td><td>100 Mbps</td><td>10</td></tr>
      <tr><td>VpnGw1</td><td>650 Mbps</td><td>30</td></tr>
      <tr><td>VpnGw2</td><td>1 Gbps</td><td>30</td></tr>
      <tr><td>VpnGw3</td><td>1.25 Gbps</td><td>30</td></tr>
      <tr><td>VpnGw4</td><td>5 Gbps</td><td>100</td></tr>
      <tr><td>VpnGw5</td><td>10 Gbps</td><td>100</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Basic GW doesn't support BGP or active-active. Need VpnGw1+ for BGP, zone-redundant, active-active.</div>
  </div>
</div>` },

        { id:'dns', title:'Azure DNS & Private DNS Zones', icon:'🔍',
          render: () => `
<div class="section-desc">Azure DNS hosts your public authoritative DNS zones and Private DNS zones handle name resolution for VNet resources and Private Endpoints.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure DNS (Public Zones)</h4>
    <ul>
      <li>Host authoritative DNS zones — no DNS servers to deploy or patch</li>
      <li>100% availability SLA backed by global anycast network</li>
      <li>Supports all standard record types: A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT</li>
      <li><strong>Alias records</strong> — Point apex domain (e.g. contoso.com) directly to Traffic Manager, Front Door, CDN, or Public IP. CNAME cannot be used at zone apex.</li>
      <li>Zone delegation: delegate subdomains (e.g. mail.contoso.com) to different name servers</li>
      <li>RBAC on individual zones or record sets</li>
    </ul>
    <div class="exam-tip">🎯 Alias record = Azure-specific extension allowing apex domain → Azure resources. CNAME at root/apex is prohibited by RFC 1912.</div>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Azure Private DNS Zones</h4>
    <ul>
      <li>Internal DNS resolution within VNets — no custom DNS servers needed</li>
      <li>Link a private zone to a VNet → VMs in that VNet resolve names from it</li>
      <li><strong>Auto-registration</strong> — Auto-creates A records for VMs when enabled on a linked VNet</li>
      <li>Required for Private Endpoints: <code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:3px;font-size:11px">privatelink.blob.core.windows.net</code></li>
      <li>Split-horizon DNS: same name resolves to private IP inside VNet, public IP outside</li>
      <li>Link to multiple VNets across regions</li>
    </ul>
    <div class="exam-tip">🎯 Private Endpoints REQUIRE a private DNS zone with the privatelink.* suffix. Without it, the name still resolves to the public IP — bypassing your private endpoint!</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
  <h4 style="color:#22c55e">DNS Resolution Flow in Azure</h4>
  <div class="grid g3" style="margin-top:10px">
    ${[
      ['VM in VNet','Queries Azure DNS resolver at 168.63.129.16. Checks: Private DNS zones linked to VNet → VNet routes → Azure-provided DNS.'],
      ['Custom DNS Server','If VNet DNS settings point to custom DNS (e.g. your on-prem DNS), all queries go there. Must forward Azure DNS queries to 168.63.129.16.'],
      ['Private Endpoints','Requires private zone linked to the VNet. Zone name: privatelink.[service].core.windows.net. Record: resource name → private IP.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2)"><div style="font-weight:700;font-size:12px;color:#22c55e;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'network-watcher', title:'Network Watcher & NSG Flow Logs', icon:'📡',
          render: () => `
<div class="section-desc">Network Watcher provides monitoring, diagnostics, and logging tools for Azure virtual networks. NSG Flow Logs give complete visibility into network traffic.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Network Watcher Tools</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Tool</th><th>Use Case</th></tr></thead><tbody>
      <tr><td><strong>IP Flow Verify</strong></td><td>Is NSG rule allowing/blocking traffic from this IP:port?</td></tr>
      <tr><td><strong>Next Hop</strong></td><td>What is the routing next hop from VM to this destination?</td></tr>
      <tr><td><strong>Connection Troubleshoot</strong></td><td>One-time end-to-end connectivity test from VM to endpoint</td></tr>
      <tr><td><strong>Connection Monitor</strong></td><td>Continuous monitoring of connectivity, latency, and packet loss</td></tr>
      <tr><td><strong>Packet Capture</strong></td><td>Capture packets from VM NIC to .pcap file (like cloud Wireshark)</td></tr>
      <tr><td><strong>NSG Flow Logs</strong></td><td>Log all allowed and denied traffic flows through NSG</td></tr>
      <tr><td><strong>Topology</strong></td><td>Visual map of VNet resources and their connections</td></tr>
      <tr><td><strong>VPN Diagnostics</strong></td><td>Diagnose VPN Gateway and connection issues</td></tr>
    </tbody></table>
  </div>
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">NSG Flow Logs v2</h4>
    <ul>
      <li>Capture all inbound and outbound flows through each NSG rule</li>
      <li>Stored in Azure Storage Account (JSON format)</li>
      <li>Feed into <strong>Traffic Analytics</strong> (Log Analytics) for dashboards and KQL queries</li>
      <li>Fields: timestamp, source/dest IP:port, protocol, action (Allow/Deny), flow state, bytes</li>
      <li>Retention: 1-365 days (configurable)</li>
      <li>Required for: compliance auditing, security investigations, traffic pattern analysis</li>
    </ul>
    <div class="kql-block" style="margin-top:10px">
<span class="kql-kw">AzureNetworkAnalytics_CL</span>
| <span class="kql-fn">where</span> FlowType_s == <span class="kql-str">"ExternalPublic"</span>
| <span class="kql-fn">where</span> FlowStatus_s == <span class="kql-str">"D"</span> <span class="kql-op">// Denied</span>
| <span class="kql-fn">summarize</span> count() <span class="kql-kw">by</span> SrcIP_s, DestPort_d
| <span class="kql-fn">order by</span> count_ <span class="kql-kw">desc</span>
    </div>
    <div class="exam-tip">🎯 NSG Flow Logs → Storage → Traffic Analytics → Log Analytics Workspace. Use Traffic Analytics to visualize hotspots, identify threats, and optimize network design.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'monitoring', name:'Monitor & Maintain Resources', weight:'10-15%', color:'#eab308',
      sections: [
        { id:'monitor', title:'Azure Monitor & Alerting', icon:'📡',
          render: () => `
<div class="section-desc">Azure Monitor is the unified observability platform. It collects metrics and logs from every Azure resource automatically.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['📊','Metrics','Numeric values at regular intervals. 93-day retention natively. Near real-time. Examples: CPU%, disk IOPS, network bytes.'],
    ['📝','Logs','Structured records. Stored in Log Analytics Workspace. Query with KQL. 30-730 day retention.'],
    ['🚨','Alerts','Triggered by: metric threshold, log query result, activity log event, health event. Fires Action Group.']
  ].map(([i,n,d])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(234,179,8,0.15)">${i}</div><div class="svc-name">${n}</div><div class="svc-desc">${d}</div></div>`).join('')}
</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">KQL Query Examples</h4>
    <div class="kql-block">
<span class="kql-kw">Perf</span>
| <span class="kql-fn">where</span> CounterName == <span class="kql-str">"% Processor Time"</span>
| <span class="kql-fn">where</span> Computer == <span class="kql-str">"myVM"</span>
| <span class="kql-fn">summarize</span> avg(CounterValue) <span class="kql-kw">by</span> bin(TimeGenerated, 5m)
| <span class="kql-fn">render</span> timechart

<span class="kql-kw">AzureActivity</span>
| <span class="kql-fn">where</span> OperationNameValue has <span class="kql-str">"Delete"</span>
| <span class="kql-fn">project</span> TimeGenerated, Caller, ResourceGroup
| <span class="kql-fn">order by</span> TimeGenerated <span class="kql-kw">desc</span>
    </div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure Backup Key Concepts</h4>
    <ul>
      <li><strong>Recovery Services Vault</strong> — Container for backup data. In same/different region.</li>
      <li><strong>Backup Policy</strong> — Schedule (daily/weekly) + retention (daily/weekly/monthly/yearly).</li>
      <li><strong>Soft Delete</strong> — Deleted backup data retained 14 days. Protection against ransomware.</li>
      <li><strong>Cross-Region Restore</strong> — Restore to secondary region for DR.</li>
      <li><strong>MARS Agent</strong> — Back up Windows files/folders from any server.</li>
      <li><strong>Azure Backup Server (MABS)</strong> — Back up workloads (SQL, SharePoint, Exchange).</li>
    </ul>
    <div class="exam-tip">🎯 Azure Backup = Recovery Services Vault. Azure Site Recovery = also uses RSV but for VM replication/DR, not just backup.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
  <h4 style="color:#f87171">Azure Site Recovery (ASR)</h4>
  <div class="grid g3">
    ${[['RPO','Recovery Point Objective — How much data loss is acceptable? ASR achieves ~1-5 min RPO for VMs.'],['RTO','Recovery Time Objective — How long can you be down? ASR typically achieves <1hr RTO with automation.'],['Scenarios','Azure-to-Azure (region DR), VMware/Hyper-V to Azure, Physical servers to Azure.']].map(([n,d])=>`<div style="padding:12px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2)"><div style="font-weight:700;font-size:12px;color:#f87171;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` },

        { id:'automation', title:'Azure Automation & Update Manager', icon:'🤖',
          render: () => `
<div class="section-desc">Azure Automation runs runbooks to automate repetitive tasks. Azure Update Manager (successor to Update Management) manages OS patches at scale across Azure and Arc-enabled servers.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure Automation</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px">
      ${[
        ['📜 Runbooks','PowerShell, Python, or Graphical. Automate repetitive tasks: start/stop VMs, resize resources, remediate issues. Run on schedule or on-demand.'],
        ['⚙️ DSC (State Configuration)','Desired State Configuration. Ensure VMs stay in a configured state. Detect and remediate configuration drift.'],
        ['📦 Process Automation','Chain runbooks together. Webhooks, schedules, and event triggers. Pass parameters between runbooks.'],
        ['🔄 Change Tracking & Inventory','Track software, files, registry, services, and daemons changes on VMs. Detect unauthorized changes.'],
        ['🏃 Hybrid Runbook Worker','Run runbooks on on-premises or non-Azure machines. Extension-based (recommended) or manual agent installation.']
      ].map(([n,d])=>`<div style="display:flex;gap:10px;font-size:12px;border-bottom:1px solid var(--border);padding:7px 0"><span style="font-weight:700;color:#50abf1;min-width:140px;flex-shrink:0">${n}</span><span style="color:var(--text-dim)">${d}</span></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Runbooks run on Automation sandbox (Azure) or Hybrid Worker (on-premises). Use Hybrid Worker when runbooks need access to on-prem resources.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Azure Update Manager</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">The modern replacement for Update Management in Azure Automation. Native Azure service, no Log Analytics workspace required.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Assessment</strong> — View missing patches for Azure VMs and Arc-enabled servers</li>
      <li><strong>Immediate deployment</strong> — Deploy patches now to specific machines</li>
      <li><strong>Scheduled deployments</strong> — Maintenance windows with recurrence</li>
      <li><strong>Maintenance configurations</strong> — Define reusable patch schedules (what patches, when, pre/post scripts)</li>
      <li><strong>Cross-platform</strong> — Windows Server + Linux (Ubuntu, RHEL, SLES, CentOS)</li>
      <li><strong>Azure Arc</strong> — Manage on-premises server patches from Azure portal</li>
      <li><strong>Reporting</strong> — Patch compliance dashboard per subscription/resource group</li>
    </ul>
    <div class="exam-tip">🎯 Update Manager = patch management for VMs. Does NOT require Automation Account or Log Analytics (unlike old Update Management). Integrates with Azure Advisor.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
  <h4 style="color:#f97316">Azure Resource Health & Service Health</h4>
  <div class="grid g3" style="margin-top:10px">
    ${[
      ['Azure Service Health','Shows Azure platform issues affecting YOUR services. Planned maintenance, service advisories. Set alerts. Personalised — only YOUR resources.'],
      ['Azure Resource Health','Shows current health of specific individual resources (is this specific VM healthy?). Historical health. Root cause for past issues.'],
      ['Azure Monitor Alerts','Your custom alerts. Fired based on metrics/logs you define. Not platform events — these are YOUR workload alerts.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.2)"><div style="font-size:12px;font-weight:700;color:#f97316;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` }
      ]
    }
  ],
  quiz: [
    { q:'A developer needs to deploy code to a staging slot and swap it to production with zero downtime. Which App Service plan minimum is required?', a:2, domain:'Compute', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Free (F1)','Basic (B1)','Standard (S1)','Isolated (I1)'], exp:'Deployment slots are available from the Standard tier (S1) and above. Free and Basic tiers do not include deployment slots.' },
    { q:'Two VMs must survive the failure of a single physical rack in one datacenter. Which configuration achieves this?', a:1, domain:'Compute', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Place both VMs in the same Availability Zone','Place both VMs in an Availability Set with at least 2 Fault Domains','Place both VMs in different Azure regions','Use VMSS with auto-scaling'], exp:'An Availability Set distributes VMs across Fault Domains (separate physical racks). If one rack fails, VMs in other Fault Domains continue running. Availability Zones protect from full datacenter failures.' },
    { q:'Which storage replication strategy provides both zone-level and region-level protection with read access to the secondary region?', a:3, domain:'Storage', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['GRS','ZRS','RA-GRS','RA-GZRS'], exp:'RA-GZRS (Read-Access Geo-Zone Redundant Storage) provides ZRS in the primary region (3 zones) plus LRS in a secondary region, with read access to the secondary. This is the highest availability option.' },
    { q:'An application managed identity needs to read secrets from Azure Key Vault. Which role should be assigned?', a:2, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Key Vault Administrator','Key Vault Contributor','Key Vault Secrets User','Reader'], exp:'Key Vault Secrets User role grants permission to read (get/list) secret contents. Key Vault Contributor gives management-plane access (create/delete vaults) but NOT data-plane access to read secret values.' },
    { q:'A VM must be prevented from being deleted by any user, including subscription owners. What should you apply?', a:0, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['CanNotDelete resource lock','ReadOnly resource lock','Azure Policy with Deny effect','RBAC Deny assignment'], exp:'A CanNotDelete resource lock prevents deletion even by Owners. Locks override RBAC — the lock must be explicitly removed before deletion is possible. Azure Policy Deny prevents creation of non-compliant resources but doesn\'t protect existing ones from deletion.' },
    { q:'Which NSG rule priority number takes effect when two rules match — 200 or 500?', a:0, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['200 (lower number = higher priority)','500 (higher number = higher priority)','Both apply simultaneously','The allow rule always wins'], exp:'In NSGs, lower priority numbers are processed first. Rule 200 is evaluated before rule 500. Processing stops when the first matching rule is found. Default catch-all rules have priorities 65000-65500.' },
    { q:'You need to route all outbound internet traffic from a subnet through a Network Virtual Appliance (NVA). What do you configure?', a:1, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['NSG outbound rule blocking internet','User-Defined Route (UDR) with 0.0.0.0/0 → Virtual Appliance','Service Endpoint to the NVA','VNet Peering to the NVA VNet'], exp:'A User-Defined Route (UDR) with destination 0.0.0.0/0 and next hop type "Virtual Appliance" (pointing to the NVA IP) forces all internet-bound traffic through the NVA. This is called "force-tunneling."' },
    { q:'Azure Traffic Manager uses which technology to direct users to the appropriate endpoint?', a:2, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['HTTP reverse proxy','TCP load balancing','DNS-based routing','Anycast routing'], exp:'Traffic Manager is a DNS-based load balancer. It resolves DNS queries and returns the IP address of the appropriate endpoint based on the configured routing method. It does NOT proxy traffic — it just redirects clients via DNS.' },
    { q:'What is the minimum log retention period in a Log Analytics workspace?', a:0, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['30 days','7 days','90 days','1 year'], exp:'The minimum retention period in a Log Analytics workspace is 30 days (included in the price). You can configure it up to 730 days (2 years) with additional cost. Azure Monitor Metrics have 93 days of native retention.' },
    { q:'An Azure Policy with "DeployIfNotExists" effect would do what when a non-compliant resource is found?', a:1, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Block the resource from being created','Automatically deploy a related resource that is missing','Log a warning but allow the resource','Delete the non-compliant resource'], exp:'DeployIfNotExists automatically deploys a related resource if it doesn\'t exist. For example: if a VM doesn\'t have the monitoring agent extension, automatically deploy it. This is used for auto-remediation of compliance.' },
    { q:'Azure AD Connect Password Hash Sync (PHS) vs Pass-Through Auth (PTA): which requires on-premises connectivity for users to authenticate?', a:1, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Password Hash Sync (PHS)','Pass-Through Auth (PTA)','Both require on-premises connectivity','Neither requires on-premises connectivity'], exp:'PTA validates authentication in real time against on-premises AD, so it requires the on-premises PTA agent to be available. PHS syncs a hash to Azure AD — if on-premises goes down, users can still authenticate using the cloud-stored hash.' },
    { q:'Which Azure Backup feature protects backup data from ransomware attacks by retaining deleted data for 14 days?', a:2, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Cross-Region Restore','Geo-redundant backup','Soft Delete','Immutable vault'], exp:'Soft Delete retains deleted backup data for 14 additional days with no extra cost. Even if an attacker deletes your backups, you can recover them during the soft-delete period. Immutable vaults prevent policy changes and are even more restrictive.' },
    { q:'In VMSS, which scale-in policy removes the OLDEST VM when scaling in?', a:0, domain:'Compute', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['OldestVM','NewestVM','Default (balanced)','LowestCostVM'], exp:'The OldestVM scale-in policy removes the oldest VMs first when scaling in. NewestVM removes the most recently created. The Default policy balances across Availability Zones first, then removes oldest VMs.' },
    { q:'What is the maximum number of Fault Domains in an Azure Availability Set?', a:1, domain:'Compute', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['2','3','5','10'], exp:'Azure Availability Sets support up to 3 Fault Domains (separate physical racks with independent power and networking) and up to 20 Update Domains. The exact number of FDs available depends on the region.' },
    { q:'Which SAS token type provides the highest security for delegated access to Azure Blob Storage?', a:2, domain:'Storage', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Account SAS','Service SAS','User Delegation SAS','Anonymous access'], exp:'User Delegation SAS is signed with Azure AD credentials (not storage account keys). It\'s more secure because it uses AAD identity, can be revoked via PIM, and doesn\'t expose storage account keys.' },
    { q:'A Private Endpoint is created for Azure SQL Database in VNet-A. VMs in VNet-B (peered with VNet-A) cannot resolve the SQL server name. What is missing?', a:1, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['The VNet peering must be re-created','The private DNS zone must be linked to VNet-B (not just VNet-A)','A VPN Gateway must be added between the VNets','A new Private Endpoint must be created in VNet-B'], exp:'Private Endpoints work across peered VNets for routing, but DNS resolution requires the Private DNS zone to be linked to each VNet that needs to resolve the name. VNet-B needs its own link to the privatelink.database.windows.net zone.' },
    { q:'Which Application Security Group (ASG) benefit replaces IP-based NSG rules?', a:2, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['ASGs automatically configure firewall rules','ASGs provide layer-7 application filtering','ASGs let you group VMs logically so NSG rules reference the group name instead of IPs','ASGs replace NSGs entirely'], exp:'Application Security Groups allow you to define logical groups of VMs (e.g. "WebServers", "DatabaseServers") and reference those groups in NSG rules. When VM IPs change or you add more VMs, you just add them to the ASG — no need to update NSG rules.' },
    { q:'What must be configured on a VPN Gateway to allow it to dynamically exchange routes with on-premises networks?', a:1, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Static routes in a route table','BGP (Border Gateway Protocol)','ExpressRoute peering','Network Security Group rules'], exp:'BGP enables dynamic route exchange between the Azure VPN Gateway and on-premises BGP peers. Without BGP, you must configure static routes manually for each subnet on both sides. BGP requires VpnGw1 or higher SKU.' },
    { q:'An Alias DNS record in Azure DNS is needed when you want to do what?', a:0, domain:'Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Point the zone apex (root domain like contoso.com) to a Traffic Manager profile','Create a standard CNAME for a subdomain','Add MX records for email delivery','Configure reverse DNS for a VM\'s public IP'], exp:'CNAME records cannot be used at the zone apex (root domain) per DNS standards. Azure DNS Alias records are an Azure-specific extension that allows the apex to point to Azure resources (Traffic Manager, Front Door, CDN, Public IP) that have dynamic IPs.' },
    { q:'Which Azure Backup vault feature prevents backup administrators from permanently deleting backup data, even if they have full permissions?', a:3, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Soft Delete (14-day retention)','Geo-redundant backup storage','Cross-region restore','Immutable vault (time-based lock)'], exp:'Immutable vault prevents changes to backup policies and prohibits deletion of backup data for the configured retention period. Unlike Soft Delete (14 days), Immutable vault can be locked permanently and is designed for regulatory compliance (WORM storage).' },
    { q:'Azure Site Recovery replicates VMs to a secondary region. During a drill (test failover), what happens to the production workload?', a:0, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Production is unaffected — the test failover runs in an isolated network','Production automatically fails over to the secondary region','Replication is paused during the drill','The primary VMs are shut down temporarily'], exp:'Test Failover in Azure Site Recovery creates a test VM in an isolated VNet in the secondary region without affecting production or stopping replication. This allows you to verify DR works without any production impact.' },
    { q:'What is the default behavior when you delete a Resource Group that contains Azure resources?', a:2, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Resources are moved to a recycle bin for 30 days','Only the Resource Group metadata is deleted; resources remain','All resources inside are also deleted immediately','You must delete resources individually before deleting the RG'], exp:'Deleting a Resource Group deletes ALL resources inside it — VMs, databases, storage accounts, everything. This is what makes RGs a "lifecycle boundary." The operation cannot be undone (unless resources have delete locks).' },
    { q:'A company has 10 Azure subscriptions and wants to enforce a policy that VMs must use approved VM sizes across all of them. What is the most efficient approach?', a:1, domain:'Identity', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Apply Azure Policy to each subscription individually','Create a Management Group containing all subscriptions and assign the policy at the MG level','Apply a Resource Lock to each subscription','Configure RBAC at the subscription level'], exp:'Policies assigned to a Management Group inherit down to all subscriptions and resource groups within it. Assigning at the MG level means the policy automatically covers all 10 subscriptions and any future subscriptions added to that MG.' },
    { q:'In Azure Monitor, what is the difference between Metrics and Logs?', a:0, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Metrics are numeric time-series (93-day retention, near real-time); Logs are structured records queried with KQL (30-730 days)','Logs are more expensive than Metrics','Metrics require Log Analytics workspace; Logs do not','They are different names for the same data'], exp:'Azure Monitor Metrics: numeric time-series data, automatically collected, 93-day retention, available in near real-time. Azure Monitor Logs: structured records stored in Log Analytics workspace, queried with KQL, configurable 30-730 day retention, richer data.' },
    { q:'Which storage redundancy option should you choose for an Azure Storage account that must survive both zone failures AND regional disasters, and also needs read access from the secondary region during an outage?', a:3, domain:'Storage', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['ZRS','GRS','RA-GRS','RA-GZRS'], exp:'RA-GZRS provides: ZRS (3 copies across 3 zones in primary region for zone-level protection) + asynchronous replication to secondary region (GRS) + read access to the secondary region during outages. This is the maximum availability configuration.' },
    { q:'You configure Diagnostic Settings on an Azure VM to send Platform Logs to a Log Analytics workspace. What type of data do Platform Logs contain?', a:1, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['OS-level application logs and events from inside the VM','Resource-level operations performed ON the resource (create, delete, start, stop, access keys)','Network packet captures','Kernel and boot logs from the VM'], exp:'Platform Logs (Activity Logs and Resource Logs) record operations performed ON Azure resources through the management plane: who created/deleted/modified the resource, when, and with what result. For in-guest OS logs, you need the Azure Monitor Agent extension.' },
  ]
};
