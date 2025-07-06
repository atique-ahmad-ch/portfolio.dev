import { MapPin, GraduationCap, Briefcase, Code, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h3 className="text-2xl font-semibold mb-6 text-primary">From Software Engineering to AI Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm a dedicated software engineer with a strong foundation in full-stack development using Python, Django, React, and modern cloud technologies. 
                Currently working at ParadigmNetworks, I specialize in building LLM-based applications and intelligent solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My journey spans from building robust web applications at companies like FinTech Ltd and Nivedu.co 
                to now exploring the frontiers of artificial intelligence and machine learning integration. I believe in the power of 
                data-driven solutions and intelligent automation to solve real-world problems.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                With experience in cloud platforms like AWS and Azure, I'm passionate about combining 
                my software engineering expertise with advanced AI/ML techniques to create innovative, scalable solutions.
              </p>
            </div>

            <div className="animate-slide-up">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-6 text-center">Quick Facts</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-primary mr-3" />
                      <span>Lahore, Pakistan</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-primary mr-3" />
                      <span>Master's in Data Science</span>
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-5 w-5 text-primary mr-3" />
                      <span>Bachelor's in Computer Engineering</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-5 w-5 text-primary mr-3" />
                      <span>2+ Years Software Engineering</span>
                    </div>
                    <div className="flex items-center">
                      <Code className="h-5 w-5 text-primary mr-3" />
                      <span>Full-Stack & AI/ML Development</span>
                    </div>
                    <div className="flex items-center">
                      <Languages className="h-5 w-5 text-primary mr-3" />
                      <span>English, Urdu</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
