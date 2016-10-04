function jsonFlickrFeed (data){
    var tpl = $('#feedItemTemplate').html();
    var feedItems = '';
    for(let i in data.items){
        let item = data.items[i];
        feedItems += template(tpl, {
            src   : item.media.m,
            title : item.title,
            user  : item.author,
            tags  : item.tags
        });
    }
    $('#feedContainer').append(feedItems);
}

function template (templateString, parameters) {
    for(let key in parameters){
        templateString = templateString.replace('{{' + key + '}}', parameters[key], 'g');
    }
    return templateString;
}

$(function(){
    $.ajax({
        url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json',
        dataType: 'jsonp'
    });
})