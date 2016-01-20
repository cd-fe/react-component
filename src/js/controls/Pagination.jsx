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
            pageSize: props.pageSize,
            currentPage: props.currentPage,
            totalNum: props.totalNum
        });
    },
    click:function(index) {
        this.setState({
            currentPage:index
        });
        this.props.onPage && this.props.onPage.call(null, index, this);
    },
    changePage:function(offset) {
        var target = this.getOffsetStatus(offset);
        if(target) {
            this.click(target);
        }
    },
    changePageToFirst:function() {
        this.click(1);
    },
    changePageToLast:function() {
        this.click(Math.ceil(this.state.totalNum / this.state.pageSize));
    },
    getOffsetStatus:function(offset) {
        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
        var target = this.state.currentPage * 1 + offset;
        if(target > 0 && target <= pageNumber) {
            return target;
        }
        return false;
    },
    renderItemRange:function(start, end) {
        var list = [];
        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
        for (var i = start; (i>0) && (i<=pageNumber) && (i<=end); i++) {
            list.push(<a
                href="javascript:;"
                onClick={this.click.bind(this, i)}
                className={"pagination-num "+(i == this.state.currentPage ? 'select' : '')}>{i}</a>);
        }

        return list;
    },
    renderBreak:function() {
        return <span className="break">...</span>;
    },
    renderPage:function() {
        var preview = 5;
        var pageNumber = Math.ceil(this.state.totalNum / this.state.pageSize);
        var list = [];
        if(this.state.currentPage <= preview) {
            list = list.concat(this.renderItemRange(1, this.state.currentPage));
            if(this.state.currentPage > Math.floor(preview/2)) {
                list = list.concat(this.renderItemRange(this.state.currentPage+1, this.state.currentPage+2));
            }else {
                list = list.concat(this.renderItemRange(this.state.currentPage+1, preview));
            }
            if(pageNumber > (list.length + Math.floor(preview/2))) {
                list.push(this.renderBreak());
            }
            if(pageNumber > list.length){
                for(var m=pageNumber-1;m<=pageNumber;m++) {
                    list = list.concat(this.renderItemRange(m, m));
                }
            }
        }
        else if(this.state.currentPage > (pageNumber - preview)) {
            list = list.concat(this.renderItemRange(1, 2));
            list.push(this.renderBreak());
            if(Math.abs(this.state.currentPage - pageNumber) > Math.floor(preview/2)) {
                list = list.concat(this.renderItemRange(this.state.currentPage-2, this.state.currentPage));
            }else {
                list = list.concat(this.renderItemRange(pageNumber - preview + 1, this.state.currentPage));
            }
            if(this.state.currentPage != pageNumber) {
                list = list.concat(this.renderItemRange(this.state.currentPage + 1, pageNumber));
            }
        }
        else {
            list = list.concat(this.renderItemRange(1, 2));
            list.push(this.renderBreak());
            list = list.concat(this.renderItemRange(this.state.currentPage - Math.floor(preview/2), this.state.currentPage + Math.floor(preview/2)));
            list.push(this.renderBreak());
            list = list.concat(this.renderItemRange(pageNumber-1, pageNumber));
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
                <a href="javascript:;" className={prefix+"-home"} onClick={this.changePageToFirst}>&lt;&lt;</a>
                <a href="javascript:;" className={prefix+"-prev " + (this.getOffsetStatus(-1) ? '' : 'disable')} onClick={this.changePage.bind(this, -1)}>&lt;</a>
                {this.renderPage()}
                <a href="javascript:;" className={prefix+"-next " + (this.getOffsetStatus(1) ? '' : 'disable')} onClick={this.changePage.bind(this, 1)}>&gt;</a>
                <a href="javascript:;" className={prefix+"-end"} onClick={this.changePageToLast}>&gt;&gt;</a>
            </div>
        </div>
    }
});