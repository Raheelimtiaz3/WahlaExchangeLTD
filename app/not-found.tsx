import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-teal-400 mb-2">404 - Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-6">
        The page or resource you are looking for is not available.
      </p>
      <Link
        href="/"
        className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}
