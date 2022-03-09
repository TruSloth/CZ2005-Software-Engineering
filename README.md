# For Development

Remember to ensure that all dependencies are installed by running `npm install` in **both** `PATH/TO/PROJECT/ROOT/mobile/` and `PATH/TO/PROJECT/ROOT/Backend/` _(You have to do them seperately)_

Additionally, a file called `config.js` must be created in `PATH/TO/PROJECT/ROOT/mobile/services/` with the line `export const LOCALHOST = 'YOUR_IPV4_ADDRESS'`. The value `YOUR_IPV4_ADDRESS` can be found by running `ipconfig` in your terminal.

## How to Run

Open up 3 terminals and follow the instructions for each.

### Terminal 1 (Metro)

Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native start`

### Terminal 2 (Android)

Terminal 2: Navigate to `PATH/TO/PROJECT/ROOT/mobile/` and run `npx react-native run-android`

### Terminal 3 (Express)

Terminal 3: Navigate to `PATH/TO/PROJECT/ROOT/Backend/` and run `npm run start`

## Project Structure

The current file tree is listed here. Android & ios files and folders have been omitted for brevity.

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
    |   |   |-- signup.js
    |   |-- routes
    |   |   |-- login.js
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
        |   |   |   |-- AltLoginOptions
        |   |   |   |   |-- index.js
        |   |   |   |-- AppBottomSheet
        |   |   |   |   |-- index.js
        |   |   |   |-- BottomTabBar
        |   |   |   |   |-- index.js
        |   |   |   |-- HistoryEntry
        |   |   |   |   |-- index.js
        |   |   |   |-- LoginForm
        |   |   |   |   |-- index.js
        |   |   |   |-- StoreInfoContent
        |   |   |   |   |-- index.js
        |   |   |   |-- TopBanner
        |   |   |       |-- index.js
        |   |   |-- organisms
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
        |   |   |-- History
        |   |   |   |-- index.js
        |   |   |-- Home
        |   |   |   |-- index.js
        |   |   |-- Login
        |   |   |   |-- index.js
        |   |   |-- Onboarding
        |   |   |   |-- index.js
        |   |   |   |-- oldOnboardingScreen.js
        |   |   |-- Registration
        |   |   |   |-- index.js
        |   |   |-- StoreDetailedInfo
        |   |   |   |-- index.js
        |   |   |-- TempVerify
        |   |       |-- index.js
        |   |-- services
        |   |   |-- config.js
        |   |   |-- auth
        |   |       |-- login.js
        |   |       |-- register.js
        |   |       |-- verify.js
        |   |-- store
        |       |-- index.js
        |       |-- auth
        |           |-- actions.js
        |           |-- constants.js
        |           |-- reducers.js
        |-- __tests__
            |-- App-test.js

```
