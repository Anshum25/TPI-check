import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", course: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              Get in touch with us to start your learning journey
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle>Enquiry Form</CardTitle>
                    <CardDescription>
                      Fill out the form and we'll respond within 24 hours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="course">Interested Course</Label>
                        <Select
                          value={formData.course}
                          onValueChange={(value) => setFormData({ ...formData, course: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spoken-english">Spoken English</SelectItem>
                            <SelectItem value="personality-development">Personality Development</SelectItem>
                            <SelectItem value="business-communication">Business Communication</SelectItem>
                            <SelectItem value="interview-prep">Interview Preparation</SelectItem>
                            <SelectItem value="public-speaking">Public Speaking</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your requirements..."
                          rows={4}
                        />
                      </div>

                      <Button type="submit" className="w-full gradient-accent">
                        Submit Enquiry
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-6">
                  <Card className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Address</h3>
                          <p className="text-muted-foreground">
                            123 Education Street<br />
                            Learning District<br />
                            City - 380001
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Phone</h3>
                          <p className="text-muted-foreground">
                            +91 98765 43210<br />
                            +91 98765 43211
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Email</h3>
                          <p className="text-muted-foreground">
                            info@excellence.edu<br />
                            admissions@excellence.edu
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">Office Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 8:00 PM<br />
                            Saturday: 9:00 AM - 6:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Find Us</h2>
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map would be embedded here</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
