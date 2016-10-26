import './dashboard.scss';

var CheckboxItemRender = React.createClass({
    getInitialState:function() {
        return {
            selected:this.props.selected || 0
        };
    },
    componentWillReceiveProps:function(nextProps) {
        if(typeof nextProps.selected != 'undefined') {
            this.setState({
                selected:nextProps.selected
            });
        }
        if(typeof nextProps.data != 'undefined') {
            this.setState(nextProps.data);
        }
    },
    changeHandler:function() {
        this.props.onClick && this.props.onClick(this.state);
    },
    render:function() {
        return <RUI.Checkbox selected={this.state.selected} onChange={this.changeHandler} />
    }
});

var OperationItemRender = React.createClass({
    clickHandler:function() {
        this.props.onClick && this.props.onClick(this.props.data);
    },
    render:function() {
        return <RUI.Link onClick={this.clickHandler}>{this.props.children}</RUI.Link>;
    }
});

module.exports = React.createClass({
    alert:function() {
        RUI.DialogManager.alert("一些附加信息在这里进行显示", "标题示意");
    },
    confirm:function() {
        RUI.DialogManager.confirm("一些附加的需要确认的信息在这里展示", "标题示意");
    },
    getInitialState:function() {
        return {
            data:[
                {id:1, name:'分享客固定榆钱-外星人(Alienware) ALW17E', cate:'笔记本', price:'100.00', count:'1107', apply:'361', time:'2016-03-22 16:42:14', selected:false},
                {id:2, name:'乐高-科技系列-运输船 W3420', cate:'模型', price:'1288.00', count:'10', apply:'1', time:'2016-06-23 15:33:01', selected:false},
                {id:3, name:'Apple MacPro 15.4英寸 16G内存', cate:'笔记本', price:'9899.00', count:'100', apply:'23', time:'2016-06-29 08:55:20', selected:false},
                {id:4, name:'Apple Watch Sport运动智能手表', cate:'数码', price:'3288.00', count:'50', apply:'42', time:'2016-06-29 13:20:00', selected:false}
            ]
        }
    },
    allCheck:function() {
        var isAllCheck = this.isAllCheck();
        this.setState({
            data:this.state.data.map(function(item) {
                item.selected = isAllCheck ? false : true;
                return item;
            })
        });
    },
    isAllCheck:function() {
        return !this.state.data.some(function(item) {
            return !item.selected;
        });
    },
    checkItem:function(data) {
        this.setState({
            data:this.state.data.map(function(item) {
                if(item.id == data.id) {
                    item.selected = !item.selected;
                }
                return item;
            })
        });
    },
    formatActionData:function(file) {
        var data = (file || "").split(',');
        var suffix = data[0].match(/data:image\/(.+);base64/);
        return {
            suffix:suffix[1],
            data:data[1]
        };
    },
    uploadComplete:function(result) {
        return result.imageUrl;
    },
    render:function() {
        return <div className="container">
            <div className="row">
                <div className="bread">
                    <span>首页</span>&gt;<RUI.Link>组件列表</RUI.Link>&gt;<RUI.Link className="selected">示例页面</RUI.Link>
                </div>
            </div>
            <RUI.Form>
                <div className="row">
                    <RUI.Button className="primary">btn-primary</RUI.Button>
                    <RUI.Button>btn-default</RUI.Button>
                    <RUI.Button className="green">btn-green</RUI.Button>
                    <RUI.Button disable={true}>btn-default</RUI.Button>
                    <RUI.Link>link</RUI.Link>
                </div>
                <div className="row">
                    <RUI.Button className="primary"><RUI.Icon name="loading"/>加载中</RUI.Button>
                </div>
                <div className="row">
                    <RUI.Button className="primary">default</RUI.Button>
                    <RUI.Button className="primary middle">middle</RUI.Button>
                    <RUI.Button className="primary small">small</RUI.Button>
                </div>
                <div className="row">
                    <RUI.Input placeholder="请输入内容" />
                    <RUI.Input disable={true} placeholder="禁用" />
                </div>
                <div className="row">
                    <RUI.Textarea placeholder="请输入大段的内容" />
                </div>
                <div className="row">
                    <RUI.Textarea value="心里颇不宁静，今晚在院子里坐着凉快，忽略想起日日走过荷塔，在这满月的光里，总该另有一番样子吧。月亮渐渐地升高。" maxLength={140} />
                </div>
                <div className="row">
                    <RUI.DatePicker range={true} />
                </div>
                <div className="row">
                    <RUI.Select data={[{key:'北京', value:1}, {key:'天津', value:2}, {key:'上海', value:3}]}
                                stuff={true}
                    />
                    <RUI.Select data={[{key:'北京', value:1}]} stuff={true} className="rui-theme-2" offset={'0'} />
                    <RUI.Select data={[{key:'北京', value:1}, {key:'天津', value:2}, {key:'上海', value:3}]} stuff={true} className="rui-theme-1" offset={'0'} />
                    <RUI.Select data={[{key:'北京', value:1}, {key:'天津', value:2}, {key:'上海', value:3}]}
                                stuff={true} className="rui-theme-3"
                        />
                </div>
                <div className="row">
                    <div className="form">
                        <div className="line horizonal">
                            <label>账户：<RUI.Input placeholder="请输入账户名" /></label>
                            <label>密码：<RUI.Input type="password" placeholder="请输入密码" /></label>
                            <RUI.Checkbox>记住</RUI.Checkbox>
                            <RUI.Button className="primary">登录</RUI.Button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <RUI.Radio>正常</RUI.Radio>
                    <RUI.Radio disable={true}>禁用</RUI.Radio>
                    <RUI.Radio disable={true} selected={true}>选中时禁用</RUI.Radio>
                </div>
                <div className="row">
                    <RUI.RadioGroup value={1}>
                        <RUI.Radio value={1}>33g/mL</RUI.Radio>
                        <RUI.Radio value={2}>55g/mL</RUI.Radio>
                        <RUI.Radio value={3}>237g/mL</RUI.Radio>
                        <RUI.Radio value={4} disable={true}>550g/mL</RUI.Radio>
                    </RUI.RadioGroup>
                </div>
                <div className="row">
                    <RUI.Checkbox>正常</RUI.Checkbox>
                    <RUI.Checkbox disable={true}>禁用</RUI.Checkbox>
                    <RUI.Checkbox disable={true} selected={true}>选中时禁用</RUI.Checkbox>
                </div>
                <div className="row">
                    <RUI.CheckboxGroup value={1}>
                        <RUI.Checkbox value={1}>防晒</RUI.Checkbox>
                        <RUI.Checkbox value={2}>隔离</RUI.Checkbox>
                        <RUI.Checkbox value={3}>提亮肤色</RUI.Checkbox>
                        <RUI.Checkbox value={4} disable={true}>深度保湿</RUI.Checkbox>
                    </RUI.CheckboxGroup>
                </div>
                <div className="row">
                    <RUI.Switch />
                    <RUI.Switch disable={true} />
                    <RUI.Switch disable={true} selected={true} />
                </div>
                <div className="row">
                    <RUI.Spinner type="slider" step={10} min={0} max={200} fieldFunction={(str)=>str+"像素"} onChange={(e)=>console.log('change', e)} />
                </div>
                <div className="row">
                    <RUI.Upload />
                </div>
                <div className="row">
                    <p>默认</p>
                    <RUI.Upload multiple={true} list={["http://p.qq181.com/cms/1212/2012121221524127738.jpg"]} className="small-cube" />
                </div>
                <div className="row">
                    <p>自动上传</p>
                    <RUI.Upload multiple={true} autoUpload={true}
                                action="http://image.berbon.com/image/upload/base64zoom"
                                actionData={this.formatActionData}
                                onUploadComplete={this.uploadComplete}
                                editable={{
                                    aspectRatio:1
                                }}
                    />
                </div>
                <div className="row">
                    <p>图片编辑（最多可上传四张图片）</p>
                    <RUI.Upload multiple={true} max={4} autoUpload={false} showDelete={true} editable={{
                        aspectRatio:100/100,
                        crop:function(result) {
                            console.log(result);
                        }
                    }} />
                </div>
                <div className="row">
                    <RUI.Pagination pageSize={10} currentPage={2} totalNum={108} />
                </div>
                <div className="row">
                    <RUI.Button onClick={this.alert}>确定弹出层</RUI.Button>
                    <RUI.Button onClick={this.confirm}>确定取消弹出层</RUI.Button>
                </div>
                <div className="row">
                    <RUI.Table dataSource={this.state.data}>
                        <RUI.Column width={75}>
                            <RUI.Table.TitleRender>
                                <CheckboxItemRender onClick={this.allCheck} selected={this.isAllCheck()} />
                            </RUI.Table.TitleRender>
                            <RUI.Table.ItemRender>
                                <CheckboxItemRender onClick={this.checkItem} />
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                        <RUI.Column title={"商品名称"} dataField={"name"}/>
                        <RUI.Column title={"商品分类"} dataField={"cate"} />
                        <RUI.Column title={"销售价"} dataField={"price"} width={75} />
                        <RUI.Column title={"库存"} dataField={"count"} />
                        <RUI.Column title={"销量"} dataField={"apply"} />
                        <RUI.Column title={"创建时间"} dataField={"time"} />
                        <RUI.Column title={"操作"}>
                            <RUI.Table.ItemRender>
                                <OperationItemRender onClick={this.tableDelete}>删除</OperationItemRender>
                            </RUI.Table.ItemRender>
                        </RUI.Column>
                    </RUI.Table>
                </div>
            </RUI.Form>
        </div>;
    }
});