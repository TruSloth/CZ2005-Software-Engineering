# For Development

Remember to ensure that all dependencies are installed by running `npm install` in **both** `PATH/TO/PROJECT/ROOT/mobile/` and `PATH/TO/PROJECT/ROOT/Backend/` _(You have to do them seperately)_

Additionally, several config files need to be manually added for security.

1. A file called `config.js` must be created in `PATH/TO/PROJECT/ROOT/mobile/services/`. It should contain

```
export const LOCALHOST = 'YOUR_IPV4_ADDRESS'
export const export const GOOGLE_WEBCLIENT_ID = 'GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION'
```

> The value `YOUR_IPV4_ADDRESS` can be found by running `ipconfig` in your terminal.

> The value `GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION` can be found in the firebase or google cloud console for the project.

2. A file called `.env` must be created in `PATH/TO/PROJECT/ROOT/Backend/`. It should contain

```
DATABASE_ACCESS = 'LINK_TO_DATABASE_FOR_USERS'
QUEUE  = "LINK_TO_DATABASE_FOR_QUEUES"
AUTHENTICATION_TOKEN = "123"
REDIS_URL = "redis:6379" // Is this necessary?
CLIENT_ID = 'GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION'
```

> The value `GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION` can be found in the firebase or google cloud console for the project.

3. The file `google-services.json` must be manually added to the project at `/PATH/TO/PROJECT/ROOT/mobile/android/app`.

> This file can be downloaded from the application's firebase console, under `project settings`.

## How to Run

Open up 3 terminals and follow the instructions for each.

### Terminal 1 (Metro)

Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native start`

### Terminal 2 (Android)

Terminal 2: Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native run-android`

### Terminal 3 (Express)

Terminal 3: Navigate to `PATH/TO/PROJECT/ROOT/Backend/` and run `npm run start`

## Project Structure

The current file tree is listed here. Most Android & ios files and folders have been omitted for brevity.

```
|-- Root
    |-- .gitignore
    |-- README.md
    |-- .vscode
    |   |-- settings.json
    |-- Backend
    |   |-- .env
    |   |-- .gitignore
    |   |-- package-lock.json
    |   |-- package.json
    |   |-- server.js
    |   |-- models
    |   |   |-- queueUser.js
    |   |   |-- signup.js
    |   |-- routes
    |   |   |-- login.js
    |   |   |-- queue.js
    |   |   |-- register.js
    |   |-- tools
    |       |-- nodemailer.js
    |-- mobile
        |-- .buckconfig
        |-- .eslintrc.js
        |-- .flowconfig
        |-- .gitignore
        |-- .prettierrc.js
        |-- .ruby-version
        |-- .watchmanconfig
        |-- App.js
        |-- app.json
        |-- babel.config.js
        |-- Gemfile
        |-- Gemfile.lock
        |-- index.js
        |-- jsconfig.json
        |-- metro.config.js
        |-- package-lock.json
        |-- package.json
        |-- android
        |   |-- build.gradle
        |   |-- gradle.properties
        |   |-- gradlew
        |   |-- gradlew.bat
        |   |-- settings.gradle
        |   |-- .gradle
        |   |-- app
        |   |   |-- BUCK
        |   |   |-- build.gradle
        |   |   |-- build_defs.bzl
        |   |   |-- debug.keystore
        |   |   |-- google-services.json
        |   |   |-- proguard-rules.pro
        |   |   |-- build
        |   |   |-- src
        |-- ios
        |-- src
        |   |-- assets
        |   |   |-- index.js
        |   |   |-- react-native-logo.png
        |   |-- components
        |   |   |-- atoms
        |   |   |   |-- CardDescription
        |   |   |   |   |-- index.js
        |   |   |   |-- CategoryFilter
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalSection
        |   |   |   |   |-- index.js
        |   |   |   |-- InputField
        |   |   |   |   |-- index.js
        |   |   |   |-- OnboardingItem
        |   |   |   |   |-- index.js
        |   |   |   |-- Paginator
        |   |   |   |   |-- index.js
        |   |   |   |-- RoundButton
        |   |   |   |   |-- index.js
        |   |   |   |-- TappableCard
        |   |   |       |-- index.js
        |   |   |-- molecules
        |   |   |   |-- AltAuthOptions
        |   |   |   |   |-- index.js
        |   |   |   |-- AppBottomSheet
        |   |   |   |   |-- index.js
        |   |   |   |-- BottomTabBar
        |   |   |   |   |-- index.js
        |   |   |   |-- HistoryEntry
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalBlock
        |   |   |   |   |-- index.js
        |   |   |   |-- LoginForm
        |   |   |   |   |-- index.js
        |   |   |   |-- QueueSheetContent
        |   |   |   |   |-- index.js
        |   |   |   |-- StoreInfoContent
        |   |   |   |   |-- index.js
        |   |   |   |-- TopBanner
        |   |   |       |-- index.js
        |   |   |-- organisms
        |   |       |-- AccountScreenContent
        |   |       |   |-- index.js
        |   |       |-- AppSettingsScreenContent
        |   |       |   |-- index.js
        |   |       |-- HistoryScreenContent
        |   |       |   |-- index.js
        |   |       |-- HomeScreenContent
        |   |       |   |-- index.js
        |   |       |-- LoginContent
        |   |           |-- index.js
        |   |-- navigations
        |   |   |-- account-navigator.js
        |   |   |-- app-navigator.js
        |   |   |-- auth-navigator.js
        |   |   |-- home-navigator.js
        |   |-- scenes
        |   |   |-- Account
        |   |   |   |-- index.js
        |   |   |-- AppSettings
        |   |   |   |-- index.js
        |   |   |-- History
        |   |   |   |-- index.js
        |   |   |-- Home
        |   |   |   |-- index.js
        |   |   |-- Login
        |   |   |   |-- index.js
        |   |   |-- Onboarding
        |   |   |   |-- index.js
        |   |   |-- Registration
        |   |   |   |-- index.js
        |   |   |-- SplashScreen
        |   |   |   |-- index.js
        |   |   |-- StoreDetailedInfo
        |   |   |   |-- index.js
        |   |   |-- TempVerify
        |   |       |-- index.js
        |   |-- services
        |   |   |-- config.js
        |   |   |-- auth
        |   |   |   |-- login.js
        |   |   |   |-- register.js
        |   |   |   |-- verify.js
        |   |   |   |-- google
        |   |   |       |-- googleLogin.js
        |   |   |       |-- googleRegister.js
        |   |   |       |-- googleSignIn.js
        |   |   |-- queue
        |   |       |-- getQueue.js
        |   |       |-- joinQueue.js
        |   |-- store
        |       |-- index.js
        |       |-- account
        |       |   |-- actions.js
        |       |   |-- constants.js
        |       |   |-- reducers.js
        |       |-- auth
        |           |-- actions.js
        |           |-- constants.js
        |           |-- reducers.js
        |-- __tests__
            |-- App-test.js

```
