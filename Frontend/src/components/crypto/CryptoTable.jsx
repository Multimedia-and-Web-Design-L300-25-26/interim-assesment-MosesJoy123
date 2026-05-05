import CryptoRow from "./CryptoRow.jsx";

function CryptoTable({ assets }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-[0.08em] text-slate-600">
            <tr>
              <th className="px-4 py-3">Asset</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24h</th>
              <th className="px-4 py-3">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <CryptoRow key={asset.symbol} asset={asset} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoTable;
