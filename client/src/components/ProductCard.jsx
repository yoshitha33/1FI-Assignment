import { Link } from 'react-router-dom';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }) {
  return (
    <article className="card-shell flex h-full flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl || '/placeholder-product.svg'}
          alt={`${product.brand} ${product.name}`}
          className="h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = '/placeholder-product.svg';
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{product.brand}</p>
        <h3 className="mt-2 text-lg font-semibold text-ink">{product.name}</h3>
        <p className="mt-2 text-sm text-slate-500">Starting at</p>
        <p className="mt-1 text-2xl font-semibold text-ink">
          {product.startingPrice ? currencyFormatter.format(product.startingPrice) : 'View pricing'}
        </p>
        <div className="mt-6 flex items-end gap-3">
          <Link to={`/products/${product.slug}`} className="btn-primary w-full">
            View Product
          </Link>
        </div>
      </div>
    </article>
  );
}