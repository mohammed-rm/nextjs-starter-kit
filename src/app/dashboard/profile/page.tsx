"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteUser, signOut, updateUser, useSession } from "@/lib/auth-client";
import { AlertCircle, AlertTriangle, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const [isPendingUpdate, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeletingAccount, startDeleteTransition] = useTransition();
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");

  // If not authenticated, redirect to sign-in
  if (!isPending && !session) {
    redirect("/sign-in");
  }

  // Initialize form values when session data is available
  if (session?.user?.name && !isEditing && !name) {
    setName(session.user.name || "");
  }

  const handleSaveProfile = () => {
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Name cannot be empty");
      return;
    }

    startTransition(async () => {
      try {
        await updateUser(
          {
            name: name.trim(),
          },
          {
            onSuccess: () => {
              setSuccessMessage("Profile updated successfully");
              setIsEditing(false);
            },
            onError: () => {
              setErrorMessage("Failed to update profile. Please try again.");
            },
          },
        );

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Update profile error:", error);
        setErrorMessage("Failed to update profile. Please try again.");
      }
    });
  };

  const handleDeleteAccount = () => {
    setDeleteError("");

    if (password !== "CONFIRM") {
      setDeleteError('Please type "CONFIRM" to delete your account');
      return;
    }

    startDeleteTransition(async () => {
      try {
        await deleteUser(
          {},
          {
            onSuccess: () => {
              router.push("/account-deleted");
            },
            onError: () => {
              setDeleteError(
                "Failed to delete account. Please try again later.",
              );
            },
          },
        );
      } catch (error) {
        console.error("Delete account error:", error);
        setDeleteError("Failed to delete account. Please try again later.");
      }
    });
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex flex-col items-center justify-center">
          <svg
            className="h-10 w-10 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <h2 className="mt-4 text-center text-xl font-medium text-white">
            Loading your profile...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {successMessage && (
          <div className="mb-6 rounded-md bg-green-500/20 p-4 shadow-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-300">
                  {successMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-md bg-red-500/20 p-4 shadow-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-300">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Section */}
        <div className="mb-10 rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg">
          <div className="border-b border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Your Email</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                Email address
              </h3>
              <p className="text-white">{session?.user?.email}</p>
            </div>

            {session?.user?.emailVerified ? (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-300">
                <Check className="h-4 w-4" />
                <span>Email verified</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-md bg-yellow-500/10 px-3 py-2 text-sm text-yellow-300">
                <AlertCircle className="h-4 w-4" />
                <span>Email not verified</span>
              </div>
            )}
          </div>
        </div>

        {/* User Information Section */}
        <div className="mb-10 rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg">
          <div className="border-b border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              User Information
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">Name</h3>
              {isEditing ? (
                <div className="mt-2 space-y-4">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(session?.user?.name || "");
                        setErrorMessage("");
                      }}
                      className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                      disabled={isPendingUpdate}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      disabled={isPendingUpdate}
                    >
                      {isPendingUpdate ? (
                        <div className="flex items-center gap-2">
                          <svg
                            className="h-4 w-4 animate-spin text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Saving...
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white">
                    {session?.user?.name || "Not set"}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                Account Created
              </h3>
              <p className="text-white">
                {session?.user?.createdAt
                  ? new Date(session.user.createdAt).toLocaleDateString()
                  : new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="mb-10 rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg">
          <div className="border-b border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                Password
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-white">••••••••••••</p>
                <Button
                  variant="outline"
                  className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                  onClick={async () => {
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          redirect("/forgot-password");
                        },
                      },
                    });
                  }}
                >
                  Reset Password
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                Multi-Factor Authentication (MFA)
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                Protect your account by adding an extra layer of security.
              </p>

              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                Enable MFA
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-800/50 bg-red-900/10 shadow-lg">
          <div className="border-b border-red-800/50 px-6 py-4">
            <h2 className="text-xl font-semibold text-red-300">Danger Zone</h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-base font-medium text-red-300">
                  Delete Account
                </h3>
                <p className="text-sm text-red-200/70">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-800 bg-red-900/20 text-red-300 hover:bg-red-900/40 hover:text-red-200"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="mx-auto max-w-[95vw] border-gray-700 bg-gray-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-300">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              This action is permanent and cannot be undone. All your data will
              be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-300">
              <p>Please type "CONFIRM" to delete your account.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-300">
                Confirmation
              </Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-500"
                placeholder='Type "CONFIRM"'
              />

              {deleteError && (
                <p className="text-sm text-red-400">{deleteError}</p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setPassword("");
                setDeleteError("");
              }}
              className="w-full border-gray-600 bg-gray-700 text-white hover:bg-gray-600 sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Deleting...
                </div>
              ) : (
                "Delete Account"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
