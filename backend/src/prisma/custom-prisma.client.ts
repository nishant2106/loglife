import { PrismaClient } from "@prisma/client"
import { filterSoftDeleted, softDelete, softDeleteMany } from "./prisma.extensions"

export const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(softDelete).$extends(softDeleteMany).$extends(filterSoftDeleted)
}

export type CustomPrismaClient = ReturnType<typeof customPrismaClient>

export class PrismaClientExtended extends PrismaClient {
  private extendedClient?: CustomPrismaClient

  get client() {
    if (!this.extendedClient) {
      this.extendedClient = customPrismaClient(this)
    }

    return this.extendedClient
  }
}
