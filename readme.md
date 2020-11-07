# Express Authentication Notes

## Create & Set Up Node App
1. .gitignore 
2. create controllers & views folders
3. install relevant packages/dependencies & set up the relevant files
> make sure you have auth.js in your controllers; login.ejs & signup.ejs in the auth folder of your views folder
4. stub out the necessary routes in the your auth controller
    ```
    GET /auth/signup  - form where the user can register 

    POST /auth/signup  - route to create a user in the database

    GET /auth/login - form where users can login

    POST /auth/login - validate the users e-mail and password
    ```
5. in the index.js, make sure to init all the packages:

    * require express & init it; require express-ejs-layouts
    * set up ejs and ejs layouts
    * set up a body parser middleware to make req.body work  

6. configure the routes in the controller from `.send` to `.render` and include the relevant ejs files for each route
7. set up the sign-up and log-in forms and verify that it's working
> make sure to include a middle-ware parser so req.body works and you get your inputs defined!
8. time for databases! install pg & sequelize, then init sequelize
9. create user model & migrate it; make sure to test it out and check psql!
10. set up validation parameters in models/user.js for all name, email, and password
11. for password protection, make sure to install bcrypt to create highly secure salted hashed passwords

## How to set up from starter code/boilerplate: 

1. Fork & clone this repo

2. Install dependencies
```
npm i
```

3. create a config.json with the following code: 
```
{
  "development": {
    "database": "<insert develop db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```
**Note:** If your database requires a username and password, you'll need to include these as well.

4. Create database
```
sequelize db:create <insert db name here>
```

5. Migrate the `user` model to your database
```
sequelize db:migrate
```

6. Add `SESSION_SECRET` and `PORT` environment variables in a `.env` file (can be any string).


