// @ts-ignore
import fetch from 'node-fetch';
import { Context } from '@frontastic/extension-types';
import { Product } from '@Types/product/Product';

export default abstract class BaseApi {
  private graphqlQueryFields = `{
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
  }`;
  private graphqlQueryImageVersion = `VERSION_8_400_400`;
  private sessionId: string;
  private apiToken: string;
  private apiUrl: string;
  constructor(frontasticContext: Context, nostoSessionId: string) {
    const configuration = frontasticContext.project.configuration;
    this.apiToken = configuration?.nosto?.apiToken;
    this.apiUrl = configuration?.nosto?.apiUrl;
    this.sessionId = nostoSessionId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public abstract fetchRecommendation(target: string, placementId: string): Promise<Product[]>;

  protected getQueryFields() {
    return this.graphqlQueryFields;
  }

  protected getQueryImageVersion() {
    return this.graphqlQueryImageVersion;
  }

  protected fetch(body: string) {
    const headers = {
      'Content-Type': 'application/graphql',
      Authorization: 'Basic ' + Buffer.from(`:${this.apiToken}`).toString('base64'),
    };
    try {
      const responseJson = fetch(this.apiUrl, {
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
