$(document).ready(function () {
    // 用户点击 取消 按钮时弹出模态框
    $(".btn_table").click(function () {
        $("#model_box").css("display", "block");
        $("#model_box").animate({"opacity":"1"}, 500);
    });

     // 用户点击 确定取消预约 时进行的操作
    $("#model_true").click(function(){
        window.location.href = "./my_reservation.html";
    });

    // 用户点击 返回 按钮时隐藏模态框
    $("#model_false").click(function () { 
        $("#model_box").animate({"opacity":"0"}, 500, function(){
            $("#model_box").css({"display":"none"});
        });
        return false;
    });

    // 用户点击操作外围外时隐藏模态框
    $("#model").click(function (e) { 
        // 阻止冒泡
        e.stopPropagation();
     })
    $("#model_box").click(function(e){
        $("#model_box").animate({"opacity":"0"}, 500, function(){
            $("#model_box").css({"display":"none"});
        });
        return false;
    })
    
});