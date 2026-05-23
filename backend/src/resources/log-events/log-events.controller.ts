import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateLogEventDto, UpdateLogEventDto } from "./dto/log-events.dto"
import { LogEventsService } from "./log-events.service"

@Controller("log-events")
export class LogEventsController {
  constructor(private readonly logEventsService: LogEventsService) {}

  @Post()
  create(@Body() createLogEventDto: CreateLogEventDto) {
    return this.logEventsService.create(createLogEventDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.LogEventWhereInput)
    return this.logEventsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.logEventsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLogEventDto: UpdateLogEventDto) {
    return this.logEventsService.update(id, updateLogEventDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.logEventsService.remove(id)
  }
}
