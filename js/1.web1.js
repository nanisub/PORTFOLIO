$(document).ready(function(){

    //////////////// 레이어팝업 //////////////////
    //오늘열지않음,닫기버튼
    $('.close, .today_cl, .ck_box').click(function(){
        $('.layer_popup').css({
            display: 'none'
        })
    });
    //호버하면 큰배너로보이기
    $('.min_ban1').hover(function(){
        $('#pop_big_ban').children().attr('src','img/mini_banner/pop_banner1.jpg')
    },function(){$('#pop_big_ban').children().attr('src','img/mini_banner/moving_banner.gif')})



    
    //////////////// 메뉴100% //////////////////
    $('.menu').mouseenter(function(){
        // console.log('들어왔')
        $('.menu_hover_outer').stop().animate({
            height : '310px'
        }, 300)
    });
    $('.menu').mouseleave(function(){
        // console.log('나갔')
        $('.menu_hover_outer').stop().animate({
            height : 0
        },300)
    });

    //////////////// 슬라이드 //////////////////
    let index_no = 1;
    let ban_length = $('.ban_r').length;
    let timer = 2000;
    let inter;
    //최초위치
    $('.ban_r').eq(0).css({left: 0});
    $('.dot').eq(0).addClass('active');
    //슬라이드함수
    function slide(coming_i, coming_pos, outing_i, outing_pos) {
        $('.ban_r').eq( coming_i ).css({left: coming_pos}).animate({
            left: 0
        }, timer, 'linear');
        
        $('.ban_r').eq( outing_i ).animate({
            left: outing_pos
        }, timer, 'linear');

        $('.dot').eq(outing_i).removeClass('active');
        $('.dot').eq(coming_i).addClass('active');
    }
    //버튼막기
    let dot_init_st;
    let ban_l_init_st;
    function btn_init() {
        $('.dot').css('pointerEvents', 'none');
        // clearInterval(dot_init_st);
        dot_init_st = setTimeout(function(){
            $('.dot').css('pointerEvents', 'auto');
        },timer)
        
        $('.ban_l').css('pointerEvents', 'none');
        // clearInterval(ban_l_init_st);
        ban_l_init_st = setTimeout(function(){
            $('.ban_l').css('pointerEvents', 'auto');
        },timer)
    }
    //자동슬라이드함수
    function auto_slide() {
        btn_init()
        inter = setInterval(function(){
            slide(index_no % ban_length, '100%', (index_no - 1) % ban_length, '-100%');
            index_no+=1;
        }, timer + 1000);
    }
    //도트인디케이터 클릭
    $('.dot').click(function(){
        btn_init()
        if($('.dot.active').index() > $(this).index()) {
            slide($(this).index(), '-100%', $('.dot.active').index(), '100%');
        }
        else {
            slide($(this).index(), '100%', (index_no-1) % ban_length, '-100%');
        }
        index_no = $(this).index() + 1;
    })
    //왼쪽 배너 클릭
    $('.ban_l').click(function(){
        btn_init()
        slide($(this).index(), '100%', (index_no-1) % ban_length, '-100%');
        index_no = $(this).index() + 1;
    })

    auto_slide()
    //배너 영역호버시 멈춤
    $('.banner_outer').hover(function(){
        clearInterval(inter)
    }, function(){
        auto_slide()
    })

});