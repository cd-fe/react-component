var Example = React.createClass({
    followShowLoading:function(e) {
        this.refs.followLoading.open(e.data);
    },
    fullShowLoading:function(e) {
        this.refs.fullLoading.open(e.data);
    },
    render:function() {
        return <div className="example-tooltip">
            <h2 className="title">加载<span>Loading</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <RUI.Button className="primary" onClick={this.fullShowLoading}>全屏</RUI.Button> &nbsp;
                <RUI.Button className="primary" onClick={this.followShowLoading}>跟随</RUI.Button>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <pre>
                    {require('raw!./loading.js')}
                </pre>
            </div>
            <RUI.Loading
                ref="followLoading"
                type={'follow'}
                mask={true}
                size={'s-small'}>
            </RUI.Loading>
            <RUI.Loading
                ref="fullLoading"
                type={'full-screen'}
                mask={true}
                size={'s-small'}>
            </RUI.Loading>
        </div>;
    }
});

module.exports = Example;