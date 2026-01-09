import { useState } from 'react';
import { Star, Loader2, MapPin, Quote } from 'lucide-react';
import { usePackageReviews, useCreateReview } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ReviewsSectionProps {
  packageId: string;
  packageName: string;
}

const StarRating = ({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) => {
  const [hover, setHover] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hover || rating)
                ? 'text-primary fill-primary'
                : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewsSection = ({ packageId, packageName }: ReviewsSectionProps) => {
  const { data: reviews, isLoading } = usePackageReviews(packageId);
  const createReview = useCreateReview();
  const { toast } = useToast();
  
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !comment.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in your name and review.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createReview.mutateAsync({
        package_id: packageId,
        customer_name: name.trim(),
        customer_location: location.trim() || undefined,
        rating,
        comment: comment.trim(),
      });
      
      toast({
        title: 'Review submitted!',
        description: 'Thank you! Your review will appear after approval.',
      });
      
      setShowForm(false);
      setName('');
      setLocation('');
      setRating(5);
      setComment('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const averageRating = reviews && reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">Guest Reviews</h2>
            {averageRating && reviews && (
              <div className="flex items-center gap-3 mt-2">
                <StarRating rating={Math.round(parseFloat(averageRating))} />
                <span className="text-lg font-semibold text-foreground">{averageRating}</span>
                <span className="text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            )}
          </div>
          
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="btn-gold">
              Write a Review
            </Button>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-card rounded-2xl p-6 mb-10 shadow-card">
            <h3 className="text-xl font-display font-semibold text-foreground mb-6">
              Share your experience at {packageName}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="reviewer-name">Your Name *</Label>
                  <Input
                    id="reviewer-name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reviewer-location">Your Location (optional)</Label>
                  <Input
                    id="reviewer-location"
                    placeholder="New York, USA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Your Rating *</Label>
                <StarRating rating={rating} onRate={setRating} interactive />
              </div>

              <div className="space-y-2">
                <Label htmlFor="review-comment">Your Review *</Label>
                <Textarea
                  id="review-comment"
                  placeholder="Tell us about your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  maxLength={1000}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-gold" disabled={createReview.isPending}>
                  {createReview.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card rounded-2xl p-6 shadow-card">
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                
                <p className="text-foreground mb-6 line-clamp-4">{review.comment}</p>
                
                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={review.rating} />
                </div>
                
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{review.customer_name}</p>
                  {review.customer_location && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {review.customer_location}
                    </p>
                  )}
                  {review.created_at && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(review.created_at), 'MMMM yyyy')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-card rounded-2xl">
            <p className="text-muted-foreground mb-4">No reviews yet. Be the first to share your experience!</p>
            {!showForm && (
              <Button onClick={() => setShowForm(true)} variant="outline">
                Write the First Review
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
