import { useState, type FormEvent, type ChangeEvent } from "react";
import { useContent } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const { content } = useContent();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    workingPerson: "",
    phone: "",
    area: "",
    times: { morning: false, afternoon: false, evening: false },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: "Request submitted", description: "We'll call you back shortly." });
    setForm({ firstName: "", lastName: "", workingPerson: "", phone: "", area: "", times: { morning: false, afternoon: false, evening: false } });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
                    <CardTitle>Request a call back</CardTitle>
                    <CardDescription>Fill in your details and pick a suitable time.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Name *</Label>
                          <Input id="firstName" name="firstName" placeholder="First" value={form.firstName} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                          <Label className="opacity-0">Last</Label>
                          <Input name="lastName" placeholder="Last" value={form.lastName} onChange={handleChange} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Dropdown</Label>
                        <Select value={form.workingPerson} onValueChange={(v) => setForm((f) => ({ ...f, workingPerson: v }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Working Person" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="working">Working Person</SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="homemaker">House Maker</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Number *</Label>
                        <Input id="phone" name="phone" type="tel" placeholder="Enter your number" value={form.phone} onChange={handleChange} required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area">Area of Residence/Work</Label>
                        <Input
                          id="area"
                          name="area"
                          placeholder="e.g., Ahmedabad"
                          value={form.area}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Preferable call time</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <label className="flex items-center space-x-2 border rounded-md p-3">
                            <Checkbox
                              checked={form.times.morning}
                              onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, morning: c === true } }))}
                            />
                            <span className="text-sm">Morning</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-3">
                            <Checkbox
                              checked={form.times.afternoon}
                              onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, afternoon: c === true } }))}
                            />
                            <span className="text-sm">Afternoon</span>
                          </label>
                          <label className="flex items-center space-x-2 border rounded-md p-3">
                            <Checkbox
                              checked={form.times.evening}
                              onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, evening: c === true } }))}
                            />
                            <span className="text-sm">Evening</span>
                          </label>
                        </div>
                      </div>

                      <Button type="submit" className="w-full gradient-accent">Submit</Button>
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
