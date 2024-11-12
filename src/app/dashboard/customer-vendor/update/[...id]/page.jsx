import { getCustomerVendorById } from "@/actions/CustomerVendor";
import DeleteButton from "@/components/custom/CustomerVendor/DeleteButton";
import { InputField } from "@/components/custom/InputFeild";
import { Button } from "@/components/ui/button";
import { LableType } from "@/lib/LabelType";

import { ArrowLeftIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async ({ params }) => {
  const { id } = await params;
  const customerVendor = await getCustomerVendorById(id[0]);

  if (!customerVendor) {
    redirect("/dashboard/customerVendor");
    return <></>;
  }

  return (
    <div className="flex justify-center w-screen">
      <div className="px-10 pt-4 pb-10 space-y-10 max-w-[800px] w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">View Cutomer/Vendor Details</h1>
          <span className="flex items-center gap-x-2">
            <EditIcon />
            <DeleteButton id={id[0]} />
          </span>
        </div>
        {Object.entries(customerVendor).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return (
              <div key={key} className="space-y-5">
                <h3 className="text-lg font-semibold mb-3">{LableType[key]}</h3>
                <hr />
                {Object.entries(value).map(([subKey, subValue]) => {
                  if (subValue) {
                    return (
                      <InputField
                        key={subKey}
                        label={subKey}
                        value={subValue}
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
            value &&
            key !== "enable"
          ) {
            return <InputField key={key} label={key} value={value} />;
          }
        })}
        <Link
          href="/dashboard/customerVendor"
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
