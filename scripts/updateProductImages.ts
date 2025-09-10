import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const imageMapping: { [key: string]: string[] } = {
  'CLEANSING MILK': ['/products/LJ Cleansing Milk.jpg', '/products/cleansing_milk.jpg'],
  'EXFOLIANT': ['/products/LUXURY Exfoilant.jpg', '/products/exfolaite_mask_stuff_.jpg'],
  'HYDRATION': ['/products/Luxury 24 Hydration.jpg', '/products/Hydration cream.jpg'],
  'ANTI-AGING': ['/products/Luxury Anti Aging.jpg'],
  'FACE SERUM': ['/products/Luxury Face Serum.jpg'],
  'EYE SERUM': ['/products/Luxury Eye Serum.jpg'],
  'CLEANSING FACE GEL': ['/products/Cleansing Gel.jpg'],
  'REGENERATING CREAM': ['/products/Regenerating Cream.jpg'],
  'AQUA+ face mask': ['/products/aqua_mask_box.jpg'],
  'moisturizing tonic': ['/products/moisturizing_tonic.jpg'],
  'Q10 revitalizing': ['/products/rose_q10_revital_cream.jpg'],
  'night cream': ['/products/rose_night_cream.jpg'],
  'day cream': ['/products/rose_day_cream.jpg'],
  'body cream scrub': ['/products/body_cream_scrub.jpg'],
  'lip balm': ['/products/lip_balm.jpg'],
  'body butter': ['/products/roseoriginal_body-butter-.jpg'],
  'soap-sponge': ['/products/soap_sponge.jpg'],
  'hand cream': ['/products/hand_cream.jpg'],
  'HAIR MASK': ['/products/rose-joghurt-hair-mask.jpg'],
  'HAIR CONDITIONER': ['/products/rj_hair conditioner.jpg'],
  'nettle': ['/products/nettle oily hair_shampoo_stuff_1004015__pic1_1299476838.jpg'],
  'Anti dandruff': ['/products/Anti dandruff.jpg']
};

async function updateProductImages() {
  try {
    const products = await prisma.product.findMany();
    
    for (const product of products) {
      let images: string[] = [];
      
      // Find matching images based on product name
      for (const [key, paths] of Object.entries(imageMapping)) {
        if (product.name.toUpperCase().includes(key.toUpperCase())) {
          images = paths;
          break;
        }
      }
      
      // Default fallback images if no specific match
      if (images.length === 0) {
        images = ['/products/rose_day_cream.jpg'];
      }
      
      await prisma.product.update({
        where: { id: product.id },
        data: { images }
      });
      
      console.log(`Updated ${product.name} with images:`, images);
    }
    
    console.log('All products updated successfully!');
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProductImages();