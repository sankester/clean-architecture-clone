import { Request, Response, NextFunction } from "express";

export const useNoCache = (
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.set(
    "cache-control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("pragma", "no-cache");
  res.set("expires", "0");
  res.set("surrogate-control", "no-store");
  next();
};
