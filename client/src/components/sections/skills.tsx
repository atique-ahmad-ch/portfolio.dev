import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Database, Cloud, Brain, BarChart, Cog, Cpu } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 85 },
        { name: "SQL", level: 85 },
        { name: "Golang", level: 65 },
      ]
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: [
        { name: "Django", level: 85 },
        { name: "FastAPI", level: 90 },
        { name: "Flask", level: 90 },
        { name: "React.js", level: 80 },
      ]
    },
    {
      title: "Deep Learning",
      icon: Cpu,
      skills: [
        { name: "PyTorch", level: 85 },
        { name: "TensorFlow", level: 80 },
        { name: "Transformers", level: 88 },
        { name: "PyTorch Lightning", level: 80 },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 85 },
        { name: "Redis", level: 70 },
      ]
    },
    {
      title: "Tools & Cloud",
      icon: Cloud,
      skills: [
        { name: "AWS", level: 80 },
        { name: "Azure", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Git", level: 90 }
      ]
    }
  ];

  const aiSkills = [
    {
      title: "LLM / SLM Engineering",
      icon: Brain,
      skills: [
        "LLM Fine-tuning",
        "SLM Training",
        "Model Inference",
        "LLM Deployment",
        "Prompt Engineering",
        "RAG Pipelines",
        "Hallucination Detection",
        "HuggingFace Hub",
      ]
    },
    {
      title: "AI Frameworks & Tools",
      icon: Cog,
      skills: [
        "PyTorch",
        "TensorFlow",
        "PyTorch Lightning",
        "Transformers (HF)",
        "LangChain",
        "OpenAI API",
        "vLLM / Ollama",
        "PEFT / LoRA",
      ]
    },
    {
      title: "Data Science",
      icon: BarChart,
      skills: [
        "Statistical Modeling",
        "Data Visualization",
        "Feature Engineering",
        "ETL Pipelines",
        "Pandas / NumPy",
        "Scikit-learn",
        "NLP",
        "Model Evaluation",
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Technical Skills
        </h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="shadow-sm border border-gray-200 dark:border-zinc-800">
                  <CardContent className="p-6">
                    <div className="text-center mb-5">
                      <IconComponent className="h-7 w-7 text-gray-700 dark:text-gray-300 mx-auto mb-3" />
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600 dark:text-gray-400">{skill.name}</span>
                            <span className="text-xs text-gray-400 dark:text-gray-500">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-zinc-800 rounded-full h-1.5">
                            <div
                              className="bg-gray-800 dark:bg-gray-200 h-1.5 rounded-full transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI/ML Skills */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
              AI/ML & Data Science
            </h3>
            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-xl">
              <div className="grid md:grid-cols-3 gap-8">
                {aiSkills.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="h-7 w-7 text-gray-700 dark:text-gray-300 mx-auto mb-3" />
                      <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">{category.title}</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700 text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
