import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateLlmOperationDto, UpdateLlmOperationDto } from "./dto/llm-operations.dto"
import { LlmOperationsService } from "./llm-operations.service"

@Controller("llm-operations")
export class LlmOperationsController {
  constructor(private readonly llmOperationsService: LlmOperationsService) {}

  @Post()
  create(@Body() createLlmOperationDto: CreateLlmOperationDto) {
    return this.llmOperationsService.create(createLlmOperationDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.LlmOperationWhereInput)
    return this.llmOperationsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.llmOperationsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLlmOperationDto: UpdateLlmOperationDto) {
    return this.llmOperationsService.update(id, updateLlmOperationDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.llmOperationsService.remove(id)
  }
}
