---
layout: null
---
/*!
 * @author Natan Felles <natanfelles@gmail.com>
 */
var hello = '    _     _        _ _   _____ _                    ___             \n' +
            ' _ | |___| |___  _| | | |_   _| |_  ___ _ __  ___  |   \\ ___  __ ___\n' +
            '| || / -_) / / || | | |   | | | \' \\/ -_) \'  \\/ -_\) | |) / _ \\/ _(_-<\n' +
            ' \\__/\\___|_\\_\\\\_, |_|_|   |_| |_||_\\___|_|_|_\\___| |___/\\___/\\__/__/\n' +
            '              |__/                                   by @natanfelles';
console.log(hello);
$(document).ready(function() {
    /* Header Links */
    var topics = '';

    function addTopic(level, content) {
        topics += '<a href="#' + content.attr('id') + '" class="list-group-item ' + level + '">' + content.html() + '</a>';
    }

    function headerLinks() {
        $('.post :header').each(function() {
            addTopic(this.tagName, $(this));
            $(this).append('<a class="header-link" href="#' + this.id + '"><i class="fa fa-link"></i></a>');
        });
    }
    headerLinks();
    $('#sidebar #topics').html(topics);

    /* Contact Form */
    $('#contact_form').validator().on('submit', function(e) {
        if ( ! e.isDefaultPrevented()) {
            var alert = $(this).children('.alert');
            $.ajax({
                url: '//formspree.io/{{ site.email }}',
                method: 'POST',
                data: $(this).serialize(),
                dataType: 'json'
            }).done(function(a){
                alert
                    .addClass('alert-success')
                    .html('Message successfull sent.')
                    .show();
                $('#contact_form input, #contact_form textarea').each(function(){
                    $(this).val('');
                })
            }).fail(function() {
                alert
                    .addClass('alert-danger')
                    .html('Message could not be sent now. Send an email to {{ site.email }}.')
                    .show();
            });
        }
        return false;
    });

    /* To Top Button */
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 110) {
            $('#toTop').show();
        } else {
            $('#toTop').hide();
        }
    });
    $('#toTop').click(function(e) {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        e.preventDefault();
    });

    if (window.innerWidth > 640) {
        $('#front').css({
            height: window.innerHeight - ($('header').height() + $('footer').height() + 100)
        });
    }


    $('.post img').each(function () {
        $(this).addClass('thumbnail').css({maxWidth: '100%'});
    });

    $('.posts a').each(function () {
        var icon = '<i class="fa fa-arrow-right"></i>';
        if($(this).children('p').length > 0){
            $(this).children('p').append(icon);
        }else{
            $(this).append(icon);
        }
    });

    $('#search-form').submit(function (){
        var search_form = $('#search-form [name="q"]');
        $('#search-modal [name="q"]').val(search_form.val());
        search(search_form.val(), 1);
        search_form.val('');

        return false;
    });

    $('#search-modal').submit(function (){
        search($('#search-modal [name="q"]').val(), 1);

        return false;
    });

    /**
     * Search by Google CSE with API Key
     * @param  {string} query
     * @param  {int} page
     */
    function search(query, page) {

        var searchTerms = query;

        var startIndex = 1;
        if (page > 1) {
            startIndex = page * 10 - 10 + 1;
        }
        console.log(startIndex);

        var cx = $('meta[name="google-cse-cx"]').attr('content');
        var key = $('meta[name="google-api-key"]').attr('content');

        /* https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&cref={cref?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json */
        var url = 'https://www.googleapis.com/customsearch/v1?q=' + searchTerms +
                    '&start=' + startIndex +
                    '&cx=' + cx +
                    '&key=' + key +
                    '&num=10&alt=json';

        $.getJSON(url, function(data,status){
            console.log(data);
            console.log(status);
            if (status == 'success') {
                /**
                 * Results
                 * @type {Array}
                 */
                var results = [];
                $(data.items).each(function(k,v){
                    results[k] = {
                        url: v.link,
                        title: v.title,
                        description: v.snippet
                    };
                });
                var html_results = '';
                $.each(results,function(k,v){
                    html_results += '<a href="' + v.url + '" class="list-group-item">' +
                                    '<h4 class="list-group-item-heading">' + v.title + '</h4>' +
                                    '<p class="list-group-item-text">' + v.description + '</p>' +
                                    '</a>';
                });
                $('.sr-results').html(html_results);

                /**
                 * Benchmark
                 * @type {Object}
                 */
                var benchmark = {
                    count_results: data.searchInformation.totalResults,
                    runtime: data.searchInformation.formattedSearchTime
                };
                $('.sr-benchmark').html(benchmark.count_results + ' results in ' + benchmark.runtime + ' seconds.');

                /**
                 * Pages
                 * @type {Object}
                 */
                var pages = {
                    total: Math.ceil(benchmark.count_results / 10),
                    current: page
                };
                pagination(pages.current, pages.total, query);

            }
        });
    }


    /**
     * Set the html pagination
     * @param {int} current
     * @param {int} total
     * @param {string} query
     */
    function pagination(current, total, query) {
        var p = $('.sr-pages .pagination');

        // Default number of links
        var num_links = 8;
        // But if page is small this is the number of links
        if ($(window).width() < 800) {
            num_links = 2;
        }
        // No necessary pagination
        if (total < 2 || current > total) {
            //console.log('zero pages');
            p.html('');
            return false;
        }
        // Setup the pagination start and end numbers
        var pagination = '';
        var start = (current - num_links > 0) ? current - (num_links - 1) : 1;
        var end = (current + num_links < total) ? current + num_links : total;
        // Previous page link
        if (total > 1 && current > 1) {
            pagination += '<li><a data-page="' + (current - 1) + '">&laquo;</a></li>';
        }
        // Numeric page links
        for (var i = start - 1; i <= end; i++) {
            if (i >= 1) {
                if (current == i) {
                    // current page
                    pagination += '<li class="active"><span>' + current + '</span></li>';
                } else {
                    // other pages
                    pagination += '<li><a data-page="' + i + '">' + i + '</a></li>';
                }
            }
        }
        // Next page link
        if (current < total) {
            pagination += '<li><a data-page="' + (current + 1) + '">&raquo;</a></li>';
        }
        // Ok! Lets set the html
        p.html(pagination);
        // Prepare pagination links to search on click
        p.children().children().click(function () {
            search(query, $(this).attr('data-page'));
            return false;
        });
    }

});
