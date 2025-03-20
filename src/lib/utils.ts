import {
  deleteUser,
  forgetPassword,
  resetPassword,
  signIn,
  signUp,
  updateUser,
} from "@/lib/auth-client";
import { clsx, type ClassValue } from "clsx";
import { startTransition } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ForgotPasswordOptions = {
  email: string;
  redirectTo: string;
  successMessage: string;
  errorMessage: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

type ResetPasswordOptions = {
  password: string;
  confirmPassword: string;
  token: string | null | undefined;
  messages: {
    passwordMismatch: string;
    passwordLength: string;
    invalidToken: string;
    resetFailed: string;
    invalidTokenAlert: string;
    genericError: string;
  };
  onSuccess: () => void;
  onError: (message: string) => void;
};

type EmailSignInOptions = {
  email: string;
  password: string;
  callbackURL: string;
  onSuccess: () => void;
  onError: (ctx: any) => void;
};

type GoogleSignInOptions = {
  callbackURL: string;
};

type EmailSignUpOptions = {
  name: string;
  email: string;
  password: string;
  callbackURL: string;
  onSuccess: () => void;
  onError: (ctx: any) => void;
};

type UpdateProfileOptions = {
  name: string;
  onSuccess: () => void;
  onError: (message: string) => void;
};

type DeleteAccountOptions = {
  confirmation: string;
  expectedValue: string;
  onSuccess: () => void;
  onError: (message: string) => void;
};

export async function handleForgotPassword(
  e: React.FormEvent,
  options: ForgotPasswordOptions,
  startTransitionFn: typeof startTransition,
) {
  e.preventDefault();

  startTransitionFn(async () => {
    try {
      await forgetPassword(
        {
          email: options.email,
          redirectTo: options.redirectTo,
        },
        {
          onSuccess: () => {
            options.onSuccess(options.successMessage);
          },
          onError: () => {
            options.onError(options.errorMessage);
          },
        },
      );
    } catch (error) {
      options.onError(options.errorMessage);
    }
  });
}

export async function handleResetPassword(
  e: React.FormEvent,
  options: ResetPasswordOptions,
  startTransitionFn: typeof startTransition,
) {
  e.preventDefault();

  if (options.password !== options.confirmPassword) {
    options.onError(options.messages.passwordMismatch);
    return;
  }

  if (options.password.length < 8) {
    options.onError(options.messages.passwordLength);
    return;
  }

  if (!options.token) {
    options.onError(options.messages.invalidToken);
    return;
  }

  startTransitionFn(async () => {
    try {
      await resetPassword(
        {
          newPassword: options.password,
          token: options.token ?? undefined,
        },
        {
          onSuccess: () => {
            options.onSuccess();
          },
          onError: (ctx) => {
            if (ctx.error.status === 400) {
              options.onError(options.messages.invalidTokenAlert);
            } else {
              options.onError(options.messages.genericError);
            }
          },
        },
      );
    } catch (error) {
      options.onError(options.messages.resetFailed);
    }
  });
}

export async function handleEmailSignIn(
  e: React.FormEvent,
  options: EmailSignInOptions,
  startTransitionFn: typeof startTransition,
) {
  e.preventDefault();

  startTransitionFn(async () => {
    try {
      await signIn.email(
        {
          email: options.email,
          password: options.password,
          callbackURL: options.callbackURL,
        },
        {
          onSuccess: options.onSuccess,
          onError: options.onError,
        },
      );
    } catch (error) {
      console.error("Email sign-in error:", error);
    }
  });
}

export async function handleGoogleSignIn(
  options: GoogleSignInOptions,
  startTransitionFn: typeof startTransition,
) {
  startTransitionFn(async () => {
    await signIn.social({
      provider: "google",
      callbackURL: options.callbackURL,
    });
  });
}

export async function handleEmailSignUp(
  e: React.FormEvent,
  options: EmailSignUpOptions,
  startTransitionFn: typeof startTransition,
) {
  e.preventDefault();

  startTransitionFn(async () => {
    try {
      await signUp.email(
        {
          name: options.name,
          email: options.email,
          password: options.password,
          callbackURL: options.callbackURL,
        },
        {
          onSuccess: options.onSuccess,
          onError: options.onError,
        },
      );
    } catch (error) {
      console.error("Email sign-up error:", error);
    }
  });
}

export async function handleUpdateProfile(
  options: UpdateProfileOptions,
  startTransitionFn: typeof startTransition,
) {
  if (!options.name.trim()) {
    options.onError("Name cannot be empty");
    return;
  }

  startTransitionFn(async () => {
    try {
      await updateUser(
        {
          name: options.name.trim(),
        },
        {
          onSuccess: options.onSuccess,
          onError: () => {
            options.onError("Failed to update profile. Please try again.");
          },
        },
      );
    } catch (error) {
      console.error("Update profile error:", error);
      options.onError("Failed to update profile. Please try again.");
    }
  });
}

export async function handleDeleteAccount(
  options: DeleteAccountOptions,
  startTransitionFn: typeof startTransition,
) {
  if (options.confirmation !== options.expectedValue) {
    options.onError(
      `Please type "${options.expectedValue}" to delete your account`,
    );
    return;
  }

  startTransitionFn(async () => {
    try {
      await deleteUser(
        {},
        {
          onSuccess: options.onSuccess,
          onError: () => {
            options.onError(
              "Failed to delete account. Please try again later.",
            );
          },
        },
      );
    } catch (error) {
      console.error("Delete account error:", error);
      options.onError("Failed to delete account. Please try again later.");
    }
  });
}
