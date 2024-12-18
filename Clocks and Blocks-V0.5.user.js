// ==UserScript==
// @name         Clocks and Blocks
// @namespace    http://tampermonkey.net/
// @version      V1.1420
// @description  Clocks and blocks with surronding plats
// @author       KaTZWorlD
// @match        https://play.tmwstw.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tmwstw.io
// @grant        GM_xmlhttpRequest
// @connect      https://clock.imamkatz.com/*
// @updateURL    https://raw.githubusercontent.com/katzworld/WalkingtheWorld-v2/main/Clocks%20and%20Blocks-V0.5.user.js
// @downloadURL  https://raw.githubusercontent.com/katzworld/WalkingtheWorld-v2/main/Clocks%20and%20Blocks-V0.5.user.js
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
    let averageBlockTime = '13000' //got something to start with

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
                    //console.log(folgers)
                    checkPlats();
                },
            });
        }



        function checkPlats() {
            if (close !== undefined && touching !== undefined && folgers !== undefined) {
                //console.log('close: ' + close, 'touching: ' + touching);
                showFilmContent(close,touching,folgers);
            }
        }
    }


    // Function to fetch block number and display it
    function fetchBlockNumberAndDisplay() {
        GM_xmlhttpRequest({
            /*method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            url: 'https://clock.imamkatz.com/block', */
            method: "POST",
            url: "https://eth.blockscout.com/api/eth-rpc",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                id: 0,
                jsonrpc: "2.0",
                method: "eth_blockNumber",
                params: []
            }),
            onload: function (response) {
                const blockr = response.response;
                const jsonResponse = JSON.parse(response.responseText);
                const hexResult = jsonResponse.result;
                const decResult = parseInt(hexResult, 16);
                console.log("Binary Result:", decResult);
                // Display the block information in the div blockNumber
                const blockDiv = document.getElementById('blockNumber');
                blockDiv.innerHTML = ''; // Clear existing content
                blockDiv.style.display = 'block';
                blockDiv.style.color = 'white';
                blockDiv.style.fontSize = '20px';
                blockDiv.style.padding = '10px';
                blockDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                blockDiv.textContent = `ETC Block # ${decResult}`;
            }
        });
    }

    // Function to display film content
    function showFilmContent(r, underline,folgers) {
        const filmDiv = document.getElementById('tMFilm');
        filmDiv.innerHTML = ''; // Clear existing content
        filmDiv.style.display = 'block';
        filmDiv.style.color = 'white';
        filmDiv.style.fontSize = '20px';
        filmDiv.style.padding = '10px';
        filmDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        // Split r string into array named rplats
        const rplats = r.replace('[', '').replace(']', '').split(',').map(Number);

        const styles = {
            BOB: { color: 'yellow', fontWeight: 'bold', text: 'Bob 20' },
            SLAGMID: { color: 'darkred', text: 'Slag 16' },
            SLAG: { color: 'red', fontWeight: 'bold', text: 'Slag 25' },
            GREASEMID: { color: 'darkgreen', text: 'Grease 150+' },
            GREASE: { color: 'green', fontWeight: 'bold', text: 'Grease 200+' },
            INKMID: { color: 'darkblue', text: 'Ink 90+' },
            INK: { color: 'blue', fontWeight: 'bold', text: 'Ink 150+' },
            FOLGERS: { color: 'orange', fontWeight: 'bold', text: 'UNTAPPED' },
        };

        const applyStyles = (plat, name) => {
            if (BOB.includes(plat)) return { ...styles.BOB, text: ` ${plat} ${name} / ${styles.BOB.text},` };
            if (SLAGMID.includes(plat)) return { ...styles.SLAGMID, text: ` ${plat} ${name} / ${styles.SLAGMID.text}, ` };
            if (SLAG.includes(plat)) return { ...styles.SLAG, text: ` ${plat} ${name} / ${styles.SLAG.text}, ` };
            if (GREASEMID.includes(plat)) return { ...styles.GREASEMID, text: ` ${plat} ${name} / ${styles.GREASEMID.text},` };
            if (GREASE.includes(plat)) return { ...styles.GREASE, text: ` ${plat} ${name} / ${styles.GREASE.text},` };
            if (INKMID.includes(plat)) return { ...styles.INKMID, text: ` ${plat} ${name} / ${styles.INKMID.text},` };
            if (INK.includes(plat)) return { ...styles.INK, text: ` ${plat} ${name} / ${styles.INK.text},` };
            if (folgers.includes(plat)) return { ...styles.FOLGERS, text: ` ${plat} ${name} / ${styles.FOLGERS.text},` };
            return { text: ' ' };
        };

        rplats.forEach(plat => {
            const span = document.createElement('span');
            const name = plat < namesPlats.length ? namesPlats[plat - 1] : '';
            const style = applyStyles(plat, name);

            if (style.text.trim()) {
                span.style.color = style.color || '';
                span.style.fontWeight = style.fontWeight || '';
                span.textContent = style.text;
            }

            if (underline.includes(plat)) {
                span.style.textDecoration = 'underline';
            }

            filmDiv.appendChild(span);
        });

    }

    function fetchBlockTime() {
        GM_xmlhttpRequest({
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            url: 'https://etc.blockscout.com/api/v2/stats',
            onload: function (response) {
                averageBlockTime = Number(response.response.average_block_time)
                console.log('setting average block:' + averageBlockTime)
            }
        });
    }

    fetchBlockTime()
    // Start a timer to run fetchBlockNumberAndDisplay every fetchblockTime :)
    setInterval(() => {
        const filmDiv = document.getElementById('tMFilm');
        if (filmDiv) {
            fetchBlockNumberAndDisplay(filmDiv);
        }
    }, averageBlockTime);


})();
