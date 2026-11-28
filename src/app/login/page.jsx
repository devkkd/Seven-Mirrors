"use client";

import React from "react";
import { useRouter } from "next/navigation";
import LoginSignupModal from "@/components/confirm-and-pay/LoginSignupModal";

export default function LoginPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#ffffff]">
      <LoginSignupModal
        isOpen={true}
        onClose={() => router.back()}
        onSuccess={() => router.push("/confirm-and-pay?step=2")}
      />
    </main>
  );
}
