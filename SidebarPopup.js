$("#close-side-popup").on("click", closePopup);
  
  function closePopup(){
  	$("#cookie-side").addClass("popup-closed");
    setCookie('displayedPopupNewsletter', 'yes', 1);
    
    setTimeout(function () {
      $("#cookie-side").removeClass("side-popup-active");
    }, 900)
}    
     
function setCookie( c_name, value, exdays ) {
	var c_value = escape(value);
	if (exdays) {
		var exdate = new Date();
		exdate.setDate( exdate.getDate() + exdays );
		c_value += '; expires=' + exdate.toUTCString();
	}
	document.cookie = c_name + '=' + c_value;
}

function getCookie( c_name ) {
	var i, x, y, cookies = document.cookie.split( ';' );

	for ( i = 0; i < cookies.length; i++ ) {
		x = cookies[i].substr( 0, cookies[i].indexOf( '=') );
		y = cookies[i].substr( cookies[i].indexOf( '=') + 1 );
		x = x.replace( /^\s+|\s+$/g, '' );

		if ( x === c_name ) {
			return unescape( y );
		}
	}
}


var registeredBoolean = infoZakaznika2.registered;
window.setTimeout(function(){
		if (registeredBoolean == true){
      // When the cookie exists, do not show the popup!
      if (getCookie('displayedPopupNewsletter')) {
        return;
      }

      $("#cookie-side").addClass("side-popup-active");
    }
}, 3000);
