import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Bot, Film, TrendingUp, Database, GraduationCap, Sparkles, Cloud, FlaskConical, ImageIcon, ShoppingBag } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "Hallucination & Factuality Detection in LLMs",
      description:
        "Research project fine-tuning 4 small language models (IBM Granite 3.1, Mistral Ministral, ModernBERT Large, Vectara HHEM) on a custom 10K RAG dataset to detect hallucinations in LLM responses via binary classification.",
      icon: FlaskConical,
      gradient: "from-zinc-800 to-zinc-600",
      technologies: ["PyTorch", "Transformers", "HuggingFace", "Python", "Fine-tuning", "RAG", "NLP"],
      tag: "Research",
      featured: true,
      liveDemo: "",
      code: ""
    },
    {
      title: "CNN Deep Metric Learning for Image Retrieval",
      description:
        "CNN trained to learn 128-dimensional embeddings for image retrieval — similar images cluster together in embedding space. Benchmarked three approaches: Contrastive Loss with Random Pairs, Triplet Loss with Random Triplets, and Triplet Loss with Hard Negative Mining.",
      icon: ImageIcon,
      gradient: "from-zinc-700 to-zinc-500",
      technologies: ["PyTorch", "CNN", "Deep Metric Learning", "Triplet Loss", "Contrastive Loss", "Python"],
      tag: "Research",
      featured: true,
      liveDemo: "",
      code: "https://github.com/atique-ahmad-01/DL_A3_MSDS25030"
    },
    {
      title: "LLM-Based Messaging Platform",
      description:
        "Production-grade messaging application integrating Large Language Models for intelligent conversation assistance, automation, and real-time response generation. Deployed on AWS and Azure.",
      icon: Bot,
      gradient: "from-gray-700 to-gray-500",
      technologies: ["Python", "LLM", "AWS", "Azure", "Django", "FastAPI"],
      tag: "Professional",
      featured: true,
      liveDemo: "",
      code: ""
    },
    {
      title: "UniMerchant — E-Commerce Store",
      description:
        "Full e-commerce storefront for a UK-based home furnishings retailer. Features product catalogue across Furniture, Shelves, Kitchen & Home Decor categories, shopping cart, checkout with multiple payment methods, and WhatsApp support integration.",
      icon: ShoppingBag,
      gradient: "from-slate-600 to-slate-400",
      technologies: ["HTML", "CSS", "JavaScript", "E-Commerce", "Payment Integration"],
      tag: "Web",
      featured: false,
      liveDemo: "https://www.unimerchant.store/",
      code: ""
    },
    {
      title: "Video Editing Agency Website",
      description:
        "Premium conversion-optimized website for a video editing agency, showcasing services, portfolio, and client success stories with a modern UI.",
      icon: Film,
      gradient: "from-slate-600 to-slate-400",
      technologies: ["React.js", "TailwindCSS", "Next.js", "Vercel"],
      tag: "Web",
      featured: false,
      liveDemo: "https://www.clipmasters.uk/",
      code: "https://github.com/atique-ahmad-ch/clipmasters"
    },
    {
      title: "Data Visualization Dashboard",
      description:
        "Financial technology platform with real-time analytics, secure transactions, advanced reporting, and interactive data visualizations.",
      icon: TrendingUp,
      gradient: "from-gray-600 to-gray-400",
      technologies: ["React", "Django", "PostgreSQL", "DRF", "Charts.js"],
      tag: "FinTech",
      liveDemo: "",
      code: ""
    },
    {
      title: "Data Analytics Platform",
      description:
        "Advanced analytics platform with machine learning models for predictive analysis, business intelligence, and automated ETL pipelines.",
      icon: Database,
      gradient: "from-zinc-700 to-zinc-500",
      technologies: ["Python", "Pandas", "Scikit-learn", "ML", "Visualization"],
      tag: "Analytics",
      liveDemo: "",
      code: ""
    },
    {
      title: "E-Learning Platform",
      description:
        "Full-featured e-learning platform for Nivedu.co with course management, interactive content delivery, progress tracking, and user authentication.",
      icon: GraduationCap,
      gradient: "from-slate-700 to-slate-500",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      tag: "EdTech",
      liveDemo: "",
      code: ""
    },
    {
      title: "AI Content Generator",
      description:
        "Intelligent content generation tool using advanced prompt engineering and LLM integration for automated, context-aware content creation at scale.",
      icon: Sparkles,
      gradient: "from-gray-700 to-gray-500",
      technologies: ["Python", "OpenAI API", "FastAPI", "React", "LangChain"],
      tag: "AI",
      liveDemo: "",
      code: ""
    },
    {
      title: "Cloud Infrastructure Suite",
      description:
        "Scalable cloud infrastructure solution with automated deployment pipelines, monitoring dashboards, and cost optimization across AWS and Azure.",
      icon: Cloud,
      gradient: "from-zinc-600 to-zinc-400",
      technologies: ["AWS", "Azure", "Docker", "Terraform", "CI/CD"],
      tag: "DevOps",
      liveDemo: "",
      code: ""
    }
  ];

  const tagColors: Record<string, string> = {
    Research: "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900",
    Professional: "bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900",
    Web: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
    FinTech: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
    Analytics: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
    EdTech: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
    AI: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
    DevOps: "bg-gray-200 text-gray-800 dark:bg-zinc-700 dark:text-gray-200",
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Featured Projects
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                  <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative`}>
                    <IconComponent className="h-14 w-14 text-white/80" />
                    {project.tag && (
                      <span className={`absolute top-3 right-3 text-xs font-semibold px-2 py-0.5 rounded-full ${tagColors[project.tag] || "bg-gray-200 text-gray-800"}`}>
                        {project.tag}
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4 text-xs leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 border-0"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-4 items-center">
                      {project.liveDemo && (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1" />
                          Live Demo
                        </a>
                      )}
                      {project.code && (
                        <a
                          href={project.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
                        >
                          <Github className="h-3.5 w-3.5 mr-1" />
                          View Code
                        </a>
                      )}
                      {!project.liveDemo && !project.code && (
                        <span className="text-xs text-gray-400 dark:text-gray-600">Private / In Progress</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/atique-ahmad-01"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                <Github className="mr-2 h-4 w-4" />
                View All Projects on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
