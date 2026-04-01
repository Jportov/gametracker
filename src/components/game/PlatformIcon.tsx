type Props = { slug: string }

const ICONS: Record<string, string> = {
  pc: "🖥",
  playstation: "🎮",
  xbox: "🕹",
  nintendo: "🃏",
  ios: "📱",
  android: "📱",
  mac: "🍎",
  linux: "🐧",
}

export default function PlatformIcon({ slug }: Props) {
  const key = Object.keys(ICONS).find((k) => slug.includes(k))
  return <span title={slug}>{key ? ICONS[key] : "🎯"}</span>
}
