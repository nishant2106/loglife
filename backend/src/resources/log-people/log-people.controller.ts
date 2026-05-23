import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateLogPersonDto, UpdateLogPersonDto } from "./dto/log-people.dto"
import { LogPeopleService } from "./log-people.service"

@Controller("log-people")
export class LogPeopleController {
  constructor(private readonly logPeopleService: LogPeopleService) {}

  @Post()
  create(@Body() createLogPersonDto: CreateLogPersonDto) {
    return this.logPeopleService.create(createLogPersonDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.LogPersonWhereInput)
    return this.logPeopleService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.logPeopleService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLogPersonDto: UpdateLogPersonDto) {
    return this.logPeopleService.update(id, updateLogPersonDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.logPeopleService.remove(id)
  }
}
