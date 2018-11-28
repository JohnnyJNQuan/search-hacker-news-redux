# Search Hacker News

It is a hacker news searching app for user to search stories of hacker news which is powered by Algolia. You can do wild card search with only typing keyword in the searching input field and getting search result with highlighted keyword instantly. you can also sort by popularity/date, filter it with a limited timeframe and switch between different pages to locate what you would like to read.

just access https://searchclient.azurewebsites.net/
# Get Started

1. **Initial Machine Setup**

    Please complete the [Initial Machine Setup](#initial-machine-setup) first.

2. **Clone the project**

    `git clone https://github.com/JohnnyJNQuan/search-hacker-news-redux.git`.

3. **Run the setup script**

    `npm run setup`

4. **Run the example app**

    `npm start -s`

    This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this project, this command will continue watching all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build.

## Initial Machine Setup

1. **Install [Node 4.0.0 or greater](https://nodejs.org)**

    (5.0 or greater is recommended for optimal build performance)
    Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).

2. **Install [Git](https://git-scm.com/downloads)**.

3. **[Disable safe write in your editor](https://webpack.js.org/guides/development/#adjusting-your-text-editor)** to assure hot reloading works properly.

4. Complete the steps below for your operating system:

    ### macOS

    * Install [watchman](https://facebook.github.io/watchman/) via `brew install watchman` or fswatch via `brew install fswatch` to avoid [this issue](https://github.com/facebook/create-react-app/issues/871) which occurs if your macOS has no appropriate file watching service installed.

    ### Linux

    * Run this to [increase the limit](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc) on the number of files Linux will watch. [Here's why](https://github.com/coryhouse/react-slingshot/issues/6).

        `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`.

    ### Windows
    
    * **Install [Python 2.7](https://www.python.org/downloads/)**. Some node modules may rely on node-gyp, which requires Python on Windows.
    * **Install C++ Compiler**. Browser-sync requires a C++ compiler on Windows.
    
      [Visual Studio Express](https://www.visualstudio.com/en-US/products/visual-studio-express-vs) comes bundled with a free C++ compiler.
      
      If you already have Visual Studio installed:
      Open Visual Studio and go to File -> New -> Project -> Visual C++ -> Install Visual C++ Tools for Windows Desktop.
      The C++ compiler is used to compile browser-sync (and perhaps other Node modules).

---

## Having Issues? Try these things first

1. Make sure you ran all steps in [Get started](#get-started) including the [initial machine setup](#initial-machine-setup).
2. Run `npm install` - If you forget to do this, you'll see this: `babel-node: command not found`.
3. Install the latest version of Node. Or install [Node 5.12.0](https://nodejs.org/download/release/v5.12.0/) if you're having issues on Windows. Node 6 has issues on some Windows machines.
4. Make sure files with names that begin with a dot (.editorconfig, .gitignore, .npmrc) are copied to the project directory root. This is easy to overlook if you copy this repository manually.
5. Don't run the project from a symbolic link. It may cause issues with file watches.
6. Delete any .eslintrc that you're storing in your user directory. Also, disable any ESLint plugin / custom rules that you've enabled within your editor. These will conflict with the ESLint rules defined in this project.
7. Make sure you don't have NODE_ENV set to production on your machine. If you do then the [development dependencies won't be installed](https://github.com/coryhouse/react-slingshot/issues/400#issuecomment-290497767). Here's [how to check](http://stackoverflow.com/a/27939821/26180).
8. Install watchman with `brew install watchman` if you are having the following error after an initial `npm start -s`:

    ```bash
    2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    2017-09-05 00:44 node[68587] (FSEvents.framework) FSEventStreamStart: register_with_server: ERROR: f2d_register_rpc() => (null) (-22)
    events.js:160
          throw er; // Unhandled 'error' event
          ^

    Error: Error watching file for changes: EMFILE
        at exports._errnoException (util.js:1022:11)
        at FSEvent.FSWatcher._handle.onchange (fs.js:1406:11)
    ```

9. Tip: Things to check if you get an `npm run lint` error or build error:

    * If ESW found an error or warning in your project (e.g. console statement or a missing semi-colon), the lint thread will exit with `Exit status 1`. To fix:

      1. Change the `npm run lint` script to `"esw webpack.config.* src tools; exit 0"`
      1. Change the `npm run lint:watch` script to `"esw webpack.config.* src tools --watch; exit 0"`

      > Note: Adding `exit 0` will allow the npm scripts to ignore the status 1 and allow ESW to print all warnings and errors.
    * Ensure the `eslint`/`esw` globally installed version matches the version used in the project. This will ensure the `esw` keyword is resolved.

10. Rebuild node-sass with `npm rebuild node-sass` if you are having and error like `Node Sass does not yet support your current environment on macOS XXX` after an initial `npm start -s`.

---
## Folder Structure

```bash
.
├── .editorconfig             # Configures editor rules
├── .gitignore                # Tells git which files to ignore
├── .istanbul.yml             # Configure istanbul code coverage
├── .npmrc                    # Configures npm to save exact by default
├── README.md                 # This file.
├── dist                      # Folder where the build script places the built app. Use this in prod.
├── package.json              # Package configuration. The list of 3rd party libraries and utilities
├── src                       # Source code
│   ├── actions               # Flux/Redux actions. List of distinct actions that can occur in the app.
│   ├── components            # React components
│      ├── containers         # Top-level React components that interact with Redux
│      ├── presentationals    # Stateless React presentational components that callback container component.
│   ├── constants             # Application constants including constants for Redux
│   ├── favicon.ico           # favicon to keep your browser from throwing a 404 during dev. Not actually used in prod build.
│   ├── index.ejs             # Template for homepage
│   ├── index.js              # Entry point for your app
│   ├── reducers              # Redux reducers. Your state is altered here based on actions
│   ├── store                 # Redux store configuration
│   ├── styles                # CSS Styles, typically written in Sass
│   └── utils                 # Plain old JS objects (POJOs). Pure logic. No framework specific code here.
├── tools                     # Node scripts that run build related tools
│   └── analyzeBundle.js      # Analyzes the webpack bundle
│   ├── assetsTransformer.js  # Fix for jest handling static assets like imported images
│   ├── setup                 # Scripts for setting up a new project using React Slingshot
│   │   ├── setup.js          # Configure project set up
│   │   ├── setupMessage.js   # Display message when beginning set up
│   │   └── setupPrompts.js   # Configure prompts for set up
│   ├── build.js              # Runs the production build
│   ├── chalkConfig.js        # Centralized configuration for chalk (adds color to console statements)
│   ├── distServer.js         # Starts webserver and opens final built app that's in dist in your default browser
│   ├── nodeVersionCheck.js   # Confirm supported Node version is installed
│   ├── srcServer.js          # Starts dev webserver with hot reloading and opens your app in your default browser
│   ├── startMessage.js       # Display message when development build starts
│   ├── testCi.js             # Configure Jest to run on a CI server
├── webpack.config.dev.js     # Configures webpack for development builds
└── webpack.config.prod.js    # Configures webpack for production builds
```


## What do the scripts in package.json do?

Unfortunately, scripts in package.json can't be commented inline because the JSON spec doesn't support comments, so I'm providing info on what each script in package.json does here.

| **Script**        | **Description**                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prestart          | Runs automatically before start to display a message.                                                                                                      |
| start             | Runs tests, lints, starts dev webserver, and opens the app in your default browser.                                                                        |
| lint:tools        | Runs ESLint on build related JS files. (eslint-loader lints src files via webpack when `npm start` is run)                                                 |
| clean-dist        | Removes everything from the dist folder.                                                                                                                   |
| remove-dist       | Deletes the dist folder.                                                                                                                                   |
| create-dist       | Creates the dist folder and the necessary subfolders.                                                                                                      |
| prebuild          | Runs automatically before build script (due to naming convention). Cleans dist folder, builds html, and builds sass.                                       |
| build             | Bundles all JavaScript using webpack and writes it to /dist.                                                                                               |
| test              | Runs tests (files ending in .spec.js or .test.js) using Jest and outputs results to the command line. Watches all files so tests are re-run upon save.     |
| test:cover        | Runs tests as described above. Generates a HTML coverage report to ./coverage/index.html                                                                   |
| test:cover:travis | Runs coverage as described above, however sends machine readable lcov data to Coveralls. This should only be used from the travis build!                   |
| analyze-bundle    | Analyzes webpack bundles for production and gives you a breakdown of where modules are used and their sizes via a convenient interactive zoomable treemap. |
