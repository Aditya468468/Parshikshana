import { certificates } from "@/data/mockData";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CheckCircle2, Clock, QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";

const getVerificationColor = (status: string) => {
  return status === "Verified" 
    ? "bg-success text-success-foreground" 
    : "bg-warning text-warning-foreground";
};

export default function ReportsCertificates() {
  const handleDownload = (title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Reports & Certificates</h1>
        <p className="text-muted-foreground font-body">Access your internship completion documents</p>
      </motion.div>

      {/* Certificates */}
      <div>
        <motion.h2 
          className="text-xl font-heading font-semibold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Certificates
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <AnimatedCard key={cert.id} delay={0.1 * (index + 2)}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-heading">{cert.title}</CardTitle>
                    <CardDescription className="mt-2 font-body">{cert.issuer}</CardDescription>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cert.verificationStatus === "Verified" ? (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    ) : (
                      <Clock className="w-6 h-6 text-warning" />
                    )}
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-body">Issue Date</p>
                    <p className="font-medium font-body">
                      {new Date(cert.issueDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge className={`${getVerificationColor(cert.verificationStatus)} rounded-lg`}>
                    {cert.verificationStatus}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleDownload(cert.title)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {cert.qrCode && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline">
                            <QrCode className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="glass-card">
                        <DialogHeader>
                          <DialogTitle className="font-heading">Blockchain Verification</DialogTitle>
                          <DialogDescription className="font-body">
                            Scan this QR code to verify the certificate on blockchain
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-6">
                          <motion.div 
                            className="w-48 h-48 glass-card rounded-2xl flex items-center justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", duration: 0.8 }}
                          >
                            <QrCode className="w-32 h-32 text-muted-foreground" />
                          </motion.div>
                          <p className="text-sm text-muted-foreground text-center font-body">
                            {cert.qrCode}
                          </p>
                          <Button variant="outline" onClick={() => {
                            navigator.clipboard.writeText(cert.qrCode!);
                            toast.success("Verification link copied!");
                          }}>
                            Copy Link
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </div>

      {/* Reports Section */}
      <div>
        <motion.h2 
          className="text-xl font-heading font-semibold mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Internship Reports
        </motion.h2>
        <AnimatedCard delay={0.4}>
          <CardHeader>
            <CardTitle className="font-heading">Final Internship Report</CardTitle>
            <CardDescription className="font-body">Comprehensive report of your internship activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={() => handleDownload("Final Internship Report")}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              <Button variant="secondary">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </AnimatedCard>
      </div>

      {certificates.length === 0 && (
        <AnimatedCard delay={0.1}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>No certificates available yet</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
