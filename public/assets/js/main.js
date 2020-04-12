$(document).on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $('#filter-content').isotope({ filter: filterValue });
})

$(document).on('click', '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox({ wrapping: false });
});
