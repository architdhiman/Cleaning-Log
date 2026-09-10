import type { Request, Response, NextFunction } from "express";
export interface AuthUser {
    userId: string;
    username: string;
    name: string;
}
export interface AuthRequest extends Request {
    user?: AuthUser;
}
export declare function authenticate(req: AuthRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map