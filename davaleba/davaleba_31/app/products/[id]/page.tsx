import Link from "next/link";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <Link
        href="/products"
        className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        ← Back to Products
      </Link>
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <h1 className="text-3xl font-bold text-white">Product ID: {id}</h1>
        <p className="text-slate-400">
          Viewing product details for dynamic route parameter:{" "}
          <span className="font-mono font-semibold text-indigo-400">{id}</span>
        </p>
      </div>
    </div>
  );
}

