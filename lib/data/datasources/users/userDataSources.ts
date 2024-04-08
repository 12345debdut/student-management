import {type IUserDataSources} from '@dataSource/users/IUserDataSources'
import { injectable } from 'tsyringe'
/*
    This class is reposible for provide all the data related to user.
*/
@injectable()
export class UserDataSourceImpl implements IUserDataSources {
    async fetchTestData(): Promise<String> {
        return Promise.resolve("Hello world!!!")
    }
}