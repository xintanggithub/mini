### 小程序Demo


#### 笔记记录

##### 1. 不支持16进制颜色

比如： #CC000000 (黑色透明度为80的色值，实际为"全透明"自身和子view都会透明)

需要如下：

- rgba(0, 0, 0, 0.8)     仅仅透明背景色
- opacity : 0.0 至 1    ,1表示不透明，但是设置了透明值后，子布局所有的都会透明

##### 2. 在view里进行if  else 逻辑判断

```
<!-- 如果该字段为空显示"name为空"  否则显示为"name不为空"-->
<view wx:if="{{name == null}}">
	<text>name为空</text>
</view>
<view wx:else>
	<text>name不为空</text>
</view>
```

注意：

- 进行字段比较时，需要加 ‘ ’ 如  

- ```
  wx:if="{{item.type == 'video'}}"
  ```

- 进行判空时，如果为json的null，则不需要加 ' '

  a) json数据:

  ```
  	{
          "top_comments_content": null,
          "top_comments_voiceuri": null,
          "top_comments_uid": null,
          "top_comments_name": null
  	}
  ```

  b) 进行判断

  ```
   wx:if="{{top_comments_uid== null || top_comments_uid==''}}"
  ```



##### 3. 绝对定位

.wxss 内添加 position: fixed属性， z-index: 999为优先级，数值越大的在越上层。



##### 4. 横向居中

- [详细请参考](<https://blog.csdn.net/cc18868876837/article/details/88138057>) 

父级view样式

```
.root{
  width: 100%;
  height: auto;
  //使用flex布局
  display: flex;
  //横向
  flex-direction: row;
}
```

子view样式

```
.child-icon{
  width: 48rpx;
  height: 48rpx;
  //居中属性
  display: flex;
  align-items: center;
}
```



##### 5. 监听图片加载失败，显示占位图

js代码：

- 列表

```
imageLoadError: function (e) {
	//获取item位置
    var index=e.currentTarget.dataset.index
    console.log('index = '  + index)
    //response为数据源 ，类型 object[]
    var images = 'response[' + index + '].images'
    var thumbnail = 'response[' + index + '].thumbnail'
    this.setData({
      //更新对应item的URL为想要显示的图片
      [images]: '/asstes/img/ic_error_rotation.png',
      [thumbnail]: '/asstes/img/ic_error_rotation.png'
    })
  }
```

- 非列表

  和列表一样，不取对应item的，直接更新URL为想要显示的图片

  ```
  imageLoadError: function (e) {
      this.setData({
        //更新对应item的URL为想要显示的图片
        header: '/asstes/img/ic_error_rotation.png',
      })
    }
  ```



.wxml代码

- 列表

```
<image binderror='imageLoadError' data-index='{{index}}' src='{{item.thumbnail}}'>
</image>
```

- 非列表

```
<image binderror='imageLoadError' src='{{header}}'>
</image>
```

