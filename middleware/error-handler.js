// Valid Hono syntax
export const errorHandler = async (err, context) => {
  console.error(err)
  
  return context.json(
    { msg: 'Something went wrong, please try again Deno' }, 
    500
  )
}

