import { type ReactElement, type SVGProps } from "react"

type Props = { slug: string }

// SVGProps<SVGSVGElement> é o tipo correto para atributos de <svg> no React.
// O atributo "title" em SVG não é uma prop direta — usa-se <title> como elemento filho.
type SvgIcon = (props?: SVGProps<SVGSVGElement>) => ReactElement

function PCIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="PC">
      <path d="M0 0h11.5v11.5H0zm12.5 0H24v11.5H12.5zM0 12.5h11.5V24H0zm12.5 0H24V24H12.5z"/>
    </svg>
  )
}

function PlayStationIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="PlayStation">
      <path d="M8.984 2.596v14.27l3.84 1.22V6.39c0-.667.3-1.16.79-.96.6.22.716 1.14.716 1.14v4.47c1.7-.36 3.684.13 3.684 2.71 0 2.73-2.17 3.99-3.964 3.99a7.2 7.2 0 0 1-.51-.02V19.7s-5.09-1.09-5.09-1.09L3.5 19.7v-1.89c-.73-.23-1.5-.52-2.17-.88C.11 16.35 0 14.78 0 14.78s.94 1.64 3.26 2.07c1.04.2 3.04.34 3.04-.5V2.596zm1.78 13.5 3.34.94v-2.13c0-.58-.33-.92-.88-.86l-2.46.64zm3.34 3.28-3.34-.94v1.76l2.26.63c.67.18 1.24-.1 1.24-.9v-.55zm3.1-10.7c-.63 0-1.14.51-1.14 1.14s.51 1.14 1.14 1.14 1.14-.51 1.14-1.14-.51-1.14-1.14-1.14zm3.27 7.62c.63 0 1.14-.51 1.14-1.14s-.51-1.14-1.14-1.14-1.14.51-1.14 1.14.51 1.14 1.14 1.14zm-1.64-3.6c-.63 0-1.14.51-1.14 1.14s.51 1.14 1.14 1.14 1.14-.51 1.14-1.14-.51-1.14-1.14-1.14zm3.28 0c-.63 0-1.14.51-1.14 1.14s.51 1.14 1.14 1.14 1.14-.51 1.14-1.14-.51-1.14-1.14-1.14z"/>
    </svg>
  )
}

function XboxIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="Xbox">
      <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zm11.16-14.406c2.5 2.961 7.484 10.313 6.076 12.912C23.002 17.638 24 14.93 24 12c0-3.76-1.739-7.113-4.471-9.361 0 0-1.309-.972-2.655-.338-.9.425-2.833 2.005-1.613 4.326zM4.471 2.639C1.739 4.887 0 8.24 0 12c0 2.93.998 5.638 2.661 7.539-1.405-2.599 3.579-9.951 6.08-12.912 1.219-2.321-.713-3.9-1.613-4.326-1.347-.634-2.657.338-2.657.338zM12 2.18S9.55 1.02 7.137 3.006C9.1 1.862 12 4.58 12 4.58s2.9-2.717 4.863-1.574C14.45 1.02 12 2.18 12 2.18z"/>
    </svg>
  )
}

function NintendoIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="Nintendo">
      <path d="M9.06 0h5.88C20.85 0 24 3.63 24 9v6c0 5.37-3.15 9-9.06 9H9.06C3.15 24 0 20.37 0 15V9C0 3.63 3.15 0 9.06 0zm-.84 5.4L5.1 12l3.12 6.6h3.24L8.34 12l3.12-6.6zm5.52 0c-1.86 0-3.36 2.94-3.36 6.6s1.5 6.6 3.36 6.6 3.36-2.94 3.36-6.6-1.5-6.6-3.36-6.6zm0 2.4c.54 0 .96 1.86.96 4.2S14.28 16.2 13.74 16.2s-.96-1.86-.96-4.2.42-4.2.96-4.2z"/>
    </svg>
  )
}

function MobileIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="Mobile">
      <path d="M17 0H7C5.34 0 4 1.34 4 3v18c0 1.66 1.34 3 3 3h10c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-5 23c-.83 0-1.5-.67-1.5-1.5S11.17 20 12 20s1.5.67 1.5 1.5S12.83 23 12 23zm6-4H6V3h12v16z"/>
    </svg>
  )
}

function LinuxIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400" xmlns="http://www.w3.org/2000/svg" aria-label="Linux">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.44 4.92c.63 0 1.19.47 1.19 1.08 0 .4-.22.75-.56.95.34.18.56.54.56.95 0 .61-.56 1.08-1.19 1.08s-1.19-.47-1.19-1.08c0-.41.22-.77.56-.95-.34-.2-.56-.55-.56-.95 0-.61.56-1.08 1.19-1.08zm4.16 1.58c.56 0 1.01.45 1.01 1.01s-.45 1.01-1.01 1.01-1.01-.45-1.01-1.01.45-1.01 1.01-1.01zm-8.32 0c.56 0 1.01.45 1.01 1.01s-.45 1.01-1.01 1.01S6.34 8.07 6.34 7.51s.45-1.01 1.01-1.01zM12 8.5c2.21 0 4 1.34 4 3s-1.79 3-4 3-4-1.34-4-3 1.79-3 4-3zm-2.5 1.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm5 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm-2.5.75c-.41 0-.75.34-.75.75s.34.75.75.75.75-.34.75-.75-.34-.75-.75-.75zm-5 2.5c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5zm10 0c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5zm-5 1.25c-1.38 0-2.5.84-2.5 2.5v1h5v-1c0-1.66-1.12-2.5-2.5-2.5z"/>
    </svg>
  )
}

const PLATFORM_MAP: { key: string; icon: SvgIcon }[] = [
  { key: "pc",          icon: PCIcon         },
  { key: "playstation", icon: PlayStationIcon },
  { key: "xbox",        icon: XboxIcon        },
  { key: "nintendo",    icon: NintendoIcon    },
  { key: "ios",         icon: MobileIcon      },
  { key: "android",     icon: MobileIcon      },
  { key: "mac",         icon: MobileIcon      },
  { key: "linux",       icon: LinuxIcon       },
]

export default function PlatformIcon({ slug }: Props): ReactElement | null {
  const match = PLATFORM_MAP.find(({ key }) => slug.includes(key))
  if (!match) return null
  const Icon = match.icon
  return <Icon />
}
