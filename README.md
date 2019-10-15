
# restful-api-node.js (book-api)

It is a simple web api project developed under the framework of express-framework with document-based database mongodb and rich content node.js

## [](https://github.com/sinantok/restful-api-node.js#requirements)Requirements

The terminal can be installed globally with the command  `npm install express-generator-g`  on the terminal. You must then install all dependencies by running them. The dependencies in the package.json file are installed with the  `npm install`  command.

## [](https://github.com/sinantok/restful-api-node.js#propertis)Propertis
- Node.js
- Ecmascript 6
- Express-Framework
-	MongoDB
-	Heroku
-	Travis
-	Git workflow

# [](https://github.com/sinantok/restful-api-node.js#usage)Usage

## [](https://github.com/sinantok/restful-api-node.js#index)Index
| **Route** | **HTTP Request** | **Post Body** | **Description**|
|--|--|--|--|
| **/** | Get | Empty | Get Home Page |
| **/register** | Post | { userName: 'sample', password:'12345' } | Create a new user. |
| **/login** | Post | { userName: 'sample', password:'12345' } | Create a new token. |

## [](https://github.com/sinantok/restful-api-node.js#books)Books
| **Route** | **HTTP Request** | **Post Body** | **Description**|
|--|--|--|--|
| **api/book** | Get | Empty | Get list all book. |
| **api/book** | Post | {'title':'sample', 'category':'desp', 'country':'Turkey', published_date:1996, pages:450, scoring: 9.5, author_id:"id" } | Create a new book. |
| **api/book/:book_id** | Get | Empty | Get a book. |
| **api/book/:book_id** | Put | {'title':'sample', 'category':'desp2'} | Update a book with new info. |
| **api/book/:book_id** | Delete | Empty | Delete a book. |
| **api/book/top10** | Get | Empty | Get the top 10 score book. |
| **api/book/between/:start_year/:end_year** | Get | Empty | Get books between two dates. |

## [](https://github.com/sinantok/restful-api-node.js#authors)Authors
| **Route** | **HTTP Request** | **Post Body** | **Description**|
|--|--|--|--|
| **api/author** | Get | Empty | Get list all books. |
| **api/author** | Post | { name: 'sample', surname:'sample', bio:'lorem' } | Create a new author. |
| **api/author/:author_id** | Get | Empty | Get a author. |
| **api/author/:author_id** | Put | {'title':'sample', 'category':'desp2'} | Update a author with new info. |
| **api/author/:author_id** | Delete | Empty | Delete a author. |

## [](https://github.com/sinantok/restful-api-node.js#demo)Demo
You can try it on heroku. [Live demo on Heroku](https://book-api-service.herokuapp.com/)

Thanks!
