import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: string;
  level: string;
  icon: React.ReactNode;
}

const CourseCard = ({ title, description, duration, students, level, icon }: CourseCardProps) => {
  return (
    <Card className="shadow-soft hover:shadow-medium transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="mb-4 h-12 w-12 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{students}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gradient-accent">Learn More</Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
