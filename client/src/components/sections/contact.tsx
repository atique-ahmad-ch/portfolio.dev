import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useState, useEffect, useRef } from "react";

type EmailStatus = "idle" | "checking" | "valid" | "invalid";

export function Contact() {
  const { toast } = useToast();
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    mode: "onChange",
  });

  const emailValue = watch("email", "");
  const emailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  useEffect(() => {
    if (!emailFormatValid) {
      setEmailStatus(emailValue ? "invalid" : "idle");
      return;
    }
    setEmailStatus("checking");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://www.disify.com/api/email/${encodeURIComponent(emailValue)}`);
        const data = await res.json();
        setEmailStatus(data.format && data.dns ? "valid" : "invalid");
      } catch {
        setEmailStatus(emailFormatValid ? "valid" : "invalid");
      }
    }, 800);
  }, [emailValue]);

  const onSubmit = async (data: InsertContact) => {
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "0cb25eea-ee62-435f-94a3-079f44c31328",
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          replyto: data.email,
          from_name: "Portfolio Contact Form",
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Failed to send",
        description: "Something went wrong. Please email me directly at engr.atique.ahmad@gmail.com",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Get In Touch
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Let's Connect</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  I'm open to discussions about software engineering roles, AI/ML research collaborations,
                  PhD program opportunities, and innovative projects. Feel free to reach out anytime.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-white dark:text-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <a
                      href="mailto:engr.atique.ahmad@gmail.com"
                      className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white font-medium transition-colors text-sm"
                    >
                      engr.atique.ahmad@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-700 dark:bg-gray-300 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-white dark:text-gray-900" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                    <a
                      href="tel:+923240539099"
                      className="text-gray-800 dark:text-gray-200 font-medium text-sm"
                    >
                      +92 324 0539099
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-500 dark:bg-gray-500 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Location</p>
                    <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">Lahore, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-gray-400 dark:bg-gray-600 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Website</p>
                    <a
                      href="https://atique-ahmad.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-white font-medium text-sm transition-colors"
                    >
                      atique-ahmad.site
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 pt-4">
                <a
                  href="https://www.linkedin.com/in/atiqueahmad/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </a>

                <a
                  href="https://github.com/atique-ahmad-01"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </a>

                <a
                  href="https://atique-ahmad.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="icon"
                    className="bg-gray-500 hover:bg-gray-600 text-white"
                    aria-label="Website"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="shadow-sm border border-gray-200 dark:border-zinc-800">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Send a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 text-sm">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...register("name")}
                      className="mt-1 border-gray-200 dark:border-zinc-700 focus:border-gray-900 dark:focus:border-white"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 text-sm">Email</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        {...register("email")}
                        className={`pr-9 border-gray-200 dark:border-zinc-700 focus:border-gray-900 dark:focus:border-white transition-colors ${
                          emailStatus === "valid"
                            ? "border-green-500 dark:border-green-500"
                            : emailStatus === "invalid"
                            ? "border-red-500 dark:border-red-500"
                            : ""
                        }`}
                      />
                      {emailStatus !== "idle" && (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
                          {emailStatus === "checking" && <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />}
                          {emailStatus === "valid" && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {emailStatus === "invalid" && <XCircle className="h-4 w-4 text-red-500" />}
                        </span>
                      )}
                    </div>
                    {emailStatus === "invalid" && emailValue && (
                      <p className="text-red-500 text-xs mt-1">
                        {!emailFormatValid ? "Invalid email format" : "This email domain doesn't exist or can't receive emails"}
                      </p>
                    )}
                    {emailStatus === "valid" && (
                      <p className="text-green-500 text-xs mt-1">Email looks valid</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 text-sm">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Research Collaboration / Job Opportunity / Project"
                      {...register("subject")}
                      className="mt-1 border-gray-200 dark:border-zinc-700 focus:border-gray-900 dark:focus:border-white"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 text-sm">Message</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder="Tell me about your project, research idea, or opportunity..."
                      {...register("message")}
                      className="mt-1 border-gray-200 dark:border-zinc-700 focus:border-gray-900 dark:focus:border-white"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Opening Email..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
