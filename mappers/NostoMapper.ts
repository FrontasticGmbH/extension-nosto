import { Money } from '@Types/product/Money';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { Category } from '@Types/product/Category';
import { NostoProduct } from '../interfaces/NostoProduct';

export class NostoMapper {
  private static mapToVariants(recommendedProduct: NostoProduct, price: Money): Variant[] {
    const variants: Variant[] = [];
    const variant: Variant = {
      sku: recommendedProduct?.productId,
      price: price,
      images: [recommendedProduct?.imageUrl],
    };
    variants.push(variant);
    return variants;
  }

  private static mapToCategories(recommendedProduct: NostoProduct): Category[] {
    const categories: Category[] = [];
    const categoriesText: string[] = recommendedProduct?.categories;
    categoriesText.forEach((categoryName) => {
      const category: Category = {
        name: categoryName,
      };
      categories.push(category);
    });
    return categories;
  }

  static mapNostoResponseToProducts(recommendedProducts: NostoProduct[]): Product[] {
    const products: Product[] = [];

    recommendedProducts.forEach((recommendedProduct: NostoProduct) => {
      const price: Money = {
        fractionDigits: 0,
        centAmount: recommendedProduct?.listPrice,
      };
      const variants: Variant[] = this.mapToVariants(recommendedProduct, price);
      const categories: Category[] = this.mapToCategories(recommendedProduct);
      const product: Product = {
        name: recommendedProduct?.name,
        categories,
        variants,
        _url: 'https://commercetools.com',
      };
      products.push(product);
    });
    return products;
  }
}
