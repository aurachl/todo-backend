const {open} = require("sqlite");
const sqlite3 = require("sqlite3");

//Create DB File
async function getDBHandler() {
    try {
        //Interact with the DB
        //Create/Open DB
        const dbHandler = await open({
            filename: "database.sqlite",
            driver: sqlite3.Database,
        });
        
        if (!dbHandler)
            throw new TypeError(`DB Handler expected got: ${dbHandler}`);
        
        return dbHandler;
    } 
    
    //Error to proceed to initialize
    catch (error) {
        console.error(
            "There was an error trying to get the DB handler: ",
            error.message
            );
    }
}

//Initialize the DB
async function initializeDB() {
    //Create a table
    try {
        const dbHandler = await getDBHandler();

        //Query to create new table
        await dbHandler.exec(`
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY,
                title TEXT,
                description TEXT,
                is_done INTEGER DEFAULT 0 
            )
        `);

        //Close connection
        await dbHandler.close();
    } 
    
    //Can't create the table
    catch (error) {
    console.error(
        "There was an error trying to initiliaze the database: ",
        error.message
        );
    }
}

//Exports the functions to create/initialize the DB
module.exports = { initializeDB, getDBHandler };
