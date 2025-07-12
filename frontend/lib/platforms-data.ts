import {
  Globe,
  Server,
  Smartphone,
  Code,
  Layout,
  FileCode,
  Laptop,
  type LucideIcon,
  Zap,
  CuboidIcon as Cube,
} from "lucide-react"

export interface Platform {
  name: string
  categories: string[]
  icon: LucideIcon
  popular: boolean
}
 
export const platformsData: Platform[] = [
  {
    name: "Next.js",
    categories: ["Browser", "Server", "Serverless"],
    icon: Globe,
    popular: true,
  },
  {
    name: "React",
    categories: ["Browser"],
    icon: Layout,
    popular: true,
  },
  {
    name: "React Native",
    categories: ["Mobile"],
    icon: Smartphone,
    popular: true,
  },
  {
    name: "Laravel",
    categories: ["Server"],
    icon: Server,
    popular: true,
  },
  {
    name: "Flutter",
    categories: ["Mobile", "Desktop"],
    icon: Smartphone,
    popular: true,
  },
  {
    name: "Django",
    categories: ["Server"],
    icon: Server,
    popular: true,
  },
  {
    name: "Node.js",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "Browser JavaScript",
    categories: ["Browser"],
    icon: Globe,
    popular: false,
  },
  {
    name: "Express",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "FastAPI",
    categories: ["Server"],
    icon: Zap,
    popular: false,
  },
  {
    name: "PHP",
    categories: ["Server"],
    icon: FileCode,
    popular: false,
  },
  {
    name: "Python",
    categories: ["Server", "Desktop"],
    icon: Code,
    popular: false,
  },
  {
    name: ".NET MAUI",
    categories: ["Mobile", "Desktop"],
    icon: Laptop,
    popular: false,
  },
  {
    name: "Nest.js",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "Vue",
    categories: ["Browser"],
    icon: Layout,
    popular: false,
  },
  {
    name: "Android",
    categories: ["Mobile"],
    icon: Smartphone,
    popular: false,
  },
  {
    name: "iOS",
    categories: ["Mobile"],
    icon: Smartphone,
    popular: false,
  },
  {
    name: "Rails",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "Flask",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "ASP.NET Core",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "Angular",
    categories: ["Browser"],
    icon: Layout,
    popular: false,
  },
  {
    name: "Symfony",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "Remix",
    categories: ["Browser", "Server"],
    icon: Globe,
    popular: false,
  },
  {
    name: "Spring Boot",
    categories: ["Server"],
    icon: Server,
    popular: false,
  },
  {
    name: "SvelteKit",
    categories: ["Browser", "Server"],
    icon: Layout,
    popular: false,
  },
  {
    name: "Unity",
    categories: ["Desktop", "Mobile"],
    icon: Cube,
    popular: false,
  },
  {
    name: "Nuxt",
    categories: ["Browser", "Server"],
    icon: Globe,
    popular: false,
  },
  {
    name: "Astro",
    categories: ["Browser", "Server"],
    icon: Globe,
    popular: false,
  },
]
