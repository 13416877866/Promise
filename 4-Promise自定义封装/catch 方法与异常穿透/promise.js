//声明构造函数
function Promise(executor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks=[];
    //保存实例对象的 this 的值
    const self = this;// self _this that
    //resolve 函数
    function resolve(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled';// resolved
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //调用成功的回调函数
        /* if(self.callback.onResolved){
            self.callback.onResolved(data);
        } */
        self.callbacks.forEach(item=>{
            item.onResolved(data);
        });
    }
    //reject 函数
    function reject(data){
        //判断状态
        if(self.PromiseState !== 'pending') return;
        //1. 修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';// 
        //2. 设置对象结果值 (promiseResult)
        self.PromiseResult = data;
        //执行回调
      /*   if(self.callback.onRejected){
            self.callback.onRejected(data);
        } */
        self.callbacks.forEach(item=>{
            item.onRejected(data);
        })
    }
    try{
        //同步调用『执行器函数』
        executor(resolve, reject);
    }catch(e){
        //修改 promise 对象状态为『失败』
        reject(e);
    }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
    const self=this;
    // 判断回调函数参数
    if(typeof onRejected!=='function'){
        onRejected=reason=>{
            throw reason;
        };
    }
    if(typeof onResolved!=='function'){
        onResolved=value=>value;
        // value=>{return value};
    }
    return new Promise((resolve,reject)=>{
    // 封装函数
    function callback(type){
        try{
            // 获取回调函数的执行结果
       let result=type(self.PromiseResult);
       // 判断
       if(result instanceof Promise){
           result.then(v=>{
               resolve(v);
           },r=>{
               reject(r);
           });
       }else{
           // 结果的对象状态为成功
           resolve(result);
       }
       }catch(e){
           reject(e);
       }
    }
    //调用回调函数  PromiseState
    if(this.PromiseState === 'fulfilled'){
      callback(onResolved);
    }
    if(this.PromiseState === 'rejected'){
       callback(onRejected);
    }
    //判断 pending 状态
    if(this.PromiseState==='pending'){
        // 保存回调函数
        this.callbacks.push({
            onResolved:function(){
              callback(onResolved);
            },
            onRejected:function(){
               callback(onRejected);
            }
        });
    }
})
}
//添加 catch 方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected);
}

// 添加resolve方法（属于Promise这个函数对象，不属于实例对象）
Promise.resolve=function(value){
    // 返回Promise对象
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }else{
            resolve(value);
        }
    });
}
// 添加reject方法
Promise.reject=function(reason){
   return new Promise((resolve,reject)=>{
       reject(reason);
   })
}
// 添加all方法
Promise.all=function(promises){
    // 返回的结果为promise对象
    return new Promise((resolve,reject)=>{
        let count=0;
        let arr=[];
        for(let i=0;i<promises.length;i++){
            promises[i].then(v=>{
                // 得知对象的状态是成功
                // 每个对象都成功
                count++;
                arr[i]=v;
                if(count===promises.length){
                    resolve(arr);
                }
            },r=>{
                reject(r);
            })
        }
    })
}
// 添加race方法
Promise.race=function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
           promises[i].then(v=>{
               resolve(v);
           },r=>{
               reject(r);
           })
        }
    })
}