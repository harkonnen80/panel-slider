/**
 * Created by davidneil.
 */

function MyNewPage(pageConfig) {
    this.panelSlider = new PanelSlider(pageConfig.panelSlider.element, pageConfig.panelSlider.config);
    this.nextButton = document.getElementsByClassName('js-in-app-next-button')[0];
    this.backButton = document.getElementsByClassName('js-in-app-back-button')[0];
}

MyNewPage.prototype.init = function () {
    var _this = this;

    _this.panelSlider.init();

    _this.showButtons();
    _this.buttonFunction();
};

MyNewPage.prototype.showButtons = function () {
    var _this = this;

    console.log(_this.panelSlider.currentPanelNum, _this.panelSlider.numberOfPanels, _this.nextButton, _this.panelSlider.currentPanelNum === (_this.panelSlider.numberOfPanels - 1));

    if (_this.panelSlider.currentPanelNum > 0) {
        _this.backButton.classList.remove('u-visibility-hidden');

        if (_this.panelSlider.currentPanelNum === (_this.panelSlider.numberOfPanels - 1)) {
            _this.nextButton.disabled = true;
            _this.nextButton.classList.add('is-disabled');
        } else {
            _this.nextButton.classList.remove('is-disabled');
            _this.nextButton.disabled = false;
        }
    } else {
        _this.backButton.classList.add('u-visibility-hidden');
    }
};

MyNewPage.prototype.buttonFunction = function () {
    var _this = this;

    _this.nextButton.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        _this.panelSlider.currentPanelHash = 'next';
        _this.buttonPress();
    });

    _this.backButton.addEventListener('click', function (event) {
        event.stopPropagation();
        event.preventDefault();

        _this.panelSlider.currentPanelHash = 'previous';
        _this.buttonPress();
    });
};

MyNewPage.prototype.buttonPress = function () {
    var _this = this;

    _this.panelSlider.break = false;
    _this.panelSlider.thisButton = this[0];

    _this.panelSlider.getPanelNumber();
    _this.panelSlider.slide();
    _this.showButtons();
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
