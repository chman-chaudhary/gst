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

import { EditIcon, EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { ViewForm, AddForm, EditForm } from "./ClientForms";
import { deleteCustomerVendor } from "@/actions/CustomerVendor";
import axios from "axios";
import Link from "next/link";

const CustomerVendor = () => {
  const [viewForm, setViewForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [selectedId, SetSelectedId] = useState();
  const [customerVendors, setCustomersVendors] = useState([]);

  const fetch = async () => {
    const res = await axios.get("/api/customerVendor");
    setCustomersVendors(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = async (id) => {
    await deleteCustomerVendor(id);
    setCustomersVendors((prev) => prev.filter((cv) => cv._id !== id));
  };

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
                <Link
                  legacyBehavior
                  key={cv._id}
                  href={`/dashboard/customerVendor/view/${cv._id}`}
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
                          <DropdownMenuItem
                            onClick={() => {
                              SetSelectedId(cv._id);
                              setViewForm(true);
                            }}
                          >
                            <EyeIcon /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                          // onClick={() => setEditForm(true)}
                          >
                            <EditIcon /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(cv._id)}
                          >
                            <Trash2Icon /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </Link>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {viewForm && (
        <ViewForm open={viewForm} setOpen={setViewForm} id={selectedId} />
      )}
      {editForm && <EditForm open={editForm} setOpen={setEditForm} />}
      {addForm && <AddForm open={addForm} setOpen={setAddForm} fetch={fetch} />}
    </div>
  );
};

export default CustomerVendor;
