import ProfileSidebar from "@/components/profile/ProfileSidebar";
import "@/styles/profile/profile-dashboard.css";

export default function ProfileLayout({ children }) {
  return (
    <div className="profile-dashboard-shell">
      <div className="profile-dashboard-body">
        <ProfileSidebar />
        <main className="profile-main-content">{children}</main>
      </div>
    </div>
  );
}
