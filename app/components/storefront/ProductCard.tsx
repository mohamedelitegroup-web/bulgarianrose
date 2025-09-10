"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Product } from "@/app/lib/interfaces";
import { addItem } from "@/app/actions";
import { useState } from "react";

interface ProductCardProps {
  data: Product;
}

export function ProductCard({ data }: ProductCardProps) {
  const { dictionary, isRtl } = useLanguage();
  const [isLiked, setIsLiked] = useState(false);

  if (!dictionary) return null;

  const addProducttoShoppingCart = addItem.bind(null, data.id);

  return (
    <Card className="group overflow-hidden border-0 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 rounded-3xl">
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-gradient-to-br from-purple-900/20 to-blue-900/20">
          <Link href={`/product/${data.id}`}>
            <Image
              fill
              src={data.images[0]}
              alt={data.name}
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              onError={(e) => console.error('Old ProductCard image failed to load:', data.images[0])}
              onLoad={() => console.log('Old ProductCard image loaded:', data.images[0])}
            />
          </Link>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Top Actions */}
          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white border-0 backdrop-blur-sm">
              {data.category}
            </Badge>
            <Button
              size="icon"
              variant="ghost"
              className={`w-10 h-10 rounded-2xl bg-black/20 backdrop-blur-sm hover:bg-black/40 border border-white/20 ${isLiked ? 'text-red-400' : 'text-white'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <Button variant="ghost" className="bg-black/20 backdrop-blur-sm hover:bg-black/40 text-white border border-white/20 rounded-2xl">
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <form action={addProducttoShoppingCart}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl shadow-lg">
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Link href={`/product/${data.id}`} className="block mb-3">
            <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-tight">
              {isRtl && data.name_ar ? data.name_ar : data.name}
            </h3>
          </Link>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
            {isRtl && data.description_ar ? data.description_ar : data.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ${data.price}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">(4.8)</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Free Shipping</div>
              <div className="text-xs text-green-400 font-medium">In Stock</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LoadingProductCard() {
  return (
    <Card className="overflow-hidden border-0 bg-white/5 backdrop-blur-xl rounded-3xl">
      <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse rounded-t-3xl" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-white/10 rounded-xl animate-pulse" />
        <div className="h-4 bg-white/10 rounded-lg w-3/4 animate-pulse" />
        <div className="h-8 bg-white/10 rounded-xl w-1/2 animate-pulse" />
      </div>
    </Card>
  );
}