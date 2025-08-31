import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

interface PricingCalculatorProps {
  pages: number;
  deliveryTime: string;
  aiCheck: boolean;
}

const PricingCalculator = ({ pages, deliveryTime, aiCheck }: PricingCalculatorProps) => {
  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price calculation based on pages
    if (pages <= 100) {
      basePrice = pages * 2;
    } else if (pages <= 500) {
      basePrice = 100 * 2 + (pages - 100) * 1.5;
    } else if (pages <= 1000) {
      basePrice = 100 * 2 + 400 * 1.5 + (pages - 500) * 1.2;
    } else {
      basePrice = 100 * 2 + 400 * 1.5 + 500 * 1.2 + (pages - 1000) * 1;
    }

    // Delivery time multiplier
    let deliveryMultiplier = 1;
    if (deliveryTime === "immediate") {
      deliveryMultiplier = 1.5;
    } else if (deliveryTime === "1day") {
      deliveryMultiplier = 1.2;
    }

    let finalPrice = basePrice * deliveryMultiplier;
    
    // Add AI check cost
    if (aiCheck) {
      finalPrice += 39;
    }

    return Math.round(finalPrice);
  };

  const price = calculatePrice();

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Zap className="mr-2 h-5 w-5 text-primary" />
          Price Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pages ({pages})</span>
            <span>₹{Math.round(pages <= 100 ? pages * 2 : pages <= 500 ? 100 * 2 + (pages - 100) * 1.5 : pages <= 1000 ? 100 * 2 + 400 * 1.5 + (pages - 500) * 1.2 : 100 * 2 + 400 * 1.5 + 500 * 1.2 + (pages - 1000) * 1)}</span>
          </div>
          
          {deliveryTime !== "anytime" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {deliveryTime === "immediate" ? "Immediate delivery" : "1-day delivery"}
              </span>
              <span className="text-accent">
                +{deliveryTime === "immediate" ? "50%" : "20%"}
              </span>
            </div>
          )}
          
          {aiCheck && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">AI Check Add-on</span>
              <span>+₹39</span>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total</span>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              ₹{price}
            </Badge>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          * Prices are calculated dynamically based on your requirements
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;