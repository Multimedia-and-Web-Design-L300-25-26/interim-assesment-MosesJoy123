import learnBank from "../assets/Replace_Bank.png";
import learnBitcoin from "../assets/Learn_Illustration_Ultimate_Guide_Bitcoin.png";
import learnUsdc from "../assets/0_4mVyVaU6yLa--GR_.png";
import btcLogo from "../assets/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png";
import ethLogo from "../assets/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png";
import usdtLogo from "../assets/1f8489bb280fb0a0fd643c1161312ba49655040e9aaaced5f9ad3eeaf868eadc.png";
import bnbLogo from "../assets/c347b6d1a7624e24c4e90089a69dfc8fb75523daf8eeb88007372a0c3a30d428.png";
import xrpLogo from "../assets/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png";
import usdcLogo from "../assets/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png";

export const navLinks = [
  { label: "Cryptocurrencies", href: "https://www.coinbase.com/explore" },
  { label: "Individuals", href: "https://www.coinbase.com/" },
  { label: "Businesses", href: "https://www.coinbase.com/business" },
  { label: "Institutions", href: "https://www.coinbase.com/institutional" },
  { label: "Developers", href: "https://www.coinbase.com/developer-platform" },
  { label: "Company", href: "https://www.coinbase.com/about" },
];

export const cryptoAssets = [
  { name: "Bitcoin", symbol: "btc", price: "$67,329.27", change: "+3.2%", marketCap: "$1.3T" },
  { name: "Ethereum", symbol: "eth", price: "$3,462.90", change: "+1.8%", marketCap: "$416B" },
  { name: "Tether", symbol: "usdt", price: "$1.00", change: "0.0%", marketCap: "$102B" },
  { name: "BNB", symbol: "bnb", price: "$580.46", change: "+2.1%", marketCap: "$89B" },
  { name: "XRP", symbol: "xrp", price: "$0.61", change: "+4.6%", marketCap: "$33B" },
  { name: "USDC", symbol: "usdc", price: "$1.00", change: "0.0%", marketCap: "$31B" },
];

export const marketPanelAssets = [
  { name: "Bitcoin", price: "GHS 726,001.59", change: "1.38%", icon: btcLogo },
  { name: "Ethereum", price: "GHS 21,245.09", change: "0.71%", icon: ethLogo },
  { name: "Tether", price: "GHS 10.77", change: "0.02%", icon: usdtLogo },
  { name: "BNB", price: "GHS 6,687.00", change: "1.28%", icon: bnbLogo },
  { name: "XRP", price: "GHS 14.62", change: "0.67%", icon: xrpLogo },
  { name: "USDC", price: "GHS 10.77", change: "--", icon: usdcLogo },
];

export const learnArticles = [
  {
    title: "USDC: The digital dollar for the global crypto economy",
    description:
      "Learn how stablecoins help bridge traditional and decentralized finance for global payments.",
    image: learnUsdc,
    to: "/learn",
  },
  {
    title: "Can crypto really replace your bank account?",
    description:
      "Explore where crypto wallets can complement banking and where traditional tools are still needed.",
    image: learnBank,
    to: "/learn",
  },
  {
    title: "When is the best time to invest in crypto?",
    description:
      "Understand long-term strategies like dollar-cost averaging and risk-conscious portfolio planning.",
    image: learnBitcoin,
    to: "/learn",
  },
];

export const footerColumns = [
  {
    heading: "Company",
    links: ["About", "Careers", "Affiliates", "Blog", "Security", "Investors"],
  },
  {
    heading: "Learn",
    links: ["Explore", "Market Stats", "Crypto Basics", "Tips & Tutorials", "Newsletters"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Contact Us", "Status", "API Docs", "Taxes"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy", "Digital Asset Disclosures"],
  },
];
