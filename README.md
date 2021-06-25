# mxProject

Simple Angular + Nest Application

# INSTRUCTIONS

 - For each one, run npm i to install dependencies
 - Running FrontEnd - ng serve
 - Running BackEnd - npm run start:dev
 - Using MySQL Database

# GOALS

  - Create a backend HTTP restful application using JAVA or Nest JS framework - DOCS https://docs.nestjs.com/ 
  - Create a frontend application using JAVA or Angular Framework to consume the HTTP Nest Application - DOCS https://angular.io/docs 

---

# API REST

## Create a restful api to manage products and orders

Products:
  - id
  - Name
  - Price
  - Category

Orders
  - id
  - Total Price
  - Products list

All the fields are required.

## Details

  - Create a complete CRUD (Create, Read, Update, Delete) for products and orders.
  - It Should be possible change products inside a order. (Only for products of same category).

## Routes

/products
/orders

Return errors, case exists.

Is not required save the data in a Database, keep the data in an Array.

--- 

# Frontend

  - It Should be able to consume the Api.
  - Show errors and success messages.
  - Mask the currency inputs.

---

# REPO
  - Create a public repository in your github account, and upload the test there.
  - Place a README.MD, with instructions.
