/*
Author: Sergio Panagia
Copyright (c) 2010 Sergio Panagia.
Site: http://www.panaghia.it
Mail: contact@panaghia.it



Mosaic Class for MooTools 1.2
Version: 0.1 - Tested on: FireFox3+, Chrome4+, IE6+

Description:
Mosaic let you apply a mosaic-pattern effect on a certain image

Licence:
MIT Style License.

Date:
31/03/2010

---------------------------------

Documentation:

Mosaic() Constructor
variables:
	base - is the div that contains the image to cover
	image - is the path to the image
	width - div width (may concide with image width)
	height - div height ("" "" "")
	startColor - start color of patterns
	endColor - end color of patterns
	startAlpha - start opacity of patterns
	endAlpha - start opacity of patterns

methods:
	void start() - initializes and injects patterns inside 'base'
	void setStartColor(color) - set the initial color of Mbox(s)
	void setEndColor(color) - set the final color of Mbox(s)
	void uncover() - Apply a sequential effect on each Mbox(s) from initials to finals parameters
	void cover() - Apply a sequential effect on each Mbox(s) from finals to initials parameters
	void disableTouch() - Disable pattern effect on mouse enter (may be useful after uncover function)

---------------------------------
CSS TODO: define Mbox class inside your stylesheet

.Mbox
{	
	position:relative;
	width:20%;
	height:20%;
	float:left;
	background-color:#111;
	color:#999;
	min-height:5%;
	min-width:5%;
	border:0px;
	padding:0px;
}
	

*/

var Mosaic = new Class({
        Implements: [Options, Events],
        options: {
        base: "", //div
        image: "", //url
        width: 100,
        height: 100,
        startColor: '#111',
        endColor:'#999',
        startAlpha: .7,
        endAlpha:.1,
        covered: true,
        hacked: true
        },
        initialize: function(options){
                this.setOptions(options);
                this.start();          
        },
        start: function()
        {
        	var img = this.options.image;
        	var base = this.options.base;
        	var width = this.options.width;
        	var height = this.options.height;
        	var baseDiv = $(base);
        	if(this.options.hacked && !Browser.Engine.gecko)
        	{
        		
	       		var newW = (width*20/100);
	      		var dif = newW - Math.round(newW);
	       	  		dif*=5;
	         	
       		
          	     baseDiv.setStyle('width',width-dif);//+'px');
            }
          	baseDiv.setStyle('height',height);//+'px');
        	baseDiv.setStyle('background-image','url('+img+')');
        	
        	for(var i=25;i--;)
        	{
        		var temp  = new Element('div', {'class': 'Mbox'});
        		temp.inject(baseDiv);
           	}
        	
        	var boxs = $$('.Mbox');
			//var newW = (width*20/100);
			var newH = (height*20/100);
			boxs.setStyle('width', '20%');
			boxs.setStyle('height', newH);
								
			        	
        	
			
		var start = this.options.startAlpha;
		var end = this.options.endAlpha;
		var startColor = this.options.startColor;
		var endColor = this.options.endColor;	
		boxs.setStyle('background-color', startColor);
		boxs.set('opacity',start);
		boxs.set('morph', {duration: 800, transition: Fx.Transitions.Expo.easeOut});
		boxs.each(function(box, i)
		{
			box.addEvent("mouseenter", function(event)
			{
				
			
				box.morph({
					
					'opacity':end,
					'background-color':endColor
											
				});
			});
			box.addEvent("mouseleave", function(event)
			{
				(function(){
				box.morph({
					
					'opacity':start,
					'background-color':startColor
															
				});
				}).delay(200);
			});
		});
        	
        },
        setStartColor: function(col)
        {
		this.options.startColor = col;
	
        },
        setEndColor: function(col)
        {
		this.options.endColor = col;
        },
        uncover: function()
        {
        	if(this.options.covered)
        	{
			var start = this.options.startAlpha;
			var end = this.options.endAlpha;
			var startColor = this.options.startColor;
			var endColor = this.options.endColor;	
			var boxs = $$('.Mbox');
			var wait = 100;
			boxs.each(function (box,i)
			{
				(function(){
				box.morph({
				'background-color':endColor,
				'opacity':end
				});
				}).delay(wait);
				wait+=100;
			
			});
			this.options.covered = false;
		}
		
        },
        cover: function()
        {
        	if(!this.options.covered)
        	{
			var start = this.options.startAlpha;
			var end = this.options.endAlpha;
			var startColor = this.options.startColor;
			var endColor = this.options.endColor;	
			var boxs = $$('.Mbox');
			var wait = 100;
			boxs.each(function (box,i)
			{
				(function(){
				box.morph({
				'background-color':startColor,
				'opacity':start
				});
				}).delay(wait);
				wait+=100;
			
			});
			this.options.covered = true;
		}
		
        },
        disableTouch: function()
        {
        	var boxs = $$('.Mbox');
		boxs.each(function (box,i)
		{
			box.removeEvents("mouseenter");
			box.removeEvents("mouseleave");
		});
        }
      
});


