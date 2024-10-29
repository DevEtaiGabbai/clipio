/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./db/schema.ts",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:OMifs5Cmb8QK@ep-quiet-lab-a6tda15d-pooler.us-west-2.aws.neon.tech/neondb?sslmode=requires',
    }
  };