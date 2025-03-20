import Link from "next/link";

export default function NotFound() {
  const pageContent = {
    errorCode: "404",
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    button: "Return Home",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-700/50 bg-slate-800/50 p-8 text-center shadow-xl backdrop-blur-lg">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="h-40 w-40 rounded-full bg-indigo-500 blur-2xl"></div>
          </div>
          <h1 className="relative bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-8xl font-extrabold text-transparent">
            {pageContent.errorCode}
          </h1>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white">
          {pageContent.title}
        </h2>
        <p className="mb-8 text-gray-300">{pageContent.description}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-gray-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-200 hover:shadow-xl"
        >
          {pageContent.button}
        </Link>
      </div>
    </div>
  );
}
