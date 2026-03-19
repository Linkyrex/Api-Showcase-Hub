import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface JsonViewerProps {
  data: unknown;
  className?: string;
}

export function JsonViewer({ data, className }: JsonViewerProps) {
  const formattedHtml = useMemo(() => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      
      // Very simple syntax highlighter regex
      // Matches strings, keys, numbers, booleans, and null
      return jsonString.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let cls = 'text-amber-400'; // number default
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'text-accent'; // key (purple)
            } else {
              cls = 'text-emerald-400'; // string (green)
            }
          } else if (/true|false/.test(match)) {
            cls = 'text-primary'; // boolean (cyan)
          } else if (/null/.test(match)) {
            cls = 'text-muted-foreground'; // null (grey)
          }
          return `<span class="${cls}">${match}</span>`;
        }
      );
    } catch (e) {
      return 'Error parsing JSON data.';
    }
  }, [data]);

  return (
    <pre 
      className={cn(
        "bg-black/40 border border-white/5 rounded-xl p-4 text-sm font-mono overflow-x-auto custom-scrollbar leading-relaxed",
        className
      )}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
