/**
 * Simple text rotator for quotes within <li> tags
 */

'use strict';

/**
 * textRotator()
 * @param el {object} main DOM wrapper
 * @param autostart {boolean} manual or automatic cycle start
 * @param fadeTime {number} transition time between cycles in ms
 * @param delayTime {number} time between end of transition and next transition in ms
 * @returns {*}
 */
var textRotator = function (el, autostart, fadeTime, delayTime) {
    var $el = el,
      instance = null,
      quoteInterval = null,
      _play,
      _pause,
      _destroy,
      _quoteFadeIn,
      _quoteFadeOut,
      _calculateQuotes,
      $quotes = $el.find('li'),
      quoteIndex = 0;

    autostart = autostart || false;
    fadeTime = fadeTime || 100;
    delayTime = delayTime || 1000;

    // private methods
    /**
     * _quoteFadeIn() make a fade in and calls play()
     * @private
     */
    _quoteFadeIn = function () {
        _calculateQuotes().fadeIn(fadeTime, function() {
            quoteInterval = setTimeout(_quoteFadeOut, delayTime);
        });
    };

    /**
     *  _quoteFadeOut() is a transition from fadeOut
     *  to fadein while passing to the next quote
     * @private
     */
    _quoteFadeOut = function () {
        _calculateQuotes().fadeOut(fadeTime, function() {
            quoteIndex++;
            _play();
        });
    };

    /**
     * _calculateQuotes() returns de quotes left to end the cycle
     * @returns {object}
     * @private
     */
    _calculateQuotes = function () {
        return $quotes.eq(quoteIndex % $quotes.length);
    };

    // exposed methods
    /**
     * _pause() pauses rotator
     */
    _pause = function () {
        clearTimeout(quoteInterval);
        console.log(quoteInterval);
    };
    /**
     *  _play() plays rotator
     */
    _play = function () {
        clearTimeout(quoteInterval);
        _quoteFadeIn();
        console.log(instance);
    };

    /**
     * destroys timeout resets inline styles for li elements
     * and destroys singleton
     * when going to results page
     * @private
     */
    _destroy = function () {
        _pause();
        $quotes.removeAttr('style');
        instance = null;
    };

    /**
     * Exposed Methods by module
     * @returns {{play: _play, pause: _pause}}
     * @constructor
     */
    function Module() {
        return {
            play: _play,
            pause: _pause,
            destroy: _destroy
        };
    }

    /**
     *  Expose Singleton
     * @returns {object}
     */
    function getInstance() {
        if (!instance) {
            instance = new Module();
        }
        // create elements, format quotes, autostart if needed
        if (autostart) {
            _play();
        }

        return instance;
    }

    return {
        getInstance: getInstance
    };
};
