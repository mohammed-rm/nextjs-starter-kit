import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="relative">
        <div className="absolute right-4 top-4 flex items-center gap-4 sm:right-6 sm:top-6 lg:right-8 lg:top-8">
          {session ? (
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-white text-gray-900 hover:bg-gray-200"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-gray-700 bg-transparent text-gray-300 hover:border-gray-600 hover:bg-gray-800/50 hover:text-white"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                variant="default"
                size="sm"
                className="bg-white text-gray-900 hover:bg-gray-200"
              >
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Next.js{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Starter Kit
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            A modern web application starter kit built with cutting-edge
            technologies for rapid development
          </p>
        </div>

        <div className="mt-24">
          <h2 className="text-center text-2xl font-bold text-white">
            Built with modern technologies
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Next.js",
                description:
                  "React framework for server-side rendering and static web applications",
              },
              {
                title: "Better Auth",
                description:
                  "Modern authentication and authorization framework",
              },
              {
                title: "Drizzle ORM",
                description: "Lightweight and type-safe SQL ORM for TypeScript",
              },
              {
                title: "Tailwind CSS",
                description:
                  "Utility-first CSS framework for rapid UI development",
              },
              {
                title: "shadcn/ui",
                description:
                  "Beautiful components built with Radix UI and Tailwind CSS",
              },
              {
                title: "TypeScript",
                description:
                  "Strongly typed programming language that builds on JavaScript",
              },
            ].map((tech) => (
              <div
                key={tech.title}
                className="rounded-lg bg-white/5 p-6 ring-1 ring-white/10 transition-all hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold text-white">
                  {tech.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
