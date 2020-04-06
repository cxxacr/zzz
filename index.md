###项目中遇到的问题

###项目不足

> 因为一开始是拿 iphone6/7/8 设计的稿子,也就是 2 倍设计稿 750px
> 所以导致在设计 container 的时候 整屏高度是以 750px 定高的,在其他设备上存在一定偏差 待解决

**`1.在点击登录进行路由跳转的时候,并没有引起组件的重渲染,导致个人信息仍然显示的是未登录`**

> 解决方案:因为 login 和 info 组件同属于第二级路由,在进行路由的跳转的时候,不会将 info 组件全部刷新,走的是 componentWillReceiveProps 这个生命周期函数

> 原因在于:只要当前组件是受路由管控的, this.props 上默认有 history/location(存储了当前的 URL 信息)/match,因为要进行路由切换会导致 location 变化,最新的 location 值会传给组件的 this.props,所以会触 componentWillReceiveProps 这个生命周期函数

**`2.项目中关于闭包的使用`**

> 没有用到 redux 的组件,就没必要用 connect 高阶组件包起来,减少栈内存的使用

> 在后台操作文件读写的时候,自己封装的方法,用闭包进行包裹暴露给外界使用,防止变量名称冲突污染

**`3.多用户登录的时候,只显示第一个用户的信息`**

> 原因在于我是将用户的信息存储到了 redux 中,在 componentDidMount 的时候判断用户信息是否存在,如果不存在就渲染,存在就不做处理

> 但是由于第一个用户已经存在,所以 redux 中的内容是会一直存在的,我需要更新 redux 中的内容保证每次渲染的个人信息都是新的用户.

> 这个操作只需要在 login / 和 register 的时候 dispatch 派发一个更新信息的操作即可

**`4.redux-promise这个中间件在进行行为派发的时候,传递的第二个参数属性名必须叫payload`**


**`5.开发首页列表时候的难点`**
>主要是业务逻辑的麻烦 在这理一下思路 
>- 首先首屏渲染的时候,向服务器发送ajax请求,请求首页列表数据 在Pet.jsx的componentDidMount生命周期函数中派发一个dispatch(queryPetList),传递参数(payload) 流程 
>- 首先在actionCreators中接收传递进来的参数(payload),然后通过redux-thunk这个中间件 异步派发这个行为 先通过result 去接收 queryPetList({limit,page,type}) (limit,page,type 是从payload中结构出来的值) 返回的值 payload中还应该包括一个flag标识,用来标识查找的方法 默认是'push',也就是追加. 
>- 再然后就是在pet的reducer 的state定义一个状态叫listData 用来接收服务器中传递过来的信息,
给它赋值一些默认值(limit(一次拿几条),page(拿的是第几页),type(拿的宠物类型))
>- 再定义一个标识petType,默认为'all'
>- 把获取到的total,limit,page都赋值给state.listData,
把获得的flag 赋值给petType
`注意`:data数据需要进行判断,如果petType === 'push'那就是默认追加,拼接两个数组即可,如果不是,那就是走赋值操作(挑选)
