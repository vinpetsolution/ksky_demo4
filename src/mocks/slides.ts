import type {
  CarouselSlide,
  CasinoCardItem,
  GameSlotCardItem,
  PopupBannerItem,
} from "@/types/game";

export const CASINO_SLIDES: CarouselSlide[] = [
  {
    bgImage: "/images/casino_visual/visual_bg_01.png",
    entityImage: "/images/casino_visual/visual_entity_01.png",
    labelImage: "/images/visual_label/visual_label_1.png",
    bgColor: "#0c0302",
  },
  {
    bgImage: "/images/casino_visual/visual_bg_02.png",
    entityImage: "/images/casino_visual/visual_entity_02.png",
    labelImage: "/images/visual_label/visual_label_2.png",
    bgColor: "#0f0b09",
  },
];

export const SLOT_SLIDES: CarouselSlide[] = [
  {
    bgImage: "/images/slot_visual/visual_bg_02.png",
    entityImage: "/images/slot_visual/visual_entity_02.png",
    labelImage: "/images/visual_label/visual_label_2.png",
    bgColor: "#420e06",
  },
];

export const CASINO_POPUP_BANNERS: PopupBannerItem[] = [
  {
    id: "banner-1",
    imageUrl: "/images/casino_popup.png",
    imageAlt: "Banner 1",
  },
  {
    id: "banner-2",
    imageUrl: "/images/visual_label/visual_label_1.png",
    imageAlt: "Banner 2",
  },
  {
    id: "banner-3",
    imageUrl: "/images/visual_label/visual_label_2.png",
    imageAlt: "Banner 3",
  },
  {
    id: "banner-4",
    imageUrl: "/images/casino_visual/visual_bg_01.png",
    imageAlt: "Banner 4",
  },
];

export const BG_LIST = Array.from({ length: 13 }, (_, i) => `/images/casino/bg_${i + 1}_1.png`);

export const MINIBG_LIST = [
  ...Array.from({ length: 17 }, (_, i) => `/images/casino/minibg_${i + 1}.png`),
  ...Array.from({ length: 23 }, (_, i) => `/images/casino/bg_${i + 1}.png`),
];

const CASINO_GAMES: { slug: string; href: string }[] = [
  { slug: "evolution", href: "/game_casino" },
  { slug: "prag", href: "/game_casino" },
  { slug: "dream", href: "/game_casino" },
  { slug: "big", href: "/game_casino" },
  { slug: "ezugi", href: "/game_casino" },
  { slug: "micro", href: "/game_casino" },
  { slug: "oriental", href: "/game_casino" },
  { slug: "playtech", href: "/game_casino" },
  { slug: "sexy", href: "/game_casino" },
  { slug: "vivo", href: "/game_casino" },
];

export const CASINO_CARDS: CasinoCardItem[] = CASINO_GAMES.map((casino, i) => ({
  bgImage: BG_LIST[i % BG_LIST.length],
  minibgImage: MINIBG_LIST[i % MINIBG_LIST.length],
  mainIcon: `/images/casino/main_icon_${casino.slug}.png`,
  href: casino.href,
}));

const SLOT_GAMES: { title: string; slug: string; slotIndex?: number; isMaintenance?: boolean; href?: string }[] = [
  { title: "BNG", slug: "bng", slotIndex: 1, href: "#" },
  { title: "BTG", slug: "btg", slotIndex: 2, href: "#" },
  { title: "CC88", slug: "cc88", slotIndex: 3, href: "#" },
  { title: "CQ9", slug: "cq9", slotIndex: 4, href: "#" },
  { title: "Dragoon", slug: "dragoon", slotIndex: 5, href: "#" },
  { title: "Ely", slug: "ely", slotIndex: 6, href: "#" },
  { title: "Evoplay", slug: "evoplay", slotIndex: 7, href: "#" },
  { title: "Fastspin", slug: "fastspin", slotIndex: 8, href: "#" },
  { title: "게임아트", slug: "gameart", slotIndex: 9, href: "#" },
  { title: "Habanero", slug: "habanero", slotIndex: 10, href: "#" },
  { title: "Hack", slug: "hack", slotIndex: 11, href: "#" },
  { title: "Hidden Button", slug: "hiddenbutton", slotIndex: 12, href: "#" },
  { title: "KA Gaming", slug: "kagaming", slotIndex: 13, href: "#" },
  { title: "마이크로게이밍", slug: "micro", slotIndex: 14, isMaintenance: true, href: "#" },
  { title: "Naga", slug: "naga", slotIndex: 15, href: "#" },
  { title: "NetEnt", slug: "netent", slotIndex: 16, href: "#" },
  { title: "Next", slug: "next", slotIndex: 17, href: "#" },
  { title: "Nolimit", slug: "nolimit", slotIndex: 18, href: "#" },
  { title: "Petersons", slug: "peternsons", slotIndex: 19, href: "#" },
  { title: "PG Soft", slug: "pgsoft", slotIndex: 20, href: "#" },
  { title: "Play'n GO", slug: "playngo", slotIndex: 21, href: "#" },
  { title: "Playson", slug: "playson", slotIndex: 22, href: "#" },
  { title: "Playstar", slug: "playstar", slotIndex: 23, href: "#" },
  { title: "Playtech", slug: "playtech", slotIndex: 24, href: "#" },
  { title: "프라그마틱", slug: "prag", slotIndex: 25, isMaintenance: true, href: "#" },
  { title: "Quickspin", slug: "quickspin", slotIndex: 26, href: "#" },
  { title: "Red Tiger", slug: "redtiger", slotIndex: 27, href: "#" },
  { title: "Relax", slug: "relax", slotIndex: 28, href: "#" },
  { title: "Royal", slug: "royal", slotIndex: 29, href: "#" },
  { title: "Skywind", slug: "skywind", slotIndex: 30, href: "#" },
  { title: "Slotmeal", slug: "slotmeal", slotIndex: 31, href: "#" },
  { title: "Spade", slug: "spade", slotIndex: 32, href: "#" },
  { title: "Spinix", slug: "spinix", slotIndex: 33, href: "#" },
  { title: "Thunderkick", slug: "thunderkick", slotIndex: 34, href: "#" },
  { title: "Wazdan", slug: "wazdan", slotIndex: 35, href: "#" },
  { title: "World Match", slug: "world", href: "#" },
  { title: "Yggdrasil", slug: "ygg", href: "#" },
  { title: "YL", slug: "yl", href: "#" },
];

export const SLOT_CARDS: GameSlotCardItem[] = SLOT_GAMES.map(({ title, slug, slotIndex, isMaintenance, href }) => ({
  title,
  slug,
  slotIndex,
  isMaintenance,
  href,
}));

export const BETHISTORY_SLIDES: CarouselSlide[] = [
  {
    bgImage: "/images/bethistory_visual/visual_bg_sports_global.png",
    entityImage: "/images/bethistory_visual/visual_entity_sports_global.png",
    labelImage: "/images/visual_label/visual_label_1.png",
    bgColor: "#0a1628",
  },
];
