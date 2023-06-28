import BaseApi from './BaseApi';
import { NostoMapper } from '../mappers/NostoMapper';
import { Product } from '@Types/product/Product';
import { Recommendations } from '../interfaces/Recommendations';
import { NostoProduct } from '../interfaces/NostoProduct';

export default class SearchPageRecommendationApi extends BaseApi {
  async fetchRecommendation(target: string, placementId: string): Promise<Product[]> {
    const sessionId = this.getSessionId();
    const body = `mutation {
      updateSession(by: BY_CID, id: "${sessionId}",
        params: {
          event: {
            type: SEARCHED_FOR
            target: "${target}"
          }
        }
      ) {
        pages {
          forSearchPage(params: {
            isPreview: false, imageVersion:  VERSION_8_400_400
          }, term: "${target}") {
            divId
            resultId
            primary {
              productId
              name
              listPrice
              imageUrl
              categories
              url
            }
          }
        }
      }
    }`;
    const recommendationResult = await this.fetch(body);
    const placementList: Recommendations[] = recommendationResult?.data?.updateSession?.pages?.forSearchPage;
    const recommendations: Recommendations = placementList.filter((obj) => obj?.resultId == placementId)[0];
    const recommendedProducts: NostoProduct[] = recommendations?.primary;
    const mappedProducts: Product[] = NostoMapper.mapNostoResponseToProducts(recommendedProducts);
    return mappedProducts;
  }
}
