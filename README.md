# SantaCruzRideApp

## Getting started
I built this repository by following these tutorials. If you are in doubt about the code, maybe scan through these tutorials to get an understanding of how I built the project.

 - [Setting up NodeJS and Express for React](https://www.section.io/engineering-education/how-to-setup-nodejs-express-for-react/)
 - [MongoDB Atlas Quick Start](https://www.mongodb.com/docs/drivers/node/current/quick-start/)
 - [Getting Started with Create React App](https://create-react-app.dev/docs/getting-started)
 - [Eslint and Prettier Configuration for NodeJS Project](https://gist.github.com/geordyjames/b071e0bb13e74dea94ec37a704d26b8b)

### Setting Up Your Development Environment

 1. Install  [Visual Studio Code](https://code.visualstudio.com) 
	 - Download the [Prettier code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for Visual Studio Code. 
	 - Download the [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code
	 - Setup formatting on save:
		 - Open Visual Studio Code
		 -   `Command (Control for Windows) + Shift + P` Opens the command palette
		 - Type: Preferences: Open Settings
		 - This should open a `settings.json` file 
		 - Insert "`editor.formatOnSave": true` after the "launch" block
		 - Example my settings.json looks like this:
    { 
    "launch": { 
    "configurations": [] 
    },
    "editor.formatOnSave": true, 
    "javascript.format.enable": false, 
    "workbench.colorTheme": "Default Dark+",
    "workbench.startupEditor": "none",
    "window.zoomLevel": 1
    }

 2. Install  [NodeJS and npm](https://nodejs.org/en/) (Follow through with the Node Installer, I recommend installing the LTS version for Node)
 3. Create a [MongoDB Account](https://www.mongodb.com)  so that I can add you to our database cluster

### Running the Backend and Client

#### Background Information
- There are two folders in our project `Backend` and `Client` . `Backend` is a node project, `Client` is a React project
- `Backend` was created by following the tutorial mentioned in the getting started section above. I used CreateReactApp to create the `Client`

#### Step 1 - Setting up the Backend

Go into the project directory with terminal:
 `cd SantaCruzRideApp` 

Lets first setup the Backend. This should install the necessary modules:
`cd Backend` 
`npm install` 

Everything should be installed now. We need to just provide our Database connection string you will need to be added to the `SantaCruzRideApp-Cluster` 





