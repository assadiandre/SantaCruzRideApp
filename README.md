# SantaCruzRideApp

## Getting started

I built this repository by following these tutorials. If you are in doubt about the code, maybe scan through these tutorials to get an understanding of how I built the project.

- [Setting up NodeJS and Express for React](https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/)
- [MongoDB Atlas Quick Start](https://www.mongodb.com/docs/drivers/node/current/quick-start/)
- [Getting Started with Create React App](https://create-react-app.dev/docs/getting-started)
- [Eslint and Prettier Configuration for NodeJS Project](https://gist.github.com/geordyjames/b071e0bb13e74dea94ec37a704d26b8b)

### Setting Up Your Development Environment

1.  Install [Visual Studio Code](https://code.visualstudio.com)

    - Download the [Prettier code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for Visual Studio Code.
    - Download the [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code
    - Setup formatting on save: - Open Visual Studio Code - `Command (Control for Windows) + Shift + P` Opens the command palette - Type: Preferences: Open Settings - This should open a `settings.json` file - Insert "`editor.formatOnSave": true` after the "launch" block - Example my settings.json looks like this:
      {
      "launch": {
      "configurations": []
      },
      "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      },
      "editor.formatOnSave": true,
      "javascript.format.enable": false,
      "workbench.colorTheme": "Default Dark+",
      "workbench.startupEditor": "none",
      "window.zoomLevel": 1
      }

2.  Install [NodeJS and npm](https://nodejs.org/en/) (Follow through with the Node Installer, I recommend installing the LTS version for Node)
3.  Create a [MongoDB Account](https://www.mongodb.com) so that I can add you to our database cluster

### Running the Backend and Client

#### Background Information

- There are two folders in our project `Backend` and `Client` . `Backend` is a node project, `Client` is a React project
- `Backend` was created by following the tutorial mentioned in the getting started section above. I used CreateReactApp to create the `Client`

#### Step 1 - Setting up the Backend

Go into the project directory with terminal:

- `cd SantaCruzRideApp`

Lets first setup the Backend. This should install the necessary modules:

- `cd Backend`
- `npm install`

Now run the following command. This is where we will stash our environment variables:

- `touch .env`

Everything should be installed now, but we still need to populate our .env file. The Database connection string will be needed for this. Make sure you have a MongoDB account setup, and have been added to the `SantaCruzRideApp-Cluster`

Once you're added you should be able to see the project dashboard. Go to `Database Access` in the left tab pane. You should now be viewing the Database Access page. Click on `+ Add New Database User` you will be prompted to provide a user name, password and an IP address.

Once you've setup your user, we can get the connection string the project dashboard in the `Database` section of the left tab pane. Click Connect --> Connect your application. Fill in the connection string with your user details.

You should be able to view a connection string, copy it. My string looks something like this: `mongodb+srv://andreassadi:mypassword@santacruzrideapp-cluste.z8ywr.mongodb.net/SantaCruzRideApp-Cluster?retryWrites=true&w=majority`

Also, make sure to add your public IP address in the network tab, that way you can test on your network.

Now populate our .env file with two fields:

    PORT=3001
    DB_CONNECTION_STRING=mongodb+srv://andreassadi:mypassword@santacruzrideapp-cluste.z8ywr.mongodb.net/SantaCruzRideApp-Cluster?retryWrites=true&w=majority

Now everything is setup, run the backend by running the following command:

    npm run dev

#### Step 2 - Setting up the Client

Now lets setup the Client. This should install the necessary modules:

- `cd Client`
- `npm install`

You can now run the client by typing:

- `npm start`

The Client will be running on a proxy web pack server. A lot of this stuff is handled by Create-React-App. One important thing to note is that if you changed the `PORT` value in your `.env` when setting up the Backend you also need to change it in Client --> `package.json` and there should be a field like this:
`"proxy": "http://localhost:3001"`
Change the port from 3001 to whatever port you changed it to and re-run the Client.

#### Step 3 - Setting up Authentication

Almost everything was implemented by following this tutorial, so check it out if you have any questions: https://www.youtube.com/watch?v=cD17CYA1dck

Everything described below goes from 42:24 to 44:10 in the video right above, although some steps are slightly different.

Run `npm install`

Go to https://console.developers.google.com/apis/dashboard and login.

Create a new project, call it `Santa Cruz Ride App` (or whatever you want). If you're logged into your UCSC account, pick ucsc.edu for Organization and Location.

Click `APIs and Services` on the sidebar on the left. Then click `OAuth consent screen` on the left sidebar.

Select the User Type (either is okay for now, but we'll probably want Internal later), then fill in the required info. No need to fill out the App logo and App domain fields.

Click `Credentials` on the left sidebar. Click `Create Credentials`, which is towards the top left of the page, and then click `OAuth client ID`.

Select `Web application` for the Application type. Fill out the name, then fill out the Authorized JavaScript origins URI field with the backend address. Fill it out with `http://localhost:3001` (doesn't support ports other than 3001 for now, but I will change that later).

Then fill out the Authorized redirect URI field with `http://localhost:3001/auth/google/callback`.

This should create a Client ID and Client Secret.

Add these two fields to our .env file (without the <>s):

    GOOGLE_CLIENT_ID=<client_id_here>
    GOOGLE_CLIENT_SECRET=<client_secret_here>

We should be able to create new users using Google OAuth now. Try making one, and it should be added to whichever database you set in your DB_CONNECTION_STRING in the .env file.

#### Going From Here

Now we can develop in the React app and the Node server. The database is populated right now (as of April 11) with dummy data provided by MongoDB, so later on that should be changed.

The React App has just the default view setup, nothing special so wee need to add some UI there.

The Node backend is pretty messy but it works for what we want, this needs to be pruned.
