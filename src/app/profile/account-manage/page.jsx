"use client";

import React, { useState } from "react";
import AccountPreferences from "@/components/profile/AccountPreferences";
import DeleteAccountModal from "@/components/profile/DeleteAccountModal";

export default function AccountManagePage() {
  const [preferences, setPreferences] = useState({
    communication: true,
    marketing: true,
    temporarilyDisabled: true
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleTogglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConfirmDelete = () => {
    // Ready for future permanent account deletion API integration
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <AccountPreferences
        preferences={preferences}
        onTogglePreference={handleTogglePreference}
        onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
