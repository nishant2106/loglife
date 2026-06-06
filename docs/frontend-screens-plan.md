# Frontend Screen Plan

## Product Understanding

Based on [backend/prisma/schema.prisma](/Users/nishantpandey/playground/loglife/backend/prisma/schema.prisma) and [docs/product-scope.md](/Users/nishantpandey/playground/loglife/docs/product-scope.md), `Log Life` is a private personal life-logging app.

The product is centered around:

- creating logs through text or voice
- storing the original input and a processed summary
- linking logs to people, events, moods, goals, and attachments
- helping the user revisit their life through search and browsing

For the first frontend pass, we should keep the experience simple:

- user logs in first with name and email
- after login, the user can create and manage their logs
- all operations happen inside the authenticated app

## Screen Strategy

We will build two broad screen groups:

1. Authentication screen
2. Logged-in app screens

We are not planning a guest mode or "do a few operations before login" flow right now.

Reason:

- the data model is user-owned from the beginning
- logs, people, events, goals, moods, and attachments all belong to a specific user
- an auth-first flow keeps V1 much cleaner

## V1 User Flow

1. User lands on login screen
2. User enters name and email
3. User enters the app
4. User creates a new log by text or voice
5. User browses past logs
6. User opens linked entities like people and events
7. User checks basic analytics and profile details

## Planned Screens

## 1. Login Screen

Purpose:

- identify the user with the lightest possible friction

Main UI elements:

- app branding and calm introduction
- name input
- email input
- primary CTA such as `Continue`
- optional helper text explaining private personal logging

Notes:

- for V1 this can behave like a lightweight local auth or placeholder auth screen
- later this can expand into OTP or magic link because the schema already supports both

## 2. Home Dashboard

Purpose:

- give the user a simple entry point after login
- make log creation the main action

Main UI elements:

- welcome header with user name
- primary actions: `New Text Log` and `New Voice Log`
- quick summary cards:
  - total logs
  - recent activity
  - current streak or active days
- recent logs preview
- navigation to timeline, people, events, analytics, and profile

## 3. New Log Screen

Purpose:

- help the user quickly record a new day log, memory, event, or note

Main UI elements:

- log kind selector: `Day`, `Event`, `Memory`, `Note`
- title input
- date or date-range input
- optional time inputs later
- text input area for manual entry
- voice recording entry point
- attachment upload area
- save as draft / submit actions

Notes:

- this is the highest-priority product screen after login
- text-first can be built first, with voice UI scaffolded if backend voice flow is not ready

## 4. Log Detail Screen

Purpose:

- show one log clearly along with all linked structured information

Main UI elements:

- title, kind, status, date
- raw or processed summary content
- linked people
- linked events
- linked moods
- linked goals
- linked attachments
- edit and archive actions

Notes:

- this screen is where the product starts feeling more intelligent
- it reflects the schema relationships directly

## 5. Timeline / Log History Screen

Purpose:

- help the user browse past logs by date and type

Main UI elements:

- chronological list of logs
- filters by kind and status
- search input
- date grouping such as day, month, or range
- click-through into log detail

Notes:

- this is a core revisit screen for the product

## 6. People Screen

Purpose:

- let the user browse people extracted from or linked to logs

Main UI elements:

- searchable people list
- relationship label
- person cards with name, nickname, and short description
- link to person detail

## 7. Person Detail Screen

Purpose:

- show a person and all related logs

Main UI elements:

- person profile header
- relationship type
- notes or description
- related logs list
- related events if useful later

## 8. Events Screen

Purpose:

- let the user browse memorable events across logs

Main UI elements:

- searchable event list
- date labels
- event cards with title and short description
- link to event detail

## 9. Event Detail Screen

Purpose:

- show the event and all linked logs

Main UI elements:

- event title and date
- description
- related logs timeline

## 10. Analytics Screen

Purpose:

- give the user lightweight reflection on logging activity

Main UI elements:

- total logs
- active days
- streaks
- people count
- events count
- mood trends later

Notes:

- keep this simple in V1
- this should feel informative, not overly clinical

## 11. Profile / Account Screen

Purpose:

- show user identity and account settings

Main UI elements:

- name
- email
- auth method info
- logout action

Later additions:

- email verification state
- API key settings
- model preferences

## Navigation Plan

Primary navigation after login:

- Home
- Timeline
- People
- Events
- Analytics
- Profile

Primary creation CTA:

- persistent `New Log` action in header or bottom navigation area

## Build Priority

Recommended development order:

1. Login Screen
2. Home Dashboard
3. New Log Screen
4. Timeline / Log History Screen
5. Log Detail Screen
6. People Screen
7. Person Detail Screen
8. Events Screen
9. Event Detail Screen
10. Analytics Screen
11. Profile / Account Screen

## Suggested Frontend Routes

Possible initial routes:

- `/login`
- `/`
- `/logs/new`
- `/logs`
- `/logs/:logId`
- `/people`
- `/people/:personId`
- `/events`
- `/events/:eventId`
- `/analytics`
- `/profile`

## Development Notes

To keep the first implementation smooth, we should treat the product like this:

- authentication first
- one clear dashboard after login
- log creation before advanced browsing
- entity screens after the core log flow works

We should also keep the UI calm and lightweight because that matches the product scope:

- minimal distractions
- strong emphasis on writing or speaking a log quickly
- easy revisit of past memories and linked context

## Immediate Next Step

Before visual development starts, the frontend should next define:

1. route structure
2. shared layout shell
3. auth state approach
4. wireframe for login, dashboard, and new log
