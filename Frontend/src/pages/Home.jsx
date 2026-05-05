import { useEffect, useState } from "react";
import heroImage from "../assets/Hero__4_.png";
import advancedImage from "../assets/Advanced.png";
import oneImage from "../assets/zero_fees_us.png";
import baseImage from "../assets/CB_LOLP__1_.png";
import ctaImage from "../assets/image.png";
import { Link } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import SectionHeading from "../components/common/SectionHeading.jsx";
import { learnArticles, marketPanelAssets } from "../data/siteData.js";

const parseGhsPrice = (priceText) => Number(priceText.replace("GHS", "").replaceAll(",", "").trim());
const parsePercent = (changeText) => (changeText === "--" ? 0 : Number(changeText.replace("%", "").trim()));

const formatGhsPrice = (price) =>
  `GHS ${price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatChange = (value) => `${Math.abs(value).toFixed(2)}%`;

function Home() {
  const [liveMarketAssets, setLiveMarketAssets] = useState(() =>
    marketPanelAssets.map((asset) => ({
      ...asset,
      priceValue: parseGhsPrice(asset.price),
      changeValue: parsePercent(asset.change),
    })),
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setLiveMarketAssets((previousAssets) =>
        previousAssets.map((asset) => {
          const volatility = asset.name === "USDC" ? 0.0004 : 0.012;
          const deltaRatio = (Math.random() - 0.5) * 2 * volatility;
          const nextPrice = Math.max(0.01, asset.priceValue * (1 + deltaRatio));
          const nextChange = ((nextPrice - asset.priceValue) / asset.priceValue) * 100;

          return {
            ...asset,
            priceValue: nextPrice,
            changeValue: nextChange,
          };
        }),
      );
    }, 2500);

    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      <section className="reveal bg-[#f2f3f5] py-14 lg:py-20">
        <div className="page-wrap grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <img src={heroImage} alt="Coinbase hero" className="w-full max-w-[700px] rounded-2xl object-contain" />
            <p className="mt-2 text-xs text-slate-600">Stocks and prediction markets not available in your jurisdiction.</p>
          </div>
          <div className="max-w-xl">
            <h1 className="text-5xl font-semibold tracking-tight text-[#0a0b0d] md:text-7xl md:leading-[1.02]">The future of finance is here.</h1>
            <p className="mt-5 text-[1.35rem] text-[#111827]">Trade crypto and more on a platform you can trust.</p>
            <div className="mt-7 flex flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 min-w-0 flex-1 rounded-lg border border-slate-400 bg-white px-4 text-base outline-none focus:border-blue-600"
              />
              <Link
                to="/signup"
                className="inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-600 px-8 text-lg font-bold text-white transition-colors hover:bg-blue-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-wrap py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.08fr] lg:items-center">
          <div className="max-w-xl">
            <h2 className="text-5xl font-semibold tracking-tight text-[#0a0b0d] md:text-[3.3rem] md:leading-[1.06]">
              Explore crypto like Bitcoin, Ethereum, and Dogecoin.
            </h2>
            <p className="mt-6 text-xl text-slate-600">
              Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
            </p>
            <Button to="/explore" className="mt-8 rounded-full bg-black px-7 py-3 text-base hover:bg-slate-800 focus-visible:outline-slate-800">
              See more assets
            </Button>
          </div>

          <aside className="rounded-[2rem] bg-[#01050b] p-6 text-white shadow-2xl shadow-slate-500/20 md:p-9">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-200 md:gap-8">
              <span className="rounded-full bg-slate-700 px-5 py-2">Tradable</span>
              <span className="opacity-95">Top gainers</span>
              <span className="opacity-95">New on Coinbase</span>
            </div>

            <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
              {liveMarketAssets.map((asset) => {
                const isNeutral = Math.abs(asset.changeValue) < 0.005;
                const isPositive = asset.changeValue > 0;

                return (
                  <div key={asset.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={asset.icon} alt={`${asset.name} logo`} className="h-8 w-8 rounded-full object-cover" />
                      <span className="text-2xl font-medium tracking-tight">{asset.name}</span>
                    </div>

                    <div className="text-right leading-tight tabular-nums">
                      <p className="text-2xl font-semibold tracking-tight">
                        {formatGhsPrice(asset.priceValue)}
                      </p>
                      <p className={`text-sm font-semibold ${isNeutral ? "text-slate-400" : isPositive ? "text-emerald-400" : "text-rose-500"}`}>
                        {isNeutral ? "--" : `${isPositive ? "↗" : "↘"} ${formatChange(asset.changeValue)}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="page-wrap space-y-14 py-16 lg:py-20">
        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[1.9rem] bg-[#02050c] p-2.5 md:p-3.5">
            <img src={advancedImage} alt="Advanced trading UI" className="w-full rounded-[1.4rem] object-cover" />
          </div>
          <div className="max-w-[480px]">
            <h3 className="text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-[#0a0b0d]">
              Powerful tools, designed for the advanced trader.
            </h3>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience.
              Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of
              markets.
            </p>
            <Button to="/explore" className="mt-7 rounded-full bg-black px-7 py-3 text-base hover:bg-slate-800 focus-visible:outline-slate-800">
              Start trading
            </Button>
          </div>
        </div>

        <div className="grid items-center gap-9 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-[480px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              Coinbase One
            </span>
            <h3 className="mt-4 text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-[#0a0b0d]">Zero trading fees, more rewards.</h3>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
            </p>
            <Button to="/signup" className="mt-7 rounded-full bg-black px-7 py-3 text-base hover:bg-slate-800 focus-visible:outline-slate-800">
              Claim free trial
            </Button>
          </div>
          <div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-[2rem] bg-[#eef0f3]">
            <img src={oneImage} alt="Coinbase One" className="block w-full rounded-[2rem] object-contain" />
          </div>
        </div>

        <div className="grid items-center gap-9 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="mx-auto w-full max-w-[760px] overflow-hidden rounded-[2rem] bg-[#eef0f3]">
            <img src={baseImage} alt="Base app" className="block w-full rounded-[2rem] object-contain" />
          </div>
          <div className="max-w-[480px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              Base App
            </span>
            <h3 className="mt-4 text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-[#0a0b0d]">
              Countless ways to earn crypto with the Base App.
            </h3>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              An everything app to trade, create, discover, and chat, all in one place.
            </p>
            <Button to="/learn" className="mt-7 rounded-full bg-black px-7 py-3 text-base hover:bg-slate-800 focus-visible:outline-slate-800">
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section className="page-wrap py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <h2 className="max-w-[560px] text-3xl font-semibold leading-[1.06] tracking-tight text-[#0a0b0d] md:text-5xl">
            New to crypto? Learn some crypto basics
          </h2>
          <div className="max-w-[560px] lg:justify-self-end">
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
            </p>
            <Button to="/learn" className="mt-6 rounded-full bg-black px-7 py-2.5 text-sm hover:bg-slate-800 focus-visible:outline-slate-800">
              Read More
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learnArticles.map((article) => (
            <article key={article.title}>
              <img src={article.image} alt={article.title} className="h-[230px] w-full rounded-[2rem] object-cover" />
              <h3 className="mt-5 text-xl font-medium leading-[1.2] tracking-tight text-[#0a0b0d] md:text-2xl">{article.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{article.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f3f5] py-16 lg:py-24">
        <div className="page-wrap">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="max-w-[470px]">
              <h2 className="text-5xl font-semibold leading-[1.02] tracking-tight text-[#0a0b0d] md:text-6xl">
                Take control of your money
              </h2>
              <p className="mt-5 text-2xl text-slate-700">Start your portfolio today and discover crypto</p>
              <div className="mt-7 flex flex-row items-center gap-3">
                <input
                  type="email"
                  placeholder="satoshi@nakamoto.com"
                  className="h-12 min-w-0 flex-1 rounded-lg border border-slate-400 bg-white px-4 text-base outline-none focus:border-blue-600"
                />
                <Link
                  to="/signup"
                  className="inline-flex h-12 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-blue-600 px-8 text-lg font-bold text-white transition-colors hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            </div>

            <img src={ctaImage} alt="Crypto circles" className="mx-auto w-full max-w-[420px] object-contain" />
          </div>

          <div className="mt-24 text-center text-xs leading-relaxed text-slate-500">
            <p>DEX trading is offered by Coinbase Bermuda Technologies Ltd.</p>
            <p className="mx-auto mt-6 max-w-[760px]">
              Products and features may not be available in all regions. Information is for informational purposes only, and is
              not (i) an offer, or solicitation of an offer, to invest in, or to buy or sell, any interests or shares, or to
              participate in any investment or trading strategy or (ii) intended to provide accounting, legal, or tax advice, or
              investment recommendations. Trading cryptocurrency comes with risk.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
