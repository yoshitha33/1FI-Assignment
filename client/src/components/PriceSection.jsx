const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function PriceSection({ mrp, sellingPrice, stock }) {
  const discount = mrp ? Math.round(((mrp - sellingPrice) / mrp) * 100) : 0;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-3xl font-semibold text-ink">{currencyFormatter.format(sellingPrice)}</span>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
          {discount}% OFF
        </span>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-slate-500">
        <p>
          MRP: <span className="font-medium text-slate-700">{currencyFormatter.format(mrp)}</span>
        </p>
        <p>
          Stock: <span className="font-medium text-slate-700">{stock}</span>
        </p>
      </div>
    </section>
  );
}