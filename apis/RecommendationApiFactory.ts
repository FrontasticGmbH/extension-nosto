// @ts-ignore
import ProductPageRecommendationApi from './ProductPageRecommendationApi';
import CategoryPageRecommendationApi from './CategoryPageRecommendationApi';
import SearchPageRecommendationApi from './SearchPageRecommendationApi';
import CartPageRecommendationApi from './CartPageRecommendationApi';
import FrontPageRecommendationApi from './FrontPageRecommendationApi';
import BaseApi from './BaseApi';

import { Context } from '@frontastic/extension-types';
import { ValidationError } from '../utils/Errors';

export default class RecommendationApiFactory {
  public static getInstance(frontasticContext: Context, nostoSessionId: string, pageType: string): BaseApi {
    if (pageType === 'PRODUCT') return new ProductPageRecommendationApi(frontasticContext, nostoSessionId);
    else if (pageType === 'CATEGORY') return new CategoryPageRecommendationApi(frontasticContext, nostoSessionId);
    else if (pageType === 'SEARCH') return new SearchPageRecommendationApi(frontasticContext, nostoSessionId);
    else if (pageType === 'CART') return new CartPageRecommendationApi(frontasticContext, nostoSessionId);
    else if (pageType === 'FRONT') return new FrontPageRecommendationApi(frontasticContext, nostoSessionId);
    else
      throw new ValidationError({
        message: `pageType is not valid. ${pageType} is not included within [PRODUCT, CATEGORY, SEARCH, CART, FRONT]`,
      });
  }
}
