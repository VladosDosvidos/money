/* ==========================================================================
   State & Constants
   ========================================================================== */
// The target current date is fixed to May 22, 2026, as per requirements
const TODAY = new Date('2026-05-22');

// NBU Fixed Target Date (May 22, 2026) rates
const NBU_END_USD = 44.2341;
const NBU_END_XAU = 199614.34;
const SP500_END = 7433;

// Default Start Date (Aug 22, 2025) rates for instant initial render
const NBU_START_USD_DEFAULT = 41.2185;
const NBU_START_XAU_DEFAULT = 137415.47;
const SP500_START_DEFAULT = 6460;

// S&P 500 Index monthly close price history for linear interpolation
const SP500_HISTORY = {
    "2024-01-01": 4845,
    "2024-02-01": 5096,
    "2024-03-01": 5254,
    "2024-04-01": 5035,
    "2024-05-01": 5277,
    "2024-06-01": 5460,
    "2024-07-01": 5522,
    "2024-08-01": 5648,
    "2024-09-01": 5761,
    "2024-10-01": 5705,
    "2024-11-01": 5973,
    "2024-12-01": 5974,
    "2025-01-01": 6012,
    "2025-02-01": 6080,
    "2025-03-01": 6150,
    "2025-04-01": 6250,
    "2025-05-01": 6320,
    "2025-06-01": 6380,
    "2025-07-01": 6420,
    "2025-08-01": 6460,
    "2025-09-01": 6550,
    "2025-10-01": 6620,
    "2025-11-01": 6780,
    "2025-12-01": 6850,
    "2026-01-01": 6980,
    "2026-02-01": 7120,
    "2026-03-01": 7250,
    "2026-04-01": 7350,
    "2026-05-01": 7433
};

// Annualized Percentage Yield (APY) net of taxes - fallback data
const INVESTMENTS_DATA = [
    {
        name: "Депозит у гривні",
        apy: 0.1078, // 14% APY minus 19.5% tax
        badgeClass: "badge-baseline",
        comment: "Найпростіший спосіб. Навіть банк переганяє твого друга за надійністю."
    },
    {
        name: "ОВДП (Гривня)",
        apy: 0.1600, // 16% APY net (no tax)
        badgeClass: "badge-safe",
        comment: "Купується в Дії за дві секунди. Державна гарантія та жодної копійки податків."
    },
    {
        name: "Готівковий Долар",
        apy: 0.0877, // FallbackUSD Exchange rate growth APY
        badgeClass: "badge-currency",
        comment: "Пасивний захист. Долар стабільно росте відносно гривні, рятуючи від інфляції."
    },
    {
        name: "Валютний деп / USDT",
        apy: 0.1504, // Fallback USD Growth + 6% staking APY
        badgeClass: "badge-crypto",
        comment: "Стейкінг USDT на біржах чи валютний депозит. Подвійна вигода: ріст бакса + відсотки."
    },
    {
        name: "Акції США (S&P 500)",
        apy: 0.3010, // Fallback S&P 500 index growth APY
        badgeClass: "badge-growth",
        comment: "Володіння часткою 500 найбільших гігантів (Apple, Microsoft, Nvidia). Чудовий ріст."
    },
    {
        name: "Золото (XAU)",
        apy: 0.6138, // Fallback Gold growth APY
        badgeClass: "badge-gold",
        comment: "Золоте Ельдорадо. Світова нестабільність штовхнула метал угору. Твій друг виявився супер-витратним."
    }
];

// Current active rates (hydrated initially with defaults)
let currentRates = {
    usd: NBU_START_USD_DEFAULT,
    xau: NBU_START_XAU_DEFAULT,
    sp500: SP500_START_DEFAULT
};

// Current state values
let currentDebt = 50000;
let currentDays = 273; // 9 months (Aug 22, 2025 to May 22, 2026 is ~273 days)
let isLoading = false;

// Target elements - declared globally, initialized in DOMContentLoaded
let debtInput;
let nameInput;
let issueDateInput;
let elapsedTimeText;
let maxRegretText;
let regretCommentText;
let gaugeFill;
let gaugeNeedle;
let gaugeRegretPercent;
let presetButtons;
let shareHintBtn;
let toast;

// Loading UI elements
let controlsPanel;
let statusIndicator;
let statusTitle;
let investCards;

// Map to keep track of current shown totals to animate from them smoothly
const animatedStates = {
    maxRegret: 0,
    cards: [0, 0, 0, 0, 0, 0]
};

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    debtInput = document.getElementById('debt-amount');
    nameInput = document.getElementById('friend-name');
    issueDateInput = document.getElementById('issue-date');
    elapsedTimeText = document.getElementById('elapsed-time-text');
    maxRegretText = document.getElementById('max-regret-amount');
    regretCommentText = document.getElementById('regret-comment');
    gaugeFill = document.getElementById('gauge-fill');
    gaugeNeedle = document.getElementById('gauge-needle');
    gaugeRegretPercent = document.getElementById('gauge-regret-percent');
    presetButtons = document.querySelectorAll('.preset-btn');
    shareHintBtn = document.getElementById('share-hint-btn');
    toast = document.getElementById('toast');
    
    controlsPanel = document.querySelector('.controls-panel');
    statusIndicator = document.getElementById('status-indicator');
    statusTitle = document.getElementById('status-title');
    investCards = document.querySelectorAll('.invest-card');

    // 1. Read parameters from URL search query
    const urlParams = new URLSearchParams(window.location.search);
    
    // Parse & validate amount
    const urlAmount = parseFloat(urlParams.get('amount'));
    if (!isNaN(urlAmount) && urlAmount > 0) {
        currentDebt = urlAmount;
        debtInput.value = urlAmount;
    } else {
        currentDebt = 50000;
        debtInput.value = 50000;
    }
    
    // Parse & validate date (must be a valid date before TODAY)
    const urlDateStr = urlParams.get('date');
    let initialDate = new Date('2025-08-22');
    if (urlDateStr) {
        const testDate = new Date(urlDateStr);
        if (!isNaN(testDate.getTime()) && testDate < TODAY) {
            initialDate = testDate;
        }
    }
    issueDateInput.value = initialDate.toISOString().split('T')[0];
    
    // Parse & validate name
    const urlName = urlParams.get('name');
    if (urlName) {
        nameInput.value = urlName;
    } else {
        nameInput.value = '';
    }
    adjustNameWidth();
    
    // 2. Set max attribute for date picker (must not select today or future)
    const dayBeforeToday = new Date(TODAY);
    dayBeforeToday.setDate(TODAY.getDate() - 1);
    issueDateInput.max = dayBeforeToday.toISOString().split('T')[0];
    
    // 3. Update preset buttons active state based on loaded amount
    presetButtons.forEach(btn => {
        if (parseFloat(btn.dataset.value) === currentDebt) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 4. Set initial URL query parameters so they are clean and synchronized
    syncParamsToUrl();
    
    // 5. Initialize calculations
    calculateAndUpdate();
    
    // 6. Attach event listeners
    debtInput.addEventListener('input', handleDebtChange);
    issueDateInput.addEventListener('change', handleDateChange);
    nameInput.addEventListener('input', () => {
        adjustNameWidth();
        syncParamsToUrl();
    });
    
    // Explicit trigger for Chrome calendar picker on clicking anywhere inside the input box
    issueDateInput.addEventListener('click', () => {
        if (typeof issueDateInput.showPicker === 'function') {
            try {
                issueDateInput.showPicker();
            } catch (err) {
                console.warn("showPicker failed:", err);
            }
        }
    });
    
    presetButtons.forEach(btn => {
        btn.addEventListener('click', handlePresetClick);
    });
    
    shareHintBtn.addEventListener('click', handleShareHint);
});

/* ==========================================================================
   URL State Sync & Event Handlers
   ========================================================================== */
/**
 * Synchronizes the current debt and issue date state to the browser's URL search parameters
 */
function syncParamsToUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set('amount', currentDebt);
    url.searchParams.set('date', issueDateInput.value);
    
    const nameVal = nameInput.value.trim();
    if (nameVal) {
        url.searchParams.set('name', nameVal);
    } else {
        url.searchParams.delete('name');
    }
    
    window.history.replaceState({}, '', url.toString());
}

/**
 * Adjusts the width of the name input dynamically based on the character length of its content
 */
function adjustNameWidth() {
    nameInput.style.width = Math.max(3, nameInput.value.length || nameInput.placeholder.length) + 'ch';
}

function handleDebtChange(e) {
    let val = parseFloat(e.target.value);
    
    // Validate value
    if (isNaN(val) || val <= 0) {
        val = 0;
    }
    
    currentDebt = val;
    
    // Update preset active classes (remove active if doesn't match preset)
    presetButtons.forEach(btn => {
        if (parseFloat(btn.dataset.value) === val) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    calculateAndUpdate();
    syncParamsToUrl();
}

async function handleDateChange(e) {
    const selectedDate = new Date(e.target.value);
    
    if (isNaN(selectedDate.getTime()) || selectedDate >= TODAY) {
        // Fallback to 9 months ago if invalid or future
        const fallback = new Date('2025-08-22');
        issueDateInput.value = fallback.toISOString().split('T')[0];
    }
    
    await calculateAndUpdate();
    syncParamsToUrl();
}

function handlePresetClick(e) {
    const presetVal = parseFloat(e.target.dataset.value);
    debtInput.value = presetVal;
    currentDebt = presetVal;
    
    presetButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    calculateAndUpdate();
    syncParamsToUrl();
}

/* ==========================================================================
   Calculations & Updates
   ========================================================================== */
async function calculateAndUpdate() {
    const selectedDate = new Date(issueDateInput.value);
    
    // Calculate difference in time
    const diffTime = TODAY - selectedDate;
    const diffDays = Math.max(1, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    currentDays = diffDays;
    
    // Calculate exact calendar months and days elapsed
    const dateDetails = getCalendarDifference(selectedDate, TODAY);
    
    // Update duration status text
    let durationString = '';
    if (dateDetails.years > 0) {
        durationString += `${dateDetails.years} ${pluralize(dateDetails.years, 'рік', 'роки', 'років')} `;
    }
    if (dateDetails.months > 0) {
        durationString += `${dateDetails.months} ${pluralize(dateDetails.months, 'місяць', 'місяці', 'місяців')} `;
    }
    if (dateDetails.days > 0 || durationString === '') {
        durationString += `${dateDetails.days} ${pluralize(dateDetails.days, 'день', 'дні', 'днів')}`;
    }
    
    elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong> (всього <strong>${diffDays}</strong> ${pluralize(diffDays, 'день', 'дні', 'днів')} безвідсоткового користування).`;
    
    // Fetch rates dynamically if date changes
    let rates = { ...currentRates };
    let useFallbackCalculations = false;
    
    const isDefaultDate = issueDateInput.value === '2025-08-22';
    
    if (isDefaultDate) {
        rates = {
            usd: NBU_START_USD_DEFAULT,
            xau: NBU_START_XAU_DEFAULT,
            sp500: SP500_START_DEFAULT
        };
        currentRates = rates;
    } else if (!isLoading) {
        isLoading = true;
        
        // Show loading animations
        controlsPanel.classList.add('loading-state');
        statusIndicator.classList.add('loading');
        statusTitle.textContent = "Оновлення курсів з API...";
        elapsedTimeText.innerHTML = `Звертаємось до API Національного банку України для отримання котирувань...`;
        
        investCards.forEach(card => card.classList.add('loading', 'loading-shimmer'));
        maxRegretText.classList.add('loading');
        
        try {
            const fetched = await fetchNbuRates(selectedDate);
            rates = {
                usd: fetched.usd,
                xau: fetched.xau,
                sp500: getInterpolatedSP500(selectedDate)
            };
            currentRates = rates;
            
            // Restore elapsed time text
            elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong> (всього <strong>${diffDays}</strong> ${pluralize(diffDays, 'день', 'дні', 'днів')} безвідсоткового користування).`;
        } catch (e) {
            console.error("Помилка отримання даних API NBU:", e);
            useFallbackCalculations = true;
            
            // Show notice that we fell back to safe defaults
            elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Використовуються орієнтовні ринкові ставки (офлайн режим)</span>`;
        } finally {
            isLoading = false;
            controlsPanel.classList.remove('loading-state');
            statusIndicator.classList.remove('loading');
            statusTitle.textContent = "Тривалість прострочення";
            
            investCards.forEach(card => card.classList.remove('loading', 'loading-shimmer'));
            maxRegretText.classList.remove('loading');
        }
    }
    
    // Calculate investments returns
    const T = diffDays / 365; // Duration in years
    let maxProfit = 0;
    let cardProfits = [];
    let cardTotals = [];
    
    // Calculate dynamic annualized APY for rate badges for the selected period
    let usdCashApy = useFallbackCalculations ? (INVESTMENTS_DATA[2].apy * 100) : (((NBU_END_USD / rates.usd - 1) / T) * 100);
    let usdtApy = useFallbackCalculations ? (INVESTMENTS_DATA[3].apy * 100) : ((((NBU_END_USD / rates.usd) * (1 + 0.06 * T) - 1) / T) * 100);
    let sp500Apy = useFallbackCalculations ? (INVESTMENTS_DATA[4].apy * 100) : ((((SP500_END / rates.sp500) * (NBU_END_USD / rates.usd) - 1) / T) * 100);
    let goldApy = useFallbackCalculations ? (INVESTMENTS_DATA[5].apy * 100) : (((NBU_END_XAU / rates.xau - 1) / T) * 100);
    
    INVESTMENTS_DATA.forEach((data, index) => {
        let profit = 0;
        let apyValue = 0;
        
        if (useFallbackCalculations) {
            profit = currentDebt * data.apy * T;
            apyValue = data.apy * 100;
        } else {
            switch (index) {
                case 0: // Deposit
                    profit = currentDebt * data.apy * T;
                    apyValue = data.apy * 100;
                    break;
                case 1: // OVDP
                    profit = currentDebt * data.apy * T;
                    apyValue = data.apy * 100;
                    break;
                case 2: // USD Cash
                    profit = currentDebt * (NBU_END_USD / rates.usd - 1);
                    apyValue = usdCashApy;
                    break;
                case 3: // USDT Staking
                    profit = currentDebt * ((NBU_END_USD / rates.usd) * (1 + 0.06 * T) - 1);
                    apyValue = usdtApy;
                    break;
                case 4: // S&P 500
                    profit = currentDebt * ((SP500_END / rates.sp500) * (NBU_END_USD / rates.usd) - 1);
                    apyValue = sp500Apy;
                    break;
                case 5: // Gold
                    profit = currentDebt * (NBU_END_XAU / rates.xau - 1);
                    apyValue = goldApy;
                    break;
            }
        }
        
        const total = currentDebt + profit;
        
        cardProfits.push(Math.round(profit));
        cardTotals.push(Math.round(total));
        
        if (profit > maxProfit) {
            maxProfit = profit;
        }
        
        // Update DOM elements on card
        const cardSum = document.getElementById(`card-sum-${index}`);
        const cardProfit = document.getElementById(`card-profit-${index}`);
        
        if (cardSum && cardProfit) {
            animateNumber(cardSum, animatedStates.cards[index] + currentDebt, Math.round(total), 600, true);
            animateNumber(cardProfit, animatedStates.cards[index], Math.round(profit), 600, true, '+');
            animatedStates.cards[index] = Math.round(profit);
        }
        
        // Update APY badge content dynamically based on current selected dates
        const rateBadge = document.querySelector(`[data-index="${index}"] .rate-badge`);
        if (rateBadge) {
            switch (index) {
                case 0:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">нетто</span>`;
                    break;
                case 1:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">0% податків</span>`;
                    break;
                case 2:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">ріст курсу</span>`;
                    break;
                case 3:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">курс + 6% stake</span>`;
                    break;
                case 4:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">фонд (VOO)</span>`;
                    break;
                case 5:
                    rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">шалене ралі</span>`;
                    break;
            }
        }
    });
    
    maxProfit = Math.round(maxProfit);
    
    // Update Max Regret Text & Visual Scale
    animateNumber(maxRegretText, animatedStates.maxRegret, maxProfit, 800, false);
    animatedStates.maxRegret = maxProfit;
    
    // Update Speedometer Regret Gauge (Max out at 40% yield)
    const yieldPercentage = currentDebt > 0 ? (maxProfit / currentDebt) : 0;
    
    // 40% yield = 100% regret
    const regretPercentage = Math.min(100, Math.round((yieldPercentage / 0.40) * 100));
    
    // Rotate needle from -90deg (0%) to +90deg (100%)
    const needleAngle = -90 + (regretPercentage / 100) * 180;
    if (gaugeNeedle) {
        gaugeNeedle.style.transform = `rotate(${needleAngle}deg)`;
    }
    
    // Fill gauge SVG arc (length is 125.6px)
    const strokeDashoffset = 125.6 - (regretPercentage / 100) * 125.6;
    if (gaugeFill) {
        gaugeFill.setAttribute('stroke-dashoffset', strokeDashoffset);
        gaugeFill.style.strokeDashoffset = `${strokeDashoffset}px`;
    }
    
    // Display percentage in center
    if (gaugeRegretPercent) {
        gaugeRegretPercent.textContent = `${regretPercentage}%`;
    }
    
    // Highlight the active gradation label under the speedometer
    const labels = document.querySelectorAll('.gauge-labels span');
    labels.forEach(l => l.classList.remove('active'));
    
    if (regretPercentage === 0) {
        const lbl = document.querySelector('.label-calm');
        if (lbl) lbl.classList.add('active');
    } else if (regretPercentage > 0 && regretPercentage <= 25) {
        const lbl = document.querySelector('.label-doubts');
        if (lbl) lbl.classList.add('active');
    } else if (regretPercentage > 25 && regretPercentage <= 50) {
        const lbl = document.querySelector('.label-anxiety');
        if (lbl) lbl.classList.add('active');
    } else if (regretPercentage > 50 && regretPercentage < 100) {
        const lbl = document.querySelector('.label-anger');
        if (lbl) lbl.classList.add('active');
    } else if (regretPercentage === 100) {
        const lbl = document.querySelector('.label-fury');
        if (lbl) lbl.classList.add('active');
    }
    
    // Set dynamic sarcastic regret comment based on exact regret level (6 high-res levels)
    let regretComment = '';
    if (regretPercentage === 0) {
        regretComment = "Боргу немає — совість чиста, гаманець порожній. Всі щасливі.";
    } else if (regretPercentage > 0 && regretPercentage <= 10) {
        regretComment = "Смирення. Втрати символічні, але на кілька чашок запашної кави з круасаном твій друг тебе вже нагрів.";
    } else if (regretPercentage > 10 && regretPercentage <= 35) {
        regretComment = "Сумніви. Відсотки ростуть швидше за твою віру в те, що гроші повернуть найближчим часом.";
    } else if (regretPercentage > 35 && regretPercentage <= 65) {
        regretComment = "Тривога! Цей безвідсотковий кредит міг би стати поїздкою в Карпати або новим гаджетом. Друг розважається, а ти рахуєш віртуальні гривні.";
    } else if (regretPercentage > 65 && regretPercentage < 100) {
        regretComment = "Роздратування! Гроші знецінюються, а набігли б солідні кошти. Ти спонсоруєш чуже життя безкоштовно!";
    } else if (regretPercentage === 100) {
        regretComment = "ЛЮТЬ! Втрачена вигода перевищила 40% від боргу! Поки твій друг тягне час, золото чи акції принесли б тобі цілий статок. Пора діяти!";
    }
    regretCommentText.textContent = regretComment;
}

/* ==========================================================================
   Helper Functions
   ========================================================================== */
/**
 * Fetches USD exchange rate and Gold accounting price from NBU API for a specific date.
 * Implements a retry loop up to 3 days back for robustness.
 */
async function fetchNbuRates(dateObj) {
    let attempts = 0;
    let tempDate = new Date(dateObj);
    
    while (attempts < 4) {
        const yyyymmdd = tempDate.getFullYear() + 
                         String(tempDate.getMonth() + 1).padStart(2, '0') + 
                         String(tempDate.getDate()).padStart(2, '0');
        
        const usdUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=${yyyymmdd}&json`;
        const xauUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=XAU&date=${yyyymmdd}&json`;
        
        try {
            console.log(`Fetching rates for date: ${yyyymmdd} (attempt ${attempts + 1})...`);
            const [usdResponse, xauResponse] = await Promise.all([
                fetch(usdUrl),
                fetch(xauUrl)
            ]);
            
            if (!usdResponse.ok || !xauResponse.ok) {
                throw new Error(`HTTP error! USD: ${usdResponse.status}, XAU: ${xauResponse.status}`);
            }
            
            const [usdData, xauData] = await Promise.all([
                usdResponse.json(),
                xauResponse.json()
            ]);
            
            if (Array.isArray(usdData) && usdData.length > 0 && Array.isArray(xauData) && xauData.length > 0) {
                const usdRate = usdData[0].rate;
                const xauRate = xauData[0].rate;
                
                if (usdRate && xauRate) {
                    console.log(`Successfully fetched USD: ${usdRate}, XAU: ${xauRate}`);
                    return { usd: usdRate, xau: xauRate };
                }
            }
        } catch (e) {
            console.warn(`Attempt ${attempts + 1} failed for ${yyyymmdd}:`, e);
        }
        
        // Go back 1 day and try again (useful for weekend/holiday gaps)
        tempDate.setDate(tempDate.getDate() - 1);
        attempts++;
    }
    
    throw new Error("Не вдалося завантажити курси з API НБУ після кількох спроб.");
}

/**
 * Performs linear interpolation on S&P 500 historical monthly closings
 */
function getInterpolatedSP500(dateObj) {
    const time = dateObj.getTime();
    const keys = Object.keys(SP500_HISTORY).sort();
    const parsedDates = keys.map(k => new Date(k));
    
    // Boundary checks
    if (time <= parsedDates[0].getTime()) {
        return SP500_HISTORY[keys[0]];
    }
    if (time >= parsedDates[parsedDates.length - 1].getTime()) {
        return SP500_HISTORY[keys[keys.length - 1]];
    }
    
    // Find matching bracket
    for (let i = 0; i < keys.length - 1; i++) {
        const timeA = parsedDates[i].getTime();
        const timeB = parsedDates[i+1].getTime();
        
        if (time >= timeA && time <= timeB) {
            const valA = SP500_HISTORY[keys[i]];
            const valB = SP500_HISTORY[keys[i+1]];
            
            const fraction = (time - timeA) / (timeB - timeA);
            return valA + fraction * (valB - valA);
        }
    }
    
    return SP500_START_DEFAULT;
}

/**
 * Calculates calendar differences (years, months, days) between start date and end date
 */
function getCalendarDifference(startDate, endDate) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    if (days < 0) {
        months--;
        // Get number of days in the previous month of end date
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    return { years, months, days };
}

/**
 * Animates numbers ticking up or down smoothly
 */
function animateNumber(element, start, end, duration = 600, isCurrency = true, prefix = '') {
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (isCurrency) {
            element.textContent = prefix + formatCurrency(currentValue);
        } else {
            element.textContent = prefix + currentValue.toLocaleString('uk-UA');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (isCurrency) {
                element.textContent = prefix + formatCurrency(end);
            } else {
                element.textContent = prefix + end.toLocaleString('uk-UA');
            }
        }
    }
    
    window.requestAnimationFrame(step);
}

/**
 * Formats standard integers to Ukrainian UAH style (e.g. 54 042 ₴)
 */
function formatCurrency(value) {
    return value.toLocaleString('uk-UA') + ' ₴';
}

/**
 * Handles grammatical pluralization in Ukrainian
 */
function pluralize(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

/* ==========================================================================
   Share Feature (Hint Creator)
   ========================================================================== */
function handleShareHint() {
    const selectedDateStr = new Date(issueDateInput.value).toLocaleDateString('uk-UA');
    const formattedDebt = formatCurrency(currentDebt);
    
    // Find yields for Gold and OVDP dynamically
    const goldProfit = animatedStates.cards[5];
    const ovdpProfit = animatedStates.cards[1];
    
    const formattedGoldProfit = formatCurrency(goldProfit);
    const formattedOvdpProfit = formatCurrency(ovdpProfit);
    
    const nameVal = nameInput.value.trim();
    const greeting = nameVal ? `Привіт, ${nameVal}!` : `Привіт!`;
    
    // Construct sarcasm message
    const message = `${greeting} Нагадую про дружній борг у розмірі ${formattedDebt}, який було видано ${selectedDateStr} (${currentDays} днів тому).\n\nЗа цей час, якби я вклав ці гроші у золото, чистий прибуток склав би ${formattedGoldProfit}. В ОВДП без податків я б заробив ${formattedOvdpProfit}.\n\nМоже, пора повертати? Розрахунок альтернативної вартості тут: ${window.location.href}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(message).then(() => {
        // Show Toast
        toast.classList.remove('hidden');
        
        // Hide after 3.5 seconds
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3500);
    }).catch(err => {
        console.error('Не вдалося скопіювати текст: ', err);
        alert('Не вдалося скопіювати текст автоматично. Скопіюйте розрахунок вручну:\n\n' + message);
    });
}
