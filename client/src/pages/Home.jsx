import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['All Electronics', 'Smartphones', 'Laptops', 'Tablets', 'TVs', 'Audio'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Electronics');

  async function loadProducts(nextCategory = selectedCategory) {
    try {
      setLoading(true);
      setError('');
      const response = await getProducts(nextCategory === 'All Electronics' ? undefined : nextCategory);
      setProducts(response.data);
    } catch (fetchError) {
      setError('Unable to load product details.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    loadProducts(category);
  }

  return (
    <div className="container-shell py-8 sm:py-12">
      <section className="card-shell relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
        <div className="absolute inset-0 bg-hero-grid bg-[length:24px_24px] opacity-30" />
        <div className="relative max-w-3xl">
          <p className="inline-flex rounded-full bg-accentSoft px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Demo EMI Marketplace
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-6xl">
            Shop electronics with database-driven EMI plans.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Browse premium electronics, switch variants, compare monthly payments, and submit a selected EMI plan without leaving the catalog.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">
              Shop Smartphones
            </Link>
            <a href="#catalog" className="btn-secondary">
              View Catalog
            </a>
          </div>
        </div>
      </section>

      <section id="catalog" className="mt-12 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Featured products</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Shop Electronics</h2>
          </div>
        </div>

        <nav aria-label="Electronics categories" className="rounded-3xl border border-slate-200 bg-white p-3 shadow-soft">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-accent ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </nav>

        {loading ? <LoadingSkeleton type="grid" /> : null}
        {!loading && error ? <ErrorMessage message={error} onRetry={loadProducts} /> : null}
        {!loading && !error ? <ProductGrid products={products} /> : null}
      </section>
    </div>
  );
}