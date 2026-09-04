const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error?.message || 'Request failed');
  }

  return payload;
}

export function getProducts(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`/products${query}`);
}

export function getProductBySlug(slug) {
  return request(`/products/${slug}`);
}

export function getVariant(slug, variantId) {
  return request(`/products/${slug}/variants/${variantId}`);
}

export function selectEmiPlan(variantId, emiPlanId) {
  return request('/plan-selections', {
    method: 'POST',
    body: JSON.stringify({ variantId, emiPlanId }),
  });
}