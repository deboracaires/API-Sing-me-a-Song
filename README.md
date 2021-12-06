# **API - Sing Me A Song**

It's a project for recommendate youtube links.

### **About the project**
The user can recommendate musics using youtube links and also receive recommendation that other users posts.

<br />

### **Tolling**

- [Node JS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

 <br />

## **Getting Started**

### **Prerequisites**

- You must have node and npm installed.

<br />

### **Installation**

1 -  Clone the backend

```sh
https://github.com/deboracaires/MyWallet_Back.git
```

2 - Run npm i to install all dependencies.

```sh
npm i
```

3 - Create the files .env, .env.dev and .env.test following the .env.example or the following variables

```sh
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=
PORT=
DATABASE_URL=
```

4 - Create a database on postgres and populate it using the script available on /src/database/dump.sql

5 - Now, set the environment variables according to data from your database. Don't forget to create the database for testing.

   <br />

### **How to run**

1 -  To run the app in the production mode:

```sh
npm run start
```

2 - To run the app in the development mode:

```sh
npm run dev
```
3. To run all tests:

```sh
npm run test
```
3. To see the coverage of all tests:

```sh
npm run test-c
```

### **Deployment**

- This project is deployed on Heroku. The url is https://api-sing-me-a-song-dc.herokuapp.com/. 
