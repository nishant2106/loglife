import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateLogDto, UpdateLogDto } from "./dto/logs.dto"

@Injectable()
export class LogsService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.log
  }

  create(data: CreateLogDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.LogFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.LogFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateLogDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
