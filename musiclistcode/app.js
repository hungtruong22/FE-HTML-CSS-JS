    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const PLAYER_STORAGE_KEY = 'MO_PLAYER';
    
    const cd = $('.cd');

    const heading = $('header h2');
    const cdThumb = $('.cd-thumb');
    const audio = $('#audio');

    const playBtn = $('.btn-toggle-play');
    //console.log(playBtn) 

    const player = $('.player');
    const progress = $('#progress');
    const nextBtn = $('.btn-next');
    const prevBtn = $('.btn-prev');
    const randomBtn =  $('.btn-random');
    const repeatBtn = $('.btn-repeat');
    const playlist = $('.playlist');

const app = {
    currentIndex: 0, // Lấy ra chỉ mục đầu tiên của mảng
    isPlaying: false,
    isRandom: false,
    isReapeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || { },
    songs: [
        {
            name: 'Miền An Nhiên',
            singer: 'Phạm Minh Thành',
            path: './assest/music/mienannhien.mp3',
            image: './assest/img/mienannhien.png'
        },
        {
            name: 'Dòng Thời Gian',
            singer: 'Nguyễn Hải Phong',
            path: './assest/music/dongthoigian.mp3',
            image: './assest/img/dongthoigian.png'
        },
        {
            name: 'Bước Qua Mùa Cô Đơn',
            singer: 'Vũ',
            path: './assest/music/buocquamuacodon.mp3',
            image: './assest/img/buocquamuacodon.png'
        },
        {
            name: 'My Everything',
            singer: 'Tiên Tiên',
            path: './assest/music/myeverything.mp3',
            image: './assest/img/myeverything.png'
        },
        {
            name: 'Tình Ka Ngọt Ngào',
            singer: 'Lập Nguyên',
            path: './assest/music/tinhkangotngao.mp3',
            image: './assest/img/tinhkangotngao.png'
        },
        {
            name: 'Về Nhà Thôi',
            singer: 'Phạm Anh Duy, Rocker Nguyễn, Jay Quân, 1DEE, DJ Minh Trí',
            path: './assest/music/venhathoi.mp3',
            image: './assest/img/venhathoi.png'
        },
        {
            name: 'Thương Em Đến Già',
            singer: 'Lê Bảo Bình',
            path: './assest/music/thuongemdengia.mp3',
            image: './assest/img/thuongemdengia.png'
        },
        {
            name: 'Bởi Vì Là Khi Yêu',
            singer: 'Ly Ly',
            path: './assest/music/boivilakhiyeu.mp3',
            image: './assest/img/boivilakhiyeu.png'
        },
        {
            name: '24H',
            singer: 'Ly Ly',
            path: './assest/music/24h.mp3',
            image: './assest/img/24h.png'
        },
        {
            name: 'Haru Haru',
            singer: 'BigBang',
            path: './assest/music/haruharu.mp3',
            image: './assest/img/haruharu.png'
        },
    ],
    
    setConfig: function(key, value){
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config)); 
    },
    // Chức năng render ra màn hình (1)

    render: function(){// render ra view
        //console.log(123);

        const htmls = this.songs.map((song, index) => { // Dùng hàm map() để duyệt qua từng phần tử trong mảng songs
            return `
                <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="thumb"
                         style="background-image: url('${song.image}');"></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
            </div>`
        })
            playlist.innerHTML = htmls.join('');
        
    },

    definieProperties: function(){ // Định nghĩa thuộc tính

        // Định nghĩa thuộc tính cho chình Object với biến khởi tạo là "currentSong" và một getter để lấy nhạc
        Object.defineProperty(this, 'currentSong', { 
            get: function(){
                return this.songs[this.currentIndex];
            }
        })
    },

    // Tạo hàm handleEvents để xử lý xự kiện trong app     
    handleEvents: function(){
        const _this = this;

        // Xử lý CD quay / dừng (dùng animation web api)
        const cdThumbAnimate = cdThumb.animate([// Tạo ra một animation gồm 2 dối số là 1 mảng chứa config của animat và 1 option để xem nó thực hiện như thế nào
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, // 10 giây // quay trong bao nhiêu giây
            iterations: Infinity, // iterations: lặp bao nhiều lần, Infinity: lặp vô hạn
        }) 
        cdThumbAnimate.pause();

        // Chức năng xử lý ScrollTop (2)
       
        const cdWidth = cd.offsetWidth;
        // Xử lí xự kiện kéo , lướt (scroll)
        document.onscroll = function(){
            // Cách 1: console.log(window.scrollY); // window là biến đại diện cho cửa sổ trình duyệt
            // Cách 2: console.log(document.documentElement.scrollTop);

            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            //console.log(newCdWidth);
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth; //chia để lấy tỉ lệ gán cho opacyti
        }

        // Chức năng xử lý khi click play (play/pause)
         //  Xử lý khi click play 
         playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } 
            else {
                audio.play();
            }
        }
            
        // Khi song được play 
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        }
        // Khi song được pause 
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }
        
        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent;
            }
            
        }

        // Xử lí khi tua song
        progress.onchange = function(e){
            //console.log(audio.duration / 100 * e.target.value); // Kiểm tra xem có đúng số giây khi tua hay ko

            const seekTime = (audio.duration / 100) * e.target.value
            audio.currentTime = seekTime;
        }

        // Khi next song
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong();
            }
            else{
                _this.nextSong();
            }
            audio.play();
            _this.render(); // Trong  trường hợp list có nhiều bài hát(>10) thì nên nghĩ hướng khác vì nếu render thì sẽ có khả năng vỡ giao diện
            _this.scrollToActiveSong();
        }

        // Khi prev song
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.playRandomSong();
            }
            else{
                _this.prevSong();
            }
            audio.play();
            _this.render(); // Trong  trường hợp list có nhiều bài hát(>10) thì nên nghĩ hướng khác vì nếu render thì sẽ có khả năng vỡ giao diện
            _this.scrollToActiveSong();
        }

        // Xử lý bật / tắt random song
        randomBtn.onclick = function(e){
           _this.isRandom = !_this.isRandom // Nếu song radom khác chính nó thì đảo ngược lại 
           _this.setConfig('isRandom', _this.isRandom);
           randomBtn.classList.toggle('active', _this.isRandom);
        }

         // Xử lý repeat(lặp lại) song khi audio ended
         repeatBtn.onclick = function(e){
            _this.isReapeat = !_this.isReapeat;
            _this.setConfig('isReapeat', _this.isReapeat);
            repeatBtn.classList.toggle('active', _this.isReapeat);           
        }

        // Xử lý next / repeat song khi audio ended
        audio.onended = function(){
            // Cách 1:
            // if(_this.isRandom){
            //     _this.playRandomSong();
            // }
            // else{
            //     _this.nextSong();
            // }
            // audio.play();

            // Cách 2:
            if(_this.isReapeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }
             
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)');// closest('.song:not(.active)'): kiểm tra xem sụ kiện có clik vào thằng song(bao gồm cả thẻ con của song) không có thẻ actice hay không
           //console.log(e.target)
            if(songNode || e.target.closest('.option')){ 
                // Xử lý khi click vào song
                if(songNode){
                    //console.log(songNode.dataset.index)// dataset.index(khi dùng data-) tương tự getAttribute('data-index')
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();      
                }

                // Xử lý khi click vào song option
                if(e.target.closest('.option')){

                }
            }
        }
    },

    scrollToActiveSong: function(){
        setTimeout(() =>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center', // hoặc nearest

            });
        },300) 

    },

    loadCurrentSong: function(){
        
        
        heading.textContent = this.currentSong.name; // Lấy tên bài hát
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`; // lấy ảnh bài hát
        audio.src = this.currentSong.path; // lấy audio bài hát

        //console.log(heading, cdThumb , audio);  
    },

    loadConfig: function(){
        // Cách 1:
        this.isRandom = this.config.isRandom;
        this.isReapeat = this.config.isReapeat;
        
        // Cách 2:
        //Object.assign(this, this.config); // assign: dùng để gán hoặc hợp nhất
    },
    nextSong: function(){
        this.currentIndex++;
        //console.log(this.currentIndex, this.songs.length);
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function(){
        this.currentIndex--;
        //console.log(this.currentIndex, this.songs.length);
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while(newIndex === this.currentIndex)
        //console.log(newIndex); 
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function(){
        // Gán cấu hình từ config vào ứng dụng  
        this.loadConfig();

        // Định nghĩa cấc thuộc tính cho Object
        this.definieProperties()

        // Lắng nghe / xử lý các sự kiện (DOM Events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI(user interface (dao diện)) khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()

        // Hiển thị trạng thái ban đầu của button reapeat và random
        repeatBtn.classList.toggle('active', this.isReapeat);
        randomBtn.classList.toggle('active', this.isRandom);   
    }
}

app.start();
