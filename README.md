# Team Generic SG Team's CZ2006 Project

All documentation of the project (eg. Class diagrams, Sequence diagrams) can be found in `Documents/`.

Server-side code can be found in `Backend/` with documentation found in `Backend/GSGTOpenAPIDoc.json`. Server-side documentation follows the OpenAPI standard.

Client-side code can be found in `mobile/` with documentation found in `mobile/docs/`. Client-side documentation was done using _jsdoc_ and can be viewed by opening the `index.html` file in the browser.

# For Development

Remember to ensure that all dependencies are installed by running `npm install` in **both** `PATH/TO/PROJECT/ROOT/mobile/` and `PATH/TO/PROJECT/ROOT/Backend/` _(You have to do them seperately)_

Additionally, several config files need to be manually added for security.

1. A file called `config.js` must be created in `PATH/TO/PROJECT/ROOT/mobile/src/services/`. It should contain

```
export const LOCALHOST = 'YOUR_IPV4_ADDRESS' or 'AWS_IP_ADDRESS'
export const GOOGLE_WEBCLIENT_ID = 'GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION'
```

> The value `YOUR_IPV4_ADDRESS` can be found by running `ipconfig` in your terminal. Alternatively, if you are looking to test the AWS server, replace this with `AWS_IP_ADDRESS`, which can be obtained from @nicholaswko.

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

> The values `LINK_TO_DATABASE_FOR_USERS` and `LINK_TO_DATABASE_FOR_QUEUES` need to be entered as well. (Refer to Telegram)

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

The current file tree is listed here. Most Android, ios and docs files and folders have been omitted for brevity.

```
|-- Root
    |-- .gitignore
    |-- README.md
    |-- Backend
    |   |-- .env
    |   |-- .gitignore
    |   |-- GSGTOpenAPIDoc.json
    |   |-- package-lock.json
    |   |-- package.json
    |   |-- server.js
    |   |-- models
    |   |   |-- queueUser.js
    |   |   |-- serviceProviderData.js
    |   |   |-- signup.js
    |   |-- routes
    |   |   |-- login.js
    |   |   |-- queue.js
    |   |   |-- register.js
    |   |   |-- serviceProvider.js
    |   |-- tools
    |       |-- nodemailer.js
    |-- Documents
    |   |-- CZ2006-ClassDiagram_Detailed.pdf
    |   |-- CZ2006-ClassDiagram_Stereotypes.pdf
    |   |-- CZ2006-DesignPatterns.pdf
    |   |-- CZ2006-DialogMap.pdf
    |   |-- CZ2006-OutlineV2.pdf
    |   |-- CZ2006-SequenceDiagram.pdf
    |   |-- CZ2006-SoftwareArchitectureDiagram.pdf
    |   |-- CZ2006-UIMockups.pdf
    |   |-- CZ2006-UseCaseDescriptionsV2.pdf
    |   |-- CZ2006-UseCaseModel_v2.pdf
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
        |-- Gruntfile.js
        |-- index.js
        |-- jsconfig.json
        |-- jsdoc.json
        |-- metro.config.js
        |-- package-lock.json
        |-- package.json
        |-- styleguide.config.js
        |-- .vscode
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
        |-- docs
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
        |   |   |   |-- Auth
        |   |   |   |   |-- AltAuthOptions.js
        |   |   |   |   |-- index.js
        |   |   |   |   |-- LoginForm.js
        |   |   |   |-- BottomSheet
        |   |   |   |   |-- AppBottomSheet.js
        |   |   |   |   |-- index.js
        |   |   |   |   |-- QRCodeReader.js
        |   |   |   |   |-- QueueSheetContent.js
        |   |   |   |   |-- StoreInfoContent.js
        |   |   |   |-- BottomTabBar
        |   |   |   |   |-- index.js
        |   |   |   |-- HistoryEntry
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalBlock
        |   |   |   |   |-- index.js
        |   |   |   |-- TopBanner
        |   |   |       |-- index.js
        |   |   |-- organisms
        |   |       |-- AccountScreenContent
        |   |       |   |-- index.js
        |   |       |-- AppSettingsScreenContent
        |   |       |   |-- index.js
        |   |       |-- ChatScreenContent
        |   |       |   |-- index.js
        |   |       |-- HistoryScreenContent
        |   |       |   |-- index.js
        |   |       |-- HomeScreenContent
        |   |       |   |-- index.js
        |   |       |-- LoginScreenContent
        |   |           |-- index.js
        |   |-- navigations
        |   |   |-- account-navigator.js
        |   |   |-- app-navigator.js
        |   |   |-- auth-navigator.js
        |   |   |-- chat-navigator.js
        |   |   |-- home-navigator.js
        |   |-- scenes
        |   |   |-- Account
        |   |   |   |-- index.js
        |   |   |-- AppSettings
        |   |   |   |-- index.js
        |   |   |-- Chat
        |   |   |   |-- index.js
        |   |   |-- History
        |   |   |   |-- index.js
        |   |   |-- Home
        |   |   |   |-- index.js
        |   |   |-- Login
        |   |   |   |-- index.js
        |   |   |-- Notifications
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
        |   |   |   |-- index.js
        |   |   |   |-- login.js
        |   |   |   |-- register.js
        |   |   |   |-- verify.js
        |   |   |   |-- google
        |   |   |       |-- googleLogin.js
        |   |   |       |-- googleRegister.js
        |   |   |       |-- googleSignIn.js
        |   |   |-- queue
        |   |   |   |-- getQueue.js
        |   |   |   |-- joinQueue.js
        |   |   |-- serviceProviders
        |   |       |-- getNearbyServiceProviders.js
        |   |-- store
        |       |-- index.js
        |       |-- account
        |       |   |-- actions.js
        |       |   |-- constants.js
        |       |   |-- reducers.js
        |       |-- auth-awaitingDeletion
        |       |   |-- actions.js
        |       |   |-- constants.js
        |       |   |-- reducers.js
        |       |-- serviceProviders
        |       |   |-- actions.js
        |       |   |-- constants.js
        |       |   |-- reducers.js
        |       |-- socket
        |           |-- reducers.js
        |-- __tests__
            |-- App-test.js
```
