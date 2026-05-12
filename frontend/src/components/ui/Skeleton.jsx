export function Skeleton({ className = '', variant = 'rect' }) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  const variants = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 p-0">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" className="w-1/3 h-3" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-2/3 h-3" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[520px] sm:h-[560px] lg:h-[600px] animate-pulse bg-gray-200">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300/60 via-gray-300/40 to-transparent" />
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="max-w-xl space-y-4">
          <Skeleton className="w-24 h-6 rounded-full" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-3/4 h-8" />
          <Skeleton className="w-48 h-12 mt-4" />
        </div>
      </div>
    </div>
  );
}

export function ReviewSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100">
      <Skeleton className="aspect-[16/9] w-full rounded-xl mb-4" />
      <Skeleton variant="text" className="w-full h-3 mb-2" />
      <Skeleton variant="text" className="w-2/3 h-3 mb-4" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4" variant="circle" />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10" variant="circle" />
        <div>
          <Skeleton variant="text" className="w-24 h-3" />
          <Skeleton variant="text" className="w-16 h-2 mt-1" />
        </div>
      </div>
    </div>
  );
}

export function SectionSkeleton({ count = 3, type = 'card' }) {
  const Component = type === 'review' ? ReviewSkeleton : CardSkeleton;
  return (
    <div className={`grid ${type === 'review' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-5`}>
      {[...Array(count)].map((_, i) => (
        <Component key={i} />
      ))}
    </div>
  );
}

export function StoreCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton variant="text" className="w-1/3 h-3" />
        <Skeleton variant="text" className="w-2/3 h-4" />
        <Skeleton variant="text" className="w-full h-3" />
        <Skeleton variant="text" className="w-1/2 h-3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="flex-1 h-10 rounded-xl" />
          <Skeleton className="flex-1 h-10 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <Skeleton className="aspect-[16/10] w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="w-16 h-5 rounded-full" />
        <Skeleton variant="text" className="w-full h-4" />
        <Skeleton variant="text" className="w-3/4 h-4" />
        <div className="flex items-center gap-2 pt-1">
          <Skeleton className="w-6 h-6 rounded-full" variant="circle" />
          <Skeleton variant="text" className="w-24 h-3" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-gray-100">
        <div
          className="h-full bg-navy"
          style={{ animation: 'pageProgress 2s ease-out forwards' }}
        />
      </div>
      <span className="text-2xl font-bold text-navy font-[family-name:var(--font-display)] select-none">
        FurnoTech
      </span>
      <div className="flex gap-1.5 mt-4">
        {[0, 150, 300].map((delay) => (
          <div
            key={delay}
            className="w-2 h-2 rounded-full bg-gold animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Skeleton;
