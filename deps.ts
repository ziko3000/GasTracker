import { load } from "https://deno.land/std@0.196.0/dotenv/mod.ts";
const loadEnv = await load({
  envPath: "./.env",
  export: true,
  examplePath: "./.env.example",
  allowEmptyValues: false,
});

import { Logger } from "https://deno.land/x/logger@v1.1.2/mod.ts";
const logger = new Logger();
export { logger };