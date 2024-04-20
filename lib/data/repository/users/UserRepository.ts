import { type IUserDataSources } from '@dataSource/users/IUserDataSources';
import { inject, injectable } from 'tsyringe'
import {IUserRepository} from '@repo/users/IUserRepository'
import {USER_SERVICE} from "@di/constants"

@injectable()
export class UserRepositoryImpl implements IUserRepository {
    private userDataSource: IUserDataSources
    constructor(@inject(USER_SERVICE) userDataSource: IUserDataSources) {
        this.userDataSource = userDataSource
    }
    async fetchTestData(): Promise<String> {
        return this.userDataSource.fetchTestData()
    }
}