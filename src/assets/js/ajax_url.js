const ajax_url = {
  host: `${window.location.protocol}//test.api.lottery.anwenqianbao.com/`,
  api: {
    home_list: "v1/home/list",          //  首页-产品列表
    home_banner: "v1/home/banner",      //  首页-banner
    home_notice: "v1/home/notice",      //  首页-消息通知
    login_code: "v1/sms/getcode",       //  登录获取验证码
    login: 'v1/login/login',            //  登录|| 注册
    ssq_phase: "v1/ssq/purchase",       //  双色球顶部购买的奖期以及截止时间
    ssq_random: "v1/ssq/multi",         //  双色球-多期机选
    ssq_miss: "v1/ssq/miss",            //  双色球-显示遗漏
  }
};

export default ajax_url;
