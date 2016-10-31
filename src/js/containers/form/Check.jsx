/**
 * 表单验证
 * @module containers/form/Check
 */
import CF from './CommonFunc.jsx';

const checksFunc = {
    //校验表单元
    checkFormUnit : function(type, value) {
        var result = true;
        switch(type) {
            case 'input':
            case 'datePicker':
            case 'textarea':
                result = (!CF.isNull(value) && value != '');
                break;
            case 'select':
                result = (value.key != '请选择');
                break;
            case 'upload':
                result = value.length;
                break;
            case 'checkbox':
                result = value.some(function(item, index) {
                    //TODO bug待修复
                    return item.defaultSelected == 0
                });
                break;
        }
        return result;
    },
    //必填校验
    required : function(rc,value) {
        var rule = CF.getSingleFieldRules(rc);
        var result = false;
        if(rule) {
            if(this.checkFormUnit(rc.props.type, value)) {
                rc.setState({
                    validateStatus : 'is-success',
                    explain : ''
                });
                result = true;
            }else {
                rc.setState({
                    validateStatus : 'is-error',
                    explain : rule.required.msg || '输入不能为空'
                });
            }
        }else {
            result = true;
        }
        return result;
    },
    //过滤校验
    filter : function(rc,value) {
        var rule = CF.getSingleFieldRules(rc);
        var result = false;
        //非必填项时，输入不为空的情况下验证
        if(rule) {
            if(value) {
                if(!(CF.getReg(rule.filter.reg).test(value))) {
                    rc.setState({
                        validateStatus : 'is-error',
                        explain : rule.filter.msg || '输入格式不正确'
                    });
                }else {
                    rc.setState({
                        validateStatus : 'is-success',
                        explain : ''
                    });
                    result = true;
                }
            }else {
                rc.setState({
                    validateStatus : '',
                    explain : ''
                });
                result = true;
            }
        }else {
            result = true;
        }
        return result;
    }
};
//steps ['required', 'filter']
function makeChecks(stepsArr, rc, value) {
    if(stepsArr.length > 0) {
        for(var i = 0; i< stepsArr.length; i++) {
            if(!checksFunc[stepsArr[i]](rc, value)) {
                break;
            }
        }
        return i == stepsArr.length
    }else {
        return true;
    }

}

module.exports = function(rc, value) {
    var rule = CF.getSingleFieldRules(rc);
    if(rule) {
        var {required, filter, callback} = rule;
        var checksArr =[];
        required && checksArr.push('required');
        filter && checksArr.push('filter');
        return makeChecks(checksArr, rc, value);
    }else {
        return true;
    }
};
