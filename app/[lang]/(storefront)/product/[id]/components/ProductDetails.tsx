"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Shield, Truck, RotateCcw } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { addItem } from "@/app/actions";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  images: string[];
  category: string;
}

interface Dictionary {
  product: {
    price: string;
    freeShipping: string;
    inStock: string;
    addToCart: string;
    buyNow: string;
    description: string;
    features: string;
    shipping: string;
    returns: string;
    warranty: string;
  };
}

export function ProductDetails({ product, lang }: { product: Product; lang: "en" | "ar" }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [dict, setDict] = useState<Dictionary | null>(null);
  const isRtl = lang === "ar";

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dictionary = await import(`@/app/[lang]/dictionaries/${lang}.json`);
        setDict(dictionary.default);
      } catch (error) {
        console.error("Failed to load dictionary:", error);
      }
    };
    loadDictionary();
  }, [lang]);



  if (!dict) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found</p>
        </div>
      </div>
    );
  }

  const addProductToCart = addItem.bind(null, product.id);

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20", isRtl ? "rtl" : "")}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div 
              className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-2xl cursor-zoom-in"
              onClick={() => setShowImageModal(true)}
            >
              <Image
                fill
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-cover hover:scale-105 transition-transform duration-300"
                unoptimized={!product.images[selectedImage].startsWith('https://utfs.io')}
              />
              
              <div className="absolute top-6 left-6">
                <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 px-4 py-2">
                  Bulgarian Rose
                </Badge>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 hover:bg-white shadow-lg ${isLiked ? 'text-rose-500' : 'text-gray-600'}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0",
                    selectedImage === index 
                      ? "border-rose-500 shadow-lg" 
                      : "border-gray-200 hover:border-rose-300"
                  )}
                >
                  <Image
                    fill
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover"
                    unoptimized={!image.startsWith('https://utfs.io')}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="border-rose-200 text-rose-600 bg-rose-50">
                {product.category}
              </Badge>
              
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {isRtl && product.name_ar ? product.name_ar : product.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-rose-400 text-rose-400" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8)</span>
              </div>

              <div className="text-6xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {dict.product.price}{product.price}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">{dict.product.description}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {isRtl && product.description_ar ? product.description_ar : product.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: dict.product.shipping },
                { icon: RotateCcw, label: dict.product.returns },
                { icon: Shield, label: dict.product.warranty }
              ].map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 text-center shadow-lg border border-rose-100">
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-rose-500" />
                  <div className="text-sm text-gray-600">{feature.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <form action={addProductToCart} className="flex-1">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-6 text-lg font-semibold rounded-2xl shadow-xl"
                  >
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    {dict.product.addToCart}
                  </Button>
                </form>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-rose-300 text-rose-600 hover:bg-rose-50 py-6 px-8 text-lg rounded-2xl"
                >
                  {dict.product.buyNow}
                </Button>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-green-600 text-sm font-medium">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {dict.product.inStock}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-rose-100">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">{dict.product.features}</h3>
              <div className="grid grid-cols-1 gap-3 text-gray-700">
                <div>• Natural Bulgarian Rose Extract</div>
                <div>• Dermatologically Tested</div>
                <div>• Cruelty-Free & Vegan</div>
                <div>• Premium Quality Ingredients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-rose-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[80vh] bg-white rounded-2xl overflow-hidden">
              <Image
                fill
                src={product.images[selectedImage]}
                alt={product.name}
                className="object-contain"
                unoptimized={!product.images[selectedImage].startsWith('https://utfs.io')}
                sizes="90vw"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      selectedImage === index ? 'bg-rose-500 scale-125' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}