var rules = {
    acc: {
        validator: [
            {
                type: 'input',
                rules: {
                    required: {
                        msg: '账号不能为空'
                    },
                    filter: {
                        reg: /^[0-9]+$/,//验证规则，，正则表达式
                        msg: '账号格式不正确'
                    },
                    trigger: 'onBlur|onChange',
                    callback: function(rc) {
                        console.log(rc.getValue());
                    }
                }
            }
        ]
    }
};