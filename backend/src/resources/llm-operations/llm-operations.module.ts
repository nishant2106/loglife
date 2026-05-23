import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { LlmOperationsController } from "./llm-operations.controller"
import { LlmOperationsService } from "./llm-operations.service"

@Module({
  imports: [PrismaModule],
  controllers: [LlmOperationsController],
  providers: [LlmOperationsService],
})
export class LlmOperationsModule {}
