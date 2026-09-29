export type Project = {
  slug: string
  title: string
  summary: string
  problem: string
  solution: string
  architecture: string[]
  decisions: string[]
  outcomes: string
  repoUrl?: string

  // Optional portfolio helpers
  tags?: string[]
  highlights?: string[]
}

export const projects: Project[] = [
  {
    slug: "grounded-research-assistant",
    title: "Grounded Research Assistant: Evidence-Backed Paper Analysis",
    summary:
      "Every claim, traced to its source. A local multi-agent system that turns a research paper into a structured, evidence-backed report (summary, key findings, replication checklist, and peer-review critique) in which each finding points back to the passage that supports it.",
    problem:
      "Researchers face more papers than they can read: arXiv alone receives over 20,000 new submissions a month. Reviewing each one means extracting claims, experimental setup, and limitations by hand, and the results vary from reviewer to reviewer. Reproducibility suffers too: in a 2016 Nature survey, more than 70% of researchers reported failing to reproduce another scientist's experiments. Generic AI summarizers do not solve this. They paraphrase from memory, cite nothing, and cannot be audited, and unpublished or proprietary papers often cannot be sent to cloud AI services at all.",
    solution:
      "A five-stage LangGraph pipeline that runs entirely on local models. A planner turns the user's goal into specific analysis tasks, parallel workers complete each task using only passages retrieved from the paper, an independent reviewer checks the claims against the source, and the results compile into a validated JSON report.",
    architecture: [
      "Stateful LangGraph pipeline: Loader, Planner, parallel Workers, Reviewer, Compiler.",
      "Per-paper Chroma vector index built with local nomic-embed-text embeddings.",
      "Eight Pydantic output schemas enforced on every task.",
      "Local inference through Ollama, with a separate model performing the grounding review.",
      "FastAPI backend with a Streamlit interface and downloadable JSON report.",
    ],
    decisions: [
      "Retrieval-grounded generation. Each worker sees only the most relevant passages from the paper and is told to leave a field empty rather than guess, so every finding can be traced back to the exact text that supports it.",
      "Planner–executor decomposition. A planner breaks the goal into separate tasks, LangGraph runs them in parallel, and the results merge automatically into one shared state, so a multi-part analysis runs all at once instead of step by step.",
      "Generator–verifier separation. A different model re-reads the paper and checks the workers' claims, flagging unsupported ones by severity, so the model that wrote an answer is never the one grading it.",
      "Schema-constrained outputs. Every model call must return one of eight fixed formats, so results are consistent, machine-readable, and ready for other tools without fragile text parsing.",
      "On-device inference for data residency. Every model runs locally through Ollama, so unpublished or confidential papers never leave the machine, and there is no per-paper API cost.",    ],
    outcomes:
      "Turns a research PDF into an audit-ready report covering summary, key findings with supporting evidence, results, limitations, experimental setup, replication steps, algorithm extraction, and peer-review critique, each validated against a schema and checked for grounding. It runs entirely on a local machine with no API cost, making it usable on confidential and pre-publication work. The pattern (planning, parallel retrieval-grounded execution, and independent review) extends to any document-heavy workflow: legal discovery, technical due diligence, and compliance review.",
    repoUrl: "https://github.com/zeelgithub/grounded-research-assistant",
    tags: ["LangGraph", "RAG", "Parallel Agents", "Local LLMs"],
    highlights: [
      "Every claim paired with a supporting passage from the paper",
      "Planner, parallel workers, and an independent reviewer",
      "Runs fully local: no API cost, no data leaves the machine",
    ],
  },
  {
    slug: "autonomous-debugger-assistant",
    title: "Autonomous Debugger Assistant: Agentic CI Failure Repair",
    summary:
      "From red build to tested fix. A multi-agent system that takes a failing CI run, finds the root cause in the repository, writes a minimal patch, and checks it against the real test suite, retrying up to three times before handing the case to a human.",
    problem:
      "Developers spend more than 17 hours a week on maintenance work such as debugging, according to Stripe's Developer Coefficient report, and most CI failures follow the same manual routine: read the logs, trace the stack to a file, write a patch, rerun the tests, repeat. The work is repetitive, costly, and pulls senior engineers off feature delivery. Handing it to an LLM naively adds new risk: a model that writes code without running tests has no evidence its fix works, and one with unchecked write access can damage the codebase.",
    solution:
      "A LangGraph state machine with specialized agents for planning, log analysis, code navigation, and fix generation. Deterministic tools perform every side effect: cloning the repository, applying the patch, and running pytest. An evaluator agent reads the actual test results and decides whether to accept the fix, retry with a new patch, or escalate to a human, with a hard cap of three iterations.",
    architecture: [
      "LangGraph StateGraph with typed shared state and per-thread checkpointing.",
      "Agents: Planner, Log Analyzer, Code Navigator, Fix Generator, Evaluator.",
      "Deterministic tools: repository clone, file mapping, patch application with backup, pytest execution.",
      "Evaluator-driven conditional edge loops back to the Fix Generator, capped at three iterations.",
      "Provider-agnostic model layer with runtime selection between OpenAI and Ollama.",
    ],
    decisions: [
      "Explicit state machine over prompt chaining. The workflow is a LangGraph state machine whose shared state is saved at every step, so each decision can be inspected and every run traced from start to finish.",
      "Closed-loop verification. Every fix is checked by running the repository's real test suite, and the evaluator decides on the actual test results, not on the model's own opinion of its patch.",
      "Bounded autonomy. One evaluator makes every success, retry, or escalate decision, capped at three attempts, and anything unexpected defaults to handing the case to a human.",
      "Reasoning–execution separation. The AI agents only plan and write patches; cloning, patching, and running tests are done by fixed tools that keep file backups, so a model mistake cannot spread through the codebase.",
      "Defense-in-depth on generated code. Every patch is screened twice: an AI safety check blocks unsafe changes, and a rule-based check flags destructive or off-target edits for another attempt.",
      "Provider-agnostic model layer. The same system runs on OpenAI or a local Ollama model, chosen at runtime, with no code changes.",
    ],
    outcomes:
      "Turns a CI failure into a test-verified patch through an automated loop of planning, analysis, fixing, testing, and evaluation, taking over the routine triage work for common failures. Every step is recorded (the root-cause analysis, the affected files, and each fix attempt with the evaluator's reasoning and confidence), giving a full audit trail. The same pattern (an explicit state machine, fixed tools for every change, test-verified output, and a hard limit on autonomy) is what lets production coding agents act safely on real codebases.",
    repoUrl: "https://github.com/zeelgithub/autonomous-debugger-assistant",
    tags: ["LangGraph", "Multi-Agent", "Guardrails", "Self-Healing CI"],
    highlights: [
      "Evaluator-controlled retry loop, capped at three iterations",
      "Fixes verified against the repository's real test suite",
      "Two-layer safety screening on every generated patch",
    ],
  },


  {
    slug: "bonex",
    title: "BoneX: Multi-Region Fracture Detection from X-Rays",
    summary:
      "A deep-learning web application that reads an upper-extremity X-ray and reports both the body region and whether the bone looks normal or abnormal, across seven regions: elbow, finger, forearm, hand, humerus, shoulder, and wrist.",
    problem:
      "Musculoskeletal conditions affect more than 1.7 billion people worldwide, according to the World Health Organization, and an X-ray is the first test for most of them. Reading those images takes trained radiologists, whose time is limited, especially in busy emergency departments and clinics without on-site specialists, and a missed abnormality can delay treatment. A screening aid is only practical if it covers every region a clinic sees, delivered in a form non-technical staff can use.",
    solution:
      "A single transfer-learning model that classifies an X-ray into 14 outcomes (seven body regions, each normal or abnormal). It uses a MobileNet backbone pretrained on ImageNet with a custom classification head, trained on Stanford's MURA musculoskeletal X-ray dataset with data augmentation. A Flask web application wraps the model, so a user uploads an image and receives a plain-language result in one step.",
    architecture: [
      "Flask web application: upload page, prediction endpoint, and result view.",
      "Preprocessing: resize to 224 × 224 pixels and scale pixel values.",
      "MobileNet backbone pretrained on ImageNet, frozen, with a dense classification head and dropout.",
      "14-class output: seven body regions, each normal or abnormal.",
      "Training with shear, zoom, and horizontal-flip augmentation.",
    ],
    decisions: [
      "One model for every region. A single classifier predicts the body region and its normal or abnormal status together, so one deployment covers all seven regions instead of seven separate models.",
      "Transfer learning over training from scratch. A backbone pretrained on ImageNet supplies general visual features and only a small classification head is trained, which suits a medical dataset far smaller than ImageNet.",
      "Lightweight backbone for deployment. MobileNet was chosen for its small size and fast inference, so predictions return quickly on ordinary hardware.",
      "Augmentation for robustness. Random shear, zoom, and horizontal flips expose the model to the variation in positioning and framing found in real X-rays.",
      "A product, not a notebook. The model ships inside a web application with an upload flow and a plain-language result, so a non-technical user can run it without touching code.",
    ],
    outcomes:
      "Delivered a working web application that classifies an upper-extremity X-ray across seven body regions and flags it as normal or abnormal from a single upload, using one lightweight model instead of seven. The project turns a research dataset into a usable screening prototype, the kind of first-pass read that helps clinicians prioritize which images need a specialist's attention first.",
    repoUrl: "https://github.com/zeelgithub/BoneX-AnMultiBoneFractureDetectionSystem",
    tags: ["Computer Vision", "Medical Imaging", "Transfer Learning", "Flask"],
    highlights: [
      "One model covers seven upper-extremity regions",
      "Flags each X-ray as normal or abnormal",
      "Upload-to-result web application",
    ],
  },
  

  {
    slug: "travelbuddy",
    title: "TravelBuddy: Multi-Agent Travel Assistant",
    summary:
      "The route, the charging stops, and the sightseeing, in one conversation. A supervisor-led multi-agent assistant that sends each part of a trip question to the right specialist and answers only from live routing, charging, and places data, never from model memory.",
    problem:
      "Planning a road trip, especially in an electric vehicle, means juggling separate apps: one for directions, another for charging stations and pricing, and a third for places worth stopping. None of them talk to each other, so the traveler does the integration by hand. General-purpose chatbots are no substitute: they answer from training data, so routes, charger locations, and prices can be outdated or invented, a real problem when an EV driver's next stop depends on a charger actually being there.",
    solution:
      "A LangGraph supervisor agent reads each request, breaks it down by intent, and hands off to specialist agents for routing, EV charging, and attractions. Each specialist is a ReAct agent bound to a single tool backed by a live API (OpenRouteService, Open Charge Map, Foursquare Places) and instructed to answer only from that tool's output. Control returns to the supervisor after every handoff, so a multi-part request is handled in sequence before the final response.",
    architecture: [
      "Supervisor ReAct agent (GPT-4o) with handoff tools implemented as LangGraph Command transfers.",
      "Specialist ReAct agents for map routing, EV charging, and attractions.",
      "Shared geocoding layer (OpenRouteService) used by all three tools.",
      "Live data sources: OpenRouteService Directions, Open Charge Map, Foursquare Places.",
      "Streamlit interface streaming graph updates.",
    ],
    decisions: [
      "Supervisor–worker topology. One supervisor decides who handles each request and the specialists do the work, so a new capability is one new agent and one handoff, with no changes to the existing ones.",
      "Tool-grounded specialists. Each specialist has exactly one tool and answers only from what that tool returns, so routes, charger locations, and prices come from live data, not model memory.",
      "Command-based handoffs. Each handoff passes control together with the full conversation history, so the next agent always has the context it needs.",
      "Hub-and-spoke control flow. Every specialist hands control back to the supervisor, which can send the next part of a multi-part question (route, then charging, then attractions) before replying.",
      "Shared geocoding layer. One geocoding step turns place names into coordinates for all three tools, so every specialist works from the same location.",
    ],
    outcomes:
      "Consolidates route planning, EV charging lookup, and destination discovery into a single conversational assistant, with answers drawn from live APIs instead of model memory. The supervisor–worker design keeps each capability isolated and independently extensible: a new domain such as weather, lodging, or tolls plugs in as one more specialist without touching existing agents. The same pattern applies to any assistant that must route requests across specialized, tool-backed services.",
    repoUrl: "https://github.com/zeelgithub/travel-buddy",
    tags: ["LangGraph", "Multi-Agent", "Tool Calling", "Geospatial APIs"],
    highlights: [
      "Supervisor routes each request to the right specialist agent",
      "Answers grounded in live routing, charging, and places APIs",
      "New capabilities plug in as one agent plus one handoff tool",
    ],
  },

  {
    slug: "vantage",
    title: "Vantage: A Local-First Dashboard Unifying Health, Schedule, and Finance Data",
    summary:
      "Five apps, one screen. Vantage unifies Apple Health, Google Calendar, Canvas, and a brokerage account into a single local-first dashboard, so sleep, training, meals, deadlines, and money read at a glance, and everything it stores stays on my own machine.",
    problem:
      "The data that describes a single day is scattered across single-purpose apps: sleep and training in Apple Health, meetings in Google Calendar, deadlines in Canvas, positions in a brokerage app, and meals and to-dos somewhere else. Each answers one narrow question. None answers the one that matters every morning: what does today look like, and am I on track? Existing all-in-one tools close that gap only by pulling everything into yet another cloud account.",
    solution:
      "Vantage aggregates every source into one screen. Apple Health pushes activity, heart-rate, sleep, and workout data to a secured webhook; Google Calendar, Canvas, and Alpaca are read live on every load; and a public food database fills in macros as meals are logged. Priorities, supplements, meals, and a Kanban task board are captured in place. It runs on my own machine against a local SQLite database, and every source loads through its own API route, so no single failure can take the dashboard down.",
    architecture: [
      "Next.js and TypeScript dashboard with one API route per data source.",
      "Apple Health data pushed through the Health Auto Export app to a secured webhook.",
      "Live, read-only reads from Google Calendar, the Canvas calendar feed, and an Alpaca brokerage account.",
      "Open Food Facts lookup for calories and macros when logging meals.",
      "Local SQLite database for health history, meals, supplements, priorities, and tasks.",
    ],
    decisions: [
      "One screen, zero navigation. Nine panels share a single page designed to be read in seconds, many times a day, with nothing to click through to see the full picture of today.",
      "Local-first by design. Everything Vantage stores lives in a SQLite database on my own machine, so no personal record is copied into an additional cloud service.",
      "Push or pull, by source. Apple Health pushes updates to a secured webhook, while calendar, coursework, and portfolio data are read live on every load, so each panel is as fresh as its source allows.",
      "Failures stay contained. Each source loads through its own API route, so an outage or an expired token empties one panel while the rest of the dashboard keeps working.",
      "Shipped like production software. Built with Claude Code one feature at a time against a written spec, verified in a live browser preview, and backed by 43 unit tests and a CI pipeline that type-checks, lints, tests, and builds every push.",
    ],
    outcomes:
      "Replaced a morning routine of checking five apps with a single glance: how I slept, how this week's training compares, what is due, what I have eaten, and where my portfolio stands. Contained failures and local storage make it dependable enough to stay on screen all day, and the one-route-per-source design turns every new integration into a self-contained change.",
    tags: ["Full-Stack", "Data Integration", "Local-First", "Agentic Dev"],
    highlights: [
      "Five apps replaced by one local-first screen",
      "Each source isolated, so one failure never blanks the dashboard",
      "43 tests and CI on every push",
    ],
    repoUrl: "https://github.com/zeelgithub/vantage",
  },

  {
    slug: "autonomous-live-trading-system",
    title: "Autonomous Trading Bot: Risk-Gated Execution with a Claude Cognitive Layer",
    summary:
      "An autonomous paper-trading system for US stocks on Alpaca. Rule-based strategies propose trades, an independent risk check can reject but never create them, and the owner approves each order from their phone. Claude adds optional assistance (interpreting commands, explaining incidents, summarizing research) but can never place a trade.",
    problem:
      "Most algorithmic trading projects are a single script in which research, risk checks, and order placement share one process, so a single bug can place a real order. The cost of that design is well documented: in 2012, Knight Capital lost $440 million in about 45 minutes when faulty code sent unintended orders to the market. Adding AI raises the stakes. Language models can be confidently wrong, and placing one in the path to the broker hands financial decisions to a system that cannot be fully audited.",
    solution:
      "A layered system in which the part that decides never shares a failure point with the part that trades. Strategies only suggest trades; an independent risk check approves, resizes, or rejects each one; and only the execution layer can reach the brokerage account. Approved trades go to the owner's phone for a one-tap decision, and any sign of trouble (stale data, a lost connection, a mismatch with the broker, an unexpected error) stops the system rather than letting it guess.",
    architecture: [
      "Layered pipeline: market data, strategies, risk check, and execution, each with a single responsibility.",
      "Market-condition filter that activates trend-following, breakout, or mean-reversion strategies.",
      "Rule-based risk check that can approve, resize, or reject, but never create, a trade.",
      "Execution layer as the only component with brokerage access; every fill checked against the broker.",
      "Optional Claude assistant layer and three MCP data connectors that can read and suggest only.",
      "Telegram control with owner-only access and approve/reject on every trade.",
    ],
    decisions: [
      "Separated failure domains. Research and strategy code has no access to the brokerage account. Only the execution layer holds trading credentials, so a bug in analysis code cannot place an order.",
      "Veto-only risk gate. Every proposed trade passes a rule-based risk check that can approve, resize, or reject it but never create one, with limits on daily loss, total open risk, correlated positions, position size, order price, and order rate.",
      "Fail-closed by default. A lost connection, stale data, a mismatch with the broker's records, or an unexpected error stops trading immediately. A daily-loss halt requires a manual reset; only connection and data issues can resume automatically.",
      "Every position protected. A position counts as open only once its stop-loss order is confirmed at the broker, and each order carries a unique ID so a retry can never place it twice.",
      "Evidence before trust. Each strategy is backtested and tested for statistical significance, including on out-of-sample periods it was never tuned on, then graded as noise, inconclusive, or validated. A strategy that lost money was switched off on that evidence.",
      "AI suggests, never trades. Claude can interpret phone commands, explain incidents, and summarize research, but every suggestion passes the same risk check and owner approval, and each AI feature has a non-AI fallback.",
    ],
    outcomes:
      "Running autonomously on a paper account since August 2026, with every trade risk-checked and approved from the phone. In a 4.1-year backtest that includes companies that later delisted, the combined strategies returned +38.1% with a Sharpe ratio of 1.29 and a maximum drawdown of −5.4%. Buy-and-hold SPY returned +110.9% with a Sharpe ratio of 1.21 over the same period: a lower total return, but stronger risk-adjusted performance with roughly a third of the drawdown. One strategy passed the statistical significance test (trend following, p = 0.040), and a readiness audit sets clear pass/fail criteria before any real money is used. Real incidents shaped the design: the system caught positions whose stop-loss orders had silently expired at the broker, which led to a permanent fix in how those orders are placed.",
    repoUrl: "https://github.com/zeelgithub/Trading-AI",
    tags: ["Risk Management", "Fail-Safe Design", "Claude + MCP", "Quant Validation"],
    highlights: [
      "Independent risk check between every strategy and the broker",
      "Backtest Sharpe 1.29 with −5.4% max drawdown over 4.1 years",
      "Claude can suggest trades, never place them",
    ],
  },

  {
    slug: "reddit-market-brief-skills",
    title: "Reddit Market Brief: AI Market Intelligence System",
    summary:
      "Hours of market reading, one command. Three Claude Code skills turn Reddit discussion, market news, SEC filings, and congressional trades into sourced market briefs and analyst-style stock reports, with every figure cited and every coverage gap disclosed.",
    problem:
      "Retail sentiment now moves markets, as the 2021 GameStop squeeze showed, but it is spread across thousands of daily posts in dozens of communities. Congressional trades are public but buried in disclosure filings, and fundamentals sit in SEC reports. Tracking all of it takes hours a day. General-purpose AI assistants do not close the gap: they sample instead of reading everything, state figures from memory, and can be manipulated by the content they read. In finance, an unsourced number is a liability.",
    solution:
      "Three Claude Code skills, each run with one command. Python collectors pull Reddit through Composio and market data from Google Finance, Yahoo, and SEC filings, and compute the financial metrics; the agent gathers news through web search and congressional trades through an MCP browser, then interprets and writes. Every brief cites its sources and ends with a report of exactly what was and was not read.",
    architecture: [
      "Three skills, one command each, run by the Claude Code agent.",
      "Python collectors for Reddit and market data; agent-driven web search and browser for news and congressional trades.",
      "Connector layer: Composio for Reddit with managed OAuth, and an MCP browser for Capitol Trades.",
      "Agent synthesis guided by sector-specific analysis playbooks.",
      "Sourced brief with a built-in coverage report.",
    ],
    decisions: [
      "Scripts compute, the AI interprets. Prices, returns, and fundamentals are computed by scripts from market data and SEC filings, and every other figure must cite a dated source. The rule is simple: no number in a brief comes from model memory.",
      "Read everything, disclose the rest. Collectors follow every listing to its end instead of sampling, and anything left unread is reported with the reason, so every brief states exactly what it covered.",
      "Fetched content is untrusted. Posts, articles, and filings are treated strictly as data, never as instructions, a standing defense against prompt injection from the content the agent reads.",
      "Delegated authentication. Reddit access runs through Composio's managed OAuth connector: the user approves access directly, and the system never stores or handles Reddit credentials.",
      "Sector-specific analysis. Each stock is scored on the metrics that matter for its industry, such as net interest margin for banks and funds from operations for REITs, not a generic template.",
      "Reports, never recommends. Buy and sell views are attributed to the analysts or users who made them, keeping the output factual and free of investment advice.",
    ],
    outcomes:
      "Replaces hours of daily reading with a Reddit collection run of about 11 minutes. In a measured run across 22 subreddits, the collector made 736 API calls with zero errors and gathered over 15,000 comments; 21 of 22 communities came back essentially complete, and the one gap was reported in the brief. The same architecture (scripted collection, disclosed coverage, and a strict trust boundary) applies to any AI agent that acts on open-web data.",
    repoUrl: "https://github.com/zeelgithub/reddit-market-brief-skills",
    tags: ["Agentic AI", "Claude Code Skills", "Data Pipelines", "MCP"],
    highlights: [
      "22 subreddits collected in ~11 minutes with zero errors",
      "Every figure sourced, every coverage gap disclosed",
      "Analyst-style reports on any stock or ETF",
    ],
  },
  {
    slug: "ai-agent-supply-chain-security",
    title: "AI Agent Supply-Chain Security: Guarding Coding Agents Against Hallucinated Packages",
    summary:
      "A security study and install-time guard for AI coding agents. The guard checks every package an agent tries to install against the live registry before the command runs, and a 48-session experiment measured how often Claude verifies packages on its own: every time a name looks suspicious, but only about one time in five otherwise.",
    problem:
      "AI coding agents sometimes invent package names that sound real but do not exist. Attackers now register those names in advance, a technique known as slopsquatting, so an agent that installs packages on autopilot can pull malware straight onto a developer's machine or into a build pipeline. A USENIX Security 2025 study found that about one in five packages suggested by code-generating models did not exist. What the research had not measured is whether a working agent checks a package before installing it, which is the question that decides whether teams need an external safeguard at all.",
    solution:
      "A PreToolUse hook for Claude Code that intercepts every shell command before it runs, extracts package names from install commands across npm, PyPI, crates.io, RubyGems, and Go, and checks each one against the live registry. Packages confirmed not to exist are blocked; real but risky ones (brand new, few downloads, one typo away from a popular name, a suspicious install script) are allowed with a logged warning. The hook then served as instrumentation for a controlled experiment across 48 real Claude Code sessions, a prompt-intervention study, and a comparison against a local open-weight model.",
    architecture: [
      "PreToolUse hook that checks every shell command before execution.",
      "Command parser covering direct installs, requirements files, shell scripts, and environment-variable prefixes.",
      "Live registry checks across npm, PyPI, crates.io, RubyGems, and the Go module proxy.",
      "Risk scorer: block only confirmed nonexistent packages, warn on risky but real ones.",
      "Experiment harness: 24 tasks across 3 complexity tiers, organic and adversarial, with and without the hook.",
      "Analysis pipeline reporting rates with 95% confidence intervals.",
    ],
    decisions: [
      "Block only what is proven fake. The guard denies an install only when the registry confirms the package does not exist; risky but real packages get a logged warning, so legitimate work is never broken and suspicious is never confused with nonexistent.",
      "Check before execution. The guard runs as a Claude Code PreToolUse hook and inspects every shell command before it runs, including installs hidden in requirements files, shell scripts, or behind environment-variable prefixes.",
      "Fail visibly, never open. If a registry cannot be reached, the guard records a warning instead of silently allowing the install, so an outage never looks like a verified package.",
      "Measure before claiming. The guard doubles as instrumentation: every decision is logged with timing, and results are reported with 95% confidence intervals, which is what separated a real intervention effect from a null one.",
      "Diagnose null results instead of burying them. A soft 'be more careful' prompt had no effect; tracing why (models are already certain familiar packages exist) led to a procedural check that raised verification from 19.4% to 72.2%.",
      "Responsible disclosure. Hallucinated names that are still unclaimed are withheld from the public repository and held for private disclosure to the registry, because a published list would be a ready-made target for attackers.",
    ],
    outcomes:
      "Showed that Claude verifies a package before installing it every time the name looks suspicious (12 of 12 sessions), but only 19.4% of the time on ordinary tasks, while a local 8B open-weight model never verified at all (0 of 24) and was blocked 12 times. A targeted system-prompt change raised ordinary-task verification to 72.2%, with confidence intervals that do not overlap the baseline. The study surfaced two genuine, still-unclaimed package names that an AI agent hallucinated, now pending private disclosure, and the guard adds a median of 477 ms per checked install. The takeaway for teams: capable agents are cautious when something looks wrong, but not by default, so an install-time check still earns its place.",
    repoUrl: "https://github.com/zeelgithub/ai-agent-supply-chain-security",
    tags: ["AI Security", "Supply Chain", "Agent Evaluation", "Claude Code Hooks"],
    highlights: [
      "Claude self-verified 100% of suspicious packages, 19.4% of ordinary ones",
      "A procedural prompt raised verification to 72.2%",
      "Found 2 unclaimed hallucinated package names, pending disclosure",
    ],
  },
]
