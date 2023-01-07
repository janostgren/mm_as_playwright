import { test as base, APIRequestContext } from '@playwright/test';
import {APIContextProfile} from '../models/apiContextProfile'


type MyFixtures = {
    apiContextProfiles: Map<string,APIContextProfile>
}

export const test = base.extend<MyFixtures>({
    apiContextProfiles:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profiles:Map<string,APIContextProfile>= new  Map<string,APIContextProfile>()
        use(profiles);
    },
})