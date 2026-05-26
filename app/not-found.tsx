// app/not-found.tsx
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-4xl font-bold text-gray-800">404 – Page Not Found</h1>
            <p className="mt-2 text-lg text-gray-600">
                The page you are looking for does not exist.
            </p>
            <Link href="/" className="mt-6 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">Return Home</Link>
        </div>
    );
}
