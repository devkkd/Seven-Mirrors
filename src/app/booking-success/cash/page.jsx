import { Suspense } from "react";
import CashBookingSuccess from "@/components/booking-success/CashBookingSuccess";

export default function CashBookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CashBookingSuccess />
    </Suspense>
  );
}
