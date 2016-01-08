module.exports = React.createClass({
    getInitialState:function() {
        return {
            pageSize:this.props.pageSize || 20,
            currentPage:this.props.currentPage || 1,
            totalNum:this.props.totalNum || 108
        };
    },
    componentWillReceiveProps:function(props) {
        this.setState({
            pageSize:props.pageSize,
            currentPage:props.currentPage,
            totalNum:props.totalNum
        });
    },
    renderPage:function() {
        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
        var list = [];
        for(var i=1;i<=pageNumber;i++) {
            list.push(<a href="javascript:;" className={"page-num "+(i == this.state.currentPage ? 'select' : '')}>{i}</a>)
        }

        return list;
    },
    render:function() {
        return <div className="pager">
            <div className="pager-detail">
                <p>共 <span>{this.state.totalNum}</span> 条，当前第 <span>{this.state.currentPage}</span> 页 </p>
            </div>
            <div className="pager-list">
                <a href="javascript:;" className="page-home ">&lt;&lt;</a>
                <a href="javascript:;" className="page-prev ">&lt;</a>
                {this.renderPage()}
                <a href="javascript:;" className="page-next">&gt;</a>
                <a href="javascript:;" className="page-end">&gt;&gt;</a>
            </div>
        </div>
    }
});