import React from 'react';
import ReactDOM from 'react-dom';
import '../../theme/pagination.scss';
import uuid from '../util/uuid.jsx';

export default class Pagination extends React.Component {

    static propTypes = {
        prepText:React.PropTypes.string,
        nextText:React.PropTypes.string,
        breakClass:React.PropTypes.string,
        activeClass:React.PropTypes.string,
        current:React.PropTypes.number,
        max:React.PropTypes.number,
        preview:React.PropTypes.number,
        onChange:React.PropTypes.func,
        style:React.PropTypes.object
    };

    static defaultProps = {
        prevText:"上一页",
        nextText:"下一页",
        breakClass:"break",
        current:1,
        max:0,
        preview:5,
        onChange:null,
        activeClass:"active",
        style:{}
    };

    constructor(props) {
        super(props);
    }

    empty() {

    }

    clickHandler(e) {
        var pager = e.target.getAttribute('data-page');
        var isPrevent = this.props.onChange.call(this, pager);
        if(isPrevent === false) {
            e.preventDefault();
            return false;
        }
    }

    getPrevButton() {
        return <a href="javascript:;" className="prev" rel="prev" onClick={this.clickHandler.bind(this)} data-page={this.props.current-1} key="prev">{this.props.prevText}</a>;
    }

    getNextButton() {
        return <a href="javascript:;" className="next" rel="next" onClick={this.clickHandler.bind(this)} data-page={this.props.current+1} key="next">{this.props.nextText}</a>;
    }

    getNormalButton(number) {
        return <a href="javascript:;" className={this.props.current==number?"active":""} onClick={this.clickHandler.bind(this)} data-page={number} key={"page-"+number}>{number}</a>;
    }

    getBreak() {
        return <span className={this.props.breakClass} key={uuid()}>...</span>;
    }

    renderList() {
        var buttonList = [];
        if(this.props.current > 1) {
            buttonList.push(this.getPrevButton());
        }
        if(this.props.current <= this.props.preview) {
            for(var i=1;i<=this.props.current;i++) {
                buttonList.push(this.getNormalButton(i));
            }
            if(this.props.current > Math.floor(this.props.preview/2)) {
                for(var i=this.props.current+1;i<=this.props.current+2;i++) {
                    if(i <= this.props.max) {
                        buttonList.push(this.getNormalButton(i));
                    }
                }
            }else {
                for(var i=this.props.current+1;i<=this.props.preview;i++) {
                    if(i <= this.props.max) {
                        buttonList.push(this.getNormalButton(i));
                    }
                }
            }
            if(this.props.max > (i + Math.floor(this.props.preview/2))) {
                buttonList.push(this.getBreak());
            }
            if(this.props.max > i){
                for(var m=this.props.max-1;m>=i&&m<=this.props.max;m++) {
                    buttonList.push(this.getNormalButton(m));
                }
            }
        }
        else if(this.props.current > (this.props.max - this.props.preview)) {
            for(var i=1;i<=2;i++) {
                buttonList.push(this.getNormalButton(i));
            }
            buttonList.push(this.getBreak());
            if(Math.abs(this.props.current - this.props.max) > Math.floor(this.props.preview/2)) {
                for(var i=this.props.current-2;i<this.props.current;i++) {
                    buttonList.push(this.getNormalButton(i));
                }
            }else {
                for(var i=(this.props.max - this.props.preview + 1);i<this.props.current;i++) {
                    buttonList.push(this.getNormalButton(i));
                }
            }
            for(var i=this.props.current;i<=this.props.max;i++) {
                buttonList.push(this.getNormalButton(i));
            }
        }
        else {
            for(var i=1;i<=2;i++) {
                buttonList.push(this.getNormalButton(i));
            }
            buttonList.push(this.getBreak());
            for(var i=(this.props.current - Math.floor(this.props.preview/2));i<=(this.props.current + Math.floor(this.props.preview/2));i++) {
                buttonList.push(this.getNormalButton(i));
            }
            buttonList.push(this.getBreak());
            for(var i=this.props.max-1;i<=this.props.max;i++) {
                buttonList.push(this.getNormalButton(i));
            }
        }
        if(this.props.current < this.props.max) {
            buttonList.push(this.getNextButton());
        }
        return buttonList;
    }

    render() {
        return (
            <div className="rui-pagination" style={this.props.style}>
                {this.renderList()}
            </div>
        );
    }
}