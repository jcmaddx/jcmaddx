export function scrollToContainer(id) {
	document.getElementById(id).scrollIntoView({ 
	  behavior: 'smooth' 
	});
}