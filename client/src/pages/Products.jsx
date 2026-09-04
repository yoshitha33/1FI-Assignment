import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductGrid from '../components/ProductGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['All Electronics', 'Smartphones', 'Laptops', 'Tablets', 'TVs', 'Audio'];

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
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
    const searchParams = new URLSearchParams(location.search);
    const categoryFromUrl = searchParams.get('category') || 'All Electronics';
    setSelectedCategory(categoryFromUrl);
    loadProducts(categoryFromUrl);
  }, [location.search]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    if (category === 'All Electronics') {
      navigate('/products');
      return;
    }

    navigate(`/products?category=${encodeURIComponent(category)}`);
  }

  return (
    <div className="container-shell py-8 sm:py-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">All Electronics</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Explore every product loaded from MongoDB and open a detail page to switch variants and EMI plans.
        </p>
      </div>

      <nav aria-label="Electronics categories" className="mb-8 rounded-3xl border border-slate-200 bg-white p-3 shadow-soft">
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
    </div>
  );
}