$(function () {
    $('.select_card').hover(
        function () { 
            $(this).animate( {
                'backgroundColor': '#29b6f6',
                'opacity': 1
            } , 500 );
        },
        function () {
            $(this).animate( {
                'backgroundColor': 'black',
                'opacity': 0.6
            } , 100 );
        }
    );
    
    $('#reservation').click(function (e) { 
        e.preventDefault();
        window.location.href='reservation.html';
    });

    $('#my_reservation').click(function (e) { 
        e.preventDefault();
        window.location.href='my_reservation.html';
    });

    $('#history').click(function (e) { 
        e.preventDefault();
        window.location.href='history.html';
    });

})