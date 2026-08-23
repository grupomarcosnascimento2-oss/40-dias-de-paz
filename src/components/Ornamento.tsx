export function Cruz({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M10.6 2h2.8v5.4H19v2.8h-5.6V22h-2.8V10.2H5V7.4h5.6V2z" />
    </svg>
  );
}

export function Ornamento({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="gold-rule w-16 sm:w-28" />
      <Cruz className="h-3.5 w-3.5 text-accent" />
      <span className="gold-rule w-16 sm:w-28" />
    </div>
  );
}
