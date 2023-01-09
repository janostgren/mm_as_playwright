import { test as base} from '@playwright/test';
import {UserAuthProfile} from '../models/userAuthProfile'

type MyFixtures ={
    admin_mm:UserAuthProfile
    matrix_a:UserAuthProfile
    matrix_user1:UserAuthProfile
}


export const test = base.extend<MyFixtures>({
    admin_mm:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['admin_mm'] 
        use(profile);
    },
    matrix_a:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['matrix_a'] 
        use(profile);
    },
    matrix_user1:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['matrix_user1'] 
        use(profile);
    },
})