var rules = {
    acc: {
        validator: [
            {
                type: 'input',
                rules: {
                    required: {
                        msg: '账号不能为空'
                    },
                    filter: {
                        reg: /^[0-9]+$/,//验证规则，，正则表达式
                        msg: '账号格式不正确'
                    },
                    trigger: 'onBlur|onChange',
                    callback: function(rc) {
                        if(rc.getValue() == '1') {
                            rc.setState({
                                validateStatus : 'is-error',
                                explain : '数字不能为1'
                            });
                            return false;
                        }
                        //showError();
                    }
                }
            },
            {
                type: 'input',
                rules: {
                    required: {
                        msg: '手机号不能为空'
                    },
                    filter: {
                        reg: 'phone',//验证规则，，正则表达式
                        msg: '手机号格式不正确'
                    },
                    trigger: 'onBlur|onChange',
                    callback: function(rc) {
                        //远程在此校验
                        console.log(rc.getValue());
                        if(rc.getValue() == '15008229012') {
                            rc.setState({
                                validateStatus : 'is-error',
                                explain : '数字不能15008229012'
                            });
                            return false;
                        }
                        //showError();
                    }
                }
            }
        ]
    }
};

var Example = React.createClass({
    getInitialState : function() {
        return {
            rules : rules,
            explain : this.props.explain
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
                    <RUI.Form className="horizonal" onSubmit={this.submitHandler} rules={this.state.rules}>
                        <RUI.Form.Row>
                            <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>输入框</p>
                        </RUI.Form.Row>
                        <RUI.Form.Row label="倍棒账号：" type="acc">
                            <RUI.Form.Control
                                name="name"
                                type="input"
                                placeholder="请输入倍棒账号"

                            />
                            <RUI.Form.Control
                                name="name"
                                type="input"
                                placeholder="请输入手机号"

                            />
                        </RUI.Form.Row>
                        {/*<RUI.Form.Row label="手机号：">
                         <RUI.Form.Control
                         name="phone"
                         placeholder="请输入手机号"
                         type="input"
                         remote=""
                         required={true}
                         reg={'phone'}
                         requireMsg="手机号不能为空"
                         explain="手机号合格不正确"
                         trigger={'onBlur|onChange'}
                         validator={this.phoneCheck}
                         />
                         </RUI.Form.Row>
                         <RUI.Form.Row label="QQ：">
                         <RUI.Form.Control
                         name="phone"

                         type="input"
                         validator={this.QQCheck}
                         />
                         </RUI.Form.Row>
                         <RUI.Form.Row label="抽奖机会：">
                         <i className="desc">每人每日有</i>
                         <RUI.Form.Control>
                         <RUI.Input name="times" />
                         </RUI.Form.Control>
                         <i className="desc">抽奖机会</i>
                         </RUI.Form.Row>

                         <RUI.Form.Row label="获奖概率：">
                         <RUI.Form.Control
                         name="times"
                         wcname="width_80"
                         type="input"
                         reg={'number'}
                         validator={this.timesCheck}
                         >
                         </RUI.Form.Control>
                         <i className="desc"><strong>%</strong> <em className="grey">这意味着每十次抽奖3次获奖</em></i>
                         </RUI.Form.Row>
                         <RUI.Form.Row>
                         <p style={{paddingBottom:'5px',fontSize:'16px',fontWeight:'bold',borderBottom: "1px dashed #dadada"}}>其它</p>
                         </RUI.Form.Row>
                         <RUI.Form.Row label="性别：">
                         <RUI.Form.Control
                         name="male"
                         type="radio"

                         required={true}
                         requireMsg="请选择性别"
                         trigger={'onBlur|onChange'}
                         validator={this.maleCheck}
                         validateStatus="">
                         <RUI.Radio value="1">男</RUI.Radio>
                         <RUI.Radio value="0">女</RUI.Radio>
                         </RUI.Form.Control>
                         </RUI.Form.Row>
                         <RUI.Form.Row label="密码">
                         <RUI.Form.Control
                         name="password"
                         placeholder="请输入密码"
                         type="password"
                         required={true}
                         reg={'pass'}
                         requireMsg="密码不能为空"
                         explain="密码为数组、英文字母组合"
                         trigger={'onBlur|onChange'}
                         validator={this.psCheck}
                         validateStatus=""
                         />
                         <RUI.Form.Control
                         name="cpassword"
                         placeholder="请确认密码"
                         type="password"
                         required={true}
                         reg={'pass'}
                         requireMsg="密码不能为空"
                         explain="密码为数组、英文字母组合"
                         trigger={'onBlur|onChange'}
                         validator={this.rpsCheck}
                         validateStatus=""
                         />
                         </RUI.Form.Row>
                         <RUI.Form.Row label="兴趣：">
                         <RUI.Form.Control
                         name="interest"
                         type="checkbox"
                         required={true}
                         requireMsg="请选择兴趣"
                         trigger={'onChange'}
                         validator={this.interestCheck}
                         validateStatus=""
                         >
                         <RUI.Checkbox value="1" selected={'1'}>科技</RUI.Checkbox>
                         <RUI.Checkbox value="2">摄影</RUI.Checkbox>
                         <RUI.Checkbox value="3">旅游</RUI.Checkbox>
                         <RUI.Checkbox value="4">娱乐</RUI.Checkbox>
                         </RUI.Form.Control>
                         </RUI.Form.Row>
                         <RUI.Form.Row label="角色：">
                         <RUI.Form.Control
                         name="role"
                         type="select"
                         required={true}
                         requireMsg="请选择角色"
                         stuff={true}
                         trigger={'onChange'}
                         validator={this.commonFunc}
                         validateStatus=""
                         data={selectData}
                         />
                         </RUI.Form.Row>*/}
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