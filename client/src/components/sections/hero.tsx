import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "../../assets/profile.png";

export function Hero() {
  const handleContactClick = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          {/* Professional placeholder photo */}
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl">
            <img
              src={profileImg}
              alt="Profile photo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl text-white font-bold shadow-2xl">
            AA
          </div> */}

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Atique Ahmad
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Software Engineer & AI/Data Science 
          </p>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Passionate about building intelligent solutions that bridge software engineering excellence 
            with cutting-edge AI and data science innovations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleContactClick}
              className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-8">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
              asChild
            >
              <a
                href="https://www.linkedin.com/in/atiqueahmad"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
              asChild
            >
              <a
                href="https://github.com/atique-ahmad-ch"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-6 w-6" />
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-primary transition-colors text-2xl"
              asChild
            >
              <a href="mailto:engr.atique.ahmad@gmail.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
