"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { ShareIcon } from "lucide-react";

const ExportButton = () => {
  const handleExport = async () => {
    try {
      const response = await axios.get("/api/inward-payment/import", {
        responseType: "blob", // Set response type to blob
      });

      const blob = response.data; // Axios returns the blob directly in data
      const url = window.URL.createObjectURL(blob); // Create a temporary URL
      const link = document.createElement("a");

      // Set download properties
      link.href = url;
      link.download = "InwardPayments.xlsx"; // Default file name
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting data:", error);
      alert("An error occurred while exporting data. Please try again.");
    }
  };

  return (
    <Button onClick={handleExport}>
      <ShareIcon /> Export
    </Button>
  );
};

export default ExportButton;
