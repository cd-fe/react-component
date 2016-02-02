import { Router, Route, Link, hashHistory } from 'react-router';
import loader from './common/loader.jsx';

import Layout from './common/layout.jsx';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
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
            </Route>
        </Route>
    </Router>
), document.getElementById('wrapper'));