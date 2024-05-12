# Inventory Management App

The purpose of this project is to showcase my learning in CRUD-methods, MVC design pattern, authentication and serverside rendering.

Deployed live here: https://inventory-app-lq85i.fly.dev/

## Developed with

This project was initialized with express-generator.

### Key technologies:

Front-end:
- Pug
- Tailwind CSS
- JavaScript

Back-end:
- Express
- MongoDB
- PassportJS
- Bcrypt

## Features

Functional:
- Sign in/out or create an account
- View, add, update and delete inventory categories and items

Technical:
- All data is user bound and unauthorized attempts will result in an error
- All data is removed 24 hours from creation to reduce database load
- Error handling includes error page, form validation and added text elements (like error signing in)