import { useEffect, useState } from "react";
import {
  KeyRound,
  LoaderCircle,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getUser,
  updateUser,
} from "../../app/users/userActions";
import { updateLoggedInUser } from "../../app/auth/authSlice";
import { useToast } from "../../components/ui/Toast";

const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

export default function SettingsPage() {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.auth.user);
  const [profile, setProfile] = useState(() => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profilePhoto: "",
    ...user,
  }));
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!user?.userId) return;
    dispatch(getUser(user.userId))
      .unwrap()
      .then((response) => {
        if (response?.data)
          setProfile((current) => ({ ...current, ...response.data }));
      })
      .catch(() => {});
  }, [dispatch, user]);

  const saveProfile = async (event) => {
    event.preventDefault();
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast("First and last names are required.", "error");
      return;
    }
    if (profile.phoneNumber && !/^\d{10}$/.test(profile.phoneNumber.trim())) {
      toast("Enter a valid 10-digit phone number.", "error");
      return;
    }
    setSavingProfile(true);
    try {
      const response = await dispatch(
        updateUser({
          userId: user.userId,
          firstName: profile.firstName.trim(),
          lastName: profile.lastName.trim(),
          phoneNumber: profile.phoneNumber.trim(),
          profilePhoto: profile.profilePhoto.trim(),
        }),
      ).unwrap();
      const updated = response?.data || profile;
      dispatch(
        updateLoggedInUser({ ...user, ...updated, userId: user.userId }),
      );
      setProfile((current) => ({ ...current, ...updated }));
      toast("Profile updated successfully.", "success");
    } catch (error) {
      toast(
        error?.message || error?.error || "Unable to update your profile.",
        "error",
      );
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    if (passwords.newPassword.length < 8) {
      toast("Your new password must be at least 8 characters.", "error");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast("New password and confirmation do not match.", "error");
      return;
    }
    setSavingPassword(true);
    try {
      await dispatch(
        changePassword({
          userId: user.userId,
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      ).unwrap();
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast("Password updated successfully.", "success");
    } catch (error) {
      toast(
        error?.message || error?.error || "Unable to update your password.",
        "error",
      );
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl py-1 sm:py-4">
      <header className="mb-5 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-blue-50/70 p-4 shadow-sm sm:mb-6 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
          Account
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile and account security.
        </p>
      </header>
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
              <UserRound size={21} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Profile information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Update the information shown in your dashboard.
              </p>
            </div>
          </div>
          <form onSubmit={saveProfile} className="space-y-4 grid gap-1.5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label>
                <span className="block text-xs font-medium text-slate-700">
                  First name
                </span>
                <input
                  className={inputClass}
                  value={profile.firstName || ""}
                  onChange={(event) =>
                    setProfile({ ...profile, firstName: event.target.value })
                  }
                />
              </label>
              <label>
                <span className="mb-1.5 block text-xs font-medium text-slate-700">
                  Last name
                </span>
                <input
                  className={inputClass}
                  value={profile.lastName || ""}
                  onChange={(event) =>
                    setProfile({ ...profile, lastName: event.target.value })
                  }
                />
              </label>
            </div>
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                Email address
              </span>
              <input
                className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-500`}
                value={profile.email || ""}
                disabled
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                Phone number
              </span>
              <input
                className={inputClass}
                inputMode="numeric"
                value={profile.phoneNumber || ""}
                onChange={(event) =>
                  setProfile({ ...profile, phoneNumber: event.target.value })
                }
                placeholder="10-digit phone number"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                Profile photo URL
              </span>
              <input
                className={inputClass}
                value={profile.profilePhoto || ""}
                onChange={(event) =>
                  setProfile({ ...profile, profilePhoto: event.target.value })
                }
                placeholder="https://..."
              />
            </label>
            <button
              type="submit"
              disabled={savingProfile}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {savingProfile ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              {savingProfile ? "Saving..." : "Save profile"}
            </button>
          </form>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex items-start gap-3">
            <div className="rounded-xl bg-violet-50 p-2.5 text-violet-600">
              <KeyRound size={21} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">Change password</h2>
              <p className="mt-1 text-sm text-slate-500">
                Use a strong password with at least 8 characters.
              </p>
            </div>
          </div>
          <form onSubmit={savePassword} className="space-y-4 grid mb-1.5">
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                Current password
              </span>
              <input
                className={inputClass}
                type="password"
                value={passwords.currentPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    currentPassword: event.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                New password
              </span>
              <input
                className={inputClass}
                type="password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    newPassword: event.target.value,
                  })
                }
                required
              />
            </label>
            <label>
              <span className="mb-1.5 block text-xs font-medium text-slate-700">
                Confirm new password
              </span>
              <input
                className={inputClass}
                type="password"
                value={passwords.confirmPassword}
                onChange={(event) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: event.target.value,
                  })
                }
                required
              />
            </label>
            <div className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              <ShieldCheck size={16} className="mr-1 inline text-emerald-600" />
              Changing your password signs out no devices automatically.
            </div>
            <button
              type="submit"
              disabled={savingPassword}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {savingPassword ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <KeyRound size={17} />
              )}
              {savingPassword ? "Updating..." : "Update password"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
