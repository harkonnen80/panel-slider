/**
 * Created by davidneil.
 */

document.addEventListener('DOMContentLoaded', function () {
    var slidingPanelsNonLooping = document.getElementsByClassName('js-sliding-panels-non-looping')[0];
    var panelSliderNonLooping = new PanelSlider(slidingPanelsNonLooping);

    panelSliderNonLooping.init();
});
