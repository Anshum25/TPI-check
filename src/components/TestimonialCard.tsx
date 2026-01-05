import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  hideRole?: boolean;
  expandable?: boolean;
  collapsedLines?: number;
}

const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  hideRole = false,
  expandable = false,
  collapsedLines = 3,
}: TestimonialCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);
  const [collapsedText, setCollapsedText] = useState<string>(content);
  const contentRef = useRef<HTMLParagraphElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!expandable) return;
    const el = contentRef.current;
    const measureEl = measureRef.current;
    if (!el) return;
    if (!measureEl) return;

    const compute = () => {
      const styles = window.getComputedStyle(el);
      const lineHeightRaw = styles.lineHeight;
      const fontSizeRaw = styles.fontSize;
      const fontSize = Number.parseFloat(fontSizeRaw || "16") || 16;
      const parsedLineHeight =
        lineHeightRaw === "normal" ? fontSize * 1.2 : Number.parseFloat(lineHeightRaw || "");
      const lineHeight =
        Number.isFinite(parsedLineHeight) && parsedLineHeight > 0 ? parsedLineHeight : fontSize * 1.2;
      const maxHeight = Math.ceil(lineHeight * collapsedLines);

      measureEl.style.font = styles.font;
      measureEl.style.fontSize = styles.fontSize;
      measureEl.style.fontWeight = styles.fontWeight;
      measureEl.style.fontStyle = styles.fontStyle;
      measureEl.style.letterSpacing = styles.letterSpacing;
      measureEl.style.lineHeight = styles.lineHeight;
      measureEl.style.whiteSpace = "normal";
      measureEl.style.wordBreak = "break-word";
      (measureEl.style as any).overflowWrap = "anywhere";

      // Measure using the same width as the visible paragraph.
      const rect = el.getBoundingClientRect();
      const width = Math.ceil(rect.width || el.clientWidth || 0);
      if (width > 0) {
        measureEl.style.width = `${width}px`;
      }

      // Check if full content fits.
      measureEl.textContent = `"${content}"`;
      const fullFits = measureEl.scrollHeight <= maxHeight + 1;
      setCanExpand(!fullFits);

      if (fullFits) {
        setCollapsedText(content);
        return;
      }

      if (expanded) return;

      // Binary search best prefix that fits when rendering "<prefix>...More"
      let lo = 0;
      let hi = content.length;
      let best = 0;

      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const prefix = content.slice(0, mid).trimEnd();
        measureEl.textContent = `"${prefix}...More"`;
        if (measureEl.scrollHeight <= maxHeight + 1) {
          best = mid;
          lo = mid + 1;
        } else {
          hi = mid - 1;
        }
      }

      setCollapsedText(content.slice(0, best).trimEnd());
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [expandable, expanded, content, collapsedLines]);

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
        <div className="mb-4 relative">
          <p
            ref={contentRef}
            className="text-muted-foreground italic break-words"
            style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
          >
            {expandable && canExpand && !expanded ? (
              <>
                <span>"{collapsedText}</span>
                <button
                  type="button"
                  className="text-xs font-semibold text-accent hover:underline"
                  onClick={() => setExpanded(true)}
                >
                  ...More
                </button>
                <span>"</span>
              </>
            ) : (
              <>"{content}"</>
            )}
          </p>

          {expandable && canExpand && expanded ? (
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-accent hover:underline"
              onClick={() => setExpanded(false)}
            >
              Less
            </button>
          ) : null}

          <div
            ref={measureRef}
            className="text-muted-foreground italic break-words"
            style={{
              position: "fixed",
              left: "-10000px",
              top: "0",
              visibility: "hidden",
              pointerEvents: "none",
              height: "auto",
              maxHeight: "none",
            }}
          />
        </div>
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
            {!hideRole && <p className="text-sm text-muted-foreground">{role}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
