import axios, { AxiosResponse } from 'axios';
const APIEndpoint = process.env.REACT_APP_API;

const options = {
    url: 'APIEndpoint+"/file"',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
};

export function uploadFile(data:any): Promise<{'key':string}>{
    return new Promise((resolve,reject)=>{
        axios.post(APIEndpoint+"/file", data, {'headers': {
            'Content-Type': 'multipart/form-data'
          }}).then((result:AxiosResponse<any>)=>{
            console.log(result);
            resolve(result.data);
        }).catch(error=>{
            console.error(error);
            reject(error.message);
        });
    })
}

export function downloadFile(id:string): Promise<{'name':string,'data':Buffer}>{
    return new Promise((resolve,reject)=>{
        axios.get(APIEndpoint+"/file/"+id).then((result:AxiosResponse<any>)=>{
            resolve(result.data);
        }).catch(error=>{
            console.error(error);
            reject(error.message);
        });
    })
}