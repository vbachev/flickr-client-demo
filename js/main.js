var app = {};

app.feedClient = (function(){
    var apiUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json';
    var feedItemTemplate;
    var noResultsMessage;
    var feedContainer;
    var searchForm;
    var searchField;
    var searchTrigger;
    var titleSuffix;

    function parseFeedResult (data) {
        window.scroll(0, 0);

        var feedItems = '';
        for(let i in data.items){
            let item = data.items[i];

            // pick out the user name ("nobody@flickr.com (Hobgoblin737)" -> "Hobgoblin737")
            let userName = item.author.split(' (')[1].slice(0, -1);

            // construct a valid URL for the user profile page
            let userLink = 'https://www.flickr.com/photos/' + item.author_id;

            feedItems += parseTemplate(feedItemTemplate, {
                src       : item.media.m,
                title     : item.title,
                titleLink : item.link,
                user      : userName,
                userLink  : userLink,
                tags      : item.tags
            });
        }
        feedContainer.html(feedItems || noResultsMessage);

        // tight coupling :(
        app.lazyLoader.loadVisibleImages();
    }

    function parseTemplate (templateString, parameters) {
        for(let key in parameters){
            let token = new RegExp('{{' + key + '}}', 'g');
            templateString = templateString.replace(token, parameters[key]);
        }
        return templateString;
    }

    function getFeed (tagsArray) {
        titleSuffix.text(tagsArray ? 'for: ' + tagsArray.join(', ') : '');
        $.ajax({
            url: apiUrl + (tagsArray ? '&tags=' + tagsArray.join(',') : ''),
            dataType: 'jsonp'
        });
    }

    function onSearch (e) {
        e.preventDefault();
        
        // clear and hide the search form
        searchField.val('');
        searchTrigger.prop('checked', false);

        let tagsArray = searchField.val().split(' ');
        getFeed(tagsArray);
    }

    function initialize () {
        feedItemTemplate = $('#feedItemTemplate').html();
        noResultsMessage = $('#noResultsMessage').html();
        feedContainer = $('#feedContainer');
        searchField = $('#searchField');
        searchForm = $('#searchForm');
        searchTrigger = $('#searchTrigger');
        titleSuffix = $('#searchSufix');

        // flickr needs a global function to process the results
        window.jsonFlickrFeed = parseFeedResult;

        // listen for search actions
        searchForm.on('submit', onSearch);

        getFeed();
    }

    return {
        initialize : initialize
    }
})();

app.lazyLoader = (function(){
    // memoized variables
    var viewportHeight = $(window).height();
    var timeout = 0;
    var delay = 300;

    // inner/private method
    function loadVisibleImages () {
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

    // this function will use throttling to call the inner/private 
    // function once every 300ms
    function loadVisibleImagesThrottled () {
        clearTimeout(timeout);
        timeout = setTimeout(loadVisibleImages, delay);
    }

    function initialize () {
        $(window).on('scroll', loadVisibleImagesThrottled);
    }

    return {
        initialize : initialize,
        loadVisibleImages : loadVisibleImages
    }
})();

$(function(){
    app.feedClient.initialize();
    app.lazyLoader.initialize();
});