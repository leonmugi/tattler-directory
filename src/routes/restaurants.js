import { Router } from "express";
import * as ctr from "../controllers/restaurantsController.js";
const router = Router();

router.get("/", ctr.list);
router.get("/:id", ctr.getById);
router.post("/", ctr.create);
router.patch("/:id", ctr.update);
router.delete("/:id", ctr.remove);

export default router;
