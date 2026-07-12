"use client";

import ProfileHeader from "@/components/dashboard/profile/profile-header";
import ProfileInformation from "@/components/dashboard/profile/profile-information";

import { useProfile } from "@/hooks/profile/use-profile";

export default function ProfilePage() {
  const {
    profile,
    loading,
  } = useProfile();

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-8 text-red-500">
        Profile not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader member={profile} />

      <ProfileInformation member={profile} />
    </div>
  );
}