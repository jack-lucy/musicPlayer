window.addEventListener("load",function () {
    var app =new Vue({
        el:".player",
        data:{
            // 搜索关键字
            query:"",
            // 歌曲列表
            musicList:[],
            // 歌曲的播放地址
            musicUrl:"",
            // 歌曲照片
            musicCover:"",
            // 评论内容
            hotComments:"",
            // 歌曲是否在播放
            isPlaying:false,
            // 照片是否显示
            photoShow:false,
            // MV是否在播放
            isShow:false,
            // MV地址
            mvUrl:"",
        },

        methods: {
        // 搜索歌曲"https://autumnfish.cn/search?keywords="
        searchMusic: function () {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
            function (response) {
            // console.log(response);
            that.musicList = response.data.result.songs;
            }, function (err) {
                 console.log("搜索歌曲报错");
                }
            )
        },

        // 播放歌曲   获取歌曲的id"https://autumnfish.cn/song/url?id="，然后获得歌曲的播放地址
        playMusic:function (musicId) {
            var that =this;
            // 设定歌曲一播放就显示歌曲信息的图片
            that.photoShow = true;
            console.log(this.photoShow);
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
            .then(function (response) {
                // console.log(response);
                that.musicUrl = response.data.data[0].url;
            },
            function (err) {
                console.log("播放歌曲报错");
            })

            // 歌曲照片获取   通过歌曲id获取歌曲照片"https://autumnfish.cn/song/detail?ids="
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
            .then(function (response) {
                console.log(response);
                // console.log(response.data.songs[0].al.picUrl);
                that.musicCover = response.data.songs[0].al.picUrl;
            },
            function (err) {
                console.log("获取歌曲海报错误");
            })

            // 歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
            .then(function (response) {
                // console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            },function (err) {
                console.log("获取歌曲评论错误");
            })

        },

        // 动画效果
        play:function () {
            this.isPlaying = true;
        },
        pause:function () {
            this.isPlaying = false;
        },

        // 播放MV
        playMv:function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function (response) {
                // console.log(response.data.data.url);
                that.isShow = true;
                that.mvUrl = response.data.data.url;
                // 暂停歌曲播放
                that.audio.pause();
            },function (err) {
                console.log("播放MV失败");
            })
        },

        // 隐藏MV
        hide:function () {
            this.isShow = false;
            }
        }
    })
});
