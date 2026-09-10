import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Account</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">My profile</h1>
        <p className="mt-1 text-sm text-gray-500">Your account details from the authentication service.</p>
      </header>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-8 text-white sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{fullName}</h2>
              <p className="mt-1 text-sm text-slate-300">@{user?.username || "user"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <ProfileField icon={<Mail size={18} />} label="Email" value={user?.email} />
          <ProfileField icon={<Phone size={18} />} label="Phone" value={user?.phone} />
          <ProfileField icon={<ShieldCheck size={18} />} label="Role" value={user?.role} />
          <ProfileField icon={<UserRound size={18} />} label="User ID" value={user?._id} />
        </div>
      </section>
    </div>
  );
};

const ProfileField = ({ icon, label, value }) => (
  <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
      {icon}
      <span>{label}</span>
    </div>
    <p className="mt-2 break-all text-sm font-semibold text-gray-900">{value || "Not provided"}</p>
  </div>
);

export default Profile;