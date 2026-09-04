import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ProductGallery from '../components/ProductGallery';
import ProductDetails from '../components/ProductDetails';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorMessage from '../components/ErrorMessage';
import { getProductBySlug, getVariant, selectEmiPlan } from '../services/api';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);
  const [selectionResult, setSelectionResult] = useState(null);
  const [selectionError, setSelectionError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProduct() {
    try {
      setLoading(true);
      setError('');
      setSelectionResult(null);
      setSelectionError('');
      const response = await getProductBySlug(slug);
      const productData = response.data;
      setProduct(productData);
      setSelectedVariant(productData.variants[0] || null);
      setSelectedEmiPlan(productData.variants[0]?.emiPlans?.[0] || null);
    } catch (fetchError) {
      setError('Unable to load product details.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (!selectedVariant || !selectedVariant.emiPlans?.length) {
      return;
    }

    if (!selectedEmiPlan || String(selectedEmiPlan.variantId) !== String(selectedVariant._id)) {
      setSelectedEmiPlan(selectedVariant.emiPlans[0]);
    }
  }, [selectedVariant, selectedEmiPlan]);

  const thumbnails = useMemo(() => {
    if (!product?.variants?.length) {
      return [];
    }

    return product.variants.map((variant) => variant.imageUrl).filter(Boolean);
  }, [product]);

  async function handleSelectVariant(nextVariant) {
    try {
      const response = await getVariant(slug, nextVariant._id);
      setSelectedVariant(response.data);
      setSelectedEmiPlan(response.data.emiPlans?.[0] || null);
      setSelectionResult(null);
      setSelectionError('');
    } catch (variantError) {
      setError('Unable to load product details.');
    }
  }

  function handleSelectImage(imageUrl) {
    const matchedVariant = product?.variants?.find((variant) => variant.imageUrl === imageUrl);
    if (matchedVariant) {
      handleSelectVariant(matchedVariant);
    }
  }

  async function handleProceed() {
    if (!selectedVariant || !selectedEmiPlan) {
      return;
    }

    try {
      const response = await selectEmiPlan(selectedVariant._id, selectedEmiPlan._id);
      setSelectionError('');
      setSelectionResult({
        selectionId: response.data.selectionId,
        monthlyAmountDisplay: currencyFormatter.format(selectedEmiPlan.monthlyAmount),
        tenureMonths: selectedEmiPlan.tenureMonths,
        interestRate: selectedEmiPlan.interestRate,
        cashbackDisplay: currencyFormatter.format(selectedEmiPlan.cashbackAmount),
      });
    } catch (selectionError) {
      setSelectionError(selectionError.message || 'Unable to select EMI plan.');
    }
  }

  if (loading) {
    return (
      <div className="container-shell py-8 sm:py-12">
        <LoadingSkeleton />
      </div>
    );
  }

  if (error || !product || !selectedVariant) {
    return (
      <div className="container-shell py-8 sm:py-12">
        <ErrorMessage message={error || 'Unable to load product details.'} onRetry={loadProduct} />
      </div>
    );
  }

  return (
    <div className="container-shell py-8 sm:py-12">
      <div className="mb-6 flex flex-col gap-4">
        <Breadcrumb productName={product.name} />
        <button type="button" onClick={() => navigate('/products')} className="w-fit text-sm font-medium text-accent hover:underline">
          Back to products
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <ProductGallery
          selectedImage={selectedVariant.imageUrl}
          thumbnails={thumbnails}
          alt={`${product.brand} ${product.name}`}
          onSelectImage={handleSelectImage}
        />

        <ProductDetails
          product={product}
          selectedVariant={selectedVariant}
          selectedEmiPlan={selectedEmiPlan}
          onSelectVariant={handleSelectVariant}
          onSelectEmiPlan={setSelectedEmiPlan}
          onProceed={handleProceed}
          selectionResult={selectionResult}
          selectionError={selectionError}
        />
      </div>
    </div>
  );
}