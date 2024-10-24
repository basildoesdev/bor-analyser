const version = '2.0.3';

//#region Globals.js // 

import './css/animations.css';
import './css/base.css';
import './css/components.css';
import './css/electron-styles.css';
import './css/sliders.css';
import './css/stats.css';
import './css/tab-dropdown.css';
import './css/tm.css';
import './css/top-button.css';
import './css/dropdown.css';
import './css/mail.css';
import './css/responsive.css';

// Element references
const Elements = {
    // versionTitle: document.getElementById('version-title-dispaly') || console.warn('Version title display element not found'),
    info: document.getElementById('information') || console.warn('Information element not found'),
    dataDisplay: document.getElementById('player-card-container') || console.warn('Player card container not found'),
    dataDisplayAvg: document.getElementById('averages') || console.warn('Averages display not found'),
    sortListDisplay: document.getElementById('sort-list-display') || console.warn('Sort list display not found'),
    form: document.getElementById('team-analyzer-form') || console.warn('Team analyzer form not found'),
    submitBtn: document.getElementById('submit') || console.warn('Submit button not found'),
    accessKey: document.getElementById('access-key') || console.warn('Access key element not found'),
    isSaveKey: document.getElementById('save-key') || console.warn('Save key element not found'),
    keyValidDisplay: document.getElementById('key-valid-display') || console.warn('Key valid display not found'),
    infoContainer: document.getElementById('info-container') || console.warn('Info container not found'),
    infoDisplay: document.getElementById('information') || console.warn('Info Display not found'),
    loaderInfoDisplay: document.getElementById('loader-information') || console.warn('Loader Info Display not found'),
    tab1Name: document.getElementById('tab-1-btn') || console.warn('Tab 1 button not found'),
    tab2Name: document.getElementById('tab-2-btn') || console.warn('Tab 2 button not found'),
    tab3Name: document.getElementById('tab-3-btn') || console.warn('Tab 3 button not found'),
    tab4Name: document.getElementById('tab-4-btn') || console.warn('Tab 4 button not found'),
    tab5Name: document.getElementById('tab-5-btn') || console.warn('Tab 5 button not found'),
    option1Name: document.getElementById('option1') || console.warn('Option 1 element not found'),
    option2Name: document.getElementById('option2') || console.warn('Option 2 element not found'),
    option3Name: document.getElementById('option3') || console.warn('Option 3 element not found'),
    option4Name: document.getElementById('option4') || console.warn('Option 4 element not found'),
    option5Name: document.getElementById('option5') || console.warn('Option 5 element not found'),
    managerInfo: document.getElementById('manager-infos') || console.warn('Manager info element not found'),
    clubInfo: document.getElementById('club-infos') || console.warn('Club info element not found'),
    marketInfo: document.getElementById('market-infos') || console.warn('Market info element not found'),
    settingsInfo: document.getElementById('settings-infos') || console.warn('Settings info element not found'),
};

// Global variables
 let globals = {
    PLAYER_DATA: [],
    CLUB_DATA: [],
    MEMBER_DATA: [],
    PLAYER_STATISTICS_DATA: [],
    TRANSFER_DATA: [],
    TRANSFER_MARKET_ADDITIONAL_DATA: [],
    TRAINING_DATA: [],
    INDIVIDUAL_DATA: [],
    TRAINING_REPORT_DATA: [],
    REPORT_HEADERS: [],
    MAIL_INBOX: [],
    MAIL_SAVED: [],
    MAIL_DELETED: [],
    MAIL_SENT: [],
    _mainKey: 0,
    _memberid: 0,
    _teamid: 0,
    _globals: {
        season: 0,
        round: 0,
        day: 0,
    },
    refresh: 0,
    isPremium: false,
    totalWeightsSum: 0,
    trophies: false,
    colorStore: {
        range1: '#f01414',
        range2: '#fb9118',
        range3: '#c5d02f',
        range4: '#429631',
        range5: '#4fb056',
        range6: '#43d08e',
        range7: '#971dc3',
    },
    expiryTime:  60 * 60 * 1000,
};

 let positionWeights = 0;

 let defaultPositionWeights = {
    'Looshead Prop': { 
        "Weight": 1.35, "Height": 0.4, "Stamina": 1, "Attack": 0.8, "Technique": 1.35, 
        "Jumping": 0, "Agility": 0.2, "Handling": 0.85, "Defense": 1.15, "Strength": 1.4, 
        "Speed": 0.5, "Kicking": 0 },
    'Hooker': { 
        "Weight": 1.15, "Height": 0.3, "Stamina": 1, "Attack": 0.7, "Technique": 1.45, 
        "Jumping": 0, "Agility": 0.3, "Handling": 1.45, "Defense": 0.95, "Strength": 1.25, 
        "Speed": 0.5, "Kicking": 0 },
    'Tighthead Prop': { 
        "Weight": 1.4, "Height": 0.45, "Stamina": 1, "Attack": 0.75, "Technique": 1.35, 
        "Jumping": 0, "Agility": 0.2, "Handling": 0.85, "Defense": 1.05, "Strength": 1.45, 
        "Speed": 0.5, "Kicking": 0 },
    'Lock': { 
        "Weight": 0.9, "Height": 1.1, "Stamina": 1, "Attack": 0.55, "Technique": 0.85, 
        "Jumping": 1.2, "Agility": 0.2, "Handling": 1.05, "Defense": 0.8, "Strength": 0.95, 
        "Speed": 0.4, "Kicking": 0 },
    'Blindside Flanker': { 
        "Weight": 0.9, "Height": 0.75, "Stamina": 1, "Attack": 0.65, "Technique": 1.1, 
        "Jumping": 0.7, "Agility": 0.5, "Handling": 0.8, "Defense": 1.1, "Strength": 1, 
        "Speed": 0.5, "Kicking": 0 },
    'Openside Flanker': { 
        "Weight": 0.95, "Height": 0.6, "Stamina": 1, "Attack": 0.7, "Technique": 1.3, 
        "Jumping": 0.4, "Agility": 0.5, "Handling": 1.15, "Defense": 0.95, "Strength": 0.95, 
        "Speed": 0.5, "Kicking": 0 },
    'No.8': { 
        "Weight": 0.9, "Height": 0.6, "Stamina": 1, "Attack": 1, "Technique": 1.05, 
        "Jumping": 0.6, "Agility": 0.55, "Handling": 0.8, "Defense": 1, "Strength": 1, 
        "Speed": 0.5, "Kicking": 0 },
    'Scrum Half': { 
        "Weight": 0, "Height": 0, "Stamina": 1, "Attack": 1.35, "Technique": 0.6, 
        "Jumping": 0, "Agility": 1.35, "Handling": 1.35, "Defense": 1.1, "Strength": 0.5, 
        "Speed": 1.15, "Kicking": 0.6 },
    'Fly Half': { 
        "Weight": 0, "Height": 0, "Stamina": 1, "Attack": 1.25, "Technique": 0.6, 
        "Jumping": 0, "Agility": 1.05, "Handling": 1.2, "Defense": 1.15, "Strength": 0.5, 
        "Speed": 0.95, "Kicking": 1.3 },
    'Center': { 
        "Weight": 0.35, "Height": 0, "Stamina": 1, "Attack": 1.3, "Technique": 0.65, 
        "Jumping": 0, "Agility": 1.1, "Handling": 1.25, "Defense": 1.35, "Strength": 0.8, 
        "Speed": 1.2, "Kicking": 0 },
    'Wing': { 
        "Weight": 0, "Height": 0, "Stamina": 1, "Attack": 1.4, "Technique": 0.6, 
        "Jumping": 0, "Agility": 1.4, "Handling": 1.25, "Defense": 1.35, "Strength": 0.6, 
        "Speed": 1.4, "Kicking": 0 },
    'Fullback': { 
        "Weight": 0, "Height": 0, "Stamina": 1, "Attack": 1.05, "Technique": 0.6, 
        "Jumping": 0.25, "Agility": 1.15, "Handling": 1.2, "Defense": 1.4, "Strength": 0.5, 
        "Speed": 1.35, "Kicking": 0.5 }
  };

let heightWeightRanges = {
    minHeightWeight:{},
};

document.addEventListener("DOMContentLoaded", function() {
    // Load saved values from localStorage or fallback to defaults
    heightWeightRanges.minHeightWeight = JSON.parse(localStorage.getItem('minHeightWeight')) || {
        'Prop': { minWeight: 120, maxHeight: 190 },
        'Hooker': { minWeight: 110, maxHeight: 185 },
        'Lock': { minHeight: 199, minWeight: 105 },
        'Blindside': { minHeight: 195, minWeight: 110 },
        'Openside': { minHeight: 185, minWeight: 105 },
        'Number8': { minHeight: 185, minWeight: 105 },
        'Center': { minWeight: 90 },
    };



    // Log after assignment
    // console.log(heightWeightRanges);
});

//#endregion

//#region Main.js //////////////////////////////

// Global functions for event handlers
window.showTab = showTab;
window.showTabDropdown = showTabDropdown;
window.checkKeyInput = checkKeyInput;
window.sortPlayers = sortPlayers;
window.checkSaveKeyInput = checkSaveKeyInput;
window.saveNewKeyandRefresh = saveNewKeyandRefresh;
window.retrieveData = retrieveData;
window.resetSliders = resetSliders;

// Event listener for the submit button
Elements.submitBtn.addEventListener('click', () => {
    if (Elements.isSaveKey.checked) {
        if(localStorage.getItem('key') == Elements.accessKey.value){
            localStorage.setItem('key', Elements.accessKey.value);
            retrieveData()
        }else{
            localStorage.clear();
            localStorage.setItem('key', Elements.accessKey.value);
            retrieveData()
        }
        
    }
});

//  const start = performance.now();
// On window load, check for saved key and retrieve data if available
window.onload = () => {
    const savedKey = localStorage.getItem('key');
    if (savedKey) {
        globals._mainKey = savedKey.slice(-40);
        retrieveData(true);
    }
};

function checkKeyInput() {
    const isValidKey = /^m=(\d+)&mk=([a-fA-F0-9]{40})$/;
    const fullKey = Elements.accessKey.value;

    if (isValidKey.test(fullKey)) {
        // console.log("Vailid")
        globals._mainKey = fullKey.slice(-40);
        globals._memberid = trimKey(fullKey);
        Elements.accessKey.style.color = 'green';
        Elements.submitBtn.style.backgroundColor = '#e73d3d';
        Elements.submitBtn.disabled = false;
        Elements.keyValidDisplay.innerHTML = '<p><span class="green"> (Valid Key Format) </span></p>';
    } else {
        // console.log("Invalid")
        Elements.accessKey.style.color = 'red';
        Elements.submitBtn.style.backgroundColor = '#a39999';
        Elements.submitBtn.disabled = true;
        Elements.keyValidDisplay.innerHTML = '<p><span class="red"> (Invalid Key Format) </span></p>';
    }
}

// Show the selected tab and update the active tab button
 function showTab(tabNumber) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById('tab' + tabNumber).classList.add('active');

    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-' + tabNumber + '-btn').classList.add('active');
}

// Show tab via dropdown
 function showTabDropdown(tabNumber) {
    showTab(tabNumber); 
}

// Save the active tab to localStorage on click
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
        const activeTabId = tab.id; 
        localStorage.setItem('activeTab', activeTabId); 
    });
});

// Load saved tab on window load
window.addEventListener('load', () => {
    const savedTabId = localStorage.getItem('activeTab'); 
    const defaultTabId = 'tab-2-btn';
    (savedTabId ? document.getElementById(savedTabId) : document.getElementById(defaultTabId)).click(); 
});

// Back to top button functionality
const backToTopButton = document.getElementById("backToTop");

window.onscroll = () => {
    scrollFunction();
};

function scrollFunction() {
    backToTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
}

backToTopButton.onclick = () => {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
};

function isElectron() {
    return typeof window !== 'undefined' && window.process && window.process.type === 'renderer';
  }
  
  if (isElectron()) {
    console.log("Running in Electron");
    buttons.style.display = 'none';
  } else {
    let buttons = document.getElementById('title-bar-contols')
    // buttons.style.display = 'none';
  }

//#endregion

//#region Fetch.js //////////////////////

const corsProxy = 'https://corsproxy.io/?';
const targetUrl = 'https://classic-api.blackoutrugby.com/';

// Generate a timestamp
const timestamp = new Date().getTime();

// Append timestamp to the target URL
const API_URL = `${corsProxy}${targetUrl}?t=${timestamp}`;

// API URL
// const API_URL = 'https://corsproxy.io/?https://classic-api.blackoutrugby.com/';

const _devId = process.env.DEVID
const _devKey = process.env.DEVKEY

// Fetch Rugby Data
 async function fetchRugbyData(requestType, additionalParams = {}, ignore) {
    const mailParams = {
        d: _devId, 
        dk: _devKey, 
        r: requestType,
        m: globals._memberid,
        mk: globals._mainKey,
        json: 1,
        ...additionalParams
    };  
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams(mailParams)
        });

        const data = await response.json();
        
        if (data?.status?.trim?.() === 'Ok') {
            return data;
        } else {}
    } catch (error) {
        if (ignore != 0){
            throw error;  
        }
       
    }
}

 async function fetchAndCacheData(key, requestType, params = {}, expiryTime = 60 * 60 * 1000) {
    let cachedData = getCachedData(key, expiryTime);
    if (!cachedData) {
        
        // console.log(`Loading ${key} from API...`);
        Elements.loaderInfoDisplay.innerHTML = `Loading ${key} from API...`;
        let dataStart = performance.now();
        cachedData = await fetchRugbyData(requestType, params);
        let dataFinish = performance.now();
        // console.log(`Loaded ${key} data (${dataStart + dataFinish}ms)`);
        Elements.loaderInfoDisplay.innerHTML = `Loaded ${key} data (${dataStart + dataFinish}ms)`;
        setCachedData(key, cachedData);
    } else {
        // console.log(`Used local storage for ${key}`);
    }
    return cachedData;
}

// Retrieve Data
 async function retrieveData(initCall) {
    if (initCall) {
        let memberKey = localStorage.getItem('key');
        globals._memberid = trimKey(memberKey);
        globals._mainKey = memberKey.slice(-40);
    }

    Elements.form.style.display = 'none';
    Elements.infoDisplay.classList.remove('hide');
    Elements.loaderInfoDisplay.classList.remove('hide');

    try {
        // Fetch all necessary data with caching
        const expiryTime = globals.expiryTime; 

        // Fetch Member Data
        let memberData = await fetchAndCacheData('memberData', 'm', { memberid: globals._memberid }, expiryTime);
        globals.MEMBER_DATA = Object.values(memberData.members);
        globals._teamid = globals.MEMBER_DATA[0].teamid;
        globals._globals = memberData.gameDate;
        globals.isPremium = globals.MEMBER_DATA[0].premium === '1';

        // Fetch Club Data
        let clubData = await fetchAndCacheData('clubData', 't', { teamid: globals._teamid }, expiryTime);
        globals.CLUB_DATA = Object.values(clubData.teams);
        // console.log(globals.CLUB_DATA)

        // Fetch Trophy Data
        let clubTrophyData = await fetchAndCacheData('clubTrophyData', 'trph', { teamid: globals._teamid }, expiryTime);
        globals.CLUB_DATA[0].trophies = clubTrophyData ? Object.values(clubTrophyData.trophies) : [];
        globals.trophies = !!clubTrophyData;
        globals.CLUB_DATA[0].trophies.sort((a, b) => Number(b.id) - Number(a.id));
        
        // Fetch Player Data
        let playerData = await fetchAndCacheData('playerData', 'p', { teamid: globals._teamid }, expiryTime);
        globals.PLAYER_DATA = Object.values(playerData.players);
        
        // Fetch PlayerStatistics Data
        let playerStatisticsData = await fetchAndCacheData('playerStatisticsData', 'ps', { playerid: getPlayerIdsAsString(globals.PLAYER_DATA) }, expiryTime);
        globals.PLAYER_STATISTICS_DATA = Object.values(playerStatisticsData['player statistics']);
        
        // Fetch TransferMarket Data
        let transferMarketData = await fetchAndCacheData('transferMarketData', 'tm', {}, expiryTime);
        globals.TRANSFER_DATA = Object.values(transferMarketData.auctions);

        // Fetch Training Data
        let tid = globals.CLUB_DATA[0].id
        let trainingData = await fetchAndCacheData('trainingData', 'ti', {teamid: tid}, 0)
        // console.log(trainingData)
        if('team training' in trainingData && trainingData['team training'] != null){
            globals.TRAINING_DATA = Object.values(trainingData['team training'])}

        if('individual training' in trainingData && trainingData['individual training'].length > 0){
            globals.INDIVIDUAL_DATA = Object.values(trainingData['individual training'])
        }

        // Fetch Training Report Data
        let trainingReport = await fetchAndCacheData('trainingReportData', 'tr', {teamid: tid}, 0)
        globals.TRAINING_REPORT_DATA = Object.values(trainingReport.report);

        //Fetch News Data
        let nationNewsKE = await fetchAndCacheData('nationNewsData', 'news', {country_iso: globals.CLUB_DATA[0].country_iso,}, expiryTime)
        // console.log(nationNewsKE);

        globals.REPORT_HEADERS = Object.values(nationNewsKE.report)
        globals.REPORT_HEADERS.sort((a, b) => Number(b.id) - Number(a.id));
        // console.log(globals.REPORT_HEADERS)

        let mailHeaderData = await fetchAndCacheData('mailHeaderData', 'ma', {}, 0)
        globals.MAIL_DELETED = Object.values(mailHeaderData.deleted)
        globals.MAIL_SAVED = Object.values(mailHeaderData.saved)
        globals.MAIL_SENT = Object.values(mailHeaderData.sent)
        globals.MAIL_INBOX = Object.values(mailHeaderData.inbox)
        

        // Fetch Fixture Data
        // let fixture = await fetchAndCacheData ('fixtureData', 'rs', {fixtureid:23250,nat:1,},0)
        // console.log(fixture)
        // let fixtureString = Object.values(fixture.fixtures)
        // console.log(fixtureString)

        // let actualstring = fixtureString.map(element => element.id);
        // let csvString = actualstring.join(',');
        // console.log(csvString);

        // console.log(actualstring);
        // let reportersSummary = await fetchAndCacheData('ReportersData', 'rs', {fixtureid: '20679548',})
        // console.log(reportersSummary)

        await processAndMergeData();
    } catch (error) {
        console.error('Error during fetch operations:', error);
    }
}

// Merging and processing player, statistics, and transfer data
async function processAndMergeData() {
    const totalSteps = globals.PLAYER_DATA.length + 3; // Total steps: merging players, fetching team names, sorting
    let completedSteps = 0;

    const updateProgress = (info) => {
        completedSteps++;
        let progressPercent = Math.round((completedSteps / totalSteps) * 100);
        Elements.loaderInfoDisplay.innerHTML = `${info} (${progressPercent}%)`;
        // document.getElementById('loading-bar').style.width = `${progressPercent}%`;
    };

    // Step 1: Sort PLAYER_DATA and PLAYER_STATISTICS_DATA by their respective ids
    Elements.loaderInfoDisplay.innerHTML = `Sorting Player Data..`;
    globals.PLAYER_DATA.sort((a, b) => Number(a.id) - Number(b.id));
    globals.PLAYER_STATISTICS_DATA.sort((a, b) => Number(a.playerid) - Number(b.playerid));
    updateProgress('Sorted Player Data');

    // Step 2: Merge PLAYER_DATA with PLAYER_STATISTICS_DATA
    if (globals.PLAYER_DATA.length === globals.PLAYER_STATISTICS_DATA.length) {
        for (let i = 0; i < globals.PLAYER_DATA.length; i++) {
            Object.assign(globals.PLAYER_DATA[i], globals.PLAYER_STATISTICS_DATA[i]);

            // Fetch bidding team name if exists
            if (globals.PLAYER_DATA[i].bidteamid) {
                try {
                    let team = await fetchRugbyData('t', { teamid: globals.PLAYER_DATA[i].bidteamid });
                    globals.PLAYER_DATA[i].bidteamname = team.teams[globals.PLAYER_DATA[i].bidteamid]?.name || 'Error fetching team';
                } catch (error) {
                    console.error(`Error fetching team for player ${globals.PLAYER_DATA[i].name}`, error);
                    globals.PLAYER_DATA[i].bidteamname = 'Error fetching team';
                }
            }

            // Update progress after each player merge
            updateProgress(`Merging Player Data (${i + 1}/${globals.PLAYER_DATA.length})`);
        }
        // Save merged PLAYER_DATA to localStorage
        saveToLocalStorage('PLAYER_DATA', globals.PLAYER_DATA);
    }

    // Step 3: Fetch additional stats for TRANSFER_DATA
    Elements.loaderInfoDisplay.innerHTML = `Merging TM Data..`;
    const playerIds = globals.TRANSFER_DATA.map(auction => auction.playerid);
    const playerIdString = playerIds.join(',');
    const additionalStats = await fetchRugbyData('p', { playerid: playerIdString });
    updateProgress('Merging TM Data..');

    // Step 4: Merge TRANSFER_DATA with additionalStats
    Elements.loaderInfoDisplay.innerHTML = `Merging Transfer Data..`;
    const additionalStatsMap = new Map(Object.values(additionalStats.players).map(player => [Number(player.id), player]));
    globals.TRANSFER_DATA = globals.TRANSFER_DATA.map(transferData => {
        return { ...transferData, ...additionalStatsMap.get(Number(transferData.playerid)) };
    });
    updateProgress(1, 'Merged Transfer Data');

    // Step 5: Sort PLAYER_DATA by CSR (descending order)
    Elements.loaderInfoDisplay.innerHTML = `Sorting Players by CSR`;
    globals.PLAYER_DATA.sort((a, b) => b.csr - a.csr);
    updateProgress('Sorted Players by CSR');

    // Hide info display
    Elements.loaderInfoDisplay.innerHTML = ``;
    Elements.loaderInfoDisplay.classList.add('hide');
    Elements.infoDisplay.classList.add('hide');
    
    // Log data and update UI
    displayClubandManagerInfo();
    logClubData();
    logMarketData();
    inputsForMinMaxWeightHeight();
    logTeamData();
}


function getCachedData(key, expiryTimeInMillis) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const parsedCache = JSON.parse(cached);
    const currentTime = new Date().getTime();

    // Check if cache is expired
    if (currentTime - parsedCache.timestamp > expiryTimeInMillis) {
        localStorage.removeItem(key);
        return null;
    }

    return parsedCache.data;
}

function setCachedData(key, data) {
    const cacheObject = {
        data: data,
        timestamp: new Date().getTime()
    };
    localStorage.setItem(key, JSON.stringify(cacheObject));
}

function saveToLocalStorage(key, data) {
    try {
        const cacheObject = {
            data: data,
            timestamp: new Date().getTime() // You can use this for future expiration checks
        };
        localStorage.setItem(key, JSON.stringify(cacheObject));
        // console.log(`Data successfully saved to localStorage under key: ${key}`);
    } catch (error) {
        console.error(`Error saving data to localStorage: ${error}`);
    }
}
//#endregion

//#region Key.js /////////////////////////////////////////
 function isKeyValid(key) {
    // Check if the key matches the required pattern
    return typeof key === 'string' && /^m=\d+&mk=[a-f0-9]{40}$/i.test(key);
}

 function trimKey(key) {
    if (typeof key !== 'string') {
        console.error('Expected a string for key trimming.');
        return '';
    }
    
    const parts = key.split('=');
    return parts[1] ? parts[1].split('&')[0] : '';
}

 function badKeyDay() {
    Elements.infoDisplay.innerHTML += "<h3 class='red'> Bad Key .. 😢</h3><button id='reload'> Reload </button>";
    
    const reload = document.getElementById('reload');
    
    if (reload) {
        reload.addEventListener('click', () => {
            localStorage.clear();
            location.reload(true);
        });
    }
}

 function checkSaveKeyInput() {
    const apiKeyInput = document.getElementById("settings-api-key");
    const saveButton = document.getElementById("settings-api-save");
    const isValid = isKeyValid(apiKeyInput.value);
    
    apiKeyInput.style.color = isValid ? "green" : "red";
    saveButton.disabled = !isValid;
    saveButton.style.backgroundColor = isValid ? '#e73d3d' : '#5e5d5d';
}

// Save new key and refresh data
 function saveNewKeyandRefresh() {
    const apiKeyInput = document.getElementById('settings-api-key');
    const accessKey = apiKeyInput.value;
    
    if (isKeyValid(accessKey)) {
        localStorage.clear();
        localStorage.setItem('key', accessKey);
        window.location.reload();
    } else {
        console.error('Attempted to save an invalid key.');
    }
}
//#endregion

//#region Helpers.js ///////////////////////////////////

function capitalize(str) {
    if (!str) return str;  // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function getPerformanceRating(form, energy, csr, isPremium) {
    const baseEnergy = isPremium ? energy / 10 : energy;
    const performance = Number(form) + baseEnergy / 2;
    const rating = (performance + Number(csr) / 1000).toFixed(0);
    
    return `${performance} (${rating})`;
}

function getPlayerIdsAsString(playerData) {
    if (!Array.isArray(playerData)) {
        console.warn('Expected an array of player data.');
        return '';
    }
    
    return playerData
        .filter(player => player && player.id) // Ensure each player has an ID
        .map(player => player.id)
        .join(',');
}

function normalizeValue(value, maxStat, min, max) {
    if (max === min) {
        console.warn('Max and min cannot be the same. Returning the min value.');
        return min;
    }
    
    // Ensure inputs are numbers
    if (typeof value !== 'number' || typeof maxStat !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
        console.error('Invalid input types. All parameters must be numbers.');
        return null; // Or some default value
    }

    return Math.max(1, Math.min(maxStat, ((value - min) / (max - min)) * (maxStat - 1) + 1));
}

function trimEdges(string) {
    if (typeof string !== 'string') {
        console.error('Input must be a string.');
        return ''; // Return an empty string or throw an error
    }
    
    if (string.length <= 2) {
        console.warn('String is too short to trim. Returning original string.');
        return string; // Return the original string if too short
    }
    
    return string.slice(1, -1);
}


 function initColorPicker() {
    // Check if there are any saved colors in localStorage, and fall back to globals if not
    let savedColors = localStorage.getItem('colorStore');
    if (savedColors) {
        globals.colorStore = JSON.parse(savedColors);
    }
    
    // Initialize the color pickers with values from localStorage or fallback to globals
    Object.keys(globals.colorStore).forEach(range => {
        const colorInput = document.getElementById(range);
        if (colorInput) {
            colorInput.value = globals.colorStore[range]; // Set the color input's value
        }
    });

    // Listen for form submission to update colors
    document.getElementById('colorForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Update globals.colorStore with the form's color values
        globals.colorStore.range1 = document.getElementById('range1').value;
        globals.colorStore.range2 = document.getElementById('range2').value;
        globals.colorStore.range3 = document.getElementById('range3').value;
        globals.colorStore.range4 = document.getElementById('range4').value;
        globals.colorStore.range5 = document.getElementById('range5').value;
        globals.colorStore.range6 = document.getElementById('range6').value;
        globals.colorStore.range7 = document.getElementById('range7').value;

        // Save updated colorStore to localStorage
        localStorage.setItem('colorStore', JSON.stringify(globals.colorStore));

        // Show confirmation
        document.getElementById('result').textContent = 'Colors saved successfully!';
    });
}


 function processPlayerStats(playerData) {
    const playerStats = {
        Stamina: playerData.stamina,
        Attack: playerData.attack,
        Technique: playerData.technique,
        Jumping: playerData.jumping,
        Agility: playerData.agility,
        Handling: playerData.handling,
        Defense: playerData.defense,
        Strength: playerData.strength,
        Speed: playerData.speed,
        Kicking: playerData.kicking,
        Weight: +playerData.weight,
        Height: +playerData.height,
    };

    const maxNonPhysicalStat = Math.max(
        playerStats.Stamina,
        playerStats.Attack,
        playerStats.Technique,
        playerStats.Jumping,
        playerStats.Agility,
        playerStats.Handling,
        playerStats.Defense,
        playerStats.Strength,
        playerStats.Speed,
        playerStats.Kicking
    );

    const tspValues = [
        playerStats.Stamina,
        playerStats.Attack,
        playerStats.Technique,
        playerStats.Jumping,
        playerStats.Agility,
        playerStats.Handling,
        playerStats.Defense,
        playerStats.Strength,
        playerStats.Speed,
        playerStats.Kicking,
    ];

    const TotalSkillPoints = tspValues.reduce((total, num) => total + num, 0);

    playerStats.Weight = normalizeValue(playerStats.Weight, maxNonPhysicalStat, 60, 140);
    playerStats.Height = normalizeValue(playerStats.Height, maxNonPhysicalStat, 160, 212);

    return {
        playerStats,
        TotalSkillPoints,
        suggestedPos: suggestedPosition(playerStats, playerData.weight, playerData.height),
    };
}

let cup_trophy_count = 0;
let league_trophy_count = 0;
let friendly_trophy_count = 0;

const baseUrl = "https://www.blackoutrugby.com/game/";

function cabinetBuilder() {
    // console.log(globals.CLUB_DATA[0].trophies);
    
    if (globals.trophies) {
        let trophies = `
        <div>
            <p id='trophy-count' class='trophy-count-text'></p>
        </div>
        <div class='cabinet'>`;
  
        function decodeHTMLEntities(str) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = str;
            return tempDiv.innerText || tempDiv.textContent;
        }

        globals.CLUB_DATA[0].trophies.forEach(element => {
            let decodedLabel = decodeHTMLEntities(element.label);
            let label = '';

            if (element.image_url.includes("league")) {
                league_trophy_count++;
                label = 'league';
            } else if (element.image_url.includes("cup")) {
                cup_trophy_count++;
                label = 'cup';
            } else {
                friendly_trophy_count++;
                label = 'friendly';
            }

            if (decodedLabel.includes('<a href="club.league.php')) {
                decodedLabel = decodedLabel.replace(
                    /<a href="club\.league\.php\?id=(\d+)">/,
                    `<a href="${baseUrl}club.league.php?id=$1" target="_blank">`
                );
            }

            trophies += `<div id='${label}' class='trophy ${label}'><img src='${element.image_url}' title='${decodedLabel}'/>
            </div>
            `; // <span style='font-size: x-small'>${decodedLabel}</span>
        });

        trophies += `</div>`;
        // console.log(`League Trophies: ${league_trophy_count}`);
        // console.log(`Cup Trophies: ${cup_trophy_count}`);
        // console.log(`Friendly Trophies: ${friendly_trophy_count}`);
        
        return trophies;
    } else {
        return 'Not Yet';
    }
}

// function truncateText(text, maxLength) {
//     if (text.length <= maxLength) {
//         return text; 
//     }

//     return text.slice(0, maxLength) + '...'; 
// }

function setTrophyCountLabel() {
    let trophyCount = document.getElementById('trophy-count');
    
    if ((league_trophy_count+cup_trophy_count+friendly_trophy_count) != 0){
        
        trophyCount.innerHTML = `
        <span id='trophy-all'> Total</span> : ${league_trophy_count+cup_trophy_count+friendly_trophy_count} |
        <span id='trophy-league'>League</span> : ${league_trophy_count} | 
        <span id='trophy-cup'>Cup</span> : ${cup_trophy_count} |
        <span id='trophy-friendly'>Friendly</span> : ${friendly_trophy_count}`;

        // Set up event listeners for each label to filter trophies
        let leagueBtn = document.getElementById('trophy-league');
        let cupBtn = document.getElementById('trophy-cup');
        let friendlyBtn = document.getElementById('trophy-friendly');
        let allBtn = document.getElementById('trophy-all');
        
        // Hide all non-league trophies
        leagueBtn.addEventListener('click', function () {
            document.querySelectorAll('.cup, .friendly').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.league').forEach(el => {
                el.style.display = 'block';
            });
        });

        // Hide all non-cup trophies
        cupBtn.addEventListener('click', function () {
            document.querySelectorAll('.league, .friendly').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.cup').forEach(el => {
                el.style.display = 'block';
            });
        });

        // Hide all non-friendly trophies
        friendlyBtn.addEventListener('click', function () {
            document.querySelectorAll('.league, .cup').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.friendly').forEach(el => {
                el.style.display = 'block';
            });
        });

        // Display All
        allBtn.addEventListener('click', function () {
            document.querySelectorAll('.friendly, .league, .cup').forEach(el => {
                el.style.display = 'block';
            });
        });
        }
        
    
    
}




function getPremiumInfoLink() {
    return 'Nope 😢 <a href="https://www.blackoutrugby.com/game/me.account.php#page=store" target="_blank" class="premium">upgrade</a>';
}

function getRankingClass(current, previous) {
    return current > previous ? 'green' : 'red';
}

 function getEmoji(type, value) {
    const emojiMap = {
        contentment: {
            1: "😡 Grim",
            2: "😠 Cynical",
            3: "🤨 Sceptical",
            4: "😞 Buoyant",
            5: "😊 Content",
            6: "🙂 Charmed",
            7: "😄 Cheery",
            8: "😁 Thrilled",
            9: "😍 Blissful",
            10: "🤩 Euphoric"
        },
        aggression: {
            1: "😳 Timid",
            2: "🙂 Conservative",
            3: "🤨 Collected",
            4: "😠 Aggressive",
            5: "😈 Psychotic"
        },
        discipline: {
            1: "😈 Rebellious",
            2: "😜 Reckless",
            3: "🤨 Collected",
            4: "😐 Controlled",
            5: "😇 Flawless"
        }
    };
    return emojiMap[type]?.[value] || "-_-";
}

 function colorizeNumber(inputNumber) {
    if (inputNumber < 1 || inputNumber > 21) {
        return 'Number is out of range. Please enter a number between 1 and 21.';
    }

    let color;
    // Determine the color range using Math.ceil to group the numbers into sets of 3
    const rangeIndex = Math.ceil(inputNumber / 3);
    
    // Retrieve the colorStore from localStorage
    const savedColors = localStorage.getItem('colorStore');
    if (savedColors) {
        const colorStore = JSON.parse(savedColors);
        color = colorStore[`range${rangeIndex}`];
    } else {
        color = globals.colorStore[`range${rangeIndex}`];
    }

    return `<span style="color: ${color};">${inputNumber}</span>`;
}

 function isDateInPast(date_string){
    const inputDate = new Date(date_string);
    const currentDate = new Date();
    // console.log(inputDate > currentDate ? " True": "False")
    return inputDate > currentDate
}

 function formatDateString(date_string){
    const inputDate = date_string;
    const date = new Date(inputDate);
    const readableDate = date.toLocaleString("en-US",{
        year: 'numeric',
        month: 'long',
        day:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        // second:'2-digit',
        // timeZoneName: 'short'
    })
    return readableDate;
}

function formatBankBalance(balance) {
    return balance > 0 
        ? `<span class="form">$${Number(balance).toLocaleString()}</span>` 
        : `<span class="red">$${Number(balance).toLocaleString()}</span>`;
}
//#endregion

//#region UI.js ///////////////////////////

 function logTeamData() {
    Elements.dataDisplay.innerHTML = '';
    Elements.dataDisplayAvg.innerHTML = '';
    let totalFrom = 0, totalEnergy = 0, totalKG = 0, totalCM = 0, csr = 0, age = 0, agro = 0, disc = 0, injury = 0;
    let stam = 0, att = 0, tech = 0, jump = 0, agi = 0, hand = 0, def = 0, str = 0, spee = 0, kick = 0;
   
    globals.PLAYER_DATA.forEach((element, i) => {
        totalFrom += element.form;
        totalEnergy += element.energy;
        totalCM += +element.height;
        totalKG += +element.weight;
        stam += +element.stamina;
        att += +element.attack;
        tech += +element.technique;
        jump += +element.jumping;
        agi += +element.agility;
        hand += +element.handling;
        def += +element.defense;
        str += +element.strength;
        spee += +element.speed;
        kick += +element.kicking;
        csr += +element.csr;
        age += +element.age;
        agro += +element.aggression
        disc += +element.discipline

        const { playerStats, TotalSkillPoints, suggestedPos } = processPlayerStats(element);

          
        let pops = [];

        // First path check for individual player's pops
        if (globals.TRAINING_REPORT_DATA[4]?.individual?.players[element.id]?.skills) {
            let skillsArray = globals.TRAINING_REPORT_DATA[4].individual.players[element.id].skills;

            skillsArray.forEach(skillEntry => {
                if (skillEntry.pops && skillEntry.pops.length > 0) {
                    const popSkill = skillEntry.pops[0].skill;
                    pops.push({
                        playerId: element.id,
                        type: 'pop', 
                        skill: popSkill,
                        trainer: skillEntry.trainer,
                        trainerLevel: skillEntry.trainerlevel
                    });
                }
            });
        }

        // Second path check for team player's pops
        if (globals.TRAINING_REPORT_DATA[4]?.team?.players[element.id]?.pops) {
            let teamPops = globals.TRAINING_REPORT_DATA[4].team.players[element.id].pops;

            teamPops.forEach(teamPop => {
                pops.push({
                    playerId: element.id,
                    type: 'pop', 
                    skill: teamPop.skill,
                    trainer: teamPop.trainer,
                    trainerLevel: teamPop.trainerLevel
                });
            });
        }

        // Second path check for team player's drops
        if (globals.TRAINING_REPORT_DATA[4]?.team?.players[element.id]?.drops) {
            let teamDrops = globals.TRAINING_REPORT_DATA[4].team.players[element.id].drops;
                
                teamDrops.forEach(teamDrop => {
                pops.push({
                    playerId: element.id,
                    type: 'drop', 
                    skill: teamDrop.skill,
                    trainer: teamDrop.trainer, 
                    trainerLevel: teamDrop.trainerLevel
                });
            });
        }

        // This path is for CSR before and after individual training 
        if (globals.TRAINING_REPORT_DATA[4]?.individual?.players[element.id]?.csr) {
            const individualCSR = globals.TRAINING_REPORT_DATA[4].individual.players[element.id].csr;
            const individualEntry = {
                playerId: element.id,
                type: 'individual', 
                skill: 'CSR', 
                was: parseInt(individualCSR.was), 
                is: parseInt(individualCSR.is),
                trainer: undefined,
                trainerLevel: undefined
            };
            
            // Check if a CSR entry already exists for this player
            const existingEntryIndex = pops.findIndex(entry => entry.playerId === individualEntry.playerId && entry.skill === individualEntry.skill);

            if (existingEntryIndex === -1) {
                // If no existing entry, push the new one
                pops.push(individualEntry);
            } else {
                // Update existing entry if necessary
                const existingEntry = pops[existingEntryIndex];
                existingEntry.was = Math.min(existingEntry.was, individualEntry.was); // Keep the lowest 'was'
                existingEntry.is = Math.max(existingEntry.is, individualEntry.is); // Keep the highest 'is'
            }
        }

        // This path is for CSR before and after team training 
        if (globals.TRAINING_REPORT_DATA[4]?.team?.players[element.id]?.csr) {
            const teamCSR = globals.TRAINING_REPORT_DATA[4].team.players[element.id].csr;
            const teamEntry = {
                playerId: element.id,
                type: 'team',
                skill: 'CSR',
                was: parseInt(teamCSR.was), 
                is: parseInt(teamCSR.is),
                trainer: undefined,
                trainerLevel: undefined
            };

            // Check if a CSR entry already exists for this player
            const existingTeamEntryIndex = pops.findIndex(entry => entry.playerId === teamEntry.playerId && entry.skill === teamEntry.skill);

            if (existingTeamEntryIndex === -1) {
                // If no existing entry, push the new one
                pops.push(teamEntry);
            } else {
                // Update existing entry if necessary
                const existingTeamEntry = pops[existingTeamEntryIndex];
                existingTeamEntry.was = Math.min(existingTeamEntry.was, teamEntry.was); // Keep the lowest 'was'
                existingTeamEntry.is = Math.max(existingTeamEntry.is, teamEntry.is); // Keep the highest 'is'
            }
        }

        
    Elements.dataDisplay.innerHTML += `
                ${getPlayerHeaderSquadPage(element, TotalSkillPoints, pops)}
                ${squadStatsDisplay(suggestedPos, element, 0, 0, pops)}
                ${squadMatchStatsDisplay(element)}`
        
        styleInjuryorSell(isDateInPast(element.injured), element.listed , i)
    });

    const playerNames = document.querySelectorAll('.statistics');

    playerNames.forEach(name => {
        name.addEventListener('click', function() {
            const playerId = this.id; // Get the ID of the clicked player
            const statsDiv = document.getElementById(`stats-${playerId}`); // Select the corresponding stats div

            // Toggle the 'show' class
            if (statsDiv.classList.contains('show')) {
                statsDiv.classList.remove('show'); // Hide stats
                statsDiv.style.display = 'none'; // Ensure it's hidden in the DOM
            } else {
                statsDiv.classList.add('show'); // Show stats
                statsDiv.style.display = 'block'; // Show the stats in the DOM
            }
        });
    });

    // Select the statistics element
    const statsElement = document.querySelector('.statistics');

    // Add click event listener
    statsElement.addEventListener('click', function() {
        // Toggle the rotate class
        this.classList.toggle('rotate');
    });


    
    function styleInjuryorSell(injury_value, sell_value, index) {
        const parentElement = document.querySelectorAll('.parent')[index]; // Selects the current parent element
        if (injury_value) {
            parentElement.classList.add('injured');
        }
        if (sell_value){
            parentElement.classList.add('sell');
        }
        if (sell_value && injury_value){
            parentElement.classList.add('sell-and-injured')
            parentElement.classList.remove('sell')
            parentElement.classList.remove('injured')
        }
    }

    const avg = globals.PLAYER_DATA.length;
    Elements.dataDisplayAvg.style.marginTop = '10px';
    Elements.dataDisplayAvg.innerHTML = `
        <div class='card' style='text-align:center;'>
            <div class="team-avg-title-text">Team Averages</div>
            <div><span class='age'> ${Math.floor(age / avg)}.yo</span> | <span class='form'>Form: ${Math.floor(totalFrom / avg)}</span> | <span class='energy'>Energy: ${globals.isPremium ? Math.floor((totalEnergy/10) / avg) : Math.floor((totalEnergy) / avg) } </span>
            | <span class='csr'>CSR: ${Math.floor(csr / avg).toLocaleString()}</span>| <span class='performance'>Performance Rating: ${globals.isPremium ? Math.floor((totalEnergy/10) / 2 + totalFrom) / avg : Math.floor((totalEnergy / 2 + totalFrom) / avg )}</span></div>
            <div>
                <span class='physicals'>${Math.floor(totalKG / avg)}kg | ${Math.floor(totalCM / avg)}cm | ${getEmoji('aggression', Math.floor(agro / avg))} | ${getEmoji('discipline', Math.floor(disc / avg))}</span>
            </div>
            <span class='skills'>Stamina: ${colorizeNumber(Math.floor(stam / avg))} | Handling: ${colorizeNumber(Math.floor(hand / avg))} | Attack: ${colorizeNumber(Math.floor(att / avg))}
                | Defense: ${colorizeNumber(Math.floor(def / avg))} | Technique: ${colorizeNumber(Math.floor(tech / avg))} | Strength: ${colorizeNumber(Math.floor(str / avg))}
                | Jumping: ${colorizeNumber(Math.floor(jump / avg))} | Speed: ${colorizeNumber(Math.floor(spee / avg))} | Agility: ${colorizeNumber(Math.floor(agi / avg))} 
                | Kicking: ${colorizeNumber(Math.floor(kick / avg))}</span>
        </div>`;

        
        Elements.sortListDisplay.innerHTML = getSortValues();
}

 function sortPlayers() {
    const sortBy = document.getElementById("sortOption").value;
    const descendingFields = ['csr', 'age', 'form', 'energy', 'leadership', 'height', 'weight', 'stamina', 'handling', 'attack', 'defense', 'technique', 'strength', 'jumping', 'speed', 'agility', 'kicking'];

    globals.PLAYER_DATA.sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'performance') return (calculatePerformance(b) ?? 0) - (calculatePerformance(a) ?? 0);
        if (descendingFields.includes(sortBy)) return (b[sortBy] ?? 0) - (a[sortBy] ?? 0);
        return 0;
    });

    Elements.dataDisplay.innerHTML = '';
    logTeamData();
    document.getElementById("sortOption").value = sortBy;
}

 function logClubData() {
    Elements.infoContainer.classList.remove('hide');

    // Display game date information
    const gameDateDisplay = document.getElementById('game-date');
    gameDateDisplay.innerHTML = `Season: ${globals._globals.season}, Round: ${globals._globals.round}, Day: ${globals._globals.day}`;
    gameDateDisplay.classList.remove('hide');

    // Set up refresh button
    const refresh = document.getElementById('refresh');
    refresh.classList.remove('hide');

    refresh.addEventListener('click', () => {
        Elements.dataDisplay.innerHTML = '';
        Elements.dataDisplayAvg.innerHTML = '';
        loadSavedPositionWeights();
        setRanges();
        window.location.reload();
    });

    // Extract relevant data from globals
    const [{ username }] = globals.MEMBER_DATA;
    const [{ name, country_iso }] = globals.CLUB_DATA;
    const playersCount = globals.PLAYER_DATA.length;

    // Construct the content to be displayed
    const managerName = `<h3>${capitalize(username)}'s Office ${globals.isPremium ? "⭐" : ""}</h3>`;
    const clubName = `<h3>Club: ${name} </h3>`;
    const squadCount = `<h3>Squad (${playersCount})</h3>`;
    const tmLabel = `<h3>Market</h3>`;
    const settingsLabel = `<h3>Settings</h3>`;

    // Function to apply content to multiple elements
    const applyContent = (elements, content) => {
        elements.forEach(element => {
            element.innerHTML = content;
        });
    };

    // Update tab names and options with the same content
    applyContent([Elements.tab1Name, Elements.option1Name], managerName);
    applyContent([Elements.tab2Name, Elements.option2Name], clubName);
    applyContent([Elements.tab3Name, Elements.option3Name], squadCount);
    applyContent([Elements.tab4Name, Elements.option4Name], tmLabel);
    applyContent([Elements.tab5Name, Elements.option5Name], settingsLabel);
}

 function displayClubandManagerInfo() {
    const memberData = globals.MEMBER_DATA[0];
    const clubData = globals.CLUB_DATA[0];

    const { username, realname, email, dateregistered, lastclick, teams } = memberData;
    const { name, nickname_1, country_iso, bank_balance, ranking_points, prev_ranking_points, members,
            contentment, regional_rank, minor_sponsors, national_rank, total_salary, world_rank,
            stadium, stadium_capacity, stadium_corporate, stadium_members, stadium_covered,
            stadium_uncovered, stadium_standing, prev_regional_rank, prev_national_rank, prev_world_rank } = clubData;

    const formattedBalance = formatBankBalance(bank_balance);
    const registerDate = formatDateString(dateregistered);
    const lastClick = formatDateString(lastclick);

    // Settings Info
    Elements.settingsInfo.innerHTML = getSettingsInfo();

    // Manager Info
    Elements.managerInfo.innerHTML = `<div id='mail-container'>`;
    Elements.managerInfo.innerHTML +=  `${generateMailPage()} </div>`+ 
    generateNewsPage(globals.REPORT_HEADERS) +
    generateManagerInfoHTML({ username, realname, email, registerDate, lastClick, teams }) ;

    preloadArticles(globals.REPORT_HEADERS)
    createNewsListeners();

    // Club Info
    Elements.clubInfo.innerHTML = generateClubInfoHTML({ name, nickname_1, country_iso, formattedBalance, members, 
        contentment, minor_sponsors, total_salary, ranking_points, prev_ranking_points, 
        regional_rank, prev_regional_rank, national_rank, prev_national_rank, world_rank, 
        prev_world_rank, stadium, stadium_capacity, stadium_corporate, stadium_members, 
        stadium_covered, stadium_uncovered, stadium_standing });

        
        setTrophyCountLabel();
        setRanges();
        initColorPicker();
        inputsForMinMaxWeightHeight();
        setupMailTabs()
        setupMailHeadersToggle()

        addListenersForTab('inbox-content', 'mail-header', 'inbox-open');
        addListenersForTab('sent-content', 'mail-header', 'sent-open');
        addListenersForTab('saved-content', 'mail-header', 'saved-open');
        addListenersForTab('deleted-content', 'mail-header', 'deleted-open');
        
}

function setupMailTabs() {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.mail-display');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs and hide all content sections
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');

            // Add active class to the clicked tab and show the associated content
            tab.classList.add('active');
            const contentId = tab.id.replace('tab-', '') + '-content';
            document.getElementById(contentId).style.display = 'block';
        });
    });

    // Show the first tab by default
    // document.getElementById('tab-inbox').classList.add('active');
    // document.getElementById('inbox-content').style.display = 'block';
}




async function preloadArticles(headers) {
    headers.forEach(async (element) => {
        try {
            // Fetch the full article using the article ID
            const article = await fetchRugbyData('news', { id: element.id });
            const articleAuthor = await fetchRugbyData('m', {memberid: article.report[element.id].authorid,})
            const author = articleAuthor.members[article.report[element.id].authorid].username
            const moreNewsElement = document.getElementById(`more-news-${element.id}`);
            const authorElement = document.getElementById(`author-element-${element.id}`);
            moreNewsElement.innerHTML = formatText(article.report[element.id].body);  
            moreNewsElement.style.display = 'none';  
            authorElement.innerHTML = `<span class="blue"><h4> - <a href="https://www.blackoutrugby.com/game/tools.search.php#search=${author}&type=managers" target="_blank">${capitalize(author)}<h4><span>`
        } catch (error) {
            console.error(`Failed to preload article ${element.id}:`, error);
        }
    });
}

function createNewsListeners() {
    const newsButtons = document.querySelectorAll('p.blue'); 

    newsButtons.forEach(element => {
        element.classList.add('news-hover');
        element.addEventListener('click', function () {
            const articleId = this.getAttribute('data-id');  
            const moreNewsElement = document.getElementById(`more-news-${articleId}`);

            if (moreNewsElement.style.display === 'none' || !moreNewsElement.style.display) {
                moreNewsElement.style.display = 'block';  
                this.innerText = 'Less..';  
            } else {
                moreNewsElement.style.display = 'none';  
                this.innerText = 'More..';  
            }
        });
    });
}

function formatText(input) {
    // Remove [split] tags
    let formattedText = input.replace(/\[split\]/g, '');
    
    // Convert @prefix to hyperlinks
    formattedText = formattedText.replace(/@(\w+)/g, (match, p1) => {
        return `<a href="https://www.blackoutrugby.com/game/tools.search.php#search=${p1.toLowerCase()}&type=managers" target="_blank">@${p1}</a>`;
    });

    // Replace [b], [i], and [u] with HTML tags
    formattedText = formattedText
        .replace(/\[b\](.*?)\[\/b\]/g, '<strong>$1</strong>')
        .replace(/\[i\](.*?)\[\/i\]/g, '<em>$1</em>')
        .replace(/\[u\](.*?)\[\/u\]/g, '<u>$1</u>');

    // Convert [url] links to actual hyperlinks
    formattedText = formattedText.replace(/\[url=(.*?)\](.*?)\[\/url\]/g, '<a href="$1">$2</a>');

    // Return the formatted text
    return formattedText;
}



//#endregion 

//#region Settings.js /////////////////////////////////

let positionData = {};

// Generate HTML for settings
 function getSettingsInfo() {
    let positionSettingsHTML = '';

    Object.keys(positionWeights).forEach(position => {
        const weights = positionWeights[position];
        globals.totalWeightsSum = Object.values(weights).reduce((acc, value) => acc + value, 0);

        
        positionSettingsHTML += getSliderDOM(position, globals, weights);
    });

    return `
        <div class='card'>
            <h2>Algorithm Weight Adjustments</h2> 
            <hr>
            <br>
            <br>
            <div>
                Recomended that all totals for each position are the same to get fair and balanced results
            </div>
            <div>
                Refresh/reload to see updated suggestions on squad sheet
            </div>
            <br>
            <span><h3 id="refresh" class="refresh hide">↻ <small> Save and Refresh </small>↻ </h3></span>
            <button class="tm-button" type="button" onclick="resetSliders()" id='reload-defaults'>reload defaults</button>
            <p id='slider-notify'></p>       
        </div>        
        ${positionSettingsHTML}
        <div class='card'>
        ${getHeightandWeightDOM()}
        </div>
        ${getColorUiPicker()}
        </div>
        <div class='card'>
            <div class='flex-align'>
                <span>
                    <label for="settings-api-key" aria-label="Enter API Key">API Key</label>
                    <input type="text" id="settings-api-key" oninput="checkSaveKeyInput()">
                </span>
                <span>
                    <button id="settings-api-save" onclick='saveNewKeyandRefresh()' disabled="true" style="background-color:#5e5d5d;"> Save </button>
                </span>
            </div>
        </div>
        ${settingsDOM(version)}    
    `;
    
}


// LOGIC SECTION //
// console.log(heightWeightRanges.minHeightWeight.Prop.minWeight);
 function inputsForMinMaxWeightHeight(){
    // Populate inputs with saved or default values
    document.getElementById('Prop-minWeight').value = heightWeightRanges.minHeightWeight.Prop.minWeight;
    document.getElementById('Prop-maxHeight').value = heightWeightRanges.minHeightWeight.Prop.maxHeight;
    document.getElementById('Hooker-minWeight').value = heightWeightRanges.minHeightWeight.Hooker.minWeight;
    document.getElementById('Hooker-maxHeight').value = heightWeightRanges.minHeightWeight.Hooker.maxHeight;
    document.getElementById('Lock-minWeight').value = heightWeightRanges.minHeightWeight.Lock.minWeight;
    document.getElementById('Lock-minHeight').value = heightWeightRanges.minHeightWeight.Lock.minHeight;
    document.getElementById('Blindside-minWeight').value = heightWeightRanges.minHeightWeight.Blindside.minWeight;
    document.getElementById('Blindside-minHeight').value = heightWeightRanges.minHeightWeight.Blindside.minHeight;
    document.getElementById('Openside-minWeight').value = heightWeightRanges.minHeightWeight.Openside.minWeight;
    document.getElementById('Openside-minHeight').value = heightWeightRanges.minHeightWeight.Openside.minHeight;
    document.getElementById('Number8-minWeight').value = heightWeightRanges.minHeightWeight.Number8.minWeight;
    document.getElementById('Number8-minHeight').value = heightWeightRanges.minHeightWeight.Number8.minHeight;
    document.getElementById('Center-minWeight').value = heightWeightRanges.minHeightWeight.Center.minWeight;
    let confirmweights = document.getElementById('confirm-weight-height')

    // Save button click event
    document.getElementById('save-button').addEventListener('click', () => {
        const updatedData = {
            'Prop': {
                minWeight: parseInt(document.getElementById('Prop-minWeight').value),
                maxHeight: parseInt(document.getElementById('Prop-maxHeight').value)
            },
            'Hooker': {
                minWeight: parseInt(document.getElementById('Hooker-minWeight').value),
                maxHeight: parseInt(document.getElementById('Hooker-maxHeight').value)
            },
            'Lock': {
                minWeight: parseInt(document.getElementById('Lock-minWeight').value),
                minHeight: parseInt(document.getElementById('Lock-minHeight').value)
            },
            'Blindside': {
                minWeight: parseInt(document.getElementById('Blindside-minWeight').value),
                minHeight: parseInt(document.getElementById('Blindside-minHeight').value)
            },
            'Openside': {
                minWeight: parseInt(document.getElementById('Openside-minWeight').value),
                minHeight: parseInt(document.getElementById('Openside-minHeight').value)
            },
            'Number8': {
                minWeight: parseInt(document.getElementById('Number8-minWeight').value),
                minHeight: parseInt(document.getElementById('Number8-minHeight').value)
            },
            'Center': {
                minWeight: parseInt(document.getElementById('Center-minWeight').value),
                
            },
        };

        // Save updated data to localStorage
        localStorage.setItem('minHeightWeight', JSON.stringify(updatedData));
        // alert('Height and Weight limits saved!');
        confirmweights.innerHTML = `changes saved successfully, please refresh..`
    });
}

// LOGIC

// Calculate total for a position
function calculateTotal(position) {
    if (!positionData[position]) return 0;
    const total = positionData[position].sliders.reduce((sum, slider) => sum + parseFloat(slider.value), 0).toFixed(2);
    return `(${total})`;
}

// Set up the sliders and their behaviors
 function setRanges() {
    const inputs = document.querySelectorAll('.restricted-input');
    const hideShows = document.querySelectorAll('.hide-show-button');

    inputs.forEach(input => {
        const position = input.id.split('-')[0];

        // Initialize positionData if not already done
        if (!positionData[position]) {
            positionData[position] = {
                sliders: []
            };
        }

        positionData[position].sliders.push(input);

        const displayId = `${input.id}Display`;
        const displayElement = document.getElementById(displayId);
        displayElement.textContent = input.value;

        input.addEventListener('input', function () {
            displayElement.textContent = this.value; // Update display
            updateTotal(position); // Update the total score for the position
            updatePositionWeights(position); // Update the positionWeights object
        });
        
    });

    hideShows.forEach(hide => {
        hide.addEventListener('click', function() {
            const position = this.id.split('-toggle')[0];
            const sliderContainer = document.getElementById(`${position}-sliders`);
            if (sliderContainer.style.display === "none" || !sliderContainer.style.display) {
                sliderContainer.style.display = "block"; // Show sliders
                this.textContent = "Hide"; // Change button text to "Hide"
            } else {
                sliderContainer.style.display = "none"; // Hide sliders
                this.textContent = "Show"; // Change button text to "Show"
            }
        });
    });

    // resetSliders();
}

// Update the total score display for a position
function updateTotal(position) {
    const totalDisplayElement = document.getElementById(`${position}-total`);
    totalDisplayElement.textContent = calculateTotal(position);
}

// Update positionWeights based on the current slider values
function updatePositionWeights(position) {
    const sliders = positionData[position]?.sliders;

    if (!sliders || sliders.length === 0) {
        console.warn(`No sliders found for position: ${position}`);
        return;
    }

    // Update the positionWeights object with the current slider values
    const attributes = ['Weight', 'Height', 'Stamina', 'Attack', 'Technique', 'Jumping', 'Agility', 'Handling', 'Defense', 'Strength', 'Speed', 'Kicking'];
    attributes.forEach((attr, index) => {
        positionWeights[position][attr] = parseFloat(sliders[index].value);
    });

    savePositionWeights();
}

// Save positionWeights to localStorage
function savePositionWeights() {
    localStorage.setItem('positionWeights', JSON.stringify(positionWeights));
}

// Load saved position weights from localStorage
 function loadSavedPositionWeights() {
    const savedWeights = localStorage.getItem('positionWeights');
    if (savedWeights) {
        const loadedWeights = JSON.parse(savedWeights);

        Object.keys(loadedWeights).forEach(position => {
            const sliders = positionData[position]?.sliders;
            if (sliders) {
                sliders.forEach((slider, index) => {
                    slider.value = loadedWeights[position][Object.keys(loadedWeights[position])[index]];
                    updateSliderAndDisplay(position, slider);
                });
            }
        });

        // Update the global positionWeights object with loaded values
        Object.assign(positionWeights, loadedWeights);
    }
}

// Update each slider's display text
function updateSliderAndDisplay(position, slider) {
    const attribute = slider.id.split('-')[1].charAt(0).toUpperCase() + slider.id.split('-')[1].slice(1); // Convert to camel case
    const displayElement = document.getElementById(`${position}-${attribute.toLowerCase()}Display`);
    if (displayElement) {
        displayElement.textContent = slider.value;
    }
    updateTotal(position); // Update the total score
}

 function resetSliders() {
    const sliderNotify = document.getElementById('slider-notify');
    Object.keys(positionWeights).forEach(position => {
        // Reset to defaultPositionWeights for each position
        positionWeights[position] = { ...defaultPositionWeights[position] };

        // Update the sliders and display values in the DOM for each attribute of the position
        Object.keys(positionWeights[position]).forEach(attribute => {
            const slider = document.getElementById(`${position}-${attribute}`);
            // ${position}-${attr}
            // console.log(slider)
            if (slider) {
                // Update the slider's value to the default value
                slider.value = positionWeights[position][attribute];

                // Update the display span to show the default value
                const displayElement = document.getElementById(`${position}-${attribute}Display`);
                if (displayElement) {
                    // console.log(`displaying`);
                    displayElement.textContent = positionWeights[position][attribute];
                }
            }
        });
        sliderNotify.innerHTML = 'Reloaded defaults .. refresh to see changes in squad sheet'
        // Recalculate and update the total score display for the position
        updateTotal(position);
    });

    // Save the updated positionWeights to localStorage
    savePositionWeights();
}

//#endregion

//#region Market.js///////////////////


let auctions;
let searchedAuctions;
window.searchTransferMarket = searchAuctions;
window.startbid = startbid;

// Entry Function
 async function logMarketData(){
    auctions = globals.TRANSFER_DATA;
    createSearchCard()
}

function createSearchCard(){
    Elements.marketInfo.innerHTML = marketSearchBox();
}

async function searchAuctions() {
    // Clear previous auction results
    const container = document.getElementById('auction-results');
    container.innerHTML = ''; // Clear previous results

    // Show loading indicator
    Elements.infoDisplay.classList.remove('hide');
    const expiryTime = globals.expiryTime;
    try {
        // Fetch fresh auction data
        const transferMarketData = await fetchAndCacheData('transferMarketData', 'tm', {}, 1*10*1000);
        globals.TRANSFER_DATA = Object.values(transferMarketData.auctions);

        // Grab values from the input fields
        const minCsr = Number(document.getElementById('min-csr').value);
        const maxCsr = Number(document.getElementById('max-csr').value);
        const minAge = Number(document.getElementById('min-age').value);
        const maxAge = Number(document.getElementById('max-age').value);
        const minPrice = Number(document.getElementById('min-price').value);
        const maxPrice = Number(document.getElementById('max-price').value);
        const minHeight = Number(document.getElementById('min-height').value);
        const maxHeight = Number(document.getElementById('max-height').value);
        const minWeight = Number(document.getElementById('min-weight').value);
        const maxWeight = Number(document.getElementById('max-weight').value);

        // Filter the auctions based on the input values
        const filteredAuctions = auctions.filter(auction => {
            const csr = Number(auction.csr);
            const age = Number(auction.age);
            const price = Number(auction.price);
            const height = Number(auction.height);
            const weight = Number(auction.weight);
    
            return (!minCsr || csr >= minCsr) &&
                   (!maxCsr || csr <= maxCsr) &&
                   (!minAge || age >= minAge) &&
                   (!maxAge || age <= maxAge) &&
                   (!minPrice || price >= minPrice) &&
                   (!maxPrice || price <= maxPrice) &&
                   (!minHeight || height >= minHeight) &&
                   (!maxHeight || height <= maxHeight) &&
                   (!minWeight || weight >= minWeight) &&
                   (!maxWeight || weight <= maxWeight);
        });

        // Sort the filtered auctions
        const searchedAuctions = filteredAuctions.sort((a, b) => b.csr - a.csr);
        
        // Display the filtered auctions
        displayAuctions(searchedAuctions);
    } catch (error) {
        console.error('Error fetching auction data:', error);
        // Handle errors gracefully
    } finally {
        // Hide loading indicator
        Elements.infoDisplay.classList.add('hide');
    }
}

async function displayAuctions(searchedAuctions) {
    const container = document.getElementById('auction-results');
    let isInTeam; 
    // Check if there are any auctions to display
    if (!searchedAuctions || searchedAuctions.length === 0) {
        console.log('No auctions found.'); 
        container.innerHTML = '<p>No auctions found for your search criteria.</p>'; 
        return;
    }
    
    let playerTeamName;
    Elements.infoDisplay.classList.remove('hide');

    for (const auction of searchedAuctions) {
        // Create Cards
        const auctionDiv = document.createElement('div');
        auctionDiv.classList.add('auction-entry', 'card', 'parent');

        // Get Auctioned Players Team Name
        if (auction.teamid) {
            try {
                let getplayerTeamName = await fetchRugbyData('t', { teamid: auction.teamid }, 0);
                playerTeamName = getplayerTeamName.teams[auction.teamid].name;
                // console.log(playerTeamName);
            } catch (error) {
                // console.error(`Error fetching team name for team ID ${auction.teamid}:`, error);
                playerTeamName = '<span class="physicals">None</span>';
                isInTeam = false;
            }
        } else {
            playerTeamName = '<span class="physicals">None</span>';
            isInTeam = false;
        }
        
        // Get Team Name for bidding Team
        let biddingTeamName = 'No Bids';
        if (auction.bidteamid) {
            try {
                let bidteamname = await fetchRugbyData('t', { teamid: auction.bidteamid });
                biddingTeamName = bidteamname?.teams?.[auction.bidteamid]?.name || 'Unknown Team';
            } catch (error) {
                console.log(`Error fetching bidding team name for team ID ${auction.bidteamid}:`, error);
                biddingTeamName = 'Unknown Team';
            }
        }
        
        const { playerStats, TotalSkillPoints, suggestedPos } = processPlayerStats(auction);
        
        auctionDiv.innerHTML = `
        ${getPlayerHeaderAuctionPage(playerTeamName, biddingTeamName, auction, TotalSkillPoints)}
        ${squadStatsDisplay(suggestedPos, auction, auction.watchers, auction.views)}`;

        // Get DOM Inputs .. the api doesnt like bid writes to 'None' players
        
        container.appendChild(auctionDiv);
        if(isInTeam == false){
            const bidButton = document.getElementById(`bid-button-${auction.playerid}`);
            const bidInput = document.getElementById(`bid-value-${auction.playerid}`);
            const warnText = document.getElementById(`warn-text-${auction.playerid}`);
            // console.log(bidButton)
            // console.log(bidInput)
            bidButton.classList.add('disabled');
            bidInput.classList.add('disabled');
            bidButton.disabled = true;
            bidButton.disabled = true;
            warnText.innerHTML = `⚠️ no bids for 'None' players`;
            isInTeam = true
        }
        

        if (!Elements.infoDisplay.classList.contains('hide')) {
            Elements.infoDisplay.classList.add('hide');
        }
    }
  
}

async function startbid(player_id, playername, low_bid) {
    // Bid Information
    const auctionValue = document.getElementById(`bid-value-${player_id}`);
    const biddingteam_id = globals._teamid;
    const ammount = auctionValue.value;
    // UI Updates
    const updateTeam = document.getElementById(`bid-team-name-${player_id}`);
    const updatePrice = document.getElementById(`price-update-${player_id}`);
    
    let bidTeamNameUpdate;
    
    if (Number(globals.CLUB_DATA[0].bank_balance) > Number(ammount)) {
        if (confirm(`Are you sure you want to place a bid of $${Number(ammount).toLocaleString()} for ${playername} (${player_id})`)) {
            alert(`Bid Confirmed : $${Number(ammount).toLocaleString()} for ${playername}`);

       
            fetchRugbyData('tm', {
                playerid: player_id,
                biddingteamid: biddingteam_id,
                bid: Number(ammount),})

                Elements.infoDisplay.classList.remove('hide');
                
                let updatedMarketPlayer = await fetchRugbyData('p', { playerid: player_id });
            
                auctionValue.value = updatedMarketPlayer.players[player_id].nextbid;
                updatePrice.innerHTML = `$${Number(updatedMarketPlayer.players[player_id].price).toLocaleString()}`;
                updatePrice.classList.add('green');
                // let bidTeamId = updatedMarketPlayer.players[player_id].bidteamid;
                // let storebidder = await fetchRugbyData('t', { teamid: bidTeamId });
                
                // bidTeamNameUpdate = storebidder.teams[bidTeamId].name
                
                Elements.infoDisplay.classList.add('hide');
                
                // console.log(updatedMarketPlayer);
            }else{
                alert('Bid Cancelled!')
            }
        }else{
            alert('Not Enough Funds')
        }
        updateTeam.innerHTML = `${globals.CLUB_DATA[0].name}`;
}

//#endregion

//#region Algo.js /////////////////


if (localStorage.getItem('positionWeights')){
    positionWeights = JSON.parse(localStorage.getItem('positionWeights'))
}else{
    positionWeights = defaultPositionWeights;
}

 function checkPositionWeights(positionWeights) {
    for (let position in positionWeights) {
        const total = Object.values(positionWeights[position]).reduce((sum, val) => sum + val, 0);
        if (total !== 9) {
            console.log(`Error: ${position} does not equal 9, it equals ${total}`);
        } else {
            console.log(`${position} is correctly balanced.`);
        }
    }
}

function scorePositions(playerStats, weights, position, actualWeight, actualHeight) {
    const propHeightCheck = ['Tighthead Prop', 'Looshead Prop'].includes(position) && actualHeight > heightWeightRanges.minHeightWeight.Prop.maxHeight;
    const propWeightCheck = ['Tighthead Prop', 'Looshead Prop'].includes(position) && actualWeight < heightWeightRanges.minHeightWeight.Prop.minWeight;
    const hookerCheck = position === 'Hooker' && (actualWeight < heightWeightRanges.minHeightWeight.Hooker.minWeight || actualHeight > heightWeightRanges.minHeightWeight.Hooker.maxHeight);
    const lockCheck = position === 'Lock' && (actualHeight < heightWeightRanges.minHeightWeight.Lock.minHeight || actualWeight < heightWeightRanges.minHeightWeight.Lock.minWeight);
    const blindsideCheck = position === 'Blindside Flanker' && (actualHeight < heightWeightRanges.minHeightWeight.Blindside.minHeight || actualWeight < heightWeightRanges.minHeightWeight.Blindside.minWeight);
    const opensideCheck = position === 'Openside Flanker' && (actualHeight > heightWeightRanges.minHeightWeight.Openside.minHeight || actualWeight < heightWeightRanges.minHeightWeight.Openside.minWeight);
    const number8Check = position === 'No.8' && (actualWeight < heightWeightRanges.minHeightWeight.Number8.minWeight || actualHeight < heightWeightRanges.minHeightWeight.Number8.minHeight);
    const centerCheck = position === 'Center' && actualWeight < heightWeightRanges.minHeightWeight.Center.minWeight;

    if (propHeightCheck || propWeightCheck || hookerCheck || lockCheck || blindsideCheck || opensideCheck || number8Check || centerCheck) {
        return 0;
    }

    return Object.keys(weights).reduce((score, stat) => {
        return score + (playerStats[stat] || 0) * weights[stat];
    }, 0);
}

 function evaluatePlayerPosition(weight, height) {
    let feedback = '';

    feedback += checkPosition('Props', weight, height, heightWeightRanges.minHeightWeight.Prop);
    feedback += checkPosition('Hooker', weight, height, heightWeightRanges.minHeightWeight.Hooker);
    feedback += checkPosition('Lock', weight, height, heightWeightRanges.minHeightWeight.Lock, true);
    feedback += checkPosition('No.6', weight, height, heightWeightRanges.minHeightWeight.Blindside, true);
    feedback += checkPosition('No.7', weight, height, heightWeightRanges.minHeightWeight.Openside, true);
    feedback += checkPosition('No.8', weight, height, heightWeightRanges.minHeightWeight.Number8, true);
    if (weight < heightWeightRanges.minHeightWeight.Center.minWeight) feedback += "Center (too light), ";

    return feedback.slice(0, -2) || ' ';
}

function checkPosition(position, weight, height, { minWeight, maxHeight, minHeight }, isForward = false) {
    let feedback = '';
    if (isForward) {
        if (height < minHeight && weight < minWeight) feedback += `${position} (too light and too short), `;
        else if (weight < minWeight) feedback += `${position} (too light), `;
        else if (height < minHeight) feedback += `${position} (too short), `;
    } else {
        if (weight < minWeight && height > maxHeight) feedback += `${position} (too light and too tall), `;
        else if (weight < minWeight) feedback += `${position} (too light), `;
        else if (height > maxHeight) feedback += `${position} (too tall), `;
    }
    return feedback;
}

 function suggestedPosition(playerStats, weight, height) {
    const scores = Object.keys(positionWeights).map(position => ({
        position,
        score: scorePositions(playerStats, positionWeights[position], position, weight, height)
    }));

    scores.sort((a, b) => b.score - a.score);
    // return scores.slice(0, 2);
    return scores; 
}

 function weightSuggestion(weight) {
    return weight < 100 ? 'Back' : (weight > 105 ? 'Forward' : 'Forward or Back');
}

 function calculatePerformance(player) {
    // console.log(player.energy /100)
    return globals.isPremium ? player.form + (player.energy / 10) / 2 : player.form + player.energy / 2 ;
        // ? player.form + (player.energy / 10) / 2 + player.csr / 1000 
        // : player.form + player.energy / 2 + player.csr / 1000;
}

//#endregion

//#region DOM.js

function readcount(arr){
    let a = 0;
    arr.forEach(el => {
        if(el.read == 0){
            a++
        }
    });
    return a;
}

let deletedCount = 0;
let inboxCount = 0;
let savedCount = 0;
let sentCount = 0;


function generateMailPage() {
    deletedCount = readcount(globals.MAIL_DELETED[0]);
    inboxCount = readcount(globals.MAIL_INBOX[0]);
    savedCount = readcount(globals.MAIL_SAVED[0]);
    sentCount = readcount(globals.MAIL_SENT[0]);

    // console.log(globals.MAIL_INBOX[0]);
    
    let deletedMailHeaders = buildMailHeaderStrings(globals.MAIL_DELETED[0], 'deleted');
    let inboxMailHeaders = buildMailHeaderStrings(globals.MAIL_INBOX[0], 'inbox');
    let savedMailHeaders = buildMailHeaderStrings(globals.MAIL_SAVED[0], 'saved');
    let sentMailHeaders = buildMailHeaderStrings(globals.MAIL_SENT[0], 'sent');

    let mailPageHtml = `
        <div class="card">
            <h3>Mail</h3>
            <br>
            <div class='mail-section'>
                <div class='mail-tab-buttons'>
                    <span id='tab-inbox' class='tab-button'>${inboxCount> 0 ?"📫":"📭"} Inbox ( <span id='inbox-open'>${inboxCount}</span> / ${globals.MAIL_INBOX[0].length} )</span> 
                    <span id='tab-sent' class='tab-button'>${sentCount>0  ?"📫":"📭"} Sent ( <span id='sent-open'>${sentCount}</span> / ${globals.MAIL_SENT[0].length} )</span> 
                    <span id='tab-saved' class='tab-button'>${savedCount> 0 ?"📫":"📭"} Saved ( <span id='saved-open'>${savedCount}</span> / ${globals.MAIL_SAVED[0].length} )</span> 
                    <span id='tab-deleted' class='tab-button'>${deletedCount> 0? "📫":"📭"} Deleted ( <span id='deleted-open'>${deletedCount}</span> / ${globals.MAIL_DELETED[0].length} )</span>
                </div>
                <hr>
                <div class="mail-content">
                    <div id='inbox-content' class='mail-display style='display:none;'>
                        ${inboxMailHeaders}
                    </div>
                    <div id='sent-content' class='mail-display' style='display:none;'>
                        ${sentMailHeaders}
                    </div>
                    <div id='saved-content' class='mail-display' style='display:none;'>
                        ${savedMailHeaders}
                    </div>
                    <div id='deleted-content' class='mail-display' style='display:none;'>
                        ${deletedMailHeaders}
                    </div>
                </div>
            </div>
        </div>`;
    
   return mailPageHtml
}


function buildMailHeaderStrings(mailArr, _type){
    
    let mailString = '';
    
    mailArr.forEach(element => {
        let readMail = false;
        if(element.read == 1){
            readMail = true;
        }
        mailString += `
            <div class="mail-item">
                <p id='${_type}-element-${element.id}' class='mail-header ${readMail ? "mail-grey" : "mail-blue"}'>
                    <span class=''>${element.subject}</span> <span><span>[Save]</span> <span>[Delete]</span></span>
                </p>
                <div id='message-content-${element.id}' class='message-content' style="display: none;">
                    <p>Fetching message content...</p>
                </div>
            </div>`;
        // i want to nest the message content in here and use the above ^^
        // as a button to open/close the message
        // when a message is clicked it should open that message
        // and also hide ALL other opened messages, so only one is open
        // at a time the only problem is that i cant do this in a for each
        // loop ad the each message needs an await fetch call to get the content.. 
        // any suggestions on how to do this?
    });

    return mailString;
}

function setupMailHeadersToggle() {
    const headers = document.querySelectorAll('.mail-header');
    
    headers.forEach(header => {
        header.addEventListener('click', async function() {
            const contentId = header.id;
            
            // console.log("contentID :" + contentId)
            
            const bodyId = contentId.replace(/.*element-/, '');
            
            // console.log(bodyId)

            let readElement = document.getElementById(contentId)
            // console.log(readElement);
            
            
            updateMailCount(contentId, readElement)
        
            const messageboxtodisplay = document.getElementById(`message-content-${bodyId}`)
            // Toggle: If already displayed, hide it and return early
            if (messageboxtodisplay.style.display === 'block') {
                messageboxtodisplay.style.display = 'none';
                return; // Exit early since we're closing the already open message
            }
            // i am trying to make a toggle with the above code ..
            
            const allMessages = document.querySelectorAll('.message-content');
            allMessages.forEach(element => {
                element.style.display = 'none'
            });

            messageboxtodisplay.style.display = 'block';
            // Check if the content is already loaded
            if (messageboxtodisplay.innerHTML.trim() === "<p>Fetching message content...</p>") {
                try {
                    // const messageId = header.id.replace('element-', '');
                    const messageContent = await fetchMessageContent(bodyId);
                    messageboxtodisplay.innerHTML = `<p class='message-body'>${messageContent}</p>`;
                    markRead(bodyId)
                } catch (error) {
                    console.error("Error fetching content:", error);
                    messageboxtodisplay.innerHTML = `<p>Error fetching content.</p>`;
                }
            }
            
        });
    });
}


function updateMailCount(headerId, elementObject) {
    // Determine which tab is clicked and decrement the appropriate count
    // console.log(headerId)
    // console.log(elementObject)
    let flag = false
    if(elementObject.classList.contains('mail-grey')){
        flag = true
    }

    if (headerId.includes('inbox') && !flag) {
        inboxCount--;
        document.getElementById('inbox-open').textContent = inboxCount;
        if (inboxCount <= 0) {
            document.getElementById('tab-inbox').innerHTML = `📭 Inbox ( ${inboxCount} / ${globals.MAIL_INBOX[0].length} )`;
        }
    } else if (headerId.includes('sent') && !flag) {
        sentCount--;
        document.getElementById('sent-open').textContent = sentCount;
        if (sentCount <= 0) {
            document.getElementById('tab-sent').innerHTML = `📭 Sent ( ${sentCount} / ${globals.MAIL_SENT[0].length} )`;
        }
    } else if (headerId.includes('saved') && !flag) {
        savedCount--;
        document.getElementById('saved-open').textContent = savedCount;
        if (savedCount <= 0) {
            document.getElementById('tab-saved').innerHTML = `📭 Saved ( ${savedCount} / ${globals.MAIL_SAVED[0].length} )`;
        }
    } else if (headerId.includes('deleted') && !flag) {
        deletedCount--;
        document.getElementById('deleted-open').textContent = deletedCount;
        if (deletedCount <= 0) {
            document.getElementById('tab-deleted').innerHTML = `📭 Deleted ( ${deletedCount} / ${globals.MAIL_DELETED[0].length} )`;
        }
    }

    flag = false
}



async function markRead(id){
    let response = await fetchRugbyData('ma', {read:id,}, 0)
    // console.log(response)
}

async function fetchMessageContent(messageId) {
    // Simulate an API call to fetch the message content
    let response = await fetchRugbyData('ma', {messageid:messageId,}, 0);
    
    // console.log(response)
    let mailString = `${response.message.body}`
    // console.log(mailString)
    return mailString;
}



// Add click event listeners to mail-header elements based on their parent tab
function addListenersForTab(tabId, mailHeaderClass, spanId) {
    // 1. Select mail-headers in the specified tab
    let mailHeaders = document.querySelectorAll(`#${tabId} .${mailHeaderClass}`);
    
    // 2. Attach event listeners to each header
    mailHeaders.forEach(header => {
        header.addEventListener('click', () => {
            if(!header.classList.contains('mail-grey')){
                header.classList.add('mail-grey')
                header.classList.remove('mail-blue')
            }
            
        });
    });
}

//#region HEEEEEEEEEEEEEEEEEEEEERRRRR
function generateNewsPage(headers) {
    // console.log(headers);
    let headlines = '';
    headers.forEach(element => {
        headlines += `
        <span style="display:inline;"> 
            <h3>📰 - ${element.title} - 📰</h3> 
            <h5 class="physicals"> ${formatDateString(element.publish_date)}</h5>
        </span>
        <p id='author-element-${element.id}'></p> <br>
        <p id="news-${element.id}" class='blue' data-id="${element.id}" data-content="${element.content}">More..</p>
        <hr>
        <br>
        <p id="more-news-${element.id}" class='news' style="display: none;"></p>
        <br> 
        `
    });

    return `<div class='card'>
        <h2>News</h2>
        <br>
        ${headlines}
    </div>`;
}

// Generates Manager Information HTML
function generateManagerInfoHTML({ username, realname, email, registerDate, lastClick, teams }) {
    return `
        <div class='card'>
            <h3>Manager Information</h3>
            <div>Manager: ${username} | (${realname}) | Email: ${email}</div>
            <div>Premium: ${globals.isPremium ? '⭐' : getPremiumInfoLink()}</div>
            <div>Managed Teams: ${teams.length}</div>
            <div>Registered: ${registerDate}</div>
            <div>Last Click: ${lastClick}</div>
        </div>`;
}

// Generates Club Information HTML
function generateClubInfoHTML({ name, nickname_1, country_iso, formattedBalance, members, contentment, 
                                minor_sponsors, total_salary, ranking_points, prev_ranking_points, 
                                regional_rank, prev_regional_rank, national_rank, prev_national_rank, 
                                world_rank, prev_world_rank, stadium, stadium_capacity, 
                                stadium_corporate, stadium_members, stadium_covered, stadium_uncovered, 
                                stadium_standing }) {
    
    const statsHTML = generateStatsHTML(formattedBalance, members, contentment, minor_sponsors, total_salary, 
                                         ranking_points, prev_ranking_points, regional_rank, prev_regional_rank, 
                                         national_rank, prev_national_rank, world_rank, prev_world_rank, stadium, 
                                         stadium_capacity, stadium_corporate, stadium_members, stadium_covered, 
                                         stadium_uncovered, stadium_standing);

    return `
        <div class='card'>
            <div class="club-name-title">
                ${name} <span class='physicals'> '${nickname_1}' 
                <img class='nat-img' src='https://www.blackoutrugby.com/images/flagz/${country_iso.toLowerCase()}.gif'/></span>
            </div>
            <hr/><br/>
            <div class="stats-container">${statsHTML}</div>
        </div>
        <div class='card'>
            <div class="club-name-title">
                <h3>Trophy Cabinet</h3>
            </div>
            <hr/><br/>
            ${cabinetBuilder()}
        </div>`;
}



// Generate Stats HTML
function generateStatsHTML(formattedBalance, members, contentment, minor_sponsors, total_salary, 
    ranking_points, prev_ranking_points, regional_rank, prev_regional_rank, national_rank, 
    prev_national_rank, world_rank, prev_world_rank, stadium, stadium_capacity, 
    stadium_corporate, stadium_members, stadium_covered, stadium_uncovered, stadium_standing) {

    return `
        <div class="stats-category">
            <h5>Finance</h5>
            ${generateFinanceHTML(formattedBalance, members, contentment, minor_sponsors, total_salary)}
        </div>
        <div class="stats-category">
            <h5>Rankings</h5>
            ${generateRankingHTML(ranking_points, prev_ranking_points, regional_rank, prev_regional_rank, 
                                   national_rank, prev_national_rank, world_rank, prev_world_rank)}
        </div>
        <div class="stats-category">
            <h5>${stadium}</h5>
            ${generateStadiumHTML(stadium_capacity, stadium_corporate, stadium_members, stadium_covered, 
                                   stadium_uncovered, stadium_standing, members)}
        </div>
        <div class="stats-category">
            <h5>League Standings</h5>
            <p> Wip </p>
        </div>`;
}

// Generates Finance HTML
function generateFinanceHTML(formattedBalance, members, contentment, minor_sponsors, total_salary) {
    return `
        <div class='stats-spacer-club'>
            <span>Bank: </span><span>${formattedBalance}</span>
        </div>
        <div class='stats-spacer-club'>
            <span>Team Salaries: </span><span class='red'>$${Number(total_salary).toLocaleString()}</span>
        </div>
        <div class='stats-spacer-club'>
            <span>Members: </span><span>${members}</span>
        </div>
        <div class='stats-spacer-club'>
            <span>Contentment: </span><span>${getEmoji('contentment', contentment)}</span>
        </div>
        <div class='stats-spacer-club'>
            <span>Sponsors: </span><span>${minor_sponsors}</span>
        </div>`;
}

// Generates Ranking HTML
function generateRankingHTML(ranking_points, prev_ranking_points, regional_rank, prev_regional_rank, 
    national_rank, prev_national_rank, world_rank, prev_world_rank) {
    
    const movement = (points, prevPoints) => points > prevPoints ? 'green' : 'red';
    const ratingPointsMovement = ranking_points > prev_ranking_points ? "📈" : "📉";
    return `
        <div class='stats-spacer-club'>
                <span>Rating: </span><span class='${getRankingClass(ranking_points, prev_ranking_points)}'>${ranking_points} ${ratingPointsMovement}</span>
            </div>
            <div class='stats-spacer-club'>
                <span>Movement: </span><span>${(ranking_points - prev_ranking_points).toFixed(4) > 0 ? "<span class='green'> +" + (ranking_points - prev_ranking_points).toFixed(4)+"</span>" : "<span class='red'>"+(ranking_points-prev_ranking_points).toFixed(4)+"</span>"}</span>
            </div>
            <div class='stats-spacer-club'>
                <span>Regional: </span><span>${regional_rank} (${prev_regional_rank < regional_rank? "<span class='red'> "+ (prev_regional_rank - regional_rank) +" </span> ": prev_regional_rank > regional_rank? "<span class='green'> +"+ (prev_regional_rank - regional_rank) +" </span> " : prev_regional_rank - regional_rank})</span>
            </div>
            <div class='stats-spacer-club'>
                <span>National: </span><span>${national_rank} (${prev_national_rank < national_rank? "<span class='red'> "+ (prev_national_rank - national_rank) +" </span> ": prev_national_rank > national_rank? "<span class='green'> +"+ (prev_national_rank - national_rank) +" </span> " : prev_national_rank - national_rank})</span>
            </div>
            <div class='stats-spacer-club'>
                <span>World: </span><span>${world_rank} (${prev_world_rank < world_rank? "<span class='red'> "+ (prev_world_rank - world_rank) + " </span> ": prev_world_rank > world_rank? "<span class='green'> +"+ (prev_world_rank - world_rank) +" </span> " : prev_world_rank + world_rank})</span>
            </div>`;
}

// Generates Stadium HTML
function generateStadiumHTML(stadium_capacity, stadium_corporate, stadium_members, stadium_covered, 
    stadium_uncovered, stadium_standing, members) {
        let optimal = members * 9.2;
        let optimalSize = (optimal - stadium_capacity).toFixed(0)
        let corp = ((optimal * 0.0100991682787045).toFixed(0)) - stadium_corporate;
        let member = ((optimal * 0.0804653427723953).toFixed(0)) - stadium_members;
        let covered = ((optimal * 0.29962614444425).toFixed(0)) - stadium_covered;
        let uncovered = ((optimal * 0.389075320642091).toFixed(0)) - stadium_uncovered;
        let standing = ((optimal * 0.22073402386256).toFixed(0)) - stadium_standing;
    return `
        <div class='stats-spacer-club'>
            <span>Capacity: </span><span>${stadium_capacity} <span class='${optimalSize>0?"green":"red"}'>(${optimalSize > 0 ? "+" + optimalSize : optimalSize})</span></span>
        </div>
        <div class='stats-spacer-club'>
            <span>Corporate: </span><span>${stadium_corporate} <span class='${corp>0?"green":"red"}'>(${corp > 0 ? "+" + corp : corp})</span></span>
        </div>
        <div class='stats-spacer-club'>
            <span>Members: </span><span>${stadium_members} <span class='${member>0?"green":"red"}'>(${member > 0 ? "+" + member: member})</span></span>
        </div>
        <div class='stats-spacer-club'>
            <span>Covered: </span><span>${stadium_covered} <span class='${covered>0?"green":"red"}'>(${covered > 0 ? "+" + covered : covered})</span></span>
        </div>
        <div class='stats-spacer-club'>
            <span>Uncovered: </span><span>${stadium_uncovered} <span class='${uncovered>0?"green":"red"}'>(${uncovered > 0 ? "+" + uncovered : uncovered})</span></span>
        </div>
        <div class='stats-spacer-club'>
            <span>Standing: </span><span>${stadium_standing} <span class='${standing>0?"green":"red"}'>(${standing > 0 ? "+" + standing : standing})</span></span>
        </div>`;
}

function marketSearchBox(){
    return `
     <div class="card">
    <div class="transfer-market-card">
        <h2>Transfer Market Search</h2>
        <div class="row">
            <div class="input-pair">
                <label for="csr">CSR:</label>
                <input type="number" id="min-csr" placeholder="Min CSR">
                <input type="number" id="max-csr" placeholder="Max CSR">
            </div>
            <div class="input-pair">
                <label for="age">Age:</label>
                <input type="number" id="min-age" placeholder="Min Age">
                <input type="number" id="max-age" placeholder="Max Age">
            </div>
            <div class="input-pair">
                <label for="price">Price:</label>
                <input type="number" id="min-price" placeholder="Min Price">
                <input type="number" id="max-price" placeholder="Max Price">
            </div>
            <div class="input-pair">
                <label for="height">Height (cm):</label>
                <input type="number" id="min-height" placeholder="Min Height">
                <input type="number" id="max-height" placeholder="Max Height">
            </div>
            <div class="input-pair">
                <label for="weight">Weight (kg):</label>
                <input type="number" id="min-weight" placeholder="Min Weight">
                <input type="number" id="max-weight" placeholder="Max Weight">
            </div>
        </div>
        <button class="tm-button" type="button" onclick="searchTransferMarket()">Search</button>
    </div>
    
</div>

<div id="auction-results" class="auction-results"></div>

    `
}

 function getSortValues(){
    return `<div class='card'>
                <select id="sortOption" class="sort-tab-dropdown" onchange="sortPlayers()">
                    <option value="name">Name</option>
                    <option value="csr" selected>CSR</option>
                    <option value="performance">Performance</option>
                    <option value="age">Age</option>
                    <option value="form">Form</option>
                    <option value="energy">Energy</option>
                    <option value="leadership">Leadership</option>                    
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                    <option value="stamina">Stamina</option>
                    <option value="handling">Handling</option>
                    <option value="attack">Attack</option>
                    <option value="defense">Defense</option>
                    <option value="technique">Technique</option>
                    <option value="strength">Strength</option>
                    <option value="jumping">Jumping</option>
                    <option value="speed">Speed</option>
                    <option value="agility">Agility</option>
                    <option value="kicking">Kicking</option>
                </select></div>`
}

// WHENEVER NEW DOM IS GENERATED MOVE IT INTO HERE!!

function getPlayerHeaderSquadPage(e, tsp, pops){
    let natOrU20 = ''
    if (e.u20){
        natOrU20 = `<img class='nat-img-squad' src='https://www.blackoutrugby.com/images/flagz/${e.nationality.toLowerCase()}.u20.gif'/>`
    } else if(e.nat) {
        natOrU20 = `<img class='nat-img-squad' src='https://www.blackoutrugby.com/images/flagz/${e.nationality.toLowerCase()}.gif'/>`
    }else{
        natOrU20 = ''
    }
    
    let diff;
    pops.forEach(element => {
        if(element?.was){
            // console.log(e.name + " " + element.was + " : " + e.csr)
            diff = e.csr - element.was;
            if (diff > 0){
                diff = `<span class='green'><sup>${diff.toLocaleString()} ↟<sup></span>`
            }else if(diff < 0){
                diff = `<span class='red'><sup>${diff.toLocaleString()} ↡ </sup></span>`
            }else{
                diff = `<span class='physicals'><sup>${diff}</sup></span>`;
            }
        }
    });
    
return `
    <div class='card parent'>
        <div class='red injury'>${isDateInPast(e.injured) ? " ❗ Injured until: " + formatDateString(e.injured) + " ❗": " "} </div>
        <div class='blue'>
            ${e.listed ? "💲 Current Price: $" + Number(e.price).toLocaleString()
            + (e.bidteamname ? ' | Bidder : '+ e.bidteamname : ' | No Bids')  + " |  Deadline: " + formatDateString(e.deadline) + " 💲": " "} 
        </div>
        <div class='child'> 
        <div class="std-font">
            <span class='name'>${e.name}
            ${natOrU20} | </span>
            <span class='age'> ${e.age}.yo </span> | 
            <span class='csr'> CSR: ${Number(e.csr).toLocaleString()} ${diff}</span> | 
            <span class='performance'>
                Performance: ${getPerformanceRating(e.form, e.energy, e.csr, e.isPremium)}
            </span>
             <div>
                <span class='physicals'> Leadership ${e.leadership} |
                ${getEmoji('aggression', e.aggression)} | 
                ${getEmoji('discipline', e.discipline)}</span> | 
                <span class='energy'>Energy: ${e.isPremium ? e.energy/10 : e.energy} </span>| 
                <span class='form'>Form: ${e.form}</span> | 
                <span >TSP : ${tsp} </sapn>
            </div>
            <div class='physicals'>
                ${e.weight}kg | ${e.height}cm </span>
            </div>
        <div class='position'>Weight suggests: ${weightSuggestion(e.weight)}</div>
        </div>
    </div>`;
}

function getPlayerHeaderAuctionPage(playerTeamName, bidTeamName, e, tsp){

let natOrU20 = ''
    if (e.u20){
        natOrU20 = `<img class='nat-img-squad' src='https://www.blackoutrugby.com/images/flagz/${e.nationality.toLowerCase()}.u20.gif'/>`
    } else if(e.capped_for) {
        natOrU20 = `<img class='nat-img-squad' src='https://www.blackoutrugby.com/images/flagz/${e.capped_for.toLowerCase()}.gif'/>`
    }else{
        natOrU20 = ''
    }

return `
<div class='red injury'>${isDateInPast(e.injured) ? " ❗ Injured until: " + formatDateString(e.injured) + " ❗": " "} </div>
<div class="bid-container">
    <span class="blue">
        💲 Current Bid: <span id="price-update-${e.playerid}">$${Number(e.price).toLocaleString()}</span> <span id='bid-team-name-${e.playerid}' class='physicals'>${bidTeamName}</span> 
        | Deadline: ${formatDateString(e.deadline)} 💲
    </span>
        <br>
        <input id='bid-value-${e.playerid}' class='bid-input' type="number" value="${e.nextbid}" />
        <button id='bid-button-${e.playerid}' class="tm-bid-button" onclick="startbid('${e.playerid}', '${e.name.replace(/'/g, "")}', ' ${e.nextbid}')">Bid</button>
        <p id='warn-text-${e.playerid}' class='red warn'></p>
</div>
<div class='child'> 
    <div class='title-sort'>
        <div class='title-section'>
        <div class="std-font">
            <span class='name'>${e.name}
            ${natOrU20}</span> | 
            <span class='age'> ${e.age}.yo </span> | 
            <span class='csr'> CSR: ${Number(e.csr).toLocaleString()}</span> | 
            <span class='performance'>
                Performance: ${getPerformanceRating(e.form, e.energy, e.csr, e.isPremium)}
            </span><br>
            Current Team : ${playerTeamName}
            <div>
                <span class='physicals'> Leadership ${e.leadership} |
                ${getEmoji('aggression', e.aggression)} | 
                ${getEmoji('discipline', e.discipline)}</span> | 
                <span class='energy'>Energy: ${e.isPremium ? e.energy/10 : e.energy} </span>| 
                <span class='form'>Form: ${e.form}</span> | 
                <span >TSP : ${tsp} </sapn>
            </div>
            <div class='physicals'>
                ${e.weight}kg | ${e.height}cm </span>
            </div>
            <div class='position'>Weight suggests: ${weightSuggestion(e.weight)}</div>
        </div>
        </div>
        <div class='title-section'>
        </div>
    </div>
</div>`;

}

function isTeamTrained(stat, pass){
    if(globals.TRAINING_DATA.includes(stat) && pass == true){
        // console.log(stat)
        return 'trained'
    }
    return '';
}

function isIndividualTrained(id, stat, pass) {
    for (const element of globals.INDIVIDUAL_DATA) {
        if (element.skill == stat && element.playerid == id && pass == true) {
            return 'individual';
        }
    }
    return ''; // Default return value if not found
}

function checkPops(popsAndDrops, argSkill) {
    // Error checks
    if (!Array.isArray(popsAndDrops)) {
        console.error("Invalid input: 'popsAndDrops' should be an array.");
        return []; // Return an empty array if invalid
    }

    if (typeof argSkill !== 'string') {
        console.error("Invalid input: 'argSkill' should be a string.");
        return []; // Return an empty array if invalid
    }

    let hasPop = false; // Flag for pops
    let hasDrop = false; // Flag for drops

    // Check for pops and drops
    popsAndDrops.forEach(element => {
        if (element?.skill === argSkill) {
            if (element.type === 'pop') {
                hasPop = true; // Set the flag if a pop is found
            } else if (element.type === 'drop') {
                hasDrop = true; // Set the flag if a drop is found
            }
        }
    });

    // Determine the result based on the flags
    if (hasPop) {
        return '<sup>💥<span class="green">↟</span></sup>'; // Return a single pop symbol
    } else if (hasDrop) {
        return '<sup><span class="red">↡</span></sup>'; // Return a single drop symbol
    } else {
        return ''; // Return an empty string if no pops or drops found
    }
}

 function squadStatsDisplay(suggestedPos, stat, watchers, views, pops){
    let pass = false;
    if(globals._teamid == stat.teamid){
        pass = true;
    }
    // console.log(suggestedPos);


    return `
    <div class='skills'>
            <div class='stats-container'>
                <div class='stats-category'>
                    <h5>Suggestions</h5>
                    <div class='stats-spacer'>
                        <span>${suggestedPos[0].position} </span><span>${suggestedPos[0].score.toFixed(1)}</span>
                    </div>
                    <div class='stats-spacer'>
                        <span>${suggestedPos[1].position} </span><span>${suggestedPos[1].score.toFixed(1)}</span>
                    </div>
                    <div class='stats-spacer'>
                        <span>${suggestedPos[2].position} </span><span>${suggestedPos[2].score.toFixed(1)}</span>
                    </div>
                    <div class='stats-spacer'>
                        <span>${suggestedPos[3].position} </span><span>${suggestedPos[3].score.toFixed(1)}</span>
                    </div>
                    <div class='stats-spacer'>
                        <span>${suggestedPos[4].position} </span><span>${suggestedPos[4].score.toFixed(1)}</span>
                    </div>
                </div>
            <div class='stats-category'>
                <h5><br></h5>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'stamina', pass)} ${isTeamTrained('stamina', pass)}'>
                        Stamina: </span> <span class="stat-value">${pass? checkPops(pops, 'stamina'):""} ${colorizeNumber(stat.stamina)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'attack', pass)} ${isTeamTrained('attack', pass)}'>
                        Attack: </span> <span class="stat-value">${pass ? checkPops(pops, 'attack'):""}  ${colorizeNumber(stat.attack)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'technique', pass)} ${isTeamTrained('technique', pass)}'>
                        Technique: </span> <span class="stat-value">${pass ? checkPops(pops, 'technique'):""} ${colorizeNumber(stat.technique)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'jumping', pass)} ${isTeamTrained('jumping', pass)}'>
                        Jumping: </span> <span class="stat-value"> ${pass ? checkPops(pops, 'jumping'): ""}${colorizeNumber(stat.jumping)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'agility', pass)} ${isTeamTrained('agility', pass)}'>
                        Agility:</span> <span class="stat-value">${pass ? checkPops(pops, 'agility'): ""} ${colorizeNumber(stat.agility)}
                    </span>
                </div>
            </div>
        
            <div class='stats-category'>
                <h5><br></h5>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'handling', pass)} ${isTeamTrained('handling', pass)}'>
                        Handling: </span> <span class="stat-value">${pass? checkPops(pops, 'handling'): ""} ${colorizeNumber(stat.handling)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'defense', pass)} ${isTeamTrained('defense', pass)}'>
                        Defense: </span> <span class="stat-value">${pass ? checkPops(pops, 'defense'): ""} ${colorizeNumber(stat.defense)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'strength', pass)} ${isTeamTrained('strength', pass)}'>
                        Strength: </span> <span class="stat-value">${pass ? checkPops(pops, 'strength'): ""} ${colorizeNumber(stat.strength)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class=' ${isIndividualTrained(stat.id, 'speed', pass)} ${isTeamTrained('speed', pass)}'>
                        Speed: </span> <span class="stat-value">${pass ? checkPops(pops, 'speed'): ""} ${colorizeNumber(stat.speed)}
                    </span>
                </div>
                <div class='stats-spacer'>
                    <span class='${isIndividualTrained(stat.id, 'kicking', pass)} ${isTeamTrained('kicking', pass)}'>
                        Kicking:</span> <span class="stat-value">${pass ? checkPops(pops, 'kicking'): ""} ${colorizeNumber(stat.kicking)}
                    </span>
                </div>
            </div>
        </div>
            <div class='physicals'>
            
            <h5>Exclusions</h5>
            <small>${evaluatePlayerPosition(stat.weight, stat.height)}</small>

            ${watchers ? '<div class="age align-right">Watchers : '+ watchers + ' | Views: ' + views + '</div>' : '<br><div id=' + stat.id + ' class="statistics"> </div>'}
            </div>
        <div id="stats-${stat.id}" class="hidden-stats card" style="display: none;">`;
};

function squadMatchStatsDisplay(element){
    // console.log(element)
    return `<h4>Statistics for ${element.name}</h4>
    
        <div class="stats-container">
            <div class="stats-category">
                <h5>Caps</h5>
                <div class='stats-spacer'>
                    <span>League:</span> <span class="stat-value">${element.leaguecaps}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Cup:</span> <span class="stat-value">${element.cupcaps}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Friendly:</span> <span class="stat-value">${element.friendlycaps}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Under 20:</span> <span class="stat-value">${element.undertwentycaps}</span>
                </div>
                <div class='stats-spacer'>
                    <span>National:</span> <span class="stat-value">${element.nationalcaps}</span>
                </div>
            </div>

            <div class="stats-category">
                <h5>Points</h5>
                <div class='stats-spacer'>
                    <span>Tries:</span> <span class="stat-value">${element.tries}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Conversions:</span> <span class="stat-value">${element.conversions}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Penalties:</span> <span class="stat-value">${element.penalties}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Drop Goals:</span> <span class="stat-value">${element.dropgoals}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Total Points:</span> <span class="stat-value">${element.totalpoints}</span>
                </div>
            </div>

            <div class="stats-category">
                <h5>Attack</h5>
                <div class='stats-spacer'>
                    <span>Meters Gained:</span> <span class="stat-value">${element.metresgained}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Linebreaks:</span> <span class="stat-value">${element.linebreaks}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Intercepts:</span> <span class="stat-value">${element.intercepts}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Try Assists:</span> <span class="stat-value">${element.tryassists}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Beaten Defenders:</span> <span class="stat-value">${element.beatendefenders}</span>
                </div>
            </div>

            <div class="stats-category">
                <h5>Kicking</h5>
                <div class='stats-spacer'>
                    <span>Kicks: </span> <span class="stat-value">${element.kicks}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Good Kicks: </span> <span class="stat-value">${element.goodkicks}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Meters Kicked: </span> <span class="stat-value">${element.kickingmetres}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Avg Meters Kicked: </span> <span class="stat-value">${element.avkickingmetres}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Good U&U:</span> <span class="stat-value">${element.goodupandunders}</span>
                </div>
            </div>

            <div class="stats-category">
                <h5>Kicking Bad</h5>
                <div class='stats-spacer'>
                    <span>Bad Kicks:</span> <span class="stat-value">${element.badkicks}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Missed Conversions: </span> <span class="stat-value">${element.missedconversions}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Missed Penalties: </span> <span class="stat-value">${element.missedpenalties}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Missed Drop Goals </span> <span class="stat-value">${element.misseddropgoals}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Kickes out on full:</span> <span class="stat-value">${element.kicksoutonthefull}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Bad U&U:</span> <span class="stat-value">${element.badupandunders}</span>
                </div>
            </div>

            <div class="stats-category">
                <h5>Handling</h5>
                <div class='stats-spacer'>
                    <span>Handling Errors </span> <span class="stat-value">${element.handlingerrors}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Forward Passes: </span> <span class="stat-value">${element.forwardpasses}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Turnovers Won: </span> <span class="stat-value">${element.turnoverswon}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Lineouts Stolen: </span> <span class="stat-value">${element.lineoutsstolen}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Lineouts Secured:</span> <span class="stat-value">${element.lineoutssecured}</span>
                </div>
                <div class='stats-spacer'>
                    <span>Lineouts Conceded: </span> <span class="stat-value">${element.lineoutsconceded}</span>
                </div>
            </div>

            </div>

            
        </div>
    </div>`;
}

function getColorUiPicker(){
    let colorPickerUi = `<div class='card'>
        <form id="colorForm">
            <div class="range">
                <label for="range1">1-3:</label>
                <input type="color" id="range1" name="range1" value=${globals.colorStore.range1}>
            </div>
            <div class="range">
                <label for="range2">4-6:</label>
                <input type="color" id="range2" name="range2" value=${globals.colorStore.range2}>
            </div>
            <div class="range">
                <label for="range3">7-9:</label>
                <input type="color" id="range3" name="range3" value=${globals.colorStore.range3}>
            </div>
            <div class="range">
                <label for="range4">10-12:</label>
                <input type="color" id="range4" name="range4" value=${globals.colorStore.range4}>
            </div>
            <div class="range">
                <label for="range5">13-15:</label>
                <input type="color" id="range5" name="range5" value=${globals.colorStore.range5}>
            </div>
            <div class="range">
                <label for="range6">16-18:</label>
                <input type="color" id="range6" name="range6" value=${globals.colorStore.range6}>
            </div>
            <div class="range">
                <label for="range7">19-21:</label>
                <input type="color" id="range7" name="range7" value=${globals.colorStore.range7}>
            </div>
            <button class='tm-button' type="submit">Save Colors</button>
        </form>
        <div id="result"></div>
    </div>
    </div>`
    
    return colorPickerUi;
}

function getSliderDOM(position, globals, weights) {
    return `
        <div class='card compact-card'>
            <div>
                <h2>${position} ~ <span id='${position}-total' class='total-weight'>( ${globals.totalWeightsSum} )</span></h2>
            </div>
            <span class='hide-show-button' id='${position}-toggle'> Show </span><br>
            <div class='slider-container compact-slider-container' id='${position}-sliders'>
                ${Object.keys(weights).map(attr => `
                    <div class='slider-row'>
                        <label for='${position}-${attr}' class='slider-label'>${attr}:</label>
                        <span id='${position}-${attr}Display' class='sliderValue'>${weights[attr]}</span>
                        <input type='range' id='${position}-${attr}' class='restricted-input styled-slider' min='0' max='2' step='0.01' value='${weights[attr]}'>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

 function getHeightandWeightDOM(){
    return`<form id="height-weight-form" class="compact-form">
  <!-- Prop -->
  <div class="form-row">
    <h4>Prop</h4>
    
    <label for="Prop-minWeight">Min Weight:</label>
    <input id="Prop-minWeight" type="number" min="50" max="150" value="120" class="compact-input" />

    <label for="Prop-maxHeight">Max Height:</label>
    <input id="Prop-maxHeight" type="number" min="180" max="210" value="190" class="compact-input" />

  </div>

  <!-- Hooker -->
  <div class="form-row">
    <h4>Hooker</h4>
    <label for="Hooker-minWeight">Min Weight:</label>
    <input id="Hooker-minWeight" type="number" min="50" max="150" value="110" class="compact-input" />

    <label for="Hooker-maxHeight">Max Height:</label>
    <input id="Hooker-maxHeight" type="number" min="160" max="200" value="185" class="compact-input" />
  </div>

  <!-- Lock -->
  <div class="form-row">
    <h4>Lock</h4>
    <label for="Lock-minHeight">Min Height:</label>
    <input id="Lock-minHeight" type="number" min="150" max="220" value="199" class="compact-input" />

    <label for="Lock-minWeight">Min Weight:</label>
    <input id="Lock-minWeight" type="number" min="50" max="150" value="105" class="compact-input" />
  </div>
  
  <!-- Blindside -->
  <div class="form-row">
    <h4>Blindside</h4>
    <label for="Blindside-minHeight">Min Height:</label>
    <input id="Blindside-minHeight" type="number" min="150" max="220" value="199" class="compact-input" />

    <label for="Blindside-minWeight">Min Weight:</label>
    <input id="Blindside-minWeight" type="number" min="50" max="150" value="105" class="compact-input" />
  </div>

  <!-- Openside -->
  <div class="form-row">
    <h4>Openside</h4>
    <label for="Openside-minHeight">Min Height:</label>
    <input id="Openside-minHeight" type="number" min="150" max="220" value="199" class="compact-input" />

    <label for="Openside-minWeight">Min Weight:</label>
    <input id="Openside-minWeight" type="number" min="50" max="150" value="105" class="compact-input" />
  </div>

  <!-- Number8 -->
  <div class="form-row">
    <h4>Number8</h4>
    <label for="Number8-minHeight">Min Height:</label>
    <input id="Number8-minHeight" type="number" min="150" max="220" value="199" class="compact-input" />

    <label for="Number8-minWeight">Min Weight:</label>
    <input id="Number8-minWeight" type="number" min="50" max="150" value="105" class="compact-input" />
  </div>

  <!-- Center -->
  <div class="form-row">
    <h4>Center</h4>
    <div></div>
    <div></div>
    <label for="Center-minWeight">Min Weight:</label>
    <input id="Center-minWeight" type="number" min="50" max="150" value="105" class="compact-input" />
  </div>

  <button type="button" id="save-button" class="tm-button">Save</button>
  <p id='confirm-weight-height'></p>
</form>
`;
}

 function settingsDOM(version){
    return `
        <div class='card'>
            <div class='flex-align'>
                <span>WIP Items</span>
                <span>(Version ${version})</span>
            </div>
            <div class='physicals'>
                <div> Training skill highlights ✅ </div>
                <div> Mail </div>
                <div> TM Page ✅ </div>
                <div>Player Stats ✅ </div>
                <div>Trohpy Cabinet ✅ </div>
                <div>Deploy Electron distributable</div>
                <div>Electron window UI ✅</div>
                <div>Adjustable algorithm weights✅</div>
                <div>Some positions are copies of others atm (halves, wing and FB) ✅ fixed</div>
                <div>Adjustable min weight and height exclusions ✅</div>
                <div>Min Prop Weight & Height ✅</div>
                <div>Min Hooker Weight & Height ✅</div>
                <div>Min Lock Height ✅</div>
                <div>Positional skill algorithm ✅</div>
                <div>Squad sort ✅</div>
            </div>
        </div>
        <div class='card'>
        <div>
        <a href="https://www.blackoutrugby.com/game/me.account.php#page=store&memberid=153355" target="_blank" class="tm-button" type="button">
            Support Dev
        </a> 
        </div>
        </div>
        <div class='card'>
            🪲 Bug? pm yaya <a href='https://www.blackoutrugby.com/game/me.office.php#page=mail&newmessage=1&folder=1&tab=inbox' target="_blank">here</a>
        </div>`;
}

//#endregion

