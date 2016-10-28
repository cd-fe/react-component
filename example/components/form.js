var Example = React.createClass({
    formRules : function() {
        var _this = this;

        return {
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
                            callback: function(rc) {
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
                                    })
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                }
            },
            people : {
                required : false,
                validator : {
                    'people' : {
                        rules: {

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
                            }
                        }
                    },
                    'number' : {
                        rules: {
                            filter: {
                                 reg: /^[1-9]$/,
                                 msg: '1-9的数'
                             },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {

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
                             /*filter: {
                                 reg: 'name',//验证规则，，正则表达式
                                 msg: '活动名称格式不正确'
                                 },*/
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {

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
                            required: {
                                msg: '机会不能为空'
                            },
                            filter: {
                                reg: /^[0-9]+$/,//验证规则，，正则表达式
                                msg: '机会只能为数字'
                            },
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                //_this.doName(rc);
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
                            /*filter: {
                                reg: /^[0-9]+$/,//验证规则，，正则表达式
                                    msg: '账号格式不正确'
                            },*/
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                //_this.doName(rc);
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
                            /*filter: {
                             reg: /^[0-9]+$/,//验证规则，，正则表达式
                             msg: '账号格式不正确'
                             },*/
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                //_this.doName(rc);
                            }
                        }
                    }
                }
            },
            descType: {
                required : true,
                validator: {
                    'descType' :{
                        rules: {
                            required: {
                                msg: '请至少选择一个类型'
                            },
                            /*filter: {
                             reg: /^[0-9]+$/,//验证规则，，正则表达式
                             msg: '账号格式不正确'
                             },*/
                            trigger: 'onBlur|onChange',
                            callback: function(rc) {
                                //_this.doName(rc);
                            }
                        }
                    }
                }
            }
        }
    },
    getInitialState : function() {
        return {
            rules : this.formRules(),
            explain : this.props.explain,
            numberDisable : true,
            number : '',
        }
    },
    doNumber : function(e){
        this.setState({
            number:e.target.value
        });
    },

    doEvt : function(rc) {
        console.log('自定义')
        return true;
    },
    doName : function(rc) {
        if(rc.getValue() == '1') {
            rc.setState({
                validateStatus : 'is-error',
                explain : '数字不能为1'
            });
            return false;
        }else {
            return true;
        }
    },
    doMob : function(rc) {
        if(rc.getValue() == '15008229012') {
            rc.setState({
                validateStatus : 'is-error',
                explain : '数字不能15008229012'
            });
            return false;
        }else {
            return true;
        }
    },
    submitHandler:function(data, form) {
        //
        console.dir(data);
        return false;
    },
    commonFunc : function(e) {
        console.log(e);
    },
    nameCheck : function(value) {
        //console.log('namecheck======================= ' + value);
    },
    onClickHandler : function() {
        this.refs.form.setFieldCheckStatus('mob', {
            validateStatus : 'is-success',
            explain : '信息输入正确',
        });
    },
    disable : function() {
        //console.log('触发onchange事件');
        console.log('自定义');
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
                {/*<p><RUI.Button onClick={this.onClickHandler}>点击</RUI.Button></p>*/}
                <div>
                    <RUI.Form ref="form" className="horizonal" onSubmit={this.submitHandler} rules={this.state.rules}>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>基本设置</p>
                        </RUI.Form.Row>
                        <RUI.Form.Row label="活动名称：" type="activity">
                            <RUI.Form.Control
                                name="evt"
                                type="input"
                                onChange={this.doEvt}
                                placeholder="最多输入15个字"
                            />
                        </RUI.Form.Row>
                        <RUI.Form.Row label="活动时间：" type="time">
                            <RUI.Form.Control
                                name="start"
                                type="datePicker"
                            />
                            <span className="split"></span>
                            <RUI.Form.Control
                                name="end"
                                type="datePicker"
                            >
                           </RUI.Form.Control>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="参与人数：" type="people">
                            <RUI.Form.Control
                                defaultValue={"1"}
                                name="people"
                                type="radio">
                                <RUI.Radio value="1">隐藏</RUI.Radio>
                                <RUI.Radio value="0">显示</RUI.Radio>
                            </RUI.Form.Control>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="参与人数限制：" type="plimit">
                            <RUI.Form.Control
                                defaultValue={"1"}
                                name="limit"
                                type="radio">
                                <RUI.Radio value="1">不限</RUI.Radio>
                                <RUI.Radio value="0">限制</RUI.Radio>
                            </RUI.Form.Control>
                            <RUI.Form.Control
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
                                name="reward"
                                type="select"
                                stuff={true}
                                data={selectData}
                            />
                            <span className="deco grey">参与活动即可抽奖</span>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="每日抽奖机会：" type="chance">
                            <span className="deco-l">每人每日有</span>
                            <RUI.Form.Control
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
                                name="cover"
                                type="upload"
                                multiple={true}
                                placeholder="请上传图片"
                                list={[]}
                                onChange={this.disable}
                            />
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>文案描述</p>
                        </RUI.Form.Row>

                        <RUI.Form.Row label="文案描述：" type="desc">
                            <RUI.Form.Control
                                name="desc"
                                type="textarea"
                                placeholder="文案描述"
                                onChange={this.disable}
                            />
                        </RUI.Form.Row>

                        <RUI.Form.Row label="描述类型：" type="descType">
                            <RUI.Form.Control
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
                            <RUI.Form.Reset>重置</RUI.Form.Reset>
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
