/**
 * User Configuration — Portfolio Data
 *
 * Single source of truth for the front page (HomePage). Edit these arrays
 * to update what's rendered on `/`. The GitHub contribution data on
 * `/profile` is still fetched live via the GitHub GraphQL API.
 */

const userConfig = {
    // --- Identity ---
    name: "Atique Ahmad",
    handle: "atique-ahmad-01",
    tagline: "ML/AI Engineer — LLMs, fine-tuning, RAG & agentic AI systems",
    location: "Lahore, PK",
    availability: "open to ML/AI & full-stack AI roles",

    // --- Contact ---
    email: "engr.atique.ahmad@gmail.com",
    website: "https://www.atique-ahmad.site",
    linkedin: "https://www.linkedin.com/in/atiqueahmad/",
    github: "https://github.com/atique-ahmad-01",
    cvUsername: "atique-ahmad-01",

    // --- Bio (short + long) ---
    bioShort:
        "ML/AI engineer building the full stack around LLMs — fine-tuning, RAG, \
        hallucination detection, and the agentic systems that put them into production.",
    bioLong: [
        "I'm an ML/AI Engineer with hands-on experience building end-to-end AI systems — from model \
         training and fine-tuning to production deployment. I'm currently pursuing an MS in Data Science \
         at ITU Lahore, and have worked across the full AI stack at eBricks-inc | Paradigm Networks.",

        "I work with classical ML, deep learning architectures (ANN, CNN, RNN, LSTM, Transformers), and \
         modern GenAI — including LLM/SLM fine-tuning, synthetic data generation, labeling pipelines, and \
         RAG. My primary stack is PyTorch and TensorFlow with Python (NumPy, Pandas, Scikit-learn).",

        "On the backend I build with FastAPI and Django, and on the frontend with React.js — letting me \
         take an AI feature from model to UI without handoffs. I containerize with Docker, deploy on AWS \
         and Azure, and manage end-to-end CI/CD pipelines.",

        "Lately I've been focused on the reliability side of LLMs — fine-tuning small language models to \
         detect hallucinations in RAG pipelines, and building the agentic evaluation systems that check an \
         LLM's work before it ships."
    ],

    // --- Experience ---
    // Each entry supports either `logo` (explicit URL/path like "/logos/foo.svg")
    // or `logoDomain` (e.g. "eclipse.org" — auto-fetched favicon). Omit both
    // to fall back to an initials monogram.
    experience: [
        {
            role: "Software Engineer",
            org: "Paradigm Networks (eBricks-inc)",
            logoDomain: "paradigmnetworks.ai",
            period: "Nov 2023 — Present",
            location: "Lahore, PK",
            highlights: [
                "Developed and maintained LLM-based messaging applications using advanced AI techniques, from fine-tuning through production deployment.",
                "Built agentic evaluation and verification services that fact-check and score LLM outputs for hallucination and factuality before they reach users.",
                "Reduced CPU consumption on inference workloads and deployed solutions across AWS and Azure cloud platforms.",
                "Designed larger-scale database integrations and automation processes for business pipelines.",
                "Contributed to open-source development and evaluated LLM solutions for performance optimization."
            ]
        },
        {
            role: "Lab Engineer",
            org: "Information Technology University (ITU)",
            logoDomain: "itu.edu.pk",
            period: "Jan 2024 — Jul 2024",
            location: "Lahore, PK",
            highlights: [
                "Lectured students on mobile application development and modern frameworks.",
                "Provided hands-on project support and guided final exercises."
            ]
        },
        {
            role: "Associate Software Engineer",
            org: "MetaApp",
            logoDomain: "metaapp.com",
            period: "May 2023 — Nov 2023",
            location: "Lahore, PK",
            highlights: [
                "Built end-to-end MetaApp services using Django and React.js for cross-platform applications.",
                "Developed multi-functional integrated systems/APIs using DRF and enhanced data security.",
                "Improved application performance by optimizing queries and implementing caching."
            ]
        },
        {
            role: "Full Stack Developer & Intern",
            org: "Clicky.pk",
            logoDomain: "clicky.pk",
            period: "Jan 2022 — Oct 2022",
            location: "Lahore, PK",
            highlights: [
                "Developed full-scale business solutions using Django and Node.js.",
                "Delivered responsive and user-engaging interfaces with modern frameworks.",
                "Participated in multi-sprint agile development and learned version control best practices."
            ]
        }
    ],

    // --- Education ---
    education: [
        {
            school: "Information Technology University (ITU)",
            degree: "MS Data Science",
            logoDomain: "itu.edu.pk",
            period: "2025 — Present",
            location: "Lahore, PK",
            note: "Focus on machine learning, deep learning, statistical modeling, data analytics, and scalable AI systems."
        },
        {
            school: "Information Technology University (ITU)",
            degree: "BS Computer Engineering",
            logoDomain: "itu.edu.pk",
            period: "2019 — 2023",
            location: "Lahore, PK",
            note: "Foundation in software engineering, algorithms, data structures, database systems, and AI/ML."
        }
    ],

    // --- Projects / Works ---
    // Card link fields — all optional except `link`:
    //   link         → project home (renders on the title)
    //   srcUrl       → source repo         → footer: "source ↗"
    //   downloadUrl  → release / download   → footer: "download ↗"
    //   prsUrl       → author-filtered PRs  → footer: "my PRs ↗"
    // Each of the footer entries also takes an optional label override
    // (`srcLabel`, `downloadLabel`, `prsLabel`) — e.g. `prsLabel: "7 PRs"`.
    projects: [
        {
            name: "Hallucination & Factuality Detection in LLMs",
            year: "2025",
            tags: ["PyTorch", "Transformers", "HuggingFace", "Fine-tuning", "RAG", "NLP"],
            description:
                "Research project fine-tuning 4 small language models (IBM Granite 3.1, Mistral Ministral, ModernBERT Large, Vectara HHEM) on a custom 10K RAG dataset to detect hallucinations in LLM responses via binary classification."
        },
        {
            name: "LLM-Based Messaging Platform",
            year: "2024",
            tags: ["Python", "LLM", "AWS", "Azure", "Django", "FastAPI"],
            description:
                "Production-grade messaging application integrating Large Language Models for intelligent conversation assistance, automation, and real-time response generation. Deployed on AWS and Azure."
        },
        {
            name: "AI Content Generator",
            year: "2024",
            tags: ["Python", "OpenAI API", "FastAPI", "React", "LangChain"],
            description:
                "Intelligent content generation tool using advanced prompt engineering and LLM integration for automated, context-aware content creation at scale."
        },
        {
            name: "CNN Deep Metric Learning for Image Retrieval",
            year: "2025",
            tags: ["PyTorch", "CNN", "Deep Metric Learning", "Triplet Loss", "Contrastive Loss"],
            description:
                "CNN trained to learn 128-dimensional embeddings for image retrieval — similar images cluster together in embedding space. Benchmarked Contrastive Loss with Random Pairs, Triplet Loss with Random Triplets, and Triplet Loss with Hard Negative Mining.",
            link: "https://github.com/atique-ahmad-01/DL_A3_MSDS25030",
            srcUrl: "https://github.com/atique-ahmad-01/DL_A3_MSDS25030"
        },
        {
            name: "Data Analytics Platform",
            year: "2024",
            tags: ["Python", "Pandas", "Scikit-learn", "ML", "Visualization"],
            description:
                "Advanced analytics platform with machine learning models for predictive analysis, business intelligence, and automated ETL pipelines."
        },
        {
            name: "Data Visualization Dashboard",
            year: "2024",
            tags: ["React", "Django", "PostgreSQL", "DRF", "Charts.js"],
            description:
                "Financial technology platform with real-time analytics, secure transactions, advanced reporting, and interactive data visualizations."
        },
        {
            name: "Cloud Infrastructure Suite",
            year: "2024",
            tags: ["AWS", "Azure", "Docker", "Terraform", "CI/CD"],
            description:
                "Scalable cloud infrastructure solution with automated deployment pipelines, monitoring dashboards, and cost optimization across AWS and Azure."
        },
        {
            name: "Video Editing Agency Website",
            year: "2023",
            tags: ["React.js", "TailwindCSS", "Next.js", "Vercel"],
            description:
                "Premium conversion-optimized website for a video editing agency, showcasing services, portfolio, and client success stories with a modern UI.",
            link: "https://www.clipmasters.uk/",
            srcUrl: "https://github.com/atique-ahmad-ch/clipmasters"
        },
        {
            name: "UniMerchant — E-Commerce Store",
            year: "2023",
            tags: ["HTML", "CSS", "JavaScript", "E-Commerce", "Payment Integration"],
            description:
                "Full e-commerce storefront for a UK-based home furnishings retailer. Product catalogue across Furniture, Shelves, Kitchen & Home Decor, shopping cart, multi-method checkout, and WhatsApp support integration.",
            link: "https://www.unimerchant.store/"
        },
        {
            name: "E-Learning Platform",
            year: "2022",
            tags: ["React", "Node.js", "MongoDB", "Express"],
            description:
                "Full-featured e-learning platform for Nivedu.co with course management, interactive content delivery, progress tracking, and user authentication."
        }
    ],

    // --- Publications (papers, thesis, conference work) ---
    // Unified schema for every publication:
    //   title           → the paper's title
    //   venue           → the TYPE ("Conference Paper", "Journal Article",
    //                     "Thesis", "Article", …)
    //   publishedIn     → the specific place
    //   publishedInUrl  → optional link on the publisher name
    //   date, authors, link → the paper itself
    publications: [],

    // --- Writings / Blogs ---
    blogs: [],

    // Author profiles (surfaced in Contact / footer if you want)
    profiles: {},

    // --- Skills (grouped per CV Technical Skills section) ---
    stack: {
        languages: [
            "Python", "JavaScript", "SQL", "Golang"
        ],
        frameworks: [
            "Django", "FastAPI", "Flask", "React.js"
        ],
        "deep learning": [
            "PyTorch", "TensorFlow", "PyTorch Lightning", "Transformers (HF)"
        ],
        "llm / genai": [
            "LLM Fine-tuning", "SLM Training", "RAG Pipelines", "Hallucination Detection",
            "Prompt Engineering", "LangChain", "PEFT / LoRA", "vLLM / Ollama"
        ],
        databases: [
            "MongoDB", "MySQL", "PostgreSQL", "Redis"
        ],
        "cloud & devops": [
            "AWS (EC2, S3, Lambda)", "Azure", "Docker", "CI/CD", "Git"
        ],
        "data science": [
            "Pandas", "NumPy", "Scikit-learn", "Statistical Modeling", "Feature Engineering", "NLP"
        ]
    },

    // --- Orgs / Companies / Ecosystems worked with ---
    // Each entry supports `logo` (explicit URL/path) or `logoDomain`
    // (favicon fallback). `url` is the official landing page.
    orgs: [
        {
            name: "Paradigm Networks",
            url: "https://paradigmnetworks.ai",
            logoDomain: "paradigmnetworks.ai"
        },
        {
            name: "Information Technology University",
            url: "https://itu.edu.pk",
            logoDomain: "itu.edu.pk"
        },
        {
            name: "MetaApp",
            url: "https://metaapp.com",
            logoDomain: "metaapp.com"
        },
        {
            name: "Clicky.pk",
            url: "https://clicky.pk",
            logoDomain: "clicky.pk"
        },
        {
            name: "Hugging Face",
            url: "https://huggingface.co",
            logoDomain: "huggingface.co"
        },
        {
            name: "PyTorch",
            url: "https://pytorch.org",
            logoDomain: "pytorch.org"
        },
        {
            name: "AWS",
            url: "https://aws.amazon.com",
            logoDomain: "aws.amazon.com"
        },
        {
            name: "Microsoft Azure",
            url: "https://azure.microsoft.com",
            logoDomain: "azure.microsoft.com"
        }
    ]
};

export default userConfig;
