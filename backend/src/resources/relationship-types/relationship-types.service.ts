import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateRelationshipTypeDto, UpdateRelationshipTypeDto } from "./dto/relationship-types.dto"

@Injectable()
export class RelationshipTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.relationshipType
  }

  create(data: CreateRelationshipTypeDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.RelationshipTypeFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.RelationshipTypeFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateRelationshipTypeDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
