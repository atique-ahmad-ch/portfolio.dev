import { MapPin, GraduationCap, Briefcase, Code, Server, FlaskConical, Globe, Mail, Languages } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">About Me</h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="animate-slide-up space-y-5">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                ML/AI Engineer, Lifelong Learner & Researcher
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm an ML/AI Engineer with hands-on experience building end-to-end AI systems — from model training
                and fine-tuning to production deployment. Currently pursuing an{" "}
                <strong className="text-gray-900 dark:text-white">MS in Data Science at ITU Lahore</strong>, I've
                worked across the full AI stack at eBricks-inc | Paradigm Networks.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">AI & ML:</strong> I work with classical ML, deep
                learning architectures (ANN, CNN, RNN, LSTM, Transformers), and modern GenAI — including LLM/SLM
                fine-tuning, synthetic data generation, labeling pipelines, and RAG. My primary stack is{" "}
                <strong className="text-gray-900 dark:text-white">PyTorch and TensorFlow</strong> with Python
                (NumPy, Pandas, Scikit-learn).
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Engineering:</strong> On the backend I build with{" "}
                <strong className="text-gray-900 dark:text-white">FastAPI and Django</strong>, and on the frontend
                with <strong className="text-gray-900 dark:text-white">React.js</strong> — letting me take an AI
                feature from model to UI without handoffs.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Deployment:</strong> I containerize with{" "}
                <strong className="text-gray-900 dark:text-white">Docker</strong> (Docker Compose), deploy on{" "}
                <strong className="text-gray-900 dark:text-white">AWS</strong> (EC2, S3, Lambda), and manage
                end-to-end CI/CD pipelines and Git workflows.
              </p>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Passionate about the intersection of LLMs, intelligent backends, and scalable AI products.{" "}
                <strong className="text-gray-900 dark:text-white">Open to ML/AI and Full-Stack AI Engineering roles globally.</strong>
              </p>
            </div>

            <div className="animate-slide-up">
              <Card className="shadow-md border border-gray-200 dark:border-zinc-800">
                <CardContent className="pt-6">
                  <h4 className="text-xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Quick Facts</h4>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Lahore, Pakistan</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">MS Data Science — ITU Lahore (2025–Present)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">BS Computer Engineering — ITU Lahore (2019–2023)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">eBricks-inc | Paradigm Networks</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FlaskConical className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">LLMs · SLMs · Fine-tuning · RAG · Agentic AI</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">FastAPI · Django · React.js</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Server className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Docker · AWS (EC2, S3, Lambda) · CI/CD</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Open to ML/AI & Full-Stack AI roles globally</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Languages className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">English, Urdu</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <a
                        href="mailto:engr.atique.ahmad@gmail.com"
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        engr.atique.ahmad@gmail.com
                      </a>
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
