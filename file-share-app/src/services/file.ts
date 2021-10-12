import axios from 'axios';
const APIEndpoint = process.env.REACT_APP_API;

const options = {
    url: 'APIEndpoint+"/file"',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    },
};

export function uploadFile(data:any){
    return new Promise((resolve,reject)=>{
        axios.post(APIEndpoint+"/file", data, {'headers': {
            'Content-Type': 'multipart/form-data'
          }}).then(result=>{
            console.log(result);
            resolve(result);
        }).catch(error=>{
            console.error(error);
            reject(error.message);
        });
    })
}

export function downloadFile(id:string){
    return new Promise((resolve,reject)=>{
        axios.get(APIEndpoint+"/file/"+id).then(result=>{
            console.log(result);
            resolve(result);
        }).catch(error=>{
            console.error(error);
            reject(error.message);
        });
    })
}