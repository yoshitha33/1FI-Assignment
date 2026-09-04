export default function ProductGallery({ selectedImage, thumbnails, alt, onSelectImage }) {
  return (
    <section className="card-shell p-4 sm:p-5">
      <div className="overflow-hidden rounded-3xl bg-slate-100">
        <img
          src={selectedImage || '/placeholder-product.svg'}
          alt={alt}
          className="aspect-square w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = '/placeholder-product.svg';
          }}
        />
      </div>

      {thumbnails.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {thumbnails.map((thumbnail, index) => (
            <button
              key={`${thumbnail}-${index}`}
              type="button"
              onClick={() => onSelectImage(thumbnail)}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <img
                src={thumbnail || '/placeholder-product.svg'}
                alt={`${alt} thumbnail ${index + 1}`}
                className="aspect-square w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = '/placeholder-product.svg';
                }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}