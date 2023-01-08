import { UserAuthProfile } from "../models/userAuthProfile";
import { APIRequestContext, APIRequest } from "@playwright/test";

export abstract class ApiBaseClient {
  readonly authProfile: UserAuthProfile;
  protected requestContext: APIRequestContext;
  protected request:APIRequest
  public constructor(authProfile: UserAuthProfile, request: APIRequest) {
    this.authProfile = authProfile;
    this.request=request
  }

  public getRequestContext(): APIRequestContext {
    return this.requestContext;
  }
  protected async authenticate() :Promise<APIRequestContext>{
    let options: any = {
      baseURL: this.authProfile.baseURL,
    };
    if (this.authProfile.bearerToken) {
      options.extraHTTPHeaders = {
        Authorization: "Bearer "+this.authProfile.bearerToken,
      };
    }
    this.requestContext=await this.request.newContext(options)
    return this.requestContext

  }
  public getDomain():string {
    return this.authProfile.domain || ''
  }
}
