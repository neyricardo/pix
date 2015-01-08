function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}
var pixObject = {
	currentObject: null,
	getCurrent : function() {
		return this.currentObject;
	},
	setCurrent : function(obj) {
		this.currentObject = obj;
	}
};
;(function ( $ ) {
	$.handleEvents = {
		init : function(context){
			$('#add-new').on('click',function(event){
				$('#pix-template').addScore();
			});
			$('.pix-steps').on('keypress','.pix-div-input',function(event){
				$(this).checkText($(this).text(), event);
			});
			$('.pix-steps').on('keyup', '.pix-div-input', function(event){
				var target = $(this);
				$(this).replacePix($(this).text(), target);
			});
			$('.pix-steps').on('click','.btn-tools',function(event){
				$(this).clickTool();
			});
			$('.pix-steps').on('click', '.pix-div-input', function(event){
				$.handleEvents.acClose();
			});
		},
		acSelectNext : function(ul) {
			var current = ul.find('.active');
			var next = current.next();
			if (next.length > 0) {
				current.removeClass('active');
				next.addClass('active');
			} else {
				current.removeClass('active');
				ul.find('li:first').addClass('active');
			}
		},
		acSelectPrev : function(ul) {
			var current = ul.find('.active');
			var prev = current.prev();
			if (prev.length > 0) {
				current.removeClass('active');
				prev.addClass('active');
			} else {
				current.removeClass('active');
				ul.find('li:last').addClass('active');
			}
		},
		acClose : function(ul) {
			$('.pix-ul').remove();
		},
		acAddIcon : function(ul,obj) {
			var current = ul.find('.active');
			var i = $('<i>').attr('class','pix pix-'+current.text());
			obj.html(i);
			this.acClose(ul);
			var jsobj = obj.get(0);
			setEndOfContenteditable(jsobj);
		}
	}
	$.fn.clickTool = function() {
		obj = $(this);
		switch(obj.attr('href')){
			case '#add':
				obj.addNodeCurrent();
				break;
			case '#remove':
				obj.removeCurrentNode();
			break;
			case '#split':
				obj.splitCurrent();
			break;
			case '#add-note':
				obj.addNoteCurrent();
			break;
		}
	}
	/*
	* Añade un nuevo score sin titulo via handlebars 
	*/
	$.fn.addScore= function(){
		var pix_layout = $('#layout-score').html();
		var step_template = $('#pix-step').html();
		var step_compile = Handlebars.compile(step_template);
		var template = Handlebars.compile(pix_layout);
		var context = {step: step_compile};
		var html = template(context);
		$(this).append(html);
		
		return false;
	}
	$.fn.showAutoComplete = function(search) {
		var obj = $(this);
		var searchText = search.replace('pix-','');
		if ($('.pix-ul').length == 0) {
			var ul = $('<ul>').attr('class','select nav nav-stacked pix-ul');
			var results = [];
			$.ajax({
				dataType: 'json',
				url: Ajax.icons,
				success: function(data) {
					$.each(data,function(i,n){
						var prop = Object.getOwnPropertyNames(n);
						var propName = prop[0].toString();
						var searchExp = new RegExp("^"+searchText+"+","g");
						//console.log(propName.match(searchExp));
						if (propName.match(searchExp)) {
							results.push('pix-'+propName);
						}
					});
					$.each(results,function(i,n){
						var item = n.replace('pix-','');
						var li = $('<li>').append($('<a>').attr('href','#'+item).text(item).prepend($('<i>').attr('class','pix pix-fw pix-'+item)));
						ul.append(li);
						$('body').append(ul);
						var input_position_top = obj.offset().top + obj.outerHeight();
						var input_position_left = obj.offset().left;

						ul.css({'top' : input_position_top,'left': input_position_left});
						ul.find('li:first').addClass('active');

					});
				},
				error : function(jqXHR,status,error) {
					console.log(error);
				}

			});	
			/*
			* KEYCODES
			*
			* abajo : 40
			* arriba : 38
			* izq: 37
			* der: 39
			* esc: 27
			* enter: 13
			*/
			var passUl = ul;
			obj.on('keyup',function(event,passUl){
				switch(event.keyCode) {
					case 40 : $.handleEvents.acSelectNext(ul); break;
					case 38 : $.handleEvents.acSelectPrev(ul); break;
					case 27 : $.handleEvents.acClose(ul); break;
					case 13 : $.handleEvents.acAddIcon(ul,obj); break;
				}
				
			});
		}
	}
	/*
	*	Ejecuta la acción de reemplazo (regex) del caracter Pix por el layout especificado
	*/
	$.fn.replacePix = function(str,target) {
			var autocomplete = new RegExp("(pix[-][a-z])","g");
			var re = new RegExp("(pix[-][a-z])([a-z]+)([\w ]+)","gm");
			var textarea = $(this).prev();
			textarea.val(str);
			console.log(textarea.val());
			var newstr = textarea.val();
			if (newstr.match(autocomplete)) {
				$(this).showAutoComplete(newstr);
			}
			if (newstr.match(re)) {
				//$(this).prev().val(str);
		        str = str.replace(re,'<i class="pix $1$2"></i>');
		        //console.log(newstr);
		        $(target).html(str);
		        $(target).html('');
		        $(target).html(str);
		        //console.log(target);
		        var jsobj = target.get(0);
				setEndOfContenteditable(jsobj);
		        $.handleEvents.acClose();
	        }
	}
	/*
	* Cambia la clase del ul contenedor generando un split
	* TODO: hay que agregar el campo de texto para el título
	*/
	$.fn.splitCurrent = function() {
		var obj = $(this);
		obj.parent().next().toggleClass('split');
	}
	/*
	* Añade / esconde nota de cada step
	*/
	$.fn.addNoteCurrent = function() {
		var obj = $(this);
		obj.parent().next().toggleClass('active');
	}
	/*
	* Elimina la columna contextual al botón
	*/
	$.fn.removeCurrentNode = function() {
		var obj = $(this);
		obj.parent().parent().remove();
	}
	/*
	* Añade una columna despues de la actual
	*/
	$.fn.addNodeCurrent = function() {
		var obj = $(this);
		var step_template = $('#pix-step').html();
		var column = Handlebars.compile(step_template);

		obj.parent().parent().after(column);

	}
	/*
	*	Controla funciones de input como el avance del tab para crear una nueva columna
	*/
	$.fn.checkText = function(str, event) {
		this.addNode = function(context) {
			var step_template = $('#pix-step').html();
			var column = Handlebars.compile(step_template);

			$('.pix-steps').append(column).find('.pix-step').last().find('li').first().find('.pix-div-input').focus();
		}
		var that = this;
		/*
			Control del tab para crear nueva columna
		*/
		if (event.keyCode == 9) {
			//next tab
			$.handleEvents.acClose();
			event.preventDefault();
			var next = $(this).parent().parent().next().find('.pix-div-input');
			if (next.length == 0) {
				var alt_next = $(this).offsetParent().next().find('.pix-div-input').first();
				//console.log(alt_next);
				if (alt_next.length == 0) {
					//console.log($(this).offsetParent().parent());
					that.addNode($(this).offsetParent().parent());
				} else {
					alt_next.focus().select();
				}
			} else {
				next.focus().select();
			}
			return false;
		}
	};
}(jQuery));

jQuery(document).ready(function($){
	/*
		Handlebars
	*/
	var pix_layout = $('#layout-score').html();
	var step_template = $('#pix-step').html();
	var step_compile = Handlebars.compile(step_template);
	var template = Handlebars.compile(pix_layout);
	var context = {step: step_compile};
	var html = template(context);
	$('#pix-template').html(html);

	/*
		Iniciamos eventos
	*/
	$.handleEvents.init();
	
});