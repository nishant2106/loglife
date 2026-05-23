import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { PrismaService } from "../../prisma/prisma.service"
import { CreateAttachmentDto, UpdateAttachmentDto } from "./dto/attachments.dto"

@Injectable()
export class AttachmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.client.attachment
  }

  create(data: CreateAttachmentDto) {
    return this.prisma.create({ data })
  }

  findAll(args?: Prisma.AttachmentFindManyArgs) {
    return this.prisma.findMany(args)
  }

  findOne(id: string, args?: Omit<Prisma.AttachmentFindUniqueArgs, "where">) {
    return this.prisma.findUnique({ ...args, where: { id } })
  }

  update(id: string, data: UpdateAttachmentDto) {
    return this.prisma.update({ where: { id }, data })
  }

  remove(id: string) {
    return this.prisma.delete({ id })
  }
}
