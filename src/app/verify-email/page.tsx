import { Card } from "@/components/ui/card";
import { AlertCircle, Inbox, Mail } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ state: string }>;
}

export default async function VerifyEmail({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.state !== "signup") {
    redirect("/");
  }

  const pageContent = {
    title: "Check your email",
    description:
      "We've sent you a verification link to your email address. Please click the link to verify your account.",
    inbox: {
      title: "Check your inbox",
      description: "The verification link will expire in 24 hours",
    },
    spam: {
      title: "Can't find the email?",
      description: "Check your spam folder or request a new verification link",
    },
    support: {
      text: "Need help?",
      linkText: "Contact support",
      linkHref: "/contact",
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="rounded-full bg-indigo-500/10 p-3">
            <Mail className="h-8 w-8 text-indigo-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              {pageContent.title}
            </h1>
            <p className="text-slate-400">{pageContent.description}</p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-start space-x-3 rounded-lg bg-slate-800/50 p-4">
              <Inbox className="mt-0.5 h-5 w-5 text-indigo-400" />
              <div className="text-sm text-slate-300">
                <p className="mb-1 font-medium">{pageContent.inbox.title}</p>
                <p className="text-slate-400">
                  {pageContent.inbox.description}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-lg bg-slate-800/50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-400" />
              <div className="text-sm text-slate-300">
                <p className="mb-1 font-medium">{pageContent.spam.title}</p>
                <p className="text-slate-400">{pageContent.spam.description}</p>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            <p>
              {pageContent.support.text}{" "}
              <Link
                href={pageContent.support.linkHref}
                className="text-indigo-400 transition-colors hover:text-indigo-300"
              >
                {pageContent.support.linkText}
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
