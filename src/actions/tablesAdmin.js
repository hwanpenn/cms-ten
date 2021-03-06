import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_Admin = "GET_REQUEST_Admin";
export const GET_SUCCESS_Admin = "GET_SUCCESS_Admin";
export const GET_FAIL_Admin = "GET_FAIL_Admin";
export const CREATE_REQUEST_Admin = "CREATE_REQUEST_Admin";
export const CREATE_SUCCESS_Admin = "CREATE_SUCCESS_Admin";
export const CREATE_FAIL_Admin = "CREATE_FAIL_Admin";
export const UPDATE_REQUEST_Admin = "UPDATE_REQUEST_Admin";
export const UPDATE_SUCCESS_Admin = "UPDATE_SUCCESS_Admin";
export const UPDATE_FAIL_Admin = "UPDATE_FAIL_Admin";
export const UPDATE_REQUEST_PasswordAdmin = "UPDATE_REQUEST_PasswordAdmin";
export const UPDATE_SUCCESS_PasswordAdmin = "UPDATE_SUCCESS_PasswordAdmin";
export const UPDATE_FAIL_PasswordAdmin = "UPDATE_FAIL_PasswordAdmin";
export const DELETE_REQUEST_Admin = "DELETE_REQUEST_Admin";
export const DELETE_SUCCESS_Admin = "DELETE_SUCCESS_Admin";
export const DELETE_FAIL_Admin = "DELETE_FAIL_Admin";

export const GET_REQUEST_Admin_OTHER = "GET_REQUEST_Admin_OTHER";
export const GET_SUCCESS_Admin_OTHER = "GET_SUCCESS_Admin_OTHER";
export const GET_FAIL_Admin_OTHER = "GET_FAIL_Admin_OTHER";

export function getOtherAdmin(params) {
    return {
        types: [GET_REQUEST_Admin_OTHER, GET_SUCCESS_Admin_OTHER, GET_FAIL_Admin_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataAdmin(params) {
    return {
        types: [GET_REQUEST_Admin, GET_SUCCESS_Admin, GET_FAIL_Admin],
        promise: client => client.get('/api/user',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataAdmin(params) {
    return {
        types: [CREATE_REQUEST_Admin, CREATE_SUCCESS_Admin, CREATE_FAIL_Admin],
        promise: client => client.post('/api/userAdmin',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataAdmin(params) {
    return {
        types: [UPDATE_REQUEST_Admin, UPDATE_SUCCESS_Admin, UPDATE_FAIL_Admin],
        promise: client => client.post('/cs/api/organization/updateUser',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataAdmin(params) {
    return {
        types: [UPDATE_REQUEST_PasswordAdmin, UPDATE_SUCCESS_PasswordAdmin, UPDATE_FAIL_PasswordAdmin],
        promise: client => client.put('/api/user/access/resetPsw',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info("初始密码错误,修改失败");
            }
        },
    }
}
export function deleteDataAdmin(params) {
    return {
        types: [DELETE_REQUEST_Admin, DELETE_SUCCESS_Admin, DELETE_FAIL_Admin],
        promise: client => client.delete('/api/user/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
