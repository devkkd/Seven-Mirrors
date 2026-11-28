"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/profile/LogoutModal";

export default function LogoutPage() {
  const router = useRouter();

  const handleConfirmLogout = () => {
    // Ready for future authentication logout integration
    router.push("/login");
  };

  return (
    <LogoutModal
      isOpen={true}
      onClose={() => router.back()}
      onConfirmLogout={handleConfirmLogout}
    />
  );
}
