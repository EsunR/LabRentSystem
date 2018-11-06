# LabRentSystem

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
dateTime 14:00-18:00
```
调用检查日期的方法：
```js
checkTimes(instrument.id, dateTime)
```