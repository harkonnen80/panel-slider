/**
 * Created by davidneil
 */

function PanelSlider(element, config) {
    this.slider = element;
    this.sliderWidth = this.slider.offsetWidth;
    this.panelTray = this.slider.getElementsByClassName('js-sliding-panels-tray')[0];
    this.panels = Array.prototype.slice.call(this.slider.querySelectorAll('.js-sliding-panel'));
    this.firstPanel = this.panels[0];
    this.lastPanel = this.panels[this.panels.length - 1];
    this.numberOfPanels = this.panels.length;
    this.nav = document.querySelectorAll('[data-controls="' + this.slider.dataset.nav + '"]');
    this.hashDescriptor = 'current-panel';
    this.currentPanelHash = $.getUrlVars(window.location.href)[this.hashDescriptor];
    this.startingHash = null;
    this.navControls = this.nav[0].getElementsByClassName('js-slide-to-panel');
    this.animationTime = 350;
    this.animationTimeMs = this.animationTime / 1000;
    this.firstLoad = true;
    this.backBtnCall = true;
    this.previousPanelNumber = null;
    this.currentPanelNum = null;
    this.clone = null;
    this.break = null;
    this.cloneTranslate = null;
    this.optionsDefault = {
        hashUrl: true,
        repeating: false,
    };

    this.options = Object.assign({}, this.optionsDefault, config);
}

PanelSlider.prototype.init = function () {
    this.setup();
    this.getPanelNumber();
    this.panelDimensions();
    this.slide();
    this.buttonFunctions();
    this.windowResize();
    this.windowPop();
};

PanelSlider.prototype.setup = function () {
    var _this             = this;
    var hashExists        = _this.panelHashExists();
    var firstPanelClone   = this.firstPanel.cloneNode(true);
    var lastPanelClone    = this.lastPanel.cloneNode(true);

    _this.getTrayWidth();

    if (!_this.currentPanelHash || !hashExists) {
        _this.currentPanelHash = _this.firstPanel.dataset.panel;
    }

    _this.startingHash = _this.currentPanelHash;

    if (_this.options.hashUrl) {
        _this.updateUriHash();
    }

    Object.assign(_this.panelTray.style, {
        width: _this.getTrayWidth() + 'px',
        transitionDuration: _this.animationTimeMs + 's',
    });

    if (_this.options.repeating) {
        firstPanelClone.innerHTML = '';
        firstPanelClone.classList.add('is-clone');
        firstPanelClone.dataset.panel += '-clone';
        firstPanelClone.dataset.clone = 'first';

        _this.panels.push(firstPanelClone);

        _this.panelTray.appendChild(firstPanelClone);

        lastPanelClone.innerHTML = '';
        lastPanelClone.classList.add('is-clone');
        lastPanelClone.dataset.panel += '-clone';
        lastPanelClone.dataset.clone = 'last';

        _this.panels.unshift(lastPanelClone);

        _this.panelTray.insertBefore(lastPanelClone, _this.panelTray.firstChild);
    }

    // _this.panelTray.prepend(lastPanelClone)
};

PanelSlider.prototype.slide = function () {
    var _this         = this;
    var translate     = _this.getTranslate() + 'px';
    var translateSum  = _this.sliderWidth * _this.numberOfPanels;
    var heightAuto = function (event) {
        event.stopPropagation();

        _this.slider.style.height = 'auto';
    };

    if (_this.firstLoad) {
        _this.panelTray.classList.add('no-transition');

        _this.toggleActive(_this.currentPanelHash);

        setTimeout(function () {
            _this.panelTray.classList.remove('no-transition');
        }, 800);

        _this.firstLoad = false;
    } else {
        _this.slider.style.height = _this.getSliderHeight(_this.previousPanelNumber) + 'px';

        _this.panels.forEach(function (panels) {
            panels.style.height = 'auto';
        });
    }

    _this.panelTray.style.transform = 'translate(-' + translate + ')';

    setTimeout(function () {
        _this.slider.style.height = _this.getSliderHeight(_this.currentPanelNum) + 'px';
        _this.panels.forEach(function (panels) {
            if (panels.dataset.panel !== _this.currentPanelHash) {
                panels.style.height = '1px';
            }
        });

        _this.slider.addEventListener('transitionend', heightAuto);
    }, 10);

    if (_this.clone) {
        switch (_this.clone) {
            case 'last':
                _this.cloneTranslate = translateSum + 'px';
                _this.currentPanelNum = _this.numberOfPanels;
                break;

            case 'first':
                _this.cloneTranslate = _this.sliderWidth + 'px';
                _this.currentPanelNum = 1;
                break;

            // No Default
        }

        _this.resetSlider();

        _this.clone = false;
    }
};

PanelSlider.prototype.buttonFunctions = function () {
    var _this = this;

    Array.prototype.forEach.call(_this.navControls, function (element) {
        element.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();

            _this.currentPanelHash = this.dataset.slideToPanel;
            _this.break = false;

            _this.getPanelNumber();
            _this.slide();
            _this.toggleActive();
        }, true);
    });
};

PanelSlider.prototype.panelDimensions = function () {
    var _this = this;

    _this.panels.forEach(function (panel) {
        panel.style.width = parseInt(_this.sliderWidth) + 'px';
    });
};

PanelSlider.prototype.getPanelNumber = function () {
    var _this = this;

    if (_this.currentPanelNum) _this.previousPanelNumber = _this.currentPanelNum;

    Array.prototype.some.call(_this.panels, function (panel, index) {
        var oldPanelNumber = _this.previousPanelNumber;
        var difference;
        var animationDifference;

        if (!_this.break) {
            switch (_this.currentPanelHash) {
                case panel.dataset.panel:
                    _this.currentPanelNum = index;
                    difference = Math.abs(oldPanelNumber - _this.currentPanelNum);
                    animationDifference = (_this.animationTime * difference) / 1000;

                    _this.panelTray.style.transitionDuration = animationDifference + 's';
                    break;

                case 'next':
                    _this.currentPanelNum += 1;
                    _this.clone = _this.panels[_this.currentPanelNum].dataset.clone;
                    _this.break = true;

                    _this.panelTray.style.transitionDuration = _this.animationTimeMs + 's';

                    if (_this.clone) {
                        _this.panels[_this.currentPanelNum].innerHTML = _this.firstPanel.innerHTML;
                        _this.currentPanelHash = _this.firstPanel.dataset.panel;
                    } else {
                        _this.currentPanelHash = _this.panels[_this.currentPanelNum].dataset.panel;
                    }

                    break;

                case 'previous':
                    _this.currentPanelNum -= 1;
                    _this.clone = _this.panels[_this.currentPanelNum].dataset.clone;
                    _this.break = true;

                    _this.panelTray.style.transitionDuration = _this.animationTimeMs + 's';

                    if (_this.clone) {
                        _this.panels[_this.currentPanelNum].innerHTML = _this.lastPanel.innerHTML;

                        _this.currentPanelHash = _this.lastPanel.dataset.panel;
                    } else {
                        _this.currentPanelHash = _this.panels[_this.currentPanelNum].dataset.panel;
                    }

                    break;

                // No Default
            }
        }
    });

    if (!_this.backBtnCall && _this.options.hashUrl) {
        _this.updateUriHash();
    } else {
        _this.backBtnCall = false;
    }

    _this.currentPanel = _this.panels[_this.currentPanelNum];
};

PanelSlider.prototype.resetSlider = function () {
    var _this = this;

    setTimeout(function () {
        _this.panelTray.classList.add('no-transition');
        _this.panelTray.style.transform = 'translate(-' + _this.cloneTranslate + ')';

        setTimeout(function () {
            _this.panelTray.classList.remove('no-transition');
        }, 100);
    }, _this.animationTime);
};

PanelSlider.prototype.getTrayWidth = function () {
    var _this = this;

    return _this.sliderWidth * (_this.numberOfPanels + 2);
};

PanelSlider.prototype.getTranslate = function () {
    var _this = this;

    return _this.sliderWidth * _this.currentPanelNum;
};

PanelSlider.prototype.getSliderHeight = function (panelNumber) {
    var _this = this;

    return _this.panels[panelNumber].offsetHeight;
};

PanelSlider.prototype.panelHashExists = function () {
    var _this = this;
    var hashExists = false;

    _this.panels.forEach(function (element) {
        if (_this.currentPanelHash === element.dataset.panel) {
            hashExists = true;
        }

        return hashExists;
    });

    return hashExists;
};

PanelSlider.prototype.updateUriHash = function () {
    var _this = this;
    var options = {
        uri: window.location.href,
        key: _this.hashDescriptor,
        value: _this.currentPanelHash,
    };
    var uriUpdate = updateUrlParameter(options);

    if (_this.firstLoad) {
        window.history.replaceState({ html: uriUpdate }, '', uriUpdate);
    } else {
        window.history.pushState({ html: uriUpdate }, '', uriUpdate);
    }
};

PanelSlider.prototype.toggleActive = function () {
    var _this = this;

    Array.prototype.forEach.call(_this.navControls, function (element) {
        var panelData = element.dataset.slideToPanel;

        if (panelData === _this.currentPanelHash) {
            element.classList.add('is-active');
        } else {
            element.classList.remove('is-active');
        }
    });
};

PanelSlider.prototype.windowResize = function () {
    var _this   = this;
    var timeout = null;

    window.addEventListener('resize', function () {
        _this.sliderWidth = _this.slider.offsetWidth;

        _this.panelDimensions();

        _this.panelTray.classList.add('no-transition');

        Object.assign(_this.panelTray.style, {
            width: _this.getTrayWidth() + 'px',
            transform: 'translate(-' + _this.getTranslate() + 'px)',
        });

        if (timeout) window.clearTimeout(timeout);

        timeout = window.setTimeout(function () {
            _this.panelTray.classList.remove('no-transition');
        }, 100);
    });
};

PanelSlider.prototype.windowPop = function () {
    var _this = this;

    window.addEventListener('popstate', function () {
        _this.backBtnCall = true;
        _this.currentPanelHash = $.getUrlVars(window.location.href)[_this.hashDescriptor];

        _this.getPanelNumber();
        _this.slide();
        _this.toggleActive();
    });
};
