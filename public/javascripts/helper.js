window.requestImages = function() {
    var queryId = $('#locationChooser').val();
    var locationName = $('#locationChooser option[value=' + queryId + ']').text();
    var pathToFolder = 'http://www.cp.jku.at/misc/div-2014/testset/img/' + locationName;
    $.get('/images/' + queryId, function (imagesIds) {
        $("#imageGallery" ).empty();
        imagesIds.forEach(function (imageId) {
            $('#imageGallery')
                .append('<a id="' + imageId + '" href="' + pathToFolder + '/' + imageId + '.jpg">' +
                        '<img class="thumbnail" src="' + pathToFolder + '/' + imageId + '.jpg" /></a>');
        });
        $("#imageGallery").lightGallery();
    })
};

$(document).ready(function () {
   $.get('/locations', function (locations) {
       locations.forEach(function(location) {
           $('#locationChooser').append($('<option></option>').attr('value', location.number).text(location.name));
       });
   });
});