import { eq } from "drizzle-orm";
import { db } from ".";
import { account } from "./schema";

export const getUserAccounts = async (userId: string) => {
  const accounts = await db
    .select()
    .from(account)
    .where(eq(account.userId, userId));
  return accounts;
};
