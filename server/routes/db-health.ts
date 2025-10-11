import { RequestHandler } from "express";
import { prisma } from "../prisma";

export const handleDbHealth: RequestHandler = async (_req, res) => {
  try {
    const rows = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`;
    res.status(200).json({ ok: true, rows });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ ok: false, error: message });
  }
};
