import { RequestHandler } from "express";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };
    if (!email || !password)
      return res
        .status(400)
        .json({ ok: false, error: "Email and password are required" });
    if (!isValidEmail(email))
      return res.status(400).json({ ok: false, error: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ ok: false, error: "Password must be at least 6 characters" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res
        .status(409)
        .json({ ok: false, error: "Email already registered" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        role: "STUDENT",
      },
      select: { id: true, email: true, name: true, role: true },
    });

    res.status(201).json({ ok: true, user });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ ok: false, error: message });
  }
};
