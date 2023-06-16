// @ts-ignore
import ProductPageRecommendationApi from './ProductPageRecommendationApi';
import BaseApi from './BaseApi';

export default class RecommendationApiFactory {
  public static getInstance(frontasticContext: Context, pageType: string): BaseApi {
    if (pageType === 'PRODUCT') return new ProductPageRecommendationApi(frontasticContext);
  }
}
