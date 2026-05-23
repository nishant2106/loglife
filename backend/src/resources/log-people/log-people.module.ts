import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { LogPeopleController } from "./log-people.controller"
import { LogPeopleService } from "./log-people.service"

@Module({
  imports: [PrismaModule],
  controllers: [LogPeopleController],
  providers: [LogPeopleService],
})
export class LogPeopleModule {}
