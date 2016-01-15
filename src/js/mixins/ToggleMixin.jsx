module.exports = {
    toggleOption:{},
    toggleUnbind:function() {
        if(this.toggleOption.target && this.toggleOption.action) {
            var node = ReactDOM.findDOMNode(this.toggleOption.target);
            node.removeEventListener(this.toggleOption.action, this.toggleHandler);
        }
    },
    toggleAction:function(target, action, values) {
        this.toggleUnbind();

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
            this.toggleOption.value = this.props.selected ? 1 : 0;

            this.forceUpdate();
        }
    },
    toggleHandler:function() {
        if(!this.__isLock__) {
            this.toggle();
            this.forceUpdate();
        }
    },
    toggle:function() {
        if(!this.props.disable) {
            this.toggleOption.value = !this.toggleOption.value ? 1 : 0;

            if(this.dispatchEvent) {
                this.dispatchEvent('change', {
                    value:this.props.value,
                    selected:this.toggleOption.value
                });
            }
        }
        return this.getToggleResult();
    },
    getToggleResult:function() {
        if(this.toggleOption.target && typeof this.toggleOption.values != 'undefined') {
            return this.toggleOption.values[this.toggleOption.value] || '';
        }
        return '';
    },
    componentWillReceiveProps:function(newProps) {
        console.log('recieve', newProps.selected);
        if(newProps.selected) {
            this.toggleOption.value = newProps.selected ? 1 : 0;
            this.forceUpdate();
        }
    },
    componentWillUnmount:function() {
        this.toggleUnbind();
    }
};