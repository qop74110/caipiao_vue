const ajax_url = {
  host: `${window.location.protocol}//test.api.lottery.anwenqianbao.com/`,
  api: {
    home_list: "v1/home/list",
    home_banner: "v1/home/banner",
    home_notice: "v1/home/notice",
    login_code: "v1/sms/getcode",
    login: 'v1/login/login',
    ssq_phase: "v1/ssq/purchase",
    
  }
};

export default ajax_url;
