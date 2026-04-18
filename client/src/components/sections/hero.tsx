import { Download, Mail, Github, Linkedin, Globe, FlaskConical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import profileImg from "../../assets/profile.png";

export function Hero() {
  const [showResumePopup, setShowResumePopup] = useState(false);

  const handleContactClick = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <div className="w-44 h-44 mx-auto mb-8 rounded-full overflow-hidden shadow-lg ring-2 ring-gray-900 dark:ring-gray-100">
            <img
              src={profileImg}
              alt="Atique Ahmad"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Atique Ahmad
          </h1>

          <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mb-3">
            AI/ML Engineer & Software Engineer
          </p>

          <p className="text-base text-gray-500 dark:text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed">
            Software Engineer with 2+ years of experience building LLM-powered applications and cloud-native systems.
            Pursuing MS in Data Science at ITU Lahore, with a strong interest in AI research, model fine-tuning, and
            exploring opportunities in research & development and PhD programs.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="outline" className="border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-200 text-xs px-3 py-1">
              <FlaskConical className="h-3 w-3 mr-1" />
              Open to Research & PhD Opportunities
            </Badge>
            <Badge variant="outline" className="border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400 text-xs px-3 py-1">
              LLM Fine-tuning & Deployment
            </Badge>
            <Badge variant="outline" className="border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400 text-xs px-3 py-1">
              Lahore, Pakistan
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleContactClick}
              className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowResumePopup(true)}
              className="border-2 border-gray-900 dark:border-gray-200 text-gray-900 dark:text-gray-200 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          {/* Resume Popup */}
          {showResumePopup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setShowResumePopup(false)}>
              <div
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full relative text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowResumePopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="w-14 h-14 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-white dark:text-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request My Resume</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Send me an email or DM on LinkedIn and I'll send you my latest resume right away.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=engr.atique.ahmad@gmail.com&su=Resume Request&body=Hi Atique, I'd like to request your resume."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Email Me
                  </a>
                  <a
                    href="https://www.linkedin.com/in/atiqueahmad/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-sm"
                  >
                    <Linkedin className="h-4 w-4" />
                    DM on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-5 mt-8">
            <a
              href="https://www.linkedin.com/in/atiqueahmad/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/atique-ahmad-01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:engr.atique.ahmad@gmail.com"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="https://atique-ahmad.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Website"
            >
              <Globe className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
