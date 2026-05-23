import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreatePersonDto, UpdatePersonDto } from "./dto/people.dto"
import { PeopleService } from "./people.service"

@Controller("people")
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.PersonWhereInput)
    return this.peopleService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.peopleService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(id, updatePersonDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.peopleService.remove(id)
  }
}
