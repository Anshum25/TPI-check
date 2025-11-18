import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, PenLine, ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
    <div className="flex-1 flex flex-col border-r overflow-hidden h-full min-w-0 flex-shrink-0">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4 flex-shrink-0">
        <div className="flex flex-1 flex-wrap items-center gap-4">
          <SidebarTrigger className="md:hidden" />
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Admin Panel</p>
            <h1 className="text-2xl font-bold tracking-tight">Site Content Manager</h1>
            {/* <p className="text-sm text-muted-foreground">Manage content blocks and preview every static page.</p> */}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex items-center gap-2" type="button" onClick={onExport}>
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            type="button"
            onClick={onResetContent}
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
        </div>
      </header>

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
        className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-6 py-6 content-manager-hide-scrollbar"
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

