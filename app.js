import { Hono } from "hono";
// import { assertEquals } from '@std/assert'
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { compress } from "hono/compress";
import { secureHeaders } from 'hono/secure-headers';

import {sql} from "./db/connectPG.js";
import connectDB from "./db/connect.js";
import productsRouter from "./routes/products.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = new Hono();

// --- Global Middleware ---
app.use("*", logger());
app.use("*", secureHeaders()); // Security optimization
app.use("*", compress());      // Bandwidth optimization
app.use("*", etag());          // Caching optimization

// --- Routes ---
app.route("/api/v1/products", productsRouter);

// --- Error Handling ---
app.notFound(notFound);
app.onError(errorHandler);

// --- Server Initialization ---
const port = Number(Deno.env.get("PORT")) || 3000;
const mongoUri = Deno.env.get("MONGO_URI");

if (!mongoUri) {
  console.error("MONGO_URI is not defined in environment variables.");
  Deno.exit(1);
}

const start = async () => {
  try {
    await connectDB(mongoUri);
    await sql; // Ensure PostgreSQL connection is established before starting the server
    
    // Deno.serve returns a server instance you can control
    Deno.serve({ 
      port,
      onListen: ({ port, hostname }) => {
        console.log(`🚀 Server ready at http://${hostname}:${port}`);
      }
    }, app.fetch);
  } catch (error) {
    console.error("Failed to start server:", error);
    Deno.exit(1);
  }
};

start();