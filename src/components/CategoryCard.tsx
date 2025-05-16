
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  className?: string;
}

const CategoryCard = ({ title, description, icon: Icon, link, className }: CategoryCardProps) => {
  return (
    <Link to={link}>
      <Card className={`hover:shadow-md transition-all hover:border-one-way-blue ${className}`}>
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-one-way-blue-light flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-one-way-blue" />
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
