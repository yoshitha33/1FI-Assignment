import { Link, useLocation } from 'react-router-dom';

const categories = ['All Electronics', 'Smartphones', 'Laptops', 'Tablets', 'TVs', 'Audio'];

export default function Header() {
  const location = useLocation();

  function isCategoryActive(category) {
    if (location.pathname !== '/products') {
      return false;
    }

    const searchParams = new URLSearchParams(location.search);
    const currentCategory = searchParams.get('category');

    if (category === 'All Electronics') {
      return !currentCategory;
    }

    return currentCategory === category;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="container-shell">
        <div className="flex items-center gap-4 py-4">
          <Link to="/" className="flex items-center gap-3 font-semibold text-ink">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-base text-white shadow-soft">
              EM
            </span>
            <span className="text-lg tracking-tight">EMI Marketplace</span>
          </Link>

          <div className="hidden flex-1 items-center gap-4 lg:flex">
            <label className="relative flex-1">
              <span className="sr-only">Search products</span>
              <input
                type="search"
                placeholder="Search electronics, brands, EMI plans"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
              />
            </label>
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <nav className="flex max-w-full items-center gap-2 overflow-x-auto text-sm font-medium text-slate-600">
              {categories.map((category) => {
                const to = category === 'All Electronics' ? '/products' : `/products?category=${encodeURIComponent(category)}`;
                const active = isCategoryActive(category);

                return (
                  <Link
                    key={category}
                    to={to}
                    className={`whitespace-nowrap rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 ${
                      active ? 'bg-accentSoft text-accent' : ''
                    }`}
                  >
                    {category}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button type="button" className="btn-secondary hidden sm:inline-flex">
              Sign Up
            </button>
            <button type="button" className="btn-primary">
              Login
            </button>
          </div>
        </div>

        <div className="pb-4 lg:hidden">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <input
              type="search"
              placeholder="Search electronics, brands, EMI plans"
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10"
            />
          </label>

          <nav aria-label="Electronics categories" className="mt-4">
            <div className="flex gap-2 overflow-x-auto pb-1 text-sm font-medium text-slate-600">
              {categories.map((category) => {
                const to = category === 'All Electronics' ? '/products' : `/products?category=${encodeURIComponent(category)}`;
                const active = isCategoryActive(category);

                return (
                  <Link
                    key={category}
                    to={to}
                    className={`whitespace-nowrap rounded-full px-4 py-2 transition ${
                      active ? 'bg-accent text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}