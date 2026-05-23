import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateRelationshipTypeDto, UpdateRelationshipTypeDto } from "./dto/relationship-types.dto"
import { RelationshipTypesService } from "./relationship-types.service"

@Controller("relationship-types")
export class RelationshipTypesController {
  constructor(private readonly relationshipTypesService: RelationshipTypesService) {}

  @Post()
  create(@Body() createRelationshipTypeDto: CreateRelationshipTypeDto) {
    return this.relationshipTypesService.create(createRelationshipTypeDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.RelationshipTypeWhereInput)
    return this.relationshipTypesService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.relationshipTypesService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRelationshipTypeDto: UpdateRelationshipTypeDto) {
    return this.relationshipTypesService.update(id, updateRelationshipTypeDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.relationshipTypesService.remove(id)
  }
}
