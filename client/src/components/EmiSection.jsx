import EmiPlanCard from './EmiPlanCard';

export default function EmiSection({ plans, selectedEmiPlan, onSelectPlan }) {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-xl font-semibold text-ink">EMI Plans</h3>
        <p className="mt-1 text-sm text-slate-500">EMI plans backed by mutual funds</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {plans.map((plan) => (
          <EmiPlanCard
            key={plan._id}
            plan={plan}
            selected={selectedEmiPlan?._id === plan._id}
            onSelect={() => onSelectPlan(plan)}
          />
        ))}
      </div>
    </section>
  );
}