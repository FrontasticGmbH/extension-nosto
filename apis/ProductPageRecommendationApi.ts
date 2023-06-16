// @ts-ignore

import BaseApi from './BaseApi';
import { NostoMapper } from '../mappers/NostoMapper';
import { Product } from '@Types/product/Product';

export default class ProductPageRecommendationApi extends BaseApi {
  async fetchRecommendation(target: string) {
    const sessionId = this.getSessionId();
    console.log('############# Get Session from Product Page Recommendation ##############');
    console.log(sessionId);
    console.log(target);
    const body = `mutation {
      updateSession(by: BY_CID, id: "${sessionId}",
        params: {
          event: {
            type: VIEWED_PRODUCT
            target: "${target}"
            ref: "front-page-slot-1"
          }
        }
      ) {
        pages {
          forProductPage(params: {
            isPreview: false, imageVersion:  VERSION_8_400_400
          }, product: "${target}") {
            divId
            resultId
            primary {
              productId
              name
              listPrice
              imageUrl
              categories
            }
          }
        }
      }
    }`;
    const recommendationResult = await this.fetch(body);

    console.log('################ recommendationResult ################## ');
    console.log(recommendationResult);
    const recommendedProducts: Product[] = NostoMapper.mapNostoResponseToProducts(recommendationResult);

    return recommendedProducts;
  }
}
