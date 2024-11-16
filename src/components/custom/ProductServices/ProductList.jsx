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

const ProductList = ({ productList }) => {
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
      <hr />
      {productList.length ? (
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
              {productList.map((product) => {
                return (
                  <Link
                    legacyBehavior
                    key={product._id}
                    href={`/dashboard/product-services/view/${product._id}`}
                    className="cursor-pointer"
                  >
                    <TableRow>
                      <TableCell className="text-center">
                        {product.name}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.productGroup.name}
                      </TableCell>
                      <TableCell className="text-center">
                        &#8377; {product.purchasePriceInclTax}
                      </TableCell>
                      <TableCell className="text-center">
                        &#8377; {product.sellPriceInclTax}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.hsnSacCode}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.unitOfMeasurement}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.availableQty}
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="h-full flex justify-center items-center pt-40">
          <h1 className="text-xl">No data found</h1>
        </div>
      )}
    </div>
  );
};

export default ProductList;
