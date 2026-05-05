import iconX from "../../assets/x-light.svg";
import iconInstagram from "../../assets/instagram-light.svg";
import iconLinkedin from "../../assets/linkedin-light.svg";
import iconTiktok from "../../assets/tiktok-light.svg";

const socialLinks = [
  { icon: iconX, alt: "X", href: "https://x.com/coinbase" },
  { icon: iconInstagram, alt: "Instagram", href: "https://www.instagram.com/coinbase" },
  { icon: iconLinkedin, alt: "LinkedIn", href: "https://www.linkedin.com/company/coinbase" },
  { icon: iconTiktok, alt: "TikTok", href: "https://www.tiktok.com/@coinbase" },
];

const footerGroups = [
  {
    heading: "Company",
    links: [
      "About",
      "Careers",
      "Affiliates",
      "Blog",
      "Press",
      "Security",
      "Investors",
      "Vendors",
      "Legal & privacy",
      "Cookie policy",
      "Cookie preferences",
      "Digital Asset Disclosures",
    ],
  },
  {
    heading: "Individuals",
    links: ["Buy & sell", "Earn free crypto", "Base App", "Coinbase One", "Debit Card"],
    subSections: [
      {
        heading: "Businesses",
        links: ["Asset Listings", "Coinbase Business", "Payments", "Commerce", "Token Manager"],
      },
      {
        heading: "Institutions",
        links: ["Prime", "Staking", "Exchange", "International Exchange", "Derivatives Exchange", "Verified Pools"],
      },
    ],
  },
  {
    heading: "Developers",
    links: [
      "Developer Platform",
      "Base",
      "Server Wallets",
      "Embedded Wallets",
      "Base Accounts (Smart Wallets)",
      "Onramp & Offramp",
      "x402",
      "Trade API",
      "Paymaster",
      "OnchainKit",
      "Data API",
      "Verifications",
      "Node",
      "AgentKit",
      "Staking",
      "Faucet",
      "Exchange API",
      "International Exchange API",
      "Prime API",
      "Derivatives API",
    ],
  },
  {
    heading: "Support",
    links: [
      "Help center",
      "Contact us",
      "Create account",
      "ID verification",
      "Account information",
      "Payment methods",
      "Account access",
      "Supported crypto",
      "Status",
    ],
    subSections: [
      { heading: "Asset prices", links: ["Bitcoin price", "Ethereum price", "Solana price", "XRP price"] },
      { heading: "Stock prices", links: ["NVIDIA price", "Apple price", "Microsoft price", "Amazon price"] },
    ],
  },
];

function Footer() {
  return (
    <footer className="bg-white pb-7 pt-14 text-slate-700">
      <div className="page-wrap">
        <div className="grid gap-10 lg:grid-cols-[140px_1fr_1fr_1fr_1fr]">
          <div>
            <div className="relative h-10 w-10">
              <span className="absolute inset-0 rounded-full bg-blue-600" />
              <span className="absolute left-[9px] top-[9px] h-[22px] w-[22px] rounded-full bg-white" />
              <span className="absolute right-[4px] top-[18px] h-[5px] w-[15px] rounded-full bg-blue-600" />
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold tracking-tight text-slate-900">{group.heading}</h3>
              <ul className="mt-2.5 space-y-1.5 text-xs leading-tight text-slate-600">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="https://www.coinbase.com/" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              {group.subSections?.map((section) => (
                <div key={section.heading} className="mt-4">
                  <h4 className="text-sm font-semibold tracking-tight text-slate-900">{section.heading}</h4>
                  <ul className="mt-2.5 space-y-1.5 text-xs leading-tight text-slate-600">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="https://www.coinbase.com/" target="_blank" rel="noreferrer" className="hover:text-slate-900">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-8">
          {socialLinks.map((item) => (
            <a key={item.alt} href={item.href} target="_blank" rel="noreferrer" className="opacity-80 transition-opacity hover:opacity-100">
              <img src={item.icon} alt={item.alt} className="h-4 w-4 invert" />
            </a>
          ))}
        </div>

        <div className="mt-5 border-t border-slate-300 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
            <p className="text-slate-700">(c) 2026 Coinbase | Privacy | Terms & Conditions</p>
            <p>Global | English</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
