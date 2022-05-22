# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'product/' //GET
- Show  'product/:id' //GET
- Create [token required] 'product/' //POST

#### Users
- Index [token required] 'user/' //GET
- Show [token required] 'user//:id' //GET
- Create N[token required] 'user/' //POST

#### Orders
- Current Order by user (args: user id)[token required] '/order/:user_id' //GET



## Data Shapes

#### Product
id
name
price
Table: products (id:serial[primary key], name:varchar(150), price:integer(150))

#### User
id
firstName
lastName
password
Table: users (id:serial[primary key], firstName:varchar(150) [NOT NULL], lastName:varchar(150) [NOT NULL], password:varchar(150) [NOT NULL)

#### Orders
id
product_id
quantity 
user_id
status 
Table: orders (id:serial[primary key], product_id:integer(foreign key to products table), quantity:integer, user_id:integer(foreign key to users table), status: varchar(150) [NOT NULL])