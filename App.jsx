import { useState, useEffect } from "react";

const C = {
  bg: "#070B12", surface: "#0C1420", surface2: "#101A28", border: "#182436",
  green: "#00E87A", greenDim: "#00E87A18", greenMid: "#00E87A33",
  gold: "#F5A623", goldDim: "#F5A62318", red: "#FF4757", redDim: "#FF475718",
  blue: "#4A9EFF", text: "#E8F0FE", muted: "#4A6A8A", card: "#0E1B2A",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${C.bg};color:${C.text};font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;}
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-track{background:${C.bg};}
  ::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px;}
  .mono{font-family:'JetBrains Mono',monospace;}
  .condense{font-family:'Barlow Condensed',sans-serif;}
  .btn-green{background:${C.green};color:#000;border:none;border-radius:10px;padding:12px 24px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Barlow Condensed',sans-serif;font-size:17px;letter-spacing:1px;text-transform:uppercase;display:inline-flex;align-items:center;gap:8px;}
  .btn-green:hover{background:#00FF88;transform:translateY(-1px);box-shadow:0 8px 24px #00E87A33;}
  .btn-green:disabled{opacity:.4;cursor:not-allowed;transform:none;}
  .btn-ghost{background:transparent;color:${C.muted};border:1px solid ${C.border};border-radius:8px;padding:8px 14px;cursor:pointer;transition:all .2s;font-size:12px;}
  .btn-ghost:hover{border-color:${C.green}44;color:${C.green};}
  .btn-ghost.active{border-color:${C.green};color:${C.green};background:${C.greenDim};}
  .match-card{transition:all .2s;cursor:pointer;border:1px solid ${C.border};background:${C.card};border-radius:12px;padding:14px;}
  .match-card:hover{border-color:${C.green}44;transform:translateY(-1px);}
  .match-card.selected{border-color:${C.green};background:${C.greenDim};}
  .badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.5px;font-family:'JetBrains Mono',monospace;}
  .badge-green{background:${C.greenDim};color:${C.green};border:1px solid ${C.green}33;}
  .badge-gold{background:${C.goldDim};color:${C.gold};border:1px solid ${C.gold}33;}
  .badge-red{background:${C.redDim};color:${C.red};border:1px solid ${C.red}33;}
  .badge-blue{background:#4A9EFF18;color:${C.blue};border:1px solid ${C.blue}33;}
  .badge-purple{background:#A855F718;color:#A855F7;border:1px solid #A855F733;}
  .metric-box{background:${C.card};border:1px solid ${C.border};border-radius:12px;padding:16px;}
  .section-title{font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.muted};margin-bottom:12px;}
  .tab{padding:10px 16px;font-size:13px;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;color:${C.muted};white-space:nowrap;font-weight:500;}
  .tab:hover{color:${C.text};}
  .tab.active{border-bottom-color:${C.green};color:${C.green};}
  .stat-bar{height:6px;border-radius:3px;background:${C.border};overflow:hidden;}
  .stat-fill{height:100%;border-radius:3px;}
  .fade-in{animation:fadeIn .4s ease;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .pulse-dot{width:8px;height:8px;border-radius:50%;background:${C.green};animation:pd 2s infinite;display:inline-block;}
  @keyframes pd{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
  .ld{animation:ldot 1.4s infinite;}
  .ld:nth-child(2){animation-delay:.2s;}
  .ld:nth-child(3){animation-delay:.4s;}
  @keyframes ldot{0%,80%,100%{transform:scale(0);opacity:0}40%{transform:scale(1);opacity:1}}
  .modal-bg{position:fixed;inset:0;background:#000000CC;z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);animation:fadeIn .2s ease;}
  .modal{background:${C.surface};border:1px solid ${C.green}44;border-radius:20px;max-width:420px;width:100%;overflow:hidden;box-shadow:0 24px 80px #00E87A22;}
  .locked{filter:blur(5px);user-select:none;pointer-events:none;}
  .lock-wrap{position:relative;border-radius:12px;overflow:hidden;}
  .lock-over{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:linear-gradient(180deg,transparent 0%,${C.bg}BB 50%,${C.bg}EE 100%);z-index:5;border-radius:inherit;}
  .input-field{background:${C.surface2};border:1px solid ${C.border};border-radius:8px;padding:10px 14px;color:${C.text};font-size:14px;width:100%;outline:none;transition:border-color .2s;}
  .input-field:focus{border-color:${C.green}66;}
  .input-field::placeholder{color:${C.muted};}
  .free-tag{background:${C.surface2};border:1px solid ${C.border};border-radius:20px;padding:4px 12px;font-size:11px;color:${C.muted};font-family:'JetBrains Mono',monospace;}
  .pro-tag{background:linear-gradient(135deg,${C.green},#00CC66);border-radius:20px;padding:4px 12px;font-size:11px;color:#000;font-weight:700;font-family:'JetBrains Mono',monospace;}
`;

const MATCHES = [
  {id:1,home:"Flamengo",away:"Palmeiras",league:"Brasileirão Série A",time:"16:00",date:"Hoje",homeOdd:2.10,drawOdd:3.20,awayOdd:3.50},
  {id:2,home:"São Paulo",away:"Corinthians",league:"Brasileirão Série A",time:"18:30",date:"Hoje",homeOdd:2.40,drawOdd:3.10,awayOdd:2.90},
  {id:3,home:"Santos",away:"Botafogo",league:"Brasileirão Série A",time:"20:00",date:"Hoje",homeOdd:3.10,drawOdd:3.20,awayOdd:2.20},
  {id:4,home:"Atlético-MG",away:"Cruzeiro",league:"Brasileirão Série A",time:"11:00",date:"Amanhã",homeOdd:1.85,drawOdd:3.40,awayOdd:4.10},
  {id:5,home:"Grêmio",away:"Internacional",league:"Brasileirão Série A",time:"16:00",date:"Amanhã",homeOdd:2.30,drawOdd:3.10,awayOdd:2.80},
];

const LOGOS = {"Flamengo":"🔴⚫","Palmeiras":"🟢","São Paulo":"🔴","Corinthians":"⚫","Santos":"⚪","Botafogo":"⚫","Atlético-MG":"⚫","Cruzeiro":"🔵","Grêmio":"🔵","Internacional":"🔴"};

/* ─── MODAL ─── */
function UpgradeModal({onClose,trigger}) {
  const benefits = [
    ["🟨","Perfil do árbitro + histórico completo"],
    ["👤","Probabilidade de cartão por jogador"],
    ["🎯","Cartela ideal com edge calculado pela IA"],
    ["⚑","Análise detalhada de escanteios"],
    ["📊","Value bets e mercados alternativos"],
    ["💰","Gestão de banca + Kelly Criterion"],
    ["🔔","Alertas inteligentes pré-jogo"],
    ["♾️","Análises ilimitadas todos os dias"],
  ];
  const msgs = {
    cartela:"A IA já montou a cartela. Só falta desbloquear.",
    arbitro:"O perfil do árbitro muda tudo nos mercados de cartão.",
    cartoes:"Saiba quem está pendurado antes de apostar.",
    escanteios:"A análise de escanteios é onde está o maior edge.",
    limit:"Você usou suas 2 análises gratuitas de hoje.",
  };
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{background:`linear-gradient(135deg,#071A0F,#0A1520)`,padding:"28px 24px",textAlign:"center",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:44,marginBottom:10}}>🔒</div>
          <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:30,marginBottom:8}}>
            Recurso <span style={{color:C.green}}>PRO</span>
          </div>
          <p style={{color:C.muted,fontSize:13,lineHeight:1.6,maxWidth:300,margin:"0 auto"}}>
            {msgs[trigger]||"Desbloqueie a análise completa que os apostadores profissionais usam."}
          </p>
        </div>
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:20}}>
            {benefits.map(([icon,text],i)=>(
              <div key={i} style={{display:"flex",gap:7,alignItems:"flex-start",fontSize:12}}>
                <span style={{flexShrink:0,fontSize:14}}>{icon}</span>
                <span style={{color:C.muted,lineHeight:1.5}}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{background:`linear-gradient(135deg,#071A0F,${C.surface2})`,border:`1px solid ${C.green}44`,borderRadius:12,padding:16,textAlign:"center",marginBottom:14}}>
            <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:40,color:C.green}}>
              R$47<span style={{fontSize:18,fontWeight:400,color:C.muted}}>/mês</span>
            </div>
            <div style={{fontSize:11,color:C.muted,marginTop:2}}>Sem fidelidade · Cancele quando quiser</div>
          </div>
          <button className="btn-green" style={{width:"100%",justifyContent:"center",fontSize:16,padding:14}}>
            ⚡ Assinar SmartBet PRO
          </button>
          <button onClick={onClose} style={{width:"100%",background:"none",border:"none",color:C.muted,fontSize:12,cursor:"pointer",marginTop:10,padding:8}}>
            Continuar com plano gratuito
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── MATCH CARD ─── */
function MatchCard({match,selected,onClick}) {
  return (
    <div className={`match-card ${selected?"selected":""}`} onClick={onClick}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
        <span style={{fontSize:10,color:C.muted,fontFamily:"'JetBrains Mono'"}}>{match.league}</span>
        <span className="badge badge-blue">{match.date} {match.time}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",marginBottom:12}}>
        <div style={{flex:1}}>
          <div style={{fontSize:18,marginBottom:3}}>{LOGOS[match.home]||"⚽"}</div>
          <div style={{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:14}}>{match.home}</div>
        </div>
        <div style={{padding:"0 10px",color:C.muted,fontFamily:"'Barlow Condensed'",fontWeight:800,fontSize:12}}>VS</div>
        <div style={{flex:1,textAlign:"right"}}>
          <div style={{fontSize:18,marginBottom:3}}>{LOGOS[match.away]||"⚽"}</div>
          <div style={{fontFamily:"'Barlow Condensed'",fontWeight:700,fontSize:14}}>{match.away}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:5}}>
        {[{l:"1",v:match.homeOdd},{l:"X",v:match.drawOdd},{l:"2",v:match.awayOdd}].map(o=>(
          <div key={o.l} style={{flex:1,background:C.surface2,borderRadius:6,padding:"5px 0",textAlign:"center",border:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:2}}>{o.l}</div>
            <div className="mono" style={{fontSize:13,color:C.green}}>{o.v.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ANÁLISE PANEL ─── */
function AnalysisPanel({analysis,isPro,onUpgrade}) {
  const [tab,setTab] = useState("geral");

  const TABS = [
    {id:"geral",label:"Análise",free:true},
    {id:"arbitro",label:"Árbitro",free:false},
    {id:"cartoes",label:"Cartões",free:false},
    {id:"escanteios",label:"Escanteios",free:false},
    {id:"cartela",label:"Cartela Ideal",free:false},
  ];

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,padding:"0 20px",overflowX:"auto",background:C.surface,flexShrink:0}}>
        {TABS.map(t=>(
          <div key={t.id}
            className={`tab ${tab===t.id?"active":""}`}
            style={{opacity:!isPro&&!t.free?.5:1,position:"relative"}}
            onClick={()=>{ if(!isPro&&!t.free){onUpgrade(t.id);return;} setTab(t.id); }}
          >
            {t.label}
            {!isPro&&!t.free&&<span style={{fontSize:9,marginLeft:4}}>🔒</span>}
          </div>
        ))}
      </div>

      <div style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>

        {/* ── GERAL (free) ── */}
        {tab==="geral" && (
          <div className="fade-in" style={{display:"flex",flexDirection:"column",gap:14}}>

            {/* Probabilidades livres */}
            <div className="metric-box">
              <div className="section-title">📊 Probabilidades</div>
              <div style={{display:"flex",gap:10,marginBottom:14}}>
                {[
                  {label:"Casa",val:analysis.probabilidades?.home_win,color:C.green},
                  {label:"Empate",val:analysis.probabilidades?.draw,color:C.blue},
                  {label:"Fora",val:analysis.probabilidades?.away_win,color:C.gold},
                ].map(p=>(
                  <div key={p.label} style={{flex:1,background:C.surface2,borderRadius:10,padding:"12px 6px",textAlign:"center",border:`1px solid ${C.border}`}}>
                    <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:28,color:p.color}}>{p.val}%</div>
                    <div style={{fontSize:11,color:C.muted}}>{p.label}</div>
                  </div>
                ))}
              </div>
              {/* Mercados adicionais — bloqueados */}
              <div className="lock-wrap">
                <div className="locked">
                  {[{l:"Ambas Marcam",v:"61%"},{l:"Over 2.5 Gols",v:"67%"},{l:"Over 3.5 Gols",v:"38%"}].map((m,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:i<2?`1px solid ${C.border}`:"none",fontSize:13}}>
                      <span style={{color:C.muted}}>{m.l}</span>
                      <span className="mono" style={{color:C.green}}>{m.v}</span>
                    </div>
                  ))}
                </div>
                <div className="lock-over">
                  <span style={{fontSize:18}}>🔒</span>
                  <span style={{fontSize:12,color:C.muted}}>+8 mercados disponíveis no PRO</span>
                  <button className="btn-green" style={{fontSize:12,padding:"6px 16px"}} onClick={()=>onUpgrade("geral")}>Ver no PRO</button>
                </div>
              </div>
            </div>

            {/* Forma recente — livre */}
            <div className="metric-box">
              <div className="section-title">📈 Forma Recente</div>
              {["home","away"].map(side=>(
                <div key={side} style={{marginBottom:10}}>
                  <div style={{fontSize:12,color:C.muted,marginBottom:6}}>
                    {side==="home"?analysis.partida?.split(" x ")[0]:analysis.partida?.split(" x ")[1]}
                  </div>
                  <div style={{display:"flex",gap:5}}>
                    {analysis.forma?.[side]?.map((j,i)=>(
                      <div key={i} style={{width:30,height:30,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",background:j.res==="V"?C.green:j.res==="E"?C.blue:C.red,color:"#000",fontWeight:900,fontSize:13,fontFamily:"'Barlow Condensed'"}}>
                        {j.res}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats — parcial livre, resto bloqueado */}
            <div className="metric-box">
              <div className="section-title">📊 Estatísticas Comparativas</div>
              {[
                {label:"Posse de Bola",h:analysis.stats?.posse_home,a:analysis.stats?.posse_away,sfx:"%",color:C.green},
                {label:"Média de Gols",h:analysis.stats?.gols_home,a:analysis.stats?.gols_away,sfx:"",color:C.blue},
              ].map((s,i)=>(
                <div key={i} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}>
                    <span className="mono" style={{color:s.color}}>{s.h}{s.sfx}</span>
                    <span style={{color:C.muted,fontSize:11}}>{s.label}</span>
                    <span className="mono" style={{color:C.gold}}>{s.a}{s.sfx}</span>
                  </div>
                  <div style={{display:"flex",gap:4}}>
                    <div className="stat-bar" style={{flex:s.h}}><div className="stat-fill" style={{width:"100%",background:s.color}}/></div>
                    <div className="stat-bar" style={{flex:s.a}}><div className="stat-fill" style={{width:"100%",background:C.gold}}/></div>
                  </div>
                </div>
              ))}
              {/* Escanteios e cartões bloqueados */}
              <div className="lock-wrap" style={{marginTop:4}}>
                <div className="locked">
                  {[{label:"Escanteios/Jogo",h:"6.2",a:"4.9"},{label:"Cartões/Jogo",h:"2.2",a:"2.6"}].map((s,i)=>(
                    <div key={i} style={{marginBottom:12}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:5,fontSize:12}}>
                        <span className="mono" style={{color:C.green}}>{s.h}</span>
                        <span style={{color:C.muted,fontSize:11}}>{s.label}</span>
                        <span className="mono" style={{color:C.gold}}>{s.a}</span>
                      </div>
                      <div style={{height:6,borderRadius:3,background:C.border}}/>
                    </div>
                  ))}
                </div>
                <div className="lock-over">
                  <span style={{fontSize:11,color:C.muted}}>Escanteios e cartões — PRO</span>
                  <button className="btn-green" style={{fontSize:11,padding:"5px 14px"}} onClick={()=>onUpgrade("escanteios")}>Desbloquear</button>
                </div>
              </div>
            </div>

            {/* Análise geral — livre, cortada */}
            <div className="metric-box">
              <div className="section-title">💡 Contexto da Partida</div>
              <p style={{fontSize:13,lineHeight:1.7,color:C.text}}>{analysis.analise_geral}</p>
              <div className="lock-wrap" style={{marginTop:10}}>
                <div className="locked" style={{fontSize:13,lineHeight:1.7,color:C.muted,padding:"4px 0"}}>
                  Além disso, o perfil do árbitro escalado aponta para um jogo truncado com média acima de 4 cartões. Os mercados de escanteios apresentam edge positivo significativo nessa partida. A cartela ideal combina 3 apostas com edge combinado de +18%...
                </div>
                <div className="lock-over" style={{background:`linear-gradient(180deg,transparent,${C.bg}DD)`}}>
                  <button className="btn-ghost" style={{fontSize:12}} onClick={()=>onUpgrade("geral")}>Ler análise completa →</button>
                </div>
              </div>
            </div>

            {/* CARTELA TEASER — o grande gatilho */}
            <div style={{background:`linear-gradient(135deg,#071505,#0A1520)`,border:`1px solid ${C.green}33`,borderRadius:14,overflow:"hidden"}}>
              <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontFamily:"'Barlow Condensed'",fontWeight:800,fontSize:20}}>🎯 Cartela Ideal</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2}}>
                    A IA montou <strong style={{color:C.green}}>3 apostas</strong> com edge positivo para esta partida
                  </div>
                </div>
                <span className="badge badge-purple">PRO</span>
              </div>
              <div className="lock-wrap">
                <div className="locked" style={{padding:16}}>
                  {["████████████████  +26% edge","████████████ +15% edge","█████████████ +9% edge"].map((t,i)=>(
                    <div key={i} style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:10,padding:"12px 16px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,marginBottom:5,color:C.muted}}>{t}</div>
                        <div style={{display:"flex",gap:6}}>
                          <span className="badge badge-green">Edge</span>
                          <span className="badge badge-gold">Stake</span>
                        </div>
                      </div>
                      <div className="mono" style={{fontSize:22,color:C.green}}>##.##</div>
                    </div>
                  ))}
                  <div style={{textAlign:"center",padding:"6px 0"}}>
                    <span className="mono" style={{color:C.green}}>Odd combinada: ##.##x · Edge: +18%</span>
                  </div>
                </div>
                <div className="lock-over">
                  <div style={{textAlign:"center",padding:"0 20px"}}>
                    <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:22,marginBottom:6}}>
                      A cartela já está pronta
                    </div>
                    <div style={{fontSize:12,color:C.muted,marginBottom:18,lineHeight:1.6}}>
                      A IA identificou <span style={{color:C.green}}>3 mercados com edge positivo</span>.<br/>Assine o PRO para ver a cartela completa.
                    </div>
                    <button className="btn-green" onClick={()=>onUpgrade("cartela")} style={{fontSize:15,padding:"12px 28px"}}>
                      🔓 Assinar PRO — R$47/mês
                    </button>
                    <div style={{fontSize:11,color:C.muted,marginTop:10}}>Sem fidelidade · Cancele quando quiser</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* PRO-only tabs — só chegam aqui se isPro */}
        {tab!=="geral" && isPro && (
          <div className="fade-in" style={{textAlign:"center",padding:50}}>
            <div style={{fontSize:48,marginBottom:12}}>✅</div>
            <div style={{fontFamily:"'Barlow Condensed'",fontSize:22,color:C.green}}>Acesso PRO ativo</div>
            <div style={{color:C.muted,fontSize:13,marginTop:8}}>Esta aba exibiria o conteúdo completo do plano PRO.</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── APP ─── */
export default function SmartBet() {
  const [isPro] = useState(false);
  const [selected, setSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customMatch, setCustomMatch] = useState("");
  const [modal, setModal] = useState(null);
  const [usesLeft, setUsesLeft] = useState(2);
  const [filter, setFilter] = useState("Todos");

  const openUpgrade = (trigger) => setModal(trigger);

  const analyze = async (text) => {
    if (!isPro && usesLeft <= 0) { openUpgrade("limit"); return; }
    setLoading(true);
    setAnalysis(null);
    if (!isPro) setUsesLeft(u=>u-1);

    const prompt = `Analise a partida de futebol: ${text}.
Retorne APENAS JSON sem markdown:
{
  "partida":"Time A x Time B","liga":"Liga",
  "analise_geral":"3 linhas de contexto analítico da partida.",
  "forma":{
    "home":[{"j":"Jogo 1","res":"V"},{"j":"Jogo 2","res":"E"},{"j":"Jogo 3","res":"V"},{"j":"Jogo 4","res":"D"},{"j":"Jogo 5","res":"V"}],
    "away":[{"j":"Jogo 1","res":"D"},{"j":"Jogo 2","res":"V"},{"j":"Jogo 3","res":"E"},{"j":"Jogo 4","res":"V"},{"j":"Jogo 5","res":"D"}]
  },
  "stats":{"posse_home":55,"posse_away":45,"gols_home":1.9,"gols_away":1.3},
  "probabilidades":{"home_win":48,"draw":28,"away_win":24,"ambas_marcam":61,"over25":65,"over35":36}
}
Use dados reais dos times. Forma com jogos reais.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:prompt}]})});
      const data = await res.json();
      const txt = data.content.map(i=>i.text||"").join("");
      setAnalysis(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    } catch(e){ setAnalysis({error:true}); }
    setLoading(false);
  };

  useEffect(()=>{
    if(selected){
      setCustomMatch(`${selected.home} x ${selected.away}`);
      analyze(`${selected.home} x ${selected.away} — ${selected.league}`);
    }
  },[selected]);

  const filtered = filter==="Todos"?MATCHES:MATCHES.filter(m=>m.date===filter);

  return (
    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:C.bg}}>
      <style>{css}</style>
      {modal && <UpgradeModal onClose={()=>setModal(null)} trigger={modal}/>}

      {/* TOP BAR */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 20px",borderBottom:`1px solid ${C.border}`,background:C.surface,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,background:C.green,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:18,color:"#000"}}>S</div>
          <div>
            <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:20,letterSpacing:.5}}>SmartBet</div>
            <div style={{fontSize:10,color:C.green,fontFamily:"'JetBrains Mono'",letterSpacing:1}}>INTELIGÊNCIA ESPORTIVA</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {!isPro&&<span className="free-tag">GRATUITO · {usesLeft}/2 hoje</span>}
          {isPro&&<span className="pro-tag">PRO ✓</span>}
          {!isPro&&(
            <button className="btn-green" style={{fontSize:13,padding:"7px 16px"}} onClick={()=>openUpgrade("header")}>
              ⚡ Assinar PRO
            </button>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* SIDEBAR */}
        <div style={{width:268,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",background:C.surface,flexShrink:0}}>
          {!isPro&&(
            <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
              <div style={{background:C.greenDim,border:`1px solid ${C.green}33`,borderRadius:8,padding:"8px 12px",display:"flex",alignItems:"center",gap:8,fontSize:12}}>
                <span className="pulse-dot"/>
                <span>
                  <strong style={{color:usesLeft>0?C.green:C.red}}>{usesLeft}</strong>
                  <span style={{color:C.muted}}> análise{usesLeft!==1?"s":""} grátis hoje</span>
                </span>
              </div>
              {usesLeft===0&&(
                <button className="btn-green" style={{width:"100%",marginTop:8,fontSize:13,padding:9,justifyContent:"center"}} onClick={()=>openUpgrade("limit")}>
                  🔓 Desbloquear ilimitado
                </button>
              )}
            </div>
          )}
          <div style={{padding:"10px 14px",borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:10,color:C.muted,fontFamily:"'JetBrains Mono'",marginBottom:8,letterSpacing:1}}>PARTIDAS</div>
            <div style={{display:"flex",gap:5}}>
              {["Todos","Hoje","Amanhã"].map(d=>(
                <button key={d} className={`btn-ghost ${filter===d?"active":""}`} style={{flex:1,padding:"4px 6px",fontSize:11}} onClick={()=>setFilter(d)}>{d}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:10,display:"flex",flexDirection:"column",gap:8}}>
            {filtered.map(m=>(
              <MatchCard key={m.id} match={m} selected={selected?.id===m.id} onClick={()=>setSelected(m)}/>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Search */}
          <div style={{padding:"12px 20px",borderBottom:`1px solid ${C.border}`,background:C.surface,display:"flex",gap:8,flexShrink:0}}>
            <input className="input-field" value={customMatch} onChange={e=>setCustomMatch(e.target.value)} placeholder="Ex: Flamengo x Santos — Brasileirão" onKeyDown={e=>e.key==="Enter"&&customMatch&&analyze(customMatch)}/>
            <button className="btn-green" style={{whiteSpace:"nowrap",padding:"10px 18px",fontSize:14}} onClick={()=>customMatch&&analyze(customMatch)} disabled={loading||(!isPro&&usesLeft<=0)}>
              {loading?"...":"Analisar"}
            </button>
          </div>

          {/* Content */}
          <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
            {!analysis&&!loading&&(
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:16,padding:40,textAlign:"center"}}>
                <div style={{fontSize:54}}>⚽</div>
                <div style={{fontFamily:"'Barlow Condensed'",fontSize:22,color:C.muted,lineHeight:1.4}}>
                  Selecione uma partida ou<br/>digite acima para analisar
                </div>
                {!isPro&&(
                  <div style={{background:C.surface2,border:`1px solid ${C.border}`,borderRadius:12,padding:18,maxWidth:300}}>
                    <div style={{fontSize:12,color:C.muted,lineHeight:1.7,marginBottom:12}}>
                      Grátis: probabilidades e forma recente.<br/>
                      <span style={{color:C.green}}>PRO: árbitro, cartões, escanteios e cartela com edge calculado.</span>
                    </div>
                    <button className="btn-green" style={{fontSize:13,padding:"8px 20px",width:"100%",justifyContent:"center"}} onClick={()=>openUpgrade("hero")}>
                      Ver o que o PRO oferece
                    </button>
                  </div>
                )}
              </div>
            )}

            {loading&&(
              <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                {[0,1,2].map(i=><div key={i} className="ld" style={{width:8,height:8,borderRadius:"50%",background:C.green}}/>)}
                <span style={{color:C.muted,fontSize:13,marginLeft:8}}>IA analisando partida...</span>
              </div>
            )}

            {analysis&&!analysis.error&&(
              <div className="fade-in" style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                <div style={{padding:"12px 20px",background:C.surface,borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
                  <div>
                    <div style={{fontFamily:"'Barlow Condensed'",fontWeight:900,fontSize:22}}>{analysis.partida}</div>
                    <div style={{fontSize:11,color:C.muted}}>{analysis.liga}</div>
                  </div>
                  {!isPro&&(
                    <button className="btn-green" style={{fontSize:13,padding:"8px 16px"}} onClick={()=>openUpgrade("cartela")}>
                      🎯 Ver Cartela PRO
                    </button>
                  )}
                </div>
                <div style={{flex:1,overflow:"hidden"}}>
                  <AnalysisPanel analysis={analysis} isPro={isPro} onUpgrade={openUpgrade}/>
                </div>
              </div>
            )}

            {analysis?.error&&(
              <div style={{padding:20,color:C.red,textAlign:"center"}}>Erro ao analisar. Tente novamente.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
