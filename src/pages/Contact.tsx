import { useState, type FormEvent, type ChangeEvent } from "react";
import { useContent } from "@/lib/content";
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
  const { content } = useContent();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", course: "", message: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="gradient-hero py-20 text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.contact.hero.title || "Contact Us"}</h1>
            <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
              {content.contact.hero.subtitle || "Get in touch with us to start your learning journey"}
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
                            {content.contact.courseOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
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
                  {content.contact.cards.map((c, i) => {
                    const Icon = c.type === "address" ? MapPin : c.type === "phone" ? Phone : c.type === "email" ? Mail : Clock;
                    return (
                      <Card key={i} className="shadow-soft">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
                              <Icon className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold mb-2">{c.title}</h3>
                              <p className="text-muted-foreground">
                                {c.lines.map((line, li) => (
                                  <span key={li}>
                                    {line}
                                    {li < c.lines.length - 1 ? <><br /></> : null}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
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
                <p className="text-muted-foreground">{content.contact.mapNote || "Map would be embedded here"}</p>
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
