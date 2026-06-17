import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, CheckCircle } from 'lucide-react';
import { projects } from '@/data/projects';

// Statically generate parameters for dynamic paths
export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetail({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-gray-400 mb-8">The project you are looking for doesn't exist.</p>
        <Link
          href="/"
          className="bg-accent hover:bg-accent/80 text-white px-6 py-3 rounded-full font-bold transition-all"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Link */}
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-accent font-semibold mb-8 group transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">{project.title}</h1>

        {/* Project Tags */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-accent/10 text-accent font-semibold px-3.5 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Hero Banner Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl mb-12 bg-zinc-900">
          <Image
            alt={project.title}
            src={project.image}
            className="object-cover"
            fill
            priority
          />
        </div>

        {/* Grid: Description and Action Links */}
        <div className="grid md:grid-cols-3 gap-12">

          {/* Main Details */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 text-white">Overview</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{project.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 text-white">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar: Links and Tech Details */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="font-bold text-lg mb-2 text-white">Project Actions</h3>

              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-accent hover:bg-accent/80 text-white py-3.5 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/10 text-sm"
              >
                Live Demo <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 text-white py-3.5 px-4 rounded-xl font-bold border border-white/10 transition-all flex items-center justify-center gap-2 text-sm"
              >
                GitHub Code <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
