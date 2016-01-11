import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';

import '../../css/pagination.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {
            pageSize:this.props.pageSize || 20,
            currentPage:this.props.currentPage || 1,
            totalNum:this.props.totalNum || 108
        };
    },
    getDefaultProps:function() {
        return  {
            cname:"pagination"
        };
    },
    componentWillReceiveProps:function(props) {
        this.setState({
            pageSize:props.pageSize,
            currentPage:props.currentPage,
            totalNum:props.totalNum
        });
    },
    click:function(index) {
        this.setState({
            currentPage:index
        });
        this.props.onPage && this.props.onPage.call(null, index, this);
    },
    renderPage:function() {
        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
        var list = [];
        for(var i=1;i<=pageNumber;i++) {
            list.push(<a href="javascript:;" onClick={this.click.bind(this, i)} className={"pagination-num "+(i == this.state.currentPage ? 'select' : '')}>{i}</a>)
        }

        return list;
    },
    render:function() {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        return <div className={allname}>
            <div className={prefix+"-detail"}>
                <p>共 <span>{this.state.totalNum}</span> 条，当前第 <span>{this.state.currentPage}</span> 页 </p>
            </div>
            <div className={prefix+"-list"}>
                <a href="javascript:;" className={prefix+"-home"}>&lt;&lt;</a>
                <a href="javascript:;" className={prefix+"-prev"}>&lt;</a>
                {this.renderPage()}
                <a href="javascript:;" className={prefix+"-next"}>&gt;</a>
                <a href="javascript:;" className={prefix+"-end"}>&gt;&gt;</a>
            </div>
        </div>
    }
});