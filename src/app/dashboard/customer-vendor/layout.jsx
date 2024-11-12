import { Suspense } from "react";
import Loading from "./loading";

const layout = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default layout;
