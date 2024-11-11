"use client";

import { deleteCustomerVendor } from "@/actions/CustomerVendor";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteCustomerVendor(id);
    if (res) {
      router.push("/dashboard/customerVendor");
    }
  };

  return <Trash2Icon onClickCapture={handleDelete} className="text-red-500" />;
};

export default DeleteButton;
