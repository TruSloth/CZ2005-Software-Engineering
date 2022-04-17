# Team Generic SG Team's CZ2006 Project

All documentation of the project (eg. Class diagrams, Sequence diagrams) can be found in `Documents/`.

Server-side code can be found in `Backend/` with documentation found in `Backend/GSGTOpenAPIDoc.json`. Server-side documentation follows the OpenAPI standard.

Client-side code can be found in `mobile/` with documentation found in `mobile/docs/`. Client-side documentation was done using _jsdoc_ and can be viewed by opening the `index.html` file in the browser.

Check out our video demonstration of the project [here](https://www.youtube.com/watch?v=WM0FaZFdtrc)!

## Testing Out The Project

If you would like to try out the project, follow the instructions here:

1. Ensure that you have Android Studio, as well as an Android emulator, installed. Follow the instructions [here](https://reactnative.dev/docs/environment-setup) to set up the environment.
2. Clone this project locally.
3. Within a terminal, navigate to `/mobile` and run `npm install`. Then navigate to `/Backend` and run `npm install`.
4. Optional: The current configuration of the project is designed to run via the cloud. If you would instead like to test the project using a local server, following the instructions here:

   Edit the config files

   - `/mobile/services/config.js`: Uncomment Line 1 and comment out Line 2. Replace the value `YOUR_IP_ADDRESS` with your ipv4 address.

5. Open 2 terminals and do the following in each:

   - Terminal 1: Navigate to `/mobile` and run `npx react-native start`
   - Terminal 2: Navigate to `/mobile` and run `npx react-native run-android`

6. Optional: If running locally, after performing step 4, open a 3rd terminal and do the following:
   - Terminal 3: Navigate to `/Backend` and run `npm run start`

# Contribution Guide

The following is a guide for contributions to the project.

Currently, the project is developed by Team Generic SG Team. As such, the following guide is meant for the Team Generic SG Team Development Team.

## Quick Git Guide

### Getting the latest version

The latest stable version can be found at branch `dev`. In your local project root, ensure you are on your own local development branch, then run `git fetch` to fetch all updates from remote branches.

Once done, run `git merge origin/dev` to merge the changes from `dev` branch into your local development branch.

### Commiting Changes

When you have made changes to the project and would like to push them, use `git push origin <LOCAL_BRANCH_NAME>:staging`, where `LOCAL_BRANCH_NAME` refers to the name of your local branch.

Then navigate to the github repository and select the **Pull requests** tab, followed by **New pull request**.

Ensure that the branches listed are `base:dev` <- `compare:staging`. Then click on **Create pull request** to submit the pull request.

## For Development

Remember to ensure that all dependencies are installed by running `npm install` in **both** `PATH/TO/PROJECT/ROOT/mobile/` and `PATH/TO/PROJECT/ROOT/Backend/` _(You have to do them seperately)_

Additionally, several config files need to be manually added for security.

1. A file called `config.js` must be created in `PATH/TO/PROJECT/ROOT/mobile/src/services/`. It should contain

```
export const LOCALHOST = 'YOUR_IPV4_ADDRESS:4000' or 'AWS_IP_ADDRESS:80'
export const FLASKHOST = 'FLASK_SERVER_IP_ADDRESS:80'
export const GOOGLE_WEBCLIENT_ID = 'GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION'
```

> The value `YOUR_IPV4_ADDRESS` can be found by running `ipconfig` in your terminal. Alternatively, if you are looking to test the AWS server, replace this with `AWS_IP_ADDRESS`, which can be obtained from @nicholaswko. Similarly, the value `FLASK_SERVER_IP_ADDRESS` refers to the Flask server running on AWS and can be obtained from @nicholaswko.

> The value `GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION` can be found in the firebase or google cloud console for the project.

2. A file called `.env` must be created in `PATH/TO/PROJECT/ROOT/Backend/`. It should contain

```
DATABASE_ACCESS = 'LINK_TO_DATABASE_FOR_USERS'
QUEUE  = "LINK_TO_DATABASE_FOR_QUEUES"
AUTHENTICATION_TOKEN = "123"
CLIENT_ID = 'GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION'
BESTTIME_API_KEY = 'BESTTIME_API_PRIVATE_KEY'
```

> The value `GOOGLE_WEB_CLIENT_ID_FOR_APPLICATION` can be found in the firebase or google cloud console for the project.

> The values `LINK_TO_DATABASE_FOR_USERS` and `LINK_TO_DATABASE_FOR_QUEUES` need to be entered as well. (Refer to Telegram)

> The value `BESTIME_API_KEY` can be found in the BestTimeAPI console under settings.

3. The file `google-services.json` must be manually added to the project at `/PATH/TO/PROJECT/ROOT/mobile/android/app`.

> This file can be downloaded from the application's firebase console, under `project settings`.

### How to Run

Open up 3 terminals and follow the instructions for each. If you are testing using the AWS server, you can skip the steps for Terminal 3.

#### Terminal 1 (Metro)

Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native start`

#### Terminal 2 (Android)

Terminal 2: Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native run-android`

#### Terminal 3 (Express)

Terminal 3: Navigate to `PATH/TO/PROJECT/ROOT/Backend/` and run `npm run start`

### Project Structure

The current file tree is listed here. Most Android, ios and docs files and folders have been omitted for brevity.

```
|-- Root
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- Backend
    |   |-- .env
    |   |-- .gitignore
    |   |-- GSGTOpenAPIDoc.json
    |   |-- package-lock.json
    |   |-- package.json
    |   |-- server.js
    |   |-- .ebxtensions
    |   |-- models
    |   |   |-- queueUser.js
    |   |   |-- serviceProviderData.js
    |   |   |-- signup.js
    |   |   |-- userHistory.js
    |   |-- routes
    |   |   |-- history.js
    |   |   |-- login.js
    |   |   |-- queue.js
    |   |   |-- register.js
    |   |   |-- serviceProvider.js
    |   |-- tools
    |       |-- nodemailer.js
    |-- Documents
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
        |-- README.md
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
        |-- docs
        |-- ios
        |-- src
        |   |-- assets
        |   |   |-- appsetting1.png
        |   |   |-- appsetting2.png
        |   |   |-- appsetting3.png
        |   |   |-- appsetting4.png
        |   |   |-- chef.png
        |   |   |-- defaultProfilePic.png
        |   |   |-- filter-all.png
        |   |   |-- filter-bar.png
        |   |   |-- filter-cafe.png
        |   |   |-- filter-restaurant.png
        |   |   |-- frame.png
        |   |   |-- group.png
        |   |   |-- index.js
        |   |   |-- PlaceholderProfile.png
        |   |   |-- QQueue_Onboarding_1.png
        |   |   |-- QQueue_Onboarding_2.png
        |   |   |-- QQueue_Onboarding_3.png
        |   |   |-- QQueue_Small.png
        |   |   |-- react-native-logo.png
        |   |-- components
        |   |   |-- atoms
        |   |   |   |-- CardDescription
        |   |   |   |   |-- index.js
        |   |   |   |-- CategoryFilter
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalSection
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalSectionImage
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
        |   |   |   |-- HistoryEntry
        |   |   |   |   |-- index.js
        |   |   |   |-- HorizontalBlock
        |   |   |   |   |-- index.js
        |   |   |   |-- QueueBar
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
        |   |       |   |-- index.js
        |   |       |-- RewardsScreenContent
        |   |       |   |-- index.js
        |   |       |-- ServiceProvider
        |   |           |-- CustomerDetailsScreenContent.js
        |   |           |-- index.js
        |   |           |-- InsertCustomerScreenContent.js
        |   |           |-- ServiceProviderHomeScreenContent.js
        |   |           |-- ServiceProviderLoginScreenContent.js
        |   |           |-- ServiceProviderProfileContent.js
        |   |-- navigations
        |   |   |-- app-navigator.js
        |   |   |-- auth-navigator.js
        |   |   |-- ServiceProviderNavigators
        |   |   |   |-- home-navigator.js
        |   |   |-- UserNavigators
        |   |       |-- account-navigator.js
        |   |       |-- chat-navigator.js
        |   |       |-- home-navigator.js
        |   |-- scenes
        |   |   |-- Account
        |   |   |   |-- index.js
        |   |   |-- AppSettings
        |   |   |   |-- index.js
        |   |   |-- Chat
        |   |   |   |-- index.js
        |   |   |-- CustomerDetails
        |   |   |   |-- index.js
        |   |   |-- History
        |   |   |   |-- index.js
        |   |   |-- Home
        |   |   |   |-- index.js
        |   |   |-- InsertCustomer
        |   |   |   |-- index.js
        |   |   |-- Login
        |   |   |   |-- index.js
        |   |   |-- Notifications
        |   |   |   |-- index.js
        |   |   |-- Onboarding
        |   |   |   |-- index.js
        |   |   |-- QRCodeReader
        |   |   |   |-- index.js
        |   |   |-- Registration
        |   |   |   |-- index.js
        |   |   |-- Rewards
        |   |   |   |-- index.js
        |   |   |-- ServiceProvider
        |   |   |   |-- CustomerDetails.js
        |   |   |   |-- index.js
        |   |   |   |-- InsertCustomer.js
        |   |   |   |-- ServiceProviderHome.js
        |   |   |   |-- ServiceProviderLogin.js
        |   |   |   |-- ServiceProviderProfile.js
        |   |   |   |-- ServiceProviderRegistration.js
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
        |   |   |   |-- advanceQueue.js
        |   |   |   |-- getQueue.js
        |   |   |   |-- getQueueWaitTime.js
        |   |   |   |-- index.js
        |   |   |   |-- joinQueue.js
        |   |   |   |-- leaveQueue.js
        |   |   |-- serviceProviders
        |   |       |-- getNearbyServiceProviders.js
        |   |       |-- getRecommendedServiceProviders.js
        |   |       |-- getServiceProviders.js
        |   |       |-- index.js
        |   |-- store
        |       |-- index.js
        |       |-- account
        |       |   |-- actions.js
        |       |   |-- constants.js
        |       |   |-- reducers.js
        |       |-- socket
        |           |-- reducers.js
        |-- __tests__
            |-- App-test.js

```
