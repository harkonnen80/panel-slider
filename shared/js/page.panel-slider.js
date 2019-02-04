/**
 * Created by davidneil.
 */

document.addEventListener('DOMContentLoaded', function () {
    var slidingPanels = document.getElementsByClassName('js-sliding-panels')[0];
    var panelSlider = new PanelSlider(slidingPanels);

    panelSlider.init();

});
