export async function Footer({ lang }: { lang: "en" | "ar" }) {
  const isRtl = lang === "ar"

  return (
    <footer className={`mt-20 ${isRtl ? 'rtl' : ''}`}>
      <div className="bg-white/60 backdrop-blur-sm border-t border-rose-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">B</span>
              </div>
              <span className="font-black text-xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                BULGARIAN ROSE
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">
              {lang === "en" 
                ? "Premium Bulgarian Rose beauty products for your natural glow"
                : "منتجات الجمال الفاخرة من الورد البلغاري لإشراقتك الطبيعية"
              }
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
              <span>✓ {lang === "en" ? "Natural Ingredients" : "مكونات طبيعية"}</span>
              <span>✓ {lang === "en" ? "Cruelty Free" : "خالي من القسوة"}</span>
              <span>✓ {lang === "en" ? "Premium Quality" : "جودة فاخرة"}</span>
            </div>
            
            <div className="border-t border-rose-100 pt-6">
              <p className="text-sm text-gray-500">
                &copy; 2024 Bulgarian Rose. {lang === "en" ? "All Rights Reserved." : "جميع الحقوق محفوظة."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

