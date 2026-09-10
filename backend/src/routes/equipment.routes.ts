import { Router } from "express";

import { createEquipment, deleteEquipment, getEquipment, updateEquipment } from "../controllers/equipment.controller.js";
import { validate } from "../middleware/validate.js";
import {
  createEquipmentSchema,
  updateEquipmentSchema,
} from "../validations/equipment.validation.js";


const router = Router();

router.get("/", getEquipment);
router.post(
  "/",
  validate(createEquipmentSchema),
  createEquipment,
);

router.put(
  "/:id",
  validate(updateEquipmentSchema),
  updateEquipment,
);
router.delete("/:id", deleteEquipment);

export default router;