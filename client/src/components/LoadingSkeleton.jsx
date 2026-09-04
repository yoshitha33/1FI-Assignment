export default function LoadingSkeleton({ type = 'product' }) {
  if (type === 'grid') {
    return (
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="card-shell animate-pulse p-4">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
            <div className="mt-4 h-4 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
            <div className="mt-5 h-11 w-full rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="card-shell animate-pulse p-5">
        <div className="aspect-square rounded-3xl bg-slate-200" />
        <div className="mt-4 grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-square rounded-2xl bg-slate-200" />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <div className="card-shell animate-pulse p-6">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="mt-4 h-8 w-3/4 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-16 rounded-2xl bg-slate-200" />
            ))}
          </div>
        </div>
        <div className="card-shell animate-pulse p-6">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 rounded-3xl bg-slate-200" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}