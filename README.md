# Getting Started


## BE SETUP 

In the project directory run 
### `npm install`
This will install all packages

Create .env file with variable FIXER_API_KEY and MONGO_URI
If you have account on [www.fixer.io](https://fixer.io/) grab your KEY and assign it to the FIXER_API_KEY variable.
If you don't have the account, create one and and assign it to the FIXER_API_KEY variable.

In similiar fashion get your credentials from MONGODB and asign it to the variable.

Then run comand
### `npm start`

You should see in the console that the `Server listening on port 4000...`

## FE SETUP 

Open new terminal and go to client directory

### `cd client`

Then run again as in BE setup comands
### `npm install`
and 
### `npm start`

If everything goes well you should see popping a new tab in your browser with the app running on http://localhost:3000/
