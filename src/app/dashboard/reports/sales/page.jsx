"use client";

import SalesReport from "@/actions/SalesReport";
import { InvoiceList } from "@/components/custom/SaleInvoice/InvoiceList";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

const SaleReport = () => {
  const [invoices, setInvoices] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const invoice = await SalesReport(
        from ?? new Date("2000-01-01"),
        to ?? new Date()
      );
      setInvoices(invoice);
    };
    fetchData();
  }, [from, to]);

  return (
    <div className="px-10 py-5 space-y-10">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">Sales Report</span>
        <span className="space-x-5">
          <DatePicker
            label="From"
            value={from}
            onChange={(date) => setFrom(date)}
          />
          <DatePicker
            label="To"
            value={to}
            onChange={(date) => setTo(date)}
            from={from}
          />
        </span>
      </div>
      {invoices.length ? (
        <InvoiceList invoices={invoices} />
      ) : (
        <div className="flex justify-center pt-40 text-lg">Loading...</div>
      )}
    </div>
  );
};

export default SaleReport;

const DatePicker = ({
  label = "",
  value = "",
  onChange = () => {},
  from = new Date("1900-01-01"),
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[180px] pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>{label}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01") || date < from
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
