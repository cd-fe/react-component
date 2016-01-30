import { Router, Route, Link, hashHistory } from 'react-router';
import loader from './common/loader.jsx';

import Layout from './common/layout.jsx';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <Route path="components" component={loader(require('bundle?lazy!./components.jsx'))}>
                <Route path="button" component={loader(require('bundle?lazy!./button.jsx'))}></Route>
            </Route>
        </Route>
    </Router>
), document.getElementById('wrapper'));