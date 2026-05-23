import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { CreateMoodTypeDto, UpdateMoodTypeDto } from "./dto/mood-types.dto"
import { MoodTypesService } from "./mood-types.service"

@Controller("mood-types")
export class MoodTypesController {
  constructor(private readonly moodTypesService: MoodTypesService) {}

  @Post()
  create(@Body() createMoodTypeDto: CreateMoodTypeDto) {
    return this.moodTypesService.create(createMoodTypeDto)
  }

  @Get()
  findAll() {
    return this.moodTypesService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moodTypesService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMoodTypeDto: UpdateMoodTypeDto) {
    return this.moodTypesService.update(id, updateMoodTypeDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moodTypesService.remove(id)
  }
}
