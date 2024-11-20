import { GetCash } from "@/actions/Cash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  const { user } = await GetCash(session.user.email);

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <h1 className="text-2xl font-semibold">Dashboard Page</h1>
      <div className="py-20 px-10">
        <h2 className="text-lg font-medium">Email: {user.email}</h2>
        <h2 className="text-lg font-medium">Cash Balance: {user.cash}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
