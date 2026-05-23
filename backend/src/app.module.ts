import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { PrismaModule } from "./prisma/prisma.module"
import { AttachmentsModule } from "./resources/attachments/attachments.module"
import { EventsModule } from "./resources/events/events.module"
import { GoalsModule } from "./resources/goals/goals.module"
import { LlmOperationsModule } from "./resources/llm-operations/llm-operations.module"
import { LogEventsModule } from "./resources/log-events/log-events.module"
import { LogInputsModule } from "./resources/log-inputs/log-inputs.module"
import { LogPeopleModule } from "./resources/log-people/log-people.module"
import { LogsModule } from "./resources/logs/logs.module"
import { MoodsModule } from "./resources/moods/moods.module"
import { MoodTypesModule } from "./resources/mood-types/mood-types.module"
import { PeopleModule } from "./resources/people/people.module"
import { RelationshipTypesModule } from "./resources/relationship-types/relationship-types.module"
import { UsersModule } from "./resources/users/users.module"

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    LogsModule,
    LogInputsModule,
    PeopleModule,
    RelationshipTypesModule,
    EventsModule,
    GoalsModule,
    MoodTypesModule,
    MoodsModule,
    AttachmentsModule,
    LogPeopleModule,
    LogEventsModule,
    LlmOperationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
