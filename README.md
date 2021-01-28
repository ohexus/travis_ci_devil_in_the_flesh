# Telegram bot for Travis CI

The bot can notify you of build and deploy status and only works from 9:00 am to 2:00 am \(GMT+2\).

You can find bot [here](https://telegram.me/travis_ci_devil_in_the_flesh_bot).

## Installation

In the project directory, run:

```
npm install
```

And then you can start server using:

```
npm start
```

Or start dev server with reload:

```
npm run dev
```

Also you can lint project using:

```
npm run lint
```

## Config

App requires next config:

```
{
  "PORT": "PORT",
  "NODE_ENV": "NODE_ENV",
  "TELEGRAM_BOT_TOKEN": "TELEGRAM_BOT_TOKEN",
  "MONGO_URI": "MONGO_URI",
  "LOGGER_LVL": "LOGGER_LVL"
}
```

- PORT - app port

- NODE_ENV - PRODUCTION | DEVELOPMENT | YOUR_ENV

- TELEGRAM_BOT_TOKEN - token for telegram bot

- MONGO_URI - url to your MongoDB

- LOGGER_LVL - ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF // INFO by default

## Bot commands

- /start - Start bot

- /help - List all commands

- /link - Add new repository to receive notifications from Travis CI

- /list - List all current repositories

- /delete - Delete repository and stop receiving notifications from it

- /cancel - Cancel current command

## API

API to the bot server.

### Get main page

`GET /`

#### Description:

Default app request.

#### Responses

| Code | Description   | Payload    | Message                        |
| ---- | ------------- | ---------- | ------------------------------ |
| 200  | Home response | App works! | Request completed successfully |

### Notification event

`POST /notify?secret=secret_value`

#### Description:

Request to bot notifications.

Requires travis payload format that you can find [here](https://docs.travis-ci.com/user/notifications/#webhooks-delivery-format).

#### Responses

| Code | Description               | Payload    | Message                        |
| ---- | ------------------------- | ---------- | ------------------------------ |
| 200  | Response after bot notify | null       | Notification send successfully |
| 400  | Error                     | error: err | Failed to send notification    |

### Store secret

`POST /secret/`

#### Description:

Request to store secret for 1 min.

Requires secret and repository in body:

`{"secret": string, "repository": 'owner/repo_name'}`

#### Responses

| Code | Description                  | Payload    | Message                    |
| ---- | ---------------------------- | ---------- | -------------------------- |
| 200  | Response after secret stored | null       | Secret stored successfully |
| 400  | Error                        | error: err | Failed to store secret     |
