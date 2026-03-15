// Valid Hono syntax
export const notFound = (context) => {
  return context.text('Route does not exist deno', 404)
}