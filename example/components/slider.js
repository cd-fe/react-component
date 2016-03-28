var Example = React.createClass({
    getColors:function(index) {
        var colors = [
            '#feeeed', '#f47920', '#80752c', '#2a5caa',
            '#f7acbc', '#deab8a', '#837936', '#444693',
            '#ef5b9c', '#fedcbd', '#7f7522', '#2b4490',
            '#f05b72', '#905a3d', '#87843b', '#224b8f'
        ];
        return colors[index % colors.length];
    },
    getSlides:function(num, minWidth, maxWidth) {
        var result = [];
        for(var index =0;index<num;index++) {
            var styles = {
                backgroundColor:this.getColors(index),
                width:(typeof minWidth != 'undefined') ? (Math.random() * (maxWidth - minWidth) + minWidth) : ''
            };
            result.push(<RUI.Slider.Item key={index}>
                <div className="slide-content" style={styles}>
                    Slide-{index+1}
                </div>
            </RUI.Slider.Item>);
        }
        return result;
    },
    render:function() {
        return <div className="example-slider">
            <h2 className="title">轮播图<span>Slider</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">自动播放</h4>
                <div>
                    <RUI.Slider>
                        {this.getSlides(4)}
                    </RUI.Slider>
                </div>
                <h4 className="final-title">分页信息</h4>
                <div>
                    <RUI.Slider>
                        {this.getSlides(6)}
                        <RUI.Slider.Pagination useClick={true} />
                    </RUI.Slider>
                </div>
                <h4 className="final-title">左右切换按钮</h4>
                <div>
                    <RUI.Slider>
                        {this.getSlides(8)}
                        <RUI.Slider.Pagination useClick={true} />
                        <RUI.Slider.NavigateButton role="prev" />
                        <RUI.Slider.NavigateButton role="next" />
                    </RUI.Slider>
                </div>
                <h4 className="final-title">不规则自动布局</h4>
                <div>
                    <RUI.Slider slidesPerView={"auto"} centeredSlides={true} spaceBetween={30} className={"auto-layout"}>
                        {this.getSlides(18, 150, 600)}
                        <RUI.Slider.Pagination useClick={true} />
                    </RUI.Slider>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./slider.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;