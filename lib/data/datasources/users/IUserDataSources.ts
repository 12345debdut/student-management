import prismaClient from "@db/clientObj"
export interface IUserDataSources {
    // User related data source contract goes here.
    fetchTestData(): Promise<String>
}