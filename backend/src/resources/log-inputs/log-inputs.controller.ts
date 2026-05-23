import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateLogInputDto, UpdateLogInputDto } from "./dto/log-inputs.dto"
import { LogInputsService } from "./log-inputs.service"

@Controller("log-inputs")
export class LogInputsController {
  constructor(private readonly logInputsService: LogInputsService) {}

  @Post()
  create(@Body() createLogInputDto: CreateLogInputDto) {
    return this.logInputsService.create(createLogInputDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.LogInputWhereInput)
    return this.logInputsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.logInputsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLogInputDto: UpdateLogInputDto) {
    return this.logInputsService.update(id, updateLogInputDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.logInputsService.remove(id)
  }
}
