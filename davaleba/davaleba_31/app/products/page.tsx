import Link from "next/link";

const products = [
  { id: 1, name: "iPhone" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "MacBook" },
];

export default function Products() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <p className="text-slate-400 mt-1">Select a product to view details</p>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="block p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                  {product.name}
                </span>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 group-hover:bg-indigo-900/50 group-hover:text-indigo-300 transition-colors">
                  ID: {product.id}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

