import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItemType[];
  className?: string;
  variant?: 'default' | 'hero' | 'minimal';
}

const PageBreadcrumb = ({ items, className = '', variant = 'default' }: PageBreadcrumbProps) => {
  const isHero = variant === 'hero';
  const isMinimal = variant === 'minimal';

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn(
        'relative',
        !isMinimal && 'py-2',
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {/* Home */}
        <li>
          <Link 
            to="/" 
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all',
              isHero 
                ? 'text-white/80 hover:text-white hover:bg-white/10' 
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <Home className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight className={cn(
                'w-4 h-4',
                isHero ? 'text-white/40' : 'text-border'
              )} />
              
              {isLast || !item.href ? (
                <span 
                  className={cn(
                    'inline-flex items-center px-3 py-1.5 rounded-lg font-medium truncate max-w-[200px]',
                    isHero 
                      ? 'bg-white/20 text-white backdrop-blur-sm' 
                      : 'bg-primary/10 text-primary'
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link 
                  to={item.href} 
                  className={cn(
                    'inline-flex items-center px-2.5 py-1.5 rounded-lg transition-all',
                    isHero 
                      ? 'text-white/80 hover:text-white hover:bg-white/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
