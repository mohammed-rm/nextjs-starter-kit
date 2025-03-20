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
import { Loader } from "@/components/ui/loader";
import { signOut, useSession } from "@/lib/auth-client";
import { handleDeleteAccount, handleUpdateProfile } from "@/lib/utils";
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

  const pageContent = {
    title: "Profile",
    backButton: {
      text: "Back to Dashboard",
      href: "/dashboard",
    },
    sections: {
      email: {
        title: "Your Email",
        emailLabel: "Email address",
        verified: {
          text: "Email verified",
          icon: Check,
        },
        notVerified: {
          text: "Email not verified",
          icon: AlertCircle,
        },
      },
      userInfo: {
        title: "User Information",
        nameLabel: "Name",
        nameNotSet: "Not set",
        editButton: "Edit",
        cancelButton: "Cancel",
        saveButton: "Save Changes",
        savingText: "Saving...",
        createdLabel: "Account Created",
      },
      security: {
        title: "Security",
        passwordLabel: "Password",
        passwordMask: "••••••••••••",
        resetButton: "Reset Password",
        mfaLabel: "Multi-Factor Authentication (MFA)",
        mfaDescription:
          "Protect your account by adding an extra layer of security.",
        enableMfaButton: "Enable MFA",
      },
      dangerZone: {
        title: "Danger Zone",
        deleteAccount: {
          title: "Delete Account",
          description:
            "Permanently delete your account and all associated data. This action cannot be undone.",
          button: "Delete Account",
          dialog: {
            title: "Delete Account",
            description:
              "This action is permanent and cannot be undone. All your data will be permanently deleted.",
            instruction: 'Please type "CONFIRM" to delete your account.',
            confirmLabel: "Confirmation",
            confirmPlaceholder: 'Type "CONFIRM"',
            cancelButton: "Cancel",
            deleteButton: "Delete Account",
            deletingText: "Deleting...",
          },
        },
      },
    },
    loading: {
      text: "Loading your profile...",
    },
  };

  // If not authenticated, redirect to sign-in
  if (!isPending && !session) {
    redirect("/sign-in");
  }

  // Initialize form values when session data is available
  if (session?.user?.name && !isEditing && !name) {
    setName(session.user.name || "");
  }

  const onSaveProfile = () => {
    setErrorMessage("");

    handleUpdateProfile(
      {
        name,
        onSuccess: () => {
          setSuccessMessage("Profile updated successfully");
          setIsEditing(false);

          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        },
        onError: (message) => {
          setErrorMessage(message);
        },
      },
      startTransition,
    );
  };

  const onDeleteAccount = () => {
    setDeleteError("");

    handleDeleteAccount(
      {
        confirmation: password,
        expectedValue: "CONFIRM",
        onSuccess: () => {
          router.push("/account-deleted");
        },
        onError: (message) => {
          setDeleteError(message);
        },
      },
      startDeleteTransition,
    );
  };

  // Loading state
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex flex-col items-center justify-center">
          <Loader className="h-10 w-10 text-white" />
          <h2 className="mt-4 text-center text-xl font-medium text-white">
            {pageContent.loading.text}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">{pageContent.title}</h1>
          <Link href={pageContent.backButton.href}>
            <Button
              variant="outline"
              className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {pageContent.backButton.text}
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
            <h2 className="text-xl font-semibold text-white">
              {pageContent.sections.email.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                {pageContent.sections.email.emailLabel}
              </h3>
              <p className="text-white">{session?.user?.email}</p>
            </div>

            {session?.user?.emailVerified ? (
              <div className="flex items-center gap-2 rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-300">
                <pageContent.sections.email.verified.icon className="h-4 w-4" />
                <span>{pageContent.sections.email.verified.text}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 rounded-md bg-yellow-500/10 px-3 py-2 text-sm text-yellow-300">
                <pageContent.sections.email.notVerified.icon className="h-4 w-4" />
                <span>{pageContent.sections.email.notVerified.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* User Information Section */}
        <div className="mb-10 rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg">
          <div className="border-b border-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              {pageContent.sections.userInfo.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                {pageContent.sections.userInfo.nameLabel}
              </h3>
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
                      {pageContent.sections.userInfo.cancelButton}
                    </Button>
                    <Button
                      onClick={onSaveProfile}
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      disabled={isPendingUpdate}
                    >
                      {isPendingUpdate ? (
                        <div className="flex items-center gap-2">
                          <Loader className="h-4 w-4 text-gray-900" />
                          {pageContent.sections.userInfo.savingText}
                        </div>
                      ) : (
                        pageContent.sections.userInfo.saveButton
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-white">
                    {session?.user?.name ||
                      pageContent.sections.userInfo.nameNotSet}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                  >
                    {pageContent.sections.userInfo.editButton}
                  </Button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                {pageContent.sections.userInfo.createdLabel}
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
            <h2 className="text-xl font-semibold text-white">
              {pageContent.sections.security.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                {pageContent.sections.security.passwordLabel}
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-white">
                  {pageContent.sections.security.passwordMask}
                </p>
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
                  {pageContent.sections.security.resetButton}
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="mb-1 text-sm font-medium text-gray-400">
                {pageContent.sections.security.mfaLabel}
              </h3>
              <p className="mb-4 text-sm text-gray-400">
                {pageContent.sections.security.mfaDescription}
              </p>

              <Button className="bg-white text-gray-900 hover:bg-gray-100">
                {pageContent.sections.security.enableMfaButton}
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-lg border border-red-800/50 bg-red-900/10 shadow-lg">
          <div className="border-b border-red-800/50 px-6 py-4">
            <h2 className="text-xl font-semibold text-red-300">
              {pageContent.sections.dangerZone.title}
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <h3 className="text-base font-medium text-red-300">
                  {pageContent.sections.dangerZone.deleteAccount.title}
                </h3>
                <p className="text-sm text-red-200/70">
                  {pageContent.sections.dangerZone.deleteAccount.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-red-800 bg-red-900/20 text-red-300 hover:bg-red-900/40 hover:text-red-200"
                onClick={() => setDeleteDialogOpen(true)}
              >
                {pageContent.sections.dangerZone.deleteAccount.button}
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
              {pageContent.sections.dangerZone.deleteAccount.dialog.title}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {pageContent.sections.dangerZone.deleteAccount.dialog.description}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-300">
              <p>
                {
                  pageContent.sections.dangerZone.deleteAccount.dialog
                    .instruction
                }
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-300">
                {
                  pageContent.sections.dangerZone.deleteAccount.dialog
                    .confirmLabel
                }
              </Label>
              <Input
                id="password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-gray-600 bg-gray-700 text-white placeholder:text-gray-500"
                placeholder={
                  pageContent.sections.dangerZone.deleteAccount.dialog
                    .confirmPlaceholder
                }
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
              {
                pageContent.sections.dangerZone.deleteAccount.dialog
                  .cancelButton
              }
            </Button>
            <Button
              type="button"
              onClick={onDeleteAccount}
              className="w-full bg-red-600 text-white hover:bg-red-700 sm:w-auto"
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="h-4 w-4 text-white" />
                  {
                    pageContent.sections.dangerZone.deleteAccount.dialog
                      .deletingText
                  }
                </div>
              ) : (
                pageContent.sections.dangerZone.deleteAccount.dialog
                  .deleteButton
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
