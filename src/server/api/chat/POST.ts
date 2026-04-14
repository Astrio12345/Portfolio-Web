import type { Request, Response } from 'express';

// ── Portfolio knowledge base ──────────────────────────────────────────────────
function generateResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|howdy|sup|what'?s up|greetings)/i.test(msg)) {
    return "Hey there! 👋 I'm Ayush's AI assistant. I can tell you about his skills, projects, education, or how to get in touch. What would you like to know?";
  }

  // Who are you / about the bot
  if (/who are you|what are you|are you (a bot|ai|human|real)/i.test(msg)) {
    return "I'm an AI assistant built into Ayush's portfolio. I can answer questions about his background, projects, skills, and more. Ask me anything!";
  }

  // Name
  if (/\b(name|who is|introduce|about ayush)\b/i.test(msg)) {
    return "Ayush Kumar Srivastava is an AI/ML engineer from Varanasi, India. He specializes in NLP, Reinforcement Learning, and RAG systems — passionate about building intelligent, production-ready applications.";
  }

  // Contact / hire
  if (/\b(contact|email|phone|reach|hire|available|opportunity|job|internship|freelance)\b/i.test(msg)) {
    return "Ayush is currently **open to opportunities** — full-time roles, internships, and freelance projects!\n\n📧 **Email:** ayush.vns1575@gmail.com\n📞 **Phone:** +91-6387860028\n💼 **LinkedIn:** linkedin.com/in/ayush-1575-vns\n\nFeel free to reach out directly!";
  }

  // Projects
  if (/\b(project|built|made|work|portfolio|fake news|taxi|chatbot|rl|reinforcement|nlp|language agnostic)\b/i.test(msg)) {
    if (/fake news/i.test(msg)) {
      return "**Fake News Detection** 🔍\n\nAyush built a fake news detection model using TF-IDF + Logistic Regression, achieving **92% accuracy** on a 90,000-sample dataset. It's deployed as a Flask web app.\n\n🔗 [View on GitHub](https://github.com/Astrio12345/Fake-News-Detection)";
    }
    if (/taxi|reinforcement|rl|q.?learn/i.test(msg)) {
      return "**Taxi V3 — Reinforcement Learning** 🚕\n\nA grid-world simulation where an agent learns optimal navigation using Q-Learning. Features a Tkinter GUI to visualize the agent's learning process.\n\n🔗 [View on GitHub](https://github.com/Astrio12345/TaxiV3)";
    }
    if (/chatbot|language|multilingual|rag|indian/i.test(msg)) {
      return "**Language Agnostic Chatbot** 🌐\n\nAyush's Smart India Hackathon project — a multilingual chatbot supporting multiple Indian languages using IndicBERT, MuRIL, XLM-R, and a RAG pipeline with LLaMA. Built with Flask and Oracle DB.\n\n🔗 [View on GitHub](https://github.com/Astrio12345/Language-Agnostic-Chatbot)";
    }
    return "Ayush has built **3 featured projects**:\n\n1. 🔍 **Fake News Detection** — 92% accuracy ML model (Python, Scikit-learn, Flask)\n2. 🚕 **Taxi V3 RL** — Q-Learning grid navigation agent (Python, Gymnasium)\n3. 🌐 **Language Agnostic Chatbot** — Multilingual RAG chatbot for SIH (IndicBERT, LLaMA, Flask)\n\nAsk me about any specific one!";
  }

  // Skills
  if (/\b(skill|tech|stack|language|know|expertise|proficient|tool|framework|library)\b/i.test(msg)) {
    if (/python|java/i.test(msg)) {
      return "Ayush's primary programming languages are **Python** and **Java**. Python is his go-to for all ML/AI work.";
    }
    if (/ml|machine learn/i.test(msg)) {
      return "In Machine Learning, Ayush works with **Scikit-learn, TF-IDF, Logistic Regression, Transformers, IndicBERT, MuRIL, XLM-R**, and more. He's built models achieving 92%+ accuracy.";
    }
    if (/rl|reinforcement/i.test(msg)) {
      return "For Reinforcement Learning, Ayush uses **Python, Gymnasium, and Q-Learning**. He built a Taxi V3 simulation as a hands-on RL project.";
    }
    if (/nlp|natural language/i.test(msg)) {
      return "Ayush's NLP stack includes **HuggingFace Transformers, IndicBERT, MuRIL, XLM-R, LLaMA, and RAG pipelines** — used in his multilingual chatbot project.";
    }
    return "Ayush's tech stack spans:\n\n🐍 **Languages:** Python, Java\n🧠 **AI/ML:** Scikit-learn, Transformers, IndicBERT, MuRIL, XLM-R, RAG\n⚙️ **RL:** Gymnasium, Q-Learning\n🌐 **Web:** Flask, REST APIs, HTML, CSS\n🗄️ **DB:** MySQL, Oracle\n🛠️ **Tools:** Git, Postman, N8N, PyCharm, IntelliJ";
  }

  // Education
  if (/\b(education|study|college|university|degree|school|gpa|grade|score|academic)\b/i.test(msg)) {
    return "**Education** 🎓\n\n- **B.Tech in AI & ML** — G L Bajaj Institute of Technology & Management (77% GPA)\n- **Class 12** — Sunbeam Bhagwanpur, Varanasi (74%, 2023)\n- **Class 10** — Sunbeam School Bhagwanpur, Varanasi (87%, 2021)\n\nHe's specializing in AI/ML and was Team Lead at Smart India Hackathon.";
  }

  // Certifications
  if (/\b(certif|course|coursera|azure|cisco|agentic)\b/i.test(msg)) {
    return "**Certifications** 📜\n\n- Microsoft Azure Workshop\n- Cisco Networking\n- Machine Learning Course (Coursera)\n- Agentic AI Workshop";
  }

  // GitHub / LeetCode / coding stats
  if (/\b(github|leetcode|coding|contribution|problem|competitive)\b/i.test(msg)) {
    return "Ayush is an active coder:\n\n💻 **GitHub:** 800+ contributions — [Astrio12345](https://github.com/Astrio12345)\n🧩 **LeetCode:** 350+ problems solved — [Ayush1575](https://leetcode.com/Ayush1575)";
  }

  // Hackathon / leadership
  if (/\b(hackathon|sih|smart india|lead|leadership|team)\b/i.test(msg)) {
    return "Ayush served as **Team Lead at Smart India Hackathon (SIH)**, where his team built the Language Agnostic Chatbot — a multilingual RAG-based chatbot supporting Indian languages. He has participated and led teams across multiple national-level hackathons.";
  }

  // Location
  if (/\b(location|where|city|country|based|from|live)\b/i.test(msg)) {
    return "Ayush is based in **Varanasi, India** 🇮🇳";
  }

  // Thanks / bye
  if (/\b(thanks|thank you|bye|goodbye|see you|great|awesome|cool)\b/i.test(msg)) {
    return "You're welcome! 😊 Feel free to ask anything else about Ayush, or reach out to him directly at ayush.vns1575@gmail.com. Have a great day!";
  }

  // Fallback
  return "I'm not sure about that specific detail. Here's what I can help with:\n\n- 🧑 **About Ayush** — background & bio\n- 🎓 **Education** — degrees & scores\n- 💼 **Projects** — Fake News Detection, Taxi RL, Chatbot\n- 🛠️ **Skills** — tech stack & tools\n- 📜 **Certifications**\n- 📬 **Contact** — how to reach him\n\nWhat would you like to know?";
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: Request, res: Response) {
  try {
    const { message } = req.body as { message?: string };

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 500) {
      return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }

    // Small thinking delay for realism
    await new Promise((r) => setTimeout(r, 300 + Math.random() * 400));

    const reply = generateResponse(message);

    return res.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
