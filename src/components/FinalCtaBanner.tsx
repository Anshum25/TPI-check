import { useState } from "react";
import { Button } from "@/components/ui/button";
import RequestCallbackDialog from "@/components/RequestCallbackDialog";
import { useContent, DEFAULT_CONTENT } from "@/lib/content";

const FinalCtaBanner = () => {
  const { content } = useContent();
  const admissions = content.admissions ?? DEFAULT_CONTENT.admissions;
  const cta = admissions.cta;
  const [isCallbackDialogOpen, setIsCallbackDialogOpen] = useState(false);

  const handleCallNow = () => {
    if (!cta.phoneNumber) return;
    window.location.href = `tel:${cta.phoneNumber}`;
  };

  const handleGetDirection = () => {
    if (!cta.directionsUrl) return;
    window.open(cta.directionsUrl, "_blank", "noopener,noreferrer");
  };

  const handleRequestCallback = () => {
    setIsCallbackDialogOpen(true);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{cta.title}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">{cta.subtitle}</p>
        <p className="text-sm text-muted-foreground mb-6">{cta.tagline}</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            className="min-w-[140px] sm:min-w-[160px] gradient-accent"
            onClick={handleCallNow}
          >
            {cta.phoneLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[140px] sm:min-w-[160px] border-border text-foreground hover:bg-accent hover:text-white hover:border-accent"
            onClick={handleGetDirection}
          >
            {cta.directionsLabel}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[140px] sm:min-w-[160px] border-border text-foreground hover:bg-accent hover:text-white hover:border-accent"
            onClick={handleRequestCallback}
          >
            {cta.callbackLabel}
          </Button>
        </div>
      </div>
      <RequestCallbackDialog
        open={isCallbackDialogOpen}
        onOpenChange={setIsCallbackDialogOpen}
      />
    </>
  );
};

export default FinalCtaBanner;
