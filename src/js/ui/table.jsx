import React from 'react';

import '../../theme/table.scss';

class TableColumn extends React.Component {

}

class TableItem extends React.Component {

}

class Table extends React.Component {

    static propTypes = {
        columns:React.PropTypes.array,
        editable:React.PropTypes.bool,
        sortable:React.PropTypes.bool,
        children:React.PropTypes.array,
        data:React.PropTypes.any,
        style:React.PropTypes.object
    }

    constructor(props) {
        super(props);

        var children = this.props.children || [];


        this.state = {
            columns:null,
            data:this.props.data
        };
    }

    render() {
        return <table style={{...this.props.style}}>

        </table>;
    }
}

Table.Column = TableColumn;
export default Table;