NODE Authentication APP

API to for registering users with mongodb and Authentication using a JWT (json web token). This App uses passport and passport-jwt implementing JWT strategy.

Usage
npm install

Endpoints:

POST /users/register

POST /users/authenticate //Gives back a token

GET /users/profile  //Need json web token to authorize
