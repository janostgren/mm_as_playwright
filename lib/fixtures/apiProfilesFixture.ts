import { test as base} from '@playwright/test';
import {UserAuthProfile} from '../models/userAuthProfile'

type MyFixtures ={
    mattermost_admin:UserAuthProfile
    mattermost_user1:UserAuthProfile
    matrix_admin:UserAuthProfile
    matrix_a:UserAuthProfile
    matrix_user1:UserAuthProfile
}


export const test = base.extend<MyFixtures>({
    mattermost_admin:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['mattermost_admin'] 
        use(profile);
    },
    mattermost_user1:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['mattermost_user1'] 
        use(profile);
    },
    matrix_admin:  ({}, use, info) => {
        let project = info.config?.projects[0];
        let profile:UserAuthProfile = project.use['matrix_admin'] 
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