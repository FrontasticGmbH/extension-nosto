import { Money } from '@Types/product/Money';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { Category } from '@Types/product/Category';
import { NostoProduct } from '../interfaces/NostoProduct';

export class NostoMapper {
  private static mapToVariant(recommendedProduct: NostoProduct, price: Money): Variant {
    const variant: Variant = {
      sku: recommendedProduct?.productId,
      price: price,
      images: [recommendedProduct?.imageUrl],
    };
    return variant;
  }

  private static mapToCategories(recommendedProduct: NostoProduct): Category[] {
    const categories: Category[] = recommendedProduct?.categories.map((categoryName) => {
      const category: Category = {
        name: categoryName,
      };
      return category;
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
      const variant: Variant = this.mapToVariant(recommendedProduct, price);
      const categories: Category[] = this.mapToCategories(recommendedProduct);
      const product: Product = {
        name: recommendedProduct?.name,
        categories,
        variants: [variant],
        _url: 'https://commercetools.com',
      };
      products.push(product);
    });
    return products;
  }
}
