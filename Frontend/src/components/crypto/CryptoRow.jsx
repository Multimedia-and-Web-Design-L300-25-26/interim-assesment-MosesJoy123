import { Link } from "react-router-dom";

function CryptoRow({ asset }) {
  const isPositive = asset.change.startsWith("+");

  return (
    <tr className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/80">
      <td className="px-4 py-4">
        <Link to={`/asset/${asset.symbol}`} className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm uppercase text-blue-700">
            {asset.symbol.slice(0, 1)}
          </span>
          <span>{asset.name}</span>
        </Link>
      </td>
      <td className="px-4 py-4 text-slate-700">{asset.price}</td>
      <td className={`px-4 py-4 font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}>
        {asset.change}
      </td>
      <td className="px-4 py-4 text-slate-700">{asset.marketCap}</td>
    </tr>
  );
}

export default CryptoRow;
