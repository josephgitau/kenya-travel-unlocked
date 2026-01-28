import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, MapPin, Package, Compass, HelpCircle, Calendar, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface JourneyBreadcrumbProps {
  items: BreadcrumbItem[];
  siblings?: { label: string; href: string }[];
  className?: string;
  variant?: 'bar' | 'inline' | 'floating';
}

const iconForPath = (path: string): React.ElementType => {
  if (path.includes('destination')) return MapPin;
  if (path.includes('package')) return Package;
  if (path.includes('experience')) return Compass;
  if (path.includes('quiz')) return HelpCircle;
  if (path.includes('calendar')) return Calendar;
  if (path.includes('quote')) return Calculator;
  return ChevronRight;
};

const JourneyBreadcrumb = ({ items, siblings, className, variant = 'bar' }: JourneyBreadcrumbProps) => {
  const location = useLocation();
  const CurrentIcon = iconForPath(location.pathname);

  const isFloating = variant === 'floating';
  const isInline = variant === 'inline';

  return (
    <div 
      className={cn(
        'transition-all',
        isFloating && 'absolute top-4 left-4 right-4 z-10',
        !isInline && !isFloating && 'bg-gradient-to-r from-card via-card to-muted/30 border-b border-border shadow-sm',
        className
      )}
    >
      <div className={cn(
        !isInline && !isFloating && 'container mx-auto px-4 lg:px-8 py-3'
      )}>
        <nav aria-label="Breadcrumb">
          <ol className={cn(
            'flex flex-wrap items-center gap-1 text-sm',
            isFloating && 'bg-card/90 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-border'
          )}>
            {/* Home with icon */}
            <li>
              <Link 
                to="/" 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only font-medium">Home</span>
              </Link>
            </li>

            {/* Breadcrumb Items */}
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const ItemIcon = item.icon || (isLast ? CurrentIcon : ChevronRight);

              return (
                <li key={item.label} className="flex items-center gap-1">
                  {/* Golden Connector */}
                  <div className="flex items-center">
                    <div className="w-4 h-[2px] bg-gradient-to-r from-primary/20 to-primary/40 rounded-full" />
                    <ChevronRight className="w-4 h-4 text-primary/60" />
                  </div>
                  
                  {isLast ? (
                    // Current page - highlighted pill
                    <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold px-4 py-1.5 rounded-xl shadow-sm">
                      <ItemIcon className="w-4 h-4" />
                      <span className="truncate max-w-[180px] sm:max-w-[250px]">{item.label}</span>
                    </span>
                  ) : (
                    // Link
                    <Link
                      to={item.href || '#'}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <ItemIcon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Sibling Links - Quick Navigation */}
          {siblings && siblings.length > 0 && (
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Also explore:</span>
              <div className="flex flex-wrap gap-2">
                {siblings.slice(0, 4).map((sibling) => (
                  <Link
                    key={sibling.href}
                    to={sibling.href}
                    className="inline-flex items-center gap-1.5 text-xs bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary px-3 py-1.5 rounded-full transition-all"
                  >
                    <MapPin className="w-3 h-3" />
                    {sibling.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default JourneyBreadcrumb;
