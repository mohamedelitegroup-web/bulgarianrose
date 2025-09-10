"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface Dictionary {
  navigation: {
    home: string;
    products: string;
    categories: string;
    about: string;
  };
}

export function NavbarLinks({ lang }: { lang: "en" | "ar" }) {
  const pathname = usePathname();
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

  const links = [
    {
      id: 0,
      name: dict.navigation.home,
      href: `/${lang}`,
    },
    {
      id: 1,
      name: dict.navigation.products,
      href: `/${lang}/products/all`,
    },
    {
      id: 2,
      name: dict.navigation.categories,
      href: `/${lang}/categories`,
    },
  ];

  return (
    <div className="flex items-center gap-x-8">
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            "text-gray-600 hover:text-rose-600 transition-colors duration-200 font-medium",
            pathname === link.href && "text-rose-600 font-semibold"
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
}