import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateMoodTypeDto, UpdateMoodTypeDto } from "./dto/mood-types.dto"

@Injectable()
export class MoodTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.moodType
  }

  create(data: CreateMoodTypeDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.MoodTypeFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.MoodTypeFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateMoodTypeDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
