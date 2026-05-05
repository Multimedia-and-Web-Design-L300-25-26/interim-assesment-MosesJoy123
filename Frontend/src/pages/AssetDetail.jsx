import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../components/common/Button.jsx";
import { cryptoAssets } from "../data/siteData.js";

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

function AssetDetail() {
  const { symbol } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAsset() {
      try {
        setLoading(true);
        const response = await fetch(`${apiBaseUrl}/crypto`, { signal: controller.signal });

        if (!response.ok) {
          throw new Error("Failed to fetch assets");
        }

        const payload = await response.json();
        const items = Array.isArray(payload.items) ? payload.items : [];
        const foundAsset = items.find((item) => item.symbol === symbol);

        if (foundAsset) {
          setAsset({
            name: foundAsset.name,
            symbol: foundAsset.symbol,
            price: formatPrice(foundAsset.price),
            change: formatChange(foundAsset.change24h),
            marketCap: formatMarketCap(foundAsset.price, foundAsset.symbol),
            changeValue: foundAsset.change24h,
          });
          setError(null);
        } else {
          setAsset(null);
          setError("Asset not found");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load asset");
          // Fallback to static data
          const fallbackAsset = cryptoAssets.find((item) => item.symbol === symbol);
          if (fallbackAsset) {
            setAsset(fallbackAsset);
            setError(null);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadAsset();

    return () => controller.abort();
  }, [symbol]);

  if (loading) {
    return (
      <section className="page-wrap py-14">
        <p className="text-slate-600">Loading asset details...</p>
      </section>
    );
  }

  if (!asset) {
    return (
      <section className="page-wrap py-14">
        <h1 className="text-3xl font-bold text-slate-900">Asset not found</h1>
        <p className="mt-3 text-slate-600">{error || "The asset you requested does not exist."}</p>
        <Button to="/explore" className="mt-6">
          Back to Explore
        </Button>
      </section>
    );
  }

  return (
    <section className="page-wrap py-14">
      <Link to="/explore" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
        ← Back to Explore
      </Link>
      <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-600">Asset Detail</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">{asset.name}</h1>
            <p className="mt-2 text-slate-500 uppercase">{asset.symbol}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-slate-900">{asset.price}</p>
            <p className={`mt-1 text-sm font-semibold ${asset.changeValue >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {asset.change} (24h)
            </p>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Market Cap</p>
            <p className="mt-2 text-xl font-bold text-slate-900">{asset.marketCap}</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Volume (24h)</p>
            <p className="mt-2 text-xl font-bold text-slate-900">$8.2B</p>
          </div>
          <div className="rounded-xl bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-slate-500">Circulating Supply</p>
            <p className="mt-2 text-xl font-bold text-slate-900">19.6M</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AssetDetail;
