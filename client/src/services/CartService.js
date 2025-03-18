import instance from "../utils/customizeAxios"

// Only add to cart 1 product
export const addToCart = async (userId, productId, price) => {
  try{
    const response = await instance.post('/api/add-to-cart', {
      userId: userId,
      productId: productId,
      quantity: 1,
      price: price
    })
    if(response.status === 200 || response.status === 201){
      return {
        success: true,
        message: response.data
      }
    }
    else {
      return {
        success: false,
        error: response.data?.error
      }
    }
  }
  catch(err){
    return{
      success: false,
      error: err.response?.data?.error || "add to cart failed"
    }
  }
}