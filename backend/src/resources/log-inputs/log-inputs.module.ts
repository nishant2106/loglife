import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { LogInputsController } from "./log-inputs.controller"
import { LogInputsService } from "./log-inputs.service"

@Module({
  imports: [PrismaModule],
  controllers: [LogInputsController],
  providers: [LogInputsService],
})
export class LogInputsModule {}
