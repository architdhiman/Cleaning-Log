import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }
    const token = authHeader.substring(7);
    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
//# sourceMappingURL=auth.js.map