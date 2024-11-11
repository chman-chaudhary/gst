"use server";

import dbConnect from "@/lib/dbConnect";
import customervendor from "@/lib/models/CustomerVendor";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  try {
    const res = await customervendor.find();
    console.log(res);
    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.log("Error while fetch Customer/Vendor");
    return NextResponse.json({ success: false });
  }
}
