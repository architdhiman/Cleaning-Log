import { prisma } from "../lib/prisma.js";
import { createEquipment as createEquipmentService, getAllEquipment, updateEquipment as updateEquipmentService, deleteEquipment as deleteEquipmentService, } from "../services/equipment.service.js";
export async function getEquipment(req, res) {
    try {
        const equipment = await getAllEquipment();
        res.json(equipment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch equipment",
        });
    }
}
export async function createEquipment(req, res) {
    try {
        const { name, code, status } = req.body;
        if (!name || !code) {
            return res.status(400).json({
                message: "name and code are required",
            });
        }
        const equipment = await createEquipmentService(name, code, status);
        res.status(201).json(equipment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create equipment",
        });
    }
}
export async function updateEquipment(req, res) {
    try {
        const id = Number(req.params.id);
        const { name, code, status } = req.body;
        if (!name || !code || !status) {
            return res.status(400).json({
                message: "name, code and status are required",
            });
        }
        const equipment = await updateEquipmentService(id, name, code, status);
        res.json(equipment);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to update equipment",
        });
    }
}
export async function deleteEquipment(req, res) {
    try {
        const id = Number(req.params.id);
        await deleteEquipmentService(id);
        res.status(204).send();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to delete equipment",
        });
    }
}
//# sourceMappingURL=equipment.controller.js.map