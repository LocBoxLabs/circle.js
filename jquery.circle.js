/**
 * jquery.circle.js
 * Copyright (c) 2012 LocBox Labs
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
    
    this.options = $.extend(true, {
      bounds: null,
      events: {},
      offset: 0
    }, options);
    
    this.events = {
      mousedown: function(e) {
        _this.status.mousedown = true;
        _this.trigger('mousedown', e);
      },
      mouseup: function(e) {
        _this.status.mousedown = false;
        _this.trigger('mouseup', e);
      },
      mousemove: function(e) {
        _this.trigger('mousemove', e);
      }
    };
    
    this.status = {
      mousedown: false
    };
    
    this.trigger = function(name, e) {
      var clientEvent = _this.options.events[name];
      if (!clientEvent) return;
      clientEvent.call(_this, _this.util.eventInfo(e), this.status);
    }

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
        return percentage = parseFloat(v.toFixed(2)) + _this.options.offset;
      },
      eventInfo: function(e) {
        var x, y, percentage;
        x = Math.round(e.pageX - $(_this).offset().left, 0);
        y = Math.round(e.pageY - $(_this).offset().top, 0);
        percentage = _this.util.percentage(x, y) + _this.options.offset;
        return {
          x: x,
          y: y,
          percentage: percentage,
          degree: percentage/100 * 360
        };
      }
    };

    $(['mousemove', 'mousedown', 'mouseup']).each(function(i,v) {
      var f = _this.events[v];
      if (!f) return;
      $(_this).bind(v, f);
    });
  }
});