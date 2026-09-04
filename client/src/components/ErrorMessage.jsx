export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="card-shell border-rose-200 bg-rose-50 p-6 text-center">
      <p className="text-lg font-semibold text-rose-700">{message}</p>
      {onRetry ? (
        <button type="button" className="btn-primary mt-4" onClick={onRetry}>
          Try Again
        </button>
      ) : null}
    </div>
  );
}