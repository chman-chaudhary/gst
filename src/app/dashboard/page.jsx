import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <h1 className="text-2xl font-semibold">Dashboard Page</h1>
    </div>
  );
};

export default Dashboard;
