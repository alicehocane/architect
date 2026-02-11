import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-[120px] font-bold text-[#f5f5f7] leading-none mb-4">404</h1>
      <h2 className="text-[32px] font-bold text-[#1d1d1f] mb-4">Page Not Found</h2>
      <p className="text-[18px] text-[#86868b] max-w-[400px] mb-10">
        We couldn't find the page you're looking for. It might have been moved or deleted.
      </p>
      <Link 
        href="/"
        className="px-8 py-4 bg-[#1d1d1f] text-white rounded-full font-bold hover:bg-[#424245] transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}