import { getServerSession } from "next-auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const transactions = await getOnRampTransactions();
  return (
    <div className="w-full m-6 ">
      <OnRampTransactions transactions={transactions} />
    </div>
  );
}
