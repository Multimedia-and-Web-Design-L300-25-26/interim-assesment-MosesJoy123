import { Router } from "express";
import { createCrypto, listCrypto, listNewListings, listTopGainers } from "../controllers/cryptoController.js";

const router = Router();

router.get("/", listCrypto);
router.get("/gainers", listTopGainers);
router.get("/new", listNewListings);
router.post("/", createCrypto);

export default router;
