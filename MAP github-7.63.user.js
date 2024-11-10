// ==UserScript==
// @name         MAP github
// @namespace    https://github.com/katzworld/WalkingtheWorld-v2
// @version      7.66
// @description  Dora is a bitch IM THE MAP + smoken da bear!
// @author       @KaTZWorlD  on X  ask about the seaturtles!!! aye seaturles
// @match        https://play.tmwstw.io/*
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

    let names = [];
    	// Fetch named plats
	const fetchNamedPlats = () => {
		const url = 'https://play.tmwstw.io/data/names.json';
		GM_xmlhttpRequest({
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
			responseType: 'json',
			url: url,
			onload: function (response) {
				names = response.response;
			}
		});
	};

	fetchNamedPlats();



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
                let altindex = names.lastIndexOf(plotas) + 1
                let index = names.indexOf(plotas) + 1
                if (altindex !== index) {//double name work around
                    //                 console.log(altindex,index)
                    plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'>`
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
            let index = names.indexOf(plotas) + 1
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

