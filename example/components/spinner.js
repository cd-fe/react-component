var Example = React.createClass({
    getInitialState:function() {
        return {

        }
    },
    render:function() {
        // key up key down
        // value max min step
        // disable
        // speed
        return <div className="example-input">
            <h2 className="title">数字调节器<span>Spinner</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">配置</h4>
                <div>

                </div>
                <h4 className="final-title">运行效果</h4>
                <div>

                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./spinner.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;