import { MapPin, GraduationCap, Briefcase, Code, Languages, FlaskConical, BookOpen } from "lucide-react";
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
                Engineer, Researcher & Lifelong Learner
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a Software Engineer currently pursuing an MS in Data Science at Information Technology University,
                Lahore. At ParadigmNetworks, I build LLM-powered intelligent applications — from architecture to
                deployment — on AWS and Azure.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My engineering background spans cloud-based and web-based systems at Clicky.pk, eBricks-Inc Ltd, and
                FormSoft-Inc, where I worked with Python, Django, React, and various cloud platforms.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My research focus is on <strong className="text-gray-900 dark:text-white">Large Language Models and Small Language Models</strong> —
                including fine-tuning, inference optimization, RAG pipelines, and hallucination detection. I am deeply
                interested in AI safety and factuality evaluation of generative models.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I am actively interested in <strong className="text-gray-900 dark:text-white">research collaborations and PhD opportunities</strong> in
                AI, NLP, and machine learning. I believe that rigorous research and engineering together drive the
                most meaningful impact in AI.
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
                      <span className="text-gray-700 dark:text-gray-300">2+ Years Software Engineering Experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Full-Stack & AI/ML Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FlaskConical className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Research: LLMs, SLMs, RAG, Hallucination Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">Open to PhD Programs in AI/NLP/ML</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Languages className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">English, Urdu</span>
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
