# csc-299-project-template README
__NOTE: I made the front-end using the `create-react-app` command. However, I later found out that this command has been deprecated. BUT it is still FUNCTIONAL. If you don't like the idea of using a deprecated command, then [this source](https://blog.bitsrc.io/6-best-ways-to-create-a-new-react-application-57b17e5d331a) provides you with some alternatives.__

## Step 0: Enter Database Credentials
- In the __back-end/server.js__ file, enter your database credentials. There are
comments that tell you where to put this information.


## Step 1: Install Dependencies
In order for you to start local dev, you will need to install the dependencies. To do this you will run `npm i` or `npm install` in all directories that contain a package.json file. This command will generate all the necessary __node modules__ and the __package-lock.json__ file (i.e. if these are not generated, then Local Dev will not work)
_Specifically, you will do the following:_
- Run `npm i` in the __back-end__ directory
- Run `npm i` in the the __front-end__ directory

## Local Development
1) Open two terminals: one for the front-end and one of the back-end
2) Run `npm run start` in the __back-end__ directory
3) Run `npm run start` in the __front-end/__ directory
- Local development will occur at http://localhost:3000/

## Other Helpful Notes:
- __There is currently some starter code in the App.js file that is meant to provide an
example GET request. This will only work once you have followed all the steps above AND have read through and followed the instructions in the comments in back-end/server.js and front-end/App.js.__ 
- Console logs in the server.js file (i.e. in the back-end) will be shown in the terminal where you ran `npm run start` in the __back-end__
- Console logs in the App.js file (i.e. in the front-end) will be found in the console of Chrome's Dev Tools
- In order for your app to work correctly, you must have both your front-end and back-end running (see Step 2)
- If you need to add new dependencies use the command `npm i <dependency name>` in the same directory as the package.json you want to add to
- To remove a dependency, run the command `npm uninstall <dependency name>` in the same directory as the package.json you want to add to
- __AVOID manually adding and removing dependencies from your package.json files (i.e. use `npm i <dependency name>` and `npm uninstall <dependency name>` instead)__
- use `<npm i <dependency name>--save-dev` to install dev dependencies