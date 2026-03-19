import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApiFetch } from '@/hooks/use-api-fetch';
import { ApiConfig } from '@/data/apis';
import { JsonViewer } from '@/components/JsonViewer';

interface ApiCardProps {
  config: ApiConfig;
}

export function ApiCard({ config }: ApiCardProps) {
  const [selectedOption, setSelectedOption] = useState<string>(config.options[0].value);
  const { mutate, data, isPending, isError, error, reset } = useApiFetch();

  const handleSendRequest = () => {
    // Reset state before fetching new
    if (data || isError) reset();
    mutate(config.buildUrl(selectedOption));
  };

  const currentUrl = config.buildUrl(selectedOption);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/5 group"
    >
      {/* Header */}
      <div className="p-6 pb-4 border-b border-white/5 relative">
        {/* Glow effect that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 flex justify-between items-start mb-3">
          <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
            {config.name}
          </h3>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border",
            config.colorClass
          )}>
            {config.icon}
            {config.category}
          </div>
        </div>
        <p className="text-sm text-muted-foreground relative z-10 leading-relaxed min-h-[40px]">
          {config.description}
        </p>
      </div>

      {/* Controls */}
      <div className="p-6 bg-black/20 flex flex-col flex-grow">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Select Option
        </label>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {config.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setSelectedOption(opt.value);
                if (data || isError) reset();
              }}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border",
                selectedOption === opt.value
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]"
                  : "bg-white/5 text-muted-foreground border-transparent hover:bg-white/10 hover:text-white"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <button
            onClick={handleSendRequest}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Fetching...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                Send Request
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Result Panel */}
      <AnimatePresence>
        {(data || isError || isPending) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-white/5 bg-background overflow-hidden"
          >
            <div className="p-6">
              
              {/* Request Info */}
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground bg-black/30 p-2 rounded border border-white/5 overflow-x-auto custom-scrollbar">
                <span className="text-primary font-bold">GET</span>
                <a href={currentUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
                  {currentUrl}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Status Display */}
              {isPending && (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
                  <p className="text-sm animate-pulse">Contacting API...</p>
                </div>
              )}

              {isError && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">
                    <p className="mb-1 font-bold">Request Failed</p>
                    <p className="opacity-90">{error?.message || "Unknown error occurred"}</p>
                  </div>
                </div>
              )}

              {data && !isPending && !isError && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Render optional custom UI (e.g., images) before JSON */}
                  {config.renderCustom && config.renderCustom(data)}
                  
                  {/* Render JSON Viewer */}
                  <div className="max-h-64 overflow-y-auto custom-scrollbar rounded-xl border border-white/5 relative">
                    <JsonViewer data={data} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
