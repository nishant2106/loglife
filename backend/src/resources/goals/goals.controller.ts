import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateGoalDto, UpdateGoalDto } from "./dto/goals.dto"
import { GoalsService } from "./goals.service"

@Controller("goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.GoalWhereInput)
    return this.goalsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.goalsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(id, updateGoalDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.goalsService.remove(id)
  }
}
