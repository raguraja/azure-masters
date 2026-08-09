/* Topic registry — content is browsed by subject, not by which exam it came from.
   Order here is the display order on the Hub page. */
window.TOPICS = [
  { id:'fundamentals', name:'Cloud Fundamentals',            icon:'🌱', color:'#22c55e', desc:'Core cloud concepts every Azure journey starts with.' },
  { id:'identity',     name:'Identity & Access',              icon:'👤', color:'#0078d4', desc:'Authentication, authorization, and access control across Azure.' },
  { id:'networking',   name:'Networking',                     icon:'🌐', color:'#0095f7', desc:'Connecting, routing, and securing traffic in and out of Azure.' },
  { id:'compute',      name:'Compute',                        icon:'🖥️', color:'#f97316', desc:'Running workloads — from VMs to containers to serverless.' },
  { id:'storage',      name:'Storage & Databases',            icon:'💾', color:'#8b5cf6', desc:'Storing, structuring, and querying data at any scale.' },
  { id:'security',     name:'Security',                       icon:'🔒', color:'#ef4444', desc:'Protecting workloads, secrets, and data from threats.' },
  { id:'governance',   name:'Governance, Cost & Compliance',  icon:'⚖️', color:'#eab308', desc:'Keeping spend, policy, and compliance under control.' },
  { id:'management',   name:'Management Tools & Automation',  icon:'🛠️', color:'#14b8a6', desc:'The tools used to deploy, automate, and operate Azure.' },
  { id:'ai-data',      name:'AI, IoT & Analytics',            icon:'🤖', color:'#ec4899', desc:'Pre-built intelligence, device connectivity, and big data.' },
  { id:'devops',       name:'DevOps & CI/CD',                 icon:'🚀', color:'#14b8a6', desc:'Shipping software fast and safely with pipelines and automation.' },
  { id:'monitoring',   name:'Monitoring & Reliability',       icon:'📊', color:'#00d4ff', desc:'Observability, uptime, and disaster recovery.' },
  { id:'architecture', name:'Architecture & Design Patterns', icon:'🏗️', color:'#a78bfa', desc:'Structuring systems for scale, resilience, and cost efficiency.' },
];

/* Exam code -> learning level, used to sort/badge sections within a topic page */
window.EXAM_LEVEL = {
  az900: { label:'Beginner',     order:1 },
  az104: { label:'Intermediate', order:2 },
  az305: { label:'Advanced',     order:3 },
  az400: { label:'Advanced',     order:3 },
  az500: { label:'Expert',       order:4 },
  az700: { label:'Expert',       order:4 },
};
