import axios from "axios";
const token=localStorage.getItem("SkillStreamToken")

const api=axios.create({
    baseURL:"http://localhost:3000/api/",
    headers:{
        Authorization:token||"" 
    }
})

export default api