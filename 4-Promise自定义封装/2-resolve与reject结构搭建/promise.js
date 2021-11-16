// 声明构造函数
function Promise(executor){
    // 添加属性
    this.PromiseState="pending";
    this.PromiseResult=null;
    // 保存实例对象的this值
    const self=this;
    // resolve函数
    function resolve(data){
        // 判断状态
        if(self.PromiseState!=='pending') return;
        // console.log(this);
    // 1.修改对象的状态（promiseState)
    self.PromiseState="fulfilled";//resolved
    // 2.设置对象结构值（promiseResult)
    self.PromiseResult=data;
    };
    // reject函数
    function reject(data){
         // 判断状态
         if(self.PromiseState!=='pending') return;
        // 1.修改对象的状态（promiseState)
        self.PromiseState="rejected";//resolved
        // 2.设置对象结构值（promiseResult)
        self.PromiseResult=data;
    };
    try{
    // 同步调用[执行器函数]
    executor(resolve,reject);
    }catch(e){
        // 修改promise对象状态为[失败]
        reject(e);
    }

}
// 添加then方法
Promise.prototype.then=function(onResolved,onRejected){
// 调用回调函数
if(this.PromiseState==='fulfilled'){
onResolved(this.PromiseResult);
}
if(this.PromiseState==='rejected'){
onRejected(this.PromiseResult)
}
}