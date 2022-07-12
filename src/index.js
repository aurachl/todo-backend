const Express = require("express");
const RequestHandler = require("./handlers/todos");
const cors = require("cors");

const { initializeDB } = require("./db");
const {
    displayServerRunningMessage,
    displayDBInitializedMessage,
} = require("./utils/prompt");
//Create API
const appPort = 3000;
const Api = Express();

//Middlewares
//Return functions with request, response,next
Api.use(Express.json());
//Return functions with request, response,next, transform json
Api.use(Express.urlencoded({ extended: false }));
//Security to Block requests
Api.use(cors());
//Testing -> localhost:3000/----
Api.use("/api/v1", RequestHandler);

//Starting the server
Api.listen(appPort, () => {
    displayServerRunningMessage(appPort);
    initializeDB().then(displayDBInitializedMessage);
});