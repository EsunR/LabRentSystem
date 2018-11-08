# 代码结构说明

## 预约时间模板：
1. `serviceTime` 为1： 
```html
<div class="select">
  <div class="res r-1"></div>
  <div class="res r-1"></div>
  <div class="res r-1"></div>
  <div class="res r-1"></div>
</div>
```
2. `serviceTime` 为2： 
```html
<div class="select">
  <div class="res r-2"></div>
  <div class="res r-2"></div>
</div>
```
3. `serviceTime` 为4： 
```html
<div class="select">
  <div class="res r-4"></div>
</div>
```

4. `serviceTime` 为8： 
```html
<div class="select">
  <div class="res r-8"></div>
</div>
```


## 显示预约模态框后，从Ajax返回的对象
```js
instrument{
  serviceTime: '2',                   // 预约时间规格有 1,2,4,8
  sampleCount:'3',                    // 样本数量
  servicetimeArray: ['51','52','71']  // 服务时间
}
```

## 日期：
日期格式
```
2018-11-07 14:00-18:00
```
调用检查日期的方法：
```js
checkTimes(instrument.id, dateTime)
```


 ---


# 接口说明

## 数据入口

### 获取样本信息
`instrument` 存放预约样本的详细信息，在预约表格的渲染过程和提交数据过程中，主要用到以下数据：
```js
// TODO: Ajax GET 数据 ============================================== 数据入口
var instrument = {
  id: '1',
  serviceTime: '4',
  sampleCount: '4',
  servicetimeArray: ['11', '12', '21', '62', '71', '72']
}
```

### 查询样本预约余量
`checkTimes` 方法的两个参数

> `id`: 查询样本的ID  
> `dateTime`: 查询样本的时间段

返回的值为当前时间段，该仪器已被预约的样本数量

```js
// TODO: 插入checkTimes函数
function checkTimes(id, dateTime) {
  return 0;
}
```




## 数据出口

### 提交预约信息
`post_time` 对象存放了当前的预约信息
```js
// TODO: Ajax POST 数据  ====================================== 数据出口
let post_data = {
  id: post_id,      // 预约样品的ID
  time: post_time,  // 预约的时间
  count: post_count // 预约的数量
}
console.log('post_data: ', post_data);
```
> PS:在用户完成一次预约后，预约表格会被重新渲染，数据入口的Ajax动作不会被重复执行，只会检测每个按钮对应的样本数量是否还有空余，如果没有空余就将按钮显示为“不可预约状态”。