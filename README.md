# LabRentSystem

## 预约时间模板：
EXP: 第一个时间段有预约 
```html
<div class="select">
  <div class="res aviliable"></div>
  <div class="res"></div>
  <div class="res"></div>
  <div class="res"></div>         
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
