function jsonFlickrFeed (data){
    var tpl = $('#feedItemTemplate').html();
    var feedItems = '';
    for(let i in data.items){
        let item = data.items[i];
        feedItems += template(tpl, {
            src       : item.media.m,
            title     : item.title,
            titleLink : item.link,
            user      : item.author.split(' (')[1].slice(0, -1),
            userLink  : 'https://www.flickr.com/photos/' + item.author_id,
            tags      : item.tags
        });
    }
    $('#feedContainer').append(feedItems);

    loadVisibleImages();
}

function template (templateString, parameters) {
    for(let key in parameters){
        let token = new RegExp('{{' + key + '}}', 'g');
        templateString = templateString.replace(token, parameters[key]);
    }
    return templateString;
}

var loadVisibleImages = (function () {
    // memoized variables
    var viewportHeight = $(window).height();
    var timeout = 0;
    var delay = 300;

    // inner/private method
    function loadVisible () {
        var viewportTop = window.scrollY;
        var viewportBottom = viewportTop + viewportHeight;

        $('.feed-item-image.loading').each(function(){
            let img = $(this).find('img');

            // check if the image is inside the visible area
            let imgTop = img.offset().top;
            let imgBottom = imgTop + img.height();
            if(imgTop > viewportBottom || imgBottom < viewportTop){
                return;
            }

            // load image
            img.attr('src', img.data('src'));
            img.on('load', function(){
                img.parent().removeClass('loading');
            });
        });
    }

    // the public function will use throttling to call the inner/private 
    // function once every 300ms
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(loadVisible, delay);
    }
})();

$(function(){
    $.ajax({
        url: 'http://api.flickr.com/services/feeds/photos_public.gne?format=json',
        dataType: 'jsonp'
    });

    $(window).on('scroll', loadVisibleImages);
});