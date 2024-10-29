import { db } from "@/db";
import { Users } from "@/db/schema";
import { clsx, type ClassValue } from "clsx"
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserCredits(userEmail: string) {
  const result = await db.select({ credits: Users.credits })
    .from(Users)
    .where(eq(Users.email, userEmail))
    .limit(1);
  return result[0]?.credits ?? 0;
}
