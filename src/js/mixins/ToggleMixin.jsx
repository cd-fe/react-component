module.exports = {
    toggleOption:{},
    toggleAction:function(target, action, values) {
        if(target && action) {
            var node = ReactDOM.findDOMNode(target);
            node.addEventListener(action, this.toggleHandler);

            this.toggleOption = {
                target:target,
                action:action
            };

            if(typeof values == 'string') {
                values = ['', values];
            }

            this.toggleOption.values = values;
            this.toggleOption.value = (this.props.value || 0);

            this.forceUpdate();
        }
    },
    toggleHandler:function() {
        this.toggle();
        this.forceUpdate();
    },
    toggle:function() {
        if(!this.props.disable) {
            this.toggleOption.value = !this.toggleOption.value ? 1 : 0;
        }
        return this.getToggleResult();
    },
    getToggleResult:function() {
        if(this.toggleOption.target && typeof this.toggleOption.values != 'undefined') {
            return this.toggleOption.values[this.toggleOption.value] || '';
        }
        return '';
    },
    componentWillUnmount:function() {
        if(this.toggleOption.target && this.toggleOption.action) {
            var node = ReactDOM.findDOMNode(this.toggleOption.target);
            node.addEventListener(this.toggleOption.action, this.toggleHandler);
        }
    }
};