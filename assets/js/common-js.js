$(document).ready(function() {
$('select').niceSelect();
});
document.addEventListener('DOMContentLoaded', () => {
const slides = document.querySelectorAll('.SearchNew2Box > div');

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const slideId = slide.getAttribute('for');
        document.getElementById(slideId).checked = true;
    });
});
});
$('.radio-buttons .radiobtn').on('click', function() {
// Remove active class from all radio buttons
$('.radio-buttons .radiobtn').each(function() {
    $(this).removeClass('et_pb_tab_active');
});

// Add active class to the clicked radio button
$(this).addClass('et_pb_tab_active');

// Check which radio button is active and apply corresponding logic
$('.radio-buttons .radiobtn').each(function() {
    if ($(this).hasClass('expand') && $(this).hasClass('et_pb_tab_active')) {
        $('body').addClass('oneWay').removeClass('roundTrip multiCity');

    }
    if ($(this).hasClass('expand1') && $(this).hasClass('et_pb_tab_active')) {
        $('body').addClass('roundTrip').removeClass('oneWay multiCity');
    }
    if ($(this).hasClass('expand2') && $(this).hasClass('et_pb_tab_active')) {
        $('body').addClass('multiCity').removeClass('oneWay roundTrip');
    }
});
});

    $(document).ready(function() {
// Open the dropdown when the input field is clicked
$('#totalManualPassengerdisplay').on('click', function(event) {
    event.stopPropagation();
    $('#myId').show();
});

// Close the dropdown when clicking outside
$(document).on('click', function(event) {
    if (!$(event.target).closest('#myId').length && !$(event.target).is('#totalManualPassengerdisplay')) {
        $('#myId').hide();
    }
});

$('.passCount').on('click', function() {
    let totalPass = parseInt($('#madult').val()) + parseInt($('#mchildren').val()) + parseInt($('#minfant').val());
    const op = $(this).attr('data-op');
    const type = $(this).attr('data-type');

    switch (op) {
        case 'add':
            if (totalPass == '{{ $max_person ?? 9 }}') {
                $('.passCount.quantity__plus').addClass('plus-disabled');
            } else {
                $('.passCount.quantity__minus').removeClass('minus-disabled');
                let currentVal = parseInt($('#' + type).val());
                $('#' + type).val(++currentVal);
                totalPass = parseInt($('#madult').val()) + parseInt($('#mchildren').val()) + parseInt($('#minfant').val());
                updateToalManualPassenger(totalPass);
            }
            break;
        case 'minus':
            if (totalPass == 1) {
                $('.passCount.quantity__minus').addClass('minus-disabled');
            } else {
                let currentVal = parseInt($('#' + type).val());
                currentVal != 0 ? $('#' + type).val(--currentVal) : '';
                $('.passCount.quantity__plus').removeClass('plus-disabled');
                totalPass = parseInt($('#madult').val()) + parseInt($('#mchildren').val()) + parseInt($('#minfant').val());
                updateToalManualPassenger(totalPass);
            }
            break;
    }

    updatePassengerDisplay();
});

function updateToalManualPassenger(totalPass) {
    $('#totalManualPassenger').val(totalPass);
}

function updatePassengerDisplay() {
    const adultCount = $('#madult').val();
    const childrenCount = $('#mchildren').val();
    const infantCount = $('#minfant').val();

    let displayText = adultCount + ' Adult';
    displayText += ', ' + childrenCount + ' Child' + (childrenCount > 1 ? 'ren' : '');
    displayText += ', ' + infantCount + ' Infant' + (infantCount > 1 ? 's' : '');

    $('#totalManualPassengerdisplay').val(displayText);
}

// Initialize the input field with default values
updatePassengerDisplay();
});
document.addEventListener('DOMContentLoaded', () => {
const slides = document.querySelectorAll('.SearchNew2Box > div');

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const slideId = slide.getAttribute('for');
        document.getElementById(slideId).checked = true;

        if (slideId === 's1' || slideId === 's3' || slideId === 's4') {
            document.body.classList.remove('multiCity'); // Replace 'your-class-name' with the actual class name you want to remove
        }
    });
});
});
$(document).ready(function() {
    // Initialize Nice Select
    $('#destinationSelect').niceSelect();

    // Set the initial value of data-display
    let initialText = $('#destinationSelect').find('option:selected').text();
    $('#destinationSelect').attr('data-display', initialText);

    // Update data-display on change
    $('#destinationSelect').on('change', function() {
        let selectedText = $(this).find('option:selected').text();
        $(this).attr('data-display', selectedText);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize flatpickr for the hotelTwo input with date range picker
    flatpickr("#hotelTwo", {
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: [new Date(), new Date()]
    });

    // Initialize flatpickr for the hotelone input with date range picker
    flatpickr("#hotelone", {
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: [new Date(), new Date()]
    });

    // Initialize flatpickr for the litepickerDob input with single date picker
    flatpickr("#litepickerDob", {
        dateFormat: "Y-m-d",
        defaultDate: new Date()
    });
});

$(document).ready(function() {
    $('.fam-item').on('click', function(e) {
      e.preventDefault();
      $('.fam-item').removeClass('active'); // Remove active class from all items
      $(this).addClass('active'); // Add active class to the clicked item
    });
  });
  