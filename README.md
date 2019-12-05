# ConfGames

## Prerequisites

* node
* npm/yarn
* mongo db

## Installation

Run `yarn` or `npm i` in both directories.
Create mongo db for the project

## Get it runnin'!

You have to create `.env` file in `backend` directory and add to it following constants:

* `DB_NAME` - name of mongo database dedicated for this project
* `JWT_SECRET` - secret used for encrypting/decrypting json web token
* `SENDGRID_API_KEY`

### Development

Run `yarn dev`/`npm run dev` in `backend` dir

Run `yarn start`/`npm run start` in `frontend` dir

By default backend app will be listening on port 3003

By default frontend app will be listening on port 3000

### Production

Run
```bash
export NODE_ENV=production
```

Then run `yarn build`/`npm run build` in `frontend` dir
and `yarn start`/`npm run start` in `backend` dir

Backend app will be listening on port 3003

### Changing ports

To change port of frontend/backend app pass `PORT` env variable to command.

**Remember!** If you're changing backend app port when developing you also have to change `proxy` field in `frontend/package.json` 

## Managing sponsors

Run `yarn sponsor-manager`/`npm run sponsor-manager` in `backend` dir

Full details about that command you can see by adding `-h` flag

## Testing

There are no tests! Sorry.

![](https://media1.giphy.com/media/l2YWxlMFmeOAOKO2c/giphy.gif)

## TODO

* Login persistence on frontend
* many more things which are unknown yet...