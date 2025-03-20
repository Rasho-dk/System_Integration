import express from "express";

const app = express();

app.use(express.json()); // middleware som gør at jeg kan modtage json data i min app dvs. parserer json data fra body i min request

import usersRouter from "./routers/usersRouters.js";
app.use(usersRouter); // her gør brug router i min express app


import swaggerJsdoc from "swagger-jsdoc";
const  swaggerDefinition = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Users API",
            version: "0.1.0", // version af min server
        },
    },
    apis:["./routers/*Router.js"], // hvor finder jeg mine routere

};

const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routers/*Router.js"], // hvor finder jeg mine routere

}

import swaggerUi from "swagger-ui-express";
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions))); // swaggerUi.serve er middleware som serverer swaggerUI


const PORT = process.env.PORT ?? 8080;




app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});



/*
https://www.npmjs.com/package/swagger-jsdoc


*/