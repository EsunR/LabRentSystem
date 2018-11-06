$(document).ready(function () {
  $('.res_card_btn').click(function () {
    $('.select').empty();
    $("#reservation_panel").css("display", "block");
    $("#reservation_panel .model_auto_content").scrollTop("0");
    $("#reservation_panel").animate({ "opacity": "1" }, 500);







  })
  // 模拟数据 
  var instrument = {
    id: '1',
    serviceTime: '4', 
    sampleCount: '3', 
    servicetimeArray: ['51', '52', '71'] 
  }

  // 处理数据
  let time = parseInt(instrument.serviceTime);
  let count = parseInt(instrument.sampleCount);
  let time_arr = instrument.servicetimeArray;

  // 渲染按钮
  switch (time) {
    case 1:
      let tpl_1 = `
      <div class="res r-1"></div>
      <div class="res r-1"></div>
      <div class="res r-1"></div>
      <div class="res r-1"></div>
      `
      render(tpl_1);
      break;
    case 2:
      let tpl_2 = `
      <div class="res r-2"></div>
      <div class="res r-2"></div>
      `
      render(tpl_2)
      break;
    case 4:
      let tpl_4 = `
      <div class="res r-4"></div>
      `
      render(tpl_4)
      break;
  }

  function render(tpl) {
    for (let i = 0; i < time_arr.length; i++) {
      let pos_index = time_arr[i];
      let $pos = $("div[pos='" + pos_index + "']");
      $pos.html(tpl);
    }
  }

  // 为渲染出的按钮添加样式
  $(".res").each(function () {
    if ($(this).hasClass('r-1') || $(this).hasClass('r-2') || $(this).hasClass('r-4') || $(this).hasClass('r-8')) {
      $(this).parent().css('display', 'block');
      $(this).addClass('aviliable');
    }
  })
  $(".aviliable").html('<span>可预约</span>');
  $('.r-8').html('<span>可预约<br>(全天)</span>');
  $(".aviliable").hover(function () {
    $(this).css('background', '#FF5722');
    $(this).children('span').css('color', 'white');
  }, function () {
    $(this).css('background', '#D8D8D8');
    $(this).children('span').css('color', 'rgba(0, 0, 0, 0.7)');
  })

});