import { connect } from "mongoose";
import { APP_CONFIG } from "../config";

class Database {
    constructor() {
        console.log("Database init")
    }
    async connect() {
        try {
            await connect(APP_CONFIG.MONGO_URI);
            console.log("MongoDB Connected...");
          } catch (err) {
            console.log("MongoDB Connected...", err);  
          }
    }
}

export default Database;