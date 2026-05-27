/* ==========================================================================
   State & Constants
   ========================================================================== */
// The target current date is fixed to May 22, 2026, as per requirements
const TODAY = new Date('2026-05-22');

// NBU Fixed Target Date (May 22, 2026) rates
const NBU_END_USD = 44.2341;
const NBU_END_EUR = 49.7150;
const NBU_END_GBP = 59.0420;
const NBU_END_XAU = 199614.34;
const SP500_END = 7433;

// Default Start Date (Aug 22, 2025) rates for instant initial render
const NBU_START_USD_DEFAULT = 41.2185;
const NBU_START_EUR_DEFAULT = 44.9125;
const NBU_START_GBP_DEFAULT = 52.8450;
const NBU_START_XAU_DEFAULT = 137415.47;
const SP500_START_DEFAULT = 6460;

// Currency configuration: symbols, presets, defaults, locale formats
const CURRENCY_CONFIG = {
    UAH: {
        symbol: '₴', position: 'suffix',
        presets: [1000, 5000, 10000, 20000, 50000, 100000],
        presetLabels: ['1k', '5k', '10k', '20k', '50k', '100k'],
        defaultDebt: 20000, defaultPresetIndex: 3,
        locale: 'uk-UA'
    },
    USD: {
        symbol: '$', position: 'prefix',
        presets: [100, 200, 500, 1000, 2000, 5000],
        presetLabels: ['100', '200', '500', '1k', '2k', '5k'],
        defaultDebt: 1000, defaultPresetIndex: 3,
        locale: 'en-US'
    },
    EUR: {
        symbol: '€', position: 'prefix',
        presets: [100, 200, 500, 1000, 2000, 5000],
        presetLabels: ['100', '200', '500', '1k', '2k', '5k'],
        defaultDebt: 1000, defaultPresetIndex: 3,
        locale: 'de-DE'
    },
    GBP: {
        symbol: '£', position: 'prefix',
        presets: [100, 200, 500, 1000, 2000, 5000],
        presetLabels: ['100', '200', '500', '1k', '2k', '5k'],
        defaultDebt: 1000, defaultPresetIndex: 3,
        locale: 'en-GB'
    }
};

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
        netProfit: "Чистий прибуток",
        finalSum: "Фінальна сума",
        cardChartHint: "Клікніть для аналізу графіка росту 📈",
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
        netProfit: "Net Profit",
        finalSum: "Final Amount",
        cardChartHint: "Click to analyze growth chart 📈",
        regretComments: [
            "No debt—conscience clear, wallet empty. Everyone is happy.",
            "Acceptance. The loss is symbolic, but your friend has already bought themselves a few premium coffees with your money.",
            "Doubts. The interest grows faster than your belief that this debt will ever be returned.",
            "Anxiety! This interest-free loan could have been a nice vacation or a new gadget. Your friend is chilling, you are counting virtual pennies.",
            "Irritation! Your money is devaluing, while it could have earned solid profits. You are sponsoring someone's life for free!",
            "PURE RAGE! Lost profit exceeded 40% of the debt! While your friend is stalling, gold or index funds would have made you a fortune. Time to act!"
        ]
    },
    es: {
        titleGreeting: "Amigo",
        titleQuestion: ", ¿dónde está mi <span class=\"gradient-text\">dinero?</span>",
        subtitle: "Prestar dinero a un amigo al 0% es noble. Pero, ¿y si ese dinero estuviera trabajando en el mercado mientras esperas el retorno?",
        controlsTitle: "Configuración de la Deuda",
        amountLabel: "Monto de la Deuda, UAH",
        placeholderAmount: "Ingrese el monto",
        dateLabel: "¿Cuándo fue prestado?",
        statusTitle: "Duración del Impago",
        statusLoading: "Cargando...",
        regretBadge: "Factor de Arrepentimiento 💔",
        regretTitle: "La ganancia perdida es de",
        notchCalm: "Cen (0%)",
        notchDoubts: "Dudas (10%)",
        notchAnxiety: "Ansiedad (20%)",
        notchAnger: "Enojo (30%)",
        notchFury: "Furia Pura (40%+)",
        hintBtn: "Enviar una indirecta a tu amigo",
        resultsHeading: "Escenarios de Inversión Alternativos",
        resultsSubheading: "Esto es lo que habría generado ese dinero si se hubiera invertido a tasas de APY reales durante este período:",
        modalTitleText: "Trayectoria del Crecimiento de la Inversión",
        modalStartLabel: "Deuda Inicial",
        modalProfitLabel: "Ganancia Neta",
        modalEndLabel: "Valor Final",
        modalInstructionText: "💡 <strong>Instrucciones:</strong> Pase el cursor (o toque en el móvil) sobre el gráfico para ver los valores mensuales detallados.",
        sources: "Los datos se basan en tasas de mercado reales e históricas, cargadas dinámicamente a través de las API públicas del NBU para divisas y oro, así como el índice S&P 500. Los cálculos demuestran el costo de oportunidad real del capital.",
        copyright: "© 2026. Creado con un toque de sarcasmo y sabiduría financiera para tu amigo.",
        toastText: "¡Factura copiada! Envíala por cualquier mensajero.",
        netProfit: "Ganancia Neta",
        finalSum: "Monto Final",
        cardChartHint: "Haz clic para analizar el gráfico 📈",
        regretComments: [
            "Sin deuda: conciencia limpia, billetera vacía. Todos felices.",
            "Aceptación. La pérdida es simbólica, pero tu amigo ya se ha comprado unos cafés premium a tu costa.",
            "Dudas. Los intereses crecen más rápido que tu fe en que esta deuda sea devuelta pronto.",
            "¡Ansiedad! Este préstamo sin intereses podría haber sido unas buenas vacaciones o un nuevo gadget. Tu amigo se relaja, tú cuentas monedas virtuales.",
            "¡Irritación! Tu dinero se devalúa mientras podría haber generado ganancias sólidas. ¡Estás patrocinando la vida de alguien gratis!",
            "¡FURIA PURA! ¡La ganancia perdida superó el 40% de la deuda! Mientras tu amigo da largas, el oro o las acciones te habrían hecho ganar una fortuna. ¡Es hora de actuar!"
        ]
    },
    it: {
        titleGreeting: "Amico",
        titleQuestion: ", dov'è il mio <span class=\"gradient-text\">denaro?</span>",
        subtitle: "Prestare denaro a un amico allo 0% è nobile. Ma se quel denaro stesse lavorando sul mercato mentre aspetti la restituzione?",
        controlsTitle: "Impostazioni del Debito",
        amountLabel: "Importo del debito, UAH",
        placeholderAmount: "Inserisci l'importo",
        dateLabel: "Quando è stato prestato?",
        statusTitle: "Durata del Mancato Pagamento",
        statusLoading: "Caricamento...",
        regretBadge: "Fattore di Rimpianto 💔",
        regretTitle: "Il profitto perso è",
        notchCalm: "Zen (0%)",
        notchDoubts: "Dubbi (10%)",
        notchAnxiety: "Ansia (20%)",
        notchAnger: "Rabbia (30%)",
        notchFury: "Furia Pura (40%+)",
        hintBtn: "Invia una frecciatina al tuo amico",
        resultsHeading: "Scenari di Investimento Alternativi",
        resultsSubheading: "Ecco quanto avrebbe generato quel denaro se fosse stato investito ai tassi APY effettivi durante questo periodo:",
        modalTitleText: "Traiettoria di Crescita dell'Investimento",
        modalStartLabel: "Debito Iniziale",
        modalProfitLabel: "Profitto Netto",
        modalEndLabel: "Valore Finale",
        modalInstructionText: "💡 <strong>Istruzioni:</strong> Passa il mouse (o tocca su mobile) sul grafico per vedere i valori mensili dettagliati.",
        sources: "I dati si basano sui tassi di mercato storici e attuali, caricati dinamicamente tramite le API pubbliche della NBU per valute e oro, nonché sull'indice S&P 500. I calcoli dimostrano il reale costo opportunità del capitale.",
        copyright: "© 2026. Creato con un tocco di sarcasmo e saggezza finanziaria per il tuo amico.",
        toastText: "Fattura copiata! Inviagli un messaggio.",
        netProfit: "Profitto Netto",
        finalSum: "Importo Finale",
        cardChartHint: "Clicca per analizzare il grafico 📈",
        regretComments: [
            "Nessun debito: coscienza pulita, portafoglio vuoto. Tutti felici.",
            "Accettazione. La perdita è simbolica, ma il tuo amico si è già comprato qualche caffè premium a tue spese.",
            "Dubbi. Gli interessi crescono più velocemente della tua fiducia che questo debito venga restituito a breve.",
            "Ansia! Questo prestito senza interessi avrebbe potuto essere una bella vacanza o un nuovo gadget. Il tuo amico si rilassa, tu conti monete virtuali.",
            "Irritazione! Il tuo denaro si svaluta, mentre avrebbe potuto generare profitti solidi. Stai sponsorizzando la vita di qualcuno gratis!",
            "FURIA PURA! Il profitto perso ha superato il 40% del debito! Mentre il tuo amico prende tempo, l'oro o le azioni ti avrebbero fatto guadagnare una fortuna. È ora di agire!"
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
    ],
    es: [
        {
            name: "Depósito Bancario en UAH",
            badge: "Escenario Base",
            comment: "La forma más fácil. Incluso el banco supera a tu amigo en confiabilidad.",
            source: "Tasas UIRD / API NBU ↗"
        },
        {
            name: "Bonos del Estado (UAH)",
            badge: "Máxima Seguridad",
            comment: "Comprado en la aplicación Diia en dos segundos. Respaldado por el gobierno y 100% libre de impuestos.",
            source: "Estadísticas de Bonos / NBU ↗"
        },
        {
            name: "Dólar en Efectivo (USD)",
            badge: "Protección contra la Inflación",
            comment: "Escudo pasivo. El Dólar sube de forma estable frente al UAH, salvándote de la inflación.",
            source: "API de Cambio en Vivo / NBU ↗"
        },
        {
            name: "Depósito USD / Staking USDT",
            badge: "Doble Beneficio",
            comment: "Staking de USDT en exchanges o depósito en USD. Doble beneficio: crecimiento de la divisa + intereses.",
            source: "Cambio NBU + 6% APY ↗"
        },
        {
            name: "Índice S&P 500",
            badge: "Acciones de EE.UU.",
            comment: "Poseer una parte de los 500 gigantes mundiales (Apple, Microsoft, Nvidia). Crecimiento fantástico.",
            source: "Índice S&P 500 ↗"
        },
        {
            name: "Oro (XAU)",
            badge: "Líder Absoluto 👑",
            comment: "El Dorado del oro. La inestabilidad global disparó el precio del oro. Tu amigo te sale súper caro.",
            source: "API de Tasa de Oro / NBU ↗"
        }
    ]
};

/* ==========================================================================
   Per-Currency Investment Instruments Registry (4 currencies × 3 languages)
   ========================================================================== */
const INVESTMENTS_DATA_BY_CURRENCY = {
    UAH: {
        // Fallback APYs for each of the 6 UAH instruments
        fallbackApys: [0.1078, 0.1600, 0.0877, 0.1504, 0.3010, 0.6138],
        // Which indexes use dynamic calculation (not simple APY compound): 2=USD Cash, 3=USDT, 4=S&P, 5=Gold
        dynamicIndexes: [2, 3, 4, 5],
        badgeClasses: ['badge-baseline', 'badge-safe', 'badge-currency', 'badge-crypto', 'badge-growth', 'badge-gold'],
        uk: [
            { name: "Депозит у гривні", badge: "Базовий сценарій", comment: "Найпростіший спосіб. Навіть банк переганяє твого друга за надійністю.", source: "Дані UIRD / API НБУ ↗" },
            { name: "ОВДП (Гривня)", badge: "Максимум безпеки", comment: "Купується в Дії за дві секунди. Державна гарантія та жодної копійки податків.", source: "Статистика ОВДП НБУ ↗" },
            { name: "Готівковий Долар (USD)", badge: "Захист від інфляції", comment: "Пасивний захист. Долар стабільно росте відносно гривні, рятуючи від інфляції.", source: "Живий курс API НБУ ↗" },
            { name: "Валютний депозит / Стейкінг", badge: "Подвійна вигода", comment: "Стейкінг USDT на біржах чи валютний депозит. Подвійна вигода: ріст бакса + відсотки.", source: "Курс API НБУ + 6% APY ↗" },
            { name: "Індекс S&P 500", badge: "Акції США", comment: "Володіння часткою 500 найбільших гігантів (Apple, Microsoft, Nvidia). Чудовий ріст.", source: "S&P 500 Index ↗" },
            { name: "Золото (XAU)", badge: "Абсолютний лідер 👑", comment: "Золоте Ельдорадо. Світова нестабільність штовхнула метал угору. Твій друг виявився супер-витратним.", source: "Метали API НБУ ↗" }
        ],
        en: [
            { name: "UAH Bank Deposit", badge: "Baseline Scenario", comment: "The easiest way. Even a bank beats your friend in terms of reliability.", source: "UIRD Rates / NBU API ↗" },
            { name: "OVDP Bonds (UAH)", badge: "Maximum Safety", comment: "Bought in Diia app in two seconds. Government-backed and 100% tax-free.", source: "Bonds Statistics / NBU ↗" },
            { name: "Cash Dollar (USD)", badge: "Inflation Protection", comment: "Passive shield. The Dollar stably grows against the UAH, saving you from inflation.", source: "Live Exchange API / NBU ↗" },
            { name: "USD Deposit / USDT Staking", badge: "Double Benefit", comment: "Staking USDT on exchanges or USD deposit. Double benefit: currency growth + interest.", source: "NBU Exchange + 6% APY ↗" },
            { name: "S&P 500 Index", badge: "US Stocks", comment: "Owning a slice of 500 global giants (Apple, Microsoft, Nvidia). Fantastic growth.", source: "S&P 500 Index ↗" },
            { name: "Gold (XAU)", badge: "Absolute Leader 👑", comment: "Gold Eldorado. Global instability pushed gold sky-high. Your friend is super expensive.", source: "Gold Rate API / NBU ↗" }
        ],
        es: [
            { name: "Depósito Bancario en UAH", badge: "Escenario Base", comment: "La forma más fácil. Incluso el banco supera a tu amigo en confiabilidad.", source: "Tasas UIRD / API NBU ↗" },
            { name: "Bonos del Estado (UAH)", badge: "Máxima Seguridad", comment: "Comprado en la aplicación Diia en dos segundos. Respaldado por el gobierno y 100% libre de impuestos.", source: "Estadísticas de Bonos / NBU ↗" },
            { name: "Dólar en Efectivo (USD)", badge: "Protección contra la Inflación", comment: "Escudo pasivo. El Dólar sube de forma estable frente al UAH, salvándote de la inflación.", source: "API de Cambio en Vivo / NBU ↗" },
            { name: "Depósito USD / Staking USDT", badge: "Doble Beneficio", comment: "Staking de USDT en exchanges o depósito en USD. Doble beneficio: crecimiento de la divisa + intereses.", source: "Cambio NBU + 6% APY ↗" },
            { name: "Índice S&P 500", badge: "Acciones de EE.UU.", comment: "Poseer una parte de los 500 gigantes mundiales (Apple, Microsoft, Nvidia). Crecimiento fantástico.", source: "Índice S&P 500 ↗" },
            { name: "Oro (XAU)", badge: "Líder Absoluto 👑", comment: "El Dorado del oro. La inestabilidad global disparó el precio del oro. Tu amigo te sale súper caro.", source: "API de Tasa de Oro / NBU ↗" }
        ],
        it: [
            { name: "Deposito Bancario in UAH", badge: "Scenario Base", comment: "Il modo più semplice. Persino la banca supera il tuo amico in affidabilità.", source: "Tassi UIRD / API NBU ↗" },
            { name: "Titoli di Stato (UAH)", badge: "Massima Sicurezza", comment: "Acquistati nell'app Diia in due secondi. Garantiti dallo stato e 100% esentasse.", source: "Statistiche Titoli / NBU ↗" },
            { name: "Dollaro in Contanti (USD)", badge: "Protezione dall'Inflazione", comment: "Scudo passivo. Il dollaro cresce stabilmente contro la grivna, salvandoti dall'inflazione.", source: "API Cambio in Tempo Reale / NBU ↗" },
            { name: "Deposito USD / Staking USDT", badge: "Doppio Vantaggio", comment: "Staking di USDT sugli exchange o deposito in USD. Doppio vantaggio: crescita della valuta + interessi.", source: "Cambio NBU + 6% APY ↗" },
            { name: "Indice S&P 500", badge: "Azioni USA", comment: "Possedere una fetta dei 500 giganti globali (Apple, Microsoft, Nvidia). Crescita fantastica.", source: "Indice S&P 500 ↗" },
            { name: "Oro (XAU)", badge: "Leader Assoluto 👑", comment: "L'Eldorado dell'oro. L'instabilità globale ha spinto il prezzo dell'oro alle stelle. Il tuo amico ti costa tantissimo.", source: "API Tasso Oro / NBU ↗" }
        ]
    },
    USD: {
        fallbackApys: [0.0450, 0.0500, 0.0580, 0.1500, 0.3500, 0.4500],
        dynamicIndexes: [3, 4, 5], // S&P 500, NASDAQ proxy, Gold — are dynamic
        badgeClasses: ['badge-baseline', 'badge-safe', 'badge-currency', 'badge-growth', 'badge-growth', 'badge-gold'],
        uk: [
            { name: "Ощадний рахунок (HYSA)", badge: "Базовий сценарій", comment: "Найпопулярніший американський варіант — високоприбутковий ощадний рахунок у банку США.", source: "Marcus / Ally Bank ↗" },
            { name: "Казначейські облігації (T-Bills)", badge: "Максимум безпеки", comment: "Облігації Мінфіну США, забезпечені «повною вірою та кредитом» уряду. Без оподаткування штатів.", source: "US Treasury Direct ↗" },
            { name: "Корпоративні облігації (LQD)", badge: "Захисний дохід", comment: "Інвестиційний ETF на надійні корпоративні облігації гігантів Amazon, Apple, JPMorgan.", source: "iShares LQD ETF ↗" },
            { name: "Індекс S&P 500 (VOO)", badge: "Акції США", comment: "Володіння часткою 500 найбільших гігантів (Apple, Microsoft, Nvidia). Чудовий ріст.", source: "S&P 500 Index ↗" },
            { name: "NASDAQ-100 (QQQ)", badge: "Технологічний ріст", comment: "Фонд 100 найбільших технологічних компаній. Nvidia, Meta, Tesla — двигуни зростання.", source: "Invesco QQQ ETF ↗" },
            { name: "Золото (XAU)", badge: "Абсолютний лідер 👑", comment: "Надійний захист від інфляції. Золото б'є рекорди на тлі геополітичної невизначеності.", source: "Gold Spot Price ↗" }
        ],
        en: [
            { name: "High-Yield Savings (HYSA)", badge: "Baseline Scenario", comment: "The most popular US option — a high-yield savings account at a top bank. FDIC insured.", source: "Marcus / Ally Bank ↗" },
            { name: "US Treasury Bills (T-Bills)", badge: "Maximum Safety", comment: "Backed by the full faith and credit of the US government. State-tax exempt.", source: "US Treasury Direct ↗" },
            { name: "Corporate Bonds (LQD ETF)", badge: "Defensive Yield", comment: "Investment-grade corporate bond ETF — Amazon, Apple, JPMorgan. Steady income.", source: "iShares LQD ETF ↗" },
            { name: "S&P 500 Index (VOO)", badge: "US Stocks", comment: "Own a piece of 500 global giants (Apple, Microsoft, Nvidia). Outstanding growth.", source: "S&P 500 Index ↗" },
            { name: "NASDAQ-100 (QQQ)", badge: "Tech Growth", comment: "The 100 biggest tech companies. Nvidia, Meta, Tesla — growth engines of the economy.", source: "Invesco QQQ ETF ↗" },
            { name: "Gold (XAU)", badge: "Absolute Leader 👑", comment: "A reliable inflation hedge. Gold hits records amid geopolitical uncertainty.", source: "Gold Spot Price ↗" }
        ],
        es: [
            { name: "Cuenta de Ahorro (HYSA)", badge: "Escenario Base", comment: "La opción más popular en EE.UU. — cuenta de ahorro de alto rendimiento. Asegurada por la FDIC.", source: "Marcus / Ally Bank ↗" },
            { name: "Letras del Tesoro (T-Bills)", badge: "Máxima Seguridad", comment: "Respaldados por el gobierno de EE.UU. Exentos de impuestos estatales.", source: "US Treasury Direct ↗" },
            { name: "Bonos Corporativos (LQD)", badge: "Rendimiento Defensivo", comment: "ETF de bonos corporativos de grado de inversión: Amazon, Apple, JPMorgan. Ingresos estables.", source: "iShares LQD ETF ↗" },
            { name: "Índice S&P 500 (VOO)", badge: "Acciones de EE.UU.", comment: "Poseer una parte de los 500 gigantes mundiales (Apple, Microsoft, Nvidia). Crecimiento excepcional.", source: "Índice S&P 500 ↗" },
            { name: "NASDAQ-100 (QQQ)", badge: "Crecimiento Tecnológico", comment: "Las 100 mayores empresas tech. Nvidia, Meta, Tesla — motores de la economía.", source: "Invesco QQQ ETF ↗" },
            { name: "Oro (XAU)", badge: "Líder Absoluto 👑", comment: "Cobertura confiable contra la inflación. El oro bate récords por la incertidumbre geopolítica.", source: "Precio Spot del Oro ↗" }
        ],
        it: [
            { name: "Conto di Risparmio (HYSA)", badge: "Scenario Base", comment: "L'opzione statunitense più popolare: conto di risparmio ad alto rendimento. Assicurato FDIC.", source: "Marcus / Ally Bank ↗" },
            { name: "Buoni del Tesoro (T-Bills)", badge: "Massima Sicurezza", comment: "Garantiti dal governo degli Stati Uniti. Esenti da tasse statali.", source: "US Treasury Direct ↗" },
            { name: "Obbligazioni Corporate (LQD)", badge: "Rendimento Difensivo", comment: "ETF di obbligazioni corporate di alta qualità: Amazon, Apple, JPMorgan. Reddito stabile.", source: "iShares LQD ETF ↗" },
            { name: "Indice S&P 500 (VOO)", badge: "Azioni USA", comment: "Possedere una fetta dei 500 giganti globali (Apple, Microsoft, Nvidia). Crescita eccezionale.", source: "Indice S&P 500 ↗" },
            { name: "NASDAQ-100 (QQQ)", badge: "Crescita Tecnologica", comment: "Le 100 maggiori aziende tech. Nvidia, Meta, Tesla — motori dell'economia.", source: "Invesco QQQ ETF ↗" },
            { name: "Oro (XAU)", badge: "Leader Assoluto 👑", comment: "Copertura affidabile contro l'inflazione. L'oro batte record per l'incertezza geopolitica.", source: "Prezzo Spot Oro ↗" }
        ]
    },
    EUR: {
        fallbackApys: [0.0325, 0.0260, 0.0390, 0.1150, 0.1380, 0.4200],
        dynamicIndexes: [5], // Only Gold is dynamic via cross-rate
        badgeClasses: ['badge-baseline', 'badge-safe', 'badge-currency', 'badge-growth', 'badge-growth', 'badge-gold'],
        uk: [
            { name: "Депозит у єврозоні (HYSA)", badge: "Базовий сценарій", comment: "Високоприбутковий ощадний рахунок у європейських банках із захистом до €100 000.", source: "ECB Deposit Rate ↗" },
            { name: "Облігації Німеччини (Bunds)", badge: "Максимум безпеки", comment: "Бундесбанк — найнадійніший боржник Європи. Золотий стандарт облігацій єврозони.", source: "Deutsche Bundesbank ↗" },
            { name: "Корпоративні облігації ЄС (IEAC)", badge: "Захисний дохід", comment: "ETF на найякісніші корпоративні облігації єврозони: Siemens, LVMH, SAP.", source: "iShares IEAC ETF ↗" },
            { name: "EURO STOXX 50", badge: "Індекс єврозони", comment: "50 найбільших компаній Європи: ASML, Hermès, SAP. Стабільний індексний ріст.", source: "EURO STOXX 50 ↗" },
            { name: "Індекс DAX 40 (Німеччина)", badge: "Агресивний ріст", comment: "40 лідерів Німеччини: Siemens, SAP, BMW. Потужна промислова економіка.", source: "DAX 40 Index ↗" },
            { name: "Золото (XAU в EUR)", badge: "Абсолютний лідер 👑", comment: "Золото в євро досягає рекордів. Класичний захист від інфляції та невизначеності.", source: "Gold / EUR ↗" }
        ],
        en: [
            { name: "Eurozone Savings Deposit", badge: "Baseline Scenario", comment: "High-yield savings at a European bank. Protected up to €100,000 by deposit guarantee.", source: "ECB Deposit Rate ↗" },
            { name: "German Bonds (Bunds)", badge: "Maximum Safety", comment: "Bundesbank — Europe's most reliable borrower. The gold standard of Eurozone bonds.", source: "Deutsche Bundesbank ↗" },
            { name: "EU Corporate Bonds (IEAC)", badge: "Defensive Yield", comment: "ETF of top-quality Eurozone corporate bonds: Siemens, LVMH, SAP.", source: "iShares IEAC ETF ↗" },
            { name: "EURO STOXX 50 Index", badge: "Eurozone Index", comment: "Europe's 50 biggest companies: ASML, Hermès, SAP. Steady index growth.", source: "EURO STOXX 50 ↗" },
            { name: "DAX 40 Index (Germany)", badge: "Aggressive Growth", comment: "Germany's top 40: Siemens, SAP, BMW. Powerhouse industrial economy.", source: "DAX 40 Index ↗" },
            { name: "Gold (XAU in EUR)", badge: "Absolute Leader 👑", comment: "Gold in EUR hits records. A classic hedge against inflation and uncertainty.", source: "Gold / EUR ↗" }
        ],
        es: [
            { name: "Depósito de Ahorro (Eurozona)", badge: "Escenario Base", comment: "Ahorro de alto rendimiento en un banco europeo. Protegido hasta €100.000.", source: "Tasa de Depósito BCE ↗" },
            { name: "Bonos de Alemania (Bunds)", badge: "Máxima Seguridad", comment: "Bundesbank — el prestatario más confiable de Europa. El estándar de oro de los bonos.", source: "Deutsche Bundesbank ↗" },
            { name: "Bonos Corporativos UE (IEAC)", badge: "Rendimiento Defensivo", comment: "ETF de bonos corporativos de alta calidad: Siemens, LVMH, SAP.", source: "iShares IEAC ETF ↗" },
            { name: "Índice EURO STOXX 50", badge: "Índice de la Eurozona", comment: "Las 50 mayores empresas de Europa: ASML, Hermès, SAP. Crecimiento estable.", source: "EURO STOXX 50 ↗" },
            { name: "Índice DAX 40 (Alemania)", badge: "Crecimiento Agresivo", comment: "Los 40 líderes de Alemania: Siemens, SAP, BMW. Potencia industrial.", source: "Índice DAX 40 ↗" },
            { name: "Oro (XAU en EUR)", badge: "Líder Absoluto 👑", comment: "El oro en EUR alcanza récords. Cobertura clásica contra la inflación.", source: "Oro / EUR ↗" }
        ],
        it: [
            { name: "Deposito di Risparmio (Eurozona)", badge: "Scenario Base", comment: "Risparmio ad alto rendimento in una banca europea. Protetto fino a €100.000.", source: "Tasso Deposito BCE ↗" },
            { name: "Titoli di Stato Tedeschi (Bunds)", badge: "Massima Sicurezza", comment: "Bundesbank — il debitore più affidabile d'Europa. Il gold standard delle obbligazioni.", source: "Deutsche Bundesbank ↗" },
            { name: "Obbligazioni Corporate UE (IEAC)", badge: "Rendimento Difensivo", comment: "ETF di obbligazioni corporate di alta qualità: Siemens, LVMH, SAP.", source: "iShares IEAC ETF ↗" },
            { name: "Indice EURO STOXX 50", badge: "Indice dell'Eurozona", comment: "Le 50 maggiori aziende europee: ASML, Hermès, SAP. Crescita stabile.", source: "EURO STOXX 50 ↗" },
            { name: "Indice DAX 40 (Germania)", badge: "Crescita Aggressiva", comment: "I 40 leader della Germania: Siemens, SAP, BMW. Potenza industriale.", source: "Indice DAX 40 ↗" },
            { name: "Oro (XAU in EUR)", badge: "Leader Assoluto 👑", comment: "L'oro in EUR raggiunge record. Copertura classica contro l'inflazione.", source: "Oro / EUR ↗" }
        ]
    },
    GBP: {
        fallbackApys: [0.0440, 0.0420, 0.0510, 0.0850, 0.1080, 0.3900],
        dynamicIndexes: [5], // Only Gold is dynamic via cross-rate
        badgeClasses: ['badge-baseline', 'badge-safe', 'badge-currency', 'badge-growth', 'badge-growth', 'badge-gold'],
        uk: [
            { name: "Ощадний рахунок ISA (UK)", badge: "Базовий сценарій", comment: "Британський Cash ISA — без оподаткування відсотків. Захист до £85 000 (FSCS).", source: "Bank of England ↗" },
            { name: "Облігації Великобританії (Gilts)", badge: "Максимум безпеки", comment: "Державні облігації Його Величності. Вікова традиція надійності з епохи Банку Англії.", source: "UK Gilts / DMO ↗" },
            { name: "Корпоративні облігації UK (SLXX)", badge: "Захисний дохід", comment: "ETF на найкращі корпоративні облігації Великобританії: Shell, HSBC, Unilever.", source: "iShares SLXX ETF ↗" },
            { name: "Індекс FTSE 100", badge: "Акції UK", comment: "100 найбільших компаній Лондонської біржі: Shell, AstraZeneca, HSBC. Дивідендна надійність.", source: "FTSE 100 Index ↗" },
            { name: "Індекс FTSE 250", badge: "Ріст Mid-cap", comment: "250 середніх компаній Великобританії. Вищий ризик, вищий потенціал зростання.", source: "FTSE 250 Index ↗" },
            { name: "Золото (XAU в GBP)", badge: "Абсолютний лідер 👑", comment: "Золото у фунтах стерлінгів на рекордних рівнях. Класичний захист від девальвації.", source: "Gold / GBP ↗" }
        ],
        en: [
            { name: "Cash ISA Savings (UK)", badge: "Baseline Scenario", comment: "British Cash ISA — interest is fully tax-free. Protected up to £85,000 by FSCS.", source: "Bank of England ↗" },
            { name: "UK Government Bonds (Gilts)", badge: "Maximum Safety", comment: "His Majesty's Government bonds. Centuries-old tradition of reliability from the Bank of England era.", source: "UK Gilts / DMO ↗" },
            { name: "UK Corporate Bonds (SLXX)", badge: "Defensive Yield", comment: "ETF of top UK corporate bonds: Shell, HSBC, Unilever. Steady income.", source: "iShares SLXX ETF ↗" },
            { name: "FTSE 100 Index", badge: "UK Stocks", comment: "100 biggest companies on the London Stock Exchange: Shell, AstraZeneca, HSBC. Dividend champions.", source: "FTSE 100 Index ↗" },
            { name: "FTSE 250 Index", badge: "Mid-cap Growth", comment: "250 mid-size UK companies. Higher risk, higher growth potential.", source: "FTSE 250 Index ↗" },
            { name: "Gold (XAU in GBP)", badge: "Absolute Leader 👑", comment: "Gold in GBP at record levels. A classic hedge against pound devaluation.", source: "Gold / GBP ↗" }
        ],
        es: [
            { name: "Cuenta de Ahorro ISA (UK)", badge: "Escenario Base", comment: "Cash ISA británico — intereses libres de impuestos. Protegido hasta £85.000 por la FSCS.", source: "Bank of England ↗" },
            { name: "Bonos del Gobierno UK (Gilts)", badge: "Máxima Seguridad", comment: "Bonos del gobierno de Su Majestad. Tradición centenaria de confiabilidad desde la era del Banco de Inglaterra.", source: "UK Gilts / DMO ↗" },
            { name: "Bonos Corporativos UK (SLXX)", badge: "Rendimiento Defensivo", comment: "ETF de los mejores bonos corporativos del Reino Unido: Shell, HSBC, Unilever.", source: "iShares SLXX ETF ↗" },
            { name: "Índice FTSE 100", badge: "Acciones UK", comment: "Las 100 mayores empresas de la Bolsa de Londres: Shell, AstraZeneca, HSBC. Campeones de dividendos.", source: "Índice FTSE 100 ↗" },
            { name: "Índice FTSE 250", badge: "Crecimiento Mid-cap", comment: "250 empresas medianas del Reino Unido. Mayor riesgo, mayor potencial de crecimiento.", source: "Índice FTSE 250 ↗" },
            { name: "Oro (XAU en GBP)", badge: "Líder Absoluto 👑", comment: "El oro en GBP en niveles récord. Cobertura clásica contra la devaluación de la libra.", source: "Oro / GBP ↗" }
        ],
        it: [
            { name: "Conto di Risparmio ISA (UK)", badge: "Scenario Base", comment: "Cash ISA britannico — interessi completamente esentasse. Protetto fino a £85.000 dalla FSCS.", source: "Bank of England ↗" },
            { name: "Titoli di Stato UK (Gilts)", badge: "Massima Sicurezza", comment: "Titoli di stato di Sua Maestà. Tradizione secolare di affidabilità dalla Banca d'Inghilterra.", source: "UK Gilts / DMO ↗" },
            { name: "Obbligazioni Corporate UK (SLXX)", badge: "Rendimento Difensivo", comment: "ETF delle migliori obbligazioni corporate del Regno Unito: Shell, HSBC, Unilever.", source: "iShares SLXX ETF ↗" },
            { name: "Indice FTSE 100", badge: "Azioni UK", comment: "Le 100 maggiori aziende della Borsa di Londra: Shell, AstraZeneca, HSBC. Campioni di dividendi.", source: "Indice FTSE 100 ↗" },
            { name: "Indice FTSE 250", badge: "Crescita Mid-cap", comment: "250 aziende di medie dimensioni nel Regno Unito. Rischio maggiore, maggiore potenziale di crescita.", source: "Indice FTSE 250 ↗" },
            { name: "Oro (XAU in GBP)", badge: "Leader Assoluto 👑", comment: "L'oro in GBP a livelli record. Copertura classica contro la svalutazione della sterlina.", source: "Oro / GBP ↗" }
        ]
    }
};

// Active currency state
let currentCurrency = 'UAH';

// Current active rates (hydrated initially with defaults)
let currentRates = {
    usd: NBU_START_USD_DEFAULT,
    eur: NBU_START_EUR_DEFAULT,
    gbp: NBU_START_GBP_DEFAULT,
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
let debtCurrencySelect;
let issueDateInput;
let elapsedTimeText;
let maxRegretText;
let regretCurrencySymbol;
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
    debtCurrencySelect = document.getElementById('debt-currency');
    issueDateInput = document.getElementById('issue-date');
    elapsedTimeText = document.getElementById('elapsed-time-text');
    maxRegretText = document.getElementById('max-regret-amount');
    regretCurrencySymbol = document.querySelector('.regret-currency');
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
    
    // Parse & validate currency (must be one of the known currencies)
    const urlCurrency = urlParams.get('currency');
    if (urlCurrency && CURRENCY_CONFIG[urlCurrency]) {
        currentCurrency = urlCurrency;
    } else {
        currentCurrency = 'UAH';
    }
    debtCurrencySelect.value = currentCurrency;
    
    // Update presets for the initial currency
    updatePresetsForCurrency(currentCurrency);
    
    // Update regret currency symbol for the initial currency
    if (regretCurrencySymbol && maxRegretText) {
        const initialCfg = CURRENCY_CONFIG[currentCurrency];
        regretCurrencySymbol.textContent = initialCfg.symbol;
        const wrapper = regretCurrencySymbol.parentElement;
        if (initialCfg.position === 'suffix') {
            wrapper.appendChild(regretCurrencySymbol);
        } else {
            wrapper.insertBefore(regretCurrencySymbol, maxRegretText);
        }
    }
    
    // Parse & validate amount (if absent, use currency default)
    const urlAmount = parseFloat(urlParams.get('amount'));
    const cfg = CURRENCY_CONFIG[currentCurrency];
    if (!isNaN(urlAmount) && urlAmount > 0) {
        currentDebt = urlAmount;
        debtInput.value = urlAmount;
    } else {
        currentDebt = cfg.defaultDebt;
        debtInput.value = cfg.defaultDebt;
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
    const langEsBtn = document.getElementById('lang-es');
    
    if (langUkBtn) {
        langUkBtn.addEventListener('click', () => switchLanguage('uk'));
    }
    if (langEnBtn) {
        langEnBtn.addEventListener('click', () => switchLanguage('en'));
    }
    if (langEsBtn) {
        langEsBtn.addEventListener('click', () => switchLanguage('es'));
    }
    
    // Detect and apply language
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'uk' || urlLang === 'es') {
        currentLang = urlLang;
    } else {
        const browserLang = navigator.language || navigator.userLanguage || 'uk';
        if (browserLang.startsWith('en')) {
            currentLang = 'en';
        } else if (browserLang.startsWith('es')) {
            currentLang = 'es';
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
    
    // Currency selector change event
    debtCurrencySelect.addEventListener('change', (e) => {
        switchCurrency(e.target.value);
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
    url.searchParams.set('currency', currentCurrency);
    
    const nameVal = nameInput.value.trim();
    if (nameVal) {
        url.searchParams.set('name', nameVal);
    } else {
        url.searchParams.delete('name');
    }
    
    window.history.replaceState({}, '', url.toString());
}

/**
 * Switches the active currency, updates presets, default debt, card text, and recalculates.
 * Called when the user changes the currency dropdown.
 */
function switchCurrency(currency) {
    if (!CURRENCY_CONFIG[currency]) return;
    currentCurrency = currency;
    
    // Update presets (labels and data-value attributes)
    updatePresetsForCurrency(currency);
    
    // Set default debt for this currency
    const cfg = CURRENCY_CONFIG[currency];
    currentDebt = cfg.defaultDebt;
    debtInput.value = cfg.defaultDebt;
    
    // Activate the default preset
    presetButtons.forEach(btn => btn.classList.remove('active'));
    if (presetButtons[cfg.defaultPresetIndex]) {
        presetButtons[cfg.defaultPresetIndex].classList.add('active');
    }
    
    // Update regret currency symbol and its position
    if (regretCurrencySymbol && maxRegretText) {
        regretCurrencySymbol.textContent = cfg.symbol;
        const wrapper = regretCurrencySymbol.parentElement;
        if (cfg.position === 'suffix') {
            wrapper.appendChild(regretCurrencySymbol);
        } else {
            wrapper.insertBefore(regretCurrencySymbol, maxRegretText);
        }
    }
    
    // Update amount label with correct currency name
    const amountLabelEl = document.querySelector('[data-i18n="amount-label"]');
    if (amountLabelEl) {
        amountLabelEl.textContent = getAmountLabel();
    }
    
    // Translate card text for the new currency
    applyLanguage(currentLang);
    
    // Sync to URL and recalculate
    syncParamsToUrl();
    calculateAndUpdate();
}

/**
 * Updates preset buttons' data-value and inner text to match the selected currency's scale.
 */
function updatePresetsForCurrency(currency) {
    const cfg = CURRENCY_CONFIG[currency];
    presetButtons.forEach((btn, idx) => {
        btn.dataset.value = cfg.presets[idx];
        btn.textContent = cfg.presetLabels[idx];
    });
}

/**
 * Returns the localized amount label combining language and currency.
 */
function getAmountLabel() {
    const sym = CURRENCY_CONFIG[currentCurrency].symbol;
    const code = currentCurrency;
    if (currentLang === 'uk') {
        return `Сума боргу, ${code} (${sym})`;
    } else if (currentLang === 'es') {
        return `Monto de la Deuda, ${code} (${sym})`;
    }
    return `Debt Amount, ${code} (${sym})`;
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
    if (lang !== 'uk' && lang !== 'en' && lang !== 'es' && lang !== 'it') return;
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
        } else if (key === 'amount-label') {
            // Override with currency-aware label
            el.textContent = getAmountLabel();
        } else if (dict[camelKey]) {
            el.textContent = dict[camelKey];
        }
    });
    
    // 2. Translate inputs placeholders
    if (debtInput) {
        debtInput.placeholder = dict.placeholderAmount;
    }
    if (nameInput) {
        if (lang === 'uk') {
            nameInput.placeholder = "ім'я";
        } else if (lang === 'es') {
            nameInput.placeholder = "nombre";
        } else if (lang === 'it') {
            nameInput.placeholder = "nome";
        } else {
            nameInput.placeholder = "name";
        }
        adjustNameWidth();
    }
    
    // 3. Update active investment cards text (Card Title, Card Badge, Card Comment, API link)
    const currencyData = INVESTMENTS_DATA_BY_CURRENCY[currentCurrency];
    const cardsData = currencyData ? currencyData[lang] : INVESTMENTS_DATA_BY_CURRENCY['UAH'][lang];
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
            if (lang === 'uk') {
                hintEl.textContent = "Клікніть для аналізу графіка росту 📈";
            } else if (lang === 'es') {
                hintEl.textContent = "Haga clic para analizar el gráfico de crecimiento 📈";
            } else {
                hintEl.textContent = "Click to analyze growth chart 📈";
            }
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
        const localeStr = lang === 'uk' ? 'uk-UA' : (lang === 'es' ? 'es-ES' : 'en-US');
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
    } else if (currentLang === 'es') {
        if (dateDetails.years > 0) {
            durationString += `${dateDetails.years} año${dateDetails.years === 1 ? '' : 's'} `;
        }
        if (dateDetails.months > 0) {
            durationString += `${dateDetails.months} mes${dateDetails.months === 1 ? '' : 'es'} `;
        }
        if (dateDetails.days > 0 || durationString === '') {
            durationString += `${dateDetails.days} día${dateDetails.days === 1 ? '' : 's'}`;
        }
        elapsedTimeText.innerHTML = `La deuda no se ha devuelto desde hace <strong>${durationString}</strong> (un total de <strong>${diffDays}</strong> día${diffDays === 1 ? '' : 's'} de uso sin intereses).`;
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
            eur: NBU_START_EUR_DEFAULT,
            gbp: NBU_START_GBP_DEFAULT,
            xau: NBU_START_XAU_DEFAULT,
            sp500: SP500_START_DEFAULT
        };
        currentRates = rates;
    } else if (!isLoading) {
        isLoading = true;
        
        // Show loading animations
        controlsPanel.classList.add('loading-state');
        statusIndicator.classList.add('loading');
        if (currentLang === 'uk') {
            statusTitle.textContent = "Оновлення курсів з API...";
            elapsedTimeText.innerHTML = "Звертаємось до API Національного банку України для отримання котирувань...";
        } else if (currentLang === 'es') {
            statusTitle.textContent = "Actualizando tasas desde la API...";
            elapsedTimeText.innerHTML = "Contactando la API del Banco Nacional de Ucrania para obtener las cotizaciones...";
        } else {
            statusTitle.textContent = "Updating rates from API...";
            elapsedTimeText.innerHTML = "Contacting the National Bank of Ukraine API to retrieve quotes...";
        }
        
        investCards.forEach(card => card.classList.add('loading', 'loading-shimmer'));
        maxRegretText.classList.add('loading');
        
        try {
            const fetched = await fetchNbuRates(selectedDate);
            rates = {
                usd: fetched.usd,
                eur: fetched.eur,
                gbp: fetched.gbp,
                xau: fetched.xau,
                sp500: getInterpolatedSP500(selectedDate)
            };
            currentRates = rates;
            
            // Restore elapsed time text
            if (currentLang === 'uk') {
                elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong> (всього <strong>${diffDays}</strong> ${pluralize(diffDays, 'день', 'дні', 'днів')} безвідсоткового користування).`;
            } else if (currentLang === 'es') {
                elapsedTimeText.innerHTML = `La deuda no se ha devuelto desde hace <strong>${durationString}</strong> (un total de <strong>${diffDays}</strong> día${diffDays === 1 ? '' : 's'} de uso sin intereses).`;
            } else {
                elapsedTimeText.innerHTML = `Debt has not been returned for <strong>${durationString}</strong> (total of <strong>${diffDays}</strong> day${diffDays === 1 ? '' : 's'} of interest-free usage).`;
            }
        } catch (e) {
            console.error("Помилка отримання даних API NBU:", e);
            useFallbackCalculations = true;
            
            // Show notice that we fell back to safe defaults
            if (currentLang === 'uk') {
                elapsedTimeText.innerHTML = `Борг не повертається вже <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Використовуються орієнтовні ринкові ставки (офлайн режим)</span>`;
            } else if (currentLang === 'es') {
                elapsedTimeText.innerHTML = `La deuda no se ha devuelto desde hace <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Se están utilizando tasas de mercado estimadas (modo offline)</span>`;
            } else {
                elapsedTimeText.innerHTML = `Debt has not been returned for <strong>${durationString}</strong>. ⚠️ <span style="color: var(--color-gold);">Estimated market rates are used (offline mode)</span>`;
            }
        } finally {
            isLoading = false;
            controlsPanel.classList.remove('loading-state');
            statusIndicator.classList.remove('loading');
            if (currentLang === 'uk') {
                statusTitle.textContent = "Тривалість прострочення";
            } else if (currentLang === 'es') {
                statusTitle.textContent = "Duración del Impago";
            } else {
                statusTitle.textContent = "Duration of Default";
            }
            
            investCards.forEach(card => card.classList.remove('loading', 'loading-shimmer'));
            maxRegretText.classList.remove('loading');
        }
    }
    
    // =======================================================================
    // Calculate investments returns based on active currency
    // =======================================================================
    const T = diffDays / 365; // Duration in years
    let maxProfit = 0;
    let cardProfits = [];
    let cardTotals = [];
    
    const currencyInstruments = INVESTMENTS_DATA_BY_CURRENCY[currentCurrency];
    const fallbackApys = currencyInstruments.fallbackApys;
    
    for (let index = 0; index < 6; index++) {
        let profit = 0;
        let apyValue = 0;
        
        if (useFallbackCalculations || currentCurrency !== 'UAH') {
            // For non-UAH currencies: all instruments use simple APY compound
            // except Gold (index 5) which uses cross-rate from NBU when available
            if (currentCurrency !== 'UAH' && index === 5 && !useFallbackCalculations) {
                // Gold in foreign currency via cross-rate: XAU_UAH / FOREX_UAH
                const forexKeyEnd = currentCurrency === 'USD' ? NBU_END_USD : (currentCurrency === 'EUR' ? NBU_END_EUR : NBU_END_GBP);
                const forexKeyStart = currentCurrency === 'USD' ? rates.usd : (currentCurrency === 'EUR' ? rates.eur : rates.gbp);
                const goldEndForeign = NBU_END_XAU / forexKeyEnd;
                const goldStartForeign = rates.xau / forexKeyStart;
                profit = currentDebt * (goldEndForeign / goldStartForeign - 1);
                apyValue = ((goldEndForeign / goldStartForeign - 1) / T) * 100;
            } else if (currentCurrency !== 'UAH' && (index === 3 || index === 4) && !useFallbackCalculations) {
                // For USD: index 3 = S&P 500 (VOO), index 4 = NASDAQ-100 (QQQ)
                // S&P 500 in USD uses direct index growth
                if (currentCurrency === 'USD' && index === 3) {
                    profit = currentDebt * (SP500_END / rates.sp500 - 1);
                    apyValue = ((SP500_END / rates.sp500 - 1) / T) * 100;
                } else {
                    // Use fallback APY for indexes in EUR/GBP or NASDAQ
                    profit = currentDebt * fallbackApys[index] * T;
                    apyValue = fallbackApys[index] * 100;
                }
            } else {
                profit = currentDebt * fallbackApys[index] * T;
                apyValue = fallbackApys[index] * 100;
            }
        } else {
            // UAH mode: dynamic calculations using live NBU data
            switch (index) {
                case 0: // Deposit
                    profit = currentDebt * fallbackApys[0] * T;
                    apyValue = fallbackApys[0] * 100;
                    break;
                case 1: // OVDP
                    profit = currentDebt * fallbackApys[1] * T;
                    apyValue = fallbackApys[1] * 100;
                    break;
                case 2: // USD Cash
                    profit = currentDebt * (NBU_END_USD / rates.usd - 1);
                    apyValue = ((NBU_END_USD / rates.usd - 1) / T) * 100;
                    break;
                case 3: // USDT Staking
                    profit = currentDebt * ((NBU_END_USD / rates.usd) * (1 + 0.06 * T) - 1);
                    apyValue = (((NBU_END_USD / rates.usd) * (1 + 0.06 * T) - 1) / T) * 100;
                    break;
                case 4: // S&P 500
                    profit = currentDebt * ((SP500_END / rates.sp500) * (NBU_END_USD / rates.usd) - 1);
                    apyValue = (((SP500_END / rates.sp500) * (NBU_END_USD / rates.usd) - 1) / T) * 100;
                    break;
                case 5: // Gold
                    profit = currentDebt * (NBU_END_XAU / rates.xau - 1);
                    apyValue = ((NBU_END_XAU / rates.xau - 1) / T) * 100;
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
        
        // Update APY badge content dynamically
        const rateBadge = document.querySelector(`[data-index="${index}"] .rate-badge`);
        if (rateBadge) {
            rateBadge.innerHTML = `${apyValue.toFixed(2)}% APY`;
        }
    }
    
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
 * Fetches USD, EUR, GBP exchange rates and Gold accounting price from NBU API for a specific date.
 * Implements a retry loop up to 3 days back for robustness.
 */
async function fetchNbuRates(dateObj) {
    let attempts = 0;
    let tempDate = new Date(dateObj);
    
    while (attempts < 4) {
        const yyyymmdd = tempDate.getFullYear() + 
                         String(tempDate.getMonth() + 1).padStart(2, '0') + 
                         String(tempDate.getDate()).padStart(2, '0');
        
        const baseUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${yyyymmdd}&json&valcode=`;
        
        try {
            console.log(`Fetching rates for date: ${yyyymmdd} (attempt ${attempts + 1})...`);
            const [usdResponse, eurResponse, gbpResponse, xauResponse] = await Promise.all([
                fetch(baseUrl + 'USD'),
                fetch(baseUrl + 'EUR'),
                fetch(baseUrl + 'GBP'),
                fetch(baseUrl + 'XAU')
            ]);
            
            if (!usdResponse.ok || !eurResponse.ok || !gbpResponse.ok || !xauResponse.ok) {
                throw new Error(`HTTP error! USD: ${usdResponse.status}, EUR: ${eurResponse.status}, GBP: ${gbpResponse.status}, XAU: ${xauResponse.status}`);
            }
            
            const [usdData, eurData, gbpData, xauData] = await Promise.all([
                usdResponse.json(),
                eurResponse.json(),
                gbpResponse.json(),
                xauResponse.json()
            ]);
            
            if (Array.isArray(usdData) && usdData.length > 0 &&
                Array.isArray(eurData) && eurData.length > 0 &&
                Array.isArray(gbpData) && gbpData.length > 0 &&
                Array.isArray(xauData) && xauData.length > 0) {
                const usdRate = usdData[0].rate;
                const eurRate = eurData[0].rate;
                const gbpRate = gbpData[0].rate;
                const xauRate = xauData[0].rate;
                
                if (usdRate && eurRate && gbpRate && xauRate) {
                    console.log(`Successfully fetched USD: ${usdRate}, EUR: ${eurRate}, GBP: ${gbpRate}, XAU: ${xauRate}`);
                    return { usd: usdRate, eur: eurRate, gbp: gbpRate, xau: xauRate };
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
            element.textContent = prefix + currentValue.toLocaleString(currentLang === 'uk' ? 'uk-UA' : 'en-US');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            if (isCurrency) {
                element.textContent = prefix + formatCurrency(end);
            } else {
                element.textContent = prefix + end.toLocaleString(currentLang === 'uk' ? 'uk-UA' : 'en-US');
            }
        }
    }
    
    window.requestAnimationFrame(step);
}

function formatCurrency(value) {
    const cfg = CURRENCY_CONFIG[currentCurrency];
    const localeStr = currentLang === 'uk' ? 'uk-UA' : (currentLang === 'es' ? 'es-ES' : 'en-US');
    const formatted = Math.round(value).toLocaleString(localeStr);
    if (cfg.position === 'prefix') {
        return cfg.symbol + formatted;
    }
    return formatted + ' ' + cfg.symbol;
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
    const localeStr = currentLang === 'uk' ? 'uk-UA' : (currentLang === 'es' ? 'es-ES' : 'en-US');
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
    } else if (currentLang === 'es') {
        const greeting = nameVal ? `¡Hola, ${nameVal}!` : `¡Hola!`;
        const dayStr = currentDays === 1 ? 'día' : 'días';
        message = `${greeting} Solo un recordatorio amistoso sobre la deuda de ${formattedDebt} del ${selectedDateStr} (hace ${currentDays} ${dayStr}).\n\nSi hubiera invertido ese dinero en oro durante este tiempo, mi ganancia neta sería de ${formattedGoldProfit}. En bonos del Estado libres de impuestos, habría ganado ${formattedOvdpProfit}.\n\n¿Tal vez sea hora de devolverlo? El cálculo del costo de oportunidad está aquí: ${window.location.href}`;
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
            : (currentLang === 'es'
                ? 'No se pudo copiar el texto automáticamente. Copie el cálculo manualmente:\n\n'
                : 'Failed to copy text automatically. Please copy the calculation manually:\n\n');
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
    const currencyData = INVESTMENTS_DATA_BY_CURRENCY[currentCurrency];
    const cardData = currencyData ? currencyData[currentLang][index] : null;
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
        : (currentLang === 'es' ? `Trayectoria de crecimiento: ${cardData.name}` : `Growth Trajectory: ${cardData.name}`);
    
    // Extract actual yields from animated states
    const startDebt = currentDebt;
    const profit = animatedStates.cards[index];
    const endSum = startDebt + profit;
    
    modalStartAmount.textContent = formatCurrency(startDebt);
    modalProfitAmount.textContent = `+${formatCurrency(profit)}`;
    modalEndAmount.textContent = formatCurrency(endSum);
    
    // Set chart timeline bounds
    const selectedDate = new Date(issueDateInput.value);
    const localeStr = currentLang === 'uk' ? 'uk-UA' : (currentLang === 'es' ? 'es-ES' : 'en-US');
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
 * Generates exactly 10 evenly spaced chronological coordinates for the active asset type.
 * Supports all currencies (UAH dynamic, USD/EUR/GBP via APY or cross-rate).
 */
function generateChartPoints(index) {
    const points = [];
    const selectedDate = new Date(issueDateInput.value);
    const totalTimeDiff = TODAY - selectedDate;
    
    // Calculate step interval in milliseconds
    const stepDiff = Math.max(1, totalTimeDiff / 9);
    
    const fallbackApys = INVESTMENTS_DATA_BY_CURRENCY[currentCurrency].fallbackApys;
    
    for (let i = 0; i < 10; i++) {
        const stepTime = new Date(selectedDate.getTime() + i * stepDiff);
        const yearsElapsed = (stepTime - selectedDate) / (365.25 * 24 * 60 * 60 * 1000);
        
        let value = currentDebt;
        
        if (currentCurrency === 'UAH') {
            // UAH-specific dynamic calculations
            if (index === 0 || index === 1) {
                value = currentDebt * Math.pow(1 + fallbackApys[index], yearsElapsed);
            } else if (index === 2) {
                const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
                value = currentDebt * (usdRate / currentRates.usd);
            } else if (index === 3) {
                const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
                value = currentDebt * Math.pow(1 + 0.06, yearsElapsed) * (usdRate / currentRates.usd);
            } else if (index === 4) {
                const spValue = getInterpolatedSP500(stepTime);
                const usdRate = currentRates.usd + ((NBU_END_USD - currentRates.usd) / 9) * i;
                value = currentDebt * (spValue / currentRates.sp500) * (usdRate / currentRates.usd);
            } else if (index === 5) {
                const goldRate = currentRates.xau + ((NBU_END_XAU - currentRates.xau) / 9) * i;
                value = currentDebt * (goldRate / currentRates.xau);
            }
        } else {
            // Non-UAH currencies
            if (index === 5) {
                // Gold via cross-rate interpolation
                const forexEnd = currentCurrency === 'USD' ? NBU_END_USD : (currentCurrency === 'EUR' ? NBU_END_EUR : NBU_END_GBP);
                const forexStart = currentCurrency === 'USD' ? currentRates.usd : (currentCurrency === 'EUR' ? currentRates.eur : currentRates.gbp);
                const goldStartForeign = currentRates.xau / forexStart;
                const goldEndForeign = NBU_END_XAU / forexEnd;
                const goldStep = goldStartForeign + ((goldEndForeign - goldStartForeign) / 9) * i;
                value = currentDebt * (goldStep / goldStartForeign);
            } else if (currentCurrency === 'USD' && index === 3) {
                // S&P 500 direct index growth for USD
                const spValue = getInterpolatedSP500(stepTime);
                value = currentDebt * (spValue / currentRates.sp500);
            } else {
                // Simple compound APY growth for savings, bonds, indexes
                value = currentDebt * Math.pow(1 + fallbackApys[index], yearsElapsed);
            }
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
 * Localized short currency abbreviation labels (e.g. $1.2M, €50k, 250₴)
 */
function formatCurrencyLabel(value) {
    const cfg = CURRENCY_CONFIG[currentCurrency];
    let label;
    if (value >= 1000000) {
        label = (value / 1000000).toFixed(1).replace('.0', '') + 'M';
    } else if (value >= 1000) {
        label = (value / 1000).toFixed(0) + 'k';
    } else {
        label = String(Math.round(value));
    }
    return cfg.position === 'prefix' ? cfg.symbol + label : label + cfg.symbol;
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
    
    const tooltipDateLocale = currentLang === 'uk' ? 'uk-UA' : (currentLang === 'es' ? 'es-ES' : 'en-US');
    chartTooltip.querySelector('.tooltip-date').textContent = closestPoint.date.toLocaleDateString(tooltipDateLocale, { month: 'long', year: 'numeric' });
    chartTooltip.querySelector('.tooltip-value').textContent = formatCurrency(closestPoint.value);
    
    chartTooltip.style.left = `${pxX}px`;
    chartTooltip.style.top = `${pxY}px`;
    chartTooltip.classList.remove('hidden');
}
