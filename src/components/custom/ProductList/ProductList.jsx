import { Button } from "@/components/ui/button";
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

const ProductList = () => {
  const productList = [];
  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Product List</span>
        <Link href={"/dashboard/product-services/add"}>
          <Button>
            <PlusIcon /> Add New
          </Button>
        </Link>
      </div>
      <div className="pt-5">
        <Table className="text-base">
          <TableCaption>A list of your recent products.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Product Group</TableHead>
              <TableHead className="text-center">Purchase Price</TableHead>
              <TableHead className="text-center">Sell Price</TableHead>
              <TableHead className="text-center">HSN Code</TableHead>
              <TableHead className="text-center">UOM</TableHead>
              <TableHead className="text-center">Current Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((cv) => {
              return (
                <Link
                  legacyBehavior
                  key={cv._id}
                  href={`/dashboard/customer-vendor/view/${cv._id}`}
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

export default ProductList;
