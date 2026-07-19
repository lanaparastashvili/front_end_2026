import type { NavLink, GameItem, NewsItem, FooterColumn } from "../types";

// Assets – imported by number order
import two from "../assets/two.svg";
import three from "../assets/three.svg";
import four from "../assets/four.svg";
import five from "../assets/five.svg";
import six from "../assets/six.svg";
import seven from "../assets/seven.png";
import eight from "../assets/eight.jpg";


export const navLinks: NavLink[] = [
  { label: "Jogos", href: "#jogos" },
  { label: "Loja", href: "#loja" },
  { label: "Notícias", href: "#noticias" },
];

export const games: GameItem[] = [
  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    platforms: ["PC", "Console"],
    gradient: ["#1f2937", "#0a0a0a"],
    accent: "#22c55e",
    image: two,
  },
  {
    id: "gta-online",
    title: "Grand Theft Auto Online",
    tag: "Multijogador",
    platforms: ["PC", "Console"],
    gradient: ["#312e81", "#0a0a0a"],
    accent: "#818cf8",
    image: three,
  },
  {
    id: "rdr2",
    title: "Red Dead Redemption",
    platforms: ["Console", "Portátil"],
    gradient: ["#7c2d12", "#0a0a0a"],
    accent: "#fb923c",
    image: four,
  },
  {
    id: "rdo",
    title: "Red Dead Online",
    tag: "Multijogador",
    platforms: ["PC", "Console"],
    gradient: ["#7f1d1d", "#0a0a0a"],
    accent: "#f87171",
    image: five,
  },
];

export const news: NewsItem[] = [
  {
    id: "trailer",
    title: "Grand Theft Auto VI — Veja o 1º trailer agora",
    category: "Rockstar Games",
    date: "Hoje",
    gradient: ["#f472b6", "#7c3aed"],
    size: "large",
    image: six,
  },
  {
    id: "soundtrack",
    title: "A trilha sonora que está a chegar",
    category: "Música",
    date: "Há 2 dias",
    gradient: ["#334155", "#0f172a"],
    size: "small",
    image: seven,
  },
  {
    id: "cars",
    title: "Os novos veículos que vais conduzir",
    category: "Gameplay",
    date: "Há 5 dias",
    gradient: ["#b45309", "#1c1917"],
    size: "small",
    image: eight,
  },
];

export const footerColumns: FooterColumn[] = [
  {
    heading: "Empresa",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Carreiras", href: "#" },
      { label: "Imprensa", href: "#" },
    ],
  },
  {
    heading: "Suporte",
    links: [
      { label: "Central de Ajuda", href: "#" },
      { label: "Contacto", href: "#" },
      { label: "Estado do Servidor", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Termos de Serviço", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "Licenças", href: "#" },
    ],
  },
];
