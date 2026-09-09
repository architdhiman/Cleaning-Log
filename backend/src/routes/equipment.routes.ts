import { Router } from "express";

import { createEquipment, deleteEquipment, getEquipment, updateEquipment } from "../controllers/equipment.controller.js";

const router = Router();

router.get("/", getEquipment);
router.post("/", createEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;