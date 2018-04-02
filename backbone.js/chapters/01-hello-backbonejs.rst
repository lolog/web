第一章 Hello Backbonejs
=======================================================================

1. 基础概念
--------------------
Backbone.js 是基于jQuery和Underscore的一个前端MVC轻量级框架。通过Models进行key-value绑定及自定义事件处理，通过Collections提供一套丰富的API用于枚举功能，通过Views来进行事件处理，及与现有的Application通过RESTful JSON接口进行交互.

优点：

(I) Backbone.js 实现M-V-C分离。

(#) 提供数据和逻辑相互分离的方法，减少代码开发过程中的数据和逻辑混乱。


在Backbonejs有几个重要的概念，先介绍一下:Model，Collection，View，Router。如下：

(I) **Model**：是根据现实数据建立的抽象，比如人（People）；

(#) **Collection**：是Model的一个集合，比如一群人；

(#) **View**：是对Model和Collection中数据的展示，把数据渲染（Render）到页面上；

(#) **Router**：是对路由的处理，就像传统网站通过url现实不同的页面，在单页面应用（SPA）中通过Router来控制前面说的View的展示。

通过Backbone，你可以把你的数据当作Models，通过Models你可以创建数据，进行数据验证，销毁或者保存到服务器上。当界面上的操作引起model中属性的变化时，model会触发change的事件。那些用来显示model状态的views会接受到model触发change的消息，进而发出对应的响应，并且重新渲染新的数据到界面。在一个完整的Backbone应用中，你不需要写代码来从DOM中通过特殊的id来获取节点，或者手工的更新HTML页面，因为在model发生变化时，views会很简单的进行自我更新。

上面是一个简单的介绍，关于backbone我看完他的介绍和简单的教程之后，第一印象是它为前端开发制定了一套自己的规则，在这个规则下，我们可以像使用django组织python代码一样的组织js代码，它很优雅，能够使前端和server的交互变得简单。



2. backbone的应用范围：
------------------------------
它虽然是轻量级框架，但是框架这东西也不是随便什么地方都能用的，不然就会出现杀鸡用牛刀，费力不讨好的结果。那么适用在哪些地方呢？

根据我的理解，以及Backbone的功能，如果单个网页上有**非常复杂的业务逻辑**，那么用它很合适，它可以很容易的操作DOM和组织js代码。

案例：

*1. 豆瓣阿尔法城*
链接：http://alphatown.com/

*2. 豆瓣阅读*
链接：http://read.douban.com/  主要用在图书的正文页

*3. 百度开发者中心*
链接：http://developer.baidu.com/

*4. 手机搜狐直播间*
链接：http://zhibo.m.sohu.com/

*5. OATOS企业网盘*
链接：http://app.oatos.com


3. DEMO
----------------
主要功能：输入name,点击页面上得“新增”按钮，把内容拼上固定的字符串显示到页面上。事件触发的逻辑是： click 触发checkIn方法，然后checkIn构造People对象放到已经初始化peoples这个collection中。

来看完整的代码:

.. code:: html

    <!DOCTYPE html>
    <html>
    <head>
        <title>入门实例</title>
        <script src="lib/jquery-3.2.1.js"></script>
        <script src="lib/underscore.js?v=1.8.2"></script>
        <script src="lib/backbone.js?v=1.1.2"></script>
    </head>
    <body>
        <input id="name" type="text"><br>
        <button id="check">新增</button>
        <ul id="world-list"></ul>

    <script type="text/javascript">
        $(function ($) {
            // 创建People的model对象
            // 即,People只拥有name属性
            People = Backbone.Model.extend ({
                name: null
            });
            // 创建People的Collection(集合)对象
            Peoples = Backbone.Collection.extend({
                initialize: function (models, options) {
                    // 绑定Collection事件触发函数
                    this.on("add", options.view.addPeople)
                }
            });
            // 视图创建
            AppView = Backbone.View.extend({
                el: $('body'),
                // 构造函数
                initialize: function () {
                    // 构建一个Peoples集合对象
                    // 并且,以字典方式存入到appView中
                    this.peoples = new Peoples(null, {view: this});
                },
                // 事件监听
                events: {
                    "click #check":  "checkIn",
                },
                // 事件执行函数
                checkIn: function () {
                    var name = document.getElementById('name').value;
                    var people = new People({name: name});
                    // 触发collection的事件
                    this.peoples.add(people);
                },
                addPeople: function(model) {
                    $("#world-list").append("<li>欢迎：<b>" + model.get('name') + "</b> 加入我们");
                }
            })
            //实例化AppView
            var appview = new AppView;
        })
    </script>
    </body>
    </html>
    
这里面涉及到backbone的三个部分，View、Model、Collection，其中Model代表一个数据模型，Collection是模型的一个集合，而View是用来处理页面以及简单的页面逻辑的。

动手把代码放到你的编辑器中吧，成功执行，然后修改某个地方，再次尝试。


**导航**

* 下一章 `02 Backbone中Model实践 <02-backbonejs-model.rst>`_
