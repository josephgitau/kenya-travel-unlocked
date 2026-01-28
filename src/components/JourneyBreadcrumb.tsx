import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, MapPin, Package, Compass, HelpCircle } from 'lucide-react';
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
}

const iconForPath = (path: string): React.ElementType => {
  if (path.includes('destination')) return MapPin;
  if (path.includes('package')) return Package;
  if (path.includes('experience')) return Compass;
  if (path.includes('quiz')) return HelpCircle;
  return ChevronRight;
};

const JourneyBreadcrumb = ({ items, siblings, className }: JourneyBreadcrumbProps) => {
  const location = useLocation();
  const CurrentIcon = iconForPath(location.pathname);

  return (
    <div className={cn('bg-card border-b border-border', className)}>
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            {/* Home */}
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only">Home</span>
              </Link>
            </li>

            {/* Items */}
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const ItemIcon = item.icon || CurrentIcon;

              return (
                <li key={item.label} className="flex items-center gap-2">
                  {/* Separator */}
                  <ChevronRight className="w-4 h-4 text-border" />
                  
                  {isLast ? (
                    // Current page - highlighted
                    <span className="flex items-center gap-1.5 bg-primary/10 text-primary font-medium px-3 py-1 rounded-full">
                      <ItemIcon className="w-4 h-4" />
                      <span className="truncate max-w-[200px]">{item.label}</span>
                    </span>
                  ) : (
                    // Link
                    <Link
                      to={item.href || '#'}
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ItemIcon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Sibling Links */}
          {siblings && siblings.length > 0 && (
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">Also explore:</span>
              <div className="flex flex-wrap gap-2">
                {siblings.slice(0, 4).map((sibling) => (
                  <Link
                    key={sibling.href}
                    to={sibling.href}
                    className="text-xs bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full transition-colors"
                  >
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
