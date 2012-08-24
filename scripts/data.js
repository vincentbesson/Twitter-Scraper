// Reqête: Tous les tweets avec #jeuvideo ou bien #jeuxvideo ou bien #jeuxvideos postés depuis le 1er janvier 2012 en Français.

// https://twitter.com/#!/search/realtime/since%3A2012-01-01%20%23jeuvideo%20OR%20%23jeuxvideo%20OR%20%23jeuxvideos%20lang%3Afr
// http://search.twitter.com/search.json?q=since%3A2012-01-01%20%23jeuvideo%20OR%20%23jeuxvideo%20OR%20%23jeuxvideos%20lang%3Afr

//obj = jQuery.get('http://search.twitter.com/search.json?q=since%3A2012-01-01%20%23jeuvideo%20OR%20%23jeuxvideo%20OR%20%23jeuxvideos%20lang%3Afr');

data = google.visualization.arrayToDataTable([
	
	['keyWord', 'Parent', 'Frequency', 'Color'],
	
	['Jeux', null,	 	0, 1],
	

	['PC', 'Jeux',	 	10, 1],
	['Console', 'Jeux',	1, 1],

	['#PS3', 'Console', 	5, 1],
	['#xbox', 'Console', 	3, 1],
	['#wii', 'Console', 	2, 1],

	['#cod', '#PS3',	1, 8],
	['#fw', '#PS3',		2, 9],
	['Call Of Duty','#PS3', 1, 10],
	
	['#cod ', '#xbox',	1, 5],
	['#fw ', '#xbox',	1, 6],
	['Call Of Duty ','#xbox', 2, 7]

]);



tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

tree.draw(data, {
	minColor: '#009',
	midColor: '#0000AA',
	maxColor: '#0000FF',
	headerHeight: 60,
	fontColor: 'white',
	showScale: false,
	maxDepth: 3,
	headerColor: '#0011FF'
}
);
