import express from "express";
import cors from "cors";
import equipmentRoutes from "./routes/equipment.routes.js";
import cleaningRecordRoutes from "./routes/cleaningRecord.routes.js";
import authRoutes from "./routes/auth.routes.js";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
app.use("/api/equipment", equipmentRoutes);
app.use("/api/equipment", cleaningRecordRoutes);
app.use("/api/auth", authRoutes);
export default app;
//# sourceMappingURL=app.js.map