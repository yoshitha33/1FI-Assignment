function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]))];
}

export default function VariantSelector({ variants, selectedVariant, onSelectVariant }) {
  const colors = uniqueValues(variants, 'color');
  const storages = uniqueValues(variants, 'storage');

  function handleSelection(nextColor, nextStorage) {
    const nextVariant = variants.find((variant) => variant.color === nextColor && variant.storage === nextStorage);
    if (nextVariant) {
      onSelectVariant(nextVariant);
    }
  }

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-500">Color</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {colors.map((color) => {
            const isActive = selectedVariant?.color === color;
            return (
              <button
                key={color}
                type="button"
                onClick={() => handleSelection(color, selectedVariant?.storage)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent ${
                  isActive
                    ? 'border-accent bg-accent text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500">Storage</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {storages.map((storage) => {
            const isActive = selectedVariant?.storage === storage;
            return (
              <button
                key={storage}
                type="button"
                onClick={() => handleSelection(selectedVariant?.color, storage)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent ${
                  isActive
                    ? 'border-accent bg-accent text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {storage}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}