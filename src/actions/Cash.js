import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/User";

export const GetCash = async (userEmail) => {
  await dbConnect();
  try {
    const user = await User.findOne({ email: userEmail });
    return { ok: true, user };
  } catch (error) {
    console.log(error);
    return { message: "ERROR! while fetching cash details" };
  }
};
