import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateLlmOperationDto, UpdateLlmOperationDto } from "./dto/llm-operations.dto"

@Injectable()
export class LlmOperationsService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.llmOperation
  }

  create(data: CreateLlmOperationDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.LlmOperationFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.LlmOperationFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateLlmOperationDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
