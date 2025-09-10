"use client";

import { CategoriesSelection } from "./components/CategorySelection";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Dictionary {
  hero: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    startShopping: string;
    watchDemo: string;
  };
  stats: {
    activeUsers: string;
    products: string;
    uptime: string;
    support: string;
  };
}

export default function IndexPage({ params }: { params: { lang: "en" | "ar" } }) {
  const [dict, setDict] = useState<Dictionary | null>(null);
  const isRtl = params.lang === "ar";

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`../dictionaries/${params.lang}.json`);
        setDict(dictionary.default);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };
    loadDictionary();
  }, [params.lang]);

  if (!dict) return <div className="min-h-screen bg-black" />;

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-rose-50 to-pink-50", isRtl ? "rtl" : "")}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 to-pink-100/50" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-rose-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-300/30 to-rose-300/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-rose-200 text-rose-600 text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            {dict.hero.badge}
          </div>
          
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {dict.hero.title1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              {dict.hero.title2}
            </span>
          </h1>
          
          <p className="text-2xl text-gray-700 mb-12 max-w-3xl mx-auto font-light">
            {dict.hero.description}
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 px-8 py-6 text-lg font-semibold rounded-2xl shadow-2xl">
              <ShoppingBag className="mr-2 w-5 h-5" />
              {dict.hero.startShopping}
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className="relative -mt-32 z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: dict.stats.activeUsers, color: "from-rose-500 to-pink-500" },
              { number: "1000+", label: dict.stats.products, color: "from-pink-500 to-rose-500" },
              { number: "99.9%", label: dict.stats.uptime, color: "from-rose-600 to-pink-600" },
              { number: "24/7", label: dict.stats.support, color: "from-pink-600 to-rose-600" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-xl border border-rose-100 rounded-3xl p-6 text-center hover:bg-white transition-all duration-300 shadow-xl">
                <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="py-32 space-y-32 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <FeaturedProducts lang={params.lang} />
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <CategoriesSelection lang={params.lang} />
        </div>
      </div>
    </div>
  );
}