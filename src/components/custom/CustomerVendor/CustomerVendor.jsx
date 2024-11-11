import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import { getCustomerVendors } from "@/actions/CustomerVendor";

const CustomerVendor = async () => {
  const customerVendors = await getCustomerVendors();

  if (!customerVendors) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl">No data found</h1>
      </div>
    );
  }

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-xl font-medium">Customer / Vendor</span>
        <Link href={"/dashboard/customerVendor/add"}>
          <Button>
            <PlusIcon /> Add New
          </Button>
        </Link>
      </div>
      <hr />
      <div className="pt-5">
        <Table className="text-base">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Outstanding Amount</TableHead>
              <TableHead className="text-center">Phone</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">State</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerVendors.map((cv) => {
              return (
                <Link
                  legacyBehavior
                  key={cv._id}
                  href={`/dashboard/customerVendor/view/${cv._id}`}
                  className="cursor-pointer"
                >
                  <TableRow>
                    <TableCell className="text-center">
                      {cv.companyName}
                    </TableCell>
                    <TableCell className="text-center">
                      &#8377; {cv.openingBalance}
                    </TableCell>
                    <TableCell className="text-center">
                      {cv.contactNo}
                    </TableCell>
                    <TableCell className="text-center">
                      {cv.companyType === "customer"
                        ? "Customer"
                        : cv.companyType === "vendor"
                        ? "Vendor"
                        : "Customer/Vendor"}
                    </TableCell>
                    <TableCell className="text-center">
                      {cv.billingAddress?.state ?? "Uttar Pradesh"}
                    </TableCell>
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerVendor;
