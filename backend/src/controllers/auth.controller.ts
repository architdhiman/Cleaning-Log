import type { Request, Response } from "express";
import {login} from "../services/auth.service.js"

export function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = login(username, password);

  if (!result) {
    return res.status(401).json({
      message: "Invalid username or password",
    });
  }

  res.json(result);
}