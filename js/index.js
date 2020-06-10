$(function () {
    // https://all-2486.github.io/  已上传个人网站
    $(".prediction-box li").on("click", function () {
        // 去掉初始下划线
        $(".prediction-box li").removeClass("active");
        $(this).addClass("active");
    })
    $(".prediction-box li").eq(0).on("click", function () {
        // console.log("a")
        $(".prediction-content").css("display", "block");
        $(".prediction-content1").css("display", "none");
    })
    $(".prediction-box li").eq(1).on("click", function () {
        $(".prediction-content").css("display", "none");
        $(".prediction-content1").css("display", "block");
        // console.log("b")
    })
    
    // 搜索
    $(".search-icon").on("click", function () {
        weathers($(".search-ipt").val());
        $(".search-ipt").val('')
    })
    //接口
    // https://apis.map.qq.com/ws/location/v1/ip
    // key
    // T4OBZ-G34WS-TGCOQ-6A3M3-RQUXV-YBBSP

    // 腾讯地图
    function positions() {
        $.ajax({
            type: "GET",
            url: "https://apis.map.qq.com/ws/location/v1/ip",
            data: {
                key: "T4OBZ-G34WS-TGCOQ-6A3M3-RQUXV-YBBSP",
                output: 'jsonp'
            },
            dataType: "jsonp",
            success: function (res) {
                console.log(res);
                console.log(res.result.ad_info.city);
                // 和风天气
                weathers(res.result.ad_info.city);//res.result.ad_info.city

            },
            error: function (err) {
                console.log(err);
            }
        })
    }




    //https://free-api.heweather.net/s6/weather/{weather-type}?{parameters}
    // e2e1f836a3b64e959008c019d2033f44

    // 和风天气

    function weathers(city) {
        $.ajax({
            type: "GET",
            url: "https://api.heweather.net/s6/weather",
            data: {
                location: city,
                key: "e2e1f836a3b64e959008c019d2033f44",
                // output:'jsonp',
            },
            // dataTpye:"jsonp",
            success: function (res) {
                console.log(res);
                let nowdata = res.HeWeather6[0].now;
                console.log(res.HeWeather6[0].status)
                if (res.HeWeather6[0].status === "unknown location") {
                    // alert("不是地名!!!");
                    return;
                }
                if (res.HeWeather6[0].status === "invalid param") {
                    // alert("没有输入地名!!!");
                    return;
                }
                
                // 设置所在位置
                $(".location-text").html(city);
                //分钟级降水
                precipitations(res.HeWeather6[0].basic.lon, res.HeWeather6[0].basic.lat);
                // console.log(res.HeWeather6[0].basic.lon, res.HeWeather6[0].basic.lat)

                // 设置实况天气
                $(".w").each(function () {
                    let str = $(this).attr('id')
                    // console.log(str)
                    $(this).html(nowdata[str])
                })
                // 最高 最低温度
                let max = res.HeWeather6[0].daily_forecast[0].tmp_max;
                let min = res.HeWeather6[0].daily_forecast[0].tmp_min;
                let temperature_data = `${max}°~${min}°`;
                $("#tmp_max").html(temperature_data);
                // 逐日预报
                let times = [];
                let temperature_dataes = [];
                let maxs;
                let mins;
                let img2 = [];
                let temperature_weather = [];
                for (let i = 0; i < 5; i++) {
                    let tim = res.HeWeather6[0].daily_forecast[i].date;
                    times.push(tim.substr(5))

                    maxs = res.HeWeather6[0].daily_forecast[i].tmp_max;
                    mins = res.HeWeather6[0].daily_forecast[i].tmp_min;
                    temperature_dataes.push(`${maxs}°~${mins}°`);

                    temperature_weather.push(res.HeWeather6[0].daily_forecast[i].cond_txt_d);

                    let imgdata2 = `./images/icons/${res.HeWeather6[0].daily_forecast[i].cond_code_d}.png`;
                    // console.log(imgdata2)
                    img2.push(imgdata2);
                }
                // console.log(temperature_weather);
                // console.log(times);
                // console.log(temperature_dataes);
                // console.log(img2);
                // 时间
                $(".time").each(function () {
                    let str = $(this).attr('id')
                    // console.log(str)
                    $(this).html(times[str])
                })
                // 天气
                for (let j = 0; j < 5; j++) {
                    $(".mate").eq(j).html(temperature_weather[j]);
                }
                // 图片
                for (let w = 0; w < 5; w++) {
                    $(".img_data2").eq(w).attr("src",img2[w]);
                    // console.log($(".img_data").eq(w).attr("src"))
                }
                // 温度
                for (let w = 0; w < 5; w++) {
                    $(".prediction_section").eq(w).html(temperature_dataes[w]);
                }

                // 逐时预报
                let times1 = [];
                let temperature_dataes1 = [];
                let tmps;
                let temperature_weather1 = [];
                let img = [];
                for (let i = 0; i < 5; i++) {
                    let tim1 = res.HeWeather6[0].hourly[i].time;
                    times1.push(tim1.substr(11))

                    tmps = res.HeWeather6[0].hourly[i].tmp;
                    temperature_dataes1.push(`${tmps}°`);

                    temperature_weather1.push(res.HeWeather6[0].hourly[i].cond_txt);

                    let imgdata = `./images/icons/${res.HeWeather6[0].hourly[i].cond_code}.png`;
                    img.push(imgdata);
                }
                // console.log(temperature_weather1);
                // console.log(times1);
                // console.log(temperature_dataes1);
                // console.log(img);
                
                // 时间
                for (let j = 0; j < 5; j++) {
                    $(".time1").eq(j).html(times1[j]);
                }
                // 天气
                for (let j = 0; j < 5; j++) {
                    $(".mate1").eq(j).html(temperature_weather1[j]);
                }
                // 图片
                for (let w = 0; w < 5; w++) {
                    $(".img_data").eq(w).attr("src",img[w]);
                    // console.log($(".img_data").eq(w).attr("src"))
                }
                // 温度
                for (let w = 0; w < 5; w++) {
                    $(".prediction_section1").eq(w).html(temperature_dataes1[w]);
                }
                
            },
            error: function (err) {
                console.log(err);


            }
        })
    }

    // 分钟级降水
    function precipitations(lat, lon) {
        $.ajax({
            type: "GET",
            url: "https://api.heweather.net/s6/weather/grid-minute",
            data: {
                location: lat + ',' + lon,
                key: "e2e1f836a3b64e959008c019d2033f44",
                // output:'jsonp',
            },
            // dataTpye:"jsonp",
            success: function (res) {
                console.log(res);
                // 设置分钟级降水
                let futuredata = res.HeWeather6[0].grid_minute_forecast.txt;
                $("#future").html(futuredata)
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    positions();
})