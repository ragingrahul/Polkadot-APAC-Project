import axios from "axios"

export const getProfile=async(evmAddress)=>{

    const res=await axios.get(`http://64.227.154.19:5000/api/user/evm/${evmAddress}`)
    return res.data
}