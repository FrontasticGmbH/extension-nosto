// @ts-ignore
import fetch from 'node-fetch';
import { Context } from '@frontastic/extension-types';
import { Product } from '@Types/product/Product';

const apiUrl = 'https://api.nosto.com/v1/graphql';

export default abstract class BaseApi {
  private sessionId: string;
  private apiToken: string;
  constructor(frontasticContext: Context, nostoSessionId: string) {
    const configuration = frontasticContext.project.configuration;
    this.apiToken = configuration?.nosto?.apiToken;
    this.sessionId = nostoSessionId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public abstract fetchRecommendation(target: string, placementId: string): Promise<Product[]>;

  protected fetch(body: string) {
    const headers = {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + Buffer.from(`:${this.apiToken}`).toString('base64'),
    };
    try {
      const responseJson = fetch(apiUrl, {
        method: 'POST',
        body,
        headers,
        mode: 'cors',
      }).then((response: any) => {
        return response.json();
      });
      return responseJson;
    } catch (error) {
      throw error;
    }
  }
}
