import { Module } from "@nestjs/common"
import { PrismaModule } from "../../prisma/prisma.module"
import { RelationshipTypesController } from "./relationship-types.controller"
import { RelationshipTypesService } from "./relationship-types.service"

@Module({
  imports: [PrismaModule],
  controllers: [RelationshipTypesController],
  providers: [RelationshipTypesService],
})
export class RelationshipTypesModule {}
