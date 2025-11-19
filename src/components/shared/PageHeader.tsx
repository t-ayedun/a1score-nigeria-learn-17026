import { Badge } from "@/components/ui/badge";
import { ChevronRight, Home } from "lucide-react";

interface Breadcrumb {
  label: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

const PageHeader = ({
  title,
  description,
  breadcrumbs,
  badge,
  badgeVariant = "secondary"
}: PageHeaderProps) => {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3 flex-wrap">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="hover:text-foreground transition-colors min-h-[44px] flex items-center"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-foreground font-medium min-h-[44px] flex items-center">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      {/* Title and Badge */}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
        {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm sm:text-base text-gray-600 mt-2">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
