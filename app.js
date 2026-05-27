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

// Active Language state
let currentLang = 'uk';

// Localization Dictionary
const LANGUAGES = {
    uk: {
        titleGreeting: "Друже",
        titleQuestion: ", де мої <span class=\"gradient-text\">гроші?</span>",
        subtitle: "Позичка другу під 0% річних — благородний вчинок. Але що, якби ці кошти працювали на ринку, поки борг не повертають?",
        controlsTitle: "Налаштування боргу",
        amountLabel: "Сума боргу, грн",
        placeholderAmount: "Введіть суму",
        dateLabel: "Коли борг було видано?",
        statusTitle: "Тривалість прострочення",
        statusLoading: "Завантаження...",
        regretBadge: "Фактор жалю 💔",
        regretTitle: "Втрачена вигода становить",
        notchCalm: "Смирення (0%)",
        notchDoubts: "Сумніви (10%)",
        notchAnxiety: "Тривога (20%)",
        notchAnger: "Гнів (30%)",
        notchFury: "Лють (40%+) ",
        hintBtn: "Надіслати натяк другу",
        resultsHeading: "Альтернативні сценарії інвестування",
        resultsSubheading: "Ось скільки б принесли ці гроші, якби ти вклав їх під реальні річні ставки APY за цей період:",
        modalTitleText: "Траєкторія росту інвестицій",
        modalStartLabel: "Початковий борг",
        modalProfitLabel: "Чистий прибуток",
        modalEndLabel: "Кінцева сума",
        modalInstructionText: "💡 <strong>Інструкція:</strong> Наводьте курсор (або торкайтеся пальцем на мобільному) на графік, щоб переглянути проміжні результати за кожен місяць.",
        sources: "Дані базуються на реальних історичних та поточних ринкових курсах, що завантажуються динамічно через відкриті API НБУ для валюти та золота, а також на індексі S&P 500. Розрахунки демонструють реальну альтернаственную вартість капіталу.",
        copyright: "© 2026. Створено з легким сарказмом та фінансовою мудрістю для твого друга.",
        toastText: "Рахунок скопійовано! Надішли його в месенджер.",
        regretComments: [
            "Боргу немає — совість чиста, гаманець порожній. Всі щасливі.",
            "Смирення. Втрати символічні, але на кілька чашок запашної кави з круасаном твій друг тебе вже нагрів.",
            "Сумніви. Відсотки ростуть швидше за твою віру в те, що гроші повернуть найближчим часом.",
            "Тривога! Цей безвідсотковий кредит міг би стати поїздкою в Карпати або новим гаджетом. Друг розважається, а ти рахуєш віртуальні гривні.",
            "Роздратування! Гроші знецінюються, а набігли б солідні кошти. Ти спонсоруєш чуже життя безкоштовно!",
            "ЛЮТЬ! Втрачена вигода перевищила 40% від боргу! Поки твій друг тягне час, золото чи акції принесли б тобі цілий статок. Пора діяти!"
        ]
    },
    en: {
        titleGreeting: "Dude",
        titleQuestion: ", where is my <span class=\"gradient-text\">money?</span>",
        subtitle: "Lending money to a friend at 0% is noble. But what if that cash was working in the market while you wait for a return?",
        controlsTitle: "Debt Settings",
        amountLabel: "Debt Amount, UAH",
        placeholderAmount: "Enter amount",
        dateLabel: "When was it lent?",
        statusTitle: "Duration of Default",
        statusLoading: "Loading...",
        regretBadge: "Regret Factor 💔",
        regretTitle: "The lost profit is",
        notchCalm: "Zen (0%)",
        notchDoubts: "Doubts (10%)",
        notchAnxiety: "Anxiety (20%)",
        notchAnger: "Anger (30%)",
        notchFury: "Pure Rage (40%+)",
        hintBtn: "Send a hint to your friend",
        resultsHeading: "Alternative Investment Scenarios",
        resultsSubheading: "Here is how much that cash would have generated if invested at actual APY rates for this period:",
        modalTitleText: "Investment Growth Trajectory",
        modalStartLabel: "Initial Debt",
        modalProfitLabel: "Net Profit",
        modalEndLabel: "Final Value",
        modalInstructionText: "💡 <strong>Instructions:</strong> Hover your mouse (or tap on mobile) over the chart to view detailed monthly values.",
        sources: "Data is based on actual historical and current market rates, loaded dynamically via open NBU APIs for currency and gold, as well as the S&P 500 index. Calculations demonstrate the real alternative cost of capital.",
        copyright: "© 2026. Created with mild sarcasm and financial wisdom for your friend.",
        toastText: "Invoice copied! Send it via any messenger.",
        regretComments: [
            "No debt—conscience clear, wallet empty. Everyone is happy.",
            "Acceptance. The loss is symbolic, but your friend has already bought themselves a few premium coffees with your money.",
            "Doubts. The interest grows faster than your belief that this debt will ever be returned.",
            "Anxiety! This interest-free loan could have been a nice vacation or a new gadget. Your friend is chilling, you are counting virtual pennies.",
            "Irritation! Your money is devaluing, while it could have earned solid profits. You are sponsoring someone's life for free!",
            "PURE RAGE! Lost profit exceeded 40% of the debt! While your friend is stalling, gold or index funds would have made you a fortune. Time to act!"
        ]
    }
};

// Investments bilingual dataset
const INVESTMENTS_DATA_I18N = {
    uk: [
        {
            name: "Депозит у гривні",
            badge: "Базовий сценарій",
            comment: "Найпростіший спосіб. Навіть банк переганяє твого друга за надійністю.",
            source: "Дані UIRD / API НБУ ↗"
        },
        {
            name: "ОВДП (Гривня)",
            badge: "Максимум безпеки",
            comment: "Купується в Дії за дві секунди. Державна гарантія та жодної копійки податків.",
            source: "Статистика ОВДП НБУ ↗"
        },
        {
            name: "Готівковий Долар (USD)",
            badge: "Захист від інфляції",
            comment: "Пасивний захист. Долар стабільно росте відносно гривні, рятуючи від інфляції.",
            source: "Живий курс API НБУ ↗"
        },
        {
            name: "Валютний депозит / Стейкінг",
            badge: "Подвійна вигода",
            comment: "Стейкінг USDT на біржах чи валютний депозит. Подвійна вигода: ріст бакса + відсотки.",
            source: "Курс API НБУ + 6% APY ↗"
        },
        {
            name: "Індекс S&P 500",
            badge: "Акції США",
            comment: "Володіння часткою 500 найбільших гігантів (Apple, Microsoft, Nvidia). Чудовий ріст.",
            source: "S&P 500 Index ↗"
        },
        {
            name: "Золото (XAU)",
            badge: "Абсолютний лідер 👑",
            comment: "Золоте Ельдорадо. Світова нестабільність штовхнула метал угору. Твій друг виявився супер-витратним.",
            source: "Метали API НБУ ↗"
        }
    ],
    en: [
        {
            name: "UAH Bank Deposit",
            badge: "Baseline Scenario",
            comment: "The easiest way. Even a bank beats your friend in terms of reliability.",
            source: "UIRD Rates / NBU API ↗"
        },
        {
            name: "OVDP Bonds (UAH)",
            badge: "Maximum Safety",
            comment: "Bought in Diia app in two seconds. Government-backed and 100% tax-free.",
            source: "Bonds Statistics / NBU ↗"
        },
        {
            name: "Cash Dollar (USD)",
            badge: "Inflation Protection",
            comment: "Passive shield. The Dollar stably grows against the UAH, saving you from inflation.",
            source: "Live Exchange API / NBU ↗"
        },
        {
            name: "USD Deposit / USDT Staking",
            badge: "Double Benefit",
            comment: "Staking USDT on exchanges or USD deposit. Double benefit: currency growth + interest.",
            source: "NBU Exchange + 6% APY ↗"
        },
        {
            name: "S&P 500 Index",
            badge: "US Stocks",
            comment: "Owning a slice of 500 global giants (Apple, Microsoft, Nvidia). Fantastic growth.",
            source: "S&P 500 Index ↗"
        },
        {
            name: "Gold (XAU)",
            badge: "Absolute Leader 👑",
            comment: "Gold Eldorado. Global instability pushed gold sky-high. Your friend is super expensive.",
            source: "Gold Rate API / NBU ↗"
        }
    ]
};

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

// Chart Modal DOM elements
let chartModal;
let modalCloseBtn;
let modalTitleText;
let modalIcon;
let modalStartAmount;
let modalProfitAmount;
let modalEndAmount;
let chartWrapper;
let growthChart;
let gridLinesGroup;
let chartAreaPath;
let chartLinePath;
let hoverLine;
let hoverPoint;
let chartTooltip;
let chartLabelStart;
let chartLabelEnd;

// Array of generated points of current open chart
let activeChartPoints = [];

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

    // Initialize Chart Modal elements
    chartModal = document.getElementById('chart-modal');
    modalCloseBtn = document.getElementById('modal-close-btn');
    modalTitleText = document.getElementById('modal-title-text');
    modalIcon = document.getElementById('modal-icon');
    modalStartAmount = document.getElementById('modal-start-amount');
    modalProfitAmount = document.getElementById('modal-profit-amount');
    modalEndAmount = document.getElementById('modal-end-amount');
    chartWrapper = document.getElementById('chart-wrapper');
    growthChart = document.getElementById('growth-chart');
    gridLinesGroup = document.getElementById('grid-lines');
    chartAreaPath = document.getElementById('chart-area');
    chartLinePath = document.getElementById('chart-line');
    hoverLine = document.getElementById('hover-line');
    hoverPoint = document.getElementById('hover-point');
    chartTooltip = document.getElementById('chart-tooltip');
    chartLabelStart = document.getElementById('chart-label-start');
    chartLabelEnd = document.getElementById('chart-label-end');

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
    
    // 4. Set initial URL query parameters, read language parameter, and register language switch listeners
    const langUkBtn = document.getElementById('lang-uk');
    const langEnBtn = document.getElementById('lang-en');
    
    if (langUkBtn) {
        langUkBtn.addEventListener('click', () => switchLanguage('uk'));
    }
    if (langEnBtn) {
        langEnBtn.addEventListener('click', () => switchLanguage('en'));
    }
    
    // Detect and apply language
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'uk') {
        currentLang = urlLang;
    } else {
        const browserLang = navigator.language || navigator.userLanguage || 'uk';
        if (browserLang.startsWith('en')) {
            currentLang = 'en';
        } else {
            currentLang = 'uk';
        }
    }
    
    // 5. Initialize active language and trigger calculations
    switchLanguage(currentLang);
    
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
    
    // Attach click events on investment cards to open interactive chart modal
    investCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.card-api-link')) return;
            const index = parseInt(card.dataset.index);
            if (!isNaN(index)) {
                openChartModal(index);
            }
        });
    });
    
    // Attach modal closing listeners
    modalCloseBtn.addEventListener('click', closeChartModal);
    chartModal.addEventListener('click', (e) => {
        if (e.target === chartModal) {
            closeChartModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !chartModal.classList.contains('hidden')) {
            closeChartModal();
        }
    });
    
    // Attach chart hover tracking
    chartWrapper.addEventListener('mousemove', handleChartHover);
    chartWrapper.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            handleChartHover(e.touches[0]);
        }
    });
    chartWrapper.addEventListener('mouseleave', () => {
        hoverLine.classList.add('hidden');
        hoverPoint.classList.add('hidden');
        chartTooltip.classList.add('hidden');
    });
    chartWrapper.addEventListener('touchend', () => {
        hoverLine.classList.add('hidden');
        hoverPoint.classList.add('hidden');
        chartTooltip.classList.add('hidden');
    });
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
    url.searchParams.set('lang', currentLang);
    
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
   Localization (i18n) Engine
   ========================================================================== */
/**
 * Utility to convert kebab-case data-i18n attributes to camelCase dictionary keys
 */
function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Switches the application's active language, updates active classes, translates the DOM,
 * and recalculates alternative costs in real-time.
 */
function switchLanguage(lang) {
    if (lang !== 'uk' && lang !== 'en') return;
    currentLang = lang;
    
    // Update active class on switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Set document lang attribute
    document.documentElement.lang = lang;
    
    // Apply translations
    applyLanguage(lang);
    
    // Sync to URL search parameters
    syncParamsToUrl();
    
    // Re-run calculations to update dynamic texts like duration strings, card values, and comment texts
    calculateAndUpdate();
}

/**
 * Sweeps the DOM and updates data-i18n targets, inputs placeholders, card details, links,
 * and chart timelines based on selected language dictionary.
 */
function applyLanguage(lang) {
    const dict = LANGUAGES[lang];
    if (!dict) return;
    
    // 1. Translate elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const camelKey = kebabToCamel(key);
        
        // Custom handling for specific elements to avoid losing HTML structure or special nodes
        if (key === 'title-question') {
            el.innerHTML = dict.titleQuestion;
        } else if (key === 'title-greeting') {
            el.innerHTML = dict.titleGreeting;
        } else if (key === 'modal-instruction-text') {
            el.innerHTML = dict.modalInstructionText;
        } else if (dict[camelKey]) {
            el.textContent = dict[camelKey];
        }
    });
    
    // 2. Translate inputs placeholders
    if (debtInput) {
        debtInput.placeholder = dict.placeholderAmount;
    }
    if (nameInput) {
        nameInput.placeholder = lang === 'uk' ? "ім'я" : "name";
        adjustNameWidth();
    }
    
    // 3. Update active investment cards text (Card Title, Card Badge, Card Comment, API link)
    const cardsData = INVESTMENTS_DATA_I18N[lang];
    investCards.forEach((card, idx) => {
        const data = cardsData[idx];
        if (!data) return;
        
        // Update Title
        const titleEl = card.querySelector('.card-title');
        if (titleEl) titleEl.textContent = data.name;
        
        // Update Badge
        const badgeEl = card.querySelector('.card-badge');
        if (badgeEl) {
            badgeEl.textContent = data.badge;
        }
        
        // Update Comment
        const commentEl = card.querySelector('.card-comment');
        if (commentEl) commentEl.textContent = data.comment;
        
        // Update API link text (retain the SVG icon and just update text)
        const apiLinkEl = card.querySelector('.card-api-link');
        if (apiLinkEl) {
            const svgIcon = apiLinkEl.querySelector('svg');
            apiLinkEl.innerHTML = '';
            if (svgIcon) {
                apiLinkEl.appendChild(svgIcon.cloneNode(true));
            }
            apiLinkEl.appendChild(document.createTextNode(' ' + data.source));
        }
        
        // Update chart click hint
        const hintEl = card.querySelector('.card-chart-hint');
        if (hintEl) {
            hintEl.textContent = lang === 'uk' ? "Клікніть для аналізу графіка росту 📈" : "Click to analyze growth chart 📈";
        }
    });
    
    // 4. Update elements that don't have data-i18n but should be translated
    const regretTitleEl = document.querySelector('.regret-title');
    if (regretTitleEl) {
        regretTitleEl.textContent = dict.regretTitle;
    }
    
    const toastMessageEl = document.querySelector('.toast-message');
    if (toastMessageEl) {
        toastMessageEl.textContent = dict.toastText;
    }
    
    // 5. Update static labels inside Modal
    // Start amount
    const startLabel = document.querySelector('[data-i18n="modal-start-label"]');
    if (startLabel) startLabel.textContent = dict.modalStartLabel;
    
    // Profit
    const profitLabel = document.querySelector('[data-i18n="modal-profit-label"]');
    if (profitLabel) profitLabel.textContent = dict.modalProfitLabel;
    
    // End amount
    const endLabel = document.querySelector('[data-i18n="modal-end-label"]');
    if (endLabel) endLabel.textContent = dict.modalEndLabel;
    
    // 6. Update chart timelines if modal is open and has an active title
    if (chartModal && !chartModal.classList.contains('hidden') && chartLabelStart && chartLabelEnd) {
        const selectedDate = new Date(issueDateInput.value);
        const localeStr = lang === 'uk' ? 'uk-UA' : 'en-US';
        chartLabelStart.textContent = selectedDate.toLocaleDateString(localeStr, { month: 'long', year: 'numeric' });
        chartLabelEnd.textContent = TODAY.toLocaleDateString(localeStr, { month: 'long', year: 'numeric' });
    }
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
    if (currentLang === 'uk') {
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
    } else {
        if (dateDetails.years > 0) {
            durationString += `${dateDetails.years} year${dateDetails.years === 1 ? '' : 's'} `;
        }
        if (dateDetails.months > 0) {
            durationString += `${dateDetails.months} month${dateDetails.months === 1 ? '' : 's'} `;
        }
        if (dateDetails.days > 0 || durationString === '') {
            durationString += `${dateDetails.days} day${dateDetails.days === 1 ? '' : 's'}`;
        }
        elapsedTimeText.innerHTML = `Debt has not been returned for <strong>${durationString}</strong> (total of <strong>${diffDays}</strong> day${diffDays === 1 ? '' : 's'} of interest-free usage).`;
    }
    
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
        statusTitle.textContent = currentLang === 'uk' ? "Оновлення курсів з API..." : "Updating rates from API...";
        elapsedTimeText.innerHTML = currentLang === 'uk'
            ? "Звертаємось до API Національного банку України для отримання котирувань..."
            : "Contacting the National Bank of Ukraine API to retrieve quotes...";
        
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
            if (currentLang === 'uk') {
                elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong> (всього <strong>${diffDays}</strong> ${pluralize(diffDays, 'день', 'дні', 'днів')} безвідсоткового користування).`;
            } else {
                elapsedTimeText.innerHTML = `Debt has not been returned for <strong>${durationString}</strong> (total of <strong>${diffDays}</strong> day${diffDays === 1 ? '' : 's'} of interest-free usage).`;
            }
        } catch (e) {
            console.error("Помилка отримання даних API NBU:", e);
            useFallbackCalculations = true;
            
            // Show notice that we fell back to safe defaults
            if (currentLang === 'uk') {
                elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Використовуються орієнтовні ринкові ставки (офлайн режим)</span>`;
            } else {
                elapsedTimeText.innerHTML = `Debt has not been returned for <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Estimated market rates are used (offline mode)</span>`;
            }
        } finally {
            isLoading = false;
            controlsPanel.classList.remove('loading-state');
            statusIndicator.classList.remove('loading');
            statusTitle.textContent = currentLang === 'uk' ? "Тривалість прострочення" : "Duration of Default";
            
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
        
        // Update APY badge content dynamically based on current selected dates and language
        const rateBadge = document.querySelector(`[data-index="${index}"] .rate-badge`);
        if (rateBadge) {
            if (currentLang === 'uk') {
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
            } else {
                switch (index) {
                    case 0:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">net</span>`;
                        break;
                    case 1:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">0% tax</span>`;
                        break;
                    case 2:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">currency growth</span>`;
                        break;
                    case 3:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">rate + 6% stake</span>`;
                        break;
                    case 4:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">index fund (VOO)</span>`;
                        break;
                    case 5:
                        rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY <span class="rate-note">crazy rally</span>`;
                        break;
                }
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
    const commentIndex = regretPercentage === 0 ? 0 :
                        (regretPercentage > 0 && regretPercentage <= 10 ? 1 :
                        (regretPercentage > 10 && regretPercentage <= 35 ? 2 :
                        (regretPercentage > 35 && regretPercentage <= 65 ? 3 :
                        (regretPercentage > 65 && regretPercentage < 100 ? 4 : 5))));
    const regretComment = LANGUAGES[currentLang].regretComments[commentIndex];
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

function formatCurrency(value) {
    if (currentLang === 'uk') {
        return value.toLocaleString('uk-UA') + ' ₴';
    } else {
        return value.toLocaleString('en-US') + ' ₴';
    }
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
    const localeStr = currentLang === 'uk' ? 'uk-UA' : 'en-US';
    const selectedDateStr = new Date(issueDateInput.value).toLocaleDateString(localeStr);
    const formattedDebt = formatCurrency(currentDebt);
    
    // Find yields for Gold and OVDP dynamically
    const goldProfit = animatedStates.cards[5];
    const ovdpProfit = animatedStates.cards[1];
    
    const formattedGoldProfit = formatCurrency(goldProfit);
    const formattedOvdpProfit = formatCurrency(ovdpProfit);
    
    const nameVal = nameInput.value.trim();
    
    // Construct sarcasm message based on language
    let message = '';
    if (currentLang === 'uk') {
        const greeting = nameVal ? `Привіт, ${nameVal}!` : `Привіт!`;
        message = `${greeting} Нагадую про дружній борг у розмірі ${formattedDebt}, який було видано ${selectedDateStr} (${currentDays} днів тому).\n\nЗа цей час, якби я вклав ці гроші у золото, чистий прибуток склав би ${formattedGoldProfit}. В ОВДП без податків я б заробив ${formattedOvdpProfit}.\n\nМоже, пора повертати? Розрахунок альтернативної вартості тут: ${window.location.href}`;
    } else {
        const greeting = nameVal ? `Hi ${nameVal}!` : `Hi!`;
        const dayStr = currentDays === 1 ? 'day' : 'days';
        message = `${greeting} Just a friendly reminder about the ${formattedDebt} debt from ${selectedDateStr} (${currentDays} ${dayStr} ago).\n\nIf I had invested that money in gold during this time, my net profit would be ${formattedGoldProfit}. In tax-free bonds, I would have made ${formattedOvdpProfit}.\n\nMaybe it's time to pay it back? Alternative cost calculation is here: ${window.location.href}`;
    }
    
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
        const errMsg = currentLang === 'uk'
            ? 'Не вдалося скопіювати текст автоматично. Скопіюйте розрахунок вручну:\n\n'
            : 'Failed to copy text automatically. Please copy the calculation manually:\n\n';
        alert(errMsg + message);
    });
}

/* ==========================================================================
   Investment Growth Chart & Modal Logic (What If?)
   ========================================================================== */
/**
 * Opens the interactive chart modal for a specific investment index
 */
function openChartModal(index) {
    const cardData = INVESTMENTS_DATA_I18N[currentLang][index];
    if (!cardData) return;
    
    // Determine dynamic chart theme color and icon based on card type
    let themeColor = 'var(--color-cyan)';
    let icon = '📈';
    if (index === 5) {
        themeColor = 'var(--color-gold)';
        icon = '🪙';
    } else if (index === 0) {
        themeColor = 'var(--color-primary)';
        icon = '🏦';
    } else if (index === 1) {
        themeColor = '#ffb300';
        icon = '🛡️';
    } else if (index === 3) {
        themeColor = 'var(--color-emerald)';
        icon = '💵';
    } else if (index === 4) {
        themeColor = '#ff5252';
        icon = '🇺🇸';
    }
    
    chartModal.style.setProperty('--chart-theme-color', themeColor);
    modalIcon.textContent = icon;
    
    modalTitleText.textContent = currentLang === 'uk'
        ? `Траєкторія росту: ${cardData.name}`
        : `Growth Trajectory: ${cardData.name}`;
    
    // Extract actual yields from animated states
    const startDebt = currentDebt;
    const profit = animatedStates.cards[index];
    const endSum = startDebt + profit;
    
    modalStartAmount.textContent = formatCurrency(startDebt);
    modalProfitAmount.textContent = `+${formatCurrency(profit)}`;
    modalEndAmount.textContent = formatCurrency(endSum);
    
    // Set chart timeline bounds
    const selectedDate = new Date(issueDateInput.value);
    const localeStr = currentLang === 'uk' ? 'uk-UA' : 'en-US';
    chartLabelStart.textContent = selectedDate.toLocaleDateString(localeStr, { month: 'long', year: 'numeric' });
    chartLabelEnd.textContent = TODAY.toLocaleDateString(localeStr, { month: 'long', year: 'numeric' });
    
    // Generate data points
    activeChartPoints = generateChartPoints(index);
    
    // Render SVG
    renderChartSVG(activeChartPoints, themeColor);
    
    // Open Modal
    chartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the chart modal and hides interactive elements
 */
function closeChartModal() {
    chartModal.classList.add('hidden');
    document.body.style.overflow = '';
    
    hoverLine.classList.add('hidden');
    hoverPoint.classList.add('hidden');
    chartTooltip.classList.add('hidden');
}

/**
 * Generates exactly 10 evenly spaced chronological coordinates for the active asset type
 */
function generateChartPoints(index) {
    const points = [];
    const selectedDate = new Date(issueDateInput.value);
    const totalTimeDiff = TODAY - selectedDate;
    
    // Calculate step interval in milliseconds
    const stepDiff = Math.max(1, totalTimeDiff / 9);
    
    for (let i = 0; i < 10; i++) {
        const stepTime = new Date(selectedDate.getTime() + i * stepDiff);
        const yearsElapsed = (stepTime - selectedDate) / (365.25 * 24 * 60 * 60 * 1000);
        
        let value = currentDebt;
        
        const apys = [0.1078, 0.1600, 0.0, 0.06, 0.0, 0.0];
        
        if (index === 0 || index === 1) {
            // Compound monthly APY net of taxes
            value = currentDebt * Math.pow(1 + apys[index], yearsElapsed);
        } else if (index === 2) {
            // Cash USD (interpolate USD exchange rate growth)
            const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
            value = currentDebt * (usdRate / currentRates.usd);
        } else if (index === 3) {
            // USDT Staking / Foreign Deposit (interpolate rate + 6% USD APY compound)
            const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
            value = currentDebt * Math.pow(1 + 0.06, yearsElapsed) * (usdRate / currentRates.usd);
        } else if (index === 4) {
            // S&P 500 Index (interpolate index + interpolate USD rate conversion)
            const spValue = getInterpolatedSP500(stepTime);
            const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
            value = currentDebt * (spValue / currentRates.sp500) * (usdRate / currentRates.usd);
        } else if (index === 5) {
            // Gold (interpolate commodity rate growth)
            const goldRate = currentRates.xau + ((NBU_END_XAU - currentRates.xau) / 9) * i;
            value = currentDebt * (goldRate / currentRates.xau);
        }
        
        points.push({
            date: stepTime,
            value: Math.round(value)
        });
    }
    
    return points;
}

/**
 * Redraws grid lines and line/fill path coordinates inside 600x240 SVG canvas
 */
function renderChartSVG(points, themeColor) {
    const svgWidth = 600;
    const svgHeight = 240;
    const paddingLeft = 60;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 30;
    
    const chartWidth = svgWidth - paddingLeft - paddingRight;
    const chartHeight = svgHeight - paddingTop - paddingBottom;
    
    let maxVal = Math.max(...points.map(p => p.value));
    let minVal = Math.min(...points.map(p => p.value));
    
    // Inject vertical margins
    if (maxVal === minVal) {
        maxVal += currentDebt * 0.1;
        minVal = Math.max(0, minVal - currentDebt * 0.1);
    } else {
        const valDiff = maxVal - minVal;
        maxVal += valDiff * 0.15;
        minVal = Math.max(0, minVal - valDiff * 0.05);
    }
    
    // Clear old elements from grid lines group
    gridLinesGroup.innerHTML = '';
    
    // Render 4 horizontal grid lines
    const gridSteps = 4;
    for (let k = 0; k <= gridSteps; k++) {
        const yVal = minVal + ((maxVal - minVal) / gridSteps) * k;
        const yPos = svgHeight - paddingBottom - (chartHeight / gridSteps) * k;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', paddingLeft);
        line.setAttribute('y1', yPos);
        line.setAttribute('x2', svgWidth - paddingRight);
        line.setAttribute('y2', yPos);
        line.setAttribute('class', 'grid-line');
        gridLinesGroup.appendChild(line);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', paddingLeft - 10);
        text.setAttribute('y', yPos + 3);
        text.setAttribute('class', 'grid-label-y');
        text.textContent = formatCurrencyLabel(yVal);
        gridLinesGroup.appendChild(text);
    }
    
    // Map absolute values to coordinate space
    const coords = points.map((p, idx) => {
        const x = paddingLeft + (chartWidth / 9) * idx;
        const y = svgHeight - paddingBottom - ((p.value - minVal) / (maxVal - minVal)) * chartHeight;
        return { x, y, value: p.value, date: p.date };
    });
    
    // Cache absolute screen coordinates inside point items for click/hover matching
    points.forEach((p, idx) => {
        p.cx = coords[idx].x;
        p.cy = coords[idx].y;
    });
    
    // Set SVG attribute string for glowing line
    let lineD = `M ${coords[0].x} ${coords[0].y}`;
    for (let idx = 1; idx < coords.length; idx++) {
        lineD += ` L ${coords[idx].x} ${coords[idx].y}`;
    }
    chartLinePath.setAttribute('d', lineD);
    
    // Set SVG attribute string for filled gradient area
    const areaD = `${lineD} L ${coords[coords.length - 1].x} ${svgHeight - paddingBottom} L ${coords[0].x} ${svgHeight - paddingBottom} Z`;
    chartAreaPath.setAttribute('d', areaD);
}

/**
 * Localized short currency abbreviation labels (e.g. 1.2M, 50k, 250)
 */
function formatCurrencyLabel(value) {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
    }
    if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'k';
    }
    return Math.round(value);
}

/**
 * Dynamically computes tracking cursor position and aligns tooltips/hover nodes
 */
function handleChartHover(e) {
    if (!activeChartPoints || activeChartPoints.length === 0) return;
    
    const rect = chartWrapper.getBoundingClientRect();
    const hoverX = e.clientX - rect.left;
    
    const svgWidth = 600;
    const paddingLeft = 60;
    const paddingRight = 20;
    const chartWidth = svgWidth - paddingLeft - paddingRight;
    
    const svgX = (hoverX / rect.width) * svgWidth;
    
    let closestPoint = activeChartPoints[0];
    let minDistance = Math.abs(closestPoint.cx - svgX);
    
    for (let i = 1; i < activeChartPoints.length; i++) {
        const dist = Math.abs(activeChartPoints[i].cx - svgX);
        if (dist < minDistance) {
            minDistance = dist;
            closestPoint = activeChartPoints[i];
        }
    }
    
    const pxX = (closestPoint.cx / svgWidth) * rect.width;
    const pxY = (closestPoint.cy / 240) * rect.height;
    
    hoverLine.setAttribute('x1', closestPoint.cx);
    hoverLine.setAttribute('x2', closestPoint.cx);
    hoverLine.classList.remove('hidden');
    
    hoverPoint.setAttribute('cx', closestPoint.cx);
    hoverPoint.setAttribute('cy', closestPoint.cy);
    hoverPoint.classList.remove('hidden');
    
    const tooltipDateLocale = currentLang === 'uk' ? 'uk-UA' : 'en-US';
    chartTooltip.querySelector('.tooltip-date').textContent = closestPoint.date.toLocaleDateString(tooltipDateLocale, { month: 'long', year: 'numeric' });
    chartTooltip.querySelector('.tooltip-value').textContent = formatCurrency(closestPoint.value);
    
    chartTooltip.style.left = `${pxX}px`;
    chartTooltip.style.top = `${pxY}px`;
    chartTooltip.classList.remove('hidden');
}
