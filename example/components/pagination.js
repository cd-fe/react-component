var Example = React.createClass({
    getPageConfig:function() {
        return {
            pageSize:10,
            currentPage:11,
            totalNum:780
        };
    },
    onPageChange:function(currentPage) {
        RUI.DialogManager.alert("change:" + currentPage, "提示");
    },
    render:function() {
        return <div className="example-pagination">
            <h2 className="title">分页<span>Pagination</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <RUI.Pagination {...this.getPageConfig()} onPage={this.onPageChange} />
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <pre>
                    {require('raw!./pagination.js')}
                </pre>
            </div>
        </div>;
    }
});

module.exports = Example;