/*
  Warnings:

  - You are about to drop the `Healthcheck` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL_MAGIC_LINK', 'EMAIL_OTP');

-- CreateEnum
CREATE TYPE "LogSourceType" AS ENUM ('TEXT', 'VOICE');

-- CreateEnum
CREATE TYPE "LogStatus" AS ENUM ('DRAFT', 'PROCESSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LogKind" AS ENUM ('DAY', 'EVENT', 'MEMORY', 'NOTE');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('IMAGE', 'AUDIO', 'DOCUMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "EntityLinkSource" AS ENUM ('USER', 'AI');

-- DropTable
DROP TABLE "Healthcheck";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "authProvider" "AuthProvider",
    "emailVerifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "kind" "LogKind" NOT NULL DEFAULT 'DAY',
    "status" "LogStatus" NOT NULL DEFAULT 'DRAFT',
    "summary" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogInput" (
    "id" TEXT NOT NULL,
    "logId" TEXT NOT NULL,
    "sourceType" "LogSourceType" NOT NULL,
    "transcriptText" TEXT,
    "audioUrl" TEXT,
    "durationSeconds" INTEGER,
    "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LogInput_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "relationshipTypeId" TEXT,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "description" TEXT,
    "profileImageUrl" TEXT,
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelationshipType" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "RelationshipType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "primaryDate" TIMESTAMP(3),
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" TIMESTAMP(3),
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoodType" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoodType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logId" TEXT,
    "moodTypeId" TEXT NOT NULL,
    "rating" INTEGER,
    "description" TEXT,
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logId" TEXT,
    "type" "AttachmentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageKey" TEXT,
    "url" TEXT,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "metaInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogPerson" (
    "id" TEXT NOT NULL,
    "logId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "source" "EntityLinkSource" NOT NULL DEFAULT 'AI',
    "confidence" DECIMAL(5,2),
    "contextSnippet" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LogPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogEvent" (
    "id" TEXT NOT NULL,
    "logId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "source" "EntityLinkSource" NOT NULL DEFAULT 'AI',
    "confidence" DECIMAL(5,2),
    "contextSnippet" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LogEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LlmOperation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logId" TEXT,
    "operationType" TEXT NOT NULL,
    "provider" TEXT,
    "model" TEXT,
    "promptVersion" TEXT,
    "status" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalTokens" INTEGER,
    "estimatedCost" DECIMAL(12,4),
    "usedUserApiKey" BOOLEAN NOT NULL DEFAULT false,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LlmOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_deletedAt_idx" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "Log_userId_startDate_endDate_idx" ON "Log"("userId", "startDate", "endDate");

-- CreateIndex
CREATE INDEX "Log_userId_status_idx" ON "Log"("userId", "status");

-- CreateIndex
CREATE INDEX "Log_userId_kind_idx" ON "Log"("userId", "kind");

-- CreateIndex
CREATE INDEX "Log_deletedAt_idx" ON "Log"("deletedAt");

-- CreateIndex
CREATE INDEX "LogInput_logId_idx" ON "LogInput"("logId");

-- CreateIndex
CREATE INDEX "LogInput_deletedAt_idx" ON "LogInput"("deletedAt");

-- CreateIndex
CREATE INDEX "Person_userId_name_idx" ON "Person"("userId", "name");

-- CreateIndex
CREATE INDEX "Person_relationshipTypeId_idx" ON "Person"("relationshipTypeId");

-- CreateIndex
CREATE INDEX "Person_deletedAt_idx" ON "Person"("deletedAt");

-- CreateIndex
CREATE INDEX "RelationshipType_userId_label_idx" ON "RelationshipType"("userId", "label");

-- CreateIndex
CREATE INDEX "RelationshipType_deletedAt_idx" ON "RelationshipType"("deletedAt");

-- CreateIndex
CREATE INDEX "Event_userId_title_idx" ON "Event"("userId", "title");

-- CreateIndex
CREATE INDEX "Event_userId_primaryDate_idx" ON "Event"("userId", "primaryDate");

-- CreateIndex
CREATE INDEX "Event_deletedAt_idx" ON "Event"("deletedAt");

-- CreateIndex
CREATE INDEX "Goal_userId_title_idx" ON "Goal"("userId", "title");

-- CreateIndex
CREATE INDEX "Goal_logId_idx" ON "Goal"("logId");

-- CreateIndex
CREATE INDEX "Goal_deletedAt_idx" ON "Goal"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "MoodType_label_key" ON "MoodType"("label");

-- CreateIndex
CREATE INDEX "MoodType_label_idx" ON "MoodType"("label");

-- CreateIndex
CREATE INDEX "Mood_userId_moodTypeId_idx" ON "Mood"("userId", "moodTypeId");

-- CreateIndex
CREATE INDEX "Mood_logId_idx" ON "Mood"("logId");

-- CreateIndex
CREATE INDEX "Mood_deletedAt_idx" ON "Mood"("deletedAt");

-- CreateIndex
CREATE INDEX "Attachment_userId_type_idx" ON "Attachment"("userId", "type");

-- CreateIndex
CREATE INDEX "Attachment_logId_idx" ON "Attachment"("logId");

-- CreateIndex
CREATE INDEX "Attachment_deletedAt_idx" ON "Attachment"("deletedAt");

-- CreateIndex
CREATE INDEX "LogPerson_personId_idx" ON "LogPerson"("personId");

-- CreateIndex
CREATE INDEX "LogPerson_deletedAt_idx" ON "LogPerson"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LogPerson_logId_personId_key" ON "LogPerson"("logId", "personId");

-- CreateIndex
CREATE INDEX "LogEvent_eventId_idx" ON "LogEvent"("eventId");

-- CreateIndex
CREATE INDEX "LogEvent_deletedAt_idx" ON "LogEvent"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "LogEvent_logId_eventId_key" ON "LogEvent"("logId", "eventId");

-- CreateIndex
CREATE INDEX "LlmOperation_userId_operationType_idx" ON "LlmOperation"("userId", "operationType");

-- CreateIndex
CREATE INDEX "LlmOperation_logId_idx" ON "LlmOperation"("logId");

-- CreateIndex
CREATE INDEX "LlmOperation_status_idx" ON "LlmOperation"("status");

-- CreateIndex
CREATE INDEX "LlmOperation_deletedAt_idx" ON "LlmOperation"("deletedAt");

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogInput" ADD CONSTRAINT "LogInput_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_relationshipTypeId_fkey" FOREIGN KEY ("relationshipTypeId") REFERENCES "RelationshipType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelationshipType" ADD CONSTRAINT "RelationshipType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_moodTypeId_fkey" FOREIGN KEY ("moodTypeId") REFERENCES "MoodType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogPerson" ADD CONSTRAINT "LogPerson_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogPerson" ADD CONSTRAINT "LogPerson_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEvent" ADD CONSTRAINT "LogEvent_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogEvent" ADD CONSTRAINT "LogEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LlmOperation" ADD CONSTRAINT "LlmOperation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LlmOperation" ADD CONSTRAINT "LlmOperation_logId_fkey" FOREIGN KEY ("logId") REFERENCES "Log"("id") ON DELETE SET NULL ON UPDATE CASCADE;
