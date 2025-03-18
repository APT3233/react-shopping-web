import instance from "../utils/customizeAxios"

export const getCategories = async () => {
  try {
    const response = await instance.get('/api/categories')
    if(response.status === 200){
      return {
        success: true,
        message: response.data
      }
    }
    else {
      return {
        success: false,
        error: response?.data?.error
      }
    }
  } catch (error) {
    return{
      success: false,
      error: error.response?.data?.error || 'Get categories failed'
    }
  }
}