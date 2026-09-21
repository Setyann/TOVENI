(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = new Intl.NumberFormat('en-US');
  const STORAGE = {
    lang: 'toveni_lang', theme: 'toveni_theme', favorites: 'toveni_favorites', inquiry: 'toveni_inquiry', requests: 'toveni_demo_requests'
  };

  const IMAGES = {
    living: 'https://images.unsplash.com/photo-1771888703723-01d85da1dae1?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    dining: 'https://images.unsplash.com/photo-1745794621090-d856c53b0cc2?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=80&w=1600',
    bedroom: 'https://images.unsplash.com/photo-1774716926071-fc03e73d0806?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=78&w=1600',
    office: 'https://images.unsplash.com/photo-1758315417320-a8bbed64d29b?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=78&w=1600',
    workshop: 'https://images.unsplash.com/photo-1631396326646-c06a935ff3a6?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=78&w=1600'
  };

  const trText = (en, ru, hy) => ({ en, ru, hy });
  const PRODUCTS = [
    {id:'luma-sofa-3',name:'Luma Sofa 3',sku:'TV-LUM-S3-220',category:'Sofas',room:'living',collection:'contour',price:589000,status:'made',dimensions:'220 × 94 × 76 cm',lead:'5–7 weeks',materials:'Timber frame · birch plywood · performance upholstery · solid ash legs',image:IMAGES.living,config:'luma',desc:trText('Three-seat sofa with a low profile, deep seat and rounded armrests.','Трёхместный диван с низким профилем, глубокой посадкой и мягко скруглёнными подлокотниками.','Եռատեղ բազմոց՝ ցածր պրոֆիլով, խոր նստատեղով և կլորացված բազկակալներով։')},
    {id:'luma-sofa-chaise',name:'Luma Sofa Chaise',sku:'TV-LUM-CH-275',category:'Sofas',room:'living',collection:'contour',price:739000,status:'made',dimensions:'275 × 165 × 76 cm',lead:'5–8 weeks',materials:'Timber frame · birch plywood · performance upholstery · ash legs',image:IMAGES.living,config:'luma',desc:trText('Modular Luma sofa with one extended chaise section, left or right orientation.','Модульный Luma с удлинённой секцией chaise и выбором левой или правой стороны.','Մոդուլային Luma բազմոց՝ երկարացված chaise հատվածով՝ ձախ կամ աջ դիրքով։')},
    {id:'sora-armchair',name:'Sora Armchair',sku:'TV-SOR-A1-082',category:'Armchairs',room:'living',collection:'contour',price:238000,status:'stock',dimensions:'82 × 86 × 78 cm',lead:'2–5 working days',materials:'Plywood shell · foam · performance weave / bouclé · ash legs',image:IMAGES.living,desc:trText('Compact lounge chair with a lightly curved back and exposed ash legs.','Компактное кресло с мягко изогнутой спинкой и открытыми ножками из ясеня.','Կոմպակտ բազկաթոռ՝ թեթև կորացված մեջքով և բաց հացենու ոտքերով։')},
    {id:'neri-coffee-table',name:'Neri Coffee Table',sku:'TV-NER-CT-110',category:'Coffee Tables',room:'living',collection:'contour',price:148000,status:'new',dimensions:'110 × 60 × 34 cm',lead:'1–3 weeks',materials:'Veneered plywood · engineered mineral-composite top',image:IMAGES.living,desc:trText('Low rounded rectangular coffee table with softened corners.','Низкий журнальный столик со скруглённым прямоугольным силуэтом.','Ցածր սուրճի սեղան՝ փափուկ կլորացված ուղղանկյուն ձևով։')},
    {id:'taro-tv-unit',name:'Taro TV Unit 180',sku:'TV-TAR-TV-180',category:'TV Units',room:'living',collection:'frame',price:278000,status:'stock',dimensions:'180 × 42 × 48 cm',lead:'2–6 working days',materials:'Oak-veneered MDF · birch plywood · powder-coated steel',image:IMAGES.living,desc:trText('Low media cabinet with push-open storage and rear cable routing.','Низкая медиатумба с push-open секциями и кабельным каналом сзади.','Ցածր մեդիա պահարան՝ push-open բաժիններով և հետևի մալուխային անցուղով։')},
    {id:'reka-shelf',name:'Reka Shelf 180',sku:'TV-REK-SH-180',category:'Shelving',room:'storage',collection:'frame',price:319000,status:'made',dimensions:'96 × 36 × 180 cm',lead:'4–6 weeks',materials:'Ash veneer · powder-coated steel · solid ash edge',image:IMAGES.office,desc:trText('Open shelving with alternating widths for books and display objects.','Открытый стеллаж с чередующимися секциями для книг и предметов.','Բաց դարակաշար՝ տարբեր լայնության բաժիններով գրքերի և դեկորի համար։')},
    {id:'arvo-table-180',name:'Arvo Dining Table 180',sku:'TV-ARV-DT-180',category:'Dining Tables',room:'dining',collection:'aren',price:359000,status:'made',dimensions:'180 × 90 × 75 cm',lead:'4–6 weeks',materials:'Oak veneer over birch plywood · solid ash edge and legs',image:IMAGES.dining,config:'arvo',desc:trText('Six-seat dining table with a chamfered edge and recessed legs.','Обеденный стол на шесть мест со скошенной кромкой и утопленными ножками.','Վեց տեղանոց ճաշասեղան՝ թեք եզրով և ներս քաշված ոտքերով։')},
    {id:'arvo-extendable',name:'Arvo Extendable Table',sku:'TV-ARV-EX-160',category:'Dining Tables',room:'dining',collection:'aren',price:438000,status:'limited',dimensions:'160–220 × 90 cm',lead:'3–6 weeks',materials:'Veneered top · solid ash legs · concealed steel mechanism',image:IMAGES.dining,desc:trText('Extendable dining table with one concealed internal leaf.','Раздвижной стол со скрытой внутренней вставкой.','Բացվող ճաշասեղան՝ թաքնված ներքին երկարացման թերթով։')},
    {id:'noma-chair',name:'Noma Dining Chair',sku:'TV-NOM-CH-047',category:'Chairs',room:'dining',collection:'aren',price:92000,status:'stock',dimensions:'47 × 53 × 79 cm',lead:'2–5 working days',materials:'Solid ash frame · upholstered seat',image:IMAGES.dining,desc:trText('Lightweight dining chair with a slightly flexible curved back.','Лёгкий обеденный стул с немного пружинящей изогнутой спинкой.','Թեթև ճաշասենյակի աթոռ՝ փոքր-ինչ ճկուն կորացված մեջքով։')},
    {id:'noma-armchair',name:'Noma Dining Armchair',sku:'TV-NOM-AC-056',category:'Chairs',room:'dining',collection:'aren',price:112000,status:'new',dimensions:'56 × 56 × 79 cm',lead:'1–4 weeks',materials:'Solid ash · upholstered seat',image:IMAGES.dining,desc:trText('Noma dining chair with integrated wooden armrests.','Версия Noma со встроенными деревянными подлокотниками.','Noma-ի տարբերակ՝ ինտեգրված փայտե բազկակալներով։')},
    {id:'vela-sideboard',name:'Vela Sideboard 180',sku:'TV-VEL-SB-180',category:'Storage',room:'storage',collection:'aren',price:326000,status:'made',dimensions:'180 × 45 × 78 cm',lead:'5–7 weeks',materials:'Oak veneer · birch plywood · solid ash legs',image:IMAGES.dining,desc:trText('Sideboard with drawers, cabinet storage and adjustable shelves.','Буфет с ящиками, закрытыми секциями и регулируемыми полками.','Պահարան՝ դարակներով, փակ բաժիններով և կարգավորվող դարակաշարերով։')},
    {id:'kora-bed-160',name:'Kora Bed 160',sku:'TV-KOR-BD-160',category:'Beds',room:'bedroom',collection:'aren',price:398000,status:'made',dimensions:'Mattress 160 × 200 cm',lead:'5–7 weeks',materials:'Ash veneer · plywood structure · solid ash edges',image:IMAGES.bedroom,config:'kora',desc:trText('Bed with a recessed base, angled headboard and optional lift storage.','Кровать с утопленным основанием, наклонным изголовьем и опциональным подъёмным хранением.','Մահճակալ՝ ներս քաշված հիմքով, թեք գլխամասով և ընտրովի բարձրացվող պահեստով։')},
    {id:'kora-bedside',name:'Kora Bedside Table',sku:'TV-KOR-NS-050',category:'Bedside Tables',room:'bedroom',collection:'aren',price:119000,status:'stock',dimensions:'50 × 42 × 48 cm',lead:'2–5 working days',materials:'Oak veneer · solid ash legs',image:IMAGES.bedroom,desc:trText('One-drawer bedside table with an open lower shelf.','Прикроватная тумба с одним ящиком и открытой нижней полкой.','Մեկ դարակով մահճակալի կողքի սեղան՝ բաց ստորին դարակով։')},
    {id:'vale-dresser',name:'Vale Dresser 160',sku:'TV-VAL-DR-160',category:'Dressers',room:'bedroom',collection:'frame',price:286000,status:'stock',dimensions:'160 × 47 × 76 cm',lead:'3–7 working days',materials:'Veneered MDF fronts · plywood carcass · steel base',image:IMAGES.bedroom,desc:trText('Six-drawer dresser with a recessed steel base.','Комод на шесть ящиков с утопленным стальным основанием.','Վեց դարակով կոմոդ՝ ներս քաշված պողպատե հիմքով։')},
    {id:'vale-wardrobe',name:'Vale Wardrobe 240',sku:'TV-VAL-WD-240',category:'Wardrobes',room:'bedroom',collection:'frame',price:642000,status:'made',dimensions:'240 × 62 × 240 cm',lead:'6–8 weeks',materials:'MDF fronts · laminated interior · aluminum rails',image:IMAGES.bedroom,config:'vale',desc:trText('Configurable wardrobe with hanging zones, shelves and drawers.','Конфигурируемый шкаф с секциями для одежды, полками и ящиками.','Կարգավորվող զգեստապահարան՝ կախիչի գոտիներով, դարակներով և գզրոցներով։')},
    {id:'linea-desk',name:'Linea Desk 140',sku:'TV-LIN-DS-140',category:'Desks',room:'office',collection:'frame',price:249000,status:'made',dimensions:'140 × 70 × 75 cm',lead:'4–5 weeks',materials:'Oak veneer · powder-coated steel frame',image:IMAGES.office,desc:trText('Desk with integrated cable tray, optional cable port and slim drawer.','Стол с кабельным лотком, опциональным кабельным портом и тонким ящиком.','Գրասեղան՝ մալուխային սկուտեղով, ընտրովի անցքով և բարակ դարակով։')},
    {id:'frame-desk',name:'Frame Desk 120',sku:'TV-FRM-DS-120',category:'Desks',room:'office',collection:'frame',price:189000,status:'stock',dimensions:'120 × 60 × 75 cm',lead:'2–5 working days',materials:'Ash veneer top · steel base',image:IMAGES.office,desc:trText('Compact workstation for bedrooms and smaller apartments.','Компактное рабочее место для спальни или небольшой квартиры.','Կոմպակտ աշխատատեղ՝ ննջասենյակի կամ փոքր բնակարանի համար։')},
    {id:'grid-storage',name:'Grid Storage 2×3',sku:'TV-GRD-ST-23',category:'Storage',room:'storage',collection:'frame',price:224000,status:'made',dimensions:'120 × 38 × 180 cm',lead:'4–7 weeks',materials:'Veneered plywood / MDF · optional steel plinth',image:IMAGES.office,config:'grid',desc:trText('Six-cell modular storage with open, door and drawer options.','Модульное хранение на шесть ячеек с открытыми, дверными и выдвижными секциями.','Վեց բջիջով մոդուլային պահեստ՝ բաց, դռնով և գզրոցային տարբերակներով։')},
    {id:'riva-lounge-chair',name:'Riva Outdoor Lounge Chair',sku:'TV-RIV-LC-075',category:'Outdoor',room:'outdoor',collection:'riva',price:176000,status:'limited',dimensions:'75 × 82 × 72 cm',lead:'Seasonal stock',materials:'Powder-coated aluminum · outdoor textile · quick-dry cushion',image:IMAGES.living,desc:trText('Light outdoor lounge chair for terraces and balconies.','Лёгкое уличное кресло для террас и балконов.','Թեթև բացօթյա բազկաթոռ՝ տեռասների և պատշգամբների համար։')},
    {id:'riva-coffee-table',name:'Riva Outdoor Coffee Table',sku:'TV-RIV-CT-080',category:'Outdoor',room:'outdoor',collection:'riva',price:129000,status:'limited',dimensions:'80 × 60 × 36 cm',lead:'Seasonal stock',materials:'Powder-coated aluminum · exterior-grade compact surface',image:IMAGES.living,desc:trText('Compact outdoor coffee table with a weather-ready surface.','Компактный уличный столик с поверхностью для наружного использования.','Կոմպակտ բացօթյա սուրճի սեղան՝ արտաքին օգտագործման դիմացկուն մակերեսով։')}
  ];

  const COLLECTIONS = [
    {id:'contour',name:'Contour',count:4,image:IMAGES.living,desc:trText('Soft geometry for living spaces. Low forms, rounded corners and restrained upholstery.','Мягкая геометрия для гостиных: низкие формы, округлённые углы и спокойная обивка.','Փափուկ երկրաչափություն հյուրասենյակների համար՝ ցածր ձևեր, կլորացված անկյուններ և զուսպ պաստառապատում։')},
    {id:'aren',name:'Aren',count:7,image:IMAGES.dining,desc:trText('Warm contemporary furniture where wood stays visually dominant without becoming rustic.','Тёплая современная мебель, где дерево остаётся главным, не превращаясь в рустик.','Ջերմ ժամանակակից կահույք, որտեղ փայտը մնում է գլխավոր նյութը՝ առանց ռուստիկ տեսքի։')},
    {id:'frame',name:'Frame',count:7,image:IMAGES.office,desc:trText('Compact architectural furniture built around storage, structure and urban rooms.','Компактная архитектурная мебель вокруг хранения, структуры и городских пространств.','Կոմպակտ ճարտարապետական կահույք՝ պահեստավորման, կառուցվածքի և քաղաքային տարածքների շուրջ։')},
    {id:'riva',name:'Riva',count:2,image:IMAGES.living,desc:trText('A small seasonal collection for terraces and balconies.','Небольшая сезонная коллекция для террас и балконов.','Փոքր սեզոնային հավաքածու՝ տեռասների և պատշգամբների համար։')}
  ];

  const PROJECTS = [
    {name:'Quiet Grid Apartment',meta:'Arabkir · 86 m² · Residential',image:IMAGES.living,desc:trText('More storage without making the room feel heavier. Catalog pieces are paired with a full-height custom storage wall.','Больше хранения без визуально тяжёлой комнаты. Каталожная мебель сочетается с полноразмерной системой хранения.','Ավելի շատ պահեստավորում՝ առանց տարածքը ծանրացնելու։ Կատալոգային կահույքը համադրված է ամբողջ բարձրությամբ պահեստային պատի հետ։')},
    {name:'Form Office',meta:'Kentron · 115 m² · Office',image:IMAGES.office,desc:trText('Eight workstations, meeting furniture and storage using one restrained material palette.','Восемь рабочих мест, переговорная мебель и хранение в одной сдержанной палитре.','Ութ աշխատատեղ, հանդիպումների կահույք և պահեստավորում՝ մեկ զուսպ նյութական գունապնակով։')},
    {name:'Cedar Table Restaurant',meta:'Dilijan · 180 m² · Hospitality',image:IMAGES.dining,desc:trText('Repeated Noma chairs and tables derived from the Arvo construction system.','Повторяемые стулья Noma и столы на базе конструктивной системы Arvo.','Կրկնվող Noma աթոռներ և Arvo կառուցվածքային համակարգից ձևավորված սեղաններ։')}
  ];

  const MATERIALS = [
    {name:'Natural Oak',use:'veneered surfaces',swatch:'linear-gradient(105deg,#c8a97f,#e0c49d 34%,#b48e63 35%,#d4b58c 69%,#a77d55 70%,#c7a077)'},
    {name:'Smoked Oak',use:'darker furniture finish',swatch:'linear-gradient(100deg,#5c4a3b,#76604d 40%,#4b3d32 41%,#6a5543 72%,#40342b)'},
    {name:'Walnut',use:'optional premium veneer',swatch:'linear-gradient(110deg,#6f4932,#9b6a45 34%,#5a3827 35%,#805237 72%,#4e3023)'},
    {name:'Performance Weave',use:'residential upholstery',swatch:'repeating-linear-gradient(45deg,#c9c0ad 0 3px,#bdb3a0 3px 6px)'},
    {name:'Bouclé',use:'tactile upholstery option',swatch:'radial-gradient(circle at 35% 30%,#ece7dc 0 5px,#d8d0c2 6px 9px,#eee9df 10px 14px)'},
    {name:'Graphite Steel',use:'frames and bases',swatch:'linear-gradient(135deg,#242725,#4a4f4b 50%,#1d201e)'}
  ];

  const FAQ = [
    {q:trText('How long does made-to-order furniture take?','Сколько занимает made-to-order мебель?','Որքա՞ն է տևում պատվերով կատալոգային կահույքի արտադրությունը։'),a:trText('Most catalog products require approximately 4–7 weeks. Complex upholstery or custom dimensions can require 6–8 weeks.','Большинство каталожных позиций занимает примерно 4–7 недель. Сложная обивка или нестандартные размеры могут потребовать 6–8 недель.','Կատալոգային ապրանքների մեծ մասը պահանջում է մոտ 4–7 շաբաթ։ Բարդ պաստառապատումը կամ ոչ ստանդարտ չափերը կարող են պահանջել 6–8 շաբաթ։')},
    {q:trText('Can I change the dimensions?','Можно изменить размеры?','Կարո՞ղ եմ փոխել չափերը։'),a:trText('Many products support controlled dimensional changes. Fixed mechanisms, such as the Arvo Extendable, keep their engineered geometry.','У многих моделей можно менять размеры в заданных пределах. Механизмы вроде Arvo Extendable имеют фиксированную геометрию.','Շատ մոդելներ թույլ են տալիս չափերի վերահսկվող փոփոխություն։ Arvo Extendable-ի նման մեխանիզմների երկրաչափությունը ֆիքսված է։')},
    {q:trText('Is assembly included?','Сборка включена?','Հավաքումը ներառվա՞ծ է։'),a:trText('Not for every retail product. Standard catalog assembly is usually 12,000–28,000 AMD. Built-in custom installation is included in the project quote.','Не для каждого розничного товара. Стандартная сборка обычно стоит 12 000–28 000 AMD. Монтаж встроенной мебели входит в проектную смету.','Ոչ բոլոր ապրանքների համար։ Կատալոգային ստանդարտ հավաքումը սովորաբար 12,000–28,000 AMD է։ Ներկառուցվող անհատական կահույքի տեղադրումը ներառվում է նախագծի գնառաջարկում։')},
    {q:trText('How much deposit is required?','Какая предоплата нужна?','Ի՞նչ կանխավճար է պահանջվում։'),a:trText('Made-to-order catalog furniture normally requires 50%. Custom projects use 50% / 40% / 10% stages.','Made-to-order каталог обычно требует 50%. Индивидуальные проекты используют схему 50% / 40% / 10%.','Պատվերով կատալոգային կահույքի համար սովորաբար պահանջվում է 50% կանխավճար։ Անհատական նախագծերը՝ 50% / 40% / 10% փուլերով։')},
    {q:trText('Do you deliver outside Yerevan?','Есть доставка за пределы Еревана?','Առաքո՞ւմ եք Երևանից դուրս։'),a:trText('Yes. Delivery across Armenia is quoted based on destination, order size and vehicle required.','Да. Доставка по Армении рассчитывается по месту назначения, объёму заказа и типу транспорта.','Այո։ Հայաստանի տարածքում առաքման գինը հաշվարկվում է ըստ ուղղության, պատվերի չափի և անհրաժեշտ տրանսպորտի։')},
    {q:trText('Do you work with designers and businesses?','Вы работаете с дизайнерами и бизнесом?','Աշխատո՞ւմ եք դիզայներների և բիզնեսների հետ։'),a:trText('Yes. The Trade Program supports designers and architects, while B2B covers selected restaurants, offices, boutique hospitality and serviced apartments.','Да. Trade Program рассчитана на дизайнеров и архитекторов, а B2B — на рестораны, офисы, небольшие гостиничные и апартаментные проекты.','Այո։ Trade Program-ը նախատեսված է դիզայներների և ճարտարապետների համար, իսկ B2B-ը՝ ընտրված ռեստորանների, գրասենյակների և հյուրանոցային նախագծերի համար։')}
  ];

  const I18N = {
    en: {
      skip:'Skip to content',demoNotice:'Fictional furniture brand · Portfolio demo · No real orders are processed',contactUs:'Contact',brandDescriptor:'FURNITURE / YEREVAN',navShop:'Shop',navCollections:'Collections',navCustom:'Custom',navProjects:'Projects',navTrade:'Trade / B2B',navShowrooms:'Showrooms',requestOrder:'Request order',
      heroEyebrow:'CONTEMPORARY FURNITURE · MADE IN YEREVAN',heroTitle:'Furniture designed around real space.',heroLead:'Configurable sizes, materials and finishes for homes and small commercial interiors — with clear pricing and production terms.',shopFurniture:'Shop furniture',exploreCustom:'Explore custom',statProducts:'catalog products',statCollections:'collections',statLanguages:'interface languages',heroMediaNote:'Configured for a 220 cm wall',
      railMeasureTitle:'Measurement',railMeasureText:'Yerevan visits from 12,000 AMD',railConfigureTitle:'Controlled customization',railConfigureText:'Sizes, finishes, fabrics and modules',railDeliveryTitle:'Delivery & assembly',railDeliveryText:'Across Yerevan and Armenia',railAsk:'Ask about a room',
      catalogEyebrow:'SHOP / CONFIGURE / REQUEST',catalogTitle:'Built into the collection.<br>Made for your room.',catalogIntro:'Browse the full fictional catalog, then change the parameters that matter before adding a configuration to your inquiry.',searchPlaceholder:'Search product, SKU, material',filterRoom:'Room',filterCollection:'Collection',configurableOnly:'Configurable only',inStockOnly:'In stock only',clearFilters:'Clear filters',sortLabel:'Sort',sortFeatured:'Featured',sortLow:'Price low → high',sortHigh:'Price high → low',sortStock:'In stock first',emptyTitle:'Nothing matches these filters.',emptyText:'Reset filters or try another search.',
      collectionsEyebrow:'COLLECTIONS',collectionsTitle:'Four ways to build a room.',collectionsIntro:'Furniture families developed around common proportions, materials and use cases.',viewCollection:'View collection',materialsEyebrow:'MATERIAL TRANSPARENCY',materialsTitle:'Know what the furniture is made from.',materialsIntro:'Solid ash, oak veneer, birch plywood, performance fabric and powder-coated steel — selected for specific jobs, not used as vague marketing labels.',requestSamples:'Request material samples',
      customEyebrow:'CUSTOM FURNITURE',customTitle:'When standard dimensions stop working.',customIntro:'Wardrobes, storage, desks and selected furniture developed around your measurements and material palette.',workshopTag:'fictional local workshop',processRequest:'Request',processRequestText:'Photos, approximate dimensions and budget.',processMeasure:'Measure & design',processMeasureText:'Site measurement, drawings and material selection.',processQuote:'Quote & confirm',processQuoteText:'Written specification, price and production window.',processProduce:'Produce & install',processProduceText:'QC, delivery and installation for built-ins.',startCustom:'Start a custom project',customFormEyebrow:'CUSTOM REQUEST',customFormTitle:'Tell us what has to fit.',customFormNote:'Demo form — data stays only in this browser.',
      fieldProjectType:'Project type',selectOption:'Select',fieldRoom:'Room / space',roomPlaceholder:'Living room, bedroom, office…',fieldDimensions:'Approx. dimensions',dimensionsPlaceholder:'e.g. wall 310 × 260 cm',fieldBudget:'Budget range',notSure:'Not sure yet',fieldMaterial:'Preferred material',fieldDeadline:'Desired timing',deadlinePlaceholder:'e.g. November 2026',fieldName:'Name',fieldPhone:'Phone',fieldEmail:'Email',fieldNotes:'Notes',notesPlaceholder:'What needs to fit, store or change?',formPrivacy:'Nothing is sent to a server. The demo request is stored locally.',sendCustomRequest:'Save demo request',
      projectsEyebrow:'SELECTED PROJECTS',projectsTitle:'Furniture in context.',projectsIntro:'Fictional case studies showing how catalog products and custom pieces can work together.',tradeEyebrow:'FOR DESIGNERS / B2B',tradeTitle:'One specification.<br>Repeatable production.',tradeIntro:'Material samples, dimensions, custom sizes, project pricing and a single project contact for designers, cafés, offices and serviced apartments.',tradeProgram:'Trade program',discussB2B:'Discuss a B2B project',tradeMetricUnits:'repeated units typical minimum',tradeMetricValue:'typical project value threshold',tradeMetricPricing:'project pricing range vs retail equivalent',
      showroomEyebrow:'SHOWROOMS',showroomTitle:'See materials before choosing them.',showroomIntro:'Compare finishes, sit on upholstery products and review configurations in person.',mainShowroom:'MAIN SHOWROOM',workshopStudio:'WORKSHOP STUDIO',arabkirHours:'Mon–Sat 10:30–19:30 · Sun 12:00–18:00',shengavitHours:'Tue–Sat 11:00–18:00 · Appointment preferred',bookConsultation:'Book consultation',requestVisit:'Request a visit',
      faqTitle:'Clear before production starts.',faqIntro:'Lead times, deposits, delivery, assembly and customization — the practical questions first.',askQuestion:'Ask another question',contactEyebrow:'CONTACT / REQUEST',contactTitle:'Working with a difficult room?',contactIntro:'Send dimensions and a few details. The demo will build an inquiry you can review before saving it locally.',sendRequest:'Send a request',generalPhone:'General phone',generalEmail:'General email',customEmail:'Custom furniture',tradeEmail:'Trade / B2B',
      footerDesc:'A fictional furniture brand created exclusively as a commercial web-development demonstration project.',footerExplore:'Explore',footerBusiness:'Business',b2bProjects:'B2B projects',footerContact:'Contact',footerTech:'HTML · CSS · JavaScript',footerNote:'No real orders, addresses or contacts.',
      inquiryEyebrow:'YOUR INQUIRY',inquiryTitle:'Request list',estimatedTotal:'Estimated product total',inquiryNote:'Delivery, assembly and project work are quoted separately.',continueRequest:'Continue request',clearInquiry:'Clear list',favoritesEyebrow:'SAVED',favoritesTitle:'Favorites',
      orderEyebrow:'ORDER / PROJECT REQUEST',orderTitle:'Send one clear request.',orderIntro:'Products and configurations from your inquiry are included automatically.',fieldCity:'City',fieldContactMethod:'Preferred contact',contactPhone:'Phone',contactEmail:'Email',fieldService:'Delivery / assembly',serviceDiscuss:'Discuss with consultant',serviceDelivery:'Delivery only',serviceAssembly:'Delivery + assembly',servicePickup:'Showroom pickup',fieldAddress:'Delivery address / area',addressPlaceholder:'District or address',orderNotesPlaceholder:'Access, dimensions, deadline, questions…',demoConsent:'I understand this is a fictional portfolio demo and no real order will be created.',saveRequest:'Save demo request',successEyebrow:'REQUEST SAVED',successTitle:'Your demo request is ready.',successText:'Nothing was sent anywhere. The request exists only in this browser.',requestId:'Request ID',close:'Close',
      all:'All',living:'Living',dining:'Dining',bedroom:'Bedroom',office:'Office',storage:'Storage',outdoor:'Outdoor',product:'product',products:'products',made:'Made to order',stock:'In stock',new:'New',limited:'Limited',details:'Details',addInquiry:'Add to inquiry',from:'from',collection:'Collection',dimensions:'Dimensions',materials:'Materials',production:'Production',configure:'Configure',currentPrice:'Current configuration',addFavorite:'Save',removeFavorite:'Saved',configureRequest:'Configure & request order',addedInquiry:'Added to inquiry',removedInquiry:'Removed from inquiry',addedFavorite:'Saved to favorites',removedFavorite:'Removed from favorites',emptyInquiry:'Your inquiry is empty.',emptyInquiryText:'Add products or configurations from the catalog.',emptyFavorites:'No favorites yet.',emptyFavoritesText:'Save products to compare them later.',catalogCount:'{n} products',customSaved:'Custom demo request saved.',themeLight:'Switch to light theme',themeDark:'Switch to dark theme'
    },
    ru: {
      skip:'Перейти к содержанию',demoNotice:'Вымышленный мебельный бренд · Portfolio demo · Реальные заказы не создаются',contactUs:'Контакты',brandDescriptor:'МЕБЕЛЬ / ЕРЕВАН',navShop:'Каталог',navCollections:'Коллекции',navCustom:'На заказ',navProjects:'Проекты',navTrade:'Trade / B2B',navShowrooms:'Шоурумы',requestOrder:'Оставить заявку',
      heroEyebrow:'СОВРЕМЕННАЯ МЕБЕЛЬ · СДЕЛАНО В ЕРЕВАНЕ',heroTitle:'Мебель, созданная под реальное пространство.',heroLead:'Настраиваемые размеры, материалы и отделки для домов и небольших коммерческих интерьеров — с понятными ценами и сроками.',shopFurniture:'Смотреть мебель',exploreCustom:'Мебель на заказ',statProducts:'товаров в каталоге',statCollections:'коллекции',statLanguages:'языка интерфейса',heroMediaNote:'Конфигурация для стены 220 см',
      railMeasureTitle:'Замер',railMeasureText:'Выезд по Еревану от 12 000 AMD',railConfigureTitle:'Контролируемая кастомизация',railConfigureText:'Размеры, отделки, ткани и модули',railDeliveryTitle:'Доставка и сборка',railDeliveryText:'По Еревану и Армении',railAsk:'Спросить о комнате',
      catalogEyebrow:'ВЫБРАТЬ / НАСТРОИТЬ / ЗАПРОСИТЬ',catalogTitle:'Часть коллекции.<br>Под вашу комнату.',catalogIntro:'Изучите каталог, измените важные параметры и добавьте конфигурацию в общий запрос.',searchPlaceholder:'Поиск по товару, SKU, материалу',filterRoom:'Комната',filterCollection:'Коллекция',configurableOnly:'Только настраиваемые',inStockOnly:'Только в наличии',clearFilters:'Сбросить фильтры',sortLabel:'Сортировка',sortFeatured:'Рекомендуемые',sortLow:'Цена по возрастанию',sortHigh:'Цена по убыванию',sortStock:'Сначала в наличии',emptyTitle:'По этим фильтрам ничего нет.',emptyText:'Сбросьте фильтры или измените поиск.',
      collectionsEyebrow:'КОЛЛЕКЦИИ',collectionsTitle:'Четыре способа собрать пространство.',collectionsIntro:'Семейства мебели с общей логикой пропорций, материалов и применения.',viewCollection:'Смотреть коллекцию',materialsEyebrow:'ЧЕСТНЫЕ МАТЕРИАЛЫ',materialsTitle:'Знайте, из чего сделана мебель.',materialsIntro:'Массив ясеня, дубовый шпон, берёзовая фанера, практичные ткани и порошковая сталь — каждый материал используется по задаче.',requestSamples:'Запросить образцы',
      customEyebrow:'МЕБЕЛЬ НА ЗАКАЗ',customTitle:'Когда стандартные размеры перестают работать.',customIntro:'Шкафы, системы хранения, столы и отдельные предметы под ваши размеры и палитру материалов.',workshopTag:'вымышленная локальная мастерская',processRequest:'Запрос',processRequestText:'Фото, примерные размеры и бюджет.',processMeasure:'Замер и проект',processMeasureText:'Выезд, чертежи и подбор материалов.',processQuote:'Смета и подтверждение',processQuoteText:'Спецификация, цена и окно производства.',processProduce:'Производство и монтаж',processProduceText:'Контроль качества, доставка и установка.',startCustom:'Начать индивидуальный проект',customFormEyebrow:'ИНДИВИДУАЛЬНЫЙ ЗАПРОС',customFormTitle:'Расскажите, что должно поместиться.',customFormNote:'Demo-форма — данные остаются только в браузере.',
      fieldProjectType:'Тип проекта',selectOption:'Выберите',fieldRoom:'Комната / пространство',roomPlaceholder:'Гостиная, спальня, офис…',fieldDimensions:'Примерные размеры',dimensionsPlaceholder:'например, стена 310 × 260 см',fieldBudget:'Бюджет',notSure:'Пока не уверен',fieldMaterial:'Предпочтительный материал',fieldDeadline:'Желаемый срок',deadlinePlaceholder:'например, ноябрь 2026',fieldName:'Имя',fieldPhone:'Телефон',fieldEmail:'Email',fieldNotes:'Комментарий',notesPlaceholder:'Что должно поместиться, храниться или измениться?',formPrivacy:'Ничего не отправляется на сервер. Demo-запрос сохраняется локально.',sendCustomRequest:'Сохранить demo-запрос',
      projectsEyebrow:'ИЗБРАННЫЕ ПРОЕКТЫ',projectsTitle:'Мебель в контексте.',projectsIntro:'Вымышленные кейсы, показывающие работу каталожных и индивидуальных решений вместе.',tradeEyebrow:'ДЛЯ ДИЗАЙНЕРОВ / B2B',tradeTitle:'Одна спецификация.<br>Повторяемое производство.',tradeIntro:'Образцы, размеры, кастомные варианты, проектные цены и один контакт для дизайнеров, кафе, офисов и апартаментов.',tradeProgram:'Trade Program',discussB2B:'Обсудить B2B-проект',tradeMetricUnits:'повторяемых единиц — типичный минимум',tradeMetricValue:'типичный порог стоимости проекта',tradeMetricPricing:'диапазон проектной цены к retail-эквиваленту',
      showroomEyebrow:'ШОУРУМЫ',showroomTitle:'Посмотрите материалы до выбора.',showroomIntro:'Сравните отделки, протестируйте мягкую мебель и обсудите конфигурации лично.',mainShowroom:'ГЛАВНЫЙ ШОУРУМ',workshopStudio:'WORKSHOP STUDIO',arabkirHours:'Пн–Сб 10:30–19:30 · Вс 12:00–18:00',shengavitHours:'Вт–Сб 11:00–18:00 · Желательна запись',bookConsultation:'Записаться на консультацию',requestVisit:'Запросить визит',
      faqTitle:'Всё понятно до начала производства.',faqIntro:'Сроки, предоплата, доставка, сборка и кастомизация — сначала практические вопросы.',askQuestion:'Задать другой вопрос',contactEyebrow:'КОНТАКТ / ЗАПРОС',contactTitle:'Сложная комната?',contactIntro:'Отправьте размеры и детали. Demo соберёт единый запрос, который можно проверить перед локальным сохранением.',sendRequest:'Отправить запрос',generalPhone:'Общий телефон',generalEmail:'Общий email',customEmail:'Мебель на заказ',tradeEmail:'Trade / B2B',
      footerDesc:'Вымышленный мебельный бренд, созданный исключительно как коммерческий demo-проект веб-разработки.',footerExplore:'Разделы',footerBusiness:'Для бизнеса',b2bProjects:'B2B-проекты',footerContact:'Контакты',footerTech:'HTML · CSS · JavaScript',footerNote:'Нет реальных заказов, адресов или контактов.',
      inquiryEyebrow:'ВАШ ЗАПРОС',inquiryTitle:'Список запроса',estimatedTotal:'Ориентировочная сумма товаров',inquiryNote:'Доставка, сборка и проектные работы рассчитываются отдельно.',continueRequest:'Продолжить запрос',clearInquiry:'Очистить список',favoritesEyebrow:'СОХРАНЕНО',favoritesTitle:'Избранное',
      orderEyebrow:'ЗАКАЗ / ПРОЕКТНЫЙ ЗАПРОС',orderTitle:'Один понятный запрос.',orderIntro:'Товары и конфигурации из списка добавляются автоматически.',fieldCity:'Город',fieldContactMethod:'Как связаться',contactPhone:'Телефон',contactEmail:'Email',fieldService:'Доставка / сборка',serviceDiscuss:'Обсудить с консультантом',serviceDelivery:'Только доставка',serviceAssembly:'Доставка + сборка',servicePickup:'Самовывоз из шоурума',fieldAddress:'Адрес / район доставки',addressPlaceholder:'Район или адрес',orderNotesPlaceholder:'Доступ, размеры, срок, вопросы…',demoConsent:'Я понимаю, что это вымышленный portfolio demo и реальный заказ не создаётся.',saveRequest:'Сохранить demo-запрос',successEyebrow:'ЗАПРОС СОХРАНЁН',successTitle:'Ваш demo-запрос готов.',successText:'Ничего никуда не отправлено. Запрос существует только в этом браузере.',requestId:'ID запроса',close:'Закрыть',
      all:'Все',living:'Гостиная',dining:'Столовая',bedroom:'Спальня',office:'Офис',storage:'Хранение',outdoor:'Улица',product:'товар',products:'товаров',made:'Под заказ',stock:'В наличии',new:'Новинка',limited:'Ограниченно',details:'Подробнее',addInquiry:'В запрос',from:'от',collection:'Коллекция',dimensions:'Размеры',materials:'Материалы',production:'Производство',configure:'Настройка',currentPrice:'Текущая цена',addFavorite:'Сохранить',removeFavorite:'Сохранено',configureRequest:'Настроить и запросить',addedInquiry:'Добавлено в запрос',removedInquiry:'Удалено из запроса',addedFavorite:'Добавлено в избранное',removedFavorite:'Удалено из избранного',emptyInquiry:'Список запроса пуст.',emptyInquiryText:'Добавьте товары или конфигурации из каталога.',emptyFavorites:'Избранное пока пусто.',emptyFavoritesText:'Сохраните товары, чтобы сравнить их позже.',catalogCount:'{n} товаров',customSaved:'Индивидуальный demo-запрос сохранён.',themeLight:'Переключить на светлую тему',themeDark:'Переключить на тёмную тему'
    },
    hy: {
      skip:'Անցնել բովանդակությանը',demoNotice:'Հորինված կահույքի բրենդ · Portfolio demo · Իրական պատվերներ չեն մշակվում',contactUs:'Կապ',brandDescriptor:'ԿԱՀՈՒՅՔ / ԵՐԵՎԱՆ',navShop:'Կատալոգ',navCollections:'Հավաքածուներ',navCustom:'Պատվերով',navProjects:'Նախագծեր',navTrade:'Trade / B2B',navShowrooms:'Շոուրումներ',requestOrder:'Ուղարկել հարցում',
      heroEyebrow:'ԺԱՄԱՆԱԿԱԿԻՑ ԿԱՀՈՒՅՔ · ՊԱՏՐԱՍՏՎԱԾ ԵՐԵՎԱՆՈՒՄ',heroTitle:'Կահույք՝ նախագծված իրական տարածքի համար։',heroLead:'Կարգավորվող չափեր, նյութեր և երանգներ տների ու փոքր կոմերցիոն ինտերիերների համար՝ հստակ գներով և ժամկետներով։',shopFurniture:'Դիտել կահույքը',exploreCustom:'Պատվերով կահույք',statProducts:'կատալոգային ապրանք',statCollections:'հավաքածու',statLanguages:'ինտերֆեյսի լեզու',heroMediaNote:'Կարգավորված 220 սմ պատի համար',
      railMeasureTitle:'Չափագրում',railMeasureText:'Երևանում այցելություն՝ 12,000 AMD-ից',railConfigureTitle:'Վերահսկվող անհատականացում',railConfigureText:'Չափեր, երանգներ, գործվածքներ և մոդուլներ',railDeliveryTitle:'Առաքում և հավաքում',railDeliveryText:'Երևանում և ամբողջ Հայաստանում',railAsk:'Հարցնել տարածքի մասին',
      catalogEyebrow:'ԸՆՏՐԵԼ / ԿԱՐԳԱՎՈՐԵԼ / ՀԱՐՑՈՒՄ',catalogTitle:'Հավաքածուի մաս։<br>Ձեր տարածքի համար։',catalogIntro:'Դիտեք ամբողջ կատալոգը, փոխեք կարևոր պարամետրերը և ավելացրեք կոնֆիգուրացիան հարցման մեջ։',searchPlaceholder:'Որոնել ապրանք, SKU կամ նյութ',filterRoom:'Տարածք',filterCollection:'Հավաքածու',configurableOnly:'Միայն կարգավորվող',inStockOnly:'Միայն առկա',clearFilters:'Մաքրել ֆիլտրերը',sortLabel:'Դասավորել',sortFeatured:'Առաջարկվող',sortLow:'Գին՝ ցածրից բարձր',sortHigh:'Գին՝ բարձրից ցածր',sortStock:'Նախ՝ առկա',emptyTitle:'Այս ֆիլտրերով արդյունք չկա։',emptyText:'Մաքրեք ֆիլտրերը կամ փոխեք որոնումը։',
      collectionsEyebrow:'ՀԱՎԱՔԱԾՈՒՆԵՐ',collectionsTitle:'Տարածք կառուցելու չորս մոտեցում։',collectionsIntro:'Կահույքի ընտանիքներ՝ ընդհանուր համամասնություններով, նյութերով և կիրառմամբ։',viewCollection:'Դիտել հավաքածուն',materialsEyebrow:'ՆՅՈՒԹԵՐԻ ԹԱՓԱՆՑԻԿՈՒԹՅՈՒՆ',materialsTitle:'Իմացեք՝ ինչից է պատրաստված կահույքը։',materialsIntro:'Պինդ հացենի, կաղնու շպոն, կեչու նրբատախտակ, գործնական գործվածքներ և փոշեներկված պողպատ՝ յուրաքանչյուր նյութ իր աշխատանքի համար։',requestSamples:'Հարցնել նմուշներ',
      customEyebrow:'ՊԱՏՎԵՐՈՎ ԿԱՀՈՒՅՔ',customTitle:'Երբ ստանդարտ չափերը չեն աշխատում։',customIntro:'Զգեստապահարաններ, պահեստային համակարգեր, գրասեղաններ և ընտրված կահույք՝ ձեր չափերով ու նյութերի գունապնակով։',workshopTag:'հորինված տեղական արտադրամաս',processRequest:'Հարցում',processRequestText:'Լուսանկարներ, մոտավոր չափեր և բյուջե։',processMeasure:'Չափագրում և նախագիծ',processMeasureText:'Տարածքի չափագրում, գծագրեր և նյութերի ընտրություն։',processQuote:'Գնառաջարկ և հաստատում',processQuoteText:'Գրավոր սպեցիֆիկացիա, գին և արտադրության ժամկետ։',processProduce:'Արտադրություն և տեղադրում',processProduceText:'Որակի ստուգում, առաքում և տեղադրում։',startCustom:'Սկսել անհատական նախագիծ',customFormEyebrow:'ԱՆՀԱՏԱԿԱՆ ՀԱՐՑՈՒՄ',customFormTitle:'Նկարագրեք՝ ինչ պետք է տեղավորվի։',customFormNote:'Demo ձև — տվյալները մնում են միայն այս բրաուզերում։',
      fieldProjectType:'Նախագծի տեսակ',selectOption:'Ընտրել',fieldRoom:'Տարածք',roomPlaceholder:'Հյուրասենյակ, ննջասենյակ, գրասենյակ…',fieldDimensions:'Մոտավոր չափեր',dimensionsPlaceholder:'օր. պատ՝ 310 × 260 սմ',fieldBudget:'Բյուջե',notSure:'Դեռ վստահ չեմ',fieldMaterial:'Նախընտրելի նյութ',fieldDeadline:'Ցանկալի ժամկետ',deadlinePlaceholder:'օր. նոյեմբեր 2026',fieldName:'Անուն',fieldPhone:'Հեռախոս',fieldEmail:'Email',fieldNotes:'Նշումներ',notesPlaceholder:'Ի՞նչ պետք է տեղավորվի, պահվի կամ փոխվի։',formPrivacy:'Ոչինչ չի ուղարկվում սերվեր։ Demo հարցումը պահվում է տեղային։',sendCustomRequest:'Պահել demo հարցումը',
      projectsEyebrow:'ԸՆՏՐՎԱԾ ՆԱԽԱԳԾԵՐ',projectsTitle:'Կահույքը տարածքի մեջ։',projectsIntro:'Հորինված նախագծեր, որոնք ցույց են տալիս կատալոգային և անհատական լուծումների համադրությունը։',tradeEyebrow:'ԴԻԶԱՅՆԵՐՆԵՐԻ / B2B ՀԱՄԱՐ',tradeTitle:'Մեկ սպեցիֆիկացիա։<br>Կրկնվող արտադրություն։',tradeIntro:'Նյութերի նմուշներ, չափեր, անհատական տարբերակներ, նախագծային գներ և մեկ կոնտակտ դիզայներների, սրճարանների, գրասենյակների ու սպասարկվող բնակարանների համար։',tradeProgram:'Trade ծրագիր',discussB2B:'Քննարկել B2B նախագիծ',tradeMetricUnits:'կրկնվող միավոր՝ սովորական նվազագույն',tradeMetricValue:'նախագծի սովորական արժեքային շեմ',tradeMetricPricing:'նախագծային գնի միջակայք retail-ի նկատմամբ',
      showroomEyebrow:'ՇՈՈՒՐՈՒՄՆԵՐ',showroomTitle:'Տեսեք նյութերը մինչև ընտրելը։',showroomIntro:'Համեմատեք երանգները, փորձեք փափուկ կահույքը և քննարկեք կոնֆիգուրացիաները տեղում։',mainShowroom:'ԳԼԽԱՎՈՐ ՇՈՈՒՐՈՒՄ',workshopStudio:'ԱՐՏԱԴՐԱՄԱՍ / STUDIO',arabkirHours:'Երկ–Շբթ 10:30–19:30 · Կիր 12:00–18:00',shengavitHours:'Երք–Շբթ 11:00–18:00 · Նախապես գրանցվելը ցանկալի է',bookConsultation:'Ամրագրել խորհրդատվություն',requestVisit:'Հարցնել այցելություն',
      faqTitle:'Պարզ՝ մինչև արտադրության սկիզբը։',faqIntro:'Ժամկետներ, կանխավճար, առաքում, հավաքում և անհատականացում՝ առաջին հերթին գործնական հարցերը։',askQuestion:'Տալ այլ հարց',contactEyebrow:'ԿԱՊ / ՀԱՐՑՈՒՄ',contactTitle:'Բարդ տարածքի հե՞տ եք աշխատում։',contactIntro:'Ուղարկեք չափերը և մի քանի մանրամասներ։ Demo-ն կկազմի միասնական հարցում՝ պահպանելուց առաջ ստուգելու համար։',sendRequest:'Ուղարկել հարցում',generalPhone:'Ընդհանուր հեռախոս',generalEmail:'Ընդհանուր email',customEmail:'Պատվերով կահույք',tradeEmail:'Trade / B2B',
      footerDesc:'Հորինված կահույքի բրենդ՝ ստեղծված բացառապես կոմերցիոն web-development demo նախագծի համար։',footerExplore:'Բաժիններ',footerBusiness:'Բիզնես',b2bProjects:'B2B նախագծեր',footerContact:'Կապ',footerTech:'HTML · CSS · JavaScript',footerNote:'Իրական պատվերներ, հասցեներ կամ կոնտակտներ չկան։',
      inquiryEyebrow:'ՁԵՐ ՀԱՐՑՈՒՄԸ',inquiryTitle:'Հարցման ցանկ',estimatedTotal:'Ապրանքների մոտավոր գումար',inquiryNote:'Առաքումը, հավաքումը և նախագծային աշխատանքները հաշվարկվում են առանձին։',continueRequest:'Շարունակել հարցումը',clearInquiry:'Մաքրել ցանկը',favoritesEyebrow:'ՊԱՀՎԱԾ',favoritesTitle:'Ընտրվածներ',
      orderEyebrow:'ՊԱՏՎԵՐ / ՆԱԽԱԳԾԱՅԻՆ ՀԱՐՑՈՒՄ',orderTitle:'Մեկ հստակ հարցում։',orderIntro:'Ձեր ցանկի ապրանքներն ու կոնֆիգուրացիաները ավտոմատ ներառվում են։',fieldCity:'Քաղաք',fieldContactMethod:'Կապի եղանակ',contactPhone:'Հեռախոս',contactEmail:'Email',fieldService:'Առաքում / հավաքում',serviceDiscuss:'Քննարկել խորհրդատուի հետ',serviceDelivery:'Միայն առաքում',serviceAssembly:'Առաքում + հավաքում',servicePickup:'Վերցնել շոուրումից',fieldAddress:'Առաքման հասցե / շրջան',addressPlaceholder:'Շրջան կամ հասցե',orderNotesPlaceholder:'Մուտք, չափեր, ժամկետ, հարցեր…',demoConsent:'Հասկանում եմ, որ սա հորինված portfolio demo է և իրական պատվեր չի ստեղծվում։',saveRequest:'Պահել demo հարցումը',successEyebrow:'ՀԱՐՑՈՒՄԸ ՊԱՀՎԵՑ',successTitle:'Ձեր demo հարցումը պատրաստ է։',successText:'Ոչինչ ոչ մի տեղ չի ուղարկվել։ Հարցումը կա միայն այս բրաուզերում։',requestId:'Հարցման ID',close:'Փակել',
      all:'Բոլորը',living:'Հյուրասենյակ',dining:'Ճաշասենյակ',bedroom:'Ննջասենյակ',office:'Գրասենյակ',storage:'Պահեստավորում',outdoor:'Բացօթյա',product:'ապրանք',products:'ապրանք',made:'Պատվերով',stock:'Առկա',new:'Նոր',limited:'Սահմանափակ',details:'Մանրամասներ',addInquiry:'Ավելացնել հարցմանը',from:'սկսած',collection:'Հավաքածու',dimensions:'Չափեր',materials:'Նյութեր',production:'Արտադրություն',configure:'Կարգավորում',currentPrice:'Ընթացիկ գին',addFavorite:'Պահել',removeFavorite:'Պահված է',configureRequest:'Կարգավորել և հարցում ուղարկել',addedInquiry:'Ավելացվեց հարցմանը',removedInquiry:'Հեռացվեց հարցումից',addedFavorite:'Պահվեց ընտրվածներում',removedFavorite:'Հեռացվեց ընտրվածներից',emptyInquiry:'Հարցման ցանկը դատարկ է։',emptyInquiryText:'Ավելացրեք ապրանքներ կամ կոնֆիգուրացիաներ կատալոգից։',emptyFavorites:'Ընտրվածներ դեռ չկան։',emptyFavoritesText:'Պահեք ապրանքները՝ հետագայում համեմատելու համար։',catalogCount:'{n} ապրանք',customSaved:'Անհատական demo հարցումը պահվեց։',themeLight:'Անցնել բաց թեմայի',themeDark:'Անցնել մուգ թեմայի'
    }
  };


  const UI_TERMS = {
    en: {
      size:'Size', fabric:'Fabric', legs:'Legs', width:'Width', finish:'Finish',
      mattressSize:'Mattress size', options:'Options', moduleSize:'Module size',
      none:'None', sofas:'Sofas', armchairs:'Armchairs', coffeeTables:'Coffee Tables',
      tvUnits:'TV Units', shelving:'Shelving', diningTables:'Dining Tables', chairs:'Chairs',
      storageCat:'Storage', beds:'Beds', bedsideTables:'Bedside Tables', dressers:'Dressers',
      wardrobes:'Wardrobes', desks:'Desks',
      customTypes:['Wardrobe','Storage','Desk / office','Dining','Bedroom','Apartment furnishing','B2B'],
      customMaterials:['Natural oak','Smoked oak','Walnut','Painted / warm white','Mixed materials']
    },
    ru: {
      size:'Размер', fabric:'Ткань', legs:'Ножки', width:'Ширина', finish:'Отделка',
      mattressSize:'Размер матраса', options:'Опции', moduleSize:'Размер модуля',
      none:'Без опций', sofas:'Диваны', armchairs:'Кресла', coffeeTables:'Журнальные столики',
      tvUnits:'ТВ-тумбы', shelving:'Стеллажи', diningTables:'Обеденные столы', chairs:'Стулья',
      storageCat:'Хранение', beds:'Кровати', bedsideTables:'Прикроватные тумбы', dressers:'Комоды',
      wardrobes:'Шкафы', desks:'Письменные столы',
      customTypes:['Шкаф','Хранение','Стол / офис','Столовая','Спальня','Комплектация квартиры','B2B'],
      customMaterials:['Натуральный дуб','Копчёный дуб','Орех','Крашеный / тёплый белый','Смешанные материалы']
    },
    hy: {
      size:'Չափ', fabric:'Գործվածք', legs:'Ոտքեր', width:'Լայնություն', finish:'Հարդարում',
      mattressSize:'Ներքնակի չափ', options:'Ընտրանքներ', moduleSize:'Մոդուլի չափ',
      none:'Առանց ընտրանքի', sofas:'Բազմոցներ', armchairs:'Բազկաթոռներ', coffeeTables:'Սուրճի սեղաններ',
      tvUnits:'TV պահարաններ', shelving:'Դարակաշարեր', diningTables:'Ճաշասեղաններ', chairs:'Աթոռներ',
      storageCat:'Պահեստավորում', beds:'Մահճակալներ', bedsideTables:'Մահճակալի կողքի սեղաններ', dressers:'Կոմոդներ',
      wardrobes:'Զգեստապահարաններ', desks:'Գրասեղաններ',
      customTypes:['Զգեստապահարան','Պահեստավորում','Գրասեղան / գրասենյակ','Ճաշասենյակ','Ննջասենյակ','Բնակարանի կահավորում','B2B'],
      customMaterials:['Բնական կաղնի','Մուգ կաղնի','Ընկույզ','Ներկված / տաք սպիտակ','Խառը նյութեր']
    }
  };
  function ui(key){ return UI_TERMS[state.lang]?.[key] ?? UI_TERMS.en[key] ?? key; }
  function categoryLabel(category){
    const map = {
      'Sofas':'sofas','Armchairs':'armchairs','Coffee Tables':'coffeeTables','TV Units':'tvUnits',
      'Shelving':'shelving','Dining Tables':'diningTables','Chairs':'chairs','Storage':'storageCat',
      'Beds':'beds','Bedside Tables':'bedsideTables','Dressers':'dressers','Wardrobes':'wardrobes','Desks':'desks'
    };
    return ui(map[category] || category);
  }
  function optionSelected(value, current){ return value === current ? ' selected' : ''; }
  function optionChecked(value, list){ return (list || []).includes(value) ? ' checked' : ''; }

  const state = {
    lang: ['en','ru','hy'].includes(localStorage.getItem(STORAGE.lang)) ? localStorage.getItem(STORAGE.lang) : 'en',
    theme: ['light','dark'].includes(localStorage.getItem(STORAGE.theme)) ? localStorage.getItem(STORAGE.theme) : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    room: 'all', collection: 'all', search: '', configurable: false, stock: false, sort: 'featured',
    favorites: readJSON(STORAGE.favorites, []), inquiry: readJSON(STORAGE.inquiry, []), currentProduct: null, currentConfig: null
  };

  function readJSON(key, fallback){ try{ const x = JSON.parse(localStorage.getItem(key)); return x ?? fallback; }catch{ return fallback; } }
  function saveJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
  function safe(value=''){ return String(value).replace(/[&<>'"]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m])); }
  function t(key){ return I18N[state.lang]?.[key] ?? I18N.en[key] ?? key; }
  function local(obj){ return obj?.[state.lang] ?? obj?.en ?? ''; }
  function money(n){ return `${fmt.format(Math.round(n))} AMD`; }
  function productById(id){ return PRODUCTS.find(p => p.id === id); }
  function collectionName(id){ return COLLECTIONS.find(c => c.id === id)?.name || id; }
  function statusLabel(status){ return t(status); }
  function toast(message){ const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2200); }

  function applyTheme(){
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem(STORAGE.theme, state.theme);
    const use = $('#themeToggle use');
    use.setAttribute('href', state.theme === 'dark' ? '#i-sun' : '#i-moon');
    $('#themeToggle').setAttribute('aria-label', state.theme === 'dark' ? t('themeLight') : t('themeDark'));
    const meta = $('meta[name="theme-color"]'); if(meta) meta.content = state.theme === 'dark' ? '#101411' : '#293832';
  }

  function applyLocale(){
    document.documentElement.lang = state.lang;
    localStorage.setItem(STORAGE.lang, state.lang);
    $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if(v != null) el.innerHTML = v; });
    $$('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
    $$('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === state.lang));
    const projectType = $('[name="projectType"]');
    if(projectType) [...projectType.options].slice(1).forEach((o,i)=>{ if(UI_TERMS[state.lang]?.customTypes?.[i]) o.textContent=UI_TERMS[state.lang].customTypes[i]; });
    const material = $('[name="material"]');
    if(material) [...material.options].slice(1).forEach((o,i)=>{ if(UI_TERMS[state.lang]?.customMaterials?.[i]) o.textContent=UI_TERMS[state.lang].customMaterials[i]; });
    applyTheme(); renderFilters(); renderProducts(); renderCollections(); renderMaterials(); renderProjects(); renderFaq(); renderInquiry(); renderFavorites();
    if(state.currentProduct && $('#productModal').classList.contains('open')) renderProductModal(state.currentProduct.id, true);
    if($('#orderModal').classList.contains('open')) renderOrderSummary();
  }

  function renderFilters(){
    const roomCounts = PRODUCTS.reduce((a,p)=>(a[p.room]=(a[p.room]||0)+1,a),{});
    const roomOrder=['all','living','dining','bedroom','office','storage','outdoor'];
    $('#roomFilters').innerHTML = roomOrder.map(id=>`<button class="filter-btn ${state.room===id?'active':''}" type="button" data-room="${id}"><span>${safe(t(id))}</span><span>${id==='all'?PRODUCTS.length:(roomCounts[id]||0)}</span></button>`).join('');
    $('#collectionFilters').innerHTML = ['all',...COLLECTIONS.map(c=>c.id)].map(id=>`<button class="filter-btn ${state.collection===id?'active':''}" type="button" data-collection="${id}"><span>${id==='all'?safe(t('all')):safe(collectionName(id))}</span><span>${id==='all'?PRODUCTS.length:PRODUCTS.filter(p=>p.collection===id).length}</span></button>`).join('');
    $$('[data-room]').forEach(b=>b.addEventListener('click',()=>{state.room=b.dataset.room;renderFilters();renderProducts();}));
    $$('[data-collection]').forEach(b=>b.addEventListener('click',()=>{state.collection=b.dataset.collection;renderFilters();renderProducts();}));
  }

  function filteredProducts(){
    let list=[...PRODUCTS];
    if(state.room!=='all') list=list.filter(p=>p.room===state.room);
    if(state.collection!=='all') list=list.filter(p=>p.collection===state.collection);
    if(state.configurable) list=list.filter(p=>!!p.config);
    if(state.stock) list=list.filter(p=>p.status==='stock');
    const q=state.search.trim().toLowerCase();
    if(q) list=list.filter(p=>[p.name,p.sku,p.category,p.collection,p.materials].join(' ').toLowerCase().includes(q));
    if(state.sort==='price-asc') list.sort((a,b)=>a.price-b.price);
    if(state.sort==='price-desc') list.sort((a,b)=>b.price-a.price);
    if(state.sort==='stock') list.sort((a,b)=>(a.status==='stock'?0:1)-(b.status==='stock'?0:1));
    return list;
  }

  function renderProducts(){
    const list=filteredProducts();
    $('#catalogCount').textContent=t('catalogCount').replace('{n}',list.length);
    $('#catalogEmpty').hidden=!!list.length;
    $('#productGrid').innerHTML=list.map(p=>{
      const fav=state.favorites.includes(p.id);
      return `<article class="product-card reveal visible" data-id="${p.id}">
        <div class="product-image">
          <button class="favorite-btn ${fav?'active':''}" type="button" data-favorite="${p.id}" aria-label="${safe(fav?t('removeFavorite'):t('addFavorite'))}"><svg><use href="#i-heart"></use></svg></button>
          <button class="product-image-btn" type="button" data-product="${p.id}" aria-label="${safe(t('details'))}" style="all:unset;cursor:pointer;display:block;width:100%;height:100%"><img src="${p.image}" alt="${safe(p.name)}" loading="lazy"></button>
          <span class="product-badge">${safe(statusLabel(p.status))}</span>
        </div>
        <div class="product-info">
          <div class="product-meta"><span>${safe(collectionName(p.collection))}</span><span>${safe(categoryLabel(p.category))}</span></div>
          <h3>${safe(p.name)}</h3><p class="product-price">${p.config?safe(t('from'))+' ':''}${money(p.price)}</p>
          <div class="product-actions"><button class="btn btn-line" type="button" data-product="${p.id}">${safe(t('details'))}</button><button class="btn btn-primary" type="button" data-add-inquiry="${p.id}">${safe(t('addInquiry'))}</button></div>
        </div>
      </article>`;
    }).join('');
    bindProductActions();
  }

  function bindProductActions(){
    $$('[data-product]').forEach(b=>b.addEventListener('click',()=>openProduct(b.dataset.product)));
    $$('[data-favorite]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.favorite);}));
    $$('[data-add-inquiry]').forEach(b=>b.addEventListener('click',()=>addToInquiry(b.dataset.addInquiry)));
  }

  function renderCollections(){
    $('#collectionGrid').innerHTML=COLLECTIONS.map((c,i)=>`<article class="collection-card reveal visible" style="--image:url('${c.image}')"><small>0${i+1} · ${c.count} ${safe(t('products'))}</small><h3>${safe(c.name)}</h3><p>${safe(local(c.desc))}</p><button type="button" data-collection-jump="${c.id}">${safe(t('viewCollection'))} →</button></article>`).join('');
    $$('[data-collection-jump]').forEach(b=>b.addEventListener('click',()=>{state.collection=b.dataset.collectionJump;state.room='all';renderFilters();renderProducts();$('#shop').scrollIntoView({behavior:'smooth'});}));
  }

  function renderMaterials(){
    $('#swatchGrid').innerHTML=MATERIALS.map(m=>`<article class="swatch-card"><div class="swatch-sample" style="--swatch:${m.swatch}"></div><strong>${safe(m.name)}</strong><small>${safe(m.use)}</small></article>`).join('');
  }

  function renderProjects(){
    $('#projectGrid').innerHTML=`<article class="project-card reveal visible"><img src="${PROJECTS[0].image}" alt="${safe(PROJECTS[0].name)}" loading="lazy"><div class="project-card__copy"><div class="project-card__meta"><span>${safe(PROJECTS[0].meta)}</span></div><h3>${safe(PROJECTS[0].name)}</h3><p>${safe(local(PROJECTS[0].desc))}</p></div></article><div class="project-stack">${PROJECTS.slice(1).map(p=>`<article class="project-card reveal visible"><img src="${p.image}" alt="${safe(p.name)}" loading="lazy"><div class="project-card__copy"><div class="project-card__meta"><span>${safe(p.meta)}</span></div><h3>${safe(p.name)}</h3><p>${safe(local(p.desc))}</p></div></article>`).join('')}</div>`;
  }

  function renderFaq(){
    $('#faqList').innerHTML=FAQ.map((f,i)=>`<article class="faq-item"><button class="faq-question" type="button" aria-expanded="false" aria-controls="faq-${i}"><span>${safe(local(f.q))}</span><svg><use href="#i-chevron"></use></svg></button><div class="faq-answer" id="faq-${i}" hidden>${safe(local(f.a))}</div></article>`).join('');
    $$('.faq-question').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',String(!open));$('#'+b.getAttribute('aria-controls')).hidden=open;}));
  }

  function toggleFavorite(id){
    const i=state.favorites.indexOf(id); if(i>=0){state.favorites.splice(i,1);toast(t('removedFavorite'));}else{state.favorites.push(id);toast(t('addedFavorite'));}
    saveJSON(STORAGE.favorites,state.favorites); renderProducts(); renderFavorites(); updateCounts();
  }

  function renderFavorites(){
    const products=state.favorites.map(productById).filter(Boolean);
    $('#favoriteItems').innerHTML=products.length?products.map(p=>`<article class="drawer-item"><img src="${p.image}" alt="${safe(p.name)}"><div><h4>${safe(p.name)}</h4><p>${safe(collectionName(p.collection))} · ${safe(statusLabel(p.status))}</p><strong>${money(p.price)}</strong><div class="qty-row"><button type="button" data-fav-open="${p.id}" aria-label="Details"><svg><use href="#i-arrow"></use></svg></button><button type="button" data-fav-add="${p.id}" aria-label="Add to inquiry"><svg><use href="#i-plus"></use></svg></button></div></div><button class="drawer-item__remove" type="button" data-fav-remove="${p.id}" aria-label="Remove"><svg><use href="#i-trash"></use></svg></button></article>`).join(''):`<div class="drawer-empty"><svg><use href="#i-heart"></use></svg><strong>${safe(t('emptyFavorites'))}</strong><span>${safe(t('emptyFavoritesText'))}</span></div>`;
    $$('[data-fav-remove]').forEach(b=>b.addEventListener('click',()=>toggleFavorite(b.dataset.favRemove)));
    $$('[data-fav-open]').forEach(b=>b.addEventListener('click',()=>{closeDrawer($('#favoritesDrawer'));openProduct(b.dataset.favOpen);}));
    $$('[data-fav-add]').forEach(b=>b.addEventListener('click',()=>addToInquiry(b.dataset.favAdd)));
    updateCounts();
  }

  function defaultConfig(p){
    if(!p.config) return {price:p.price,summary:''};
    if(p.config==='luma'){
      if(p.id==='luma-sofa-chaise') return {size:'Chaise / 275 cm',fabric:'A Performance Weave',legs:'Ash',price:739000,summary:'Chaise / 275 cm · A Performance Weave · Ash'};
      return {size:'3-seat / 220 cm',fabric:'A Performance Weave',legs:'Ash',price:589000,summary:'3-seat / 220 cm · A Performance Weave · Ash'};
    }
    if(p.config==='arvo') return {width:'180 cm',finish:'Oak',price:359000,summary:'180 cm · Oak'};
    if(p.config==='kora') return {size:'160 × 200',option:'None',price:398000,summary:'160 × 200'};
    if(p.config==='vale') return {width:'240 cm',addons:[],price:642000,summary:'240 cm'};
    if(p.config==='grid') return {size:'2×3',addons:[],price:224000,summary:'2×3'};
    return {price:p.price,summary:''};
  }

  function addToInquiry(id, config=null){
    const p=productById(id); if(!p) return;
    const c=config||defaultConfig(p); const key=`${id}|${c.summary||''}`;
    const existing=state.inquiry.find(x=>x.key===key);
    if(existing) existing.qty+=1; else state.inquiry.push({key,id,qty:1,price:c.price||p.price,config:c.summary||''});
    saveJSON(STORAGE.inquiry,state.inquiry); renderInquiry(); updateCounts(); toast(t('addedInquiry'));
  }

  function renderInquiry(){
    const body=$('#inquiryItems');
    if(!state.inquiry.length){body.innerHTML=`<div class="drawer-empty"><svg><use href="#i-bag"></use></svg><strong>${safe(t('emptyInquiry'))}</strong><span>${safe(t('emptyInquiryText'))}</span></div>`;}
    else body.innerHTML=state.inquiry.map((item,index)=>{const p=productById(item.id);if(!p)return'';return `<article class="drawer-item"><img src="${p.image}" alt="${safe(p.name)}"><div><h4>${safe(p.name)}</h4><p>${safe(item.config||statusLabel(p.status))}</p><strong>${money(item.price)}</strong><div class="qty-row"><button type="button" data-qty="${index}" data-delta="-1" aria-label="Decrease"><svg><use href="#i-minus"></use></svg></button><span>${item.qty}</span><button type="button" data-qty="${index}" data-delta="1" aria-label="Increase"><svg><use href="#i-plus"></use></svg></button></div></div><button class="drawer-item__remove" type="button" data-remove-inquiry="${index}" aria-label="Remove"><svg><use href="#i-trash"></use></svg></button></article>`;}).join('');
    const total=state.inquiry.reduce((s,x)=>s+x.price*x.qty,0); $('#inquiryTotal').textContent=money(total);
    $$('[data-qty]').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.qty,d=+b.dataset.delta;state.inquiry[i].qty+=d;if(state.inquiry[i].qty<=0)state.inquiry.splice(i,1);saveJSON(STORAGE.inquiry,state.inquiry);renderInquiry();updateCounts();}));
    $$('[data-remove-inquiry]').forEach(b=>b.addEventListener('click',()=>{state.inquiry.splice(+b.dataset.removeInquiry,1);saveJSON(STORAGE.inquiry,state.inquiry);renderInquiry();updateCounts();toast(t('removedInquiry'));}));
    updateCounts();
  }

  function updateCounts(){ $('#favoriteCount').textContent=state.favorites.length; $('#inquiryCount').textContent=state.inquiry.reduce((s,x)=>s+x.qty,0); }

  function configHTML(p,c){
    if(!p.config) return '';
    if(p.config==='luma') return `<div class="config-box"><h3>${safe(t('configure'))}</h3><div class="config-grid"><label>${safe(ui('size'))}<select data-config="size"><option data-price="510000"${optionSelected('2-seat / 190 cm',c.size)}>2-seat / 190 cm</option><option data-price="589000"${optionSelected('3-seat / 220 cm',c.size)}>3-seat / 220 cm</option><option data-price="648000"${optionSelected('3-seat / 250 cm',c.size)}>3-seat / 250 cm</option><option data-price="739000"${optionSelected('Chaise / 275 cm',c.size)}>Chaise / 275 cm</option><option data-price="865000"${optionSelected('Corner / 295 × 220 cm',c.size)}>Corner / 295 × 220 cm</option></select></label><label>${safe(ui('fabric'))}<select data-config="fabric"><option data-add="0"${optionSelected('A Performance Weave',c.fabric)}>A Performance Weave</option><option data-add="48000"${optionSelected('B Textured Weave',c.fabric)}>B Textured Weave</option><option data-add="82000"${optionSelected('C Premium Bouclé',c.fabric)}>C Premium Bouclé</option></select></label><label>${safe(ui('legs'))}<select data-config="legs"><option data-add="0"${optionSelected('Ash',c.legs)}>Ash</option><option data-add="18000"${optionSelected('Black steel',c.legs)}>Black steel</option></select></label></div><div class="current-price"><span>${safe(t('currentPrice'))}</span><strong id="configuredPrice">${money(c.price)}</strong></div></div>`;
    if(p.config==='arvo') return `<div class="config-box"><h3>${safe(t('configure'))}</h3><div class="config-grid"><label>${safe(ui('width'))}<select data-config="width"><option data-price="329000"${optionSelected('160 cm',c.width)}>160 cm</option><option data-price="359000"${optionSelected('180 cm',c.width)}>180 cm</option><option data-price="389000"${optionSelected('200 cm',c.width)}>200 cm</option><option data-price="419000"${optionSelected('220 cm',c.width)}>220 cm</option></select></label><label>${safe(ui('finish'))}<select data-config="finish"><option data-add="0"${optionSelected('Oak',c.finish)}>Oak</option><option data-add="18000"${optionSelected('Smoked Oak',c.finish)}>Smoked Oak</option><option data-add="46000"${optionSelected('Walnut veneer',c.finish)}>Walnut veneer</option><option data-add="85000"${optionSelected('Solid ash top',c.finish)}>Solid ash top</option></select></label></div><div class="current-price"><span>${safe(t('currentPrice'))}</span><strong id="configuredPrice">${money(c.price)}</strong></div></div>`;
    if(p.config==='kora') return `<div class="config-box"><h3>${safe(t('configure'))}</h3><div class="config-grid"><label>${safe(ui('mattressSize'))}<select data-config="size"><option data-price="372000"${optionSelected('140 × 200',c.size)}>140 × 200</option><option data-price="398000"${optionSelected('160 × 200',c.size)}>160 × 200</option><option data-price="429000"${optionSelected('180 × 200',c.size)}>180 × 200</option></select></label><label>${safe(ui('options'))}<select data-config="option"><option data-add="0"${optionSelected('None',c.option)}>${safe(ui('none'))}</option><option data-add="64000"${optionSelected('Upholstered headboard',c.option)}>Upholstered headboard</option><option data-add="86000"${optionSelected('Lift storage',c.option)}>Lift storage</option><option data-add="138000"${optionSelected('Headboard + lift storage',c.option)}>Headboard + lift storage</option></select></label></div><div class="current-price"><span>${safe(t('currentPrice'))}</span><strong id="configuredPrice">${money(c.price)}</strong></div></div>`;
    if(p.config==='vale') return `<div class="config-box"><h3>${safe(t('configure'))}</h3><div class="config-grid"><label>${safe(ui('width'))}<select data-config="width"><option data-price="515000"${optionSelected('180 cm',c.width)}>180 cm</option><option data-price="642000"${optionSelected('240 cm',c.width)}>240 cm</option><option data-price="788000"${optionSelected('300 cm',c.width)}>300 cm</option></select></label><div class="config-checks"><label><input type="checkbox" data-addon="Mirrored door" data-add="42000"${optionChecked('Mirrored door',c.addons)}>Mirrored door +42,000</label><label><input type="checkbox" data-addon="Internal drawer module" data-add="29000"${optionChecked('Internal drawer module',c.addons)}>Internal drawer module +29,000</label><label><input type="checkbox" data-addon="Shoe shelf" data-add="18000"${optionChecked('Shoe shelf',c.addons)}>Shoe shelf +18,000</label><label><input type="checkbox" data-addon="Cable / light preparation" data-add="24000"${optionChecked('Cable / light preparation',c.addons)}>Cable / light preparation +24,000</label></div></div><div class="current-price"><span>${safe(t('currentPrice'))}</span><strong id="configuredPrice">${money(c.price)}</strong></div></div>`;
    if(p.config==='grid') return `<div class="config-box"><h3>${safe(t('configure'))}</h3><div class="config-grid"><label>${safe(ui('moduleSize'))}<select data-config="size"><option data-price="168000"${optionSelected('2×2',c.size)}>2×2</option><option data-price="224000"${optionSelected('2×3',c.size)}>2×3</option><option data-price="318000"${optionSelected('3×3',c.size)}>3×3</option></select></label><div class="config-checks"><label><input type="checkbox" data-addon="Door pair" data-add="21000"${optionChecked('Door pair',c.addons)}>Door pair +21,000</label><label><input type="checkbox" data-addon="Drawer module" data-add="28000"${optionChecked('Drawer module',c.addons)}>Drawer module +28,000</label><label><input type="checkbox" data-addon="Steel plinth" data-add="26000"${optionChecked('Steel plinth',c.addons)}>Steel plinth +26,000</label></div></div><div class="current-price"><span>${safe(t('currentPrice'))}</span><strong id="configuredPrice">${money(c.price)}</strong></div></div>`;
    return '';
  }

  function renderProductModal(id, preserve=false){
    const p=productById(id); if(!p)return; state.currentProduct=p; if(!preserve) state.currentConfig=defaultConfig(p); const c=state.currentConfig||defaultConfig(p);
    $('#productModalContent').innerHTML=`<div class="product-modal-grid"><div class="product-modal-media"><img src="${p.image}" alt="${safe(p.name)}"></div><div class="product-modal-info"><div class="product-modal-meta"><span>${safe(collectionName(p.collection))}</span><span>${safe(statusLabel(p.status))}</span><span>${safe(p.sku)}</span></div><h2 id="productModalTitle">${safe(p.name)}</h2><div class="product-modal-price">${p.config?safe(t('from'))+' ':''}${money(p.price)}</div><p class="product-modal-desc">${safe(local(p.desc))}</p><div class="spec-table"><div class="spec-row"><span>${safe(t('dimensions'))}</span><strong>${safe(p.dimensions)}</strong></div><div class="spec-row"><span>${safe(t('materials'))}</span><strong>${safe(p.materials)}</strong></div><div class="spec-row"><span>${safe(t('production'))}</span><strong>${safe(p.lead)}</strong></div><div class="spec-row"><span>${safe(t('collection'))}</span><strong>${safe(collectionName(p.collection))}</strong></div></div>${configHTML(p,c)}<div class="product-modal-actions"><button class="btn btn-line" type="button" id="modalFavorite">${safe(state.favorites.includes(p.id)?t('removeFavorite'):t('addFavorite'))}</button><button class="btn btn-primary" type="button" id="modalInquiry">${safe(p.config?t('configureRequest'):t('addInquiry'))}</button></div></div></div>`;
    if(p.config) bindConfigurator(p);
    $('#modalFavorite').addEventListener('click',()=>{toggleFavorite(p.id);renderProductModal(p.id,true);});
    $('#modalInquiry').addEventListener('click',()=>{addToInquiry(p.id,state.currentConfig||defaultConfig(p));closeModal($('#productModal'));openOrder('product');});
  }

  function bindConfigurator(p){
    const update=()=>{
      let c={};
      if(p.config==='luma'){
        const size=$('[data-config="size"]'),fabric=$('[data-config="fabric"]'),legs=$('[data-config="legs"]');
        c={size:size.value,fabric:fabric.value,legs:legs.value,price:+size.selectedOptions[0].dataset.price + +fabric.selectedOptions[0].dataset.add + +legs.selectedOptions[0].dataset.add}; c.summary=`${c.size} · ${c.fabric} · ${c.legs}`;
      }else if(p.config==='arvo'){
        const width=$('[data-config="width"]'),finish=$('[data-config="finish"]'); c={width:width.value,finish:finish.value,price:+width.selectedOptions[0].dataset.price + +finish.selectedOptions[0].dataset.add}; c.summary=`${c.width} · ${c.finish}`;
      }else if(p.config==='kora'){
        const size=$('[data-config="size"]'),option=$('[data-config="option"]'); c={size:size.value,option:option.value,price:+size.selectedOptions[0].dataset.price + +option.selectedOptions[0].dataset.add}; c.summary=`${c.size}${c.option!=='None'?' · '+c.option:''}`;
      }else if(p.config==='vale'){
        const width=$('[data-config="width"]'); const checks=$$('[data-addon]:checked'); const add=checks.reduce((s,x)=>s+(+x.dataset.add),0); const addons=checks.map(x=>x.dataset.addon); c={width:width.value,addons,price:+width.selectedOptions[0].dataset.price+add};c.summary=`${c.width}${addons.length?' · '+addons.join(' · '):''}`;
      }else if(p.config==='grid'){
        const size=$('[data-config="size"]'); const checks=$$('[data-addon]:checked'); const add=checks.reduce((s,x)=>s+(+x.dataset.add),0); const addons=checks.map(x=>x.dataset.addon); c={size:size.value,addons,price:+size.selectedOptions[0].dataset.price+add};c.summary=`${c.size}${addons.length?' · '+addons.join(' · '):''}`;
      }
      state.currentConfig=c; $('#configuredPrice').textContent=money(c.price);
    };
    $$('.config-box select,.config-box input').forEach(el=>el.addEventListener('change',update)); update();
  }

  function openProduct(id){ renderProductModal(id); openModal($('#productModal')); }
  function openModal(el){ el.classList.add('open'); el.setAttribute('aria-hidden','false'); document.body.classList.add('locked'); }
  function closeModal(el){ el.classList.remove('open'); el.setAttribute('aria-hidden','true'); if(!$('.modal.open')&&!$('.drawer.open'))document.body.classList.remove('locked'); }
  function openDrawer(el){ el.classList.add('open'); el.setAttribute('aria-hidden','false'); document.body.classList.add('locked'); }
  function closeDrawer(el){ el.classList.remove('open'); el.setAttribute('aria-hidden','true'); if(!$('.modal.open')&&!$('.drawer.open'))document.body.classList.remove('locked'); }

  function renderOrderSummary(){
    const target=$('#orderSummary');
    if(!state.inquiry.length){target.innerHTML=`<div class="order-summary-empty">${safe(t('emptyInquiryText'))}</div>`;return;}
    target.innerHTML=state.inquiry.map(item=>{const p=productById(item.id);return `<div class="order-summary-item"><strong>${safe(p?.name||item.id)} × ${item.qty}</strong><span>${safe(item.config||'')}<br>${money(item.price*item.qty)}</span></div>`;}).join('');
  }

  function openOrder(type='product'){
    $('#orderRequestType').value=type; $('#orderForm').hidden=false; $('#orderSuccess').hidden=true; renderOrderSummary(); openModal($('#orderModal'));
  }

  function saveRequest(payload){
    const all=readJSON(STORAGE.requests,[]); all.push(payload); saveJSON(STORAGE.requests,all.slice(-20));
  }

  function submitOrder(e){
    e.preventDefault(); const form=e.currentTarget; if(!form.reportValidity())return;
    const data=Object.fromEntries(new FormData(form).entries());
    const code=`TOV-${String(Date.now()).slice(-6)}`;
    saveRequest({id:code,kind:data.requestType||'product',createdAt:new Date().toISOString(),contact:data,items:state.inquiry});
    $('#requestCode').textContent=code; form.hidden=true; $('#orderSuccess').hidden=false;
    state.inquiry=[]; saveJSON(STORAGE.inquiry,state.inquiry); renderInquiry(); updateCounts();
  }

  function submitCustom(e){
    e.preventDefault(); const form=e.currentTarget; if(!form.reportValidity())return; const data=Object.fromEntries(new FormData(form).entries()); const code=`TOV-C-${String(Date.now()).slice(-6)}`; saveRequest({id:code,kind:'custom',createdAt:new Date().toISOString(),contact:data,items:[]}); form.reset(); toast(`${t('customSaved')} ${code}`);
  }

  function initControls(){
    $('#themeToggle').addEventListener('click',()=>{state.theme=state.theme==='dark'?'light':'dark';applyTheme();});
    $$('.lang-btn').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;applyLocale();}));
    $('#menuToggle').addEventListener('click',()=>{const open=$('#menuToggle').getAttribute('aria-expanded')==='true';$('#menuToggle').setAttribute('aria-expanded',String(!open));$('#mobileMenu').hidden=open;$('#menuToggle use').setAttribute('href',open?'#i-menu':'#i-close');});
    $$('#mobileMenu a,#mobileMenu button').forEach(el=>el.addEventListener('click',()=>{$('#mobileMenu').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false');$('#menuToggle use').setAttribute('href','#i-menu');}));
    $$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>$(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'})));
    $('#productSearch').addEventListener('input',e=>{state.search=e.target.value;renderProducts();});
    $('#configurableOnly').addEventListener('change',e=>{state.configurable=e.target.checked;renderProducts();});
    $('#inStockOnly').addEventListener('change',e=>{state.stock=e.target.checked;renderProducts();});
    $('#sortSelect').addEventListener('change',e=>{state.sort=e.target.value;renderProducts();});
    $('#clearFilters').addEventListener('click',()=>{state.room='all';state.collection='all';state.search='';state.configurable=false;state.stock=false;state.sort='featured';$('#productSearch').value='';$('#configurableOnly').checked=false;$('#inStockOnly').checked=false;$('#sortSelect').value='featured';renderFilters();renderProducts();});
    $('#favoritesOpen').addEventListener('click',()=>openDrawer($('#favoritesDrawer'))); $('#inquiryOpen').addEventListener('click',()=>openDrawer($('#inquiryDrawer')));
    $$('[data-close-drawer]').forEach(b=>b.addEventListener('click',()=>closeDrawer($('#inquiryDrawer')))); $$('[data-close-favorites]').forEach(b=>b.addEventListener('click',()=>closeDrawer($('#favoritesDrawer'))));
    $$('[data-close-product]').forEach(b=>b.addEventListener('click',()=>closeModal($('#productModal')))); $$('[data-close-order]').forEach(b=>b.addEventListener('click',()=>closeModal($('#orderModal'))));
    $$('[data-open-order]').forEach(b=>b.addEventListener('click',()=>openOrder('general'))); $$('[data-open-trade]').forEach(b=>b.addEventListener('click',()=>openOrder('trade'))); $$('[data-open-b2b]').forEach(b=>b.addEventListener('click',()=>openOrder('b2b')));
    $('#continueOrder').addEventListener('click',()=>{closeDrawer($('#inquiryDrawer'));openOrder('product');});
    $('#clearInquiry').addEventListener('click',()=>{state.inquiry=[];saveJSON(STORAGE.inquiry,state.inquiry);renderInquiry();updateCounts();});
    $('#customFormToggle').addEventListener('click',()=>{const wrap=$('#customFormWrap');wrap.hidden=!wrap.hidden;if(!wrap.hidden)setTimeout(()=>wrap.scrollIntoView({behavior:'smooth',block:'center'}),20);});
    $('#orderForm').addEventListener('submit',submitOrder); $('#customProjectForm').addEventListener('submit',submitCustom);
    document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;$$('.modal.open').forEach(closeModal);$$('.drawer.open').forEach(closeDrawer);});
  }

  function initReveal(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){$$('.reveal').forEach(x=>x.classList.add('visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.08});
    $$('.reveal').forEach(el=>io.observe(el));
  }

  initControls(); applyLocale(); updateCounts(); initReveal();
})();
