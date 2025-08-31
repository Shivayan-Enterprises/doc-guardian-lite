import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Mail, 
  FileText, 
  Clock, 
  Home,
  Download,
  Phone
} from "lucide-react";

const ConfirmationPage = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground mb-4">No submission data found.</p>
            <Button asChild>
              <Link to="/check">Start New Check</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDeliveryText = (time: string) => {
    switch (time) {
      case "immediate": return "Immediate processing";
      case "1day": return "Within 24 hours";
      default: return "Standard processing";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-accent">
            Submission Successful!
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your document has been received and queued for plagiarism analysis. 
            You'll receive detailed results via email.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Submission Details */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Submission Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document:</span>
                  <span className="font-medium">{formData.fileName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="font-medium">{formData.pages}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <Badge variant="secondary">
                    {getDeliveryText(formData.deliveryTime)}
                  </Badge>
                </div>
                
                {formData.aiCheck && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">AI Check:</span>
                    <Badge variant="default">Included</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-primary" />
                What Happens Next?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Document Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Your document is being analyzed using our advanced plagiarism detection algorithms.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Email Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Detailed results will be sent to your email address along with the original document.
                    </p>
                  </div>
                </div>
                
                {formData.deliveryTime === "immediate" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">WhatsApp Notification</h4>
                      <p className="text-sm text-muted-foreground">
                        You'll also receive a WhatsApp notification when results are ready.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <Link to="/check">
                <FileText className="mr-2 h-4 w-4" />
                Check Another Document
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Mail className="mr-1 h-4 w-4" />
              Results via Email
            </div>
            {formData.deliveryTime !== "anytime" && (
              <div className="flex items-center">
                <Phone className="mr-1 h-4 w-4" />
                WhatsApp Updates
              </div>
            )}
          </div>
        </div>

        {/* Important Note */}
        <Card className="mt-8 border-accent/20 bg-accent/5">
          <CardContent className="py-4">
            <p className="text-sm text-center">
              <span className="font-medium">Important:</span> Please check your email (including spam folder) for the plagiarism report. 
              If you don't receive it within the expected timeframe, please contact our support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationPage;