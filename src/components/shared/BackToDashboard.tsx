import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface BackToDashboardProps {
  onClick: () => void;
  label?: string;
  variant?: "default" | "outline" | "ghost";
  showIcon?: boolean;
  className?: string;
}

const BackToDashboard = ({
  onClick,
  label = "Back to Dashboard",
  variant = "outline",
  showIcon = true,
  className = ""
}: BackToDashboardProps) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`mb-4 ${className}`}
    >
      {showIcon && <ArrowLeft className="h-4 w-4 mr-2" />}
      {label}
    </Button>
  );
};

export default BackToDashboard;
