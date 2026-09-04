import PriceSection from './PriceSection';
import VariantSelector from './VariantSelector';
import EmiSection from './EmiSection';
import TrustFeatures from './TrustFeatures';

export default function ProductDetails({
  product,
  selectedVariant,
  selectedEmiPlan,
  onSelectVariant,
  onSelectEmiPlan,
  onProceed,
  selectionResult,
  selectionError,
}) {
  if (!product || !selectedVariant) {
    return null;
  }

  return (
    <section className="card-shell space-y-6 p-5 sm:p-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">{product.brand}</p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{product.name}</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-500">{product.description}</p>
      </div>

      <PriceSection mrp={selectedVariant.mrp} sellingPrice={selectedVariant.sellingPrice} stock={selectedVariant.stock} />

      <VariantSelector
        variants={product.variants}
        selectedVariant={selectedVariant}
        onSelectVariant={onSelectVariant}
      />

      <EmiSection
        plans={selectedVariant.emiPlans || []}
        selectedEmiPlan={selectedEmiPlan}
        onSelectPlan={onSelectEmiPlan}
      />

      <button
        type="button"
        onClick={onProceed}
        disabled={!selectedEmiPlan}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Proceed with Selected Plan
      </button>

      {selectionError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {selectionError}
        </div>
      ) : null}

      {selectionResult ? (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
          <h2 className="text-lg font-semibold text-emerald-800">EMI plan selected successfully!</h2>
          <div className="mt-4 grid gap-3 text-sm text-emerald-900 sm:grid-cols-2">
            <p>
              <span className="font-semibold">Product:</span> {product.name}
            </p>
            <p>
              <span className="font-semibold">Variant:</span> {selectedVariant.color} / {selectedVariant.storage}
            </p>
            <p>
              <span className="font-semibold">Monthly EMI:</span> {selectionResult.monthlyAmountDisplay}
            </p>
            <p>
              <span className="font-semibold">Tenure:</span> {selectionResult.tenureMonths} months
            </p>
            <p>
              <span className="font-semibold">Interest:</span> {selectionResult.interestRate}%
            </p>
            <p>
              <span className="font-semibold">Cashback:</span> {selectionResult.cashbackDisplay}
            </p>
          </div>
        </div>
      ) : null}

      <section className="space-y-3 rounded-3xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold text-ink">Product Details</h2>
        <dl className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-500">Brand</dt>
            <dd>{product.brand}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Category</dt>
            <dd>{product.category}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Storage</dt>
            <dd>{selectedVariant.storage}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Color</dt>
            <dd>{selectedVariant.color}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Finish</dt>
            <dd>{selectedVariant.finish}</dd>
          </div>
          <div>
            <dt className="font-medium text-slate-500">Stock</dt>
            <dd>{selectedVariant.stock}</dd>
          </div>
        </dl>
      </section>

      <TrustFeatures />
    </section>
  );
}