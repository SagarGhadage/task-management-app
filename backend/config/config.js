const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required().description("DB url"),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  //database config
  database: {
    url: envVars.DATABASE_URL,
  },
  //jwt config
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};
