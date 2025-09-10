"use client";

import Image from "next/image";
import Link from "next/link";
import all from "@/public/all.jpeg";
import men from "@/public/men.jpeg";
import women from "@/public/women.jpeg";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function CategoriesSelection() {
  const { dictionary, isRtl } = useLanguage();

  if (!dictionary) return null;

  const categories = [
    {
      name: dictionary.categories.all,
      href: "/products/all",
      image: all,
      description: "Complete Collection",
      gradient: "from-purple-500/80 to-pink-500/80"
    },
    {
      name: dictionary.categories.cosmetics,
      href: "/products/cosmetics",
      image: men,
      description: "Beauty & Care",
      gradient: "from-blue-500/80 to-cyan-500/80"
    },
    {
      name: dictionary.categories.perfume,
      href: "/products/perfume",
      image: women,
      description: "Luxury Fragrances",
      gradient: "from-green-500/80 to-emerald-500/80"
    }
  ];

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <Zap className="w-4 h-4" />
          Explore Categories
        </div>
        
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            SHOP BY
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            CATEGORY
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
          Find exactly what you're looking for in our carefully curated collections
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-white/20"
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
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-2xl group-hover:scale-105 transition-all duration-300"
                  >
                    Explore Now
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