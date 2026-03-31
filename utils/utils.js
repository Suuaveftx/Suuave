import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatToNaira(amount) {
  return `₦${amount.toLocaleString('en-NG')}`;
}

export function formatToUSD(amount) {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatNumberShort(num) {
  if (num < 1000) return num.toString();

  const units = ['', 'k', 'M', 'B', 'T'];
  const order = Math.floor(Math.log10(num) / 3);
  const unit = units[order];
  const scaled = num / Math.pow(1000, order);

  return `${scaled.toFixed(scaled < 10 ? 1 : 0)}${unit}`;
}

export function formatDateWithOrdinal(dateInput) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${getOrdinal(day)} ${month}, ${year}`;
}

export const homePageCardData = [
  {
    title: 'Global Escrow Protection',
    text: 'Our institutional-grade escrow system secures funds throughout the project lifecycle, ensuring capital is only settled upon verified delivery and mutual satisfaction.',
    image: '/dev-images/Secure.png', // Replace with actual image URL or path
  },
  {
    title: 'Digital Rights Management',
    text: 'Every collaboration is backed by legally binding IP frameworks and smart-contract verification.',
    image: '/dev-images/copy.png',
  },
  {
    title: 'Vetted Talent Marketplace',
    text: 'Every professional on Suuave undergoes a rigorous multi-step verification process, ensuring that global brands connect to talents.',
    image: '/dev-images/user.png',
  },
  {
    title: 'End-to-End Creative Management',
    text: 'Our integrated project management and secure messaging suite replace fragmented workflows, reducing production lead times by centralizing the creative pipeline.',
    image: '/dev-images/streamed.png',
  },
  {
    title: 'Open Dispute Resolution',
    text: 'Our transparent resolution protocols and expert mediation ensure that project roadblocks are resolved swiftly, protecting the interests and investments of both parties.',
    image: '/dev-images/justice.png',
  },
  {
    title: 'COMMUNITY DEVELOPMENT',
    text: 'By standardizing professional interactions, we enable local artistry to integrate seamlessly into the $1.5 trillion global apparel market.',
    image: '/dev-images/web.png',
  },
];

export const fashionSection = [
  {
    title: 'Register',
    text: 'Join 5,000+ elite creators and build your professional global profile.',
    image: '/dev-images/register.png',
  },
  {
    title: 'Apply For Jobs',
    text: 'Browse job boards and apply for exciting projects with fashion designers and brands. Target opportunities that showcase your unique skills and design style.',
    image: '/dev-images/Apply.png',
  },
  {
    title: 'Monetise Your Vision',
    text: "Turn your portfolio into a revenue engine. License your designs to the world's leading fashion houses.",
    image: '/dev-images/publish.png',
  },
  {
    title: 'Secure Payouts',
    text: 'Receive your earnings in your wallet and transfer to your local bank account. No need of chasing invoices or cross-border payment delays.',
    image: '/dev-images/Cash.png',
  },
];

export const fashionDsignRightSection = [
  {
    title: 'Register',
    text: 'Build your brand profile, and unlock access to a world of exceptional African talents.',
    btnText: 'Get Started',
  },
  {
    title: 'Hire Effortlessly',
    text: 'Post your project needs and find the artists who resonate with your brand, all in one place.',
    btnText: 'Post Jobs',
  },
  {
    title: 'Explore and License',
    text: 'Elevate your brand with authenticated African creativity, protected by global-standard IP contracts.',
    btnText: 'Explore',
  },
];

export const getActiveCategory = () => {
  if (typeof window !== 'undefined') {
    const selectedCategory = localStorage.getItem('activeCategory') || null;
    return selectedCategory;
  }
};
