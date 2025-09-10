"use client";

import { useEffect, useState } from "react";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import type { Product } from "@/app/lib/interfaces";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface Dictionary {
  featured: {
    badge: string;
    title1: string;
    title2: string;
    description: string;
    viewAll: string;
  };
}

export function FeaturedProducts({ lang }: { lang: "en" | "ar" }) {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products/featured");
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!dict) return null;

  if (loading) {
    return <LoadingSection />;
  }

  if (featuredProducts.length === 0) return null;

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-rose-200 text-rose-600 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          {dict.featured.badge}
        </div>
        
        <h2 className="text-6xl font-black text-gray-900 mb-6 tracking-tight">
          <span className="text-gray-900">
            {dict.featured.title1}
          </span>
          <br />
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            {dict.featured.title2}
          </span>
        </h2>
        
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-light">
          {dict.featured.description}
        </p>

        <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl transition-all duration-300 group">
          {dict.featured.viewAll}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className="opacity-0 animate-fade-in"
            style={{ 
              animationDelay: `${index * 150}ms`, 
              animationFillMode: 'forwards',
              animationDuration: '0.8s'
            }}
          >
            <ProductCard data={product} lang={lang} />
          </div>
        ))}
      </div>
    </section>
  );
}

function LoadingSection() {
  return (
    <section className="space-y-16">
      <div className="text-center">
        <div className="h-12 bg-rose-100 rounded-full w-48 mx-auto mb-8 animate-pulse" />
        <div className="h-16 bg-rose-100 rounded-2xl w-96 mx-auto mb-6 animate-pulse" />
        <div className="h-6 bg-rose-100 rounded-xl w-64 mx-auto mb-12 animate-pulse" />
        <div className="h-12 bg-rose-100 rounded-2xl w-40 mx-auto animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </section>
  );
}