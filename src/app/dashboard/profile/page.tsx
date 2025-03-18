"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProfilePage() {
  const { data: session, isPending, error } = useSession();
  const [isPendingUpdate, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
    startTransition(async () => {
      // Here you would implement the API call to update the user profile
      // For now, we'll just simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Profile updated successfully");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
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
                      onClick={() => setIsEditing(false)}
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
        <div className="rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg">
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
                  onClick={() => (window.location.href = "/forgot-password")}
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
      </div>
    </div>
  );
}
