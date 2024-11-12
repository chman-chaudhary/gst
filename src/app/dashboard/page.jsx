import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="px-8">
      <h1 className="text-lg">Dashboard Page</h1>
    </div>
  );
};

export default Dashboard;
