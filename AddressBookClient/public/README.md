# README #

This README provides instruction on setup and local development for the Intuit Address Book client application.

## Prerequisites ##
Install NodeJS
Install MySql Server
Install Git
Your favorite IDE. We use VS Code here ;)

## First time running locally? ##
If you have downloaded the prerequisistes above, please make sure you do the foollowing actions before trying to run locally. First, open your terminal to the web location of your project locally. Then run the following commands:
1. node -v
    v7.3.0
2. npm -v
    5.5.1
1. npm install

## Running locally ##
In your terminal, navigate to the client folder level.
Then run the following commands:
1. npm start
2. browse to localhost:3000 to view your site locally

### Troubleshooting ###
For windows...
1. ENOENT error port 80
    - this means that something else like IIS may be hogging your localhost port. 
    - run 'iisreset /stop' to stop iis.
2. If any of your npm libaries are out of sync with the package.json (you can check your node_modules folder), you can run any one of the following commands:
    1. npm install
    2. npm install react -save
    3. npm install node-sass-chokidar --save
    4. npm install react-route --save
    5. npm install react-router-dom --save

## Running in Production ##
To run in production, run the following commands in order:
1. npm run build
2. npm run prod
These commands will first create bundled js files in the dist folder. It will then spin up an express server using those bundled files.

### SASS ###
Note that SASS will run as a watch on npm start. This means any time you make a change to a scss file, it will be updated automatically.
To add new scss files, simply add them in the appropriate place, then make sure that main.scss has the correct import reference to it.

### Client side routing ###
Routing is handled via the react-router-dom library. This enables us to hit assign pages and components to url values. These urls are defined in the App.js file and link to components.