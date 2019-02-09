/**
 * Created by davidneil.
 */

document.addEventListener('DOMContentLoaded', function () {
    var slidingPanelsLooping = document.getElementsByClassName('js-sliding-panels-looping')[0];
    var loopingConfig = {
        looping: true,
        hashDescriptor: 'looping-panels'
    };
    var panelSliderLooping = new PanelSlider(slidingPanelsLooping, loopingConfig);
    panelSliderLooping.init();
});
