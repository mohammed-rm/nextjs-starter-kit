import { SignOutButton } from "@/components/auth/sign-out";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth";
import { LogOut, Settings } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pageContent = {
    title: "Dashboard",
    userProfile: {
      initial: session?.user?.name?.[0] ?? "?",
      name: session?.user?.name,
      email: session?.user?.email,
    },
    menuItems: {
      manageAccount: {
        text: "Manage Account",
        href: "/dashboard/profile",
        icon: Settings,
      },
      signOut: {
        text: "Sign Out",
        icon: LogOut,
      },
    },
    sessionInfo: {
      title: "Session Information",
      description: "Current user session details",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {pageContent.title}
          </h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus-visible:outline-none">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/90 text-lg font-medium text-white ring-1 ring-indigo-500/20 transition-all hover:bg-indigo-600 hover:ring-2 hover:ring-indigo-400/30">
                  {pageContent.userProfile.initial}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 border-slate-800 bg-slate-900/95 p-2 text-slate-300 shadow-xl shadow-black/20 backdrop-blur"
              >
                <DropdownMenuLabel className="px-2 py-1.5">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-slate-200">
                      {pageContent.userProfile.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {pageContent.userProfile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-1.5 bg-slate-800" />
                <DropdownMenuItem>
                  <Link
                    href={pageContent.menuItems.manageAccount.href}
                    className="flex items-center justify-center gap-2"
                  >
                    <pageContent.menuItems.manageAccount.icon
                      size={16}
                      className="text-slate-400"
                    />
                    <span>{pageContent.menuItems.manageAccount.text}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1.5 bg-slate-800" />
                <DropdownMenuItem>
                  <SignOutButton>
                    <pageContent.menuItems.signOut.icon
                      size={16}
                      className="text-slate-400"
                    />
                    <span>{pageContent.menuItems.signOut.text}</span>
                  </SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mt-8">
          <div className="overflow-hidden rounded-lg bg-gray-800/50 shadow-xl ring-1 ring-gray-700">
            <div className="px-4 py-5 sm:p-6">
              <div className="mb-4">
                <h2 className="text-lg font-medium text-white">
                  {pageContent.sessionInfo.title}
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  {pageContent.sessionInfo.description}
                </p>
              </div>
              <pre className="mt-4 overflow-auto rounded-md bg-gray-900/50 p-4 text-sm text-gray-300 ring-1 ring-gray-700">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
