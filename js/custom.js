$(function(){
    var i = 0;
    var win_w = $(window).width();
    $(window).on('resize', function(){
        win_w = $(this).width();
    });
    
    $('#header .menu>li').on('mouseenter', function () {
        
        var i = $(this).index();
        var last_idx = $('#header .menu>li').length - 1 ;
        
        
        if(win_w>=1024){
            $(this).addClass('on').siblings().removeClass('on');
            $('.bgGnb').addClass('on');    
        }else{
            
            $('#header .menu>li>a').off('click');
            $('#header .menu>li>a').on('click', function(){
                $('.sub').stop().slideUp();
                $(this).next('.sub').stop().slideToggle();
            });
            
        }
        
        if(i == last_idx){
            $('#header .menu>li').eq(last_idx).removeClass('on');
            $('.bgGnb').removeClass('on');    
        }
    });
    
    
    $('#header .bgGnb').on('mouseleave', function () {
        
        $('#header .menu>li').removeClass('on');
        $('.bgGnb').removeClass('on');
    });
    
    
    $(window).on('scroll', function () {
        
        var scroll = $(this).scrollTop();
             
         if(scroll >= 50){
            $('#header').addClass('on');
         }else{
            $('#header').removeClass('on'); 
         }
        
        
    });
    
    $('.btn_toggle').on('click',function(){
        $('.menu').stop().toggleClass('on');
        $('.btn_toggle').toggleClass('on');
        if ($('.menu').hasClass('on')) {
            $('.btn_toggle>i').removeClass('fa-bars');
            $('.btn_toggle>i').addClass('fa-arrow-left');
        }
        else {
            $('.btn_toggle>i').addClass('fa-bars');
            $('.btn_toggle>i').removeClass('fa-arrow-left');
        }
    });
    
    $('.frame').each(function(frame_num){
       
        // 변수선언
        
        var             
            html_txt = '',
            len = $('.slide>li').length,
            i = 0,
            next_idx = i + 1,
            prev_idx = len - 1,
            loop;
        var $frame = $(this),
            $slide_box = $frame.children('.slide'),
            $slide = $slide_box.children('li'),
            $prev = $frame.children('.btn_prev'),
            $next = $frame.children('.btn_next'),
            $navi = $frame.children('.navi');

        
        // 초기셋팅
        
        $('.slide>li').each(function(i){
            // 슬라이드 위치 배열
            $(this).css('left', (i * 100) + '%');
        });
    
        
        // 함수선언
//        1) slide 이동 - .stop.animate();
//        2) 네비 업데이트 - addClass / removeClass
//        3) prev 버튼 - if
//        4) next 버튼 - if
//        5) 자동슬라이드 이동 - 무한반복 - setInterval
//        6) 자동슬라이드 중지 - clearInterval
        
        
        function slide_move(){
            index_update();
            $('.slide').stop().animate({'left':(i * -100) + '%'}, 1000);
        }
        
        function index_update(){
            var page = (i + 1) +' / '+len;
            $('.num').text(page);
        }
        
        function prev_idx_update(index){
            (index == 0 ) ? index = len : index ;
            index--;
            return index;
        }        
        
        function next_idx_update(index){
            
            index++;
            (index == len ) ? index = 0 : index ;
            
            return index;
        }        
        
        
        function prev(){
            stop();
            i = prev_idx_update(i);
            slide_move(); 
            start();
        }

        function next(){ 
            stop();
            i = next_idx_update(i);
            slide_move();
            start();
        }               
        
        function start(){
            loop = setInterval(next, 4000);
        }
        
        function stop(){
            clearInterval(loop);
        }
        function num(){
            
        }
        
        // 이벤트 연결
        
        $('.btn_prev').on('click', prev);
        $('.btn_next').on('click', next);
        $('.btn_auto').on('click', start);
        $('.btn_stop').on('click', stop);

        // 초기실행
        
        console.log(start);
        start();
        
    });
});