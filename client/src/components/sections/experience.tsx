import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  const experiences = [
    {
      title: "Software Engineer",
      company: "ParadigmNetworks",
      period: "Nov 2023 - Present",
      status: "current",
      description: [
        "Developed and maintained LLM-based messaging applications using advanced AI techniques",
        "Reduced CPU consumption and deployed solutions on AWS and Azure cloud platforms", 
        "Designed larger-scale database integrations and automation processes for business pipelines",
        "Contributed to open-source development and evaluated LLM solutions and performance optimization"
      ]
    },
    {
      title: "Associate Software Engineer",
      company: "MetaApp",
      period: "May 2023 - Nov 2023",
      status: "previous",
      description: [
        "Built end-to-end MetaApp services using Django and React.js for cross-platform applications",
        "Developed multi-functional integrated systems/APIs using DRF and enhanced data security",
        "Improved application performance by optimizing queries and implementing caching"
      ]
    },
    {
      title: "Full Stack Developer & Intern",
      company: "Clicky.pk",
      period: "Jan 2022 - Oct 2022",
      status: "previous",
      description: [
        "Developed full-scale business solutions using Django and Node.js",
        "Delivered responsive and user-engaging interfaces with modern frameworks",
        "Participated in multi-sprint agile development and learned version control best practices"
      ]
    },
    {
      title: "Lab Engineer",
      company: "Information Technology University",
      period: " Jan 2024 - July 2024",
      status: "previous",
      description: [
        "Lectured students on mobile application development and modern frameworks",
        "Provided hands-on project support and guided final exercises"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Experience</h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-primary"></div>

            {/* Experience Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-center md:justify-center">
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8 md:ml-auto'}`}>
                    <Card className="shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary">{exp.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                          </div>
                          <Badge 
                            className={`${
                              exp.status === 'current' 
                                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            }`}
                          >
                            {exp.period}
                          </Badge>
                        </div>
                        <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                          {exp.description.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
