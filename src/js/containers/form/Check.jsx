/**
 * 表单验证
 * @module containers/form/Check
 */
import CF from './CommonFunc.jsx';

const checksFunc = {
    //必填校验
    required : function(rc) {
        var value = rc.getValue();
        var rule = rc.context.rule.validator[rc.props.name].rules;
        var result = false;
        if(CF.isNull(value) || value == '' || CF.checkboxAndSelectNoChecked(value)) {
            rc.setState({
                validateStatus : 'is-error',
                explain : rule.required.msg || '输入不能为空'
            });
        }else {
            rc.setState({
                validateStatus : 'is-success',
                explain : ''
            });
            result = true;
        }
        return result;
    },
    //过滤校验
    filter : function(rc) {
        var value = rc.getValue();
        var rule = rc.context.rule.validator[rc.props.name].rules;
        var result = false;
        console.log('CF.getReg(rule.filter.reg).test(value)')
        console.log(CF.getReg(rule.filter.reg).test(value))
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
        return result;
    },
    //远程校验
    remote : function(rc) {
        var value = rc.getValue();
        var rule = rc.context.rule.validator[rc.props.name].rules;
        var {remote} = rc.props;
        return new Promise(function(resolve, reject) {
            $.ajax({
                url:remote.url,
                type:remote.type,
                dataType : remote.dataType,
                data:{
                    [remote.key] : value
                },
                cache: false,
                beforeSend : function() {
                    rc.setState({
                        validateStatus : 'is-validating'
                    });
                },
                success:function(response) {
                    rc.setState({
                        validateStatus : 'is-success'
                    });
                    resolve(response);
                },
                error:function() {
                    rc.setState({
                        validateStatus : 'is-error',
                        explain : '网络错误,请稍后再试！'
                    });
                    reject('error');
                }
            });
        })
    },
};
//steps ['required', 'filter']
function makeChecks(stepsArr, rc) {
    for(var i = 0; i< stepsArr.length; i++) {
        if(!checksFunc[stepsArr[i]](rc)) {
            break;
        }
    }
    return i == stepsArr.length
}

module.exports = function(rc) {
    var rule =  rc.context.rule.validator[rc.props.name].rules;
    var {required, filter, callback} = rule;
    var checksArr =[];
    required && checksArr.push('required');
    filter && checksArr.push('filter');
    return makeChecks(checksArr, rc);
};
