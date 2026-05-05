import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/coinbase_logo@2x.png";
import companyUpsell from "../../assets/company_upsell.png";
import developersUpsell from "../../assets/developers_upsell_cdxv2_2.jpg";
import institutionsUpsell from "../../assets/institutions_upsell.png";
import paymentsUpsell from "../../assets/onchain_payment_protocol.png";
import navigationUpsell from "../../assets/navigation-upsell.png";
import Button from "../common/Button.jsx";
import { marketPanelAssets, navLinks } from "../../data/siteData.js";

const companyMenuLinks = [
  { badge: "i", title: "About", description: "Powering the crypto economy" },
  { badge: "J", title: "Careers", description: "Work with us" },
  { badge: "A", title: "Affiliates", description: "Help introduce the world to crypto" },
  { badge: "S", title: "Support", description: "Find answers to your questions" },
  { badge: "B", title: "Blog", description: "Read the latest from Coinbase" },
  { badge: "C", title: "Security", description: "The most trusted & secure" },
];

const developersMenuPrimary = [
  { badge: "P", title: "Payments", description: "Fast and global stablecoin payments with a single integration" },
  { badge: "T", title: "Trading", description: "Launch crypto trading and custody for your users" },
  { badge: "W", title: "Wallets", description: "Deploy customizable and scalable wallets for your business" },
  { badge: "S", title: "Stablecoins", description: "Access USDC and Coinbase Custom Stablecoins" },
];

const developersMenuSecondary = [
  { badge: "B", title: "Banks & Brokerages", description: "Secure, regulated offerings for retail, banking, & institutional clients" },
  { badge: "F", title: "Payment Firms", description: "Near-instant, low-cost, global payment rails for modern providers" },
  { badge: "U", title: "Startups", description: "Launch your business with the world's leader in crypto" },
];

const institutionsPrimeMenu = [
  { badge: "TF", title: "Trading and Financing", description: "Professional prime brokerage services" },
  { badge: "CU", title: "Custody", description: "Securely store all your digital assets" },
  { badge: "ST", title: "Staking", description: "Explore staking across our products" },
  { badge: "OW", title: "Onchain Wallet", description: "Institutional-grade wallet to get onchain" },
];

const institutionsMarketsMenu = [
  { badge: "EX", title: "Exchange", description: "Spot markets for high-frequency trading" },
  { badge: "IX", title: "International Exchange", description: "Access perpetual futures markets" },
  { badge: "DX", title: "Derivatives Exchange", description: "Trade an accessible futures market" },
  { badge: "VP", title: "Verified Pools", description: "Transparent, verified liquidity pools" },
];

const languageOptions = [
  { language: "English", region: "Global", selected: true },
  { language: "Espanol", region: "United States" },
  { language: "English", region: "United States" },
  { language: "Deutsch", region: "Germany" },
  { language: "Francais", region: "France" },
  { language: "Italiano", region: "Italy" },
  { language: "Portugues", region: "Brazil" },
  { language: "Nederlands", region: "Netherlands" },
];

const businessesMenu = [
  { badge: "BU", title: "Business", description: "Crypto trading and payments for startups and SMBs" },
  { badge: "PA", title: "Payments", description: "The stablecoin payments stack for commerce platforms" },
  { badge: "AL", title: "Asset Listings", description: "List your asset on Coinbase" },
  { badge: "TM", title: "Token Manager", description: "The platform for token distributions, vesting, and lockups" },
];

const individualsMenu = [
  { badge: "BS", title: "Buy and sell", description: "Buy, sell, and use crypto" },
  { badge: "AD", title: "Advanced", description: "Professional-grade trading tools" },
  { badge: "BA", title: "Base App", description: "Post, earn, trade, and chat, all in one place" },
  { badge: "EA", title: "Earn", description: "Stake your crypto and earn rewards" },
  { badge: "CO", title: "Coinbase One", description: "Get zero trading fees and more" },
  { badge: "CW", title: "Coinbase Wealth", description: "Institutional-grade services for UHNW" },
  { badge: "PC", title: "Private Client", description: "For trusts, family offices, UHNWIs" },
  { badge: "CC", title: "Credit Card", description: "Earn up to 4% bitcoin back" },
  { badge: "ON", title: "Onchain", description: "Dive into the world of onchain apps" },
  { badge: "DC", title: "Debit Card", description: "Spend crypto, get crypto back" },
];

const searchTabs = ["Top", "Crypto", "Stocks", "Predictions", "Perpetuals", "Futures"];

const searchRows = [
  { section: "CRYPTO", name: "Bitcoin", symbol: "BTC", rank: "#1", volume: "GHS 287.7B vol", marketCap: "GHS 14.0T mcap", price: "GHS 717,240.41", change: "0.93%", trend: "down", icon: marketPanelAssets[0]?.icon },
  { section: "CRYPTO", name: "Ethereum", symbol: "ETH", rank: "#2", volume: "GHS 141.1B vol", marketCap: "GHS 2.5T mcap", price: "GHS 21,110.52", change: "0.18%", trend: "up", icon: marketPanelAssets[1]?.icon },
  { section: "CRYPTO", name: "Tether", symbol: "USDT", rank: "#3", volume: "GHS 588.3B vol", marketCap: "GHS 2.0T mcap", price: "GHS 10.77", change: "0.01%", trend: "up", icon: marketPanelAssets[2]?.icon },
  { section: "STOCKS", name: "NVIDIA", symbol: "NVDA", volume: "GHS 2.0B vol", marketCap: "GHS 46.3T mcap", price: "GHS 1918.21", change: "2.90%", trend: "down" },
  { section: "STOCKS", name: "Apple", symbol: "AAPL", volume: "GHS 443.9M vol", marketCap: "GHS 40.9T mcap", price: "GHS 2769.08", change: "1.26%", trend: "down" },
  { section: "STOCKS", name: "Alphabet Inc. Class A", symbol: "GOOGL", volume: "GHS 275.8M vol", marketCap: "GHS 38.8T mcap", price: "GHS 3201.47", change: "1.25%", trend: "down" },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="20" y1="20" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function StockBadgeIcon() {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#2563eb] text-[#2563eb]">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v6" />
        <path d="M12 16h.01" />
      </svg>
    </span>
  );
}

function MenuSymbol({ name }) {
  const common = "h-5 w-5";

  switch (name) {
    case "About":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      );
    case "Careers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5h8v2" />
        </svg>
      );
    case "Affiliates":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 19a6 6 0 0 1 12 0" />
          <path d="M18 8v6" />
          <path d="M15 11h6" />
        </svg>
      );
    case "Support":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M4 5h16v10H8l-4 4z" />
          <path d="M8 9h8" />
          <path d="M8 12h5" />
        </svg>
      );
    case "Blog":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="M8 8h2" />
          <path d="M12 8h4" />
          <path d="M8 12h8" />
          <path d="M8 16h8" />
        </svg>
      );
    case "Security":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "Payments":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 12c2.5-3 5.5-3 8 0s5.5 3 8 0" />
          <path d="M3 16c2.5-3 5.5-3 8 0s5.5 3 8 0" />
        </svg>
      );
    case "Trading":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M6 4v16" />
          <path d="M12 6v12" />
          <path d="M18 3v18" />
          <path d="M4 9h4" />
          <path d="M10 14h4" />
          <path d="M16 7h4" />
        </svg>
      );
    case "Wallets":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 7h18v12H3z" />
          <path d="M3 7l3-3h9" />
          <path d="M17 13h4" />
        </svg>
      );
    case "Stablecoins":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M9 10c0-1.2 1.2-2 3-2s3 .8 3 2-1.2 2-3 2-3 .8-3 2 1.2 2 3 2 3-.8 3-2" />
        </svg>
      );
    case "Banks & Brokerages":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 10h18" />
          <path d="M5 10v8" />
          <path d="M10 10v8" />
          <path d="M14 10v8" />
          <path d="M19 10v8" />
          <path d="M2 18h20" />
          <path d="M12 4l9 4H3z" />
        </svg>
      );
    case "Payment Firms":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
        </svg>
      );
    case "Startups":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 3l8 5-8 5-8-5z" />
          <path d="M4 13l8 5 8-5" />
        </svg>
      );
    case "Trading and Financing":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 8l8 8" />
        </svg>
      );
    case "Custody":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "Staking":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M8 16l8-8" />
          <path d="M8 8h0" />
          <path d="M16 16h0" />
          <path d="M5 19l14-14" />
        </svg>
      );
    case "Onchain Wallet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M4 4h4v4H4z" />
          <path d="M16 4h4v4h-4z" />
          <path d="M4 16h4v4H4z" />
          <path d="M16 16h4v4h-4z" />
        </svg>
      );
    case "Exchange":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M8 7l4 4-4 4" />
          <path d="M4 7h4" />
          <path d="M16 17l-4-4 4-4" />
          <path d="M16 17h4" />
        </svg>
      );
    case "International Exchange":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
        </svg>
      );
    case "Derivatives Exchange":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M4 16l6-4 4 2 6-4" />
          <path d="M4 8l6 4 4-2 6 4" />
        </svg>
      );
    case "Verified Pools":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="7" cy="12" r="2" />
          <circle cx="17" cy="7" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M9 12h6" />
          <path d="M15.5 8.5L9 11" />
          <path d="M15.5 15.5L9 13" />
        </svg>
      );
    case "Business":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 8h18v12H3z" />
          <path d="M8 8V5h8v3" />
        </svg>
      );
    case "Asset Listings":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <circle cx="8" cy="16" r="3" />
          <circle cx="16" cy="16" r="3" />
        </svg>
      );
    case "Token Manager":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 4a7 7 0 1 0 7 7" />
          <path d="M12 1v6" />
          <path d="M12 12l5-5" />
        </svg>
      );
    case "Buy and sell":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8" />
        </svg>
      );
    case "Advanced":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M6 4v16" />
          <path d="M12 6v12" />
          <path d="M18 3v18" />
        </svg>
      );
    case "Base App":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
        </svg>
      );
    case "Earn":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M8 16l8-8" />
          <path d="M8 8h0" />
          <path d="M16 16h0" />
          <path d="M5 19l14-14" />
        </svg>
      );
    case "Coinbase One":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12" />
          <path d="M6 12h12" />
        </svg>
      );
    case "Coinbase Wealth":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M3 10h18" />
          <path d="M12 4l4 6h-8z" />
          <path d="M7 10l5 10 5-10" />
        </svg>
      );
    case "Private Client":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M12 4l4 6h-8z" />
          <path d="M7 10l5 10 5-10" />
        </svg>
      );
    case "Credit Card":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
          <path d="M15 9l4-4" />
        </svg>
      );
    case "Onchain":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <path d="M10 13l4-4a3 3 0 1 1 4 4l-3 3" />
          <path d="M14 11l-4 4a3 3 0 1 1-4-4l3-3" />
        </svg>
      );
    case "Debit Card":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h4" />
        </svg>
      );
    default:
      return <span className="text-sm font-semibold">•</span>;
  }
}

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState("");
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState("Top");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const languageMenuRef = useRef(null);
  const searchMenuRef = useRef(null);

  const filteredLanguageOptions = useMemo(() => {
    const query = languageSearch.trim().toLowerCase();
    if (!query) {
      return languageOptions;
    }

    return languageOptions.filter((item) => {
      const combined = `${item.language} ${item.region}`.toLowerCase();
      return combined.includes(query);
    });
  }, [languageSearch]);

  const filteredSearchRows = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let baseRows = [];

    if (activeSearchTab === "Top") {
      baseRows = searchRows;
    } else if (activeSearchTab === "Crypto") {
      baseRows = searchRows.filter((item) => item.section === "CRYPTO");
    } else if (activeSearchTab === "Stocks") {
      baseRows = searchRows.filter((item) => item.section === "STOCKS");
    } else {
      baseRows = [];
    }

    if (!query) {
      return baseRows;
    }

    return baseRows.filter((item) => {
      const text = `${item.name} ${item.symbol} ${item.section}`.toLowerCase();
      return text.includes(query);
    });
  }, [activeSearchTab, searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchMenuRef.current && !searchMenuRef.current.contains(event.target)) {
        setIsSearchMenuOpen(false);
      }

      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("cb_auth_token");
    const userData = localStorage.getItem("cb_auth_user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cb_auth_token");
    localStorage.removeItem("cb_auth_user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <header
      className="sticky top-0 z-50 border-b border-slate-300 bg-[#f2f3f5]"
      onMouseLeave={() => setOpenMegaMenu("")}
    >
      <div className="page-wrap flex h-[62px] items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-5">
          <Link to="/" className="flex items-center gap-2" aria-label="Coinbase home">
            <img src={logo} alt="Coinbase" className="h-7 w-auto" />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex">
            {navLinks.map((link) => (
              link.label === "Cryptocurrencies" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("")}
                  className="text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700"
                >
                  {link.label}
                </button>
              ) : link.label === "Company" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("company")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    openMegaMenu === "company" ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              ) : link.label === "Developers" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("developers")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    openMegaMenu === "developers" ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              ) : link.label === "Institutions" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("institutions")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    openMegaMenu === "institutions" ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              ) : link.label === "Businesses" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("businesses")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    openMegaMenu === "businesses" ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              ) : link.label === "Individuals" ? (
                <button
                  key={link.label}
                  type="button"
                  onMouseEnter={() => setOpenMegaMenu("individuals")}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    openMegaMenu === "individuals" ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setOpenMegaMenu("")}
                  className="text-sm font-semibold text-slate-900 transition-colors hover:text-slate-700"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 lg:flex lg:flex-nowrap">
          <div className="relative" ref={searchMenuRef}>
            <button
              type="button"
              className="grid h-[42px] w-[42px] place-items-center rounded-full bg-slate-200 text-slate-900 transition-colors hover:bg-slate-300"
              aria-label="Search"
              onClick={() => setIsSearchMenuOpen((prev) => !prev)}
            >
              <SearchIcon />
            </button>

            {isSearchMenuOpen ? (
              <div className="absolute -right-8 top-[52px] z-[70] w-[min(680px,calc(100vw-1rem))] overflow-hidden rounded-[22px] border border-slate-300 bg-[#ececec] shadow-2xl">
                <div className="border-b border-slate-300 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-2">
                      <SearchIcon />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search assets"
                        className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchMenuOpen(false);
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-slate-300 text-slate-700 transition-colors hover:bg-slate-400"
                      aria-label="Cancel search"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                  {searchTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSearchTab(tab)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-semibold leading-none ${
                        activeSearchTab === tab ? "bg-black text-white" : "bg-[#d9dbe0] text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  </div>
                </div>

                <div className="max-h-[320px] overflow-y-scroll py-1">
                  {filteredSearchRows.length === 0 ? (
                    <p className="px-5 py-8 text-sm font-medium text-slate-600">No assets available for this category yet.</p>
                  ) : null}

                  {filteredSearchRows.map((item, index) => {
                    const showSection = index === 0 || filteredSearchRows[index - 1].section !== item.section;

                    return (
                      <div key={`${item.section}-${item.name}`}>
                        {showSection ? (
                          <p className="px-5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">{item.section}</p>
                        ) : null}

                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-5 py-2 text-left transition-colors hover:bg-[#dfe1e6]"
                        >
                          <span className="flex items-center gap-3">
                            {item.icon ? (
                              <img src={item.icon} alt={item.name} className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                              <StockBadgeIcon />
                            )}
                            <span>
                              <span className="flex items-center gap-2">
                                <strong className="text-[15px] font-semibold leading-none text-slate-900">{item.name}</strong>
                                {item.rank ? <span className="rounded-xl bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">{item.rank}</span> : null}
                              </span>
                              <span className="mt-0.5 block text-xs font-medium leading-none text-slate-600">{item.symbol}</span>
                            </span>
                          </span>

                          <span className="flex items-center gap-4">
                            <span className="text-right text-[11px] leading-tight text-slate-600">
                              <span className="block">{item.volume}</span>
                              <span className="block">{item.marketCap}</span>
                            </span>

                            <span className="w-[145px] text-right">
                              <strong className="block text-[15px] font-semibold leading-none text-slate-900">{item.price}</strong>
                              <span className={`mt-1 block text-sm font-semibold ${item.trend === "up" ? "text-emerald-600" : "text-rose-500"}`}>
                                {item.trend === "up" ? "↗" : "↘"} {item.change}
                              </span>
                            </span>
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              className="grid h-[42px] w-[42px] place-items-center rounded-full bg-slate-200 text-slate-900 transition-colors hover:bg-slate-300"
              aria-label="Language"
              onClick={() => setIsLanguageMenuOpen((prev) => !prev)}
            >
              <GlobeIcon />
            </button>

            {isLanguageMenuOpen ? (
              <div className="absolute right-0 top-[52px] z-[70] w-[340px] rounded-3xl border border-slate-300 bg-[#f2f3f5] p-5 shadow-xl">
                <p className="text-base font-semibold text-slate-700">Language and region</p>

                <div className="mt-4 flex items-center gap-3 rounded-full bg-slate-200 px-4 py-3">
                  <SearchIcon />
                  <input
                    value={languageSearch}
                    onChange={(event) => setLanguageSearch(event.target.value)}
                    placeholder="Search"
                    className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-500"
                  />
                </div>

                <div className="mt-4 max-h-[260px] space-y-2 overflow-y-auto pr-1">
                  {filteredLanguageOptions.map((item) => (
                    <button
                      key={`${item.language}-${item.region}`}
                      type="button"
                      className={`w-full rounded-2xl px-4 py-3 text-left transition-colors ${item.selected ? "bg-slate-200" : "hover:bg-slate-200/70"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-900">{item.language}</p>
                          <p className="text-[13px] text-slate-600">{item.region}</p>
                        </div>
                        {item.selected ? <span className="text-emerald-600">✓</span> : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            {isLoggedIn && user ? (
              <>
                <Button
                  to="/profile"
                  variant="secondary"
                  className="h-[38px] rounded-[999px] border-transparent bg-slate-200 px-5 text-[11px] font-semibold hover:bg-slate-300"
                >
                  {user.name}
                </Button>
                <button
                  onClick={handleLogout}
                  className="h-[38px] rounded-[999px] bg-blue-600 px-5 text-[11px] font-semibold text-white hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Button
                  to="/signin"
                  variant="secondary"
                  className="h-[38px] rounded-[999px] border-transparent bg-slate-200 px-5 text-[11px] font-semibold hover:bg-slate-300"
                >
                  Sign in
                </Button>
                <Button to="/signup" className="h-[38px] rounded-[999px] px-5 text-[11px] font-semibold">
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {openMegaMenu ? (
        <>
          <div className="pointer-events-none fixed inset-0 top-20 z-40 bg-white/35 backdrop-blur-md" />
          <div className="relative z-50 hidden border-t border-slate-200 bg-[#f2f3f5] lg:block">
            {openMegaMenu === "company" ? (
              <div className="mx-auto grid w-[min(1200px,72vw)] gap-8 py-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  {companyMenuLinks.map((item) => (
                    <a
                      key={item.title}
                      href="https://www.coinbase.com/about"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-start gap-4"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                        <MenuSymbol name={item.title} />
                      </span>
                      <span>
                        <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                        <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                  <img src={companyUpsell} alt="Crypto moves money forward" className="w-full rounded-3xl object-cover" />
                  <div>
                    <p className="text-[13px] font-medium leading-[1.3] tracking-tight text-slate-900">
                      Learn all about Coinbase: We're building the open financial system.
                    </p>
                    <a href="https://www.coinbase.com/signup" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[13px] font-bold underline">
                      Create your account
                    </a>
                  </div>
                </div>
              </div>
            ) : openMegaMenu === "developers" ? (
              <div className="mx-auto grid w-[min(1400px,84vw)] gap-8 py-8 lg:grid-cols-[1.5fr_1fr]">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <a href="https://www.coinbase.com/developer-platform" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[13px] font-semibold text-slate-900">
                      Coinbase Developer Platform <span aria-hidden="true">›</span>
                    </a>
                    <div className="mt-6 space-y-5">
                      {developersMenuPrimary.map((item) => (
                        <a key={item.title} href="https://www.coinbase.com/developer-platform" target="_blank" rel="noreferrer" className="flex gap-4">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                            <MenuSymbol name={item.title} />
                          </span>
                          <span>
                            <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                            <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-slate-900">Solutions for any company</h3>
                    <div className="mt-6 space-y-5">
                      {developersMenuSecondary.map((item) => (
                        <a key={item.title} href="https://www.coinbase.com/developer-platform" target="_blank" rel="noreferrer" className="flex gap-4">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                            <MenuSymbol name={item.title} />
                          </span>
                          <span>
                            <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                            <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                  <img src={developersUpsell} alt="Developer platform" className="w-full rounded-3xl object-cover" />
                  <div>
                    <p className="text-[13px] font-medium leading-[1.3] tracking-tight text-slate-900">
                      World class crypto infrastructure. Discover Coinbase's complete crypto-as-a-service platform.
                    </p>
                    <a href="https://www.coinbase.com/developer-platform" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[13px] font-bold underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            ) : openMegaMenu === "businesses" ? (
              <div className="mx-auto grid w-[min(1300px,78vw)] gap-8 py-8 lg:grid-cols-[1.35fr_1fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  {businessesMenu.map((item) => (
                    <a key={item.title} href="https://www.coinbase.com/business" target="_blank" rel="noreferrer" className="flex gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                        <MenuSymbol name={item.title} />
                      </span>
                      <span>
                        <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                        <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                  <img src={paymentsUpsell} alt="Commerce payments" className="w-full rounded-3xl object-cover" />
                  <div>
                    <p className="text-[13px] font-medium leading-[1.3] tracking-tight text-slate-900">
                      Commerce Payments Protocol. A new standard for onchain payments.
                    </p>
                    <a href="https://www.coinbase.com/business" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[13px] font-bold underline">
                      Go to Payments
                    </a>
                  </div>
                </div>
              </div>
            ) : openMegaMenu === "individuals" ? (
              <div className="mx-auto grid w-[min(1400px,84vw)] gap-8 py-8 lg:grid-cols-[1.45fr_1fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  {individualsMenu.map((item) => (
                    <a key={item.title} href="https://www.coinbase.com/" target="_blank" rel="noreferrer" className="flex gap-4">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                        <MenuSymbol name={item.title} />
                      </span>
                      <span>
                        <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                        <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                  <img src={navigationUpsell} alt="System update" className="w-full rounded-3xl object-cover" />
                  <div>
                    <p className="text-[13px] font-medium leading-[1.3] tracking-tight text-slate-900">
                      System Update 2025. The next chapter of Coinbase. Live on X 12/17.
                    </p>
                    <a href="https://www.coinbase.com/" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[13px] font-bold underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto grid w-[min(1400px,84vw)] gap-8 py-8 lg:grid-cols-[1.5fr_1fr]">
                <div className="grid gap-8 lg:grid-cols-2">
                  <div>
                    <a href="https://www.coinbase.com/prime" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-[13px] font-semibold text-slate-900">
                      Prime <span aria-hidden="true">›</span>
                    </a>
                    <div className="mt-6 space-y-5">
                      {institutionsPrimeMenu.map((item) => (
                        <a key={item.title} href="https://www.coinbase.com/prime" target="_blank" rel="noreferrer" className="flex gap-4">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                            <MenuSymbol name={item.title} />
                          </span>
                          <span>
                            <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                            <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-slate-900">Markets</h3>
                    <div className="mt-6 space-y-5">
                      {institutionsMarketsMenu.map((item) => (
                        <a key={item.title} href="https://www.coinbase.com/international-exchange" target="_blank" rel="noreferrer" className="flex gap-4">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                            <MenuSymbol name={item.title} />
                          </span>
                          <span>
                            <strong className="block text-[13px] font-semibold leading-none text-slate-900">{item.title}</strong>
                            <span className="mt-1 block text-[13px] text-slate-600">{item.description}</span>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid items-center gap-4 md:grid-cols-[220px_1fr]">
                  <img src={institutionsUpsell} alt="Institutions" className="w-full rounded-3xl object-cover" />
                  <div>
                    <p className="text-[13px] font-medium leading-[1.3] tracking-tight text-slate-900">
                      Our clients. Trusted by institutions and government.
                    </p>
                    <a href="https://www.coinbase.com/institutional" target="_blank" rel="noreferrer" className="mt-3 inline-block text-[13px] font-bold underline">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : null}

      {isOpen ? (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="page-wrap flex flex-col gap-3 py-4">
            {navLinks.map((link) => (
              link.label === "Cryptocurrencies" ? (
                <button
                  key={link.label}
                  type="button"
                  className="rounded-lg px-2 py-1 text-left text-sm font-semibold text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="mt-2 flex gap-2">
              <Button to="/signin" variant="secondary" className="flex-1" onClick={() => setIsOpen(false)}>
                Sign in
              </Button>
              <Button to="/signup" className="flex-1" onClick={() => setIsOpen(false)}>
                Sign up
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
