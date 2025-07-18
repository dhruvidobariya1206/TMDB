import { Suspense } from "react";
import HomePage from "@/components/home-page";
import Loader from "@/components/common/loader";

export default function Page() {
  return (
    <>
    <div>
      <Suspense fallback={<Loader/>}>
        <HomePage />
      </Suspense>
    </div>
    </>
  );
}