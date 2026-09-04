const features = ['Free Delivery', 'Secure Transaction', 'Easy Returns', 'Customer Support'];

export default function TrustFeatures() {
  return (
    <section className="card-shell p-5">
      <h3 className="text-lg font-semibold text-ink">Shop With Confidence</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            {feature}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        Demo financing information only. No actual loan, investment, or payment is processed.
      </p>
    </section>
  );
}