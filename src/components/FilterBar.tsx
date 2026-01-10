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
    <section className="relative z-20 -mt-16 sm:-mt-20 lg:-mt-12 pb-8 sm:pb-12 lg:pb-16">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-elevated p-4 sm:p-6 lg:p-8">
          {/* Filters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Resident Toggle */}
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Pricing for:</p>
              <div className="flex bg-muted rounded-lg sm:rounded-full p-1 overflow-hidden">
                <button
                  onClick={() => setResidentType('resident')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    residentType === 'resident'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Resident</span>
                </button>
                <button
                  onClick={() => setResidentType('non-resident')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    residentType === 'non-resident'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <UsersRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Non-Resident</span>
                </button>
              </div>
            </div>

            {/* Budget Filter */}
            <div>
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Budget:</p>
              <div className="flex bg-muted rounded-lg sm:rounded-full p-1 overflow-hidden">
                {budgetOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setBudgetType(option.id)}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                      budgetType === option.id
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <option.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 hidden xs:block" />
                    <span className="truncate">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type */}
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">Trip Type:</p>
              <div className="flex bg-muted rounded-lg sm:rounded-full p-1 overflow-hidden max-w-md lg:max-w-none mx-auto lg:mx-0">
                <button
                  onClick={() => setTripType('group')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    tripType === 'group'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Group</span>
                </button>
                <button
                  onClick={() => setTripType('private')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-md sm:rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    tripType === 'private'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Private</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Summary */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
            <p className="text-xs sm:text-sm text-muted-foreground text-center lg:text-left">
              Showing <span className="text-foreground font-semibold capitalize">{budgetType}</span> packages for{' '}
              <span className="text-foreground font-semibold">{residentType === 'resident' ? 'Kenyan residents' : 'international visitors'}</span>{' '}
              as a <span className="text-foreground font-semibold">{tripType === 'group' ? 'group' : 'private'}</span> safari
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
