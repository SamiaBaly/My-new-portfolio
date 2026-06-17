"use client";

import { motion } from "framer-motion";

const timelineItems = [
  {
    period: "2016-2022",
    role: "BSC",
    company: "Barishal BM college",
    description:
      "Bachelor of Social Science degree in Economics from Government BM College, Barishal...",
  },
  {
    period: "2016",
    role: "HSC",
    company: "Muladi Govt. college, Barishal",
    description:
      "Successfully passed Higher Secondary Certificate (HSC)...",
  },
  {
    period: "2014",
    role: "SSC",
    company: "Muladi MJ High School, Muladi, Barishal",
    description:
      "Successfully passed Secondary School Certificate (SSC)...",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Experience() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-center mb-16"
        >
          Education <span className="text-accent">Qualification</span>
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative border-l-2 border-accent/20 ml-4 lg:ml-0 space-y-12"
        >
          {timelineItems.map((t, i) => (
            <motion.div key={i} variants={item} className="relative pl-8 group">

              {/* Dot */}
              <div className="absolute -left-2.5 top-0 w-5 h-5 bg-accent rounded-full ring-4 ring-zinc-900 group-hover:scale-125 transition-transform duration-300" />

              {/* Card */}
              <div className="glass-card p-8 rounded-2xl group-hover:border-accent transition-all duration-300">
                <span className="text-accent text-sm font-bold">
                  {t.period}
                </span>

                <h3 className="text-xl font-bold mt-2 text-white">
                  {t.role} -{" "}
                  <span className="text-gray-300">{t.company}</span>
                </h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {t.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}