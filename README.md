# MyStock 📈

![MyStock Web APP](https://github.com/Isabella-Tsui/StockMarketApp/blob/main/front-end/src/images/readme.png?raw=true)

## Overview

MyStock is a stock market app that dynamically displays historical data charts, market overviews and company data. MyStock also allows users to create protected, authenticated accounts which they can use to track market data through updatable watch lists.

## Current Functionalities

✔ Display the most current finanical data of a given stock

✔ Display the most current company data of a given stock

✔ Visualize 2 months of worth of stock data through charts

✔ Add and remove watch lists

✔ Add and remove stocks from watch lists

## Future Improvements

- Allowing input to submit using the enter key
- Having a file containing the global variables
- Implementing barriers against injection attacks
- Creating a catch-all for non-existing routes and pages

## Usage

### Step 1: Enter Database Credentials

- In the **back-end/server.js** file, enter your database credentials. There are
  comments that tell you where to put this information.

### Step 2: Install Dependencies

In order for you to start local dev, you will need to install the dependencies. To do this you will run `npm i` or `npm install` in all directories that contain a package.json file. This command will generate all the necessary **node modules** and the **package-lock.json** file (i.e. if these are not generated, then Local Dev will not work)
_Specifically, you will do the following:_

- Run `npm i` in the **back-end** directory
- Run `npm i` in the the **front-end** directory

### Local Development

1. Open two terminals: one for the front-end and one of the back-end
2. Run `npm run start` in the **back-end** directory
3. Run `npm run start` in the **front-end/** directory

- Local development will occur at http://localhost:3000/

## Contributors

- @iamfazal who assisted in depolying the server
- @ecmartins who created the template of this web app
