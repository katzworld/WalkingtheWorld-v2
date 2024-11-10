// ==UserScript==
// @name         Clocks and Blocks
// @namespace    http://tampermonkey.net/
// @version      V1.0
// @description  Clocks and blocks with surronding plats
// @author       KaTZWorlD
// @match        https://play.tmwstw.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tmwstw.io
// @grant        GM_xmlhttpRequest
// @connect      https://clock.imamkatz.com/*
// ==/UserScript==

(function () {
    'use strict';

    const div = document.createElement('div');
    div.id = 'tMFilm';
    div.style = 'display: none;';
    document.querySelector("#title_container").appendChild(div);
    // add another dive below the film div to display the block number
    const blockDiv = document.createElement('div');
    blockDiv.id = 'blockNumber';
    blockDiv.style = 'display: block;';
    document.querySelector("#title_container").appendChild(blockDiv);


    let BOB = [], SLAG = [], GREASE = [], INK = [];
    let SLAGMID = [], GREASEMID = [], INKMID = [];
    let namesPlats = [];


    /**
     * Fetch data from the API and log the response.
     * @param {string} state - The state to fetch (bob, slag, grease, ink).
     * @param {Function} callback - The callback function to handle the response.
     */
    const fetchData = (state, callback) => {
        const url = `https://api.tmwstw.io/faucet_state=${state}`;
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            url: url,
            onload: function (response) {
                const data = response.response;
                //console.log(`Fetched data for ${state}:`, data);
                callback(data);
            }
        });
    };

    /**
     * Fetch data from the API for mid states and log the response.
     * @param {string} state - The state to fetch (slag, ink, grease).
     * @param {Function} callback - The callback function to handle the response.
     */
    const fetchMids = (state, callback) => {
        const url = `https://api.tmwstw.io/faucet_state_mid=${state}`;
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            url: url,
            onload: function (response) {
                const data = response.response;
                //console.log(`Fetched mid data for ${state}:`, data);
                callback(data);
            }
        });
    };
    const states = ['bob', 'slag', 'grease', 'ink'];
    const midStates = ['slag', 'grease', 'ink'];

    states.forEach(state => {
        fetchData(state, (data) => {
            switch (state) {
                case 'bob':
                    BOB = data.map(item => item[0]);
                    break;
                case 'slag':
                    SLAG = data.map(item => item[0]);
                    break;
                case 'grease':
                    GREASE = data.map(item => item[0]);
                    break;
                case 'ink':
                    INK = data.map(item => item[0]);
                    break;
            }
        });
    });

    midStates.forEach(state => {
        fetchMids(state, (data) => {
            switch (state) {
                case 'slag':
                    SLAGMID = data.map(item => item[0]);
                    break;
                case 'grease':
                    GREASEMID = data.map(item => item[0]);
                    break;
                case 'ink':
                    INKMID = data.map(item => item[0]);
                    break;
            }
        });
    });

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
                namesPlats = response.response;
            }
        });
    };

    fetchNamedPlats();


    const watcherOfMap = new MutationObserver((entries, observer) => {
        whatsLocal(observer)
    })

    const arrrrgMap = document.querySelector('#plot_owner');
    const listMap = {
        childList: true,
    }
    if (arrrrgMap) {
        watcherOfMap.observe(arrrrgMap, listMap);
    } else {
        console.error('Target element for watcherOfMap not found.');
    }
    function whatsLocal() {
        const plat = document.getElementById('plot_id').lastChild.textContent.slice(-4).replace('#', '').replace(' ', '');
        //console.log('plat: ' + plat);
        let close, touching,folgers
        if (plat) {
            const surPlats = 'https://clock.imamkatz.com/platall/' + plat;
            GM_xmlhttpRequest({
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'json',
                url: surPlats,
                onload: function (response) {
                    close = response.response;
                    //console.log(close);
                    checkPlats();

                }
            });
        }
        if (plat) {
            const surPlats = 'https://clock.imamkatz.com/plat/' + plat;
            GM_xmlhttpRequest({
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'json',
                url: surPlats,
                onload: function (response) {
                    touching = response.response;
                    //console.log(touching);
                    checkPlats();
                }
            });
        }

        if (plat) {
            // Fetch faucet data from the
            const folgerurl = 'https://clock.imamkatz.com/folgers';
            GM_xmlhttpRequest({
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: 'json',
                url: folgerurl,
                onload: function (response) {
                    folgers = response.response.filterPlots;
                    console.log(folgers)
                    checkPlats();
                },
            });
        }



        function checkPlats() {
            if (close !== undefined && touching !== undefined) {
                //console.log('close: ' + close, 'touching: ' + touching);
                showFilmContent(close,touching,folgers);
            }
        }
    }


    // Function to fetch block number and display it
    function fetchBlockNumberAndDisplay() {
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            url: 'https://clock.imamkatz.com/block',
            onload: function (response) {
                const blockr = response.response;
                // Display the block information in the div blockNumber
                const blockDiv = document.getElementById('blockNumber');
                blockDiv.innerHTML = ''; // Clear existing content
                blockDiv.style.display = 'block';
                blockDiv.style.color = 'white';
                blockDiv.style.fontSize = '20px';
                blockDiv.style.padding = '10px';
                blockDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                blockDiv.textContent = `ETC ${blockr}`;
            }
        });
    }

    // Function to display film content
    function showFilmContent(r, underline,folgers) {
        //console.log('r: ' + r);
        //console.log('showme' + folgers)
        //console.log('underline: ' + underline);
        const filmDiv = document.getElementById('tMFilm');
        filmDiv.innerHTML = ''; // Clear existing content
        filmDiv.style.display = 'block';
        filmDiv.style.color = 'white';
        filmDiv.style.fontSize = '20px';
        filmDiv.style.padding = '10px';
        filmDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        // Split r string into array named rplats
        const rplats = r.replace('[', '').replace(']', '').split(',').map(Number);

        // Check for overlaps and change text color
        rplats.forEach(plat => {
            const span = document.createElement('span');
            const name = plat < namesPlats.length ? namesPlats[plat - 1] : '';
            if (BOB.includes(plat)) {
                span.style.color = 'blue';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Bob 20, `;
            } else if (SLAG.includes(plat)) {
                span.style.color = 'red';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Slag 25, `;
            } else if (GREASE.includes(plat)) {
                span.style.color = 'green';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Grease 200+, `;
            } else if (INK.includes(plat)) {
                span.style.color = 'white';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Ink 150+, `;
            } else if (SLAGMID.includes(plat)) {
                span.style.color = 'darkred';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Slag 16, `;
            } else if (GREASEMID.includes(plat)) {
                span.style.color = 'darkgreen';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Grease 150+, `;
            } else if (INKMID.includes(plat)) {
                span.style.color = 'darkyellow';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} / Ink 90+, `;
            } else {
                span.textContent = ` `;
            }
            // Check if plat is in the touching array
            if (underline.includes(plat)) {
                span.style.textDecoration = 'underline';
            }
            if (folgers.includes(plat)) {
                span.style.color = 'orange';
                span.style.fontWeight = 'bold';
                span.textContent = `${plat} ${name} UNTAPPED,`;
            }
           filmDiv.appendChild(span);
        });
    }
    // Start a timer to run fetchBlockNumberAndDisplay every 15 seconds
    setInterval(() => {
        const filmDiv = document.getElementById('tMFilm');
        if (filmDiv) {
            fetchBlockNumberAndDisplay(filmDiv);
        }
    }, 15000);


})();
