$(function () {

    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

});


var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#tb_departments').bootstrapTable({
            url: 'index.php',         //请求后台的URL（*）
            method: 'get',                      //请求方式（*）
            dataType:'json',
            toolbar: '#toolbar',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
            search: true,                       //是否显示表格搜索
            searchOnEnterKey:true,              // 按下enter键搜索
            strictSearch: true,                // 启用严格搜索。
            showColumns: true,                  //是否显示所有的列
            showRefresh: true,                  //是否显示刷新按钮
            showFooter : true,                  //显示尾部
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 550,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                     //每一行的唯一标识，一般为主键列
            showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: true,                   //是否显示父子表

            idField    : 'Name',    // 
            totalField :'total',    // 响应的总数字段
            dataField  : 'rows',    // 响应的数据字段
            undefinedText: '--',    // 空列数据显示
            detailFormatter: function (index, row, element) {
                return index + "<br>" + row.Name + "<br>" + row.ParentName;
            },
            columns: [{
                checkbox: true
            }, {
                field: 'Name',
                title: '部门名称',
                titleTooltip: 'hello',
                footerFormatter: function (data) {
                    return data.Desc;
                }
            }, {
                field: 'ParentName',
                title: '上级部门',
                titleTooltip:'department',
                sortable:true,
                order:'asc',
                // checkbox:true,
                // escape:true,
                footerFormatter: function (data) {
                    return data.Desc;
                }
            }, {
                field: 'Level',
                title: '部门级别',
                footerFormatter: function (data) {
                    var result = '';
                    var len = data.length;

                    for (var i=0; i<len; i++) {
                        result+=data[i]['Level'];
                    }

                    return result;
                },
                cellStyle:function(value, row, index, field) {
                    return {
                        classes: 'text-nowrap another-class',
                        css: {"color": "blue"}
                    };
                }
            }, {
                field: 'Desc',
                title: '描述',
                footerFormatter: function (data) {
                    var result = 0;
                    var len = data.length;

                    for (var i=0; i<len; i++) {
                        result++;
                    }

                    return result;
                }
            },],

        });
    };

    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            search: params.search, // 搜索
            sort  : params.sort,   // 排序字段
            order : params.order,  // 排序方式
            departmentname: $("#txt_search_departmentname").val(),
            statu: $("#txt_search_statu").val()
        };
        return temp;
    };
    return oTableInit;
};


var ButtonInit = function () {
    var oInit = new Object();
    var postdata = {};

    oInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return oInit;
};