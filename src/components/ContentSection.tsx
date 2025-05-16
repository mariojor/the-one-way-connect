
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
}

interface ContentSectionProps {
  title: string;
  description?: string;
  items: ContentItem[];
  viewAllLink: string;
}

const ContentSection = ({ title, description, items, viewAllLink }: ContentSectionProps) => {
  return (
    <section className="py-12 bg-one-way-gray-light">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="section-title">{title}</h2>
            {description && <p className="text-gray-600 mt-2 max-w-2xl">{description}</p>}
          </div>
          <Link to={viewAllLink} className="text-one-way-blue hover:text-one-way-blue/80 font-medium flex items-center">
            Ver todos <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="content-card">
              {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link to={item.link}>
                  <Button variant="link" className="p-0 text-one-way-blue hover:text-one-way-blue/80">
                    Ler mais <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
