import { Suspense } from "react";
import Loading from "@/components/custom/Loading";

const layout = ({ children }) => {
  return (
    <div className="bg-green-100/50 min-h-screen h-full w-full pt-16">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default layout;
