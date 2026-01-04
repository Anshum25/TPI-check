import { useRef, useEffect } from "react";
import type { AdminSection } from "@/pages/Admin";

interface SiteContentManagerProps {
  selectedSection: AdminSection;
  onEditAction: () => void;
  onResetContent: () => void;
  onExport: () => void;
  renderSectionContent: () => React.ReactNode;
}

const SiteContentManager = ({
  selectedSection,
  onEditAction,
  onResetContent,
  onExport,
  renderSectionContent,
}: SiteContentManagerProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // Hide webkit scrollbar
  useEffect(() => {
    if (contentRef.current) {
      const style = document.createElement('style');
      style.textContent = `
        .content-manager-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `;
      document.head.appendChild(style);
      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden h-full min-w-0 flex-shrink-0">

      {/* <section className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 flex-shrink-0">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{selectedSection.label}</p>
          <p className="text-sm text-muted-foreground">{selectedSection.description}</p>
        </div>
        <Button
          className="flex items-center gap-2"
          variant={selectedSection.type === "static" ? "outline" : "default"}
          type="button"
          onClick={onEditAction}
        >
          {selectedSection.type === "static" ? <ExternalLink className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
          {selectedSection.type === "static" ? "Open Page" : "Edit Content"}
        </Button>
      </section> */}

      <div 
        ref={contentRef} 
        className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-4 py-6 content-manager-hide-scrollbar"
        style={{ 
          height: 0, // Force flex-1 to work properly
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default SiteContentManager;

