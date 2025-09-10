"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Dictionary } from "@/app/[lang]/dictionaries"

type FilterProps = {
  categories: string[]
  onFilterChange: (category: string) => void
  lang: "en" | "ar"
  dict: Dictionary
}

export function ProductFilter({ categories, onFilterChange, lang, dict }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState("all")
  const isRtl = lang === "ar"

  const handleFilterClick = (category: string) => {
    setActiveFilter(category)
    onFilterChange(category)
  }

  const getCategoryName = (category: string) => {
    if (category === "all") return dict.categories.all
    if (category === "cosmetics") return dict.categories.cosmetics
    if (category === "perfume") return dict.categories.perfume
    if (category === "beauty") return dict.categories.beauty
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  return (
    <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isRtl ? "flex-row-reverse" : ""}`}>
      {categories.map((category) => (
        <motion.button
          key={category}
          className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 border-2 ${
            activeFilter === category 
              ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white border-rose-500 shadow-lg" 
              : "bg-white/80 backdrop-blur-sm text-gray-700 border-rose-200 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700"
          }`}
          onClick={() => handleFilterClick(category)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {getCategoryName(category)}
        </motion.button>
      ))}
    </div>
  )
}

