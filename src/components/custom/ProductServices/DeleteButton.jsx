"use client";

import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDeleteBox } from "../AlertBox";
import { DeleteProductService } from "@/actions/ProductService";
import { useToast } from "@/hooks/use-toast";

const DeleteButton = ({ id }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await DeleteProductService(id);
    if (res) {
      toast({
        title: "Product/Service deleted Successfully.",
      });
    } else {
      toast({
        varient: "destruction",
        title: "Error while deleting product/service",
        description: "Please try again later",
      });
    }
    router.push("/dashboard/product-services");
  };

  return (
    <>
      <Trash2Icon className="text-red-500" onClick={() => setOpen(true)} />
      <AlertDeleteBox
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default DeleteButton;
