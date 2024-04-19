import "reflect-metadata"
import { AUTH_REPOSITORY } from "@di/constants"
import { IAuthRepository } from "@lib/data/repository/auth/IAuthRepository"
import type { AuthOptions } from "next-auth"
import CreadentialProvider from "next-auth/providers/credentials"
import {container} from "tsyringe"

export const CustomAuthOptions: AuthOptions = {
    providers: [
        CreadentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email" , type: "text", placeholder: "Please enter a valid mail" },
                password: { label: "Password" , type: "password", placeholder: "Please enter your password" }
            },
            async authorize(credentials, req) {
                return container.resolve<IAuthRepository>(AUTH_REPOSITORY).login(credentials?.email ?? "", credentials?.password ?? "")
            }
        })
    ],
    pages: {
        signIn: "/auth/signin"
    }
}