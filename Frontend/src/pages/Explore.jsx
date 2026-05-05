import { useEffect, useState } from "react";
import CryptoTable from "../components/crypto/CryptoTable.jsx";
import { cryptoAssets } from "../data/siteData.js";
import SectionHeading from "../components/common/SectionHeading.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

function formatPrice(price) {
  return `$${Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatChange(change24h) {
  const numericChange = Number(change24h);
  const prefix = numericChange > 0 ? "+" : "";
  return `${prefix}${numericChange.toFixed(2)}%`;
}

function formatMarketCap(price, symbol) {
  const multiplier = symbol === "BTC" ? 19_000_000 : symbol === "ETH" ? 120_000_000 : 1_000_000_000;
  const marketCapValue = Number(price) * multiplier;

  if (!Number.isFinite(marketCapValue)) {
    return "—";
  }

  const magnitude = marketCapValue >= 1_000_000_000_000 ? 1_000_000_000_000 : marketCapValue >= 1_000_000_000 ? 1_000_000_000 : 1_000_000;
  const suffix = magnitude === 1_000_000_000_000 ? "T" : magnitude === 1_000_000_000 ? "B" : "M";

  return `$${(marketCapValue / magnitude).toFixed(1)}${suffix}`;
}

function Explore() {
  const [assets, setAssets] = useState(cryptoAssets);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAssets() {
      try {
        const response = await fetch(`${apiBaseUrl}/crypto`, { signal: controller.signal });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        const items = Array.isArray(payload.items) ? payload.items : [];

        if (items.length > 0) {
          setAssets(
            items.map((asset) => ({
              name: asset.name,
              symbol: asset.symbol,
              price: formatPrice(asset.price),
              change: formatChange(asset.change24h),
              marketCap: formatMarketCap(asset.price, asset.symbol),
            })),
          );
        }
      } catch {
        setAssets(cryptoAssets);
      }
    }

    loadAssets();

    return () => controller.abort();
  }, []);

  return (
    <section className="page-wrap py-14">
      <SectionHeading
        eyebrow="Explore"
        title="Markets and top crypto assets"
        description="Monitor prices, market cap, and momentum with a clean Coinbase-inspired market table."
      />
      <div className="mt-8">
        <CryptoTable assets={assets} />
      </div>
    </section>
  );
}

export default Explore;
