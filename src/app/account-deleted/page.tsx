"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AccountDeletedPage() {
  const pageContent = {
    title: "Account Deleted",
    description:
      "Your account has been successfully deleted. We're sorry to see you go.",
    divider: "Thank you for using our service",
    newAccount: {
      message: "If you change your mind, you can always create a new account.",
      buttonText: "Return to Sign Up",
      buttonHref: "/sign-up",
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 text-center">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-xl backdrop-blur-lg">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="h-40 w-40 rounded-full bg-indigo-500 blur-2xl"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-indigo-400" />
          </div>

          <div className="mt-6 space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              {pageContent.title}
            </h1>
            <p className="text-gray-300">{pageContent.description}</p>
          </div>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-700/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-gray-400">
              {pageContent.divider}
            </span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-700/30 bg-slate-700/20 p-4">
            <p className="text-sm text-gray-300">
              {pageContent.newAccount.message}
            </p>
          </div>
          <Link
            href={pageContent.newAccount.buttonHref}
            className="block w-full"
          >
            <Button className="w-full bg-white text-gray-900 shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl">
              {pageContent.newAccount.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
