var timer = Date.now();
var Example = React.createClass({
    formatUploadData:function(file) {
        var data = (file || "").split(',');
        var suffix = data[0].match(/data:image\/(.+);base64/);
        return {
            suffix:suffix[1],
            baseStr:data[1]
        };
    },
    checkImgSizeAndType : function(file, limit) {
        if (!(/^(jpg|png|jpeg|bmp)$/gi.test(file.data.type.split('/')[1]))) {
            RUI.DialogManager.alert("上传图片只允许JPEG、JPG、PNG、BMP格式的图片!");
            return false;
        }
        if((file.data.size/(1024*1024)).toFixed(2) > limit) {
            RUI.DialogManager.alert('上传图片大小只允许'+limit+'M的图片!');
            return false;
        }
        return true;
    },
    uploadCheck : function(e) {
        return this.checkImgSizeAndType(e, 2);
    },
    formRules : function() {
        var _this = this;
        return {
            username : {
                required : true,
                validator : {
                    'user' : {
                        rules: {
                            required: {
                                msg: '姓名不能为空'
                            },
                            filter: {
                                reg: 'number',//验证规则
                                msg: '姓名格式不正确'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc,v) {
                                _this.setState({
                                    value : v
                                });
                                return true;
                            }
                        }
                    }
                }
            },
            activity : {
                required : true,
                validator : {
                    'evt' : {
                        rules: {
                            required: {
                                msg: '活动名称不能为空'
                            },
                            filter: {
                                reg: 'name',//验证规则
                                msg: '活动名称格式不正确'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                //远程校验
                               /* var form = _this.refs.form;
                                $.ajax({
                                    url:'http://shop.berbon.com/react-component/src/js/containers/form/remotes.json',
                                    type:'get',
                                    dataType : 'json',
                                    data:{},
                                    cache: false,
                                    beforeSend : function() {
                                        form.setFieldCheckStatus('evt',{
                                            validateStatus : 'is-validating',
                                            explain : ''
                                        });
                                    },
                                    success:function(response) {
                                        form.setFieldCheckStatus('evt',{
                                            validateStatus : 'is-success',
                                            explain : ''
                                        });
                                    },
                                    error:function() {
                                        form.setFieldCheckStatus('evt',{
                                            validateStatus : 'is-error',
                                            explain : '网络错误,请稍后再试！'
                                        });
                                    }
                                });*/
                                return true;
                            }
                        }
                    }
                }
            },
            time : {
                required : true,
                validator : {
                    'start' : {
                        rules: {
                            required: {
                                msg: '请选择开始时间'
                            },
                            trigger: 'onChange',
                            callback: function(rc,v) {
                                _this.setState({
                                    time : v
                                });
                                return true;
                            }
                        }
                    },
                    'end' :{
                        rules: {
                            required: {
                                msg: '请选择结束时间'
                            },
                            trigger: 'onChange',
                            callback: function(rc) {
                                var form = _this.refs.form;
                                var start = form.getSingleFieldValue('start');
                                var end = form.getSingleFieldValue('end');
                                if(start > end) {
                                    form.setFieldCheckStatus('end',{
                                        validateStatus : 'is-error',
                                        explain : '结束时间不能小于开始时间'
                                    });
                                    return false;
                                }
                                return true;
                            }
                        }
                    },
                    'start1' : {
                        rules: {
                            required: {
                                msg: '请选择开始时间'
                            },
                            trigger: 'onChange',
                            callback: function(rc) {
                                return true;
                            }
                        }
                    },
                    'end1' :{
                        rules: {
                            required: {
                                msg: '请选择结束时间'
                            },
                            trigger: 'onChange',
                            callback: function(rc) {
                                var form = _this.refs.form;
                                var start = form.getSingleFieldValue('start');
                                var end = form.getSingleFieldValue('end');
                                if(start > end) {
                                    form.setFieldCheckStatus('end',{
                                        validateStatus : 'is-error',
                                        explain : '结束时间不能小于开始时间'
                                    });
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }
            },
            people : {
                required : true,
                validator : {
                    'people' : {
                        rules: {
                            trigger: 'onChange',
                            callback: function(rc,v) {
                                var form = _this.refs.form;
                                if(!v) {
                                    rc.setState({
                                        validateStatus : 'is-error',
                                        explain : '请选择参与人数限制！'
                                    });
                                    return false;
                                }else {
                                    rc.setState({
                                        validateStatus : '',
                                        explain : ''
                                    });
                                    return true;
                                }
                                return true;
                            }
                        }
                    }
                }
            },
            plimit : {
                required : false,
                validator : {
                    'limit' : {
                        rules: {
                            trigger: 'onChange',
                            callback: function(rc) {
                                var value = rc.getValue();
                                var form = _this.refs.form;
                                if(value == '1') {
                                    _this.setState({
                                        numberDisable : true,
                                        number : ''
                                    });
                                    _this.refs.form.setFieldCheckStatus('number',{
                                        validateStatus : '',
                                        explain : ''
                                    })
                                }else {
                                    _this.setState({
                                        numberDisable : false
                                    });
                                }
                                return true;
                            }
                        }
                    },
                    'number' : {
                        rules: {
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                var form = _this.refs.form;
                                var limit = form.getSingleFieldValue('limit');
                                if(limit == '0') {
                                    if(/^[1-9]$/.test(rc.getValue())) {
                                        form.setFieldCheckStatus('number',{
                                            validateStatus : 'is-success',
                                            explain : ''
                                        });
                                        return true;
                                    }else {
                                        form.setFieldCheckStatus('number',{
                                            validateStatus : 'is-error',
                                            explain : '1-9的数'
                                        });
                                        return false;
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }
            },
            rewardType : {
                required : true,
                validator : {
                    'reward' : {
                        rules: {
                            required: {
                                msg: '请选择派奖方式'
                             },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                return true;
                            }
                        }
                    }
                }
            },
            chance: {
                required : false,
                validator: {
                    'chance' :{
                        rules: {
                            filter: {
                                reg: 'number',
                                msg: '机会只能为数字'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                return true;
                            }
                        }
                    }
                }
            },
            cover: {
                required : true,
                validator: {
                    'cover' :{
                        rules: {
                            required: {
                                msg: '图片不能为空'
                            },
                            callback: function(rc) {
                                return true;
                            }
                        }
                    }
                }
            },
            desc: {
                required : true,
                validator: {
                    'desc' :{
                        rules: {
                            required: {
                                msg: '描述不能为空'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                return true;
                            }
                        }
                    }
                }
            },
            descType: {
                required : false,
                validator: {
                    'descType' :{
                        rules: {
                            required: {
                                msg: '请至少选择一个类型'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    },
    componentDidMount : function() {
        //执行某项表单元校验
        this.refs.form.validateSingleField('evt');
    },
    getInitialState : function() {
        return {
            val: "",
            rules : this.formRules(),
            explain : this.props.explain,
            numberDisable : false,
            number : '',
            disable : false,
            hide : true,
            list : ['http://10.2.50.38/images/ae13c4d4dcea406c133ebb6d6f31dca6_1477965048481.JPEG_614_614.JPEG']
        }
    },
    doNumber : function(e){
        this.setState({
            number:e.target.value
        });
    },
    submitHandler:function(data, form) {
        //RUI.DialogManager.alert(JSON.stringify(data));
        console.dir(data);
        //return false;
    },
    complete : function(res,s) {
        var form = this.refs.form;
        var uploadList = form.getSingleFieldValue('cover');
        if(uploadList.length > 0) {
            form.setFieldCheckStatus('cover',{
                validateStatus : '',
                explain : ''
            });
        }
    },
    render:function() {
        var selectData = [
            { key:'请选择', value:0 },
            { key:'管理员', value:1 },
            { key:'编辑', value:2 },
            { key:'审查', value:3 }
        ];
        return <div className="example-form">
            <h2 className="title">表单<span>Form</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">验证</h4>
                <div>
                    <RUI.Input onChange={(e)=>this.setState({val:e.target.value})} value={this.state.val} />
                    <RUI.Form ref="form" className="horizonal" onSubmit={this.submitHandler} rules={this.state.rules}>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>基本设置</p>
                        </RUI.Form.Row>
                        {/*可以随意DOM元素*/}
                        {
                            this.state.hide && (<div className="username" type="username">
                                <RUI.Form.Control
                                    rowType="username"
                                    name="user"
                                    type="input"
                                    value={this.state.value}
                                    placeholder="最多输入15个字"
                                />
                            </div>)
                        }
                       <div>
                           <RUI.Form.Row label="活动名称："  type="activity">
                               <RUI.Form.Control
                                   rowType="activity"
                                   name="evt"
                                   type="input"
                                   defaultValue="sd"
                                   placeholder="最多输入15个字"
                               />
                           </RUI.Form.Row>
                       </div>

                        <RUI.Form.Row label="活动时间：" type="time">
                           <div>
                               <RUI.Form.Control
                                   rowType="time"
                                   name="start"
                                   showTime={true}
                                   value={this.state.time}
                                   type="datePicker"
                                />
                               <span className="split"></span>
                               <RUI.Form.Control
                                   rowType="time"
                                   name="end"
                                   type="datePicker"
                               >
                               </RUI.Form.Control>
                           </div>
                        </RUI.Form.Row>
                        <RUI.Form.Row label="参与人数：" type="people">
                            <RUI.Form.Control
                                rowType="people"
                                name="people"
                                type="radio">
                                <RUI.Radio value="1">隐藏</RUI.Radio>
                                <RUI.Radio value="0">显示</RUI.Radio>
                            </RUI.Form.Control>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="参与人数限制：" type="plimit">
                            <RUI.Form.Control
                                rowType="plimit"
                                defaultValue={"1"}
                                name="limit"
                                type="radio">
                                <RUI.Radio value="1">不限</RUI.Radio>
                                <RUI.Radio value="0">限制</RUI.Radio>
                            </RUI.Form.Control>
                            <RUI.Form.Control
                                rowType="plimit"
                                name="number"
                                type="input"
                                disable={this.state.numberDisable}
                                placeholder="请输入1-9的数"
                                value={this.state.number}
                                onChange={this.doNumber}

                            />
                            <span className="deco">人参与</span>
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>派奖方式</p>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="派奖方式：" type="rewardType">
                            <RUI.Form.Control
                                rowType="rewardType"
                                name="reward"
                                className="width_120"
                                type="select"
                                disable={this.state.disable}
                                stuff={true}
                                data={selectData}
                            />
                            <span className="deco grey">参与活动即可抽奖</span>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="每日抽奖机会：" type="chance">
                            <span className="deco-l">每人每日有</span>
                            <RUI.Form.Control
                                rowType="chance"
                                className="width_80"
                                name="chance"
                                type="input"
                                placeholder="请输入"

                            />
                            <span className="deco">抽奖机会</span>
                        </RUI.Form.Row>

                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>活动首页设置</p>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="图片设置：" type="cover">
                            <RUI.Form.Control
                                rowType="cover"
                                name="cover"
                                type="upload"
                                multiple={true}
                                autoUpload={true}
                                beforeEdit={this.uploadCheck}
                                action="http://image.berbon.com/image/upload/base64zoom"
                                actionData={this.formatUploadData}
                                beforeEdit={this.uploadCheck}
                                onUploadComplete={this.complete}
                                disable={false}
                                editable={{
                                    aspectRatio:1
                                }}
                                placeholder="请上传图片"
                                list={this.state.list}
                            />
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>文案描述</p>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="文案描述：" type="desc">
                            <RUI.Form.Control
                                rowType="desc"
                                name="desc"
                                type="textarea"
                                disable={false}
                                placeholder="文案描述"
                            />
                        </RUI.Form.Row>

                        <RUI.Form.Row label="描述类型：" type="descType">
                            <RUI.Form.Control
                                rowType="descType"
                                name="descType"
                                type="checkbox">
                                <RUI.Checkbox value="1" defaultSelected={0}>科技</RUI.Checkbox>
                                <RUI.Checkbox value="2" defaultSelected={0}>摄影</RUI.Checkbox>
                                <RUI.Checkbox value="3" defaultSelected={0}>旅游</RUI.Checkbox>
                                <RUI.Checkbox value="4" defaultSelected={0}>娱乐</RUI.Checkbox>
                            </RUI.Form.Control>
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <RUI.Form.Submit>保存</RUI.Form.Submit>
                            {/*<RUI.Form.Reset>重置</RUI.Form.Reset>*/}
                        </RUI.Form.Row>
                    </RUI.Form>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./form.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;
