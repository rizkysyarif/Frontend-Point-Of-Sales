import axios from 'axios'


export const getProduct = options => {
  return {
    type: 'GET_PRODUCT',
    payload: new Promise((resolve, reject) => {
        const {
            search = '',
            sort = '',
            limit = '8',
            page = '1'
        } = options

        axios.get(`http://localhost:9000/api/product?search=${search}&sort=${sort}&limit=${limit}&page=${page}`,{
        })
            .then(result => resolve(result))
            .catch(error => reject(error))    
    })
  }
}