import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateMoodDto, UpdateMoodDto } from "./dto/moods.dto"
import { MoodsService } from "./moods.service"

@Controller("moods")
export class MoodsController {
  constructor(private readonly moodsService: MoodsService) {}

  @Post()
  create(@Body() createMoodDto: CreateMoodDto) {
    return this.moodsService.create(createMoodDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.MoodWhereInput)
    return this.moodsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moodsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMoodDto: UpdateMoodDto) {
    return this.moodsService.update(id, updateMoodDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moodsService.remove(id)
  }
}
