module.exports = {
    toggleValues: [],
    toggleValue: null,
    toggleEvent: "click",
    toggleUnbind: function () {
        if (this.toggleEvent) {
            var node = ReactDOM.findDOMNode(this);
            node.removeEventListener(this.toggleEvent, this.toggleHandler);
        }
    },
    toggleAction: function (target, action, values) {
        this.toggleUnbind();

        if (target && action) {
            var node = ReactDOM.findDOMNode(target);
            node.addEventListener(action, this.toggleHandler);

            this.toggleEvent = action;

            if (typeof values == 'string') {
                values = ['', values];
            }

            this.toggleValues = values;
            this.toggleValue = this.props.selected ? 1 : 0;

            this.forceUpdate();
        }
    },
    toggleHandler: function () {
        if (!this.__isLock__) {
            this.toggle();
            this.forceUpdate();
        }
    },
    toggle: function () {
        if (!this.props.disable) {
            this.toggleValue = !this.toggleValue ? 1 : 0;

            if (this.dispatchEvent) {
                this.dispatchEvent('change', {
                    value: this.props.value,
                    selected: this.toggleValue
                });
            }
        }
        return this.getToggleResult();
    },
    getToggleResult: function () {
        if (typeof this.toggleValues != 'undefined') {
            return this.toggleValues[this.toggleValue] || '';
        }
        return '';
    },
    componentWillReceiveProps: function (newProps) {
        if (typeof newProps.selected != 'undefined' && (this.props.cname != 'radio' || newProps.groupValidate)) {
             this.toggleValue = newProps.selected ? 1 : 0;
        }
    },
    componentWillUnmount: function () {
        this.toggleUnbind();
    }
};