$(document).ready(function(){
    var mouseX = 0;
    var mouseY = 0;
    var first = $('.firstname');
    var last = $('.lastname');
    var title = $('.hello p');
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");

    particlesInit();
    formInit();

    $('.navburger').click(function(){
      $(this).toggleClass('close');
      $('nav').toggleClass('open');
    });

    $('nav ul li a').click(function(e){
      e.preventDefault();
      var clicked = $(this);
      $('.navburger').click();
      $('body,html').delay(300).animate({
        'scrollTop' : $(clicked.attr('href')).offset().top,
      }, 1500);
    });

    var nameInfo = new Array();

    getNameInfo();

    function getNameInfo () {
        var firstX = first.offset().left - (windowWidth / 2) + 300;
        var firstY = first.offset().top - (windowHeight / 2) + 100;
        var firstFactor = 0.01;
        var firstArray = new Array();
        firstArray.push(first, firstX, firstY, firstFactor);
        nameInfo.push(firstArray);

        var lastX = last.offset().left - (windowWidth / 2) + 300;
        var lastY = last.offset().top - (windowHeight / 2) + 135;
        var lastFactor = 0.025;
        var lastArray = new Array();
        lastArray.push(last, lastX, lastY, lastFactor);
        nameInfo.push(lastArray);

        var titleX = title.offset().left - (windowWidth / 2) + 300;
        var titleY = title.offset().top - (windowHeight / 2) + 100;
        var titleFactor = 0.01;
        var titleArray = new Array();
        titleArray.push(title, titleX, titleY, titleFactor);
        nameInfo.push(titleArray);
    }

    if (!isMobile.matches) {
        $('header').mousemove(function(e){
            getXY(e);
        }); 
    }

    function getXY (e) {
        mouseX = e.clientX + document.body.scrollLeft
        mouseY = e.clientY + document.body.scrollTop

        moveName(mouseX, mouseY);

        return true
    }

    function moveName (mouseX, mouseY) {
        for (var i=0;i<nameInfo.length;i++)
        {
            var yourDivPositionX = nameInfo[i][3] * (0.5 * windowWidth - mouseX) + nameInfo[i][1];
            var yourDivPositionY = nameInfo[i][3] * (0.5 * windowHeight - mouseY) + nameInfo[i][2];
            nameInfo[i][0].css('left', yourDivPositionX + 'px');
            nameInfo[i][0].css('top', yourDivPositionY + 'px');
        }
    }

    var count = 0;

    function calcSkills () {
        var backend = $('.backend .bar').eq(count);
        var frontend = $('.frontend .bar').eq(count);

        countUp(frontend);
        frontend.animate({
            width : (frontend.data('score') * 10) + '%',
            padding : '0 10px'
        }, 400, 'easeOutBack');

        countUp(backend);
        backend.animate({
            width : (backend.data('score') * 10) + '%',
            padding : '0 10px'
        }, 400, 'easeOutBack', function(){
            count ++;
            calcSkills();
        });
    }

    function countUp(holder) {
        var countTo = holder.data('score') + 1;
        $({countNum: 0}).animate({countNum: countTo}, {
          duration: 400,
          easing:'linear',
          step: function() {
            holder.parent().find('.scores figure').eq(count).html(Math.floor(this.countNum));
          },
          complete: function() {
            holder.parent().find('.scores figure').eq(count).html(holder.data('score'));
          }
        });
    }

    function showWork() {
        $('.projects > li').delay(400).each(function(i){
            var _this = $(this);
            _this.delay(400 * i).queue(function(){
                _this.addClass('show');
            });
        });
    }

    function showSocial() {
      $('a.social').delay(300).each(function(i){
            var _this = $(this);
            _this.delay(200 * i).animate({
              right : '-15px'
            }, 300, 'easeOutBack');
        });
    }

    var controller = new ScrollMagic();

    var skytween = TweenMax.fromTo('.hello', 0.5, { 'top': '0' }, { 'top': '-100%' });

    var skyscene = new ScrollScene({
      duration: $(window).height(),
    }).setTween(skytween).addTo(controller);

    var bioscene = new ScrollScene({
      triggerElement: '#me',
      duration: $(window).height(),
    }).addTo(controller).on('enter', function(){
      $('#me h1, #me p').addClass('active');
    }).on('leave', function(){
      $('#me h1, #me p').removeClass('active');
    });

    var skillTween = TweenMax.to('#skills', 0.5, { 'margin-top': '0' });

    var skillTrigger = new ScrollScene({
      triggerElement: '#skills',
      duration: $(window).height()
    }).setTween(skillTween).addTo(controller).on('enter', function(e){
      calcSkills();
    });

    var wokTween = new TimelineMax().add([
      TweenMax.to('#skills h2', 0.5, { 'margin-bottom': '-100px' })
    ]);

    var workTrigger = new ScrollScene({
      triggerElement: '#work',
      duration: $(window).height()
    }).setTween(wokTween).addTo(controller).on('enter', function(e){
      showWork();
    });

    var interestTween = TweenMax.fromTo('#interests', 0.5, { 'background-position-y': '0'}, { 'background-position-y': '50' });

    var interestTrigger = new ScrollScene({
      triggerElement: '#interests',
      duration: $(window).height()
    }).setTween(interestTween).addTo(controller);

    var contactTrigger = new ScrollScene({
      triggerElement: '#contact'
    }).addTo(controller).on('enter', function(e){
      showSocial();
    });

    $(window).load(function(){
      setTimeout(function(){
        $('.star').addClass('shoot');
      }, 3000);
      $('.loader').fadeOut(800);
    });

});

function particlesInit() {
  particlesJS('intro', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.8,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 1.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 5,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": true,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 100,
          "size": 3,
          "duration": 1,
          "opacity": 3,
          "speed": 2
        },
        "repulse": {
          "distance": 300,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

function formInit() {
  function SVGInput( el, options ) {
    this.el = el;
    this.inputEl = this.el.querySelector( 'input' );
    this.init();
  }

  SVGInput.prototype.init = function() {
    this.shapeEl = this.el.querySelector( 'span.morph-shape' );

    var s = Snap( this.shapeEl.querySelector( 'svg' ) );
    this.pathEl = s.select( 'path' );
    this.paths = {
      reset : this.pathEl.attr( 'd' ),
      active : this.shapeEl.getAttribute( 'data-morph-active' )
    };

    this.initEvents();
  };

  SVGInput.prototype.initEvents = function() {
      this.el.addEventListener( 'click', this.toggle.bind(this) );
  };

  SVGInput.prototype.down = function() {
    this.pathEl.stop().animate( { 'path' : this.paths.active }, 150, mina.easein );
  };

  SVGInput.prototype.up = function() {
    this.pathEl.stop().animate( { 'path' : this.paths.reset }, 1000, mina.elastic );
  };

  SVGInput.prototype.toggle = function() {
    var self = this;

    this.pathEl.stop().animate( { 'path' : this.paths.active }, 200, mina.easein, function() {
      self.pathEl.stop().animate( { 'path' : self.paths.reset }, 600, mina.elastic );
    } );
  };

  [].slice.call( document.querySelectorAll( '.input-wrap' ) ).forEach( function( el ) {
    new SVGInput( el );
  } );
}



