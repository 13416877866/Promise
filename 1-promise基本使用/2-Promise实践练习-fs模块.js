// fs作用对计算机硬盘进行读写操作
// 这次的案例要求读取resource文件夹下的content.txt的内容

const { rejects } = require('assert');
const fs=require('fs');
const { resolve } = require('path/posix');


// 回调函数的形式
// fs.readFile('./resource/content.txt',(err,data)=>{
//     // 如果出错则抛出错误
//     if(err)  throw err;
//     // 输出文件内容
//     console.log(data.toString());
// })


// Promise形式
let p=new Promise((resolve,reject)=>{
    fs.readFile('./resource/content.tx',(err,data)=>{
        // 如果出错
        if(err)   reject(err);
        // 如果成功
        resolve(data);
    });
});


// 调用then
p.then(value=>{
    console.log(value.toString());
},reason=>{
    console.log(reason);
});