"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ImportIcon } from "lucide-react";
import { useState } from "react";

const ImportButton = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    // const res = await fetch('/api/import', {
    //   method: 'POST',
    //   body: formData,
    // });

    // const data = await res.json();
    // alert(data.message || data.error);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ImportIcon /> Payments
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
