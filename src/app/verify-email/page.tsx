import { Card } from "@/components/ui/card";
import { AlertCircle, Inbox, Mail } from "lucide-react";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ state: string }>;
}

export default async function VerifyEmail({ searchParams }: PageProps) {
  const params = await searchParams;
  
  if (params.state !== "signup") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md border border-slate-800 bg-slate-900/50 p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="rounded-full bg-indigo-500/10 p-3">
            <Mail className="h-8 w-8 text-indigo-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Check your email
            </h1>
            <p className="text-slate-400">
              We've sent you a verification link to your email address. Please
              click the link to verify your account.
            </p>
          </div>

          <div className="w-full space-y-4">
            <div className="flex items-start space-x-3 rounded-lg bg-slate-800/50 p-4">
              <Inbox className="mt-0.5 h-5 w-5 text-indigo-400" />
              <div className="text-sm text-slate-300">
                <p className="mb-1 font-medium">Check your inbox</p>
                <p className="text-slate-400">
                  The verification link will expire in 24 hours
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-lg bg-slate-800/50 p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 text-amber-400" />
              <div className="text-sm text-slate-300">
                <p className="mb-1 font-medium">Can't find the email?</p>
                <p className="text-slate-400">
                  Check your spam folder or request a new verification link
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-slate-400">
            <p>
              Need help?{" "}
              <a
                href="/contact"
                className="text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Contact support
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
