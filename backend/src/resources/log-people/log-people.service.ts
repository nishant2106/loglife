import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateLogPersonDto, UpdateLogPersonDto } from "./dto/log-people.dto"

@Injectable()
export class LogPeopleService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.logPerson
  }

  create(data: CreateLogPersonDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.LogPersonFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.LogPersonFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateLogPersonDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
