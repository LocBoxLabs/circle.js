/**
 * jquery.circle.js
 * Copyright (c) 2012 Colin Young
 * Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * @author Colin Young
 * @projectDescription  jQuery plugin for detecting the position of the mouse in radians on any HTML element
 * @version 0.1.0
 *
 * @requires jquery.js (tested with 1.2.6)
 *
 */
$(function() {

  $.fn.circle = function ( options )
  {
    var _this = this, events = {};
    this.options = $.extend({
      bounds: null
    }, options);
    events.click = $.isFunction(options.click) ? options.click : null;
    events.mousemove = $.isFunction(options.mousemove) ? options.mousemove : null;
    this.events = events;

    /* Functions */
    this.util = {
      // Special thanks to @jakechen.
      percentage: function(x, y) {
        var bounds = _this.options.bounds,
                 d = $(_this).width(),
             theta = 0,
                 v = 0;
        theta = Math.atan2((d-2*x), (2*y-d));
        if (x < (d/2)) {
          v = (theta/Math.PI) * 50;
        } else {
          v = 100 + (theta/Math.PI) * 50;
        }
        if ($.isArray(bounds)) {
          v = Math.max(v, bounds[0]);
          v = Math.min(v, bounds[1]);
        }
        return percentage = parseFloat(v.toFixed(2));
      },
      eventInfo: function(e) {
        var x, y, percentage;
        x = Math.round(e.pageX - $(_this).offset().left, 0);
        y = Math.round(e.pageY - $(_this).offset().top, 0);
        percentage = _this.util.percentage(x, y);
        return {
          x: x,
          y: y,
          percentage: percentage,
          degree: percentage/100 * 360
        };
      }
    };

    $(this).mousemove(function(e) {
      var mousemove = _this.events.mousemove;
      if (!mousemove) return;

      mousemove.call(_this, _this.util.eventInfo(e));
    });

    $(this).click(function(e) {
      var click = _this.events.click;
      if (!click) return;
      click.call(_this, _this.util.eventInfo(e));
    });
  }
});