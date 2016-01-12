import Button from './controls/Button.jsx';
import Input from './controls/Input.jsx';
import Pagination from './controls/Pagination.jsx';
import Dialog from './controls/Dialog.jsx';
import DialogManager from './managers/DialogManager.jsx';
import Tooltip from './controls/Tooltip.jsx';
import Checkbox from './controls/Checkbox.jsx';
import CheckboxGroup from './controls/CheckboxGroup.jsx';
import Radio from './controls/Radio.jsx';
import Table from './containers/Table.jsx';

var RUI = {
    Button:Button,
    Input:Input,
    Pagination:Pagination,
    Dialog:Dialog,
    DialogManager:DialogManager,
    Tooltip:Tooltip,
    Checkbox:Checkbox,
    CheckboxGroup:CheckboxGroup,
    Radio:Radio,
    Table:Table
};

try {
    window.RUI = RUI;
}catch(e) {

}

module.exports = RUI;