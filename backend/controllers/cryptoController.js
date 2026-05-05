import Crypto from "../models/Crypto.js";

function mapCryptoItem(item) {
  return {
    id: String(item._id),
    name: item.name,
    symbol: item.symbol,
    price: item.price,
    change24h: item.change24h,
    image: item.image,
    createdAt: item.createdAt,
  };
}

export async function listCrypto(_req, res) {
  try {
    const items = await Crypto.find().sort({ createdAt: -1 });
    return res.json({ items: items.map(mapCryptoItem) });
  } catch {
    return res.status(500).json({ message: "Unable to fetch crypto assets" });
  }
}

export async function listTopGainers(_req, res) {
  try {
    const items = await Crypto.find().sort({ change24h: -1 }).limit(10);
    return res.json({ items: items.map(mapCryptoItem) });
  } catch {
    return res.status(500).json({ message: "Unable to fetch top gainers" });
  }
}

export async function listNewListings(_req, res) {
  try {
    const items = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    return res.json({ items: items.map(mapCryptoItem) });
  } catch {
    return res.status(500).json({ message: "Unable to fetch new listings" });
  }
}

export async function createCrypto(req, res) {
  try {
    const { name, symbol, price, change24h, image } = req.body;
    const trimmedName = String(name ?? "").trim();
    const trimmedSymbol = String(symbol ?? "").trim().toUpperCase();
    const parsedPrice = Number(price);
    const parsedChange = Number(change24h);
    const trimmedImage = String(image ?? "").trim();

    if (!trimmedName || !trimmedSymbol || Number.isNaN(parsedPrice) || Number.isNaN(parsedChange) || !trimmedImage) {
      return res.status(400).json({ message: "Name, symbol, price, change24h, and image are required" });
    }

    const cryptoAsset = await Crypto.create({
      name: trimmedName,
      symbol: trimmedSymbol,
      price: parsedPrice,
      change24h: parsedChange,
      image: trimmedImage,
    });

    return res.status(201).json({
      message: "Crypto asset created",
      item: mapCryptoItem(cryptoAsset),
    });
  } catch {
    return res.status(500).json({ message: "Unable to create crypto asset" });
  }
}
