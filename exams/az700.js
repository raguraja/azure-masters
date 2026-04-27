window.EXAMS = window.EXAMS || {};
window.EXAMS.az700 = {
  meta: { code:'AZ-700', name:'Azure Network Engineer Associate', icon:'🌐', color:'#22c55e', level:'Associate', duration:120, questions:'40-60', passing:700, roles:['Network Engineer','Cloud Network Architect','SRE (Networking)'], prereq:'AZ-104 recommended' },
  domains: [
    {
      id:'hybrid-networking', name:'Design & Implement Hybrid Networking', weight:'10-15%', color:'#22c55e',
      sections: [
        { id:'vpn-expressroute', title:'VPN Gateway vs ExpressRoute', icon:'🔀',
          render: () => `
<div class="section-desc">Hybrid connectivity is the most critical decision in enterprise Azure networking. The choice impacts cost, security, performance, and reliability.</div>
<table class="cmp-table" style="margin-bottom:16px"><thead><tr><th>Feature</th><th>VPN Gateway</th><th>ExpressRoute</th></tr></thead><tbody>
  <tr><td>Path</td><td>Encrypted tunnel over public internet</td><td>Private dedicated circuit (no internet)</td></tr>
  <tr><td>Encryption</td><td class="cmp-ok">Always encrypted (IPsec/IKE)</td><td class="cmp-partial">Not by default (can add MACsec or VPN over ER)</td></tr>
  <tr><td>Max bandwidth</td><td>10 Gbps (VpnGw5)</td><td>100 Gbps (ExpressRoute Direct)</td></tr>
  <tr><td>SLA</td><td>99.9-99.99% (active-active)</td><td>99.95%</td></tr>
  <tr><td>Latency</td><td>Variable (internet conditions)</td><td>Consistent, low latency</td></tr>
  <tr><td>Cost</td><td>Lower (GW + data transfer)</td><td>Higher (circuit + GW + data transfer)</td></tr>
  <tr><td>Setup time</td><td>Hours-Days</td><td>Weeks-Months (ISP provisioning)</td></tr>
  <tr><td>Best for</td><td>SMB, branch offices, dev/test, backup connectivity</td><td>Enterprise, high-compliance, high-bandwidth, consistent perf</td></tr>
</tbody></table>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">VPN Gateway: Key Design Points</h4>
    <ul>
      <li><strong>Active-Active</strong> — Two GW VMs. Both create tunnels to on-prem. Higher availability. VpnGw1+ required.</li>
      <li><strong>Active-Passive</strong> — Default. One active, one standby. Failover in 10-15 seconds.</li>
      <li><strong>BGP</strong> — Dynamic routing. Required for active-active. Advertises routes automatically.</li>
      <li><strong>IKEv2</strong> — More secure than IKEv1. Required for P2S with macOS/Linux.</li>
      <li><strong>Dead Peer Detection (DPD)</strong> — Detects dropped tunnels and reconnects.</li>
      <li><strong>VPN over ExpressRoute</strong> — Encrypt ER traffic for compliance requirements.</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">ExpressRoute Peering Types</h4>
    <ul>
      <li><strong>Private Peering</strong> — Connect to Azure VMs/VNets via private IPs. Extension of your on-prem network.</li>
      <li><strong>Microsoft Peering</strong> — Connect to Azure PaaS public services (Storage, SQL) and Microsoft 365 via optimized path.</li>
    </ul>
    <p style="margin-top:10px"><strong>ExpressRoute Global Reach:</strong> Connect on-prem sites to each other via Microsoft backbone. Site A → ER → Microsoft backbone → ER → Site B. Better than going over internet.</p>
    <p style="margin-top:8px"><strong>FastPath:</strong> Bypass the ExpressRoute GW for the data plane. Traffic goes directly from on-prem to VM NIC. Higher throughput, lower latency. Ultra Performance or ErGw3AZ GW required.</p>
    <div class="exam-tip">🎯 ExpressRoute FastPath = bypass the gateway for data traffic (control plane still uses GW). Maximum performance for high-bandwidth scenarios.</div>
  </div>
</div>` },

        { id:'virtual-wan', title:'Azure Virtual WAN', icon:'🌐',
          render: () => `
<div class="section-desc">Azure Virtual WAN is a managed networking hub-and-spoke service that provides any-to-any connectivity across branches, VNets, and ExpressRoute circuits — without manual UDR management.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Virtual WAN vs Traditional Hub-Spoke</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Feature</th><th>Traditional Hub-Spoke</th><th>Azure Virtual WAN</th></tr></thead><tbody>
      <tr><td>Transit routing</td><td>Manual UDRs + NVA</td><td>Automatic (built-in)</td></tr>
      <tr><td>Branch connectivity</td><td>Manual VPN config</td><td>SD-WAN partner integration</td></tr>
      <tr><td>ExpressRoute</td><td>ER Gateway in hub VNet</td><td>ER in managed hub (auto)</td></tr>
      <tr><td>Firewall</td><td>Azure Firewall + UDRs</td><td>Secured Virtual Hub (Firewall Manager)</td></tr>
      <tr><td>Complexity</td><td>High (manual configuration)</td><td>Lower (managed service)</td></tr>
      <tr><td>Scale</td><td>Limited by peering limits</td><td>Designed for global enterprise</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Virtual WAN = managed hub-spoke. Azure handles all routing automatically. Use for large enterprises with many branches and VNets.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Virtual WAN Tiers</h4>
    <div style="margin-top:8px;display:flex;flex-direction:column;gap:10px">
      <div style="padding:12px;border-radius:8px;background:rgba(0,120,212,0.08);border:1px solid rgba(0,120,212,0.2)">
        <div style="font-weight:700;color:#50abf1;margin-bottom:4px">Basic SKU</div>
        <ul style="font-size:12px;color:var(--text-dim);padding-left:14px;line-height:1.9">
          <li>Site-to-site VPN only</li>
          <li>No ExpressRoute, no P2S</li>
          <li>No VNet-to-VNet transit routing</li>
          <li>Cannot upgrade to Standard</li>
        </ul>
      </div>
      <div style="padding:12px;border-radius:8px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.2)">
        <div style="font-weight:700;color:#22c55e;margin-bottom:4px">Standard SKU</div>
        <ul style="font-size:12px;color:var(--text-dim);padding-left:14px;line-height:1.9">
          <li>Any-to-any: site↔VNet, site↔site, VNet↔VNet</li>
          <li>ExpressRoute + P2S + S2S VPN + VNet connections</li>
          <li>Azure Firewall in hub (Secured Virtual Hub)</li>
          <li>Routing Intent: route ALL traffic through Firewall</li>
          <li>SD-WAN partner integrations (Barracuda, Fortinet, etc.)</li>
        </ul>
      </div>
    </div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
  <h4 style="color:#f97316;margin-bottom:12px">Virtual WAN Connectivity Types</h4>
  <div class="grid g4">
    ${[
      ['🏢 Site-to-Site (S2S)','Branch offices → Virtual Hub via IPsec/IKE VPN. Supports BGP. Partner SD-WAN devices auto-provisioned.'],
      ['💻 Point-to-Site (P2S)','Remote users → Virtual Hub. Supports OpenVPN, IKEv2, SSTP. Azure VPN Client.'],
      ['🔌 ExpressRoute','On-prem datacenter → Virtual Hub via private circuit. Up to 10Gbps per circuit.'],
      ['🔗 VNet Connection','Azure VNets peer to the Virtual Hub. Full transit routing between all connections.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(249,115,22,0.06);border:1px solid rgba(249,115,22,0.2)"><div style="font-size:12px;font-weight:700;color:#f97316;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` }
      ]
    },
    {
      id:'core-networking', name:'Core Networking Infrastructure', weight:'20-25%', color:'#0078d4',
      sections: [
        { id:'dns-design', title:'Azure DNS & Private DNS', icon:'🔍',
          render: () => `
<div class="section-desc">DNS is the foundation of all network communication. Azure DNS hosts your public zones and Private DNS zones handle internal name resolution.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure DNS (Public)</h4>
    <ul>
      <li>Host authoritative DNS zones in Azure (no DNS servers to manage)</li>
      <li>100% SLA — Anycast routing to nearest Azure DNS servers</li>
      <li>Supports: A, AAAA, CNAME, MX, NS, PTR, SOA, SRV, TXT records</li>
      <li><strong>Alias records</strong> — Point apex domain (contoso.com) to Traffic Manager/Front Door/CDN (CNAME not allowed at apex)</li>
      <li>DNSSEC: currently not supported for Azure-hosted zones</li>
      <li>Zone delegation: delegate a subdomain to different name servers</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Azure Private DNS</h4>
    <ul>
      <li>Internal DNS for VNet resources and Private Endpoints</li>
      <li>Link private zone to VNet → VMs in VNet resolve names against it</li>
      <li><strong>Autoregistration</strong> — Auto-create A records for VMs in linked VNets</li>
      <li>Required for Private Endpoints: <code style="background:rgba(255,255,255,0.08);padding:1px 5px;border-radius:3px;font-size:11px">privatelink.blob.core.windows.net</code></li>
      <li>Split-horizon DNS: same name resolves differently inside/outside VNet</li>
      <li>Can link to multiple VNets across regions</li>
    </ul>
    <div class="exam-tip">🎯 Private Endpoints REQUIRE a private DNS zone with the correct privatelink.* name. Without it, name resolves to the public IP (bypassing the private endpoint).</div>
  </div>
</div>` },

        { id:'appgw-frontdoor', title:'Application Gateway & Azure Front Door', icon:'🌩️',
          render: () => `
<div class="section-desc">Application Gateway and Azure Front Door both provide Layer 7 (HTTP/S) load balancing and WAF, but at different scopes. Understanding which to use is critical for AZ-700.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Application Gateway (Regional L7)</h4>
    <ul>
      <li><strong>Scope</strong> — Regional load balancer. Deployed in your VNet.</li>
      <li><strong>Path-based routing</strong> — /api/* → backend pool A, /images/* → backend pool B</li>
      <li><strong>Multi-site hosting</strong> — api.contoso.com and shop.contoso.com on same GW</li>
      <li><strong>SSL termination</strong> — Offload TLS to AppGW, backends use HTTP</li>
      <li><strong>End-to-end SSL</strong> — Re-encrypt after AppGW to backend</li>
      <li><strong>WAF</strong> — OWASP CRS 3.2, custom rules, detection/prevention mode</li>
      <li><strong>Autoscaling v2</strong> — Scale 0-125 instances based on traffic</li>
      <li><strong>Rewrite rules</strong> — Modify HTTP headers and URL on the fly</li>
      <li><strong>Affinity cookie</strong> — Sticky sessions to same backend instance</li>
    </ul>
    <div class="exam-tip">🎯 Application Gateway = inside your VNet, regional scope. Use for: web apps, microservices routing, internal API gateway with WAF.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure Front Door (Global L7)</h4>
    <ul>
      <li><strong>Scope</strong> — Global. 200+ edge locations worldwide (PoPs)</li>
      <li><strong>Anycast routing</strong> — Users routed to nearest Azure edge (not origin)</li>
      <li><strong>Origin Groups</strong> — Multiple backends per origin group with health probes</li>
      <li><strong>Caching</strong> — Cache static content at edge (CDN capability)</li>
      <li><strong>WAF at edge</strong> — Block attacks before they reach your origin</li>
      <li><strong>Standard tier</strong> — CDN + routing + basic WAF</li>
      <li><strong>Premium tier</strong> — Adds Private Link origins, advanced WAF, bot protection</li>
      <li><strong>Health probes</strong> — Detect unhealthy origins, route around them</li>
      <li><strong>URL rewrite/redirect</strong> — HTTP→HTTPS redirect at edge</li>
    </ul>
    <div class="exam-tip">🎯 Azure Front Door = global edge, CDN, anycast. Use for: global web apps, gaming, API acceleration, DDoS+WAF at scale.</div>
  </div>
</div>
<table class="cmp-table"><thead><tr><th>Attribute</th><th>Application Gateway</th><th>Azure Front Door</th><th>Traffic Manager</th></tr></thead><tbody>
  <tr><td>Protocol</td><td>HTTP/HTTPS/WebSocket</td><td>HTTP/HTTPS</td><td>Any (DNS-based)</td></tr>
  <tr><td>Scope</td><td>Regional</td><td>Global</td><td>Global</td></tr>
  <tr><td>Routing type</td><td>L7 proxy (in VNet)</td><td>L7 anycast (edge)</td><td>DNS redirect</td></tr>
  <tr><td>CDN / Caching</td><td class="cmp-no">No</td><td class="cmp-ok">Yes</td><td class="cmp-no">No</td></tr>
  <tr><td>WAF included</td><td class="cmp-ok">Yes (v2)</td><td class="cmp-ok">Yes</td><td class="cmp-no">No</td></tr>
  <tr><td>SSL termination</td><td class="cmp-ok">Yes</td><td class="cmp-ok">Yes (at edge)</td><td class="cmp-no">No</td></tr>
  <tr><td>Private origins</td><td class="cmp-ok">VNet-internal</td><td class="cmp-ok">Premium: Private Link</td><td class="cmp-no">No</td></tr>
</tbody></table>` },

        { id:'vnet-design', title:'VNet Design Best Practices & Azure Bastion', icon:'🏗️',
          render: () => `
<div class="section-desc">Proper VNet address space design prevents costly refactoring. Azure Bastion provides secure admin access — a key AZ-700 topic.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">VNet Address Space Design</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Plan address spaces before deployment — changing them later breaks peering and requires redeployment.</p>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Subnet</th><th>Minimum Size</th><th>Notes</th></tr></thead><tbody>
      <tr><td>GatewaySubnet (VPN/ER)</td><td>/27</td><td>Must be named exactly "GatewaySubnet". Recommend /26 or larger for future expansion.</td></tr>
      <tr><td>AzureFirewallSubnet</td><td>/26</td><td>Must be named exactly "AzureFirewallSubnet". /26 required.</td></tr>
      <tr><td>AzureBastionSubnet</td><td>/26</td><td>Must be named exactly "AzureBastionSubnet". /26 minimum for Standard Bastion.</td></tr>
      <tr><td>RouteServerSubnet</td><td>/27</td><td>Must be named exactly "RouteServerSubnet".</td></tr>
      <tr><td>Application subnets</td><td>/24+</td><td>Azure reserves 5 IPs per subnet. Leave headroom for scale.</td></tr>
    </tbody></table>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px;margin-top:10px">
      <li>Use RFC 1918 private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16</li>
      <li>Don't overlap with on-premises ranges (prevents VPN/ExpressRoute peering)</li>
      <li>Plan for growth — use larger /16 or /8 blocks for hub VNets</li>
      <li>Each VNet can have multiple address spaces (add later without downtime)</li>
    </ul>
    <div class="exam-tip">🎯 Azure reserves 5 IP addresses per subnet: network address, gateway, DNS x2, broadcast. A /29 (8 IPs) only gives you 3 usable hosts.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure Bastion — Detailed</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Feature</th><th>Basic</th><th>Standard</th></tr></thead><tbody>
      <tr><td>RDP/SSH via browser</td><td class="cmp-ok">✓</td><td class="cmp-ok">✓</td></tr>
      <tr><td>No public IP on VM</td><td class="cmp-ok">✓</td><td class="cmp-ok">✓</td></tr>
      <tr><td>VNet peering support</td><td class="cmp-no">Same VNet only</td><td class="cmp-ok">✓ Peered VNets</td></tr>
      <tr><td>Native client (RDP app)</td><td class="cmp-no">✗</td><td class="cmp-ok">✓ Full RDP client</td></tr>
      <tr><td>File transfer</td><td class="cmp-no">✗</td><td class="cmp-ok">✓ Upload/download</td></tr>
      <tr><td>Session recording</td><td class="cmp-no">✗</td><td class="cmp-ok">✓ Audit sessions</td></tr>
      <tr><td>Private-only Bastion</td><td class="cmp-no">✗</td><td class="cmp-ok">✓ No public IP</td></tr>
      <tr><td>Subnet size</td><td>/26</td><td>/26</td></tr>
    </tbody></table>
    <ul style="font-size:12px;color:var(--text-dim);line-height:1.9;padding-left:14px;margin-top:10px">
      <li>Bastion subnet must contain NO other resources</li>
      <li>NSG on AzureBastionSubnet: allow 443 inbound from internet, allow 8080+5701 from VirtualNetwork</li>
      <li>Standard Bastion connects to VMs in peered VNets — one Bastion covers the whole hub-spoke</li>
    </ul>
    <div class="exam-tip">🎯 Standard Bastion with VNet peering = deploy ONE Bastion in hub, access all spoke VNet VMs. No Bastion needed in each spoke. Cost-efficient hub-spoke pattern.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'routing', name:'Design & Implement Routing', weight:'25-30%', color:'#f97316',
      sections: [
        { id:'routing-deep', title:'Routing Deep Dive', icon:'🗺️',
          render: () => `
<div class="section-desc">Azure routing is automatic by default but can be fully customized. Understanding the routing priority order is critical for AZ-700.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Azure System Routes (Built-in)</h4>
    <ul>
      <li><strong>VNet routes</strong> — Routes to all address prefixes within the VNet</li>
      <li><strong>Internet route</strong> — 0.0.0.0/0 → Internet (default)</li>
      <li><strong>Peered VNet routes</strong> — Auto-added when peering created</li>
      <li><strong>Service endpoint routes</strong> — Optimal path to Azure services</li>
      <li><strong>VPN/ExpressRoute BGP routes</strong> — Propagated from gateway</li>
    </ul>
    <p style="margin-top:10px"><strong>Route Selection Priority:</strong></p>
    <ol style="padding-left:16px;font-size:12px;color:var(--text-dim);line-height:2">
      <li>User-Defined Routes (UDRs) — highest priority</li>
      <li>BGP routes (from VPN/ER gateway)</li>
      <li>System routes — lowest priority</li>
    </ol>
    <div class="exam-tip">🎯 More specific routes always win over less specific (longest prefix match). UDR for 10.0.0.0/16 beats system route for 10.0.0.0/8.</div>
  </div>
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">Azure Route Server</h4>
    <p>Route Server enables dynamic BGP route exchange between NVAs (firewalls, SD-WAN) and Azure without needing VPN Gateway for routing.</p>
    <ul style="margin-top:10px">
      <li>NVA advertises routes via BGP to Route Server</li>
      <li>Route Server propagates NVA routes to all VNet subnets</li>
      <li>Eliminates manual UDR management when NVA routes change</li>
      <li>Branch-to-branch: Route Server can pass routes between VPN GW and NVA (transit routing)</li>
      <li>Deployed in its own dedicated subnet (/27 minimum)</li>
    </ul>
    <div class="exam-tip">🎯 Route Server = BGP peering for NVAs without VPN GW. Eliminates static UDR management as NVA routes change dynamically.</div>
  </div>
</div>` },

        { id:'nat-lb', title:'NAT Gateway & Load Balancer Advanced', icon:'⚖️',
          render: () => `
<div class="section-desc">NAT Gateway provides reliable outbound internet connectivity for VNet resources. Azure Load Balancer Standard provides regional high availability with advanced features.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Azure NAT Gateway</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">Provides scalable, resilient outbound internet connectivity for VNet resources without exposing inbound ports.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Purpose</strong> — Outbound-only internet access for VMs without public IPs</li>
      <li><strong>SNAT ports</strong> — Up to 64,000 SNAT ports per public IP (vs ~1,024 with LB default)</li>
      <li><strong>Multiple Public IPs</strong> — Associate multiple public IPs or prefixes for more SNAT ports</li>
      <li><strong>No SNAT exhaustion</strong> — Dynamically allocates ports; eliminates SNAT port exhaustion</li>
      <li><strong>Zone-redundant</strong> — Optional zonal or zone-redundant deployment</li>
      <li><strong>Applied at subnet level</strong> — All resources in subnet use NAT GW for outbound</li>
      <li><strong>Overrides LB outbound rules</strong> — NAT GW takes precedence over LB outbound</li>
    </ul>
    <div class="exam-tip">🎯 Use NAT Gateway when VMs need reliable outbound internet without public IPs. Eliminates SNAT exhaustion — critical for high-connection workloads.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure Load Balancer Standard — Advanced</h4>
    <table class="cmp-table" style="margin-top:8px"><thead><tr><th>Feature</th><th>Basic</th><th>Standard</th></tr></thead><tbody>
      <tr><td>Backend pool scope</td><td>Availability Set only</td><td>Any VM, VMSS, IP address</td></tr>
      <tr><td>Availability Zones</td><td class="cmp-no">No</td><td class="cmp-ok">Zone-redundant + zonal</td></tr>
      <tr><td>HA Ports rule</td><td class="cmp-no">No</td><td class="cmp-ok">All ports, all protocols</td></tr>
      <tr><td>SLA</td><td>None</td><td>99.99%</td></tr>
      <tr><td>Outbound rules</td><td class="cmp-no">No</td><td class="cmp-ok">Configurable SNAT</td></tr>
      <tr><td>Diagnostics</td><td>Basic</td><td>Multi-dimensional metrics</td></tr>
      <tr><td>Secure by default</td><td class="cmp-no">No</td><td class="cmp-ok">NSG required</td></tr>
    </tbody></table>
    <p style="font-size:12px;color:var(--text-dim);margin-top:10px"><strong>HA Ports rule:</strong> Single rule to load-balance ALL TCP/UDP ports simultaneously. Used with Network Virtual Appliances (NVA) for simplified configuration.</p>
    <div class="exam-tip">🎯 Standard LB is secure by default — requires NSG to allow traffic. Basic LB allows all traffic. Always use Standard in production.</div>
  </div>
</div>` },

        { id:'nva-bgp-advanced', title:'NVA Patterns, BGP & Cross-Region Load Balancer', icon:'🔁',
          render: () => `
<div class="section-desc">Network Virtual Appliances, BGP route filtering, and global load balancing are advanced AZ-700 topics for enterprise architectures.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Network Virtual Appliance (NVA) Patterns</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">NVAs are 3rd-party firewalls/routers (Palo Alto, Fortinet, Check Point, Cisco) deployed as VMs in Azure for advanced traffic inspection.</p>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>Active-Active HA</strong> — 2 NVAs behind Standard LB. Use HA Ports rule to load-balance ALL ports.</li>
      <li><strong>Active-Passive</strong> — Failover via Azure Function/script that updates UDRs on the standby NVA's IP.</li>
      <li><strong>Hub-Spoke + NVA</strong> — NVA in hub. UDRs on each spoke route 0.0.0.0/0 to NVA. NVA inspects all egress + east-west traffic.</li>
      <li><strong>Azure Route Server + NVA</strong> — NVAs advertise routes via BGP. Route Server propagates routes to all VNet subnets automatically (no manual UDRs).</li>
      <li><strong>Forced Tunneling</strong> — UDR 0.0.0.0/0 → NVA → on-premises firewall. All internet traffic exits via on-prem.</li>
      <li><strong>Service Chaining</strong> — Multiple NVAs in sequence: WAF → IDS → Firewall → Internet.</li>
    </ul>
    <div class="exam-tip">🎯 NVA HA pattern: Standard LB with HA Ports rule (front-end IP, all ports, all protocols) + 2 NVA instances. Health probe detects unhealthy NVA. Most resilient for production.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">BGP Advanced — ExpressRoute</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
      <li><strong>BGP communities</strong> — Tag routes with metadata. Microsoft assigns regional communities (e.g. "US West" = 12076:51010). Use to apply policy based on origin region.</li>
      <li><strong>Route filtering (Microsoft Peering)</strong> — Restrict which Azure service prefixes are advertised via ExpressRoute. Without filter, no routes are advertised.</li>
      <li><strong>AS Path Prepending</strong> — Make a path appear longer to influence route selection. Force traffic over preferred ExpressRoute circuit.</li>
      <li><strong>BGP MED (Multi-Exit Discriminator)</strong> — Hint to peers about preferred entry path when multiple paths exist.</li>
      <li><strong>Local Preference</strong> — Higher value = preferred. Used to prefer one ExpressRoute over backup VPN.</li>
      <li><strong>Connection bandwidth</strong> — ExpressRoute circuit SKUs: 50Mbps to 10Gbps (Standard), up to 100Gbps (ExpressRoute Direct).</li>
    </ul>
    <div class="exam-tip">🎯 ExpressRoute Microsoft Peering REQUIRES route filters. Without one, no Azure service prefixes are advertised — your circuit can't reach Storage, SQL, etc. via Microsoft Peering.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
  <h4 style="color:#22c55e">Cross-Region Load Balancer (Global Standard LB)</h4>
  <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Provides geographic load balancing at Layer 4 across Azure regions — TCP/UDP traffic with global anycast IP.</p>
  <div class="grid g3">
    ${[
      ['Global anycast IP','Single IP advertised from multiple regions. Clients route to nearest healthy region automatically.'],
      ['Layer 4 only','TCP/UDP at scale. For Layer 7 / HTTP use Azure Front Door instead. Cross-Region LB = non-HTTP global LB.'],
      ['Backend = Regional LB','Backends are regional Standard Load Balancers (one per region). Hierarchical: Global LB → Regional LB → VMs.'],
      ['Health probes','Auto-failover when a regional LB becomes unhealthy. Sub-minute detection.'],
      ['Use cases','Multi-region database front-ends, gaming TCP servers, IoT MQTT brokers, custom protocols beyond HTTP.'],
      ['SLA','Inherits Standard LB SLA (99.99%). Combined with multi-region deployment achieves 99.999%+.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2)"><div style="font-size:12px;font-weight:700;color:#22c55e;margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 Cross-Region LB = global L4 (TCP/UDP). Front Door = global L7 (HTTP/S) with CDN+WAF. Different services for different protocols. Don't confuse them.</div>
</div>` }
      ]
    },
    {
      id:'secure-networks', name:'Secure & Monitor Networks', weight:'15-20%', color:'#ef4444',
      sections: [
        { id:'network-security-deep', title:'Network Security Deep Dive', icon:'🔒',
          render: () => `
<div class="section-desc">Layered network security in Azure: NSG (subnet/NIC) → Azure Firewall (VNet) → DDoS Protection (region) → WAF (application).</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Azure Firewall Manager</h4>
    <p>Centrally manage Azure Firewall policies across multiple regions and subscriptions.</p>
    <ul style="margin-top:10px">
      <li><strong>Firewall Policies</strong> — Hierarchical (parent/child). Parent applies to all firewalls.</li>
      <li><strong>Secured Virtual Hub</strong> — Azure Virtual WAN hub with integrated Azure Firewall</li>
      <li><strong>Hub VNet</strong> — Traditional hub-spoke with Azure Firewall in hub VNet</li>
      <li>Manage rules centrally, apply to multiple firewalls</li>
      <li>Azure Firewall Policy: Rule Collection Groups → Rule Collections → Rules</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Network Watcher Tools</h4>
    <table class="cmp-table"><thead><tr><th>Tool</th><th>Purpose</th></tr></thead><tbody>
      <tr><td>Connection Monitor</td><td>Continuous monitoring of end-to-end connectivity (latency, loss)</td></tr>
      <tr><td>IP Flow Verify</td><td>Check if packet from/to IP:port is allowed or denied by NSG</td></tr>
      <tr><td>Next Hop</td><td>Show what the next hop is for traffic from a VM to a destination</td></tr>
      <tr><td>Packet Capture</td><td>Capture packets from VM NIC to file (like Wireshark in the cloud)</td></tr>
      <tr><td>NSG Flow Logs</td><td>Log all allowed/denied flows through NSG to Storage + Log Analytics</td></tr>
      <tr><td>Connection Troubleshoot</td><td>One-time connectivity test from VM to endpoint</td></tr>
      <tr><td>Topology</td><td>Visual map of VNet resources and their relationships</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 NSG Flow Logs feed into Traffic Analytics (built on Log Analytics) for visualizing network traffic patterns, threats, and hotspots.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'private-access', name:'Private Access to Azure Services', weight:'10-15%', color:'#8b5cf6',
      sections: [
        { id:'private-link', title:'Private Link & Private Endpoints', icon:'🔏',
          render: () => `
<div class="section-desc">Private Link brings Azure PaaS services into your VNet with private IPs, eliminating internet exposure.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(139,92,246,0.3);background:rgba(139,92,246,0.05)">
    <h4 style="color:#a78bfa">Private Endpoint Architecture</h4>
    <ul>
      <li>Creates a NIC in your subnet with a private IP from your VNet space</li>
      <li>Traffic to the service routes through this NIC (never leaves Azure backbone)</li>
      <li>Disable public access on the service afterward (enforce private-only access)</li>
      <li>Supported services: Storage, SQL, Key Vault, Cosmos DB, ACR, AKS, Service Bus, 150+ more</li>
      <li>Works across VNet peering, VPN, and ExpressRoute connections</li>
      <li>Cross-tenant: can connect to Private Link service in another Azure tenant</li>
    </ul>
    <div class="exam-tip">🎯 Private Endpoint + disable public network access = network exfiltration prevention. Data can't leave your VNet.</div>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Private Link Service (publish your own)</h4>
    <p>Expose YOUR service (behind an Azure Standard Load Balancer) via Private Link so consumers can create Private Endpoints to it.</p>
    <ul style="margin-top:10px">
      <li>Your service → Standard LB → Private Link Service → Consumer Private Endpoint</li>
      <li>Consumer gets a private IP in their VNet connected to your service</li>
      <li>No VNet peering required between publisher and consumer</li>
      <li>Publisher can accept/reject connection requests</li>
      <li>Works across tenants — B2B SaaS pattern</li>
    </ul>
    <div class="exam-tip">🎯 Private Link Service = publish your service. Private Endpoint = consume a service. Azure does the same thing for all its PaaS services.</div>
  </div>
</div>
<table class="cmp-table"><thead><tr><th>Feature</th><th>Service Endpoint</th><th>Private Endpoint</th></tr></thead><tbody>
  <tr><td>Traffic path</td><td>Azure backbone (optimal) but exits VNet</td><td>Stays in VNet (private IP)</td></tr>
  <tr><td>Source IP seen by service</td><td>VNet private IP</td><td>Private Endpoint NIC IP</td></tr>
  <tr><td>Works across peered VNets?</td><td class="cmp-no">No</td><td class="cmp-ok">Yes</td></tr>
  <tr><td>Works over VPN/ExpressRoute?</td><td class="cmp-no">No</td><td class="cmp-ok">Yes</td></tr>
  <tr><td>Cross-subscription?</td><td class="cmp-no">No</td><td class="cmp-ok">Yes</td></tr>
  <tr><td>DNS requirements</td><td>None</td><td>Private DNS zone required</td></tr>
  <tr><td>Cost</td><td>Free</td><td>Per endpoint + data processing</td></tr>
</tbody></table>` }
      ]
    }
  ],
  quiz: [
    { q:'What is the main advantage of ExpressRoute over VPN Gateway for enterprise connectivity?', a:1, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['ExpressRoute is always encrypted by default','ExpressRoute uses a private dedicated circuit that never traverses the public internet, providing consistent latency and higher bandwidth','ExpressRoute is cheaper than VPN Gateway','ExpressRoute supports more VPN tunnels than VPN Gateway'], exp:'ExpressRoute uses a private dedicated circuit provided by a connectivity partner (MPLS provider). Traffic NEVER goes over the public internet, providing consistent low latency, high bandwidth, and no internet variability. VPN Gateway encrypts traffic but it still traverses the internet.' },
    { q:'In a hub-spoke topology, Spoke A needs to communicate with Spoke B. Both are peered with the Hub VNet. What must be configured?', a:2, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Direct VNet peering between Spoke A and Spoke B','NSG rules allowing traffic between the spokes','UDRs on both spokes pointing to the hub firewall/NVA for cross-spoke traffic','ExpressRoute connection between the spokes'], exp:'VNet peering is NOT transitive. A↔Hub and B↔Hub does NOT mean A↔B. You must configure UDRs on each spoke pointing to the hub\'s Azure Firewall or NVA as the next hop for traffic destined to the other spoke\'s address space.' },
    { q:'Which DNS record type allows you to point a root/apex domain (e.g., contoso.com) directly to an Azure Traffic Manager profile?', a:3, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['A record (IP address)','CNAME record','NS record','Alias record (Azure DNS-specific)'], exp:'CNAME records cannot be used at the apex/root of a domain (RFC restriction). Azure DNS Alias records are an Azure-specific extension that allows the apex of a DNS zone to point directly to Azure resources like Traffic Manager, Front Door, CDN, or Public IP.' },
    { q:'Which Azure Network Watcher tool would you use to determine if an NSG rule is blocking traffic from IP 203.0.113.1 to a VM on port 443?', a:1, domain:'Secure Networks', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Next Hop','IP Flow Verify','Packet Capture','Connection Monitor'], exp:'IP Flow Verify tests whether traffic from a specific source IP/port to a destination IP/port is allowed or denied by the NSGs applied to a VM. It tells you which specific rule is making the allow/deny decision.' },
    { q:'A Private Endpoint is created for an Azure Storage account in VNet A, which is peered with VNet B. Can VMs in VNet B resolve the storage account\'s private DNS name and reach it via the Private Endpoint?', a:0, domain:'Private Access', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Yes, but only if the Private DNS Zone is linked to both VNet A and VNet B','No, Private Endpoints only work within the same VNet','Yes, automatically across peered VNets without any DNS configuration','No, Private Endpoints do not work across peered VNets'], exp:'Private Endpoints work across VNet peering — traffic from peered VNets routes to the PE NIC. However, name resolution requires the Private DNS zone to be linked to ALL VNets that need to resolve the name (including VNet B in this case).' },
    { q:'Azure Route Server is used to achieve what in a hub-spoke network?', a:2, domain:'Routing', domainColor:'rgba(249,115,22,0.15)', domainText:'#f97316', opts:['Replace Azure Firewall for packet inspection','Provide BGP routing between ExpressRoute circuits','Enable dynamic BGP route exchange between NVAs and Azure VNets, eliminating manual UDR management','Create VPN tunnels between virtual networks'], exp:'Azure Route Server enables NVAs (firewalls, SD-WAN appliances) to exchange BGP routes directly with Azure. As NVA routes change, Route Server dynamically propagates them to VNet subnets — eliminating the need to manually update UDRs every time routes change.' },
    { q:'What is the minimum subnet size required to deploy an Azure VPN Gateway?', a:1, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['/28 (16 addresses)','GatewaySubnet must be at least /27 (32 addresses)','GatewaySubnet must be at least /26 (64 addresses)','GatewaySubnet must be exactly /24 (256 addresses)'], exp:'The GatewaySubnet for a VPN Gateway must be at least /27 (32 IP addresses). Azure recommends /27 or larger. The subnet MUST be named "GatewaySubnet" exactly — no other name works. Azure Bastion requires its own subnet named "AzureBastionSubnet" with /26 minimum.' },
    { q:'In Azure Virtual WAN, what is the difference between Basic and Standard tier?', a:0, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Basic supports site-to-site VPN only; Standard adds ExpressRoute, P2S VPN, VNet connections, and any-to-any routing','Basic is free; Standard is paid','Basic allows 10 VNets; Standard allows unlimited','They are identical in features; pricing differs'], exp:'Virtual WAN Basic: site-to-site VPN only, no ExpressRoute, no P2S, limited routing. Virtual WAN Standard: full any-to-any connectivity (branch↔branch, VNet↔branch, ExpressRoute, P2S), Azure Firewall in hub (Secured Virtual Hub), full transit routing.' },
    { q:'Application Gateway can route HTTP requests to different backend pools based on what criteria? (Select the MOST specific answer)', a:2, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Only by destination IP address','Only by source IP address','URL path (e.g. /api/* → backend A, /images/* → backend B) and hostname (multi-site hosting)','Only by port number'], exp:'Application Gateway supports path-based routing (route /api/* to API backend, /images/* to CDN backend) and multi-site hosting (route api.contoso.com to one backend, shop.contoso.com to another) — all on the same Application Gateway. This is Layer 7 HTTP/HTTPS routing.' },
    { q:'What happens to existing VNet peering connections if you add a new address space to a VNet?', a:0, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Existing peerings are automatically updated to include the new address space — no action needed','All existing peerings must be deleted and re-created','The new address space cannot be added while peerings exist','Only new peerings will see the new address space'], exp:'Since a 2022 Azure update, adding address spaces to a peered VNet automatically propagates to existing peerings — no need to delete and re-create. Before this update, you had to remove and re-create peerings. Always verify current Azure documentation as this is a commonly tested detail.' },
    { q:'Azure Front Door Standard vs Premium — which tier includes private origin connectivity (Private Link) and WAF with bot protection?', a:1, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Azure Front Door Standard','Azure Front Door Premium','Both tiers include all features','Neither — those require Application Gateway'], exp:'Front Door Premium tier adds: Private Link origins (connect to origins via private endpoint, no public internet), enhanced WAF with bot protection, security analytics, and managed rule sets. Standard tier has CDN, custom routing, basic WAF, but no private origins or advanced bot protection.' },
    { q:'When a VPN Gateway is in active-active mode, how many public IPs and BGP peers are created?', a:2, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['1 public IP, 1 BGP peer','2 public IPs, 1 BGP peer','2 public IPs, 2 BGP peers (one per gateway instance)','4 public IPs, 2 BGP peers'], exp:'Active-active VPN Gateway creates 2 gateway VM instances, each with their own public IP address. On-premises must establish 2 tunnels (one to each instance). With BGP enabled, there are 2 BGP peers. This eliminates the gateway as a single point of failure.' },
    { q:'What is the purpose of the "Deny All" default NSG inbound rule with priority 65500?', a:1, domain:'Secure Networks', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['It blocks only internet traffic; VNet traffic is always allowed','It denies all inbound traffic that doesn\'t match a higher-priority allow rule — providing a default-deny security posture','It applies only to IPv6 traffic','It is a placeholder that must be deleted to allow any traffic'], exp:'NSG default rules cannot be deleted (priorities 65000-65500). Priority 65500 "DenyAllInBound" ensures that any traffic not explicitly allowed by a higher-priority rule is blocked. This is the "default deny" security model. You explicitly allow what you need, everything else is blocked.' },
    { q:'Which ExpressRoute feature allows two on-premises sites to communicate with each other through the Microsoft backbone without traffic going over the public internet?', a:2, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['ExpressRoute FastPath','ExpressRoute Direct','ExpressRoute Global Reach','Microsoft Peering'], exp:'ExpressRoute Global Reach connects multiple on-premises sites via their respective ExpressRoute circuits through the Microsoft global backbone. Site A → ER circuit A → Microsoft backbone → ER circuit B → Site B. Traffic never hits the public internet. Useful for inter-branch connectivity.' },
    { q:'When using Service Endpoints vs Private Endpoints, which scenario REQUIRES Private Endpoints (not Service Endpoints)?', a:3, domain:'Private Access', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['Accessing Azure Storage from the same VNet','Restricting Azure SQL access to specific subnets','Using a storage account from an on-premises network connected via ExpressRoute','Accessing Azure Storage from an on-premises network connected via VPN/ExpressRoute'], exp:'Service Endpoints only work within Azure VNets — they don\'t extend to on-premises networks connected via VPN or ExpressRoute. Private Endpoints work across VPN and ExpressRoute connections because the PE NIC is a real private IP in the VNet that on-premises networks can route to.' },
    { q:'A Web Application Firewall on Application Gateway detects a SQL injection attack in the request body but the request is still allowed through. What mode is the WAF in?', a:0, domain:'Secure Networks', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Detection mode — logs attacks but does not block them','Prevention mode — always blocks all detected attacks','Disabled mode — not evaluating traffic','Learning mode — still building the baseline'], exp:'WAF Detection mode: evaluates traffic against OWASP rules and logs matches, but DOES NOT block requests. Use Detection mode initially to understand false positives and tune exclusions. Prevention mode: blocks and logs matched requests. Always start with Detection, tune, then switch to Prevention.' },
    { q:'How many usable IP addresses does a /27 subnet in Azure provide?', a:1, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['32 usable addresses','27 usable addresses (32 total minus 5 reserved by Azure)','30 usable addresses','27 usable addresses (Azure reserves 2)'], exp:'A /27 subnet has 32 total addresses. Azure reserves 5 per subnet: network address (.0), default gateway (.1), Azure DNS (.2 and .3), broadcast (.255 equivalent). So 32 - 5 = 27 usable host addresses. A /29 (8 total) gives only 3 usable.' },
    { q:'Which Azure Bastion tier allows you to connect to VMs in peered VNets using a single Bastion deployment?', a:1, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Basic tier with VNet peering option','Standard tier (VNet peering support is a Standard-only feature)','Both Basic and Standard support peering','Neither — each VNet needs its own Bastion'], exp:'Azure Bastion Standard tier supports VNet peering: deploy ONE Bastion in the hub VNet, and it can connect to VMs in all peered spoke VNets. Basic tier only connects to VMs in the same VNet. Standard = hub-and-spoke Bastion pattern (one Bastion for all spokes).' },
    { q:'What is Azure Firewall Manager primarily used for?', a:2, domain:'Secure Networks', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Managing Network Security Groups across subscriptions','Configuring DDoS Protection Standard policies','Centrally managing Azure Firewall policies and deployments across multiple regions and subscriptions','Monitoring firewall rule hits and denied traffic'], exp:'Azure Firewall Manager provides centralized management of Azure Firewall policies across multiple Azure Firewall instances in different regions/subscriptions. Hierarchical policies: parent policy → child policies per region. Also manages Secured Virtual Hubs (Virtual WAN + Azure Firewall).' },
    { q:'Traffic Analytics is built on which Azure service and provides what capability?', a:0, domain:'Secure Networks', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Log Analytics — visualizes NSG flow logs to show traffic hotspots, threats, and network topology','Azure Monitor Metrics — provides real-time bandwidth graphs for each VNet','Network Watcher — captures individual packets for forensic analysis','Azure Sentinel — detects network-based threats using ML'], exp:'Traffic Analytics processes NSG flow logs (stored in Storage) through a Log Analytics workspace using a solution called Traffic Analytics. It provides: geo-mapping of traffic, top talkers, open ports, allowed/denied traffic visualization, and threat intelligence integration. Enable via Network Watcher → NSG Flow Logs → enable Traffic Analytics.' },
    { q:'A company needs to connect 50 branch offices to Azure with minimal configuration on each branch device. Which solution provides the most scalable managed connectivity?', a:2, domain:'Hybrid Networking', domainColor:'rgba(34,197,94,0.15)', domainText:'#22c55e', opts:['Deploy individual VPN Gateways in 50 hub VNets','Connect each branch with ExpressRoute circuits','Azure Virtual WAN Standard with SD-WAN partner integration','Configure BGP on each branch VPN Gateway independently'], exp:'Azure Virtual WAN Standard with SD-WAN partner integration (Barracuda, Fortinet, Versa, etc.) allows branch devices to automatically provision connectivity to Virtual WAN hubs. The SD-WAN controller automates configuration. Scales to thousands of branches with minimal manual configuration.' },
    { q:'What happens to traffic between two VMs in the same subnet when there is no NSG attached to the subnet or NIC?', a:0, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['All traffic is allowed by default — Azure allows all intra-subnet traffic when no NSG is present','All traffic is blocked — Azure uses default-deny even without NSG','Only TCP traffic is allowed; UDP is blocked','Only traffic on port 80 and 443 is allowed'], exp:'Without any NSG, Azure\'s default behavior allows all traffic between resources in the same VNet (covered by the AllowVnetInBound/AllowVnetOutBound default rules). Adding an NSG and setting it to Deny creates a restrictive posture. Standard Load Balancer requires explicit NSG allow rules (unlike Basic LB).' },
    { q:'In Azure DNS, what record type would you create to map the name "mail.contoso.com" to "contoso-mail.outlook.com"?', a:1, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['A record (maps to IP address)','CNAME record (canonical name alias to another hostname)','MX record (mail exchanger)','Alias record (Azure resource reference)'], exp:'CNAME (Canonical Name) record creates an alias from one hostname to another. "mail.contoso.com CNAME contoso-mail.outlook.com" means clients looking up mail.contoso.com get redirected to resolve contoso-mail.outlook.com. Note: CNAME cannot be used at the zone apex — use Alias records for that.' },
    { q:'Azure Standard Load Balancer is "secure by default." What does this mean in practice?', a:1, domain:'Core Networking', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['It automatically configures WAF rules to block common attacks','No inbound internet traffic reaches backend VMs without explicit NSG allow rules — unlike Basic LB which allows all traffic','It encrypts all traffic between the load balancer and backend VMs','It automatically blocks traffic from countries with high threat rates'], exp:'Standard Load Balancer backend VMs are isolated from internet inbound traffic by default. You MUST configure NSG rules explicitly to allow the traffic you want. Basic LB allowed all traffic without NSG by default. This is a critical security difference: Standard = deny by default, Basic = allow by default.' },
    { q:'What is the purpose of a "Private Link Service" (different from a Private Endpoint)?', a:2, domain:'Private Access', domainColor:'rgba(139,92,246,0.15)', domainText:'#a78bfa', opts:['It automatically creates private DNS zones for all Private Endpoints','It allows VNets to access Azure PaaS services via private IPs','It allows YOU to expose your own service behind a Standard Load Balancer so other organizations can create Private Endpoints to consume it','It provides a managed proxy between on-premises and Azure Private Endpoints'], exp:'Private Link Service = publish your OWN service. You put your service behind an Azure Standard Load Balancer, create a Private Link Service on that LB, and consumers in other Azure tenants/subscriptions can create Private Endpoints that connect to your service — without VNet peering or public internet.' },
  ]
};
