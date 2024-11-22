"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ImportIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ImportButton = () => {
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const session = useSession();

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("createdByEmail", session.data.user.email);

    const res = await fetch("/api/outward-payment/import", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (data.message) {
      toast({
        title: data.message,
      });
    } else {
      toast({
        title: data.error,
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ImportIcon /> Import
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-2 mr-4">
        <form
          onSubmit={handleFileUpload}
          className="space-y-3 flex flex-col items-end p-2"
        >
          <Input
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button type="submit" disabled={file === null}>
            Import Payments
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImportButton;
