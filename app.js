/**
 * Created by plastik on 22/2/16.
 */
var homeQuotesDynamic = textRotator($('.textRotator'), true, 200, 3000).getInstance();

$('.textRotator')
  .mouseover(homeQuotesDynamic.pause)
  .mouseout(homeQuotesDynamic.play);