import { GetProductGroups } from "@/actions/ProductGroup";
import { GetProductServices } from "@/actions/ProductService";
import ProductList from "@/components/custom/ProductServices/ProductList";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/login");
  }

  const productServices = await GetProductServices(session.user.email);
  const productList = JSON.parse(JSON.stringify(productServices));

  if (!productList) {
    return <ProductList productList={[]} />;
  }

  return <ProductList productList={productList} />;
};

export default Page;
