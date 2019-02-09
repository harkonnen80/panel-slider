/**
 * Created by davidneil.
 */

function MyNewPage(pageConfig) {
    this.panelSlider = new PanelSlider(pageConfig.panelSlider.element, pageConfig.panelSlider.config);

}

MyNewPage.prototype.init = function () {
    var _this = this;

    _this.panelSlider.init();

    _this.buttonFunction();
};

MyNewPage.prototype.buttonFunction = function () {

};

document.addEventListener('DOMContentLoaded', function () {
    var slidingPanelsNonLooping = document.getElementsByClassName('js-sliding-panels-in-app')[0];
    var pageConfig = {
        panelSlider: {
            element: slidingPanelsNonLooping,
            config: {
                hashDescriptor: 'in-app-panel'
            }
        }
    };
    var myNewPage = new MyNewPage(pageConfig);

    myNewPage.init();
});
