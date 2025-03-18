"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        // Call the authClient's forgetPassword method
        await forgetPassword(
          {
            email,
            redirectTo: `/reset-password`,
          },
          {
            onResponse: () => {},
            onRequest: () => {},
            onSuccess: () => {
              alert("Reset password link has been sent");
            },
            onError: () => {
              // Don't reveal if email exists in system
              alert(
                "If this email exists in our system, a reset link has been sent",
              );
            },
          },
        );
      } catch (error) {
        console.error("Forgot password error:", error);
        // Don't reveal if email exists in system
        alert("If this email exists in our system, a reset link has been sent");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-address" className="text-gray-200">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-gray-900 hover:bg-gray-200"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center justify-center">
                <svg
                  className="-ml-1 mr-3 h-5 w-5 animate-spin text-gray-900"
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
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-4">
            <Link
              href="/sign-in"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Back to Sign In
            </Link>
            <span className="text-gray-600">•</span>
            <Link
              href="/sign-up"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
