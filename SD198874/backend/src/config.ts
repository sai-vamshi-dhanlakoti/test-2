import * as dotenv from "dotenv";
dotenv.config();

export enum NODE_ENV {
  development = "development",
  production = "production",
  test = "test",
}
export const APP_CONFIG = {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI
};
