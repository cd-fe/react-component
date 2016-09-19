/**
 * 分页组件
 * @module controls/Pagination
 */

import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Icon from '../controls/Icon.jsx';

import '../../css/pagination.scss';

module.exports = React.createClass({
    /**
     * 基础方法
     * @see {@link module:mixins/ComponentBase}
     */
    mixins: [ComponentBase],
    getInitialState: function () {
        return {
            currentPage: this.props.currentPage
        };
    },
    getDefaultProps: function () {
        return {
            /**
             * @instance
             * @default input
             * @type string
             * @desc 组件名称
             */
            cname: "pagination",
            /**
             * @instance
             * @default 10
             * @type number
             * @desc 每页显示的条数
             */
            pageSize: 10,
            /**
             * @instance
             * @default 0
             * @type number
             * @desc 总共多少条数据
             */
            totalNum: 0,
            /**
             * @instance
             * @default 1
             * @type number
             * @desc 当前显示第几页
             */
            currentPage: 1,
            /**
             * @instance
             * @default null
             * @type function
             * @desc 页数变更时的回调函数
             * @example
             * pageHandler:function(page, pagination) {
             *      console.log(page);
             * }
             */
            onPage: null
        };
    },
    componentWillReceiveProps: function (props) {
        this.setState({
            currentPage: props.currentPage
        });
    },
    click: function (index) {
        this.setState({
            currentPage: index
        });
        this.props.onPage && this.props.onPage.call(null, index, this);
    },
    changePage: function (offset) {
        var target = this.getOffsetStatus(offset);
        if (target) {
            this.click(target);
        }
    },
    changePageToFirst: function () {
        this.click(1);
    },
    changePageToLast: function () {
        this.click(Math.ceil(this.props.totalNum / this.props.pageSize));
    },
    getOffsetStatus: function (offset) {
        var pageNumber = Math.ceil(this.props.totalNum / this.props.pageSize);
        var target = this.state.currentPage * 1 + offset;
        if (target > 0 && target <= pageNumber) {
            return target;
        }
        return false;
    },
    renderItemRange: function (start, end) {
        var list = [];
        var pageNumber = this.props.totalNum < this.props.pageSize ? 1 : Math.ceil(this.props.totalNum / this.props.pageSize);
        for (var i = start; (i > 0) && (i <= pageNumber) && (i <= end); i++) {
            list.push(<RUI.Button key={start+'-'+end+'-'+i}
                         href="javascript:;"
                         onClick={this.click.bind(this, i)}
                         className={"pagination-num "+(i == this.state.currentPage ? 'select' : '')}>{i}</RUI.Button>);
        }

        return list;
    },
    renderBreak: function (index) {
        return <Icon className="break" name="more" key={index} />;
    },
    renderPage: function () {
        var preview = 5;
        var pageNumber = this.props.totalNum <= this.props.pageSize ? 1 : Math.ceil(this.props.totalNum / this.props.pageSize);
        var list = [];
        if (this.state.currentPage <= (preview + 1)) {
            list = list.concat(this.renderItemRange(1, this.state.currentPage));
            if (this.state.currentPage > Math.floor(preview / 2)) {
                list = list.concat(this.renderItemRange(this.state.currentPage + 1, this.state.currentPage + 2));
            } else {
                list = list.concat(this.renderItemRange(this.state.currentPage + 1, preview));
            }
            if (pageNumber >= (list.length + Math.floor(preview / 2))) {
                list.push(this.renderBreak(list.length));
            }
            if (pageNumber > list.length) {
                for (var m = pageNumber; m <= pageNumber; m++) {
                    list = list.concat(this.renderItemRange(m, m));
                }
            }
        }
        else if (this.state.currentPage > (pageNumber - preview) && pageNumber > (preview + 1)) {
            list = list.concat(this.renderItemRange(1, 2));
            list.push(this.renderBreak(list.length));
            if (Math.abs(this.state.currentPage - pageNumber) > Math.floor(preview / 2)) {
                list = list.concat(this.renderItemRange(this.state.currentPage - 2, this.state.currentPage));
            } else {
                list = list.concat(this.renderItemRange(pageNumber - preview + 1, this.state.currentPage));
            }
            if (this.state.currentPage != pageNumber) {
                list = list.concat(this.renderItemRange(this.state.currentPage + 1, pageNumber));
            }
        }
        else {
            list = list.concat(this.renderItemRange(1, 2));
            list.push(this.renderBreak(list.length));
            list = list.concat(this.renderItemRange(this.state.currentPage - Math.floor(preview / 2), this.state.currentPage + Math.floor(preview / 2)));
            list.push(this.renderBreak(list.length));
            list = list.concat(this.renderItemRange(pageNumber - 1, pageNumber));
        }

        return list;
    },
    render: function () {
        var allname = className(this.props.className, this.getPropClass());
        var prefix = this.getDefaultClass();
        var pageNumber = this.props.totalNum <= this.props.pageSize ? 1 : Math.ceil(this.props.totalNum / this.props.pageSize);
        return <div className={allname}>
            <div className={prefix+"-detail"}>
                <p>共 <span>{this.props.totalNum}</span> 条 共<span>{pageNumber}</span> 页 </p>
            </div>
            <div className={prefix+"-list"}>
                {/*<RUI.Button href="javascript:;" className={prefix+"-home"} onClick={this.changePageToFirst}>&lt;&lt;</RUI.Button>*/}
                <RUI.Button href="javascript:;" className={prefix+"-prev " + (this.getOffsetStatus(-1) ? '' : 'disable')}
                   onClick={this.changePage.bind(this, -1)}><Icon name="arrow-left" /></RUI.Button>
                {this.renderPage()}
                <RUI.Button href="javascript:;" className={prefix+"-next " + (this.getOffsetStatus(1) ? '' : 'disable')}
                   onClick={this.changePage.bind(this, 1)}><Icon name="arrow-right" /></RUI.Button>
                {/*<RUI.Button href="javascript:;" className={prefix+"-end"} onClick={this.changePageToLast}>&gt;&gt;</RUI.Button>*/}
            </div>
        </div>
    }
});