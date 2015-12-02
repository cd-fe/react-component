import RUI from './js/index.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

var Pagination = RUI.Pagination;
var TestPagination = React.createClass({
    getInitialState:function() {
        return {
            preview:4,
            current:8,
            max:17
        };
    },
    onChange:function(val) {
        this.setState({
            current:val * 1
        });
    },
    render:function() {
        return <Pagination
            preview={this.state.preview}
            current={this.state.current}
            max={this.state.max}
            onChange={this.onChange}
        />;
    }
});
ReactDOM.render(<TestPagination />, document.getElementById('pagination'));

var Button = RUI.Button;
var TestButton = React.createClass({
    getInitialState:function() {
        return {
            loading:false
        };
    },
    onClick:function() {
        this.setState({
            loading:!this.state.loading
        });
    },
    render:function() {
        return <div style={{textAlign:'center'}} >
            <Button style={{marginRight:'20px'}} >
                <span>提交</span>
            </Button>
            <Button ref="ajax_test" style={{marginRight:'20px'}} onClick={this.onClick} loading={this.state.loading}>
                <span>提交</span>
                <span>提交中……</span>
            </Button>
            <Button disabled={true}>
                <span>提交</span>
            </Button>
        </div>;
    }
});
ReactDOM.render(<TestButton />, document.getElementById('button'));

var Table = RUI.Table;
var Column = RUI.Table.Column;
var TestTable = React.createClass({
    getInitialState:function() {
        return {
            list:[
                { id:1, name:"test1", time:"20140926" },
                { id:2, name:"test2", time:"20140926" },
                { id:3, name:"test3", time:"20140926" }
            ]
        };
    },
    render:function() {
        return (
            <Table data={this.state.list} style={{border:"1px solid rgb(50,140,221)"}}>
                <Column dataField="id" title="序号" />
                <Column dataField="name" title="名称" />
                <Column dataField="time" title="日期" />
            </Table>
        );
    }
});
ReactDOM.render(<TestTable />, document.getElementById('table'));