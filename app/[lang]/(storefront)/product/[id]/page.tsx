import { notFound } from "next/navigation";
import prisma from "@/app/lib/db";
import { ProductDetails } from "./components/ProductDetails";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      category: true,
      name_ar: true,
      description_ar: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params,
}: {
  params: { id: string; lang: "en" | "ar" };
}) {
  const data = await getData(params.id);

  return <ProductDetails product={data} lang={params.lang} />;
}