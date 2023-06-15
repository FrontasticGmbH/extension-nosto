// @ts-ignore
import fetch from 'node-fetch';
import { Context } from '@frontastic/extension-types';
import { Guid } from '@Commerce-commercetools/utils/Guid';

const apiUrl = 'https://api.nosto.com/v1/graphql';

export default abstract class BaseApi {
  private sessionId: string;
  private apiToken: string;
  constructor(frontasticContext: Context) {
    const configuration = frontasticContext.project.configuration;
    this.apiToken = configuration?.nosto?.apiToken;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public abstract fetchRecommendation();

  private fetch(body: string): Promise<string> {
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

  public async createSession(): Promise<void> {
    const body = `mutation {newSession(referer: "https://google.com?q=shoes")}`;
    const createSessionResult = await this.fetch(body);
    const sessionId = createSessionResult?.data?.newSession;
    console.log(createSessionResult);
    this.sessionId = sessionId;
  }
}
