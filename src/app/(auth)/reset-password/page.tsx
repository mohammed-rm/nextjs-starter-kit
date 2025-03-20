"use client";

import { GenericError } from "@/components/auth/reset-password/generic-error";
import { InvalidToken } from "@/components/auth/reset-password/invalid-token";
import { SuccessfullReset } from "@/components/auth/reset-password/successfull-reset";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { handleResetPassword } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff, KeyIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function ResetPasswordPage() {
  const pageContent = {
    main: {
      title: "Reset your password",
      description: "Enter your new password below",
      form: {
        newPasswordLabel: "New Password",
        newPasswordPlaceholder: "Enter your new password",
        confirmPasswordLabel: "Confirm Password",
        confirmPasswordPlaceholder: "Confirm your new password",
        submitButton: "Reset Password",
        loadingText: "Resetting...",
      },
      divider: "or",
      links: {
        signIn: "Back to Sign In",
      },
    },
    invalidToken: {
      title: "Invalid Reset Link",
      description: "The password reset link is invalid or has expired.",
      button: "Request a new password reset link",
    },
    success: {
      title: "Password Reset Successful",
      description: "Your password has been successfully reset.",
      button: "Sign in with your new password",
    },
    expired: {
      title: "Token Expired",
      description:
        "Your reset token has expired or is invalid. Please request a new link.",
      button: "Request a new password reset link",
    },
    errors: {
      passwordMismatch: "Passwords do not match",
      passwordLength: "Password must be at least 8 characters long",
      invalidToken: "Invalid or missing reset token",
      resetFailed: "Failed to reset password. The link may have expired.",
      invalidTokenAlert: "Invalid reset token",
      genericError: "Failed to reset password",
    },
  };

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const error = searchParams.get("error");
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    handleResetPassword(
      e,
      {
        password,
        confirmPassword,
        token,
        messages: pageContent.errors,
        onSuccess: () => setResetSuccess(true),
        onError: (message) => setPasswordError(message),
      },
      startTransition,
    );
  };

  if (error === "invalid_token") {
    return <InvalidToken pageContent={pageContent} />;
  }

  if (resetSuccess) {
    return <SuccessfullReset pageContent={pageContent} />;
  }

  if (!token || error) {
    return <GenericError pageContent={pageContent} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-xl backdrop-blur-lg">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="h-40 w-40 rounded-full bg-indigo-500 blur-2xl"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <KeyIcon className="h-16 w-16 text-indigo-400" />
          </div>

          <div className="mt-6 space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {pageContent.main.title}
            </h2>
            <p className="text-gray-300">{pageContent.main.description}</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          {passwordError && (
            <div className="rounded-md bg-red-500/10 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-400">
                    {passwordError}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-gray-200">
                {pageContent.main.form.newPasswordLabel}
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder={pageContent.main.form.newPasswordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="border-slate-700/50 bg-slate-800/50 pr-10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-gray-200">
                {pageContent.main.form.confirmPasswordLabel}
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder={pageContent.main.form.confirmPasswordPlaceholder}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isPending}
                  className="border-slate-700/50 bg-slate-800/50 pr-10 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-gray-900 shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <Loader isPending={isPending} size="sm" />
                <span>{pageContent.main.form.loadingText}</span>
              </div>
            ) : (
              pageContent.main.form.submitButton
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-700/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-gray-400">
              {pageContent.main.divider}
            </span>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/sign-in"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            {pageContent.main.links.signIn}
          </Link>
        </div>
      </div>
    </div>
  );
}
