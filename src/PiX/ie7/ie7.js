/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referring to this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'PiX\'">' + entity + '</span>' + html;
	}
	var icons = {
		'pix-pix': '&#xe600;',
		'pix-grid-center': '&#xe601;',
		'pix-grid-ul': '&#xe602;',
		'pix-grid-horizontal': '&#xe603;',
		'pix-grid': '&#xe604;',
		'pix-square': '&#xe605;',
		'pix-square-dashed': '&#xe606;',
		'pix-stack': '&#xe607;',
		'pix-circle': '&#xe608;',
		'pix-circle-dashed': '&#xe609;',
		'pix-say': '&#xe60a;',
		'pix-dialogue': '&#xe60b;',
		'pix-think': '&#xe60c;',
		'pix-cloud': '&#xe60d;',
		'pix-email': '&#xe60e;',
		'pix-database': '&#xe60f;',
		'pix-gear': '&#xe610;',
		'pix-interaction': '&#xe611;',
		'pix-refresh': '&#xe612;',
		'pix-reload': '&#xe613;',
		'pix-book': '&#xe614;',
		'pix-mobile': '&#xe615;',
		'pix-mobile-vibrate': '&#xe616;',
		'pix-mobile-rotate': '&#xe617;',
		'pix-mobile-shake': '&#xe618;',
		'pix-mobile-orient': '&#xe619;',
		'pix-tablet': '&#xe61a;',
		'pix-notebook': '&#xe61b;',
		'pix-desktop': '&#xe61c;',
		'pix-trackpad': '&#xe61d;',
		'pix-game': '&#xe61e;',
		'pix-mouse': '&#xe61f;',
		'pix-click': '&#xe620;',
		'pix-click-left': '&#xe621;',
		'pix-click-center': '&#xe622;',
		'pix-click-right': '&#xe623;',
		'pix-keyboard': '&#xe624;',
		'pix-keyboard-type': '&#xe625;',
		'pix-keyboard-arrows': '&#xe626;',
		'pix-keyboard-enter': '&#xe627;',
		'pix-keyboard-tab': '&#xe628;',
		'pix-arrow-up': '&#xe629;',
		'pix-arrow-down': '&#xe62a;',
		'pix-arrow-left': '&#xe62b;',
		'pix-arrow-right': '&#xe62c;',
		'pix-arrows-expand': '&#xe62d;',
		'pix-arrows-collapse': '&#xe62e;',
		'pix-arrows-move': '&#xe62f;',
		'pix-arrows-diagonal': '&#xe630;',
		'pix-arrows-horizontal': '&#xe631;',
		'pix-arrows_arrowsvertical': '&#xe632;',
		'pix-arrows-rotate': '&#xe633;',
		'pix-arrows-cycle': '&#xe634;',
		'pix-face': '&#xe635;',
		'pix-face-similing': '&#xe636;',
		'pix-face-sad': '&#xe637;',
		'pix-face-laughing': '&#xe638;',
		'pix-face-surpirsed': '&#xe639;',
		'pix-face-upset': '&#xe63a;',
		'pix-face-intrigued': '&#xe63b;',
		'pix-robot': '&#xe63c;',
		'pix-touch': '&#xe63d;',
		'pix-touch-1': '&#xe63e;',
		'pix-touch-2': '&#xe63f;',
		'pix-touch-3': '&#xe640;',
		'pix-touch-4': '&#xe641;',
		'pix-touch-5': '&#xe642;',
		'pix-hand': '&#xe643;',
		'pix-pinch': '&#xe644;',
		'pix-thumb': '&#xe645;',
		'pix-cube': '&#xe646;',
		'pix-file': '&#xe647;',
		'pix-lightbulb': '&#xe648;',
		'pix-clock': '&#xe649;',
		'pix-envelope': '&#xe64a;',
		'pix-calendar': '&#xe64b;',
		'pix-ok': '&#xe64c;',
		'pix-no': '&#xe64d;',
		'pix-minus': '&#xe64e;',
		'pix-plus': '&#xe64f;',
		'pix-question': '&#xe650;',
		'pix-contact': '&#xe651;',
		'pix-pencil': '&#xe652;',
		'pix-search': '&#xe653;',
		'pix-filter': '&#xe654;',
		'pix-read': '&#xe655;',
		'pix-cog': '&#xe656;',
		'pix-link': '&#xe657;',
		'pix-list': '&#xe658;',
		'pix-tag': '&#xe659;',
		'pix-feed': '&#xe65a;',
		'pix-message': '&#xe65b;',
		'pix-message-alert': '&#xe65c;',
		'pix-message-question': '&#xe65d;',
		'pix-position': '&#xe65e;',
		'pix-orientation': '&#xe65f;',
		'pix-picture': '&#xe660;',
		'pix-sound': '&#xe661;',
		'pix-video': '&#xe662;',
		'pix-checkbox': '&#xe663;',
		'pix-radio': '&#xe664;',
		'pix-radio-select': '&#xe665;',
		'pix-select': '&#xe666;',
		'pix-switch': '&#xe667;',
		'pix-text': '&#xe668;',
		'pix-type': '&#xe669;',
		'pix-lock': '&#xe66a;',
		'pix-unlock': '&#xe66b;',
		'pix-window': '&#xe66c;',
		'pix-window-text': '&#xe66d;',
		'pix-window-page': '&#xe66e;',
		'pix-window-gallery': '&#xe66f;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/pix-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
