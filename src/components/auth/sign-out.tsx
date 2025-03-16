"use client";

import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ComponentProps } from "react";
import { Button } from "../ui/button";

interface SignOutButtonProps extends ComponentProps<typeof Button> {}

export const SignOutButton = ({
  className,
  children,
  ...props
}: SignOutButtonProps) => {
  const signOutButton = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect("/");
        },
      },
    });
  };
  return (
    <button
      onClick={signOutButton}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {children}
    </button>
  );
};
