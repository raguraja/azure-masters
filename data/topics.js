/* Learning path ordered by complexity — Beginner → Expert */
window.LEARNING_PATH = [

  // ── BEGINNER ────────────────────────────────────────────────────────────────
  { title:'Cloud Computing Basics',        icon:'🌱', color:'#22c55e', level:'Beginner',
    desc:'Cloud models (IaaS/PaaS/SaaS), shared responsibility, benefits and why cloud matters.',
    exam:'az900', domain:'cloud-concepts' },

  { title:'Azure Core Architecture',       icon:'☁️', color:'#0078d4', level:'Beginner',
    desc:'Regions, availability zones, subscriptions, resource groups and core Azure services.',
    exam:'az900', domain:'azure-services' },

  { title:'Azure Management & Governance', icon:'⚙️', color:'#0095f7', level:'Beginner',
    desc:'Azure portal, CLI, ARM templates, policies, resource locks and cost management.',
    exam:'az900', domain:'management-governance' },

  // ── INTERMEDIATE ────────────────────────────────────────────────────────────
  { title:'Identity & Access Management',  icon:'👤', color:'#f97316', level:'Intermediate',
    desc:'Azure AD, users, groups, RBAC, MFA, conditional access and governance at scale.',
    exam:'az104', domain:'identity' },

  { title:'Storage Solutions',             icon:'💾', color:'#f97316', level:'Intermediate',
    desc:'Blob, file shares, queues, tables, storage tiers, replication and lifecycle policies.',
    exam:'az104', domain:'storage' },

  { title:'Compute & Virtual Machines',    icon:'🖥️', color:'#f97316', level:'Intermediate',
    desc:'VMs, scale sets, App Service, Azure Kubernetes Service, containers and serverless.',
    exam:'az104', domain:'compute' },

  { title:'Virtual Networking',            icon:'🌐', color:'#f97316', level:'Intermediate',
    desc:'VNets, subnets, NSGs, peering, VPN gateways, Azure DNS and network routing.',
    exam:'az104', domain:'networking' },

  { title:'Monitoring & Maintenance',      icon:'📊', color:'#f97316', level:'Intermediate',
    desc:'Azure Monitor, alerts, Log Analytics, backup vaults and Azure Site Recovery.',
    exam:'az104', domain:'monitoring' },

  // ── ADVANCED ────────────────────────────────────────────────────────────────
  { title:'Design Identity & Governance',  icon:'🏛️', color:'#8b5cf6', level:'Advanced',
    desc:'Architect identity solutions, governance hierarchies and monitoring frameworks.',
    exam:'az305', domain:'identity-governance-monitoring' },

  { title:'Design Data Storage',           icon:'🗄️', color:'#8b5cf6', level:'Advanced',
    desc:'Choose relational, NoSQL, object, file and cache storage for the right workload.',
    exam:'az305', domain:'data-storage' },

  { title:'Business Continuity Design',    icon:'🔄', color:'#8b5cf6', level:'Advanced',
    desc:'High availability, disaster recovery, backup strategies and resiliency patterns.',
    exam:'az305', domain:'business-continuity' },

  { title:'Infrastructure Architecture',   icon:'🏗️', color:'#8b5cf6', level:'Advanced',
    desc:'Compute, networking and application architecture design at enterprise scale.',
    exam:'az305', domain:'infrastructure' },

  { title:'DevOps Processes & Agile',      icon:'🔀', color:'#14b8a6', level:'Advanced',
    desc:'Agile planning, work tracking, team communication and DevOps culture.',
    exam:'az400', domain:'processes' },

  { title:'Source Control & Git',          icon:'📝', color:'#14b8a6', level:'Advanced',
    desc:'Git branching strategies, pull requests, code review and repository management.',
    exam:'az400', domain:'source-control' },

  { title:'CI/CD Pipelines',               icon:'🚀', color:'#14b8a6', level:'Advanced',
    desc:'Build pipelines, release strategies, deployment slots and Azure DevOps.',
    exam:'az400', domain:'pipelines' },

  { title:'Security in DevOps',            icon:'🛡️', color:'#14b8a6', level:'Advanced',
    desc:'Shift-left security, dependency scanning, secrets management and SAST/DAST.',
    exam:'az400', domain:'security-pipelines' },

  { title:'DevOps Monitoring & Feedback',  icon:'📡', color:'#14b8a6', level:'Advanced',
    desc:'Application Insights, distributed tracing, alerts and continuous feedback loops.',
    exam:'az400', domain:'monitoring-feedback' },

  // ── EXPERT ──────────────────────────────────────────────────────────────────
  { title:'Security: Identity & Access',   icon:'🔐', color:'#ef4444', level:'Expert',
    desc:'Azure AD advanced features, PIM, identity protection and conditional access policies.',
    exam:'az500', domain:'identity-access' },

  { title:'Security: Network Protection',  icon:'🔥', color:'#ef4444', level:'Expert',
    desc:'Azure Firewall, DDoS protection, WAF, private endpoints and zero-trust networking.',
    exam:'az500', domain:'network-security' },

  { title:'Security: Compute & Storage',   icon:'💻', color:'#ef4444', level:'Expert',
    desc:'Defender for servers, container security, storage encryption and Key Vault.',
    exam:'az500', domain:'compute-security' },

  { title:'Security Operations & SIEM',    icon:'🔍', color:'#ef4444', level:'Expert',
    desc:'Microsoft Sentinel, Defender for Cloud, incident response and threat hunting.',
    exam:'az500', domain:'security-ops' },

  { title:'Hybrid Networking',             icon:'🌍', color:'#22c55e', level:'Expert',
    desc:'VPN Gateways, ExpressRoute, Virtual WAN and on-premises hybrid connectivity.',
    exam:'az700', domain:'hybrid-networking' },

  { title:'Core Network Infrastructure',   icon:'🏢', color:'#22c55e', level:'Expert',
    desc:'VNet design, IP addressing, DNS architecture and network topology at scale.',
    exam:'az700', domain:'core-networking' },

  { title:'Routing & Load Balancing',      icon:'🗺️', color:'#22c55e', level:'Expert',
    desc:'UDRs, BGP, Azure Load Balancer, Traffic Manager, Front Door and Application Gateway.',
    exam:'az700', domain:'routing' },

  { title:'Secure & Monitor Networks',     icon:'🔒', color:'#22c55e', level:'Expert',
    desc:'Network Watcher, flow logs, DDoS protection and network security monitoring.',
    exam:'az700', domain:'secure-networks' },

  { title:'Private Access to Azure',       icon:'🔑', color:'#22c55e', level:'Expert',
    desc:'Private Link, Private Endpoints, service endpoints and App Service VNet integration.',
    exam:'az700', domain:'private-access' },
];
