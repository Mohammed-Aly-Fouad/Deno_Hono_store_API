import { sql } from "../db/connectPG.js";

const getAllProductsStatic = async (context) => {
    return await context.json({ msg: 'products testing route' }, 200);
};

// const getAllProducts = async (context) => {
//     return context.json({ msg: 'products route Deno' }, 200);


// };



 const getAllProducts = async (c) => {
  try {
    // Just use backticks, no extra setup needed
    const products = await sql`SELECT * FROM products WHERE id > 200`;
    console.log("Fetched products:", products);
    
    return c.json({ success: true, data: products });
  } catch (error) {
    return c.json({ success: false, msg: error.message }, 500);
  }
};

export {
    getAllProductsStatic,
    getAllProducts
}