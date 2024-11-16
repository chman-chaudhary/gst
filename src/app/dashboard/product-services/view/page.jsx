const { redirect } = require("next/navigation");

const Page = () => {
  redirect("/dashboard/product-services");
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>Redirecting to Product/Services page</h1>
    </div>
  );
};

export default Page;
