"use client";

import { deleteCustomerVendor } from "@/actions/CustomerVendor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteCustomerVendor(id);
    if (res) {
      router.push("/dashboard/customerVendor");
    }
  };

  return (
    <>
      <Trash2Icon className="text-red-500" onClick={() => setOpen(true)} />
      <AlertDialogBox
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default DeleteButton;

const AlertDialogBox = ({ open, setOpen, handleDelete }) => {
  return (
    <AlertDialog open={open} setOpen={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You're about to delete this item. This action is permanent and
            cannot be undone. Do you wish to proceed?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
