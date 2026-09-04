import { Link } from 'react-router-dom';

export default function Breadcrumb({ productName }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="transition hover:text-slate-900">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to="/products" className="transition hover:text-slate-900">
            Smartphones
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="truncate font-medium text-slate-700">
          {productName}
        </li>
      </ol>
    </nav>
  );
}