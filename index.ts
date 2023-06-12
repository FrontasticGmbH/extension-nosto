import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import { Product } from '@Types/product/Product';
import { ValidationError } from './utils/Errors';
import RecommendationApi from './apis/RecommendationApi';

export default {
  'data-sources': {
    'nosto/product-recommendations': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      console.log('##############################');
      console.log('nosto/product-recommendations');
      if (!context.hasOwnProperty('request')) {
        throw new ValidationError({
          message: `Request is not defined in context ${context}`,
        });
      }

      const userId: string = context.request?.clientIp;
      if (!userId) {
        throw new ValidationError({
          message: `Client IP is not defined in context request ${context.request}`,
        });
      }
      console.log('$$$$$$$$$$$ ready to new RecommendationApi $$$$$$$$$$$$$');
      const recommendApi: RecommendationApi = new RecommendationApi(context.frontasticContext);
      console.log(recommendApi.getSessionId());
      if (recommendApi && !recommendApi.getSessionId()) {
        console.log('####### create session ######');
        await recommendApi.createSession();
      }
      console.log(recommendApi.getSessionId());
      // const dyApi: DynamicYieldApi = new DynamicYieldApi(context.frontasticContext, userId);

      const items: Product[] = []; //await dyApi.choose(dyContext, selector);
      return {
        dataSourcePayload: { items },
      };
    },
  },
} as ExtensionRegistry;
