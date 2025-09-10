import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { locales, defaultLocale } from "@/middleware";

export async function GET(request: Request) {
  noStore();
  
  try {
    // الحصول على الجلسة الخاصة بالمستخدم
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      // التعامل مع الحالة إذا لم يتم العثور على المستخدم
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // البحث عن المستخدم في قاعدة البيانات
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    // إذا لم يتم العثور على المستخدم في قاعدة البيانات، نقوم بإنشاء مستخدم جديد
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          firstName: user.given_name ?? "",
          lastName: user.family_name ?? "",
          email: user.email ?? "",
          profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        },
      });
    }

    // تحديد اللغة المفضلة للمستخدم بناءً على الإعدادات في المتصفح
    const acceptLanguage = request.headers.get("accept-language") || "";
    const userLocale = acceptLanguage.split(",")[0].split("-")[0];
    const locale = locales.includes(userLocale as any) ? userLocale : defaultLocale;

    // إعادة التوجيه إلى الصفحة الخاصة بالمتصفح بناءً على اللغة المفضلة
    return NextResponse.redirect(
      process.env.NODE_ENV === "development"
        ? `http://localhost:3000/${locale}`
        : `https://shoe-marshal.vercel.app/${locale}`,
    );
  } catch (error) {
    // معالجة الأخطاء المحتملة
    console.error("Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
