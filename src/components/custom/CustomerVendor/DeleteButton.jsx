"use client";

import { deleteLeager } from "@/actions/Leagers";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertDeleteBox } from "../AlertBox";

const DeleteButton = ({ id }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteLeager(id);
    if (res) {
      router.push("/dashboard/leagers");
    }
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
