/* 스트링 작업일지 v3.0 - Editorial Edition
   순수 기록 기능 (음향 측정 제거) */

/* ════ 기본 데이터 ════ */
const DEF_RACKET_BRANDS=['Babolat','Diadem','Donnay','Dunlop','Head','Prince','Tecnifibre','Volkl','Wilson','Yonex'];
const DEF_RACKET_MODELS={
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
const DEF_STRING_BRANDS=['Babolat','Diadem','Dunlop','Gamma','Head','Kirschbaum','Luxilon','MSV','Pacific','Polyfibre','Prince','Signum Pro','Solinco','Tecnifibre','Volkl','Weiss Cannon','Wilson','Yonex'];
const DEF_STRING_MODELS={
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

/* ════ 저장소 ════ */
const K_ENTRIES='sm_entries_v3';
const K_SETTINGS='sm_settings_v3';
const K_CUSTOM='sm_custom_v3';

let entries=[];
let settings={lang:'ko',headSize:100};
let customData={racketBrands:[],racketModels:{},stringBrands:[],stringModels:{}};
let editingIdx=null;

/* ════ 초기화 ════ */
function loadAll(){
  try{entries=JSON.parse(localStorage.getItem(K_ENTRIES)||'[]');}catch(e){entries=[];}
  try{const s=JSON.parse(localStorage.getItem(K_SETTINGS)||'null'); if(s) settings={...settings,...s};}catch(e){}
  try{const c=JSON.parse(localStorage.getItem(K_CUSTOM)||'null'); if(c) customData={racketBrands:c.racketBrands||[],racketModels:c.racketModels||{},stringBrands:c.stringBrands||[],stringModels:c.stringModels||};}catch(e){}
}

function persist(){
  try{localStorage.setItem(K_ENTRIES,JSON.stringify(entries));}catch(e){showToast('⚠️ 저장소 가득 참');}
}

function persistSettings(){
  localStorage.setItem(K_SETTINGS,JSON.stringify(settings));
}

function persistCustom(){
  localStorage.setItem(K_CUSTOM,JSON.stringify(customData));
}

/* ════ UI 초기화 ════ */
function initUI(){
  loadAll();
  
  /* 라켓 브랜드 */
  const rb=document.getElementById('racket-brand');
  const brands=[...new Set([...DEF_RACKET_BRANDS,...customData.racketBrands])];
  brands.forEach(b=>{
    const opt=document.createElement('option');
    opt.value=b;
    opt.textContent=b;
    rb.appendChild(opt);
  });
  
  /* 스트링 브랜드 */
  const sb=document.getElementById('string-brand');
  const sbr=[...new Set([...DEF_STRING_BRANDS,...customData.stringBrands])];
  sbr.forEach(b=>{
    const opt=document.createElement('option');
    opt.value=b;
    opt.textContent=b;
    sb.appendChild(opt);
  });
  
  /* 설정 */
  document.getElementById('set-lang').value=settings.lang;
  document.getElementById('set-headsize').value=settings.headSize;
  document.getElementById('racket-headsize').value=settings.headSize;
  
  renderHome();
  setupEventListeners();
}

function setupEventListeners(){
  document.getElementById('set-lang').addEventListener('change',(e)=>{
    settings.lang=e.target.value;
    persistSettings();
  });
  
  document.getElementById('set-headsize').addEventListener('change',(e)=>{
    settings.headSize=parseInt(e.target.value);
    persistSettings();
  });
  
  document.getElementById('import-file').addEventListener('change',handleImport);
}

/* ════ 홈 렌더링 ════ */
function renderHome(){
  document.getElementById('stat-total').textContent=entries.length;
  
  const recent=entries.length>0 ? entries[entries.length-1].date : '—';
  document.getElementById('stat-recent').textContent=recent;
  
  const list=document.getElementById('home-list');
  if(entries.length===0){
    list.innerHTML=`<div class="empty-state"><div class="empty-title">아직 기록이 없습니다</div><div class="empty-desc">스트링 작업을 기록하고 성능을 분석해보세요.</div></div>`;
    return;
  }
  
  list.innerHTML=entries.map((e,i)=>`
    <a class="entry-item" onclick="viewEntry(${i}); return false;">
      <span class="entry-date">${e.date}</span>
      <span class="entry-racket">${e.racket.brand} ${e.racket.model}</span>
      <span class="entry-string">${e.string.brand} ${e.string.model}</span>
    </a>
  `).join('');
}

/* ════ 새 작업 ════ */
function openAddForm(){
  editingIdx=null;
  document.getElementById('add-title').textContent='새 작업.';
  document.getElementById('save-btn').textContent='저장';
  clearForm();
}

function clearForm(){
  document.getElementById('racket-brand').value='';
  document.getElementById('racket-model').innerHTML='<option value="">선택</option>';
  document.getElementById('string-brand').value='';
  document.getElementById('string-model').innerHTML='<option value="">선택</option>';
  document.getElementById('racket-headsize').value=settings.headSize;
  document.getElementById('string-gauge').value='';
  document.getElementById('string-tension').value='';
  document.getElementById('work-date').valueAsDate=new Date();
  document.getElementById('work-place').value='';
}

function updateRacketModels(){
  const brand=document.getElementById('racket-brand').value;
  const select=document.getElementById('racket-model');
  select.innerHTML='<option value="">선택</option>';
  
  const models=[...(DEF_RACKET_MODELS[brand]||[]),...((customData.racketModels||{})[brand]||[])];
  [...new Set(models)].forEach(m=>{
    const opt=document.createElement('option');
    opt.value=m;
    opt.textContent=m;
    select.appendChild(opt);
  });
}

function updateStringModels(){
  const brand=document.getElementById('string-brand').value;
  const select=document.getElementById('string-model');
  select.innerHTML='<option value="">선택</option>';
  
  const models=[...(DEF_STRING_MODELS[brand]||[]),...((customData.stringModels||{})[brand]||[])];
  [...new Set(models)].forEach(m=>{
    const opt=document.createElement('option');
    opt.value=m;
    opt.textContent=m;
    select.appendChild(opt);
  });
}

function saveEntry(){
  const racketBrand=document.getElementById('racket-brand').value;
  const racketModel=document.getElementById('racket-model').value;
  const racketHeadSize=parseInt(document.getElementById('racket-headsize').value);
  const stringBrand=document.getElementById('string-brand').value;
  const stringModel=document.getElementById('string-model').value;
  const stringGauge=document.getElementById('string-gauge').value;
  const stringTension=parseFloat(document.getElementById('string-tension').value);
  const workDate=document.getElementById('work-date').value;
  const workPlace=document.getElementById('work-place').value;
  
  if(!racketBrand||!racketModel||!stringBrand||!stringModel){
    showToast('모든 필수 항목을 입력해주세요');
    return;
  }
  
  const entry={
    date:workDate,
    racket:{brand:racketBrand,model:racketModel,headSize:racketHeadSize},
    string:{brand:stringBrand,model:stringModel,gauge:stringGauge,tension:stringTension},
    place:workPlace,
    feedback:[],
    createdAt:new Date().toISOString()
  };
  
  if(editingIdx!==null){
    entries[editingIdx]={...entries[editingIdx],...entry};
  }else{
    entries.push(entry);
  }
  
  persist();
  showToast('✓ 저장 완료');
  renderHome();
  setTimeout(()=>window.location.hash='#', 100);
}

/* ════ 상세 보기 ════ */
function viewEntry(idx){
  editingIdx=idx;
  const e=entries[idx];
  
  document.getElementById('detail-racket').textContent=`${e.racket.brand} ${e.racket.model}.`;
  document.getElementById('d-rb').textContent=e.racket.brand;
  document.getElementById('d-rm').textContent=e.racket.model;
  document.getElementById('d-rh').textContent=e.racket.headSize+' in²';
  document.getElementById('d-sb').textContent=e.string.brand;
  document.getElementById('d-sm').textContent=e.string.model;
  document.getElementById('d-sg').textContent=e.string.gauge||'—';
  document.getElementById('d-st').textContent=(e.string.tension?e.string.tension+' lbs':'—');
  document.getElementById('d-date').textContent=e.date;
  document.getElementById('d-place').textContent=e.place||'—';
  
  renderFeedback(idx);
  document.getElementById('fb-list').classList.add('active');
  document.getElementById('fb-add').classList.remove('active');
  document.querySelectorAll('.tab-btn').forEach((b,i)=>{
    b.classList.toggle('active',i===0);
  });
  
  showScreen('screen-detail');
}

function renderFeedback(idx){
  const fb=entries[idx].feedback||[];
  const list=document.getElementById('feedback-list');
  
  if(fb.length===0){
    list.innerHTML='<div style="color:var(--text-muted);">피드백 없음</div>';
    return;
  }
  
  list.innerHTML=fb.map((f,i)=>`
    <div style="padding:12px 0;border-bottom:1px solid var(--line);margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span>⭐ ${f.rating}/5</span>
        <span style="font-size:11px;color:var(--text-muted);">${f.at.split('T')[0]}</span>
      </div>
      <div style="font-size:12px;margin-bottom:6px;">
        파워 ${f.power?.toFixed(1)||0} · 컨트롤 ${f.control?.toFixed(1)||0} · 스핀 ${f.spin?.toFixed(1)||0} · 편안함 ${f.comfort?.toFixed(1)||0}
      </div>
      ${f.memo?`<div style="font-size:12px;color:var(--text-secondary);font-style:italic;">"${f.memo}"</div>`:''}
      <button class="btn btn-secondary" style="font-size:11px;padding:6px 10px;margin-top:6px;" onclick="deleteFeedback(${idx},${i})">삭제</button>
    </div>
  `).join('');
}

function saveFeedback(){
  const rating=parseInt(document.querySelector('.rating-btn.active')?.dataset.val||0);
  if(!rating){
    showToast('평점을 선택해주세요');
    return;
  }
  
  const fb={
    rating:rating,
    power:parseFloat(document.getElementById('fb-power').value),
    control:parseFloat(document.getElementById('fb-control').value),
    spin:parseFloat(document.getElementById('fb-spin').value),
    comfort:parseFloat(document.getElementById('fb-comfort').value),
    memo:document.getElementById('fb-memo').value,
    at:new Date().toISOString()
  };
  
  if(!entries[editingIdx].feedback) entries[editingIdx].feedback=[];
  entries[editingIdx].feedback.push(fb);
  
  persist();
  showToast('✓ 피드백 저장 완료');
  
  /* 초기화 */
  document.getElementById('fb-rating').querySelectorAll('.rating-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.axis-slider').forEach(s=>s.value=3);
  document.querySelectorAll('.axis-value').forEach(v=>v.textContent='3.0');
  document.getElementById('fb-memo').value='';
  
  renderFeedback(editingIdx);
}

function deleteFeedback(idx,fbIdx){
  if(!confirm('삭제하시겠습니까?')) return;
  entries[idx].feedback.splice(fbIdx,1);
  persist();
  renderFeedback(idx);
}

function editEntry(){
  const e=entries[editingIdx];
  document.getElementById('add-title').textContent='작업 수정.';
  document.getElementById('save-btn').textContent='수정 완료';
  
  document.getElementById('racket-brand').value=e.racket.brand;
  updateRacketModels();
  document.getElementById('racket-model').value=e.racket.model;
  document.getElementById('racket-headsize').value=e.racket.headSize;
  
  document.getElementById('string-brand').value=e.string.brand;
  updateStringModels();
  document.getElementById('string-model').value=e.string.model;
  document.getElementById('string-gauge').value=e.string.gauge||'';
  document.getElementById('string-tension').value=e.string.tension||'';
  
  document.getElementById('work-date').value=e.date;
  document.getElementById('work-place').value=e.place||'';
  
  showScreen('screen-add');
}

function deleteEntry(){
  if(!confirm('정말 삭제하시겠습니까?')) return;
  entries.splice(editingIdx,1);
  persist();
  renderHome();
  showScreen('screen-home');
}

/* ════ 데이터 내보내기/복원 ════ */
function exportData(){
  const data={entries,settings,customData,exportedAt:new Date().toISOString()};
  const json=JSON.stringify(data,null,2);
  const blob=new Blob([json],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=`stringworks-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importData(){
  document.getElementById('import-file').click();
}

function handleImport(e){
  const file=e.target.files[0];
  if(!file) return;
  
  const reader=new FileReader();
  reader.onload=(event)=>{
    try{
      const data=JSON.parse(event.target.result);
      if(data.entries && data.settings){
        entries=data.entries;
        settings=data.settings;
        customData=data.customData||customData;
        persist();
        persistSettings();
        persistCustom();
        showToast('✓ 데이터 복원 완료');
        location.reload();
      }else{
        showToast('⚠️ 유효하지 않은 파일');
      }
    }catch(err){
      showToast('⚠️ 파일 읽기 실패');
    }
  };
  reader.readAsText(file);
  e.target.value='';
}

/* ════ 초기화 ════ */
window.addEventListener('DOMContentLoaded',initUI);
