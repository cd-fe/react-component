import Button from './controls/Button.jsx';
import Input from './controls/Input.jsx';
import Pagination from './controls/Pagination.jsx';
import Dialog from './controls/Dialog.jsx';
import DialogManager from './managers/DialogManager.jsx';
import Tooltip from './controls/Tooltip.jsx';
import Select from './controls/Select.jsx';
import Checkbox from './controls/Checkbox.jsx';
import CheckboxGroup from './controls/CheckboxGroup.jsx';
import Radio from './controls/Radio.jsx';
import RadioGroup from './controls/RadioGroup.jsx';
import Table from './containers/Table.jsx';
import Column from './containers/table/Column.jsx';
import DatePicker from './controls/DatePicker.jsx';
import Loading from './controls/Loading.jsx';
import Tree from './controls/Tree.jsx';
import Slider from './controls/Slider.jsx';

import DataSource from './data/DataSource.jsx';

import DateFormatter from './formatters/DateFormatter.jsx';

import EventMixin from './mixins/EventMixin.jsx';
import OverlayMixin from './mixins/OverlayMixin.jsx';
import TimerMixin from './mixins/TimerMixin.jsx';
import ToggleMixin from './mixins/ToggleMixin.jsx';
import TooltipMixin from './mixins/TooltipMixin.jsx';

import '../css/common.scss';

var RUI = {
    Button:Button,
    Input:Input,
    Pagination:Pagination,
    Dialog:Dialog,
    DialogManager:DialogManager,
    Tooltip:Tooltip,
    Select:Select,
    Checkbox:Checkbox,
    CheckboxGroup:CheckboxGroup,
    Radio:Radio,
    RadioGroup:RadioGroup,
    Table:Table,
    Column:Column,
    DatePicker:DatePicker,
    Loading:Loading,
    Tree:Tree,
    Slider:Slider,

    DataSource:DataSource,

    DateFormatter:DateFormatter,

    EventMixin:EventMixin,
    OverlayMixin:OverlayMixin,
    TimerMixin:TimerMixin,
    ToggleMixin:ToggleMixin,
    TooltipMixin:TooltipMixin
};

try {
    window.RUI = RUI;
}catch(e) {

}

module.exports = RUI;