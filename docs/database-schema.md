# Database Schema Reference

This file documents the current Prisma schema for `Log Life`.

Purpose of this file:

- give humans a quick understanding of each table
- give LLMs a stable reference for generating backend, frontend, and query logic
- explain what each column means in product terms

Source of truth:

- Prisma schema: [backend/prisma/schema.prisma](/Users/nishantpandey/playground/loglife/backend/prisma/schema.prisma)

## Enums

### `AuthProvider`

- `EMAIL_MAGIC_LINK`: user signs in through a magic link sent to email
- `EMAIL_OTP`: user signs in through an email OTP flow

### `LogSourceType`

- `TEXT`: log input came from typed text
- `VOICE`: log input came from voice/audio

### `LogStatus`

- `DRAFT`: log exists but is not fully finalized
- `PROCESSED`: log has been processed and is ready to use
- `ARCHIVED`: log is archived and not part of normal active flow

### `LogKind`

- `DAY`: daily life log
- `EVENT`: event-focused log
- `MEMORY`: memory or retrospective log
- `NOTE`: simple note-style log

### `ProcessingStatus`

- `PENDING`: processing has not started yet
- `PROCESSING`: processing is in progress
- `COMPLETED`: processing finished successfully
- `FAILED`: processing failed

### `AttachmentType`

- `IMAGE`: image file
- `AUDIO`: audio file
- `DOCUMENT`: document file
- `OTHER`: any other file type

### `EntityLinkSource`

- `USER`: link was created manually by the user
- `AI`: link was created by AI extraction or backend automation

## Tables

## `User`

Represents an app user who owns logs, people, events, moods, goals, attachments, and AI operations.

Columns:

- `id`: primary key for the user
- `name`: display name of the user
- `email`: unique email address
- `authProvider`: authentication method being used
- `emailVerifiedAt`: when the user email was verified
- `isActive`: whether the account is active
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- has many `Log`
- has many `Person`
- has many `Event`
- has many `Goal`
- has many `Mood`
- has many `Attachment`
- has many `LlmOperation`

## `Log`

This is the central table of the product. A log represents a day entry, event entry, memory, or note.

Columns:

- `id`: primary key for the log
- `userId`: owning user
- `title`: optional title for the log
- `kind`: type of log such as day, event, memory, or note
- `status`: lifecycle status of the log
- `summary`: main stored text/content of the log
- `startDate`: start date of the log or logged period
- `endDate`: end date of the log or logged period
- `processingStatus`: processing state for transcript, extraction, or summarization workflows
- `metaInfo`: flexible JSON metadata for future needs
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- has many `LogInput`
- has many `LogPerson`
- has many `LogEvent`
- has many `Goal`
- has many `Mood`
- has many `Attachment`
- has many `LlmOperation`

## `LogInput`

Stores the original input source behind a log. This is useful for typed input, voice transcript data, and audio metadata.

Columns:

- `id`: primary key for the input row
- `logId`: related log
- `sourceType`: whether the input came from text or voice
- `transcriptText`: stored transcript content, especially useful for voice logs
- `audioUrl`: stored audio file URL or location
- `durationSeconds`: audio duration in seconds
- `processingStatus`: processing state of this input item
- `metaInfo`: flexible JSON metadata for input-specific details
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `Log`

## `Person`

Represents a person mentioned or tracked in the user’s life logs.

Columns:

- `id`: primary key for the person
- `userId`: owning user
- `relationshipTypeId`: optional relationship type selected for this person
- `name`: primary name of the person
- `nickname`: optional alternate or informal name
- `description`: free-text notes about the person
- `profileImageUrl`: optional image URL for the person
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- optionally belongs to `RelationshipType`
- has many `LogPerson`

## `RelationshipType`

User-defined catalog table for relationship labels used by people.

This allows each user to create their own relationship kinds instead of being limited to a fixed enum.

Columns:

- `id`: primary key for the relationship type
- `userId`: owning user
- `label`: relationship label such as friend, family, mentor, teammate, etc.
- `description`: optional explanation of the relationship type
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- has many `Person`

## `Event`

Represents a named event or incident that can be linked to logs.

Columns:

- `id`: primary key for the event
- `userId`: owning user
- `title`: event title
- `description`: optional event details
- `primaryDate`: main date associated with the event
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- has many `LogEvent`

## `Goal`

Represents a goal that may optionally come from or be attached directly to a specific log.

Columns:

- `id`: primary key for the goal
- `userId`: owning user
- `logId`: optional related log
- `title`: goal title
- `description`: optional explanation of the goal
- `targetDate`: optional deadline or intended date
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- optionally belongs to `Log`

## `MoodType`

Catalog table that defines the possible moods or feeling types available in the app.

Columns:

- `id`: primary key for the mood type
- `label`: unique mood name such as happy, anxious, calm, tired
- `description`: optional explanation or note about that mood type
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated

Relations:

- has many `Mood`

## `Mood`

Represents a user mood record, optionally tied to a specific log and always tied to a mood type from the catalog.

Columns:

- `id`: primary key for the mood row
- `userId`: owning user
- `logId`: optional related log
- `moodTypeId`: related mood type
- `rating`: optional numeric strength or score
- `description`: optional extra note about the mood
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- optionally belongs to `Log`
- belongs to `MoodType`

## `Attachment`

Stores uploaded or linked files such as photos, audio notes, or documents.

Columns:

- `id`: primary key for the attachment
- `userId`: owning user
- `logId`: optional related log
- `type`: file category such as image, audio, or document
- `fileName`: original or stored file name
- `storageKey`: optional object storage key or internal storage identifier
- `url`: public or private access URL
- `mimeType`: MIME type such as `image/png` or `audio/mpeg`
- `sizeBytes`: file size in bytes
- `metaInfo`: flexible JSON metadata
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- optionally belongs to `Log`

## `LogPerson`

Join table connecting logs and people.

Use case:

- one log may mention many people
- one person may appear in many logs

Columns:

- `id`: primary key for the join row
- `logId`: related log
- `personId`: related person
- `source`: whether the relationship came from the user or AI
- `confidence`: optional AI confidence score
- `contextSnippet`: optional text snippet showing why this person was linked
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `Log`
- belongs to `Person`

## `LogEvent`

Join table connecting logs and events.

Use case:

- one log may relate to many events
- one event may be referenced by many logs

Columns:

- `id`: primary key for the join row
- `logId`: related log
- `eventId`: related event
- `source`: whether the relationship came from the user or AI
- `confidence`: optional AI confidence score
- `contextSnippet`: optional text snippet showing why this event was linked
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `Log`
- belongs to `Event`

## `LlmOperation`

Tracks AI or model-related operations done by the system.

Typical use cases:

- transcription
- summarization
- entity extraction
- future token usage tracking
- future billing support

Columns:

- `id`: primary key for the AI operation
- `userId`: owning user
- `logId`: optional related log
- `operationType`: operation name such as transcription or summary generation
- `provider`: model provider name
- `model`: model name
- `promptVersion`: prompt version or prompt template identifier
- `status`: processing state
- `inputTokens`: number of prompt/input tokens
- `outputTokens`: number of completion/output tokens
- `totalTokens`: total tokens used
- `estimatedCost`: estimated operation cost
- `usedUserApiKey`: whether the user’s own API key was used
- `requestPayload`: optional structured request body snapshot
- `responsePayload`: optional structured response body snapshot
- `createdAt`: when the row was created
- `updatedAt`: when the row was last updated
- `deletedAt`: soft delete timestamp

Relations:

- belongs to `User`
- optionally belongs to `Log`

## Practical Notes For LLMs

When generating code against this schema:

- treat `Log` as the central product object
- use `LogInput` for original text or voice source details
- use `LogPerson` and `LogEvent` for many-to-many references
- use `Goal.logId` and `Mood.logId` for direct optional log linkage
- use `MoodType` as the source of available moods
- respect `deletedAt` as soft delete where applicable
- assume `metaInfo` is flexible JSON and should not replace strongly typed columns
