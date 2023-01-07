import {  APIRequestContext } from "@playwright/test";


export interface APIContextProfile {
    user:string;
    password?:string,
    token?:string
    context:APIRequestContext
}