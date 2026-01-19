import { useState, type FormEvent, type ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { emailAPI } from "@/lib/api";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RequestCallbackDialog = ({ open, onOpenChange }: Props) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    workingPerson: "",
    phone: "",
    area: "",
    times: {
      morning: false,
      afternoon: false,
      evening: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailAPI.sendCallbackRequest({
        firstName: form.firstName,
        lastName: form.lastName,
        workingPerson: form.workingPerson,
        phone: form.phone,
        area: form.area,
        times: form.times,
      });
      
      toast({ 
        title: "Request submitted", 
        description: "We'll call you back shortly." 
      });
      setForm({ 
        firstName: "", 
        lastName: "", 
        workingPerson: "", 
        phone: "", 
        area: "", 
        times: { morning: false, afternoon: false, evening: false } 
      });
      onOpenChange(false);
    } catch (error: any) {
      console.error("Failed to send callback request:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-w-[92vw] sm:min-h-[520px] max-h-[calc(100svh-2rem)] sm:max-h-none overflow-hidden p-4 sm:p-6 top-4 translate-y-0 sm:top-[50%] sm:translate-y-[-50%]">
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">Request a call back</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">Fill in your details and pick a suitable time.</DialogDescription>
        </DialogHeader>
        <Card className="shadow-none border-0">
          <CardContent className="pt-2">
            <form onSubmit={onSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs sm:text-sm" htmlFor="firstName">Name *</Label>
                  <Input className="h-9 text-sm" id="firstName" name="firstName" placeholder="First" value={form.firstName} onChange={onChange} required />
                </div>
                <div className="space-y-1">
                  <Label className="sr-only sm:not-sr-only sm:opacity-0 text-xs sm:text-sm" htmlFor="lastName">Last</Label>
                  <Input className="h-9 text-sm" id="lastName" name="lastName" placeholder="Last" value={form.lastName} onChange={onChange} />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs sm:text-sm">Dropdown</Label>
                <Select value={form.workingPerson} onValueChange={(v) => setForm((f) => ({ ...f, workingPerson: v }))}>
                  <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Working Person" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="working">Working Person</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="homemaker">House Maker</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs sm:text-sm" htmlFor="phone">Contact Number *</Label>
                <Input className="h-9 text-sm" id="phone" name="phone" type="tel" placeholder="Enter your number" value={form.phone} onChange={onChange} required />
              </div>

              <div className="space-y-1">
                <Label className="text-xs sm:text-sm" htmlFor="area">Area of Residence/Work</Label>
                <Input
                  className="h-9 text-sm"
                  id="area"
                  name="area"
                  placeholder="e.g., Ahmedabad"
                  value={form.area}
                  onChange={onChange}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs sm:text-sm">Preferable call time</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={form.times.morning}
                      onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, morning: c === true } }))}
                    />
                    <span className="text-xs sm:text-sm">Morning</span>
                  </label>
                  <label className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={form.times.afternoon}
                      onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, afternoon: c === true } }))}
                    />
                    <span className="text-xs sm:text-sm">Afternoon</span>
                  </label>
                  <label className="col-span-2 sm:col-span-1 flex items-center space-x-2 border rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Checkbox
                      checked={form.times.evening}
                      onCheckedChange={(c) => setForm((f) => ({ ...f, times: { ...f.times, evening: c === true } }))}
                    />
                    <span className="text-xs sm:text-sm">Evening</span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full gradient-accent" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default RequestCallbackDialog;
