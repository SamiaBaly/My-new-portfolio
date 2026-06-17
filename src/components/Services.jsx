import { IoLogoJavascript } from 'react-icons/io5';
import { FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiExpress, SiMongodb } from 'react-icons/si';


const services = [
  {
    title: "JavaScript",
    icon: IoLogoJavascript,
  },
  {
    title: "React.Js",
    icon: FaReact,
  },
  {
    title: "Next.Js",
    icon: SiNextdotjs,
  },
  {
    title: "Express.Js",
    icon: SiExpress,
  },
  {
    title: "MongoDB",
    icon: SiMongodb,
  },
];

export default function Services() {
  return (
    <section className="py-24" data-purpose="what-i-do" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Tech <span className="text-accent">Stack</span></h2>
          <div className="w-60 h-1 bg-accent mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="glass-card p-8 text-center rounded-2xl group cursor-pointer">
                <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
