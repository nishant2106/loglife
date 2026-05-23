import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { MoodTypesController } from "./mood-types.controller"
import { MoodTypesService } from "./mood-types.service"

@Module({
  imports: [PrismaModule],
  controllers: [MoodTypesController],
  providers: [MoodTypesService],
})
export class MoodTypesModule {}
