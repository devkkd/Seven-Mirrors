"use client";

import React, { useEffect, useState } from "react";
import ProfileInfo from "@/components/profile/ProfileInfo";
import EditProfileForm from "@/components/profile/EditProfileForm";

const INITIAL_PROFILE = {
  firstName: "John",
  lastName: "Deo",
  age: 25,
  email: "johndoe@gmail.com",
  countryCode: "+91",
  phone: "1234567890",
  profileImage: "/images/profile/john-avatar.png",
  accountStatus: "Registered Account",
  joinedSince: "2022"
};

export default function AboutMePage() {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const handleReset = () => setIsEditing(false);
    window.addEventListener("profile-about-me-reset", handleReset);
    window.addEventListener("popstate", handleReset);
    return () => {
      window.removeEventListener("profile-about-me-reset", handleReset);
      window.removeEventListener("popstate", handleReset);
    };
  }, []);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditProfileForm
        profile={profile}
        onBack={() => setIsEditing(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <ProfileInfo
      profile={profile}
      onEdit={() => setIsEditing(true)}
    />
  );
}
