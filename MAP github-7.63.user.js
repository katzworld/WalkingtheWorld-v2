// ==UserScript==
// @name         MAP github 
// @namespace    https://github.com/katzworld/WalkingtheWorld-v2
// @version      7.64
// @description  Dora is a bitch IM THE MAP + smoken da bear!
// @author       @KaTZWorlD  on X  ask about the seaturtles!!! aye seaturles
// @match        https://play.tmwstw.io/
// @grant        GM_xmlhttpRequest
// @connect     https://api.imamkatz.com/
// @connect     https://api.tmwstw.io
// @updateURL    https://github.com/katzworld/WalkingtheWorld-v2/raw/main/MAP%20github%20-7.63.user.js
// @downloadURL  https://github.com/katzworld/WalkingtheWorld-v2/raw/main/MAP%20github%20-7.63.user.js
// ==/UserScript==

(function () {
    const sidebar = 150; //image map
    //////////////////////////////////////////////////////////////
    //  WHO ARE YOU ?
    //  get wallet id from web3.instance
    //  store in local variable resolve from api.tmwstw.io/get_ens
    //  CANNONBALL !!!
    ////////////////////////////////////////////////////////////////
    //https://api.tmwstw.io/get_ens@${wallet}

    let ens = localStorage.getItem('whoareyou');
    if (ens) {
        console.log(`${ens} has entered the sufferverse!`);
    } else {
        console.log('No ENS found in local storage.');
    }

    GM_xmlhttpRequest({
        method: "GET",
        url: 'https://api.imamkatz.com/api/',
        onload: function (res) {
            console.log('API request to imamkatz.com completed.');
        },
        onerror: function (err) {
            console.error('API request to imamkatz.com failed:', err);
        }
    });

    if (typeof ens !== "undefined" && ens !== null) {
        // eslint-disable-next-line no-undef
        const wallet = web3.currentProvider.selectedAddress;
        GM_xmlhttpRequest({
            method: "GET",
            url: `https://api.tmwstw.io/get_ens@${wallet}`,
            onload: function (response) {
                const r = response;
                ens = r.response;
                localStorage.setItem('whoareyou', ens);
                console.log(`${ens} has entered the sufferverse!`);
            },
            onerror: function (err) {
                console.error('API request to tmwstw.io failed:', err);
            }
        });
    }
    /////////////////////
    // init setup from 0 we all start!
    // setup local storage
    /////////////////////
    let liferLocal = localStorage.getItem('lifetime_plot')
    let lifer = parseInt(liferLocal, 10)
    if (isNaN(lifer)) {
        console.log('Fresh install')
        liferLocal = localStorage.setItem('lifetime_plot', 1)
        parseInt(liferLocal, 10)
        location.reload(); //WTF really ok ?
    }
    let plotas = ''
    let plota_ses = 0
    let how_many = 1 //ALL OF THEM !!

    //////////////////////////////////////////////////////////////
    // front page mutation for global look redraw of ui with current workaround
    // plots with numbers only in title will display the location on the globe
    // name plots currently have no hookable id currently.  hope to make it easier
    // to find a suitable spawn point
    /////////////////////////////////////////////////////////////////

    const observerOfPlotas = new MutationObserver(entries => {
        globalTrot(entries[0].target.childNodes)
    })
    const targetOfPlotas = document.querySelector('#random_spawn_button'); //something everyone sees
    const configOfPlotas = {
        childList: true,
        subtree: true,
    }
    observerOfPlotas.observe(targetOfPlotas, configOfPlotas)

    const names = ["cheaper than a wget request", "Tokyo", "Jakarta", "Delhi", "Mumbai", "Manila", "Shanghai", "São Paulo", "Seoul", "Mexico City", "Guangzhou", "Beijing", "Cairo", "New York", "Kolkāta", "Moscow", "Bangkok", "Buenos Aires", "Shenzhen", "Dhaka", "Lagos", "Istanbul", "Ōsaka", "Karachi", "Bangalore", "Tehran", "Kinshasa", "Ho Chi Minh City", "Los Angeles", "Rio de Janeiro", "Nanyang", "Chennai", "Chengdu", "Lahore", "Paris", "London", "Linyi", "Tianjin", "Shijiazhuang", "Baoding", "Zhoukou", "Lima", "Hyderābād", "Bogotá", "Weifang", "Nagoya", "Wuhan", "Heze", "Ganzhou", "Tongshan", "Chicago", "Handan", "Luanda", "Fuyang", "Kuala Lumpur", "Jining", "Dongguan", "Hanoi", "Pune", "Chongqing", "Changchun", "Zhumadian", "Ningbo", "Onitsha", "Nanjing", "Hefei", "Ahmadābād", "Hong Kong", "Khartoum", "Nantong", "Yancheng", "Foshan", "Nanning", "Hengyang", "Xi’an", "Shenyang", "Tangshan", "Shaoyang", "Changsha", "Santiago", "Zhengzhou", "Zhanjiang", "Riyadh", "Cangzhou", "Dar es Salaam", "Maoming", "Huanggang", "Xinyang", "Shangrao", "Luoyang", "Bijie", "Yantai", "Quanzhou", "Hangzhou", "Miami", "Kunming", "Nanchong", "Zunyi", "Lu’an", "Yichun", "Taizhou", "Liaocheng", "Qujing", "Xiangyang", "Sūrat", "Baghdad", "Qingdao", "Singapore", "Dallas", "Changde", "Dazhou", "Suzhou", "Philadelphia", "Jieyang", "Nairobi", "Nangandao", "Ankara", "Tai’an", "Yulin", "Dezhou", "Houston", "Atlanta", "Rangoon", "Toronto", "Suihua", "Washington", "Qiqihar", "Jinhua", "Saint Petersburg", "Shantou", "Sydney", "Weinan", "Suqian", "Guadalajara", "Suzhou", "Fuzhou", "Zhaotong", "Pudong", "Yongzhou", "Belo Horizonte", "Zhangzhou", "Bozhou", "Melbourne", "Nanchang", "Xianyang", "Taizhou", "Surabaya", "Abidjan", "Ji’an", "Mianyang", "Shaoxing", "Alexandria", "Yuncheng", "Pingdingshan", "Huai’an", "Xinpu", "Guilin", "Huaihua", "Jiujiang", "Anqing", "Boston", "Huanglongsi", "Xiaoganzhan", "Changzhou", "Barcelona", "Chenzhou", "Wuxi", "Zibo", "Jiaxing", "Dalian", "Harbin", "Yangzhou", "Yibin", "Jiangmen", "Johannesburg", "Meizhou", "Chifeng", "Casablanca", "Guiyang", "Langfang", "Zhangjiakou", "İzmir", "Linfen", "Wenzhou", "Monterrey", "Luzhou", "Jiangguanchi", "Neijiang", "Phoenix", "Yanjiang", "Yiyang", "Zhaoqing", "Hengshui", "Guigang", "Xiaoxita", "Xiamen", "Chuzhou", "Fuzhou", "Amman", "Jeddah", "Sialkot City", "Huizhou", "Qingyuan", "Zhuzhou", "Wuhu", "Seattle", "Loudi", "Binzhou", "Liuzhou", "Yokohama", "Baojishi", "Guang’an", "Hanzhong", "Kabul", "Zaozhuang", "Berlin", "Anshan", "Deyang", "Lanzhou", "Chengde", "San Francisco", "Puyang", "Suining", "Jiaozuo", "Bengbu", "Montréal", "Detroit", "Baicheng", "Busan", "Algiers", "Qincheng", "Taiyuan", "Lucknow", "Chaoyang", "Hechi", "Leshan", "Yulinshi", "Siping", "Madrid", "Jinan", "Shiyan", "Changzhi", "San Diego", "Faisalabad", "Santa Cruz", "Bazhou", "Zhongshan", "Zhenjiang", "Ürümqi", "Tongliao", "Heyuan", "Tongren", "Qinzhou", "Jaipur", "Xinzhou", "Addis Ababa", "Giza", "Meishan", "Brasília", "Mashhad", "Jinzhou", "Tieling", "Shaoguan", "Shanwei", "Minneapolis", "Kyiv", "Sanaa", "Quezon City", "Dingxi", "Salvador", "Incheon", "Bursa", "Ningde", "Tampa", "Daqing", "Birmingham", "Putian", "Huzhou", "Wuzhou", "Denver", "Rome", "La Paz", "Pyongyang", "Kano", "Taichung", "Omdurman", "Zigong", "Qinhuangdao", "Mudanjiang", "Huludao", "Kaohsiung", "Xiangtan", "Guayaquil", "Rizhao", "Manchester", "Cawnpore", "Baotou", "Taipei", "Nanping", "Longyan", "Ibadan", "Hohhot", "Chaozhou", "Antananarivo", "Longba", "Weihai", "Chattogram", "Santo Domingo", "Xuanzhou", "Sanming", "Brooklyn", "Medellín", "Brisbane", "Baoshan", "Dubai", "Luohe", "Qinbaling", "Mirzāpur", "Guangyuan", "Cali", "Daegu", "Fortaleza", "Guatemala City", "Yaoundé", "Douala", "Jilin", "Lianshan", "Lincang", "Antalya", "Tashkent", "Huangshi", "Bandung", "Nāgpur", "Dandong", "Huainan", "Shangzhou", "Bekasi", "Ghāziābād", "Tijuana", "Jiamusi", "Yangjiang", "Accra", "Yuxi", "Fushun", "Anshun", "Vancouver", "Tangerang", "Konya", "Queens", "Yingkou", "Adana", "Medan", "Sanmenxia", "Indore", "Ma’anshan", "Pingliang", "Quzhou", "Baku", "Gaoping", "Huaibei", "Xining", "Yan’an", "Havana", "Phnom Penh", "Fukuoka", "Mogadishu", "Jincheng", "Lishui", "Qingyang", "Riverside", "Baltimore", "Haiphong", "Las Vegas", "Laibin", "Rawalpindi", "Kumasi", "Portland", "Vadodara", "Perth", "Puning", "San Antonio", "Haikou", "Vishākhapatnam", "Gaziantep", "Minsk", "St. Louis", "Bamako", "Quito", "Pingxiang", "Chongzuo", "Şanlıurfa", "Kananga", "Peshawar", "Sapporo", "Jixi", "Caracas", "Fuxin", "Leeds", "Sacramento", "Blantyre", "Tainan", "Bucharest", "Wuwei", "Bhopāl", "Curitiba", "Xiping", "Asunción", "Saidu Sharif", "Vienna", "Aleppo", "Hamburg", "Meru", "Brazzaville", "Orlando", "Mersin", "Almaty", "Barranquilla", "Kyōto", "Manaus", "Liaoyang", "Baiyin", "San Jose", "Warsaw", "Shengli", "Lubumbashi", "Damascus", "Shuyangzha", "Shangqiu", "Eşfahān", "Budapest", "Heihe", "Lusaka", "Diyarbakır", "Chinchvad", "Shuozhou", "Vitória", "Cleveland", "Pittsburgh", "Mecca", "Patna", "Mosul", "Austin", "Sanzhou", "Conakry", "Kampala", "Ecatepec", "Cincinnati", "Makassar", "Yushan", "Ludhiāna", "Newcastle", "Depok", "Zhongli", "Kansas City", "Rabat", "Ouagadougou", "Davao", "Manhattan", "Semarang", "Yinchuan", "Multan", "Caloocan City", "Harare", "Novosibirsk", "Chengtangcun", "Āgra", "Karaj", "Indianapolis", "Jingdezhen", "Puebla", "Kalyān", "Madurai", "Gujranwala", "Benxi", "Jamshedpur", "Zhuhai", "Recife", "Columbus", "Tabrīz", "Santiago", "Maracaibo", "Beihai", "Shuangyashan", "Kōbe", "Charlotte", "Yucheng", "Changshu", "Ximeicun", "Jianguang", "Gwangju", "Xushan", "Guiping", "Nāsik", "Porto Alegre", "Zhangjiajie", "S", "Virginia Beach", "Daejeon", "Munich", "Yekaterinburg", "Auckland", "Yunfu", "Huangshan", "Huazhou", "Shīrāz", "León de los Aldama", "Pizhou", "Palembang", "Kharkiv", "Kawanakajima", "Lianjiang", "Chizhou", "Leizhou", "Guyuan", "Rui’an", "Birstall", "Muscat", "Hebi", "Jingling", "Bronx", "The Hague", "Owerri", "Sharjah", "Farīdābād", "Ulaanbaatar", "Goiânia", "Belém", "Kayseri", "Yueqing", "Belgrade", "Pingdu", "Aurangābād", "Yutan", "Wenling", "Islamabad", "Milwaukee", "Milan", "Sofia", "Adelaide", "Samsun", "Rājkot", "Khulna", "Córdoba", "Guarulhos", "Juárez", "Prague", "Montevideo", "Mbuji-Mayi", "Fuqing", "Xintai", "Doha", "Saitama", "Hiroshima", "Meerut", "Yushu", "Rongcheng", "Yangquan", "Haicheng", "Gaozhou", "Yingtan", "Huaiyin", "Wuzhong", "Jabalpur", "Thāne", "Zhangye", "Rucheng", "Nizhniy Novgorod", "Comayagüela", "Yangshe", "Shaoyang", "Dhanbād", "Yichun", "Laiwu", "Kazan", "Dayan", "Suwon", "Jiangyin", "Yongcheng", "Calgary", "Cần Thơ", "Abuja", "Yiwu", "Mandalay", "Beidao", "Al Başrah", "Shuangshui", "Sevilla", "Vila Velha", "Allahābād", "Vārānasi", "Tunis", "Chelyabinsk", "Mombasa", "Providence", "Qom", "Maiduguri", "Maputo", "Rosario", "Benin City", "Xinyu", "Ahvāz", "Dublin", "Jacksonville", "Medina", "Srīnagar", "Omsk", "Huazhou", "Cilacap", "Xiantao", "Bandar Lampung", "Samara", "Guankou", "Ulsan", "Dingzhou", "Campinas", "Lianyuan", "Rongcheng", "Kaiyuan", "Nay Pyi Taw", "Dakar", "Zhuji", "Zapopan", "Leiyang", "Dadukou", "Quetta", "Amritsar", "Callao", "Alīgarh", "Yingchuan", "Tegucigalpa", "Ciudad Nezahualcóyotl", "Tripoli", "Rostov", "Nezahualcóyotl", "Bhiwandi", "Zhoushan", "Tbilisi", "Ufa", "Fès", "Biên Hòa", "Mexicali", "Gwalior", "Ankang", "Ikare", "Hegang", "Salt Lake City", "Bhilai", "Yuyao", "N’Djamena", "Hanchuan", "Gongzhuling", "Copenhagen", "Irbid", "Hāora", "Cologne", "Krasnoyarsk", "Yicheng", "Mizhou", "Nashville", "Yerevan", "Rānchi", "Nur-Sultan", "Nouakchott", "Vereeniging", "Richmond", "São Luís", "San Pedro Sula", "Taixing", "Memphis", "Goyang", "Bezwāda", "Edmonton", "Xishan", "Barquisimeto", "Sendai", "Voronezh", "Perm", "Changwon", "Zhongwei", "Shouguang", "Bogor", "Raleigh", "Cartagena", "Chandīgarh", "Bishkek", "Amsterdam", "Matola", "Ogbomoso", "Ashgabat", "E’zhou", "Maceió", "Niamey", "Managua", "Patam", "Tekirdağ", "Linhai", "Shubrā al Khaymah", "Monrovia", "Wafangdian", "Zhongxiang", "Shymkent", "New Orleans", "Volgograd", "Port-au-Prince", "Mysore", "Odesa", "Kathmandu", "Raipur", "Nice", "Arequipa", "Port Harcourt", "Rotterdam", "Louisville", "Zaoyang", "Shuizhai", "Kota", "Abu Dhabi", "Stockholm", "Ottawa", "Asmara", "Freetown", "Jerusalem", "Panama City", "Lomé", "Libreville", "Zagreb", "Dushanbe", "Lilongwe", "Cotonou", "Vientiane", "Colombo", "Kigali", "Pretoria", "Bangui", "Winnipeg", "Quebec City", "Riga", "Oslo", "Chisinau", "Athens", "Bujumbura", "Helsinki", "Skopje", "Kuwait City", "Kingston", "Vilnius", "San Salvador", "Djibouti", "Lisbon", "Kitchener", "Tallinn", "Cape Town", "Bratislava", "Tirana", "Canberra", "Wellington", "Beirut", "Dodoma", "Halifax", "Bissau", "Juba", "Port Moresby", "Yamoussoukro", "Victoria", "Maseru", "Nicosia", "Windhoek", "Porto-Novo", "Sucre", "San José", "Ljubljana", "Sarajevo", "Nassau", "Bloemfontein", "Gaborone", "Paramaribo", "Dili", "Pristina", "Georgetown", "Malabo", "Brussels", "Male", "Podgorica", "Manama", "Port Louis", "New Delhi", "Bern", "Reykjavík", "Praia", "Luxembourg", "Sri Jayewardenepura Kotte", "Bridgetown", "Moroni", "Thimphu", "Bareilly", "Quảng Hà", "Kitaku", "Jodhpur", "Xingcheng", "Dongtai", "Joinvile", "Yingcheng", "Dnipro", "Glasgow", "Chiba", "Danyang", "Natal", "Naples", "Zhaodong", "Xibeijie", "Kirkuk", "Huilong", "Tongjin", "Oklahoma City", "Toulouse", "Denizli", "Dispur", "Coimbatore", "Luocheng", "Guwāhāti", "Shima", "Sŏngnam", "Solāpur", "Tangier", "Anqiu", "Feicheng", "Taishan", "Meishan", "Kisangani", "Khartoum North", "Aguascalientes", "Marrakech", "Nada", "Donetsk", "Taihecun", "Wuchuan", "Trujillo", "Cebu City", "Taihe", "Olinda", "Bridgeport", "Trichinopoly", "Xin’an", "Padang", "Qingzhou", "Buffalo", "Xinyi", "Lichuan", "Daye", "Fort Worth", "Zhuanghe", "Hartford", "Ad Dammām", "Bucheon", "Lhasa", "Homs", "Jiaozhou", "Mérida", "Dengtalu", "Zaria", "Hubli", "Abeokuta", "Tucson", "Krasnodar", "Natal", "Novo Hamburgo", "Chihuahua", "Klang", "Turin", "Jos", "Laiyang", "Jalandhar", "Campo Grande", "Sale", "Barinas", "Marseille", "Kaifeng Chengguanzhen", "Eskişehir", "Gaomi", "Ipoh", "Hai’an", "Liverpool", "Zamboanga City", "Oran", "Southampton", "Weichanglu", "Pekanbaru", "Portsmouth", "Leping", "Erbil", "Kermānshāh", "Hailun", "Yangchun", "Macheng", "Ilorin", "Teresina", "Omaha", "Yuci", "Saratov", "Iguaçu", "El Paso", "Denpasar", "Dehui", "Naucalpan de Juárez", "Bhubaneshwar", "Tongchuan", "Cheongju", "Warri", "Pointe-Noire", "Rongjiawan", "San Luis Potosí", "Butterworth", "Bhayandar", "Renqiu", "Toluca", "Honolulu", "Querétaro", "Xindi", "Wu’an", "São Bernardo do Campo", "Hermosillo", "Wutong", "Taguig City", "Saltillo", "Gaoyou", "Hejian", "Yiyang", "Puxi", "Zijinglu", "Xiashi", "Trabzon", "João Pessoa", "Dongyang", "McAllen", "Valencia", "Qingping", "Niigata", "Hamamatsu", "Morelia", "Pasig City", "Morādābād", "Culiacán", "Xiangxiang", "Malang", "Xingyi", "Chaohucun", "Fuyang", "Antipolo", "Nottingham", "Cencheng", "Kraków", "Hempstead", "Erzurum", "Al ‘Ayn", "Songzi", "Laixi", "Zhongba", "Qingnian", "Albuquerque", "Kaduna", "Tlalnepantla", "Xinhualu", "Guangshui", "Frankfurt", "Samarinda", "Changhua", "Pietermaritzburg", "Hŭngnam", "Kolhāpur", "Ciudad Guayana", "Cúcuta", "Licheng", "Thiruvananthapuram", "Tyumen", "San Cristóbal", "Zaporizhzhia", "Cancún", "Kumamoto", "Chengguan", "Nehe", "Sokoto", "Birmingham", "Zunhua", "Orūmīyeh", "Oyo", "Wugang", "Shuangqiao", "Rennes", "Sizhan", "Langzhong", "Bristol", "Qian’an", "Lviv", "Zouping", "Bremen", "Reynosa", "An Najaf", "Sagamihara", "Guli", "Sarasota", "Okayama", "Mississauga", "Lingbao Chengguanzhen", "Anlu", "Wusong", "Dayton", "Enugu", "George Town", "Jaboatão", "Santo André", "Xichang", "Soledad", "Chengxiang", "Tolyatti", "Sahāranpur", "Warangal", "Osasco", "Dashiqiao", "Latakia", "Rochester", "Fresno", "Banjarmasin", "Salem", "Changsha", "Grenoble", "Shishi", "Guadalupe", "Aracaju", "Bauchi", "Hamilton", "Łódź", "Miluo Chengguanzhen", "Gaizhou", "Shizuoka", "Mālegaon", "Karbalā’", "Leling", "São José dos Campos", "Jianshe", "Acapulco de Juárez", "Sheffield", "Jingcheng", "City of Parañaque", "Kochi", "Allentown", "Bahawalpur", "Tasikmalaya", "Macau", "Torreón", "Xinmin", "Shanhu", "Zhongshu", "Xigazê", "Gold Coast", "Palermo", "Cagayan de Oro", "Gorakhpur", "Pinghu", "Guankou", "Tulsa", "Yatou", "Songyang", "Cape Coral", "Ch’ŏngjin", "São José dos Pinhais", "Puyang Chengguanzhen", "Qionghu", "Yanshi Chengguanzhen", "Ribeirão Prêto", "Dasmariñas", "Huambo", "Wenchang", "Shulan", "Catia La Mar", "Bouaké", "As Sulaymānīyah", "Hwasu-dong", "Jeonju", "Durango", "Shimoga", "Ansan", "Bulawayo", "Xiping", "Sanhe", "Guntūr", "Dali", "Concord", "Tiruppūr", "Ch’ŏnan", "Zaragoza", "Izhevsk", "Guixi", "Honchō", "Sorocaba", "Villahermosa", "Petaling Jaya", "Wuxue", "Utrecht", "Kikwit", "Colorado Springs", "Valenzuela", "Gaobeidian", "Qufu", "Ruiming", "Wrocław", "Rasht", "Nantes", "Stuttgart", "Al Hufūf", "Xinshi", "Cochabamba", "Barnaul", "Tripoli", "Jin’e", "Benghazi", "Kryvyy Rih", "Yanggok", "Changping", "Raurkela", "Ḩalwān", "Charleston", "Chimalhuacán", "Xinxing", "Suohe", "Mangalore", "Zhuangyuan", "Ulyanovsk", "Irkutsk", "Nānded", "Bacoor", "Pontianak", "Bazhou", "Springfield", "Turpan", "Düsseldorf", "Xingtai", "Meihekou", "Jurong", "Zhugang", "Khabarovsk", "Xinji", "Hamhŭng", "Serang", "Buraydah", "Ta‘izz", "Montpellier", "San Miguel de Tucumán", "Yaroslavl", "Zhangshu", "Grand Rapids", "Vladivostok", "Kuantan", "Cuttack", "Jambi", "Zhuozhou", "Uberlândia", "Gothenburg", "Tianchang", "Canoas", "Sargodha", "Las Piñas City", "Cimahi", "Kawaguchi", "Tuxtla", "Balikpapan", "Qamdo", "Durban", "Kagoshima", "General Santos", "Chānda", "Al Ḩillah", "Makhachkala", "Mar del Plata", "Brampton", "Luocheng", "Mission Viejo", "Dortmund", "Chuxiong", "Makati City", "Albany", "Shah Alam", "Knoxville", "Essen", "Cuiabá", "Shangzhi", "Botou", "Bucaramanga", "Anyang", "Genoa", "Kuiju", "Tlaquepaque", "Hachiōji", "Dehra Dūn", "Aţ Ţā’if", "San Jose del Monte", "Bakersfield", "Ogden", "Xiulin", "Fu’an", "Málaga", "Tomsk", "Kermān", "Kingston upon Hull", "Al Maḩallah al Kubrá", "Luofeng", "Lingyuan", "Baton Rouge", "Pereira", "Ciudad Bolívar", "Durgāpur", "Orenburg", "Shenzhou", "Āsansol", "Bacolod", "Akron", "New Haven", "Zhenzhou", "Surakarta", "Tlajomulco de Zúñiga", "Jieshou", "Lanxi", "Zāhedān", "Dangyang", "Columbia", "Kemerovo", "Dresden", "Uyo", "Bhāvnagar", "Luanzhou", "Veracruz", "Novokuznetsk", "Nellore", "Chiclayo", "Al Ḩudaydah", "Eslāmshahr", "Cabinda", "Amrāvati", "Korla", "Huanghua", "Xingcheng", "Wancheng", "Kaiyuan", "Leipzig", "Fengcheng", "Ajmer", "Sihui", "Tinnevelly", "Fuding", "Maturín", "An Nāşirīyah", "Al Ḩillah", "Ibagué", "Hannover", "Poznań", "Ryazan", "Panshi", "Kassala", "Chang’an", "Wencheng", "Shashi", "Aksu", "Salta", "Kimhae", "Astrakhan", "Mingguang", "Naberezhnyye Chelny", "Antwerp", "Bīkaner", "Agartala", "Xalapa", "Ndola", "Hamadān", "Villavicencio", "Ailan Mubage", "Ensenada", "Lyon", "Bắc Ninh", "Ciudad Apodaca", "Santa Teresa del Tuy", "Londrina", "Penza", "Heroica Matamoros", "Port Said", "New Mirpur", "Yucheng", "Bello", "Meknès", "Nuremberg", "Pohang", "Utsunomiya", "Anda", "Jinghong", "Liaoyuan", "Mesa", "Surrey", "Cuautitlán Izcalli", "Ujjain", "Santa Marta", "Beining", "Hải Dương", "Carrefour", "Homyel’", "Leicester", "Yanji", "Benguela", "Yicheng", "Tabūk", "Lipetsk", "Ulhāsnagar", "Matsuyama", "Muntinlupa City", "Kashgar", "Linghai", "Aden", "Jhānsi", "Kitwe", "Aba", "Palm Bay", "Pingtung", "Samarkand", "Davangere", "Ichikawa", "Jammu", "Mazatlán", "Higashi-ōsaka", "Ile-Ife", "Kirov", "Madīnat as Sādis min Uktūbar", "Qaraghandy", "Mazatán", "Duisburg", "Mykolaiv", "Matsudo", "Provo", "Meicheng", "Niterói", "Rouen", "Oujda-Angad", "Johor Bahru", "Worcester", "Hongjiang", "Chimbote", "Dengtacun", "Ixtapaluca", "Zhijiang", "Chengjiao", "Beipiao", "Murrieta", "Kota Bharu", "Heshan", "Ciudad López Mateos", "Vinh", "Tultitlán de Mariano Escobedo", "Duyun", "Encheng", "Nishinomiya-hama", "Kandahār", "Cheboksary", "Yuanping", "Port Sudan", "Valledupar", "Edinburgh", "Belgaum", "Tula", "Taozhou", "Suez", "Shahe", "Yazd", "Nazrēt", "Gaoping", "Brookhaven", "Greenville", "Arāk", "San Nicolás de los Garza", "Gulbarga", "Juiz de Fora", "Dunhua", "Feira de Santana", "Jiaji", "Az Zarqā’", "Americana", "Ardabīl", "Sylhet", "Wichita", "Toledo", "Kaihua", "Caerdydd", "Jāmnagar", "Fuyuan", "Dhūlia", "Nampula", "Gaya", "Piraeus", "Ōita", "Florianópolis", "Chiniot", "Jiannan", "Wuhai", "Kaliningrad", "Sukkur", "Nangong", "Staten Island", "San Juan", "Vila Velha", "Macapá", "Des Moines", "Piura", "Jiaojiangcun", "Laohekou", "Fujin", "Beian", "Celaya", "Xiaoyi", "Strasbourg", "Lanús", "Qingzhen", "Jiangshan", "Ba‘qūbah", "Tamale", "Gdańsk", "Kanazawa", "Manado", "Jinchang", "Calabar", "Fukuyama", "Long Beach", "Malatya", "Huế", "Jalgaon", "Port St. Lucie", "Mauá", "Montería", "Tel Aviv-Yafo", "Xicheng", "Marikina City", "Pyeongtaek", "Kurnool", "Sfax", "City of Calamba", "Denton", "Ar Ramādī", "Melaka", "Volta Redonda", "Jian’ou", "Shenmu", "Huadian", "Taoyuan District", "Iloilo", "Kota Kinabalu", "Minzhu", "Rājshāhi", "Ţanţā", "Balashikha", "Udaipur", "Kursk", "Mariupol", "Bukavu", "Hsinchu", "Barcelona", "Constantine", "Tanbei", "Ado-Ekiti", "Batman", "Pasay City", "Madison", "Pingquan", "Baisha", "Bellary", "Santiago de Cuba", "Yongji", "Reno", "Danjiangkou", "Kahramanmaraş", "São José do Rio Prêto", "Andijon", "Harrisburg", "Nancy", "Al Manşūrah", "Machida", "Ning’an", "Beira", "Little Rock", "Zürich", "Zhangjiakou Shi Xuanhua Qu", "Sunch’ŏn", "Diadema", "Guangming", "Sāngli", "Tuticorin", "Herāt", "Kupang", "Larkana", "Jeju", "Bandar ‘Abbās", "Santos", "Stavropol", "Katsina", "Yogyakarta", "Calicut", "Zanjān", "Welkom", "Ulan-Ude", "Oakland", "Kashiwa", "Mazār-e Sharīf", "Kāshān", "Kenitra", "Khamīs Mushayţ", "Masan", "Cusco", "Sevastopol", "Mandaluyong City", "Kihŭng", "Toyota", "Akola", "Yan’an Beilu", "Agadir", "Mogi das Cruzes", "Durham", "Likasi", "Laval", "Winston-Salem", "Uijeongbu", "Tver", "Elazığ", "Akure", "Kumi", "Hpa-An", "Bonita Springs", "Hailin", "Seremban", "Takamatsu", "Lecheng", "Zhengjiatun", "Luhansk", "Pencheng", "Magnitogorsk", "Angeles City", "El Obeid", "Dalai", "Xingren", "Palma", "Kolwezi", "Wenlan", "Indio", "Palm Coast", "Arusha", "Fenyang", "Toyama", "Paju", "Mataram", "Chattanooga", "Lapu-Lapu City", "Nagqu", "Kisumu", "Jayapura", "Fangting", "Nagasaki", "Spokane", "Shekhupura", "Sochi", "Bhāgalpur", "Ipatinga", "Ivanovo", "Osogbo", "Imus", "Ciudad Obregón", "Türkmenabat", "Namangan", "Bryansk", "Basuo", "Taiping", "Maracay", "Murcia", "Jiexiu", "Mbale", "Taraz", "Asyūţ", "Santa Fe", "Campina Grande", "Szczecin", "Ghulja", "Syracuse", "Carapicuíba", "Gifu", "Quilon", "Jundiaí", "Lancaster", "Eindhoven", "Sīkar", "Tumkūr", "Jiangjiafan", "Miyazaki", "Arlington", "Stockton", "Bhātpāra", "Sandakan", "Hejin", "Thanh Hóa", "Muzaffarnagar", "Poughkeepsie", "Comilla", "Metz", "Campos", "Nha Trang", "Belgorod", "Yola", "Minamisuita", "San Lorenzo", "Ad Dīwānīyah", "Hancheng", "Fuyu", "Bologna", "Karamay", "Kākināda", "Augusta", "Bhīlwāra", "Caxias do Sul", "Tieli", "Cilegon", "Baicheng", "Nizāmābād", "Boise", "Tonalá", "Okazaki", "Mwanza", "Aqtöbe", "Plovdiv", "Oxnard", "Tétouan", "Florence", "Ḩā’il", "Yidu", "Lianzhou", "Scranton", "London", "Las Palmas", "Rio Branco", "Modesto", "Ichinomiya", "Brno", "Kissimmee", "Pasto", "Qazvīn", "Irapuato", "Novi Sad", "Antofagasta", "Shihezi", "Shache", "Pānihāti", "Huancayo", "Aurora", "Malabon", "Parbhani", "Usulután", "Youngstown", "Christchurch", "Hatay", "Iquitos", "Sivas", "Helixi", "A Coruña", "Manizales", "Manukau City", "Stoke-on-Trent", "Cumaná", "Vinnytsia", "Rohtak", "Lātūr", "Toyohashi", "Sanandaj", "Nuevo Laredo", "Anguo", "Ambon", "Mandaue City", "Keelung", "Varna", "Lengshuijiang", "Rājapālaiyam", "Nagano", "Az Zubayr", "Al Qaţīf", "Cuernavaca", "Sanya", "Nicolás Romero", "Huichang", "Vitsyebsk", "Bauru", "Bochum", "Anápolis", "Coventry", "Zalantun", "Tecámac", "Jhang City", "Ciudad General Escobedo", "Wŏnsan", "Kocaeli", "Bengkulu", "Montes Claros", "Pétion-Ville", "Shuanghejiedao", "Bydgoszcz", "Surgut", "Donostia", "Bobo-Dioulasso", "Umuahia", "Gedaref", "Palu", "Santa Rosa", "Pokhara", "Mahilyow", "Wudalianchi", "Sungai Petani", "Nam Định", "Sinŭiju", "Hrodna", "Vladimir", "São Vicente", "Wakayama", "Yong’an", "Itaquaquecetuba", "Wuppertal", "Minatitlán", "Nizhniy Tagil", "Nara", "Hongzhai", "Bilbao", "Haarlem", "Pavlodar", "Gimpo", "Rahimyar Khan", "Van", "Corrientes", "San Pedro", "Arkhangelsk", "Licheng", "Cabimas", "Yakeshi", "Baguio City", "Ahmadnagar", "Fayetteville", "Koshigaya", "Holguín", "Qo‘qon", "Anaheim", "Yingmen", "Piracicaba", "Khorramābād", "Rājahmundry", "Chita", "Sārī", "Makiivka", "Chitungwiza", "Pensacola", "Victorville", "Tokorozawa", "Tanch’ŏn", "Sumqayıt", "Kūstī", "Al ‘Amārah", "Cuddapah", "Simferopol", "Tarlac City", "Lancaster", "Greensboro", "Iligan", "East London", "Ōtsu", "Franca", "Kaluga", "Yeosu", "Corpus Christi", "Muzaffarpur", "Lublin", "Brest", "Lianran", "Alwar", "Baishan", "Kawagoe", "Farg‘ona", "Tamuramachi-moriyama", "Brahmapur", "Buôn Ma Thuột", "Biñan", "Iwaki", "Semey", "Tarsus", "Randburg", "Tepic", "Jitpur", "Kaesŏng", "Beni", "Chinju", "Tangdong", "Butuan", "Reading", "Belfast", "Alicante", "Blida", "Hangu", "Yingzhong", "Viña del Mar", "Asahikawa", "Bielefeld", "Cuenca", "Fort Wayne", "Maebashi", "Lipa City", "Wad Medani", "Islip", "Sousse", "Kāmārhāti", "Thessaloníki", "Gəncə", "Bilāspur", "Santa Ana", "Mymensingh", "Al Fayyūm", "Flint", "Kendari", "Balıkesir", "Az Zaqāzīq", "Thái Nguyên", "Smolensk", "Wŏnju", "Maringá", "San Juan", "Dahūk", "Batangas", "Mathura", "Pelotas", "Bamiantong", "Kōchi", "Patiāla", "Gujrat", "Bonn", "Vũng Tàu", "Markham", "Saugor", "Roodepoort", "Gómez Palacio", "Volzhskiy", "Bari", "Bijāpur", "Sukabumi", "Ulanhot", "Fayetteville", "Itajaí", "Nakuru", "Yunzhong", "Al Fallūjah", "Boa Vista", "Cluj-Napoca", "Malmö", "Gwangmyeongni", "Pucallpa", "Córdoba", "Kuching", "Zinder", "Naha", "Gonder", "Uberaba", "Jackson", "Mekele", "Kulti", "Santa Rosa", "Gonaïves", "Lansing", "Binxian", "Newcastle", "Kurgan", "Kaiyuan", "Temara", "Uruapan", "Hotan", "Camagüey", "Ann Arbor", "San Salvador de Jujuy", "Timişoara", "Al Kūt", "Tapachula", "Shāhjānpur", "Cherepovets", "Poltava", "Henderson", "Maroua", "Kaech’ŏn", "Asan", "Coatzacoalcos", "Huntsville", "Trichūr", "General Trias", "Cirebon", "Tampico", "Lexington", "Boaco", "Öskemen", "Cà Mau", "Neiva", "Cabuyao", "Vologda", "Saransk", "Mobile", "Bor", "Münster", "Barddhamān", "Ksar El Kebir", "Karlsruhe", "Kasur", "Yakou", "Orël", "Safi", "Shahr-e Qods", "Vitória da Conquista", "Ḩamāh", "Guarujá", "Catania", "Purnea", "Fort Collins", "Port Elizabeth", "Alanya", "Asheville", "Santa Clarita", "Gorgān", "Porto Velho", "Quy Nhơn", "Sambalpur", "Yokkaichi", "Chalco", "Mannheim", "Namp’o", "Shahrīār", "Kasugai", "Sapele", "Blumenau", "Sariwŏn", "St. Catharines", "Matadi", "Niagara Falls", "Fīrozābād", "San Fernando", "St. Paul", "Vladikavkaz", "Yakutsk", "Minna", "Hisar", "Puerto La Cruz", "Ciudad del Este", "Podolsk", "Ciudad Victoria", "Akita", "Kumul", "Vaughan", "Ōakashichō", "Pekalongan", "Adıyaman", "Vila Nova de Gaia", "Curepipe", "Cabanatuan City", "Oaxaca", "Armenia", "Wollongong", "Brest", "Awka", "Iksan", "Taubaté", "Antioch", "Lakeland", "Cadiz", "Sóc Trăng", "Āwasa", "Mardan", "Popayán", "Praia Grande", "Qianzhou", "Cotabato", "Bīdar", "Białystok", "Mérida", "Murmansk", "Afyonkarahisar", "Valladolid", "Jember", "Bahía Blanca", "İskenderun", "Al Mubarraz", "Petrópolis", "Al Kharj", "Rāmpur", "Najrān", "Chernihiv", "Yangsan", "Vigo", "Oyster Bay", "Valparaíso", "Augsburg", "Mbeya", "Limeira", "Rangpur", "Ponta Grossa", "Shiliguri", "Aksaray", "Navotas", "Çorum", "Bāli", "Ismailia", "Pānīpat", "Cagliari", "Delmas", "Batna", "Kunp’o", "Tambov", "Iaşi", "Thiès", "Makurdi", "Morioka", "Kherson", "Groznyy", "Hong’an", "Bafoussam", "Resistencia", "Braşov", "Juliaca", "Graz", "Karīmnagar", "Sétif", "Trenton", "Kaunas", "Mulhouse", "Hulin", "Sekondi", "Lincoln", "Bhuj", "Ostrava", "Ichalkaranji", "Tirupati", "Springfield", "Punto Fijo", "Plano", "Irvine", "Fukushima", "Orléans", "Hospet", "Tacna", "Korhogo", "Constanţa", "Haifa", "Coacalco", "Crato", "Limoges", "Davenport", "Coro", "Bago", "Fuquan", "Tongchuanshi", "Āīzawl", "Taboão da Serra", "Sannai", "Huozhou", "Temuco", "Sterlitamak", "Rockford", "Tegal", "Ica", "Newark", "Jining", "Chuncheon", "Malārd", "Pematangsiantar", "Long Xuyên", "Petrozavodsk", "South Bend", "Mingaora", "Bārāsat", "Shreveport", "Sincelejo", "Việt Trì", "Cherkasy", "Wiesbaden", "Kostroma", "Round Lake Beach", "Gyeongsan", "Katowice", "Shaowu", "Linxia Chengguanzhen", "Pachuca", "Dire Dawa", "Khmelnytskyi", "Aomori", "Owo", "Savannah", "Posadas", "Gatineau", "Windsor", "Tsu", "Myrtle Beach", "Mbandaka", "Tehuacán", "La Guaira", "Kunsan", "Nizhnevartovsk", "Chula Vista", "Ratlām", "Yeosu", "Crato", "Derby", "Kafr ad Dawwār", "Eugene", "Gijón", "Chiayi", "Fuchū", "Palmas", "Craiova", "Maradi", "Sorong", "Majene", "Bukhara", "Thái Bình", "Binjai", "Oral", "Brāhmanbāria", "Sartā", "Imphāl", "Plymouth", "Ichihara", "Santo Domingo de los Colorados", "Novorossiysk", "Santa Ana", "Zhytomyr", "Mito", "Gombe", "Espoo", "Drug", "Bamenda", "Handwāra", "Lucena", "Canton", "Yoshkar-Ola", "Nalchik", "Aswān", "Salamanca", "İnegöl", "Chernivtsi", "Yao", "Sumaré", "Lubbock", "Yanbu‘", "Sumy", "Tshikapa", "Anantapur", "San Pablo", "Reading", "Winter Haven", "Myeik", "Marabá", "Kütahya", "Salem", "Djelfa", "Petrolina", "Suncheon", "St. Petersburg", "Dera Ghazi Khan", "Kindu", "Oruro", "Dezfūl", "Osmaniye", "Lafayette", "Kyŏngju", "Dumai", "Kakogawachō-honmachi", "Gent", "Geelong", "Çorlu", "Nawabshah", "Gelsenkirchen", "Fukui", "Mönchengladbach", "Bordeaux", "Annaba", "Venice", "Barueri", "Nonthaburi", "Laredo", "Jersey City", "Quảng Ngãi", "Concord", "Damanhūr", "Dongta", "Ciudad Benito Juárez", "Cascavel", "Hiratsuka", "Columbus", "Chandler", "Governador Valadares", "Sakarya", "Tagum", "Kunduz", "Ciudad Santa Catarina", "Los Mochis", "Sōka", "Texcoco", "Mişrātah", "Isparta", "Etāwah", "Huayin", "McKinney", "Playa del Carmen", "Scottsdale", "Wolverhampton", "Killeen", "Bergen", "Tallahassee", "Shinozaki", "Horlivka", "Antsirabe", "Ondo", "Hakodate", "Ấp Đa Lợi", "Foz do Iguaçu", "Tokushima", "Peoria", "Santa Maria", "Kediri", "Fort-de-France", "Damaturu", "Malolos", "La Paz", "Wilmington", "Rāichūr", "Mawlamyine", "Turmero", "Kuala Terengganu", "Daloa", "Puerto Princesa", "Qarshi", "Montgomery", "Gilbert", "Rishon LeẔiyyon", "Ongole", "Arua", "Verona", "Bharatpur", "Rạch Giá", "Kanggye", "Taganrog", "Buenaventura", "Kızıltepe", "Vitoria-Gasteiz", "El Fasher", "Várzea Grande", "Glendale", "Santiago del Estero", "Uşak", "Begusarai", "North Las Vegas", "Sonīpat", "Los Teques", "Mabalacat", "Jinshi", "Osh", "Iwo", "Bata", "Chōfugaoka", "Komsomol’sk-na-Amure", "Bābol", "Galaţi", "Al Bayḑā’", "Yamagata", "Manzhouli", "Kiel", "Braunschweig", "Rivne", "Gdynia", "Palangkaraya", "Al Minyā", "Ḩafr al Bāţin", "Caruaru", "San Bernardo", "Būkān", "Aachen", "Sahiwal", "Chigasaki", "Thủ Dầu Một", "Sibu", "Anchorage", "Paraná", "Oruro", "Merlo", "Syktyvkar", "Khimki", "Birāṭnagar", "Chemnitz", "Saskatoon", "Yato", "Colón", "Abertawe", "Fuji", "Puerto Montt", "Jessore", "Beichengqu", "Tuy Hòa", "Shrīrāmpur", "Chesapeake", "Hāpur", "Bahir Dar", "Manisa", "Tanga", "Sabzevār", "Rāmgundam", "Porto", "Tacloban", "Myitkyina", "Barnstable", "Haeju", "Petaẖ Tiqwa", "Norfolk", "González Catán", "Juazeiro do Norte", "Diaobingshancun", "Tarapoto", "Zhangping", "San Juan del Río", "Tsukuba-kenkyūgakuen-toshi", "São Carlos", "Ilhéus", "Fremont", "Halle", "Düzce", "Anju", "Aarhus", "Kennewick", "Hobart", "Artux", "Chimoio", "Limassol", "Garland", "Magdeburg", "Irving", "Hachimanchō", "Longueuil", "Mokpo", "Košice", "‘Ajmān", "Lille", "Neya", "Banda Aceh", "Le Havre", "Taiping", "P’yŏng-dong", "Springs", "Ivano-Frankivsk", "As Sīb", "Nārāyanganj", "Wuyishan", "Sato", "Āmol", "Quilmes", "Mirpur Khas", "Nizhnekamsk", "Visalia", "Al Jubayl", "Pathein", "Secunderābād", "Chishui", "Centurion", "Atlantic City", "Uluberiya", "Shakhty", "Messina", "Pākdasht", "El Tigre", "Kremenchuk", "Abhā", "Ibb", "Garoua", "Bole", "Najafābād", "Bayamo", "Porbandar", "Granada", "Kamianske", "Borūjerd", "Singaraja", "Miri", "Machala", "Longquan", "Monclova", "Puducherry", "Olongapo", "Saga", "Nashua", "Santarém", "Paradise", "Okara", "Kasukabe", "Talisay", "Hialeah", "Saidpur", "York", "Burnaby", "Rancagua", "Dzerzhinsk", "Milton Keynes", "Marília", "Barishal", "Bratsk", "Jiayuguan", "Arlington", "Indaiatuba", "Freiburg im Breisgau", "Madan", "Qarchak", "Itabuna", "Neuquén", "Ibb", "Ageoshimo", "Badalona", "Singkawang", "Orsk", "Vizianagaram", "Evansville", "Cotia", "North Hempstead", "Pāli", "Noginsk", "Kropyvnytskyi", "Częstochowa", "Guantánamo", "Krefeld", "Guadalupe", "Kolpino", "Huixquilucan", "Burgas", "Puerto Vallarta", "Avondale", "Nyala", "Brownsville", "Sakurazuka", "Daşoguz", "Türkistan", "Probolinggo", "Atsugichō", "Jacareí", "Gusau", "Buenavista", "Quetzaltenango", "Araraquara", "Angarsk", "Nāgercoil", "Heroica Nogales", "Apapa", "Nyanza", "Itapevi", "Bạc Liêu", "Varāmīn", "Padangsidempuan", "Karnāl", "Mubi", "Toamasina", "Engels", "Campeche", "Korolëv", "Cidade de Nacala", "Hunchun", "Tampere", "Minamiōzuma", "Blagoveshchensk", "Velikiy Novgorod", "Ashdod", "Carlos Manuel de Céspedes", "Niğde", "Sandton", "Tanjore", "Staryy Oskol", "Puri", "Cartago", "Ji’an Shi", "Soledad de Graciano Sánchez", "Presidente Prudente", "José C. Paz", "Ternopil", "Rufisque", "Guéckédou", "Formosa", "Gabès", "Imperatriz", "Sambhal", "Polokwane", "Neyshābūr", "Sidon", "Radom", "Lutsk", "La Serena", "Gujiao", "Gulfport", "San Felipe", "Sāveh", "La Vega", "Appleton", "Khomeynī Shahr", "Al Khubar", "Islington", "Córdoba", "San Pedro de Macorís", "Ciudad Acuña", "Sabadell", "Hortolândia", "Bitung", "Naihāti", "Damietta", "Groningen", "Kure", "Manta", "Butembo", "San Miguel", "Concepción", "Netanya", "Bremerton", "Alor Setar", "Hickory", "Lübeck", "Los Ángeles", "Aberdeen", "Luton", "Tacoma", "Denov", "Qostanay", "Banjarbaru", "Sa Đéc", "Norwich", "Petropavl", "Marg‘ilon", "Gangneung", "San Bernardino", "Cúa", "Meycauayan", "Vantaa", "As Samāwah", "Ormoc", "College Station", "Golmud", "Kalamazoo", "Cartagena", "Regina", "Thousand Oaks", "La Victoria", "Shimla", "Mohammedia", "Babruysk", "Roanoke", "Osan", "Geneva", "Criciúma", "Fontana", "Sikasso", "Warnes", "Padova", "Ciudad Madero", "Oberhausen", "Jalālābād", "Moreno Valley", "Sidi Bel Abbès", "Jerez de la Frontera", "Limbe", "Timon", "Ploieşti", "Metepec", "Pskov", "Bila Tserkva", "Dayr az Zawr", "Babylon", "Chungju", "San-Pédro", "Bukit Mertajam", "Ijebu-Ode", "Cork", "Pamplona", "Guarenas", "Rostock", "Dongning", "Moratuwa", "Ich’ŏn", "Puerto Cabello", "Beersheba", "Nasīm Shahr", "North Port", "La Romana", "Lubuklinggau", "Qinā", "Mary", "Santa Cruz", "Fargo", "Huangyan", "Santa Clara", "Kharagpur", "Northcote", "Waitakere", "Lobito", "Monywa", "Dindigul", "Morogoro", "Green Bay", "Portoviejo", "Pingzhen", "Linz", "Trieste", "Sacala", "Itami", "Phan Thiết", "Kalemie", "Biskra", "Ingrāj Bāzār", "Banī Suwayf", "Ellore", "Mossoró", "Mytishchi", "Zanzibar", "Jiutai", "Qā’em Shahr", "Bolu", "Amarillo", "Ziguinchor", "Ternate", "Puqi", "Sete Lagoas", "Bené Beraq", "Toruń", "Coquimbo", "Mandi Burewala", "Kamirenjaku", "Marawi City", "Erfurt", "Portland", "Matsue", "Biysk", "Charleroi", "Kassel", "Poza Rica de Hidalgo", "Tanjungpinang", "Zhubei", "Djougou", "Luxor", "Huntington", "Tarakan", "Santa Barbara", "Gainesville", "Las Tunas", "Lyubertsy", "Sosnowiec", "Arica", "Huacho", "Debrecen", "Nandyāl", "Cajamarca", "Croydon", "Lashkar Gāh", "Yachiyo", "Haldia", "San Pablo de las Salinas", "Jacobabad", "Tokat", "Qyzylorda", "Néma", "Olympia", "Gurgaon", "Liège", "Oulu", "El Jadid", "Frisco", "Isidro Casanova", "Maīmanah", "Yonkers", "Rio Claro", "Norwich", "Az Zāwīyah", "Bulandshahr", "Kasama", "Divinópolis", "Puerto Cortés", "Lahad Datu", "Bojnūrd", "Spring Valley", "Pagadian", "Nagareyama", "Banja Luka", "Glendale", "Huntington Beach", "Almería", "Brescia", "Baharampur", "Taranto", "Ashino", "Talca", "Martapura", "Chakradharpur", "Deltona", "Chilpancingo", "Naga City", "Richmond", "H̱olon", "Gemena", "Tocuyito", "Oradea", "Legazpi City", "Hedong", "Madhyamgram", "Aurora", "Bhiwāni", "Burhānpur", "Mbanza-Ngungu", "Huánuco", "Prokopyevsk", "Rajin", "Ghāndīnagar", "Eldoret", "Tegucigalpita", "Hino", "Kusŏng", "Sūhāj", "Suzuka", "Khammam", "Kırıkkale", "Ar Raqqah", "Kumagaya", "Higashi-Hiroshima", "Brikama", "Acarigua", "Hugli", "Viranşehir", "San Luis Río Colorado", "Iskandar", "Tempe", "Naka", "Kenema", "Overland Park", "Bandar-e Būshehr", "Yamaguchi", "Parma", "Anseong", "Yuzhno-Sakhalinsk", "Richmond Hill", "Desē", "Gorontalo", "Cholula de Rivadabia", "Guacara", "Grand Prairie", "Quelimane", "Tébessa", "San Fernando", "Al Jahrā’", "Karaman", "Cap-Haïtien", "Oakville", "Muar", "Prato", "Godoy Cruz", "Muş", "Hyesan", "Kielce", "Arapiraca", "Valencia", "Sunrise Manor", "Araçatuba", "Swindon", "Guanare", "Waco", "Basildon", "Madiun", "Kawara", "Gibraltar", "Valera", "Barrancabermeja", "Mahbūbnagar", "Pasuruan", "Aydın", "Shibīn al Kawm", "Armavir", "Balakovo", "Rio Grande", "Batu", "Salinas", "Mwene-Ditu", "Sơn Tây", "Ferraz de Vasconcelos", "Santa Bárbara d’Oeste", "Oviedo", "Saddiqabad", "Rybinsk", "Anjōmachi", "Chŏngju", "Cachoeiro de Itapemirim", "Jōetsu", "Saint-Denis", "Hagen", "Ngaoundéré", "Potosí", "San Carlos City", "Pak Kret", "Waterbury", "Donghua", "Parakou", "Mutare", "Kōfu", "Mataró", "Narsingdi", "Araure", "Tottori", "Pinar del Río", "Clarksville", "Rāiganj", "Prabumulih", "Tachikawa", "Al Ḩasakah", "Turku", "Iquique", "Cedar Rapids", "San Diego", "Gharyān", "Bournemouth", "Chaedŏk", "Izuo", "La Plata", "Prizren", "Sioux Falls", "Mainz", "Cabo Frio", "Shendi", "Reims", "Ed Damazin", "Khŭjand", "Huntington", "Dunhuang", "Mahesāna", "Modena", "Guri", "Jamaame", "Panabo", "Ādoni", "Temirtaū", "Basel", "Yei", "Santo Agostinho", "Ontario", "Toyokawa", "Luzhang", "Hagerstown", "Al Qāmishlī", "Manzanillo", "Erie", "Vancouver", "Nampa", "Fardīs", "Fianarantsoa", "Banjar", "Severodvinsk", "Rzeszów", "Calbayog City", "Bhusāval", "Trondheim", "Uji", "Passo Fundo", "Aqtaū", "Reggio di Calabria", "Niš", "Abakan", "Burlington", "Bahraigh", "Bo", "Worthing", "Pinrang", "Spartanburg", "Brăila", "Nova Friburgo", "Gastonia", "Amadora", "Braga", "Fort Lauderdale", "Kabankalan", "Tonk", "Berazategui", "Khowy", "Sirsa", "Narashino", "Tāngāil", "Jaunpur", "Saarbrücken", "Santo Tomas", "Petropavlovsk-Kamchatskiy", "Sittwe", "Phan Rang-Tháp Chàm", "Jīma", "Townsville", "Lhokseumawe", "Gliwice", "Funtua", "Hinthada", "La Rioja", "Çanakkale", "Madanapalle", "Palopo", "Ayacucho", "Tunja", "Obuase", "Alleppey", "Ipswich", "Boma", "Tiaret", "Edirne", "Longjing", "Split", "Lorain", "Klerksdorp", "Murfreesboro", "High Point", "Hamm", "Tarija", "Al ‘Arīsh", "El Oued", "Paita", "Newport News", "Torbalı", "Potsdam", "Langsa", "Bade", "Bida", "Şalālah", "Matosinhos", "Baranavichy", "Bīrjand", "Vellore", "Dam Dam", "Bejaïa", "Rancho Cucamonga", "Norilsk", "Santander", "Hemet", "Yangmei", "Ciudad Valles", "Kadugli", "Les Cayes", "Hitachi", "Sunderland", "Letpandan", "Kamakurayama", "Zabrze", "Almada", "Ilford", "Cuautla", "Santa Cruz", "Saint-Louis", "Barra Mansa", "Ait Melloul", "Plzeň", "Ciudad del Carmen", "Danbury", "Toulon", "Peoria", "Oeiras", "Dagupan City", "Ereğli", "Oceanside", "Shibirghān", "Chandannagar", "Harar", "Middlesbrough", "Tyre", "Koronadal", "Olsztyn", "Cuddalore", "Marāgheh", "Ōbiraki", "Tebingtinggi", "Comitán", "San Francisco de Macorís", "Takaoka", "Sīrjān", "Tanauan", "Menemen", "Malaybalay", "Elk Grove", "Syzran", "Carúpano", "Saint-Étienne", "Lagos de Moreno", "León", "Chīrāla", "Titāgarh", "Bielsko-Biała", "Beppuchō", "Bytom", "Linjiang", "Hạ Long", "Deo", "Pembroke Pines", "Tlemcen", "Albacete", "Castellón de la Plana", "Shāhīn Shahr", "Comodoro Rivadavia", "Ludwigshafen", "Vallejo", "Escuintla", "Izumo", "Bertoua", "Banyuwangi", "Mülheim", "Sacaba", "Carpina", "Banhā", "Barrie", "Krasnogorsk", "Kaolack", "Sakura", "Burgos", "Guanajuato", "Reggio Emilia", "Francisco Morato", "Garden Grove", "Volgodonsk", "Bago", "Niiza", "Toledo", "Kamensk-Ural’skiy", "Kohat", "Nishio", "Loja", "Cuauhtémoc", "Medford", "Hamilton", "Ussuriysk", "Uvira", "Portmore", "Machilīpatnam", "Bordj Bou Arreridj", "Nukus", "Malāyer", "N’Zérékoré", "Cary", "Kluang", "Novocherkassk", "Marysville", "Digos", "San Luis", "Corona", "Oldenburg", "Medinīpur", "Fenglu", "Al Marj", "Sŏsan", "Ocala", "Sonsonate", "Gondomar", "Sarh", "Jamālpur", "Fredericksburg", "Sobral", "Ambato", "Bāramūla", "Roxas City", "Sorsogon", "Oyama", "Takaoka", "Tanjungbalai", "Hŭich’ŏn", "Uppsala", "Itapecerica da Serra", "São Caetano do Sul", "Zlatoust", "Rustenburg", "Pátra", "Ríohacha", "Nador", "Iwata", "Gainesville", "Itu", "Fatehpur", "‘Ar‘ar", "Hà Tĩnh", "Al Kūfah", "Kimberley", "Tenāli", "Skikda", "Nantou", "Siirt", "Kuytun", "Osnabrück", "Rio Largo", "Körfez", "Perugia", "Udipi", "Oshawa", "Klaipėda", "Leverkusen", "Tuluá", "Idlib", "Warrington", "Sitalpur", "Cienfuegos", "Bayamón", "Proddatūr", "Conjeeveram", "Saqqez", "Dourados", "Huddersfield", "Fukang", "Ube", "Slough", "Bhisho", "Chillán", "Enterprise", "Odense", "Metro", "Ramat Gan", "Muridke", "Ipswich", "Ruse", "Myingyan", "Chapecó", "Tangjin", "Tema", "‘Unayzah", "Barreiras", "Piedras Negras", "Itapetininga", "Pocheon", "Turgutlu", "Navsāri", "Wau", "Gölcük", "Muzaffargarh", "Jizzax", "Atyraū", "Simao", "Mostar", "El Geneina", "Bandar-e Māhshahr", "Manchester", "Anaco", "Sullana", "Godhra", "Zemun", "Mahābād", "Budaun", "Chittoor", "Andong", "Ash Shaţrah", "Moçâmedes", "Rafsanjān", "Benoni", "Heidelberg", "Al Ghardaqah", "Salihli", "Elektrostal", "Bontang", "Đồng Hới", "Krishnanagar", "Szeged", "Sherbrooke", "Solingen", "Tacheng", "Dhamār", "José María Ezeiza", "Bragança Paulista", "Ra’s al Khaymah", "Pindamonhangaba", "Dijon", "Livorno", "Khōst", "Darmstadt", "Saint-Marc", "Arad", "Khanpur", "Matsuzaka", "Taunggyi", "Bingöl", "San Nicolás de los Arroyos", "Huaycan", "Tiraspol", "Shahr-e Kord", "Talas", "Punta del Este", "Ekibastuz", "Trece Martires City", "Ōgaki", "Hat Yai", "Chirchiq", "Catamarca", "Nakhodka", "Jijiga", "Kramatorsk", "Champaign", "Alexandria", "George", "Herne", "Ravenna", "Zarzis", "Hayward", "La Laguna", "Higashi-murayama", "Saharsa", "Stara Zagora", "Châu Đốc", "Guimarães", "Harīpur", "Springfield", "San Cristóbal", "Rafael Castillo", "Villanueva", "Gojra", "Lakewood", "Oxford", "Villeurbanne", "Lafayette", "Fethiye", "Ŭiwang", "Navojoa", "Calama", "Erzincan", "Middelburg", "Mandi Bahauddin", "Zonguldak", "Hitachi-Naka", "Isiro", "Jinggangshan", "Jiutepec", "Batumi", "Pathānkot", "Nazilli", "Frederick", "Lajes", "Piteşti", "Chlef", "Chetumal", "Rondonópolis", "Esmeraldas", "Angers", "Hanam", "Daiwanishi", "Matagalpa", "Salzburg", "Vidisha", "Cẩm Phả", "Kariya", "Tochigi", "Lake Charles", "Odessa", "Nalgonda", "Ordu", "San Cristóbal", "Tuscaloosa", "Horad Barysaw", "Neuss", "Miskolc", "Warner Robins", "Bartın", "Palmdale", "Melitopol’", "Zango", "Tama", "Hollywood", "Bālurghāt", "Midland", "Surigao", "Dibrugarh", "Mahajanga", "Salavat", "Bandırma", "Leesburg", "Tuguegarao", "Gandajika", "Silao", "Regensburg", "Ueda", "Port Arthur", "York", "Palo Negro", "Almetyevsk", "Kafr ash Shaykh", "Noda", "Seogwipo", "Moanda", "Tete", "Mzuzu", "Fyzābād", "Harrow", "Poole", "Semnān", "Hoeryŏng", "Kırşehir", "Muskegon", "Sievierodonetsk", "Guarapuava", "Sinp’o", "Silchar", "Macon", "Kökshetaū", "Macaé", "Cairns", "Yilan", "Papantla de Olarte", "Kansas City", "Ciudad de Melilla", "Shāntipur", "Kukichūō", "Golmeh", "Zabīd", "Peristéri", "Hindupur", "Sunnyvale", "Baubau", "Mudon", "Sayama", "Taza", "Settat", "Imabari", "Foggia", "Erode", "Poços de Caldas", "Gwangyang", "Tororo", "Gonbad-e Kāvūs", "Al Manāqil", "Miass", "Tulancingo", "Nîmes", "Chinandega", "Saint Albans", "Nakhodka", "Quevedo", "Bintulu", "Pomona", "Siem Reap", "Escondido", "Cao Lãnh", "Riobamba", "Vryheid", "Aş Şuwayḩirah as Sāḩil", "Paderborn", "Zamora", "Manzanillo", "Pasadena", "Florencio Varela", "Komaki", "Talcahuano", "Kerch", "Patos de Minas", "Copiapó", "Badajoz", "M’Sila", "Kragujevac", "Pointe-à-Pitre", "Willemstad", "Rimini", "Dundee", "Jijel", "Ocumare del Tuy", "Valdivia", "Gulu", "La Ceiba", "Shāhrūd", "Iruma", "Kashikishi", "Sumbawanga", "Keren", "Odivelas", "New Bedford", "Jāmuria", "Kutaisi", "Potchefstroom", "Shimotoda", "Concordia", "Abbottabad", "Delicias", "Mallawī", "Ağrı", "Amasya", "Lạng Sơn", "Salamanca", "Kastamonu", "Marvdasht", "Goma", "Yonago", "Chingola", "Fairfield", "Mostaganem", "Hābra", "Mauli", "Sibiu", "Naperville", "Quilpué", "Dolores Hidalgo Cuna de la Independencia Nacional", "Kopeysk", "Lüleburgaz", "Al Ḩawīyah", "Bellevue", "Binghamton", "Nchelenge", "Negombo", "Ambāla", "Disūq", "Mangghystaū", "Malakal", "Bacău", "Osorno", "Elkhart", "Topeka", "Mogi Guaçu", "Man", "Joliet", "Pyatigorsk", "Clermont-Ferrand", "Moshi", "Dar‘ā", "Rubtsovsk", "Cam Ranh", "Wamba", "Franco da Rocha", "Dadu", "Sagay", "Bălţi", "San Juan", "Kolomna", "Lárisa", "Misato", "San Miguel de Allende", "Beaumont", "Paranaguá", "García", "Kakamigahara", "Logroño", "Matanzas", "Ilagan", "David", "Le Mans", "San Justo", "Qūchān", "Berezniki", "Shillong", "Ereğli", "Tizi Ouzou", "Durrës", "Yalova", "Villa de Cura", "Paterson", "Merced", "Kolār", "Cape Coast", "Al Mukallā", "Dongxing", "Comayagua", "Barranca", "Khasavyurt", "Saguenay", "Tuxtepec", "Kairouan", "Marbella", "Huelva", "Kumba", "Parnaíba", "Barrechid", "Bharatpur", "Saïda", "Kusatsu", "Florencia", "Pueblo", "Pleiku", "Coimbra", "Ajdābiyā", "Tyler", "Ciego de Ávila", "Pécs", "Ghaznī", "Blackpool", "Nawābganj", "Altay", "El Progreso", "Torrance", "Pemba", "Jaú", "Metairie", "Touggourt", "Túxpam de Rodríguez Cano", "Nevşehir", "Béchar", "Lévis", "Bhīmavaram", "Bilbays", "Tottenham", "Aix-en-Provence", "Cizre", "Arnhem", "Gisenyi", "Fukayachō", "Yuma", "Telford", "Lichinga", "Ozamiz City", "Moundou", "Tetovo", "Nizip", "Maykop", "Lausanne", "Kamālshahr", "Gweru", "Kelowna", "Castanhal", "Irákleio", "Mandsaur", "Rybnik", "Nong’an", "Rize", "Vlorë", "Bizerte", "Jahrom", "Surprise", "Columbia", "Colima", "Ishizaki", "Athens", "Roseville", "Thornton", "Khuzdar", "Tepatitlán de Morelos", "Abbotsford", "Mati", "Ruda Śląska", "Miramar", "Batu Pahat", "Schaarbeek", "Pasadena", "Kovrov", "Mesquite", "Odintsovo", "Kuwana", "Kidapawan", "Santa Maria", "Olathe", "Masaya", "Médéa", "Yaritagua", "San Jose", "Houma", "Sāmarrā’", "Koga", "Sale", "Carolina", "Al ‘Aqabah", "Torbat-e Ḩeydarīyeh", "Dawei", "Boulogne-Billancourt", "Zielona Góra", "Atbara", "Tours", "Pakpattan", "Shizuishan", "Tsuchiura", "Chicacole", "Botucatu", "Dhahran", "Pābna", "Coquitlam", "Carrollton", "Tân An", "Souk Ahras", "Caxias", "Grand Junction", "Zacatecas", "Barahona", "Kokubunji", "Pīrānshahr", "Tiruvannāmalai", "Amiens", "Umtata", "Charleston", "Orange", "Fullerton", "Sancti Spíritus", "Boulogne-sur-Mer", "Jequié", "Bat Yam", "Boca del Rio", "Mojokerto", "Darwin", "Zama", "Ingolstadt", "Mandya", "Greeley", "Ch’ungmu", "Al Khmissat", "Birgañj", "Iğdır", "Lira", "Jicheon", "Yaizu", "Gunungsitoli", "Danao", "Yunxian Chengguanzhen", "Atibaia", "Jyväskylä", "Bānkura", "Inazawa", "Salerno", "Vila Franca de Xira", "Quillacollo", "Santa María Texmelucan", "Livingstone", "Toowoomba", "Bima", "Porto Amboim", "Maia", "Tarragona", "Encarnación", "Kisarazu", "Marīvān", "Uppsala", "Chech’ŏn", "Jinotega", "Pageralam", "Giresun", "Termiz", "Zinacantepec", "Târgu-Mureş", "Las Cruces", "’s-Hertogenbosch", "Panama City", "Blitar", "Harlingen", "Chiang Mai", "Brighton", "Tobruk", "Tauranga", "Pyay", "Cartago", "Santiago", "May Pen", "Urganch", "Zākhū", "Dumaguete City", "West Valley City", "Shuangcheng", "Andīmeshk", "Ōme", "Tabaco", "Nakhon Ratchasima", "Isahaya", "Ashqelon", "Shahreẕā", "Zābol", "Ramapo", "Hampton", "Calapan", "Trois-Rivières", "Urdaneta", "Milagro", "Heroica Guaymas", "Apatzingan de la Constitucion", "Batticaloa", "Reẖovot", "Abiko", "Idfū", "Tando Allahyar", "Warren", "Mauldin", "Bloomington", "Enfield", "Ségou", "Coral Springs", "Innsbruck", "Battambang", "Hassan", "Round Rock", "Yakima", "Khorramshahr", "Onomichi", "Papeete", "Ouargla", "Trà Vinh", "Narita", "Ninh Bình", "San Carlos", "Győr", "Ödemiş", "Kamëz", "San Luis", "Ibarra", "Sterling Heights", "Stavanger", "Yavatmāl", "Ferrara", "Kent", "Karabük", "High Wycombe", "Jaraguá do Sul", "Calabozo", "Lae", "Kigoma", "Pīlibhīt", "Guelph", "Pālghāt", "Buea", "Los Guayos", "Rijeka", "Spanish Town", "Pālakollu", "Kislovodsk", "Dipolog", "Surat Thani", "Ciénaga", "Parepare", "Girardot", "Burlington", "Abohar", "Tychy", "Marand", "Quibdó", "Kānchrāpāra", "Annecy", "Bellingham", "Kozan", "Udon Thani", "Iwakuni", "Jīroft", "Tabora", "Santa Clara", "Västerås", "Çayırova", "Sannār", "Lucheng", "Racine", "Greenville", "Estelí", "Taldyqorghan", "Cambridge", "Calabayan", "Baidoa", "Jaramānā", "Fürth", "Serpukhov", "Bolton", "Tukuyu", "Stamford", "Villa Alemana", "Kadoma", "Táriba", "Würzburg", "Songnim", "Mansa", "Elizabeth", "Opole", "Novocheboksarsk", "Araras", "Romford", "Mīt Ghamr", "Puno", "Jaranwala", "Salto", "Newport", "Alagoinhas", "Ōmiyachō", "Kamina", "Seto", "Pinsk", "Vihari", "Pôrto Seguro", "Koforidua", "Ixtlahuaca", "Temperley", "Bataysk", "Whitby", "Sakākā", "Tumen", "Örebro", "Mỹ Tho", "Hāthras", "Divo", "Guasdualito", "Domodedovo", "Darnah", "Port Blair", "Cubatão", "Jāzān", "Anderlecht", "Alīpur Duār", "Neftekamsk", "Johnson City", "Silay", "Chilapa de Álvarez", "León", "Bam", "Ulm", "Lafia", "Tây Ninh", "Iizuka", "Santana de Parnaíba", "Heilbronn", "Rustavi", "Pakokku", "Payakumbuh", "Angren", "Sogamoso", "Leiria", "Basīrhat", "Miramar", "Leeuwarden", "Gafsa", "Ünye", "Ramos Mejía", "Navadwīp", "Pforzheim", "Exeter", "Lynchburg", "Guntakal", "Pangkalpinang", "Latina", "Simi Valley", "Daitōchō", "Aalborg", "Guelma", "Barbacena", "Monza", "Tengyue", "Solihull", "Dunedin", "Hālīsahar", "Nefteyugansk", "Magway", "Shashemenē", "Rishra", "Malanje", "Magelang", "Gashua", "Shchelkovo", "Kampong Cham", "Santa Tecla", "Novomoskovsk", "Gorzów Wielkopolski", "Cam Ranh", "Giugliano in Campania", "Kumbo", "Cagua", "Cádiz", "Jandira", "Ghardaïa", "Gateshead", "Honchō", "Uruguaiana", "Curicó", "Orizaba", "Ciudad de Atlixco", "Fort Smith", "Resende", "Polatlı", "Porlamar", "Kenosha", "Amherst", "Gingoog", "Dūmā", "Wolfsburg", "South Lyon", "Pouso Alegre", "Maastricht", "Pervouralsk", "Hosan", "Ise", "Boulder", "Bimbo", "Baia Mare", "Savannakhet", "Al Ḩajar al Aswad", "Kadirli", "Brits", "Cherkessk", "Indramayu", "Higüey", "Rudnyy", "Khrustalnyi", "Honmachi", "Pescara", "Pleven", "Hội An", "Derbent", "Preston", "Villa de Álvarez", "Pati", "Tsuruoka", "Munūf", "Gagnoa", "Punta Arenas", "Dąbrowa Górnicza", "Munch’ŏn", "Khénifra", "Alberton", "Lianhe", "San Fernando", "Jirjā", "Patnos", "Bergamo", "Blackburn", "Barretos", "Machiques", "Ciudad Hidalgo", "Jalapa", "Yonashiro-teruma", "Behbahān", "Elbląg", "Baidyabāti", "Pearland", "Mufulira", "Maina", "Kashiwara", "Kotamobagu", "Dharmavaram", "Edéa", "Setúbal", "Montreuil", "Ciudad Ojeda", "Pedro Juan Caballero", "Fier", "Orekhovo-Zuyevo", "Kamalia", "Gyumri", "Hòa Bình", "Perpignan", "Larache", "Siracusa", "Dorūd", "Puerto Barrios", "Ribeirão Pires", "Samandağ", "Upington", "Walthamstow", "Berkeley", "Płock", "Richardson", "Doğubayazıt", "Redding", "Arvada", "Valinhos", "St. George", "Kot Addu", "Göttingen", "Pakxé", "Billings", "Carcar", "Handa", "Gao", "Guelmim", "Puerto Plata", "Darjeeling", "Yuba City", "Moḩammad Shahr", "Sertãozinho", "Fujimino", "Poá", "Ebetsu", "Saint-Denis", "San Carlos", "Ciudad Choluteca", "Várzea Paulista", "Rochester", "Kaspiysk", "Zahlé", "East Los Angeles", "Gudivāda", "Naz̧arābād", "Leominster", "Ajax", "Kingsport", "Butwāl", "Nouadhibou", "Duluth", "Nobeoka", "Beppu", "Nazran", "Sopur", "Iguala de la Independencia", "Guaratinguetá", "Lehigh Acres", "Huaraz", "Kōnosu", "Rock Hill", "Ikoma", "Gilroy", "Cheltenham", "Cambridge", "Nevinnomyssk", "Bruges", "Lahti", "Reutov", "Bandundu", "Charallave", "Nowshera", "Dharān", "Anuradhapura", "Birigui", "Bottrop", "Santa Cruz do Sul", "Sugar Land", "Akishima", "Karatepe", "Forlì", "Cuautitlán", "Tecomán", "Giyon", "Texas City", "Bama", "Bayawan", "Iowa City", "Saginaw", "Trento", "Kabwe", "Jalingo", "Luanshya", "Agadez", "Uzhhorod", "Besançon", "Adilābād", "Obninsk", "Chico", "San Martín", "Kapaklı", "Basingstoke", "Wałbrzych", "Maidstone", "Xai-Xai", "Linköping", "Reutlingen", "Langley", "Dover", "Temixco", "Belfort", "Kindia", "Narasaraopet", "Nyíregyháza", "Kyzyl", "Conselheiro Lafaiete", "Machakos", "Nkongsamba", "Smithtown", "Norman", "Mendoza", "Clearwater", "Tandil", "Manp’o", "Kōenchō", "Buzău", "Araguari", "Tatuí", "Niihama", "Naga", "Dimitrovgrad", "Port-Gentil", "Sassari", "Coeur d'Alene", "Ponce", "Chittaurgarh", "Seaside", "Independence", "Argenteuil", "Boké", "West Jordan", "Abilene", "Phatthaya", "Khon Kaen", "Ramenskoye", "Nasushiobara", "Kilis", "Shibuya", "Nabeul", "Parral", "Swabi", "Sano", "Huejutla de Reyes", "Sabhā", "Tahoua", "Chelmsford", "Doncaster", "Valle de La Pascua", "Bloomington", "Toliara", "Garanhuns", "Berdyans’k", "El Monte", "Otaru", "Carlsbad", "North Charleston", "Bānsbāria", "Puerto Madryn", "Helsingborg", "Nagahama", "Hatsukaichi", "Sloviansk", "Koblenz", "Oktyabr’skiy", "Maribor", "St. Cloud", "Salto", "Zhijiang", "Chorzów", "Hōfu", "Las Delicias", "Lilan", "Bijeljina", "Temecula", "Bremerhaven", "Kamagaya", "Bet Shemesh", "Ciudad de la Costa", "Clovis", "Bernal", "Vālpārai", "Iringa", "Kandy", "Hikone", "Cuito", "Ōshū", "Nikopol’", "Laghouat", "Meridian", "Saanich", "Āsela", "Kankan", "Kuşadası", "Joünié", "Colchester", "Recklinghausen", "Pul-e Khumrī", "Tawau", "San Francisco del Rincón", "Vicenza", "Paarl", "Īrānshahr", "Sørum", "Habikino", "Itatiba", "Ubá", "Caraguatatuba", "Bukittinggi", "Higashiōmi", "Wythenshawe", "Erlangen", "Sa-ch’on", "Kipushi", "Linhares", "Catanduva", "Akçakale", "Bergisch Gladbach", "City of Isabela", "Brandon", "Jaén", "Novyy Urengoy", "Montero", "Burdur", "Westminster", "Castelar", "Sokodé", "Costa Mesa", "Rotherham", "Hualien", "San Carlos de Bariloche", "Tondabayashichō", "Monroe", "Zwolle", "Utica", "Santa Lucía", "Carora", "Khenchela", "Iriga City", "Champdani", "Remscheid", "Kamyshin", "Osmānābād", "Algeciras", "Esteban Echeverría", "Dolgoprudnyy", "Shkodër", "Jena", "Mopti", "Kars", "Olmaliq", "Cavite City", "Kuopio", "Ciudad Mante", "Pompano Beach", "Tablada", "Laoag", "Zhukovskiy", "West Palm Beach", "Funchal", "Ligao", "Kuqa", "Nsukka", "Escuintla", "Kazo", "Hounslow", "Terni", "Waterloo", "Trier", "Terrebonne", "Namur", "Rochdale", "Murom", "Bedford", "Everett", "Manzini", "El Centro", "Villa Mercedes", "Winterthur", "Jawhar", "Sandachō", "Tuzla", "Tarnów", "Santa Fe", "Khardah", "Gapan", "Nguru", "Downey", "Stockport", "Kecskemét", "Lowell", "Ahuachapán", "Fresnillo", "Centennial", "Włocławek", "Fasā", "As Salamīyah", "Yessentuki", "Elgin", "Tabuk", "Kiffa", "Dali", "Yenangyaung", "Ourinhos", "Quíbor", "Borāzjān", "Richmond", "Shinyanga", "Ash Shaykh ‘Uthmān", "Genhe", "Montego Bay", "Jeonghae", "Shirayamamachi", "Bāneh", "Mascara", "Darlington", "Broken Arrow", "Tinaquillo", "Milton", "Yŏju", "Bangaon", "Miami Gardens", "Bagé", "Pisco", "Dera Ismail Khan", "Taitung", "Mineshita", "The Woodlands", "Bend", "Burlington", "Kandi", "Taourirt", "Apucarana", "Koszalin", "Baybay", "Labé", "Jurupa Valley", "Gualeguaychú", "Caen", "Botoşani", "Sandy Springs", "Yŏngju", "Gresham", "Uitenhage", "Bukoba", "Corumbá", "Maxixe", "Lewisville", "Ipiales", "Hillsboro", "Soma", "San Buenaventura", "Musoma", "Novoshakhtinsk", "Crawley", "Ferizaj", "Ikeda", "St. John's", "Jacksonville", "Salford", "Wembley", "Pottstown", "Tajimi", "Moncton", "Tādpatri", "Yāsūj", "Jalpāiguri", "Dagenham", "Barletta", "Birnin Kebbi", "Šiauliai", "Seversk", "Teófilo Otoni", "El Limón", "Inglewood", "Orsha", "An Nuhūd", "San Rafael", "Tagbilaran City", "Thunder Bay", "Pavlohrad", "Spring Hill", "Yevpatoriya", "Douliu", "Chaman", "Queenstown", "Umm Qaşr", "Sliven", "Suriāpet", "Kogon Shahri", "League City", "Kefar Sava", "Alchevsk", "Gillingham", "Eau Claire", "Bolzano", "Charsadda", "Roubaix", "Turlock", "Temple", "Himamaylan", "Mansfield", "Mmabatho", "Ilebo", "Taungoo", "Dieppe", "Arzamas", "Longjiang", "San Felipe", "Artëm", "Noyabrsk", "Nakhon Si Thammarat", "Petržalka", "Chābahār", "Raba", "La Banda", "Ourense", "Sioux City", "Kemalpaşa", "Salisbury", "Vĩnh Long", "Ballarat", "Davie", "Achinsk", "Daly City", "Toride", "Subotica", "Nusaybin", "Akhmīm", "Azare", "Brovary", "Yelets", "Pushkino", "Liberec", "Mazyr", "Tikrīt", "Robāţ Karīm", "Koutiala", "Lerma", "Ciudad Río Bravo", "Allen", "Tarīm", "Kroonstad", "Kandhkot", "Granada", "Novara", "Kongolo", "Moers", "Kalisz", "Saijō", "Yozgat", "Highlands Ranch", "Al Fāw", "West Covina", "Salzgitter", "Berdsk", "Sparks", "Waterloo", "Tādepallegūdem", "Zomba", "Dobrich", "Sergiyev Posad", "Konotop", "Zihuatanejo", "Bouskoura", "Lysychansk", "Khāk-e ‘Alī", "Maumere", "Samal", "Girona", "San Mateo", "Eastbourne", "Worcester", "Fyfield", "Tula de Allende", "Catbalogan", "Chongshan", "Abengourou", "Lower Hutt", "Kilinochchi", "Sakado", "Isehara", "Piacenza", "Ed Damer", "Norwalk", "Santa Rosa", "Dolisie", "Negapatam", "Wigan", "Osijek", "Siegen", "Gardēz", "Biak", "Columbia", "Elista", "Libertad", "Rialto", "Manteca", "Araxá", "Bumba", "Bayugan", "Talara", "Novokuybyshevsk", "Bergama", "Miryang", "Satu Mare", "Houzhuang", "Hildesheim", "Sangju", "Kırklareli", "Legnica", "Bhadreswar", "Noginsk", "Lida", "Saint Helens", "Talisay", "El Cajon", "Bethal", "Burbank", "Longmont", "Yunfu", "Mayarí", "Mositai", "Dhangaḍhi̇̄", "Kāshmar", "San Felipe del Progreso", "Klagenfurt", "Delta", "Chilakalūrupet", "Şabrātah", "Boryeong", "Shūshtar", "Santo Antônio de Jesus", "Teluk Intan", "Assis", "Berisso", "Renton", "Inzai", "Duitama", "Chatham", "‘Ibrī", "Vista", "Olomouc", "Zheleznogorsk", "Logan", "Sungai Penuh", "Tizayuca", "Socopó", "Prescott Valley", "Ancona", "Trinidad", "Salihorsk", "Vacaville", "San Luis de la Paz", "Chikusei", "Kani", "Edinburg", "Gütersloh", "Sakata", "Carmel", "Spokane Valley", "Oum el Bouaghi", "Jilotepec", "Cottbus", "Edison", "Kpalimé", "San Angelo", "Lakewood", "Kaiserslautern", "Gangtok", "La Crosse", "Ahar", "Diourbel", "Andria", "Tsuyama", "Arden-Arcade", "Masjed Soleymān", "Mairiporã", "Torbat-e Jām", "Magangué", "Kam”yanets’-Podil’s’kyy", "Idaho Falls", "Holland", "Red Deer", "Charlottesville", "Shahrisabz", "Longview", "Woodbridge", "Tracy", "Kamloops", "Arlit"]

    let globalTrot = (entries) => {
        observerOfPlotas.disconnect()
        //player plat
        let plotasToChange = document.getElementsByClassName('plot_with_units_cont_title');
        for (let i = 0; i < plotasToChange.length; i++) {
            let plotas = plotasToChange[i].textContent.split('_')[1]
            if (typeof plotas !== "undefined") {
                //number plat
                plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${plotas}.jpg' width='200' height='200'>`
            } else {
                //named plat
                let plotas = plotasToChange[i].textContent
                let altindex = names.lastIndexOf(plotas)
                let index = names.indexOf(plotas)
                if (altindex !== index) {//double name work around
                    //                 console.log(altindex,index)
                    plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'><img src ='https://meta.tmwstw.io/preview_plots_${altindex}.jpg' width='200' height='200'>`
                } else {
                    plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'>`
                    //console.log(altindex)
                }
            }

        }
        //mass spawner
        let massIVE = document.querySelector("#mass_spawners_plots_txt").innerHTML = `<h3 class="plots_ownership_title" id="mass_spawners_plots_txt" style="display: block;">Spawn at the massive spawner <br><img src ='https://meta.tmwstw.io/preview_plots_120.jpg' width='200' height='200'></h3>`
        let rando = document.querySelector('#random_spawn_button').textContent.split('_')[1]
        if (typeof rando !== "undefined") {
            //number plotas get me a number !
            document.querySelector('#plot_spawn_random_txt').innerHTML = `<h3 class="plots_ownership_title" id="plot_spawn_random_txt" style="display: block;">Spawn at popular plot <br><img src ='https://meta.tmwstw.io/preview_plots_${rando}.jpg' width='200' height='200'></h3>`
        } else {
            //named plota get me the index of the !
            let plotas = document.querySelector('#random_spawn_button').textContent
            let index = names.indexOf(plotas)
            document.querySelector('#plot_spawn_random_txt').innerHTML = `<h3 class="plots_ownership_title" id="plot_spawn_random_txt" style="display: block;">Spawn at popular plot <br><img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'></h3>`
        }
        document.querySelector("#mass_spawners_plots_txt > img").style.filter = 'grayscale(100%)';

    }

    //////////////////////////////////////
    //
    //    M     M      A       PPPPP
    //    M M M M    A   A     P    P
    //    M  M  M    AAAAA     PPPPP
    //    M  M  M    A   A     P
    //    M     M    A   A     P
    //
    ///////////////////////////////////////
    // setup and overlay for globe image
    // on screen with plot counter
    // and faucet information grabbed
    // from api server
    ///////////////////////////////////////


    const observerOfMap = new MutationObserver((entries, observer) => {
        plotThere(observer)
    })


    const targetOfMap = document.querySelector('#plot_owner');
    const configOfMap = {
        childList: true,
    }

    observerOfMap.observe(targetOfMap, configOfMap)

    let plotThere = () => {

        const plot = document.getElementById('plot_id').lastChild.textContent.slice(-4).replace('#', '').replace(' ', '');
        let image = document.getElementById('plot_id');
        //let image = document.querySelector("#title_container")
        let img = document.createElement("img");
        //image.after(img);
        //image.append(img)
        img.src = `https://meta.tmwstw.io/preview_plots_${plot}.jpg`;
        img.height = sidebar;
        img.width = sidebar;

        let fetchData = (call_screen) => {
            let faucetURL = `https://api.imamkatz.com/faucet/${plot}`
            GM_xmlhttpRequest({
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'json',

                url: faucetURL,
                onload: function (response) {
                    let r = response
                    //console.log(r)
                    if (r.responseType == 'json') {
                        let f_dat = r.response;
                        //console.log(f_dat)
                        let bob = f_dat.bob
                        let slag = f_dat.slag
                        let grease = f_dat.grease
                        let ink = f_dat.ink
                        let bobSpan = `<span id='bob'>Bob: ${bob} </span>`
                        let slagSpan = `<span id='slag'>Slag: ${slag} </span>`
                        let greaseSpan = `<span id='grease'>Grease: ${grease} </span>`
                        let inkSpan = `<span id='ink'>InK: ${ink} </span>`
                        // if bob ==20 , slag = 25  grease  or ink = 150 insert style = "color: red; and bolder in the #bob span yo!
                        if (bob == 20) {
                            bobSpan = `<span id='bob' style="color: red; font-weight: bold;">Bob: ${bob} </span>`
                        }
                        if (slag == 25) {
                            slagSpan = `<span id='slag' style="color: red; font-weight: bold;">Slag: ${slag} </span>`
                        }
                        if (grease == 200) {
                            greaseSpan = `<span id='grease' style="color: red; font-weight: bold;">Grease: ${grease} </span>`
                        }
                        if (ink == 150) {
                            inkSpan = `<span id='ink' style="color: red; font-weight: bold;">InK: ${ink} </span>`
                        }
                        // if undefined yellow the span + italic
                        if (bob == undefined) {
                            bobSpan = `<span id='bob' style="color: yellow; font-style: italic;">Bob: ${bob} </span>`
                        }
                        if (slag == undefined) {
                            slagSpan = `<span id='slag' style="color: yellow; font-style: italic;">Slag: ${slag} </span>`
                        }
                        if (grease == undefined) {
                            greaseSpan = `<span id='grease' style="color: yellow; font-style: italic;">Grease: ${grease} </span>`
                        }
                        if (ink == undefined) {
                            inkSpan = `<span id='ink' style="color: yellow; font-style: italic;">InK: ${ink}</span>`
                        }
                        // RUGS if bob grease or ink == 0 then that is a rug color span black BOOO! keep hunting
                        if (bob == 0) {
                            bobSpan = `<span id='bob' style="color: black; font-weight: normal">Bob: ${bob} </span>`
                        }
                        if (slag == 1) {
                            slagSpan = `<span id='slag' style="color: black;font-weight: normal">Slag: ${slag} </span>`
                        }
                        if (grease == 0) {
                            greaseSpan = `<span id='grease' style="color: black;font-weight: normal">Grease: ${grease} </span>`
                        }
                        if (ink == 0) {
                            inkSpan = `<span id='ink' style="color: black;font-weight: normal">InK: ${ink} </span>`
                        }
                        let faucetOut = bobSpan + slagSpan + greaseSpan + inkSpan
                        call_screen(faucetOut, plot)
                    } else {
                        let faucetOut = `<span id='tapped' style="color:Tomato; fontWeight = bolder">UnTapped!</span>`
                        //document.querySelector("#tapped").style.color = "orange";
                        call_screen(faucetOut, plot)
                    }
                }
            })
        }


        let setScreen = (faucet_output, plot_id) => {
            sending_xml(plot_id) //leaderBOARD!!!
            let visit_this_session = `<div class='sessiondata'><span id = 'plats'> Lifetime Plats = ${lifer} </span><br><span id='sessplats'>Plat/sesh = ${how_many}</span><br><span id='faucet' style="color:white; font-weight: bold;">Faucet ${faucet_output}</span>:</div>`;
            image.innerHTML = visit_this_session;
            image.appendChild(img)
            image.setAttribute('style', 'white-space: pre;')
            how_many += 1;
            lifer += 1;
            parseInt(localStorage.setItem('lifetime_plot', lifer), 10)
        }
        fetchData(setScreen);
    };

    function sending_xml(plot_as) {
        console.log(`${ens}@${plot_as}`); //check in display
        const sufferplot = `{
        "suffer" : "${ens}",
        "lifetime_plotas" : "${lifer}",
        "plota" : "${plot_as}",
        "check" : "${plota_ses}"
        }`
        GM_xmlhttpRequest({
            method: "POST",
            url: `https://api.imamkatz.com/api/`,
            data: sufferplot,
            headers: {
                "Content-Type": "application/json"
            },
            onload: function (res, req) {
            }
        });
        plota_ses += 1//
    }


    //////////////////////////////////////////////////////////
    // HUD SETUP
    // cleaned up enteract menu to match colors of HUD on Map
    //////////////////////////////////////////////////////////

    const observerOfHud = new MutationObserver(entries => {
        faucetMenu(observerOfHud.disconnect())
    })

    const targetOfHud = document.querySelector("#faucet_enteract_menu");
    const configOfHud = {
        childList: true,
        attributes: true,
    }
    observerOfHud.observe(targetOfHud, configOfHud)

    let faucetMenu = (obs_dicso) => {
        //console.log(targetOfHud)
        //document.querySelector("#claim_but_container")
        //<div class="claim_but_container" id="claim_but_container">
        //<h3 class="faucet_texts_title" id="claim_cont_title">RESOURCES</h3>
        //<button class="faucet_buttons" id="claim_but_bob" name="claim" style="display: block;">CLAIM 3 $BOB</button>
        //<button class="faucet_buttons" id="claim_but_slag" name="claim" style="display: block;">CLAIM 1 $SLAG</button>
        //<button class="faucet_buttons" id="claim_but_grease" name="" style="display: none;">
        //</button><button class="faucet_buttons" id="claim_but_ink" name="claim" style="display: block;">CLAIM 90 $INK</button></div>
        let bob = document.querySelector("#claim_but_bob")
        let slag = document.querySelector("#claim_but_slag")
        let grease = document.querySelector("#claim_but_grease")
        let ink = document.querySelector("#claim_but_ink")
        // RUGS if bob grease or ink == 0 then that is a rug color span black BOOO! keep hunting
        // if undefined yellow the span + italic
        // if bob ==20 , slag = 25  grease  or ink = 150 insert style = "color: red; and bolder in the #bob span yo!
        if (bob.textContent == 'CLAIM 20 $BOB') {
            bob.style.backgroundColor = '#D00'
            bob.style.color = '#FFF'
        }
        if (slag.textContent == 'CLAIM 25 $SLAG') {
            slag.style.backgroundColor = '#D00'
            slag.style.color = '#FFF'
        }
        if (grease.textContent == 'CLAIM 150 $GREASE') {
            grease.style.backgroundColor = '#D00'
            grease.style.color = '#FFF'
        }
        if (ink.textContent == 'CLAIM 150 $INK') {
            ink.style.backgroundColor = '#D00'
            ink.style.color = '#FFF'
        }
        //return
        obs_dicso
    }


    ///////////////////////////////////
    // give the keyboard focusable suffering
    // some elements need mouse click to close vs 'esc' or double tap toggle "T" for chat
    // 'M' for map
    // esc for faucet menu close
    // photo mode hide ui elements on screen for clean screen caps and shares
    // L changes the compass colors and to make them easier to see on backgrounds
    //
    ////////////////////////////////////////
    let crosshair = document.querySelector("#crosshair_image_2")
    crosshair.src = 'https://tmwttw.imamkatz.com/animated.png' /// dont like the crosshair ....the heart give em something else



    var onKeyEvent = function (ev) {
        var state = "pressed";
        //console.log(event)
        if (ev.code == 'KeyL') {// CAP L hold SHIFT Ocean Search
            let compassRow = document.getElementsByClassName('compas_text_big')
            let places = document.getElementsByClassName('compas_text')
            let distance = document.getElementsByClassName('compas_dist_text')

            for (let i = 0; i < compassRow.length; i++) {
                compassRow[i].style.color = '#D00' // TEXT color of carn diraction 'NSEW'
            }

            let chatCont = document.querySelector("#chat_cont");
            let plotOwner = document.querySelector("#plot_owner");

            if (chatCont.style.fontWeight === 'normal') {
                chatCont.style.fontWeight = 'bolder';
                chatCont.style.color = '#000';
                plotOwner.style.color = '#000';

                for (let i = 0; i < places.length; i++) {
                    places[i].style.color = '#000'; // TEXT color for location name
                    places[i].style.fontWeight = 'bolder';
                    distance[i].style.color = '#000'; // TEXT color of distance marker
                    distance[i].style.fontWeight = 'bolder';
                }
            } else {
                chatCont.style.fontWeight = 'normal';
                chatCont.style.color = '#FFF';
                plotOwner.style.color = '#FFF';

                for (let i = 0; i < places.length; i++) {
                    places[i].style.color = '#FFF'; // TEXT color for location name
                    places[i].style.fontWeight = 'normal';
                    distance[i].style.color = '#57FF33'; // TEXT color of distance marker
                    distance[i].style.fontWeight = 'normal';
                }
            }
            for (let i = 0; i < compassRow.length; i++) {
                compassRow[i].style.color = '#D00' // TEXT color of carn diraction 'NSEW'
            }
        }
    }
    document.addEventListener("keypress", onKeyEvent, false);
    document.addEventListener("keydown", onKeyEvent, false);
    document.addEventListener("keyup", onKeyEvent, false);
})();

