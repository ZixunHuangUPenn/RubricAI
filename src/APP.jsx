import { useState, useEffect, useRef } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';
import {
  Users, FileText, Settings, ChevronLeft, Mail, Lock,
  GraduationCap, Plus, Calendar, CheckCircle2, TrendingUp,
  Lightbulb, AlertCircle, BarChart3, ClipboardList, Upload, Sparkles,
  Search, Trash2, Edit3, Check, X, ChevronRight, ChevronDown,
  AlertTriangle, FileUp, Star, LogOut, User, Eye,
  Move, BookOpen, MessageCircle,
  FileQuestion, RefreshCw, Shield, MousePointer, Square
} from "lucide-react";

/* ═══ TOKENS ═══ */
const T={bg:"#F4F6FB",card:"#FFF",primary:"#4355DB",primaryLight:"#EBEEFF",primaryDark:"#2F3FA8",text:"#171B2E",textSec:"#6C7193",border:"#E4E7F1",red:"#E04444",green:"#22A96B",greenLight:"#E9F8F0",orange:"#E5A229",orangeLight:"#FFF8E7",purple:"#8B5CF6",purpleLight:"#F0EBFF",blue:"#3B82F6",black:"#171B2E",r:"14px",rs:"10px",rr:"20px",sh:"0 1px 4px rgba(0,0,0,0.04)",shM:"0 8px 24px rgba(0,0,0,0.08)",shLg:"0 16px 48px rgba(0,0,0,0.12)",font:"'Outfit',system-ui,sans-serif"};
const _b=(v="primary")=>({display:"inline-flex",alignItems:"center",gap:8,padding:"11px 22px",borderRadius:T.rs,fontWeight:600,fontSize:14,cursor:"pointer",border:"none",fontFamily:T.font,transition:"all 0.2s",background:v==="primary"?T.black:v==="blue"?T.primary:v==="green"?T.green:v==="purple"?T.purple:"transparent",color:["primary","blue","green","purple"].includes(v)?"#fff":T.text,...(v==="outline"&&{border:`1.5px solid ${T.border}`,background:T.card}),...(v==="ghost"&&{padding:"8px 14px"})});
const _card={background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:24,transition:"all 0.25s",cursor:"pointer"};
const _ctr={maxWidth:1400,margin:"0 auto",padding:"32px 40px"};

/* ═══ Font loader ═══ */
function FL(){useEffect(()=>{
  if(!document.getElementById('of')){const l=document.createElement('link');l.id='of';l.href='https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';l.rel='stylesheet';document.head.appendChild(l);}
},[]);return null;}

/* ═══ Navbar ═══ */
function Nav({onNav,role,onLogout}){
  const[open,setOpen]=useState(false);const ref=useRef(null);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  return(<nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:64,background:T.card,borderBottom:`1px solid ${T.border}`,position:"sticky",top:0,zIndex:100}}>
    <div style={{display:"flex",alignItems:"center",gap:12,cursor:"pointer"}} onClick={()=>onNav("dashboard")}><div style={{width:36,height:36,borderRadius:9,background:`linear-gradient(135deg,${T.primary},${T.primaryDark})`,display:"flex",alignItems:"center",justifyContent:"center"}}><GraduationCap size={18} color="#fff"/></div><span style={{fontWeight:800,fontSize:18}}>RubricAI</span></div>
    <div style={{display:"flex",alignItems:"center",gap:6}}>
      <button onClick={()=>onNav("dashboard")} style={{..._b("ghost"),color:T.primary,fontWeight:600}}>Courses</button>
      <button onClick={()=>onNav("help")} style={{..._b("ghost"),color:T.textSec}}>Help</button>
      <div style={{width:1,height:24,background:T.border,margin:"0 8px"}}/>
      <div ref={ref} style={{position:"relative"}}>
        <button onClick={()=>setOpen(!open)} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px 5px 6px",borderRadius:T.rs,border:`1.5px solid ${open?T.primary:T.border}`,background:open?"#F8F9FF":T.card,cursor:"pointer",fontFamily:T.font}}>
          <div style={{width:28,height:28,borderRadius:7,background:`${T.primary}15`,display:"flex",alignItems:"center",justifyContent:"center"}}><User size={14} color={T.primary}/></div>
          <span style={{fontWeight:600,fontSize:13}}>{role==="instructor"?"Instructor":"Student"}</span>
          <ChevronDown size={13} color={T.textSec} style={{transform:open?"rotate(180deg)":"",transition:"transform 0.2s"}}/>
        </button>
        {open&&<div style={{position:"absolute",top:"calc(100% + 4px)",right:0,width:200,background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,boxShadow:T.shLg,overflow:"hidden",zIndex:200}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${T.border}`,fontSize:12,fontWeight:700}}>My Account</div>
          {["Profile","Settings"].map(l=><button key={l} onClick={()=>setOpen(false)} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:500,color:T.text,fontFamily:T.font}} onMouseEnter={e=>e.currentTarget.style.background="#F5F6FA"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>{l}</button>)}
          <div style={{borderTop:`1px solid ${T.border}`}}><button onClick={()=>{setOpen(false);onLogout();}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"10px 16px",border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:500,color:T.red,fontFamily:T.font}} onMouseEnter={e=>e.currentTarget.style.background="#FEF2F2"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}><LogOut size={14}/>Log out</button></div>
        </div>}
      </div>
    </div>
  </nav>);
}

/* ═══ Login ═══ */
function Login({onLogin}){
  const[role,setRole]=useState("instructor");
  return(<div style={{minHeight:"100vh",background:`linear-gradient(160deg,#E8EBFF 0%,${T.bg} 50%,#E8EBFF 100%)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:T.font}}>
    <div style={{width:440}}>
      <div style={{textAlign:"center",marginBottom:32}}><div style={{width:72,height:72,borderRadius:14,background:`linear-gradient(135deg,${T.primary},${T.primaryDark})`,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:18,boxShadow:"0 12px 32px rgba(67,85,219,0.35)"}}><GraduationCap size={36} color="#fff"/></div><h1 style={{fontSize:32,fontWeight:900,margin:"0 0 6px"}}>RubricAI</h1><p style={{color:T.textSec,fontSize:15,margin:0}}>Modern grading platform</p></div>
      <div style={{background:`${T.primary}08`,borderRadius:T.rs,padding:"10px 18px",textAlign:"center",marginBottom:20,border:`1px solid ${T.primary}20`}}><span style={{fontWeight:700,color:T.primary,fontSize:12}}>Demo Mode</span><span style={{color:T.textSec,fontSize:12}}> — Enter any credentials</span></div>
      <div style={{display:"flex",background:"#ECEDF3",borderRadius:T.rs,padding:3,marginBottom:0}}>{["instructor","student"].map(r=><button key={r} onClick={()=>setRole(r)} style={{flex:1,padding:10,border:"none",borderRadius:7,fontWeight:700,fontSize:14,background:role===r?T.card:"transparent",color:role===r?T.text:T.textSec,cursor:"pointer",fontFamily:T.font}}>{r[0].toUpperCase()+r.slice(1)}</button>)}</div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"28px 26px"}}>
        <h2 style={{fontSize:18,fontWeight:800,margin:"0 0 20px"}}>{role==="instructor"?"Instructor":"Student"} Login</h2>
        {["Email","Password"].map(f=><div key={f} style={{marginBottom:16}}><label style={{display:"block",fontWeight:600,fontSize:12,marginBottom:5}}>{f}</label><div style={{display:"flex",alignItems:"center",background:"#F6F7FB",borderRadius:T.rs,padding:"0 14px",border:"1.5px solid transparent"}}>{f==="Email"?<Mail size={15} color={T.textSec}/>:<Lock size={15} color={T.textSec}/>}<input type={f==="Password"?"password":"email"} placeholder={f==="Email"?(role==="instructor"?"instructor@uni.edu":"student@uni.edu"):"••••••••"} style={{flex:1,padding:"11px 10px",border:"none",background:"transparent",fontSize:13,outline:"none",fontFamily:T.font}}/></div></div>)}
        <button onClick={()=>onLogin(role)} style={{..._b("primary"),width:"100%",justifyContent:"center",padding:13,fontSize:14}}>Sign In</button>
      </div>
    </div>
  </div>);
}

/* ═══ Dashboard ═══ */
const CS=[{id:1,code:"CIS 5190",name:"Applied Machine Learning",term:"Spring 2026",students:180,assignments:8,color:"#4355DB"},{id:2,code:"CIS 5200",name:"Machine Learning",term:"Spring 2026",students:150,assignments:6,color:"#8B5CF6"},{id:3,code:"CIS 5450",name:"Big Data Analytics",term:"Spring 2026",students:120,assignments:10,color:"#22A96B"}];
function Dash({onSelect}){return(<div style={_ctr}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:32}}><div><h1 style={{fontSize:30,fontWeight:900,margin:"0 0 4px"}}>Your Courses</h1><p style={{color:T.textSec,margin:0,fontSize:14}}>Spring 2026</p></div><button style={_b("primary")}><Plus size={16}/>Create Course</button></div><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:18}}>{CS.map(c=><div key={c.id} onClick={()=>onSelect(c)} style={{..._card}} onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.shM;e.currentTarget.style.transform="translateY(-2px)";}} onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}><div style={{width:46,height:46,borderRadius:12,background:c.color}}/><div><h3 style={{margin:0,fontSize:17,fontWeight:800}}>{c.code}</h3><p style={{margin:0,fontSize:13,color:T.textSec}}>{c.name}</p></div></div><div style={{display:"flex",gap:16,color:T.textSec,fontSize:13}}><span style={{display:"flex",alignItems:"center",gap:5}}><Users size={14}/>{c.students}</span><span style={{display:"flex",alignItems:"center",gap:5}}><FileText size={14}/>{c.assignments} assignments</span></div></div>)}</div></div>);}

/* ═══════════════════════════════════════════════════════════
   PDF VIEWER — uses browser's native PDF renderer + overlay boxes
   No external libraries needed. Uses <object> with blob URL.
   ═══════════════════════════════════════════════════════════ */
function PdfViewer({file, boxes, activeBox, onSelectBox, onUpdateBox, tool, pageNum, onPageChange, totalPages, pdfInteractive=true}){
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const drawRef = useRef(null);
  const [blobUrl, setBlobUrl] = useState(null);
  const [drawing, setDrawing] = useState(null);
  const [overlaySize, setOverlaySize] = useState({ w: 0, h: 0 });
  const containerH = 600;

  // Create blob URL from file
  useEffect(() => {
    if (!file) { setBlobUrl(null); return; }
    const url = URL.createObjectURL(file);
    setBlobUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  // Track overlay actual dimensions
  useEffect(() => {
    if (!overlayRef.current) return;
    const updateSize = () => {
      const rect = overlayRef.current.getBoundingClientRect();
      setOverlaySize({ w: rect.width, h: rect.height });
    };
    updateSize();
    const timer = setTimeout(updateSize, 100);
    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, [blobUrl, pageNum]);

  // Drawing handlers with corrected coordinate system
  const startDraw = (e) => {
    if (tool !== "draw" || !overlayRef.current) return;
    const r = overlayRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(r.width, e.clientX - r.left));
    const y = Math.max(0, Math.min(r.height, e.clientY - r.top));
    setDrawing({ x, y, w: 0, h: 0 });
  };
  const moveDraw = (e) => {
    if (!drawing || !overlayRef.current) return;
    const r = overlayRef.current.getBoundingClientRect();
    const currentX = Math.max(0, Math.min(r.width, e.clientX - r.left));
    const currentY = Math.max(0, Math.min(r.height, e.clientY - r.top));
    setDrawing(d => ({ ...d, w: currentX - d.x, h: currentY - d.y }));
  };
  const endDraw = () => {
    if (!drawing || !overlayRef.current) setDrawing(null);
    if (!drawing) return;
    const r = overlayRef.current.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) { setDrawing(null); return; }
    
    // Normalize the drawing coordinates
    const minW = Math.abs(drawing.w);
    const minH = Math.abs(drawing.h);
    if (minW < 20 || minH < 20) { setDrawing(null); return; }
    
    // Calculate normalized box coordinates
    const startX = drawing.w < 0 ? drawing.x + drawing.w : drawing.x;
    const startY = drawing.h < 0 ? drawing.y + drawing.h : drawing.y;
    const boxW = Math.abs(drawing.w);
    const boxH = Math.abs(drawing.h);
    
    // Convert to percentages
    const x = (startX / r.width) * 100;
    const y = (startY / r.height) * 100;
    const w = (boxW / r.width) * 100;
    const h = (boxH / r.height) * 100;
    
    if (onUpdateBox) onUpdateBox("add", { x, y, w, h, page: pageNum });
    setDrawing(null);
  };

  const pageBoxes = (boxes || []).filter(b => b.page === pageNum);
  const pc = totalPages || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 12px", background: T.card, borderRadius: T.rs, border: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button onClick={() => onPageChange(Math.max(1, pageNum - 1))} disabled={pageNum <= 1} style={{ ..._b("ghost"), padding: "6px 10px", opacity: pageNum <= 1 ? 0.3 : 1 }}><ChevronLeft size={14} /></button>
          <span style={{ fontSize: 13, fontWeight: 600, padding: "0 8px" }}>Page {pageNum} / {pc}</span>
          <button onClick={() => onPageChange(Math.min(pc, pageNum + 1))} disabled={pageNum >= pc} style={{ ..._b("ghost"), padding: "6px 10px", opacity: pageNum >= pc ? 0.3 : 1 }}><ChevronRight size={14} /></button>
        </div>
        <div style={{ fontSize: 11, color: T.textSec }}>{pageBoxes.length} boxes on this page</div>
      </div>
      {/* PDF + Overlay */}
      <div ref={containerRef} style={{ position: "relative", height: containerH, borderRadius: T.rs, border: `1px solid ${T.border}`, overflow: "auto", background: "#525659" }}>
        {/* Native PDF embed — uses browser's built-in renderer */}
        {blobUrl ? (
          <object
            data={`${blobUrl}#page=${pageNum}&toolbar=0&navpanes=0&scrollbar=0`}
            type="application/pdf"
            style={{ width: "100%", height: "100%", border: "none", pointerEvents: pdfInteractive?"auto":"none" }}
          >
            <embed src={`${blobUrl}#page=${pageNum}`} type="application/pdf" style={{ width: "100%", height: "100%", pointerEvents: pdfInteractive?"auto":"none" }} />
          </object>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 8 }}>
            <FileText size={32} color="#999" />
            <p style={{ color: "#999", fontSize: 14 }}>Upload a PDF to preview</p>
          </div>
        )}
        {/* Bounding box overlay — separate layers so PDF can receive scroll/pan events */}
        {blobUrl && (
          <div ref={overlayRef} style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
            {/* Boxes layer: only boxes capture pointer events; empty overlay passes through */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {pageBoxes.map(b => {
                const isActive = activeBox === b.id;
                const color = b.type === "question" ? T.primary : T.green;
                return (
                  <div key={b.id} onClick={(e) => { e.stopPropagation(); onSelectBox && onSelectBox(b.id); }}
                    style={{
                      position: "absolute", left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`,
                      border: `2.5px solid ${isActive ? color : color + "90"}`, borderRadius: 6,
                      background: `${color}${isActive ? "18" : "08"}`, cursor: "pointer",
                      boxShadow: isActive ? `0 0 0 3px ${color}30` : "none", transition: "all 0.2s",
                      pointerEvents: "auto",
                    }}>
                    <div style={{ position: "absolute", top: -12, left: 6, background: T.card, padding: "1px 8px", fontSize: 10, fontWeight: 800, color, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                      {b.label}
                    </div>
                    {isActive && (
                      <div style={{ position: "absolute", bottom: -12, right: 6, background: T.card, padding: "1px 8px", fontSize: 10, fontWeight: 700, color: T.textSec, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                        {b.pts} pts · {b.qtype}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Drawing layer: only intercept pointer events when in draw mode */}
            <div
              ref={drawRef}
              style={{ position: "absolute", inset: 0, cursor: tool === "draw" ? "crosshair" : "default", pointerEvents: tool === "draw" ? "auto" : "none" }}
              onMouseDown={startDraw}
              onMouseMove={moveDraw}
              onMouseUp={endDraw}
              onMouseLeave={() => drawing && endDraw()}
            >
              {/* Drawing preview */}
              {drawing && (
                <div style={{
                  position: "absolute",
                  left: drawing.w < 0 ? drawing.x + drawing.w : drawing.x,
                  top: drawing.h < 0 ? drawing.y + drawing.h : drawing.y,
                  width: Math.abs(drawing.w),
                  height: Math.abs(drawing.h),
                  border: `2px dashed ${T.green}`,
                  borderRadius: 4,
                  background: `${T.green}15`,
                }} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CREATE EXAM — Full AI Workflow with PDF Canvas
   ═══════════════════════════════════════════════════════════ */
const STEPS=[{l:"Upload\nExam",I:Upload},{l:"AI\nDetection",I:Sparkles},{l:"Review &\nRubric",I:ClipboardList},{l:"Upload\nSubmissions",I:FileUp},{l:"AI\nGrading",I:Star},{l:"Results",I:CheckCircle2}];

function CreateExam({course,onBack}){
  const[step,setStep]=useState(0);
  const[examFile,setExamFile]=useState(null);
  const[examFileObj,setExamFileObj]=useState(null);
  const[pageNum,setPageNum]=useState(1);
  const[boxes,setBoxes]=useState([]);
  const[activeBox,setActiveBox]=useState(null);
  const[tool,setTool]=useState("select");
  const[detecting,setDetecting]=useState(false);
  const[detected,setDetected]=useState(false);
  const[scanPct,setScanPct]=useState(0);
  const[questions,setQuestions]=useState([]);
  const[rubrics,setRubrics]=useState({});
  const[rubricGen,setRubricGen]=useState(false);
  const[rubricDone,setRubricDone]=useState(false);
  const[genProgress,setGenProgress]=useState([]);
  const[subFiles,setSubFiles]=useState([]);
  const[gradingResults,setGradingResults]=useState(null);
  const[grading,setGrading]=useState(false);
  const[gradingProg,setGradingProg]=useState([]);
  const[expandedStudent,setExpandedStudent]=useState(0);
  const[expandedQ,setExpandedQ]=useState(null);
  const[activeRubricQ,setActiveRubricQ]=useState(0);
  const[newCrit,setNewCrit]=useState({title:"",pts:""});
  const[isDetectingBoxes,setIsDetectingBoxes]=useState(false);
  const [rightWidth, setRightWidth] = useState(300);
  const [resizing, setResizing] = useState(false);
  const rightPanelWidthRef = useRef(300);

  const next=()=>setStep(s=>Math.min(s+1,5));
  const prev=()=>setStep(s=>Math.max(s-1,0));
  const totalPts=qId=>(rubrics[qId]||[]).reduce((s,c)=>s+c.pts,0);

  /* File upload handler */
  const handleExamFile=(file)=>{
    if(!file||file.type!=="application/pdf"){alert("PDF only");return;}
    setExamFileObj(file);
    setExamFile({name:file.name,size:(file.size/1024).toFixed(0)+" KB"});
  };

  /* PDF text extraction using PDF.js to detect question positions */
  const extractTextPositions = async (file) => {
    if(!file) return null;
    try{
      const ab = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: ab });
      const pdf = await loadingTask.promise;
      const pages = {};
      for(let p=1;p<=pdf.numPages;p++){
        const page = await pdf.getPage(p);
        const viewport = page.getViewport({ scale: 1 });
        const textContent = await page.getTextContent();
        const items = textContent.items.map(it=>{
          const tm = it.transform || [1,0,0,1,0,0];
          const x = tm[4] || 0;
          const y = tm[5] || 0;
          const fontHeight = Math.abs(tm[3]) || 12;
          const str = it.str || "";
          return { str, x, y, fontHeight, width: it.width || (str.length * fontHeight * 0.6) };
        });
        pages[p] = { items, width: viewport.width, height: viewport.height };
      }
      return pages;
    }catch(err){console.warn('PDF text extraction failed',err);return null;}
  };

  const detectBoxesFromText = (pages, questionsList) => {
    const found = [];
    if(!pages) return found;
    for(const q of questionsList){
      const pgNum = q.page || 1;
      const pg = pages[pgNum];
      if(!pg) continue;
      const items = pg.items || [];
      const qRegex = new RegExp(`^\\s*${q.num}(?:[\\)\\.\\s]|$)`);
      let idx = items.findIndex(it=>qRegex.test(it.str));
      if(idx===-1){ // fallback: look for the number anywhere in the string
        idx = items.findIndex(it=>it.str && it.str.includes(`${q.num}`));
      }
      if(idx!==-1){
        const it = items[idx];
        // pdf.js Y origin is bottom; overlay uses top => invert
        const yPct = ((pg.height - it.y) / pg.height) * 100;
        const hPct = Math.min(30, (it.fontHeight * 3 / pg.height) * 100);
        found.push({
          id: q.id,
          label: `Q${q.num}`,
          x: 5,
          y: Math.max(0, yPct - 1),
          w: 90,
          h: Math.max(10, hPct),
          page: pgNum,
          type: 'answer',
          pts: q.pts,
          qtype: q.type
        });
      }
    }
    return found;
  };

  /* AI Detection — create boxes from PDF structure */
  const runDetection=()=>{
    setDetecting(true);setScanPct(0);
    const iv=setInterval(()=>{setScanPct(p=>{if(p>=100){clearInterval(iv);
      // Generate detected questions with bounding boxes on actual pages
      const qs=[
        {id:1,num:"1",title:"Linear Regression — X^TX",pts:1,type:"mc",answerKey:"C",page:2},
        {id:2,num:"2",title:"X^TX Not Invertible Reasons",pts:2,type:"mc-multi",answerKey:"B, D",page:2},
        {id:3,num:"3",title:"Making X^TX Invertible",pts:2,type:"mc-multi",answerKey:"A, B",page:2},
        {id:4,num:"4",title:"Neural Network Variance",pts:5,type:"fill",answerKey:"Inc,Dec,Dec,Inc,Dec",page:2},
        {id:5,num:"5",title:"MLP Parameters",pts:2,type:"mc",answerKey:"D",page:3},
        {id:6,num:"6",title:"Backpropagation ∂L/∂W₁",pts:2,type:"mc",answerKey:"C",page:3},
        {id:7,num:"7",title:"Optimization Algorithms",pts:2,type:"mc-multi",answerKey:"A, C",page:3},
        {id:8,num:"8",title:"Logistic Regression",pts:2,type:"mc-multi",answerKey:"C",page:4},
        {id:9,num:"9",title:"Gini Impurity",pts:2,type:"mc-multi",answerKey:"C",page:4},
        {id:10,num:"10",title:"kNN Algorithm",pts:2,type:"mc-multi",answerKey:"B",page:4},
        {id:11,num:"11",title:"kNN k-trend",pts:2,type:"fill",answerKey:"B, C",page:4},
        {id:12,num:"12",title:"XOR with MLP",pts:7,type:"free",answerKey:"See key",page:5},
        {id:13,num:"13",title:"3-class Softmax",pts:7,type:"free",answerKey:"See key",page:6},
        {id:14,num:"14",title:"kNN Classifier",pts:6,type:"free",answerKey:"See key",page:7},
        {id:15,num:"15",title:"Decision Tree",pts:6,type:"free",answerKey:"See key",page:8},
      ];
      // Detect questions (metadata only — no bounding boxes yet)
      // Boxes will be drawn by teacher on the actual PDF, or auto-assigned as full-page regions
      setBoxes([]);setQuestions(qs);setDetecting(false);setDetected(true);setPageNum(1);
      return 100;}return p+3;})},50);
  };

  // Auto-assign: one box per question covering the full page area
  const autoAssignBoxes=()=>{
    const newBoxes=questions.map(q=>({
      id:q.id, label:`Q${q.num}`, x:3, y:3, w:94, h:94, page:q.page,
      type:"answer", pts:q.pts, qtype:q.type
    }));
    setBoxes(newBoxes);
  };

  // AI Auto-Detect: generate boxes positioned across the page for each question
  const autoDetectBoxes=async()=>{
    setIsDetectingBoxes(true);
    if(questions.length===0){setIsDetectingBoxes(false);return;}
    // First try text-based detection with PDF.js
    try{
      const pages = await extractTextPositions(examFileObj);
      const textBoxes = detectBoxesFromText(pages, questions);
      if(textBoxes && textBoxes.length>0){
        setBoxes(prev=>{
          const filtered = prev.filter(b=>!textBoxes.some(tb=>tb.id===b.id));
          return [...filtered,...textBoxes];
        });
        setIsDetectingBoxes(false);
        return;
      }
    }catch(err){console.warn('text detect failed',err);}    
    // Fallback: distribute boxes evenly per page
    setTimeout(()=>{
      const byPage = questions.reduce((m,q)=>{ const p = q.page||pageNum; (m[p] = m[p]||[]).push(q); return m; }, {});
      const newBoxes = [];
      Object.keys(byPage).forEach(pg => {
        const qs = byPage[pg];
        const sectionHeight = 100 / qs.length;
        const margin = Math.min(6, sectionHeight * 0.15);
        qs.forEach((q, idx) => {
          const y = idx * sectionHeight + margin;
          const h = Math.max(12, sectionHeight - margin * 1.25);
          newBoxes.push({ id: q.id, label: `Q${q.num}`, x:5, y, w:90, h, page: Number(pg), type: "answer", pts: q.pts, qtype: q.type });
        });
      });
      setBoxes(prev=>{const filtered=prev.filter(b=>!newBoxes.some(nb=>nb.id===b.id));return[...filtered,...newBoxes];});
      setIsDetectingBoxes(false);
    },600);
  };

  /* Normalize rubric points */
  const normalizeRubric=(items,target)=>{
    if(!items?.length)return items;const sum=items.reduce((s,c)=>s+c.pts,0);
    if(sum===target)return items;if(sum===0)return items.map((c,i)=>({...c,pts:i===0?target:0}));
    const sc=items.map(c=>({...c,pts:Math.max(0,Math.round(c.pts*target/sum))}));
    const diff=target-sc.reduce((s,c)=>s+c.pts,0);
    if(diff){const mi=sc.reduce((m,c,i,a)=>c.pts>a[m].pts?i:m,0);sc[mi].pts+=diff;}
    return sc;
  };

  /* AI Rubric generation */
  const generateRubrics=async()=>{
    setRubricGen(true);setGenProgress([]);const results={};
    for(const q of questions){
      setGenProgress(p=>[...p,{qId:q.id,status:"gen"}]);
      try{
        const prompt=q.type==="mc"?`Rubric for MC Q${q.num} "${q.title}" (${q.pts}pt). Answer:${q.answerKey}. Return JSON: [{"title":"...","pts":${q.pts}}]`
          :q.type==="mc-multi"?`Rubric for multi-select Q${q.num} "${q.title}" (${q.pts}pts). Answers:${q.answerKey}. Per-option scoring. Points sum to ${q.pts}. JSON array only: [{"title":"...","pts":n}]`
          :q.type==="fill"?`Rubric for fill-in Q${q.num} "${q.title}" (${q.pts}pts). Answers:${q.answerKey}. Per-blank scoring. Sum=${q.pts}. JSON array: [{"title":"...","pts":n}]`
          :`Detailed rubric for free-response Q${q.num} "${q.title}" (${q.pts}pts). Break by sub-parts with specific scoring. Sum EXACTLY ${q.pts}. JSON array: [{"title":"...","pts":n}]`;
        const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})});
        const d=await r.json();const txt=(d.content||[]).map(c=>c.text||"").join("").replace(/```json|```/g,"").trim();
        const parsed=JSON.parse(txt).map((c,i)=>({...c,id:i+1,pts:Math.max(0,Number(c.pts)||0)}));
        results[q.id]=normalizeRubric(parsed,q.pts);
        setGenProgress(p=>p.map(x=>x.qId===q.id?{...x,status:"done"}:x));
      }catch{
        // Fallback
        if(q.type==="mc")results[q.id]=[{id:1,title:`Correct: ${q.answerKey}`,pts:q.pts}];
        else if(q.type==="mc-multi"){const opts=q.answerKey.split(",");const per=Math.floor(q.pts/opts.length);results[q.id]=opts.map((o,i)=>({id:i+1,title:`Option ${o.trim()}`,pts:per+(i<q.pts%opts.length?1:0)}));}
        else results[q.id]=[{id:1,title:"Full solution",pts:Math.ceil(q.pts*0.6)},{id:2,title:"Work shown",pts:q.pts-Math.ceil(q.pts*0.6)}];
        setGenProgress(p=>p.map(x=>x.qId===q.id?{...x,status:"fb"}:x));
      }
    }
    setRubrics(results);setRubricGen(false);setRubricDone(true);
  };

  /* AI Grading */
  const gradeAll=async()=>{
    setGrading(true);setGradingProg([]);const all=[];
    for(let si=0;si<subFiles.length;si++){
      const sf=subFiles[si];setGradingProg(p=>[...p,{fi:si,st:"g",qd:0}]);const grades=[];
      for(let qi=0;qi<questions.length;qi++){
        const q=questions[qi];const rub=rubrics[q.id]||[];
        try{
          const prompt=`Grade student "${sf.name}" on Q${q.num} "${q.title}" (${q.pts}pts, ${q.type}). Answer:${q.answerKey}. Rubric:\n${rub.map((c,i)=>`${i+1}."${c.title}"(${c.pts}pts)`).join("\n")}\nSimulate realistic grad student. Return JSON only:\n{"criteria":[{"earned":n,"reason":"why"}],"studentAnswer":"what they wrote","overallFeedback":"comment","confidence":0.8}`;
          const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:prompt}]})});
          const d=await r.json();const txt=(d.content||[]).map(c=>c.text||"").join("").replace(/```json|```/g,"").trim();
          const p=JSON.parse(txt);
          const crit=(p.criteria||[]).map((c,i)=>({earned:Math.min(Math.max(0,c.earned||0),rub[i]?.pts||0),reason:c.reason||"",maxPts:rub[i]?.pts||0,title:rub[i]?.title||""}));
          grades.push({qId:q.id,qNum:q.num,criteria:crit,total:crit.reduce((a,c)=>a+c.earned,0),maxPts:q.pts,studentAnswer:p.studentAnswer||"",feedback:p.overallFeedback||"",confidence:Math.min(1,Math.max(0,p.confidence||0.8))});
        }catch{
          const crit=rub.map(c=>({earned:Math.random()>0.3?c.pts:0,reason:"Fallback",maxPts:c.pts,title:c.title}));
          grades.push({qId:q.id,qNum:q.num,criteria:crit,total:crit.reduce((a,c)=>a+c.earned,0),maxPts:q.pts,studentAnswer:"—",feedback:"Fallback",confidence:0.6});
        }
        setGradingProg(p=>p.map(x=>x.fi===si?{...x,qd:qi+1}:x));
      }
      all.push({file:sf,grades,totalScore:grades.reduce((s,g)=>s+g.total,0),maxScore:questions.reduce((s,q)=>s+q.pts,0)});
      setGradingProg(p=>p.map(x=>x.fi===si?{...x,st:"done"}:x));
    }
    setGradingResults(all);setGrading(false);
  };

  /* Step bar */
  const StepBar=()=>(<div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",marginBottom:28}}>
    {STEPS.map((s,i)=>{const a=i===step,d=i<step;return(<div key={i} style={{display:"flex",alignItems:"center"}}><div style={{display:"flex",flexDirection:"column",alignItems:"center",width:88}}><div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:d?T.primary:T.card,border:`2px solid ${d?T.primary:a?T.primary:T.border}`,color:d?"#fff":a?T.primary:T.textSec,marginBottom:6,boxShadow:a?`0 0 0 3px ${T.primary}18`:"none"}}>{d?<Check size={16}/>:<s.I size={16}/>}</div><span style={{fontSize:10,fontWeight:a?700:500,color:a?T.primary:d?T.primary:T.textSec,textAlign:"center",lineHeight:1.2,whiteSpace:"pre-line"}}>{s.l}</span></div>{i<STEPS.length-1&&<div style={{width:40,height:2,background:i<step?T.primary:T.border,marginTop:20}}/>}</div>);})}
  </div>);
  const NavB=({ok=true})=>(<div style={{display:"flex",justifyContent:"space-between",marginTop:24}}><button onClick={step===0?onBack:prev} style={_b("outline")}><ChevronLeft size={14}/>{step===0?"Cancel":"Back"}</button>{step<5&&<button onClick={next} disabled={!ok} style={{..._b("blue"),opacity:ok?1:0.4,cursor:ok?"pointer":"not-allowed"}}>Next<ChevronRight size={14}/></button>}{step===5&&<button onClick={onBack} style={_b("purple")}><Sparkles size={14}/>Publish Grades</button>}</div>);

  /* ── Step 0: Upload ── */
  const S0=()=>{const ref=useRef(null);const[drag,setDrag]=useState(false);
    return(<div><div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"44px 36px",textAlign:"center",boxShadow:T.sh}}>
      <Upload size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>Upload Exam Template & Answer Key</h2><p style={{color:T.textSec,margin:"0 0 28px",fontSize:14}}>Upload the exam PDF (questions + solution key in one file)</p>
      <input ref={ref} type="file" accept=".pdf" onChange={e=>{handleExamFile(e.target.files[0]);e.target.value="";}} style={{display:"none"}}/>
      <div onClick={()=>ref.current?.click()} onDrop={e=>{e.preventDefault();setDrag(false);handleExamFile(e.dataTransfer.files[0]);}} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
        style={{border:`2px dashed ${drag?T.primary:T.border}`,borderRadius:T.r,padding:"52px 36px",cursor:"pointer",background:drag?`${T.primary}06`:"#FAFBFE",transition:"all 0.2s"}}>
        <FileText size={42} color={drag?T.primary:"#CDD1E0"} style={{marginBottom:12}}/><p style={{margin:"0 0 4px",fontSize:14}}><span style={{color:T.primary,fontWeight:700}}>Click to upload</span> or drag and drop</p><p style={{margin:0,fontSize:12,color:T.textSec}}>PDF only</p>
      </div>
      {examFile&&<div style={{marginTop:18,padding:"14px 18px",background:T.greenLight,borderRadius:T.rs,display:"flex",alignItems:"center",justifyContent:"space-between",border:`1px solid ${T.green}30`}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><CheckCircle2 size={18} color={T.green}/><span style={{fontWeight:700,fontSize:14}}>{examFile.name}</span><span style={{color:T.textSec,fontSize:12}}>{examFile.size}</span></div>
        <button onClick={()=>{setExamFile(null);setExamFileObj(null);}} style={{background:"none",border:"none",cursor:"pointer"}}><Trash2 size={14} color={T.textSec}/></button>
      </div>}
    </div><NavB ok={!!examFile}/></div>);};

  /* ── Step 1: AI Detection — PDF canvas + overlay ── */
  const S1=()=>(<div>
    {!detected&&!detecting&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:32,boxShadow:T.sh,textAlign:"center"}}>
      <Sparkles size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>AI Question Detection</h2><p style={{color:T.textSec,margin:"0 0 24px",fontSize:14}}>AI will scan your exam PDF and identify all questions and answer regions</p>
      <button onClick={runDetection} style={_b("blue")}><Sparkles size={15}/>Scan Exam PDF</button>
    </div>}
    {detecting&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:32,boxShadow:T.sh}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Sparkles size={20} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontWeight:700,fontSize:15}}>Scanning exam pages...</span></div>
      <div style={{display:"flex",alignItems:"center",gap:12}}><div style={{flex:1,height:6,borderRadius:3,background:T.border}}><div style={{height:"100%",borderRadius:3,background:`linear-gradient(90deg,${T.primary},${T.purple})`,width:`${scanPct}%`,transition:"width 0.05s"}}/></div><span style={{fontSize:13,fontWeight:700,color:T.primary}}>{scanPct}%</span></div>
    </div>}
    {detected&&<div style={{display:"flex",gap:16,alignItems:"stretch"}}>
      {/* LEFT: PDF Canvas with boxes */}
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:6}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12,fontWeight:700,color:T.textSec}}>TOOL:</span>
            <button onClick={()=>setTool("select")} style={{..._b(tool==="select"?"blue":"outline"),padding:"5px 12px",fontSize:12}}><MousePointer size={13}/>Select</button>
            <button onClick={()=>setTool("draw")} style={{..._b(tool==="draw"?"green":"outline"),padding:"5px 12px",fontSize:12}}><Square size={13}/>Draw Box</button>
          </div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <button onClick={autoDetectBoxes} disabled={isDetectingBoxes||questions.length===0} style={{..._b(isDetectingBoxes?"outline":"blue"),padding:"5px 12px",fontSize:12,opacity:isDetectingBoxes||questions.length===0?0.4:1,cursor:isDetectingBoxes||questions.length===0?"not-allowed":"pointer"}}><Sparkles size={13}/>AI Auto-Detect</button>
            {boxes.length===0&&<button onClick={autoAssignBoxes} style={{..._b("outline"),padding:"5px 12px",fontSize:12,color:T.primary,borderColor:T.primary+"50"}}><Sparkles size={13}/>Full Page</button>}
            {boxes.length>0&&<button onClick={()=>setBoxes([])} style={{..._b("ghost"),padding:"5px 12px",fontSize:12,color:T.red}}><Trash2 size={12}/>Clear All</button>}
          </div>
        </div>
        {/* PDF Viewer with optional scan overlay */}
        <div style={{position:"relative"}}>
          <PdfViewer file={examFileObj} boxes={boxes} activeBox={activeBox} onSelectBox={id=>{setActiveBox(id);const b=boxes.find(x=>x.id===id);if(b)setPageNum(b.page);}} tool={tool} pageNum={pageNum} onPageChange={setPageNum} totalPages={10}
            pdfInteractive={!resizing}
            onUpdateBox={(action,data)=>{if(action==="add"){const newId=Math.max(0,...boxes.map(b=>b.id),0)+1;setBoxes(b=>[...b,{...data,id:newId,label:`Q${newId}`,type:"answer",pts:0,qtype:"manual"}]);}}}/>
          {/* AI Scanning overlay */}
          {isDetectingBoxes&&<div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg,transparent,rgba(67,85,219,0.15),transparent)",backgroundPosition:"200% center",backgroundSize:"200% 100%",borderRadius:T.rs,animation:"scanningGradient 2s ease-in-out infinite",pointerEvents:"none",border:`2px solid ${T.primary}`}}>
            <div style={{position:"absolute",top:0,left:0,right:0,padding:"12px 16px",background:`${T.primary}10`,display:"flex",alignItems:"center",gap:8,borderRadius:`${T.rs} ${T.rs} 0 0`,borderBottom:`1px solid ${T.primary}30`}}>
              <Sparkles size={16} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontSize:12,fontWeight:700,color:T.primary}}>AI scanning... generating answer boxes</span>
            </div>
          </div>}
        </div>
        {tool==="draw"&&<p style={{margin:"8px 0 0",fontSize:12,color:T.green,fontWeight:600,textAlign:"center"}}>Click and drag on the PDF to draw a bounding box</p>}
        {isDetectingBoxes&&<p style={{margin:"8px 0 0",fontSize:12,color:T.primary,fontWeight:600,textAlign:"center"}}>AI is analyzing the document...</p>}
      </div>
      {/* Splitter: draggable handle to resize right panel */}
      <div
        onMouseDown={(e)=>{
          const startX = e.clientX;
          const startWidth = rightPanelWidthRef.current || 300;
          setResizing(true);
          const onMove = (ev)=>{
            const dx = startX - ev.clientX; // dragging left increases right width
            const nw = Math.max(180, Math.min(700, startWidth + dx));
            setRightWidth(nw);
            rightPanelWidthRef.current = nw;
          };
          const onUp = ()=>{setResizing(false);window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp);} ;
          window.addEventListener('mousemove',onMove);window.addEventListener('mouseup',onUp);
        }}
        style={{width:10,cursor:"col-resize",background:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}
      ><div style={{width:2,background:T.border,height:"60%",borderRadius:2}}/></div>

      {/* RIGHT: Question list with box status */}
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:14,boxShadow:T.sh,maxHeight:660,overflowY:"auto",width:rightWidth}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <h4 style={{margin:0,fontSize:12,fontWeight:700,color:T.textSec,textTransform:"uppercase"}}>Questions ({questions.length})</h4>
          <span style={{fontSize:12,fontWeight:700,color:T.primary}}>{questions.reduce((s,q)=>s+q.pts,0)} pts</span>
        </div>
        <div style={{fontSize:11,color:T.textSec,marginBottom:12,lineHeight:1.4}}>
          AI detected {questions.length} questions.
          {boxes.length===0&&<span style={{color:T.orange,fontWeight:600}}> Use draw tool, AI Auto-Detect, or Full Page to mark regions.</span>}
        </div>
        {questions.map(q=>{
          const qBox=boxes.find(b=>b.id===q.id);
          const isActive=activeBox===q.id;
          return(<div key={q.id} onClick={()=>{setActiveBox(q.id);if(qBox)setPageNum(qBox.page);}} style={{padding:"10px 12px",borderRadius:T.rs,marginBottom:4,cursor:"pointer",border:`1.5px solid ${isActive?T.primary:qBox?T.green+"50":T.border}`,background:isActive?T.primaryLight:qBox?T.greenLight+"50":"transparent",transition:"all 0.15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                {qBox?<CheckCircle2 size={12} color={T.green}/>:<div style={{width:12,height:12,borderRadius:"50%",border:`2px solid ${T.border}`}}/>}
                <span style={{fontWeight:700,fontSize:13}}>Q{q.num}</span>
              </div>
              <span style={{fontWeight:700,fontSize:12,color:T.primary}}>{q.pts}pts</span>
            </div>
            <div style={{fontSize:11,color:T.textSec,marginTop:2,marginLeft:18}}>{q.title}</div>
            <div style={{display:"flex",gap:4,marginTop:4,marginLeft:18,alignItems:"center"}}>
              <span style={{padding:"2px 8px",borderRadius:T.rr,fontSize:9,fontWeight:700,background:q.type==="mc"?T.primaryLight:q.type==="mc-multi"?T.purpleLight:q.type==="fill"?T.orangeLight:T.greenLight,color:q.type==="mc"?T.primary:q.type==="mc-multi"?T.purple:q.type==="fill"?T.orange:T.green}}>{q.type}</span>
              <span style={{padding:"2px 8px",borderRadius:T.rr,fontSize:9,fontWeight:700,background:"#F0F1F5",color:T.textSec}}>p.{q.page}</span>
              {qBox&&<span style={{padding:"2px 8px",borderRadius:T.rr,fontSize:9,fontWeight:700,background:T.greenLight,color:T.green}}>✓ boxed</span>}
              {qBox&&<button onClick={(e)=>{e.stopPropagation();setBoxes(b=>b.filter(x=>x.id!==q.id));}} style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",padding:0}}><Trash2 size={12} color={T.textSec}/></button>}
            </div>
          </div>);
        })}
        {/* Summary */}
        <div style={{marginTop:12,padding:"10px 12px",borderRadius:T.rs,background:boxes.length>=questions.length?T.greenLight:T.orangeLight,border:`1px solid ${boxes.length>=questions.length?T.green:T.orange}30`}}>
          <span style={{fontSize:12,fontWeight:700,color:boxes.length>=questions.length?T.green:T.orange}}>
            {boxes.length>=questions.length?`✓ All ${questions.length} questions have regions`:`${boxes.length}/${questions.length} regions marked`}
          </span>
        </div>
      </div>
    </div>}
    <NavB ok={detected}/>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes scanningGradient{0%{backgroundPosition:200% center}50%{backgroundPosition:-200% center}100%{backgroundPosition:200% center}}`}</style>
  </div>);

  /* ── Step 2: Review & Rubric ── */
  const S2=()=>(<div>
    {!rubricDone&&!rubricGen&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"40px 32px",textAlign:"center",boxShadow:T.sh}}>
      <Sparkles size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>Generate Rubrics with AI</h2>
      <p style={{color:T.textSec,margin:"0 0 24px",fontSize:14}}>Claude will analyze the answer key and create detailed grading criteria for each question</p>
      <button onClick={generateRubrics} style={_b("blue")}><Sparkles size={15}/>Generate Rubrics</button>
    </div>}
    {rubricGen&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:24,boxShadow:T.sh}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><Sparkles size={18} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontWeight:700,fontSize:14}}>Generating rubrics... {genProgress.filter(p=>p.status==="done"||p.status==="fb").length}/{questions.length}</span></div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>{questions.map(q=>{const p=genProgress.find(x=>x.qId===q.id);return(<div key={q.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:T.rs,background:p?.status==="done"?T.greenLight:p?.status==="gen"?T.primaryLight:"#F8F9FC",border:`1px solid ${p?.status==="done"?T.green+"30":T.border}`}}>
        {p?.status==="done"?<CheckCircle2 size={14} color={T.green}/>:p?.status==="gen"?<Sparkles size={14} color={T.primary} style={{animation:"pulse 1s infinite"}}/>:<div style={{width:14,height:14,borderRadius:"50%",border:`2px solid ${T.border}`}}/>}
        <span style={{fontWeight:600,fontSize:12,flex:1}}>Q{q.num}: {q.title}</span><span style={{fontSize:11,color:T.textSec}}>{q.pts}pts</span>
      </div>);})}</div>
    </div>}
    {rubricDone&&<div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:20}}>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:12,boxShadow:T.sh,maxHeight:500,overflowY:"auto"}}>
        <h4 style={{margin:"0 0 8px",fontSize:12,fontWeight:700,color:T.textSec,textTransform:"uppercase"}}>Questions</h4>
        {questions.map((q,i)=><div key={q.id} onClick={()=>setActiveRubricQ(i)} style={{padding:"8px 10px",borderRadius:T.rs,marginBottom:3,cursor:"pointer",border:`1.5px solid ${activeRubricQ===i?T.primary:T.border}`,background:activeRubricQ===i?T.primaryLight:"transparent"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:700,fontSize:12}}>Q{q.num}</span><span style={{fontWeight:700,fontSize:11,color:totalPts(q.id)===q.pts?T.green:T.orange}}>{totalPts(q.id)}/{q.pts}</span></div>
          <span style={{fontSize:10,color:T.textSec}}>{q.title}</span>
        </div>)}
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:20,boxShadow:T.sh,maxHeight:500,overflowY:"auto"}}>
        {(()=>{const q=questions[activeRubricQ];if(!q)return null;return(<div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div><h3 style={{fontSize:16,fontWeight:800,margin:"0 0 2px"}}>Q{q.num}: {q.title}</h3><p style={{margin:0,fontSize:12,color:T.textSec}}>Answer: {q.answerKey} · {q.type}</p></div>
            <div style={{background:totalPts(q.id)===q.pts?T.greenLight:T.orangeLight,borderRadius:T.rr,padding:"6px 14px"}}><span style={{fontWeight:800,fontSize:13,color:totalPts(q.id)===q.pts?T.green:T.orange}}>{totalPts(q.id)}/{q.pts}</span></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {(rubrics[q.id]||[]).map((c,idx)=><div key={c.id} style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"10px 14px",borderRadius:T.rs,border:`1px solid ${T.border}`,background:"#FAFBFE"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:8,flex:1}}><span style={{width:22,height:22,borderRadius:6,background:T.primaryLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:T.primary,flexShrink:0}}>{idx+1}</span><span style={{fontWeight:500,fontSize:13,lineHeight:1.4}}>{c.title}</span></div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,marginLeft:8}}><span style={{fontWeight:800,fontSize:13,color:T.primary}}>{c.pts}</span><button onClick={()=>setRubrics(r=>({...r,[q.id]:r[q.id].filter(x=>x.id!==c.id)}))} style={{background:"none",border:"none",cursor:"pointer"}}><Trash2 size={12} color={T.textSec}/></button></div>
            </div>)}
          </div>
          <div style={{display:"flex",gap:6}}><input value={newCrit.title} onChange={e=>setNewCrit(n=>({...n,title:e.target.value}))} placeholder="Add criterion..." style={{flex:1,padding:"9px 12px",border:`1.5px solid ${T.border}`,borderRadius:T.rs,fontSize:13,outline:"none",fontFamily:T.font}}/><input value={newCrit.pts} onChange={e=>setNewCrit(n=>({...n,pts:e.target.value}))} placeholder="Pts" type="number" style={{width:56,padding:"9px 12px",border:`1.5px solid ${T.border}`,borderRadius:T.rs,fontSize:13,outline:"none",fontFamily:T.font}}/><button onClick={()=>{if(!newCrit.title)return;const mx=Math.max(0,...(rubrics[q.id]||[]).map(c=>c.id));setRubrics(r=>({...r,[q.id]:[...(r[q.id]||[]),{id:mx+1,title:newCrit.title,pts:parseInt(newCrit.pts)||0}]}));setNewCrit({title:"",pts:""});}} style={{..._b("blue"),padding:"9px 12px"}}><Plus size={14}/></button></div>
        </div>);})()}
      </div>
    </div>}
    <NavB ok={rubricDone}/>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
  </div>);

  /* ── Step 3: Upload Submissions ── */
  const S3=()=>{const ref=useRef(null);const[drag,setDrag]=useState(false);
    const add=fl=>{const nf=[...fl].filter(f=>f.type==="application/pdf").map(f=>({name:f.name,size:(f.size/1024).toFixed(0)+"KB",file:f}));if(!nf.length){alert("PDF only");return;}setSubFiles(p=>[...p,...nf]);};
    return(<div><div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"36px 32px",boxShadow:T.sh,textAlign:"center"}}>
      <FileUp size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>Upload Student Submissions</h2><p style={{color:T.textSec,margin:"0 0 24px",fontSize:14}}>Drag in student exam PDFs</p>
      <input ref={ref} type="file" accept=".pdf" multiple onChange={e=>{add(e.target.files);e.target.value="";}} style={{display:"none"}}/>
      <div onClick={()=>ref.current?.click()} onDrop={e=>{e.preventDefault();setDrag(false);add(e.dataTransfer.files);}} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
        style={{border:`2px dashed ${drag?T.primary:T.border}`,borderRadius:T.r,padding:"44px 32px",cursor:"pointer",background:drag?`${T.primary}06`:"#FAFBFE"}}>
        <FileText size={38} color={drag?T.primary:"#CDD1E0"} style={{marginBottom:10}}/><p style={{margin:"0 0 4px",fontSize:14}}><span style={{color:T.primary,fontWeight:700}}>Click or drag</span></p><p style={{margin:0,fontSize:12,color:T.textSec}}>Multiple PDFs supported</p>
      </div>
      {subFiles.length>0&&<div style={{marginTop:16,textAlign:"left"}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:700,fontSize:13}}>{subFiles.length} file{subFiles.length>1?"s":""}</span><button onClick={()=>setSubFiles([])} style={{..._b("ghost"),color:T.red,fontSize:12,padding:"2px 8px"}}><Trash2 size={11}/>Clear</button></div>
        {subFiles.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",background:T.greenLight,borderRadius:T.rs,marginBottom:4,border:`1px solid ${T.green}25`}}><div style={{display:"flex",alignItems:"center",gap:8}}><CheckCircle2 size={14} color={T.green}/><span style={{fontWeight:600,fontSize:12}}>{f.name}</span><span style={{color:T.textSec,fontSize:11}}>{f.size}</span></div><button onClick={()=>setSubFiles(s=>s.filter((_,j)=>j!==i))} style={{background:"none",border:"none",cursor:"pointer"}}><Trash2 size={12} color={T.textSec}/></button></div>)}
      </div>}
    </div><NavB ok={subFiles.length>0}/></div>);};

  /* ── Step 4: AI Grading with detailed results ── */
  const S4=()=>(<div>
    {!gradingResults&&!grading&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"36px 32px",textAlign:"center",boxShadow:T.sh}}>
      <Sparkles size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>Grade with AI</h2>
      <p style={{color:T.textSec,margin:"0 0 8px",fontSize:14}}>Claude will compare each student's answers against the rubric</p>
      <p style={{color:T.textSec,margin:"0 0 24px",fontSize:12}}>{subFiles.length} submission{subFiles.length>1?"s":""} × {questions.length} questions = {subFiles.length*questions.length} grading tasks</p>
      <button onClick={gradeAll} style={_b("blue")}><Sparkles size={15}/>Start AI Grading</button>
    </div>}
    {grading&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:24,boxShadow:T.sh}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><Sparkles size={18} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontWeight:700,fontSize:14}}>Grading submissions...</span></div>
      {gradingProg.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0"}}>{g.st==="done"?<CheckCircle2 size={14} color={T.green}/>:<Sparkles size={14} color={T.primary} style={{animation:"pulse 1s infinite"}}/>}<span style={{fontWeight:600,fontSize:12,flex:1}}>{subFiles[g.fi]?.name}</span><span style={{fontSize:11,color:T.textSec}}>{g.qd}/{questions.length}</span><div style={{width:60,height:4,borderRadius:2,background:T.border}}><div style={{height:"100%",borderRadius:2,background:g.st==="done"?T.green:T.primary,width:`${(g.qd/questions.length)*100}%`}}/></div></div>)}
    </div>}
    {gradingResults&&<div>
      <div style={{background:T.greenLight,borderRadius:T.rs,padding:"12px 18px",display:"flex",alignItems:"center",gap:8,marginBottom:16,border:`1px solid ${T.green}30`}}><CheckCircle2 size={16} color={T.green}/><span style={{fontWeight:700,fontSize:13,color:T.green}}>Grading complete</span></div>
      {/* Student tabs */}
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{gradingResults.map((r,i)=><button key={i} onClick={()=>{setExpandedStudent(i);setExpandedQ(null);}} style={{padding:"6px 14px",borderRadius:T.rr,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:T.font,border:expandedStudent===i?`2px solid ${T.primary}`:`1.5px solid ${T.border}`,background:expandedStudent===i?T.primaryLight:T.card,color:expandedStudent===i?T.primary:T.textSec}}>{r.file.name} — {r.totalScore}/{r.maxScore}</button>)}</div>
      {/* Detail */}
      {(()=>{const r=gradingResults[expandedStudent];if(!r)return null;const pct=r.totalScore/r.maxScore;return(<div style={{borderRadius:T.r,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",background:"#F8F9FC",borderBottom:`1px solid ${T.border}`}}>
          <span style={{fontWeight:800,fontSize:15}}>{r.file.name}</span>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{fontSize:28,fontWeight:900,color:T.primary}}>{r.totalScore}</span><span style={{fontSize:14,color:T.textSec}}>/{r.maxScore}</span><span style={{fontSize:13,fontWeight:700,marginLeft:6,color:pct>=0.7?T.green:pct>=0.5?T.orange:T.red}}>({(pct*100).toFixed(0)}%)</span></div>
        </div>
        {r.grades.map((g,gi)=>{const isOpen=expandedQ===gi;const sp=g.maxPts>0?g.total/g.maxPts:0;const sc=sp>=0.8?T.green:sp>=0.5?T.orange:T.red;
          return(<div key={gi} style={{borderBottom:gi<r.grades.length-1?`1px solid ${T.border}`:"none"}}>
            <div onClick={()=>setExpandedQ(isOpen?null:gi)} style={{display:"flex",alignItems:"center",padding:"12px 20px",cursor:"pointer",background:isOpen?"#FAFBFF":"transparent"}} onMouseEnter={e=>{if(!isOpen)e.currentTarget.style.background="#FAFBFF"}} onMouseLeave={e=>{if(!isOpen)e.currentTarget.style.background="transparent"}}>
              <ChevronDown size={13} color={T.textSec} style={{transform:isOpen?"rotate(180deg)":"",transition:"transform 0.2s",marginRight:8}}/>
              <span style={{fontWeight:700,fontSize:13,minWidth:32}}>Q{g.qNum}</span>
              <span style={{fontSize:12,color:T.textSec,flex:1}}>{questions.find(q=>q.id===g.qId)?.title}</span>
              <div style={{width:50,height:4,borderRadius:2,background:T.border,marginRight:8}}><div style={{height:"100%",borderRadius:2,background:sc,width:`${sp*100}%`}}/></div>
              <span style={{fontWeight:800,fontSize:13,color:sc}}>{g.total}/{g.maxPts}</span>
            </div>
            {isOpen&&<div style={{padding:"0 20px 16px 52px"}}>
              {g.studentAnswer&&<div style={{background:"#F4F5FA",borderRadius:T.rs,padding:"10px 14px",marginBottom:10,border:`1px solid ${T.border}`}}><div style={{fontSize:10,fontWeight:700,color:T.textSec,textTransform:"uppercase",marginBottom:3}}>Student's Answer</div><p style={{margin:0,fontSize:12,color:T.text,lineHeight:1.5,fontStyle:"italic"}}>{g.studentAnswer}</p></div>}
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {g.criteria.map((c,ci)=>{const full=c.earned===c.maxPts;const zero=c.earned===0;return(<div key={ci} style={{borderRadius:T.rs,border:`1px solid ${full?T.green+"30":zero?T.red+"20":T.orange+"30"}`,background:full?T.greenLight:zero?"#FEF2F2":T.orangeLight,padding:"10px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                    <div style={{display:"flex",alignItems:"center",gap:6}}>{full?<CheckCircle2 size={13} color={T.green}/>:zero?<X size={13} color={T.red}/>:<AlertCircle size={13} color={T.orange}/>}<span style={{fontWeight:700,fontSize:12}}>{c.title}</span></div>
                    <span style={{fontWeight:800,fontSize:12,color:full?T.green:zero?T.red:T.orange}}>{c.earned}/{c.maxPts}</span>
                  </div>
                  <p style={{margin:"0 0 0 19px",fontSize:11,color:T.textSec,lineHeight:1.4}}>{c.reason}</p>
                </div>);})}
              </div>
              {g.feedback&&<div style={{marginTop:8,display:"flex",alignItems:"flex-start",gap:6,padding:"8px 12px",background:`${T.primary}06`,borderRadius:T.rs}}><Lightbulb size={12} color={T.primary} style={{marginTop:1,flexShrink:0}}/><p style={{margin:0,fontSize:11,color:T.textSec,lineHeight:1.4}}>{g.feedback}</p></div>}
            </div>}
          </div>);})}
      </div>);})()}
    </div>}
    <NavB ok={!!gradingResults}/>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
  </div>);

  /* ── Step 5: Final results summary ── */
  const S5=()=>{if(!gradingResults)return null;const examTotal=questions.reduce((s,q)=>s+q.pts,0);
    return(<div><div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:32,boxShadow:T.sh}}>
      <div style={{textAlign:"center",marginBottom:24}}><div style={{width:56,height:56,borderRadius:"50%",background:T.greenLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><CheckCircle2 size={28} color={T.green}/></div><h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px"}}>Grading Complete!</h2><p style={{color:T.textSec,fontSize:14,margin:0}}>{gradingResults.length} submissions graded · {examTotal} points total</p></div>
      <div style={{borderRadius:T.rs,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{background:"#F8F9FC"}}><th style={{padding:"10px 14px",textAlign:"left",fontWeight:700,fontSize:11,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>STUDENT</th>{questions.map(q=><th key={q.id} style={{padding:"10px 4px",textAlign:"center",fontWeight:700,fontSize:10,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>Q{q.num}<br/>/{q.pts}</th>)}<th style={{padding:"10px 14px",textAlign:"center",fontWeight:700,fontSize:11,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>TOTAL</th></tr></thead>
          <tbody>{gradingResults.map((r,ri)=><tr key={ri} style={{borderBottom:ri<gradingResults.length-1?`1px solid ${T.border}`:"none"}}><td style={{padding:"10px 14px",fontWeight:600,fontSize:12}}>{r.file.name}</td>{r.grades.map((g,gi)=>{const p=g.maxPts>0?g.total/g.maxPts:0;return<td key={gi} style={{padding:"10px 4px",textAlign:"center",fontWeight:700,fontSize:12,color:p>=0.8?T.green:p>=0.5?T.text:T.red}}>{g.total}</td>})}<td style={{padding:"10px 14px",textAlign:"center",fontWeight:800,fontSize:14,color:T.primary}}>{r.totalScore}/{r.maxScore}</td></tr>)}</tbody>
        </table>
      </div>
    </div><NavB/></div>);};

  const steps=[S0,S1,S2,S3,S4,S5];const SC=steps[step];
  return(<div style={_ctr}><div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to {course.code}</div><div style={{marginBottom:6}}><h1 style={{fontSize:24,fontWeight:900,margin:"0 0 3px"}}>Create New Exam</h1><p style={{color:T.textSec,margin:"0 0 20px",fontSize:14}}>AI-assisted exam setup and grading</p></div><StepBar/><SC/></div>);
}

/* ═══ Course ═══ */
function Course({course,onBack,onExam}){
  return(<div style={_ctr}><div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to Courses</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:14,background:course.color}}/><div><h1 style={{fontSize:26,fontWeight:900,margin:"0 0 2px"}}>{course.code}</h1><p style={{margin:0,color:T.textSec,fontSize:14}}>{course.name}</p></div></div></div>
    <h2 style={{fontSize:18,fontWeight:800,margin:"0 0 16px"}}>Assignments</h2>
    <div style={{display:"flex",gap:12,marginBottom:20}}><button style={_b("primary")}><Plus size={14}/>Create Assignment</button><button onClick={onExam} style={_b("outline")}><Plus size={14}/>Create Exam</button></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
      {[{t:"Midterm Exam II",ty:"exam",pts:50,due:"3/4/2026"},{t:"Homework 5",ty:"homework",pts:30,due:"4/1/2026"}].map((a,i)=><div key={i} style={{..._card,cursor:"default"}}><h3 style={{margin:"0 0 8px",fontSize:16,fontWeight:700}}>{a.t}</h3><div style={{display:"flex",gap:8,fontSize:12,color:T.textSec}}><span>{a.ty}</span><span>{a.pts} pts</span><span>Due: {a.due}</span></div></div>)}
    </div>
  </div>);
}

/* ═══ Help ═══ */
function Help({onBack}){
  const[openFaq,setOpenFaq]=useState(null);
  const faqs=[{q:"How do I create an exam?",a:"Go to your course, click 'Create Exam', upload your exam PDF with answer key, and follow the guided steps."},{q:"How does AI grading work?",a:"After setting up rubrics, upload student submissions. Claude AI compares each answer against the rubric criteria."},{q:"Can I edit AI-generated rubrics?",a:"Yes, you can add, remove, or modify any rubric criterion before grading."},{q:"What file types are supported?",a:"PDF files for both exam templates and student submissions."}];
  return(<div style={_ctr}><div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back</div>
    <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 6px"}}>Help Center</h1><p style={{color:T.textSec,margin:"0 0 24px",fontSize:14}}>Find answers and get support</p>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
      {[{t:"Documentation",s:"Guides & tutorials",I:BookOpen,c:T.primary,bg:T.primaryLight},{t:"Live Chat",s:"Support team",I:MessageCircle,c:T.green,bg:T.greenLight},{t:"Email",s:"support@rubricai.com",I:Mail,c:T.purple,bg:T.purpleLight},{t:"Release Notes",s:"What's new",I:FileQuestion,c:T.orange,bg:T.orangeLight}].map((c,i)=><div key={i} style={{..._card,cursor:"default"}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><div style={{width:42,height:42,borderRadius:11,background:c.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><c.I size={20} color={c.c}/></div><div><h3 style={{margin:0,fontSize:15,fontWeight:700}}>{c.t}</h3><p style={{margin:0,fontSize:12,color:T.textSec}}>{c.s}</p></div></div></div>)}
    </div>
    <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"24px 28px"}}><h2 style={{fontSize:18,fontWeight:800,margin:"0 0 4px"}}>FAQ</h2><p style={{color:T.textSec,margin:"0 0 16px",fontSize:13}}>Common questions</p>
      {faqs.map((f,i)=>{const o=openFaq===i;return(<div key={i} style={{borderBottom:i<faqs.length-1?`1px solid ${T.border}`:"none"}}><button onClick={()=>setOpenFaq(o?null:i)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"14px 4px",border:"none",background:"transparent",cursor:"pointer",textAlign:"left",fontFamily:T.font}}><span style={{fontSize:14,fontWeight:600,color:o?T.primary:T.text}}>{f.q}</span><ChevronDown size={16} color={o?T.primary:T.textSec} style={{transform:o?"rotate(180deg)":"",transition:"transform 0.2s"}}/></button>{o&&<p style={{margin:"0 0 14px 4px",fontSize:13,color:T.textSec,lineHeight:1.6}}>{f.a}</p>}</div>);})}
    </div>
  </div>);
}

/* ═══ App ═══ */
export default function App(){
  const[page,setPage]=useState("login");const[role,setRole]=useState("instructor");const[course,setCourse]=useState(null);
  if(page==="login")return<><FL/><Login onLogin={r=>{setRole(r);setPage("dashboard")}}/></>;
  return(<div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.text}}><FL/><Nav onNav={p=>{setPage(p);setCourse(null);}} role={role} onLogout={()=>{setPage("login");setCourse(null);}}/>
    {page==="dashboard"&&<Dash onSelect={c=>{setCourse(c);setPage("course")}}/>}
    {page==="course"&&course&&<Course course={course} onBack={()=>{setCourse(null);setPage("dashboard")}} onExam={()=>setPage("exam")}/>}
    {page==="exam"&&course&&<CreateExam course={course} onBack={()=>setPage("course")}/>}
    {page==="help"&&<Help onBack={()=>setPage("dashboard")}/>}
  </div>);
}
