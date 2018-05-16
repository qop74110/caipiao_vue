const scroll = {
    time: null,
    //滚动条在Y轴上的滚动距离
    getScrollTop  () {
        let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },

    //文档的总高度
    getScrollHeight () {
        let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },

    //浏览器视口的高度
    getWindowHeight ()  {
        let windowHeight = 0;
        if (document.compatMode == "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },

    fun(){
        if (scroll.time !== null) {
            clearTimeout(scroll.time);
            scroll.time = null;
        }
        const _this = scroll;
        scroll.time = setTimeout(() => {
            const scrollHeight = _this.getScrollHeight();
            const scrollTop = _this.getScrollTop();
            const windowHeight = _this.getWindowHeight();

            if (scrollTop + windowHeight === scrollHeight) {
                if (_this.callBack) _this.callBack();
            }
        }, 100);

    }
};

export default scroll;
