window.EXAMS = window.EXAMS || {};
window.EXAMS.az305 = {
  meta: { code:'AZ-305', name:'Azure Solutions Architect Expert', icon:'🏛️', color:'#8b5cf6', level:'Expert', duration:120, questions:'40-60', passing:700, roles:['Solutions Architect','Cloud Architect','Enterprise Architect'], prereq:'AZ-104 required' },
  domains: [
    {
      id:'identity-governance-monitoring', name:'Identity, Governance & Monitoring', weight:'25-30%', color:'#7c4dff',
      sections: [
        { id:'governance-design', title:'Governance at Scale', icon:'⚖️',
          render: () => `
<div class="section-desc">Enterprise governance requires a hierarchy that scales with the organization. The Azure Landing Zone (CAF) model is the gold standard for enterprise Azure adoption.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Management Group Design</h4>
    <ul>
      <li>Up to 6 levels deep (not counting root)</li>
      <li>Policies/RBAC assigned to MG inherit to all subscriptions</li>
      <li><strong>Tenant Root MG</strong> — One per tenant. Cannot be moved.</li>
      <li>Design patterns: by department, by environment (prod/dev), by geography, by regulatory boundary</li>
      <li>Move subscriptions between MGs without recreating them</li>
      <li>Max 10,000 MGs per directory</li>
      <li>Max 6 levels deep (7 including root)</li>
    </ul>
    <div class="exam-tip">🎯 Assign policies at the lowest level that achieves your governance goal. Avoid over-assigning at root — harder to create exceptions.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Cloud Adoption Framework (CAF)</h4>
    <ul>
      <li><strong>Strategy</strong> — Define business justification, expected outcomes</li>
      <li><strong>Plan</strong> — Rationalize digital estate, create adoption plan</li>
      <li><strong>Ready</strong> — Prepare environment (Landing Zone)</li>
      <li><strong>Adopt</strong> — Migrate and modernize workloads</li>
      <li><strong>Govern</strong> — Establish governance disciplines</li>
      <li><strong>Manage</strong> — Ongoing operations and optimization</li>
    </ul>
    <p style="margin-top:8px"><strong>Azure Landing Zones:</strong> Pre-configured environments with networking, identity, security, and governance baked in. Accelerate adoption safely.</p>
    <div class="exam-tip">🎯 CAF = "how to adopt Azure" playbook. Not a product — it's guidance, tools, and best practices from Microsoft.</div>
  </div>
</div>` },
        { id:'logging-design', title:'Monitoring Architecture', icon:'📡',
          render: () => `
<div class="section-desc">At enterprise scale, you need a deliberate logging strategy: where do logs go, how long are they kept, who can access them?</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Log Analytics Workspace Design</h4>
    <table class="cmp-table"><thead><tr><th>Model</th><th>Pros</th><th>Cons</th></tr></thead><tbody>
      <tr><td>Single centralized workspace</td><td>Single pane, cross-resource queries, shared tools</td><td>Access control complexity, large workspace = slower queries</td></tr>
      <tr><td>Per-region workspaces</td><td>Data sovereignty, lower egress costs</td><td>Fragmented queries, complex Workbooks</td></tr>
      <tr><td>Per-environment workspaces</td><td>Dev/Test separate from Prod. Cleaner separation</td><td>Multiple workspaces to manage</td></tr>
      <tr><td>Hybrid (centralized + per-team)</td><td>Balance of control and autonomy</td><td>Most complex</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 For security: use a dedicated security workspace accessible only to SOC team. Separate from operational logs. Feed into Sentinel.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Monitoring Decision Tree</h4>
    <div style="display:flex;flex-direction:column;gap:6px;font-size:12px">
      ${['Infrastructure metrics → Azure Monitor Metrics → Metric Alerts','App performance → Application Insights → Smart Detection','Security events → Microsoft Sentinel → Analytics Rules','Cost anomalies → Azure Cost Management → Budget Alerts','Service health → Azure Service Health → Service Health Alerts','VM logs → Log Analytics Agent → Log Analytics workspace','K8s logs → Container Insights → Log Analytics workspace'].map(s=>`<div style="display:flex;gap:8px;align-items:center"><span style="color:#14b8a6">→</span><span style="color:var(--text-dim)">${s}</span></div>`).join('')}
    </div>
  </div>
</div>`},

        { id:'identity-design', title:'Hybrid Identity & B2B/B2C Design', icon:'👥',
          render: () => `
<div class="section-desc">Identity architecture is the cornerstone of every Azure solution. The architect must choose between cloud-only, hybrid, and external identity patterns based on organizational requirements.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Hybrid Identity Authentication Methods</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Method</th><th>Where auth happens</th><th>Best for</th></tr></thead><tbody>
      <tr><td><strong>Password Hash Sync (PHS)</strong></td><td>Azure AD (cloud)</td><td>Most orgs. Resilient if on-prem fails. Recommended default.</td></tr>
      <tr><td><strong>Pass-Through Auth (PTA)</strong></td><td>On-premises AD (real-time)</td><td>Compliance requires no password hashes in cloud.</td></tr>
      <tr><td><strong>Federation (AD FS)</strong></td><td>On-premises ADFS</td><td>Legacy SAML apps, smart card auth, third-party MFA.</td></tr>
      <tr><td><strong>Cloud-only</strong></td><td>Azure AD only</td><td>No on-prem AD. Pure cloud organizations.</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Microsoft recommends PHS + Seamless SSO for new deployments. PHS works even if on-prem AD is down — disaster recovery scenario for authentication.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Azure AD DS vs Azure AD vs Windows AD</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Windows AD (on-prem)</strong> — LDAP, Kerberos, GPO. Self-managed DCs. Used for legacy domain-joined Windows.</li>
      <li><strong>Azure AD</strong> — OAuth2/OIDC/SAML. Modern auth. NOT a domain controller. No LDAP/Kerberos/GPO.</li>
      <li><strong>Azure AD DS</strong> — Managed domain service. LDAP, Kerberos, NTLM. Sync from Azure AD. No on-prem DCs needed.</li>
      <li><strong>Use Azure AD DS when</strong>: legacy app needs LDAP bind, GPO management for cloud Windows VMs, no existing on-prem AD</li>
    </ul>
    <div class="exam-tip">🎯 Azure AD DS = managed Domain Controller in Azure. One-way sync from Azure AD. No write-back. Read-only domain join experience.</div>
  </div>
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure AD B2B (Business-to-Business)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Invite external partners as guest users. They authenticate with their own organization's credentials.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li>Guest users appear in your directory but auth via home tenant</li>
      <li>Cross-tenant access settings: control which orgs can invite/be invited</li>
      <li>Conditional Access applies to guests (require MFA on guest accounts)</li>
      <li>Free tier: up to 50,000 monthly active guests per paid Azure AD user</li>
      <li>Apps available: Microsoft 365, custom enterprise apps via SSO</li>
    </ul>
    <div class="exam-tip">🎯 Use B2B for: contractors, partners, vendors. Don't create internal accounts for external users — invite them as guests. Centralized identity governance.</div>
  </div>
  <div class="info-box" style="border-color:rgba(236,72,153,0.3);background:rgba(236,72,153,0.05)">
    <h4 style="color:#ec4899">Azure AD B2C (Customer-facing)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Identity platform for customer-facing applications. Separate from your corporate Azure AD tenant.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>Separate tenant</strong> — B2C tenant is its own directory, separate from corp Azure AD</li>
      <li><strong>Social logins</strong> — Google, Facebook, LinkedIn, Twitter, GitHub, Apple</li>
      <li><strong>Local accounts</strong> — Email + password, phone-based</li>
      <li><strong>User flows</strong> — Pre-built sign-up/sign-in/password reset flows</li>
      <li><strong>Custom policies</strong> — Identity Experience Framework for advanced scenarios</li>
      <li><strong>Branding</strong> — Customize the auth UI with your brand</li>
    </ul>
    <div class="exam-tip">🎯 B2C for customer-facing apps (e-commerce, banking, gaming). B2B for partners/contractors who need access to YOUR apps. Different scenarios, different services.</div>
  </div>
</div>` },

        { id:'cost-optimization-design', title:'Cost Optimization Design Patterns', icon:'💰',
          render: () => `
<div class="section-desc">Architects must design for cost efficiency from day one. Cost optimization is a Well-Architected Framework pillar — balance cost vs. other pillars based on workload requirements.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Cost Optimization Hierarchy</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Apply in order — biggest savings first:</p>
    <ol style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:18px">
      <li><strong>Right-size resources</strong> — Stop overprovisioning. Azure Advisor identifies idle/underutilized resources.</li>
      <li><strong>Eliminate waste</strong> — Delete unattached disks, unused public IPs, idle VMs, old snapshots, dev resources running 24/7.</li>
      <li><strong>Use the right service tier</strong> — Don't use Premium when Standard suffices. Hyperscale only for >4TB databases.</li>
      <li><strong>Apply Reserved Instances</strong> — 1-3yr commit for steady workloads. Up to 72% savings.</li>
      <li><strong>Use Spot VMs</strong> — For fault-tolerant batch workloads. Up to 90% savings.</li>
      <li><strong>Apply Hybrid Benefit</strong> — Bring existing Windows Server / SQL Server licenses. Up to 40% off.</li>
      <li><strong>Auto-scale and auto-shutdown</strong> — Match capacity to demand. Shut down dev/test outside business hours.</li>
    </ol>
    <div class="exam-tip">🎯 Right-size FIRST, then reserve. Reserving an oversized VM is just locking in waste at a discount.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Architecture Cost Patterns</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>Serverless first</strong> — Functions/Container Apps scale to zero. No cost when idle.</li>
      <li><strong>Auto-scale aggressively</strong> — VMSS, AKS Cluster Autoscaler. Scale in during off-peak.</li>
      <li><strong>Tiered storage</strong> — Hot for active, Cool 30+ days, Archive 180+ days. Lifecycle Mgmt rules.</li>
      <li><strong>Right database tier</strong> — Serverless Azure SQL for unpredictable workloads (auto-pause when idle).</li>
      <li><strong>Multi-tenant SaaS</strong> — Shared infrastructure across customers vs dedicated per-customer (significant cost difference).</li>
      <li><strong>Cache aggressively</strong> — Redis/CDN reduce DB calls and origin egress.</li>
      <li><strong>Egress matters</strong> — Inter-region traffic costs. Keep workloads + data in same region.</li>
      <li><strong>Dev/Test pricing</strong> — Use Azure Dev/Test subscription for non-prod (significant discount on Windows VMs).</li>
    </ul>
    <div class="exam-tip">🎯 Egress costs are sneaky. Cross-region replication, multi-region DR, and CDN origin pulls all generate egress charges. Plan data flows carefully.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'data-storage', name:'Design Data Storage', weight:'20-25%', color:'#8b5cf6',
      sections: [
        { id:'storage-decisions', title:'Storage Decision Framework', icon:'🗄️',
          render: () => `
<div class="section-desc">The right storage choice depends on: data structure, access patterns, consistency requirements, scale, and cost.</div>
<div class="flowchart" style="margin-bottom:20px">
  <div class="fc-node fc-node-start" style="border-color:#a78bfa;background:rgba(139,92,246,0.1);color:#a78bfa;min-width:220px">What type of data?</div>
  <div class="fc-arrow">↓</div>
  <div class="fc-branch">
    <div class="fc-branch-col">
      <div class="fc-branch-label">Structured/Relational</div>
      <div class="fc-node" style="border-color:#50abf1;background:rgba(0,120,212,0.08);color:#50abf1;min-width:160px">Need global distribution?</div>
      <div class="fc-arrow">↓</div>
      <div class="fc-branch">
        <div class="fc-branch-col"><div class="fc-branch-label">Yes</div><div class="fc-node" style="border-color:#a78bfa;background:rgba(139,92,246,0.08);color:#a78bfa;font-size:11px">Cosmos DB (NoSQL API)</div></div>
        <div class="fc-branch-col"><div class="fc-branch-label">No</div><div class="fc-node" style="border-color:#50abf1;background:rgba(0,120,212,0.08);color:#50abf1;font-size:11px">Azure SQL / SQL MI</div></div>
      </div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Semi-structured / NoSQL</div>
      <div class="fc-node" style="border-color:#22c55e;background:rgba(34,197,94,0.08);color:#22c55e;min-width:160px">Access pattern?</div>
      <div class="fc-arrow">↓</div>
      <div class="fc-branch">
        <div class="fc-branch-col"><div class="fc-branch-label">Key-value</div><div class="fc-node" style="border-color:#22c55e;background:rgba(34,197,94,0.08);color:#22c55e;font-size:11px">Table Storage / Redis</div></div>
        <div class="fc-branch-col"><div class="fc-branch-label">Document</div><div class="fc-node" style="border-color:#ec4899;background:rgba(236,72,153,0.08);color:#ec4899;font-size:11px">Cosmos DB</div></div>
        <div class="fc-branch-col"><div class="fc-branch-label">Graph</div><div class="fc-node" style="border-color:#f97316;background:rgba(249,115,22,0.08);color:#f97316;font-size:11px">Cosmos Gremlin</div></div>
      </div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Unstructured files</div>
      <div class="fc-node" style="border-color:#f97316;background:rgba(249,115,22,0.08);color:#f97316;min-width:160px">File shares or objects?</div>
      <div class="fc-arrow">↓</div>
      <div class="fc-branch">
        <div class="fc-branch-col"><div class="fc-branch-label">File shares (SMB)</div><div class="fc-node" style="border-color:#f97316;background:rgba(249,115,22,0.08);color:#f97316;font-size:11px">Azure Files</div></div>
        <div class="fc-branch-col"><div class="fc-branch-label">Objects/blobs</div><div class="fc-node" style="border-color:#eab308;background:rgba(234,179,8,0.08);color:#eab308;font-size:11px">Blob Storage</div></div>
      </div>
    </div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
  <h4 style="color:#a78bfa">Cosmos DB Consistency Levels (Strong → Weak)</h4>
  <table class="cmp-table"><thead><tr><th>Level</th><th>Guarantee</th><th>Latency</th><th>Throughput</th><th>Use Case</th></tr></thead><tbody>
    <tr><td>Strong</td><td>Always reads latest. No stale reads.</td><td>Highest</td><td>Lowest</td><td>Financial transactions, inventory</td></tr>
    <tr><td>Bounded Staleness</td><td>Reads lag by K versions or T seconds max</td><td>High</td><td>Low-Med</td><td>Leader boards, aggregations</td></tr>
    <tr><td>Session</td><td>Consistent within a session. Read-your-writes.</td><td>Medium</td><td>Medium</td><td>Shopping cart (default)</td></tr>
    <tr><td>Consistent Prefix</td><td>No out-of-order reads. But may be stale.</td><td>Low</td><td>High</td><td>Social media feeds</td></tr>
    <tr><td>Eventual</td><td>No guarantees on order. Lowest latency.</td><td>Lowest</td><td>Highest</td><td>Likes/favorites count</td></tr>
  </tbody></table>
  <div class="exam-tip">🎯 Session consistency is the DEFAULT and most commonly chosen. Strong = highest cost, lowest throughput. Eventual = highest throughput but stale reads possible.</div>
</div>` },

        { id:'data-integration', title:'Data Integration & API Design Patterns', icon:'🔗',
          render: () => `
<div class="section-desc">Enterprise solutions require data integration between services and well-designed APIs. AZ-305 tests your ability to choose the right integration pattern.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
    <h4 style="color:#a78bfa">Data Integration Services Decision</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Need</th><th>Service</th><th>Key Capability</th></tr></thead><tbody>
      <tr><td>ETL/ELT pipelines</td><td>Azure Data Factory</td><td>90+ connectors, code-free, scheduled/triggered</td></tr>
      <tr><td>Big data analytics</td><td>Azure Synapse Analytics</td><td>SQL + Spark + pipelines in one unified platform</td></tr>
      <tr><td>Real-time streaming</td><td>Azure Stream Analytics</td><td>SQL queries on live streams, <1s latency</td></tr>
      <tr><td>Message queuing</td><td>Azure Service Bus</td><td>Guaranteed delivery, sessions, dead-letter</td></tr>
      <tr><td>Event routing</td><td>Azure Event Grid</td><td>Reactive, HTTP webhooks, pay per event</td></tr>
      <tr><td>High-volume streaming</td><td>Azure Event Hubs</td><td>Kafka-compatible, millions events/sec</td></tr>
      <tr><td>Low-code workflows</td><td>Azure Logic Apps</td><td>400+ connectors, visual designer</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 AZ-305 scenario: "process millions of IoT events per second" = Event Hubs. "guaranteed message delivery for order processing" = Service Bus. "react when a blob is uploaded" = Event Grid.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure API Management Design Patterns</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">APIM sits between consumers and backend APIs, providing a unified gateway with policies, security, and analytics.</p>
    <div style="display:flex;flex-direction:column;gap:8px">
      ${[
        ['Gateway (Front Door)','Single entry point for all APIs. Route to multiple backends. Aggregate results from multiple services.'],
        ['Policy Engine','Apply: auth (JWT/OAuth), rate limiting, IP filtering, caching, request/response transformation, logging.'],
        ['Developer Portal','Auto-generated API documentation. Try-it console. Subscription key management. OpenAPI/Swagger import.'],
        ['Products & Subscriptions','Group APIs into products (Free tier: 100 calls/day, Premium: unlimited). Subscriptions grant access.'],
        ['Backends & Load Balancing','Route to multiple backend pools. Health checks. Circuit breaker. Retry policies.'],
        ['Self-hosted Gateway','Run APIM gateway on-premises or in other clouds. Manage centrally from Azure.']
      ].map(([n,d])=>`<div style="display:flex;gap:10px;font-size:12px;border-bottom:1px solid var(--border);padding:6px 0"><span style="font-weight:700;color:#14b8a6;min-width:130px;flex-shrink:0">${n}</span><span style="color:var(--text-dim)">${d}</span></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Use APIM when: multiple teams publish APIs, need unified security/rate limiting, external partners need API access, need to hide backend complexity.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'business-continuity', name:'Design Business Continuity', weight:'15-20%', color:'#22c55e',
      sections: [
        { id:'ha-dr', title:'High Availability & Disaster Recovery', icon:'🔄',
          render: () => `
<div class="section-desc">Business continuity requires defining RTO/RPO targets first, then selecting services that can meet those targets.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">HA Patterns</h4>
    <table class="cmp-table"><thead><tr><th>Pattern</th><th>RTO</th><th>RPO</th><th>Cost</th></tr></thead><tbody>
      <tr><td>Single region + AZs</td><td>Seconds</td><td>~0</td><td>Medium</td></tr>
      <tr><td>Active-passive multi-region</td><td>Minutes-Hours</td><td>Minutes</td><td>Medium-High</td></tr>
      <tr><td>Active-active multi-region</td><td>Seconds</td><td>~0</td><td>High (2x)</td></tr>
      <tr><td>Backup + restore (cold)</td><td>Hours</td><td>Hours</td><td>Low</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Active-active = highest availability + cost. Cold backup = lowest cost + longest recovery. Match pattern to business RTO/RPO requirements and budget.</div>
  </div>
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">6 R's of Migration</h4>
    <ul>
      <li><strong>Rehost</strong> — Lift and shift. VMs to Azure VMs. No code changes. Fastest migration.</li>
      <li><strong>Refactor</strong> — Minor code changes. Move to PaaS. E.g., SQL on VM → Azure SQL DB.</li>
      <li><strong>Rearchitect</strong> — Significant redesign. Monolith → microservices/containers.</li>
      <li><strong>Rebuild</strong> — Rewrite from scratch using cloud-native services.</li>
      <li><strong>Replace</strong> — Retire the app, use a SaaS equivalent instead.</li>
      <li><strong>Retire</strong> — Decommission — no longer needed.</li>
    </ul>
    <div class="exam-tip">🎯 Rehost = fastest, least modern. Rebuild = slowest, most cloud-native. Choose based on app value, budget, and timeline.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'infrastructure', name:'Design Infrastructure Solutions', weight:'30-35%', color:'#3b82f6',
      sections: [
        { id:'compute-design', title:'Compute Design Decisions', icon:'🖥️',
          render: () => `
<div class="section-desc">Choosing the right compute is the most impactful architectural decision. Consider: control needed, scale requirements, DevOps maturity, cost profile.</div>
<div class="flowchart" style="margin-bottom:20px">
  <div class="fc-node fc-node-start" style="border-color:#60a5fa;background:rgba(59,130,246,0.1);color:#60a5fa">What are you deploying?</div>
  <div class="fc-arrow">↓</div>
  <div class="fc-branch">
    <div class="fc-branch-col">
      <div class="fc-branch-label">Need OS control</div>
      <div class="fc-node" style="border-color:#50abf1;background:rgba(0,120,212,0.08);color:#50abf1;font-size:11px">Azure VMs<br>or VMSS</div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Web app / API</div>
      <div class="fc-node" style="border-color:#22c55e;background:rgba(34,197,94,0.08);color:#22c55e;font-size:11px">App Service<br>(PaaS)</div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Containers at scale</div>
      <div class="fc-node" style="border-color:#a78bfa;background:rgba(139,92,246,0.08);color:#a78bfa;font-size:11px">AKS<br>(Kubernetes)</div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Event-driven / short tasks</div>
      <div class="fc-node" style="border-color:#f97316;background:rgba(249,115,22,0.08);color:#f97316;font-size:11px">Azure Functions<br>(Serverless)</div>
    </div>
    <div class="fc-branch-col">
      <div class="fc-branch-label">Simple container</div>
      <div class="fc-node" style="border-color:#ec4899;background:rgba(236,72,153,0.08);color:#ec4899;font-size:11px">Azure Container<br>Instances</div>
    </div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
  <h4 style="color:#60a5fa">Hub-Spoke Network Topology</h4>
  <div class="grid g2">
    <div>
      <p style="font-size:13px;color:var(--text-dim);line-height:1.6">Hub-spoke is the recommended topology for enterprise Azure networking. One hub VNet contains shared services (firewall, VPN/ER gateway, DNS, NVA). Spoke VNets contain workloads and peer with hub.</p>
      <ul style="margin-top:10px;font-size:12px;color:var(--text-dim);line-height:2">
        <li>Centralize security controls in hub (Azure Firewall)</li>
        <li>Route spoke-to-spoke via hub (UDRs)</li>
        <li>Share ExpressRoute/VPN gateway across spokes</li>
        <li>Scale by adding new spoke VNets without disruption</li>
      </ul>
      <div class="exam-tip">🎯 Hub-spoke is NOT automatic — requires UDRs on spoke subnets to route through hub. Azure Virtual WAN automates this.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;font-size:12px">
      <div style="padding:8px 12px;border-radius:8px;background:rgba(0,120,212,0.15);border:1px solid rgba(0,120,212,0.3);text-align:center;color:#50abf1;font-weight:700">🏛️ Hub VNet<br><span style="font-size:10px;font-weight:400;color:var(--text-dim)">Firewall, Gateway, DNS, NVA, Bastion</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">
        ${['App Spoke\n(Web Tier)','Data Spoke\n(DB Tier)','Mgmt Spoke\n(Ops)'].map(n=>`<div style="padding:8px;border-radius:6px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);text-align:center;font-size:11px;color:#22c55e;white-space:pre-line">${n}</div>`).join('')}
      </div>
    </div>
  </div>
</div>` },

        { id:'waf', title:'Well-Architected Framework', icon:'⚖️',
          render: () => `
<div class="section-desc">The Azure Well-Architected Framework (WAF) provides 5 pillars for designing high-quality cloud solutions. Every AZ-305 architecture question is evaluated against these pillars.</div>
<div class="grid g3" style="margin-bottom:20px">
  ${[
    ['🔄','Reliability','Ensure your workload performs its intended function correctly and consistently. Covers resilience (recover from failures) and availability (% time accessible).','Design for failure. Use AZs for 99.99%. Multi-region for 99.999%+. Test with chaos engineering. Define clear RTO/RPO targets.','rgba(34,197,94,0.1)','#22c55e'],
    ['🔒','Security','Protect your workload from threats. Defense in depth, identity as the new perimeter, data encryption, least privilege access.','Zero Trust: never trust, always verify. Managed Identities over secrets. Private Endpoints over public. Encrypt at rest and in transit.','rgba(239,68,68,0.1)','#f87171'],
    ['💰','Cost Optimization','Manage costs to maximize value. Remove unused resources, right-size, use appropriate pricing models.','Right-size before reserving. Spot for fault-tolerant. Reserved for steady-state. Autoscale to match demand. Use Azure Advisor.','rgba(234,179,8,0.1)','#eab308'],
    ['⚡','Performance Efficiency','Use resources efficiently and match supply to demand. Scale horizontally. Use appropriate tiers and caching.','Cache aggressively (Redis, CDN). Scale out not up. Proximity for latency-sensitive. Use Premium storage for I/O-heavy.','rgba(59,130,246,0.1)','#60a5fa'],
    ['🛠️','Operational Excellence','Operations processes that keep systems running well. Monitoring, DevOps practices, automation, incident response.','Everything as code (IaC, runbooks). Monitor before users notice. Automate responses. Practice DR drills. Use deployment slots.','rgba(20,184,166,0.1)','#14b8a6']
  ].map(([icon,name,desc,tip,bg,c])=>`<div style="padding:18px;border-radius:var(--radius);background:${bg};border:1px solid ${c}30"><div style="font-size:24px;margin-bottom:8px">${icon}</div><h3 style="color:${c};font-size:15px;margin-bottom:8px">${name}</h3><p style="font-size:12px;color:var(--text-dim);line-height:1.65;margin-bottom:10px">${desc}</p><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>
<div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
  <h4 style="color:#a78bfa;margin-bottom:12px">Architecture Trade-offs by Pillar</h4>
  <table class="cmp-table"><thead><tr><th>Optimizing for</th><th>Often costs more</th><th>Typical design choice</th></tr></thead><tbody>
    <tr><td style="color:#22c55e">Reliability</td><td>Cost (redundant resources), Complexity</td><td>Multi-zone VMs, read replicas, geo-replication</td></tr>
    <tr><td style="color:#f87171">Security</td><td>Performance (encryption overhead), UX (extra auth steps)</td><td>Private endpoints, MFA, encrypted disks</td></tr>
    <tr><td style="color:#eab308">Cost Optimization</td><td>Reliability (fewer replicas), Performance (smaller VMs)</td><td>Reserved instances, autoscale to zero, Spot VMs</td></tr>
    <tr><td style="color:#60a5fa">Performance</td><td>Cost (premium tiers, caching), Complexity</td><td>Ultra Disk, Redis cache, CDN, proximity placement</td></tr>
    <tr><td style="color:#14b8a6">Operational Excellence</td><td>Development time (IaC, tests, runbooks)</td><td>ARM/Bicep templates, blue-green deploys, dashboards</td></tr>
  </tbody></table>
  <div class="exam-tip">🎯 AZ-305 exam presents scenarios and asks which WAF pillar the solution addresses. Know the PRIMARY pillar each service/pattern targets.</div>
</div>` },

        { id:'app-patterns', title:'Application Architecture Patterns', icon:'🏗️',
          render: () => `
<div class="section-desc">Understanding when to apply different architecture patterns is core to the AZ-305 exam. The right pattern depends on workload characteristics, team size, and scale requirements.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">Monolith vs Microservices</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th></th><th>Monolith</th><th>Microservices</th></tr></thead><tbody>
      <tr><td>Deploy unit</td><td>Whole application</td><td>Individual services</td></tr>
      <tr><td>Scale</td><td>Scale entire app</td><td>Scale individual services</td></tr>
      <tr><td>Tech diversity</td><td class="cmp-no">Same stack</td><td class="cmp-ok">Each service chooses</td></tr>
      <tr><td>Complexity</td><td>Low (start)</td><td>High (distributed system)</td></tr>
      <tr><td>Team size</td><td>Small/single team</td><td>Multiple independent teams</td></tr>
      <tr><td>Azure fit</td><td>App Service</td><td>AKS, Container Apps</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Don't microservice everything. Start with monolith, extract to services when team and scale demand it. Microservices = operational complexity.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Event-Driven Architecture</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">Services communicate via events — publishers don't know about subscribers. Loose coupling enables independent scaling and deployment.</p>
    <div class="grid g2" style="gap:8px;margin-top:10px">
      ${[['Azure Service Bus','Enterprise messaging. Guaranteed delivery. Sessions, dead-letter, transactions. Topics = pub/sub. Queues = FIFO.'],['Azure Event Grid','Event routing. Reactive. HTTP webhooks. 10M events/sec. Pay per event. For system events (blob created, VM stopped).'],['Azure Event Hubs','Big data streaming. Kafka-compatible. Partitions, consumer groups. For high-volume telemetry and logs.'],['Azure Logic Apps','Low-code event workflows. 400+ connectors. Orchestrate across services without custom code.']].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(20,184,166,0.06);border:1px solid rgba(20,184,166,0.2)"><div style="font-size:12px;font-weight:700;color:#14b8a6;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
  </div>
</div>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">CQRS Pattern</h4>
    <p style="font-size:12px;color:var(--text-dim);line-height:1.6">Command Query Responsibility Segregation: separate read and write operations into different models.</p>
    <ul style="font-size:12px;color:var(--text-dim);padding-left:14px;margin-top:8px;line-height:2">
      <li>Commands (writes) → OLTP database (SQL)</li>
      <li>Queries (reads) → read-optimized store (Cosmos DB)</li>
      <li>Event sourcing: store events, not current state</li>
      <li>Enables separate scaling of reads vs writes</li>
    </ul>
    <div class="exam-tip">🎯 CQRS shines when read and write load are very different (e.g., 1000:1 read:write ratio).</div>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Circuit Breaker Pattern</h4>
    <p style="font-size:12px;color:var(--text-dim);line-height:1.6">Stop calling a failing service to prevent cascade failures. States: Closed (normal) → Open (stop calls) → Half-Open (test recovery).</p>
    <ul style="font-size:12px;color:var(--text-dim);padding-left:14px;margin-top:8px;line-height:2">
      <li>Azure API Management: circuit breaker policy</li>
      <li>Service mesh (Istio on AKS) provides built-in</li>
      <li>Prevents thundering herd on recovery</li>
    </ul>
    <div class="exam-tip">🎯 Circuit Breaker = resilience pattern. Prevents cascade failures when a dependency goes down.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Retry & Throttle Patterns</h4>
    <ul style="font-size:12px;color:var(--text-dim);padding-left:14px;margin-top:8px;line-height:2">
      <li><strong>Retry with exponential backoff</strong> — don't hammer a failing service</li>
      <li><strong>Throttling</strong> — limit requests to protect the service</li>
      <li><strong>Bulkhead</strong> — isolate components so one failure doesn't sink all</li>
      <li><strong>Queue-based load leveling</strong> — buffer spikes with Service Bus</li>
      <li><strong>Compensating transaction</strong> — undo completed steps on failure</li>
    </ul>
    <div class="exam-tip">🎯 These patterns are in the Azure Architecture Center. AZ-305 expects you to match pattern to scenario.</div>
  </div>
</div>` }
      ]
    }
  ],
  quiz: [
    { q:'Which Azure Cosmos DB consistency level provides "read your own writes" guarantees within a client session?', a:1, domain:'Data Storage', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Strong','Session','Consistent Prefix','Eventual'], exp:'Session consistency (the default) provides read-your-writes, monotonic reads, and monotonic writes within a session. It\'s consistent for a single client session but allows slight staleness for other clients.' },
    { q:'A company needs its Azure environment to automatically deploy monitoring agents to all new VMs without manual intervention. Which Azure feature achieves this?', a:2, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Resource Locks','Azure Blueprints','Azure Policy with DeployIfNotExists effect','RBAC role assignment'], exp:'DeployIfNotExists policy effect automatically deploys a related resource (like a monitoring agent extension) when a VM is created without it. This is the auto-remediation mechanism in Azure Policy.' },
    { q:'Which migration strategy involves moving a VM from on-premises to Azure as-is, without any code or configuration changes?', a:0, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Rehost (Lift and Shift)','Refactor','Rearchitect','Rebuild'], exp:'Rehost (Lift and Shift) moves a workload to Azure with minimal or no changes. The VM is copied to Azure VMs. It\'s the fastest migration path but doesn\'t take advantage of cloud-native capabilities.' },
    { q:'For a global e-commerce platform that must handle Black Friday peaks with guaranteed low latency worldwide, which compute architecture is most appropriate?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Single region VM with vertical scaling','Single region VMSS with auto-scale','Multi-region deployment with Azure Front Door and VMSS per region','Azure Functions with global replication'], exp:'Multi-region VMSS + Azure Front Door routes users to the nearest healthy region, provides global load balancing, WAF, and CDN. VMSS auto-scales in each region. This achieves both low global latency and elastic scale.' },
    { q:'In a hub-spoke network topology, what is required to allow traffic to flow between two spoke VNets?', a:1, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Direct VNet peering between the two spokes','User-Defined Routes (UDRs) on each spoke pointing to the hub firewall/NVA, plus spoke-to-hub peering','ExpressRoute between the spokes','No configuration needed — peered VNets automatically route to each other'], exp:'VNet peering is not transitive. Even though both spokes are peered with the hub, they cannot communicate directly. You need UDRs on each spoke to route cross-spoke traffic through the hub (where an Azure Firewall or NVA handles it).' },
    { q:'An architect must choose between Azure Active-Active and Active-Passive multi-region deployment. What is the main advantage of Active-Active?', a:0, domain:'Business Continuity', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Near-zero RTO and RPO — no failover needed since both regions serve traffic simultaneously','Lower cost than Active-Passive','Simpler to implement and maintain','Better for read-heavy workloads only'], exp:'Active-Active means both regions actively serve traffic simultaneously. There is no failover event — if one region fails, the other is already handling traffic. RTO ≈ 0. RPO ≈ 0 (with synchronous replication). Downside: roughly 2x infrastructure cost.' },
    { q:'The Azure Well-Architected Framework has 5 pillars. Which pillar focuses on running workloads effectively and gaining operational insight?', a:3, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Reliability','Security','Cost Optimization','Operational Excellence'], exp:'Operational Excellence covers: monitoring, observability, deployment automation, DevOps practices, and continuous improvement. It\'s about HOW you operate your system, not just whether it works. The other pillars are Reliability, Security, Performance Efficiency, and Cost Optimization.' },
    { q:'Which pillar of the Azure Well-Architected Framework is primarily concerned with ensuring a workload can tolerate failures and continue operating?', a:0, domain:'Business Continuity', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Reliability','Security','Performance Efficiency','Operational Excellence'], exp:'Reliability focuses on: resiliency (recovering from failures), availability (percentage of time the system is accessible), and disaster recovery. It covers redundancy, fault tolerance, and the design of resilient architectures.' },
    { q:'A company is migrating a complex on-premises SQL Server application that uses SQL Server Agent jobs, linked servers, and CLR integration. Which target should the architect recommend?', a:1, domain:'Data Storage', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Azure SQL Database (Single Database)','Azure SQL Managed Instance','SQL Server on Azure VMs (IaaS)','Azure Database for PostgreSQL'], exp:'Azure SQL Managed Instance provides near 100% SQL Server compatibility including SQL Agent jobs, linked servers, CLR, cross-database queries, and DTC. Azure SQL Database lacks many of these features. SQL on VMs gives full compat but you manage the OS.' },
    { q:'When designing for cost optimization in Azure, what is the FIRST step an architect should take?', a:2, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Purchase Reserved Instances for all workloads','Enable Spot VMs for all production workloads','Right-size resources and eliminate waste before optimizing pricing','Move all workloads to the cheapest Azure region'], exp:'Right-sizing (matching resource size to actual workload needs) is the first step. Paying for smaller RIs without right-sizing wastes money. Azure Advisor identifies right-sizing opportunities. Only after right-sizing should you optimize pricing (RIs, Spot, Hybrid Benefit).' },
    { q:'Which Azure service would an architect use to assess on-premises VMs for migration readiness and get right-sized recommendations for Azure?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Azure Arc','Azure Site Recovery','Azure Migrate','Azure Database Migration Service'], exp:'Azure Migrate provides: discovery (find all on-premises servers), assessment (is each server ready for Azure? what Azure VM size is equivalent?), and migration (move the servers). It covers VMs, web apps, SQL databases, and virtual desktop.' },
    { q:'An architect must choose storage for a global gaming leaderboard that needs sub-10ms reads worldwide. Which service is most appropriate?', a:1, domain:'Data Storage', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Azure SQL Database with Active Geo-Replication','Azure Cosmos DB with Eventual consistency and multi-region writes','Azure Cache for Redis','Azure Table Storage with RA-GZRS'], exp:'Cosmos DB with multi-region writes and Eventual consistency provides: global distribution (data replicated to all regions), <10ms reads at P99 from any region, and massive throughput. Eventual consistency is fine for leaderboards where slight staleness is acceptable.' },
    { q:'Which microservice communication pattern should be used when services need to react to events without knowing about each other?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Synchronous REST/HTTP calls','gRPC for high-performance synchronous calls','Event-driven architecture with Azure Event Grid or Service Bus','GraphQL federation'], exp:'Event-driven architecture decouples services. A service publishes an event; other services subscribe to events they care about without knowing about the publisher. Azure Event Grid (reactive events, pay-per-event) and Service Bus (reliable messaging, queues/topics) both support this pattern.' },
    { q:'What is the Azure Landing Zone concept in the Cloud Adoption Framework?', a:1, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['A physical Azure datacenter location','A pre-configured, governance-ready Azure environment with networking, identity, security, and management baseline built in','A list of recommended Azure services','A migration checklist for each workload'], exp:'Azure Landing Zones are the output of the CAF "Ready" phase. They provide a repeatable, governed foundation: management groups hierarchy, policies, networking (hub-spoke), identity, monitoring, and security controls pre-built. New workloads land in an already-compliant environment.' },
    { q:'An architect needs to design for 99.99% availability for a web application. Which combination achieves this?', a:2, domain:'Business Continuity', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Single VM with Premium SSD (99.9% SLA)','Two VMs in an Availability Set (99.95% SLA)','Two or more VMs across Availability Zones within one region (99.99% SLA)','Active-passive multi-region with Traffic Manager'], exp:'Deploying 2+ VMs across Availability Zones in the same region achieves 99.99% SLA for the VM tier. Combined with zone-redundant Application Gateway and zone-redundant Azure SQL (99.99% SLA), the overall composite SLA can achieve or approach 99.99%.' },
    { q:'What does RPO (Recovery Point Objective) measure in a disaster recovery plan?', a:0, domain:'Business Continuity', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Maximum acceptable data loss measured in time — how far back can data be restored to?','Maximum acceptable downtime before systems must be restored','The minimum number of replicas required','The distance between primary and secondary regions'], exp:'RPO = Recovery Point Objective = maximum acceptable data loss in time. If RPO = 1 hour, you can afford to lose up to 1 hour of data. RTO = Recovery Time Objective = how long you can be down. RPO drives backup/replication frequency. RTO drives recovery automation.' },
    { q:'Which Azure Well-Architected Framework pillar recommends using managed identities instead of service principal secrets?', a:1, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['Cost Optimization','Security','Operational Excellence','Performance Efficiency'], exp:'The Security pillar recommends: Zero Trust principles, least privilege, eliminating secrets (use Managed Identities instead of client secrets), encrypting data, and layered defense. Managed Identities eliminate credential management entirely.' },
    { q:'A startup needs to run a containerized application that scales from zero to thousands of requests per second automatically. Cost is critical. Which service is most appropriate?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Azure Kubernetes Service (AKS)','Azure Container Instances (ACI)','Azure Container Apps','Azure App Service with Docker'], exp:'Azure Container Apps is designed for exactly this: serverless containers that scale to zero (no cost when idle) and scale rapidly to handle bursts. It uses KEDA under the hood. AKS requires node management. ACI doesn\'t orchestrate. App Service doesn\'t scale to zero.' },
    { q:'Which data storage service provides a hierarchical namespace (folders) for big data analytics with Spark and Databricks?', a:1, domain:'Data Storage', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Azure Blob Storage (standard)','Azure Data Lake Storage Gen2 (ADLS Gen2)','Azure Table Storage','Azure Files (NFS)'], exp:'ADLS Gen2 adds a hierarchical namespace (folder/file structure) on top of Azure Blob Storage. This is required for efficient big data operations with Hadoop, Spark, and Databricks. Standard Blob uses flat namespace (simulates folders via prefix naming).' },
    { q:'An architect needs to select a messaging service that guarantees FIFO delivery and supports exactly-once processing for a financial transaction system. Which service is most appropriate?', a:1, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Azure Event Grid','Azure Service Bus with sessions enabled','Azure Event Hubs','Azure Queue Storage'], exp:'Azure Service Bus with sessions guarantees FIFO ordering for a session key and supports exactly-once processing via message locks. Event Grid is fire-and-forget with no ordering. Event Hubs has partition ordering but not exactly-once. Queue Storage has no FIFO guarantee.' },
    { q:'When should an architect choose Azure Event Grid over Azure Service Bus?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['When messages must be delivered in FIFO order','When guaranteed delivery and dead-lettering are required','When reacting to Azure resource state changes or discrete events (e.g. blob created, VM stopped)','When processing millions of events per second with Kafka compatibility'], exp:'Event Grid is designed for reactive event-driven scenarios — something happens (blob uploaded, resource changed) and other services react. It uses HTTP push to subscribers, charges per event, and supports up to 10,000 topics. Service Bus = reliable queuing. Event Hubs = high-volume streaming.' },
    { q:'An architect must choose between Azure SQL Database Business Critical and General Purpose tiers. What does Business Critical provide that General Purpose does not?', a:0, domain:'Data Storage', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Built-in read replica for HA + readable secondary replica for read scale-out, at no extra cost','Larger maximum database size (100TB+)','Cheaper pricing for steady-state workloads','NoSQL API compatibility'], exp:'Business Critical uses Always On Availability Groups with 3-4 replicas. The secondary replicas are used both for HA failover AND as readable read replicas (for reporting queries). This built-in read scale-out is unique to Business Critical — General Purpose has a single primary replica.' },
    { q:'What does the Azure Cloud Adoption Framework "Ready" phase produce?', a:1, domain:'Identity & Governance', domainColor:'rgba(124,77,255,0.15)', domainText:'#a78bfa', opts:['The business justification for cloud adoption','Azure Landing Zones — a governed, production-ready Azure environment','The migration plan for each workload','The governance model and policy assignments'], exp:'The CAF "Ready" phase focuses on creating an Azure Landing Zone: a pre-configured, governed Azure environment with management groups, subscriptions, networking (hub-spoke), identity, security, and monitoring baselines already in place before any workloads arrive.' },
    { q:'An architect is designing a microservices application. Which pattern prevents a slow service from causing all other services to fail?', a:2, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['Retry with exponential backoff','CQRS (Command Query Responsibility Segregation)','Circuit Breaker pattern','Saga pattern for distributed transactions'], exp:'The Circuit Breaker pattern stops calling a failing service after a threshold of failures (Open state). After a timeout, it allows a test call (Half-Open). If successful, it returns to Closed. This prevents cascade failures — a slow service can\'t exhaust connection pools of its callers.' },
    { q:'Which Azure API Management policy would you use to prevent a single client from making more than 100 API calls per minute?', a:1, domain:'Infrastructure', domainColor:'rgba(59,130,246,0.15)', domainText:'#60a5fa', opts:['ip-filter policy','rate-limit-by-key policy','authentication-basic policy','set-header policy'], exp:'rate-limit-by-key policy throttles calls based on a key (subscription key, IP address, JWT claim). After the limit is reached, the caller receives a 429 Too Many Requests response. quota policy limits total calls over longer periods (daily/monthly). rate-limit-by-key = per-minute/per-hour throttling.' },
  ]
};
