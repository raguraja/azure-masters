window.EXAMS = window.EXAMS || {};
window.EXAMS.az400 = {
  meta: { code:'AZ-400', name:'Azure DevOps Engineer Expert', icon:'🚀', color:'#14b8a6', level:'Expert', duration:120, questions:'40-60', passing:700, roles:['DevOps Engineer','SRE','Platform Engineer'], prereq:'AZ-104 or AZ-204 required' },
  domains: [
    {
      id:'processes', name:'Configure Processes & Communications', weight:'10-15%', color:'#ec4899',
      sections: [
        { id:'azure-boards', title:'Azure Boards & Agile Planning', icon:'📋',
          render: () => `
<div class="section-desc">Azure Boards provides Agile project management — work items, sprints, backlogs, and dashboards. This is the "plan" part of the DevOps lifecycle.</div>
<div class="tabs" id="boards-tabs">
  <button class="tab active" onclick="switchTabInner('boards','work-items')">Work Item Types</button>
  <button class="tab" onclick="switchTabInner('boards','process')">Process Models</button>
  <button class="tab" onclick="switchTabInner('boards','analytics')">Dashboards & Analytics</button>
</div>
<div id="boards-work-items" class="tab-panel active">
  <div class="grid g2" style="margin-bottom:16px">
    <div class="info-box" style="border-color:rgba(236,72,153,0.3);background:rgba(236,72,153,0.05)">
      <h4 style="color:#ec4899">Work Item Hierarchy</h4>
      <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px">
        ${[
          ['🎯 Epic','Largest unit. Business initiative. Spans multiple sprints or quarters. Example: "Redesign checkout flow"'],
          ['📦 Feature','A deliverable that implements part of an Epic. Example: "New payment page UI"'],
          ['📝 User Story / PBI','A specific requirement from user perspective. "As a user, I want to..."'],
          ['🔧 Task','Specific implementation work. Hours-level. Assigned to individual developer'],
          ['🐛 Bug','Defect tracking. Can be linked to stories. Has severity and priority'],
          ['🧪 Test Case','Verification step. Linked to stories. Tracked in Azure Test Plans']
        ].map(([t,d])=>`<div style="padding:8px 12px;border-radius:6px;background:rgba(255,255,255,0.03);border:1px solid var(--border)"><div style="font-size:12px;font-weight:700;color:var(--text);margin-bottom:2px">${t}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
      </div>
      <div class="exam-tip">🎯 Epic → Feature → User Story → Task is the Agile hierarchy. Bugs can exist at any level. All work items are traceable to each other.</div>
    </div>
    <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
      <h4 style="color:#50abf1">Backlogs & Sprints</h4>
      <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px;margin-top:8px">
        <li><strong>Product Backlog</strong> — Prioritized list of all work to be done</li>
        <li><strong>Sprint Backlog</strong> — Subset committed for this sprint (1-4 weeks)</li>
        <li><strong>Sprint Board</strong> — Kanban-style: To Do → In Progress → Done</li>
        <li><strong>Velocity</strong> — Story points completed per sprint (predictability metric)</li>
        <li><strong>Burndown chart</strong> — Shows remaining work vs time in sprint</li>
        <li><strong>Definition of Done</strong> — Team agreement on what "done" means</li>
        <li><strong>Sprint Review</strong> — Demo completed work to stakeholders</li>
        <li><strong>Sprint Retrospective</strong> — Team improves process</li>
      </ul>
      <div class="exam-tip">🎯 Azure Boards integrates with GitHub: link commits, PRs, and issues to work items. Automatic work item state transitions on PR merge.</div>
    </div>
  </div>
</div>
<div id="boards-process" class="tab-panel">
  <table class="cmp-table" style="margin-bottom:16px"><thead><tr><th>Process Model</th><th>Work Item Types</th><th>Best For</th></tr></thead><tbody>
    <tr><td><strong style="color:#ec4899">Agile</strong></td><td>Epic, Feature, User Story, Task, Bug, Test Case</td><td>Most teams. Flexible, iterative. Standard Agile/Scrum.</td></tr>
    <tr><td><strong style="color:#50abf1">Scrum</strong></td><td>Epic, Feature, Product Backlog Item (PBI), Task, Bug, Impediment</td><td>Scrum teams. PBI instead of User Story. Impediment tracking.</td></tr>
    <tr><td><strong style="color:#f97316">CMMI</strong></td><td>Epic, Feature, Requirement, Task, Bug, Change Request, Review, Risk</td><td>Formal engineering. Compliance-heavy. Aerospace, defense.</td></tr>
    <tr><td><strong style="color:#22c55e">Basic</strong></td><td>Epic, Issue, Task</td><td>Smallest teams. Simple tracking. No Agile overhead.</td></tr>
  </tbody></table>
  <div class="exam-tip">🎯 Process model is chosen when creating a project — cannot be changed afterward. Agile and Scrum are most common in modern software teams.</div>
</div>
<div id="boards-analytics" class="tab-panel">
  <div class="grid g2">
    <div class="info-box" style="border-color:rgba(236,72,153,0.3);background:rgba(236,72,153,0.05)">
      <h4 style="color:#ec4899">Azure DevOps Dashboards</h4>
      <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
        <li>Customizable widgets: burndown, velocity, build results, test results, PRs</li>
        <li>Team-level or project-level dashboards</li>
        <li>Analytics views: filter and pivot work item data</li>
        <li>Power BI connector: export Azure DevOps data to Power BI</li>
        <li>Cumulative Flow Diagram: visualize WIP and throughput</li>
        <li>Lead time / cycle time analytics</li>
      </ul>
    </div>
    <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
      <h4 style="color:#50abf1">Notifications & Communication</h4>
      <ul style="font-size:12px;color:var(--text-dim);line-height:2;padding-left:14px">
        <li>Work item alerts: email on assignment, state change, comment</li>
        <li>Service hooks: trigger Slack, Teams, Jenkins on DevOps events</li>
        <li>Teams integration: surface boards and PRs in Microsoft Teams</li>
        <li>GitHub integration: link commits/PRs to work items via AB#123</li>
        <li>Delivery plans: visualize multiple team schedules in one view</li>
      </ul>
      <div class="exam-tip">🎯 GitHub AB#123 in a commit message automatically links to Azure Boards work item 123. Use in PR description to auto-close work items on merge.</div>
    </div>
  </div>
</div>` }
      ]
    },
    {
      id:'source-control', name:'Design & Implement Source Control', weight:'15-20%', color:'#14b8a6',
      sections: [
        { id:'git-strategy', title:'Git Branching Strategies', icon:'🌿',
          render: () => `
<div class="section-desc">Branching strategy directly impacts release velocity, team collaboration, and production stability. Choose based on team size and release cadence.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['GitFlow','Long-lived branches: main, develop, feature/*, release/*, hotfix/*. Structured releases. Best for versioned software with scheduled releases.','rgba(59,130,246,0.1)','#60a5fa'],
    ['GitHub Flow','Short-lived feature branches off main. PR → merge → deploy. Simple. Good for SaaS/continuous delivery. No develop branch.','rgba(34,197,94,0.1)','#22c55e'],
    ['Trunk-Based Development','All developers commit to trunk (main) daily. Feature flags for incomplete features. Highest velocity. Requires strong automated testing.','rgba(249,115,22,0.1)','#f97316']
  ].map(([n,d,bg,c])=>`<div style="padding:16px;border-radius:var(--radius);background:${bg};border:1px solid ${c}40"><div style="font-weight:700;font-size:14px;color:${c};margin-bottom:8px">${n}</div><div style="font-size:12px;color:var(--text-dim);line-height:1.6">${d}</div></div>`).join('')}
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Azure Repos Branch Policies</h4>
    <ul>
      <li><strong>Require PR before merge</strong> — No direct push to protected branches</li>
      <li><strong>Minimum reviewers</strong> — e.g. 2 required approvals</li>
      <li><strong>Required reviewer groups</strong> — Team leads must approve</li>
      <li><strong>Build validation</strong> — CI must pass before merge</li>
      <li><strong>Status checks</strong> — External checks (SonarQube, security scans)</li>
      <li><strong>Auto-complete</strong> — Auto-merge when all policies pass</li>
      <li><strong>Work item linking</strong> — Require linked work item for traceability</li>
    </ul>
    <div class="exam-tip">🎯 Branch policies enforce quality gates without manual overhead. Set them on main/develop to prevent broken builds in production.</div>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Git Large File Storage (LFS)</h4>
    <p>Git is bad at binary files (images, videos, binaries). Git LFS replaces large files with text pointers in Git and stores the actual content in a separate store.</p>
    <p style="margin-top:8px">Azure Repos supports Git LFS natively. Enable with: <code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-size:11px">git lfs track "*.psd"</code></p>
    <div class="exam-tip">🎯 Use Git LFS for: game assets, ML models, datasets, videos. Without it, cloning a repo with large binaries becomes very slow.</div>
  </div>
</div>` },

        { id:'github-actions', title:'GitHub Actions vs Azure Pipelines', icon:'🐙',
          render: () => `
<div class="section-desc">Both GitHub Actions and Azure Pipelines provide CI/CD automation, but they have different strengths. Understanding which to use for which scenario is tested in AZ-400.</div>
<table class="cmp-table" style="margin-bottom:16px"><thead><tr><th>Feature</th><th>GitHub Actions</th><th>Azure Pipelines</th></tr></thead><tbody>
  <tr><td>Source control</td><td>GitHub Repos (native)</td><td>Azure Repos, GitHub, Bitbucket, TFVC</td></tr>
  <tr><td>Syntax</td><td>YAML (.github/workflows/)</td><td>YAML or Classic (GUI)</td></tr>
  <tr><td>Marketplace</td><td>GitHub Marketplace (20k+ actions)</td><td>Azure Marketplace (extensions)</td></tr>
  <tr><td>Agents</td><td>GitHub-hosted (ubuntu, windows, mac) + self-hosted</td><td>Microsoft-hosted + self-hosted + VMSS agents</td></tr>
  <tr><td>Environments</td><td>Environments with protection rules</td><td>Environments with approval gates + checks</td></tr>
  <tr><td>Packages</td><td>GitHub Packages (npm, NuGet, Docker, Maven)</td><td>Azure Artifacts (npm, NuGet, Maven, Python, Universal)</td></tr>
  <tr><td>Security</td><td>OIDC, Dependabot, Secret Scanning, CodeQL</td><td>Service connections, variable groups, Key Vault integration</td></tr>
  <tr><td>Best for</td><td>Open source, GitHub-native teams, marketplace actions</td><td>Enterprise, complex approvals, VMSS agents, compliance</td></tr>
</tbody></table>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">GitHub Actions Workflow Structure</h4>
    <div class="code-block" style="font-size:11px">
<span class="kw">name</span>: CI/CD Pipeline
<span class="kw">on</span>:
  push: { branches: [main] }
  pull_request: { branches: [main] }

<span class="kw">jobs</span>:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: azure/login@v1
      with:
        client-id: <span class="str">\${{ secrets.AZURE_CLIENT_ID }}</span>
        tenant-id: <span class="str">\${{ secrets.AZURE_TENANT_ID }}</span>
        subscription-id: <span class="str">\${{ secrets.AZURE_SUB_ID }}</span>
    - run: az webapp deploy ...
    </div>
    <div class="exam-tip">🎯 Use azure/login with OIDC (client-id + tenant-id + subscription-id) instead of AZURE_CREDENTIALS secret — no long-lived credentials stored in GitHub.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure Artifacts & Package Feeds</h4>
    <p style="font-size:13px;color:var(--text-dim);margin-bottom:10px">Azure Artifacts hosts private package feeds for sharing code packages internally.</p>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${[['NuGet (.NET)','nuget.org compatible. Private packages. Push from pipeline with dotnet nuget push.'],['npm (Node.js)','npmjs.com compatible. Scoped packages (@myorg/package). .npmrc configuration.'],['Maven (Java)','Maven Central compatible. pom.xml settings.xml configuration.'],['PyPI (Python)','pip/twine compatible. Private Python packages. pip install --index-url.'],['Universal Packages','Any file type. CI build artifacts, scripts, binaries. No framework required.']].map(([n,d])=>`<div style="display:flex;gap:10px;font-size:12px;border-bottom:1px solid var(--border);padding:6px 0"><span style="font-weight:700;color:#50abf1;min-width:100px;flex-shrink:0">${n}</span><span style="color:var(--text-dim)">${d}</span></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Upstream sources: configure a feed to pull from public registries (nuget.org, npmjs.com) AND your private feed. Packages are cached in your feed for reliability.</div>
  </div>
</div>` }
      ]
    },
    {
      id:'pipelines', name:'Build & Release Pipelines', weight:'40-45%', color:'#0078d4',
      sections: [
        { id:'yaml-pipelines', title:'Azure Pipelines (YAML)', icon:'⚙️',
          render: () => `
<div class="section-desc">YAML pipelines are the modern way to define CI/CD in code (Pipeline as Code). Stored in your repo, versioned with your code.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div>
    <h4 style="font-size:13px;margin-bottom:10px">Pipeline Hierarchy</h4>
    <div style="display:flex;flex-direction:column;gap:6px">
      ${[
        ['Pipeline','The top-level YAML file (.azure-pipelines.yml). Triggered by events.','rgba(0,120,212,0.15)','#50abf1'],
        ['Stages','Major phases: Build, Test, Deploy-Dev, Deploy-Prod. Run sequentially or parallel.','rgba(124,77,255,0.15)','#a78bfa'],
        ['Jobs','Unit of work that runs on an agent. Jobs in a stage can run in parallel.','rgba(34,197,94,0.15)','#22c55e'],
        ['Steps','Individual tasks (script, AzureCLI, DotNetCoreCLI, etc.)','rgba(249,115,22,0.15)','#f97316']
      ].map(([n,d,bg,c])=>`<div style="padding:10px 14px;border-radius:8px;background:${bg};border:1px solid ${c}40;display:flex;gap:10px;align-items:flex-start"><div style="font-weight:700;font-size:12px;color:${c};min-width:70px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
  </div>
  <div>
    <h4 style="font-size:13px;margin-bottom:10px">Pipeline YAML Example</h4>
    <div class="code-block" style="font-size:11px">
<span class="kw">trigger</span>: [main, release/*]

<span class="kw">stages</span>:
- <span class="kw">stage</span>: Build
  <span class="kw">jobs</span>:
  - <span class="kw">job</span>: BuildJob
    <span class="kw">pool</span>:
      vmImage: ubuntu-latest
    <span class="kw">steps</span>:
    - task: DotNetCoreCLI@2
      inputs:
        command: build
    - task: DotNetCoreCLI@2
      inputs:
        command: test
    - task: PublishPipelineArtifact@1
      inputs:
        targetPath: $(Build.ArtifactStagingDirectory)

- <span class="kw">stage</span>: Deploy
  <span class="kw">dependsOn</span>: Build
  <span class="kw">condition</span>: succeeded()
  <span class="kw">jobs</span>:
  - <span class="kw">deployment</span>: DeployWeb
    <span class="kw">environment</span>: Production
    <span class="kw">strategy</span>:
      <span class="kw">runOnce</span>:
        deploy:
          steps:
          - task: AzureWebApp@1
    </div>
  </div>
</div>
<div class="grid g3">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Triggers</h4>
    <ul>
      <li><strong>CI trigger</strong> — Push to branch (include/exclude path filters)</li>
      <li><strong>PR trigger</strong> — Pull request opened/updated</li>
      <li><strong>Scheduled</strong> — Cron expression (nightly builds)</li>
      <li><strong>Pipeline trigger</strong> — Triggered by another pipeline completing</li>
      <li><strong>Manual</strong> — Run on demand from portal or API</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(34,197,94,0.3);background:rgba(34,197,94,0.05)">
    <h4 style="color:#22c55e">Environments & Approvals</h4>
    <ul>
      <li>Environments represent deployment targets (Dev, Staging, Production)</li>
      <li><strong>Approval checks</strong> — Human approval required before deploying</li>
      <li><strong>Business hours checks</strong> — Only deploy during business hours</li>
      <li><strong>Branch control</strong> — Only deploy from specific branches</li>
      <li><strong>Invoke Azure Function</strong> — Custom automated gate logic</li>
      <li><strong>Query Work Items</strong> — Gate on no open critical bugs</li>
    </ul>
    <div class="exam-tip">🎯 Use deployment jobs (not regular jobs) for environments — they track deployment history and support approvals.</div>
  </div>
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">Agents & Agent Pools</h4>
    <ul>
      <li><strong>Microsoft-hosted</strong> — ubuntu-latest, windows-latest, macos-latest. Ephemeral, clean each run.</li>
      <li><strong>Self-hosted</strong> — Your own VMs/containers. Access to internal resources. Custom tools. Faster (no tool installation).</li>
      <li><strong>Scale Set agents</strong> — VMSS as agent pool. Auto-scale based on pipeline queue.</li>
      <li><strong>Container agents</strong> — Run jobs in Docker containers (consistent environment).</li>
    </ul>
  </div>
</div>` },

        { id:'iac', title:'Infrastructure as Code', icon:'📋',
          render: () => `
<div class="section-desc">IaC treats infrastructure like software — versioned, tested, repeatable deployments. Azure supports ARM Templates, Bicep, and Terraform.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['ARM Templates','JSON-based. Azure-native. Verbose but powerful. Supports nested templates, linked templates, deployment scripts. All resources in one idempotent deployment.'],
    ['Bicep','DSL that compiles to ARM JSON. Much cleaner syntax. Azure-native. No state file. Modules for reusability. Use this over ARM for new projects.'],
    ['Terraform','Multi-cloud. State file (remote state in Azure Storage). Plan/Apply workflow. Huge provider ecosystem. HCL syntax.']
  ].map(([n,d])=>`<div class="svc-card"><div class="svc-name">${n}</div><div class="svc-desc">${d}</div></div>`).join('')}
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Bicep Example</h4>
    <div class="code-block" style="font-size:11px">
<span class="kw">param</span> location <span class="str">string</span> = resourceGroup().location
<span class="kw">param</span> appName <span class="str">string</span>

<span class="kw">resource</span> appServicePlan <span class="str">'Microsoft.Web/serverfarms@2022-03-01'</span> = {
  name: <span class="str">'${appName}-plan'</span>
  location: location
  sku: {
    name: <span class="str">'S1'</span>
    tier: <span class="str">'Standard'</span>
  }
}

<span class="kw">resource</span> webApp <span class="str">'Microsoft.Web/sites@2022-03-01'</span> = {
  name: appName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
  }
}

<span class="kw">output</span> webAppUrl <span class="str">string</span> = webApp.properties.defaultHostName
    </div>
  </div>
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">IaC in CI/CD Best Practices</h4>
    <ul>
      <li><strong>What-if / Plan</strong> — Preview changes before applying. ARM what-if, Terraform plan.</li>
      <li><strong>Validation</strong> — ARM template validation, Bicep build, terraform validate.</li>
      <li><strong>Linting</strong> — arm-ttk (ARM Template Toolkit), bicep linter, tflint.</li>
      <li><strong>Drift detection</strong> — Compare deployed state vs. desired state regularly.</li>
      <li><strong>Secret injection</strong> — Pass secrets from Key Vault at deploy time, never in templates.</li>
      <li><strong>Module libraries</strong> — Bicep registry, Terraform module registry for reusable components.</li>
      <li><strong>Immutable infra</strong> — Replace instead of modify (blue-green infra deployments).</li>
    </ul>
    <div class="exam-tip">🎯 Use OIDC (Workload Identity Federation) from GitHub Actions to Azure — no secrets stored in GitHub!</div>
  </div>
</div>` },

        { id:'container-ci', title:'Container CI/CD & GitOps', icon:'🐳',
          render: () => `
<div class="section-desc">Modern SRE/DevOps uses containers and Kubernetes. CI/CD must handle image building, scanning, pushing, and deploying to AKS.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.05)">
    <h4 style="color:#60a5fa">Container CI/CD Flow</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      ${['1. Code push → trigger pipeline','2. Build Docker image (multi-stage for smaller images)','3. Scan image (Trivy, Defender, Grype) — fail on HIGH/CRITICAL CVEs','4. Push to Azure Container Registry (ACR)','5. Update K8s manifests / Helm chart with new image tag','6. Deploy to AKS (kubectl apply, helm upgrade, or GitOps)','7. Run smoke tests / integration tests','8. Promote to staging → approval → production'].map((s,i)=>`<div style="display:flex;gap:10px;align-items:flex-start;font-size:12px"><span style="background:rgba(59,130,246,0.2);color:#60a5fa;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">${i+1}</span><span style="color:var(--text-dim)">${s.replace(/^\d+\. /,'')}</span></div>`).join('')}
    </div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">GitOps with Flux/ArgoCD</h4>
    <p>GitOps = Git is the single source of truth for cluster state. An operator (Flux, ArgoCD) continuously reconciles the cluster to match Git.</p>
    <ul style="margin-top:10px">
      <li><strong>Pull model</strong> — Operator pulls from Git (vs. CI pushing to cluster)</li>
      <li><strong>No cluster credentials in CI</strong> — The operator has cluster access, CI doesn't</li>
      <li><strong>Auto-reconciliation</strong> — Manual changes detected and reverted</li>
      <li><strong>Azure GitOps</strong> — Arc-enabled Kubernetes extension for Flux v2</li>
      <li><strong>AKS GitOps</strong> — Built-in Flux v2 extension for AKS clusters</li>
    </ul>
    <div class="exam-tip">🎯 GitOps solves "configuration drift" — the cluster is always in the state described in Git. Any deviation is auto-corrected.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
  <h4 style="color:#f87171">Deployment Strategies</h4>
  <div class="grid g4">
    ${[
      ['Rolling','Update pods gradually. Some old, some new running simultaneously. Kubernetes default. Low risk, slow.'],
      ['Blue/Green','Two identical envs. Switch traffic instantly. Easy rollback (switch back). Double infrastructure cost.'],
      ['Canary','Route small % to new version first. Gradually increase. Catch issues early with real traffic.'],
      ['Feature Flags','Code deployed everywhere, feature toggled on for % of users. Decouple deploy from release.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2)"><div style="font-weight:700;font-size:12px;color:#f87171;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` }
        ,{ id:'load-testing-rings', title:'Azure Load Testing & Deployment Rings', icon:'🚀',
          render: () => `
<div class="section-desc">Performance testing in pipelines and progressive deployment patterns are key DevOps practices. Azure Load Testing integrates load tests into your CI/CD; deployment rings reduce blast radius of bad releases.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Azure Load Testing</h4>
    <ul style="font-size:12px;color:var(--text-dim);line-height:2.2;padding-left:14px">
      <li><strong>Managed JMeter service</strong> — Run JMeter test plans at scale without managing infrastructure</li>
      <li><strong>URL-based tests</strong> — Quick HTTP load tests without writing JMeter scripts</li>
      <li><strong>Up to millions of users</strong> — Scale across multiple Azure regions for realistic global load</li>
      <li><strong>Pipeline integration</strong> — AzureLoadTest@1 task in Azure Pipelines / GitHub Actions</li>
      <li><strong>Pass/fail criteria</strong> — Define thresholds (p99 < 500ms, error rate < 1%) — fail the build if exceeded</li>
      <li><strong>Server-side metrics</strong> — Correlate load with Azure Monitor metrics from your VMs/AKS/App Service</li>
      <li><strong>Integration with App Insights</strong> — See requests, dependencies, and exceptions during the test</li>
    </ul>
    <div class="exam-tip">🎯 Add load tests as a pipeline gate before production deployment. If p99 latency exceeds threshold, the deployment is blocked. Catches performance regressions early.</div>
  </div>
  <div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
    <h4 style="color:#14b8a6">Deployment Rings (Progressive Rollout)</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:8px">Reduce blast radius by deploying to small user groups first, then expanding if metrics are healthy.</p>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:10px">
      ${[
        ['Ring 0 — Internal','Microsoft / engineering team. Catches showstoppers immediately.','rgba(0,120,212,0.1)','#50abf1'],
        ['Ring 1 — Insiders','Internal opt-in users (~1-5% of users). 24-48 hour soak.','rgba(76,255,179,0.1)','#4cffb3'],
        ['Ring 2 — Early Adopters','Volunteer customers / dogfooding (~10%). 1 week soak.','rgba(255,214,0,0.1)','#ffd700'],
        ['Ring 3 — General Availability','All users. Monitor for 1-2 weeks before declaring stable.','rgba(76,255,179,0.1)','#4cffb3']
      ].map(([n,d,bg,c])=>`<div style="padding:8px 12px;border-radius:6px;background:${bg};border:1px solid ${c}40"><div style="font-size:12px;font-weight:700;color:${c};margin-bottom:2px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Rings + Feature Flags = the safest deployment pattern. Even within a ring, individual features can be flagged off if metrics degrade. Used by Microsoft for Windows updates and Office 365.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(236,72,153,0.3);background:rgba(236,72,153,0.05)">
  <h4 style="color:#ec4899">Service Hooks & Webhooks</h4>
  <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Integrate Azure DevOps with external systems by triggering actions on events.</p>
  <div class="grid g3">
    ${[
      ['Slack / Teams','Post pipeline run results, work item updates, PR notifications. Keeps the team aware in real time.'],
      ['Jenkins / external CI','Trigger Jenkins builds when Azure Repos push happens. Used in hybrid CI environments.'],
      ['ServiceNow / Jira','Create incident tickets automatically on pipeline failures. Bridge dev and ops workflows.'],
      ['Custom webhook','POST JSON to any HTTP endpoint. Build your own integrations.'],
      ['Microsoft Power Automate','Low-code workflows. Trigger Power Automate flows on DevOps events.'],
      ['Azure Functions','Serverless event handler. Run custom code on push, build, deploy, work item events.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(236,72,153,0.06);border:1px solid rgba(236,72,153,0.2)"><div style="font-size:12px;font-weight:700;color:#ec4899;margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
  <div class="exam-tip" style="margin-top:10px">🎯 Service hooks are project-scoped (set per Azure DevOps project). Configure once, fire on every matching event. No code needed for built-in integrations.</div>
</div>` }
      ]
    },
    {
      id:'security-pipelines', name:'Security & Compliance in Pipelines', weight:'10-15%', color:'#ef4444',
      sections: [
        { id:'devsecops', title:'DevSecOps & Shift Left', icon:'🔒',
          render: () => `
<div class="section-desc">Shift Left = move security earlier in the SDLC. Don't scan in production — catch vulnerabilities during development and CI.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.05)">
    <h4 style="color:#f87171">Security in the CI Pipeline</h4>
    <ul>
      <li><strong>SAST (Static Analysis)</strong> — Scan source code. SonarQube, GitHub CodeQL, Semgrep. Find: SQL injection, XSS, hardcoded secrets.</li>
      <li><strong>SCA (Dependency Scanning)</strong> — Scan for vulnerable libraries. OWASP Dependency-Check, GitHub Dependabot, Snyk.</li>
      <li><strong>Secret Scanning</strong> — Detect committed secrets. GitHub Secret Scanning, GitLeaks, truffleHog.</li>
      <li><strong>Container Scanning</strong> — Scan Docker images. Trivy, Grype, Defender for Containers, ACR scanning.</li>
      <li><strong>IaC Scanning</strong> — Scan ARM/Bicep/Terraform for misconfigs. Checkov, tfsec, Defender for DevOps.</li>
    </ul>
  </div>
  <div class="info-box" style="border-color:rgba(249,115,22,0.3);background:rgba(249,115,22,0.05)">
    <h4 style="color:#f97316">DAST & Runtime Security</h4>
    <ul>
      <li><strong>DAST (Dynamic Analysis)</strong> — Test running application. OWASP ZAP, Burp Suite. Find: auth issues, injection points.</li>
      <li><strong>Penetration Testing</strong> — Manual/automated attack simulation. Must notify Microsoft first via Microsoft Penetration Testing Rules of Engagement.</li>
      <li><strong>Runtime protection</strong> — Defender for Containers detects anomalous behavior in running containers (crypto mining, privilege escalation).</li>
    </ul>
    <div class="exam-tip">🎯 You must notify Microsoft before running pen tests against Azure infrastructure. No prior approval needed for PaaS services. Never test other customers' resources.</div>
  </div>
</div>
<div class="info-box" style="border-color:rgba(20,184,166,0.3);background:rgba(20,184,166,0.05)">
  <h4 style="color:#14b8a6">Secret Management in Pipelines</h4>
  <div class="grid g3">
    ${[
      ['Pipeline Variables (encrypted)','Store in Azure DevOps / GitHub Secrets. Masked in logs. NOT ideal for production secrets.'],
      ['Azure Key Vault task','AzureKeyVault@2 task fetches secrets at runtime. Pipeline never stores them. Best practice.'],
      ['OIDC / Workload Identity','GitHub Actions → Azure without storing any credentials. Azure AD issues short-lived tokens.']
    ].map(([n,d])=>`<div style="padding:10px;border-radius:8px;background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.2)"><div style="font-weight:700;font-size:12px;color:#14b8a6;margin-bottom:4px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
  </div>
</div>` }
      ]
    },
    {
      id:'monitoring-feedback', name:'Instrumentation & Monitoring', weight:'10-15%', color:'#eab308',
      sections: [
        { id:'sre-monitoring', title:'SRE Observability', icon:'📊',
          render: () => `
<div class="section-desc">SRE monitoring goes beyond "is it up?" to measuring service reliability through SLIs, SLOs, and error budgets.</div>
<div class="grid g3" style="margin-bottom:16px">
  ${[
    ['SLI (Indicator)','What you measure: error rate, latency p99, availability %. The metric itself.\nExample: "% of requests under 200ms"'],
    ['SLO (Objective)','Your reliability target: 99.9% success rate, p99 latency < 500ms.\nSet internally — your promise to yourself and users.'],
    ['SLA (Agreement)','Contractual commitment to customers. Usually less aggressive than SLO (to give buffer).\nBreaching = credits/penalties.']
  ].map(([n,d])=>`<div class="svc-card"><div class="svc-name">${n}</div><div class="svc-desc" style="white-space:pre-line">${d}</div></div>`).join('')}
</div>
<div class="grid g2">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Error Budget</h4>
    <p>Error budget = 1 - SLO. If SLO = 99.9%, error budget = 0.1% of requests can fail per month (43 min downtime).</p>
    <ul style="margin-top:8px">
      <li>Error budget positive → can ship features, run experiments</li>
      <li>Error budget negative → freeze features, focus on reliability</li>
      <li>Azure Chaos Studio → controlled experiments to test within error budget</li>
    </ul>
    <div class="exam-tip">🎯 Error budget = how much unreliability you're allowed. SRE teams use it to balance reliability work vs feature work.</div>
  </div>
  <div class="info-box" style="border-color:rgba(124,77,255,0.3);background:rgba(124,77,255,0.05)">
    <h4 style="color:#a78bfa">Application Insights Key Features</h4>
    <ul>
      <li><strong>Distributed Tracing</strong> — Track requests across microservices with correlation IDs.</li>
      <li><strong>Availability Tests</strong> — Ping URL from 5 global locations every 5 minutes.</li>
      <li><strong>Smart Detection</strong> — ML-based anomaly detection (sudden increase in failure rate).</li>
      <li><strong>Live Metrics</strong> — Real-time streaming metrics (0-second delay).</li>
      <li><strong>User Flows</strong> — Visualize how users move through your application.</li>
      <li><strong>Application Map</strong> — Topology view of all service dependencies with health indicators.</li>
    </ul>
  </div>
</div>` },

        { id:'appinsights-devops', title:'Application Insights & Database DevOps', icon:'📊',
          render: () => `
<div class="section-desc">Continuous monitoring with Application Insights closes the DevOps loop. Database DevOps handles schema changes safely in CI/CD pipelines.</div>
<div class="grid g2" style="margin-bottom:16px">
  <div class="info-box" style="border-color:rgba(234,179,8,0.3);background:rgba(234,179,8,0.05)">
    <h4 style="color:#eab308">Application Insights in DevOps</h4>
    <div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">
      ${[
        ['Continuous Monitoring Gate','Release pipeline waits for App Insights alert to clear before promoting to next environment. Zero-alert = proceed.'],
        ['Deployment Markers','Annotate App Insights with deployment events. Correlate new deployment with change in error rate or latency.'],
        ['Feature Flag Tracking','Track feature flag usage, conversion rates, and A/B test results via custom events.'],
        ['Distributed Tracing','End-to-end request tracking across microservices. Trace ID propagated in headers. See bottlenecks.'],
        ['Availability Tests','Ping tests from 5 global locations every 1-5 min. Multi-step web tests for complex flows.'],
        ['Smart Detection','ML-based anomaly detection. Fires alert when failure rate suddenly increases after a deployment.']
      ].map(([n,d])=>`<div style="padding:8px;border-radius:6px;background:rgba(234,179,8,0.06);border:1px solid rgba(234,179,8,0.2)"><div style="font-size:12px;font-weight:700;color:#eab308;margin-bottom:3px">${n}</div><div style="font-size:11px;color:var(--text-dim)">${d}</div></div>`).join('')}
    </div>
    <div class="exam-tip">🎯 Continuous monitoring gate = don't promote to production if App Insights shows elevated errors from the staging environment. Combine with Azure Monitor alerts.</div>
  </div>
  <div class="info-box" style="border-color:rgba(0,120,212,0.3);background:rgba(0,120,212,0.05)">
    <h4 style="color:#50abf1">Database DevOps — Schema Migrations</h4>
    <p style="font-size:12px;color:var(--text-dim);margin-bottom:10px">Database schema changes must be versioned and deployed as part of the CI/CD pipeline. Several patterns exist:</p>
    <table class="cmp-table"><thead><tr><th>Tool/Pattern</th><th>Approach</th><th>Use With</th></tr></thead><tbody>
      <tr><td><strong>DACPAC</strong></td><td>Declare desired schema state; tool generates diff script</td><td>SQL Server, Azure SQL</td></tr>
      <tr><td><strong>EF Core Migrations</strong></td><td>Code-first; migration files auto-generated from model changes</td><td>.NET apps with Entity Framework</td></tr>
      <tr><td><strong>Flyway</strong></td><td>Version-numbered SQL scripts; run in order, never re-run</td><td>Any SQL database, Java/Python apps</td></tr>
      <tr><td><strong>Liquibase</strong></td><td>XML/YAML changelogs; database-agnostic; rollback support</td><td>Enterprise multi-DB environments</td></tr>
      <tr><td><strong>Expand/Contract</strong></td><td>Add new column (expand), migrate data, remove old column (contract) across 2 deployments</td><td>Zero-downtime migrations</td></tr>
    </tbody></table>
    <div class="exam-tip">🎯 Expand/Contract (aka Parallel Change) = add new column, both old and new code work, then remove old column in a later deployment. Enables zero-downtime DB migrations.</div>
  </div>
</div>` }
      ]
    }
  ],
  quiz: [
    { q:'Which branching strategy requires all developers to commit to a single branch (trunk/main) daily and uses feature flags for incomplete features?', a:2, domain:'Source Control', domainColor:'rgba(20,184,166,0.15)', domainText:'#14b8a6', opts:['GitFlow','GitHub Flow','Trunk-Based Development','Feature Branch Workflow'], exp:'Trunk-Based Development (TBD) requires all devs to commit to main at least daily. Feature flags hide incomplete features from users. It maximizes integration frequency and reduces merge hell. Most associated with high-performing engineering teams.' },
    { q:'In an Azure Pipeline YAML, which component represents the largest unit of work that runs on a single agent machine?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Stage','Job','Step','Task'], exp:'A Job is the unit of work that runs on a single agent. Multiple steps/tasks run within a job on the same agent. Multiple jobs in a stage can run in parallel on different agents. Stages are collections of jobs.' },
    { q:'You want to deploy to production only after a specific person approves. What Azure DevOps feature enables this?', a:2, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Pipeline variable groups','Service connections','Environment approval checks','Branch policies'], exp:'Environment approval checks require designated approvers to approve before the pipeline can deploy to that environment. This is set up on the Environment resource in Azure DevOps, not in the YAML file itself.' },
    { q:'Which IaC tool uses a state file to track deployed resources and requires you to run "plan" before "apply"?', a:2, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['ARM Templates','Bicep','Terraform','Azure CLI scripts'], exp:'Terraform maintains a state file (locally or in remote storage like Azure Storage) that maps real infrastructure to your configuration. "terraform plan" shows what will change; "terraform apply" makes the changes.' },
    { q:'Static Application Security Testing (SAST) scans which of the following?', a:0, domain:'Security', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Source code without executing it','A running application by sending test HTTP requests','Container images for vulnerable packages','Infrastructure-as-Code files for misconfigurations'], exp:'SAST analyzes source code statically (without running it) to find security vulnerabilities: SQL injection patterns, XSS, hardcoded credentials, buffer overflows. Tools: SonarQube, CodeQL, Semgrep.' },
    { q:'A GitHub Actions workflow needs to deploy to Azure without storing any Azure credentials as GitHub secrets. Which approach should you use?', a:1, domain:'Security', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Azure CLI task with storage account key','Workload Identity Federation (OIDC) between GitHub and Azure AD','Store service principal client secret in GitHub secrets','Use a managed identity with GitHub Actions runner'], exp:'Workload Identity Federation (OIDC) allows GitHub Actions to exchange a GitHub-issued OIDC token for a short-lived Azure AD token. No long-lived secrets stored anywhere. Azure AD validates the token claims (repo, branch, environment) before issuing the Azure token.' },
    { q:'What is an "error budget" in SRE?', a:2, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['The monthly cost budget for monitoring tools','The maximum allowed number of bugs per sprint','The amount of unreliability permitted (1 - SLO). Consumed by incidents and experiments.','The time allocated to fixing production errors each sprint'], exp:'Error budget = 1 - SLO. If your SLO is 99.9%, your error budget is 0.1% of requests failing per month (~43 minutes downtime/month). Positive budget → ship features. Negative budget → freeze features and improve reliability.' },
    { q:'Which deployment strategy runs two identical production environments and switches traffic between them for zero-downtime deployments?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Rolling deployment','Blue/green deployment','Canary deployment','A/B testing'], exp:'Blue/green deployment maintains two identical environments (blue = current prod, green = new version). Traffic is switched from blue to green atomically. Rollback = switch back to blue. Downside: double infrastructure cost while both are running.' },
    { q:'Azure Chaos Studio is used for what purpose in SRE?', a:0, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Inject controlled faults (network latency, CPU stress, zone outages) to test system resilience','Monitor application performance metrics','Scan for security vulnerabilities in pipelines','Manage feature flag rollouts'], exp:'Azure Chaos Studio enables chaos engineering — deliberately injecting faults into your system to discover weaknesses before they cause real incidents. Experiments: VM shutdown, network latency, CPU pressure, AKS pod deletion, zone outage simulation.' },
    { q:'In a multi-stage Azure Pipeline YAML, you have a Deploy stage that depends on a Build stage. If the Build stage fails, what happens to Deploy?', a:0, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Deploy is skipped automatically because of the dependsOn relationship and default condition succeeded()','Deploy runs anyway because stages are independent','Deploy must be manually triggered','Deploy retries the Build stage first'], exp:'By default, a stage with dependsOn only runs if the dependent stage succeeded (condition: succeeded()). If Build fails, Deploy is automatically skipped. You can override with custom conditions like: condition: always() or condition: failed().' },
    { q:'What is the purpose of "Environment" resources in Azure Pipelines?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['To define the build agent pool for each stage','To track deployments, enable approval gates, and provide deployment history per target environment','To store environment variables for the pipeline','To configure infrastructure in the target environment'], exp:'Environments in Azure Pipelines represent deployment targets (Dev, Staging, Production). They track deployment history, support approval gates (human approval before deployment), branch control, and business hours checks. Deployment jobs target environments.' },
    { q:'Which GitHub Actions feature allows workflows to authenticate to Azure without storing any long-lived secrets?', a:2, domain:'Security', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Azure service principal stored in GitHub Secrets','Azure CLI task with storage account key','Workload Identity Federation (OIDC) — GitHub exchanges short-lived token for Azure AD token','Personal access token stored in repository settings'], exp:'Workload Identity Federation lets GitHub Actions exchange a GitHub-issued OIDC token for a short-lived Azure AD access token. No secrets stored in GitHub. Azure validates the token claims (repository, branch, environment) before issuing the Azure token.' },
    { q:'What is "Infrastructure Drift" and how does Azure Policy help?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Network latency between infrastructure components; fixed by CDN','When deployed infrastructure diverges from the desired IaC definition; Azure Policy with DeployIfNotExists auto-remediates drift','When infrastructure costs exceed budget; detected by Cost Management','When VMs become unhealthy; resolved by Azure Automation runbooks'], exp:'Infrastructure drift occurs when someone manually modifies a resource that was deployed by IaC — the real state no longer matches the desired state. Azure Policy\'s DeployIfNotExists and Modify effects can auto-remediate drift by continuously enforcing the desired configuration.' },
    { q:'A team wants to release a new feature to 5% of users first, then gradually increase to 100% over a week while monitoring metrics. Which pattern is this?', a:0, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Progressive (Canary) rollout with traffic splitting','Blue/green deployment','Rolling deployment','Recreate deployment'], exp:'Canary/Progressive rollout releases to a small percentage first (the "canary in the coal mine"). Monitor key metrics (error rate, latency). If healthy, progressively route more traffic. Azure Front Door and App Service support weighted traffic splitting for canary deployments.' },
    { q:'Which DORA (DevOps Research and Assessment) metric measures how quickly a team can restore service after an incident?', a:3, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Deployment Frequency','Lead Time for Changes','Change Failure Rate','Mean Time to Recovery (MTTR)'], exp:'The 4 DORA metrics: Deployment Frequency (how often you deploy), Lead Time for Changes (idea to production), Change Failure Rate (% of changes causing incidents), Mean Time to Recovery (how fast you restore service). MTTR is the measure of recovery speed.' },
    { q:'You need to share a NuGet package internally across multiple Azure DevOps projects. Which service do you use?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Azure Blob Storage with public access','Azure Artifacts feed','GitHub Packages','Azure Container Registry'], exp:'Azure Artifacts provides private package feeds for NuGet, npm, Maven, Python (pip), and Universal packages. Packages are scoped to organization, project, or feed level. Upstream sources allow caching packages from public registries (nuget.org, npmjs.com).' },
    { q:'What is the purpose of a "Pull Request Build Validation" branch policy in Azure Repos?', a:2, domain:'Source Control', domainColor:'rgba(20,184,166,0.15)', domainText:'#14b8a6', opts:['Automatically approve the PR when all reviews are complete','Merge the PR when the CI pipeline passes','Block PR merges unless the CI build succeeds — prevents broken code from merging to protected branches','Notify all team members about the PR via email'], exp:'Build Validation is a branch policy that requires a CI pipeline to complete successfully before a PR can be merged. If the build fails, the PR is blocked. This prevents developers from merging code that would break the main branch.' },
    { q:'In GitOps, what is the "pull model" and why is it more secure than a "push model"?', a:0, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['An operator inside the cluster pulls changes from Git — the CI pipeline never needs credentials to access the cluster','Changes are pulled from the cluster to Git for version control','Developers pull feature branches and push to a staging branch','The cluster pulls container images directly from the registry without pipelines'], exp:'Pull model (GitOps): a controller (Flux, ArgoCD) inside the cluster pulls desired state from Git. The CI/CD pipeline only pushes to Git — it never connects to the cluster. This is more secure because the cluster credentials never leave the cluster environment.' },
    { q:'Which type of automated security scan examines a RUNNING application by sending malicious HTTP requests to find vulnerabilities?', a:1, domain:'Security', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['SAST (Static Application Security Testing)','DAST (Dynamic Application Security Testing)','SCA (Software Composition Analysis)','IaC scanning'], exp:'DAST (Dynamic Application Security Testing) tests a running application: sends crafted HTTP requests, analyzes responses, and finds vulnerabilities like SQL injection, XSS, auth bypasses. Tools: OWASP ZAP, Burp Suite. SAST analyzes source code statically without running it.' },
    { q:'What does "shift left" mean in the context of DevSecOps?', a:2, domain:'Security', domainColor:'rgba(239,68,68,0.15)', domainText:'#f87171', opts:['Moving production infrastructure to the left side of the data center','Shifting deployment responsibilities to the left-hand side of the org chart','Moving security testing earlier in the SDLC — finding vulnerabilities during development rather than in production','Shifting log analysis to a left-aligned dashboard'], exp:'Shift Left = move security earlier in the Software Development Life Cycle. Traditional security happens after deployment (right of the timeline). Shift Left means: security requirements in design, SAST/secret scanning in commit hooks, dependency scanning in CI. Much cheaper to fix early.' },
    { q:'What is the purpose of Azure Test Plans in the DevOps lifecycle?', a:1, domain:'Processes', domainColor:'rgba(236,72,153,0.15)', domainText:'#ec4899', opts:['Automatically run unit tests in the CI pipeline','Manage manual test cases, test suites, and exploratory testing sessions with rich traceability to work items','Schedule and run load tests against your application','Analyze code quality and suggest test improvements using AI'], exp:'Azure Test Plans provides: manual test case management (organized in test suites), exploratory testing (ad-hoc testing with session-based tracking), test execution tracking, and defect creation. All linked to User Stories/work items for full traceability. Automated tests run in Azure Pipelines, not Test Plans.' },
    { q:'Which pipeline caching strategy reduces CI build times by reusing previously downloaded package dependencies?', a:0, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Cache task in Azure Pipelines with a cache key based on the lock file hash (e.g. package-lock.json)','Store dependencies in Azure Blob Storage and download at build start','Use a self-hosted agent with pre-installed packages','Download packages from a local mirror server'], exp:'The Azure Pipelines Cache task saves and restores a directory (e.g. node_modules) keyed by a hash of the lock file. If the lock file hash matches a previous build, the cache is restored — no npm install needed. Cuts build times from minutes to seconds for stable dependencies.' },
    { q:'In Azure Boards, what does linking a commit message with "AB#123" accomplish?', a:2, domain:'Processes', domainColor:'rgba(236,72,153,0.15)', domainText:'#ec4899', opts:['It creates a new work item #123 automatically','It assigns the commit to sprint #123','It automatically links the GitHub commit to Azure Boards work item #123, enabling traceability from code to requirement','It triggers a pipeline run for work item 123'], exp:'GitHub/Azure Repos commits containing "AB#123" in the message automatically link to Azure Boards work item 123. This provides end-to-end traceability: requirement (Work Item) → code change (Commit) → build (Pipeline) → deployment. PR descriptions with "fixes AB#123" automatically close the work item on merge.' },
    { q:'What is the Expand/Contract (Parallel Change) pattern used for in Database DevOps?', a:1, domain:'Pipelines', domainColor:'rgba(0,120,212,0.15)', domainText:'#50abf1', opts:['Expanding a database file size and then contracting it to reclaim space','Making zero-downtime database schema changes by adding the new schema alongside the old, migrating data, then removing the old schema across multiple deployments','Expanding database replicas during peak load and contracting during off-hours','Parallel testing of database changes in staging and production simultaneously'], exp:'Expand/Contract: Phase 1 (Expand) — add new column/table while keeping old one, both app versions work. Phase 2 (Migrate) — background job migrates data to new structure. Phase 3 (Contract) — remove old column/table after all deployments use new structure. Avoids locking and downtime during schema migrations.' },
    { q:'A DORA metric shows your team\'s "Lead Time for Changes" is 3 weeks. What does this measure and what does improving it look like?', a:0, domain:'Monitoring', domainColor:'rgba(234,179,8,0.15)', domainText:'#eab308', opts:['Time from code commit to production deployment — improve by automating CI/CD, removing approval bottlenecks, deploying smaller batches more frequently','Time from sprint planning to sprint review — improve by shortening sprint length','Time from customer bug report to fix deployment — improve by prioritizing bugs over features','Time from hire to first deployment — improve by better onboarding'], exp:'Lead Time for Changes (one of 4 DORA metrics) measures the time from a code commit to it running in production. Elite performers achieve <1 hour. Improvements: fully automated CI/CD pipeline, trunk-based development (no long-lived branches), feature flags (merge incomplete features safely), smaller deployable units.' },
  ]
};
