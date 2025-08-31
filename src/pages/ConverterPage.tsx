import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download, Upload, ArrowRightLeft } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import htmlDocx from "html-docx-js";
import mammoth from "mammoth";
import jsPDF from "jspdf";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const ConverterPage = () => {
  const [isConverting, setIsConverting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [wordFile, setWordFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handlePdfToWord = async () => {
    if (!pdfFile) {
      toast({
        title: "Error",
        description: "Please select a PDF file first",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      let extractedText = "";
      
      // Extract text from each page
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let pageText = "";
        textContent.items.forEach((item: any) => {
          if (item.str) {
            pageText += item.str + " ";
          }
        });
        
        extractedText += `Page ${pageNum}\n\n${pageText}\n\n`;
      }

      // Create HTML content for Word document
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Converted from PDF</title>
        </head>
        <body>
          <h1>Converted from PDF</h1>
          <p>Original file: ${pdfFile.name}</p>
          <div style="white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.6;">
            ${extractedText.replace(/\n/g, '<br>')}
          </div>
        </body>
        </html>
      `;

      // Convert HTML to Word document
      const docxBlob = htmlDocx.asBlob(htmlContent);
      
      const url = URL.createObjectURL(docxBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${pdfFile.name.replace('.pdf', '')}_converted.docx`;
      link.click();
      
      URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "PDF converted to Word successfully!",
      });
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
      toast({
        title: "Error",
        description: "Failed to convert PDF to Word. Please ensure the PDF is not password protected.",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleWordToPdf = async () => {
    if (!wordFile) {
      toast({
        title: "Error",
        description: "Please select a Word file first",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    try {
      const arrayBuffer = await wordFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      // Create PDF using jsPDF
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 10;
      let yPosition = margin;

      // Split text into lines that fit the page width
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(lines[i], margin, yPosition);
        yPosition += lineHeight;
      }

      pdf.save(`${wordFile.name.replace(/\.(docx?|doc)$/, '')}_converted.pdf`);
      
      toast({
        title: "Success",
        description: "Word document converted to PDF successfully!",
      });
    } catch (error) {
      console.error("Error converting Word to PDF:", error);
      toast({
        title: "Error",
        description: "Failed to convert Word to PDF",
        variant: "destructive",
      });
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Document 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Converter </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert your documents between PDF and Word formats quickly and easily.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="pdf-to-word" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="pdf-to-word" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                PDF to Word
              </TabsTrigger>
              <TabsTrigger value="word-to-pdf" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Word to PDF
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pdf-to-word">
              <Card className="shadow-medium">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <FileText className="h-6 w-6 text-red-500" />
                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    <FileText className="h-6 w-6 text-blue-500" />
                    PDF to Word Converter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pdf-file">Select PDF File</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Input
                        id="pdf-file"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Label htmlFor="pdf-file" className="cursor-pointer space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {pdfFile ? pdfFile.name : "Click to upload PDF file"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF files up to 50MB
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <Button
                    onClick={handlePdfToWord}
                    disabled={!pdfFile || isConverting}
                    className="w-full"
                    variant="hero"
                    size="lg"
                  >
                    {isConverting ? (
                      "Converting..."
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Convert to Word
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="word-to-pdf">
              <Card className="shadow-medium">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <FileText className="h-6 w-6 text-blue-500" />
                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
                    <FileText className="h-6 w-6 text-red-500" />
                    Word to PDF Converter
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="word-file">Select Word File</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <Input
                        id="word-file"
                        type="file"
                        accept=".doc,.docx"
                        onChange={(e) => setWordFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Label htmlFor="word-file" className="cursor-pointer space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {wordFile ? wordFile.name : "Click to upload Word file"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports DOC and DOCX files up to 50MB
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <Button
                    onClick={handleWordToPdf}
                    disabled={!wordFile || isConverting}
                    className="w-full"
                    variant="hero"
                    size="lg"
                  >
                    {isConverting ? (
                      "Converting..."
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Convert to PDF
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Features */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center shadow-soft">
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">High Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maintain document formatting and quality during conversion
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardHeader>
              <Upload className="h-8 w-8 text-accent mx-auto mb-2" />
              <CardTitle className="text-lg">Easy to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple drag-and-drop interface for quick conversions
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardHeader>
              <Download className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Fast Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Convert your documents in seconds with our optimized engine
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConverterPage;