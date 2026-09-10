import { login } from "../services/auth.service.js";
export function loginUser(req, res) {
    const { username, password } = req.body;
    const result = login(username, password);
    if (!result) {
        return res.status(401).json({
            message: "Invalid username or password",
        });
    }
    res.json(result);
}
//# sourceMappingURL=auth.controller.js.map