import prisma from "@/app/lib/db";
import { ProductList } from "@/app/[lang]/(storefront)/components/ProductList";

async function getData() {
  const data = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      name_ar: true,
      description: true,
      description_ar: true,
      images: true,
      price: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function CategoriesPage({
  params,
}: {
  params: { lang: "en" | "ar" };
}) {
  const data = await getData();
  const isRtl = params.lang === "ar";

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 pt-20 ${isRtl ? 'rtl' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-rose-200 mb-6">
            <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
            <span className="text-rose-600 font-medium text-sm">
              {params.lang === "ar" ? "منتجات فاخرة" : "Premium Collection"}
            </span>
          </div>
          
          <h1 className="text-6xl font-black text-gray-900 mb-6 leading-tight">
            {params.lang === "ar" ? (
              <>
                جميع <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">المنتجات</span>
              </>
            ) : (
              <>
                All <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Products</span>
              </>
            )}
          </h1>
          
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            {params.lang === "ar" 
              ? "اكتشف مجموعتنا الكاملة من منتجات الورد البلغاري الفاخرة المصنوعة من أجود المكونات الطبيعية"
              : "Discover our complete collection of premium Bulgarian Rose products crafted with the finest natural ingredients"
            }
          </p>
          
          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
              <span>{params.lang === "ar" ? "مكونات طبيعية" : "Natural Ingredients"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
              <span>{params.lang === "ar" ? "خالي من القسوة" : "Cruelty Free"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-rose-400 rounded-full"></div>
              <span>{params.lang === "ar" ? "جودة فاخرة" : "Premium Quality"}</span>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <ProductList initialProducts={data} lang={params.lang} />
        
        {/* Bottom CTA */}
        <div className="text-center mt-20 bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-rose-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {params.lang === "ar" ? "تسوق بثقة" : "Shop with Confidence"}
          </h3>
          <p className="text-gray-600 mb-6">
            {params.lang === "ar" 
              ? "شحن مجاني للطلبات فوق 100 دولار • إرجاع مجاني لمدة 30 يوم"
              : "Free shipping on orders over $100 • 30-day free returns"
            }
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-rose-600">
            <span>✓ {params.lang === "ar" ? "ضمان الجودة" : "Quality Guarantee"}</span>
            <span>✓ {params.lang === "ar" ? "دعم 24/7" : "24/7 Support"}</span>
            <span>✓ {params.lang === "ar" ? "دفع آمن" : "Secure Payment"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}