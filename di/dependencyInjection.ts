import "reflect-metadata";
import { UserDataSourceImpl } from '@dataSource/users/userDataSources';
import { UserRepositoryImpl } from '@repo/users/UserRepository';
import {container} from "tsyringe";
import { USER_SERVICE,USER_REPO } from "./constants";

container.register(USER_SERVICE, {
    useClass: UserDataSourceImpl
});

container.register(USER_REPO, {
    useClass: UserRepositoryImpl
})