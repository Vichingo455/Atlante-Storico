$(document).ready(function(){
//Hide/show the toggle containers on load

$('#toggle:first').addClass('active').next().show();
//Switch the "Open" and "Close" state per click then slide up/down
$("h10").click(function(){
if( $(this).next().is(':hidden') ) {
$('h10').removeClass('active').next().slideUp();
$(this).toggleClass('active').next().slideDown();
}
else
{
$('h10').removeClass('active').next().slideUp();
}
return false; //Prevent the browser jump to the link anchor
});
});