// load component
function loadComponent(componentId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(componentId).innerHTML = data;
    })
    .catch(error => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  loadComponent('header-component', 'components/header.html');
  loadComponent('footer-component', 'components/footer.html');
});


// slick
$(document).ready(function () {
  $('.slick-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    autoplay: true,
    speed: 2000,

  });
  $('#hotelCarousel').carousel({
    interval: 2000 // Slide interval in milliseconds
  });
});




// selects js
function create_custom_dropdowns() {
  $(".slect_trip").each(function (i, select) {
    if (!$(this).next().hasClass("dropdown")) {
      $(this).after(
        '<div class="dropdown ' +
        ($(this).attr("class") || "") +
        '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
      );
      var dropdown = $(this).next();
      var options = $(select).find("option");
      var selected = $(this).find("option:selected");
      dropdown
        .find(".current")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = $(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
            ($(o).is(":selected") ? "selected" : "") +
            '" data-value="' +
            $(o).val() +
            '" data-display-text="' +
            display +
            '">' +
            $(o).text() +
            "</li>"
          );
      });
    }
  });
}
// Open/close
$(document).on("click", ".dropdown", function (event) {
  $(".dropdown").not($(this)).removeClass("open");
  $(this).toggleClass("open");
  if ($(this).hasClass("open")) {
    $(this).find(".option").attr("tabindex", 0);
    $(this).find(".selected").focus();
  } else {
    $(this).find(".option").removeAttr("tabindex");
    $(this).focus();
  }
});
// Close when clicking outside
$(document).on("click", function (event) {
  if ($(event.target).closest(".dropdown").length === 0) {
    $(".dropdown").removeClass("open");
    $(".dropdown .option").removeAttr("tabindex");
  }
  event.stopPropagation();
});
// Option click
$(document).on("click", ".dropdown .option", function (event) {
  $(this).closest(".list").find(".selected").removeClass("selected");
  $(this).addClass("selected");
  var text = $(this).data("display-text") || $(this).text();
  $(this).closest(".dropdown").find(".current").text(text);
  $(this)
    .closest(".dropdown")
    .prev("select")
    .val($(this).data("value"))
    .trigger("change");
});

// Keyboard events


// multi_city

let counter = 2;
let limit = 1;
$(document).ready(function () {
  $("li[data-value='multi']").click(function () {
    let element = $(".items-to-append");
    element.empty();
    element.append(getFields());
    $(".minus").hide();
    $(".plus").addClass("single_plus");
    $(element).show("slow");
    $(".multi_city").show("slow");
    $("#return-DM").hide();
    $(".only_for_multicity").hide();
    $(".dep-date-picker").addClass("col-12");
    var dm = $(".dep-date-picker:first").find(".date-select-flight-DM").html();
    $(".date_section input").addClass("input-style");
    $(".add_cls_oneway").removeClass("col-md-6");
    $(".add_cls_oneway").addClass("col-md-12");

    // var parts = dm.split(' ');
    // var day = parts[0];
    // var month = parts[1];

    // var year = $('.dep-date-picker:first').find('.date-select-flight-Y').html();
    // var dateString = year + "-" + month + "-" + day;

    // getDeptShowDatePrimary(counter, dateString);
    var to_$input = $(".multi_date" + counter).pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var day = date_to.getDate();
    var monthIndex = date_to.getMonth();
    var year = date_to.getFullYear().toString();

    var formattedDate = day + " " + monthNames[monthIndex] + ", " + year;
    $(".multi_date" + counter).val(formattedDate);
  });

  $('li[data-value="round"]').click(function () {
    $(".multi_city").hide("slow");
  });
  $('li[data-value="oneway"]').click(function () {
    $(".multi_city").hide("slow");
  });

  // Remove Row functions

  $(".items-to-append").on("click", ".remove1", function () {
    $(this).closest(".multi_city").find(".plus").show();
    $(".minus").removeClass("single_plus");

    limit--;
    $(this).closest(".multi_city").siblings(":last").find(".plus").show();
    $(this)
      .closest(".multi_city")
      .siblings(":first")
      .find(".plus")
      .addClass("single_plus");
    $(this).closest(".multi_city").remove();
    counter--;
  });

  // Add Row functions

  $(".items-to-append").on("click", ".appendbtn", function () {
    counter++;
    console.log("add");
    if (limit < 3) {
      $(this).closest(".items-to-append").append(getFields());
      limit++;
    }
    if (limit == 3) {
      $(".plus").hide();
      $(".minus").addClass("single_plus");
    }

    $(this).closest(".multi_city").siblings(":first").find(".minus").show();
    $(".minus:first").hide();
    $(".plus").removeClass("single_plus");
    $(".only_for_multicity").hide();
    $(this).hide();
    $(".add_cls_oneway").removeClass("col-md-6");
    $(".add_cls_oneway").addClass("col-md-12");

    $(".flight-search-label").on("click", function () {
      $(this).next(".flight-search-input").focus();
    });
    $("#flight_departure_box").on("click", function () {
      $(this).find(".flight-search-input").focus();
    });
    $("#flight_destination_box").on("click", function () {
      $(this).find(".flight-search-input").focus();
    });
    $(".flight-search-input").focus(function () {
      $(this).parent().addClass("focused");
    });
    $(".flight-search-input").blur(function () {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this).parent().removeClass("focused");
      }
    });
    $(".date_section input").addClass("input-style");
    var to_$input = $(".multi_date" + counter).pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var day = date_to.getDate();
    var monthIndex = date_to.getMonth();
    var year = date_to.getFullYear().toString();

    var formattedDate = day + " " + monthNames[monthIndex] + ", " + year;
    $(".multi_date" + counter).val(formattedDate);
  });
});

function getFields() {
  let tile =
    '<div class="row multi_city multi-dialouge-' +
    counter +
    '"><div class="col-lg-7 col-md-12 width_hand">' +
    '<div class="input_flex">' +
    '<div class="form__group field">' +
    '<input type="text" class="form__field" placeholder="From" name="from" id="from' +
    counter +
    '" required />' +
    '<label for="from" class="form__label">From</label>' +
    "</div>" +
    '<div class="swift_arrow">' +
    '<img src="assets/images/swipt-arr.svg" alt="">' +
    "</div>" +
    '<div class="form__group field">' +
    '<input type="text" class="form__field" placeholder="To" name="to" id="to' +
    counter +
    '" required />' +
    '<label for="to" class="form__label">To</label>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="col-lg-4 col-md-6 for_margi_inp add_cls_oneway">' +
    '<div class="date_section">' +
    '<input type="date" class="date_width form__field date_style multi_date' +
    counter +
    '" id="input_from' +
    counter +
    '" placeholder="dd mm, yyyy">' +
    "</div>" +
    "</div>" +
    '<div class="col-lg-1 append_buttons iconsection"><div class="icon-style remove1 mb-1 minus"><i class="fa-solid fa-x"></i>' +
    "</div></div>" +
    '<div class="icon-style clone plus appendbtn  " id="counter_add"><i class="fa-solid fa-plus"></i><span class="txt_add">Add New Destination</span></div>' +
    "</div>" +
    "</div>";
  return tile;
}

// owl_carouselSections

jQuery(document).ready(function ($) {
  var owl = $("#owl-demo-2");

  owl.owlCarousel({
    autoplayTimeout: 1000,
    autoplayHoverPause: true,

    items: 3,
    loop: true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    margin: 0,
    stagePadding: 0,

    mergeFit: true,

    smartSpeed: 250,
    fluidSpeed: false,
    responsive: {
      320: {
        items: 1,
        nav: true,
      },
      480: {
        items: 1,
        nav: false,
      },
      768: {
        items: 2,
        nav: true,
        loop: false,
      },
      992: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,

    fallbackEasing: "swing",

    itemElement: "div",
    stageElement: "div",

    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  });
  $(".owl-prev").html('<i class="fa-solid fa-arrow-left-long style_icon"></i>');
  $(".owl-next").html(
    '<i class="fa-solid fa-arrow-right-long style_icon"></i>'
  );
  $(".next").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev").click(function () {
    owl.trigger("owl.prev");
  });

  /* Equal Heights using javascript */
  // $('.latest-blog-posts .thumbnail.item').matchHeight();
});

jQuery(document).ready(function ($) {
  var owl = $("#owl-demo-3");

  owl.owlCarousel({
    autoplayTimeout: 1000,
    autoplayHoverPause: true,

    items: 3,
    loop: true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    margin: 0,
    stagePadding: 0,

    mergeFit: true,

    smartSpeed: 250,
    fluidSpeed: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      480: {
        items: 2,
        nav: false,
      },
      768: {
        items: 3,
        nav: true,
        loop: false,
      },
      992: {
        items: 4,
        nav: true,
        loop: false,
      },
    },
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,

    fallbackEasing: "swing",

    itemElement: "div",
    stageElement: "div",

    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  });
  $(".owl-prev").html('<i class="fa-solid fa-arrow-left-long style_icon"></i>');
  $(".owl-next").html(
    '<i class="fa-solid fa-arrow-right-long style_icon"></i>'
  );
  $(".next").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev").click(function () {
    owl.trigger("owl.prev");
  });

  /* Equal Heights using javascript */
  // $('.latest-blog-posts .thumbnail.item').matchHeight();
});

jQuery(document).ready(function ($) {
  var owl = $("#owl-demo-4");

  owl.owlCarousel({
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,

    items: 3,
    loop: true,
    rewind: true,

    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,

    margin: 0,
    stagePadding: 0,

    mergeFit: true,

    smartSpeed: 250,
    fluidSpeed: false,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      480: {
        items: 1,
        nav: true,
      },
      768: {
        items: 2,
        nav: true,
        loop: false,
      },
      992: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
    responsiveRefreshRate: 200,
    responsiveBaseElement: window,

    fallbackEasing: "swing",

    itemElement: "div",
    stageElement: "div",

    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  });
  $(".owl-prev").html('<i class="fa-solid fa-arrow-left-long style_icon"></i>');
  $(".owl-next").html(
    '<i class="fa-solid fa-arrow-right-long style_icon"></i>'
  );
  $(".next").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev").click(function () {
    owl.trigger("owl.prev");
  });

  /* Equal Heights using javascript */
  // $('.latest-blog-posts .thumbnail.item').matchHeight();
});

$(document).ready(function () {
  /* 1. Visualizing things on Hover - See next part for action on click */
  $("#stars li")
    .on("mouseover", function () {
      var onStar = parseInt($(this).data("value"), 10); // The star currently mouse on

      // Now highlight all the stars that's not after the current hovered star
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          if (e < onStar) {
            $(this).addClass("hover");
          } else {
            $(this).removeClass("hover");
          }
        });
    })
    .on("mouseout", function () {
      $(this)
        .parent()
        .children("li.star")
        .each(function (e) {
          $(this).removeClass("hover");
        });
    });

  /* 2. Action to perform on click */
  $("#stars li").on("click", function () {
    var onStar = parseInt($(this).data("value"), 10); // The star currently selected
    var stars = $(this).parent().children("li.star");

    for (i = 0; i < stars.length; i++) {
      $(stars[i]).removeClass("selected");
    }

    for (i = 0; i < onStar; i++) {
      $(stars[i]).addClass("selected");
    }
  });
});

// var heading = $('#flights-tab').attr('main_heading');
// var short = $('#flights-tab').attr('short_desc');
// var headingtobeApend = $('#flights-tab').attr('mainclass');
// var shorttobeappend = $('#flights-tab').attr('shortclass');
// var tabimage = $('#flights-tab').attr('tabimage');
// $('.'+headingtobeApend).html(heading);
// $('.'+shorttobeappend).html(short);

var activeclass = $(".tab_style.active");
changebanner(activeclass);

$(".tab_style").click(function () {
  var elementfor = $(this);
  changebanner(elementfor);
});

function changebanner(element) {

  var heading = element.attr("main_heading");
  var short = element.attr("short_desc");
  var headingtobeApend = element.attr("mainclass");
  var shorttobeappend = element.attr("shortclass");
  var tabimage = element.attr("tabimage");
  $("." + headingtobeApend).html(heading);
  $("." + shorttobeappend).html(short);
  $(".ba_img").css("background-image", "url(./" + tabimage + ")");
}






//-------------------------start creating slider------//







var count = 1;

for (var i = 0; i <= 10; i++) {


  var thumbnailItem = $('<div/>');
  thumbnailItem.addClass('thumbnail item');
  var img_hover_effect = $('<div />');
  img_hover_effect.addClass('img_hover_effect item');

  var img_slide_responsive = $('<img />');
  img_slide_responsive.addClass('img-slide-responsive');

  var city_detail = $('<div />');
  city_detail.addClass('caption city_detail');

  var first_city = $('<p/>');
  first_city.text('Lahore')
  first_city.addClass('first_city m-0 city_style item');

  var arrow_image = $('<img />');

  var second_city = $('<p />');
  second_city.text('Dubai')
  second_city.addClass('second_city m-0 city_style item');

  if (count > 4) {
    count = 1;
  }

  var src = 'assets/images/slide' + count + '.jpg'
  img_slide_responsive.attr('src', src);

  img_hover_effect.append(img_slide_responsive);

  arrow_image.attr('src', 'assets/images/swipt-arr.svg');

  city_detail.append(first_city, arrow_image, second_city);

  thumbnailItem.append(img_hover_effect, city_detail);
  $('#owl-demo-2').append(thumbnailItem);

  count++;

}






increament = 1;
for (var j = 1; j <= 10; j++) {

  if (increament > 2) {
    increament = 1;
  }

  var testthumbnail = $('<div/>');
  testthumbnail.addClass('owl-item');
  testthumbnail.css('width', '440px');
  var simpleDiv = $('<div/>');
  simpleDiv.addClass('text-center');

  var testImg = $('<img />');
  testImg.addClass('avatar_style');
  testImg.attr('src', 'assets/images/avatar' + increament + '.jpg')
  var visit_nameParagraph = $('<p/>');
  visit_nameParagraph.addClass('visit_name pt-4 mb-2');

  var visit_countryParagraph = $('<p/>');
  visit_countryParagraph.addClass('visit_country');

  var visit_overviewParagraph = $('<p/>');
  visit_overviewParagraph.addClass('visit_overview');

  var rating_star = $('<div />');
  rating_star.addClass('rating-stars text-center');
  var unorderList = $('<ul />');
  unorderList.attr('id', 'stars');




  for (var k = 0; k < 5; k++) {

    var list = $('<li />');
    list.addClass('star selected');
    var starIcon = $('<i />');
    starIcon.addClass('fa fa-star fa-fw');
    list.append(starIcon);
    unorderList.append(list);

  }
  if (j % 2 == 0) {
    visit_nameParagraph.text('Kevin Lawrence');
    visit_countryParagraph.text('UK');
    visit_overviewParagraph.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit 2.");
  } else {
    visit_nameParagraph.text('David Tucker');
    visit_countryParagraph.text('US');
    visit_overviewParagraph.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  }
  increament++;
  rating_star.append(unorderList)
  simpleDiv.append(testImg, visit_nameParagraph, visit_countryParagraph, visit_overviewParagraph, rating_star);
  testthumbnail.append(simpleDiv);
  $('#owl-demo-4').append(testthumbnail);



}
// <div class="owl-item active" style="width: 440px;"><div class="thumbnail item m-0">
//           <div class="text-center">
//             <img src="assets/images/avatar1.jpg" alt="" class="avatar_style" />
//             <p class="visit_name pt-4 mb-2">David Tucker</p>
//             <p class="visit_country">United States</p>
//             <p class="visit_overview">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
//               velit interdum, ac aliquet odio mattis. </p>
//             <div class="rating-stars text-center">
//               <ul id="stars">
//                 <li class="star selected" title="Poor" data-value="1">
//                   <i class="fa fa-star fa-fw"></i>
//                 </li>
//                 <li class="star selected" title="Fair" data-value="2">
//                   <i class="fa fa-star fa-fw"></i>
//                 </li>
//                 <li class="star selected" title="Good" data-value="3">
//                   <i class="fa fa-star fa-fw"></i>
//                 </li>
//                 <li class="star selected" title="Excellent" data-value="4">
//                   <i class="fa fa-star fa-fw"></i>
//                 </li>
//                 <li class="star selected" title="WOW!!!" data-value="5">
//                   <i class="fa fa-star fa-fw"></i>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div></div>






//--------------------end of function----------------//



// insuranceTab

$("#dateBirth").pickadate({
  format: "dd mmm, yyyy",
  min: new Date(),
});

$(document).ready(function () {
  $(function () {
    var from_$input = $("#insurance_to").pickadate(),
      from_picker = from_$input.pickadate("picker");

    var to_$input = $("#insurance_from").pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var day = date_to.getDate();
    var monthIndex = date_to.getMonth();
    var year = date_to.getFullYear().toString();

    var formattedDate = day + " " + monthNames[monthIndex] + ", " + year;
    $("#insurance_from").val(formattedDate);
  });
  $(function () {
    var from_$input = $("#insurance_from").pickadate(),
      from_picker = from_$input.pickadate("picker");

    var to_$input = $("#insurance_to").pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    from_picker.on("set", function (event) {
      if (event.select) {
        to_picker.set("min", from_picker.get("select"));
      } else if ("clear" in event) {
        to_picker.set("min", false);
      }
    });
    to_picker.on("set", function (event) {
      if (event.select) {
        from_picker.set("max", to_picker.get("select"));
      } else if ("clear" in event) {
        from_picker.set("max", false);
      }
    });
  });
});

$("#indDateBirth").pickadate({
  format: "dd mmm, yyyy",
  min: new Date(),
});

$(document).ready(function () {
  $(function () {
    var from_$input = $("#indi_to").pickadate(),
      from_picker = from_$input.pickadate("picker");

    var to_$input = $("#indi_from").pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var day = date_to.getDate();
    var monthIndex = date_to.getMonth();
    var year = date_to.getFullYear().toString();

    var formattedDate = day + " " + monthNames[monthIndex] + ", " + year;
    $("#indi_from").val(formattedDate);
  });
  $(function () {
    var from_$input = $("#indi_from").pickadate(),
      from_picker = from_$input.pickadate("picker");

    var to_$input = $("#indi_to").pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    from_picker.on("set", function (event) {
      if (event.select) {
        to_picker.set("min", from_picker.get("select"));
      } else if ("clear" in event) {
        to_picker.set("min", false);
      }
    });
    to_picker.on("set", function (event) {
      if (event.select) {
        from_picker.set("max", to_picker.get("select"));
      } else if ("clear" in event) {
        from_picker.set("max", false);
      }
    });
  });
});

// bussection

$(document).ready(function () {
  $(function () {
    var to_$input = $("#busDate").pickadate({
      format: "dd mmm, yyyy",
      min: new Date(),
    }),
      to_picker = to_$input.pickadate("picker");
    var date_to = new Date();
    var monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    var day = date_to.getDate();
    var monthIndex = date_to.getMonth();
    var year = date_to.getFullYear().toString();

    var formattedDate = day + " " + monthNames[monthIndex] + ", " + year;
    $("#busDate").val(formattedDate);
  });
});

$(document).ready(function () {
  $(".dropdown dt a").on("click", function () {
    $(".dropdown dd ul").slideToggle("fast");
    // $(".mutliSelect").show();
  });

  $(".dropdown dd ul li a").on("click", function () {
    $(".dropdown dd ul").hide();
  });

  function getSelectedValue(id) {
    return $("#" + id)
      .find("dt a span.value")
      .html();
  }

  $(document).bind("click", function (e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("dropdown")) {
      $(".dropdown dd ul").hide();
    }
  });
  $('.mutliSelect input[type="radio"]').on("click", function () {
    let title = "";
    let html = "";
    title = $(this).val();
    console.log(title);
    if ($(this).is(":checked")) {
      $(".mutliSelect")
        .find('input[type="radio"]')
        .not(this)
        .each(function () {
          $('span[title="' + $(this).val() + '"]').remove();
          $(this).prop("checked", false);
          $(this).attr("disabled", false);
        });
      html = '<span title="' + title + '">' + title + "</span>";
      $(".multiSel").append(html);
      $(".hida").hide();
      $(this).attr("disabled", true);
    } else {
      $('span[title="' + title + '"]').remove();
      var ret = $(".hida");
      $(".dropdown dt a").append(ret);
    }
    $(".mutliSelect ul").hide();
  });
});

// flight search page script

// price range scripte
const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 1000;

priceInput.forEach(input => {
  input.addEventListener("input", e => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if ((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach(input => {
  input.addEventListener("input", e => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if ((maxVal - minVal) < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
// price range scripte
$('ul.dropdown-menu.range_drop_down').on('click', function (event) {
  event.stopPropagation();
});

// About stops script
$(document).ready(function () {
  $('.check_flex, .flight-class-label').click(function () {
    $('.dropdown-menu').hide();
  });
  $('.flight-class-label').click(function () {
    $('.dropdown').removeClass('open');
  });
});
// About stops script

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');

  slides.forEach(slide => {
    slide.addEventListener('click', () => {
      // Remove all relevant classes before adding the new one
      document.body.classList.remove('umrah', 'tour', 'flights', 'hotels');

      // Add a new class based on the clicked slide's ID
      switch (slide.id) {
        case 'slide1':
          document.body.classList.add('umrah');
          break;
        case 'slide2':
          document.body.classList.add('flights');
          break;
        case 'slide3':
          document.body.classList.add('hotels');
          break;
        case 'slide4':
          document.body.classList.add('tour');
          break;
      }
    });
  });
});



