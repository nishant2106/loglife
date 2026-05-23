import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { LogEventsController } from "./log-events.controller"
import { LogEventsService } from "./log-events.service"

@Module({
  imports: [PrismaModule],
  controllers: [LogEventsController],
  providers: [LogEventsService],
})
export class LogEventsModule {}
