"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { handleForgotPassword } from "@/lib/utils";
import { KeyIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function ForgotPasswordPage() {
  const pageContent = {
    title: "Reset your password",
    description:
      "Enter your email address and we'll send you a link to reset your password",
    form: {
      emailLabel: "Email address",
      emailPlaceholder: "jack@example.com",
      submitButton: "Send Reset Link",
      loadingText: "Sending...",
    },
    alerts: {
      success: "Reset password link has been sent",
      error: "If this email exists in our system, a reset link has been sent",
    },
    links: {
      signIn: "Back to Sign In",
      signUp: "Create Account",
    },
  };

  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    handleForgotPassword(
      e,
      {
        email,
        redirectTo: "/reset-password",
        successMessage: pageContent.alerts.success,
        errorMessage: pageContent.alerts.error,
        onSuccess: (message) => alert(message),
        onError: (message) => alert(message),
      },
      startTransition,
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
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
              {pageContent.title}
            </h2>
            <p className="text-gray-300">{pageContent.description}</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-address" className="text-gray-200">
                {pageContent.form.emailLabel}
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={pageContent.form.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="border-slate-700/50 bg-slate-800/50 text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
              />
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
                <span>{pageContent.form.loadingText}</span>
              </div>
            ) : (
              pageContent.form.submitButton
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-700/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-gray-400">
              or
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-4">
            <Link
              href="/sign-in"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {pageContent.links.signIn}
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/sign-up"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              {pageContent.links.signUp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
