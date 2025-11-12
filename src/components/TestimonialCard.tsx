import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const TestimonialCard = ({ name, role, content, rating }: TestimonialCardProps) => {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "fill-accent text-accent" : "text-muted"
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{content}"</p>
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
