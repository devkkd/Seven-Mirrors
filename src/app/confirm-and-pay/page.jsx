import { Suspense } from "react";
import ConfirmAndPayCheckout from "@/components/confirm-and-pay/ConfirmAndPayCheckout";

export default function ConfirmAndPayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ConfirmAndPayCheckout />
    </Suspense>
  );
}
