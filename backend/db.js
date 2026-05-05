import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { mongoUri } from "./config.js";
import Crypto from "./models/Crypto.js";

const defaultCryptoSeed = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67329.27,
    change24h: 3.2,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3462.9,
    change24h: 1.8,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Tether",
    symbol: "USDT",
    price: 1,
    change24h: 0,
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    name: "BNB",
    symbol: "BNB",
    price: 580.46,
    change24h: 2.1,
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  },
  {
    name: "XRP",
    symbol: "XRP",
    price: 0.61,
    change24h: 4.6,
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    price: 1,
    change24h: 0,
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
  },
];

export async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUri);
    await seedDefaultCrypto();
    console.log("Connected to MongoDB");
    return;
  } catch (err) {
    console.warn("Primary MongoDB connection failed. Falling back to in-memory MongoDB.");
    console.warn(err && err.message ? err.message : err);
  }

  try {
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
    await seedDefaultCrypto();
    console.log("Connected to in-memory MongoDB");
  } catch (fallbackErr) {
    console.error("Failed to connect to both primary MongoDB and in-memory fallback.");
    throw fallbackErr;
  }
}

async function seedDefaultCrypto() {
  const count = await Crypto.countDocuments();
  if (count === 0) {
    await Crypto.insertMany(defaultCryptoSeed);
  }
}
