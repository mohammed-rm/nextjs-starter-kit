"use client";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/google-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { handleEmailSignUp, handleGoogleSignIn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SignUp() {
  const pageContent = {
    title: "Create your account",
    hasAccount: {
      text: "Already have an account?",
      linkText: "Sign in",
      href: "/sign-in",
    },
    form: {
      name: {
        label: "Full name",
        placeholder: "John Doe",
      },
      email: {
        label: "Email address",
        placeholder: "Email address",
      },
      password: {
        label: "Password",
        placeholder: "Password",
      },
      submitButton: "Sign up",
    },
    divider: "Or continue with",
    socialButtons: {
      google: "Sign up with Google",
    },
  };

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    handleEmailSignUp(
      e,
      {
        name,
        email,
        password,
        callbackURL: "/dashboard",
        onSuccess: () => {
          router.push("/verify-email?state=signup");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
      startTransition,
    );
  };

  const onGoogleSignUp = () => {
    handleGoogleSignIn(
      {
        callbackURL: "/dashboard",
      },
      startGoogleTransition,
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {pageContent.title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            {pageContent.hasAccount.text}{" "}
            <Link
              href={pageContent.hasAccount.href}
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              {pageContent.hasAccount.linkText}
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                {pageContent.form.name.label}
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder={pageContent.form.name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending}
                className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-address" className="text-gray-200">
                {pageContent.form.email.label}
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={pageContent.form.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                className="border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                {pageContent.form.password.label}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder={pageContent.form.password.placeholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  className="border-gray-700 bg-gray-800/50 pr-10 text-white placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Button
              type="submit"
              className="w-full bg-white text-gray-900 hover:bg-gray-200"
              disabled={isPending}
            >
              {isPending && <Loader />}
              {pageContent.form.submitButton}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-gradient-to-br from-slate-900 to-slate-800 px-2 text-gray-400">
                  {pageContent.divider}
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={onGoogleSignUp}
              disabled={isGooglePending}
              className="w-full border-gray-700 bg-transparent text-gray-300 hover:border-gray-600 hover:bg-gray-800/50 hover:text-white"
            >
              {isGooglePending ? <Loader /> : <GoogleIcon />}
              {pageContent.socialButtons.google}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
