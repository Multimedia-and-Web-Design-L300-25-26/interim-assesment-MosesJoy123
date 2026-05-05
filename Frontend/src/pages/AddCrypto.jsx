import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import {
  validateSymbol,
  validatePositiveNumber,
  validateImageUrl,
  validateName,
} from "../utils/validation";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

function AddCryptoInner() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");
  const [change24h, setChange24h] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [nameError, setNameError] = useState("");
  const [symbolError, setSymbolError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [changeError, setChangeError] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const nameVal = validateName(name);
    const symVal = validateSymbol(symbol);
    const priceVal = validatePositiveNumber(price, "Price");
    const changeVal = (() => {
      const n = Number(change24h);
      if (Number.isNaN(n)) return { isValid: false, error: "24h change must be a number" };
      return { isValid: true, error: null };
    })();
    const imgVal = validateImageUrl(imageUrl);

    setNameError(nameVal.error);
    setSymbolError(symVal.error);
    setPriceError(priceVal.error);
    setChangeError(changeVal.error);
    setImageError(imgVal.error);

    if (!nameVal.isValid || !symVal.isValid || !priceVal.isValid || !changeVal.isValid || !imgVal.isValid) {
      setSubmitError("Please fix validation errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("cb_auth_token");
      if (!token) {
        setSubmitError("Not authenticated. Please sign in.");
        return;
      }

      const body = {
        name: name.trim(),
        symbol: symbol.trim().toUpperCase(),
        price: Number(price),
        change24h: Number(change24h),
        image: imageUrl.trim() || undefined,
      };

      const res = await fetch(`${apiBaseUrl}/crypto`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const payload = await res.json();
      if (!res.ok) {
        throw new Error(payload.message || "Failed to create crypto");
      }

      setSubmitSuccess("Crypto created successfully");
      setName("");
      setSymbol("");
      setPrice("");
      setChange24h(0);
      setImageUrl("");

      // navigate to explore to see the new item
      setTimeout(() => navigate("/explore"), 800);
    } catch (err) {
      setSubmitError(err.message || "Failed to create crypto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrap py-14">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold">Add Cryptocurrency</h1>
        <p className="text-slate-600">Create a new crypto listing (admin)</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameError(validateName(name).error)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${nameError ? "border-red-500" : "border-slate-300"}`}
            />
            {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Symbol</label>
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              onBlur={() => setSymbolError(validateSymbol(symbol).error)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${symbolError ? "border-red-500" : "border-slate-300"}`}
            />
            {symbolError && <p className="mt-1 text-sm text-red-600">{symbolError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Price (USD)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onBlur={() => setPriceError(validatePositiveNumber(price, "Price").error)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${priceError ? "border-red-500" : "border-slate-300"}`}
            />
            {priceError && <p className="mt-1 text-sm text-red-600">{priceError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">24h Change (%)</label>
            <input
              value={change24h}
              onChange={(e) => setChange24h(e.target.value)}
              onBlur={() => setChangeError(isNaN(Number(change24h)) ? "24h change must be a number" : null)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${changeError ? "border-red-500" : "border-slate-300"}`}
            />
            {changeError && <p className="mt-1 text-sm text-red-600">{changeError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Image URL (optional)</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onBlur={() => setImageError(validateImageUrl(imageUrl).error)}
              className={`mt-1 w-full rounded-lg border px-3 py-2 ${imageError ? "border-red-500" : "border-slate-300"}`}
            />
            {imageError && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-blue-600 px-4 py-2 text-white">
              {isSubmitting ? "Creating..." : "Create Crypto"}
            </button>
            {submitSuccess && <p className="text-green-600">{submitSuccess}</p>}
            {submitError && <p className="text-red-600">{submitError}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AddCrypto() {
  // Wrap the inner page with ProtectedRoute so only signed-in users can access
  return <ProtectedRoute element={<AddCryptoInner />} />;
}
