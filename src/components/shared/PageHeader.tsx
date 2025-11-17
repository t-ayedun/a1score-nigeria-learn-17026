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
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {crumb.onClick ? (
                <button
                  onClick={crumb.onClick}
                  className="hover:text-foreground transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-foreground font-medium">{crumb.label}</span>
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
