import { BarChart3Icon, ClipboardPaste, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const USERS = [
    { name: 'Linguamarina', followers: '8.52M', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_khZgrqVTSi_R9eAk5-MokIr5gBW9PjcqW0rCWne8eiRQ=s500-c-k-c0x00ffffff-no-rj', platform: 'youtube' },
    { name: 'TwoSetViolin', followers: '4.3M', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mHmmJdteY-heit7Ock09VJ1cy_L9nI6Xx-Js1fAu75kb8=s500-c-k-c0x00ffffff-no-rj', platform: 'youtube' },
    { name: 'Jon Youshaei', followers: '435K', avatar: 'https://yt3.googleusercontent.com/jiH-hkCKaWKt73eiZWe1HiLYYlsiFzWsrqxw7gt10Z6x-xNxvX4dkx_f8n_xTEGxtntH619Mvfg=s500-c-k-c0x00ffffff-no-rj', platform: 'youtube' },
    { name: 'Grant Cardone', followers: '4.7M', avatar: 'https://yt3.googleusercontent.com/ytc/AIdro_nHE1-JzcTZpa9fIQ_EMBngJ2l8Yzm7iKgvbDeSSorO8Q0=s500-c-k-c0x00ffffff-no-rj', platform: 'instagram'},
    { name: 'Mai Pham', followers: '3.3M', avatar: 'https://yt3.googleusercontent.com/EgfYDHhIPJVHATlHrOZftKrvi-ok4EjZKMRTHiohc6vWZemzxeUTaJG-oMTR3mRGD9p4mSXKvQ=s500-c-k-c0x00ffffff-no-rj', platform: 'youtube'},
    { name: 'Jenny Hoyos', followers: '4M', avatar: 'https://yt3.googleusercontent.com/6_E7rK9fLMC4czImyXKRBwmda-R-pzXLJCWsyuq6_WXHwDRpacqXozd4aHvhQO6yY5Xdwdvt=s500-c-k-c0x00ffffff-no-rj', platform: 'youtube'}
  ] as const;

export const PROCESS = [
    {
        title: "Provide a YouTube Link",
        description: "Our AI model will create clips of the most viral parts of your video.",
        icon: ClipboardPaste,
    },
    {
        title: "Let Shortsapp Do its Magic",
        description: "Our AI model will create clips of the most viral parts of your video.",
        icon: WandSparklesIcon,
    },
    {
        title: "Analyze and Post",
        description: "Gain insights into link performance and optimize for better engagement.",
        icon: BarChart3Icon,
    },
] as const;

export const FEATURES = [
    {
        title: "Link shortening",
        description: "Create short links that are easy to remember and share.",
    },
    {
        title: "Advanced analytics",
        description: "Track and measure the performance of your links.",
    },
    {
        title: "Password protection",
        description: "Secure your links with a password.",
    },
    {
        title: "Custom QR codes",
        description: "Generate custom QR codes for your links.",
    },
    {
        title: "Link expiration",
        description: "Set an expiration date for your links.",
    },
    {
        title: "Team collaboration",
        description: "Share links with your team and collaborate in real-time.",
    },
] as const;

export const REVIEWS = [
    {
        name: "Michael Smith",
        username: "@michaelsmith",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "This tool is a lifesaver! Managing and tracking my links has never been easier. A must-have for anyone dealing with numerous links."
    },
    {
        name: "Emily Johnson",
        username: "@emilyjohnson",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4,
        review: "Very useful app! It has streamlined my workflow considerably. A few minor bugs, but overall a great experience."
    },
    {
        name: "Daniel Williams",
        username: "@danielwilliams",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 5,
        review: "I've been using this app daily for months. The insights and analytics it provides are invaluable. Highly recommend it!"
    },
    {
        name: "Sophia Brown",
        username: "@sophiabrown",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 4,
        review: "This app is fantastic! It offers everything I need to manage my links efficiently."
    },
    {
        name: "James Taylor",
        username: "@jamestaylor",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        review: "Absolutely love this app! It's intuitive and feature-rich. Has significantly improved how I manage and track links."
    },
    {
        name: "Olivia Martinez",
        username: "@oliviamartinez",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 4,
        review: "Great app with a lot of potential. It has already saved me a lot of time. Looking forward to future updates and improvements."
    },
    {
        name: "William Garcia",
        username: "@williamgarcia",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 5,
        review: "This app is a game-changer for link management. It's easy to use, extremely powerful and highly recommended!"
    },
    {
        name: "Mia Rodriguez",
        username: "@miarodriguez",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
        review: "I've tried several link management tools, but this one stands out. It's simple, effective."
    },
    {
        name: "Henry Lee",
        username: "@henrylee",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        review: "This app has transformed my workflow. Managing and analyzing links is now a breeze. I can't imagine working without it."
    },
] as const;
