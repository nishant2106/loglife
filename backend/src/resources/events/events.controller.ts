import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { CreateEventDto, UpdateEventDto } from "./dto/events.dto"
import { EventsService } from "./events.service"

@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto)
  }

  @Get()
  findAll(@Query("includeDeleted") includeDeleted?: string) {
    const where = includeDeleted === "true" ? undefined : ({ deletedAt: null } as Prisma.EventWhereInput)
    return this.eventsService.findAll({ where })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.eventsService.remove(id)
  }
}
