import { Users, Tent, Crown, UsersRound, User } from 'lucide-react';
import { useFilters, ResidentType, BudgetType, TripType } from '@/contexts/FilterContext';

const FilterBar = () => {
  const { residentType, setResidentType, budgetType, setBudgetType, tripType, setTripType } = useFilters();

  const budgetOptions: { id: BudgetType; label: string; icon: typeof Tent }[] = [
    { id: 'budget', label: 'Budget', icon: Tent },
    { id: 'mid-range', label: 'Mid-Range', icon: Users },
    { id: 'luxury', label: 'Luxury', icon: Crown },
  ];

  return (
    <section className="relative z-20 -mt-20 lg:-mt-12 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-card rounded-3xl shadow-elevated p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center justify-between">
            {/* Resident Toggle */}
            <div className="w-full lg:w-auto">
              <p className="text-sm font-medium text-muted-foreground mb-3">Pricing for:</p>
              <div className="flex gap-2 bg-muted rounded-full p-1">
                <button
                  onClick={() => setResidentType('resident')}
                  className={`filter-toggle ${residentType === 'resident' ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Kenyan Resident
                  </span>
                </button>
                <button
                  onClick={() => setResidentType('non-resident')}
                  className={`filter-toggle ${residentType === 'non-resident' ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <UsersRound className="w-4 h-4" />
                    Non-Resident
                  </span>
                </button>
              </div>
            </div>

            {/* Budget Filter */}
            <div className="w-full lg:w-auto">
              <p className="text-sm font-medium text-muted-foreground mb-3">Budget:</p>
              <div className="flex gap-2 bg-muted rounded-full p-1">
                {budgetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setBudgetType(option.id)}
                    className={`filter-toggle ${budgetType === option.id ? 'active' : ''}`}
                  >
                    <span className="flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type */}
            <div className="w-full lg:w-auto">
              <p className="text-sm font-medium text-muted-foreground mb-3">Trip Type:</p>
              <div className="flex gap-2 bg-muted rounded-full p-1">
                <button
                  onClick={() => setTripType('group')}
                  className={`filter-toggle ${tripType === 'group' ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Group Joining
                  </span>
                </button>
                <button
                  onClick={() => setTripType('private')}
                  className={`filter-toggle ${tripType === 'private' ? 'active' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Private Safari
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-foreground font-semibold">{budgetType}</span> packages for{' '}
              <span className="text-foreground font-semibold">{residentType === 'resident' ? 'Kenyan residents' : 'international visitors'}</span>{' '}
              as a <span className="text-foreground font-semibold">{tripType === 'group' ? 'group joining' : 'private'}</span> safari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
