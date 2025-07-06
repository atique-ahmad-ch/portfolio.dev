import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Education</h2>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Bachelor's Degree */}
            <Card className="shadow-lg border-l-4 border-primary">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Bachelor of Science in Computer Engineering</h3>
                    <p className="text-gray-600 dark:text-gray-300">Information Technology University, Lahore</p>
                  </div>
                  <Badge className="bg-primary text-white mt-2 md:mt-0">
                    2019 - 2023
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Comprehensive foundation in computer engineering principles, software engineering practices, 
                  algorithms, data structures, and modern programming paradigms.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Software Engineering</Badge>
                  <Badge variant="secondary">Algorithms</Badge>
                  <Badge variant="secondary">Data Structures</Badge>
                  <Badge variant="secondary">Database Systems</Badge>
                  <Badge variant="secondary">Web Development</Badge>
                  <Badge variant="secondary">AI/ML</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 py-8">
            {/* Bachelor's Degree */}
            <Card className="shadow-lg border-l-4 border-primary">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">Master of Science in Data Science</h3>
                    <p className="text-gray-600 dark:text-gray-300">Information Technology University, Lahore</p>
                  </div>
                  <Badge className="bg-primary text-white mt-2 md:mt-0">
                    2025 - Present
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Solid foundation in data science principles, artificial intelligence, machine learning, 
                  statistical modeling, data analytics, and scalable data-driven systems. Hands-on experience with modern ML frameworks and tools.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Machine Learning</Badge>
                  <Badge variant="secondary">Deep Learning</Badge>
                  <Badge variant="secondary">Statistical Modeling</Badge>
                  <Badge variant="secondary">Data Analytics</Badge>
                  <Badge variant="secondary">Big Data</Badge>
                  <Badge variant="secondary">AI Systems</Badge>
                  <Badge variant="secondary">Python</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certifications */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-center mb-8">Certifications & Courses</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center shadow-md">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">AWS Cloud Practitioner</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Cloud Computing Fundamentals</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-md">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Django Advanced</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Full-Stack Django Development</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-md">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">React Specialist</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Modern React Development</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
