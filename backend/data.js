import { randomUUID } from "node:crypto";

const users = [];
const cryptoAssets = [
  {
    id: randomUUID(),
    name: "Bitcoin",
    symbol: "BTC",
    price: 67329.27,
    change24h: 3.2,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    createdAt: new Date("2024-01-03T10:00:00Z"),
  },
  {
    id: randomUUID(),
    name: "Ethereum",
    symbol: "ETH",
    price: 3462.9,
    change24h: 1.8,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    createdAt: new Date("2024-01-05T10:00:00Z"),
  },
  {
    id: randomUUID(),
    name: "Tether",
    symbol: "USDT",
    price: 1,
    change24h: 0,
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    createdAt: new Date("2024-02-01T10:00:00Z"),
  },
  {
    id: randomUUID(),
    name: "BNB",
    symbol: "BNB",
    price: 580.46,
    change24h: 2.1,
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    createdAt: new Date("2024-02-10T10:00:00Z"),
  },
  {
    id: randomUUID(),
    name: "XRP",
    symbol: "XRP",
    price: 0.61,
    change24h: 4.6,
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    createdAt: new Date("2024-03-01T10:00:00Z"),
  },
  {
    id: randomUUID(),
    name: "USDC",
    symbol: "USDC",
    price: 1,
    change24h: 0,
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    createdAt: new Date("2024-03-12T10:00:00Z"),
  },
];

export function getUsers() {
  return users;
}

export function getCryptoAssets() {
  return cryptoAssets;
}

export function seedUsers() {
  return users;
}
