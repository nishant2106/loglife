import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { MoodsController } from "./moods.controller"
import { MoodsService } from "./moods.service"

@Module({
  imports: [PrismaModule],
  controllers: [MoodsController],
  providers: [MoodsService],
})
export class MoodsModule {}
