import Button from './controls/Button.jsx';
import Input from './controls/Input.jsx';
import Pagination from './controls/Pagination.jsx';
import Dialog from './controls/Dialog.jsx';
import DialogManager from './managers/DialogManager.jsx';
import Tooltip from './controls/Tooltip.jsx';
import Checkbox from './controls/Checkbox.jsx';
import Radio from './controls/Radio.jsx';

var RUI = {
    Button:Button,
    Input:Input,
    Pagination:Pagination,
    Dialog:Dialog,
    DialogManager:DialogManager,
    Tooltip:Tooltip,
    Checkout:Checkbox,
    Radio:Radio
};

try {
    window.RUI = RUI;
}catch(e) {

}

module.exports = RUI;