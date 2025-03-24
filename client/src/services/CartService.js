import instance from "../utils/customizeAxios"

export const addToCart = async (email, productId, price) => {
  try{
    const response = await instance.post('/api/add-to-cart', {
      email: email,
      productId: productId,
      quantity: 1,
      price: price,
    },
    
  )
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

export const getCart = async (email) => {
  try {
    const response = await instance.get('/api/get-cart', {
      params: {
        email: email
      }
    },
    )
    if (response.status === 200) {
      return response.data
    } else {
      return {
        success: false,
        error: response.data?.error
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "get cart failed"
    }
  }
}

export const updateCart = async (address, updateCart) => {
  try {
    const response = await instance.post('/api/order/update-items', {
      address: address,
      carts: updateCart
    },
    )
    if (response.status === 200) {
      return response.data
    } else {
      return {
        success: false,
        error: response.data?.error
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.error || "get cart failed"
    }
  }
}