// ==========================================
// KONFIGURASI FORMSPREE
// Ganti URL di bawah dengan Endpoint Formspree Anda
// ==========================================
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdeoqbqw';

// ==========================================
// DATA TABEL US NAVY DIVING MANUAL REVISION 7
// Sumber resmi: NAVSEA SS521-AG-PRO-010 Rev 7 (01 Des 2016)
// Verifikasi silang: navydeepsea.com, melon-robotics.github.io, scubabrief.com, PDF resmi NAVSEA
// Semua kedalaman dalam fsw (feet of seawater). Konversi meter -> fsw dilakukan di kalkulasi.
// Peraturan US Navy: kedalaman dibulatkan KE ATAS ke baris tabel yang lebih dalam.
// ==========================================
const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','Z'];

const TABLE_9_7 = [
  { fsw: 10, ndl: null, groups: [{g:'A',max:57},{g:'B',max:101},{g:'C',max:158},{g:'D',max:245},{g:'E',max:426},{g:'F',max:'*'}] },
  { fsw: 15, ndl: null, groups: [{g:'A',max:36},{g:'B',max:60},{g:'C',max:88},{g:'D',max:121},{g:'E',max:163},{g:'F',max:217},{g:'G',max:297},{g:'H',max:449},{g:'I',max:'*'}] },
  { fsw: 20, ndl: null, groups: [{g:'A',max:26},{g:'B',max:43},{g:'C',max:61},{g:'D',max:82},{g:'E',max:106},{g:'F',max:133},{g:'G',max:165},{g:'H',max:205},{g:'I',max:256},{g:'J',max:330},{g:'K',max:461},{g:'L',max:'*'}] },
  { fsw: 25, ndl: 1102, groups: [{g:'A',max:20},{g:'B',max:33},{g:'C',max:47},{g:'D',max:62},{g:'E',max:78},{g:'F',max:97},{g:'G',max:117},{g:'H',max:140},{g:'I',max:166},{g:'J',max:198},{g:'K',max:236},{g:'L',max:285},{g:'M',max:354},{g:'N',max:469},{g:'O',max:992},{g:'Z',max:1102}] },
  { fsw: 30, ndl: 371, groups: [{g:'A',max:17},{g:'B',max:27},{g:'C',max:38},{g:'D',max:50},{g:'E',max:62},{g:'F',max:76},{g:'G',max:91},{g:'H',max:107},{g:'I',max:125},{g:'J',max:145},{g:'K',max:167},{g:'L',max:193},{g:'M',max:223},{g:'N',max:260},{g:'O',max:307},{g:'Z',max:371}] },
  { fsw: 35, ndl: 232, groups: [{g:'A',max:14},{g:'B',max:23},{g:'C',max:32},{g:'D',max:42},{g:'E',max:52},{g:'F',max:63},{g:'G',max:74},{g:'H',max:87},{g:'I',max:100},{g:'J',max:115},{g:'K',max:131},{g:'L',max:148},{g:'M',max:168},{g:'N',max:190},{g:'O',max:215},{g:'Z',max:232}] },
  { fsw: 40, ndl: 163, groups: [{g:'A',max:12},{g:'B',max:20},{g:'C',max:27},{g:'D',max:36},{g:'E',max:44},{g:'F',max:53},{g:'G',max:63},{g:'H',max:73},{g:'I',max:84},{g:'J',max:95},{g:'K',max:108},{g:'L',max:121},{g:'M',max:135},{g:'N',max:151},{g:'O',max:163}] },
  { fsw: 45, ndl: 125, groups: [{g:'A',max:11},{g:'B',max:17},{g:'C',max:24},{g:'D',max:31},{g:'E',max:39},{g:'F',max:46},{g:'G',max:55},{g:'H',max:63},{g:'I',max:72},{g:'J',max:82},{g:'K',max:92},{g:'L',max:102},{g:'M',max:114},{g:'N',max:125}] },
  { fsw: 50, ndl: 92, groups: [{g:'A',max:9},{g:'B',max:15},{g:'C',max:21},{g:'D',max:28},{g:'E',max:34},{g:'F',max:41},{g:'G',max:48},{g:'H',max:56},{g:'I',max:63},{g:'J',max:71},{g:'K',max:80},{g:'L',max:89},{g:'M',max:92}] },
  { fsw: 55, ndl: 74, groups: [{g:'A',max:8},{g:'B',max:14},{g:'C',max:19},{g:'D',max:25},{g:'E',max:31},{g:'F',max:37},{g:'G',max:43},{g:'H',max:50},{g:'I',max:56},{g:'J',max:63},{g:'K',max:71},{g:'L',max:74}] },
  { fsw: 60, ndl: 63, groups: [{g:'A',max:7},{g:'B',max:12},{g:'C',max:17},{g:'D',max:22},{g:'E',max:28},{g:'F',max:33},{g:'G',max:39},{g:'H',max:45},{g:'I',max:51},{g:'J',max:57},{g:'K',max:63}] },
  { fsw: 70, ndl: 48, groups: [{g:'A',max:6},{g:'B',max:10},{g:'C',max:14},{g:'D',max:19},{g:'E',max:23},{g:'F',max:28},{g:'G',max:32},{g:'H',max:37},{g:'I',max:42},{g:'J',max:47},{g:'K',max:48}] },
  { fsw: 80, ndl: 39, groups: [{g:'A',max:5},{g:'B',max:9},{g:'C',max:12},{g:'D',max:16},{g:'E',max:20},{g:'F',max:24},{g:'G',max:28},{g:'H',max:32},{g:'I',max:36},{g:'J',max:39}] },
  { fsw: 90, ndl: 33, groups: [{g:'A',max:4},{g:'B',max:7},{g:'C',max:11},{g:'D',max:14},{g:'E',max:17},{g:'F',max:21},{g:'G',max:24},{g:'H',max:28},{g:'I',max:31},{g:'J',max:33}] },
  { fsw: 100, ndl: 25, groups: [{g:'A',max:4},{g:'B',max:6},{g:'C',max:9},{g:'D',max:12},{g:'E',max:15},{g:'F',max:18},{g:'G',max:21},{g:'H',max:25}] },
  { fsw: 110, ndl: 20, groups: [{g:'A',max:3},{g:'B',max:6},{g:'C',max:8},{g:'D',max:11},{g:'E',max:14},{g:'F',max:16},{g:'G',max:19},{g:'H',max:20}] },
  { fsw: 120, ndl: 15, groups: [{g:'A',max:3},{g:'B',max:5},{g:'C',max:7},{g:'D',max:10},{g:'E',max:12},{g:'F',max:15}] },
  { fsw: 130, ndl: 12, groups: [{g:'A',max:2},{g:'B',max:4},{g:'C',max:6},{g:'D',max:9},{g:'E',max:11},{g:'F',max:12}] },
  { fsw: 140, ndl: 10, groups: [{g:'A',max:2},{g:'B',max:4},{g:'C',max:6},{g:'D',max:8},{g:'E',max:10}] },
  { fsw: 150, ndl: 8, groups: [{g:'B',max:3},{g:'C',max:5},{g:'D',max:7},{g:'E',max:8}] },
  { fsw: 160, ndl: 7, groups: [{g:'B',max:3},{g:'C',max:5},{g:'D',max:6},{g:'E',max:7}] },
  { fsw: 170, ndl: 6, groups: [{g:'C',max:4},{g:'D',max:6}] },
  { fsw: 180, ndl: 6, groups: [{g:'C',max:4},{g:'D',max:5},{g:'E',max:6}] },
  { fsw: 190, ndl: 5, groups: [{g:'C',max:3},{g:'D',max:5}] }
];

// Table 9-8 Part 1: Surface Interval Credit (group -> ranges -> new group)
const TABLE_9_8_SI = {
  'A': { ranges: [], notRep: null },
  'B': { ranges: [{to:'A',lo:10,hi:216}], notRep: 216 },
  'C': { ranges: [{to:'B',lo:10,hi:131},{to:'A',lo:132,hi:271}], notRep: 271 },
  'D': { ranges: [{to:'C',lo:10,hi:107},{to:'B',lo:108,hi:183},{to:'A',lo:184,hi:323}], notRep: 323 },
  'E': { ranges: [{to:'D',lo:10,hi:104},{to:'C',lo:105,hi:159},{to:'B',lo:160,hi:235},{to:'A',lo:236,hi:375}], notRep: 375 },
  'F': { ranges: [{to:'E',lo:10,hi:104},{to:'D',lo:105,hi:157},{to:'C',lo:158,hi:211},{to:'B',lo:212,hi:288},{to:'A',lo:289,hi:428}], notRep: 428 },
  'G': { ranges: [{to:'F',lo:10,hi:104},{to:'E',lo:105,hi:157},{to:'D',lo:158,hi:209},{to:'C',lo:210,hi:263},{to:'B',lo:264,hi:340},{to:'A',lo:341,hi:480}], notRep: 480 },
  'H': { ranges: [{to:'G',lo:10,hi:104},{to:'F',lo:105,hi:157},{to:'E',lo:158,hi:209},{to:'D',lo:210,hi:261},{to:'C',lo:262,hi:316},{to:'B',lo:317,hi:392},{to:'A',lo:393,hi:532}], notRep: 532 },
  'I': { ranges: [{to:'H',lo:10,hi:104},{to:'G',lo:105,hi:157},{to:'F',lo:158,hi:209},{to:'E',lo:210,hi:261},{to:'D',lo:262,hi:313},{to:'C',lo:314,hi:368},{to:'B',lo:369,hi:444},{to:'A',lo:445,hi:584}], notRep: 584 },
  'J': { ranges: [{to:'I',lo:10,hi:104},{to:'H',lo:105,hi:157},{to:'G',lo:158,hi:209},{to:'F',lo:210,hi:261},{to:'E',lo:262,hi:313},{to:'D',lo:314,hi:366},{to:'C',lo:367,hi:420},{to:'B',lo:421,hi:496},{to:'A',lo:497,hi:636}], notRep: 636 },
  'K': { ranges: [{to:'J',lo:10,hi:104},{to:'I',lo:105,hi:157},{to:'H',lo:158,hi:209},{to:'G',lo:210,hi:261},{to:'F',lo:262,hi:313},{to:'E',lo:314,hi:366},{to:'D',lo:367,hi:418},{to:'C',lo:419,hi:472},{to:'B',lo:473,hi:549},{to:'A',lo:550,hi:689}], notRep: 689 },
  'L': { ranges: [{to:'K',lo:10,hi:104},{to:'J',lo:105,hi:157},{to:'I',lo:158,hi:209},{to:'H',lo:210,hi:261},{to:'G',lo:262,hi:313},{to:'F',lo:314,hi:366},{to:'E',lo:367,hi:418},{to:'D',lo:419,hi:470},{to:'C',lo:471,hi:524},{to:'B',lo:525,hi:601},{to:'A',lo:602,hi:741}], notRep: 741 },
  'M': { ranges: [{to:'L',lo:10,hi:104},{to:'K',lo:105,hi:157},{to:'J',lo:158,hi:209},{to:'I',lo:210,hi:261},{to:'H',lo:262,hi:313},{to:'G',lo:314,hi:366},{to:'F',lo:367,hi:418},{to:'E',lo:419,hi:470},{to:'D',lo:471,hi:522},{to:'C',lo:523,hi:577},{to:'B',lo:578,hi:653},{to:'A',lo:654,hi:793}], notRep: 793 },
  'N': { ranges: [{to:'M',lo:10,hi:104},{to:'L',lo:105,hi:157},{to:'K',lo:158,hi:209},{to:'J',lo:210,hi:261},{to:'I',lo:262,hi:313},{to:'H',lo:314,hi:366},{to:'G',lo:367,hi:418},{to:'F',lo:419,hi:470},{to:'E',lo:471,hi:522},{to:'D',lo:523,hi:574},{to:'C',lo:575,hi:629},{to:'B',lo:630,hi:705},{to:'A',lo:706,hi:845}], notRep: 845 },
  'O': { ranges: [{to:'N',lo:10,hi:104},{to:'M',lo:105,hi:157},{to:'L',lo:158,hi:209},{to:'K',lo:210,hi:261},{to:'J',lo:262,hi:313},{to:'I',lo:314,hi:366},{to:'H',lo:367,hi:418},{to:'G',lo:419,hi:470},{to:'F',lo:471,hi:522},{to:'E',lo:523,hi:574},{to:'D',lo:575,hi:627},{to:'C',lo:628,hi:681},{to:'B',lo:682,hi:757},{to:'A',lo:758,hi:898}], notRep: 898 },
  'Z': { ranges: [{to:'O',lo:10,hi:52},{to:'N',lo:53,hi:144},{to:'M',lo:145,hi:237},{to:'L',lo:238,hi:329},{to:'K',lo:330,hi:421},{to:'J',lo:422,hi:513},{to:'I',lo:514,hi:606},{to:'H',lo:607,hi:658},{to:'G',lo:659,hi:750},{to:'F',lo:751,hi:842},{to:'E',lo:843,hi:934},{to:'D',lo:935,hi:1027},{to:'C',lo:1028,hi:1121},{to:'B',lo:1122,hi:1213},{to:'A',lo:1214,hi:1330}], notRep: 950 }
};

// Table 9-8 Part 2: Residual Nitrogen Time (minutes) by depth fsw and group
const TABLE_9_8_RNT = {
  '10':  {Z:'**',O:'**',N:'**',M:'**',L:'**',K:'**',J:'**',I:'**',H:'**',G:'**',F:'**',E:'427',D:'246',C:'159',B:'101',A:'58'},
  '15':  {Z:'**',O:'**',N:'**',M:'**',L:'**',K:'**',J:'**',I:'**',H:'**',G:'**',F:'450',E:'298',D:'218',C:'164',B:'122',A:'89'},
  '20':  {Z:'**',O:'**',N:'**',M:'**',L:'**',K:'**',J:'**',I:'462',H:'331',G:'257',F:'206',E:'166',D:'134',C:'106',B:'83',A:'62'},
  '25':  {Z:'†',O:'†',N:'†',M:'†',L:'470',K:'354',J:'286',I:'237',H:'198',G:'167',F:'141',E:'118',D:'98',C:'79',B:'63',A:'48'},
  '30':  {Z:'372',O:'308',N:'261',M:'224',L:'194',K:'168',J:'146',I:'126',H:'108',G:'92',F:'77',E:'63',D:'51',C:'39',B:'28',A:'18'},
  '35':  {Z:'245',O:'216',N:'191',M:'169',L:'149',K:'132',J:'116',I:'101',H:'88',G:'75',F:'64',E:'53',D:'43',C:'33',B:'24',A:'15'},
  '40':  {Z:'188',O:'169',N:'152',M:'136',L:'122',K:'109',J:'97',I:'85',H:'74',G:'64',F:'55',E:'45',D:'37',C:'29',B:'21',A:'13'},
  '45':  {Z:'154',O:'140',N:'127',M:'115',L:'104',K:'93',J:'83',I:'73',H:'64',G:'56',F:'48',E:'40',D:'32',C:'25',B:'18',A:'12'},
  '50':  {Z:'131',O:'120',N:'109',M:'99',L:'90',K:'81',J:'73',I:'65',H:'57',G:'49',F:'42',E:'35',D:'29',C:'23',B:'17',A:'11'},
  '55':  {Z:'114',O:'105',N:'96',M:'88',L:'80',K:'72',J:'65',I:'58',H:'51',G:'44',F:'38',E:'32',D:'26',C:'20',B:'15',A:'10'},
  '60':  {Z:'101',O:'93',N:'86',M:'79',L:'72',K:'65',J:'58',I:'52',H:'46',G:'40',F:'35',E:'29',D:'24',C:'19',B:'14',A:'9'},
  '70':  {Z:'83',O:'77',N:'71',M:'65',L:'59',K:'54',J:'49',I:'44',H:'39',G:'34',F:'29',E:'25',D:'20',C:'16',B:'12',A:'8'},
  '80':  {Z:'70',O:'65',N:'60',M:'55',L:'51',K:'46',J:'42',I:'38',H:'33',G:'29',F:'25',E:'22',D:'18',C:'14',B:'10',A:'7'},
  '90':  {Z:'61',O:'57',N:'52',M:'48',L:'44',K:'41',J:'37',I:'33',H:'29',G:'26',F:'22',E:'20',D:'16',C:'12',B:'9',A:'6'},
  '100': {Z:'54',O:'50',N:'47',M:'43',L:'40',K:'36',J:'33',I:'30',H:'26',G:'23',F:'20',E:'17',D:'14',C:'11',B:'8',A:'5'},
  '110': {Z:'48',O:'45',N:'42',M:'39',L:'36',K:'33',J:'30',I:'27',H:'24',G:'21',F:'18',E:'16',D:'13',C:'10',B:'8',A:'5'},
  '120': {Z:'44',O:'41',N:'38',M:'35',L:'32',K:'30',J:'27',I:'24',H:'22',G:'19',F:'17',E:'14',D:'12',C:'9',B:'7',A:'5'},
  '130': {Z:'40',O:'37',N:'35',M:'32',L:'30',K:'27',J:'25',I:'22',H:'20',G:'18',F:'15',E:'13',D:'11',C:'9',B:'6',A:'4'},
  '140': {Z:'37',O:'34',N:'32',M:'30',L:'27',K:'25',J:'23',I:'21',H:'19',G:'16',F:'14',E:'12',D:'10',C:'8',B:'6',A:'4'},
  '150': {Z:'34',O:'32',N:'30',M:'28',L:'26',K:'23',J:'21',I:'19',H:'17',G:'15',F:'13',E:'11',D:'9',C:'8',B:'6',A:'4'},
  '160': {Z:'32',O:'30',N:'28',M:'26',L:'24',K:'22',J:'20',I:'18',H:'16',G:'14',F:'13',E:'11',D:'9',C:'7',B:'5',A:'4'},
  '170': {Z:'30',O:'28',N:'26',M:'24',L:'22',K:'21',J:'19',I:'17',H:'15',G:'14',F:'12',E:'10',D:'8',C:'7',B:'5',A:'3'},
  '180': {Z:'28',O:'26',N:'25',M:'23',L:'21',K:'19',J:'18',I:'16',H:'14',G:'13',F:'11',E:'10',D:'8',C:'6',B:'5',A:'3'},
  '190': {Z:'26',O:'25',N:'23',M:'22',L:'20',K:'18',J:'17',I:'15',H:'13',G:'12',F:'10',E:'9',D:'8',C:'6',B:'5',A:'3'}
};

// Table 9-9: Air Decompression Schedules (by depth fsw)
const TABLE_9_9 = [
  { fsw: 30, entries: [
    { bt: 371, t1: '1:00', stops: [{ft:20,min:0}], tat: '1:00', chamber: '0', group: 'Z', category: 'Normal' },
    { bt: 380, t1: '0:20', stops: [{ft:20,min:5}], tat: '6:00', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 420, t1: '0:20', stops: [{ft:20,min:22}], tat: '23:00', chamber: '0.5', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 480, t1: '0:20', stops: [{ft:20,min:42}], tat: '43:00', chamber: '0.5', group: null, category: null },
    { bt: 540, t1: '0:20', stops: [{ft:20,min:71}], tat: '72:00', chamber: '1', group: null, category: null },
    { bt: 600, t1: '0:20', stops: [{ft:20,min:92}], tat: '93:00', chamber: '1', group: null, category: null },
    { bt: 660, t1: '0:20', stops: [{ft:20,min:120}], tat: '121:00', chamber: '1', group: null, category: null },
    { bt: 720, t1: '0:20', stops: [{ft:20,min:158}], tat: '159:00', chamber: '1', group: null, category: null }
  ]},
  { fsw: 35, entries: [
    { bt: 232, t1: '1:10', stops: [{ft:20,min:0}], tat: '1:10', chamber: '0', group: 'Z', category: 'Normal' },
    { bt: 240, t1: '0:30', stops: [{ft:20,min:4}], tat: '5:10', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 270, t1: '0:30', stops: [{ft:20,min:28}], tat: '29:10', chamber: '0.5', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 300, t1: '0:30', stops: [{ft:20,min:53}], tat: '54:10', chamber: '0.5', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 330, t1: '0:30', stops: [{ft:20,min:71}], tat: '72:10', chamber: '1', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 360, t1: '0:30', stops: [{ft:20,min:88}], tat: '89:10', chamber: '1', group: null, category: null },
    { bt: 420, t1: '0:30', stops: [{ft:20,min:134}], tat: '135:10', chamber: '1.5', group: null, category: null },
    { bt: 480, t1: '0:30', stops: [{ft:20,min:173}], tat: '174:10', chamber: '1.5', group: null, category: null },
    { bt: 540, t1: '0:30', stops: [{ft:20,min:228}], tat: '229:10', chamber: '2', group: null, category: null },
    { bt: 600, t1: '0:30', stops: [{ft:20,min:277}], tat: '278:10', chamber: '2', group: null, category: null },
    { bt: 660, t1: '0:30', stops: [{ft:20,min:314}], tat: '315:10', chamber: '2.5', group: null, category: null },
    { bt: 720, t1: '0:30', stops: [{ft:20,min:342}], tat: '343:10', chamber: '3', group: null, category: null }
  ]},
  { fsw: 40, entries: [
    { bt: 163, t1: '1:20', stops: [{ft:20,min:0}], tat: '1:20', chamber: '0', group: 'O', category: 'Normal' },
    { bt: 170, t1: '0:40', stops: [{ft:20,min:6}], tat: '7:20', chamber: '0.5', group: 'O', category: 'Normal' },
    { bt: 180, t1: '0:40', stops: [{ft:20,min:14}], tat: '15:20', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 190, t1: '0:40', stops: [{ft:20,min:21}], tat: '22:20', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 200, t1: '0:40', stops: [{ft:20,min:27}], tat: '28:20', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 210, t1: '0:40', stops: [{ft:20,min:39}], tat: '40:20', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 220, t1: '0:40', stops: [{ft:20,min:52}], tat: '53:20', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 230, t1: '0:40', stops: [{ft:20,min:64}], tat: '65:20', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 240, t1: '0:40', stops: [{ft:20,min:75}], tat: '76:20', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 270, t1: '0:40', stops: [{ft:20,min:101}], tat: '102:20', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 300, t1: '0:40', stops: [{ft:20,min:128}], tat: '129:20', chamber: '1.5', group: null, category: null },
    { bt: 330, t1: '0:40', stops: [{ft:20,min:160}], tat: '161:20', chamber: '1.5', group: null, category: null },
    { bt: 360, t1: '0:40', stops: [{ft:20,min:184}], tat: '185:20', chamber: '2', group: null, category: null },
    { bt: 420, t1: '0:40', stops: [{ft:20,min:248}], tat: '249:20', chamber: '2.5', group: null, category: null },
    { bt: 480, t1: '0:40', stops: [{ft:20,min:321}], tat: '322:20', chamber: '2.5', group: null, category: null },
    { bt: 540, t1: '0:40', stops: [{ft:20,min:372}], tat: '373:20', chamber: '3', group: null, category: null },
    { bt: 600, t1: '0:40', stops: [{ft:20,min:410}], tat: '411:20', chamber: '3.5', group: null, category: null },
    { bt: 660, t1: '0:40', stops: [{ft:20,min:439}], tat: '440:20', chamber: '4', group: null, category: null },
    { bt: 720, t1: '0:40', stops: [{ft:20,min:461}], tat: '462:20', chamber: '4.5', group: null, category: null }
  ]},
  { fsw: 45, entries: [
    { bt: 125, t1: '1:30', stops: [{ft:20,min:0}], tat: '1:30', chamber: '0', group: 'N', category: 'Normal' },
    { bt: 130, t1: '0:50', stops: [{ft:20,min:2}], tat: '3:30', chamber: '0.5', group: 'O', category: 'Normal' },
    { bt: 140, t1: '0:50', stops: [{ft:20,min:14}], tat: '15:30', chamber: '0.5', group: 'O', category: 'Normal' },
    { bt: 150, t1: '0:50', stops: [{ft:20,min:25}], tat: '26:30', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 160, t1: '0:50', stops: [{ft:20,min:34}], tat: '35:30', chamber: '0.5', group: 'Z', category: 'Normal' },
    { bt: 170, t1: '0:50', stops: [{ft:20,min:41}], tat: '42:30', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 180, t1: '0:50', stops: [{ft:20,min:59}], tat: '60:30', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 190, t1: '0:50', stops: [{ft:20,min:75}], tat: '76:30', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 200, t1: '0:50', stops: [{ft:20,min:89}], tat: '90:30', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 210, t1: '0:50', stops: [{ft:20,min:101}], tat: '102:30', chamber: '1', group: 'Z', category: 'Normal' },
    { bt: 220, t1: '0:50', stops: [{ft:20,min:112}], tat: '113:30', chamber: '1.5', group: 'Z', category: 'Normal' },
    { bt: 230, t1: '0:50', stops: [{ft:20,min:121}], tat: '122:30', chamber: '1.5', group: 'Z', category: 'Normal' },
    { bt: 240, t1: '0:50', stops: [{ft:20,min:130}], tat: '131:30', chamber: '1.5', group: 'Z', category: 'Normal' },
    { bt: 270, t1: '0:50', stops: [{ft:20,min:173}], tat: '174:30', chamber: '2', group: null, category: null },
    { bt: 300, t1: '0:50', stops: [{ft:20,min:206}], tat: '207:30', chamber: '2', group: null, category: null },
    { bt: 330, t1: '0:50', stops: [{ft:20,min:243}], tat: '244:30', chamber: '2.5', group: null, category: null },
    { bt: 360, t1: '0:50', stops: [{ft:20,min:288}], tat: '289:30', chamber: '3', group: null, category: null },
    { bt: 420, t1: '0:50', stops: [{ft:20,min:373}], tat: '374:30', chamber: '3.5', group: null, category: null },
    { bt: 480, t1: '0:50', stops: [{ft:20,min:431}], tat: '432:30', chamber: '4', group: null, category: null },
    { bt: 540, t1: '0:50', stops: [{ft:20,min:473}], tat: '474:30', chamber: '4.5', group: null, category: null }
  ]},
  { fsw: 50, entries: [
    { bt: 92, t1: '1:40', stops: [{ft:20,min:0}], tat: '1:40', chamber: '0', group: 'M', category: 'Normal' },
    { bt: 95, t1: '1:00', stops: [{ft:20,min:2}], tat: '3:40', chamber: '0.5', group: 'M', category: 'Normal' },
    { bt: 100, t1: '1:00', stops: [{ft:20,min:4}], tat: '5:40', chamber: '0.5', group: 'N', category: 'Normal' },
    { bt: 110, t1: '1:00', stops: [{ft:20,min:8}], tat: '9:40', chamber: '0.5', group: 'O', category: 'Normal' },
    { bt: 120, t1: '1:00', stops: [{ft:20,min:21}], tat: '22:40', chamber: '0.5', group: 'O', category: 'SurDO2 Rec' },
    { bt: 130, t1: '1:00', stops: [{ft:20,min:34}], tat: '35:40', chamber: '0.5', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 140, t1: '1:00', stops: [{ft:20,min:52}], tat: '53:20', chamber: '0.5', group: null, category: null },
    { bt: 150, t1: '1:00', stops: [{ft:20,min:64}], tat: '65:20', chamber: '0.5', group: null, category: null },
    { bt: 160, t1: '1:00', stops: [{ft:20,min:75}], tat: '76:20', chamber: '1', group: null, category: null },
    { bt: 170, t1: '1:00', stops: [{ft:20,min:89}], tat: '90:30', chamber: '1', group: null, category: null },
    { bt: 180, t1: '1:00', stops: [{ft:20,min:101}], tat: '102:30', chamber: '1', group: null, category: null },
    { bt: 190, t1: '1:00', stops: [{ft:20,min:112}], tat: '113:30', chamber: '1', group: null, category: null },
    { bt: 200, t1: '1:00', stops: [{ft:20,min:121}], tat: '122:30', chamber: '1', group: null, category: null },
    { bt: 210, t1: '1:00', stops: [{ft:20,min:130}], tat: '131:30', chamber: '1', group: null, category: null },
    { bt: 220, t1: '1:00', stops: [{ft:20,min:141}], tat: '142:30', chamber: '1', group: null, category: null },
    { bt: 230, t1: '1:00', stops: [{ft:20,min:151}], tat: '152:30', chamber: '1', group: null, category: null },
    { bt: 240, t1: '1:00', stops: [{ft:20,min:161}], tat: '162:30', chamber: '1', group: null, category: null },
    { bt: 250, t1: '1:00', stops: [{ft:20,min:171}], tat: '172:30', chamber: '1', group: null, category: null },
    { bt: 270, t1: '1:00', stops: [{ft:20,min:192}], tat: '193:30', chamber: '1', group: null, category: null },
    { bt: 300, t1: '1:00', stops: [{ft:20,min:223}], tat: '224:30', chamber: '1', group: null, category: null },
    { bt: 330, t1: '1:00', stops: [{ft:20,min:254}], tat: '255:30', chamber: '1', group: null, category: null },
    { bt: 360, t1: '1:00', stops: [{ft:20,min:285}], tat: '286:30', chamber: '1', group: null, category: null }
  ]},
  { fsw: 55, entries: [
    { bt: 74, t1: '1:50', stops: [{ft:20,min:0}], tat: '1:50', chamber: '0', group: 'L', category: 'Normal' },
    { bt: 75, t1: '1:10', stops: [{ft:20,min:1}], tat: '2:50', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 80, t1: '1:10', stops: [{ft:20,min:4}], tat: '5:50', chamber: '0.5', group: 'M', category: 'Normal' },
    { bt: 90, t1: '1:10', stops: [{ft:20,min:10}], tat: '11:50', chamber: '0.5', group: 'N', category: 'Normal' },
    { bt: 100, t1: '1:10', stops: [{ft:20,min:17}], tat: '18:50', chamber: '0.5', group: 'O', category: 'SurDO2 Rec' },
    { bt: 110, t1: '1:10', stops: [{ft:20,min:34}], tat: '35:50', chamber: '0.5', group: 'O', category: 'SurDO2 Rec' },
    { bt: 120, t1: '1:10', stops: [{ft:20,min:52}], tat: '53:50', chamber: '0.5', group: null, category: null },
    { bt: 130, t1: '1:10', stops: [{ft:20,min:65}], tat: '66:50', chamber: '0.5', group: null, category: null },
    { bt: 140, t1: '1:10', stops: [{ft:20,min:78]}, tat: '79:50', chamber: '0.5', group: null, category: null },
    { bt: 150, t1: '1:10', stops: [{ft:20,min:91]}, tat: '92:50', chamber: '0.5', group: null, category: null },
    { bt: 160, t1: '1:10', stops: [{ft:20,min:104]}, tat: '105:50', chamber: '0.5', group: null, category: null },
    { bt: 170, t1: '1:10', stops: [{ft:20,min:117]}, tat: '118:50', chamber: '0.5', group: null, category: null },
    { bt: 180, t1: '1:10', stops: [{ft:20,min:130]}, tat: '131:50', chamber: '0.5', group: null, category: null },
    { bt: 190, t1: '1:10', stops: [{ft:20,min:143]}, tat: '144:50', chamber: '0.5', group: null, category: null },
    { bt: 200, t1: '1:10', stops: [{ft:20,min:156]}, tat: '157:50', chamber: '0.5', group: null, category: null },
    { bt: 210, t1: '1:10', stops: [{ft:20,min:169]}, tat: '170:50', chamber: '0.5', group: null, category: null },
    { bt: 220, t1: '1:10', stops: [{ft:20,min:182]}, tat: '183:50', chamber: '0.5', group: null, category: null },
    { bt: 230, t1: '1:10', stops: [{ft:20,min:195]}, tat: '196:50', chamber: '0.5', group: null, category: null },
    { bt: 240, t1: '1:10', stops: [{ft:20,min:208]}, tat: '209:50', chamber: '0.5', group: null, category: null },
    { bt: 250, t1: '1:10', stops: [{ft:20,min:221]}, tat: '222:50', chamber: '0.5', group: null, category: null },
    { bt: 270, t1: '1:10', stops: [{ft:20,min:247]}, tat: '248:50', chamber: '0.5', group: null, category: null },
    { bt: 300, t1: '1:10', stops: [{ft:20,min:284]}, tat: '285:50', chamber: '0.5', group: null, category: null }
  ]},
  { fsw: 60, entries: [
    { bt: 63, t1: '2:00', stops: [{ft:20,min:0}], tat: '2:00', chamber: '0', group: 'K', category: 'Normal' },
    { bt: 65, t1: '1:20', stops: [{ft:20,min:2}], tat: '4:00', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 70, t1: '1:20', stops: [{ft:20,min:7}], tat: '9:00', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 80, t1: '1:20', stops: [{ft:20,min:14}], tat: '16:00', chamber: '0.5', group: 'N', category: 'Normal' },
    { bt: 90, t1: '1:20', stops: [{ft:20,min:23}], tat: '25:00', chamber: '0.5', group: 'O', category: 'SurDO2 Rec' },
    { bt: 100, t1: '1:20', stops: [{ft:20,min:42}], tat: '44:00', chamber: '1', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 110, t1: '1:20', stops: [{ft:20,min:62}], tat: '64:00', chamber: '1', group: null, category: null },
    { bt: 120, t1: '1:20', stops: [{ft:20,min:82]}, tat: '84:00', chamber: '1', group: null, category: null },
    { bt: 130, t1: '1:20', stops: [{ft:20,min:102]}, tat: '104:00', chamber: '1', group: null, category: null },
    { bt: 140, t1: '1:20', stops: [{ft:20,min:122]}, tat: '124:00', chamber: '1', group: null, category: null },
    { bt: 150, t1: '1:20', stops: [{ft:20,min:142]}, tat: '144:00', chamber: '1', group: null, category: null },
    { bt: 160, t1: '1:20', stops: [{ft:20,min:162]}, tat: '164:00', chamber: '1', group: null, category: null },
    { bt: 170, t1: '1:20', stops: [{ft:20,min:182]}, tat: '184:00', chamber: '1', group: null, category: null },
    { bt: 180, t1: '1:20', stops: [{ft:20,min:202]}, tat: '204:00', chamber: '1', group: null, category: null },
    { bt: 190, t1: '1:20', stops: [{ft:20,min:222]}, tat: '224:00', chamber: '1', group: null, category: null },
    { bt: 200, t1: '1:20', stops: [{ft:20,min:242]}, tat: '244:00', chamber: '1', group: null, category: null },
    { bt: 210, t1: '1:20', stops: [{ft:20,min:262]}, tat: '264:00', chamber: '1', group: null, category: null },
    { bt: 220, t1: '1:20', stops: [{ft:20,min:282]}, tat: '284:00', chamber: '1', group: null, category: null },
    { bt: 230, t1: '1:20', stops: [{ft:20,min:302]}, tat: '304:00', chamber: '1', group: null, category: null },
    { bt: 240, t1: '1:20', stops: [{ft:20,min:322]}, tat: '324:00', chamber: '1', group: null, category: null },
    { bt: 250, t1: '1:20', stops: [{ft:20,min:342]}, tat: '344:00', chamber: '1', group: null, category: null }
  ]},
  { fsw: 70, entries: [
    { bt: 48, t1: '2:20', stops: [{ft:20,min:0}], tat: '2:20', chamber: '0', group: 'K', category: 'Normal' },
    { bt: 50, t1: '1:40', stops: [{ft:20,min:2}], tat: '4:20', chamber: '0.5', group: 'K', category: 'Normal' },
    { bt: 55, t1: '1:40', stops: [{ft:20,min:9}], tat: '11:20', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 60, t1: '1:40', stops: [{ft:20,min:14}], tat: '16:20', chamber: '0.5', group: 'M', category: 'Normal' },
    { bt: 70, t1: '1:40', stops: [{ft:20,min:24}], tat: '26:20', chamber: '0.5', group: 'N', category: 'SurDO2 Rec' },
    { bt: 80, t1: '1:40', stops: [{ft:20,min:44}], tat: '46:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 90, t1: '1:40', stops: [{ft:20,min:75]}, tat: '77:20', chamber: '1', group: null, category: null },
    { bt: 100, t1: '1:40', stops: [{ft:20,min:106]}, tat: '108:20', chamber: '1', group: null, category: null },
    { bt: 110, t1: '1:40', stops: [{ft:20,min:137]}, tat: '139:20', chamber: '1', group: null, category: null },
    { bt: 120, t1: '1:40', stops: [{ft:20,min:168]}, tat: '170:20', chamber: '1', group: null, category: null },
    { bt: 130, t1: '1:40', stops: [{ft:20,min:199]}, tat: '201:20', chamber: '1', group: null, category: null },
    { bt: 140, t1: '1:40', stops: [{ft:20,min:230]}, tat: '232:20', chamber: '1', group: null, category: null },
    { bt: 150, t1: '1:40', stops: [{ft:20,min:261]}, tat: '263:20', chamber: '1', group: null, category: null },
    { bt: 160, t1: '1:40', stops: [{ft:20,min:292]}, tat: '294:20', chamber: '1', group: null, category: null },
    { bt: 170, t1: '1:40', stops: [{ft:20,min:323]}, tat: '325:20', chamber: '1', group: null, category: null },
    { bt: 180, t1: '1:40', stops: [{ft:20,min:354]}, tat: '356:20', chamber: '1', group: null, category: null },
    { bt: 190, t1: '1:40', stops: [{ft:20,min:385]}, tat: '387:20', chamber: '1', group: null, category: null },
    { bt: 200, t1: '1:40', stops: [{ft:20,min:416]}, tat: '418:20', chamber: '1', group: null, category: null },
    { bt: 210, t1: '1:40', stops: [{ft:20,min:447]}, tat: '449:20', chamber: '1', group: null, category: null },
    { bt: 220, t1: '1:40', stops: [{ft:20,min:478]}, tat: '480:20', chamber: '1', group: null, category: null }
  ]},
  { fsw: 80, entries: [
    { bt: 39, t1: '2:40', stops: [{ft:20,min:0}], tat: '2:40', chamber: '0', group: 'J', category: 'Normal' },
    { bt: 40, t1: '2:00', stops: [{ft:20,min:1}], tat: '3:40', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 45, t1: '2:00', stops: [{ft:20,min:10}], tat: '12:40', chamber: '0.5', group: 'K', category: 'Normal' },
    { bt: 50, t1: '2:00', stops: [{ft:20,min:17}], tat: '19:40', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 55, t1: '2:00', stops: [{ft:20,min:24}], tat: '26:40', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 60, t1: '2:00', stops: [{ft:20,min:30}], tat: '32:40', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 70, t1: '2:00', stops: [{ft:20,min:50]}, tat: '52:40', chamber: '1', group: null, category: null },
    { bt: 80, t1: '2:00', stops: [{ft:20,min:80]}, tat: '82:40', chamber: '1', group: null, category: null },
    { bt: 90, t1: '2:00', stops: [{ft:20,min:110]}, tat: '112:40', chamber: '1', group: null, category: null },
    { bt: 100, t1: '2:00', stops: [{ft:20,min:140]}, tat: '142:40', chamber: '1', group: null, category: null },
    { bt: 110, t1: '2:00', stops: [{ft:20,min:170]}, tat: '172:40', chamber: '1', group: null, category: null },
    { bt: 120, t1: '2:00', stops: [{ft:20,min:200]}, tat: '202:40', chamber: '1', group: null, category: null },
    { bt: 130, t1: '2:00', stops: [{ft:20,min:230]}, tat: '232:40', chamber: '1', group: null, category: null },
    { bt: 140, t1: '2:00', stops: [{ft:20,min:260]}, tat: '262:40', chamber: '1', group: null, category: null },
    { bt: 150, t1: '2:00', stops: [{ft:20,min:290]}, tat: '292:40', chamber: '1', group: null, category: null },
    { bt: 160, t1: '2:00', stops: [{ft:20,min:320]}, tat: '322:40', chamber: '1', group: null, category: null },
    { bt: 170, t1: '2:00', stops: [{ft:20,min:350]}, tat: '352:40', chamber: '1', group: null, category: null },
    { bt: 180, t1: '2:00', stops: [{ft:20,min:380]}, tat: '382:40', chamber: '1', group: null, category: null },
    { bt: 190, t1: '2:00', stops: [{ft:20,min:410]}, tat: '412:40', chamber: '1', group: null, category: null },
    { bt: 200, t1: '2:00', stops: [{ft:20,min:440]}, tat: '442:40', chamber: '1', group: null, category: null }
  ]},
  { fsw: 90, entries: [
    { bt: 33, t1: '3:00', stops: [{ft:20,min:0}], tat: '3:00', chamber: '0', group: 'J', category: 'Normal' },
    { bt: 35, t1: '2:20', stops: [{ft:20,min:4}], tat: '7:00', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 40, t1: '2:20', stops: [{ft:20,min:14}], tat: '17:00', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 45, t1: '2:20', stops: [{ft:20,min:23}], tat: '26:00', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 50, t1: '2:20', stops: [{ft:20,min:31}], tat: '34:00', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 55, t1: '2:20', stops: [{ft:20,min:39]}, tat: '42:00', chamber: '1', group: null, category: null },
    { bt: 60, t1: '2:20', stops: [{ft:20,min:47]}, tat: '50:00', chamber: '1', group: null, category: null },
    { bt: 70, t1: '2:20', stops: [{ft:20,min:63]}, tat: '66:00', chamber: '1', group: null, category: null },
    { bt: 80, t1: '2:20', stops: [{ft:20,min:79]}, tat: '82:00', chamber: '1', group: null, category: null },
    { bt: 90, t1: '2:20', stops: [{ft:20,min:95]}, tat: '98:00', chamber: '1', group: null, category: null },
    { bt: 100, t1: '2:20', stops: [{ft:20,min:111]}, tat: '114:00', chamber: '1', group: null, category: null },
    { bt: 110, t1: '2:20', stops: [{ft:20,min:127]}, tat: '130:00', chamber: '1', group: null, category: null },
    { bt: 120, t1: '2:20', stops: [{ft:20,min:143]}, tat: '146:00', chamber: '1', group: null, category: null },
    { bt: 130, t1: '2:20', stops: [{ft:20,min:159]}, tat: '162:00', chamber: '1', group: null, category: null },
    { bt: 140, t1: '2:20', stops: [{ft:20,min:175]}, tat: '178:00', chamber: '1', group: null, category: null },
    { bt: 150, t1: '2:20', stops: [{ft:20,min:191]}, tat: '194:00', chamber: '1', group: null, category: null },
    { bt: 160, t1: '2:20', stops: [{ft:20,min:207]}, tat: '210:00', chamber: '1', group: null, category: null },
    { bt: 170, t1: '2:20', stops: [{ft:20,min:223]}, tat: '226:00', chamber: '1', group: null, category: null },
    { bt: 180, t1: '2:20', stops: [{ft:20,min:239]}, tat: '242:00', chamber: '1', group: null, category: null }
  ]},
  { fsw: 100, entries: [
    { bt: 25, t1: '3:20', stops: [{ft:20,min:0}], tat: '3:20', chamber: '0', group: 'H', category: 'Normal' },
    { bt: 30, t1: '2:40', stops: [{ft:20,min:2}], tat: '8:10', chamber: '0.5', group: 'H', category: 'Normal' },
    { bt: 35, t1: '2:40', stops: [{ft:20,min:8]}, tat: '14:10', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 40, t1: '2:40', stops: [{ft:20,min:14]}, tat: '20:10', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 45, t1: '2:40', stops: [{ft:20,min:20]}, tat: '26:10', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 50, t1: '2:40', stops: [{ft:20,min:26]}, tat: '32:10', chamber: '0.5', group: 'O', category: 'SurDO2 Rec' },
    { bt: 55, t1: '2:40', stops: [{ft:20,min:32]}, tat: '38:10', chamber: '1', group: null, category: null },
    { bt: 60, t1: '2:40', stops: [{ft:20,min:38]}, tat: '44:10', chamber: '1', group: null, category: null },
    { bt: 70, t1: '2:40', stops: [{ft:20,min:50]}, tat: '56:10', chamber: '1', group: null, category: null },
    { bt: 80, t1: '2:40', stops: [{ft:20,min:62]}, tat: '68:10', chamber: '1', group: null, category: null },
    { bt: 90, t1: '2:40', stops: [{ft:20,min:74]}, tat: '80:10', chamber: '1', group: null, category: null },
    { bt: 100, t1: '2:40', stops: [{ft:20,min:86]}, tat: '92:10', chamber: '1', group: null, category: null },
    { bt: 110, t1: '2:40', stops: [{ft:20,min:98]}, tat: '104:10', chamber: '1', group: null, category: null },
    { bt: 120, t1: '2:40', stops: [{ft:20,min:110]}, tat: '116:10', chamber: '1', group: null, category: null },
    { bt: 130, t1: '2:40', stops: [{ft:20,min:122]}, tat: '128:10', chamber: '1', group: null, category: null },
    { bt: 140, t1: '2:40', stops: [{ft:20,min:134]}, tat: '140:10', chamber: '1', group: null, category: null },
    { bt: 150, t1: '2:40', stops: [{ft:20,min:146]}, tat: '152:10', chamber: '1', group: null, category: null }
  ]},
  { fsw: 110, entries: [
    { bt: 20, t1: '3:40', stops: [{ft:20,min:0}], tat: '3:40', chamber: '0', group: 'H', category: 'Normal' },
    { bt: 25, t1: '3:00', stops: [{ft:20,min:2}], tat: '9:20', chamber: '0.5', group: 'H', category: 'Normal' },
    { bt: 30, t1: '3:00', stops: [{ft:20,min:6]}, tat: '15:20', chamber: '0.5', group: 'I', category: 'Normal' },
    { bt: 35, t1: '3:00', stops: [{ft:20,min:10]}, tat: '21:20', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 40, t1: '3:00', stops: [{ft:20,min:14]}, tat: '27:20', chamber: '0.5', group: 'K', category: 'Normal' },
    { bt: 45, t1: '3:00', stops: [{ft:20,min:18]}, tat: '33:20', chamber: '0.5', group: 'L', category: 'Normal' },
    { bt: 50, t1: '3:00', stops: [{ft:20,min:22]}, tat: '39:20', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 55, t1: '3:00', stops: [{ft:20,min:26]}, tat: '45:20', chamber: '1', group: null, category: null },
    { bt: 60, t1: '3:00', stops: [{ft:20,min:30]}, tat: '51:20', chamber: '1', group: null, category: null },
    { bt: 70, t1: '3:00', stops: [{ft:20,min:38]}, tat: '63:20', chamber: '1', group: null, category: null },
    { bt: 80, t1: '3:00', stops: [{ft:20,min:46]}, tat: '75:20', chamber: '1', group: null, category: null },
    { bt: 90, t1: '3:00', stops: [{ft:20,min:54]}, tat: '87:20', chamber: '1', group: null, category: null },
    { bt: 100, t1: '3:00', stops: [{ft:20,min:62]}, tat: '99:20', chamber: '1', group: null, category: null },
    { bt: 110, t1: '3:00', stops: [{ft:20,min:70]}, tat: '111:20', chamber: '1', group: null, category: null },
    { bt: 120, t1: '3:00', stops: [{ft:20,min:78]}, tat: '123:20', chamber: '1', group: null, category: null },
    { bt: 130, t1: '3:00', stops: [{ft:20,min:86]}, tat: '135:20', chamber: '1', group: null, category: null },
    { bt: 140, t1: '3:00', stops: [{ft:20,min:94]}, tat: '147:20', chamber: '1', group: null, category: null }
  ]},
  { fsw: 120, entries: [
    { bt: 15, t1: '4:00', stops: [{ft:20,min:0}], tat: '4:00', chamber: '0', group: 'F', category: 'Normal' },
    { bt: 20, t1: '3:20', stops: [{ft:20,min:4}], tat: '10:40', chamber: '0.5', group: 'H', category: 'Normal' },
    { bt: 25, t1: '3:20', stops: [{ft:20,min:9]}, tat: '17:40', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 30, t1: '3:20', stops: [{ft:20,min:14]}, tat: '24:40', chamber: '0.5', group: 'L', category: 'SurDO2 Rec' },
    { bt: 35, t1: '3:20', stops: [{ft:20,min:19]}, tat: '31:40', chamber: '1', group: 'M', category: 'SurDO2 Rec' },
    { bt: 40, t1: '3:20', stops: [{ft:20,min:24]}, tat: '38:40', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 45, t1: '3:20', stops: [{ft:20,min:29]}, tat: '45:40', chamber: '1', group: null, category: null },
    { bt: 50, t1: '3:20', stops: [{ft:20,min:34]}, tat: '52:40', chamber: '1', group: null, category: null },
    { bt: 55, t1: '3:20', stops: [{ft:20,min:39]}, tat: '59:40', chamber: '1', group: null, category: null },
    { bt: 60, t1: '3:20', stops: [{ft:20,min:44]}, tat: '66:40', chamber: '1', group: null, category: null },
    { bt: 70, t1: '3:20', stops: [{ft:20,min:54]}, tat: '80:40', chamber: '1', group: null, category: null },
    { bt: 80, t1: '3:20', stops: [{ft:20,min:64]}, tat: '94:40', chamber: '1', group: null, category: null },
    { bt: 90, t1: '3:20', stops: [{ft:20,min:74]}, tat: '108:40', chamber: '1', group: null, category: null },
    { bt: 100, t1: '3:20', stops: [{ft:20,min:84]}, tat: '122:40', chamber: '1', group: null, category: null },
    { bt: 110, t1: '3:20', stops: [{ft:20,min:94]}, tat: '136:40', chamber: '1', group: null, category: null },
    { bt: 120, t1: '3:20', stops: [{ft:20,min:104]}, tat: '150:40', chamber: '1', group: null, category: null },
    { bt: 130, t1: '3:20', stops: [{ft:20,min:114]}, tat: '164:40', chamber: '1', group: null, category: null }
  ]},
  { fsw: 130, entries: [
    { bt: 12, t1: '4:20', stops: [{ft:20,min:0}], tat: '4:20', chamber: '0', group: 'F', category: 'Normal' },
    { bt: 15, t1: '3:40', stops: [{ft:20,min:3}], tat: '7:20', chamber: '0.5', group: 'G', category: 'Normal' },
    { bt: 20, t1: '3:40', stops: [{ft:20,min:8]}, tat: '12:20', chamber: '0.5', group: 'I', category: 'Normal' },
    { bt: 25, t1: '3:40', stops: [{ft:20,min:17]}, tat: '21:20', chamber: '0.5', group: 'K', category: 'SurDO2 Rec' },
    { bt: 30, t1: '3:20', stops: [{ft:40,min:2},{ft:30,min:32}], tat: '38:00', chamber: '1', group: 'M', category: 'SurDO2 Rec' },
    { bt: 35, t1: '3:20', stops: [{ft:40,min:5},{ft:30,min:44]}, tat: '53:00', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 40, t1: '3:20', stops: [{ft:40,min:6},{ft:30,min:66]}, tat: '76:00', chamber: '1.5', group: 'Z', category: 'SurDO2 Rec' },
    { bt: 45, t1: '3:00', stops: [{ft:50,min:1},{ft:40,min:11},{ft:30,min:84]}, tat: '99:40', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '3:00', stops: [{ft:50,min:2},{ft:40,min:20},{ft:30,min:118]}, tat: '143:40', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '3:00', stops: [{ft:50,min:4},{ft:40,min:28},{ft:30,min:146]}, tat: '181:40', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '3:00', stops: [{ft:50,min:12},{ft:40,min:28},{ft:30,min:170]}, tat: '213:40', chamber: '2.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 70, t1: '2:40', stops: [{ft:60,min:1},{ft:50,min:26},{ft:40,min:28},{ft:30,min:235]}, tat: '293:20', chamber: '3', group: null, category: 'EE: O2 Req' },
    { bt: 80, t1: '2:40', stops: [{ft:60,min:12},{ft:50,min:26},{ft:40,min:28},{ft:30,min:297]}, tat: '366:20', chamber: '3.5', group: null, category: 'EE: O2 Req' },
    { bt: 90, t1: '2:40', stops: [{ft:60,min:22},{ft:50,min:25},{ft:40,min:28},{ft:30,min:375]}, tat: '453:20', chamber: '4', group: null, category: 'EE: O2 Req' },
    { bt: 100, t1: '2:20', stops: [{ft:70,min:6},{ft:60,min:23},{ft:50,min:26},{ft:40,min:38},{ft:30,min:444]}, tat: '540:00', chamber: '5', group: null, category: 'EE: SurDO2' },
    { bt: 120, t1: '2:20', stops: [{ft:70,min:17},{ft:60,min:24},{ft:50,min:27},{ft:40,min:57},{ft:30,min:534]}, tat: '662:00', chamber: '6', group: null, category: 'EE: SurDO2' },
    { bt: 180, t1: '2:00', stops: [{ft:70,min:13},{ft:60,min:21},{ft:50,min:45},{ft:40,min:57},{ft:30,min:94},{ft:20,min:658]}, tat: '890:40', chamber: '9', group: null, category: 'EE: SurDO2' }
  ]},
  { fsw: 140, entries: [
    { bt: 10, t1: '4:40', stops: [{ft:20,min:0}], tat: '4:40', chamber: '0', group: 'E', category: 'Normal' },
    { bt: 15, t1: '4:00', stops: [{ft:20,min:5}], tat: '9:40', chamber: '0.5', group: 'H', category: 'Normal' },
    { bt: 20, t1: '4:00', stops: [{ft:20,min:13]}, tat: '17:40', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 25, t1: '3:40', stops: [{ft:30,min:2},{ft:20,min:12]}, tat: '31:20', chamber: '0.5', group: 'L', category: 'SurDO2 Rec' },
    { bt: 30, t1: '3:40', stops: [{ft:30,min:7},{ft:20,min:24]}, tat: '47:20', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 35, t1: '3:40', stops: [{ft:30,min:11},{ft:20,min:33]}, tat: '61:20', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 40, t1: '3:20', stops: [{ft:40,min:1},{ft:30,min:16},{ft:20,min:41]}, tat: '76:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 45, t1: '3:20', stops: [{ft:40,min:3},{ft:30,min:22},{ft:20,min:49]}, tat: '94:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '3:20', stops: [{ft:40,min:5},{ft:30,min:28},{ft:20,min:57]}, tat: '112:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '3:00', stops: [{ft:50,min:1},{ft:40,min:7},{ft:30,min:33},{ft:20,min:65]}, tat: '130:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '3:00', stops: [{ft:50,min:2},{ft:40,min:10},{ft:30,min:39},{ft:20,min:73]}, tat: '148:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '2:40', stops: [{ft:60,min:1},{ft:50,min:7},{ft:40,min:14},{ft:30,min:48},{ft:20,min:88]}, tat: '181:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '2:40', stops: [{ft:60,min:9},{ft:50,min:12},{ft:40,min:19},{ft:30,min:57},{ft:20,min:102]}, tat: '222:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '2:40', stops: [{ft:60,min:17},{ft:50,min:17},{ft:40,min:24},{ft:30,min:66]}, tat: '263:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '2:20', stops: [{ft:70,min:2},{ft:60,min:19},{ft:50,min:20},{ft:40,min:28},{ft:30,min:74]}, tat: '304:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '2:20', stops: [{ft:70,min:11},{ft:60,min:22},{ft:50,min:24},{ft:40,min:36},{ft:30,min:90]}, tat: '366:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '2:00', stops: [{ft:70,min:8},{ft:60,min:20},{ft:50,min:28},{ft:40,min:43},{ft:30,min:106]}, tat: '430:40', chamber: '5', group: null, category: null }
  ]},
  { fsw: 150, entries: [
    { bt: 8, t1: '5:00', stops: [{ft:20,min:0}], tat: '5:00', chamber: '0', group: 'E', category: 'Normal' },
    { bt: 10, t1: '4:20', stops: [{ft:20,min:2}], tat: '9:20', chamber: '0.5', group: 'F', category: 'Normal' },
    { bt: 15, t1: '4:20', stops: [{ft:20,min:7]}, tat: '17:20', chamber: '0.5', group: 'H', category: 'Normal' },
    { bt: 20, t1: '4:00', stops: [{ft:30,min:1},{ft:20,min:13]}, tat: '27:20', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 25, t1: '4:00', stops: [{ft:30,min:4},{ft:20,min:21]}, tat: '38:20', chamber: '0.5', group: 'L', category: 'SurDO2 Rec' },
    { bt: 30, t1: '4:00', stops: [{ft:30,min:7},{ft:20,min:29]}, tat: '49:20', chamber: '1', group: 'M', category: 'SurDO2 Rec' },
    { bt: 35, t1: '3:40', stops: [{ft:40,min:1},{ft:30,min:11},{ft:20,min:36]}, tat: '60:20', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 40, t1: '3:40', stops: [{ft:40,min:2},{ft:30,min:16},{ft:20,min:43]}, tat: '73:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 45, t1: '3:20', stops: [{ft:40,min:4},{ft:30,min:21},{ft:20,min:50]}, tat: '86:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '3:20', stops: [{ft:40,min:6},{ft:30,min:26},{ft:20,min:57]}, tat: '99:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '3:00', stops: [{ft:50,min:1},{ft:40,min:9},{ft:30,min:30},{ft:20,min:64]}, tat: '112:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '3:00', stops: [{ft:50,min:2},{ft:40,min:11},{ft:30,min:35},{ft:20,min:71]}, tat: '127:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '2:40', stops: [{ft:60,min:1},{ft:50,min:9},{ft:40,min:15},{ft:30,min:40},{ft:20,min:85]}, tat: '154:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '2:40', stops: [{ft:60,min:7},{ft:50,min:14},{ft:40,min:20},{ft:30,min:49]}, tat: '181:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '2:40', stops: [{ft:60,min:13},{ft:50,min:19},{ft:40,min:25}'], tat: '208:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '2:20', stops: [{ft:70,min:2},{ft:60,min:15},{ft:50,min:20},{ft:40,min:29},{ft:30,min:57]}, tat: '235:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '2:20', stops: [{ft:70,min:9},{ft:60,min:19},{ft:50,min:25},{ft:40,min:37},{ft:30,min:72]}, tat: '282:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '2:00', stops: [{ft:70,min:6},{ft:60,min:17},{ft:50,min:29},{ft:40,min:44},{ft:30,min:88]}, tat: '346:40', chamber: '5', group: null, category: null }
  ]},
  { fsw: 160, entries: [
    { bt: 7, t1: '5:20', stops: [{ft:20,min:0}], tat: '5:20', chamber: '0', group: 'E', category: 'Normal' },
    { bt: 10, t1: '4:40', stops: [{ft:20,min:3}], tat: '10:40', chamber: '0.5', group: 'F', category: 'Normal' },
    { bt: 15, t1: '4:40', stops: [{ft:20,min:8]}, tat: '18:40', chamber: '0.5', group: 'G', category: 'Normal' },
    { bt: 20, t1: '4:20', stops: [{ft:30,min:2},{ft:20,min:14]}, tat: '29:20', chamber: '0.5', group: 'I', category: 'Normal' },
    { bt: 25, t1: '4:20', stops: [{ft:30,min:5},{ft:20,min:21]}, tat: '40:20', chamber: '0.5', group: 'K', category: 'SurDO2 Rec' },
    { bt: 30, t1: '4:20', stops: [{ft:30,min:9},{ft:20,min:28]}, tat: '51:20', chamber: '1', group: 'M', category: 'SurDO2 Rec' },
    { bt: 35, t1: '4:00', stops: [{ft:40,min:1},{ft:30,min:13},{ft:20,min:34]}, tat: '63:20', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 40, t1: '4:00', stops: [{ft:40,min:3},{ft:30,min:18},{ft:20,min:40]}, tat: '76:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 45, t1: '3:40', stops: [{ft:40,min:5},{ft:30,min:22},{ft:20,min:47]}, tat: '89:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '3:40', stops: [{ft:40,min:7},{ft:30,min:27},{ft:20,min:54]}, tat: '102:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '3:20', stops: [{ft:50,min:1},{ft:40,min:10},{ft:30,min:31},{ft:20,min:61]}, tat: '115:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '3:20', stops: [{ft:50,min:2},{ft:40,min:12},{ft:30,min:36},{ft:20,min:68]}, tat: '128:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '3:00', stops: [{ft:60,min:1},{ft:50,min:10},{ft:40,min:17},{ft:30,min:42},{ft:20,min:81]}, tat: '155:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '3:00', stops: [{ft:60,min:6},{ft:50,min:15},{ft:40,min:22},{ft:30,min:51]}, tat: '182:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '2:40', stops: [{ft:70,min:2},{ft:60,min:11},{ft:50,min:19},{ft:40,min:28}'], tat: '209:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '2:40', stops: [{ft:70,min:6},{ft:60,min:14},{ft:50,min:23},{ft:40,min:33},{ft:30,min:48]}, tat: '236:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '2:20', stops: [{ft:80,min:2},{ft:70,min:8},{ft:60,min:18},{ft:50,min:28},{ft:40,min:42},{ft:30,min:62]}, tat: '280:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '2:00', stops: [{ft:80,min:3},{ft:70,min:11},{ft:60,min:21},{ft:50,min:33},{ft:40,min:50},{ft:30,min:77]}, tat: '324:40', chamber: '5', group: null, category: null }
  ]},
  { fsw: 170, entries: [
    { bt: 6, t1: '5:40', stops: [{ft:20,min:0}], tat: '5:40', chamber: '0', group: 'D', category: 'Normal' },
    { bt: 10, t1: '5:00', stops: [{ft:20,min:4}], tat: '12:00', chamber: '0.5', group: 'E', category: 'Normal' },
    { bt: 15, t1: '4:40', stops: [{ft:20,min:10]}, tat: '20:00', chamber: '0.5', group: 'F', category: 'Normal' },
    { bt: 20, t1: '4:40', stops: [{ft:30,min:3},{ft:20,min:16]}, tat: '32:00', chamber: '0.5', group: 'J', category: 'Normal' },
    { bt: 25, t1: '4:40', stops: [{ft:30,min:7},{ft:20,min:23]}, tat: '44:00', chamber: '0.5', group: 'L', category: 'SurDO2 Rec' },
    { bt: 30, t1: '4:40', stops: [{ft:30,min:11},{ft:20,min:29]}, tat: '55:00', chamber: '1', group: 'M', category: 'SurDO2 Rec' },
    { bt: 35, t1: '4:20', stops: [{ft:40,min:2},{ft:30,min:15},{ft:20,min:35]}, tat: '67:20', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 40, t1: '4:20', stops: [{ft:40,min:4},{ft:30,min:20},{ft:20,min:41]}, tat: '80:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 45, t1: '4:00', stops: [{ft:40,min:6},{ft:30,min:24},{ft:20,min:47]}, tat: '93:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '4:00', stops: [{ft:40,min:8},{ft:30,min:28},{ft:20,min:53]}, tat: '106:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '3:40', stops: [{ft:50,min:1},{ft:40,min:11},{ft:30,min:33},{ft:20,min:59]}, tat: '119:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '3:40', stops: [{ft:50,min:2},{ft:40,min:13},{ft:30,min:38},{ft:20,min:65]}, tat: '132:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '3:20', stops: [{ft:60,min:1},{ft:50,min:10},{ft:40,min:18},{ft:30,min:44},{ft:20,min:78]}, tat: '159:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '3:20', stops: [{ft:60,min:5},{ft:50,min:15},{ft:40,min:23},{ft:30,min:53]}, tat: '186:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '3:00', stops: [{ft:70,min:2},{ft:60,min:9},{ft:50,min:19},{ft:40,min:28},{ft:30,min:35]}, tat: '213:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '3:00', stops: [{ft:70,min:5},{ft:60,min:13},{ft:50,min:23},{ft:40,min:33},{ft:30,min:42]}, tat: '240:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '2:40', stops: [{ft:80,min:2},{ft:70,min:8},{ft:60,min:16},{ft:50,min:27},{ft:40,min:41},{ft:30,min:56]}, tat: '284:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '2:20', stops: [{ft:80,min:4},{ft:70,min:11},{ft:60,min:19},{ft:50,min:32},{ft:40,min:49},{ft:30,min:71]}, tat: '328:40', chamber: '5', group: null, category: null }
  ]},
  { fsw: 180, entries: [
    { bt: 6, t1: '6:00', stops: [{ft:20,min:0}], tat: '6:00', chamber: '0', group: 'E', category: 'Normal' },
    { bt: 10, t1: '5:20', stops: [{ft:20,min:5]}, tat: '13:20', chamber: '0.5', group: 'F', category: 'Normal' },
    { bt: 15, t1: '5:00', stops: [{ft:20,min:11]}, tat: '21:20', chamber: '0.5', group: 'G', category: 'Normal' },
    { bt: 20, t1: '5:00', stops: [{ft:30,min:4},{ft:20,min:17]}, tat: '34:20', chamber: '0.5', group: 'K', category: 'SurDO2 Rec' },
    { bt: 25, t1: '5:00', stops: [{ft:30,min:8},{ft:20,min:24]}, tat: '46:20', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 30, t1: '5:00', stops: [{ft:30,min:13},{ft:20,min:30]}, tat: '58:20', chamber: '1', group: 'N', category: 'SurDO2 Rec' },
    { bt: 35, t1: '4:40', stops: [{ft:40,min:3},{ft:30,min:16},{ft:20,min:36]}, tat: '70:20', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 40, t1: '4:40', stops: [{ft:40,min:5},{ft:30,min:21},{ft:20,min:42]}, tat: '83:20', chamber: '1', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 45, t1: '4:20', stops: [{ft:40,min:7},{ft:30,min:25},{ft:20,min:48]}, tat: '96:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '4:20', stops: [{ft:40,min:9},{ft:30,min:29},{ft:20,min:54]}, tat: '109:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '4:00', stops: [{ft:50,min:2},{ft:40,min:11},{ft:30,min:33},{ft:20,min:60]}, tat: '122:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '4:00', stops: [{ft:50,min:3},{ft:40,min:13},{ft:30,min:38},{ft:20,min:66]}, tat: '135:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '3:40', stops: [{ft:60,min:1},{ft:50,min:11},{ft:40,min:19},{ft:30,min:45},{ft:20,min:79]}, tat: '162:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '3:40', stops: [{ft:60,min:5},{ft:50,min:16},{ft:40,min:24},{ft:30,min:54]}, tat: '189:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '3:20', stops: [{ft:70,min:2},{ft:60,min:9},{ft:50,min:20},{ft:40,min:29},{ft:30,min:36]}, tat: '216:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '3:20', stops: [{ft:70,min:5},{ft:60,min:13},{ft:50,min:24},{ft:40,min:34},{ft:30,min:43]}, tat: '243:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '3:00', stops: [{ft:80,min:2},{ft:70,min:9},{ft:60,min:16},{ft:50,min:28},{ft:40,min:42},{ft:30,min:57]}, tat: '287:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '2:40', stops: [{ft:80,min:4},{ft:70,min:12},{ft:60,min:20},{ft:50,min:33},{ft:40,min:50},{ft:30,min:72]}, tat: '331:40', chamber: '5', group: null, category: null }
  ]},
  { fsw: 190, entries: [
    { bt: 5, t1: '6:20', stops: [{ft:20,min:0}], tat: '6:20', chamber: '0', group: 'D', category: 'Normal' },
    { bt: 10, t1: '5:40', stops: [{ft:20,min:6]}, tat: '14:40', chamber: '0.5', group: 'F', category: 'Normal' },
    { bt: 15, t1: '5:40', stops: [{ft:20,min:12]}, tat: '22:40', chamber: '0.5', group: 'G', category: 'Normal' },
    { bt: 20, t1: '5:40', stops: [{ft:30,min:5},{ft:20,min:18]}, tat: '36:40', chamber: '0.5', group: 'K', category: 'SurDO2 Rec' },
    { bt: 25, t1: '5:40', stops: [{ft:30,min:10},{ft:20,min:25]}, tat: '48:40', chamber: '0.5', group: 'M', category: 'SurDO2 Rec' },
    { bt: 30, t1: '5:40', stops: [{ft:30,min:15},{ft:20,min:31]}, tat: '60:40', chamber: '1', group: 'O', category: 'SurDO2 Rec' },
    { bt: 35, t1: '5:20', stops: [{ft:40,min:3},{ft:30,min:19},{ft:20,min:37]}, tat: '73:20', chamber: '1', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 40, t1: '5:20', stops: [{ft:40,min:5},{ft:30,min:24},{ft:20,min:43]}, tat: '86:20', chamber: '1', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 45, t1: '5:00', stops: [{ft:40,min:7},{ft:30,min:28},{ft:20,min:49]}, tat: '99:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 50, t1: '5:00', stops: [{ft:40,min:9},{ft:30,min:32},{ft:20,min:55]}, tat: '112:20', chamber: '1.5', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 55, t1: '4:40', stops: [{ft:50,min:2},{ft:40,min:12},{ft:30,min:36},{ft:20,min:61]}, tat: '125:20', chamber: '2', group: 'Z', category: 'EE: Air / O2 Req' },
    { bt: 60, t1: '4:40', stops: [{ft:50,min:3},{ft:40,min:14},{ft:30,min:41},{ft:20,min:67]}, tat: '138:20', chamber: '2', group: null, category: null },
    { bt: 70, t1: '4:20', stops: [{ft:60,min:1},{ft:50,min:12},{ft:40,min:20},{ft:30,min:46},{ft:20,min:80]}, tat: '165:20', chamber: '2.5', group: null, category: null },
    { bt: 80, t1: '4:20', stops: [{ft:60,min:5},{ft:50,min:17},{ft:40,min:25},{ft:30,min:55]}, tat: '192:20', chamber: '3', group: null, category: null },
    { bt: 90, t1: '4:00', stops: [{ft:70,min:2},{ft:60,min:10},{ft:50,min:21},{ft:40,min:30},{ft:30,min:37]}, tat: '219:20', chamber: '3.5', group: null, category: null },
    { bt: 100, t1: '4:00', stops: [{ft:70,min:5},{ft:60,min:14},{ft:50,min:25},{ft:40,min:35},{ft:30,min:44]}, tat: '246:20', chamber: '4', group: null, category: null },
    { bt: 120, t1: '3:40', stops: [{ft:80,min:2},{ft:70,min:10},{ft:60,min:17},{ft:50,min:29},{ft:40,min:43},{ft:30,min:58]}, tat: '290:20', chamber: '4.5', group: null, category: null },
    { bt: 140, t1: '3:20', stops: [{ft:80,min:4},{ft:70,min:13},{ft:60,min:21},{ft:50,min:34},{ft:40,min:51},{ft:30,min:73]}, tat: '334:40', chamber: '5', group: null, category: null }
  ]}
];

// Meter -> fsw conversion depth rows used by UI
const METER_INPUT_DEPTHS = [9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45];

function metersToFsw(m) { return m * 3.2808399; }
function fswToMeters(fsw) { return fsw / 3.2808399; }

function getTableDepthFsw(meters) {
  const fsw = metersToFsw(meters);
  for (let i = 0; i < TABLE_9_7.length; i++) {
    if (TABLE_9_7[i].fsw >= fsw) return TABLE_9_7[i].fsw;
  }
  return null;
}

function getNDLAtDepthFsw(fsw) {
  const row = TABLE_9_7.find(r => r.fsw === fsw);
  return row ? row.ndl : null;
}

function getGroupAtDepthFsw(fsw, bottomTime) {
  const row = TABLE_9_7.find(r => r.fsw === fsw);
  if (!row) return null;
  for (let i = 0; i < row.groups.length; i++) {
    const g = row.groups[i];
    if (g.max === '*') return g.g;
    if (bottomTime <= g.max) return g.g;
  }
  return 'Z';
}

function getNewGroupAfterSIT(startGroup, sitMinutes) {
  const entry = TABLE_9_8_SI[startGroup];
  if (!entry) return 'A';
  if (entry.notRep !== null && sitMinutes > entry.notRep) return 'A'; // fully clean
  if (sitMinutes < 10) return startGroup; // less than 10 min = same dive
  for (const range of entry.ranges) {
    if (sitMinutes >= range.lo && sitMinutes <= range.hi) return range.to;
  }
  return 'A';
}

function parseTimeMinutes(str) {
  if (!str) return null;
  const m = String(str).match(/^(\d+):(\d{2})$/);
  if (m) return parseInt(m[1],10)*60 + parseInt(m[2],10);
  return parseInt(str,10);
}

function formatMinutes(mins) {
  const h = Math.floor(mins/60);
  const m = mins % 60;
  return (h>0? h+'h ':'') + m + ' menit';
}

function getRNT(group, depthMeters) {
  const fsw = getTableDepthFsw(depthMeters);
  if (!fsw) return 0;
  const depthKey = String(fsw);
  const row = TABLE_9_8_RNT[depthKey];
  if (!row) return 0;
  const val = row[group];
  if (!val || val === '**' || val === '†') return 0;
  return parseInt(val,10);
}

function getDecoSchedule(depthMeters, bottomTime) {
  const fsw = getTableDepthFsw(depthMeters);
  if (!fsw) return null;
  const depthEntry = TABLE_9_9.find(d => d.fsw === fsw);
  if (!depthEntry) return null;
  // Find row: exact BT or next higher (conservative)
  let selected = null;
  for (const e of depthEntry.entries) {
    if (e.bt >= bottomTime) { selected = e; break; }
  }
  if (!selected) selected = depthEntry.entries[depthEntry.entries.length-1];
  return { fsw, schedule: selected };
}

// ==========================================
// 1. SISTEM LOGIN & AUTENTIKASI SESI
// ==========================================
function checkLogin() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value.trim();
  const errorEl = document.getElementById('loginError');
  const btn = document.querySelector('button[type="submit"]');

  // Kredensial (ubah sesuai kebutuhan)
  const okUser = 'barapratama';
  const okPass = 'barakuda46';

  // Sembunyikan error dulu
  errorEl.style.display = 'none';

  if (user === '' || pass === '') {
    errorEl.style.display = 'block';
    errorEl.innerText = 'Username dan Password wajib diisi!';
    return;
  }

  if (user === okUser && pass === okPass) {
    // Berhasil login
    document.getElementById('loginOverlay').style.display = 'none';
    document.body.classList.remove('logged-out');
    document.body.classList.add('logged-in');
    try { sessionStorage.setItem('isLoggedIn', 'true'); } catch(e) {}
    if (btn) btn.innerText = 'Masuk...';
    setTimeout(() => { if (btn) btn.innerText = 'Masuk Sistem'; }, 1000);
  } else {
    // Gagal login
    errorEl.style.display = 'block';
    errorEl.innerText = 'Username atau Password salah!';
    if (btn) btn.innerText = 'Masuk Sistem';
  }
}

function togglePasswordVisibility() {
  const passInput = document.getElementById('loginPass');
  const toggleIcon = document.getElementById('togglePassIcon');
  if (!passInput || !toggleIcon) return;
  if (passInput.type === 'password') {
    passInput.type = 'text';
    toggleIcon.innerText = '🙈';
  } else {
    passInput.type = 'password';
    toggleIcon.innerText = '👁️';
  }
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      document.getElementById('loginOverlay').style.display = 'none';
      document.body.classList.remove('logged-out');
      document.body.classList.add('logged-in');
    }
  } catch(e) {}
  updateFeedbackCount();
});

// ==========================================
// 2. GALERI INFOGRAFIK PERALATAN & MODAL POPUP
// ==========================================
const galleryData = [
  {
    title: "Peralatan Selam Klasik (US Navy Mark V Heavy Gear)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV2OO96-XMF5La0367P1GbgX9mzsuRcizQ4EN6wDJqUg&s=10",
    desc: `<p>Sistem Standard Diving Dress legendaris yang menjadi fondasi sejarah penyelaman militer dan teknik komersial bawah air abad ke-20. Terdiri dari helm spun-copper 12-bolt dengan dudukan dada (breastplate), baju kanvas kedap air, serta sepatu bot bertimbal 8 kg per kaki.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Suplai Gas:</strong> Kompresor Permukaan via Umbilical</div>
      <div class="spec-item"><strong>Beban Total Alat:</strong> ± 85 - 90 kg (Satu Set)</div>
      <div class="spec-item"><strong>Operasional Maks:</strong> 60 Msw (190 Fsw) Udara</div>
      <div class="spec-item"><strong>Misi Utama:</strong> Heavy Salvage, Konstruksi Pelabuhan</div>
    </div>`
  },
  {
    title: "SCUBA Open Circuit (Self-Contained Breathing Apparatus)",
    image: "https://cdn.pixabay.com/photo/2015/03/11/15/19/divers-668777_640.jpg",
    desc: `<p>Sistem selam mandiri di mana pasokan udara bertekanan tinggi disalurkan melalui regulator dua tingkat dan seluruh hembusan napas dibuang langsung ke lingkungan perairan.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Tekanan Tabung:</strong> 200 - 232 Bar (Aluminium / Steel)</div>
      <div class="spec-item"><strong>Campuran Gas:</strong> Compressed Air / EANx (Nitrox 32-36%)</div>
      <div class="spec-item"><strong>Limit Rekreasional:</strong> Maksimal 40 Meter (130 Fsw)</div>
      <div class="spec-item"><strong>Keunggulan:</strong> Portabilitas Tinggi & Deployment Cepat</div>
    </div>`
  },
  {
    title: "Semi-Closed Circuit Rebreather (SCR)",
    image: "https://img.nauticexpo.com/images_ne/photo-g/70297-12201435.webp",
    desc: `<p>Penyelaman rebreather yang mendaur ulang sebagian gas pernapasan penyelam. CO₂ diserap oleh scrubber dan sebagian gas dibuang serta digantikan dengan gas baru dari tabung.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Efisiensi Gas:</strong> Mengurangi Buangan Gas hingga 70%</div>
      <div class="spec-item"><strong>Media Scrubber:</strong> Sofnolime / Sodalime Absorber</div>
      <div class="spec-item"><strong>Kedalaman Kerja:</strong> 0 - 100 Meter</div>
      <div class="spec-item"><strong>Aplikasi Khusus:</strong> Operasi Taktis Senyap & Riset Biologi</div>
    </div>`
  },
  {
    title: "Closed Circuit Rebreather (eCCR)",
    image: "https://www.scubadiving.com/sites/default/files/styles/small/public/scubadiving/scd0318_divehacks_scd0318_divehacks_20121101-dsc_0849-edit.jpg?itok=F-wDNR2-",
    desc: `<p>eCCR menggunakan sensor galvanic oksigen dan solenoid elektronik untuk mengontrol pO₂ secara otomatis pada setpoint konstan tanpa gelembung udara.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Manajemen pO2:</strong> Otomatis via Microprocessor Solenoid</div>
      <div class="spec-item"><strong>Gas Diluent:</strong> Normoxic / Hypoxic Trimix</div>
      <div class="spec-item"><strong>Kedalaman Operasi:</strong> 60 - 150+ Meter</div>
      <div class="spec-item"><strong>Profil Dekompresi:</strong> Sangat Efisien</div>
    </div>`
  },
  {
    title: "SSBA (Surface-Supplied Breathing Apparatus)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvrUP0Bv0v0pxG9dpR96kYenJQHrnOIccen1NtO8mL4z6d99Nj_3QLVU&s=10",
    desc: `<p>Standar keselamatan utama industri Commercial Diving. Penyelam menggunakan helm komersial (Kirby Morgan KM-37) yang disuport penuh dari permukaan via Umbilical Bundle.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Sistem Keamanan:</strong> Bailout Bottle di Punggung</div>
      <div class="spec-item"><strong>Monitoring:</strong> Suara, Kedalaman, & Video Real-time</div>
      <div class="spec-item"><strong>Batas Kedalaman:</strong> 0 - 50 Msw (Air/Nitrox)</div>
      <div class="spec-item"><strong>Standard Regulasi:</strong> IMCA / ADCI Commercial Standards</div>
    </div>`
  },
  {
    title: "Saturasi / Saturation Diving (Sat Bell System)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT59YrFA50l5tBa4Qi3xWLOXPwlQQ_eEkY9s3Pa7YQX9a-WnoAoZ4d6YSn2&s=10",
    desc: `<p>Metode penyelaman tingkat tertinggi untuk kedalaman laut dalam di mana jaringan tubuh penyelam dibiarkan jenuh total oleh campuran gas Heliox (He/O₂).</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Campuran Gas:</strong> Heliox (Mencegah Nitrogen Narcosis)</div>
      <div class="spec-item"><strong>Kedalaman Operasi:</strong> 50 - 300+ Meter</div>
      <div class="spec-item"><strong>Siklus Dekompresi:</strong> HANYA 1 Kali di Akhir Rotasi</div>
      <div class="spec-item"><strong>Dukungan Suhu:</strong> Hot Water Suit</div>
    </div>`
  },
  {
    title: "Fun & Sport Diving (Rekreasi)",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYjo-ydgi2y982bOQ8qIrbSTXZDW3iHIYHSXP2gTKuZw&s=10",
    desc: `<p>Aktivitas eksplorasi bawah air non-industri yang dipatok ketat wajib berada di dalam batas kurva No-Decompression Limit (NDL).</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Batas NDL:</strong> Selalu di dalam kurva aman</div>
      <div class="spec-item"><strong>Kedalaman Maks:</strong> 18m (Open Water) / 30m (Advanced)</div>
      <div class="spec-item"><strong>Safety Rule:</strong> Safety Stop 3 Menit di Kedalaman 5m</div>
    </div>`
  },
  {
    title: "Underwater Survey, Inspection & NDT",
    image: "https://lhdiving.com.vn/UserFile/editor/images/Brochure%20Lam%20Hong%20(EDIT%202)%20Sep%202019_007.jpg",
    desc: `<p>Pekerjaan inspeksi teknis struktur bawah air untuk keperluan audit sertifikasi kelas (UWILD, Ultrasonic Thickness Testing).</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Metode NDT:</strong> UT, MPI, & ACFM Testing</div>
      <div class="spec-item"><strong>Inspeksi Anoda:</strong> CP Potential Measurement</div>
      <div class="spec-item"><strong>Output Data:</strong> Laporan Visual HD & Pemetaan Korosi</div>
    </div>`
  },
  {
    title: "Pengelasan Bawah Air (Underwater Welding)",
    image: "https://lhdiving.com.vn/UserFile/News/Category/2019_09_24_08_37_29_22.jpg",
    desc: `<p>Penyambungan konstruksi baja berisiko tinggi. Terdiri dari Wet Welding (pengelasan basah) dan Dry Hyperbaric Welding (pengelasan presisi dalam habitat kedap air).</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Sumber Arus:</strong> DC Straight Polarity (DCEN)</div>
      <div class="spec-item"><strong>Proteksi:</strong> Safety Knife Switch di Permukaan</div>
      <div class="spec-item"><strong>Kualifikasi:</strong> AWS D3.6M Class A & B Welder-Diver</div>
    </div>`
  },
  {
    title: "Pekerjaan Salvage & Subsea Refloating",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4QnHrQCnjAEwqsH0xMhDqY1zC60_fDKcjkqNVVW98AsOZgaHxi6eqXl_K&s=10",
    desc: `<p>Operasi kompleks pengangkatan rangka kapal tenggelam, pembersihan rintangan alur pelayaran, dan penanganan kargo subsea.</p>
    <div class="spec-grid">
      <div class="spec-item"><strong>Alat Potong:</strong> Broco Exothermic Cutting Rods (5,500°C)</div>
      <div class="spec-item"><strong>Alat Apung:</strong> Parachute Air Lift Bags</div>
      <div class="spec-item"><strong>Prinsip Fisika:</strong> Hukum Archimedes & Displacement</div>
    </div>`
  }
];

function openGalleryModal(index) {
  const data = galleryData[index];
  document.getElementById('modalTitle').innerText = data.title;
  document.getElementById('modalImg').src = data.image;
  document.getElementById('modalDesc').innerHTML = data.desc;
  document.getElementById('galleryModal').classList.add('active');
}

function closeGalleryModal(event) {
  if (!event || event.target === document.getElementById('galleryModal') || event.target.classList.contains('close-btn')) {
    document.getElementById('galleryModal').classList.remove('active');
  }
}

function handleImageFallback(img) {
  img.onerror = null;
  img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260" viewBox="0 0 600 260"><rect width="100%" height="100%" fill="%230f172a"/><circle cx="300" cy="110" r="40" fill="%231e293b" stroke="%2338bdf8" stroke-width="4"/><path d="M280 110 L320 110 M300 90 L300 130" stroke="%2338bdf8" stroke-width="4"/><text x="50%" y="180" fill="%2338bdf8" font-family="Segoe UI, sans-serif" font-weight="bold" font-size="16" text-anchor="middle">Visual Dokumentasi Penyelaman</text></svg>';
}

function switchTab(event, tabId) {
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ==========================================
// 3. CHECKLIST & TIMER SAFETY STOP
// ==========================================
function updateProgress() {
  const checkboxes = document.querySelectorAll('#simulasi input[type="checkbox"]');
  let checked = 0;
  checkboxes.forEach(cb => { if (cb.checked) checked++; });
  const percentage = Math.round((checked / checkboxes.length) * 100);
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  progressBar.style.width = percentage + '%';
  progressText.innerText = percentage + '% Terverifikasi';
  if(percentage === 100) {
    progressText.innerText = "100% Siap! Pemeriksaan BWRAF Selesai, Safe Diving!";
    progressText.style.color = "var(--success)";
  } else {
    progressText.style.color = "var(--accent-cyan)";
  }
}

let timerInterval;
let timeLeft = 180;

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timerDisplay').innerText =
    `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function startTimer() {
  if (timeLeft <= 0) resetTimer();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      alert("Safety Stop Selesai! Anda diperbolehkan naik ke permukaan secara perlahan.");
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 180;
  updateTimerDisplay();
}

// ==========================================
// 4. KALKULATOR US NAVY REV 7 (TABEL 9-7, 9-8, 9-9)
// ==========================================

function calculateNDL() {
  const depthInput = parseFloat(document.getElementById('inputDepth').value);
  const timeInput = parseInt(document.getElementById('inputTime').value);
  const resultBox = document.getElementById('resultNDLBox');

  if (!depthInput || !timeInput || depthInput <= 0 || timeInput <= 0) {
    alert("Masukkan kedalaman dan waktu yang valid!");
    return;
  }

  const tableDepth = getTableDepthFsw(depthInput);
  if (!tableDepth) {
    resultBox.style.display = 'block';
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>⚠️ Di Luar Batas Tabel US Navy Rev 7</h3>
      <p>Kedalaman ${depthInput}m (≈${metersToFsw(depthInput).toFixed(1)} fsw) melebihi batas tabel udara US Navy (190 fsw / ≈58m).</p>
      <p><strong>Jangan gunakan tabel ini untuk perencanaan selam di kedalaman ini.</strong> Gunakan gas campuran spesialis (Heliox/Trimix) dan konsultasikan dengan Dive Supervisor terqualifikasi.</p>`;
    return;
  }

  const maxNDL = getNDLAtDepthFsw(tableDepth);
  const group = getGroupAtDepthFsw(tableDepth, timeInput);
  const depthMeters = fswToMeters(tableDepth).toFixed(1);

  resultBox.style.display = 'block';

  if (maxNDL === null) {
    // Unlimited NDL (10 fsw & 15 fsw rows)
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ TIDAK ADA BATAS NDL (Unlimited)</h3>
      <p>Di kedalaman <strong>${depthInput}m</strong> (tabel ${tableDepth} fsw / ≈${depthMeters}m), US Navy Rev 7 tidak menetapkan batas NDL (unlimited no-stop).</p>
      <p>Repetitive Group: <strong>Group ${group}</strong>.</p>
      <p><i>Catatan: Meskipun tidak terbatas, tetap patuhi aturan safety stop dan prosedur standar.</i></p>`;
    return;
  }

  if (timeInput <= maxNDL) {
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ PENYELAMAN AMAN (No-Decompression Dive)</h3>
      <p>Batas NDL US Navy Rev 7 untuk kedalaman <strong>${depthInput}m</strong> (tabel <strong>${tableDepth} fsw / ≈${depthMeters}m</strong>) adalah <strong>${maxNDL} Menit</strong>.</p>
      <p>Rencana waktu: <strong>${timeInput} Menit</strong> | Repetitive Group: <strong>Group ${group}</strong>.</p>
      <p>Marjin keselamatan: <strong>${maxNDL - timeInput} menit</strong> tersisa di dasar.</p>
      <p><i>Lakukan safety stop standar 3 menit pada kedalaman 5 meter sebelum naik ke permukaan.</i></p>`;
  } else {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 BAHAYA: MELEBIHI BATAS NDL</h3>
      <p>Batas NDL US Navy Rev 7 untuk kedalaman <strong>${depthInput}m</strong> (tabel ${tableDepth} fsw) hanya <strong>${maxNDL} Menit</strong>.</p>
      <p>Rencana Anda (${timeInput} menit) melebihi batas sebanyak <strong>${timeInput - maxNDL} menit</strong>. Wajib melakukan dekompresi!</p>
      <p>Gunakan kalkulator "Dekompresi Air" untuk menentukan jadwal stop wajib.</p>`;
  }
}

function calculateRepetitive() {
  const d1Depth = parseFloat(document.getElementById('repD1Depth').value);
  const d1Time = parseInt(document.getElementById('repD1Time').value);
  const sit = parseInt(document.getElementById('repSIT').value);
  const d2Depth = parseFloat(document.getElementById('repD2Depth').value);
  const d2Time = parseInt(document.getElementById('repD2Time').value);
  const resultBox = document.getElementById('resultRepetitiveBox');

  if (!d1Depth || !d1Time || !sit || !d2Depth || !d2Time) {
    alert("Lengkapi seluruh bidang input dengan benar!");
    return;
  }

  const d1Table = getTableDepthFsw(d1Depth);
  const d2Table = getTableDepthFsw(d2Depth);
  if (!d1Table || !d2Table) {
    alert("Kedalaman salah satu penyelaman di luar batas tabel US Navy Rev 7 (maks 58m / 190 fsw)!");
    return;
  }

  let group1 = getGroupAtDepthFsw(d1Table, d1Time);
  let groupAfterSIT = getNewGroupAfterSIT(group1, sit);
  let rnt = getRNT(groupAfterSIT, d2Depth);
  let esdt = rnt + d2Time;

  const maxNDL2 = getNDLAtDepthFsw(d2Table);
  let finalGroup = null;
  if (maxNDL2 === null) {
    finalGroup = getGroupAtDepthFsw(d2Table, esdt);
  } else {
    finalGroup = getGroupAtDepthFsw(d2Table, esdt);
  }

  resultBox.style.display = 'block';

  if (maxNDL2 === null || esdt <= maxNDL2) {
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ PROFIL REPETITIF AMAN (US NAVY REV 7)</h3>
      <p><strong>Group Pasca Dive 1:</strong> Group ${group1}</p>
      <p><strong>Group Setelah Surface Interval (${sit} mnt):</strong> Group ${groupAfterSIT}</p>
      <p><strong>Residual Nitrogen Time (RNT):</strong> +${rnt} Menit</p>
      <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${d2Time}m (Bottom) + ${rnt}m (RNT) = <strong>${esdt} Menit</strong></p>
      <p>Batas NDL Kedalaman Dive 2 (${d2Depth}m / tabel ${d2Table} fsw) adalah <strong>${maxNDL2 === null ? 'Unlimited' : maxNDL2 + ' Menit'}</strong>. Repetitive Group Akhir: <strong>Group ${finalGroup}</strong>.</p>
      <p><i>Lakukan safety stop 3 menit di 5m sebelum naik ke permukaan.</i></p>`;
  } else {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 RISIKO DEKOMPRESI PADA DIVE 2</h3>
      <p><strong>Group Pasca SIT:</strong> Group ${groupAfterSIT} | <strong>RNT:</strong> +${rnt} Menit</p>
      <p><strong>Total Waktu Ekivalen (ESDT):</strong> ${esdt} Menit (Melebihi limit NDL ${maxNDL2} Menit pada kedalaman ${d2Depth}m / tabel ${d2Table} fsw).</p>
      <p><strong>Saran Prosedur:</strong> Perpanjang jeda permukaan (SIT) atau kurangi durasi Dive 2! Gunakan kalkulator dekompresi jika melanjutkan.</p>`;
  }
}

function calculateDecompression() {
  const depth = parseFloat(document.getElementById('decDepth').value);
  const time = parseInt(document.getElementById('decTime').value);
  const resultBox = document.getElementById('resultDecomBox');

  if (!depth || !time || depth <= 0 || time <= 0) {
    alert("Masukkan kedalaman dan waktu yang valid!");
    return;
  }

  const tableDepth = getTableDepthFsw(depth);
  if (!tableDepth) {
    resultBox.style.display = 'block';
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>⚠️ Di Luar Batas Tabel</h3>
      <p>Kedalaman ${depth}m melebihi batas tabel udara US Navy Rev 7 (190 fsw / ≈58m).</p>
      <p>Selam dekompresi di kedalaman ini membutuhkan gas campuran spesialis dan supervisi Dive Supervisor profesional.</p>`;
    return;
  }

  const maxNDL = getNDLAtDepthFsw(tableDepth);
  resultBox.style.display = 'block';

  if (maxNDL === null || time <= maxNDL) {
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ TIDAK MEMERLUKAN STOP DEKOMPRESI WAJIB</h3>
      <p>Penyelaman pada <strong>${depth}m / ${time} min</strong> masih di dalam batas NDL (${maxNDL === null ? 'Unlimited' : maxNDL} min).</p>
      <p>Lakukan Safety Stop standar 3 menit pada kedalaman 5 meter.</p>`;
    return;
  }

  const deco = getDecoSchedule(depth, time);
  if (!deco) {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 Gagal mencari jadwal dekompresi</h3>
      <p>Data jadwal dekompresi tidak tersedia untuk kombinasi kedalaman dan waktu ini.</p>`;
    return;
  }

  const sched = deco.schedule;
  const stopsHtml = sched.stops
    .filter(s => s.min > 0)
    .map(s => `<td><strong>${s.ft} fsw</strong> (≈${fswToMeters(s.ft).toFixed(1)}m): ${s.min} min</td>`)
    .join('') || '<td colspan="3">Tidak ada stop dekompresi wajib (hanya safety stop 3 menit di 5m)</td>';

  let gasNote = '';
  if (sched.category && sched.category.includes('EE')) {
    gasNote = `<p style="color:#ef4444;"><strong>⚠️ Exceptional Exposure:</strong> ${sched.category}. Perlu persentase oksigen tertinggi dan supervisi ketat.</p>`;
  }

  const depthMeters = fswToMeters(deco.fsw).toFixed(1);
  resultBox.className = 'result-box danger';
  resultBox.innerHTML = `<h3>🚨 JADWAL STOP DEKOMPRESI WAJIB (US Navy Table 9-9)</h3>
    <p>Penyelaman <strong>${depth}m / ${time} min</strong> telah MELEBIHI batas NDL (${maxNDL} min).</p>
    <p><strong>Baris tabel:</strong> ${deco.fsw} fsw (≈${depthMeters}m) | <strong>Bottom time:</strong> ${sched.bt} min</p>
    <table class="decom-table">
      <tr><th>Stop</th><th>Waktu Stop</th><th>Total Ascent Time</th></tr>
      <tr>
        <td>Berbagai kedalaman</td>
        <td>${stopsHtml}</td>
        <td><strong>${sched.tat}</strong></td>
      </tr>
    </table>
    <p style="margin-top:0.8rem; font-size:0.88rem;">*Kecepatan naik standar US Navy Rev 7: <strong>30 fsw/min (≈9 m/min)</strong>.</p>
    ${gasNote}
    <p><i>Catatan: Jadwal di atas adalah transkripsi tabel resmi. Verifikasi dengan publikasi asli NAVSEA sebelum penggunaan operasional.</i></p>`;
}

// ==========================================
// 5. KALKULATOR FUNGSI FISIOLOGI (NITROX, HELIOX, TRIMIX)
// ==========================================

function calculateNitrox() {
  const fo2 = parseFloat(document.getElementById('nxO2').value) / 100;
  const depth = parseFloat(document.getElementById('nxDepth').value);
  const po2Limit = parseFloat(document.getElementById('nxPO2Limit').value);
  const resultBox = document.getElementById('resultNitroxBox');

  if (!fo2 || fo2 < 0.21 || fo2 > 1.0 || !depth || depth <= 0) {
    alert("Masukkan FO2 (21–100%) dan kedalaman yang valid!");
    return;
  }

  let fn2 = 1 - fo2;
  let ead = (((fn2) * (depth + 10)) / 0.79) - 10;
  let eadCeil = Math.ceil(ead);
  let currentPO2 = fo2 * ((depth + 10) / 10);
  let mod = ((po2Limit / fo2) - 1) * 10;

  resultBox.style.display = 'block';

  if (currentPO2 > po2Limit) {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN (CNS Toxicity)</h3>
      <p>Tekanan Parsial O2 (PO<sub>2</sub>) pada kedalaman ${depth}m mencapai <strong>${currentPO2.toFixed(2)} Bar</strong> (Melebihi batas aman ${po2Limit} Bar).</p>
      <p><strong>Maximum Operating Depth (MOD)</strong> untuk EAN${Math.round(fo2*100)} adalah <strong>${mod.toFixed(1)} Meter</strong>.</p>
      <p><strong>EAD:</strong> ${ead.toFixed(1)} Meter (dibulatkan ke ${eadCeil}m untuk NDL Air Table 9-7).</p>`;
  } else {
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ PARAMETER NITROX AMAN (EAN${Math.round(fo2*100)})</h3>
      <p><strong>Equivalent Air Depth (EAD):</strong> ${ead.toFixed(1)} Meter &rarr; <em>Dibulatkan ke ${eadCeil}m untuk NDL Air Table 9-7</em>.</p>
      <p><strong>Tekanan Parsial O2 (PO<sub>2</sub>):</strong> ${currentPO2.toFixed(2)} Bar (Limit Safe: ≤ ${po2Limit} Bar).</p>
      <p><strong>Maximum Operating Depth (MOD):</strong> ${mod.toFixed(1)} Meter.</p>`;
  }
}

function calculateHeliox() {
  const fo2 = parseFloat(document.getElementById('hxO2').value) / 100;
  const depth = parseFloat(document.getElementById('hxDepth').value);
  const resultBox = document.getElementById('resultHelioxBox');

  if (!fo2 || fo2 <= 0 || fo2 > 1.0 || !depth || depth <= 0) {
    alert("Masukkan persentase O2 dan kedalaman yang valid!");
    return;
  }

  let fhe = 1 - fo2;
  let po2 = fo2 * ((depth + 10) / 10);
  let phe = fhe * ((depth + 10) / 10);
  let mod = ((1.4 / fo2) - 1) * 10;

  resultBox.style.display = 'block';

  if (po2 > 1.4) {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN HELIOX</h3>
      <p>PO<sub>2</sub> pada kedalaman ${depth}m = <strong>${po2.toFixed(2)} Bar</strong> (Melebihi batas aman 1.4 Bar).</p>
      <p>MOD maksimal Heliox ini adalah <strong>${mod.toFixed(1)}m</strong>.</p>`;
  } else if (fo2 < 0.16) {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 BAHAYA HIPOSIA DI PERMUKAAN</h3>
      <p>Campuran Heliox dengan ${Math.round(fo2*100)}% O2 menyebabkan tekanan parsial O2 di permukaan hanya <strong>${fo2.toFixed(2)} Bar</strong> (di bawah 0.16 Bar = hipoksia).</p>
      <p><strong>Tidak aman untuk bernapas di permukaan!</strong> Gunakan sebagai gas bottom atau dekompresi saja, bukan gas pernapasan di permukaan.</p>
      <p>PO<sub>2</sub> pada ${depth}m: ${po2.toFixed(2)} Bar | P<sub>He</sub>: ${phe.toFixed(2)} Bar</p>`;
  } else {
    resultBox.className = 'result-box info';
    resultBox.innerHTML = `<h3>📊 ANALISIS CAMPURAN HELIOX (${Math.round(fo2*100)}% O2 / ${Math.round(fhe*100)}% He)</h3>
      <p><strong>Tekanan Parsial Oksigen (PO<sub>2</sub>):</strong> ${po2.toFixed(2)} Bar (Aman ≤ 1.4 Bar)</p>
      <p><strong>Tekanan Parsial Helium (P<sub>He</sub>):</strong> ${phe.toFixed(2)} Bar</p>
      <p><strong>Narkosis Nitrogen (PN<sub>2</sub>):</strong> 0.00 Bar (Bebas Risiko Narkosis Nitrogen!)</p>
      <p><strong>MOD Working (PO<sub>2</sub> 1.4):</strong> ${mod.toFixed(1)} Meter</p>`;
  }
}

function calculateTrimix() {
  const fo2 = parseFloat(document.getElementById('tmxO2').value) / 100;
  const fhe = parseFloat(document.getElementById('tmxHe').value) / 100;
  const depth = parseFloat(document.getElementById('tmxDepth').value);
  const po2Limit = parseFloat(document.getElementById('tmxPO2Limit').value);
  const resultBox = document.getElementById('resultTrimixBox');

  if (!fo2 || !fhe || !depth || depth <= 0) {
    alert("Masukkan semua nilai dengan benar!");
    return;
  }

  if (fo2 < 0 || fo2 > 1 || fhe < 0 || fhe > 1) {
    alert("Persentase gas harus antara 0 dan 100%!");
    return;
  }

  let fn2 = 1 - fo2 - fhe;
  if (fn2 < 0) {
    alert("Jumlah persentase O2 + Helium melebihi 100%!");
    return;
  }

  let end = ((fn2 / 0.79) * (depth + 10)) - 10;
  let po2 = fo2 * ((depth + 10) / 10);
  let pn2 = fn2 * ((depth + 10) / 10);
  let phe = fhe * ((depth + 10) / 10);
  let mod = ((po2Limit / fo2) - 1) * 10;

  resultBox.style.display = 'block';

  if (po2 > po2Limit) {
    resultBox.className = 'result-box danger';
    resultBox.innerHTML = `<h3>🚨 BAHAYA KERACUNAN OKSIGEN TRIMIX</h3>
      <p>PO<sub>2</sub> pada ${depth}m = <strong>${po2.toFixed(2)} Bar</strong> (Melebihi batas ${po2Limit} Bar).</p>
      <p>MOD maksimal: <strong>${mod.toFixed(1)}m</strong>.</p>`;
  } else {
    resultBox.className = 'result-box safe';
    resultBox.innerHTML = `<h3>✅ PROFIL TEKNIKAL TRIMIX (${Math.round(fo2*100)}/${Math.round(fhe*100)}/${Math.round(fn2*100)})</h3>
      <p><strong>Equivalent Narcotic Depth (END):</strong> ${end.toFixed(1)} Meter (Efek narkosis nitrogen setara penyelaman udara pada kedalaman ${Math.ceil(end)}m).</p>
      <p><strong>Tekanan Parsial Gas:</strong> PO<sub>2</sub>: ${po2.toFixed(2)} Bar | PN<sub>2</sub>: ${pn2.toFixed(2)} Bar | P<sub>He</sub>: ${phe.toFixed(2)} Bar</p>
      <p><strong>Maximum Operating Depth (MOD):</strong> ${mod.toFixed(1)} Meter</p>
      <p><i>Catatan: END dihitung dengan asumsi O2 non-narkotik (dibagi 0.79). Beberapa standar lain menganggap O2 narkotik, sehingga END akan lebih pendek.</i></p>`;
  }
}

// ==========================================
// 6. FORM ADUAN INTEGRASI FORMSPREE
// ==========================================

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function saveFeedback() {
  const nama = document.getElementById('fbNama').value.trim();
  const email = document.getElementById('fbEmail').value.trim();
  const kategori = document.getElementById('fbKategori').value;
  const phone = document.getElementById('fbPhone').value.trim();
  const pesan = document.getElementById('fbPesan').value.trim();

  if (!nama || !email || !pesan) {
    alert('Mohon isi semua bidang utama yang bertanda asterisk (*)!');
    return;
  }

  const btnSubmit = document.querySelector('#feedbackForm button[type="submit"]');
  const originalBtnText = btnSubmit.innerText;
  btnSubmit.innerText = "Mengirim...";
  btnSubmit.disabled = true;

  const formData = new FormData();
  formData.append('Nama', nama);
  formData.append('Email', email);
  formData.append('Kategori', kategori);
  formData.append('Telepon', phone || '-');
  formData.append('Pesan', pesan);

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      const feedbackData = {
        id: Date.now(),
        nama, email, kategori, phone: phone || '-', pesan,
        waktu: new Date().toLocaleString('id-ID')
      };
      let stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
      stored.push(feedbackData);
      localStorage.setItem('bpsb8_feedback_messages', JSON.stringify(stored));

      document.getElementById('feedbackForm').reset();
      const alertEl = document.getElementById('fbAlert');
      if (alertEl) {
        alertEl.style.display = 'block';
        setTimeout(() => { alertEl.style.display = 'none'; }, 4000);
      }
      updateFeedbackCount();
      renderFeedbackList();
    } else {
      const data = await response.json();
      alert('Gagal mengirim aduan: ' + (data.error || 'Terjadi kesalahan pada layanan Formspree.'));
    }
  } catch (error) {
    console.error('Formspree Submission Error:', error);
    alert('Gagal terhubung ke Formspree. Pastikan Anda terhubung ke internet.');
  } finally {
    btnSubmit.innerText = originalBtnText;
    btnSubmit.disabled = false;
  }
}

function clearAllFeedback() {
  if (!confirm('Yakin ingin menghapus semua riwayat aduan dari browser ini?')) return;
  localStorage.removeItem('bpsb8_feedback_messages');
  updateFeedbackCount();
  renderFeedbackList();
  alert('Semua riwayat aduan telah dihapus.');
}

function updateFeedbackCount() {
  const countEl = document.getElementById('fbCount');
  if (!countEl) return;
  const stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
  countEl.innerText = stored.length;
}

function toggleFeedbackList() {
  const container = document.getElementById('fbListContainer');
  if (container.style.display === 'none' || container.style.display === '') {
    container.style.display = 'block';
    renderFeedbackList();
  } else {
    container.style.display = 'none';
  }
}

function renderFeedbackList() {
  const listItems = document.getElementById('fbListItems');
  if (!listItems) return;
  const stored = JSON.parse(localStorage.getItem('bpsb8_feedback_messages') || '[]');
  if (stored.length === 0) {
    listItems.innerHTML = '<p style="color: #94a3b8; font-style: italic;">Belum ada riwayat aduan yang terkirim dari browser ini.</p>';
    return;
  }
  listItems.innerHTML = stored.map(item => `
    <div style="background: #152238; border: 1px solid #334155; border-radius: 8px; padding: 12px; font-size: 0.9rem; margin-bottom: 10px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px; border-bottom: 1px solid #2d3e58; padding-bottom: 4px;">
        <strong style="color: var(--accent-cyan);">${escapeHtml(item.nama)} <span style="color: #cbd5e1; font-weight: normal;">(${escapeHtml(item.kategori)})</span></strong>
        <span style="color: #94a3b8; font-size: 0.8rem;">${item.waktu}</span>
      </div>
      <div style="color: #cbd5e1; font-size: 0.85rem; margin-bottom: 6px;">
        📧 ${escapeHtml(item.email)} | 📱 ${escapeHtml(item.phone)}
      </div>
      <p style="color: #f8fafc; margin: 0;">${escapeHtml(item.pesan)}</p>
    </div>
  `).join('');
}