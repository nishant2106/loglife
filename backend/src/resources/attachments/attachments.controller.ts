import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateAttachmentDto, UpdateAttachmentDto } from "./dto/attachments.dto"
import { AttachmentsService } from "./attachments.service"

@Controller("attachments")
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  create(@Body() createAttachmentDto: CreateAttachmentDto) {
    return this.attachmentsService.create(createAttachmentDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.AttachmentWhereInput)
    return this.attachmentsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.attachmentsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAttachmentDto: UpdateAttachmentDto) {
    return this.attachmentsService.update(id, updateAttachmentDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.attachmentsService.remove(id)
  }
}
