import { DataSourceConfiguration, DataSourceContext, ExtensionRegistry } from '@frontastic/extension-types';
import { Product } from '@Types/product/Product';
import { ValidationError } from './utils/Errors';
import BaseApi from './apis/BaseApi';
import RecommendationApiFactory from './apis/RecommendationApiFactory';

export default {
  'data-sources': {
    'nosto/product-recommendations': async (config: DataSourceConfiguration, context: DataSourceContext) => {
      console.log('##############################');
      console.log('nosto/product-recommendations');

      validate(config, context);
      const target: string = context.request.query.target;
      const pageType: string = config.configuration.pageType;

      console.log('$$$$$$$$$$$ ready to new RecommendationApi $$$$$$$$$$$$$');
      const recommendApi: BaseApi = RecommendationApiFactory.getInstance(context.frontasticContext, pageType);
      console.log(recommendApi.getSessionId());
      if (recommendApi && !recommendApi.getSessionId()) {
        console.log('####### create session ######');
        await recommendApi.createSession();
      }
      console.log(recommendApi.getSessionId());

      const recommendedProducts: [] = await recommendApi.fetchRecommendation(target);
      console.log('######### recommendedProducts #########');
      console.log(recommendedProducts);
      return {
        dataSourcePayload: { recommendedProducts },
      };
    },
  },
} as ExtensionRegistry;

function validate(config: DataSourceConfiguration, context: DataSourceContext) {
  if (!context.hasOwnProperty('request')) {
    throw new ValidationError({
      message: `Request is not defined in context ${context}`,
    });
  }
  if (!config.hasOwnProperty('configuration')) {
    throw new ValidationError({
      message: `Configuration is not defined in data source configuration ${config}`,
    });
  }

  const target: string = context.request?.query?.target;
  const pageType: string = config.configuration?.pageType;

  if (!target) {
    throw new ValidationError({
      message: `target is not defined in context request ${context.request}`,
    });
  }
  if (!pageType) {
    throw new ValidationError({
      message: `pageType is not defined in data source configuration ${config.configuration}`,
    });
  }
}
