import { Suspense } from "react";
import OnlineBookingSuccess from "@/components/booking-success/OnlineBookingSuccess";

export default function OnlineBookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <OnlineBookingSuccess />
    </Suspense>
  );
}
