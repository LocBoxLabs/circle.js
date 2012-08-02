/**
 * jquery.circle.js
 * Copyright (c) 2012 Colin Young
 * Licensed under the MIT License (http://www.opensource.org/licenses/mit-license.php)
 * 
 * @author Colin Young
 * @projectDescription	jQuery plugin for detecting the position of the mouse in radians on any HTML element
 * @version 0.1.0
 * 
 * @requires jquery.js (tested with 1.2.6)
 * 
 */
$(function() {

	$.fn.circle = function ( options )
	{ 
	  var _this = this, events = {};
	  events.click = $.isFunction(options.click) ? options.click : null;
	  events.mousemove = $.isFunction(options.mousemove) ? options.mousemove : null;
	  this.events = events;
	  
	  /* Functions */
	  this.util = {
	    eventInfo: function(e) {
	      return {
	        x: Math.round(e.pageX - $(_this).offset().left, 0),
	        y: Math.round(e.pageY - $(_this).offset().top, 0)
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