"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomerVendor from "@/components/custom/CustomerVendor";

const Clients = () => {
  const [customerVendors, setCustomersVendors] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("/api/customerVendor");
      setCustomersVendors(res.data.data);
    };
    fetch();
  }, []);

  if (!customerVendors) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-3xl">Loading...</h1>
      </div>
    );
  }

  return <CustomerVendor customerVendors={customerVendors} />;
};

export default Clients;
