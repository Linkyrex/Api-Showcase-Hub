import { Link } from "wouter";
import { ArrowLeft, ServerCrash } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-md w-full border-t-accent/30 shadow-[0_0_40px_rgba(var(--accent),0.1)]">
        <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-6">
          <ServerCrash className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-6xl font-display font-extrabold text-white mb-2">404</h1>
        <h2 className="text-xl font-bold text-white mb-4">Endpoint Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The route you are looking for does not exist or has been moved.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Explorer
        </Link>
      </div>
    </div>
  );
}
