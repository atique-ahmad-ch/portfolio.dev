import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, TrendingUp, Database, GraduationCap, Sparkles, Cloud } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Video Editing Agency Website",
      description: "A high-conversion React.js website for a premium video editing agency. Designed to showcase services, portfolio, and client success stories, the site is fully deployed on Vercel with custom domain integration for a professional online presence.",
      icon: Film,   // you can replace with any Lucide icon like 'Video' or 'Clapperboard'
      gradient: "from-red-500 to-orange-500",
      technologies: ["React.js", "TailwindCSS", "Next.js", "Vercel", "Domain Integration"],
      featured: true,
      liveDemo: "https://clipmastrs.online",  
      code: "https://github.com/yourusername/video-editing-agency" 
    },
    {
      title: "LLM-Based Messaging Platform",
      description: "Advanced messaging application integrating Large Language Models for intelligent conversation assistance and automation.",
      icon: Bot,
      gradient: "from-primary to-accent",
      technologies: ["Python", "LLM", "AWS", "Django"],
      featured: true,
      liveDemo: "",   
      code: ""     
    },
    {
      title: "Data Visualization Dashboard",
      description: "Comprehensive financial technology platform with real-time analytics, secure transactions, and advanced reporting features.",
      icon: TrendingUp,
      gradient: "from-green-500 to-blue-600",
      technologies: ["React", "Django", "PostgreSQL", "DRF"],
      liveDemo: "",   
      code: ""     
    },
    {
      title: "Data Analytics Platform", 
      description: "Advanced data analytics platform with machine learning models for predictive analysis and business intelligence.",
      icon: Database,
      gradient: "from-accent to-primary",
      technologies: ["Python", "Pandas", "ML", "Visualization"],
      liveDemo: "",   
      code: ""     
    },
    {
      title: "E-Learning Platform",
      description: "Full-featured e-learning platform with course management, interactive content, and progress tracking for Nivedu.co.",
      icon: GraduationCap,
      gradient: "from-purple-500 to-pink-500",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      liveDemo: "",   
      code: ""     
    },
    {
      title: "AI Content Generator",
      description: "Intelligent content generation tool using advanced prompt engineering and LLM integration for automated content creation.",
      icon: Sparkles,
      gradient: "from-indigo-500 to-cyan-500",
      technologies: ["Python", "OpenAI API", "FastAPI", "React"],
      liveDemo: "",   
      code: ""     
    },
    {
      title: "Cloud Infrastructure Suite",
      description: "Scalable cloud infrastructure solution with automated deployment, monitoring, and optimization across AWS and Azure platforms.",
      icon: Cloud,
      gradient: "from-gray-600 to-blue-700",
      technologies: ["AWS", "Azure", "Docker", "Terraform"],
      liveDemo: "",   
      code: ""     
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card key={index} className="overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                  {/* Project Icon/Image */}
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                    <IconComponent className="h-16 w-16 text-white" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Button asChild variant="link" className="text-primary hover:text-secondary transition-colors p-0">
                        <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </a>
                      </Button>
                      <Button asChild variant="link" className="text-gray-500 hover:text-primary transition-colors p-0">
                        <a href={project.code} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* View All Projects Button */}
          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
