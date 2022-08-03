/*
  Warnings:

  - You are about to drop the column `reason` on the `Token` table. All the data in the column will be lost.
  - Added the required column `hash` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('SignIn', 'SignUp', 'ChangeEmail', 'Session', 'RememberMe');

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "reason",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "type" "TokenType" NOT NULL;
