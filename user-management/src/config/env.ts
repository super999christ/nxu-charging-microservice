import * as dotenv from "dotenv";

dotenv.config();
if (process.env.CONSUMER_ENVIRONMENT === 'local')
  dotenv.config({ path: "../.env" });

const Environment = {
  DATABASE_HOST: String(process.env["POSTGRES_HOST"]),
  DATABASE_PORT: Number(process.env["POSTGRES_PORT"]),
  DATABASE_USER: String(process.env["POSTGRES_USER"]),
  DATABASE_PASSWORD: String(process.env["POSTGRES_PASSWORD"]),
  DATABASE_NAME: String(process.env["POSTGRES_DB"]),
  SERVICE_LOGGER_URL: String(process.env["SERVICE_LOGGER_URL"]),
  SERVICE_API_AUTH_URL: String(process.env["SERVICE_API_AUTH_URL"]),
  SERVICE_NOTIFICATION_URL: String(process.env["SERVICE_NOTIFICATION_URL"]),
  SERVICE_PAYMENT_URL: String(process.env["SERVICE_PAYMENT_URL"]),
  TOKEN_SECRET_KEY: String(process.env["TOKEN_SECRET_KEY"]),
  TRIAL_SUBSCRIPTION_CUSTOMERS: String(
    process.env["TRIAL_SUBSCRIPTION_CUSTOMERS"]
  ),
  SUBSCRIPTION_PROCESSING_CRON_SCHEDULE: String(
    process.env.SUBSCRIPTION_PROCESSING_CRON_SCHEDULE
  ),
  CUSTOMER_PROCESSING_CRON_SCHEDULE: String(
    process.env.CUSTOMER_PROCESSING_CRON_SCHEDULE
  ),
  HASH_SALT: Number(process.env["HASH_SALT"]),
};

export default Environment;
