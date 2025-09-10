"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDictionary, type Dictionary } from "@/app/[lang]/dictionaries";

export function LandingHeader({ lang }: { lang: "en" | "ar" }) {
  const [dict, setDict] = useState<Dictionary | null>(null);
  const isRtl = lang === "ar";

  useEffect(() => {
    const loadDictionary = async () => {
      const dictionary = await getDictionary(lang);
      setDict(dictionary);
    };
    loadDictionary();
  }, [lang]);

  if (!dict) return null;

  return (
    <div className={`py-20 max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
      <motion.div
        className="flex-1 text-center lg:text-left space-y-8"
        initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-rose-200 text-rose-600 text-sm font-medium backdrop-blur-sm">
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
          Premium Bulgarian Rose
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
          {dict.landing.discover}
          <br />
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {dict.landing.wonders}
          </span>
        </h1>
        
        <p className="text-xl text-gray-700 max-w-2xl font-light leading-relaxed">
          {dict.landing.youWill} <span className="font-semibold text-rose-600">{dict.landing.fallInLove}</span> {dict.landing.with}
        </p>
        
        <div className="flex items-center gap-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
            <span>Natural Ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
            <span>Cruelty Free</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
            <span>Premium Quality</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex-1 relative"
        initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative w-full max-w-lg mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-3xl transform rotate-3 opacity-20"></div>
          <div className="relative bg-white rounded-3xl p-2 shadow-2xl border border-rose-100">
            <img
              src="https://i.ibb.co/8JHpVj9/e79d5d0e-3421-4a1a-aafb-8e1714d78152.jpg"
              alt="Bulgarian Rose Products"
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
