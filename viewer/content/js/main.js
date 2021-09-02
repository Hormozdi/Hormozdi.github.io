function sendrequest(pid) {
    $.ajax({
        url: '../sendrequest',
        cache: false,
        type: "GET",
        data: { pid: pid},
        beforeSend: function () { },
        success: function (data) {
            $("#reqresult").html(data);
        },
        error: function () { }
    });
}
function GetReqInfo(id, num) {
    $.ajax({
        url: '../requestinfo',
        cache: false,
        type: "GET",
        data: { id: id, "num": num, "view": 1 },
        beforeSend: function () { },
        success: function (data) {
            $("#Inforequestresult").html(data);
        },
        error: function () { }
    });
}

window.onload = function () {
  'use strict';

  var Viewer = window.Viewer;
  var console = window.console || { log: function () {} };
  var pictures = document.querySelector('.docs-pictures');
  var toggles = document.querySelector('.docs-toggles');
  var buttons = document.querySelector('#scrollmenu');
  var options = {
    inline: true,
    url: 'data-original',
    ready: function (e) {
      console.log(e.type);
    },
    show: function (e) {
      console.log(e.type);
    },
    shown: function (e) {
      console.log(e.type);
    },
    hide: function (e) {
      console.log(e.type);
    },
    hidden: function (e) {
      console.log(e.type);
    },
    view: function (e) {
      console.log(e.type);
    },
    viewed: function (e) {
      console.log(e.type);
    },
    zoom: function (e) {
      console.log(e.type);
    },
    zoomed: function (e) {
      console.log(e.type);
    }
  };
  var viewer = new Viewer(pictures, options);

  function toggleButtons(mode) {
    var targets;
    var target;
    var length;
    var i;

    if (/modal|inline|none/.test(mode)) {
      targets = buttons.querySelectorAll('button[data-enable]');

      for (i = 0, length = targets.length; i < length; i++) {
        target = targets[i];
        target.disabled = true;

        if (String(target.getAttribute('data-enable')).indexOf(mode) > -1) {
          target.disabled = false;
        }
      }
    }
  }

  function addEventListener(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    }
  }

  toggleButtons(options.inline ? 'inline' : 'modal');



  buttons.onclick = function (event) {
    var e = event || window.event;
    var button = e.target || e.srcElement;
    var method = button.getAttribute('data-method');
    var target = button.getAttribute('data-target');
    var args = JSON.parse(button.getAttribute('data-arguments')) || [];

    if (viewer && method) {
      if (target) {
        viewer[method](document.querySelector(target).value);
      } else {
        viewer[method](args[0], args[1]);
      }

      switch (method) {
        case 'scaleX':
        case 'scaleY':
          args[0] = -args[0];
          break;

        case 'destroy':
          viewer = null;
          toggleButtons('none');
          break;
      }
    }
  };

};


//on pressing return, addImage() will be called


// editing image via css properties
function editImage() {
	var br 		 = $("#br").val();      // brightness
	var ct 		 = $("#ct").val();      // contrast
	var invert 	 = $("#invert").val();  //invert
	var filter = 	'brightness(' + br +
			'%) contrast(' + ct +
			'%) invert(' + invert +
			'%)';

    $(".viewer-move").css("filter", filter);
    $(".viewer-move").css("-webkit-filter", filter);
    $("#Brightness_value").text(br - 100);
    $("#Contrast_value").text(ct - 100);
}
function invertfunc() {
    var inv = $("#invert").val();
    if (inv == 0) {
        $("#invert").val("100");
        editImage();
        $("#inverticon").css("border", "3px solid transparent").css("border-radius", "3px");
    } else {
        $("#invert").val("0");
        editImage();
        $("#inverticon").css("border", "0px solid transparent").css("border-radius", "0px");
    }

}
//When sliders change image will be updated via editImage() function
$("input[type=range]").change(editImage).mousemove(editImage).bind('touchmove', editImage);
$('html')
// Reset sliders back to their original values on press of 'reset'
$('#reset').on('click', function () {
    setTimeout(function () {
        $("#br").val("100");      // brightness
        $("#ct").val("100");      // contrast
        $("#invert").val("0");
        editImage();
        $("#inverticon").css("border", "0px solid transparent").css("border-radius", "0px");

	},0);
});
function Brightness_reset() {
    $("#br").val("100"); 
    editImage();
}
function Contrast_reset() {
    $("#ct").val("100");
    editImage();
}
//---------------------------------------------------------------------------------------------//

var baz = 1;
$(document).ready(function () {
    $(document).on('click', '.cta', function () {
        $(this).toggleClass('active');
        if (baz == 0) {
            $('#main').css('padding-right', '200px');
            baz = 1;

        } else {
            $('#main').css('padding-right', '0px');
            baz = 0;
        }

    })
});


$(document).ready(function () {
    $(".hamburger").click(function () {
        $('.sidebar-menu').removeClass("flowHide");
        $(".sidebar-menu").toggleClass("full-side-bar");
        $('.nav-link-name').toggleClass('name-hide');

    });
});

$(document).ready(function () {
    $(".nav-link").hover(function () {
        $('.sidebar-menu').removeClass("flowHide");
        $(this).addClass('tax-active');

    }, function () {
        $('.sidebar-menu')
            .addClass("flowHide");
        $(this).removeClass('tax-active');

    });
});

if (screen.width > 775) {
function magnify(reset) {
    
    var imgglass = document.getElementById("imgglass");
    if (imgglass === null && reset === 1) {
        $("#rotateright").hide();
        $("#rotateright_disabaled").show();
        $("#rotateleft").hide();
        $("#rotateleft_disabaled").show();
        $("#fliph").hide();
        $("#fliph_disabaled").show();
        $("#flipv").hide();
        $("#flipv_disabaled").show();
        
    var native_width = 0;
    var native_height = 0;
    var mouse = { x: 0, y: 0 };
    var magnify;
    var cur_img;

    var ui = {
        magniflier: $('.viewer-move')
    };

    if (ui.magniflier.length) {
        var div = document.createElement('div');
        div.setAttribute('class', 'glass');
        div.setAttribute('id', 'imgglass');
        ui.glass = $(div);

        $('.viewer-canvas').append(div);
    }



    var mouseMove = function (e) {
        var $el = $(this);

        var magnify_offset = cur_img.offset();


        mouse.x = e.pageX - magnify_offset.left;
        mouse.y = e.pageY - magnify_offset.top;

        if (
            mouse.x < cur_img.width() &&
            mouse.y < cur_img.height() &&
            mouse.x > 0 &&
            mouse.y > 0
        ) {

            magnify(e);

        }
        else {
            ui.glass.fadeOut(100);
        }

        return;
    };

        var magnify = function (e) {
        
        var rx = Math.round(mouse.x / cur_img.width() * native_width - ui.glass.width() / 2) * -1;
        var ry = Math.round(mouse.y / cur_img.height() * native_height - ui.glass.height() / 2) * -1;
        var bg_pos = rx + "px " + ry + "px";

        var glass_left = e.pageX - ui.glass.width() / 1.8;
        var glass_top = e.pageY - ui.glass.height() / 1.4;

        ui.glass.css({
            left: glass_left,
            top: glass_top,
            backgroundPosition: bg_pos
        });

        return;
    };



    $('.viewer-move').on('mousemove', function () {
        
        
        ui.glass.fadeIn();

        cur_img = $(this);

        var large_img_loaded = cur_img.data('large-img-loaded');
        var src = cur_img.data('large') || cur_img.attr('src');

        var br = $("#br").val();      // brightness
        var ct = $("#ct").val();      // contrast
        var invert = $("#invert").val();  //invert
        if (src) {
            ui.glass.css({
                'background-image': 'url(' + src + ')',
                'background-repeat': 'no-repeat',
                'transform': 'scale(1.5)',
                'filter': 'brightness(' + br +
                    '%) contrast(' + ct +
                    '%) invert(' + invert +
                    '%)'
            });
        }



        if (!cur_img.data('native_width')) {

            var image_object = new Image();

            image_object.onload = function () {


                native_width = image_object.width;
                native_height = image_object.height;

                cur_img.data('native_width', native_width);
                cur_img.data('native_height', native_height);

                mouseMove.apply(this, arguments);

                ui.glass.on('mousemove', mouseMove);
            };


            image_object.src = src;

            return;
        } else {

            native_width = cur_img.data('native_width');
            native_height = cur_img.data('native_height');
        }


        mouseMove.apply(this, arguments);

        ui.glass.on('mousemove', mouseMove);
    });

    ui.glass.on('mouseout', function () {
        ui.glass.off('mousemove', mouseMove);
    });
        $("#magnifyicon").css("border", "3px solid transparent").css("border-radius", "3px");
        ui.glass.dblclick(function () {
            $("#imgglass").remove();
            $("#magnifyicon").css("border", "0px solid transparent").css("border-radius", "0px");
            $("#rotateright").show();
            $("#rotateright_disabaled").hide();
            $("#rotateleft").show();
            $("#rotateleft_disabaled").hide();
            $("#fliph").show();
            $("#fliph_disabaled").hide();
            $("#flipv").show();
            $("#flipv_disabaled").hide();
        });

        
    } else {
        $("#imgglass").remove();
        $("#magnifyicon").css("border", "0px solid transparent").css("border-radius", "0px");
        $("#rotateright").show();
        $("#rotateright_disabaled").hide();
        $("#rotateleft").show();
        $("#rotateleft_disabaled").hide();
        $("#fliph").show();
        $("#fliph_disabaled").hide();
        $("#flipv").show();
        $("#flipv_disabaled").hide();
    }
    }
}
var popoverID = null;
var PopoverPlacement = null;
$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        html: true,
        sanitize: false,
        content: function () {
            popoverID = $(this).data('bs.popover').tip.id;
            //dragElement(document.getElementById("ReportElement"), document.getElementById(popoverID));
            var content = $(this).attr("data-popover-content");
            return $(content).children(".popover-body").html();
            
        },
        title: function () {
            
            var title = $(this).attr("data-popover-content");
            return $(title).children(".popover-heading").html();
            
        }
    });



});
$(document).ready(function () {
    $('.btn-pop').popover();
    $('.btn-pop').on('click', function (e) {
        //alert(popoverID);
        //dragElement(document.getElementById("ReportElement"), document.getElementById(popoverID));
        $('.btn-pop').not(this).popover('hide');

    });
});

dragElement(document.getElementById("ReportElement"), document.getElementById("TopReportElement"));
//dragElement(document.getElementById("TopReportElement"));
function dragElement(elmnt,elmnt2) {
    if (!elmnt) {
        return null;
    }
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id)) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id).onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        $("#" + popoverID).popover('show');
            $("#TopReportElement").hide();
 
        
        
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function EnabaleMesialEX() {
    $(".MesialEX").toggle();
}
function EnabaleDistalEX() {
    $(".DistalEX").toggle();
}



//$('body').on('click', function (e) {
//    $('[data-toggle=popover]').each(function () {
//        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//            $(this).popover('hide');
//        }
//    });
//});
$(function () {
    $(document).on('click', ".btnReportImg", function () {
        var img = "/img/dentalreport/Active" + $(this).attr("DataID") + ".png";
        var h1 = $(this).last();
        var offset = h1.offset();
        var top = offset.top;
        var left = offset.left;
        if ( img == $(this).attr("src")) {
            $(this).attr("src", "/img/dentalreport/" + $(this).attr("DataID") + ".png");
            $("#" + $(this).attr("data-x") + $(this).attr("data-y") + $(this).attr("DataID")).attr("src", "/img/dentalreport/" + $(this).attr("DataID") + ".png");
        } else {
            $(this).attr("src", img);
            $("#" + $(this).attr("data-x") + $(this).attr("data-y") + $(this).attr("DataID")).attr("src", "/img/dentalreport/Active" + $(this).attr("DataID") + ".png");
            $("#TopReportElement").show();
            document.getElementById("TopReportElement").style.left = left-250 +"px";
            document.getElementById("TopReportElement").style.top = top-220 + "px";
        }
        
    });
});

function CloseCaries() {
    $("#TopReportElement").fadeOut();
}







   
    






