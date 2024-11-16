import { GetProductServiceById } from "@/actions/ProductService";
import { InputField } from "@/components/custom/InputFeild";
import DeleteButton from "@/components/custom/ProductServices/DeleteButton";
import { Button } from "@/components/ui/button";
import { ProductServicesLabel } from "@/lib/LabelType";
import { ArrowLeftIcon, EditIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const session = await getServerSession();
  const { id } = await params;
  const productService = await GetProductServiceById(id[0], session.user.email);

  if (!productService) {
    redirect("/dashboard/product-services");
    return <></>;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            View Product/Services Details
          </h1>
          <span className="flex items-center gap-x-2">
            <EditIcon />
            <DeleteButton id={id[0]} />
          </span>
        </div>
        {Object.entries(productService).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return (
              <div key={key} className="space-y-5">
                <h3 className="text-lg font-semibold mb-3">
                  {ProductServicesLabel[key]}
                </h3>
                <hr />
                {Object.entries(value).map(([subKey, subValue]) => {
                  if (
                    subValue &&
                    subKey !== "_id" &&
                    subKey !== "__v" &&
                    subKey !== "createdBy"
                  ) {
                    return (
                      <InputField
                        key={subKey}
                        label={subKey}
                        value={subValue}
                        LabelType={ProductServicesLabel}
                      />
                    );
                  }
                })}
                <hr />
              </div>
            );
          } else if (
            key !== "_id" &&
            key !== "__v" &&
            key !== "createdBy" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            value &&
            key !== "enable"
          ) {
            return (
              <InputField
                key={key}
                label={key}
                value={value}
                LabelType={ProductServicesLabel}
              />
            );
          }
        })}
        <Link
          href="/dashboard/product-services"
          className="flex justify-end items-center"
        >
          <Button>
            <ArrowLeftIcon /> Go Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
