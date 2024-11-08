"use client";

const { Button } = require("@/components/ui/button");
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PlusIcon } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { ViewForm, EditForm, AddForm } from "@/components/custom/ClientForms";

const CustomerVendor = ({ customerVendors }) => {
  const [viewForm, setViewForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);

  console.log(customerVendors);

  return (
    <div className="px-10 py-5 space-y-5 w-full">
      <div className="flex justify-between items-center">
        <span className="text-xl font-medium">Customer / Vendor</span>
        <span>
          <Button onClick={() => setAddForm(true)}>
            <PlusIcon /> Add New
          </Button>
        </span>
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
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customerVendors.map((cv) => {
              return (
                <TableRow>
                  <TableCell className="text-center">
                    {cv.companyName}
                  </TableCell>
                  <TableCell className="text-center">
                    &#8377; {cv.openingBalance}
                  </TableCell>
                  <TableCell className="text-center">{cv.contactNo}</TableCell>
                  <TableCell className="text-center">
                    {cv.companyType}
                  </TableCell>
                  <TableCell className="text-center">
                    {cv.billingAddress?.state ?? "Uttar Pradesh"}
                  </TableCell>
                  <TableCell className="text-center flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <BsThreeDotsVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setViewForm(true)}>
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditForm(true)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {viewForm && <ViewForm open={viewForm} setOpen={setViewForm} />}
      {editForm && <EditForm open={editForm} setOpen={setEditForm} />}
      {addForm && <AddForm open={addForm} setOpen={setAddForm} />}
    </div>
  );
};

export default CustomerVendor;
