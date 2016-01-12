import className from '../util/className.jsx';
import ComponentBase from '../mixins/ComponentBase.jsx';
import Column from './table/Column.jsx';

import '../../css/table.scss';

module.exports = React.createClass({
    mixins:[ComponentBase],
    getInitialState:function() {
        return {

        };
    },
    getDefaultProps:function() {
        return {
            cname:'table'
        };
    },
    render:function() {
        var classes = className(this.props.className, this.getPropClass());

        var columnTitles = this.props.children.map(function(column) {

        });

        return <table {...this.props} className={classes}>
            <thead>
                <tr>
                    {columnTitles}
                </tr>
            </thead>
            <tbody>
                {this.props.children}
            </tbody>
        </table>
    }
});