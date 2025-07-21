/** @format */

// Test file to verify database connection with environment variables
import "dotenv/config";
import { Pool } from "pg";

console.log("Testing database connection...");
console.log(
	"DATABASE_URL:",
	process.env.DATABASE_URL ? "Loaded from environment" : "Not found"
);

if (!process.env.DATABASE_URL) {
	const error = new Error("DATABASE_URL environment variable is not defined");
	console.error("ERROR:", error.message);
	throw error;
}

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

pool
	.query("SELECT NOW() as current_time")
	.then((result) => {
		console.log("Database connection successful!");
		console.log("Current time from database:", result.rows[0].current_time);
		// Set exit code for successful completion
		process.exitCode = 0;
	})
	.catch((err) => {
		console.error("Database connection failed:", err.message);
		// Set exit code for error and re-throw the error
		process.exitCode = 1;
		throw err;
	});
