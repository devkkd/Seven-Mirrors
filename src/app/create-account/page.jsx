import { Suspense } from "react";
import CreateAccountForm from "@/components/create-account/CreateAccountForm";

export default function CreateAccountPage() {
  return (
    <main className="min-h-screen bg-[#ffffff]">
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <CreateAccountForm />
      </Suspense>
    </main>
  );
}
