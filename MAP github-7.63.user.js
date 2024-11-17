// ==UserScript==
// @name         MAP github
// @namespace    https://github.com/katzworld/WalkingtheWorld-v2
// @version      8.88
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
    const sidebar = 150 //image map
    let ens; // Declare ens as a global variable
    /////////////////////
    // init setup from 0 we all start!
    // setup local storage
    /////////////////////
    let liferLocal = localStorage.getItem('lifetime_plot')
    let lifer = parseInt(liferLocal, 10)
    if (isNaN(lifer)) {
        console.log('Fresh install')
        localStorage.setItem('lifetime_plot', 1)
        localStorage.setItem('whoareyou', 'ENS undefined please refresh page!');
        location.reload(); //WTF really ok ?

    }
    let plota_ses = 0
    let how_many = 1 //ALL OF THEM !!
    //////////////////////////////////////////////////////////////
    // front page mutation for global loo redraw of ui with current workaround
    // plots with numbers only in title will display the location on the globe
    // nameb plots currently have no hookable id currently.  hope to make it easier
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

    function initializeLocalStorageAndRequests() {
        ens = localStorage.getItem('whoareyou');

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

        const wallet = web3.currentProvider.selectedAddress;
        if (wallet) {
            GM_xmlhttpRequest({
                method: "GET",
                url: `https://clock.imamkatz.com/address/${wallet}`,
                onload: function (response) {
                    let r = response.response;
                    ens = r.slice(1, -1).split('"').join(''); // Remove brackets and quotes
                    localStorage.setItem('whoareyou', ens);
                    console.log(`${ens} has entered the sufferverse!`);
                },
                onerror: function (err) {
                    console.error('API request leaderboard failed:', err);
                }
            });
        } else {

            console.error('ENS is not defined.');
        }

    }

    function globalTrot(entries) {
        observerOfPlotas.disconnect()
        let whoareyouDIV = document.querySelector("#video_settings")
        // put ens in the div for display
        initializeLocalStorageAndRequests();
        if (whoareyouDIV) {
            let ensDIV = document.createElement('div')
            ensDIV.style.fontFamily = 'Roboto Condensed'
            ensDIV.style.textAlign = 'center'
            ensDIV.style.margin = 'auto'
            ensDIV.style.fontWeight = 'bold'
            ensDIV.style.display = 'block'
            ensDIV.style.color = '#F2F2F2'
            ensDIV.style.fontSize = '20px'
            ensDIV.innerHTML = `Welcome: ${ens} <br> Lifetime Plats: ${lifer} <br> <br>`


            // add the ensDiv after the document.querySelector("#video_settings")
            whoareyouDIV.after(ensDIV)
        }
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
                    plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'>`
                } else {
                    plotasToChange[i].innerHTML = `<img src ='https://meta.tmwstw.io/preview_plots_${index}.jpg' width='200' height='200'>`
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
            // Call the new function
            // initializeLocalStorageAndRequests();
        }
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
        //const plot = Number(document.querySelector("#plot_id").innerText.split('#')[1])
        //console.log(plot)
        const plot = document.getElementById('plot_id').lastChild.textContent.slice(-4).replace('#', '').replace(' ', '');
        let image = document.getElementById('plot_id');
        let img = document.createElement("img");
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
                        let bob = f_dat.bob;
                        let slag = f_dat.slag;
                        let grease = f_dat.grease;
                        let ink = f_dat.ink;

                        const createSpan = (id, value, color = "black", fontStyle = "normal", fontWeight = "normal") => {
                            return `<span id='${id}' style="color: ${color}; font-style: ${fontStyle}; font-weight: ${fontWeight};">${id.charAt(0).toUpperCase() + id.slice(1)}: ${value} </span>`;
                        };

                        let bobSpan = createSpan('bob', bob);
                        let slagSpan = createSpan('slag', slag);
                        let greaseSpan = createSpan('grease', grease);
                        let inkSpan = createSpan('ink', ink);

                        const updateSpan = (value, span, color, fontStyle = "normal", fontWeight = "bold") => {
                            if (value === undefined) {
                                return createSpan(span, value, "yellow", "italic");
                            } else if (value === 0) {
                                return createSpan(span, value, "black");
                            } else if ((span === 'bob' && value === 20) || (span === 'slag' && value === 25) || (span === 'grease' && value === 200) || (span === 'ink' && value === 150)) {
                                return createSpan(span, value, color, fontStyle, fontWeight);
                            }
                            return createSpan(span, value);
                        };

                        bobSpan = updateSpan(bob, 'bob', "red");
                        slagSpan = updateSpan(slag, 'slag', "red");
                        greaseSpan = updateSpan(grease, 'grease', "red");
                        inkSpan = updateSpan(ink, 'ink', "red");

                        let faucetOut = bobSpan + slagSpan + greaseSpan + inkSpan;
                        call_screen(faucetOut, plot);
                    } else {
                        let faucetOut = `<span id='tapped' style="color:Tomato; font-weight: bold;">UnTapped!</span>`;
                        call_screen(faucetOut, plot);
                    }
                }
            })
        }


        let setScreen = (faucet_output, plot_id) => {
            sending_xml(plot_id, ens) //leaderBOARD!!!
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

    function sending_xml(plot_as, ens) {
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