import { useState, type FormEvent, type ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
    times: {
      morning: false,
      afternoon: false,
      evening: false,
    },
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast({ title: "Request submitted", description: "We'll call you back shortly." });
    setForm({ firstName: "", lastName: "", workingPerson: "", phone: "", times: { morning: false, afternoon: false, evening: false } });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-w-[92vw] min-h-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a call back</DialogTitle>
          <DialogDescription>Fill in your details and pick a suitable time.</DialogDescription>
        </DialogHeader>
        <Card className="shadow-none border-0">
          <CardContent className="pt-2">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name *</Label>
                  <Input id="firstName" name="firstName" placeholder="First" value={form.firstName} onChange={onChange} required />
                </div>
                <div className="space-y-2">
                  <Label className="opacity-0">Last</Label>
                  <Input name="lastName" placeholder="Last" value={form.lastName} onChange={onChange} />
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
                <Input id="phone" name="phone" type="tel" placeholder="Enter your number" value={form.phone} onChange={onChange} required />
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
      </DialogContent>
    </Dialog>
  );
};

export default RequestCallbackDialog;
