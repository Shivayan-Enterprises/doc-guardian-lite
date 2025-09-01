import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import PricingCalculator from "@/components/PricingCalculator";
import { 
  Upload, 
  FileText, 
  Mail, 
  Phone, 
  User, 
  Calendar,
  Zap,
  Send
} from "lucide-react";

const CheckPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    file: null as File | null,
    deliveryTime: "anytime",
    pages: 50,
    aiCheck: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      if (validTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, file }));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.file) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload a document.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Document submitted successfully!",
        description: "We've received your document and will process it according to your delivery preference. You'll receive the results via email.",
        variant: "default"
      });
      
      // Navigate to confirmation page
      navigate("/confirmation", { 
        state: { 
          formData: {
            ...formData,
            fileName: formData.file?.name
          }
        }
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your document. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageOptions = [50, 100, 200, 500, 1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-bounce-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Document Plagiarism Check</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your document and get comprehensive plagiarism analysis with detailed reporting.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Form Section */}
          <div className="lg:col-span-2 animate-bounce-in" style={{animationDelay: "0.2s"}}>
            <Card className="shadow-soft card-glow hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Document Submission Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Document Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Document Upload
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload Document (PDF/DOCX) *</Label>
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
                        formData.file 
                          ? "border-primary/50 bg-primary/5" 
                          : "border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5"
                      }`}>
                        <input
                          id="file"
                          type="file"
                          accept=".pdf,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                          required
                        />
                        <label htmlFor="file" className="cursor-pointer">
                          <div className={`transition-all duration-300 ${formData.file ? "scale-110" : ""}`}>
                            <Upload className={`mx-auto h-8 w-8 mb-2 transition-colors ${
                              formData.file ? "text-primary" : "text-muted-foreground"
                            }`} />
                          </div>
                          <p className={`text-sm transition-colors ${
                            formData.file ? "text-primary font-medium" : "text-muted-foreground"
                          }`}>
                            {formData.file ? (
                              formData.file.name
                            ) : (
                              "Click to upload or drag and drop your document"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Supported formats: PDF, DOCX (Max: 10,000 pages)
                          </p>
                          {formData.file && (
                            <p className="text-xs text-primary mt-2 animate-fade-in">
                              ✓ File uploaded successfully
                            </p>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      Check Options
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Delivery Time</Label>
                        <Select 
                          value={formData.deliveryTime} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, deliveryTime: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediate (+50% cost)</SelectItem>
                            <SelectItem value="1day">Within 1 Day (+20% cost)</SelectItem>
                            <SelectItem value="anytime">Any time (Standard rate)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Page Count</Label>
                        <Select 
                          value={formData.pages.toString()} 
                          onValueChange={(value) => setFormData(prev => ({ ...prev, pages: parseInt(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {pageOptions.map(pages => (
                              <SelectItem key={pages} value={pages.toString()}>
                                {pages} pages
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="aiCheck"
                        checked={formData.aiCheck}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, aiCheck: checked as boolean }))}
                      />
                      <Label htmlFor="aiCheck" className="flex items-center cursor-pointer">
                        <Zap className="mr-1 h-4 w-4 text-accent" />
                        Add AI-Enhanced Check (+₹39)
                      </Label>
                    </div>
                    <p className="text-xs text-muted-foreground ml-6">
                      Get advanced AI-powered detection with detailed similarity analysis
                    </p>
                  </div>

                  <Separator />

                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="w-full hover:scale-105 transition-transform"
                    disabled={isSubmitting || !formData.file}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Submit for Plagiarism Check
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Calculator */}
          <div className="lg:col-span-1 animate-bounce-in" style={{animationDelay: "0.4s"}}>
            <div className="sticky top-24">
              <PricingCalculator 
                pages={formData.pages}
                deliveryTime={formData.deliveryTime}
                aiCheck={formData.aiCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckPage;