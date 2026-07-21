/* ══════════════════════════════════════════════════════════
   스트링 작업일지 — app.js
   ══════════════════════════════════════════════════════════ */

/* ---------- default data ---------- */
const DEF_RACKET_BRANDS = ['Babolat','Diadem','Donnay','Dunlop','Head','Prince','Tecnifibre','Volkl','Wilson','Yonex'];
const DEF_RACKET_MODELS = {
  Babolat:['Pure Aero','Pure Control','Pure Drive','Pure Strike'],
  Diadem:['Axis','Elevate','Nova'],
  Donnay:['eX-Dual','Formula','Pro One'],
  Dunlop:['CX','FX','SX'],
  Head:['Boom','Prestige','Radical','Speed'],
  Prince:['Phantom','Textreme Tour'],
  Tecnifibre:['TF-X1','TF40'],
  Volkl:['C10 Pro','V-Cell'],
  Wilson:['Blade','Clash','Pro Staff','RF','Shift','Ultra'],
  Yonex:['EZONE','Percept','VCORE'],
};
const DEF_STRING_BRANDS = ['Babolat','Diadem','Dunlop','Gamma','Head','Kirschbaum','Luxilon','MSV','Pacific','Polyfibre','Prince','Signum Pro','Solinco','Tecnifibre','Volkl','Weiss Cannon','Wilson','Yonex'];
const DEF_STRING_MODELS = {
  Babolat:['Pro Hurricane','RPM Blast','RPM Rough','SG Spiraltek','VS Touch','Xcel'],
  Diadem:['Evolution','Pro-X','Solstice','Solstice Power','Solstice Speed','Synthetic Gut'],
  Dunlop:['Black Widow','Explosive','Great White','Silk'],
  Gamma:['Live Wire','Synthetic Gut','TNT2','Zo Verve'],
  Head:['Hawk','Hawk Power','Hawk Touch','Lynx','Lynx Tour','Rip Control','Sonic Pro','Velocity'],
  Kirschbaum:['Max Power','Pro Line II','Spiky Shark','Super Smash','Touch Turbo'],
  Luxilon:['4G','ALU Power','ALU Power Rough','Element','Original','Savage'],
  MSV:['Brilliant','Co-Focus','Focus Hex','Hepta-Twist','Tornado'],
  Pacific:['Classic','Prime Gut','Tough Gut','X Force'],
  Polyfibre:['Black Vengeance','Cobra','Grip','Hightec','TCS'],
  Prince:['Beast','Premiere','Syn Gut','Tour XS','Vibe'],
  'Signum Pro':['Firestorm','Hyperion','Poly Plasma','Thunderstorm','XPLOSIVE Speed'],
  Solinco:['Barb Wire','Confidential','Heaven','Hyper-G','Tour Bite','Vanquish'],
  Tecnifibre:['4S','Black Code','HDX Tour','Ice Code','TGV','X-One Biphase'],
  Volkl:['Cyclone','Power Fiber II','Psycho','V-Feel'],
  'Weiss Cannon':['Black5Edge','Explosiv!','Silverstring','Turbo Twist','Ultra Cable'],
  Wilson:['Champions Choice','Hollow Core','NXT','Revolve','Sensation'],
  Yonex:['Aerosonic','BG65','Poly Tour Pro','Poly Tour Spin','Poly Tour Strike'],
};
const PATTERNS = ['16x15','16x18','16x19','16x20','18x19','18x20'];
const GRIPS = ['1','2','3','4','5','6','7','8'];
const HEAD_SIZES = [85,90,93,95,97,98,100,102,105,107,110,113,115,118,120,125];
const AXES_KEYS = ['control','power','spin','comfort','feel','durability'];

const BRAND_COLORS = {
  Wilson:'#e0313f', Babolat:'#ff7a1a', Head:'#7a7f83', Yonex:'#2b6cff',
  Dunlop:'#ffd028', Tecnifibre:'#19c46a', Prince:'#9a4dff',
  Volkl:'#ff5252', Diadem:'#4fe38b', Donnay:'#ff7043'
};

/* ---------- string linear density database (g/cm) ---------- */
const STRING_LINEAR_DENSITY = {
  'Diadem': {
    'Evolution': { '16': 0.048, '17': 0.052, '18': 0.055 },
    'Pro-X': { '1.15': 0.049, '1.20': 0.052, '1.25': 0.055 },
    'Solstice': { '16': 0.047, '17': 0.051, '18': 0.054 },
  },
  'Yonex': {
    'VCORE': { '16': 0.053, '17': 0.057, '18': 0.061 },
    'Poly Tour Pro': { '17': 0.058, '18': 0.062 },
    'BG65': { '0.65': 0.043, '0.70': 0.047, '0.75': 0.051 },
  },
  'Wilson': {
    'Champions Choice': { '16': 0.050, '17': 0.054, '18': 0.058 },
    'Sensation': { '16': 0.046, '17': 0.050, '18': 0.053 },
    'NXT': { '17': 0.051, '18': 0.055 },
  },
  'Babolat': {
    'RPM Blast': { '16': 0.052, '17': 0.056, '18': 0.060 },
    'Xcel': { '16': 0.048, '17': 0.052, '18': 0.056 },
    'Pro Hurricane': { '16': 0.051, '17': 0.055, '18': 0.059 },
  },
  'Head': {
    'Hawk': { '16': 0.049, '17': 0.053, '18': 0.057 },
    'Sonic Pro': { '17': 0.052, '18': 0.056 },
    'Lynx': { '17': 0.051, '18': 0.055 },
  },
  'Solinco': {
    'Hyper-G': { '16': 0.054, '17': 0.058, '18': 0.062 },
    'Tour Bite': { '16': 0.053, '17': 0.057, '18': 0.061 },
    'Confidential': { '17': 0.055, '18': 0.059 },
  },
  'Tecnifibre': {
    'Black Code': { '16': 0.049, '17': 0.053, '18': 0.057 },
    'TGV': { '17': 0.054, '18': 0.058 },
    'X-One Biphase': { '16': 0.050, '17': 0.054, '18': 0.058 },
  },
};

/* ---------- racket vibrating length specs ---------- */
const RACKET_SPECS = {
  'Diadem': {
    'Axis': { headSize: 98, vibratingLength: 16.9 },
    'Axiom': { headSize: 98, vibratingLength: 16.9 },
    'Elevate': { headSize: 98, vibratingLength: 16.85 },
    'Nova': { headSize: 100, vibratingLength: 17.0 },
  },
  'Yonex': {
    'VCORE': { headSize: 98, vibratingLength: 16.95 },
    'Percept': { headSize: 97, vibratingLength: 16.9 },
    'EZONE': { headSize: 100, vibratingLength: 17.05 },
  },
  'Wilson': {
    'Blade': { headSize: 98, vibratingLength: 16.85 },
    'Pro Staff': { headSize: 97, vibratingLength: 16.9 },
    'Ultra': { headSize: 100, vibratingLength: 17.05 },
  },
  'Head': {
    'Prestige': { headSize: 98, vibratingLength: 16.9 },
    'Speed': { headSize: 100, vibratingLength: 17.0 },
    'Radical': { headSize: 98, vibratingLength: 16.95 },
  },
};

/* ---------- storage keys ---------- */
const K_ENTRIES = 'sm_entries_v1';
const K_SETTINGS = 'sm_settings_v1';
const K_CUSTOM = 'sm_custom_v1';
const K_AUTOBAK = 'sm_autobak_v1';
const K_CALIBRATION = 'sm_calibration_v1';

/* ---------- themes ----------
   Each theme only stores the core hues; all rgba() tints (soft/glow/line/
   fill/border/page-glow) and the dark ink-on-accent text are derived at
   runtime in applyTheme(), and kept in the AC object for canvas/SVG use. */
const THEMES = [
  { id:'clay',   ac:'#c8704f', a2:'#b45a3c', deep:'#9a4433', ink:'#fdf3ec' },
  { id:'green',  ac:'#4fe38b', a2:'#2fbf6f', deep:'#1c8f52', ink:'#05130b' },
  { id:'yellow', ac:'#f5c73e', a2:'#e0ad1f', deep:'#b0850e', ink:'#2a2100' },
  { id:'blue',   ac:'#4d8dff', a2:'#3f7ff0', deep:'#2059c0', ink:'#06122b' },
  { id:'cyan',   ac:'#22d3ee', a2:'#10b3cf', deep:'#0e91a8', ink:'#04222a' },
  { id:'violet', ac:'#a78bfa', a2:'#8b68f0', deep:'#6d4fd0', ink:'#160b30' },
  { id:'orange', ac:'#ff8a4c', a2:'#f06f2c', deep:'#d1611f', ink:'#2a1204' },
  { id:'rose',   ac:'#fb7185', a2:'#ec5570', deep:'#d1425a', ink:'#2c0a12' },
];
/* live accent values for JS-generated SVG / canvas (set by applyTheme) */
let AC = { accent:'#4fe38b', deep:'#1c8f52', ink:'#05130b', text:'#4fe38b', soft:'', glow:'', line:'', bg:'', fill:'', b22:'', s28:'', s50:'' };

/* ---------- light / dark mode ---------- */
let currentMode = 'dark'; // resolved: 'dark' | 'light'
const MODE_MQL = window.matchMedia('(prefers-color-scheme: light)');
const SUN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const MOON_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
function cssVar(n){ return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function resolveMode(){
  const pref = settings.mode || 'system';
  if(pref==='light' || pref==='dark') return pref;
  return MODE_MQL.matches ? 'light' : 'dark';
}
function applyMode(){
  currentMode = resolveMode();
  document.documentElement.setAttribute('data-mode', currentMode);
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta) meta.setAttribute('content', currentMode==='light' ? '#f5f1e7' : '#16130d');
  applyTheme(settings.theme);   // recompute accent-text for this mode
  syncModeUI();
  refreshThemedGraphics();
}
function setMode(m){ settings.mode=m; persistSettings(); applyMode(); haptic('light'); }
function toggleMode(){ settings.mode = (currentMode==='light' ? 'dark' : 'light'); persistSettings(); applyMode(); haptic('light'); }
function syncModeUI(){
  const pref = settings.mode || 'system';
  ['system','light','dark'].forEach(k=>{ const b=document.getElementById('mode-'+k); if(b) b.classList.toggle('on', pref===k); });
  const ic=document.getElementById('mode-toggle-icon'); if(ic) ic.innerHTML = (currentMode==='light' ? SUN_SVG : MOON_SVG);
}

function hexToRgb(h){ h=h.replace('#',''); if(h.length===3) h=h.split('').map(c=>c+c).join(''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function getTheme(id){ return THEMES.find(x=>x.id===id) || THEMES[0]; }

function applyTheme(id){
  const th=getTheme(id);
  const [r,g,b]=hexToRgb(th.ac);
  const rgba=(a)=>`rgba(${r},${g},${b},${a})`;
  const textCol = (currentMode==='light') ? th.deep : th.ac;
  AC={ accent:th.ac, deep:th.deep, ink:th.ink, text:textCol,
       soft:rgba(0.14), glow:rgba(0.28), line:rgba(0.40), bg:rgba(0.06),
       fill:rgba(0.16), b22:rgba(0.22), s28:rgba(0.28), s50:rgba(0.50) };
  const s=document.documentElement.style;
  s.setProperty('--accent',th.ac);
  s.setProperty('--accent-2',th.a2);
  s.setProperty('--accent-deep',th.deep);
  s.setProperty('--accent-text',textCol);
  s.setProperty('--accent-ink',th.ink);
  s.setProperty('--accent-soft',AC.soft);
  s.setProperty('--accent-glow',AC.glow);
  s.setProperty('--accent-line',AC.line);
  s.setProperty('--accent-b22',AC.b22);
  s.setProperty('--accent-bg',AC.bg);
  s.setProperty('--accent-fill',AC.fill);
}

/* ---------- actual-tension conversion ----------
   DT is a device-style index (T ∝ f² × head-area). lbs is the same quantity
   scaled by LBS_PER_DT. Absolute lbs varies by racket & string, so treat it as
   an estimate and track relative change on the SAME racket.
   To calibrate to your machine: string a racket at a known tension, measure it,
   then set LBS_PER_DT = knownLbs / measuredDT. 
   v2.0: calibrated to Diadem Axiom 98 + Pro-X 1.20 at 52 lbs reference */
let LBS_PER_DT = 1.198;  /* adjusted from 1.45 to match reference tension */
function calcLbs(dt){ if(dt==null||!isFinite(dt)) return null; return Math.round(dt*LBS_PER_DT*2)/2; }

/* ---------- state ---------- */
let entries = [];
let settings = { lang: 'ko', headSize: 100, theme: 'clay', mode: 'system', autoBackup: true, lastAutoBackupWeek: '' };
let customData = { racketBrands:[], racketModels:{}, stringBrands:[], stringModels:{} };
let currentIdx = null;
let editingIdx = null;
let currentFilter = { type:'all', user:null };
const drumState = { y:0, m:0, d:0 };
let drumYears = [];
let formMeasurement = null; // {freq, dt, headSize, tone, at}
let fbBackTarget = null; // entry idx to return to from feedback screen
let exitConfirmOpen = false;

/* ══════════════════════════════════════════ i18n ══════════════════════════════════════════ */
const I18N = {
  ko:{
    'hero.eyebrow':"STRINGER'S LOG",
    'hero.title':'스트링 <span class="accent">작업일지</span>',
    'hero.sub':'라켓 스트링 기록 · 성능 분석 · 플레이 피드백',
    'home.newWork':'새 작업',
    'stat.total':'총 작업','stat.players':'선수','stat.recent':'최근',
    'filter.showAll':'전체보기','list.records':'작업 기록',
    'empty.title':'아직 기록이 없어요','empty.desc':'상단의 새 작업 버튼으로<br>첫 스트링 작업을 기록해보세요.',
    'empty.filterTitle':'조건에 맞는 기록이 없어요','empty.filterDesc':'다른 필터를 선택해보세요.','empty.noPlayer':'등록된 선수가 없어요.',
    'common.back':'뒤로','common.list':'목록','common.done':'완료','common.select':'선택','common.cancel':'취소','common.confirm':'확인',
    'common.optional':'선택사항','common.reset':'초기화','common.customAdd':'＋ 직접 입력','common.delete':'삭제','common.close':'닫기','common.add':'추가',
    'add.title':'스트링 작업 추가','add.editTitle':'스트링 작업 수정',
    'add.player':'선수','add.name':'이름','add.namePh':'이름 입력',
    'add.racket':'라켓 정보','add.brand':'브랜드','add.brandPh':'브랜드명 직접 입력','add.model1':'모델명','add.modelPh':'모델명 직접 입력','add.model2':'추가 모델',
    'add.pattern':'패턴','add.grip':'그립','add.weight':'무게',
    'add.string':'스트링 정보','add.hybrid':'하이브리드','add.hybridSub':'MAIN / CROSS 개별 설정','add.single':'SINGLE','add.gauge':'두께','add.tension':'텐션',
    'add.measure':'실측 텐션 (음향 측정)','add.measureTitle':'스트링베드 공명 측정',
    'add.measureDesc':'스트링을 손가락으로 튕겨 울림 소리로 실제 텐션(주파수·DT)을 측정합니다.',
    'add.measureBtn':'측정 시작','add.measureAgain':'다시 측정',
    'add.workInfo':'작업 정보','add.date':'작업 일자','add.place':'작업 장소','add.placePh':'장소','add.save':'저장하기','add.saveEdit':'수정 완료',
    'meas.dt':'DT 지수','meas.freq':'주파수','meas.lbs':'환산 LBS',
    'detail.title':'상세 정보','detail.racket':'라켓 정보','detail.string':'스트링 정보','detail.work':'작업 정보','detail.measure':'실측 텐션','detail.recentFb':'최근 피드백',
    'd.brand':'브랜드','d.model':'모델','d.pattern':'스트링 패턴','d.grip':'그립 사이즈','d.weight':'무게','d.type':'타입','d.hybrid':'하이브리드','d.gauge':'두께','d.tension':'설정 텐션','d.date':'작업 일자','d.place':'작업 장소','d.measuredAt':'측정일',
    'd.addFb':'⭐ 피드백 추가','d.edit':'✏️ 정보 수정','d.delete':'이 기록 삭제',
    'fb.title':'피드백 추가','fb.rating':'성능 평가','fb.summary':'총평','fb.summaryPh':'스트링 사용 느낌을 자유롭게 적어주세요...','fb.save':'피드백 저장',
    'axis.control':'컨트롤','axis.power':'파워','axis.spin':'스핀','axis.comfort':'편안함','axis.feel':'느낌','axis.durability':'내구성',
    'set.title':'설정','set.general':'일반','set.language':'언어','set.languageSub':'Language','set.headSize':'기본 헤드 사이즈','set.headSizeSub':'측정 시 DT 계산 기준',
    'set.theme':'테마 색상','set.themeSub':'포인트 색을 선택하세요','set.autoBackup':'주간 자동 백업','set.autoBackupSub':'매주 첫 실행 시 자동 저장',
    'set.mode':'화면 모드','set.modeSub':'라이트 · 다크 전환','mode.system':'시스템','mode.light':'라이트','mode.dark':'다크',
    'theme.title':'테마 색상',
    'theme.clay':'테라코타','theme.green':'시그널 그린','theme.yellow':'옐로우','theme.blue':'코발트 블루','theme.cyan':'아쿠아 시안','theme.violet':'바이올렛','theme.orange':'선셋 오렌지','theme.rose':'로즈 핑크',
    'toast.autoBackup':'주간 자동 백업 완료','backup.restoreAuto':'자동 백업본 복원','backup.autoAt':'최근 자동 백업',
    'set.customLists':'커스텀 리스트','set.racketBrands':'라켓 브랜드','set.racketModels':'라켓 모델','set.stringBrands':'스트링 브랜드','set.stringModels':'스트링 모델',
    'set.customSub':'드럼롤에 추가할 항목 관리','set.modelSub':'브랜드별 모델 추가',
    'set.data':'데이터','set.export':'백업 내보내기','set.exportSub':'JSON 파일로 저장','set.import':'백업 복원하기','set.importSub':'JSON 파일 불러오기',
    'custom.addPh':'새 항목 입력','custom.empty':'추가된 항목이 없어요','custom.pickBrand':'브랜드 선택','custom.pickBrandDesc':'모델을 추가할 브랜드를 선택하세요.','custom.modelsOf':'모델',
    'meter.title':'텐션 측정기','meter.idle':'마이크를 켜고 스트링을 튕겨주세요','meter.start':'마이크 켜기','meter.stop':'마이크 끄기','meter.use':'이 값 사용','meter.headSize':'헤드 사이즈','meter.tone':'음정',
    'meter.listening':'스트링을 튕겨주세요...','meter.detecting':'측정 중...','meter.locked':'측정 완료','meter.tooQuiet':'소리가 약해요 — 더 가까이서 튕겨주세요',
    'meter.micDenied':'마이크 접근이 거부됐어요. 브라우저 설정을 확인해주세요.','meter.micError':'마이크를 사용할 수 없어요.',
    'meter.guideTitle':'측정 방법','meter.g1':'라켓을 조용한 곳에 두고 마이크를 켜세요.','meter.g2':'스트링베드 중앙을 손톱으로 짧게 튕깁니다.','meter.g3':'"땅~" 하는 울림이 안정되면 값이 잠깁니다.','meter.g4':'2~3회 반복해 값이 일정한지 확인하세요.',
    'meter.warn':'<b>참고</b> — 주파수(Hz)는 실측값입니다. lbs 절대 변환은 라켓·스트링마다 편차가 커서, 같은 라켓에서 <b>DT·주파수 변화(텐션 저하)</b>를 추적하는 용도로 쓰세요. 최초 대비 10~20% 하락 시 리스트링을 권장합니다.',
    'meter.saved':'실측값이 작업 정보에 추가됐어요',
    'toast.saved':'저장됐어요! 🎾','toast.edited':'수정됐어요! ✏️','toast.deleted':'삭제됐어요.','toast.fbSaved':'피드백 저장됐어요!',
    'toast.needName':'이름을 입력해주세요.','toast.notFound':'기록을 찾을 수 없어요.','toast.noBackup':'백업할 기록이 없어요.','toast.backupDone':'건 백업 완료!',
    'toast.badFile':'올바른 백업 파일이 아니에요.','toast.readFail':'파일을 읽을 수 없어요.','toast.restoreDone':'건 복원 완료!','toast.storageFull':'저장 공간이 부족해요. 백업 후 정리해주세요.',
    'toast.added':'추가됐어요.','toast.removed':'삭제됐어요.','toast.exists':'이미 있는 항목이에요.',
    'confirm.delete':'이 기록을 삭제할까요?',
    'exit.title':'앱 종료','exit.desc':'스트링 작업일지를 종료하시겠습니까?','exit.confirm':'종료',
    'restore.title':'백업 복원','restore.desc':'복원하면 현재 데이터가 모두 교체됩니다. 계속할까요?','restore.loaded':'불러온 기록','restore.players':'선수','restore.backupDate':'백업 날짜','restore.do':'복원하기',
    'backup.title':'백업 / 복원','backup.desc':'기록을 JSON 파일로 저장하거나 불러옵니다.','backup.export':'내보내기','backup.import':'복원하기',
    'user.title':'선수 선택','user.desc':'기록을 보고 싶은 선수를 선택하세요.',
    'unit.records':'건','name.none':'이름없음',
  },
  en:{
    'hero.eyebrow':"STRINGER'S LOG",
    'hero.title':'Stringing <span class="accent">Log</span>',
    'hero.sub':'Record · Analyze · Review play feedback',
    'home.newWork':'New job',
    'stat.total':'Jobs','stat.players':'Players','stat.recent':'Recent',
    'filter.showAll':'Show all','list.records':'Records',
    'empty.title':'No records yet','empty.desc':'Tap "New job" above to log<br>your first stringing session.',
    'empty.filterTitle':'No matching records','empty.filterDesc':'Try a different filter.','empty.noPlayer':'No players registered yet.',
    'common.back':'Back','common.list':'List','common.done':'Done','common.select':'Select','common.cancel':'Cancel','common.confirm':'Confirm',
    'common.optional':'Optional','common.reset':'Reset','common.customAdd':'＋ Enter manually','common.delete':'Delete','common.close':'Close','common.add':'Add',
    'add.title':'New Stringing Job','add.editTitle':'Edit Stringing Job',
    'add.player':'Player','add.name':'Name','add.namePh':'Enter name',
    'add.racket':'Racket','add.brand':'Brand','add.brandPh':'Enter brand name','add.model1':'Model','add.modelPh':'Enter model name','add.model2':'Extra model',
    'add.pattern':'Pattern','add.grip':'Grip','add.weight':'Weight',
    'add.string':'String','add.hybrid':'Hybrid','add.hybridSub':'Set MAIN / CROSS separately','add.single':'SINGLE','add.gauge':'Gauge','add.tension':'Tension',
    'add.measure':'Actual Tension (Acoustic)','add.measureTitle':'Stringbed resonance',
    'add.measureDesc':'Pluck the stringbed to measure real tension (frequency · DT) from its ringing tone.',
    'add.measureBtn':'Start measuring','add.measureAgain':'Measure again',
    'add.workInfo':'Job Info','add.date':'Date','add.place':'Location','add.placePh':'Location','add.save':'Save','add.saveEdit':'Save changes',
    'meas.dt':'DT index','meas.freq':'Frequency','meas.lbs':'Est. lbs',
    'detail.title':'Details','detail.racket':'Racket','detail.string':'String','detail.work':'Job Info','detail.measure':'Actual Tension','detail.recentFb':'Latest feedback',
    'd.brand':'Brand','d.model':'Model','d.pattern':'String pattern','d.grip':'Grip size','d.weight':'Weight','d.type':'Type','d.hybrid':'Hybrid','d.gauge':'Gauge','d.tension':'Set tension','d.date':'Date','d.place':'Location','d.measuredAt':'Measured on',
    'd.addFb':'⭐ Add feedback','d.edit':'✏️ Edit info','d.delete':'Delete this record',
    'fb.title':'Add Feedback','fb.rating':'Performance','fb.summary':'Notes','fb.summaryPh':'How did the string feel? Write freely...','fb.save':'Save feedback',
    'axis.control':'Control','axis.power':'Power','axis.spin':'Spin','axis.comfort':'Comfort','axis.feel':'Feel','axis.durability':'Durability',
    'set.title':'Settings','set.general':'General','set.language':'Language','set.languageSub':'언어','set.headSize':'Default head size','set.headSizeSub':'Basis for DT calculation',
    'set.theme':'Theme color','set.themeSub':'Choose your accent','set.autoBackup':'Weekly auto-backup','set.autoBackupSub':'Auto-save on first launch each week',
    'set.mode':'Appearance','set.modeSub':'Light · Dark','mode.system':'System','mode.light':'Light','mode.dark':'Dark',
    'theme.title':'Theme color',
    'theme.clay':'Terracotta','theme.green':'Signal Green','theme.yellow':'Yellow','theme.blue':'Cobalt Blue','theme.cyan':'Aqua Cyan','theme.violet':'Violet','theme.orange':'Sunset Orange','theme.rose':'Rose Pink',
    'toast.autoBackup':'Weekly backup saved','backup.restoreAuto':'Restore auto-backup','backup.autoAt':'Last auto-backup',
    'set.customLists':'Custom lists','set.racketBrands':'Racket brands','set.racketModels':'Racket models','set.stringBrands':'String brands','set.stringModels':'String models',
    'set.customSub':'Manage items shown in the picker','set.modelSub':'Add models per brand',
    'set.data':'Data','set.export':'Export backup','set.exportSub':'Save as JSON file','set.import':'Restore backup','set.importSub':'Load a JSON file',
    'custom.addPh':'New item','custom.empty':'No custom items yet','custom.pickBrand':'Pick a brand','custom.pickBrandDesc':'Choose the brand to add models to.','custom.modelsOf':'models',
    'meter.title':'Tension Meter','meter.idle':'Turn on mic and pluck the strings','meter.start':'Turn on mic','meter.stop':'Turn off mic','meter.use':'Use this value','meter.headSize':'Head size','meter.tone':'Note',
    'meter.listening':'Pluck the strings...','meter.detecting':'Measuring...','meter.locked':'Measured','meter.tooQuiet':'Too quiet — pluck closer to the mic',
    'meter.micDenied':'Mic access denied. Check your browser settings.','meter.micError':'Microphone unavailable.',
    'meter.guideTitle':'How to measure','meter.g1':'Place the racket in a quiet spot and turn on the mic.','meter.g2':'Pluck the center of the stringbed sharply with a nail.','meter.g3':'When the ring stabilizes, the value locks.','meter.g4':'Repeat 2–3 times to confirm it is consistent.',
    'meter.warn':'<b>Note</b> — Frequency (Hz) is directly measured. Absolute lbs conversion varies a lot by racket & string, so use this to track <b>DT / frequency change (tension loss)</b> on the same racket. A 10–20% drop vs. the original suggests restringing.',
    'meter.saved':'Measurement added to the job info',
    'toast.saved':'Saved! 🎾','toast.edited':'Updated! ✏️','toast.deleted':'Deleted.','toast.fbSaved':'Feedback saved!',
    'toast.needName':'Please enter a name.','toast.notFound':'Record not found.','toast.noBackup':'Nothing to back up.','toast.backupDone':'records backed up!',
    'toast.badFile':'Not a valid backup file.','toast.readFail':'Could not read the file.','toast.restoreDone':'records restored!','toast.storageFull':'Storage full. Back up and clean up.',
    'toast.added':'Added.','toast.removed':'Removed.','toast.exists':'Item already exists.',
    'confirm.delete':'Delete this record?',
    'exit.title':'Exit App','exit.desc':"Exit Stringer's Log?",'exit.confirm':'Exit',
    'restore.title':'Restore Backup','restore.desc':'Restoring replaces all current data. Continue?','restore.loaded':'Records loaded','restore.players':'Players','restore.backupDate':'Backup date','restore.do':'Restore',
    'backup.title':'Backup / Restore','backup.desc':'Save your records to a JSON file or load them back.','backup.export':'Export','backup.import':'Restore',
    'user.title':'Select Player','user.desc':'Choose a player to view their records.',
    'unit.records':'','name.none':'No name',
  }
};
function t(key){ const L=I18N[settings.lang]||I18N.ko; return (L[key]!=null?L[key]:(I18N.ko[key]!=null?I18N.ko[key]:key)); }
function applyStaticI18n(){
  document.documentElement.lang = settings.lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.getAttribute('data-i18n')));
  document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.getAttribute('data-i18n-html')));
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.getAttribute('data-i18n-ph')));
  const gl=document.getElementById('meter-guide-list'); if(gl) gl.innerHTML=['g1','g2','g3','g4'].map(g=>`<li>${t('meter.'+g)}</li>`).join('');
  const gw=document.getElementById('meter-warn'); if(gw) gw.innerHTML=t('meter.warn');
}

/* ══════════════════════════════════════════ persistence ══════════════════════════════════════════ */
function loadAll(){
  try{ entries=JSON.parse(localStorage.getItem(K_ENTRIES)||'[]'); }catch(e){ entries=[]; }
  try{ const s=JSON.parse(localStorage.getItem(K_SETTINGS)||'null'); if(s) settings={...settings,...s}; }catch(e){}
  try{ const c=JSON.parse(localStorage.getItem(K_CUSTOM)||'null'); if(c) customData={racketBrands:c.racketBrands||[],racketModels:c.racketModels||{},stringBrands:c.stringBrands||[],stringModels:c.stringModels||{}}; }catch(e){}
  try{ const cal=JSON.parse(localStorage.getItem(K_CALIBRATION)||'null'); if(cal && cal.lbsPerDt) LBS_PER_DT=cal.lbsPerDt; }catch(e){}
}
function persist(){ try{ localStorage.setItem(K_ENTRIES,JSON.stringify(entries)); }catch(e){ showToast('⚠️ '+t('toast.storageFull'),'err'); } }
function persistSettings(){ localStorage.setItem(K_SETTINGS,JSON.stringify(settings)); }
function persistCustom(){ localStorage.setItem(K_CUSTOM,JSON.stringify(customData)); }
function persistCalibration(){ localStorage.setItem(K_CALIBRATION,JSON.stringify({lbsPerDt:LBS_PER_DT})); }

function racketBrands(){ return sortList(dedup([...DEF_RACKET_BRANDS,...customData.racketBrands])); }
function racketModels(b){ return sortList(dedup([...(DEF_RACKET_MODELS[b]||[]),...((customData.racketModels||{})[b]||[])])); }
function stringBrands(){ return sortList(dedup([...DEF_STRING_BRANDS,...customData.stringBrands])); }
function stringModels(b){ return sortList(dedup([...(DEF_STRING_MODELS[b]||[]),...((customData.stringModels||{})[b]||[])])); }
function dedup(a){ return [...new Set(a.filter(Boolean))]; }
/* locale-aware ascending sort (numeric so model numbers order naturally) */
function sortList(a){ return a.slice().sort((x,y)=>String(x).localeCompare(String(y),undefined,{numeric:true,sensitivity:'base'})); }

/* ---------- html escape ---------- */
function escHtml(s){ if(s==null) return ''; return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escAttr(s){ return escHtml(s); }

/* ══════════════════════════════════════════ init ══════════════════════════════════════════ */
(function init(){
  loadAll();
  applyMode();
  MODE_MQL.addEventListener('change', ()=>{ if((settings.mode||'system')==='system') applyMode(); });
  applyStaticI18n();
  syncLangUI();
  syncThemeUI();
  document.getElementById('f-autobackup').checked = settings.autoBackup !== false;
  document.getElementById('sn-fields').innerHTML=buildSF('sn');
  document.getElementById('sm-fields').innerHTML=buildSF('sm');
  document.getElementById('sc-fields').innerHTML=buildSF('sc');
  const today=new Date();
  drumState.y=today.getFullYear(); drumState.m=today.getMonth()+1; drumState.d=today.getDate();
  setDateDisplay(drumState.y,drumState.m,drumState.d);
  updateCustomCounts();
  renderList();
  initBackHandler();
  setTimeout(maybeAutoBackup, 700);
})();

/* ══════════════════════════════════════════ navigation ══════════════════════════════════════════ */
function showScreen(id){
  if(micStream && id!=='screen-meter') stopMic();
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  if(id==='screen-home') renderList();
  if(id==='screen-add'){ buildDatalists(); if(editingIdx===null) resetForm(); }
}
function cancelAddEdit(){ if(editingIdx!==null){ const i=editingIdx; editingIdx=null; showDetail(i); } else showScreen('screen-home'); }
function openSettings(){ showScreen('screen-settings'); }

/* ══════════════════════════════════════════ toast + haptic ══════════════════════════════════════════ */
let toastTimer=null;
function showToast(msg,kind){ const el=document.getElementById('toast'); el.textContent=msg; el.className='toast show'+(kind?' '+kind:''); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2400); }
function haptic(type='light'){ if(!navigator.vibrate) return; const p={light:6,medium:12,heavy:20,confirm:[10,30,10],lock:[8,24,8,24]}; navigator.vibrate(p[type]||6); }

/* ══════════════════════════════════════════ generic bottom sheet ══════════════════════════════════════════ */
function openSheet(html){ const s=document.getElementById('sheet'); s.innerHTML=html; document.getElementById('overlay').classList.add('show'); s.classList.add('show'); }
function closeSheet(){
  const wasExit = exitConfirmOpen;
  exitConfirmOpen = false;
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('sheet').classList.remove('show');
  if(wasExit) rearmBackBuffer();
}

/* ══════════════════════════════════════════ single-column drum picker ══════════════════════════════════════════ */
const PICK_H=44;
let pickerState={items:[],onConfirm:null,onAdd:null,addLabel:null,handler:null,prevIdx:-1};
function openPicker({title,items,value,onConfirm,addLabel,onAdd}){
  const list=addLabel?[...items,'__ADD__']:items.slice();
  pickerState={items:list,onConfirm,onAdd,addLabel,handler:null,prevIdx:-1};
  document.getElementById('pick-title').textContent=title;
  const col=document.getElementById('pick-col');
  buildPickCol(col,list,value,addLabel);
  document.getElementById('pick-overlay').classList.add('show');
  document.getElementById('pick-sheet').classList.add('show');
}
function buildPickCol(el,items,value,addLabel){
  if(pickerState.handler) el.removeEventListener('scroll',pickerState.handler);
  el.innerHTML='<div class="drum-pad"></div>'+items.map(v=>{
    if(v==='__ADD__') return `<div class="drum-item add" data-val="__ADD__">${addLabel}</div>`;
    return `<div class="drum-item" data-val="${escAttr(v)}">${escHtml(v)}</div>`;
  }).join('')+'<div class="drum-pad"></div>';
  let idx=items.indexOf(value); if(idx<0) idx=0;
  el.scrollTop=idx*PICK_H; pickerState.prevIdx=idx; hlPick(el);
  pickerState.handler=()=>{ const ni=clampIdx(Math.round(el.scrollTop/PICK_H),items.length); if(ni!==pickerState.prevIdx){pickerState.prevIdx=ni;haptic('light');} hlPick(el); };
  el.addEventListener('scroll',pickerState.handler,{passive:true});
}
function hlPick(el){ const n=el.querySelectorAll('.drum-item').length; const idx=clampIdx(Math.round(el.scrollTop/PICK_H),n); el.querySelectorAll('.drum-item').forEach((it,i)=>it.classList.toggle('active',i===idx)); }
function clampIdx(i,len){ return Math.max(0,Math.min(i,len-1)); }
function closePicker(){ document.getElementById('pick-overlay').classList.remove('show'); document.getElementById('pick-sheet').classList.remove('show'); }
function confirmPicker(){
  const el=document.getElementById('pick-col');
  const idx=clampIdx(Math.round(el.scrollTop/PICK_H),pickerState.items.length);
  const val=pickerState.items[idx];
  haptic('confirm'); closePicker();
  if(val==='__ADD__'){ if(pickerState.onAdd) pickerState.onAdd(); return; }
  if(pickerState.onConfirm) pickerState.onConfirm(val);
}
function setTriggerVal(triggerId,val,isEmpty){ const el=document.getElementById(triggerId).querySelector('.val'); el.textContent=val||t('common.select'); el.classList.toggle('empty',!!isEmpty); }

/* ══════════════════════════════════════════ racket brand/model pickers ══════════════════════════════════════════ */
let selRBrand='',selRModel='';
function pickRacketBrand(){
  openPicker({ title:t('add.brand'), items:racketBrands(), value:selRBrand, addLabel:t('common.customAdd'),
    onConfirm:(v)=>{ selRBrand=v; selRModel=''; document.getElementById('rbrand-add').hidden=true; document.getElementById('f-rbrand-c').value=''; setTriggerVal('tp-rbrand',v); setTriggerVal('tp-rmodel1','',true); },
    onAdd:()=>{ selRBrand='__CUSTOM__'; setTriggerVal('tp-rbrand',t('common.customAdd')); document.getElementById('rbrand-add').hidden=false; document.getElementById('f-rbrand-c').focus(); setTriggerVal('tp-rmodel1','',true); }
  });
}
function pickRacketModel(){
  let brand=selRBrand==='__CUSTOM__'?document.getElementById('f-rbrand-c').value.trim():selRBrand;
  const items=brand?racketModels(brand):[];
  openPicker({ title:t('add.model1'), items, value:selRModel, addLabel:t('common.customAdd'),
    onConfirm:(v)=>{ selRModel=v; document.getElementById('rmodel1-add').hidden=true; document.getElementById('f-rmodel1-c').value=''; setTriggerVal('tp-rmodel1',v); },
    onAdd:()=>{ selRModel='__CUSTOM__'; setTriggerVal('tp-rmodel1',t('common.customAdd')); document.getElementById('rmodel1-add').hidden=false; document.getElementById('f-rmodel1-c').focus(); }
  });
}
function pickPattern(){ const cur=document.getElementById('tp-pattern').querySelector('.val').textContent; openPicker({title:t('add.pattern'),items:PATTERNS,value:cur,onConfirm:(v)=>setTriggerVal('tp-pattern',v)}); }
function pickGrip(){ const cur=document.getElementById('tp-grip').querySelector('.val').textContent; openPicker({title:t('add.grip'),items:GRIPS,value:cur,onConfirm:(v)=>setTriggerVal('tp-grip',v)}); }

/* ══════════════════════════════════════════ string fields (sn/sm/sc) ══════════════════════════════════════════ */
const strSel={ sn:{brand:'',model:''}, sm:{brand:'',model:''}, sc:{brand:'',model:''} };
function buildSF(p){
  return `<div class="card-group">
    <div class="row"><label>${t('add.brand')}</label>
      <button type="button" class="picker-trigger" id="tp-${p}-b" onclick="pickStrBrand('${p}')">
        <span class="val empty">${t('common.select')}</span>
        <span class="chev"><svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button></div>
    <div class="inline-add" id="${p}-bc-w" hidden><input type="text" id="${p}-bc" data-ac="dl-sbrand" autocomplete="off" placeholder="${t('add.brandPh')}"></div>
    <div class="row"><label>${t('add.model1')}</label>
      <button type="button" class="picker-trigger" id="tp-${p}-m" onclick="pickStrModel('${p}')">
        <span class="val empty">${t('common.select')}</span>
        <span class="chev"><svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </button></div>
    <div class="inline-add" id="${p}-mc-w" hidden><input type="text" id="${p}-mc" data-ac="dl-smodel" autocomplete="off" placeholder="${t('add.modelPh')}"></div>
  </div>
  <div class="card-group">
    <div class="row"><label>${t('add.gauge')}</label>
      <div class="suffix-wrap"><input type="text" id="${p}-g" data-ac="dl-gauge" autocomplete="off" placeholder="1.25" inputmode="decimal" oninput="fmtGauge(this)"><span class="suffix">mm</span></div></div>
    <div class="row"><label>${t('add.tension')}</label>
      <div class="suffix-wrap"><input type="number" id="${p}-t" data-ac="dl-tension" autocomplete="off" placeholder="0" inputmode="decimal"><span class="suffix">lbs</span></div></div>
  </div>`;
}
function pickStrBrand(p){
  openPicker({ title:t('add.brand'), items:stringBrands(), value:strSel[p].brand, addLabel:t('common.customAdd'),
    onConfirm:(v)=>{ strSel[p].brand=v; strSel[p].model=''; document.getElementById(`${p}-bc-w`).hidden=true; document.getElementById(`${p}-bc`).value=''; setStrTrigger(p,'b',v); setStrTrigger(p,'m','',true); },
    onAdd:()=>{ strSel[p].brand='__CUSTOM__'; setStrTrigger(p,'b',t('common.customAdd')); document.getElementById(`${p}-bc-w`).hidden=false; document.getElementById(`${p}-bc`).focus(); setStrTrigger(p,'m','',true); }
  });
}
function pickStrModel(p){
  let brand=strSel[p].brand==='__CUSTOM__'?document.getElementById(`${p}-bc`).value.trim():strSel[p].brand;
  const items=brand?stringModels(brand):[];
  openPicker({ title:t('add.model1'), items, value:strSel[p].model, addLabel:t('common.customAdd'),
    onConfirm:(v)=>{ strSel[p].model=v; document.getElementById(`${p}-mc-w`).hidden=true; document.getElementById(`${p}-mc`).value=''; setStrTrigger(p,'m',v); },
    onAdd:()=>{ strSel[p].model='__CUSTOM__'; setStrTrigger(p,'m',t('common.customAdd')); document.getElementById(`${p}-mc-w`).hidden=false; document.getElementById(`${p}-mc`).focus(); }
  });
}
function setStrTrigger(p,which,val,isEmpty){ const el=document.getElementById(`tp-${p}-${which}`).querySelector('.val'); el.textContent=val||t('common.select'); el.classList.toggle('empty',!!isEmpty); }
function fmtGauge(el){ el.value=el.value.replace(/[^0-9.]/g,''); }
function getSD(p){
  const b=strSel[p].brand==='__CUSTOM__'?document.getElementById(`${p}-bc`).value.trim():strSel[p].brand;
  const m=strSel[p].model==='__CUSTOM__'?document.getElementById(`${p}-mc`).value.trim():strSel[p].model;
  const g=document.getElementById(`${p}-g`).value;
  return { brand:b||'', model:m||'', gauge:g?(g.includes('mm')?g:g+'mm'):'', tension:document.getElementById(`${p}-t`).value };
}
function toggleHybrid(){ const h=document.getElementById('f-hybrid').checked; document.getElementById('string-normal').hidden=h; document.getElementById('string-hybrid').hidden=!h; }

/* ══════════════════════════════════════════ form measurement ══════════════════════════════════════════ */
function renderFormMeasurement(){
  const emptyEl=document.getElementById('meas-empty');
  if(!emptyEl) return;   // acoustic-measurement UI was removed — nothing to render
  const hasM=!!formMeasurement;
  emptyEl.hidden=hasM;
  document.getElementById('meas-vals').hidden=!hasM;
  document.getElementById('meas-clear').hidden=!hasM;
  document.getElementById('meas-btn-label').textContent=hasM?t('add.measureAgain'):t('add.measureBtn');
  if(hasM){ document.getElementById('meas-hz').textContent=formMeasurement.freq; document.getElementById('meas-dt').textContent=formMeasurement.dt;
    const lbs=formMeasurement.lbs!=null?formMeasurement.lbs:calcLbs(formMeasurement.dt);
    document.getElementById('meas-lbs').textContent='≈'+lbs; }
}
function clearMeasurement(){ formMeasurement=null; renderFormMeasurement(); }

/* ══════════════════════════════════════════ autocomplete history ══════════════════════════════════════════ */
/* Populate <datalist>s from previously-entered records (most-recent first) so
   free-typed fields suggest what you typed before. */
function buildDatalists(){
  const names=[],places=[],rbrands=[],rmodels=[],rmodels2=[],weights=[],gauges=[],tensions=[],sbrands=[],smodels=[];
  const push=(arr,v)=>{ v=(v==null?'':String(v)).trim(); if(v && !arr.includes(v)) arr.push(v); };
  for(let i=entries.length-1;i>=0;i--){            // newest first
    const e=entries[i]||{}, r=e.racket||{}, s=e.strings||{};
    push(names,e.name); push(places,e.place);
    push(rbrands,r.brand); push(rmodels,r.model1); push(rmodels2,r.model2); push(weights,r.weight);
    (e.hybrid?[s.main,s.cross]:[s.single]).forEach(x=>{
      if(!x) return;
      push(sbrands,x.brand); push(smodels,x.model);
      push(gauges,(x.gauge||'').replace('mm','')); push(tensions,x.tension);
    });
  }
  const fill=(id,arr)=>{ const dl=document.getElementById(id); if(dl) dl.innerHTML=arr.map(v=>`<option value="${escAttr(v)}"></option>`).join(''); };
  fill('dl-name',names); fill('dl-place',places);
  fill('dl-rbrand',rbrands); fill('dl-rmodel',rmodels); fill('dl-rmodel2',rmodels2);
  fill('dl-weight',weights); fill('dl-gauge',gauges); fill('dl-tension',tensions);
  fill('dl-sbrand',sbrands); fill('dl-smodel',smodels);
}

/* ══════════════════════════════════════════ custom autocomplete dropdown ══════════════════════════════════════════ */
/* Inputs carry data-ac="dl-xxx" pointing at the (hidden) <datalist> built above.
   Native <datalist> popups don't reliably commit a value on tap in several
   mobile browsers / Android WebViews, so suggestions are rendered in a plain
   floating list and selection is handled manually via pointerdown (which fires
   before the input's blur, so we can commit the value before the list closes). */
let acBox=null, acInput=null;
function acEnsureBox(){
  if(acBox) return acBox;
  acBox=document.createElement('div');
  acBox.className='ac-box';
  acBox.hidden=true;
  document.body.appendChild(acBox);
  acBox.addEventListener('pointerdown', e=>{
    const item=e.target.closest('.ac-item');
    if(!item || !acInput) return;
    e.preventDefault();               // keep focus on the input; don't let it blur yet
    const val=item.dataset.val;
    const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
    setter.call(acInput,val);         // native setter so framework-agnostic listeners still see it
    acInput.dispatchEvent(new Event('input',{bubbles:true}));
    acInput.dispatchEvent(new Event('change',{bubbles:true}));
    acHide();
  });
  return acBox;
}
function acOptionsFor(input){
  const listId=input.getAttribute('data-ac');
  const dl=listId&&document.getElementById(listId);
  return dl?Array.from(dl.options).map(o=>o.value).filter(Boolean):[];
}
function acPosition(input){
  const r=input.getBoundingClientRect();
  acBox.style.left=Math.round(r.left+window.scrollX)+'px';
  acBox.style.top=Math.round(r.bottom+window.scrollY+4)+'px';
  acBox.style.width=Math.round(r.width)+'px';
}
function acRender(input){
  acInput=input;                    // keep tracking this input even with 0 matches, so future keystrokes re-check
  const all=acOptionsFor(input);
  const q=input.value.trim().toLowerCase();
  const items=(q?all.filter(v=>v.toLowerCase().includes(q)&&v.toLowerCase()!==q):all).slice(0,8);
  const box=acEnsureBox();
  if(!items.length){ box.hidden=true; return; }
  box.innerHTML=items.map(v=>`<div class="ac-item" data-val="${escAttr(v)}">${escHtml(v)}</div>`).join('');
  acPosition(input);
  box.hidden=false;
}
function acHide(){ if(acBox) acBox.hidden=true; acInput=null; }
document.addEventListener('focusin', e=>{
  const el=e.target;
  if(el.tagName==='INPUT' && el.hasAttribute('data-ac')) acRender(el);
});
document.addEventListener('input', e=>{
  const el=e.target;
  if(el===acInput) acRender(el);
});
document.addEventListener('focusout', e=>{
  const el=e.target;
  if(el===acInput) setTimeout(()=>{ if(document.activeElement!==el) acHide(); },0);
});
document.addEventListener('pointerdown', e=>{
  if(acBox && !acBox.hidden && acInput && e.target!==acInput && !acBox.contains(e.target)) acHide();
});
window.addEventListener('scroll', ()=>{ if(acInput) acPosition(acInput); }, {passive:true,capture:true});
window.addEventListener('resize', ()=>{ if(acInput) acHide(); });

/* ══════════════════════════════════════════ form save/reset/edit ══════════════════════════════════════════ */
function resetForm(){
  document.getElementById('add-screen-title').textContent=t('add.title');
  document.getElementById('save-btn-label').textContent=t('add.save');
  document.getElementById('f-name').value='';
  selRBrand='';selRModel='';
  setTriggerVal('tp-rbrand','',true); setTriggerVal('tp-rmodel1','',true);
  document.getElementById('rbrand-add').hidden=true; document.getElementById('f-rbrand-c').value='';
  document.getElementById('rmodel1-add').hidden=true; document.getElementById('f-rmodel1-c').value='';
  document.getElementById('f-rmodel2').value='';
  setTriggerVal('tp-pattern','16x19'); setTriggerVal('tp-grip','2');
  document.getElementById('f-weight').value='';
  document.getElementById('f-hybrid').checked=false; toggleHybrid();
  ['sn','sm','sc'].forEach(p=>{
    strSel[p]={brand:'',model:''};
    setStrTrigger(p,'b','',true); setStrTrigger(p,'m','',true);
    document.getElementById(`${p}-bc-w`).hidden=true; document.getElementById(`${p}-bc`).value='';
    document.getElementById(`${p}-mc-w`).hidden=true; document.getElementById(`${p}-mc`).value='';
    document.getElementById(`${p}-g`).value=''; document.getElementById(`${p}-t`).value='';
  });
  document.getElementById('f-place').value='';
  resetDrumDate();
  formMeasurement=null; renderFormMeasurement();
}
function saveEntry(){
  const name=document.getElementById('f-name').value.trim();
  if(!name){ showToast(t('toast.needName'),'err'); return; }
  const rb=selRBrand==='__CUSTOM__'?document.getElementById('f-rbrand-c').value.trim():selRBrand;
  const rm=selRModel==='__CUSTOM__'?document.getElementById('f-rmodel1-c').value.trim():selRModel;
  const hybrid=document.getElementById('f-hybrid').checked;
  const data={
    name,
    racket:{ brand:rb||'', model1:rm||'', model2:document.getElementById('f-rmodel2').value,
      pattern:document.getElementById('tp-pattern').querySelector('.val').textContent,
      grip:document.getElementById('tp-grip').querySelector('.val').textContent,
      weight:document.getElementById('f-weight').value },
    hybrid,
    strings: hybrid?{main:getSD('sm'),cross:getSD('sc')}:{single:getSD('sn')},
    measurement: formMeasurement?{...formMeasurement}:null,
    date:document.getElementById('f-date').value,
    place:document.getElementById('f-place').value,
  };
  const wasEditing=editingIdx!==null; let savedIdx;
  if(wasEditing){ entries[editingIdx]={...entries[editingIdx],...data}; savedIdx=editingIdx; }
  else{ entries.push({id:Date.now(),...data,feedbacks:[]}); savedIdx=entries.length-1; }
  persist();
  showToast(wasEditing?t('toast.edited'):t('toast.saved'));
  editingIdx=null;
  if(wasEditing) showDetail(savedIdx); else showScreen('screen-home');
  resetForm();
}
function editEntry(idx){
  const e=entries[idx]; if(!e){ showToast(t('toast.notFound'),'err'); return; }
  editingIdx=idx; resetForm();
  document.getElementById('f-name').value=e.name||'';
  const r=e.racket||{};
  const rb=r.brand||'';
  if(rb){ if(racketBrands().includes(rb)){ selRBrand=rb; setTriggerVal('tp-rbrand',rb); } else { selRBrand='__CUSTOM__'; setTriggerVal('tp-rbrand',t('common.customAdd')); document.getElementById('rbrand-add').hidden=false; document.getElementById('f-rbrand-c').value=rb; } }
  const rm=r.model1||'';
  if(rm){ const list=(selRBrand==='__CUSTOM__')?[]:racketModels(rb); if(list.includes(rm)){ selRModel=rm; setTriggerVal('tp-rmodel1',rm); } else { selRModel='__CUSTOM__'; setTriggerVal('tp-rmodel1',t('common.customAdd')); document.getElementById('rmodel1-add').hidden=false; document.getElementById('f-rmodel1-c').value=rm; } }
  document.getElementById('f-rmodel2').value=r.model2||'';
  setTriggerVal('tp-pattern',r.pattern||'16x19'); setTriggerVal('tp-grip',r.grip||'2');
  document.getElementById('f-weight').value=r.weight||'';
  document.getElementById('f-hybrid').checked=!!e.hybrid; toggleHybrid();
  const s=e.strings||{};
  if(e.hybrid){ fillStr('sm',s.main); fillStr('sc',s.cross); } else fillStr('sn',s.single);
  document.getElementById('f-place').value=e.place||'';
  setDateFromString(e.date);
  formMeasurement=e.measurement?{...e.measurement}:null; renderFormMeasurement();
  document.getElementById('add-screen-title').textContent=t('add.editTitle');
  document.getElementById('save-btn-label').textContent=t('add.saveEdit');
  showScreen('screen-add');
}
function fillStr(p,data){
  data=data||{};
  const brand=data.brand||'';
  if(brand){ if(stringBrands().includes(brand)){ strSel[p].brand=brand; setStrTrigger(p,'b',brand); } else { strSel[p].brand='__CUSTOM__'; setStrTrigger(p,'b',t('common.customAdd')); document.getElementById(`${p}-bc-w`).hidden=false; document.getElementById(`${p}-bc`).value=brand; } }
  const model=data.model||'';
  if(model){ const list=(strSel[p].brand==='__CUSTOM__')?[]:stringModels(brand); if(list.includes(model)){ strSel[p].model=model; setStrTrigger(p,'m',model); } else { strSel[p].model='__CUSTOM__'; setStrTrigger(p,'m',t('common.customAdd')); document.getElementById(`${p}-mc-w`).hidden=false; document.getElementById(`${p}-mc`).value=model; } }
  document.getElementById(`${p}-g`).value=(data.gauge||'').replace('mm','');
  document.getElementById(`${p}-t`).value=data.tension||'';
}

/* ══════════════════════════════════════════ list / home ══════════════════════════════════════════ */
function brandColor(b){ return BRAND_COLORS[b]||'#3a413d'; }
function brandInitial(b){ return b?b.slice(0,1).toUpperCase():'🎾'; }
function setFilter(type,user){ currentFilter={type,user:user||null}; closeSheet(); renderList(); }
function renderList(){
  const c=document.getElementById('list-container');
  const banner=document.getElementById('filter-banner');
  const bannerText=document.getElementById('filter-banner-text');
  const noneName=t('name.none');
  const byUserAll={}; entries.forEach(e=>{const n=e.name||noneName;(byUserAll[n]=byUserAll[n]||[]).push(e);});
  document.getElementById('stat-total').textContent=entries.length;
  document.getElementById('stat-users').textContent=Object.keys(byUserAll).length;
  const allDates=entries.map(e=>e.date).filter(Boolean).sort();
  document.getElementById('stat-recent').textContent=allDates.length?allDates[allDates.length-1].slice(5).replace('-','/'):'—';
  if(!entries.length){ banner.hidden=true; c.innerHTML=`<div class="empty">${racketSVG()}<div class="t">${t('empty.title')}</div><div class="d">${t('empty.desc')}</div></div>`; return; }
  let indexed=entries.map((e,i)=>({...e,_i:i}));
  const byNewest=(a,b)=>(b.date||'').localeCompare(a.date||'')||b._i-a._i;  // latest work first
  if(currentFilter.type==='recent'){
    indexed=indexed.slice().sort(byNewest).slice(0,10);
    banner.hidden=false; bannerText.textContent=settings.lang==='ko'?'최근 작업 10건':'Recent 10 jobs';
  }else if(currentFilter.type==='user'){
    indexed=indexed.filter(e=>(e.name||noneName)===currentFilter.user).sort(byNewest);
    banner.hidden=false; bannerText.textContent=`${currentFilter.user} · ${indexed.length}${settings.lang==='ko'?'건':''}`;
  }else{ indexed=indexed.sort(byNewest); banner.hidden=true; }
  if(!indexed.length){ c.innerHTML=`<div class="empty"><div class="t">${t('empty.filterTitle')}</div><div class="d">${t('empty.filterDesc')}</div></div>`; return; }
  const byUser={}; indexed.forEach(e=>{const n=e.name||noneName;(byUser[n]=byUser[n]||[]).push(e);});
  c.innerHTML=`<div class="section-lead"><h2>${t('list.records')}</h2><span class="hint">${indexed.length}${t('unit.records')?' '+t('unit.records'):''}</span></div>`+
    Object.keys(byUser).map(uname=>{
      const cards=byUser[uname].map(e=>{
        const r=e.racket||{},s=e.strings||{};
        const rl=`${r.brand||''} ${r.model1||''}${r.model2?' '+r.model2:''}`.trim()||(settings.lang==='ko'?'라켓 정보 없음':'No racket info');
        let sl='';
        try{
          if(e.hybrid){ const m=s.main||{},cr=s.cross||{};
            const mT=`${m.brand||''} ${m.model||''}`.trim()+(m.tension?` ${m.tension}lbs`:'');
            const cT=`${cr.brand||''} ${cr.model||''}`.trim()+(cr.tension?` ${cr.tension}lbs`:'');
            sl=`${mT} / ${cT}`.trim();
          }else{ const g=s.single||{}; sl=`${g.brand||''} ${g.model||''}`.trim()+(g.tension?` ${g.tension}lbs`:''); }
        }catch(err){ sl=''; }
        const bc=brandColor(r.brand),bi=brandInitial(r.brand);

        return `<div class="card" onclick="showDetail(${e._i})">
          <div class="card-thumb" style="background:${bc}22;border:1px solid ${bc}44;color:${bc}">${bi}</div>
          <div class="card-body">
            <div class="card-title">${escHtml(rl)}</div>
            <div class="card-meta">${e.hybrid?'<span class="pill">HYBRID</span>':''}<span class="card-str">${escHtml(sl||'—')}</span><span class="card-date">${e.date||''}</span></div>
            ${e.place?`<div class="card-sub">📍 ${escHtml(e.place)}</div>`:''}
          </div></div>`;
      }).join('');
      return `<div class="user-group"><div class="user-head"><div class="avatar">${escHtml(uname.slice(0,2))}</div><span class="name">${escHtml(uname)}</span><span class="cnt">${byUser[uname].length}</span></div>${cards}</div>`;
    }).join('');
}
function racketSVG(){
  return `<div style="margin-bottom:12px">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="152" height="152">
    <defs><path id="hemArc" d="M100 100 m-72 0 a72 72 0 0 0 144 0"/></defs>
    <circle cx="100" cy="100" r="92" style="fill:none;stroke:var(--ink);stroke-width:1.4;opacity:.42"/>
    <circle cx="100" cy="100" r="84" style="fill:none;stroke:var(--ink);stroke-width:3.4"/>
    <text style="font-family:'Nanum Myeongjo',serif;font-size:11.5px;letter-spacing:3px;fill:var(--accent-text)" text-anchor="middle"><textPath href="#hemArc" startOffset="50%">STRINGER'S LOG</textPath></text>
    <ellipse cx="100" cy="142" rx="42" ry="10" style="fill:var(--accent)"/>
    <rect x="95" y="118" width="10" height="24" style="fill:var(--ink)"/>
    <ellipse cx="92" cy="88" rx="34" ry="42" style="fill:var(--ink)"/>
    <ellipse cx="92" cy="88" rx="23.5" ry="30" style="fill:var(--bg-elev)"/>
    <g style="stroke:var(--ink);stroke-width:1.3;opacity:.5">
      <line x1="92" y1="50" x2="92" y2="126"/><line x1="76" y1="60" x2="76" y2="116"/><line x1="108" y1="60" x2="108" y2="116"/>
      <line x1="61" y1="88" x2="123" y2="88"/><line x1="65" y1="70" x2="119" y2="70"/><line x1="65" y1="106" x2="119" y2="106"/>
    </g>
    <path d="M126 102 L147 110" style="stroke:var(--ink);stroke-width:5;stroke-linecap:round"/>
    <circle cx="155" cy="113" r="10.5" style="fill:var(--accent)"/>
    <circle cx="155" cy="113" r="3.4" style="fill:var(--bg-elev)"/>
  </svg></div>`;
}

/* ══════════════════════════════════════════ detail ══════════════════════════════════════════ */
function showDetail(idx){
  if(!entries[idx]){ showToast(t('toast.notFound'),'err'); showScreen('screen-home'); return; }
  currentIdx=idx;
  const e=entries[idx],r=e.racket||{}; e.strings=e.strings||{};
  let sHtml='';
  if(e.hybrid){ const m=e.strings.main||{},cr=e.strings.cross||{};
    sHtml=`<div class="d-row"><span class="dk">${t('d.type')}</span><span class="dv"><span class="badge">${t('d.hybrid')}</span></span></div>
      <div class="divider-lbl"><span>MAIN</span></div>${strRows(m)}<div class="divider-lbl"><span>CROSS</span></div>${strRows(cr)}`;
  }else sHtml=strRows(e.strings.single||{});
  const measHtml='';
  let fbHtml='';
  if(e.feedbacks&&e.feedbacks.length){ const fb=e.feedbacks[e.feedbacks.length-1];
    fbHtml=`<div class="detail-label">${t('detail.recentFb')} · ${fb.date||''}</div><div class="fb-saved"><div style="display:flex;justify-content:center">${miniRadar(fb.scores)}</div>${fb.text?`<div class="fb-text-prev">${escHtml(fb.text)}</div>`:''}</div>`;
  }
  document.getElementById('detail-content').innerHTML=`
    <div class="detail-label">${t('detail.racket')}</div>
    <div class="detail-group">
      <div class="d-row"><span class="dk">${t('d.brand')}</span><span class="dv">${escHtml(r.brand)||'-'}</span></div>
      <div class="d-row"><span class="dk">${t('d.model')}</span><span class="dv">${escHtml(r.model1)||'-'}${r.model2?' '+escHtml(r.model2):''}</span></div>
      <div class="d-row"><span class="dk">${t('d.pattern')}</span><span class="dv mono">${escHtml(r.pattern)||'-'}</span></div>
      <div class="d-row"><span class="dk">${t('d.grip')}</span><span class="dv mono">${escHtml(r.grip)||'-'}</span></div>
      <div class="d-row"><span class="dk">${t('d.weight')}</span><span class="dv mono">${r.weight?r.weight+'g':'-'}</span></div>
    </div>
    <div class="detail-label">${t('detail.string')}</div>
    <div class="detail-group">${sHtml}</div>
    ${measHtml}
    <div class="detail-label">${t('detail.work')}</div>
    <div class="detail-group">
      <div class="d-row"><span class="dk">${t('d.date')}</span><span class="dv mono">${e.date||'-'}</span></div>
      <div class="d-row"><span class="dk">${t('d.place')}</span><span class="dv">${escHtml(e.place)||'-'}</span></div>
    </div>
    ${fbHtml}
    <button class="action-btn" onclick="showFeedback(${idx})">${t('d.addFb')}</button>
    <button class="action-btn" onclick="editEntry(${idx})">${t('d.edit')}</button>
    <button class="delete-btn" onclick="deleteEntry(${idx})">${t('d.delete')}</button>
    <div class="spacer"></div>`;
  showScreen('screen-detail');
}
function strRows(s){
  return `<div class="d-row"><span class="dk">${t('d.brand')}</span><span class="dv">${escHtml(s.brand)||'-'}</span></div>
    <div class="d-row"><span class="dk">${t('d.model')}</span><span class="dv">${escHtml(s.model)||'-'}</span></div>
    <div class="d-row"><span class="dk">${t('d.gauge')}</span><span class="dv mono">${escHtml(s.gauge)||'-'}</span></div>
    <div class="d-row"><span class="dk">${t('d.tension')}</span><span class="dv mono">${s.tension?s.tension+' lbs':'-'}</span></div>`;
}
function deleteEntry(idx){ if(!confirm(t('confirm.delete'))) return; entries.splice(idx,1); persist(); showToast(t('toast.deleted')); showScreen('screen-home'); }

/* ══════════════════════════════════════════ feedback / radar ══════════════════════════════════════════ */
function showFeedback(idx){
  currentIdx=idx; fbBackTarget=idx;
  document.getElementById('fb-back-btn').onclick=()=>showDetail(idx);
  document.getElementById('score-sliders').innerHTML=AXES_KEYS.map((a,i)=>`<div class="slider-row"><span class="sl-label">${t('axis.'+a)}</span><div class="sl-track"><input type="range" min="1" max="10" value="6" id="sl-${i}" oninput="updateRadar()"></div><span class="sl-val" id="sv-${i}">6</span></div>`).join('');
  document.getElementById('f-fb-text').value='';
  updateRadar(); showScreen('screen-feedback');
}
function updateRadar(){
  const sc=AXES_KEYS.map((_,i)=>parseInt(document.getElementById(`sl-${i}`).value));
  AXES_KEYS.forEach((_,i)=>document.getElementById(`sv-${i}`).textContent=sc[i]);
  document.getElementById('radar-svg').innerHTML=buildRadar(sc,140,125,92,false);
}
function saveFeedback(){
  if(!entries[currentIdx]){ showToast(t('toast.notFound'),'err'); showScreen('screen-home'); return; }
  const sc=AXES_KEYS.map((_,i)=>parseInt(document.getElementById(`sl-${i}`).value));
  const txt=document.getElementById('f-fb-text').value.trim();
  if(!entries[currentIdx].feedbacks) entries[currentIdx].feedbacks=[];
  entries[currentIdx].feedbacks.push({scores:sc,text:txt,date:new Date().toLocaleDateString(settings.lang==='ko'?'ko-KR':'en-US')});
  persist(); showToast(t('toast.fbSaved')); showDetail(currentIdx);
}
function miniRadar(scores){ return `<svg width="210" height="185" viewBox="0 0 210 185" style="overflow:visible">${buildRadar(scores,105,92,72,true)}</svg>`; }
function buildRadar(scores,cx,cy,r,small){
  const n=AXES_KEYS.length;
  const pt=(val,scale,i)=>{const a=Math.PI*2*i/n-Math.PI/2;return[cx+scale*val/10*r*Math.cos(a),cy+scale*val/10*r*Math.sin(a)];};
  let o='';
  const web=cssVar('--radar-web')||'rgba(255,255,255,0.09)';
  [0.2,0.4,0.6,0.8,1.0].forEach(s=>{const pts=AXES_KEYS.map((_,i)=>pt(10,s,i));o+=`<polygon points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${web}" stroke-width="1"/>`;});
  AXES_KEYS.forEach((label,i)=>{
    const[x2,y2]=pt(10,1,i); o+=`<line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${web}" stroke-width="1"/>`;
    const[lx,ly]=pt(10+(small?3.2:3.4),1,i);
    o+=`<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" font-size="${small?10:11}" fill="${AC.text}" font-family="Pretendard,sans-serif" font-weight="700">${t('axis.'+label)}</text>`;
  });
  const spts=scores.map((v,i)=>pt(v,1,i));
  o+=`<polygon points="${spts.map(p=>p.join(',')).join(' ')}" fill="${AC.fill}" stroke="${AC.text}" stroke-width="2.4"/>`;
  spts.forEach(([x,y])=>o+=`<circle cx="${x}" cy="${y}" r="${small?3:4}" fill="${AC.text}"/>`);
  return o;
}

/* ══════════════════════════════════════════ date drum (3-col) ══════════════════════════════════════════ */
const dateHandlers={year:null,month:null,day:null};
const datePrev={year:-1,month:-1,day:-1};
function buildDateCol(el,key,items,val){
  if(dateHandlers[key]) el.removeEventListener('scroll',dateHandlers[key]);
  el.innerHTML='<div class="drum-pad"></div>'+items.map(v=>`<div class="drum-item" data-val="${v}">${v}</div>`).join('')+'<div class="drum-pad"></div>';
  const idx=items.indexOf(val); if(idx>=0){el.scrollTop=idx*PICK_H;datePrev[key]=idx;}
  hlDate(el);
  dateHandlers[key]=()=>{ const ni=Math.round(el.scrollTop/PICK_H); if(ni!==datePrev[key]){datePrev[key]=ni;haptic('light');} hlDate(el); if(key==='year'||key==='month') rebuildDays(); };
  el.addEventListener('scroll',dateHandlers[key],{passive:true});
}
function hlDate(el){ const idx=Math.round(el.scrollTop/PICK_H); el.querySelectorAll('.drum-item').forEach((it,i)=>it.classList.toggle('active',i===idx)); }
function rebuildDays(){
  const yEl=document.getElementById('drum-year'),mEl=document.getElementById('drum-month'),dEl=document.getElementById('drum-day');
  const curY=drumYears[Math.round(yEl.scrollTop/PICK_H)]||drumState.y;
  const curM=(Math.round(mEl.scrollTop/PICK_H)+1)||drumState.m;
  const md=maxDay(curY,curM); const curD=Math.min(Math.round(dEl.scrollTop/PICK_H)+1,md);
  const days=Array.from({length:md},(_,i)=>i+1);
  if(dateHandlers.day) dEl.removeEventListener('scroll',dateHandlers.day);
  dEl.innerHTML='<div class="drum-pad"></div>'+days.map(v=>`<div class="drum-item" data-val="${v}">${v}</div>`).join('')+'<div class="drum-pad"></div>';
  dEl.scrollTop=(curD-1)*PICK_H; hlDate(dEl);
  dateHandlers.day=()=>{ const ni=Math.round(dEl.scrollTop/PICK_H); if(ni!==datePrev.day){datePrev.day=ni;haptic('light');} hlDate(dEl); };
  dEl.addEventListener('scroll',dateHandlers.day,{passive:true});
}
function openDatePicker(){
  const now=new Date();
  const cy=drumState.y||now.getFullYear(),cm=drumState.m||(now.getMonth()+1),cd=drumState.d||now.getDate();
  drumYears=Array.from({length:11},(_,i)=>now.getFullYear()-5+i);
  buildDateCol(document.getElementById('drum-year'),'year',drumYears,cy);
  buildDateCol(document.getElementById('drum-month'),'month',Array.from({length:12},(_,i)=>i+1),cm);
  buildDateCol(document.getElementById('drum-day'),'day',Array.from({length:maxDay(cy,cm)},(_,i)=>i+1),cd);
  document.getElementById('date-overlay').classList.add('show');
  document.getElementById('date-sheet').classList.add('show');
}
function closeDatePicker(){ document.getElementById('date-overlay').classList.remove('show'); document.getElementById('date-sheet').classList.remove('show'); }
function confirmDate(){
  const yEl=document.getElementById('drum-year'),mEl=document.getElementById('drum-month'),dEl=document.getElementById('drum-day');
  const y=drumYears[Math.round(yEl.scrollTop/PICK_H)]||drumState.y;
  const m=Math.round(mEl.scrollTop/PICK_H)+1;
  const d=Math.min(Math.round(dEl.scrollTop/PICK_H)+1,maxDay(y,m));
  drumState.y=y;drumState.m=m;drumState.d=d; setDateDisplay(y,m,d); haptic('confirm'); closeDatePicker();
}
function resetDrumDate(){ const td=new Date(); drumState.y=td.getFullYear();drumState.m=td.getMonth()+1;drumState.d=td.getDate(); setDateDisplay(drumState.y,drumState.m,drumState.d); }
function setDateFromString(str){ if(!str){resetDrumDate();return;} const[y,m,d]=str.split('-').map(Number); if(!y||!m||!d){resetDrumDate();return;} drumState.y=y;drumState.m=m;drumState.d=d; setDateDisplay(y,m,d); }
function setDateDisplay(y,m,d){
  const el=document.getElementById('date-display');
  el.textContent = settings.lang==='ko'?`${y}년 ${m}월 ${d}일`:`${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]} ${d}, ${y}`;
  document.getElementById('f-date').value=`${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
function maxDay(y,m){ return new Date(y,m,0).getDate(); }

/* ══════════════════════════════════════════ settings: language ══════════════════════════════════════════ */
function setLang(lang){
  if(settings.lang===lang){ return; }
  settings.lang=lang; persistSettings();
  applyStaticI18n(); syncLangUI();
  document.getElementById('sn-fields').innerHTML=buildSF('sn');
  document.getElementById('sm-fields').innerHTML=buildSF('sm');
  document.getElementById('sc-fields').innerHTML=buildSF('sc');
  // re-apply current selections to string triggers
  ['sn','sm','sc'].forEach(p=>{
    setStrTrigger(p,'b', strSel[p].brand==='__CUSTOM__'?t('common.customAdd'):(strSel[p].brand||''), !strSel[p].brand);
    setStrTrigger(p,'m', strSel[p].model==='__CUSTOM__'?t('common.customAdd'):(strSel[p].model||''), !strSel[p].model);
  });
  setDateDisplay(drumState.y,drumState.m,drumState.d);
  updateCustomCounts();
  renderList();
  haptic('light');
}
function syncLangUI(){
  document.getElementById('lang-ko').classList.toggle('on', settings.lang==='ko');
  document.getElementById('lang-en').classList.toggle('on', settings.lang==='en');
}

/* ══════════════════════════════════════════ settings: theme ══════════════════════════════════════════ */
function syncThemeUI(){
  const sw=document.getElementById('set-theme-sw');
  if(sw) sw.style.background=getTheme(settings.theme).ac;
}
function openThemePicker(){
  const grid=THEMES.map(th=>{
    const sel=th.id===settings.theme;
    return `<div class="theme-opt ${sel?'sel':''}" style="--tsw:${th.ac}" onclick="setTheme('${th.id}')">
      <div class="theme-dot" style="background:linear-gradient(135deg,${th.ac},${th.deep})"><span class="rng" style="background:${th.a2}"></span></div>
      <div class="theme-name">${t('theme.'+th.id)}</div>
      <div class="theme-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div>
    </div>`;
  }).join('');
  openSheet(`
    <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('theme.title')}</span><button class="sheet-cancel" onclick="closeSheet()">${t('common.close')}</button></div>
    <div class="sheet-body"><div class="theme-grid">${grid}</div></div>`);
}
function setTheme(id){
  settings.theme=id; persistSettings();
  applyTheme(id);
  syncThemeUI();
  refreshThemedGraphics();
  haptic('light');
  openThemePicker(); // re-render sheet so the selection check moves live
}
/* redraw JS-generated SVG/canvas that bake in accent colors */
function refreshThemedGraphics(){
  const det=document.getElementById('screen-detail');
  if(det && det.classList.contains('active') && currentIdx!=null) showDetail(currentIdx);
  const fb=document.getElementById('screen-feedback');
  if(fb && fb.classList.contains('active')) updateRadar();
}

/* ══════════════════════════════════════════ settings: weekly auto-backup ══════════════════════════════════════════ */
function toggleAutoBackup(){
  settings.autoBackup=document.getElementById('f-autobackup').checked;
  persistSettings(); haptic('light');
}

/* ══════════════════════════════════════════ settings: head size ══════════════════════════════════════════ */
function pickHeadSizeSetting(){
  openPicker({ title:t('set.headSize'), items:HEAD_SIZES.map(String), value:String(settings.headSize),
    onConfirm:(v)=>{ settings.headSize=parseInt(v); persistSettings();
      document.getElementById('set-headsize-val').textContent=settings.headSize+' in²';
      document.getElementById('meter-headsize-val').textContent=settings.headSize;
      if(lastFreq) recomputeMeter(); } });
}
function pickHeadSizeMeter(){
  openPicker({ title:t('meter.headSize'), items:HEAD_SIZES.map(String), value:String(meterHeadSize),
    onConfirm:(v)=>{ meterHeadSize=parseInt(v); document.getElementById('meter-headsize-val').textContent=meterHeadSize; if(lastFreq) recomputeMeter(); } });
}

/* ══════════════════════════════════════════ settings: custom lists ══════════════════════════════════════════ */
function updateCustomCounts(){
  const rb=document.getElementById('cnt-racketBrands'); if(rb) rb.textContent=customData.racketBrands.length;
  const sb=document.getElementById('cnt-stringBrands'); if(sb) sb.textContent=customData.stringBrands.length;
}
function openCustomList(key){ renderCustomListSheet(key); }
function renderCustomListSheet(key){
  const title = key==='racketBrands'?t('set.racketBrands'):t('set.stringBrands');
  const items = customData[key]||[];
  const chips = items.length ? items.map((v,i)=>`<span class="chip">${escHtml(v)}<button onclick="removeCustom('${key}',${i})" aria-label="delete">✕</button></span>`).join('')
    : `<div style="font-size:13px;color:var(--ink-4);padding:2px">${t('custom.empty')}</div>`;
  openSheet(`
    <div class="sheet-header"><button class="sheet-cancel" onclick="closeSheet()">${t('common.close')}</button><span class="sheet-title">${title}</span><span style="width:40px"></span></div>
    <div class="sheet-body">
      <div class="sheet-desc">${t('set.customSub')}</div>
      <div class="chip-row" id="custom-chips">${chips}</div>
      <div class="add-field">
        <input type="text" id="custom-input" placeholder="${t('custom.addPh')}" onkeydown="if(event.key==='Enter')addCustom('${key}')">
        <button onclick="addCustom('${key}')">${t('common.add')}</button>
      </div>
    </div>`);
}
function addCustom(key){
  const inp=document.getElementById('custom-input'); const v=inp.value.trim(); if(!v) return;
  const defList = key==='racketBrands'?DEF_RACKET_BRANDS:DEF_STRING_BRANDS;
  if(defList.includes(v)||customData[key].includes(v)){ showToast(t('toast.exists'),'amber'); return; }
  customData[key].push(v); persistCustom(); inp.value=''; renderCustomListSheet(key); updateCustomCounts(); showToast(t('toast.added')); haptic('light');
}
function removeCustom(key,i){ customData[key].splice(i,1); persistCustom(); renderCustomListSheet(key); updateCustomCounts(); showToast(t('toast.removed')); }

/* custom models per brand */
function openCustomModelPicker(kind){
  const brands = kind==='racket'?racketBrands():stringBrands();
  openPicker({ title:t('custom.pickBrand'), items:brands, value:brands[0], onConfirm:(brand)=>renderCustomModelSheet(kind,brand) });
}
function renderCustomModelSheet(kind,brand){
  const store = kind==='racket'?customData.racketModels:customData.stringModels;
  const items = store[brand]||[];
  const chips = items.length ? items.map((v,i)=>`<span class="chip">${escHtml(v)}<button onclick="removeCustomModel('${kind}','${escAttr(brand)}',${i})">✕</button></span>`).join('')
    : `<div style="font-size:13px;color:var(--ink-4);padding:2px">${t('custom.empty')}</div>`;
  openSheet(`
    <div class="sheet-header"><button class="sheet-cancel" onclick="closeSheet()">${t('common.close')}</button><span class="sheet-title">${escHtml(brand)} ${t('custom.modelsOf')}</span><span style="width:40px"></span></div>
    <div class="sheet-body">
      <div class="sheet-desc">${t('set.modelSub')}</div>
      <div class="chip-row">${chips}</div>
      <div class="add-field">
        <input type="text" id="custom-model-input" placeholder="${t('custom.addPh')}" onkeydown="if(event.key==='Enter')addCustomModel('${kind}','${escAttr(brand)}')">
        <button onclick="addCustomModel('${kind}','${escAttr(brand)}')">${t('common.add')}</button>
      </div>
    </div>`);
}
function addCustomModel(kind,brand){
  const inp=document.getElementById('custom-model-input'); const v=inp.value.trim(); if(!v) return;
  const store = kind==='racket'?customData.racketModels:customData.stringModels;
  const defList = kind==='racket'?(DEF_RACKET_MODELS[brand]||[]):(DEF_STRING_MODELS[brand]||[]);
  if(!store[brand]) store[brand]=[];
  if(defList.includes(v)||store[brand].includes(v)){ showToast(t('toast.exists'),'amber'); return; }
  store[brand].push(v); persistCustom(); inp.value=''; renderCustomModelSheet(kind,brand); showToast(t('toast.added')); haptic('light');
}
function removeCustomModel(kind,brand,i){
  const store = kind==='racket'?customData.racketModels:customData.stringModels;
  if(store[brand]){ store[brand].splice(i,1); persistCustom(); renderCustomModelSheet(kind,brand); showToast(t('toast.removed')); }
}

/* ══════════════════════════════════════════ user filter sheet ══════════════════════════════════════════ */
function openUserFilter(){
  const noneName=t('name.none');
  const byUser={}; entries.forEach(e=>{const n=e.name||noneName;byUser[n]=(byUser[n]||0)+1;});
  const names=Object.keys(byUser);
  const list = names.length ? names.map(n=>`<div class="list-item" onclick="setFilter('user','${escAttr(n).replace(/'/g,"\\'")}')"><div class="li-avatar">${escHtml(n.slice(0,2))}</div><span class="li-name">${escHtml(n)}</span><span class="li-cnt">${byUser[n]}${settings.lang==='ko'?'건':''}</span></div>`).join('')
    : `<div style="text-align:center;color:var(--ink-4);font-size:13px;padding:24px 0">${t('empty.noPlayer')}</div>`;
  openSheet(`
    <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('user.title')}</span><button class="sheet-cancel" onclick="closeSheet()">${t('common.close')}</button></div>
    <div class="sheet-body"><div class="sheet-desc">${t('user.desc')}</div>${list}</div>`);
}

/* ══════════════════════════════════════════ backup / restore ══════════════════════════════════════════ */
function openBackupSheet(){
  let snap=null; try{ snap=JSON.parse(localStorage.getItem(K_AUTOBAK)||'null'); }catch(e){}
  const autoRow = (snap&&Array.isArray(snap.entries))
    ? `<button class="sheet-btn-cancel" style="width:100%;margin-top:10px" onclick="restoreAutoSnapshot()">${t('backup.restoreAuto')} · ${snap.exportedAt?snap.exportedAt.slice(0,10):''} (${snap.entries.length})</button>`
    : '';
  openSheet(`
    <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('backup.title')}</span><button class="sheet-cancel" onclick="closeSheet()">${t('common.close')}</button></div>
    <div class="sheet-body">
      <div class="sheet-desc">${t('backup.desc')}</div>
      <div class="sheet-btns">
        <button class="sheet-btn-cancel" onclick="closeSheet();exportBackup()">${t('backup.export')}</button>
        <button class="sheet-btn-confirm" onclick="closeSheet();triggerImport()">${t('backup.import')}</button>
      </div>
      ${autoRow}
    </div>`);
}
function backupPayload(){
  return { app:'스트링일지', version:2, exportedAt:new Date().toISOString(), count:entries.length, settings, customData, entries };
}
function downloadBackup(auto){
  const payload=backupPayload();
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const date=new Date().toISOString().slice(0,10).replace(/-/g,'');
  const tag=auto?(settings.lang==='ko'?'자동':'auto'):'';
  const a=document.createElement('a'); a.href=url; a.download=`스트링일지_${tag?tag+'_':''}백업_${date}.json`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  return payload;
}
function exportBackup(){
  if(!entries.length){ showToast(t('toast.noBackup'),'amber'); return; }
  downloadBackup(false);
  showToast(`📦 ${entries.length}${t('toast.backupDone')}`);
}

/* ── weekly auto-backup ── */
function weekKey(d){
  // ISO week: returns e.g. "2026-W27"
  const t2=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const day=t2.getUTCDay()||7; t2.setUTCDate(t2.getUTCDate()+4-day);
  const yStart=new Date(Date.UTC(t2.getUTCFullYear(),0,1));
  const wk=Math.ceil(((t2-yStart)/86400000+1)/7);
  return `${t2.getUTCFullYear()}-W${String(wk).padStart(2,'0')}`;
}
function maybeAutoBackup(){
  if(settings.autoBackup===false) return;
  if(!entries.length) return;
  const wk=weekKey(new Date());
  if(settings.lastAutoBackupWeek===wk) return;   // already done this week
  settings.lastAutoBackupWeek=wk; persistSettings();
  const payload=downloadBackup(true);            // off-device file (Android/desktop)
  try{ localStorage.setItem(K_AUTOBAK, JSON.stringify(payload)); }catch(e){}  // in-app safety net
  showToast(`🗂️ ${t('toast.autoBackup')}`);
}
function restoreAutoSnapshot(){
  let snap=null;
  try{ snap=JSON.parse(localStorage.getItem(K_AUTOBAK)||'null'); }catch(e){}
  if(!snap||!Array.isArray(snap.entries)){ showToast('❌ '+t('toast.badFile'),'err'); return; }
  pendingImport=snap; closeSheet();
  const users=[...new Set(snap.entries.map(x=>x.name).filter(Boolean))];
  const info=`${t('restore.loaded')}: <b>${snap.entries.length}${settings.lang==='ko'?'건':''}</b>`+
    (users.length?`<br>${t('restore.players')}: ${escHtml(users.join(', '))}`:'')+
    (snap.exportedAt?`<br>${t('restore.backupDate')}: ${snap.exportedAt.slice(0,10)}`:'');
  openSheet(`
    <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('restore.title')}</span><button class="sheet-cancel" onclick="cancelRestore()">${t('common.cancel')}</button></div>
    <div class="sheet-body">
      <div class="sheet-desc">${t('restore.desc')}</div>
      <div class="restore-info" style="background:var(--accent-soft);border:1px solid var(--accent-b22);border-radius:12px;padding:13px 14px;margin-bottom:18px;font-size:13px;color:var(--accent);font-weight:600;line-height:1.6">${info}</div>
      <div class="sheet-btns"><button class="sheet-btn-cancel" onclick="cancelRestore()">${t('common.cancel')}</button><button class="sheet-btn-confirm danger" onclick="confirmRestore()">${t('restore.do')}</button></div>
    </div>`);
}
function triggerImport(){ const f=document.getElementById('import-file'); f.value=''; f.click(); }
let pendingImport=null;
function handleImportFile(e){
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=(ev)=>{
    try{
      const data=JSON.parse(ev.target.result);
      if(!data.entries||!Array.isArray(data.entries)){ showToast('❌ '+t('toast.badFile'),'err'); return; }
      pendingImport=data;
      const users=[...new Set(data.entries.map(x=>x.name).filter(Boolean))];
      const info=`${t('restore.loaded')}: <b>${data.entries.length}${settings.lang==='ko'?'건':''}</b>`+
        (users.length?`<br>${t('restore.players')}: ${escHtml(users.join(', '))}`:'')+
        (data.exportedAt?`<br>${t('restore.backupDate')}: ${data.exportedAt.slice(0,10)}`:'');
      openSheet(`
        <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('restore.title')}</span><button class="sheet-cancel" onclick="cancelRestore()">${t('common.cancel')}</button></div>
        <div class="sheet-body">
          <div class="sheet-desc">${t('restore.desc')}</div>
          <div class="restore-info" style="background:var(--accent-soft);border:1px solid var(--accent-b22);border-radius:12px;padding:13px 14px;margin-bottom:18px;font-size:13px;color:var(--accent);font-weight:600;line-height:1.6">${info}</div>
          <div class="sheet-btns"><button class="sheet-btn-cancel" onclick="cancelRestore()">${t('common.cancel')}</button><button class="sheet-btn-confirm danger" onclick="confirmRestore()">${t('restore.do')}</button></div>
        </div>`);
    }catch(err){ showToast('❌ '+t('toast.readFail'),'err'); }
  };
  reader.readAsText(file);
}
function cancelRestore(){ pendingImport=null; closeSheet(); }
function confirmRestore(){
  if(!pendingImport) return;
  entries=pendingImport.entries;
  if(pendingImport.customData) customData={racketBrands:pendingImport.customData.racketBrands||[],racketModels:pendingImport.customData.racketModels||{},stringBrands:pendingImport.customData.stringBrands||[],stringModels:pendingImport.customData.stringModels||{}};
  if(pendingImport.settings){ settings={...settings,...pendingImport.settings}; }
  persist(); persistCustom(); persistSettings();
  pendingImport=null; closeSheet();
  applyMode();
  applyStaticI18n(); syncLangUI(); syncThemeUI(); updateCustomCounts();
  document.getElementById('f-autobackup').checked = settings.autoBackup !== false;
  renderList();
  showToast(`✅ ${entries.length}${t('toast.restoreDone')}`);
}

/* ══════════════════════════════════════════ TENSION METER (Web Audio) ══════════════════════════════════════════ */
let audioCtx=null, analyser=null, micStream=null, micSource=null, rafId=null;
let meterHeadSize=100, meterOrigin=null; // origin: 'form' or null
let lastFreq=0, lastDT=0, lastTone='', lastConfidence=0, lastSignalStrength=0;
let stableFrames=0, stableFreq=0, lockedFreq=0, isLocked=false;
const STABLE_NEED=14; // frames of consistency to lock
const FREQ_MIN=180, FREQ_MAX=1200;

function openMeter(origin){
  meterOrigin=origin||null;
  meterHeadSize=settings.headSize;
  document.getElementById('meter-headsize-val').textContent=meterHeadSize;
  resetMeterReadout();
  showScreen('screen-meter');
}
function resetMeterReadout(){
  lastFreq=0;lastDT=0;lastTone='';stableFrames=0;stableFreq=0;lockedFreq=0;isLocked=false;
  document.getElementById('meter-hz').textContent='—';
  document.getElementById('meter-hz').classList.remove('locked');
  document.getElementById('meter-dt').textContent='—';
  document.getElementById('meter-lbs').textContent='—';
  document.getElementById('meter-tone').textContent='—';
  document.getElementById('stability-bar').style.width='0%';
  document.getElementById('stability-bar').classList.remove('full');
  const st=document.getElementById('meter-status'); st.textContent=t('meter.idle'); st.classList.remove('locked');
  document.getElementById('meter-use-btn').disabled=true;
}
function closeMeter(){ stopMic(); if(meterOrigin==='form') showScreen('screen-add'); else showScreen('screen-home'); }

async function toggleMic(){
  if(micStream){ stopMic(); return; }
  try{
    micStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
  }catch(err){
    showToast(err&&err.name==='NotAllowedError'?t('meter.micDenied'):t('meter.micError'),'err');
    micStream=null; return;
  }
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') await audioCtx.resume();
  analyser=audioCtx.createAnalyser();
  analyser.fftSize=2048;
  micSource=audioCtx.createMediaStreamSource(micStream);
  micSource.connect(analyser);
  isLocked=false; stableFrames=0;
  document.getElementById('mic-btn').classList.add('listening');
  document.getElementById('mic-btn-label').textContent=t('meter.stop');
  const st=document.getElementById('meter-status'); st.textContent=t('meter.listening'); st.classList.remove('locked');
  document.getElementById('meter-hz').classList.remove('locked');
  meterLoop();
  haptic('light');
}
function stopMic(){
  if(rafId){ cancelAnimationFrame(rafId); rafId=null; }
  if(micSource){ try{micSource.disconnect();}catch(e){} micSource=null; }
  if(micStream){ micStream.getTracks().forEach(tr=>tr.stop()); micStream=null; }
  if(audioCtx){ try{audioCtx.close();}catch(e){} audioCtx=null; }
  analyser=null;
  const b=document.getElementById('mic-btn'); if(b){ b.classList.remove('listening'); document.getElementById('mic-btn-label').textContent=t('meter.start'); }
}

const timeBuf=new Float32Array(2048);
function meterLoop(){
  if(!analyser){ return; }
  analyser.getFloatTimeDomainData(timeBuf);
  drawScope(timeBuf);
  const freq=autoCorrelate(timeBuf, audioCtx.sampleRate);
  const st=document.getElementById('meter-status');
  if(!isLocked){
    if(freq>0 && freq>=FREQ_MIN && freq<=FREQ_MAX){
      st.textContent=t('meter.detecting');
      // stability: same frequency within 3%
      if(stableFreq>0 && Math.abs(freq-stableFreq)/stableFreq < 0.03){
        stableFrames++;
      }else{ stableFrames=1; stableFreq=freq; }
      const pct=Math.min(100, Math.round(stableFrames/STABLE_NEED*100));
      const bar=document.getElementById('stability-bar');
      bar.style.width=pct+'%'; bar.classList.toggle('full', pct>=100);
      // live readout while detecting
      updateReadout(Math.round(freq));
      if(stableFrames>=STABLE_NEED){ lockMeter(stableFreq); }
    }else{
      // decay
      stableFrames=Math.max(0,stableFrames-1);
      document.getElementById('stability-bar').style.width=Math.min(100,Math.round(stableFrames/STABLE_NEED*100))+'%';
      if(stableFrames===0) st.textContent=t('meter.listening');
    }
  }
  rafId=requestAnimationFrame(meterLoop);
}
function lockMeter(freq){
  isLocked=true; lockedFreq=Math.round(freq);
  updateReadout(lockedFreq);
  const st=document.getElementById('meter-status'); st.textContent=t('meter.locked'); st.classList.add('locked');
  document.getElementById('meter-hz').classList.add('locked');
  document.getElementById('stability-bar').classList.add('full');
  document.getElementById('meter-use-btn').disabled=false;
  haptic('lock');
}
function updateReadout(freq){
  lastFreq=freq;
  lastDT=calcDT(freq, meterHeadSize);
  lastTone=freqToNote(freq);
  
  /* calculate overall confidence score */
  const freqScore = (freq >= 150 && freq <= 800) ? 0.3 : (freq >= 100 && freq <= 900) ? 0.15 : 0;
  const signalScore = lastSignalStrength >= 0.3 ? 0.4 : (lastSignalStrength >= 0.15 ? 0.2 : 0);
  const yinScore = Math.max(0, lastConfidence * 0.3);
  lastConfidence = Math.min(1.0, 0.3 + freqScore + signalScore + yinScore);
  
  document.getElementById('meter-hz').textContent=freq;
  document.getElementById('meter-dt').textContent=lastDT;
  document.getElementById('meter-lbs').textContent='≈'+calcLbs(lastDT);
  document.getElementById('meter-tone').textContent=lastTone;
  
  /* update confidence display */
  const confEl=document.getElementById('meter-confidence');
  if(confEl){
    const confPct=Math.round(lastConfidence*100);
    confEl.textContent=confPct+'%';
    const bar=document.getElementById('confidence-fill');
    if(bar) bar.style.width=confPct+'%';
  }
}
function recomputeMeter(){ if(lastFreq){ lastDT=calcDT(lastFreq,meterHeadSize);
  document.getElementById('meter-dt').textContent=lastDT;
  document.getElementById('meter-lbs').textContent='≈'+calcLbs(lastDT); } }

/* DT index: membrane model T ∝ f² × area ; calibrated so 100 in² @ ~520Hz ≈ 37 */
function calcDT(freq, headSizeSqin){
  const dt = freq*freq * (headSizeSqin) * 1.37e-6;
  return Math.round(dt*10)/10;
}
/* frequency → nearest musical note (helps identify consistency) */
function freqToNote(freq){
  if(!freq||freq<=0) return '—';
  const names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const midi=Math.round(69+12*Math.log2(freq/440));
  const name=names[((midi%12)+12)%12];
  const oct=Math.floor(midi/12)-1;
  return name+oct;
}

/* YIN pitch detection algorithm (improved from autocorrelation) */
function autoCorrelate(buf, sampleRate){
  const N = buf.length;
  const yinBuffer = new Array(Math.floor(N/2));
  
  /* calculate RMS for signal strength */
  let rms = 0;
  for(let i=0; i<N; i++){ rms += buf[i]*buf[i]; }
  rms = Math.sqrt(rms/N);
  lastSignalStrength = rms;
  
  /* too quiet → no detection */
  if(rms < 0.008) return -1;
  
  /* step 1: autocorrelation */
  for(let j=0; j<N/2; j++){
    yinBuffer[j] = 0;
    for(let i=0; i<N/2; i++){
      const val = buf[i] - buf[i+j];
      yinBuffer[j] += val * val;
    }
  }
  
  /* step 2: cumulative mean normalized difference function */
  yinBuffer[0] = 1;
  let sum = 0;
  for(let j=1; j<N/2; j++){
    sum += yinBuffer[j];
    yinBuffer[j] *= j / (sum===0 ? 1 : sum);
  }
  
  /* step 3: absolute threshold (0.15 for robust fundamental frequency) */
  const threshold = 0.15;
  for(let j=1; j<N/2; j++){
    if(yinBuffer[j] < threshold){
      /* quadratic interpolation for better accuracy */
      const x1 = j-1;
      const x2 = j;
      const x3 = j+1 < N/2 ? j+1 : j;
      const a = yinBuffer[x1];
      const b = yinBuffer[x2];
      const c = x3 < N/2 ? yinBuffer[x3] : b;
      const shift = (c - a) / (2 * (a - 2*b + c + 0.0001));
      const tau = j + shift;
      const freq = sampleRate / tau;
      
      /* confidence score based on threshold crossing */
      lastConfidence = 1.0 - (yinBuffer[j] / threshold);
      
      return (freq > 0 && isFinite(freq)) ? freq : -1;
    }
  }
  return -1;
}

/* oscilloscope draw */
let scopeCanvas=null, scopeCtx=null;
function drawScope(buf){
  if(!scopeCanvas){ scopeCanvas=document.getElementById('scope-canvas'); if(!scopeCanvas) return; scopeCtx=scopeCanvas.getContext('2d'); }
  const dpr=window.devicePixelRatio||1;
  const w=scopeCanvas.clientWidth, h=scopeCanvas.clientHeight;
  if(scopeCanvas.width!==w*dpr||scopeCanvas.height!==h*dpr){ scopeCanvas.width=w*dpr; scopeCanvas.height=h*dpr; scopeCtx.scale(dpr,dpr); }
  scopeCtx.clearRect(0,0,w,h);
  scopeCtx.lineWidth=2;
  scopeCtx.strokeStyle=isLocked?AC.text:(cssVar('--amber-text')||'#f6c453');
  scopeCtx.beginPath();
  const step=Math.floor(buf.length/w)||1;
  for(let x=0;x<w;x++){
    const v=buf[x*step]||0;
    const y=h/2 + v*h*0.9;
    if(x===0) scopeCtx.moveTo(x,y); else scopeCtx.lineTo(x,y);
  }
  scopeCtx.stroke();
}

function useMeasurement(){
  const freq = isLocked?lockedFreq:lastFreq;
  if(!freq){ return; }
  const dt=calcDT(freq,meterHeadSize);
  const m={ freq:Math.round(freq), dt, lbs:calcLbs(dt), tone:freqToNote(freq), headSize:meterHeadSize, confidence:lastConfidence, signalStrength:lastSignalStrength, at:new Date().toISOString() };
  formMeasurement=m;
  stopMic();
  renderFormMeasurement();
  showToast(t('meter.saved'));
  showScreen('screen-add');
}

/* ══════════════════════════════════════════
   ANDROID HARDWARE BACK BUTTON / EXIT CONFIRM
   ──────────────────────────────────────────
   Pattern: keep exactly one extra history entry ("buffer") ahead of the
   real page load at all times. Hardware back consumes it and fires
   popstate instead of leaving/closing the app. We then either:
     - close an open sheet/picker and re-arm the buffer, or
     - step back one in-app screen and re-arm the buffer, or
     - (at the home screen with nothing open) show an exit-confirm sheet
       WITHOUT re-arming — so a second physical back press has no more
       buffer to consume and the OS/browser closes the app for real.
   Tapping "취소"/outside re-arms the buffer so the app keeps working.
══════════════════════════════════════════ */
function rearmBackBuffer(){
  try{ history.pushState({stringAppBuffer:true}, '', location.href); }catch(e){}
}
function initBackHandler(){
  rearmBackBuffer();
  window.addEventListener('popstate', onHardwareBack);
}
function onHardwareBack(){
  // second back press while the exit dialog is already showing -> let it exit for real
  if(exitConfirmOpen){
    exitConfirmOpen=false;
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('sheet').classList.remove('show');
    return; // no rearm: browser/OS takes over and closes if nothing else is behind us
  }
  // close whichever overlay is open, then keep the buffer alive
  if(document.getElementById('overlay').classList.contains('show')){
    document.getElementById('overlay').classList.remove('show');
    document.getElementById('sheet').classList.remove('show');
    rearmBackBuffer(); return;
  }
  if(document.getElementById('pick-overlay').classList.contains('show')){
    closePicker(); rearmBackBuffer(); return;
  }
  if(document.getElementById('date-overlay').classList.contains('show')){
    closeDatePicker(); rearmBackBuffer(); return;
  }
  const active=document.querySelector('.screen.active');
  const id = active?active.id:'screen-home';
  if(id==='screen-home'){
    showExitConfirm(); // intentionally no rearm here
    return;
  }
  performScreenBack(id);
  rearmBackBuffer();
}
function performScreenBack(id){
  if(id==='screen-add') cancelAddEdit();
  else if(id==='screen-detail') showScreen('screen-home');
  else if(id==='screen-feedback'){ if(typeof fbBackTarget==='number' && entries[fbBackTarget]) showDetail(fbBackTarget); else showScreen('screen-home'); }
  else if(id==='screen-settings') showScreen('screen-home');
  else if(id==='screen-meter') closeMeter();
  else showScreen('screen-home');
}
function showExitConfirm(){
  exitConfirmOpen=true;
  openSheet(`
    <div class="sheet-header"><span style="width:40px"></span><span class="sheet-title">${t('exit.title')}</span><span style="width:40px"></span></div>
    <div class="sheet-body">
      <div class="sheet-desc" style="text-align:center">${t('exit.desc')}</div>
      <div class="sheet-btns">
        <button class="sheet-btn-cancel" onclick="closeSheet()">${t('common.cancel')}</button>
        <button class="sheet-btn-confirm" onclick="confirmExitNow()">${t('exit.confirm')}</button>
      </div>
    </div>`);
}
function confirmExitNow(){
  exitConfirmOpen=false;
  document.getElementById('overlay').classList.remove('show');
  document.getElementById('sheet').classList.remove('show');
  if(history.length>1){ try{ history.back(); }catch(e){} }
  try{ window.close(); }catch(e){}
}

/* ══════════════════════════════════════════ calibration ══════════════════════════════════════════ */
function autoCalibrate(measuredDT, actualLbs){
  if(!measuredDT || !actualLbs || measuredDT <= 0 || actualLbs <= 0){
    showToast('DT와 lbs 값을 올바르게 입력해주세요', 'err');
    return false;
  }
  const newLbsPerDt = actualLbs / measuredDT;
  LBS_PER_DT = newLbsPerDt;
  persistCalibration();
  showToast(`✓ 보정 완료: LBS_PER_DT = ${newLbsPerDt.toFixed(3)}`, 'ok');
  console.log(`Calibration: LBS_PER_DT updated to ${newLbsPerDt.toFixed(3)}`);
  recomputeMeter();
  return true;
}

/* get string specs from database */
function getStringLinearDensity(brand, model, gauge){
  const db = STRING_LINEAR_DENSITY[brand];
  if(!db) return null;
  const md = db[model];
  if(!md) return null;
  const gaugeName = gauge ? gauge.replace('mm','') : '';
  return md[gaugeName] || null;
}

/* get racket specs from database */
function getRacketSpec(brand, model){
  const db = RACKET_SPECS[brand];
  if(!db) return null;
  return db[model] || null;
}
