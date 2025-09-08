import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Layers, Database, Cloud, Brain, BarChart, Cog } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        { name: "Python", level: 95 },
        { name: "JavaScript", level: 85 },
        { name: "C++", level: 80 },
        { name: "SQL", level: 85 }
      ]
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: [
        { name: "Django", level: 85 },
        { name: "FastAPI", level: 90 },
        { name: "Flask", level: 90 }
        { name: "React.js", level: 80 },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "MySQL", level: 85 },
        { name: "PostgreSQL", level: 85 },
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
      title: "Machine Learning",
      icon: Brain,
      skills: ["LLM Integration", "Model Building", "Prompt Engineering", "AI APIs"]
    },
    {
      title: "Data Analysis", 
      icon: BarChart,
      skills: ["Data Modeling", "Statistical Analysis", "Data Visualization", "ETL Processes"]
    },
    {
      title: "Development",
      icon: Cog,
      skills: ["AI Integration", "API Development", "Cloud Deployment", "Performance Optimization"]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Technical Skills</h2>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex justify-between items-center">
                          <span className="text-sm">{skill.name}</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-1000"
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
            <h3 className="text-2xl font-semibold text-center mb-8">AI/ML & Data Science</h3>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-8 rounded-xl">
              <div className="grid md:grid-cols-3 gap-6">
                {aiSkills.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={index} className="text-center">
                      <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h4 className="font-semibold mb-3">{category.title}</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="bg-white dark:bg-gray-700">
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
