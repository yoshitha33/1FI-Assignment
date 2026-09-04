const rawApiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = rawApiBaseUrl.endsWith('/api')
  ? rawApiBaseUrl
  : `${rawApiBaseUrl.replace(/\/$/, '')}/api`;

function normalizeCategory(category) {
  if (!category) {
    return '';
  }

  if (typeof category === 'string') {
    return category;
  }

  if (typeof category === 'object') {
    return category.value || category.label || category.name || '';
  }

  return String(category);
}

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
  const normalizedCategory = normalizeCategory(category);
  const query = normalizedCategory ? `?category=${encodeURIComponent(normalizedCategory)}` : '';
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