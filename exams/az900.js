window.EXAMS = window.EXAMS || {};
window.EXAMS.az900 = {
  meta: { code:'AZ-900', name:'Azure Fundamentals', icon:'☁️', color:'#0078d4', level:'Fundamentals', duration:60, questions:'40-60', passing:700, roles:['All Roles — Entry Level','Non-Technical Decision Makers','Anyone starting Azure'], prereq:'None — open to all' },
  domains: [
    {
      id:'cloud-concepts', name:'Describe Cloud Concepts', weight:'25-30%', color:'#00d4ff',
      sections: [
        { id:'benefits', title:'Benefits of Cloud Computing', icon:'✅',
          render: () => `
<div class="section-desc">Cloud computing delivers IT resources over the internet with pay-as-you-go pricing. Understanding these core benefits is 20-25% of the AZ-900 exam.</div>
<p style="color:var(--text-dim);font-size:13px;margin-bottom:16px">💡 Tap each card to flip it and see the exam tip.</p>
<div class="grid g4" style="margin-bottom:20px">
${[
  ['🟢','High Availability','Ensures your service stays running even when individual components fail. Azure uses redundant hardware, power, and networking.','HA = component failure protection. Measured by SLA uptime (99.9% = ~43 min/month downtime).'],
  ['📈','Scalability','Handle increased load. Vertical = bigger VM. Horizontal = more VMs. Planned capacity increase.','Scalability = planned growth. Elasticity = automatic/dynamic growth. They are different!'],
  ['🔁','Elasticity','Automatically scale UP when busy, DOWN when quiet. The "rubber band" effect. Only pay for what you use.','Elasticity is automatic scaling based on real-time demand signals, not manual scaling.'],
  ['⚡','Agility','Provision resources in minutes, not months. React to market changes instantly. No hardware procurement delays.','Agility = speed of provisioning. Going from 0 to 100 VMs takes minutes in Azure, not 6 weeks.'],
  ['🌍','Global Reach','Deploy close to your users anywhere in the world. 60+ Azure regions. Reduce latency and comply with data residency laws.','Azure has MORE global regions than any other cloud provider. Not all regions have all services.'],
  ['🔐','Security','Azure secures the physical layer (guards, cameras, biometrics). You secure identities, data, and applications.','Azure secures the physical infrastructure. You are responsible for what you deploy ON that infrastructure.'],
  ['💵','Cost Predictability','Consumption-based billing means no surprise hardware bills. Use Cost Management to set budgets and alerts.','Pay-as-you-go = OpEx. Cloud eliminates CapEx (upfront hardware investment). Only pay for what you use.'],
  ['♻️','Disaster Recovery','Replicate to a secondary region. Failover automatically if primary fails. Business continues seamlessly.','DR = recovery from a MAJOR site failure (entire datacenter destroyed). HA = component failure within one site.'],
  ['🔒','Fault Tolerance','System continues operating even when some components fail. Redundancy at hardware, software, and datacenter levels.','Fault tolerance means no single point of failure. Azure builds redundancy at every layer.'],
  ['🌐','Reliability','Consistent, predictable performance. Azure infrastructure designed for 99.9%+ uptime on most services.','Reliability = consistent performance over time. Backed by SLAs and region pairs.'],
  ['📊','Manageability','Multiple ways to manage: Portal (GUI), CLI, PowerShell, REST API, ARM Templates. Automation-first approach.','Management tools: Azure Portal (GUI), CLI, PowerShell, ARM, Bicep. All go through Azure Resource Manager.'],
  ['⚖️','Governance','Control what can and cannot be deployed using Azure Policy. Enforce tags, allowed regions, allowed VM sizes.','Governance = policy enforcement. Azure Policy can Deny, Audit, or auto-remediate non-compliant resources.']
].map(([icon,name,desc,tip])=>`<div class="flip-card" style="height:185px" onclick="this.classList.toggle('flipped')"><div class="flip-card-inner"><div class="flip-card-front"><div class="fc-icon">${icon}</div><div class="fc-title">${name}</div><div class="fc-sub">Tap to flip</div></div><div class="flip-card-back"><div class="fc-back-text">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div></div></div>`).join('')}
</div>` },

        { id:'service-models', title:'IaaS / PaaS / SaaS & Shared Responsibility', icon:'🏗️',
          render: () => `
<div class="section-desc">The three cloud service models define who manages what. More control = more responsibility. The shared responsibility model is heavily tested on AZ-900.</div>
<div class="tabs" id="svcmodel-tabs">
  <button class="tab active" onclick="switchTabInner('svcmodel','comparison')">Comparison</button>
  <button class="tab" onclick="switchTabInner('svcmodel','responsibility')">Shared Responsibility</button>
  <button class="tab" onclick="switchTabInner('svcmodel','economics')">CapEx vs OpEx</button>
</div>
<div id="svcmodel-comparison" class="tab-panel active">
  <div class="grid g3" style="margin-bottom:16px">
    ${[
      ['IaaS','#f97316','🏭','Infrastructure as a Service','You rent VMs, storage, networking. You manage everything above the hypervisor: OS, middleware, runtime, applications, data.','Azure VMs, Azure Disk Storage, Virtual Networks','Maximum control, maximum responsibility. Use when you need full OS control or have legacy software.'],
      ['PaaS','#22c55e','⚙️','Platform as a Service','Focus on your code and data. Azure manages the OS, runtime, middleware, and infrastructure. Just deploy your app.','App Service, Azure SQL Database, Azure Functions','Best balance of control vs productivity. Use for web apps, APIs, databases, and developer tooling.'],
      ['SaaS','#0078d4','💻','Software as a Service','Everything managed by the provider. Access via browser. No infrastructure, no OS, no app management.','Microsoft 365, Dynamics 365, GitHub, Salesforce','Maximum convenience, minimum control. Use for productivity apps where customization isn\'t needed.']
    ].map(([abbr,c,icon,name,desc,ex,tip])=>`<div class="svc-card" style="border-color:${c}30"><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><div class="svc-icon" style="background:${c}20;font-size:22px">${icon}</div><div><div style="font-size:20px;font-weight:900;color:${c}">${abbr}</div><div style="font-size:11px;color:var(--text-dim)">${name}</div></div></div><div class="svc-desc">${desc}</div><div style="margin-top:10px;font-size:11px;color:var(--text-muted)"><strong style="color:var(--text-dim)">Examples:</strong> ${ex}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>
<div id="svcmodel-responsibility" class="tab-panel">
  <p style="color:var(--text-dim);font-size:13px;margin-bottom:14px">Green = Microsoft manages. Purple = You manage. Orange = Shared responsibility.</p>
  <table class="cmp-table"><thead><tr><th>Layer</th><th>On-Premises</th><th>IaaS</th><th>PaaS</th><th>SaaS</th></tr></thead><tbody>
    <tr><td>Physical datacenter</td><td style="color:#f87171">You</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Physical network</td><td style="color:#f87171">You</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Physical hosts</td><td style="color:#f87171">You</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Operating System</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#4cffb3">Microsoft</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Network controls</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#ffd700">Shared</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Applications</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#4cffb3">Microsoft</td></tr>
    <tr><td>Identity & Access</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#ffd700">Shared</td><td style="color:#ffd700">Shared</td></tr>
    <tr><td>Data & Content</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td><td style="color:#f87171">You</td></tr>
  </tbody></table>
  <div class="exam-tip" style="margin-top:12px">🎯 YOU always own your DATA in every model. Identity and access is always at least partly your responsibility. Microsoft never manages your data content.</div>
</div>
<div id="svcmodel-economics" class="tab-panel">
  <div class="grid g2" style="margin-bottom:16px">
    <div class="comparison-card comparison-capex" style="border:1px solid rgba(255,149,0,0.3);background:rgba(255,149,0,0.05);padding:20px;border-radius:var(--radius)"><div style="font-size:28px;margin-bottom:10px">🏭</div><h3 style="color:#ff9500;margin-bottom:8px">CapEx — Capital Expenditure</h3><p style="font-size:13px;color:var(--text-dim);line-height:1.6">Upfront spending on physical infrastructure. Tax-deducted over time through depreciation. The traditional IT model.</p><ul style="margin-top:12px;padding-left:16px;font-size:12px;color:var(--text-dim);line-height:2.2"><li>Buy servers, switches, racks, cooling</li><li>High initial investment</li><li>Hard to predict future needs</li><li>You own and maintain hardware</li><li>Underutilized capacity costs money</li></ul><div class="exam-tip">🎯 CapEx = traditional on-premises IT. Fixed cost, upfront, depreciated over time.</div></div>
    <div style="border:1px solid rgba(0,212,255,0.3);background:rgba(0,212,255,0.05);padding:20px;border-radius:var(--radius)"><div style="font-size:28px;margin-bottom:10px">☁️</div><h3 style="color:#00d4ff;margin-bottom:8px">OpEx — Operational Expenditure</h3><p style="font-size:13px;color:var(--text-dim);line-height:1.6">Pay for products/services as you use them. Costs deducted in the same period they are incurred. The cloud model.</p><ul style="margin-top:12px;padding-left:16px;font-size:12px;color:var(--text-dim);line-height:2.2"><li>Pay-as-you-go (Azure billing)</li><li>No upfront hardware cost</li><li>Scale instantly up or down</li><li>Provider manages hardware</li><li>Only pay for what you consume</li></ul><div class="exam-tip">🎯 OpEx = cloud computing model. Azure bills are OpEx. Elastic — pay for peak only when you need it.</div></div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)"><h4 style="color:#50abf1">💡 Consumption-Based Model</h4><p style="font-size:13px;color:var(--text-dim)">Cloud uses a consumption-based model: you pay only for what you use, when you use it. No wasted idle capacity. No over-provisioning for peak load you only hit once a year. This is the fundamental economic advantage of cloud computing.</p></div>
</div>` },

        { id:'cloud-types', title:'Cloud Deployment Models', icon:'🌐',
          render: () => `
<div class="section-desc">There are three cloud deployment models, each with different tradeoffs between control, cost, and flexibility.</div>
<div class="grid g3" style="margin-bottom:20px">
  ${[
    ['🌐','Public Cloud','#0078d4','Infrastructure owned/operated by cloud provider (Azure). Resources shared among multiple tenants (multi-tenant model).','No CapEx. Rapid scaling. Low maintenance. Shared hardware.','Most organizations. SaaS apps. Development and testing. When you don\'t need physical isolation.'],
    ['🏢','Private Cloud','#8b5cf6','Cloud infrastructure dedicated to a single organization. Can be on-premises (your own datacenter) or hosted by a third party.','Full control. High security. Compliance. But: higher cost, limited scalability, you manage hardware.','Government, defense, financial services with strict regulations. Organizations that can\'t share hardware.'],
    ['🔀','Hybrid Cloud','#22c55e','Combines public and private cloud. Sensitive data stays on-premises; other workloads run in Azure. Most flexible.','Best of both worlds. Compliance for sensitive data. Burst to cloud when needed. Complex to manage.','Gradual cloud migration. Compliance requirements. Apps that need both cloud scale and on-prem data proximity.']
  ].map(([icon,name,c,desc,pros,use])=>`<div class="svc-card" style="border-color:${c}30"><div style="font-size:30px;margin-bottom:10px">${icon}</div><h3 style="color:${c};margin-bottom:8px">${name}</h3><p style="font-size:12px;color:var(--text-dim);line-height:1.6;margin-bottom:10px">${desc}</p><div style="font-size:11px;padding:8px;border-radius:6px;background:${c}10;border:1px solid ${c}30;margin-bottom:8px"><strong style="color:${c}">Characteristics:</strong><br><span style="color:var(--text-dim)">${pros}</span></div><div class="exam-tip">🎯 Best for: ${use}</div></div>`).join('')}
</div>
<div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
  <h4 style="color:#14b8a6">Multi-Cloud (Bonus)</h4>
  <p style="font-size:13px;color:var(--text-dim)">Using multiple public cloud providers (e.g., Azure + AWS + GCP) for redundancy, best-of-breed services, or vendor diversity. Azure Arc helps manage multi-cloud and on-premises resources from a single control plane. Increasingly common in enterprise environments.</p>
</div>` }
      ]
    },
    {
      id:'azure-services', name:'Azure Architecture & Services', weight:'35-40%', color:'#50abf1',
      sections: [
        { id:'global-infra', title:'Global Infrastructure', icon:'🗺️',
          render: () => `
<div class="section-desc">Azure's global infrastructure consists of datacenters, availability zones, regions, and region pairs — each providing different levels of resilience.</div>
<div style="display:flex;flex-direction:column;gap:8px;max-width:560px;margin:0 auto 24px">
  ${[
    ['🏭','Datacenter','Physical facility with servers, networking, cooling, power. Multiple per AZ. You never directly manage individual datacenters.','Lowest level. Many per region. You cannot choose which datacenter your resource goes to.'],
    ['⚡','Availability Zone','Physically separate datacenters WITHIN a region. Independent power, cooling, networking. Minimum 3 per AZ-enabled region.','Protects against single datacenter failure. 99.99% SLA for VMs across 2+ AZs.'],
    ['🌎','Region','Geographic area containing 1+ datacenters in a latency perimeter. 60+ Azure regions worldwide. You choose which region to deploy to.','Choose region closest to users for low latency. Not all services in all regions.'],
    ['🔗','Region Pair','Two regions 300+ miles apart. Azure ensures updates only one at a time. Used for geo-redundant replication (GRS).','Protects against regional disaster. Azure ensures one pair region is always updated last during maintenance.'],
    ['🏛️','Geography','Discrete market (often a country/group) containing 2+ regions. Preserves data residency and compliance boundaries.','Examples: Americas, Europe, Asia Pacific, Middle East & Africa. Data stays within geography (GRS).']
  ].map(([icon,name,desc,tip])=>`<div style="display:flex;gap:14px;align-items:flex-start;padding:14px 16px;border-radius:10px;background:rgba(255,255,255,0.03);border:1px solid var(--border)"><span style="font-size:24px;flex-shrink:0">${icon}</span><div><div style="font-weight:700;font-size:13px;color:#50abf1;margin-bottom:4px">${name}</div><div style="font-size:12px;color:var(--text-dim);line-height:1.6;margin-bottom:6px">${desc}</div><div class="exam-tip" style="margin-top:0">🎯 ${tip}</div></div></div>`).join('')}
</div>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)"><h4 style="color:#50abf1">Resource Hierarchy</h4>
    ${['🌳 Root Management Group — one per tenant','🏛️ Management Groups — organize subscriptions','💳 Subscriptions — billing boundary','📦 Resource Groups — lifecycle boundary','⚡ Resources — individual Azure services'].map(s=>`<div style="font-size:12px;color:var(--text-dim);margin:4px 0;padding:6px;border-radius:6px;background:rgba(255,255,255,0.03)">${s}</div>`).join('')}
    <div class="exam-tip">🎯 Policies and RBAC assigned at a higher scope inherit DOWN to all children. Set at the lowest scope needed.</div>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)"><h4 style="color:#a78bfa">Sovereign Regions</h4><p style="font-size:12px;color:var(--text-dim);line-height:1.6">Physically and logically isolated instances of Azure for government/country requirements.</p><ul style="font-size:12px;color:var(--text-dim);padding-left:16px;margin-top:8px;line-height:2"><li><strong>Azure Government</strong> — US government agencies, DoD</li><li><strong>Azure China</strong> — Operated by 21Vianet</li><li><strong>Azure Germany</strong> — Data trustee model</li></ul><div class="exam-tip">🎯 Sovereign regions are NOT connected to global Azure. Separate credentials, portals, and compliance.</div></div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)"><h4 style="color:#22c55e">Availability Set vs Zone</h4><table class="cmp-table" style="margin-top:8px"><thead><tr><th></th><th>Avail. Set</th><th>Avail. Zone</th></tr></thead><tbody><tr><td>Protects</td><td>Rack failure</td><td>Datacenter failure</td></tr><tr><td>SLA (2+ VMs)</td><td>99.95%</td><td>99.99%</td></tr><tr><td>Scope</td><td>1 datacenter</td><td>Separate DCs</td></tr><tr><td>Cost</td><td>Free</td><td>Data transfer</td></tr></tbody></table></div>
</div>` },

        { id:'core-compute', title:'Core Compute Services', icon:'🖥️',
          render: () => `
<div class="section-desc">Azure compute services run your workloads — from raw VMs to fully managed serverless functions. Choosing the right service is a key AZ-900 topic.</div>
<div class="grid g3" style="margin-bottom:16px">
${[
  ['🖥️','Azure Virtual Machines','IaaS','#f97316','Windows or Linux VMs. Full OS control. You manage OS, patches, middleware, apps. IaaS model.','Use when you need: full OS control, custom software, lift-and-shift of on-prem workloads, or legacy applications that won\'t run on PaaS.'],
  ['📈','VM Scale Sets (VMSS)','IaaS','#f97316','Auto-scale group of identical VMs behind a load balancer. Scale up to 1000 VMs. Automatic or manual scaling.','Use for: elastic web front-ends, big compute jobs, container workloads. Identical VMs required.'],
  ['🌐','Azure App Service','PaaS','#22c55e','Fully managed web hosting. Deploy code without managing servers. Supports .NET, Java, Python, Node.js, PHP.','Use when you want to focus on code, not infrastructure. Automatic OS patching, scaling, SSL. 99.95% SLA.'],
  ['⚡','Azure Functions','Serverless','#8b5cf6','Event-driven serverless compute. Pay per execution. Triggers: HTTP, Timer, Queue, Blob, Event Grid. Max 10 min.','Use for: event-driven tasks, webhooks, cron jobs, glue code. No servers to manage. Pay only when code runs.'],
  ['🐳','Azure Container Instances','PaaS','#0078d4','Run Docker containers in seconds without managing VMs or clusters. Single containers, fast, simple.','Use for: simple isolated containers, CI/CD steps, quick tasks. No orchestration features (use AKS for that).'],
  ['☸️','Azure Kubernetes Service','PaaS','#0078d4','Managed Kubernetes cluster. Azure manages the control plane. You manage worker node pools.','Use for: containerized microservices at scale, complex orchestration, stateful apps. Production Kubernetes.'],
  ['🖥️×','Azure Virtual Desktop','SaaS','#50abf1','Windows 10/11 desktop and apps in the cloud. Multi-session Windows. Access from any device.','Use for: remote workers, BYOD, VDI replacement, compliance scenarios where data can\'t leave datacenter.'],
  ['🌱','Azure Spring Apps','PaaS','#22c55e','Fully managed service for Spring Boot Java apps. No app servers to manage, built-in service discovery.','Use for: migrating Java Spring Boot applications to the cloud without major changes.'],
  ['⚙️','Azure Batch','PaaS','#f97316','Large-scale parallel and HPC jobs across hundreds/thousands of VMs. Job scheduling, automatic scaling.','Use for: scientific computing, financial modeling, rendering, video encoding, any embarrassingly parallel workload.']
].map(([icon,name,badge,c,desc,tip])=>`<div class="svc-card"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="svc-icon" style="background:${c}15;font-size:18px">${icon}</div><div><div class="svc-name">${name}</div><div class="svc-badge" style="background:${c}20;color:${c}">${badge}</div></div></div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>` },

        { id:'core-networking', title:'Core Networking Services', icon:'🌐',
          render: () => `
<div class="section-desc">Azure networking connects your resources to each other, to the internet, and to your on-premises environment.</div>
<div class="grid g3" style="margin-bottom:16px">
${[
  ['🔗','Virtual Network (VNet)','Your private network in Azure. Resources in same VNet communicate by default. Isolated from other VNets. You define IP address ranges, subnets, DNS settings.','VNets don\'t communicate with each other by default. Need peering, VPN, or ExpressRoute.'],
  ['🛡️','Network Security Groups','Stateful Layer-4 firewall rules applied to subnets or NICs. Allow/Deny rules with priority (lower = higher priority). Default rules prevent internet-to-subnet traffic.','NSG = virtual firewall for subnets and VMs. Stateful = return traffic automatically allowed.'],
  ['⚖️','Azure Load Balancer','Layer 4 (TCP/UDP) load balancing across multiple VMs within a region. Health probes detect failed VMs. Standard SKU supports AZs.','Load Balancer = regional VM traffic distribution. NOT for web apps (use App Gateway for L7).'],
  ['🌐','Application Gateway','Layer 7 (HTTP/HTTPS) load balancer with Web Application Firewall. Path-based routing, SSL termination, multi-site hosting.','App Gateway = web app traffic. Has WAF. Use instead of Load Balancer for HTTP/HTTPS workloads.'],
  ['🚦','Traffic Manager','DNS-based global load balancer. Route users to nearest/healthiest endpoint. Multiple routing methods.','Traffic Manager = global DNS routing. Works for any protocol. Not a proxy — just DNS redirection.'],
  ['🏎️','Azure Front Door','Global entry point with CDN + WAF + Layer 7 LB. Anycast routing to nearest Azure edge.','Front Door = CDN + global WAF + intelligent routing. Use for global web apps needing low latency worldwide.'],
  ['🚇','VPN Gateway','Encrypted IPsec/IKE tunnel between Azure VNet and on-premises network over the public internet.','VPN = encrypted but over internet. Bandwidth up to 10Gbps. For branch offices, small sites.'],
  ['🛤️','ExpressRoute','Private dedicated circuit connecting on-premises to Azure. Does NOT use public internet. 10-100Gbps.','ExpressRoute = private, not internet. More expensive, more reliable, higher bandwidth, consistent latency.'],
  ['🌐','Azure CDN','Content Delivery Network. Cache static content at edge nodes worldwide. Reduce latency for global users.','CDN = cache static files (images, videos, CSS, JS) close to users. Reduces origin server load.']
].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(34,197,94,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>` },

        { id:'core-storage', title:'Storage & Database Services', icon:'💾',
          render: () => `
<div class="section-desc">Azure storage services cover everything from simple object storage to globally distributed databases. Understanding when to use each is critical for AZ-900.</div>
<div class="tabs" id="storage-tabs">
  <button class="tab active" onclick="switchTabInner('storage','storagesvc')">Storage Services</button>
  <button class="tab" onclick="switchTabInner('storage','databases')">Database Services</button>
</div>
<div id="storage-storagesvc" class="tab-panel active">
  <div class="grid g3">
    ${[
      ['📦','Azure Blob Storage','Unstructured object storage for files, images, videos, backups, logs. Three access tiers: Hot (frequent), Cool (infrequent 30d+), Archive (offline 180d+). Up to 190.7TB per blob.','Blob = Binary Large Object. Most versatile storage. Used for static website hosting, backups, big data.'],
      ['📁','Azure Files','Managed SMB/NFS file shares in the cloud. Mount as a network drive (Z:) on Windows, Linux, macOS. Azure File Sync caches shares on-premises.','Azure Files replaces Windows file servers. Lift-and-shift your shared drives to Azure without changing apps.'],
      ['📬','Azure Queue Storage','Message queuing service. Up to 64KB per message. Millions of messages. Async decoupling of app components. FIFO ordering.','Queue = decouple app components so they scale and fail independently. Like a to-do list for your services.'],
      ['📊','Azure Table Storage','NoSQL key-attribute schemaless store. Cheap and scalable. Good for IoT telemetry, user data, simple lookups.','Table Storage = simple, cheap NoSQL. For complex queries or global distribution, use Cosmos DB instead.'],
      ['💿','Azure Disk Storage','Persistent block storage volumes for Azure VMs. Types: Ultra, Premium SSD, Standard SSD, Standard HDD. Managed disks recommended.','Disk Storage = VM hard drives. Always use Managed Disks (Azure manages the storage account for you).'],
      ['🏞️','Azure Data Lake Storage Gen2','Hierarchical namespace on top of Blob. POSIX ACLs. Optimized for big data analytics workloads (Spark, Databricks).','ADLS Gen2 = Blob with folder hierarchy. Use for big data lakes with Databricks, Synapse, HDInsight.']
    ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(249,115,22,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>
<div id="storage-databases" class="tab-panel">
  <div class="grid g3">
    ${[
      ['🗄️','Azure SQL Database','Fully managed relational PaaS database built on SQL Server. Automatic backups, patching, and scaling. 99.99% SLA.','Azure SQL = managed SQL Server. No OS or SQL patching. For web apps, SaaS, line-of-business apps.'],
      ['🌌','Azure Cosmos DB','Globally distributed, multi-model NoSQL database. 99.999% SLA. 5 consistency levels. Multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table).','Cosmos DB = planet-scale NoSQL. Use when you need: global distribution, sub-10ms latency, flexible consistency.'],
      ['🛢️','Azure Database for MySQL/PostgreSQL','Fully managed open-source relational databases. Automatic backups, HA, scaling. Flexible Server tier.','Use for: migrating existing MySQL/PostgreSQL apps to managed cloud service. No OS management needed.'],
      ['⚡','Azure Cache for Redis','In-memory caching service. Sub-millisecond latency. Reduce database load. Sessions, leaderboards, pub/sub.','Redis Cache = speed layer in front of your database. Dramatically reduces DB calls for frequently accessed data.'],
      ['🏢','Azure SQL Managed Instance','Near-100% SQL Server compatibility. VNet-native. Lift-and-shift for legacy SQL Server apps.','SQL MI = full SQL Server compatibility in cloud. Use for: complex on-prem SQL Server migration.'],
      ['📊','Azure Synapse Analytics','Unified analytics platform: SQL data warehouse + Apache Spark + data integration pipelines.','Synapse = big data + data warehouse in one. Use for: enterprise analytics, BI, large-scale data processing.']
    ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(139,92,246,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>` },

        { id:'ai-iot', title:'AI, IoT & Analytics Services', icon:'🤖',
          render: () => `
<div class="section-desc">Azure provides pre-built AI/ML APIs, IoT connectivity, and big data analytics services — no data science degree required. These are covered in AZ-900 Domain 2.</div>
<div class="tabs" id="aiiot-tabs">
  <button class="tab active" onclick="switchTabInner('aiiot','ai')">AI & Machine Learning</button>
  <button class="tab" onclick="switchTabInner('aiiot','iot')">IoT Services</button>
  <button class="tab" onclick="switchTabInner('aiiot','analytics')">Big Data & Analytics</button>
</div>
<div id="aiiot-ai" class="tab-panel active">
  <div class="grid g3">
    ${[
      ['🧠','Azure Machine Learning','End-to-end platform for building, training, and deploying ML models. AutoML (no code), designer (drag-drop), notebooks (code). MLOps pipeline.','Azure ML = full ML lifecycle. AutoML = let Azure find the best model algorithm for your data automatically.'],
      ['✨','Azure OpenAI Service','Access GPT-4, DALL-E 3, Whisper, Embeddings through Azure. Your data stays in your Azure tenant. Enterprise security and compliance.','Azure OpenAI = OpenAI models with Azure security/compliance. Data NOT used to train Microsoft models.'],
      ['👁️','Azure AI Vision','Analyze images: detect objects, read text (OCR), recognize faces, describe scenes. Used in: document processing, accessibility, security cameras.','AI Vision = image analysis. OCR = Read API. Face API = detect/verify faces. Custom Vision = train your own image classifier.'],
      ['🗣️','Azure AI Speech','Speech-to-text, text-to-speech, real-time translation, speaker recognition. Used in: call centers, accessibility, voice assistants.','Speech = convert audio to text or text to speech. Custom Speech = train on your vocabulary (medical, legal, technical terms).'],
      ['💬','Azure AI Language','Natural language processing: sentiment analysis, key phrase extraction, named entity recognition, translation, conversational language understanding.','Language = understand text. CLU (Conversational Language Understanding) = understand user intent. LUIS is now CLU.'],
      ['🤖','Azure Bot Service','Build and deploy conversational bots. Integrates with Teams, Slack, WhatsApp, web, phone. Power Virtual Agents = no-code bot builder.','Bot Service = chatbot hosting platform. Works with any channel. Power Virtual Agents = low-code bot for business users.']
    ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(236,72,153,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>
<div id="aiiot-iot" class="tab-panel">
  <div class="grid g3">
    ${[
      ['📡','Azure IoT Hub','Central message hub for bidirectional communication between IoT devices and cloud. Handles millions of devices. Device-to-cloud telemetry and cloud-to-device commands.','IoT Hub = the backbone for IoT. Devices register with IoT Hub and send telemetry. You write the processing logic.'],
      ['🏭','Azure IoT Central','SaaS IoT platform. No coding required. Pre-built dashboards, device management, rules engine. Built on IoT Hub but fully managed.','IoT Central = managed IoT platform (SaaS). IoT Hub = PaaS (build your own solution on top). IoT Central = faster, less flexible.'],
      ['🛡️','Azure Sphere','End-to-end IoT security: certified microcontroller (MCU) + secure OS + cloud security service. For high-security IoT devices (medical, industrial).','Azure Sphere = the MOST secure IoT solution. Includes hardware chip, custom Linux OS, and Azure Sphere Security Service.'],
      ['🌊','Azure Stream Analytics','Real-time analytics on streaming data from IoT Hub, Event Hubs, or Blob Storage. SQL-like queries. Low latency insights.','Stream Analytics = real-time query engine for streaming data. Process millions of events per second with simple SQL queries.'],
      ['🗺️','Azure Digital Twins','Create digital models of real-world environments (buildings, factories, cities). Model relationships between spaces, devices, and assets.','Digital Twins = simulate real-world systems in software. Used for: smart buildings, factory optimization, supply chain modeling.'],
      ['📊','Azure Time Series Insights','Analyze, store, and visualize time series data from IoT devices. Optimized for time-ordered data at scale.','Time Series Insights = purpose-built for IoT time-series data analysis. Query historical sensor data quickly.']
    ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(20,184,166,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>
<div id="aiiot-analytics" class="tab-panel">
  <div class="grid g3">
    ${[
      ['⚡','Azure Synapse Analytics','Unified analytics: SQL data warehouse + Spark + pipelines + Power BI. Query petabytes of data. Formerly Azure SQL Data Warehouse.','Synapse = the analytics Swiss Army knife. SQL for structured, Spark for unstructured, pipelines for ETL, all in one service.'],
      ['🔥','Azure Databricks','Apache Spark-based analytics platform. Collaborative notebooks. Delta Lake. ML workflows. Deep Azure integration.','Databricks = the best Spark experience on Azure. For data engineers and data scientists building large-scale ML/data pipelines.'],
      ['🏔️','Azure HDInsight','Managed open-source cluster service: Hadoop, Spark, Kafka, HBase, Storm. Bring your own open-source tools.','HDInsight = managed open-source analytics. Use when you need specific open-source frameworks like Kafka, HBase, or Storm.'],
      ['🏭','Azure Data Factory','Cloud ETL/ELT service. 90+ connectors. Visual pipeline designer. Move data between 90+ sources and destinations.','Data Factory = data movement and transformation. "The data plumber" — connects sources to destinations with transformations.'],
      ['🔍','Azure AI Search','Cloud search-as-a-service. Full-text search, facets, filters, semantic ranking, AI enrichment (extract content from images/PDFs).','AI Search = add powerful search to your app. Formerly Azure Cognitive Search. Indexes your content and makes it searchable.'],
      ['📊','Power BI Embedded','Embed interactive BI reports and dashboards in your applications. Connects to Azure data sources natively.','Power BI = BI visualization tool. Power BI Embedded = add BI dashboards into your own app for your customers.']
    ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(234,179,8,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
  </div>
</div>` }
      ]
    },
    {
      id:'management-governance', name:'Azure Management & Governance', weight:'30-35%', color:'#22c55e',
      sections: [
        { id:'identity-basics', title:'Azure AD & Identity', icon:'👤',
          render: () => `
<div class="section-desc">Azure Active Directory (now Microsoft Entra ID) is the cloud identity platform. Every Azure account uses it. It is NOT the same as Windows Server Active Directory.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure AD vs Windows AD</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Feature</th><th>Azure AD</th><th>Windows AD</th></tr></thead><tbody>
      <tr><td>Protocol</td><td>OAuth 2.0, OIDC, SAML</td><td>LDAP, Kerberos, NTLM</td></tr>
      <tr><td>Management</td><td>REST API, Portal</td><td>Group Policy (GPO)</td></tr>
      <tr><td>Location</td><td>Cloud (Azure)</td><td>On-premises DCs</td></tr>
      <tr><td>Queries</td><td>HTTP requests</td><td>LDAP queries</td></tr>
      <tr><td>Auth</td><td>Modern auth, MFA, Conditional Access</td><td>Kerberos tickets</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Azure AD ≠ Windows AD. Azure AD is cloud-native IAM. There is no "Azure AD Domain Controller" — for that, use Azure AD Domain Services (AADDS).</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">MFA & Authentication Security</h4>
    <p style="font-size:13px;color:var(--text-dim);line-height:1.6;margin-bottom:10px">Multi-Factor Authentication (MFA) requires two or more verification factors to prove identity.</p>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${[['Something you KNOW','Password, PIN'],['Something you HAVE','Authenticator app, SMS, hardware token'],['Something you ARE','Fingerprint, face scan, iris']].map(([f,e])=>`<div style="padding:8px 12px;border-radius:6px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2);font-size:12px"><strong style="color:#22c55e">${f}</strong>: <span style="color:var(--text-dim)">${e}</span></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 MFA = 2 or more factors from different categories. Two passwords = NOT MFA (both same factor: knowledge).</div>
  </div>
</div>
<div class="grid g3">
  ${[
    ['👤','Users','Cloud-only, synced (from on-prem AD via Connect), or guest (B2B external users). Each has a UPN like user@contoso.com.'],
    ['👥','Groups','Security groups (for RBAC) or Microsoft 365 groups. Static or dynamic (auto-based on rules like dept=Finance).'],
    ['🔑','Service Principals','Machine identity for apps. Associated with App Registration. Used when code needs to authenticate to Azure services.'],
    ['🤖','Managed Identities','Auto-managed service principal. Azure handles credentials automatically. No passwords to store or rotate. System-assigned or User-assigned.'],
    ['🏢','Azure AD B2B','Invite external users (partners, contractors) as guests. They use their OWN organization\'s credentials.'],
    ['👶','Azure AD B2C','Customer identity for your apps. Users can sign in with Google, Facebook, or local account. Used for customer-facing apps.']
  ].map(([icon,name,desc])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(0,120,212,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div></div>`).join('')}
</div>` },

        { id:'governance-tools', title:'Governance & Compliance Tools', icon:'⚖️',
          render: () => `
<div class="section-desc">Azure governance tools enforce organizational standards, track compliance, and prevent unauthorized resource usage.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['📜','Azure Policy','Enforce organizational rules. Evaluate compliance and auto-remediate. Effects: Deny (block), Audit (log), Modify (add tags), DeployIfNotExists (auto-deploy related resource).','Policy = ENFORCE what can/cannot be done. RBAC = control WHO can do things. Policy overrides even high-privilege users.'],
    ['🔒','Resource Locks','Prevent accidental changes or deletion. Applied at Subscription, RG, or Resource level. OVERRIDE RBAC — even Owners cannot delete a locked resource.','Two types: CanNotDelete (read+write allowed, no delete) and ReadOnly (no changes at all). Must remove lock before you can delete.'],
    ['🏷️','Resource Tags','Name-value metadata (e.g. Environment=Production, CostCenter=IT). Used for cost tracking, automation, governance. Max 50 tags per resource.','Tags do NOT inherit. A tag on a Resource Group does NOT automatically apply to resources inside it. Use Policy to enforce inheritance.'],
    ['📐','Azure Blueprints','Package RGs + ARM templates + RBAC assignments + Policies into a reusable definition. Deploy consistent governed environments repeatedly.','Blueprints = repeatable governance "starter kit." Deploy entire governed environment in one operation. Track deployment versions.'],
    ['🗺️','Cloud Adoption Framework','Microsoft\'s best-practice guidance for adopting Azure. Phases: Strategy, Plan, Ready, Adopt, Govern, Manage. Not a product — guidance.','CAF = the playbook for how to adopt Azure. Azure Landing Zones = the production-ready environment templates from CAF.'],
    ['💡','Azure Advisor','Personalized best-practice recommendations across 5 pillars: Cost, Security, Reliability, Performance, and Operational Excellence.','Advisor = free recommendations from Azure. Acts like a consultant reviewing your deployment. Check it regularly!']
  ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(34,197,94,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>` },

        { id:'security-tools', title:'Security & Privacy Tools', icon:'🔒',
          render: () => `
<div class="section-desc">Azure provides a comprehensive set of security tools to protect your workloads. Understanding each tool's purpose is key for AZ-900.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['🛡️','Microsoft Defender for Cloud','Unified security management. Secure Score measures your posture (0-100). Provides prioritized recommendations. Protects Azure, on-premises, and multi-cloud.','Defender for Cloud = security dashboard + recommendations + threat protection. Secure Score = how well you\'re doing.'],
    ['🔑','Azure Key Vault','Secure storage for secrets (passwords, API keys), keys (cryptographic), and certificates. Apps retrieve secrets at runtime — no hardcoded credentials.','Never hardcode secrets in code. Always use Key Vault. Managed Identities + Key Vault = zero credentials in code.'],
    ['🔭','Microsoft Sentinel','Cloud-native SIEM and SOAR. Collects logs from everything, detects threats with ML/AI, and automates responses via Logic Apps playbooks.','Sentinel = security operations center in the cloud. SIEM = collects and analyzes. SOAR = automated response.'],
    ['🔥','Azure Firewall','Managed, cloud-native network security. FQDN filtering, threat intelligence, stateful inspection. More advanced than NSGs.','Azure Firewall = managed firewall. NSG = per-subnet/NIC rules. Firewall = centralized protection for entire VNet.'],
    ['🌊','Azure DDoS Protection','Protects against Distributed Denial of Service attacks. Basic = free, automatic. Standard = paid with analytics, SLA, and dedicated response team.','DDoS Basic is always on for free. DDoS Standard = paid, adaptive tuning, attack reports, $3K DDoS SLA credit.'],
    ['🚪','Azure Bastion','Secure browser-based RDP/SSH to VMs — no public IP required on VMs. Protected from port scanning and brute-force attacks.','Bastion = secure admin access without exposing VMs to internet. No public IPs = reduced attack surface.']
  ].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(239,68,68,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>
<div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
  <h4 style="color:#50abf1">Defense in Depth — 7 Layers</h4>
  <div class="grid g4" style="margin-top:10px">
    ${['🏢 Physical — Guards, cameras, locked server rooms','👤 Identity — MFA, Conditional Access, PIM','🌊 Perimeter — DDoS Protection, Azure Firewall','🌐 Network — NSGs, segmentation, deny by default','🖥️ Compute — Patch VMs, JIT access, Bastion','⚙️ Application — WAF, secure coding, Key Vault','💾 Data — Encryption at rest + in transit, access control'].map((s,i)=>`<div style="padding:8px;border-radius:6px;background:rgba(0,120,212,${0.04+i*0.01});border:1px solid rgba(0,120,212,0.15);font-size:11px;color:var(--text-dim)">${s}</div>`).join('')}
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 Defense in Depth = multiple layers of security. If one layer fails, others still protect. No single control is sufficient.</div>
</div>` },

        { id:'cost-tools', title:'Cost Management & SLA', icon:'💰',
          render: () => `
<div class="section-desc">Azure cost management tools help you estimate, monitor, and optimize spending. SLA knowledge is essential for designing reliable systems.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="svc-card"><div class="svc-icon" style="background:rgba(0,120,212,0.15)">🧮</div><div class="svc-name">Azure Pricing Calculator</div><div class="svc-desc">Estimate monthly costs for specific Azure services BEFORE deploying. Configure services exactly as planned and see the estimated bill. Shareable estimates.</div><div class="exam-tip">🎯 Pricing Calculator = estimate FUTURE costs of NEW resources. For monitoring current spend, use Cost Management.</div></div>
  <div class="svc-card"><div class="svc-icon" style="background:rgba(34,197,94,0.15)">📊</div><div class="svc-name">TCO Calculator</div><div class="svc-desc">Compare total cost of ownership: running workloads on-premises vs. in Azure. Generate 3-year savings report for business case presentations to executives.</div><div class="exam-tip">🎯 TCO = on-prem vs Azure comparison. Use to build business case for cloud migration. Shows 3-year savings.</div></div>
  <div class="svc-card"><div class="svc-icon" style="background:rgba(249,115,22,0.15)">💸</div><div class="svc-name">Azure Cost Management + Billing</div><div class="svc-desc">Monitor ACTUAL spending. Set budgets with alerts (alerts when budget % reached). Cost analysis by resource, tag, or subscription. Advisor recommendations for savings.</div><div class="exam-tip">🎯 Cost Management = monitor current/past spending. Budgets ALERT you — they do NOT stop spending automatically.</div></div>
  <div class="svc-card"><div class="svc-icon" style="background:rgba(124,77,255,0.15)">💰</div><div class="svc-name">Cost Savings Options</div><div class="svc-desc"><strong>Reserved Instances:</strong> 1-3yr commit, up to 72% savings. For stable workloads.<br><strong>Spot VMs:</strong> Up to 90% savings, but evictable. For fault-tolerant workloads.<br><strong>Azure Hybrid Benefit:</strong> Bring your Windows Server/SQL Server license to Azure. Up to 40% savings.</div><div class="exam-tip">🎯 Reserved = predictable workloads. Spot = cheap but can be stopped anytime. Hybrid Benefit = use existing on-prem licenses.</div></div>
</div>
<div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
  <h4 style="color:#eab308">SLA & Service Lifecycle</h4>
  <div class="grid g3" style="margin-top:10px">
    <div style="padding:12px;border-radius:8px;background:rgba(255,149,0,0.1);border:1px solid rgba(255,149,0,0.2)"><div style="font-weight:700;color:#ff9500;margin-bottom:4px">🔬 Private Preview</div><div style="font-size:11px;color:var(--text-dim)">Invite-only. No SLA. May change significantly. Not for production.</div></div>
    <div style="padding:12px;border-radius:8px;background:rgba(0,120,212,0.1);border:1px solid rgba(0,120,212,0.2)"><div style="font-weight:700;color:#50abf1;margin-bottom:4px">🌍 Public Preview</div><div style="font-size:11px;color:var(--text-dim)">All customers. No SLA. Usually discounted. Test and give feedback.</div></div>
    <div style="padding:12px;border-radius:8px;background:rgba(76,255,179,0.1);border:1px solid rgba(76,255,179,0.2)"><div style="font-weight:700;color:#4cffb3;margin-bottom:4px">✅ General Availability (GA)</div><div style="font-size:11px;color:var(--text-dim)">Production-ready. Full SLA. Fully supported. Stable.</div></div>
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 Preview services = NO SLA. Do not use for production workloads that require guaranteed uptime. GA = SLA guaranteed.</div>
</div>` },

        { id:'mgmt-tools', title:'Azure Management Tools', icon:'🛠️',
          render: () => `
<div class="section-desc">Azure provides multiple ways to manage resources: GUI, CLI, APIs, and automation tools. All management operations go through Azure Resource Manager (ARM).</div>
<div class="grid g3" style="margin-bottom:16px">
${[
  ['🖥️','Azure Portal','Web-based GUI at portal.azure.com. Create, manage, and monitor all resources. Customizable dashboards. Good for one-off tasks and exploration.','Portal = GUI. Good for learning and one-off tasks. Use CLI/PowerShell for automation and repeatable operations.'],
  ['💻','Azure CLI','Cross-platform command-line tool. Uses az commands (e.g., az vm create). Works on Windows, macOS, Linux. Good for scripts and automation.','CLI = az commands. PowerShell = Az module cmdlets. Both can do the same things — choose your preference.'],
  ['📜','Azure PowerShell','PowerShell module (Az) for managing Azure. Cmdlets like New-AzVM. Preferred by Windows admins. Works in Azure Cloud Shell.','PowerShell preferred for Windows admins. CLI preferred for Linux/macOS admins. Both equally capable.'],
  ['☁️','Azure Cloud Shell','Browser-based shell with CLI and PowerShell pre-installed and authenticated. No local installation. Runs from portal.','Cloud Shell = CLI/PowerShell in your browser. Always authenticated to your account. Has persistent storage ($HOME).'],
  ['📋','ARM Templates','JSON-based declarative templates for deploying Azure resources. Idempotent — run multiple times safely. Infrastructure as Code.','ARM Templates = declare WHAT you want, Azure figures out HOW. Bicep is a cleaner DSL that compiles to ARM JSON.'],
  ['🌍','Azure Arc','Extend Azure management to on-premises, AWS, GCP, and edge. Arc-enabled servers appear in Azure portal alongside Azure VMs.','Azure Arc = manage non-Azure resources from Azure. One control plane for everywhere. Hybrid and multi-cloud management.'],
  ['📊','Azure Monitor','Collects metrics and logs from all Azure resources. Alerts, dashboards, Application Insights, Log Analytics. Unified observability.','Azure Monitor = the observability platform. All monitoring starts here: metrics, logs, alerts, distributed tracing.'],
  ['🏥','Azure Service Health','Personalized dashboard showing Azure service issues, planned maintenance, and health advisories for your specific resources.','Service Health = is Azure having issues affecting YOUR resources? Different from the general Azure status page.'],
  ['🤖','Azure Resource Manager','The deployment and management API behind ALL Azure operations. Portal, CLI, PowerShell, and REST API all use ARM.','ARM = the control plane for Azure. Every management operation goes through ARM. ARM templates describe resources declaratively.']
].map(([icon,name,desc,tip])=>`<div class="svc-card"><div class="svc-icon" style="background:rgba(234,179,8,0.12)">${icon}</div><div class="svc-name">${name}</div><div class="svc-desc">${desc}</div><div class="exam-tip">🎯 ${tip}</div></div>`).join('')}
</div>
<div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
  <h4 style="color:#14b8a6">Trust, Privacy & Compliance</h4>
  <div class="grid g3" style="margin-top:10px">
    ${[['🏛️ Microsoft Trust Center','Central resource for security, privacy, compliance info about Microsoft cloud services. Where to find compliance certifications and audit reports.'],['📊 Compliance Manager','Risk assessment tool. Track progress toward compliance standards: GDPR, ISO 27001, SOC 2, HIPAA, PCI DSS. Compliance score.'],['🔏 Azure Sovereign Regions','Isolated instances for government/country requirements. Azure Government (US), Azure China (21Vianet). Physically separate from global Azure.']].map(([n,d])=>`<div style="padding:12px;border-radius:8px;background:rgba(20,184,166,0.06);border:1px solid rgba(20,184,166,0.2)"><div style="font-size:12px;font-weight:700;color:#14b8a6;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 You own your data in Azure. Microsoft is the processor; you are the controller. Azure has 90+ compliance certifications including ISO 27001, SOC 1/2/3, PCI DSS, HIPAA, GDPR tools, FedRAMP.</div>
</div>` }
      ]
    }
  ],
  quiz: [
    { q:'What does "High Availability" primarily protect against?', a:1, domain:'Cloud Concepts', domainColor:'rgba(0,212,255,0.15)', domainText:'#00d4ff', opts:['Data loss from accidental deletion','Service downtime when individual components fail','High costs during peak usage','Slow network performance'], exp:'High Availability ensures services remain running even when individual hardware components fail. Measured by SLA uptime percentages. Azure achieves HA through redundant hardware, networks, and datacenters.' },
    { q:'In which cloud service model does the customer manage the Operating System?', a:0, domain:'Cloud Concepts', domainColor:'rgba(0,212,255,0.15)', domainText:'#00d4ff', opts:['IaaS (Infrastructure as a Service)','PaaS (Platform as a Service)','SaaS (Software as a Service)','All three models'], exp:'In IaaS, customers manage the OS, middleware, runtime, applications, and data. Microsoft only manages physical hardware and virtualization. PaaS and SaaS have the OS managed by Microsoft.' },
    { q:'What is the key difference between CapEx and OpEx in cloud computing?', a:1, domain:'Cloud Concepts', domainColor:'rgba(0,212,255,0.15)', domainText:'#00d4ff', opts:['CapEx is cheaper overall than OpEx','CapEx is upfront hardware investment; OpEx is pay-as-you-go consumption billing','OpEx requires hardware ownership','CapEx is what Azure uses for its billing'], exp:'CapEx (Capital Expenditure) = upfront spending on physical infrastructure (buy servers, racks). OpEx (Operational Expenditure) = pay-as-you-go consumption (Azure billing). Cloud shifts IT spending from CapEx to OpEx.' },
    { q:'Which cloud model combines on-premises infrastructure with public cloud resources for maximum flexibility?', a:2, domain:'Cloud Concepts', domainColor:'rgba(0,212,255,0.15)', domainText:'#00d4ff', opts:['Public Cloud','Private Cloud','Hybrid Cloud','Community Cloud'], exp:'Hybrid Cloud combines on-premises (private) infrastructure with public cloud. Sensitive data stays on-premises; other workloads burst to Azure. Most flexible, but also most complex to manage.' },
    { q:'What is "Elasticity" in cloud computing?', a:2, domain:'Cloud Concepts', domainColor:'rgba(0,212,255,0.15)', domainText:'#00d4ff', opts:['The ability to recover from a regional disaster','Deploying your app to multiple regions','Automatically scaling resources both up and down based on real-time demand','High uptime guarantee measured by an SLA'], exp:'Elasticity = automatic scaling based on demand. Resources scale OUT when load increases and scale BACK IN when demand drops. Key difference: Scalability = planned capacity increase. Elasticity = automatic dynamic adjustment.' },
    { q:'An Azure Availability Zone protects against which type of failure?', a:1, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['A single server rack hardware failure','A complete physical datacenter failure within a region','An entire Azure region becoming unavailable','A software bug in the OS'], exp:'Availability Zones are physically separate datacenters within an Azure region. Each has independent power, cooling, and networking. Deploying across 2+ AZs protects from a single datacenter failure (99.99% SLA). Region pairs protect from full region failure.' },
    { q:'What is the purpose of Azure Region Pairs?', a:0, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Two regions 300+ miles apart used for geo-redundant replication and staggered maintenance updates','Two VNets connected via VPN Gateway','Two subscriptions in the same billing account','Two resource groups in the same subscription'], exp:'Region pairs are two Azure regions at least 300 miles apart. Azure ensures: only one region in a pair is updated at a time during maintenance, geo-redundant storage (GRS) replicates to the paired region, and region recovery is prioritized for paired regions.' },
    { q:'Resources within the same Resource Group share which characteristic?', a:2, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Must be in the same Azure region','Must share the same Azure AD tenant only','Share the same lifecycle — typically created, managed, and deleted together','Must belong to the same subscription and share the same billing invoice'], exp:'A Resource Group is a lifecycle boundary. Resources inside typically share the same lifecycle — deploy together, manage together, delete together. Deleting a RG deletes ALL resources inside. Resources don\'t need to be in the same region as the RG.' },
    { q:'Which Azure compute service is SERVERLESS and charges only per code execution?', a:3, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Azure Virtual Machines','Azure Kubernetes Service','Azure App Service','Azure Functions'], exp:'Azure Functions is serverless — you only provide the code and a trigger (HTTP, Timer, Queue, etc.). Azure handles all infrastructure. You pay per execution (number of calls + execution time). No servers to manage or patch.' },
    { q:'What is the primary difference between Azure Load Balancer and Azure Application Gateway?', a:0, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Load Balancer is Layer 4 (TCP/UDP) regional; Application Gateway is Layer 7 (HTTP/S) with WAF','They do exactly the same thing','Load Balancer handles web apps; Application Gateway handles VMs','Load Balancer is global; Application Gateway is regional'], exp:'Azure Load Balancer operates at Layer 4 (TCP/UDP) and distributes traffic across VMs within a region. Application Gateway operates at Layer 7 (HTTP/HTTPS) and can do path-based routing, SSL termination, multi-site hosting, and includes WAF.' },
    { q:'Which Azure storage type is best for unstructured data like images, videos, and backup files?', a:0, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Azure Blob Storage','Azure Table Storage','Azure Queue Storage','Azure Files'], exp:'Azure Blob Storage (Binary Large Object) is designed for unstructured data: images, videos, documents, backups, logs. Three access tiers: Hot (frequent access), Cool (30+ days infrequent), Archive (180+ days offline).' },
    { q:'Azure Cosmos DB is best described as which type of database?', a:2, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Managed relational database compatible with SQL Server','Open-source PostgreSQL managed service','Globally distributed NoSQL database with multiple consistency levels and API options','Data warehouse for big data analytics'], exp:'Azure Cosmos DB is a globally distributed, multi-model NoSQL database. It supports multiple APIs (SQL, MongoDB, Cassandra, Gremlin, Table), offers 5 consistency levels from Strong to Eventual, and provides 99.999% availability SLA.' },
    { q:'Which Azure tool provides PERSONALIZED recommendations to optimize Azure deployments for reliability, security, performance, cost, and operational excellence?', a:1, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure Policy','Azure Advisor','Microsoft Defender for Cloud','Azure Service Health'], exp:'Azure Advisor provides personalized best-practice recommendations across 5 pillars: Cost (save money), Security (improve posture), Reliability (increase availability), Performance (improve speed), and Operational Excellence (best practices).' },
    { q:'A Resource Lock is applied to a Resource Group. A junior admin with Contributor access tries to delete a VM inside it. What happens?', a:0, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['The deletion fails — resource locks override RBAC permissions','The deletion succeeds because Contributor role allows deletion','Only the subscription owner can delete locked resources','The lock applies to the RG but not resources inside it'], exp:'Resource locks override RBAC. Even Owners cannot delete a locked resource without first removing the lock. A CanNotDelete lock on an RG protects the RG itself AND all resources inside it. The lock must be explicitly removed first.' },
    { q:'Which Azure cost tool would you use to estimate the 3-year financial savings of migrating on-premises servers to Azure?', a:1, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure Pricing Calculator','TCO (Total Cost of Ownership) Calculator','Azure Cost Management + Billing','Azure Advisor'], exp:'The TCO Calculator compares the cost of running workloads on-premises (including hardware, software, facilities, IT staff) versus running the same workloads in Azure over 3 years. It\'s designed for business case presentations.' },
    { q:'Azure Policy with "Deny" effect does what?', a:2, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Logs non-compliant resources but allows them to be created','Automatically remediates non-compliant resources','Prevents the creation of non-compliant resources before they are deployed','Deletes non-compliant resources that already exist'], exp:'Deny effect blocks the creation of non-compliant resources before deployment. If a policy says "VMs must only be in East US" with Deny effect, trying to create a VM in West Europe will fail immediately.' },
    { q:'What is the purpose of Tags in Azure?', a:1, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['To control which users can access resources','Name-value metadata for cost tracking, automation, and organization of resources','To enforce network security rules','To group resources in a lifecycle boundary'], exp:'Tags are name-value pairs (e.g., Environment=Production, CostCenter=IT) applied to resources. Used for: cost allocation by department, automation scripts (target specific tagged resources), compliance reporting. They don\'t control access — that\'s RBAC.' },
    { q:'Which Azure service stores sensitive information like passwords, API keys, and TLS certificates securely?', a:2, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure Policy','Azure Active Directory','Azure Key Vault','Resource Tags'], exp:'Azure Key Vault securely stores secrets (passwords, API keys, connection strings), cryptographic keys, and certificates. Applications retrieve secrets at runtime — credentials are never hardcoded in code or config files.' },
    { q:'Azure Preview services — are they covered by SLAs?', a:1, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Yes, all Azure services have SLAs regardless of lifecycle stage','No — Preview services (Private and Public) do NOT have SLA guarantees','Only Public Preview has SLAs; Private Preview does not','SLAs apply only to paid services, not free tier'], exp:'Azure Preview services (both Private Preview and Public Preview) have NO SLA. They may change, break, or be discontinued. Do not use Preview services for production workloads where uptime is critical. GA (General Availability) = full SLA.' },
    { q:'The composite SLA for a web app with 99.95% SLA connecting to a database with 99.99% SLA is approximately:', a:2, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['99.99%','99.95%','99.94%','100%'], exp:'Composite SLA = 0.9995 × 0.9999 = 0.999400... ≈ 99.94%. For services running in sequence, multiply the individual SLAs. The composite SLA is always LOWER than any individual SLA in the chain.' },
    { q:'Which management tool allows you to manage both Azure resources AND on-premises/multi-cloud servers from a single Azure control plane?', a:3, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure Resource Manager','Azure Portal','Azure Automation','Azure Arc'], exp:'Azure Arc extends the Azure management plane to resources outside Azure: on-premises servers, Kubernetes clusters on other clouds (AWS, GCP), Azure Stack HCI. All appear in the Azure portal and can be managed with Azure Policy, RBAC, and monitoring.' },
    { q:'Which Azure service shows you current Azure service issues, planned maintenance, and health advisories specific to YOUR Azure resources?', a:1, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Azure Monitor','Azure Service Health','Microsoft Defender for Cloud','Azure Advisor'], exp:'Azure Service Health provides a personalized view of: current service issues affecting your resources, upcoming planned maintenance, health advisories. Different from the global Azure Status page (status.azure.com) which shows global incidents.' },
    { q:'The Azure Pricing Calculator is used for which purpose?', a:0, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Estimating the monthly cost of planned Azure services before deploying them','Monitoring actual current spending on Azure resources','Comparing on-premises costs to Azure costs','Generating cost allocation reports by department'], exp:'The Azure Pricing Calculator (estimate.azure.com) helps you configure Azure services as you plan to use them and get an estimated monthly cost. Use it BEFORE deploying to plan budgets. For current spending: use Cost Management + Billing.' },
    { q:'Which Azure IoT service provides the most comprehensive security for IoT devices, including a certified MCU, secure OS, and cloud security service?', a:2, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Azure IoT Hub','Azure IoT Central','Azure Sphere','Azure Digital Twins'], exp:'Azure Sphere is an end-to-end IoT security solution that includes: a certified microcontroller (MCU) with hardware-based security, a custom Linux OS, and the Azure Sphere Security Service for over-the-air updates and threat monitoring. It\'s the most secure IoT option in Azure.' },
    { q:'What is the difference between Azure IoT Hub and Azure IoT Central?', a:1, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['IoT Hub is cheaper; IoT Central is more expensive','IoT Hub is PaaS (build your own solution); IoT Central is SaaS (pre-built platform, no code required)','IoT Hub is for enterprise; IoT Central is only for small businesses','They are the same service with different pricing tiers'], exp:'IoT Hub = PaaS messaging backbone. You build your own solution on top (processing, storage, dashboards). IoT Central = fully managed SaaS IoT platform with built-in dashboards, device management, rules, and analytics. IoT Central is built on IoT Hub but hides all the complexity.' },
    { q:'Which Azure AI service would you use to add the ability to transcribe customer service calls in real time?', a:1, domain:'Architecture & Services', domainColor:'rgba(80,171,241,0.15)', domainText:'#50abf1', opts:['Azure AI Vision','Azure AI Speech (Speech-to-Text)','Azure AI Language','Azure OpenAI Service'], exp:'Azure AI Speech provides Speech-to-Text (real-time transcription), Text-to-Speech (voice synthesis), and Translation. For customer service call transcription: use the Speech SDK with real-time streaming transcription or the Batch Transcription API for recorded calls.' },
    { q:'Azure Advisor provides recommendations across 5 pillars. Which pillar focuses on identifying unused resources and right-sizing to reduce costs?', a:0, domain:'Management & Governance', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Cost pillar — identifies idle resources, underutilized VMs, reserved instance opportunities','Security pillar','Reliability pillar','Performance Efficiency pillar'], exp:'Azure Advisor\'s Cost pillar identifies: idle VMs (less than 5% CPU for 7+ days), unattached disks, underutilized ExpressRoute circuits, and reserved instance opportunities. It estimates dollar savings for each recommendation. Check Advisor weekly to find waste.' },
  ]
};
