import { Hono } from "hono";
import { getAllProducts, getAllProductsStatic } from "../controllers/products.js";

console.log("DEBUG: getAllProducts is", typeof getAllProducts);
console.log("DEBUG: getAllProductsStatic is", typeof getAllProductsStatic);

const productsRouter = new Hono();

if (typeof getAllProducts !== 'function') {
  console.error("CRITICAL: getAllProducts is not a function! Check your controller exports.");
}

productsRouter.get("/", getAllProducts);
productsRouter.get("/static", getAllProductsStatic);

export default productsRouter;