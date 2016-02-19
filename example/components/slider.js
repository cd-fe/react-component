var Example = React.createClass({
    getSlides:function(num) {
        return Array(num).map(function(item, index) {
            return <RUI.Slider.Item key={index}><div className="slide-content">Slide-{index+1}</div></RUI.Slider.Item>
        });
    },
    render:function() {
        return <div className="example-input">
            <h2 className="title">轮播图<span>Slider</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">自动播放</h4>
                <div>
                    <RUI.Slider>
                        {this.getSlides(4)}
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