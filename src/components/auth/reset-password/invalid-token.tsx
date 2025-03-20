import { AlertCircle } from "lucide-react";
import Link from "next/link";

type InvalidTokenProps = {
  pageContent: {
    invalidToken: {
      title: string;
      description: string;
      button: string;
    };
  };
};

export function InvalidToken({ pageContent }: InvalidTokenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 shadow-xl backdrop-blur-lg">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="h-40 w-40 rounded-full bg-red-500 blur-2xl"></div>
          </div>
          <div className="relative flex items-center justify-center">
            <AlertCircle className="h-16 w-16 text-red-400" />
          </div>

          <div className="mt-6 space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              {pageContent.invalidToken.title}
            </h2>
            <p className="text-gray-300">{pageContent.invalidToken.description}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl"
          >
            {pageContent.invalidToken.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
