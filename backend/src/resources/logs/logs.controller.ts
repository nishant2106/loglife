import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateLogDto, UpdateLogDto } from "./dto/logs.dto"
import { LogsService } from "./logs.service"

@Controller("logs")
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.LogWhereInput)
    return this.logsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.logsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLogDto: UpdateLogDto) {
    return this.logsService.update(id, updateLogDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.logsService.remove(id)
  }
}
