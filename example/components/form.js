var Example = React.createClass({
    submitHandler:function(data, form) {
        alert(JSON.stringify(data));
        return false;
    },
    commonFunc : function(e) {
        console.log(e);
    },
    render:function() {
        var selectData = [
            { key:'管理员', value:1 },
            { key:'编辑', value:2 },
            { key:'审查', value:3 }
        ];

        return <div className="example-form">
            <h2 className="title">表单<span>Form</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                {/*
                 <h4 className="final-title">垂直布局</h4>
                 <div>
                 <RUI.Form className="horizonal">
                 <RUI.Form.Row>
                 <RUI.Form.Control name="name" label="用户名：" placeholder="请输入邮箱" />
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Control name="name" label="手机号：" placeholder="请输入手机号" />
                 </RUI.Form.Row>
                 </RUI.Form>
                 </div>
                 <h4 className="final-title">水平布局</h4>
                 <div>
                 <RUI.Form className="horizonal">
                 <RUI.Form.Row>
                 <RUI.Form.Control name="name" label="用户名：" placeholder="请输入邮箱" />
                 <RUI.Form.Control name="name" label="手机号：" placeholder="请输入手机号" />
                 <RUI.Form.Control name="interest" label="兴趣：" type="checkbox">
                 <RUI.Checkbox value="1">科技</RUI.Checkbox>
                 <RUI.Checkbox value="2">摄影</RUI.Checkbox>
                 <RUI.Checkbox value="3">旅游</RUI.Checkbox>
                 <RUI.Checkbox value="4">娱乐</RUI.Checkbox>
                 </RUI.Form.Control>
                 </RUI.Form.Row>
                 </RUI.Form>
                 </div>
                 <h4 className="final-title">提交与重置</h4>
                 <div>
                 <RUI.Form className="horizonal">
                 <RUI.Form.Row>
                 <RUI.Form.Control name="name" label="用户名：" placeholder="请输入邮箱或者手机号" />
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Control name="password" label="密码：" type="password" placeholder="请输入密码" />
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Control name="interest" label="兴趣：" type="checkbox">
                 <RUI.Checkbox value="1">科技</RUI.Checkbox>
                 <RUI.Checkbox value="2">摄影</RUI.Checkbox>
                 <RUI.Checkbox value="3">旅游</RUI.Checkbox>
                 <RUI.Checkbox value="4">娱乐</RUI.Checkbox>
                 </RUI.Form.Control>
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Control name="male" label="性别：" type="radio">
                 <RUI.Radio value="1">男</RUI.Radio>
                 <RUI.Radio value="0">女</RUI.Radio>
                 </RUI.Form.Control>
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Control name="role" label="角色：" type="select" data={selectData} />
                 </RUI.Form.Row>
                 <RUI.Form.Row>
                 <RUI.Form.Submit>保存</RUI.Form.Submit>
                 </RUI.Form.Row>
                 </RUI.Form>
                 </div>
                */}
                <h4 className="final-title">验证</h4>
                <div>
                    <RUI.Form className="horizonal" onSubmit={this.submitHandler}>
                        <RUI.Form.Row>
                            <RUI.Form.Control
                                label="倍棒账号："
                                name="name"
                                placeholder="请输入倍棒账号"

                                type="input"
                                remote={{
                                    url:"https://openapi.youku.com/v2/videos/show.json?client_id=599c0d569cbd70d7&video_id=XMTc3MzM5OTc3Ng==",
                                    type : 'post',
                                    data : {}
                                }}
                                required={true}
                                reg={/^[0-9]+$/}
                                requireMsg="账号不能为空"
                                explain="账号格式不正确"
                                trigger={'onBlur|onChange'}
                                validator={this.nameCheck}
                                validateStatus=""

                            />
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <RUI.Form.Control
                                label="手机号："
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
                                validateStatus=""

                            />
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <RUI.Form.Control
                                name="male"
                                label="性别："
                                type="radio"

                                required={true}
                                requireMsg="请选择性别"
                                trigger={'onBlur|onChange'}
                                validator={this.maleCheck}
                                validateStatus=""
                                
                            >
                                <RUI.Radio value="1">男</RUI.Radio>
                                <RUI.Radio value="0">女</RUI.Radio>
                            </RUI.Form.Control>
                        </RUI.Form.Row>

                        <RUI.Form.Row>
                            <RUI.Form.Control
                                name="password"
                                label="密码："
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
                                label="确认密码："
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
                        <RUI.Form.Row>
                            <RUI.Form.Control
                                name="interest"
                                label="兴趣："

                                type="checkbox"
                                required={true}
                                requireMsg="请选择兴趣"
                                trigger={'onChange'}
                                validator={this.interestCheck}
                                validateStatus=""
                            >
                                <RUI.Checkbox value="1">科技</RUI.Checkbox>
                                <RUI.Checkbox value="2">摄影</RUI.Checkbox>
                                <RUI.Checkbox value="3">旅游</RUI.Checkbox>
                                <RUI.Checkbox value="4">娱乐</RUI.Checkbox>
                            </RUI.Form.Control>
                        </RUI.Form.Row>
                        <RUI.Form.Row>
                            <RUI.Form.Control
                                name="role"
                                label="角色："

                                type="select"
                                required={true}
                                requireMsg="请选择角色"
                                value={{key:'选择',value:'2'}}
                                trigger={'onChange'}
                                validator={this.commonFunc}
                                validateStatus=""
                                data={selectData}
                            />
                        </RUI.Form.Row>
                        {/*
                         <RUI.Form.Row>
                         <RUI.Form.Control
                         name="cover"
                         label="上传封面："

                         type="upload"
                         required={true}


                         multiple={true}
                         autoUpload={true}
                         action="http://image.berbon.com/image/upload/base64zoom"
                         actionData={function(){}}
                         onUploadComplete={function(){}}
                         editable={{
                         aspectRatio:1
                         }}
                         />
                         </RUI.Form.Row>
                        */}
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