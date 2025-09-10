"use client";

import { useEffect, useState } from "react";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Product } from "@/app/lib/interfaces";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function FeaturedProducts() {
  const { dictionary, isRtl } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (!dictionary) return null;

  if (loading) {
    return <LoadingSection />;
  }

  if (featuredProducts.length === 0) return null;

  return (
    <section className="space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          Handpicked for You
        </div>
        
        <h2 className="text-6xl font-black text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            FEATURED
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            COLLECTION
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
          Discover our most popular items, carefully selected for their exceptional quality and design
        </p>

        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group">
          View All Products
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
            <ProductCard data={product} />
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
        <div className="h-12 bg-white/10 rounded-full w-48 mx-auto mb-8 animate-pulse" />
        <div className="h-16 bg-white/10 rounded-2xl w-96 mx-auto mb-6 animate-pulse" />
        <div className="h-6 bg-white/10 rounded-xl w-64 mx-auto mb-12 animate-pulse" />
        <div className="h-12 bg-white/10 rounded-2xl w-40 mx-auto animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </section>
  );
}