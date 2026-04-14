// ============================================================
// PORTFOLIO DATA — Ayush Kumar Srivastava
// ============================================================

export const personal = {
  name: "Ayush Kumar Srivastava",
  title: "AI/ML Engineer & Full Stack Developer",
  titles: [
    "AI/ML Engineer",
    "NLP Enthusiast",
    "Reinforcement Learning Dev",
    "Java & Python Developer",
    "Problem Solver",
  ],
  email: "ayush.vns1575@gmail.com",
  phone: "+91-6387860028",
  github: "https://github.com/Astrio12345",
  linkedin: "https://linkedin.com/in/ayush-1575-vns",
  leetcode: "https://leetcode.com/Ayush1575",
  location: "Varanasi, India",
  bio: "Passionate AI/ML engineer specializing in NLP, Reinforcement Learning, and RAG systems. I love building intelligent applications — from multilingual chatbots to fake news detectors — and solving complex problems with clean, scalable code.",
  currentStatus: "Open to Opportunities",
  resumeUrl: "/data/ATS_Friendly_Technical_Resume.pdf",
  githubStats: "800+ contributions",
  leetcodeStats: "350+ problems solved",
};

export const education = [
  {
    degree: "B.Tech in Artificial Intelligence & Machine Learning",
    institution: "G L Bajaj Institute of Technology & Management",
    year: "4 Years",
    gpa: "77%",
    highlights: ["AI/ML Specialization", "Smart India Hackathon", "Team Lead"],
  },
  {
    degree: "Senior Secondary (Class 12)",
    institution: "Sunbeam Bhagwanpur, Varanasi",
    year: "2023",
    gpa: "74%",
    highlights: [],
  },
  {
    degree: "Higher Secondary (Class 10)",
    institution: "Sunbeam School Bhagwanpur, Varanasi",
    year: "2021",
    gpa: "87%",
    highlights: [],
  },
];

export const projects = [
  {
    id: 1,
    title: "Fake News Detection using AI",
    description:
      "Built a fake news detection model using TF-IDF and Logistic Regression achieving 92% accuracy on a 90,000 dataset. Deployed the model using a Flask-based web application.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "Logistic Regression", "Flask"],
    category: "ML",
    github: "https://github.com/Astrio12345/Fake-News-Detection",
    live: "",
    featured: true,
  },
  {
    id: 2,
    title: "Taxi V3 using Reinforcement Learning",
    description:
      "Developed a grid-world simulation to find optimal navigation paths using reinforcement learning. Implemented reward-based learning with a GUI interface using Tkinter.",
    tech: ["Python", "Gymnasium", "Q-Learning", "Tkinter"],
    category: "RL",
    github: "https://github.com/Astrio12345/TaxiV3",
    live: "",
    featured: true,
  },
  {
    id: 3,
    title: "Language Agnostic Chatbot",
    description:
      "Built a multilingual chatbot supporting multiple Indian languages using embeddings and RAG. Enabled context-aware conversations with dynamic document ingestion.",
    tech: ["Python", "IndicBERT", "MuRIL", "XLM-R", "LLaMA", "Flask", "Oracle DB", "RAG"],
    category: "NLP",
    github: "https://github.com/Astrio12345/Language-Agnostic-Chatbot",
    live: "",
    featured: true,
  },
];

export const skills = {
  "Languages": ["Java", "Python"],
  "Core Concepts": [
    "Machine Learning",
    "Natural Language Processing",
    "Reinforcement Learning",
    "RAG",
  ],
  "Frameworks & Libraries": [
    "Scikit-learn",
    "Flask",
    "Gymnasium",
    "Transformers",
    "IndicBERT",
    "MuRIL",
    "XLM-R",
    "Tkinter",
  ],
  "Web Development": [
    "REST APIs",
    "Backend Development (Flask)",
    "HTML",
    "CSS",
  ],
  "Databases": ["MySQL", "Oracle"],
  "Tools & Platforms": ["Git", "GitHub", "Postman", "N8N", "PyCharm", "IntelliJ"],
};

export const certifications = [
  "Microsoft Azure Workshop",
  "Cisco Networking",
  "Machine Learning Course (Coursera)",
  "Agentic AI Workshop",
];

export const leadership = [
  "Team Lead, Smart India Hackathon (Language Agnostic Chatbot)",
  "Participated and led teams across multiple hackathons",
];

export const funFacts = [
  { icon: "💻", label: "GitHub Contributions", value: "800+" },
  { icon: "🧩", label: "LeetCode Problems", value: "350+" },
  { icon: "🏆", label: "Hackathons Led", value: "SIH" },
  { icon: "🤖", label: "AI Projects Built", value: "3+" },
];
