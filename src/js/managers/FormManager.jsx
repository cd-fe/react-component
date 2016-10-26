if(!document.getElementById('form-container')) {
    var dom = document.createElement('div');
    dom.id = 'form-container';
    document.body.appendChild(dom);
}

let container = $(document.getElementById('form-container'));

class FormManager {
    constructor(container) {
        this.container = container;
        this.forms = [];
    }

    create(formProps, children) {
        var form = {
            formProps:formProps,
            children:children
        };

        this.forms.push(form);
        this.render(form);
    }

    destroy(id) {
        var forms = this.forms;
        for(var i=0;i<forms.length;i++) {
            if(forms[i].formProps.id == id) {
                forms.splice(i, 1);
                break;
            }
        }

        $('[id="'+id+'"]').remove();
    }

    toAttribute(obj) {
        return Object.keys(obj).map(function(key) {
            return key.toLowerCase() != 'onchange' ? key+"='" + obj[key] + "'" : '';
        }).join(' ');
    }

    render(form) {
        var props = form.formProps;
        var id = props.id;
        delete props.id;
        var children = form.children;
        var formString = this.toAttribute(props);
        var inputString = this.toAttribute(form.children);

        this.container.append(`
            <div class="form-container-item" id="${id}">
                <form ${formString}>
                    <input ${inputString} />
                </form>
            </div>
        `);

        $('[id="'+id+'"] input').on('change', children.onChange);
    }
}

let instance = new FormManager(container);

//$('body').delegate('.rui-upload-button', 'mouseenter', function() {
//    var bound = Object.assign({
//        width:$(this).outerWidth() - 2,
//        height:$(this).outerHeight() - 2
//    }, $(this).position());
//
//    bound.left += parseInt($(this).css('margin-left'), 10);
//    bound.top += parseInt($(this).css('margin-top'), 10);
//
//    var form = $('[id="form'+this.id+'"]');
//    form.css(bound);
//});
//$('#form-container').delegate('.rui-upload-button', 'mouseleave', function() {
//    //var form = $('#' + formProps.id);
//});

export default {
    create:function(formProps, children) {
        instance.create(formProps, children);
        return true;
    },
    destroy(id) {
        instance.destroy(id);
        return false;
    },
    get(id) {
        return $('[id="'+id+'"] form')[0];
    }
};