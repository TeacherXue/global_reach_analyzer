// Yellow Pages Data — 各国客户开发相关网站黄页
// 按 ISO3 国家代码索引，每个国家包含分类的网站列表

export interface YellowPagesEntry {
    name: string;
    url: string;
    description: string;
    tags?: string[];
}

export interface YellowPagesCategory {
    id: string;
    icon: string;
    name: string;
    nameEn: string;
}

// 全局分类定义 — 可扩展
export const YELLOW_PAGES_CATEGORIES: YellowPagesCategory[] = [
    { id: 'company_search', icon: '🔎', name: '企业搜索', nameEn: 'Company Search' },
    { id: 'b2b', icon: '🏢', name: 'B2B 平台', nameEn: 'B2B Platforms' },
    { id: 'registry', icon: '📋', name: '工商注册查询', nameEn: 'Business Registry' },
    { id: 'customs', icon: '🚢', name: '海关 / 进出口数据', nameEn: 'Customs & Trade Data' },
    { id: 'social', icon: '🤝', name: '行业社交', nameEn: 'Professional Social' },
    { id: 'exhibition', icon: '🎪', name: '展会信息', nameEn: 'Trade Shows' },
    { id: 'media', icon: '📰', name: '行业媒体', nameEn: 'Industry Media' },
    { id: 'chamber', icon: '🏛️', name: '商会 / 贸促机构', nameEn: 'Chambers & Trade Orgs' },
    { id: 'govt', icon: '🏦', name: '政府 / 法规', nameEn: 'Government & Regulations' },
];

// 按国家 ISO3 代码存储的黄页数据
export const YELLOW_PAGES_DATA: Record<string, Record<string, YellowPagesEntry[]>> = {

    // ===== 美国 =====
    USA: {
        company_search: [
            { name: 'Google Maps', url: 'https://www.google.com/maps', description: '按行业+地区搜索本地公司，查看评价和联系方式', tags: ['免费'] },
            { name: 'Yellow Pages USA', url: 'https://www.yellowpages.com', description: '美国黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Manta', url: 'https://www.manta.com', description: '美国中小企业搜索引擎，按行业/地区查找', tags: ['免费'] },
            { name: 'Yelp', url: 'https://www.yelp.com', description: '按行业搜索商家，含用户评价', tags: ['免费'] },
            { name: 'ZoomInfo', url: 'https://www.zoominfo.com', description: '企业联系人数据库，筛选行业/规模/职位', tags: ['付费'] },
            { name: 'D&B (Dun & Bradstreet)', url: 'https://www.dnb.com', description: '全球企业数据库，按行业SIC/NAICS代码搜索', tags: ['付费'] },
            { name: 'Hoovers', url: 'https://www.hoovers.com', description: 'D&B旗下，按行业/收入/员工数筛选企业', tags: ['付费'] },
            { name: 'OpenCorporates', url: 'https://opencorporates.com', description: '全球最大开放企业数据库，可按行业搜索', tags: ['免费'] },
            { name: 'BBB (Better Business Bureau)', url: 'https://www.bbb.org', description: '按行业/地区搜索认证企业', tags: ['免费'] },
            { name: 'Kompass USA', url: 'https://us.kompass.com', description: '按产品/服务分类搜索美国企业', tags: ['免费搜索'] },
            { name: 'USImportersList', url: 'https://www.usimporterslist.com', description: '直接找美国进口商，适合批量开发', tags: ['免费'] },
            { name: 'BusinessList', url: 'https://www.businesslist.com/us', description: '按州、行业、规模找美国公司', tags: ['免费'] },
            { name: 'CorpNet', url: 'https://www.corpnet.com', description: '查美国公司信息，判断企业实力', tags: ['免费'] },
            { name: 'AmericanImportExporters', url: 'https://www.americanimportexporters.com', description: '美国进出口商信息，可直接联系', tags: ['免费'] },
            { name: 'DistributorNews', url: 'https://www.distributornews.com', description: '美国分销商数据库，适合长期合作', tags: ['免费'] },
        ],
        b2b: [
            { name: 'ThomasNet', url: 'https://www.thomasnet.com', description: '美国工业采购第一站，机械/五金/配件/加工类精准', tags: ['免费搜索'] },
            { name: 'Amazon Business', url: 'https://business.amazon.com', description: '亚马逊 B2B 采购平台', tags: ['需注册'] },
            { name: 'GlobalSpec', url: 'https://www.globalspec.com', description: '工程和工业技术产品搜索引擎' },
            { name: 'Manufacturer.com', url: 'https://www.manufacturer.com', description: '美国中小采购商聚集地，日用/家居/五金询盘多', tags: ['免费'] },
            { name: 'WholesaleCentral', url: 'https://www.wholesalecentral.com', description: '美国批发商平台，适合百货/礼品/家居类', tags: ['免费'] },
            { name: 'Europages USA', url: 'https://www.europages.co.uk/usa', description: '覆盖大量美国进口商，可按行业/州/需求筛选', tags: ['免费搜索'] },
            { name: 'TopTenWholesale', url: 'https://www.toptenwholesale.com', description: '美国批发资源库，类目全，适合快速找潜在客户', tags: ['免费'] },
            { name: 'BuyerZone', url: 'https://www.buyerzone.com', description: '美国中小企采购平台，适合小件/标准化产品', tags: ['免费'] },
            { name: 'GlobalSources', url: 'https://www.globalsources.com', description: '美国采购商常逛，偏中高端产品', tags: ['免费搜索'] },
        ],
        customs: [
            { name: 'ImportGenius', url: 'https://www.importgenius.com', description: '美国海关进出口数据查询', tags: ['付费'] },
            { name: 'USA Trade Online', url: 'https://usatrade.census.gov', description: '美国人口普查局官方贸易数据', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '全球最大职业社交平台，开发客户首选' },
            { name: 'Alignable', url: 'https://www.alignable.com', description: '美国中小企业社交平台' },
        ],
        exhibition: [
            { name: 'TSNN', url: 'https://www.tsnn.com', description: '北美展会搜索引擎', tags: ['免费'] },
            { name: 'ExpoDataBase', url: 'https://www.expodatabase.com', description: '全球展会数据库' },
            { name: 'USATradeShows', url: 'https://www.usatradeshows.com', description: '全美展会大全，找到展会=找到精准采购商', tags: ['免费'] },
        ],
        media: [
            { name: 'HardwareAndTools', url: 'https://www.hardwareandtools.com', description: '五金工具类垂直平台，客户非常对口', tags: ['行业垂直'] },
            { name: 'HomeAccentsToday', url: 'https://www.homeaccentstoday.com', description: '家居/装饰/园艺类美国零售商资源', tags: ['行业垂直'] },
            { name: 'FashionScoop', url: 'https://www.fashionscoop.com', description: '服装/鞋帽/配饰类美国采购渠道', tags: ['行业垂直'] },
            { name: 'PackagingDigest', url: 'https://www.packagingdigest.com', description: '包装/包材类美国企业名录', tags: ['行业垂直'] },
            { name: 'AutoServiceWorld', url: 'https://www.autoserviceworld.com', description: '汽车配件/维修/改装类美国客户', tags: ['行业垂直'] },
            { name: 'PetProductNews', url: 'https://www.petproductnews.com', description: '宠物用品精准渠道，市场大竞争小', tags: ['行业垂直'] },
        ],
        chamber: [
            { name: 'U.S. Chamber of Commerce', url: 'https://www.uschamber.com', description: '美国商会' },
            { name: 'AmCham China', url: 'https://www.amchamchina.org', description: '中国美国商会，中美贸易桥梁' },
            { name: 'NAW', url: 'https://www.naw.org', description: '美国批发商协会，含金量高', tags: ['行业协会'] },
        ],
        govt: [
            { name: 'California Trade', url: 'https://www.california.gov/trade', description: '加州贸易资源，美国最大进口州之一', tags: ['官方'] },
            { name: 'Texas Trade', url: 'https://www.texas.gov/trade', description: '德州企业资源，工业/能源/机械需求大', tags: ['官方'] },
            { name: 'Florida Trade', url: 'https://www.floridatrade.com', description: '旅游/家居/电子/礼品类需求旺', tags: ['官方'] },
            { name: 'New York Trade', url: 'https://www.ny.gov/trade', description: '纽约商贸资源，时尚/百货/美妆集中', tags: ['官方'] },
            { name: 'Illinois Trade', url: 'https://www.illinois.gov/trade', description: '美国中部商贸枢纽，批发商超多', tags: ['官方'] },
            { name: 'International Trade Administration', url: 'https://www.trade.gov', description: '美国国际贸易管理局，提供出口指导和市场分析', tags: ['官方'] },
        ],
    },

    // ===== 英国 =====
    GBR: {
        b2b: [
            { name: 'Europages', url: 'https://www.europages.co.uk', description: '欧洲 B2B 采购平台，300万+ 企业', tags: ['免费搜索'] },
            { name: 'Kompass UK', url: 'https://gb.kompass.com', description: '全球企业目录，可按行业/产品搜索' },
            { name: 'eSources', url: 'https://www.esources.co.uk', description: '英国批发供应商和经销商B2B平台', tags: ['部分免费'] },
        ],
        company_search: [
            { name: 'Yell', url: 'https://www.yell.com', description: '英国黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Companies House', url: 'https://find-and-update.company-information.service.gov.uk/advanced-search', description: '按SIC行业代码搜索所有注册企业', tags: ['免费', '官方'] },
            { name: 'Kompass UK', url: 'https://gb.kompass.com', description: '按产品/服务分类搜索英国企业', tags: ['免费搜索'] },
            { name: 'Endole', url: 'https://www.endole.co.uk', description: '按行业/地区/规模筛选英国企业', tags: ['部分免费'] },
            { name: 'Thomson Local', url: 'https://www.thomsonlocal.com', description: '英国本地商业搜索', tags: ['免费'] },
            { name: 'Checkatrade', url: 'https://www.checkatrade.com', description: '按行业搜索已认证的英国企业', tags: ['免费'] },
            { name: 'FreeIndex', url: 'https://www.freeindex.co.uk', description: '英国企业按类别搜索', tags: ['免费'] },
            { name: 'Cylex UK', url: 'https://www.cylex-uk.co.uk', description: '英国本地企业目录，含评价和地图定位', tags: ['免费'] },
            { name: '192.com', url: 'https://www.192.com', description: '支持企业名称、员工名称、董事等多维搜索', tags: ['部分免费'] },
        ],
        customs: [
            { name: 'UK Trade Info', url: 'https://www.uktradeinfo.com', description: '英国海关总署贸易数据', tags: ['免费', '官方'] },
            { name: 'Fob AI (超迹)', url: 'https://fob.ai.cc', description: '创贸集团旗下AI外贸数据平台，支持海关数据查询', tags: ['付费'] },
        ],
        social: [
            { name: 'LinkedIn UK', url: 'https://www.linkedin.com', description: '英国职场主流社交平台' },
        ],
        exhibition: [
            { name: 'EventsEye UK', url: 'https://www.eventseye.com/fairs/c_united-kingdom.html', description: '英国展会日程查询' },
        ],
        chamber: [
            { name: 'British Chambers of Commerce', url: 'https://www.britishchambers.org.uk', description: '英国商会' },
            { name: 'CBBC', url: 'https://www.cbbc.org', description: '英中贸易协会' },
        ],
    },

    // ===== 德国 =====
    DEU: {
        b2b: [
            { name: 'WLW (Wer Liefert Was)', url: 'https://www.wlw.de', description: '德国最大 B2B 平台，"谁提供什么"', tags: ['免费搜索'] },
            { name: 'Europages', url: 'https://www.europages.com', description: '欧洲 B2B 平台，适合找德国制造商' },
            { name: 'IndustryStock', url: 'https://www.industrystock.com', description: '工业品 B2B 搜索平台' },
        ],
        company_search: [
            { name: 'Gelbe Seiten', url: 'https://www.gelbeseiten.de', description: '德国黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Das Örtliche', url: 'https://www.dasoertliche.de', description: '德国电话簿/企业搜索', tags: ['免费'] },
            { name: 'WLW', url: 'https://www.wlw.de', description: '"谁提供什么"，按产品/服务搜索德国供应商', tags: ['免费搜索'] },
            { name: 'Firmenwissen', url: 'https://www.firmenwissen.de', description: '按行业/地区/规模搜索德国企业', tags: ['部分免费'] },
            { name: 'Kompass DE', url: 'https://de.kompass.com', description: '按产品/服务分类搜索德国企业', tags: ['免费搜索'] },
            { name: 'Handelsregister', url: 'https://www.handelsregister.de', description: '德国商业登记处，按行业查询注册企业', tags: ['官方'] },
            { name: 'North Data', url: 'https://www.northdata.com', description: '德国企业数据，按行业/关联关系搜索', tags: ['部分免费'] },
            { name: 'Firmenwissen (intl)', url: 'https://www.firmenwissen.com', description: '德语区企业信息国际版，含信用评级', tags: ['部分免费'] },
        ],
        social: [
            { name: 'XING', url: 'https://www.xing.com', description: '德语区主流职业社交平台（德版 LinkedIn）' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '国际职业社交，在德国也很普及' },
        ],
        exhibition: [
            { name: 'AUMA', url: 'https://www.auma.de', description: '德国展会委员会，收录所有德国展会', tags: ['官方'] },
            { name: 'Messe Frankfurt', url: 'https://www.messefrankfurt.com', description: '法兰克福展览集团，全球最大展会组织者之一' },
        ],
        chamber: [
            { name: 'AHK China', url: 'https://china.ahk.de', description: '德国工商大会中国代表处' },
            { name: 'GTAI', url: 'https://www.gtai.de', description: '德国贸易与投资署' },
        ],
    },

    // ===== 法国 =====
    FRA: {
        b2b: [
            { name: 'Europages France', url: 'https://www.europages.fr', description: '欧洲 B2B 平台法国站' },
            { name: 'Kompass France', url: 'https://fr.kompass.com', description: '法国企业目录' },
        ],
        company_search: [
            { name: 'Pages Jaunes', url: 'https://www.pagesjaunes.fr', description: '法国黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Societe.com', url: 'https://www.societe.com', description: '按行业NAF代码搜索法国企业', tags: ['免费'] },
            { name: 'Kompass France', url: 'https://fr.kompass.com', description: '按产品/服务分类搜索法国企业', tags: ['免费搜索'] },
            { name: 'Infogreffe', url: 'https://www.infogreffe.fr', description: '法国商事法院，按行业搜索注册企业', tags: ['官方'] },
            { name: 'Annuaire Entreprises', url: 'https://annuaire-entreprises.data.gouv.fr', description: '法国政府官方企业搜索，可按行业筛选', tags: ['免费', '官方'] },
        ],
        social: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '法国主流职业社交平台' },
            { name: 'Viadeo', url: 'https://www.viadeo.com', description: '法国本土职业社交（使用减少中）' },
        ],
        exhibition: [
            { name: 'Salons Online', url: 'https://www.salons-online.com', description: '法国展会信息平台' },
        ],
        chamber: [
            { name: 'CCI France Chine', url: 'https://www.ccifc.org', description: '法中工商会' },
            { name: 'Business France', url: 'https://www.businessfrance.fr', description: '法国商务投资署' },
        ],
    },

    // ===== 日本 =====
    JPN: {
        b2b: [
            { name: 'Alibaba Japan', url: 'https://www.alibaba.co.jp', description: '阿里巴巴日本站' },
            { name: 'JETRO TTPP', url: 'https://www.jetro.go.jp/ttpp', description: 'JETRO 贸易配对服务', tags: ['免费', '官方'] },
            { name: 'ipros', url: 'https://www.ipros.jp', description: '日本制造业 B2B 平台（日语）' },
        ],
        company_search: [
            { name: 'iタウンページ', url: 'https://itp.ne.jp', description: 'NTT日本电话黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'ipros', url: 'https://www.ipros.jp', description: '日本制造业企业搜索，按产品/技术分类', tags: ['免费'] },
            { name: 'EDINET', url: 'https://disclosure.edinet-fsa.go.jp', description: '日本上市企业按行业搜索', tags: ['免费', '官方'] },
            { name: '帝国データバンク', url: 'https://www.tdb.co.jp', description: '日本最大企业信用库，按行业/地区搜索', tags: ['付费'] },
            { name: 'Baseconnect', url: 'https://baseconnect.in', description: '日本企业搜索，可按行业/地区/规模筛选', tags: ['部分免费'] },
            { name: 'マピオン電話帳', url: 'https://www.mapion.co.jp/phonebook', description: '日本电话帐企业搜索', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn Japan', url: 'https://jp.linkedin.com', description: '日本 LinkedIn（使用率不如欧美）' },
            { name: 'Eight', url: 'https://8card.net', description: '日本名片管理和商务社交 App' },
        ],
        exhibition: [
            { name: 'JETRO Events', url: 'https://www.jetro.go.jp/events', description: 'JETRO 展会及商务活动日程', tags: ['官方'] },
            { name: 'Japan Messe', url: 'https://www.eventseye.com/fairs/c_japan.html', description: '日本展会搜索' },
        ],
        chamber: [
            { name: 'JETRO', url: 'https://www.jetro.go.jp', description: '日本贸易振兴机构', tags: ['官方'] },
            { name: 'CCCJ', url: 'https://www.cccj.jp', description: '日本中华总商会' },
        ],
    },

    // ===== 韩国 =====
    KOR: {
        b2b: [
            { name: 'EC21', url: 'https://www.ec21.com', description: '韩国最大 B2B 平台', tags: ['免费搜索'] },
            { name: 'TradeKorea', url: 'https://www.tradekorea.com', description: 'KITA 官方 B2B 平台', tags: ['官方'] },
            { name: 'Made-in-Korea', url: 'https://www.buykorea.org', description: 'KOTRA 韩国采购平台' },
        ],
        company_search: [
            { name: 'Naver Map', url: 'https://map.naver.com', description: '韩国最常用地图，按行业搜索本地企业', tags: ['免费'] },
            { name: 'DART', url: 'https://dart.fss.or.kr', description: '韩国上市企业按行业搜索', tags: ['免费', '官方'] },
            { name: 'CRETOP', url: 'https://www.cretop.com', description: '韩国企业信用查询，按行业分类', tags: ['部分免费'] },
            { name: 'KED (Korea Enterprise Data)', url: 'https://www.ked.co.kr', description: '韩国企业数据，按行业/规模搜索', tags: ['付费'] },
            { name: 'KISVALUE', url: 'https://www.kisvalue.com', description: '韩国企业财务数据，按行业分类', tags: ['付费'] },
            { name: '사람인', url: 'https://www.saramin.co.kr', description: '韩国招聘网站，可按行业搜索企业信息', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '韩国职场社交' },
            { name: 'KakaoTalk', url: 'https://www.kakaocorp.com', description: '韩国国民 IM，商务也常用' },
        ],
        exhibition: [
            { name: 'COEX', url: 'https://www.coex.co.kr', description: '首尔 COEX 会展中心' },
            { name: 'KINTEX', url: 'https://www.kintex.com', description: '京畿道国际展览中心' },
        ],
        chamber: [
            { name: 'KOTRA', url: 'https://www.kotra.or.kr', description: '韩国贸易投资振兴公社', tags: ['官方'] },
            { name: 'KITA', url: 'https://www.kita.net', description: '韩国国际贸易协会' },
        ],
    },

    // ===== 印度 =====
    IND: {
        b2b: [
            { name: 'IndiaMART', url: 'https://www.indiamart.com', description: '印度最大 B2B 平台，6300万+ 买家', tags: ['免费搜索'] },
            { name: 'TradeIndia', url: 'https://www.tradeindia.com', description: '印度 B2B 电商平台' },
            { name: 'ExportersIndia', url: 'https://www.exportersindia.com', description: '印度出口商目录' },
        ],
        company_search: [
            { name: 'Justdial', url: 'https://www.justdial.com', description: '印度最大本地商业搜索，按行业/城市查找', tags: ['免费'] },
            { name: 'Sulekha', url: 'https://www.sulekha.com', description: '印度企业服务搜索平台', tags: ['免费'] },
            { name: 'IndiaMART', url: 'https://www.indiamart.com', description: '按产品/行业搜索印度制造商和供应商', tags: ['免费搜索'] },
            { name: 'MCA Portal', url: 'https://www.mca.gov.in', description: '按行业代码搜索印度注册企业', tags: ['免费', '官方'] },
            { name: 'Zauba Corp', url: 'https://www.zaubacorp.com', description: '按行业/地区搜索印度企业', tags: ['免费'] },
            { name: 'Fundoodata', url: 'https://www.fundoodata.com', description: '印度企业数据库，按行业/规模/城市筛选', tags: ['付费'] },
            { name: 'Yellow Pages India', url: 'https://www.yellowpages.co.in', description: '印度黄页，按行业分类搜索', tags: ['免费'] },
        ],
        customs: [
            { name: 'Zauba', url: 'https://www.zauba.com', description: '印度海关进出口数据查询', tags: ['部分免费'] },
            { name: 'InfodriveIndia', url: 'https://www.infodriveindia.com', description: '印度贸易数据平台' },
        ],
        social: [
            { name: 'LinkedIn India', url: 'https://in.linkedin.com', description: '印度职场社交，渗透率高' },
        ],
        chamber: [
            { name: 'FICCI', url: 'https://www.ficci.in', description: '印度工商联合会' },
            { name: 'CII', url: 'https://www.cii.in', description: '印度工业联合会' },
        ],
    },

    // ===== 巴西 =====
    BRA: {
        b2b: [
            { name: 'Mercado Livre', url: 'https://www.mercadolivre.com.br', description: '拉美最大电商平台巴西站' },
            { name: 'SoloStocks Brazil', url: 'https://www.solostocks.com.br', description: '巴西 B2B 供需平台' },
        ],
        company_search: [
            { name: 'Telelistas', url: 'https://www.telelistas.net', description: '巴西黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Guia Mais', url: 'https://www.guiamais.com.br', description: '巴西企业搜索平台，按行业/地区', tags: ['免费'] },
            { name: 'Receita Federal', url: 'https://servicos.receita.fazenda.gov.br', description: '按CNAE行业代码搜索巴西企业', tags: ['免费', '官方'] },
            { name: 'CNPJA', url: 'https://cnpja.com', description: '巴西企业信息查询，可按行业筛选', tags: ['部分免费'] },
            { name: 'Econodata', url: 'https://www.econodata.com.br', description: '巴西B2B企业数据库，按行业/规模搜索', tags: ['付费'] },
        ],
        customs: [
            { name: 'Comex Stat', url: 'https://comexstat.mdic.gov.br', description: '巴西外贸统计数据', tags: ['免费', '官方'] },
        ],
        social: [
            { name: 'LinkedIn Brasil', url: 'https://br.linkedin.com', description: '巴西 LinkedIn' },
        ],
        chamber: [
            { name: 'CCBC', url: 'https://www.camarabrasilchina.com.br', description: '巴中工商总会' },
            { name: 'ApexBrasil', url: 'https://www.apexbrasil.com.br', description: '巴西贸易投资促进局' },
            { name: 'Portal da Indústria', url: 'https://www.portaldaindustria.com.br', description: '巴西工业联合会门户，含SESI/SENAI/IEL资源', tags: ['官方'] },
        ],
    },

    // ===== 俄罗斯 =====
    RUS: {
        b2b: [
            { name: 'Tiu.ru', url: 'https://tiu.ru', description: '俄罗斯 B2B/B2C 平台' },
            { name: 'Pulscen', url: 'https://pulscen.ru', description: '俄罗斯工业品 B2B 平台' },
        ],
        company_search: [
            { name: '2GIS', url: 'https://2gis.ru', description: '俄罗斯最流行的企业地图搜索，按行业分类', tags: ['免费'] },
            { name: 'Yandex Maps', url: 'https://yandex.ru/maps', description: 'Yandex地图企业搜索，按行业/地区', tags: ['免费'] },
            { name: 'Rusprofile', url: 'https://www.rusprofile.ru', description: '按行业OKVED代码搜索俄罗斯企业', tags: ['免费'] },
            { name: 'SPARK-Interfax', url: 'https://www.spark-interfax.ru', description: '俄罗斯最大企业数据库，按行业精准搜索', tags: ['付费'] },
            { name: 'EGRUL', url: 'https://egrul.nalog.ru', description: '俄罗斯联邦税务局企业登记查询', tags: ['免费', '官方'] },
            { name: 'Spravker', url: 'https://spravker.ru', description: '俄罗斯企业目录，按行业/城市搜索', tags: ['免费'] },
            { name: 'Cataloxy', url: 'https://www.cataloxy.ru', description: '俄罗斯企业分类目录，含企业评价与联系方式', tags: ['免费'] },
        ],
        customs: [
            { name: 'Russian Customs Data', url: 'https://customs.gov.ru', description: '俄罗斯海关总署', tags: ['官方'] },
        ],
        social: [
            { name: 'VKontakte (VK)', url: 'https://vk.com', description: '俄罗斯最大社交平台，部分用于商务' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com', description: '已在俄受限，但仍有使用' },
        ],
        chamber: [
            { name: 'CCI Russia', url: 'https://tpprf.ru', description: '俄罗斯工商会' },
        ],
    },

    // ===== 澳大利亚 =====
    AUS: {
        b2b: [
            { name: 'Australianmade.com.au', url: 'https://www.australianmade.com.au', description: '澳大利亚制造产品目录' },
        ],
        company_search: [
            { name: 'Yellow Pages Australia', url: 'https://www.yellowpages.com.au', description: '澳大利亚黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'True Local', url: 'https://www.truelocal.com.au', description: '澳洲本地企业搜索', tags: ['免费'] },
            { name: 'Hotfrog Australia', url: 'https://www.hotfrog.com.au', description: '按行业搜索澳洲企业', tags: ['免费'] },
            { name: 'ABR (ABN Lookup)', url: 'https://abr.business.gov.au', description: '按行业代码搜索澳洲注册企业', tags: ['免费', '官方'] },
            { name: 'ASIC Connect', url: 'https://connectonline.asic.gov.au', description: '澳洲证券委企业搜索', tags: ['官方'] },
            { name: 'Kompass Australia', url: 'https://au.kompass.com', description: '按产品/服务分类搜索澳洲企业', tags: ['免费搜索'] },
            { name: 'White Pages AU', url: 'https://www.whitepages.com.au', description: '澳大利亚白页，支持个人和企业搜索', tags: ['免费'] },
            { name: 'HiPages', url: 'https://www.hipages.com.au', description: '澳洲#1家居装修和服务商对接平台', tags: ['免费'] },
            { name: 'Word of Mouth', url: 'https://www.wordofmouth.com.au', description: '澳洲口碑推荐平台，含真实用户评价', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn Australia', url: 'https://au.linkedin.com', description: '澳大利亚最常用的职业社交' },
        ],
        exhibition: [
            { name: 'ExpoNet Australia', url: 'https://www.eventseye.com/fairs/c_australia.html', description: '澳大利亚展会搜索' },
        ],
        chamber: [
            { name: 'Austrade', url: 'https://www.austrade.gov.au', description: '澳大利亚贸易投资委员会', tags: ['官方'] },
            { name: 'ACBC', url: 'https://www.acbc.com.au', description: '澳中商业理事会' },
        ],
    },

    // ===== 意大利 =====
    ITA: {
        b2b: [
            { name: 'Europages Italy', url: 'https://www.europages.it', description: '欧洲 B2B 平台意大利站' },
            { name: 'Kompass Italy', url: 'https://it.kompass.com', description: '意大利企业目录' },
        ],
        company_search: [
            { name: 'Pagine Gialle', url: 'https://www.paginegialle.it', description: '意大利黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Kompass Italy', url: 'https://it.kompass.com', description: '按产品/服务分类搜索意大利企业', tags: ['免费搜索'] },
            { name: 'Registro Imprese', url: 'https://www.registroimprese.it', description: '按ATECO行业代码搜索注册企业', tags: ['官方'] },
            { name: 'Infocamere', url: 'https://www.infocamere.it', description: '意大利商会企业信息系统', tags: ['官方'] },
        ],
        social: [
            { name: 'LinkedIn Italia', url: 'https://it.linkedin.com', description: '意大利职业社交' },
        ],
        chamber: [
            { name: 'ICE/ITA', url: 'https://www.ice.it', description: '意大利对外贸易委员会', tags: ['官方'] },
            { name: 'CCIC', url: 'https://www.cameraitacina.com', description: '意大利中国商会' },
        ],
    },

    // ===== 西班牙 =====
    ESP: {
        b2b: [
            { name: 'SoloStocks', url: 'https://www.solostocks.com', description: '西班牙 B2B 平台' },
            { name: 'Europages Spain', url: 'https://www.europages.es', description: '欧洲 B2B 平台西班牙站' },
        ],
        company_search: [
            { name: 'Páginas Amarillas', url: 'https://www.paginasamarillas.es', description: '西班牙黄页，按行业分类搜索企业', tags: ['免费'] },
            { name: 'Kompass Spain', url: 'https://es.kompass.com', description: '按产品/服务分类搜索西班牙企业', tags: ['免费搜索'] },
            { name: 'Registro Mercantil', url: 'https://www.registradores.org', description: '按行业搜索西班牙注册企业', tags: ['官方'] },
            { name: 'eInforma', url: 'https://www.einforma.com', description: '西班牙企业信息搜索，按行业分类', tags: ['部分免费'] },
        ],
        social: [
            { name: 'LinkedIn España', url: 'https://es.linkedin.com', description: '西班牙 LinkedIn' },
        ],
        chamber: [
            { name: 'ICEX', url: 'https://www.icex.es', description: '西班牙对外贸易投资促进局', tags: ['官方'] },
        ],
    },

    // ===== 墨西哥 =====
    MEX: {
        b2b: [
            { name: 'Mercado Libre México', url: 'https://www.mercadolibre.com.mx', description: '拉美最大电商平台墨西哥站' },
        ],
        company_search: [
            { name: 'Sección Amarilla', url: 'https://www.seccionamarilla.com.mx', description: '墨西哥黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'INEGi DENUE', url: 'https://www.inegi.org.mx/app/mapa/denue', description: '墨西哥统计局企业地图，按行业/地区搜索', tags: ['免费', '官方'] },
            { name: 'Kompass Mexico', url: 'https://mx.kompass.com', description: '按产品/服务分类搜索墨西哥企业', tags: ['免费搜索'] },
            { name: 'SAT (Consulta RFC)', url: 'https://www.sat.gob.mx', description: '墨西哥税务局企业查询', tags: ['官方'] },
        ],
        social: [
            { name: 'LinkedIn México', url: 'https://mx.linkedin.com', description: '墨西哥 LinkedIn' },
        ],
        chamber: [
            { name: 'ProMéxico / SE', url: 'https://www.gob.mx/se', description: '墨西哥经济部' },
            { name: 'CANACINTRA', url: 'https://canacintra.org.mx', description: '墨西哥全国工业商会' },
        ],
    },

    // ===== 土耳其 =====
    TUR: {
        b2b: [
            { name: 'Turkishexporter.net', url: 'https://www.turkishexporter.net', description: '土耳其出口商平台' },
            { name: 'Tradekey Turkey', url: 'https://turkey.tradekey.com', description: 'TradeKey 土耳其站' },
        ],
        company_search: [
            { name: 'Altın Sayfalar', url: 'https://www.altinsayfalar.com', description: '土耳其黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'Turkishexporter', url: 'https://www.turkishexporter.net', description: '按产品/行业搜索土耳其出口商', tags: ['免费'] },
            { name: 'MERSİS', url: 'https://mersis.gtb.gov.tr', description: '土耳其企业注册系统，按行业查询', tags: ['官方'] },
            { name: 'Kompass Turkey', url: 'https://tr.kompass.com', description: '按产品/服务分类搜索土耳其企业', tags: ['免费搜索'] },
        ],
        social: [
            { name: 'LinkedIn Turkey', url: 'https://tr.linkedin.com', description: '土耳其 LinkedIn' },
        ],
        chamber: [
            { name: 'DEIK', url: 'https://www.deik.org.tr', description: '土耳其对外经济关系委员会' },
            { name: 'TIM', url: 'https://www.tim.org.tr', description: '土耳其出口商协会' },
        ],
    },

    // ===== 阿联酋 =====
    ARE: {
        b2b: [
            { name: 'TradeKey', url: 'https://www.tradekey.com', description: '中东主流 B2B 平台' },
            { name: 'Dubizzle', url: 'https://www.dubizzle.com', description: '迪拜分类信息和 B2B 平台' },
        ],
        company_search: [
            { name: 'Yellow Pages UAE', url: 'https://www.yellowpages-uae.com', description: '阿联酋黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'Dubai Chamber Directory', url: 'https://www.dubaichamber.com', description: '迪拜商会企业名录，按行业搜索', tags: ['官方'] },
            { name: 'Kompass UAE', url: 'https://ae.kompass.com', description: '按产品/服务分类搜索阿联酋企业', tags: ['免费搜索'] },
            { name: 'ConnectME', url: 'https://www.connectme.ae', description: '阿联酋企业搜索目录', tags: ['免费'] },
            { name: 'Yello UAE', url: 'https://www.yello.ae', description: '阿联酋验证企业目录门户，人工审核信息', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn UAE', url: 'https://ae.linkedin.com', description: '阿联酋 LinkedIn' },
        ],
        exhibition: [
            { name: 'DWTC', url: 'https://www.dwtc.com', description: '迪拜世界贸易中心展会日程' },
        ],
        chamber: [
            { name: 'Dubai Chamber', url: 'https://www.dubaichamber.com', description: '迪拜商会' },
            { name: 'Abu Dhabi Chamber', url: 'https://www.abudhabichamber.ae', description: '阿布扎比商会' },
        ],
    },

    // ===== 越南 =====
    VNM: {
        b2b: [
            { name: 'Made-in-Vietnam', url: 'https://www.made-in-vietnam.com', description: '越南制造商 B2B 平台' },
        ],
        company_search: [
            { name: 'Yellow Pages Vietnam', url: 'https://www.yellowpagesvn.com', description: '越南黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'Vietnam Business Registry', url: 'https://dangkykinhdoanh.gov.vn', description: '越南国家企业登记，按行业搜索', tags: ['官方'] },
            { name: 'VietnamBiz', url: 'https://vietnambiz.vn', description: '越南企业和商业信息搜索', tags: ['免费'] },
            { name: 'Trang Vàng', url: 'https://www.trangvangvietnam.com', description: '越南黄页，按行业搜索', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn Vietnam', url: 'https://vn.linkedin.com', description: '越南 LinkedIn' },
            { name: 'Zalo', url: 'https://zalo.me', description: '越南本土即时通讯，商务常用' },
        ],
        chamber: [
            { name: 'VCCI', url: 'https://www.vcci.com.vn', description: '越南工商会' },
            { name: 'VIETRADE', url: 'https://www.vietrade.gov.vn', description: '越南贸易促进局', tags: ['官方'] },
        ],
    },

    // ===== 泰国 =====
    THA: {
        b2b: [
            { name: 'ThaiTrade', url: 'https://www.thaitrade.com', description: '泰国商务部官方 B2B 平台', tags: ['官方'] },
        ],
        company_search: [
            { name: 'Yellow Pages Thailand', url: 'https://www.yellowpages.co.th', description: '泰国黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'DBD DataWarehouse', url: 'https://datawarehouse.dbd.go.th', description: '泰国商业发展厅，按行业搜索注册企业', tags: ['官方'] },
            { name: 'Longdo Map', url: 'https://map.longdo.com', description: '泰国本土地图，可搜索企业', tags: ['免费'] },
            { name: 'Thailand YP', url: 'https://www.thailandyp.com', description: '泰国企业目录，按行业分类', tags: ['免费'] },
        ],
        social: [
            { name: 'LINE', url: 'https://line.me', description: '泰国最流行 IM，商务也常用' },
            { name: 'LinkedIn Thailand', url: 'https://th.linkedin.com', description: '泰国 LinkedIn' },
        ],
        chamber: [
            { name: 'DITP', url: 'https://www.ditp.go.th', description: '泰国国际贸易促进厅', tags: ['官方'] },
            { name: 'TCC', url: 'https://www.thaichamber.org', description: '泰国商会' },
        ],
    },

    // ===== 印度尼西亚 =====
    IDN: {
        b2b: [
            { name: 'Alibaba Indonesia', url: 'https://indonesian.alibaba.com', description: '阿里巴巴印尼站' },
            { name: 'Tokopedia', url: 'https://www.tokopedia.com', description: '印尼最大电商平台' },
        ],
        company_search: [
            { name: 'Yellow Pages Indonesia', url: 'https://www.yellowpages.co.id', description: '印尼黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'AHU Online', url: 'https://ahu.go.id', description: '印尼企业登记查询', tags: ['官方'] },
            { name: 'Indonetwork', url: 'https://www.indonetwork.co.id', description: '印尼B2B企业搜索，按行业/产品分类', tags: ['免费'] },
            { name: 'Hotfrog Indonesia', url: 'https://www.hotfrog.co.id', description: '按行业搜索印尼企业', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn Indonesia', url: 'https://id.linkedin.com', description: '印尼 LinkedIn' },
        ],
        chamber: [
            { name: 'KADIN', url: 'https://kadin.id', description: '印尼工商会' },
            { name: 'ITPC', url: 'https://itpc.or.id', description: '印尼贸易促进中心' },
        ],
    },

    // ===== 沙特阿拉伯 =====
    SAU: {
        b2b: [
            { name: 'TradeKey', url: 'https://www.tradekey.com', description: '中东地区主流 B2B 平台' },
        ],
        company_search: [
            { name: 'Yellow Pages Saudi', url: 'https://www.yellowpages.com.sa', description: '沙特黄页，按行业分类搜索', tags: ['免费'] },
            { name: 'MCI Saudi', url: 'https://www.mci.gov.sa', description: '沙特商业和工业部企业查询', tags: ['官方'] },
            { name: 'Kompass Saudi', url: 'https://sa.kompass.com', description: '按产品/服务分类搜索沙特企业', tags: ['免费搜索'] },
            { name: 'Daleeli', url: 'https://www.daleeli.com', description: '沙特企业目录，按行业搜索', tags: ['免费'] },
        ],
        social: [
            { name: 'LinkedIn Saudi', url: 'https://sa.linkedin.com', description: '沙特 LinkedIn' },
        ],
        chamber: [
            { name: 'Saudi Chambers', url: 'https://csc.org.sa', description: '沙特商会联合会', tags: ['官方'] },
        ],
    },

    // ===== 波兰 =====
    POL: {
        b2b: [
            { name: 'Europages Poland', url: 'https://www.europages.pl', description: '欧洲 B2B 平台波兰站' },
        ],
        company_search: [
            { name: 'Panorama Firm', url: 'https://panoramafirm.pl', description: '波兰最大企业目录，按行业分类搜索', tags: ['免费'] },
            { name: 'PKT.pl', url: 'https://www.pkt.pl', description: '波兰黄页，按行业搜索企业', tags: ['免费'] },
            { name: 'KRS Online', url: 'https://ekrs.ms.gov.pl', description: '波兰国家法院注册，按行业搜索企业', tags: ['免费', '官方'] },
            { name: 'Kompass Poland', url: 'https://pl.kompass.com', description: '按产品/服务分类搜索波兰企业', tags: ['免费搜索'] },
        ],
        social: [
            { name: 'LinkedIn Poland', url: 'https://pl.linkedin.com', description: '波兰 LinkedIn' },
            { name: 'GoldenLine', url: 'https://www.goldenline.pl', description: '波兰本土职业社交' },
        ],
        chamber: [
            { name: 'PAIH', url: 'https://www.paih.gov.pl', description: '波兰投资和贸易局', tags: ['官方'] },
        ],
    },

    // ===== 加拿大 =====
    CAN: {
        company_search: [
            { name: 'Fyple', url: 'https://www.fyple.ca', description: '加拿大本地企业目录，按城市和行业分类搜索', tags: ['免费'] },
            { name: '411.ca', url: 'https://411.ca', description: '加拿大本地搜索引擎，覆盖110万+企业', tags: ['免费'] },
        ],
    },

    // ===== 阿根廷 =====
    ARG: {
        company_search: [
            { name: 'Páginas Amarillas AR', url: 'https://www.paginasamarillas.com.ar', description: '拉美最大黄页品牌阿根廷站，覆盖50年+中小企业', tags: ['免费'] },
        ],
    },

    // ===== 哥伦比亚 =====
    COL: {
        company_search: [
            { name: 'Páginas Amarillas CO', url: 'https://www.paginasamarillas.com.co', description: '哥伦比亚最大本地企业名录黄页', tags: ['免费'] },
        ],
    },

    // ===== 瑞典 =====
    SWE: {
        company_search: [
            { name: 'Hitta', url: 'https://www.hitta.se', description: '瑞典最大企业和个人搜索平台，含地图和联系方式', tags: ['免费'] },
        ],
    },

    // ===== 丹麦 =====
    DNK: {
        company_search: [
            { name: 'De Gule Sider', url: 'https://www.degulesider.dk', description: '丹麦黄页，按行业分类搜索本地企业', tags: ['免费'] },
        ],
    },

    // ===== 芬兰 =====
    FIN: {
        company_search: [
            { name: 'Finder', url: 'https://www.finder.fi', description: '芬兰企业搜索和决策者数据库，含财务信息', tags: ['部分免费'] },
        ],
    },

    // ===== 捷克 =====
    CZE: {
        company_search: [
            { name: 'Firmy.cz', url: 'https://www.firmy.cz', description: '捷克本地商业目录，按行业和地区搜索', tags: ['免费'] },
            { name: 'Zlaté Stránky', url: 'https://www.zlatestranky.cz', description: '捷克黄页，含82万+企业档案和电话簿', tags: ['免费'] },
        ],
    },

    // ===== 瑞士 =====
    CHE: {
        company_search: [
            { name: 'Local CH', url: 'https://www.local.ch/en', description: '瑞士本地企业和个人搜索，含地图和联系方式', tags: ['免费'] },
        ],
    },

    // ===== 挪威 =====
    NOR: {
        company_search: [
            { name: 'Gule Sider', url: 'https://www.gulesider.no', description: '挪威最知名的企业黄页' },
        ],
    },

    // ===== 匈牙利 =====
    HUN: {
        company_search: [
            { name: 'Céginformáció', url: 'https://www.ceginformacio.hu', description: '提供匈牙利企业的注册资料' },
        ],
    },

    // ===== 斯洛伐克 =====
    SVK: {
        company_search: [
            { name: 'Zlaté Stránky', url: 'https://www.zlatestranky.sk', description: '斯洛伐克黄页类网站' },
        ],
    },

    // ===== 罗马尼亚 =====
    ROU: {
        company_search: [
            { name: 'Pagini Aurii', url: 'https://www.paginiaurii.ro', description: '提供公司分类、企业官网、联系方式' },
        ],
    },

    // ===== 保加利亚 =====
    BGR: {
        company_search: [
            { name: 'Zlatnite Stranici', url: 'https://www.zlatnite-stranici.com', description: '保加利亚黄页平台' },
        ],
    },

    // ===== 希腊 =====
    GRC: {
        company_search: [
            { name: 'XO.gr', url: 'https://www.xo.gr', description: '希腊最常用企业目录平台' },
        ],
    },

    // ===== 葡萄牙 =====
    PRT: {
        company_search: [
            { name: 'Pai.pt', url: 'https://www.pai.pt', description: '葡萄牙企业名录网站' },
        ],
    },

    // ===== 克罗地亚 =====
    HRV: {
        company_search: [
            { name: 'Žute Stranice', url: 'https://www.zute-stranice.com', description: '克罗地亚本地语言黄页平台' },
        ],
    },

    // ===== 塞尔维亚 =====
    SRB: {
        company_search: [
            { name: 'Biznet', url: 'https://www.biznet.rs', description: '可查公司注册信息、营业状态' },
        ],
    },

    // ===== 斯洛文尼亚 =====
    SVN: {
        company_search: [
            { name: 'Itis.si', url: 'https://www.itis.si', description: '斯洛文尼亚企业信息检索平台' },
        ],
    },

    // ===== 比利时 =====
    BEL: {
        company_search: [
            { name: 'Pagesdor.be', url: 'https://www.pagesdor.be', description: '三语支持的比利时黄页网站' },
        ],
    },

    // ===== 荷兰 =====
    NLD: {
        company_search: [
            { name: 'De Telefoongids', url: 'https://www.detelefoongids.nl', description: '荷兰黄页平台' },
        ],
    },

    // ===== 卢森堡 =====
    LUX: {
        company_search: [
            { name: 'Editus', url: 'https://www.editus.lu', description: '卢森堡本地权威黄页' },
        ],
    },

    // ===== 奥地利 =====
    AUT: {
        company_search: [
            { name: 'Herold.at', url: 'https://www.herold.at', description: '奥地利本地黄页' },
        ],
    },

    // ===== 立陶宛 =====
    LTU: {
        company_search: [
            { name: 'Rekvizitai', url: 'https://rekvizitai.vz.lt/en', description: '支持英文搜索，涵盖工商注册信息' },
        ],
    },

    // ===== 拉脱维亚 =====
    LVA: {
        company_search: [
            { name: 'ZL.lv', url: 'https://www.zl.lv', description: '拉脱维亚黄页' },
        ],
    },

    // ===== 爱沙尼亚 =====
    EST: {
        company_search: [
            { name: 'Teatmik', url: 'https://www.teatmik.ee', description: '爱沙尼亚国家级企业信息平台', tags: ['官方'] },
        ],
    },

    // ===== 马耳他 =====
    MLT: {
        company_search: [
            { name: 'Yellow Pages Malta', url: 'https://www.yellowpages.com.mt', description: '马耳他黄页，英语界面操作友好' },
        ],
    },

    // ===== 冰岛 =====
    ISL: {
        company_search: [
            { name: 'Ja.is', url: 'https://ja.is', description: '冰岛本地黄页' },
        ],
    },

    // ===== 爱尔兰 =====
    IRL: {
        company_search: [
            { name: 'Golden Pages Ireland', url: 'https://www.goldenpages.ie', description: '爱尔兰企业黄页' },
        ],
    },

    // ===== 乌克兰 =====
    UKR: {
        company_search: [
            { name: 'UA-Region', url: 'https://www.ua-region.com.ua', description: '乌克兰商业目录网站' },
        ],
    },

    // ===== 智利 =====
    CHL: {
        company_search: [
            { name: 'Amarillas Chile', url: 'https://www.amarillas.cl/', description: '智利最常用的黄页网站' },
            { name: 'Guia Comercial', url: 'https://www.guiacomercial.cl/', description: '智利专业黄页网站' },
            { name: 'Locanto Chile', url: 'https://www.locanto.cl/', description: '智利本地分类广告平台' },
            { name: 'Mercantil', url: 'https://www.mercantil.com/', description: '智利企业名录' },
            { name: 'Yellow Pages Chile', url: 'https://www.yellowpages.cl/', description: '智利黄页名录' },
        ],
    },

    // ===== 秘鲁 =====
    PER: {
        company_search: [
            { name: 'Paginas Amarillas Peru', url: 'https://www.paginasamarillas.com.pe/', description: '秘鲁官方级黄页', tags: ['官方'] },
            { name: 'Guia Empresas', url: 'https://www.guiempresas.pe/', description: '收录秘鲁注册公司数据库' },
            { name: 'Info Negocios', url: 'https://www.infonegocios.pe/', description: '提供商业新闻和企业信息' },
            { name: 'Peru Pymes', url: 'https://www.perupymes.com/', description: '秘鲁中小企业名录' },
            { name: 'Maskay', url: 'https://www.maskay.com/', description: '秘鲁企业名录' },
        ],
        b2b: [
            { name: 'Info Comercial', url: 'https://www.infocomercial.com.pe/', description: 'B2B导向强，含供应信息、分销商目录' },
        ],
    },

    // ===== 厄瓜多尔 =====
    ECU: {
        company_search: [
            { name: 'Paginas Amarillas Ecuador', url: 'https://www.paginasamarillas.com.ec/', description: '厄瓜多尔官方黄页入口', tags: ['官方'] },
            { name: 'Ecuador Look', url: 'https://www.ecuadorlook.com/', description: '提供厄瓜多尔多行业企业分类名录' },
        ],
    },

    // ===== 玻利维亚 =====
    BOL: {
        company_search: [
            { name: 'Amarillas Bolivia', url: 'http://www.amarillas.bo/', description: '玻利维亚知名黄页网站' },
            { name: 'Paginas Amarillas de Bolivia', url: 'https://www.paginasamarillasdebolivia.com/', description: '涵盖玻利维亚主要商业城市中小企业' },
        ],
    },

    // ===== 乌拉圭 =====
    URY: {
        company_search: [
            { name: 'Paginas Amarillas Uruguay', url: 'https://www.paginasamarillas.com.uy/', description: '乌拉圭本地最广泛使用的企业黄页' },
            { name: 'Empresa Uruguay', url: 'https://www.empresauruguay.com/', description: '乌拉圭中小型企业信息收录平台' },
        ],
    },

    // ===== 巴拉圭 =====
    PRY: {
        company_search: [
            { name: 'Paginas Amarillas Paraguay', url: 'https://www.paginasamarillas.com.py/', description: '巴拉圭主流黄页平台' },
            { name: 'Guia Paraguay', url: 'https://www.guia.com.py/', description: '收录巴拉圭全国各类行业中小企业' },
        ],
        b2b: [
            { name: 'Guia de la Industria', url: 'http://www.guiadelaindustria.com.py', description: '巴拉圭行业B2B平台' },
        ],
    },

    // ===== 委内瑞拉 =====
    VEN: {
        company_search: [
            { name: 'Guia Venezuela', url: 'https://www.guiavenezuela.com/', description: '提供委内瑞拉各地企业及服务商联系方式' },
            { name: 'Paginas Amarillas Venezuela', url: 'https://www.paginasamarillas.com.ve/', description: '覆盖委内瑞拉全境的黄页网站' },
        ],
    },

    // ===== 哈萨克斯坦 =====
    KAZ: {
        company_search: [
            { name: 'Yellow Pages Kazakhstan', url: 'https://yellow-pages.kz', description: '哈萨克斯坦本地企业黄页' },
            { name: 'KazakhstanYP', url: 'https://kazakhstanyp.com', description: '哈萨克斯坦工商页企业目录' },
            { name: 'SPR Kazakhstan', url: 'https://kz.spr.ru', description: '哈萨克斯坦企业与机构查询平台' },
            { name: 'Yelo Kazakhstan', url: 'https://yelo.kz', description: '哈萨克斯坦本地黄页目录' },
            { name: 'Kaz Soopage', url: 'https://kaz.soopage.com/', description: '哈萨克斯坦地区企业免费信息平台' },
            { name: 'Yenino', url: 'https://www.yenino.com/kz-en/search', description: '快速搜索哈萨克斯坦企业信息的英文平台' },
            { name: 'D-OnlineYellowPages', url: 'https://www.d-onlineyellowpages.com/countries/kazakhstan', description: '多行业英文版在线黄页' },
            { name: '2GIS', url: 'https://2gis.com/', description: '集地图导航、商户资料与评价于一体的本地生活服务平台' },
            { name: 'Yalwa Kazakhstan', url: 'https://www.yalwa.com/kazakhstan', description: '分类广告与企业目录平台' },
        ],
        b2b: [
            { name: 'Atameken.kz', url: 'https://atameken.kz', description: '哈萨克斯坦国家企业家协会，覆盖能源、建材、食品等行业', tags: ['官方'] },
            { name: 'Kaznex Invest', url: 'https://kaznexinvest.kz', description: '哈萨克斯坦出口与投资促进局，专注出口商与买家撮合', tags: ['官方'] },
            { name: 'B2BMap Kazakhstan', url: 'https://b2bmap.com/kazakhstan', description: '中亚本地B2B平台' },
            { name: 'ExportHub Kazakhstan', url: 'https://www.exporthub.com/kazakhstan/', description: '出口导向型国际贸易平台' },
            { name: 'TradeKey Kazakhstan', url: 'https://www.tradekey.com/kazakhstan/', description: '拥有上千万国际买家资源的B2B平台' },
            { name: 'All.biz', url: 'https://www.all.biz/', description: '覆盖中亚多个国家的大型B2B平台' },
            { name: 'Kompass Kazakhstan', url: 'https://www.kompass.com/z/kz/', description: '全球领先的工业企业数据库' },
            { name: 'Qoovee', url: 'https://qoovee.com/', description: '中亚区域最活跃的批发型B2B平台' },
        ],
    },

    // ===== 乌兹别克斯坦 =====
    UZB: {
        company_search: [
            { name: 'Yellow Pages Uzbekistan', url: 'https://www.yellowpages.uz/', description: '乌兹别克斯坦最权威黄页网站' },
            { name: 'Golden Pages', url: 'https://www.goldenpages.uz/', description: '本地化企业目录平台' },
            { name: 'Flagma Uzbekistan', url: 'https://flagma.uz', description: '乌兹别克斯坦分类广告与企业目录平台' },
            { name: 'Tovar.uz', url: 'https://tovar.uz', description: '乌兹别克斯坦商品与企业服务目录' },
            { name: 'D-OnlineYellowPages Uzbekistan', url: 'https://www.d-onlineyellowpages.com/countries/uzbekistan/', description: '英文版黄页目录' },
        ],
        b2b: [
            { name: 'B2BMap Uzbekistan', url: 'https://b2bmap.com/uzbekistan', description: '以乌兹别克斯坦供应商为主的出口导向平台' },
            { name: 'Globexpo', url: 'https://globexpo.uz/', description: '专注农业、纺织、食品等传统行业的B2B平台' },
            { name: 'UzAsiaExport', url: 'https://uzasiaexport.com/', description: '官方支持的出口推广平台', tags: ['官方'] },
            { name: 'TradeKey Uzbekistan', url: 'https://www.tradekey.com/country/uz/', description: '国际采购平台的乌兹别克斯坦频道' },
        ],
    },

    // ===== 吉尔吉斯斯坦 =====
    KGZ: {
        company_search: [
            { name: 'Yelo Kyrgyzstan', url: 'https://yelo.com.kg/', description: '吉尔吉斯斯坦最主要的本地黄页平台' },
            { name: 'Yellow Pages AKIpress', url: 'https://yellowpages.akipress.org', description: '新闻机构AKIpress旗下黄页' },
            { name: 'Cybo Kyrgyzstan', url: 'https://cybo.com/kyrgyzstan', description: 'Cybo全球商业目录吉尔吉斯斯坦版' },
            { name: 'Golden Pages Kyrgyzstan', url: 'https://goldenpages.kg', description: '吉尔吉斯斯坦本地企业目录' },
            { name: 'D-OnlineYellowPages Kyrgyzstan', url: 'https://www.d-onlineyellowpages.com/countries/kyrgyzstan/', description: '多行业英文目录平台' },
        ],
        b2b: [
            { name: 'Tazabek', url: 'https://www.tazabek.kg', description: '吉尔吉斯斯坦知名商业信息平台，覆盖企业新闻及交易信息' },
            { name: 'Alatoo', url: 'https://alatoo.biz', description: '吉尔吉斯斯坦本地贸易平台' },
            { name: 'Central Asia Commerce', url: 'https://centralasiacommerce.com/', description: '中亚综合性商业平台' },
        ],
    },

    // ===== 塔吉克斯坦 =====
    TJK: {
        company_search: [
            { name: 'Flagma Tajikistan', url: 'https://flagma-tj.com', description: '塔吉克斯坦分类信息与企业目录' },
            { name: 'Yellowpages.net Tajikistan', url: 'https://www.yellowpages.net/places/TJ', description: '英文版黄页平台的塔吉克斯坦专区' },
            { name: 'Central Asia Commerce Tajikistan', url: 'https://centralasiacommerce.com/', description: '收录塔吉克斯坦部分企业' },
        ],
        b2b: [
            { name: 'TJTrade', url: 'https://tjtrade.com', description: '塔吉克斯坦贸易信息平台' },
            { name: 'B2BMap Tajikistan', url: 'https://b2bmap.com/', description: '可查看塔吉克本地公司产品' },
        ],
    },

    // ===== 土库曼斯坦 =====
    TKM: {
        company_search: [
            { name: 'Turkmenportal', url: 'https://turkmenportal.com', description: '土库曼斯坦主要资讯与企业目录平台' },
            { name: 'Central Asia Commerce Turkmenistan', url: 'https://centralasiacommerce.com/', description: '包含部分土库曼企业的基础资料' },
        ],
        b2b: [
            { name: 'TurkmenTrade', url: 'https://business.com.tm', description: '土库曼斯坦国际化B2B平台' },
        ],
    },

    // ===== 南非 =====
    ZAF: {
        company_search: [
            { name: 'Yellow Pages SA', url: 'https://www.yellowpages.co.za', description: '南非黄页，按行业和地区分类搜索企业', tags: ['免费'] },
            { name: 'Yellosa', url: 'https://www.yellosa.co.za', description: '南非验证企业目录门户，人工审核信息', tags: ['免费'] },
            { name: 'BusinessList SA', url: 'https://www.businesslist.co.za', description: '南非企业名录，含13万+企业信息和评价' },
        ],
        registry: [
            { name: 'CIPC', url: 'https://www.cipc.co.za', description: '南非公司与知识产权委员会，企业注册查询', tags: ['官方'] },
        ],
        b2b: [
            { name: 'Kompass South Africa', url: 'https://za.kompass.com', description: '按产品/服务分类搜索南非企业', tags: ['免费搜索'] },
        ],
        chamber: [
            { name: 'SACCI', url: 'https://www.sacci.org.za', description: '南非工商会联合会' },
        ],
    },

    // ===== 尼日利亚 =====
    NGA: {
        company_search: [
            { name: 'Nigerian Yellow Pages', url: 'https://www.yellowpagesnigeria.com', description: '尼日利亚最大黄页，覆盖20万+企业', tags: ['免费'] },
            { name: 'BusinessList Nigeria', url: 'https://www.businesslist.com.ng', description: '尼日利亚验证企业目录，13万+企业', tags: ['免费'] },
            { name: 'BizFinder', url: 'https://www.bizfinder.com.ng', description: '尼日利亚领先的数字企业目录和搜索引擎', tags: ['免费'] },
            { name: 'NGContacts', url: 'https://www.ngcontacts.com', description: '尼日利亚企业联系人和高管数据库' },
        ],
        registry: [
            { name: 'CAC Nigeria', url: 'https://www.cac.gov.ng', description: '尼日利亚公司事务委员会，企业注册查询', tags: ['官方'] },
        ],
        b2b: [
            { name: 'TradeKey Nigeria', url: 'https://nigeria.tradekey.com', description: 'TradeKey尼日利亚站，B2B贸易平台' },
        ],
    },

    // ===== 埃及 =====
    EGY: {
        company_search: [
            { name: 'Yellow Pages Egypt', url: 'https://www.yellowpages.com.eg', description: '埃及官方黄页和本地搜索引擎，含地图和评价', tags: ['免费'] },
            { name: 'Egypt Business Directory', url: 'https://www.egypt-business.com', description: '埃及B2B企业信息平台，含公司资料和招标信息' },
            { name: 'DalilMasr', url: 'https://www.dalilmasr.com', description: '埃及国家级企业目录，按城市和行业分类' },
        ],
        b2b: [
            { name: 'B2BMap Egypt', url: 'https://www.b2bmap.com/egypt', description: '埃及供应商和制造商B2B平台' },
            { name: 'Kompass Egypt', url: 'https://eg.kompass.com', description: '按产品/服务分类搜索埃及企业', tags: ['免费搜索'] },
        ],
        registry: [
            { name: 'GAFI Egypt', url: 'https://www.gafi.gov.eg', description: '埃及投资和自由区管理局，企业注册查询', tags: ['官方'] },
        ],
    },

    // ===== 肯尼亚 =====
    KEN: {
        company_search: [
            { name: 'Yellow Pages Kenya', url: 'https://www.yellowpageskenya.com', description: '肯尼亚黄页，按行业和城市搜索企业', tags: ['免费'] },
            { name: 'BusinessList Kenya', url: 'https://www.businesslistingkenya.com', description: '肯尼亚企业名录，按行业分类搜索' },
            { name: 'Business Finder Kenya', url: 'https://www.businessfinder.co.ke', description: '肯尼亚现代企业目录，SEO优化搜索', tags: ['免费'] },
            { name: 'PigiaMe', url: 'https://www.pigiame.co.ke', description: '肯尼亚分类信息和企业目录平台' },
        ],
        b2b: [
            { name: 'B2BMap Kenya', url: 'https://www.b2bmap.com/kenya', description: '肯尼亚供应商和制造商B2B平台' },
        ],
    },

    // ===== 摩洛哥 =====
    MAR: {
        company_search: [
            { name: 'Pages Jaunes Maroc', url: 'https://www.pages-maroc.com', description: '摩洛哥专业电话簿和企业目录' },
            { name: 'Telecontact', url: 'https://www.telecontact.ma', description: '摩洛哥领先企业目录，覆盖15万+企业', tags: ['免费'] },
            { name: 'Kerix', url: 'https://www.kerix.net', description: '摩洛哥专业企业名录，按公司名或品牌搜索' },
        ],
        b2b: [
            { name: 'Kompass Maroc', url: 'https://ma.kompass.com', description: '按产品/服务分类搜索摩洛哥企业', tags: ['免费搜索'] },
            { name: 'Bizafrix', url: 'https://www.bizafrix.com', description: '摩洛哥中小企业B2B专业目录' },
        ],
    },

    // ===== 加纳 =====
    GHA: {
        company_search: [
            { name: 'GhanaYello', url: 'https://www.ghanayello.com', description: '加纳验证企业目录门户，按城市和行业分类', tags: ['免费'] },
            { name: 'Yellow Pages Ghana', url: 'https://www.yellowpages.com.gh', description: '加纳黄页，帮助中小企业提升在线曝光' },
            { name: 'SearchGH', url: 'https://www.searchgh.com', description: '加纳免费企业名录和搜索目录' },
            { name: 'GhanaBusinessWeb', url: 'https://www.ghanabusinessweb.com', description: '加纳本地企业目录，含酒店、服务商等' },
        ],
    },

    // ===== 坦桑尼亚 =====
    TZA: {
        company_search: [
            { name: 'Yellow Tanzania', url: 'https://www.yellow.co.tz', description: '坦桑尼亚在线黄页目录，移动友好设计', tags: ['免费'] },
        ],
        b2b: [
            { name: 'B2BMap Tanzania', url: 'https://www.b2bmap.com/tanzania', description: '坦桑尼亚供应商和制造商B2B平台' },
        ],
    },

    // ===== 埃塞俄比亚 =====
    ETH: {
        company_search: [
            { name: 'EthioVisit', url: 'https://www.ethiovisit.com', description: '埃塞俄比亚商业目录和亚的斯亚贝巴黄页' },
            { name: 'Ethiopian Yellow Pages', url: 'https://www.ethiopianyellowpages.com', description: '埃塞俄比亚黄页资源指南，支持移动搜索' },
        ],
    },

    // ===== 阿尔及利亚 =====
    DZA: {
        company_search: [
            { name: 'Algeria YP', url: 'https://www.algeriayp.com', description: '阿尔及利亚在线企业目录和黄页' },
        ],
        b2b: [
            { name: 'B2BMap Algeria', url: 'https://www.b2bmap.com/algeria', description: '阿尔及利亚供应商和制造商B2B平台' },
        ],
    },

    // ===== 科特迪瓦 =====
    CIV: {
        company_search: [
            { name: 'Go Africa Online CI', url: 'https://www.goafricaonline.com/ci', description: '科特迪瓦企业黄页，覆盖6万+企业', tags: ['免费'] },
        ],
        b2b: [
            { name: 'Kompass Côte d\'Ivoire', url: 'https://ci.kompass.com', description: '按产品/服务分类搜索科特迪瓦企业', tags: ['免费搜索'] },
        ],
    },
};

// 获取某国的黄页数据
export const getYellowPages = (iso3: string): Record<string, YellowPagesEntry[]> | null => {
    return YELLOW_PAGES_DATA[iso3] || null;
};

// 获取某国黄页中指定分类的条目
export const getYellowPagesByCategory = (iso3: string, categoryId: string): YellowPagesEntry[] => {
    const data = YELLOW_PAGES_DATA[iso3];
    if (!data) return [];
    return data[categoryId] || [];
};

// 获取某国黄页的所有分类（仅返回有数据的分类）
export const getAvailableCategories = (iso3: string): YellowPagesCategory[] => {
    const data = YELLOW_PAGES_DATA[iso3];
    if (!data) return [];
    return YELLOW_PAGES_CATEGORIES.filter(cat => data[cat.id] && data[cat.id].length > 0);
};

// 获取某国黄页条目总数
export const getYellowPagesCount = (iso3: string): number => {
    const data = YELLOW_PAGES_DATA[iso3];
    if (!data) return 0;
    return Object.values(data).reduce((sum, entries) => sum + entries.length, 0);
};