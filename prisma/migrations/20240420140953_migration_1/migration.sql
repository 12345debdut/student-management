-- CreateEnum
CREATE TYPE "Role" AS ENUM ('READ_ONLY_ADMIN', 'READ_WRITE_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "lastUpdatedTime" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
