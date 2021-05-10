import axios from 'axios'
import store from '../store/index'
import ElementUI from 'element-ui'
import router from "@/router";

// 本地开发时用
axios.defaults.baseURL = 'http://127.0.0.1:8081';

//远程接口用
// axios.defaults.baseURL = 'http://139.196.175.10/api';
export default function setAxios() {
    //前置拦截，用来添加请求头
    axios.interceptors.request.use(
        config => {
            if (store.state.token) {
                config.headers['token'] = `${store.state.token}`
            }
            return config
        }
    )

    //后置拦截，用来全局处理异常
    axios.interceptors.response.use(
        response => {
            let res = response.data
            if(res.code === 200) {
                return response
            } else {
                ElementUI.Message.error(response.data.msg)
                return Promise.reject(response.data.code)
            }
        },

        error => {
            if(error.response.data) {
                error.message = error.response.data.msg
            }
            if(error.response.status === 401) {
                store.commit("REMOVE_INFO");
                router.push({name: 'index'})
            }

            ElementUI.Message.error(error.message)
            return Promise.reject(error)
        }
    )
}
