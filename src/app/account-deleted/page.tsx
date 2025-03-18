"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountDeletedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 text-center">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-700 bg-gray-800/50 p-8 shadow-xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Account Deleted
          </h1>
          <p className="text-gray-400">
            Your account has been successfully deleted. We're sorry to see you
            go.
          </p>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-gray-400">
              Thank you for using our service
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            If you change your mind, you can always create a new account.
          </p>
          <Link href="/sign-up" className="block w-full">
            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
              Return to Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
