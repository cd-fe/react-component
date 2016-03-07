var Example = React.createClass({
    render:function() {
        return <div className="example-form">
            <h2 className="title">表单<span>Form</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">基本使用</h4>
                <div>
                    <RUI.Form>
                        <RUI.Form.Control type=""></RUI.Form.Control>
                    </RUI.Form>
                </div>
                <h4 className="final-title">水平布局</h4>
                <div>
                    <RUI.Form>
                        <RUI.Form.Control name="name" label="用户名" />
                        <RUI.Form.Control name="password" label="密码" type="password" />
                        <RUI.Form.Control name="interest" label="兴趣" type="checkbox">
                            <RUI.Checkbox value="1">科技</RUI.Checkbox>
                            <RUI.Checkbox value="1">摄影</RUI.Checkbox>
                            <RUI.Checkbox value="1">旅游</RUI.Checkbox>
                            <RUI.Checkbox value="1">娱乐</RUI.Checkbox>
                        </RUI.Form.Control>
                    </RUI.Form>
                </div>
                <h4 className="final-title">行内布局</h4>
                <div>

                </div>
                <h4 className="final-title">提交与重置</h4>
                <div>

                </div>
                <h4 className="final-title">验证</h4>
                <div>

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