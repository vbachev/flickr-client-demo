var app = {};

app.feedClient = (function(){
    var apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
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
        for(var i in data.items){
            var item = data.items[i];

            // pick out the user name ("nobody@flickr.com (Hobgoblin737)" -> "Hobgoblin737")
            var userName = item.author.split(' (')[1].slice(0, -1);

            // construct a valid URL for the user profile page
            var userLink = 'https://www.flickr.com/photos/' + item.author_id;

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
        for(var key in parameters){
            var token = new RegExp('{{' + key + '}}', 'g');
            templateString = templateString.replace(token, parameters[key]);
        }
        return templateString;
    }

    function getFeed (tagsString) {
        var tagsParameter = '';
        var tagsTitleSuffix = '';

        if(tagsString){
            var tagsArray = tagsString.split(' ');
            tagsParameter = '&tags=' + tagsArray.join(',');
            tagsTitleSuffix = 'for: ' + tagsArray.join(', ');
        }

        titleSuffix.text(tagsTitleSuffix);
        $.ajax({
            url: apiUrl + tagsParameter,
            dataType: 'jsonp'
        });
    }

    function onSearch (e) {
        e.preventDefault();
        getFeed(searchField.val());
        
        // clear and hide the search form
        searchField.val('');
        searchTrigger.prop('checked', false);
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

    function loadVisibleImages () {
        var viewportTop = window.scrollY;
        var viewportBottom = viewportTop + viewportHeight;

        $('.feed-item-image.loading').each(function(){
            var img = $(this).find('img');

            // check if the image is inside the visible area
            var imgTop = img.offset().top;
            var imgBottom = imgTop + img.height();
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

    function initialize () {
        // this will use throttling to call the loadVisibleImages function once every 300ms
        $(window).on('scroll resize', function () {
            clearTimeout(timeout);
            timeout = setTimeout(loadVisibleImages, delay);
        });
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
