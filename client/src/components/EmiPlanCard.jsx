const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <label
      className={`relative block cursor-pointer rounded-3xl border p-4 transition ${
        selected ? 'border-accent bg-accentSoft/60 shadow-soft' : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <input
        type="radio"
        name="emi-plan"
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-2xl font-semibold text-ink">{currencyFormatter.format(plan.monthlyAmount)} / month</p>
          <p className="mt-2 text-sm font-medium text-slate-500">{plan.tenureMonths} months</p>
          <p className="mt-1 text-sm text-slate-600">{plan.interestRate}% interest</p>
          <p className="mt-1 text-sm text-slate-600">Additional cashback of {currencyFormatter.format(plan.cashbackAmount)}</p>
          <p className="mt-1 text-xs text-slate-500">Processing fee: {currencyFormatter.format(plan.processingFee)}</p>
        </div>
        <span className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border ${selected ? 'border-accent' : 'border-slate-300'}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${selected ? 'bg-accent' : 'bg-transparent'}`} />
        </span>
      </div>
      {plan.isMutualFundBacked ? (
        <div className="mt-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Mutual Fund Backed
        </div>
      ) : null}
      <div className="mt-3 text-sm font-medium text-accent">Select</div>
    </label>
  );
}