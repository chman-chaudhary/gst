import { getLeagerById } from "@/actions/Leagers";
import UpdateLeagerPage from "@/components/custom/CustomerVendor/UpdateDetails";

const UpdatePage = async ({ params }) => {
  const { id } = await params;
  const leager = await getLeagerById(id[0]);

  return <UpdateLeagerPage leagerInfo={leager} />;
};

export default UpdatePage;
