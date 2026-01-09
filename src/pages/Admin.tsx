import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBookings, useUpdateBookingStatus, useAdminStats, useReviews, useApproveReview } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Package, Calendar, Users, DollarSign, LogOut, Home, Star, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PackageManagement from '@/components/admin/PackageManagement';

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: reviews, isLoading: reviewsLoading } = useReviews();
  const updateStatus = useUpdateBookingStatus();
  const approveReview = useApproveReview();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [authLoading, user, navigate]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast({
        title: 'Status updated',
        description: `Booking status changed to ${status}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const handleApproveReview = async (id: string, approve: boolean) => {
    try {
      await approveReview.mutateAsync({ id, is_approved: approve });
      toast({
        title: approve ? 'Review approved' : 'Review rejected',
        description: approve ? 'Review is now visible on the site' : 'Review has been hidden',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update review',
        variant: 'destructive',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || bookingsLoading || statsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  const pendingReviews = reviews?.filter(r => !r.is_approved) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Dashboard</h1>
            {isAdmin && <Badge variant="secondary">Admin</Badge>}
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                View Site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalBookings || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{stats?.pendingBookings || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Packages</p>
                <p className="text-2xl font-bold text-foreground">{stats?.totalPackages || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(stats?.totalRevenue || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview" className="gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="packages" className="gap-2">
              <Package className="h-4 w-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews
              {pendingReviews.length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                  {pendingReviews.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="overview">
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold text-foreground">Recent Bookings</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Guest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Package
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Travel Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Guests
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookings?.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-foreground">{booking.full_name}</p>
                            <p className="text-sm text-muted-foreground">{booking.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">{booking.package_name}</td>
                        <td className="px-6 py-4 text-foreground">
                          {format(new Date(booking.travel_date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 text-foreground">{booking.guests}</td>
                        <td className="px-6 py-4 text-foreground">
                          {booking.total_price ? `$${booking.total_price.toLocaleString()}` : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={statusColors[booking.status || 'pending']}>
                            {booking.status || 'pending'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:bg-green-50"
                                  onClick={() => handleStatusChange(booking.id, 'confirmed')}
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() => handleStatusChange(booking.id, 'cancelled')}
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-600 hover:bg-blue-50"
                                onClick={() => handleStatusChange(booking.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!bookings || bookings.length === 0) && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                          No bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages">
            <PackageManagement />
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="bg-card rounded-xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-display font-bold text-foreground">Customer Reviews</h2>
              </div>

              <div className="divide-y divide-border">
                {reviews?.map((review) => (
                  <div key={review.id} className="p-6 hover:bg-muted/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-medium text-foreground">{review.customer_name}</p>
                          {review.customer_location && (
                            <span className="text-sm text-muted-foreground">{review.customer_location}</span>
                          )}
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <Badge className={review.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {review.is_approved ? 'Approved' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(review.created_at || ''), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {!review.is_approved ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:bg-green-50"
                            onClick={() => handleApproveReview(review.id, true)}
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleApproveReview(review.id, false)}
                          >
                            Hide
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {(!reviews || reviews.length === 0) && (
                  <div className="px-6 py-12 text-center text-muted-foreground">
                    No reviews yet
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
