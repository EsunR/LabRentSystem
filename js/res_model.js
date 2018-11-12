$(document).ready(function () {
  // res_time: 某样品某一时间段的预约时间
  // res_count: 该样品当前时间段可预约的数量
  var res_time, res_count, instrument;

  $('.res_card_btn').click(function () {
    // 0. 清除原有的表格数据
    $('.select').empty();
    // 1. 显示模态框
    $('#model_submit_box').animate({ "opacity": "0" }, 200, function () {
      $('#model_submit_box').css({ "display": "none" });
    });
    $("#reservation_panel").css("display", "block");
    $("#reservation_panel").animate({ "opacity": "1" }, 200);

    let id = parseInt($(this).attr('id'));

    // 2. 获取当前仪器的信息
    // TODO: Ajax GET 数据 ============================================== 数据入口
    switch (id) {
      case 1:
        instrument = {
          id: '1',
          serviceTime: '1',
          sampleCount: '4',
          servicetimeArray: ['11', '12', '21', '62', '71', '72']
        };
        break;
      case 2:
        instrument = {
          id: '2',
          serviceTime: '2',
          sampleCount: '4',
          servicetimeArray: ['12', '21','32', '62', '71']
        };
        break;
    }
    console.log(instrument);
    // 3. 渲染预约表格
    Render(instrument);

  })


  function Render(instrument) {
    // 1. 处理数据
    const ins_id = parseInt(instrument.id);
    const time = parseInt(instrument.serviceTime);  // 服务时间规格
    const count = parseInt(instrument.sampleCount); // 可预约样本数量
    const time_arr = instrument.servicetimeArray;   // 可预约时间段

    // 2. 渲染按钮
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
      case 8:
        let tpl_8 = `
    <div class="res r-8"></div>
    `
        // ['11', '12', '21', '62', '71', '72']
        for (let i = 0; i < time_arr.length; i++) {
          let pos_index = parseInt(time_arr[i]);
          let pos_index_next = parseInt(time_arr[i + 1]);
          if (pos_index + 1 == pos_index_next) {
            let $pos = $("div[pos='" + pos_index + "']");
            $pos.html(tpl_8);
            i++;
          }
        }
        break;
    }
    // 方法：判定要渲染的模板位置
    function render(tpl) {
      for (let i = 0; i < time_arr.length; i++) {
        let pos_index = time_arr[i];
        let $pos = $("div[pos='" + pos_index + "']");
        $pos.html(tpl);
      }
    }

    // 3. 为渲染出的按钮添加时间属性
    $(".select").each(function () {
      // pos - 位置信息
      let pos = $(this).attr('pos');
      // date_pos - pos表示的星期部分
      let date_pos = parseInt(pos / 10) - 1;
      // 获取当天日期存放在date_str中
      let date_str = future_date[date_pos].year + '-' + future_date[date_pos].month + '-' + future_date[date_pos].day;
      $(this).children('.res').each(function (i) {
        // time_pos - pos表示的上午下午的部分
        time_pos = pos % 10;
        switch (time) {
          case 1:
            SetTime($(this), i, time_pos, date_str);
            break;
          case 2:
            SetTime($(this), i, time_pos, date_str);
            break;
          case 4:
            SetTime($(this), i, time_pos, date_str);
            break;
          case 8:
            SetTime($(this), i, time_pos, date_str);
            break;
        }
      })
    })
    // 方法：用来为单个按钮设置时间属性
    function SetTime(obj, i, time_pos, date_str) {
      i = i * time;
      if (time_pos == 1) {
        let attr_time = date_str + " " + (MorningTime + i) + ":00-" + (MorningTime + i + time) + ":00";
        obj.attr('time', attr_time);
      } else {
        let attr_time = date_str + " " + (AfternoonTime + i) + ":00-" + (AfternoonTime + i + time) + ":00";
        obj.attr('time', attr_time);
      }
    }


    // 4. 为 可预约按钮 和 不可预约按钮 添加不同的交互效果
    $(".res").each(function () {
      let date_time = $(this).attr('time');
      if ($(this).hasClass('r-1') || $(this).hasClass('r-2') || $(this).hasClass('r-4') || $(this).hasClass('r-8')) {
        $(this).parent().css('display', 'block');
        // 判断该时间段是否可被预约
        if (checkTimes(ins_id, date_time) >= count) {
          $(this).addClass('disable');
        } else {
          $(this).addClass('aviliable');
        }
      }
    })
    $(".aviliable").html('<span>可预约</span>');
    $('.r-8').html('<span>可预约<br>(全天)</span>');
    $(".disable").html('<span>不可预约</span>');
    $(".aviliable").hover(function () {
      $(this).css('background', '#FF5722');
      $(this).children('span').css('color', 'white');
    }, function () {
      $(this).css('background', '#D8D8D8');
      $(this).children('span').css('color', 'rgba(0, 0, 0, 0.7)');
    })

    // 5. 显示二级模态框
    $('.aviliable').click(function () {
      res_time = $(this).attr('time');
      res_count = count - checkTimes(ins_id, res_time);
      // 渲染二级模态框文字内容
      $('#res_time').text(res_time);
      $('#res_count').text(res_count);
      // 显示二级模态框
      $("#model_submit_box").css("display", "block");
      $("#model_submit_box").animate({ "opacity": "1" }, 200);
    })

  }


  // 提交按钮
  // 4. 点击"提交预约"按钮, 处理POST的信息
  $('#res_sure_btn').click(function () {
    // 为传出数据做好准备
    let post_id = instrument.id;                //预约仪器的ID
    let post_time = res_time;                   //预约时间
    let post_count = $('#res_sure_text').val(); //预约数量
    // 输入校验
    if (/^\d+$/.test(post_count) && post_count != 0) {
      if (post_count > res_count) {
        $('#alert').text("预约数量大于现有的样本数量！")
        $('#alert').fadeIn(200).delay(1300).fadeOut(200);
        $('#res_sure_text').val('');
        return false;
      } else {
        // TODO: Ajax POST 数据  ====================================== 数据出口
        instrument.sampleCount -= post_count;
        let post_data = {
          id: post_id,      // 预约样品的ID
          time: post_time,  // 预约的时间
          count: post_count // 预约的数量
        }
        console.log('post_data: ', post_data);
      }
    } else {
      $('#alert').text("数量填写格式错误！")
      $('#alert').fadeIn(200).delay(1000).fadeOut(200);
      $('#res_sure_text').val('');
      return false;
    }
    // 隐藏模态框
    $('#model_submit_box').animate({ "opacity": "0" }, 200, function () {
      $('#model_submit_box').css({ "display": "none" });
    });
    // 同步刷新预约表格
    $('#res_sure_text').val('');
    Render(instrument);
  })


  // TODO: 插入checkTimes函数
  function checkTimes(id, dateTime) {
    return 0;
  }


});