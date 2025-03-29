import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const homePageCardData = [
  {
    title: "Secure Transaction",
    text: "We use the best, most secure pay-out gateway. Every due payment is processed without delay.",
    image: "/dev-images/Secure.png", // Replace with actual image URL or path
  },
  {
    title: "Copyright Protection",
    text: "We prioritize fairness for all users and prevent unauthorized use of designs. ",
    image: "/dev-images/copy.png",
  },
  {
    title: "User Verification",
    text: "We create a safe environment for users, fostering trust and encouraging genuine collaboration",
    image: "/dev-images/user.png",
  },
  {
    title: "Streamlined Collaboration",
    text: "We facilitate efficient and productive partnerships with our messaging and product management features to improve the overall user experience.",
    image: "/dev-images/streamed.png",
  },
  {
    title: "Open Dispute Resolution",
    text: "We reduce the risk of disputes to maintain a positive and productive environment for everyone. ",
    image: "/dev-images/justice.png",
  },
  {
    title: "Community Development",
    text: "We empower our users and contribute to the development of the African fashion industry.",
    image: "/dev-images/web.png",
  },
];

export const fashionSection = [
  {
    title: "Register",
    text: "Join over 5000 other artists and illustrators by signing up with your email address and through Google. Easy and seamless sign-up.",
    image: "/dev-images/register.png",
  },
  {
    title: "Apply For Jobs",
    text: "Browse job postings from top designers/brands seeking African fashion expertise and apply for projects that match your skills and style.",
    image: "/dev-images/Apply.png",
  },
  {
    title: "Monetize Your Vision",
    text: "Upload your designs and earn income by licensing them to top fashion designers and brands",
    image: "/dev-images/publish.png",
  },
  {
    title: "Get Paid",
    text: "Your payment is automatically processed after a satisfactory work done and when your designs are licensed.",
    image: "/dev-images/Cash.png",
  },
];

export const fashionDsignRightSection = [
  {
    title: "Register",
    text: "Build your brand profile, and unlock access to a world of exceptional African talents.",
    btnText: "Get Started",
  },
  {
    title: "Hire Effortlessly",
    text: "Post your project needs and find the artists who resonate with your brand, all in one place.",
    btnText: "Post Jobs",
  },
  {
    title: "Explore and License",
    text: "Discover stunning designs and elevate your brand with authentic African creativity.",
    btnText: "Explore",
  },
];
