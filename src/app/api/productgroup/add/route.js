import { AddProductGroup } from "@/actions/ProductGroup";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, userEmail } = await req.json();
  console.log(name, userEmail);

  if (!name || !userEmail) {
    return NextResponse.json({ message: "Name and userEmail are required." });
  }

  try {
    const result = await AddProductGroup(name, userEmail);
    if (!result) {
      return NextResponse.json({
        message: "User not found or could not create product group.",
      });
    }

    return NextResponse.json({
      message: "Product group created successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Error adding product group:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
