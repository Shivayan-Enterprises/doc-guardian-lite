import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Shield } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="rounded-lg bg-gradient-hero p-2">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground">DocGuardian</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link 
            to="/check" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/check" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Check Document
          </Link>
          <Link 
            to="/converter" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === "/converter" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Converter
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {location.pathname !== "/check" && (
            <Button asChild variant="hero">
              <Link to="/check">
                <FileText className="mr-2 h-4 w-4" />
                Start Check
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;