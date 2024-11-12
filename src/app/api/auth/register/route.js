import dbConnect from "@/lib/dbConnect";
import user from "@/lib/models/User";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse({ message: "Missing Email or Password" });
    }

    const existedUser = await user.findOne({ email });
    if (existedUser) {
      return new NextResponse({ message: "Email already exists" });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = new user({ email, password: hashedPassword });
    await newUser.save();
    return new NextResponse.json({
      message: "User register successfully",
    });
  } catch (e) {
    console.log({ e });
    return NextResponse.json({
      success: false,
      message: "Error registering user",
    });
  }
}
