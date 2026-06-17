export default function Skills() {
  const frontendSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion"
  ];

  const backendSkills = [
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST API",
    "JWT",
    "Authentication"
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]" id="skills" data-purpose="skills-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">My <span className="text-accent">Skills</span></h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Frontend */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 hover:border-accent/40 shadow-xl hover:shadow-accent/5 transition-all duration-500 group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              Frontend
            </h3>
            <div className="flex flex-wrap gap-3">
              {frontendSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-white/5 hover:bg-accent/10 text-gray-300 hover:text-white border border-white/10 hover:border-accent/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 cursor-default shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Backend */}
          <div className="glass-card p-8 rounded-3xl border border-white/5 hover:border-accent/40 shadow-xl hover:shadow-accent/5 transition-all duration-500 group">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></span>
              Backend
            </h3>
            <div className="flex flex-wrap gap-3">
              {backendSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="bg-white/5 hover:bg-accent/10 text-gray-300 hover:text-white border border-white/10 hover:border-accent/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 cursor-default shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
