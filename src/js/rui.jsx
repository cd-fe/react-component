import '../css/common.scss';

import Button from './controls/Button.jsx';
import Link from './controls/Link.jsx';
import Icon from './controls/Icon.jsx';
import Input from './controls/Input.jsx';
import Upload from './controls/Upload.jsx';
import Spinner from './controls/Spinner.jsx';
import Textarea from './controls/Textarea.jsx';
import Pagination from './controls/Pagination.jsx';
import Dialog from './controls/Dialog.jsx';
import Tooltip from './controls/Tooltip.jsx';
import Select from './controls/Select.jsx';
import Checkbox from './controls/Checkbox.jsx';
import CheckboxGroup from './controls/CheckboxGroup.jsx';
import Radio from './controls/Radio.jsx';
import RadioGroup from './controls/RadioGroup.jsx';
import Switch from './controls/Switch.jsx';
import Table from './containers/Table.jsx';
import Column from './containers/table/Column.jsx';
import DatePicker from './controls/DatePicker.jsx';
import TimePicker from './controls/TimePicker.jsx';
import Loading from './controls/Loading.jsx';
import Tree from './controls/Tree.jsx';
import Slider from './controls/Slider.jsx';
import Form from './containers/Form.jsx';
import ScrollView from './containers/ScrollView.jsx';

import DataSource from './data/DataSource.jsx';

import DateFormatter from './formatters/DateFormatter.jsx';

import EventMixin from './mixins/EventMixin.jsx';
import OverlayMixin from './mixins/OverlayMixin.jsx';
import TimerMixin from './mixins/TimerMixin.jsx';
import ToggleMixin from './mixins/ToggleMixin.jsx';
import TooltipMixin from './mixins/TooltipMixin.jsx';

import DialogManager from './managers/DialogManager.jsx';
import OverlayManager from './managers/OverlayManager.jsx';

var mousewheel = require('jquery-mousewheel');
if(typeof mousewheel == 'function') {
    mousewheel(window.jQuery || window.$);
}

var RUI = {
    Button:Button,
    Link:Link,
    Icon:Icon,
    Input:Input,
    Upload:Upload,
    Spinner:Spinner,
    Textarea:Textarea,
    Pagination:Pagination,
    Dialog:Dialog,
    Tooltip:Tooltip,
    Select:Select,
    Checkbox:Checkbox,
    CheckboxGroup:CheckboxGroup,
    Radio:Radio,
    RadioGroup:RadioGroup,
    Switch:Switch,
    Table:Table,
    Column:Column,
    DatePicker:DatePicker,
    TimePicker:TimePicker,
    Loading:Loading,
    Tree:Tree,
    Slider:Slider,
    Form:Form,
    ScrollView:ScrollView,

    DataSource:DataSource,

    DateFormatter:DateFormatter,

    EventMixin:EventMixin,
    OverlayMixin:OverlayMixin,
    TimerMixin:TimerMixin,
    ToggleMixin:ToggleMixin,
    TooltipMixin:TooltipMixin,

    DialogManager:DialogManager,
    OverlayManager:OverlayManager
};

try {
    window.RUI = RUI;
}catch(e) {

}

try {
    window.global = window;
}catch(e) {

}

module.exports = RUI;