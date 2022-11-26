'use strict';
$(() => {
  let amenitiesSelected = [];
  const selectors = {
    amenitiesHeader: '.amenities > h4',
    amenityBox: '.amenities > .popover > ul > li > input[type="checkbox"]',
    amenityItem: '.amenities > .popover > ul > li'
  };

  $(selectors.amenityItem).on('mousedown', ev => {
    ev.target.getElementsByTagName('input')?.item(0)?.click();
  });

  $(selectors.amenityBox).change(ev => {
    const amenityId = ev.target.getAttribute('data-id');
    const amenityName = ev.target.getAttribute('data-name');

    if (ev.target.checked) {
      if (!amenitiesSelected.find(obj => obj.id === amenityId)) {
        amenitiesSelected.push({
          id: amenityId,
          name: amenityName
        });
      }
    } else {
      amenitiesSelected = amenitiesSelected.filter(
        obj => (obj.id !== amenityId) && (obj.name !== amenityName)
      );
    }
    const htmlContent = amenitiesSelected.map(obj => obj.name).join(', ');
    $(selectors.amenitiesHeader).html(
      amenitiesSelected.length > 0 ? htmlContent : '&nbsp;'
    );
  });

  window.addEventListener('load', function () {
    // task 3
    $.ajax('http://0.0.0.0:5001/api/v1/status').done(function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    });
  
    // task 2
    const amenityIds = {};
    $('input[type=checkbox]').click(function () {
      if ($(this).prop('checked')) {
        amenityIds[$(this).attr('data-id')] = $(this).attr('data-name');
      } else if (!$(this).prop('checked')) {
        delete amenityIds[$(this).attr('data-id')];
      }
      if (Object.keys(amenityIds).length === 0) {
        $('div.amenities h4').html('&nbsp');
      } else {
        $('div.amenities h4').text(Object.values(amenityIds).join(', '));
      }
    });
  });
  
});
