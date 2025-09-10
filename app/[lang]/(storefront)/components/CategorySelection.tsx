"use client";

import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface Dictionary {
  categories: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    all: string;
    cosmetics: string;
    perfume: string;
    exploreNow: string;
  };
}

export function CategoriesSelection({ lang }: { lang: "en" | "ar" }) {
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`../../dictionaries/${lang}.json`);
        setDict(dictionary.default);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };
    loadDictionary();
  }, [lang]);

  if (!dict) return null;

  const categories = [
    {
      name: dict.categories.all,
      href: `/${lang}/categories`,
      image: all,
      description: "Complete Collection",
      gradient: "from-rose-500/80 to-pink-500/80"
    },
    {
      name: dict.categories.cosmetics,
      href: `/${lang}/categories`,
      image: men,
      description: "Beauty & Care",
      gradient: "from-pink-500/80 to-rose-500/80"
    },
    {
      name: dict.categories.perfume,
      href: `/${lang}/categories`,
      image: women,
      description: "Luxury Fragrances",
      gradient: "from-rose-600/80 to-pink-600/80"
    }
  ];

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-rose-200 text-rose-600 text-sm font-medium mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4" />
          {dict.categories.badge}
        </div>
        
        <h2 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
          <span className="text-gray-900">
            {dict.categories.title1}
          </span>
          <br />
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {dict.categories.title2}
          </span>
        </h2>
        
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-light">
          {dict.categories.description}
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative overflow-hidden rounded-3xl bg-white hover:shadow-2xl transition-all duration-500 border border-rose-100 hover:border-rose-200 shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="text-white">
                  <div className="text-sm font-medium text-white/80 mb-2">
                    {category.description}
                  </div>
                  <h3 className="text-3xl font-black mb-6 group-hover:text-white transition-colors">
                    {category.name}
                  </h3>
                  <Button 
                    className="bg-white/90 hover:bg-white text-gray-900 border border-gray-200 rounded-2xl group-hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    {dict.categories.exploreNow}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}