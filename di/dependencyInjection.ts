import "reflect-metadata";
import { UserDataSourceImpl } from '@dataSource/users/userDataSources';
import { UserRepositoryImpl } from '@repo/users/UserRepository';
import {container} from "tsyringe";
import { USER_SERVICE,USER_REPO,AUTH_DATA_SOURCE,AUTH_REPOSITORY } from "./constants";
import { AuthDataSourceImpl } from "@dataSource/auth/AuthDataSourceImpl";
import { AuthRepositoryImpl } from "@repo/auth/AuthRepositoryImpl";

container.register(USER_SERVICE, {
    useClass: UserDataSourceImpl
});

container.register(USER_REPO, {
    useClass: UserRepositoryImpl
})

container.register(AUTH_DATA_SOURCE, {
    useClass: AuthDataSourceImpl
})

container.register(AUTH_REPOSITORY, {
    useClass: AuthRepositoryImpl
})