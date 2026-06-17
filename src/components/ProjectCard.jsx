import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Eye } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden glass-card flex flex-col justify-between hover:border-accent transition-all duration-300">
      {/* Image Container with zoom scale hover */}
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
        <Image 
          alt={project.title} 
          className="object-cover transition-transform duration-500 group-hover:scale-110" 
          src={project.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag, tIndex) => (
              <span key={tIndex} className="text-xs bg-accent/10 text-accent font-semibold px-2.5 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-6 line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex items-center gap-6 mt-4">
          <a 
            className="text-accent font-bold inline-flex items-center gap-1 hover:underline transition-transform duration-300 w-fit text-sm" 
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" />
          </a>
          
          <Link 
            className="text-white hover:text-accent font-bold inline-flex items-center gap-1.5 transition-colors duration-300 w-fit text-sm" 
            href={`/projects/${project.id}`}
          >
            View Details <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
