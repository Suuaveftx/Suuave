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
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return `${getOrdinal(day)} ${month}, ${year}`;
}

export const homePageCardData = [
  {
    title: 'Secure Transaction',
    text: 'We hold payments in escrow via our trusted payment gateway, releasing them only when all parties confirm satisfaction.',
    image: '/dev-images/Secure.png', // Replace with actual image URL or path
  },
  {
    title: 'Copyright Protection',
    text: 'We prioritize fairness for all users and prevent unauthorized use of designs. ',
    image: '/dev-images/copy.png',
  },
  {
    title: 'User Verification',
    text: 'We create a safe environment for users, fostering trust and encouraging genuine collaboration.',
    image: '/dev-images/user.png',
  },
  {
    title: 'Streamlined Collaboration',
    text: 'We facilitate efficient and productive partnerships with our messaging and product management features to improve the overall user experience.',
    image: '/dev-images/streamed.png',
  },
  {
    title: 'Open Dispute Resolution',
    text: 'We reduce the risk of disputes to maintain a positive and productive environment for everyone. ',
    image: '/dev-images/justice.png',
  },
  {
    title: 'Community Development',
    text: 'We empower our users and contribute to the development of the African fashion industry.',
    image: '/dev-images/web.png',
  },
];

export const fashionSection = [
  {
    title: 'Register',
    text: 'Join over 5000 other artists and sign up seamlessly.',
    image: '/dev-images/register.png',
  },
  {
    title: 'Apply For Jobs',
    text: 'Browse job boards and apply for exciting projects with fashion designers and brands. Target opportunities that showcase your unique skills and design style.',
    image: '/dev-images/Apply.png',
  },
  {
    title: 'Monetize Your Vision',
    text: 'Upload your designs and earn income by licensing them to top fashion designers and brands.',
    image: '/dev-images/publish.png',
  },
  {
    title: 'Get Paid',
    text: 'Your payment is automatically processed after project completion and licensing.',
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
    text: 'Discover stunning designs and elevate your brand with authentic African creativity.',
    btnText: 'Explore',
  },
];
