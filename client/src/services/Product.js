import instance from "../utils/customizeAxios"

export const getAllProducts = async () => {
  try {
    const response = await instance.get("/api/products")
    if(response.status === 200){
      return {
        success: true,
        data: response.data
      }
    }
    else{
      return {
        success: false,
        error: response.data?.error
      }
    }
  } catch (error) {
    return{
      success: false,
      error: error
    }
  }
}