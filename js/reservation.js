$(document).ready(function () {
  // 获取时间
  const MorningTime = 8;  // 定义上午可以租借的开始时间
  const AfternoonTime = 14; // 定义下午可以租借的开始时间
  const [time_1, time_2, time_3, time_4] = [MorningTime, MorningTime + 4, AfternoonTime, AfternoonTime + 4];
  const now_time = new Date();
  const hh = now_time.getHours() < 10 ? "0" + now_time.getHours() : now_time.getHours().toString();
  const mm = now_time.getMinutes() < 10 ? "0" + now_time.getMinutes() : now_time.getMinutes().toString();

  // 截取详细信息
  for (let i = 0; i < $(".description_text").length; i++) {
    let description = $(".description_text")[i].innerText;
    if (description.length > 85) {
      $(".description_text")[i].innerText = description.substring(0, 85) + " ... ... ";
    }
  }

  // 模态框的显示与关闭
  // 用户点击 显示详细信息 按钮时弹出模态框
  $(".show_detail").click(function () {
    $("#model_show_detail").css("display", "block");
    $("#model_show_detail .model_auto_content").scrollTop("0");
    $("#model_show_detail").animate({ "opacity": "1" }, 500);
  });

  // 用户点击 close 按钮时关闭模态框
  $(".model_auto_close").click(function () {
    let $model_auto_box = $(this).parents(".model_auto_box");
    $model_auto_box.animate({ "opacity": "0" }, 500, function () {
      $model_auto_box.css({ "display": "none" });
    });
  })
  //用户点击模态框外部隐藏模态框
  $(".model_auto").click(function (e) {
    // 阻止冒泡
    e.stopPropagation();
  })
  $(".model_auto_box").click(function (e) {
    $(this).animate({ "opacity": "0" }, 500, function () {
      $(this).css({ "display": "none" });
    });
    return false;
  })



  
  // 预约模态框显示日期
  function get_date_json(AddDayCount) {
    let dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期  
    let week_index = dd.getDay();
    let month = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1).toString();//获取当前月份的日期，不足10补0  
    let day = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate().toString();//获取当前几号，不足10补0  
    let date_json = {
      week_index: week_index,
      month: month,
      day: day
    };
    return date_json;
  }
  // 将最近7天的日期信息按照 星期顺序（从周日开始） 存放在futer_date数组中
  var future_date = new Array(7);
  for (var i = 1; i < 8; i++) {
    let index = get_date_json(i).week_index;
    future_date[index] = get_date_json(i);
  }
  // 格式化 future_date （将周日的日期放在数组的最后一位，且将周日的week_index由原来的0改为7）
  future_date[0].week_index = 7;
  future_date = future_date.slice(1).concat(future_date.slice(0, 1));
  // 记录今天的week_index(如周三的week_index为3，做判断是为了要设置周日的week_index为7)
  var today_index = get_date_json(0).week_index == 0 ? 7 : get_date_json(0).week_index;
  // 渲染日期进度条
  $(".progress_bar")[today_index].innerHTML = '本周预约 <span class="mdi mdi-arrow-right-bold"></span>'
  if (today_index - 2 >= 0) {
    $(".progress_bar")[today_index - 1].innerHTML = '<span class="mdi mdi-arrow-left-bold"></span> 下周预约'
  }
  for (var i = 0; i < 7; i++) {
    let index = today_index - 1;
    if (i >= index + 1) {
      $(".progress_bar")[i].className += ' ' + 'this_week';
    } else {
      $(".progress_bar")[i].className += ' ' + 'next_week';
    }

  }
  // 渲染日期
  for (var i = 0; i < 7; i++) {
    let [month, day] = [future_date[i].month, future_date[i].day];
    $(".day")[i].innerText = month + '月' + day + '日';
  }
  // 时间进度条
  var time_flag = 0
  function parseTime(parse_time) {
    return parse_time < 10 ? '0' + parse_time.toString() : parse_time.toString();
  }
  $(".time_bar").each(function () {
    if (time_flag == 0) {
      $(this).children(".time_1").text(parseTime(MorningTime) + ':00');
      $(this).children(".time_2").text(parseTime(MorningTime + 2) + ':00');
      $(this).children(".time_3").text(parseTime(MorningTime + 4) + ':00');
      time_flag = 1;
    } else {
      $(this).children(".time_1").text(parseTime(AfternoonTime) + ':00');
      $(this).children(".time_2").text(parseTime(AfternoonTime + 2) + ':00');
      $(this).children(".time_3").text(parseTime(AfternoonTime + 4) + ':00');
    }
  })
  // 渲染进时间指示器位置
  $('#now_time_text').text(hh + ':' + mm);
  if ((hh >= time_1 && hh < time_2) || (hh >= time_3 && hh < time_4)) {
    $('#now_time').css('display', 'block');
    if (hh >= time_1 && hh < time_2) {
      let parse_time = (parseInt(hh) - time_1) * 60 + parseInt(mm);
      let add_top = 158 + (200 * parse_time) / 240 + 'px';
      $('#now_time').css('top', add_top);
    }
    else if (hh >= time_3 && hh < time_4) {
      let parse_time = (parseInt(hh) - time_3) * 60 + parseInt(mm);
      let add_top = 380 + (200 * parse_time) / 240 + 'px';
      $('#now_time').css('top', add_top);
    }
  }
  $('#time_now_text').hover(function () {
    $('#now_time_text').css('opacity', '1');
    $('.time_tag').css('opacity', '0');
  }, function () {
    $('#now_time_text').css('opacity', '0');
    $('.time_tag').css('opacity', '1');
  })



});