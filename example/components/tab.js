var Example = React.createClass({
    render:function() {
        return <div className="example-button">
            <h2 className="title">选项卡<span>Tab</span></h2>
            <h3 className="sub-title">演示</h3>
            <div className="example">
                <h4 className="final-title">默认</h4>
                <div>
                    <RUI.Tab>
                        <RUI.Tab.List>
                            <RUI.Tab.Item>中文</RUI.Tab.Item>
                            <RUI.Tab.Item>英文</RUI.Tab.Item>
                            <RUI.Tab.Item>西班牙语</RUI.Tab.Item>
                        </RUI.Tab.List>
                        <RUI.Tab.Panel>
                            Facebook认为MVC无法满足他们的扩展需求，由于他们非常巨大的代码库和庞大的组织，使得MVC很快变得非常复杂，每当需要添加一项新的功能或特性时，系统的复杂度就成级数增长，致使代码变得脆弱和不可预测，结果导致他们的MVC正在土崩瓦解。认为MVC不适合大规模应用，当系统中有很多的模型和相应的视图时，其复杂度就会迅速扩大，非常难以理解和调试，特别是模型和视图间可能存在的双向数据流动。
                            解决这个问题需要“以某种方式组织代码，使其更加可预测”，这通过他们(Facebook)提出的Flux和React已经完成。
                            文／RK_CODER（简书作者）
                            原文链接：http://www.jianshu.com/p/ae482813b791
                            著作权归作者所有，转载请联系作者获得授权，并标注“简书作者”。
                        </RUI.Tab.Panel>
                        <RUI.Tab.Panel>
                            Facebook thinks that the expansion of the MVC is unable to meet their needs, because they are very huge code base and huge organization, makes the MVC soon become very complex complex, whenever you need to add a new function or feature, rise to exponential increases in both the complexity of the system, the code become fragile and unpredictable, as a result, they are MVC crumble. Think MVC is not suitable for large scale application, when the system has a lot of model and the corresponding view, will expand rapidly, its complexity is very difficult to understand and debug, especially between the model and view possible of bidirectional data flow.
                            Need to solve this problem "in a certain way organization code, to make it more predictable", this through their Flux and the React (Facebook) has been completed.
                            The text/RK_CODER (Jane)
                            The original link: http://www.jianshu.com/p/ae482813b791
                            Copyright owned by the author, reproduced please contact the author for authorization, and mark "Jane book author".
                        </RUI.Tab.Panel>
                        <RUI.Tab.Panel>
                            No creo que Facebook MVC satisfacer sus necesidades, debido a la ampliación de la biblioteca son muy grandes y el código de la enorme, que pronto se han vuelto muy complejas MVC tras otro, cuando la necesidad de añadir una nueva funcionalidad o las características de la complejidad del sistema, como el crecimiento en el código de progresión, lo que no se puede predecir más vulnerable y sus resultados se a desmoronar MVC. MVC no apto para que en el sistema de aplicación masiva, cuando hay muchos modelos y las visualizaciones correspondientes, su complejidad, será muy difícil de entender en rápida expansión y depuración de modelos y la vista y, en particular, entre los datos de la posible existencia de movilidad.
                            La necesidad de resolver este problema de la organización "de alguna manera a su código, más previsible", que a través de ellos (Facebook) React ha terminado y Flux.
                            (pt RK_CODER, autor de libros jane /)
                            Enlace original: http://www.jianshu.com/p/ae482813b791
                            Con todos los autores de direitos autorais loshak, por favor contacte con autores, y autoriza a los libros "jane marcados".
                        </RUI.Tab.Panel>
                    </RUI.Tab>
                </div>
            </div>
            <h3 className="sub-title">源码</h3>
            <div className="source">
                <textarea defaultValue={require('raw!./tab.js')} />
            </div>
        </div>;
    }
});

module.exports = Example;