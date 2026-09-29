"use client"

// Connection types, each with its own color and arrowhead
const C = {
  call:  { color: "#334155", id: "bx-call" },
  train: { color: "#16a34a", id: "bx-train" },
  load:  { color: "#7c3aed", id: "bx-load" },
}
type Kind = keyof typeof C

function Box({ x, y, w, h, title, sub, fill = "#ffffff", stroke = "#7dd3fc", color = "#0c4a6e", dash }: {
  x: number; y: number; w: number; h: number
  title: string; sub?: string; fill?: string; stroke?: string; color?: string; dash?: string
}) {
  const cx = x + w / 2
  const cy = y + h / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8" fill={fill} stroke={stroke} strokeWidth="1.3" strokeDasharray={dash} />
      <text x={cx} y={sub ? cy - 3 : cy + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>{title}</text>
      {sub && <text x={cx} y={cy + 13} textAnchor="middle" fontSize="9.5" fill="#475569">{sub}</text>}
    </g>
  )
}

function Edge({ d, kind }: { d: string; kind: Kind }) {
  const { color, id } = C[kind]
  return <path d={d} fill="none" stroke={color} strokeWidth="1.6" markerEnd={`url(#${id})`} />
}

function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="6" fill="#ffffff" stroke="#a78bfa" strokeWidth="1" />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fontSize="10" fill="#4c1d95">{label}</text>
    </g>
  )
}

const TRAIN = { fill: "#ffffff", stroke: "#86efac", color: "#14532d" }

export default function BoneXArchitectureDiagram() {
  return (
    <div className="rounded-xl border bg-white dark:bg-gray-900 p-4">
      <svg viewBox="0 0 1000 420" className="block w-full h-auto">
        <defs>
          {Object.values(C).map(({ color, id }) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="9" refY="5"
              markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          ))}
        </defs>

        {/* ── Training (offline) ── */}
        <rect x="20" y="12" width="960" height="108" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.3" />
        <rect x="32" y="4" width="120" height="17" rx="5" fill="#16a34a" />
        <text x="92" y="16" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white">Training (offline)</text>
        <Box x={35}  y={40} w={180} h={60} title="X-ray Dataset" sub="Stanford MURA · 7 regions" {...TRAIN} />
        <Box x={245} y={40} w={180} h={60} title="Augmentation" sub="shear · zoom · flip" {...TRAIN} />
        <Box x={455} y={40} w={220} h={60} title="Transfer Learning" sub="train the head · backbone frozen" {...TRAIN} />
        <Box x={705} y={40} w={260} h={60} title="Model Artifact" sub="saved Keras model file" fill="#f5f3ff" stroke="#a78bfa" color="#4c1d95" />
        <Edge d="M215 70 L245 70" kind="train" />
        <Edge d="M425 70 L455 70" kind="train" />
        <Edge d="M675 70 L705 70" kind="train" />

        {/* ── User ── */}
        <rect x="40" y="170" width="110" height="30" rx="15" fill="#0f172a" />
        <text x="95" y="190" textAnchor="middle" fontSize="12" fontWeight="700" fill="white">User</text>
        <Edge d="M75 200 L75 240" kind="call" />
        <Edge d="M115 240 L115 200" kind="call" />
        <Box x={20} y={240} w={150} h={60} title="Web App" sub="upload · view result" fill="#f8fafc" stroke="#cbd5e1" color="#334155" />

        {/* ── Inference server ── */}
        <rect x="200" y="150" width="780" height="255" rx="12" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.6" />
        <text x="215" y="170" fontSize="12" fontWeight="700" fill="#0c4a6e">Flask Inference Server</text>

        <Edge d="M170 262 L220 262" kind="call" />
        <text x="174" y="256" fontSize="9" fill="#334155">X-ray</text>
        <Box x={220} y={240} w={150} h={60} title="Predict Endpoint" sub="receives the upload" />
        <Box x={400} y={240} w={150} h={60} title="Preprocess" sub="224 × 224 · scale pixels" />
        <Edge d="M370 270 L400 270" kind="call" />
        <Edge d="M550 270 L580 270" kind="call" />

        <rect x="580" y="190" width="190" height="160" rx="10" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="1.4" />
        <text x="675" y="210" textAnchor="middle" fontSize="12" fontWeight="700" fill="#4c1d95">CNN Classifier</text>
        <Chip x={590} y={222} w={170} label="MobileNet · ImageNet" />
        <Chip x={590} y={260} w={170} label="dense head + dropout" />
        <Chip x={590} y={298} w={170} label="softmax · 14 classes" />

        <Edge d="M770 270 L800 270" kind="call" />
        <Box x={800} y={240} w={165} h={60} title="Label Mapper" sub="region + normal / abnormal" />

        {/* result returns to the user */}
        <Edge d="M882 300 L882 380 L295 380 L295 300" kind="call" />
        <text x="590" y="374" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155">plain-language result, e.g. {"\""}wrist · abnormal{"\""}</text>
        <Edge d="M220 285 L170 285" kind="call" />
        <text x="174" y="298" fontSize="9" fill="#334155">result</text>

        {/* model artifact loaded by the server */}
        <Edge d="M740 100 L740 190" kind="load" />
        <text x="748" y="140" fontSize="9" fontWeight="700" fill="#7c3aed">loaded at startup</text>
      </svg>
      <p className="mt-3 text-xs text-gray-600 dark:text-gray-300">
        Training runs offline and produces one model file. The Flask server loads it at startup, then each upload is preprocessed, classified into one of 14 outcomes, and returned to the user as a plain-language result naming the body region and whether it looks normal or abnormal.
      </p>
    </div>
  )
}
