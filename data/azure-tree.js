/* Full Azure Services Hierarchy — Bird's Eye View Data */
window.AZURE_TREE = {
  name: 'Microsoft Azure', icon: '☁️', color: '#0078d4', type: 'root',
  desc: 'The Microsoft cloud platform. 60+ regions, 200+ services, most compliance certifications globally.',
  exams: ['AZ-900','AZ-104','AZ-305','AZ-400','AZ-500','AZ-700'],
  children: [
    {
      name: 'Compute', icon: '🖥️', color: '#3b82f6', cat: 'compute',
      desc: 'Run workloads: VMs, containers, serverless, web apps.',
      children: [
        {
          name: 'Virtual Machines', icon: '🖥️', color: '#3b82f6',
          desc: 'IaaS Windows/Linux VMs. Full OS control. You manage: OS, middleware, runtime, apps.',
          exams: ['AZ-104','AZ-305'],
          tip: 'Know VM size families: B (burstable), D (general), E (memory), F (compute), N (GPU)',
          children: [
            { name: 'General Purpose (B, D, Dv5)', desc: 'Balanced CPU/memory. Ideal for web, dev, small DBs.' },
            { name: 'Compute Optimized (F, Fsv2)', desc: 'High CPU-to-memory. Batch, analytics, gaming servers.' },
            { name: 'Memory Optimized (E, Esv5, M)', desc: 'High memory. In-memory caches, large DBs, analytics.' },
            { name: 'Storage Optimized (L, Lsv3)', desc: 'High disk IOPS & throughput. NoSQL, data warehousing.' },
            { name: 'GPU (NC, ND, NV)', desc: 'ML training/inference, HPC, 3D rendering, visualization.' },
            { name: 'High Performance Compute (H)', desc: 'MPI workloads, molecular dynamics, financial modelling.' },
            { name: 'VM Scale Sets (VMSS)', desc: 'Auto-scale up to 1000 identical VMs behind LB. Stateless apps.' },
            { name: 'Availability Sets', desc: 'Fault Domains (rack) + Update Domains (maintenance). Within 1 datacenter.' },
            { name: 'Azure Spot VMs', desc: 'Use unused capacity. Up to 90% cheaper. Evictable with 30s notice.' },
            { name: 'Reserved Instances', desc: '1 or 3-year commitment. Up to 72% savings vs pay-as-you-go.' },
            { name: 'VM Extensions', desc: 'Custom Script, DSC, Antimalware, Azure Monitor Agent, Diagnostics.' },
            { name: 'Azure Dedicated Hosts', desc: 'Physical server just for your org. Compliance isolation.' },
            { name: 'Proximity Placement Groups', desc: 'Co-locate VMs in same datacenter for ultra-low latency (<1ms).' }
          ]
        },
        {
          name: 'App Service', icon: '🌐', color: '#60a5fa',
          desc: 'PaaS web hosting. Deploy code, not servers. Supports .NET, Java, Python, Node.js, PHP, Ruby.',
          exams: ['AZ-104','AZ-305','AZ-400'],
          tip: 'Deployment Slots = blue/green deployments with traffic splitting and warm-up.',
          children: [
            { name: 'Web Apps', desc: 'HTTP-based web applications. Custom domains, SSL, auto-scale.' },
            { name: 'API Apps', desc: 'RESTful APIs with Swagger/OpenAPI integration.' },
            { name: 'Deployment Slots', desc: 'Staging/production swap. Keep warm before cutover. Traffic splitting.' },
            { name: 'App Service Plans', desc: 'Free, Shared, Basic, Standard, Premium, Isolated (ASE). Defines CPU/RAM/features.' },
            { name: 'App Service Environment (ASE)', desc: 'Fully isolated, dedicated environment inside your VNet. Max scale.' },
            { name: 'WebJobs', desc: 'Background tasks (scheduled or continuous) running alongside your app.' },
            { name: 'Auto-Scale Rules', desc: 'Scale on CPU%, memory, HTTP queue, custom metrics, schedules.' }
          ]
        },
        {
          name: 'Azure Kubernetes Service', icon: '☸️', color: '#2563eb',
          desc: 'Managed Kubernetes. Azure manages the control plane. You manage node pools.',
          exams: ['AZ-104','AZ-305','AZ-400'],
          tip: 'System node pools run core K8s services. User node pools run your workloads.',
          children: [
            { name: 'Node Pools', desc: 'System (kube-system) + user pools. Different VM sizes per pool.' },
            { name: 'Azure CNI', desc: 'Every pod gets VNet IP. Direct routing. More IPs required.' },
            { name: 'Kubenet', desc: 'Pods get 10.x IPs, NATed. Less VNet IPs needed but extra hop.' },
            { name: 'RBAC + Azure AD Integration', desc: 'K8s RBAC mapped to Azure AD users/groups.' },
            { name: 'Cluster Autoscaler', desc: 'Scale nodes based on pending pods. Min/max node count.' },
            { name: 'HPA (Horizontal Pod Autoscaler)', desc: 'Scale pods based on CPU/memory/custom metrics.' },
            { name: 'Azure Monitor for Containers', desc: 'Log Analytics + metrics for AKS observability.' },
            { name: 'Ingress Controllers', desc: 'NGINX, Application Gateway Ingress Controller (AGIC).' }
          ]
        },
        { name: 'Azure Functions', icon: '⚡', color: '#7c3aed', desc: 'Serverless, event-driven compute. Triggers: HTTP, Timer, Queue, Blob, Event Grid. Pay per execution. Max 10min (Flex: unlimited).', exams: ['AZ-104','AZ-305','AZ-400'] },
        { name: 'Azure Container Instances (ACI)', icon: '🐳', color: '#1d4ed8', desc: 'Run containers without managing VMs. No orchestration. Fast startup. Per-second billing.', exams: ['AZ-104'] },
        { name: 'Azure Container Apps', icon: '📦', color: '#4f46e5', desc: 'Serverless containers with built-in KEDA scaling, Dapr, and service mesh. Between Functions and AKS.', exams: ['AZ-305'] },
        { name: 'Azure Batch', icon: '⚙️', color: '#1e40af', desc: 'Large-scale parallel and HPC compute jobs. Pool of VMs, job scheduler, automatic scaling.', exams: ['AZ-305'] },
        { name: 'Azure Virtual Desktop (AVD)', icon: '🖥️', color: '#3b82f6', desc: 'Windows 10/11 multi-session desktop and apps in cloud. BYOD, remote work, compliance scenarios.', exams: ['AZ-104'] },
        { name: 'Azure Spring Apps', icon: '🌱', color: '#22c55e', desc: 'Fully managed Spring Boot/Spring Cloud service. Zero code changes to migrate Spring apps.', exams: [] }
      ]
    },
    {
      name: 'Networking', icon: '🌐', color: '#22c55e', cat: 'network',
      desc: 'Connect, protect, and deliver your applications globally.',
      children: [
        {
          name: 'Core Networking', icon: '🔗', color: '#16a34a',
          children: [
            {
              name: 'Virtual Network (VNet)', desc: 'Your private network in Azure. Isolated by default.',
              exams: ['AZ-104','AZ-700'],
              tip: 'VNets don\'t communicate by default. Peering, VPN, or ExpressRoute needed.',
              children: [
                { name: 'Subnets', desc: 'Divide VNet into segments. NSGs and Route Tables applied at subnet level.' },
                { name: 'Network Security Groups', desc: 'Stateful L4 firewall. Rules: priority, source/dest, port, protocol, allow/deny.' },
                { name: 'Application Security Groups', desc: 'Group VMs logically (e.g. "WebServers") in NSG rules. No IP management.' },
                { name: 'VNet Peering', desc: 'Connect VNets privately. Local (same region) or Global (cross-region). Not transitive.' },
                { name: 'Service Endpoints', desc: 'Route PaaS traffic through VNet backbone. Extends VNet identity to services.' },
                { name: 'Private Endpoints', desc: 'Private IP inside VNet for PaaS (SQL, Storage). Traffic never leaves Azure backbone.' },
                { name: 'User-Defined Routes (UDR)', desc: 'Override default Azure routing. Force traffic through NVA or Firewall.' }
              ]
            },
            { name: 'Azure DNS', desc: 'Host DNS zones in Azure. Reliable, fast, secure. 100% SLA.', exams: ['AZ-104','AZ-700'] },
            { name: 'Azure Private DNS', desc: 'Internal name resolution for private endpoints and VNet resources.', exams: ['AZ-104','AZ-700'] },
            { name: 'Azure Route Server', desc: 'BGP peering between NVAs and Azure. Dynamic route exchange without VPN GW.', exams: ['AZ-700'] }
          ]
        },
        {
          name: 'Load Balancing', icon: '⚖️', color: '#15803d',
          children: [
            { name: 'Azure Load Balancer', desc: 'Layer 4 (TCP/UDP). Regional. Basic (free, limited) vs Standard (paid, zone-redundant). Health probes.', exams: ['AZ-104','AZ-700'], tip: 'Load Balancer = L4 regional VM traffic. App Gateway = L7 web app traffic.' },
            { name: 'Application Gateway', desc: 'Layer 7 (HTTP/S). WAF. Path-based routing. Multi-site hosting. SSL termination. Autoscaling.', exams: ['AZ-104','AZ-700'] },
            { name: 'Azure Traffic Manager', desc: 'DNS-based global load balancer. Routing: Priority, Weighted, Performance, Geographic, Subnet, Multivalue.', exams: ['AZ-104','AZ-700'] },
            { name: 'Azure Front Door', desc: 'Global entry point. CDN + WAF + L7 LB + SSL offload + anycast routing. Standard & Premium tiers.', exams: ['AZ-305','AZ-700'] }
          ]
        },
        {
          name: 'Hybrid Connectivity', icon: '🔀', color: '#166534',
          children: [
            {
              name: 'VPN Gateway', desc: 'IPsec/IKE encrypted tunnel over public internet.',
              exams: ['AZ-104','AZ-700'],
              children: [
                { name: 'Site-to-Site (S2S)', desc: 'Permanent tunnel from on-prem network to Azure VNet.' },
                { name: 'Point-to-Site (P2S)', desc: 'Individual client (laptop) VPN to Azure VNet.' },
                { name: 'VNet-to-VNet', desc: 'Connect two Azure VNets via encrypted tunnel.' },
                { name: 'Active-Active', desc: 'Two GW instances for redundancy and higher throughput.' },
                { name: 'BGP Support', desc: 'Dynamic route propagation. Required for transitive routing.' }
              ]
            },
            {
              name: 'ExpressRoute', desc: 'Private dedicated circuit. Does NOT use public internet. MPLS/Layer 3.',
              exams: ['AZ-104','AZ-305','AZ-700'],
              tip: 'ExpressRoute = private. VPN = encrypted but over internet. ExpressRoute = higher cost, higher reliability.',
              children: [
                { name: 'Private Peering', desc: 'Access Azure VMs/VNets private IPs.' },
                { name: 'Microsoft Peering', desc: 'Access Azure PaaS services (Storage, SQL, etc.) + M365.' },
                { name: 'ExpressRoute Direct', desc: '10Gbps or 100Gbps directly into Microsoft edge routers.' },
                { name: 'Global Reach', desc: 'Connect on-prem sites via ExpressRoute through Microsoft backbone.' },
                { name: 'FastPath', desc: 'Bypass GW for data plane. Better performance for high-throughput.' }
              ]
            },
            { name: 'Azure Virtual WAN', desc: 'Managed any-to-any networking. Standard: full mesh (site↔site, VNet, ExpressRoute). Basic: site-to-site only.', exams: ['AZ-700'] }
          ]
        },
        {
          name: 'Network Security', icon: '🔒', color: '#14532d',
          children: [
            { name: 'Azure Firewall', desc: 'Managed stateful firewall. FQDN filtering, threat intelligence, DNAT. Standard + Premium (IDPS, TLS inspection).', exams: ['AZ-500','AZ-700'] },
            { name: 'Azure DDoS Protection', desc: 'Basic: free, automatic. Standard: attack analytics, mitigation reports, SLA guarantee.', exams: ['AZ-900','AZ-500','AZ-700'] },
            { name: 'Azure Bastion', desc: 'Secure browser RDP/SSH to VMs. No public IP on VMs. Basic vs Standard tiers.', exams: ['AZ-104','AZ-500','AZ-700'] },
            { name: 'Web Application Firewall (WAF)', desc: 'L7 HTTP protection. OWASP CRS. Detection/Prevention mode. Used on App Gateway, Front Door, CDN.', exams: ['AZ-500','AZ-700'] },
            { name: 'Azure Private Link Service', desc: 'Expose your own service via Private Link. Behind Standard LB. Multiple consumer connections.', exams: ['AZ-700'] }
          ]
        }
      ]
    },
    {
      name: 'Storage', icon: '💾', color: '#f97316', cat: 'storage',
      desc: 'Durable, scalable, secure cloud storage for all data types.',
      children: [
        {
          name: 'Azure Blob Storage', icon: '📦', color: '#f97316',
          desc: 'Massively scalable object storage for unstructured data.',
          exams: ['AZ-900','AZ-104','AZ-305'],
          tip: 'Hot=frequent, Cool=infrequent(30d), Cold=rare(90d), Archive=offline(180d). Rehydrate from Archive: hrs-15hrs.',
          children: [
            { name: 'Block Blobs', desc: 'Files, images, videos. Up to 190.7TB per blob.' },
            { name: 'Append Blobs', desc: 'Optimized for append operations. Logging, auditing.' },
            { name: 'Page Blobs', desc: 'Random access 512-byte pages. Used for VM disks.' },
            { name: 'Hot Tier', desc: 'Frequent access. Higher storage cost, lower access cost.' },
            { name: 'Cool Tier', desc: 'Infrequent. 30-day minimum. Lower storage, higher access cost.' },
            { name: 'Cold Tier', desc: 'Rare access. 90-day minimum. Even lower storage cost.' },
            { name: 'Archive Tier', desc: 'Offline. 180-day minimum. Cheapest storage, highest retrieval cost/time.' },
            { name: 'Lifecycle Management', desc: 'Auto-move blobs between tiers or delete based on age rules.' },
            { name: 'Immutable Blobs', desc: 'WORM (Write Once Read Many). Legal hold, time-based retention.' }
          ]
        },
        {
          name: 'Storage Account Types & Replication', icon: '🔄', color: '#ea580c',
          desc: 'Replication determines durability and availability.',
          exams: ['AZ-104'],
          children: [
            { name: 'LRS (Locally Redundant)', desc: '3 copies within 1 datacenter. Cheapest. No zone/region protection.' },
            { name: 'ZRS (Zone Redundant)', desc: '3 copies across 3 zones in 1 region. Zone-level protection.' },
            { name: 'GRS (Geo Redundant)', desc: 'LRS primary + async LRS secondary in paired region. 99.99999999999999% durability.' },
            { name: 'GZRS (Geo-Zone Redundant)', desc: 'ZRS primary + LRS secondary. Best availability.' },
            { name: 'RA-GRS', desc: 'GRS + read access to secondary. 99.99% read availability.' },
            { name: 'RA-GZRS', desc: 'GZRS + read access to secondary. Highest redundancy + read access.' }
          ]
        },
        { name: 'Azure Files', icon: '📁', color: '#c2410c', desc: 'Fully managed SMB (2.x/3.x) and NFS (4.1) file shares. Mount on Windows, Linux, macOS. Azure File Sync for on-prem caching.', exams: ['AZ-104'] },
        { name: 'Azure Queue Storage', icon: '📬', color: '#9a3412', desc: 'Message queuing. Up to 64KB per message. Millions of messages. Async decoupling of app components.', exams: ['AZ-104'] },
        { name: 'Azure Table Storage', icon: '📊', color: '#7c2d12', desc: 'NoSQL key-attribute store. Schemaless. Cheap. For IoT telemetry, logs, simple lookup tables.', exams: ['AZ-104'] },
        {
          name: 'Azure Disk Storage', icon: '💿', color: '#f97316',
          desc: 'Block storage volumes for Azure VMs.',
          exams: ['AZ-104'],
          children: [
            { name: 'Ultra Disk', desc: 'Sub-millisecond latency. Configurable IOPS. SAP HANA, top-tier SQL.' },
            { name: 'Premium SSD v2', desc: 'High performance, flexible IOPS/throughput adjustment without downtime.' },
            { name: 'Premium SSD', desc: 'Consistent high perf. Production, mission-critical workloads.' },
            { name: 'Standard SSD', desc: 'Consistent perf. Web servers, low-traffic apps.' },
            { name: 'Standard HDD', desc: 'Budget. Dev/test, non-critical backups.' }
          ]
        },
        { name: 'Azure Data Lake Storage Gen2', icon: '🏞️', color: '#b45309', desc: 'Hierarchical namespace on top of Blob. POSIX ACLs. Optimized for big data analytics with Spark, Databricks.', exams: ['AZ-305'] },
        { name: 'Azure NetApp Files', icon: '🗄️', color: '#92400e', desc: 'Enterprise-grade NAS service. NFS/SMB. Ultra-low latency. For SAP, HPC, VDI workloads.', exams: [] },
        { name: 'Azure Storage Access', icon: '🔑', color: '#78350f', desc: 'Access methods: Storage Account Keys, SAS Tokens (Account/Service/User-Delegation), Azure AD RBAC, ACLs.', exams: ['AZ-104','AZ-500'] }
      ]
    },
    {
      name: 'Databases', icon: '🗄️', color: '#8b5cf6', cat: 'db',
      desc: 'Managed relational, NoSQL, caching, and analytics database services.',
      children: [
        {
          name: 'Relational', icon: '📋', color: '#7c3aed',
          children: [
            {
              name: 'Azure SQL Database', desc: 'Fully managed SQL Server PaaS. Intelligent performance, auto-backups.',
              exams: ['AZ-900','AZ-104','AZ-305'],
              tip: 'Hyperscale = up to 100TB. Business Critical = highest performance + built-in HA.',
              children: [
                { name: 'Basic / Standard / Premium (DTU)', desc: 'Bundled compute+storage. Simple workloads.' },
                { name: 'General Purpose (vCore)', desc: 'Most workloads. Gen5 hardware.' },
                { name: 'Business Critical (vCore)', desc: 'Highest I/O, built-in 3-replica HA.' },
                { name: 'Hyperscale (vCore)', desc: 'Up to 100TB. Distributed storage. Fast scale-out reads.' },
                { name: 'Elastic Pools', desc: 'Shared resources for multiple DBs. Burst sharing.' }
              ]
            },
            { name: 'Azure SQL Managed Instance', desc: 'Near-100% SQL Server compat. VNet-native. Lift-and-shift for legacy SQL.', exams: ['AZ-104','AZ-305'] },
            { name: 'SQL on Azure VM', desc: 'Full SQL Server in a VM. Max compat + control. You manage everything.', exams: ['AZ-104','AZ-305'] },
            { name: 'Azure Database for MySQL', desc: 'Managed MySQL Community. Flexible Server (recommended). VNET integration.', exams: ['AZ-104'] },
            { name: 'Azure Database for PostgreSQL', desc: 'Managed PostgreSQL. Flexible Server. High availability with standby.', exams: ['AZ-104'] },
            { name: 'Azure Database for MariaDB', desc: 'Managed MariaDB. Being retired 2025 — migrate to MySQL Flexible Server.', exams: [] }
          ]
        },
        {
          name: 'NoSQL', icon: '📊', color: '#6d28d9',
          children: [
            {
              name: 'Azure Cosmos DB', desc: 'Globally distributed, multi-model, multi-master. 99.999% SLA.',
              exams: ['AZ-900','AZ-104','AZ-305'],
              tip: 'Consistency levels (strong→eventual): Strong, Bounded Staleness, Session, Consistent Prefix, Eventual.',
              children: [
                { name: 'NoSQL API (SQL)', desc: 'Native JSON, SQL queries. Best performance.' },
                { name: 'MongoDB API', desc: 'Drop-in for MongoDB apps.' },
                { name: 'Cassandra API', desc: 'Apache Cassandra compatible. Wide-column store.' },
                { name: 'Gremlin API', desc: 'Graph database. Vertices and edges.' },
                { name: 'Table API', desc: 'Azure Table Storage compatible with global distribution.' }
              ]
            },
            { name: 'Azure Cache for Redis', desc: 'In-memory caching. Reduce DB latency. Sessions, leaderboards, pub/sub. Basic/Standard/Premium tiers.', exams: ['AZ-104','AZ-305'] }
          ]
        },
        {
          name: 'Analytics', icon: '📈', color: '#5b21b6',
          children: [
            { name: 'Azure Synapse Analytics', desc: 'Unified analytics: SQL pools + Spark + Data Explorer + pipelines. Formerly SQL Data Warehouse.', exams: ['AZ-305'] },
            { name: 'Azure Databricks', desc: 'Collaborative Apache Spark platform. Delta Lake. ML workflows. Tight Azure integration.', exams: ['AZ-305'] },
            { name: 'Azure HDInsight', desc: 'Managed open-source clusters: Hadoop, Spark, Kafka, HBase, Storm, Hive.', exams: [] },
            { name: 'Azure Stream Analytics', desc: 'Real-time SQL queries on streaming data from Event Hubs, IoT Hub.', exams: [] },
            { name: 'Azure Analysis Services', desc: 'Tabular OLAP engine. Semantic models for Power BI.', exams: [] }
          ]
        }
      ]
    },
    {
      name: 'Identity & Security', icon: '🔒', color: '#ef4444', cat: 'security',
      desc: 'Protect identities, data, and infrastructure across your environment.',
      children: [
        {
          name: 'Azure Active Directory (Entra ID)', icon: '👤', color: '#dc2626',
          desc: 'Cloud-native IAM. Every Azure account uses Azure AD. Not the same as Windows AD (no LDAP/Kerberos).',
          exams: ['AZ-900','AZ-104','AZ-305','AZ-500'],
          children: [
            { name: 'Users & Groups', desc: 'Cloud-only, synced, or guest users. Static & dynamic (rule-based) groups.' },
            { name: 'Enterprise Applications', desc: 'SSO for SaaS apps (Salesforce, G Suite, etc.) via SAML/OIDC.' },
            { name: 'App Registrations', desc: 'Register apps for OAuth2/OIDC. Client ID, client secret, redirect URIs.' },
            { name: 'Service Principals', desc: 'Machine identity for apps/services. Associated with app registration.' },
            { name: 'Managed Identities', desc: 'Auto-managed service principal. No credentials to manage. System-assigned or user-assigned.' },
            { name: 'B2B Collaboration', desc: 'Invite external users as guests. They use their own organization\'s credentials.' },
            { name: 'Azure AD B2C', desc: 'Customer-facing identity. Social logins (Google, Facebook). Your own brand.' },
            { name: 'Azure AD DS', desc: 'Managed Domain Services. LDAP, Kerberos, NTLM for legacy apps. No DCs to manage.' },
            { name: 'Azure AD Connect', desc: 'Sync on-prem AD to Azure AD. Password Hash Sync / Pass-Through Auth / Federation.' }
          ]
        },
        {
          name: 'Authentication Controls', icon: '🔐', color: '#b91c1c',
          children: [
            { name: 'MFA', desc: 'Require 2nd factor: Authenticator app, SMS, OATH token, phone call.', exams: ['AZ-500'] },
            { name: 'Conditional Access', desc: 'IF (user, location, device, app, risk) THEN (allow, block, require MFA, compliant device).', exams: ['AZ-104','AZ-500'] },
            { name: 'Identity Protection', desc: 'Risk-based policies. Sign-in risk (anonymous IP, atypical travel) + user risk (leaked credentials).', exams: ['AZ-500'] },
            { name: 'Privileged Identity Management (PIM)', desc: 'JIT privileged access. Eligible vs Active roles. Approval workflows. Access reviews.', exams: ['AZ-500'] },
            { name: 'RBAC', desc: 'Owner > Contributor > Reader. Scope: MgmtGroup > Subscription > RG > Resource. Least privilege.', exams: ['AZ-104','AZ-500'] }
          ]
        },
        {
          name: 'Security Services', icon: '🛡️', color: '#991b1b',
          children: [
            { name: 'Microsoft Defender for Cloud', desc: 'CSPM (posture) + CWPP (workload protection). Secure Score. Recommendations. Multi-cloud (AWS, GCP too).', exams: ['AZ-500'] },
            { name: 'Microsoft Sentinel', desc: 'Cloud-native SIEM + SOAR. Data connectors, analytics rules (ML, fusion), playbooks (Logic Apps), hunting.', exams: ['AZ-500'] },
            { name: 'Azure Key Vault', desc: 'Store secrets, keys, certificates. Soft delete + purge protection. Access via RBAC or access policies.', exams: ['AZ-104','AZ-400','AZ-500'] },
            { name: 'Microsoft Purview', desc: 'Data governance, catalog, compliance. Formerly Azure Purview. Replaces AIP for information protection.', exams: ['AZ-500'] },
            { name: 'Azure Information Protection', desc: 'Classify and protect documents/emails with labels (Public, Confidential). Encryption follows the data.', exams: ['AZ-500'] }
          ]
        }
      ]
    },
    {
      name: 'Monitoring & Governance', icon: '📊', color: '#eab308', cat: 'monitor',
      desc: 'Observe, alert, manage, and govern Azure resources at scale.',
      children: [
        {
          name: 'Azure Monitor', icon: '📡', color: '#ca8a04',
          desc: 'Unified monitoring platform. Collect, analyze, act on telemetry.',
          exams: ['AZ-104','AZ-305','AZ-400'],
          children: [
            { name: 'Metrics', desc: 'Numeric time-series. 93 days native retention. Near-real-time. Source: Azure resources.' },
            { name: 'Logs (Log Analytics)', desc: 'Structured log data. Query with KQL. 30-730 days retention. Multiple workspaces.' },
            { name: 'Alerts', desc: 'Metric alerts, log search alerts (KQL), activity log alerts, smart detection.' },
            { name: 'Action Groups', desc: 'What to do when alert fires: email, SMS, webhook, Azure Function, Logic App, ITSM.' },
            { name: 'Workbooks', desc: 'Interactive dashboards combining metrics, logs, and text. Parameterized reports.' },
            { name: 'Application Insights', desc: 'APM for web apps. Request rates, response times, dependencies, exceptions, availability tests.' },
            { name: 'Diagnostic Settings', desc: 'Export resource logs/metrics to Log Analytics, Storage, Event Hubs.' },
            { name: 'Network Watcher', desc: 'Connection monitor, IP flow verify, next hop, packet capture, NSG flow logs, topology.' }
          ]
        },
        {
          name: 'Governance', icon: '⚖️', color: '#a16207',
          children: [
            { name: 'Azure Policy', desc: 'Enforce rules. Effects: Deny, Audit, Modify, Append, DeployIfNotExists, AuditIfNotExists. Policy initiatives.', exams: ['AZ-104','AZ-305'] },
            { name: 'Azure Blueprints', desc: 'Package: RGs + ARM templates + RBAC + Policies. Repeatable governed environments.', exams: ['AZ-104','AZ-305'] },
            { name: 'Management Groups', desc: 'Container for subscriptions. Up to 6 levels. Policy and RBAC applies to all children.', exams: ['AZ-900','AZ-104','AZ-305'] },
            { name: 'Resource Locks', desc: 'CanNotDelete or ReadOnly. Override RBAC. Must be removed before deletion even by Owner.', exams: ['AZ-104'] },
            { name: 'Resource Tags', desc: 'Name-value metadata. Cost allocation, automation, governance. Not inherited by default.', exams: ['AZ-104'] },
            { name: 'Azure Cost Management + Billing', desc: 'Monitor spend, budgets, alerts, cost analysis, reservations, advisor recommendations.', exams: ['AZ-104','AZ-305'] },
            { name: 'Azure Advisor', desc: '5 pillars: Cost, Security, Reliability, Performance, Operational Excellence. 90-day data.', exams: ['AZ-104'] }
          ]
        },
        { name: 'Azure Service Health', desc: 'Personalized dashboard: Azure status, service issues, planned maintenance, health advisories.', exams: ['AZ-104'] },
        { name: 'Azure Resource Manager (ARM)', desc: 'Deployment and management layer. All operations go through ARM. ARM Templates = declarative IaC.', exams: ['AZ-104','AZ-305','AZ-400'] },
        { name: 'Azure Arc', desc: 'Extend Azure management to on-premises, other clouds, edge. Arc-enabled servers, K8s, SQL.', exams: ['AZ-104','AZ-305'] },
        { name: 'Azure Automation', desc: 'Runbooks (PowerShell, Python), DSC, Update Management, Change Tracking, Inventory.', exams: ['AZ-104'] },
        { name: 'Azure Update Manager', desc: 'Assess and deploy OS updates to Azure and Arc VMs. Replaces Update Management in Automation.', exams: ['AZ-104'] },
        { name: 'Azure Lighthouse', desc: 'Multi-tenant management. MSPs manage customer subscriptions from their own tenant.', exams: [] }
      ]
    },
    {
      name: 'DevOps & Integration', icon: '⚙️', color: '#14b8a6', cat: 'devops',
      desc: 'Build, test, deploy, and integrate applications and workflows.',
      children: [
        {
          name: 'Azure DevOps', icon: '🚀', color: '#0d9488',
          desc: 'End-to-end DevOps toolchain. Plan, code, build, test, release, operate.',
          exams: ['AZ-400'],
          children: [
            { name: 'Azure Boards', desc: 'Agile work tracking. Epics, Features, Stories, Tasks. Scrum/Kanban/CMMI.' },
            { name: 'Azure Repos', desc: 'Git repositories. Branch policies, PRs, code reviews, required reviewers.' },
            { name: 'Azure Pipelines', desc: 'CI/CD. YAML (multi-stage) or Classic. Triggers, stages, jobs, steps, agents.' },
            { name: 'Azure Test Plans', desc: 'Manual and automated test management. Test cases, runs, results.' },
            { name: 'Azure Artifacts', desc: 'Package feeds: NuGet, npm, Maven, Python, Universal. Upstream sources.' }
          ]
        },
        {
          name: 'Integration Services', icon: '🔗', color: '#0f766e',
          children: [
            { name: 'Azure Service Bus', desc: 'Enterprise messaging. Queues (FIFO, sessions) + Topics/Subscriptions (pub/sub). Dead-letter queue. At-most/at-least once.', exams: ['AZ-204'] },
            { name: 'Azure Event Grid', desc: 'Event routing. Publisher → Event Grid → Subscriber. Serverless. Retry with exponential backoff.', exams: ['AZ-204'] },
            { name: 'Azure Event Hubs', desc: 'Big data streaming. Kafka-compatible. Partitions, consumer groups. Up to 1M events/sec.', exams: [] },
            { name: 'Azure Logic Apps', desc: 'Low-code workflow automation. 400+ connectors. Consumption (serverless) or Standard (dedicated).', exams: ['AZ-500'] },
            { name: 'Azure API Management (APIM)', desc: 'API gateway + developer portal + analytics. Policies: auth, rate limiting, caching, transformation.', exams: ['AZ-305'] },
            { name: 'Azure Data Factory', desc: 'ETL/ELT pipelines. 90+ connectors. Data flows, mapping, wrangling. Copy activity.', exams: ['AZ-305'] }
          ]
        },
        { name: 'Azure Container Registry (ACR)', desc: 'Private Docker registry. Geo-replication. Tasks (CI build, base image update). Content trust.', exams: ['AZ-104','AZ-400'] },
        { name: 'GitHub Actions (Azure)', desc: 'CI/CD with GitHub. azure/login, azure/webapps-deploy actions. OIDC federation for keyless auth.', exams: ['AZ-400'] },
        { name: 'Azure App Configuration', desc: 'Centralized config store. Feature flags. Dynamic config refresh. Azure AD integration.', exams: ['AZ-400'] },
        { name: 'Azure Chaos Studio', desc: 'Chaos engineering. Inject faults (network latency, CPU stress, region outage) to test resilience.', exams: ['AZ-400'] }
      ]
    },
    {
      name: 'AI & Analytics', icon: '🤖', color: '#ec4899', cat: 'ai',
      desc: 'Add intelligence to applications with pre-built and custom AI/ML services.',
      children: [
        { name: 'Azure Machine Learning', icon: '🧠', color: '#db2777', desc: 'End-to-end ML platform. Automated ML, designer, notebooks, MLflow, pipelines, endpoints.', exams: [] },
        { name: 'Azure OpenAI Service', icon: '✨', color: '#be185d', desc: 'Access to GPT-4, DALL-E 3, Whisper, Embeddings via Azure. Data stays in your tenant. Content filtering.', exams: [] },
        {
          name: 'Azure AI Services (Cognitive Services)', icon: '🎯', color: '#9d174d',
          desc: 'Pre-built AI APIs. No ML expertise required.',
          children: [
            { name: 'Vision', desc: 'Image Analysis, OCR, Custom Vision, Face API, Spatial Analysis.' },
            { name: 'Speech', desc: 'Speech-to-Text, Text-to-Speech, Speaker Recognition, Translation.' },
            { name: 'Language', desc: 'Text Analytics, CLU, QnA Maker, Translator, Language Understanding.' },
            { name: 'Decision', desc: 'Anomaly Detector, Content Moderator, Personalizer.' }
          ]
        },
        { name: 'Azure AI Search', icon: '🔍', color: '#831843', desc: 'Cloud search-as-a-service. Full-text search, facets, filters, semantic ranking, AI enrichment pipeline.', exams: [] },
        { name: 'Azure Bot Service', icon: '🤖', color: '#701a75', desc: 'Build and host conversational bots. Integrates with Teams, Slack, web, etc.', exams: [] }
      ]
    },
    {
      name: 'Migration & DR', icon: '🚚', color: '#84cc16', cat: 'migrate',
      desc: 'Move workloads to Azure and implement disaster recovery strategies.',
      children: [
        { name: 'Azure Migrate', desc: 'Assess and migrate servers, VMs, web apps, SQL, SAP. Discovery, dependency analysis, sizing.', exams: ['AZ-305'] },
        { name: 'Azure Database Migration Service', desc: 'Migrate SQL Server, MySQL, PostgreSQL to Azure. Online (minimal downtime) and offline modes.', exams: ['AZ-305'] },
        { name: 'Azure Site Recovery (ASR)', desc: 'VM replication for DR. RPO minutes, RTO hours. Failover and failback. Azure-to-Azure, on-prem to Azure.', exams: ['AZ-104','AZ-305'] },
        { name: 'Azure Backup', desc: 'Recovery Services Vault. VM, SQL, SAP HANA, Files, Blobs. Soft delete (14-day protection). RBAC.', exams: ['AZ-104'] },
        { name: 'Azure Databox', desc: 'Physical device for large data transfer (orders of magnitude cheaper than internet for 10TB+).', exams: ['AZ-900'] },
        { name: 'Azure Import/Export', desc: 'Ship drives to/from Azure datacenter. Upload blobs, download blobs.', exams: ['AZ-104'] },
        { name: 'The 6 Rs of Migration', desc: 'Rehost (lift&shift), Refactor, Rearchitect, Rebuild, Replace (SaaS), Retire. AZ-305 framework.', exams: ['AZ-305'] }
      ]
    }
  ]
};

/* Legend config for map */
window.MAP_LEGEND = [
  { cat: 'compute', label: 'Compute', color: '#3b82f6' },
  { cat: 'network', label: 'Networking', color: '#22c55e' },
  { cat: 'storage', label: 'Storage', color: '#f97316' },
  { cat: 'db', label: 'Databases', color: '#8b5cf6' },
  { cat: 'security', label: 'Identity & Security', color: '#ef4444' },
  { cat: 'monitor', label: 'Monitoring & Governance', color: '#eab308' },
  { cat: 'devops', label: 'DevOps & Integration', color: '#14b8a6' },
  { cat: 'ai', label: 'AI & Analytics', color: '#ec4899' },
  { cat: 'migrate', label: 'Migration & DR', color: '#84cc16' }
];
