import RUI from 'react-component-lib';

import { Router, Route, Link, hashHistory, useRouterHistory } from 'react-router';
import loader from './common/loader.jsx';
import Layout from './common/layout.jsx';

import createHashHistory from 'history/lib/createHashHistory';
const history = useRouterHistory(createHashHistory)({ queryKey: false });

var Root = React.createClass({
    onUpdate:function() {
        window.RUI = RUI;
        window._hmt && _hmt.push(['_trackPageview', location.hash.substring(1)]);
    },
    render:function() {
        return <Router history={history} onUpdate={this.onUpdate}>
            <Route path="/" component={Layout}>
                <Route path="dashboard" component={loader(require('bundle?lazy!babel?presets=react!./common/dashboard.jsx'))}></Route>
                <Route path="components" component={loader(require('bundle?lazy!./components.jsx'))}>
                    <Route path="button" component={loader(require('bundle?lazy!babel?presets=react!./components/button.js'))}></Route>
                    <Route path="input" component={loader(require('bundle?lazy!babel?presets=react!./components/input.js'))}></Route>
                    <Route path="select" component={loader(require('bundle?lazy!babel?presets=react!./components/select.js'))}></Route>
                    <Route path="pagination" component={loader(require('bundle?lazy!babel?presets=react!./components/pagination.js'))}></Route>
                    <Route path="dialog" component={loader(require('bundle?lazy!babel?presets=react!./components/dialog.js'))}></Route>
                    <Route path="tooltip" component={loader(require('bundle?lazy!babel?presets=react!./components/tooltip.js'))}></Route>
                    <Route path="checkbox" component={loader(require('bundle?lazy!babel?presets=react!./components/checkbox.js'))}></Route>
                    <Route path="radio" component={loader(require('bundle?lazy!babel?presets=react!./components/radio.js'))}></Route>
                    <Route path="table" component={loader(require('bundle?lazy!babel?presets=react!./components/table.js'))}></Route>
                    <Route path="datepicker" component={loader(require('bundle?lazy!babel?presets=react!./components/datepicker.js'))}></Route>
                    <Route path="loading" component={loader(require('bundle?lazy!babel?presets=react!./components/loading.js'))}></Route>
                    <Route path="tree" component={loader(require('bundle?lazy!babel?presets=react!./components/tree.js'))}></Route>
                    <Route path="slider" component={loader(require('bundle?lazy!babel?presets=react!./components/slider.js'))}></Route>
                    <Route path="form" component={loader(require('bundle?lazy!babel?presets=react!./components/form.js'))}></Route>
                    <Route path="spinner" component={loader(require('bundle?lazy!babel?presets=react!./components/spinner.js'))}></Route>
                    <Route path="scrollview" component={loader(require('bundle?lazy!babel?presets=react!./components/scrollview.js'))}></Route>
                </Route>
            </Route>
        </Router>;
    }
});

var codemirrorResources = [];//require('./common/codemirror.jsx');
Promise.all(codemirrorResources).then(function() {
    ReactDOM.render(<Root />, document.getElementById('wrapper'));
});