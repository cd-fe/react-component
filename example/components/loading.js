var Example = React.createClass({
    render:function() {
        return <div className="example-tooltip">
            <h2 className="title">加载<span>Loading</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">

            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <pre>
                    {require('raw!./loading.js')}
                </pre>
            </div>
        </div>;
    }
});

module.exports = Example;