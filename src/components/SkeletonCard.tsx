import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardProps {
  featured?: boolean;
  variant?: 'destination' | 'experience' | 'destination-guide';
}

export const SkeletonCard = ({ featured = false, variant = 'destination' }: SkeletonCardProps) => {
  if (variant === 'destination-guide') {
    return (
      <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border">
        <Skeleton className="h-56 w-full" />
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'experience') {
    return (
      <div className="bg-card rounded-3xl overflow-hidden shadow-card border border-border">
        <Skeleton className="aspect-[4/3] w-full" />
        <div className="p-6 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className={`destination-card ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-card border border-border">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Price Tag Skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        {/* Featured Badge Skeleton */}
        {featured && (
          <div className="absolute top-4 left-4">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        )}
        
        {/* Content Skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
          <Skeleton className="h-4 w-24 bg-white/20" />
          <Skeleton className="h-8 w-48 bg-white/20" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-12 bg-white/20" />
              <Skeleton className="h-4 w-16 bg-white/20" />
            </div>
            <Skeleton className="w-10 h-10 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonCardGrid = ({ count = 6, variant = 'destination' }: { count?: number; variant?: 'destination' | 'experience' | 'destination-guide' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} featured={variant === 'destination' && index === 0} variant={variant} />
      ))}
    </>
  );
};

export default SkeletonCard;
