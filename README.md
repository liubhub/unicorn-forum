# Unicorn Forum

Unicorn Forum is my personal project which I did to get familiar with React and Django. 
It is not completely finished (see # TODOs section).

It is made with:
  - Python 3.6.4;
  - Django 2.0;
  - React 16.3
  - SASS & Bulma.css for styling.
  - MySQL Database.

Also JWT for authorization/authentication and AJAX for different
API calls. 
 
### Installation

It requires MySQL and virtualenv being installed on your machine.

```sh
mkdir unicorn_forum
cd unicorn_forum
```
Note dots:
```sh
git clone https://github.com/liubhub/unicorn-forum.git .
virtualenv -p python3 .
source bin/activate
```
Install requirements:
```sh
pip install -r requirements.txt
```
Than, you need MySQL:
Login to MySQL
```sh
mysql -u your_username -p
```
and create database:
```sh
create database unicorn_forum
```
Return to your console, activate the virtual environment and create variables with login,
password to mysql and your database name:
```sh
\q
export DATABASE_NAME='unicorn_forum'
export DATABASE_USER='your_username'
export DATABASE_PASSWORD='your_password'
```
Change directory:
```sh
cd forum
```
Than input your django SEKRET_KEY in forum/settings.py (you can generate it here
(https://www.miniwebtool.com/django-secret-key-generator/)
To create all database tables, run:
```sh
python manage.py migrate 
```
Then you can run project typing a command:
```sh
python manage.py runserver
```

As a django project, unicorn_forum consists of different apps.
- api - for easy fetching data from database (i.e. /api/users, /api/threads)
- users - for all methods, related to users. For example, registration and authorization.
- app - main app with all models and basic methods.
- frontend - frontend app (see below)
- chat - future app for chat in the forum (currently it is a #TODO). 

#### Frontend app
React in its own “frontend” Django app: load a single HTML template and let React manage the frontend. All templates are saved in this app. 

Here are instructions how to configure frontend environment.

In your main folder where all virtualenv files are saved 
(it is unicorn_forum if you followed instructions):
initialize the environment
```sh
npm init -y
```
next up install webpack and webpack cli with
```sh
npm i webpack webpack-cli --save-dev
```
Now open up package.json and configure the scripts:
```sh
"scripts": {
  "dev": "webpack --mode development ./forum/frontend/src/index.js --output ./forum/frontend/static/frontend/main.js",
  "build": "webpack --mode production ./forum/frontend/src/index.js --output ./forum/frontend/static/frontend/main.js"
}
```
Close the file and save it.
Now let’s install babel for transpiling our code:
```sh
npm i babel-core babel-loader babel-preset-env babel-preset-react babel-plugin-transform-class-properties --save-dev
```
Pull in React and prop-types:
```sh
npm i react react-dom prop-types --save-dev
```
Configure Babel by creating a new file named .babelrcinside the project folder:
```sh
{
    "presets": [
        "env", "react"
    ],
    "plugins": [
        "transform-class-properties"
    ]
}
```
And finally create a new file named webpack.config.js for configuring babel-loader:
```sh
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
```
Now, to make webpack watch files for changes, you can run:
```sh
npm run dev
```

#### Email verification
To enable email verification after registration on forum, set EMAIL_HOST_USER and EMAIL_HOST_PASSWORD
variables in the forum/settings.py (works correct with gmail).

## TODO
- chat app;
- edit_profile method;