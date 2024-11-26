import { Suspense } from "react";
import Loading from "@/components/custom/Loading";

const layout = ({ children }) => {
  return (
    <div className="bg-pink-100/50 min-h-[calc(100vh-4rem)] h-full w-full pt-16">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default layout;
