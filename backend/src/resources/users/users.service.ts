import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateUserDto, UpdateUserDto } from "./dto/users.dto"

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.user
  }

  create(data: CreateUserDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.UserFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.UserFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
