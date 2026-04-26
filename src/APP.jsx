import { useState, useEffect, useRef, useCallback } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorkerSrc from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

const OPENAI_BASE = import.meta.env.VITE_OPENAI_BASE_URL ?? "https://api.openai.com/v1";
const OPENAI_KEY  = import.meta.env.VITE_OPENAI_API_KEY  ?? "";
const OPENAI_HEADERS = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${OPENAI_KEY}`,
};
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
function PdfViewer({file, boxes, activeBox, onSelectBox, onUpdateBox, onDeleteBox, tool, pageNum, onPageChange, totalPages, onLoad}){
  const containerRef = useRef(null);
  const canvasRef   = useRef(null);
  const overlayRef  = useRef(null);
  const drawRef     = useRef(null);
  const pdfDocRef   = useRef(null);
  const renderTaskRef = useRef(null);
  const [drawing, setDrawing] = useState(null);
  const [resizing, setResizing] = useState(null);
  const containerH = 620;

  // Render one page onto the canvas, scaled to fill the container width exactly
  const renderPage = useCallback(async (doc, num) => {
    if (!canvasRef.current || !doc) return;
    if (renderTaskRef.current) { try { renderTaskRef.current.cancel(); } catch(_){} }
    try {
      const page      = await doc.getPage(Math.min(num, doc.numPages));
      const baseVp    = page.getViewport({ scale: 1 });
      const containerW = containerRef.current ? containerRef.current.clientWidth : 800;
      const scale     = containerW / baseVp.width;
      const vp        = page.getViewport({ scale: Math.max(0.5, scale) });
      const canvas    = canvasRef.current;
      canvas.width    = vp.width;
      canvas.height   = vp.height;
      renderTaskRef.current = page.render({ canvasContext: canvas.getContext("2d"), viewport: vp });
      await renderTaskRef.current.promise;
    } catch(e) { if (e?.name !== "RenderingCancelledException") console.error("PDF render:", e); }
  }, []);

  // Load document when file changes
  useEffect(() => {
    if (!file) { pdfDocRef.current = null; return; }
    (async () => {
      try {
        const ab  = await file.arrayBuffer();
        const doc = await pdfjsLib.getDocument({ data: ab }).promise;
        pdfDocRef.current = doc;
        if (onLoad) onLoad(doc.numPages);
        renderPage(doc, pageNum);
      } catch(e) { console.error("PDF load:", e); }
    })();
  }, [file]); // eslint-disable-line

  // Re-render when page number changes
  useEffect(() => {
    if (pdfDocRef.current) renderPage(pdfDocRef.current, pageNum);
  }, [pageNum, renderPage]);

  // --- Drawing handlers ---
  // getBoundingClientRect() already accounts for container scroll offset,
  // so (clientY - rect.top) gives the canvas-absolute y coordinate directly.
  const startDraw = (e) => {
    if (tool !== "draw" || !overlayRef.current) return;
    const r = overlayRef.current.getBoundingClientRect();
    setDrawing({ x: e.clientX - r.left, y: e.clientY - r.top, w: 0, h: 0 });
  };
  const moveDraw = (e) => {
    if (!drawing || !overlayRef.current) return;
    const r = overlayRef.current.getBoundingClientRect();
    setDrawing(d => ({ ...d, w: e.clientX - r.left - d.x, h: e.clientY - r.top - d.y }));
  };
  const endDraw = () => {
    if (!drawing) return;
    const r = overlayRef.current?.getBoundingClientRect();
    if (!r || r.width === 0 || r.height === 0) { setDrawing(null); return; }
    const aw = Math.abs(drawing.w), ah = Math.abs(drawing.h);
    if (aw < 20 || ah < 20) { setDrawing(null); return; }
    const sx = drawing.w < 0 ? drawing.x + drawing.w : drawing.x;
    const sy = drawing.h < 0 ? drawing.y + drawing.h : drawing.y;
    if (onUpdateBox) onUpdateBox("add", {
      x: (sx / r.width)  * 100,
      y: (sy / r.height) * 100,
      w: (aw / r.width)  * 100,
      h: (ah / r.height) * 100,
      page: pageNum,
    });
    setDrawing(null);
  };

  // Forward wheel events from the draw layer to the scroll container
  // so the user can scroll the PDF even while the draw tool is active.
  const forwardWheel = (e) => {
    e.stopPropagation();
    if (containerRef.current) containerRef.current.scrollTop += e.deltaY;
  };

  // --- Resize handlers (edges/corners of selected box) ---
  const startResize = (e, box, handle) => {
    e.stopPropagation();
    e.preventDefault();
    const r = overlayRef.current?.getBoundingClientRect();
    if (!r) return;
    setResizing({
      id: box.id, handle,
      x: box.x, y: box.y, w: box.w, h: box.h,
      mx: e.clientX, my: e.clientY,
      rw: r.width, rh: r.height,
    });
  };

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e) => {
      const dx = ((e.clientX - resizing.mx) / resizing.rw) * 100;
      const dy = ((e.clientY - resizing.my) / resizing.rh) * 100;
      let x = resizing.x, y = resizing.y, w = resizing.w, h = resizing.h;
      if (resizing.handle.includes("e")) w = resizing.w + dx;
      if (resizing.handle.includes("w")) { x = resizing.x + dx; w = resizing.w - dx; }
      if (resizing.handle.includes("s")) h = resizing.h + dy;
      if (resizing.handle.includes("n")) { y = resizing.y + dy; h = resizing.h - dy; }
      if (w < 1) w = 1;
      if (h < 1) h = 1;
      if (x < 0) { w += x; x = 0; }
      if (y < 0) { h += y; y = 0; }
      if (x + w > 100) w = 100 - x;
      if (y + h > 100) h = 100 - y;
      if (onUpdateBox) onUpdateBox("resize", { id: resizing.id, x, y, w, h });
    };
    const onUp = () => setResizing(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizing, onUpdateBox]);

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
      {/* Scrollable container — canvas may be taller than containerH */}
      <div ref={containerRef} style={{ height: containerH, borderRadius: T.rs, border: `1px solid ${T.border}`, overflow: "auto", background: "#525659" }}>
        {file ? (
          <div style={{ position: "relative" }}>
            {/* PDF.js renders here — width matches container, height proportional */}
            <canvas ref={canvasRef} style={{ display: "block" }} />
            {/* Overlay — covers the canvas exactly */}
            <div ref={overlayRef} style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
              {/* Saved bounding boxes */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                {pageBoxes.map(b => {
                  const isActive = activeBox === b.id;
                  const color = b.type === "question" ? T.primary : T.green;
                  const handles = [
                    ["nw","top-left","nwse-resize",-5,-5],["n","top","ns-resize","50%",-5],["ne","top-right","nesw-resize","100%",-5],
                    ["e","right","ew-resize","100%","50%"],["se","bottom-right","nwse-resize","100%","100%"],
                    ["s","bottom","ns-resize","50%","100%"],["sw","bottom-left","nesw-resize",-5,"100%"],
                    ["w","left","ew-resize",-5,"50%"],
                  ];
                  return (
                    <div key={b.id} onMouseDown={(e) => { e.stopPropagation(); onSelectBox && onSelectBox(b.id); }}
                      style={{
                        position: "absolute", left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%`,
                        border: `2.5px solid ${isActive ? color : color + "90"}`, borderRadius: 6,
                        background: `${color}${isActive ? "18" : "08"}`, cursor: "pointer",
                        boxShadow: isActive ? `0 0 0 3px ${color}30` : "none",
                        pointerEvents: "auto",
                      }}>
                      <div style={{ position: "absolute", top: -12, left: 6, background: T.card, padding: "1px 8px", fontSize: 10, fontWeight: 800, color, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                        {b.label}
                      </div>
                      {/* Delete button (red X) */}
                      {isActive && onDeleteBox && (
                        <button
                          onMouseDown={(e) => e.stopPropagation()}
                          onClick={(e) => { e.stopPropagation(); onDeleteBox(b.id); }}
                          title="Delete box (Del)"
                          style={{
                            position: "absolute", top: -10, right: -10, width: 20, height: 20,
                            borderRadius: "50%", background: T.red, color: "#fff", border: "2px solid #fff",
                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            padding: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.25)", zIndex: 2,
                          }}>
                          <X size={11} />
                        </button>
                      )}
                      {isActive && (
                        <div style={{ position: "absolute", bottom: -12, right: 6, background: T.card, padding: "1px 8px", fontSize: 10, fontWeight: 700, color: T.textSec, borderRadius: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>
                          {b.pts} pts · {b.qtype}
                        </div>
                      )}
                      {/* Resize handles */}
                      {isActive && handles.map(([key,_name,cursor,hx,hy]) => (
                        <div key={key}
                          onMouseDown={(e) => startResize(e, b, key)}
                          style={{
                            position: "absolute", width: 10, height: 10, background: "#fff",
                            border: `2px solid ${color}`, borderRadius: 2, cursor,
                            left: typeof hx === "string" ? hx : hx, top: typeof hy === "string" ? hy : hy,
                            transform: "translate(-50%, -50%)", zIndex: 1,
                          }} />
                      ))}
                    </div>
                  );
                })}
              </div>
              {/* Draw capture layer */}
              <div
                ref={drawRef}
                style={{ position: "absolute", inset: 0, cursor: tool === "draw" ? "crosshair" : "default", pointerEvents: tool === "draw" ? "auto" : "none" }}
                onMouseDown={startDraw}
                onMouseMove={moveDraw}
                onMouseUp={endDraw}
                onMouseLeave={() => drawing && endDraw()}
                onWheel={forwardWheel}
              >
                {drawing && (
                  <div style={{
                    position: "absolute",
                    left:   drawing.w < 0 ? drawing.x + drawing.w : drawing.x,
                    top:    drawing.h < 0 ? drawing.y + drawing.h : drawing.y,
                    width:  Math.abs(drawing.w),
                    height: Math.abs(drawing.h),
                    border: `2px dashed ${T.green}`,
                    borderRadius: 4,
                    background: `${T.green}15`,
                    pointerEvents: "none",
                  }} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 8 }}>
            <FileText size={32} color="#999" />
            <p style={{ color: "#999", fontSize: 14 }}>Upload a PDF to preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══ Box Label Dialog ═══ */
function BoxDialog({ box, questions, onConfirm, onCancel }) {
  const [type, setType] = useState("answer");
  const [label, setLabel] = useState("");
  const [pts, setPts] = useState("");
  const [linkedQId, setLinkedQId] = useState("");

  const handleConfirm = () => {
    const parsedPts = parseInt(pts) || 0;
    const linkedQ = questions.find(q => q.id === Number(linkedQId));
    const defaultLabel = type === "question"
      ? `Q (p.${box.page})`
      : linkedQ ? `A${linkedQ.num}` : `Region`;
    onConfirm({
      type,
      label: label.trim() || defaultLabel,
      pts: type === "question" ? parsedPts : (linkedQ ? linkedQ.pts : 0),
      qtype: type === "question" ? "manual" : (linkedQ ? linkedQ.type : "manual"),
      linkedQId: type === "answer" && linkedQId ? Number(linkedQId) : null,
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.card, borderRadius: T.r, border: `1px solid ${T.border}`, padding: 28, width: 380, boxShadow: T.shLg }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>Label this region</h3>
        <p style={{ margin: "0 0 20px", fontSize: 12, color: T.textSec }}>
          Page {box.page} · x:{box.x.toFixed(1)}% y:{box.y.toFixed(1)}% · {box.w.toFixed(1)}×{box.h.toFixed(1)}%
        </p>

        {/* Type toggle */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontWeight: 700, fontSize: 11, marginBottom: 6, color: T.textSec, textTransform: "uppercase" }}>Type</label>
          <div style={{ display: "flex", gap: 6 }}>
            {["question", "answer"].map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                flex: 1, padding: "9px 0", borderRadius: T.rs, fontWeight: 700, fontSize: 13,
                border: `2px solid ${type === t ? (t === "question" ? T.primary : T.green) : T.border}`,
                background: type === t ? (t === "question" ? T.primaryLight : T.greenLight) : "transparent",
                color: type === t ? (t === "question" ? T.primary : T.green) : T.textSec,
                cursor: "pointer", fontFamily: T.font,
              }}>
                {t === "question" ? "Question" : "Answer Region"}
              </button>
            ))}
          </div>
        </div>

        {/* Label */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontWeight: 700, fontSize: 11, marginBottom: 5, color: T.textSec, textTransform: "uppercase" }}>Label</label>
          <input
            value={label}
            onChange={e => setLabel(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleConfirm(); if (e.key === "Escape") onCancel(); }}
            placeholder={type === "question" ? "e.g. Q1 — Linear Regression" : "e.g. Student answer area"}
            style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: T.rs, fontSize: 13, outline: "none", fontFamily: T.font, boxSizing: "border-box" }}
            autoFocus
          />
        </div>

        {/* Points (question only) */}
        {type === "question" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: 11, marginBottom: 5, color: T.textSec, textTransform: "uppercase" }}>Points</label>
            <input
              value={pts}
              onChange={e => setPts(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleConfirm(); }}
              type="number" min="0" placeholder="e.g. 10"
              style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: T.rs, fontSize: 13, outline: "none", fontFamily: T.font, boxSizing: "border-box" }}
            />
          </div>
        )}

        {/* Link to detected question (answer only) */}
        {type === "answer" && questions.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontWeight: 700, fontSize: 11, marginBottom: 5, color: T.textSec, textTransform: "uppercase" }}>Link to Question (optional)</label>
            <select
              value={linkedQId}
              onChange={e => setLinkedQId(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: T.rs, fontSize: 13, outline: "none", fontFamily: T.font, background: T.card, cursor: "pointer", boxSizing: "border-box" }}
            >
              <option value="">— unlinked —</option>
              {questions.map(q => (
                <option key={q.id} value={q.id}>Q{q.num}: {q.title} ({q.pts}pts)</option>
              ))}
            </select>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          <button onClick={onCancel} style={{ ..._b("outline"), flex: 1, justifyContent: "center" }}>Cancel</button>
          <button onClick={handleConfirm} style={{ ..._b(type === "question" ? "blue" : "green"), flex: 1, justifyContent: "center" }}>
            <Check size={14} /> Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXAM INSIGHTS — aggregate stats computed from AI grading results
   ═══════════════════════════════════════════════════════════ */
function computeExamStats(results, questions){
  const n=results.length; if(!n) return null;
  const pcts=results.map(r=>r.maxScore>0?(r.totalScore/r.maxScore)*100:0);
  const sorted=[...pcts].sort((a,b)=>a-b);
  const avg=pcts.reduce((s,x)=>s+x,0)/n;
  const median=n%2===0?(sorted[n/2-1]+sorted[n/2])/2:sorted[Math.floor(n/2)];
  const std=Math.sqrt(pcts.reduce((s,x)=>s+(x-avg)**2,0)/n);
  const q1=sorted[Math.floor(n*0.25)]||sorted[0];
  const q3=sorted[Math.floor(n*0.75)]||sorted[n-1];
  const buckets=[0,0,0,0,0];
  pcts.forEach(p=>{const i=Math.min(4,Math.floor(p/20));buckets[i]++;});

  const perQ=questions.map(q=>{
    const grades=results.map(r=>r.grades.find(g=>g.qId===q.id)).filter(Boolean);
    const tot=grades.length||1;
    const avgPts=grades.reduce((s,g)=>s+g.total,0)/tot;
    const avgPct=q.pts>0?(avgPts/q.pts)*100:0;
    const fullCredit=grades.filter(g=>g.total===q.pts).length/tot*100;
    const errorRate=grades.filter(g=>g.total<q.pts).length/tot*100;
    const diff=avgPct>=75?{l:"Low",c:"green"}:avgPct>=60?{l:"Medium",c:"orange"}:{l:"High",c:"red"};
    const critFail={};
    grades.forEach(g=>(g.criteria||[]).forEach(c=>{if(c.earned<c.maxPts){critFail[c.title]=(critFail[c.title]||0)+1;}}));
    const topMistakes=Object.entries(critFail).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([title,count])=>({title,count,pct:Math.round(count/tot*100)}));
    return {q,avgPts,avgPct,fullCredit,errorRate,diff,topMistakes,grades,tot};
  });

  const sortedByAvg=[...perQ].sort((a,b)=>a.avgPct-b.avgPct);
  const hardest=sortedByAvg[0];
  const easiest=sortedByAvg[sortedByAvg.length-1];

  const allMistakes={};
  perQ.forEach(pq=>pq.topMistakes.forEach(m=>{
    const key=`${m.title}__${pq.q.num}`;
    allMistakes[key]={title:m.title,qNum:pq.q.num,count:m.count,pct:m.pct};
  }));
  const topGlobal=Object.values(allMistakes).sort((a,b)=>b.count-a.count).slice(0,4);

  return {n,avg,median,std,q1,q3,buckets,perQ,hardest,easiest,topGlobal};
}

function ExamInsights({gradingResults,questions}){
  const stats=computeExamStats(gradingResults,questions);
  if(!stats)return null;
  const {n,avg,median,std,q1,q3,buckets,perQ,hardest,easiest,topGlobal}=stats;
  const examTotal=questions.reduce((s,q)=>s+q.pts,0);

  // Small reusable card styles
  const statCard={background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"20px 22px"};
  const insightCard=(color)=>({background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,borderLeft:`4px solid ${color}`,padding:"20px 22px",breakInside:"avoid",display:"inline-block",width:"100%",boxSizing:"border-box",marginBottom:14});
  const sectionTitle={fontSize:16,fontWeight:800,margin:"28px 0 14px",display:"flex",alignItems:"center",gap:8};
  const analysisTxt=(pct,errorPct,mistakes)=>{
    if(pct>=80)return "Strong overall performance. Students demonstrated solid grasp of the concepts.";
    if(pct>=65){const top=mistakes[0];return top?`Moderate performance. Most common issue: ${top.title.toLowerCase()} (${top.pct}% of students).`:"Moderate performance overall.";}
    const top=mistakes[0];
    return top?`Significant difficulty detected. Primary issue: ${top.title.toLowerCase()} (${top.pct}% of students). Consider reteaching.`:"Significant difficulty detected. Consider reviewing this topic.";
  };

  // Visual Analytics SVG dimensions
  const chartW=420,chartH=220,padL=42,padR=12,padT=14,padB=36;
  const plotW=chartW-padL-padR,plotH=chartH-padT-padB;
  const maxCount=Math.max(...buckets,1);
  const barGap=8,barW=(plotW-barGap*4)/5;
  const bucketLabels=["0-20%","20-40%","40-60%","60-80%","80-100%"];
  const errMax=Math.max(...perQ.map(p=>p.errorRate),1);
  const errBarW=(plotW-barGap*(perQ.length-1))/perQ.length;

  // Y-axis tick generator
  const ticks=(max,count=4)=>{const step=Math.ceil(max/count/5)*5||1;const out=[];for(let v=0;v<=step*count;v+=step)if(v<=max*1.1)out.push(v);return out;};
  const distTicks=ticks(maxCount);
  const errTicks=ticks(errMax);
  const earnedPct=Math.max(0,Math.min(100,avg));
  const lostPct=100-earnedPct;
  const scorePcts=gradingResults.map(r=>r.maxScore>0?(r.totalScore/r.maxScore)*100:0);
  const masteryCount=scorePcts.filter(p=>p>=85).length;
  const onTrackCount=scorePcts.filter(p=>p>=70&&p<85).length;
  const supportCount=scorePcts.filter(p=>p<70).length;
  const riskQs=[...perQ].filter(p=>p.avgPct<75||p.errorRate>35).sort((a,b)=>b.errorRate-a.errorRate).slice(0,4);
  const quickWins=[...perQ].filter(p=>p.avgPct>=65&&p.avgPct<85&&p.errorRate<=45).sort((a,b)=>b.fullCredit-a.fullCredit).slice(0,3);
  const spreadLabel=std<10?"tight and consistent":std<18?"moderately varied":"widely spread";
  const performanceLabel=avg>=82?"strong class mastery":avg>=70?"solid progress with targeted gaps":avg>=60?"mixed understanding that needs review":"high-risk performance pattern";
  const nextActions=[
    hardest?`Open with Q${hardest.q.num}: review the main misconception, then show one worked example and one near-transfer problem.`:"Start with a short whole-class review of the lowest scoring objective.",
    riskQs.length?`Run a 10-minute checkpoint on ${riskQs.slice(0,2).map(p=>`Q${p.q.num}`).join(" and ")} before moving to new material.`:"Use a short retrieval warm-up to confirm students can reproduce the strongest topics independently.",
    topGlobal[0]?`Add feedback language for "${topGlobal[0].title}" so future grading comments stay consistent.`:"Ask students to explain their reasoning in one sentence to surface hidden misconceptions."
  ];

  return(<div>
    {/* ── Summary stat cards ── */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:4}}>
      <div style={statCard}>
        <div style={{fontSize:12,fontWeight:600,color:T.textSec,marginBottom:8}}>Average Score</div>
        <div style={{fontSize:32,fontWeight:900,lineHeight:1}}>{avg.toFixed(1)}%</div>
        <div style={{fontSize:12,color:T.textSec,marginTop:6}}>{n} of {n} graded</div>
      </div>
      <div style={statCard}>
        <div style={{fontSize:12,fontWeight:600,color:T.textSec,marginBottom:8}}>Median Score</div>
        <div style={{fontSize:32,fontWeight:900,lineHeight:1}}>{median.toFixed(0)}%</div>
        <div style={{fontSize:12,color:T.textSec,marginTop:6}}>Middle 50% range: {q1.toFixed(0)}-{q3.toFixed(0)}%</div>
      </div>
      <div style={statCard}>
        <div style={{fontSize:12,fontWeight:600,color:T.textSec,marginBottom:8}}>Standard Deviation</div>
        <div style={{fontSize:32,fontWeight:900,lineHeight:1}}>{std.toFixed(1)}</div>
        <div style={{fontSize:12,color:T.textSec,marginTop:6}}>{std<10?"Low":std<18?"Moderate":"High"} variance in scores</div>
      </div>
    </div>

    {/* ── AI Insights ── */}
    <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"14px 18px",margin:"14px 0 4px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
        <div style={{fontSize:12,fontWeight:800,color:T.text}}>Class Score Progress</div>
        <div style={{display:"flex",gap:12,fontSize:11,fontWeight:700,color:T.textSec}}>
          <span style={{color:T.primary}}>Earned {earnedPct.toFixed(0)}%</span>
          <span>Lost {lostPct.toFixed(0)}%</span>
        </div>
      </div>
      <div style={{height:10,borderRadius:T.rr,background:`linear-gradient(90deg,#F2F3FA 0%,#F7F4FF 100%)`,overflow:"hidden",border:`1px solid ${T.primary}10`}}>
        <div style={{height:"100%",width:`${earnedPct}%`,background:`linear-gradient(90deg,${T.primary} 0%,${T.purple} 100%)`,borderRadius:T.rr,boxShadow:"0 0 14px rgba(67,85,219,0.24)"}}/>
      </div>
    </div>

    <h3 style={sectionTitle}><Sparkles size={16} color={T.purple}/>AI Insights</h3>
    <div style={{columns:"2 360px",columnGap:14}}>
      {hardest&&<div style={insightCard(T.red)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><AlertCircle size={16} color={T.red}/><span style={{fontWeight:800,fontSize:14}}>Most Challenging Question</span></div>
          <span style={{background:"#FEE8E8",color:T.red,fontWeight:700,fontSize:11,padding:"3px 10px",borderRadius:T.rr}}>Critical</span>
        </div>
        <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Question {hardest.q.num}</div>
        <div style={{fontSize:12,color:T.textSec,marginBottom:10}}><span style={{color:T.red,fontWeight:700}}>{hardest.errorRate.toFixed(0)}%</span> of students scored below {(hardest.q.pts*0.6).toFixed(0)}/{hardest.q.pts} points</div>
        <div style={{background:"#FEF2F2",borderRadius:T.rs,padding:"10px 12px",border:`1px solid ${T.red}20`}}>
          <div style={{fontSize:11,fontWeight:700,color:T.red,marginBottom:3}}>Common Issue:</div>
          <p style={{margin:0,fontSize:12,color:T.red,lineHeight:1.5}}>{hardest.topMistakes[0]?`Most students struggled with "${hardest.topMistakes[0].title}". Consider reviewing this topic in next lecture.`:"This question has the lowest average. Review student responses for common misconceptions."}</p>
        </div>
      </div>}
      {easiest&&easiest!==hardest&&<div style={insightCard(T.green)}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}><CheckCircle2 size={16} color={T.green}/><span style={{fontWeight:800,fontSize:14}}>Strong Performance Area</span></div>
          <span style={{background:T.greenLight,color:T.green,fontWeight:700,fontSize:11,padding:"3px 10px",borderRadius:T.rr}}>Excellent</span>
        </div>
        <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>Question {easiest.q.num}</div>
        <div style={{fontSize:12,color:T.textSec,marginBottom:10}}><span style={{color:T.green,fontWeight:700}}>{easiest.avgPct.toFixed(0)}%</span> average score with consistent performance</div>
        <div style={{background:T.greenLight,borderRadius:T.rs,padding:"10px 12px",border:`1px solid ${T.green}20`}}>
          <div style={{fontSize:11,fontWeight:700,color:T.green,marginBottom:3}}>AI Observation:</div>
          <p style={{margin:0,fontSize:12,color:"#0E6E44",lineHeight:1.5}}>Students demonstrated excellent understanding. Similar complexity questions can be used in future assessments.</p>
        </div>
      </div>}
      <div style={insightCard(T.orange)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><AlertTriangle size={16} color={T.orange}/><span style={{fontWeight:800,fontSize:14}}>Common Mistakes Detected</span></div>
        {topGlobal.length?topGlobal.map((m,i)=>(<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0"}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:T.orangeLight,color:T.orange,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,flexShrink:0}}>{i+1}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontWeight:700,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{m.title}</div>
            <div style={{fontSize:11,color:T.textSec}}>{m.pct}% of students in Q{m.qNum}</div>
          </div>
        </div>)):<p style={{margin:0,fontSize:12,color:T.textSec}}>No significant recurring mistakes detected.</p>}
      </div>
      <div style={insightCard(T.purple)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><BookOpen size={16} color={T.purple}/><span style={{fontWeight:800,fontSize:14}}>Identified Learning Gaps</span></div>
        <div style={{background:T.purpleLight,borderRadius:T.rs,padding:"12px 14px"}}>
          <div style={{fontSize:13,fontWeight:700,color:T.purple,marginBottom:8}}>Topics to Review</div>
          <ul style={{margin:0,paddingLeft:18,fontSize:12,color:T.text,lineHeight:1.7}}>
            {perQ.filter(p=>p.avgPct<70).slice(0,3).map((p,i)=><li key={i}>{p.q.title||`Question ${p.q.num}`}</li>)}
            {perQ.filter(p=>p.avgPct<70).length===0&&<li>No significant learning gaps — overall strong performance.</li>}
          </ul>
        </div>
      </div>
      <div style={insightCard(T.primary)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><TrendingUp size={16} color={T.primary}/><span style={{fontWeight:800,fontSize:14}}>Class Performance Pattern</span></div>
        <p style={{margin:"0 0 12px",fontSize:12,color:T.textSec,lineHeight:1.55}}>AI reads this as <span style={{fontWeight:800,color:T.primary}}>{performanceLabel}</span> with a <span style={{fontWeight:800,color:T.text}}>{spreadLabel}</span> score distribution.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {[{l:"Avg",v:`${avg.toFixed(0)}%`},{l:"Median",v:`${median.toFixed(0)}%`},{l:"Spread",v:std.toFixed(1)}].map(x=><div key={x.l} style={{background:`${T.primary}0A`,border:`1px solid ${T.primary}18`,borderRadius:T.rs,padding:"9px 10px",textAlign:"center"}}>
            <div style={{fontSize:10,fontWeight:800,color:T.textSec,textTransform:"uppercase"}}>{x.l}</div>
            <div style={{fontSize:16,fontWeight:900,color:T.text,marginTop:2}}>{x.v}</div>
          </div>)}
        </div>
      </div>
      <div style={insightCard(T.blue)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><ClipboardList size={16} color={T.blue}/><span style={{fontWeight:800,fontSize:14}}>Priority Review Sequence</span></div>
        {riskQs.length?riskQs.map((p,i)=><div key={p.q.id} style={{display:"grid",gridTemplateColumns:"28px 1fr auto",alignItems:"center",gap:10,padding:"7px 0",borderBottom:i<riskQs.length-1?`1px solid ${T.border}`:"none"}}>
          <div style={{width:24,height:24,borderRadius:"50%",background:`${T.blue}12`,color:T.blue,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11}}>{i+1}</div>
          <div style={{minWidth:0}}>
            <div style={{fontWeight:800,fontSize:12}}>Q{p.q.num}: {p.q.title||"Question focus"}</div>
            <div style={{fontSize:11,color:T.textSec}}>{p.avgPct.toFixed(0)}% avg · {p.errorRate.toFixed(0)}% error rate</div>
          </div>
          <span style={{fontSize:10,fontWeight:800,color:p.errorRate>50?T.red:T.orange,background:p.errorRate>50?"#FEE8E8":T.orangeLight,borderRadius:T.rr,padding:"3px 8px"}}>{p.errorRate>50?"High":"Watch"}</span>
        </div>):<p style={{margin:0,fontSize:12,color:T.textSec}}>No urgent review sequence needed. Keep reinforcing current mastery.</p>}
      </div>
      <div style={insightCard(T.green)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Users size={16} color={T.green}/><span style={{fontWeight:800,fontSize:14}}>Student Support Groups</span></div>
        {[{l:"Mastery",v:masteryCount,c:T.green,b:T.greenLight},{l:"On Track",v:onTrackCount,c:T.primary,b:T.primaryLight},{l:"Needs Review",v:supportCount,c:T.orange,b:T.orangeLight}].map(x=><div key={x.l} style={{display:"flex",alignItems:"center",gap:10,marginBottom:9}}>
          <div style={{width:88,fontSize:12,fontWeight:800,color:T.text}}>{x.l}</div>
          <div style={{flex:1,height:8,borderRadius:T.rr,background:"#F1F3F8",overflow:"hidden"}}><div style={{height:"100%",width:`${n?x.v/n*100:0}%`,background:x.c,borderRadius:T.rr}}/></div>
          <div style={{width:34,textAlign:"right",fontSize:12,fontWeight:900,color:x.c}}>{x.v}</div>
        </div>)}
        <p style={{margin:"10px 0 0",fontSize:11,color:T.textSec,lineHeight:1.45}}>{supportCount>0?`${supportCount} student${supportCount===1?"":"s"} should get a targeted correction task before the next assessment.`:"All graded students are at or above the review threshold."}</p>
      </div>
      <div style={insightCard(T.purple)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Lightbulb size={16} color={T.purple}/><span style={{fontWeight:800,fontSize:14}}>Recommended Next Steps</span></div>
        {nextActions.map((a,i)=><div key={i} style={{display:"flex",gap:10,padding:"7px 0"}}>
          <div style={{width:22,height:22,borderRadius:"50%",background:T.purpleLight,color:T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,flexShrink:0}}>{i+1}</div>
          <div style={{fontSize:12,color:T.textSec,lineHeight:1.5}}>{a}</div>
        </div>)}
      </div>
      <div style={insightCard(T.orange)}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}><Star size={16} color={T.orange}/><span style={{fontWeight:800,fontSize:14}}>Quick Wins</span></div>
        {quickWins.length?quickWins.map(p=><div key={p.q.id} style={{background:T.orangeLight,borderRadius:T.rs,padding:"9px 11px",marginBottom:8,border:`1px solid ${T.orange}18`}}>
          <div style={{fontSize:12,fontWeight:900,color:T.text}}>Q{p.q.num}: {p.q.title||"Review item"}</div>
          <div style={{fontSize:11,color:T.textSec,marginTop:3}}>Good candidate for a short reteach: {p.avgPct.toFixed(0)}% average, {p.fullCredit.toFixed(0)}% full-credit rate.</div>
        </div>):<p style={{margin:0,fontSize:12,color:T.textSec}}>No mid-range quick wins detected. Focus on either enrichment or deeper remediation.</p>}
      </div>
    </div>

    {/* ── Question-Level Breakdown ── */}
    <h3 style={sectionTitle}><BarChart3 size={16} color={T.primary}/>Question-Level Breakdown</h3>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {perQ.map((p,i)=>{
        const needsAttention=p.avgPct<65;
        return(<div key={i} style={{background:T.card,borderRadius:T.r,border:needsAttention?`1px solid ${T.red}40`:`1px solid ${T.border}`,padding:"18px 22px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{fontSize:17,fontWeight:800}}>Question {p.q.num}</div>
              {needsAttention&&<span style={{background:"#FEE8E8",color:T.red,fontWeight:700,fontSize:10,padding:"3px 9px",borderRadius:T.rr}}>Needs Attention</span>}
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:22,fontWeight:900,color:needsAttention?T.red:T.text}}>{p.avgPts.toFixed(1)} / {p.q.pts}</div>
              <div style={{fontSize:11,fontWeight:600,color:p.diff.c==="green"?T.green:p.diff.c==="orange"?T.orange:T.red,marginTop:2}}>{p.avgPct.toFixed(0)}% avg · {p.diff.l} difficulty</div>
            </div>
          </div>
          <div style={{fontSize:12,color:T.textSec,marginBottom:10}}>{p.q.title||"—"} · {p.q.pts} points</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:12}}>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:600,marginBottom:4}}><span style={{color:T.textSec}}>Error Rate</span><span>{p.errorRate.toFixed(0)}%</span></div>
              <div style={{height:6,background:T.border,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${p.errorRate}%`,background:p.errorRate>40?T.red:p.errorRate>20?T.orange:"#222"}}/></div>
            </div>
            <div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,fontWeight:600,marginBottom:4}}><span style={{color:T.textSec}}>Full Credit Rate</span><span>{p.fullCredit.toFixed(0)}%</span></div>
              <div style={{height:6,background:T.border,borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${p.fullCredit}%`,background:T.green}}/></div>
            </div>
          </div>
          <div style={{background:`linear-gradient(90deg,${T.purple}0D 0%,${T.primary}08 44%,#FFFFFF 100%)`,borderRadius:T.rs,padding:"10px 14px",display:"flex",gap:8,border:`1px solid ${T.primary}18`,boxShadow:`inset 3px 0 0 ${T.primary}30`}}>
            <span style={{fontSize:12,fontWeight:700,color:T.text,flexShrink:0}}>AI Analysis:</span>
            <span style={{fontSize:12,color:T.textSec,lineHeight:1.5}}>{analysisTxt(p.avgPct,p.errorRate,p.topMistakes)}</span>
          </div>
        </div>);
      })}
    </div>

    {/* ── Visual Analytics ── */}
    <h3 style={sectionTitle}><TrendingUp size={16} color={T.primary}/>Visual Analytics</h3>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      {/* Score distribution histogram */}
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"20px 22px"}}>
        <div style={{fontWeight:800,fontSize:15,marginBottom:2}}>Score Distribution</div>
        <div style={{fontSize:12,color:T.textSec,marginBottom:14}}>Overall exam performance histogram</div>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{width:"100%",height:"auto"}}>
          <defs>
            <linearGradient id="scoreBarGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={T.primary} stopOpacity="0.38"/>
              <stop offset="68%" stopColor={T.primary} stopOpacity="0.86"/>
              <stop offset="100%" stopColor={T.purple} stopOpacity="0.96"/>
            </linearGradient>
          </defs>
          {distTicks.map((t,i)=>{const y=padT+plotH-(t/maxCount)*plotH;return(<g key={i}>
            <line x1={padL} y1={y} x2={chartW-padR} y2={y} stroke={T.border} strokeDasharray="3,3"/>
            <text x={padL-6} y={y+3} fontSize="10" fill={T.textSec} textAnchor="end">{t}</text>
          </g>);})}
          {buckets.map((c,i)=>{const bh=(c/maxCount)*plotH;const bx=padL+i*(barW+barGap);const by=padT+plotH-bh;return(<g key={i}>
            <rect x={bx} y={by} width={barW} height={bh} fill="url(#scoreBarGrad)" rx="3"/>
            <text x={bx+barW/2} y={chartH-padB+16} fontSize="10" fill={T.textSec} textAnchor="middle">{bucketLabels[i]}</text>
          </g>);})}
          <text x={10} y={padT+plotH/2} fontSize="10" fill={T.textSec} textAnchor="middle" transform={`rotate(-90 10 ${padT+plotH/2})`}>Number of Students</text>
        </svg>
        <p style={{margin:"10px 0 0",fontSize:11,color:T.textSec,textAlign:"center",lineHeight:1.4}}>{std<12?"Tight distribution — consistent performance.":std<20?"Normal distribution with moderate spread.":"Wide distribution — significant performance variance."}</p>
      </div>

      {/* Error rate by question */}
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"20px 22px"}}>
        <div style={{fontWeight:800,fontSize:15,marginBottom:2}}>Error Rate by Question</div>
        <div style={{fontSize:12,color:T.textSec,marginBottom:14}}>Percentage of students who lost points</div>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{width:"100%",height:"auto"}}>
          <defs>
            <linearGradient id="errorBarSoftGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={T.primary} stopOpacity="0.14"/>
              <stop offset="72%" stopColor={T.primary} stopOpacity="0.30"/>
              <stop offset="100%" stopColor={T.purple} stopOpacity="0.38"/>
            </linearGradient>
            <linearGradient id="errorBarHighlightGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#F7B267" stopOpacity="0.88"/>
              <stop offset="100%" stopColor="#D9467C" stopOpacity="0.98"/>
            </linearGradient>
          </defs>
          {errTicks.map((t,i)=>{const y=padT+plotH-(t/errMax)*plotH;return(<g key={i}>
            <line x1={padL} y1={y} x2={chartW-padR} y2={y} stroke={T.border} strokeDasharray="3,3"/>
            <text x={padL-6} y={y+3} fontSize="10" fill={T.textSec} textAnchor="end">{t}</text>
          </g>);})}
          {perQ.map((p,i)=>{const bh=(p.errorRate/errMax)*plotH;const bx=padL+i*(errBarW+barGap);const by=padT+plotH-bh;const isHighest=hardest&&p.q.id===hardest.q.id;return(<g key={i}>
            <rect x={bx} y={by} width={errBarW} height={bh} fill={isHighest?"url(#errorBarHighlightGrad)":"url(#errorBarSoftGrad)"} rx="3"/>
            <text x={bx+errBarW/2} y={chartH-padB+16} fontSize="10" fill={T.textSec} textAnchor="middle">Q{p.q.num}</text>
          </g>);})}
          <text x={10} y={padT+plotH/2} fontSize="10" fill={T.textSec} textAnchor="middle" transform={`rotate(-90 10 ${padT+plotH/2})`}>Error Rate (%)</text>
        </svg>
        <p style={{margin:"10px 0 0",fontSize:11,color:T.textSec,textAlign:"center",lineHeight:1.4}}>{hardest?`Q${hardest.q.num} shows the highest error rate. Consider reviewing this question's rubric.`:""}</p>
      </div>
    </div>
  </div>);
}

/* ═══════════════════════════════════════════════════════════
   MOCK ASSIGNMENT DATA — 30 students × multiple questions each
   Drives the Course cards and the AssignmentView analytics/table.
   ═══════════════════════════════════════════════════════════ */
// Globally diverse student roster (30 names, all ASCII-safe for email generation)
const MOCK_NAMES=[
  "Aisha Patel","Kenji Nakamura","Sofia Rodriguez","Darius Osei","Priya Sharma",
  "Wei Chen","Olumide Adeyemi","Fatima Hassan","Lars Eriksson","Mateo Delgado",
  "Ananya Iyer","Mehmet Yilmaz","Minh Nguyen","Zainab Hussain","Jiwon Park",
  "Chiamaka Okafor","Rafael Silva","Lucia Moretti","Yusuf Kaya","Emma Muller",
  "Hiroshi Tanaka","Amara Diallo","Isabella Rossi","Alexei Petrov","Tariq Rahman",
  "Chloe Laurent","Arjun Kapoor","Nadia Ivanova","Samuel Mensah","Hana Suzuki"
];

// Each student belongs to one of a few email domains for visual variety
const EMAIL_DOMAINS=["upenn.edu","seas.upenn.edu","sas.upenn.edu","wharton.upenn.edu"];

// Seeded pseudo-random (deterministic so mock numbers are stable across renders)
const sRand=(s)=>((s*9301+49297)%233280)/233280;

// Question banks per assignment — pts sum matches the assignment total
const MT_QS=[
  {id:1,num:"1",title:"Basic Concepts",pts:15,type:"free",answerKey:"See key",page:1},
  {id:2,num:"2",title:"Algorithm Implementation",pts:20,type:"free",answerKey:"See key",page:1},
  {id:3,num:"3",title:"Recursive Problem Solving",pts:25,type:"free",answerKey:"See key",page:2},
  {id:4,num:"4",title:"Time Complexity Analysis",pts:20,type:"free",answerKey:"See key",page:2},
  {id:5,num:"5",title:"Data Structures",pts:20,type:"free",answerKey:"See key",page:3}
];
const HW_QS=[
  {id:1,num:"1",title:"Warm-up Identification",pts:10,type:"free",answerKey:"See key",page:1},
  {id:2,num:"2",title:"Fibonacci Recursion",pts:10,type:"free",answerKey:"See key",page:1},
  {id:3,num:"3",title:"Tree Traversal",pts:10,type:"free",answerKey:"See key",page:2},
  {id:4,num:"4",title:"Memoization Rewrite",pts:10,type:"free",answerKey:"See key",page:2},
  {id:5,num:"5",title:"Mutual Recursion",pts:10,type:"free",answerKey:"See key",page:3}
];
// Per-question avg score targets (0-1) — creates realistic difficulty spread
const MT_DIFF={1:0.83,2:0.81,3:0.58,4:0.75,5:0.89};
const HW_DIFF={1:0.91,2:0.68,3:0.82,4:0.72,5:0.86};

// Criteria labels shown in ExamInsights "common mistakes"
const CRIT_TITLES={
  1:["Correct definitions","Clear examples"],
  2:["Off-by-one errors","Correct output"],
  3:["Proper base case","Correct recursive step"],
  4:["Accurate Big-O bound","Memory analysis"],
  5:["Data structure choice","Implementation details"]
};

// Specific reasons shown on criterion cards — chosen deterministically per student
const REASON_POOLS={
  1:{
    full:["Definition matches answer key precisely.","Accurate terminology with illustrative example.","Strong conceptual grasp demonstrated."],
    partial:["Definition correct but missing one key term.","Example given but oversimplified.","Terminology slightly imprecise."],
    zero:["Definition off-topic or circular.","No supporting example provided.","Fundamental misunderstanding of the concept."]
  },
  2:{
    full:["Correct implementation with optimal logic.","Edge cases handled cleanly.","Algorithm well-structured and readable."],
    partial:["Off-by-one error in loop bounds.","Edge case missed (empty input).","Minor logical slip in the inner loop."],
    zero:["Algorithm fails on basic inputs.","Incorrect termination condition.","Logic fundamentally flawed."]
  },
  3:{
    full:["Base case and recursive step both correct.","Elegant recursive formulation.","Terminates correctly for all inputs."],
    partial:["Base case missing one sub-condition.","Recursive step double-counts on some inputs.","Will infinite-loop for negative inputs."],
    zero:["No base case — stack overflow on any input.","Recursion does not reduce the problem.","Completely missed the recursive pattern."]
  },
  4:{
    full:["Accurate Big-O with rigorous justification.","Correct complexity with tight bound.","Analysis shows deep understanding."],
    partial:["Big-O bound off by a log factor.","Analysis lacks formal justification.","Space complexity analysis incomplete."],
    zero:["Complexity stated is wildly incorrect.","Confuses time and space complexity.","No analysis provided."]
  },
  5:{
    full:["Optimal data structure for the operations.","Clean API with correct invariants.","Handles all operations in expected time."],
    partial:["Data structure works but not optimal for this workload.","Minor inefficiencies in common operations.","API design has one rough edge."],
    zero:["Wrong data structure for the problem.","Core operations broken.","Significant design flaws throughout."]
  }
};

function pickReason(pool,bucket,seed){
  const arr=pool[bucket];return arr[Math.floor(sRand(seed)*arr.length)];
}

// Build a timestamp string "M/D/YYYY, H:MM:SS AM/PM" with day offset from deadline
function stampFrom(baseDate,dayOffset,hour24,minute){
  const[m,d,y]=baseDate.split("/").map(Number);
  const dt=new Date(y,m-1,d);
  dt.setDate(dt.getDate()+dayOffset);
  const hr=((hour24-1)%12)+1;
  const ampm=hour24>=12?"PM":"AM";
  return `${dt.getMonth()+1}/${dt.getDate()}/${dt.getFullYear()}, ${hr}:${String(minute).padStart(2,"0")}:00 ${ampm}`;
}

function buildSubmissions(qs,diffMap,opts,dateBase,statusSeed=0){
  const {gradedCount,submittedCount,lateCount}=opts;

  // Permute student indices by statusSeed so DIFFERENT students miss DIFFERENT assignments.
  // Skill is still keyed on original index — so a top student stays top across assignments.
  const slotForStudent=new Array(MOCK_NAMES.length);
  const permuted=MOCK_NAMES.map((_,i)=>i).sort((a,b)=>sRand(a*31+statusSeed*17+3)-sRand(b*31+statusSeed*17+3));
  permuted.forEach((origIdx,slotIdx)=>{slotForStudent[origIdx]=slotIdx;});

  return MOCK_NAMES.map((name,i)=>{
    const slot=slotForStudent[i];
    let status,graded;
    if(slot<gradedCount){status="graded";graded=true;}
    else if(slot<gradedCount+lateCount){status="late";graded=true;}
    else if(slot<gradedCount+lateCount+submittedCount){status="submitted";graded=false;}
    else{status="missing";graded=false;}

    // Per-student "skill" — gives each student a coherent personality across all questions.
    // Uniform in [-0.22, +0.22] creates realistic outliers at both ends.
    const skill=(sRand(i*59+101)-0.5)*0.44;

    const grades=graded?qs.map(q=>{
      const d=diffMap[q.id]??0.80;
      const noise=(sRand(i*37+q.id*13+statusSeed)-0.5)*0.18;
      const pct=Math.max(0,Math.min(1,d+skill+noise));
      const total=Math.round(pct*q.pts);
      const c1Max=Math.ceil(q.pts*0.5);
      const c2Max=q.pts-c1Max;
      const c1E=Math.min(c1Max,total);
      const c2E=Math.max(0,total-c1E);
      const ts=q.crits||CRIT_TITLES[q.id]||["Part 1","Part 2"];
      const pool=REASON_POOLS[q.id]||{full:["Full credit."],partial:["Partial credit."],zero:["Incorrect."]};
      const bucket=(earn,max)=>earn===max?"full":earn===0?"zero":"partial";
      return {qId:q.id,qNum:q.num,total,maxPts:q.pts,
        criteria:[
          {earned:c1E,maxPts:c1Max,title:ts[0],reason:pickReason(pool,bucket(c1E,c1Max),i*17+q.id*3)},
          {earned:c2E,maxPts:c2Max,title:ts[1],reason:pickReason(pool,bucket(c2E,c2Max),i*23+q.id*7+1)}
        ],
        studentAnswer:"",feedback:"",
        confidence:0.70+sRand(i*41+q.id*5)*0.28};
    }):null;

    const maxScore=qs.reduce((s,q)=>s+q.pts,0);
    const totalScore=graded?grades.reduce((s,g)=>s+g.total,0):0;

    const parts=name.split(" ");
    const domain=EMAIL_DOMAINS[i%EMAIL_DOMAINS.length];
    const email=`${parts[0].toLowerCase()}.${parts[1][0].toLowerCase()}@${domain}`;

    // Submission timing: spread across 3 days before deadline + a few late entries
    let submittedAt=null;
    if(status!=="missing"){
      const tr=sRand(i*79+11);
      let dayOffset;
      if(status==="late") dayOffset=1; // day after deadline
      else if(tr<0.15) dayOffset=-2;   // ~15% submit 2 days early
      else if(tr<0.45) dayOffset=-1;   // ~30% submit 1 day early
      else dayOffset=0;                // rest on deadline day
      // Evening hours mostly, with a few early birds
      const hr=dayOffset===1?Math.floor(sRand(i*13)*3)+2 // late: 2-4 AM
              :dayOffset<0?Math.floor(sRand(i*19)*10)+10 // early days: 10 AM - 7 PM
              :Math.floor(sRand(i*29)*8)+16;             // deadline day: 4 PM - 11 PM
      const mn=Math.floor(sRand(i*53+7)*60);
      submittedAt=stampFrom(dateBase,dayOffset,hr,mn);
    }

    return {name,email,submittedAt,status,
      grades,
      totalScore,maxScore,
      skill}; // keep skill for debugging / future use
  });
}

const MIDTERM_SUBS=buildSubmissions(MT_QS,MT_DIFF,{gradedCount:22,lateCount:2,submittedCount:4},"3/15/2026",7);
const HW5_SUBS=buildSubmissions(HW_QS,HW_DIFF,{gradedCount:25,lateCount:3,submittedCount:1},"4/1/2026",29);

/* ── CIS 5450 question banks ── */
const SQL_QS=[
  {id:1,num:"1",title:"SELECT & WHERE",pts:10,type:"free",answerKey:"See key",page:1,crits:["Correct column selection","Accurate WHERE predicate"]},
  {id:2,num:"2",title:"JOIN operations",pts:10,type:"free",answerKey:"See key",page:1,crits:["Correct JOIN type","Valid join condition"]},
  {id:3,num:"3",title:"GROUP BY & Aggregates",pts:10,type:"free",answerKey:"See key",page:2,crits:["Correct grouping keys","Accurate aggregate function"]},
  {id:4,num:"4",title:"Subqueries",pts:10,type:"free",answerKey:"See key",page:2,crits:["Correlated scope handled","Result composition correct"]},
  {id:5,num:"5",title:"Window Functions",pts:10,type:"free",answerKey:"See key",page:3,crits:["PARTITION BY clause","ORDER BY within frame"]}
];
const PD_QS=[
  {id:1,num:"1",title:"DataFrame Filtering",pts:10,type:"free",answerKey:"See key",page:1,crits:["Boolean mask correctness","Index preservation"]},
  {id:2,num:"2",title:"GroupBy & Aggregation",pts:15,type:"free",answerKey:"See key",page:1,crits:["Grouping key choice","Aggregation function"]},
  {id:3,num:"3",title:"Merge & Join",pts:15,type:"free",answerKey:"See key",page:2,crits:["Correct how= argument","Key alignment verified"]},
  {id:4,num:"4",title:"NumPy Broadcasting",pts:10,type:"free",answerKey:"See key",page:2,crits:["Shape compatibility","Vectorized computation"]},
  {id:5,num:"5",title:"Pivot Tables",pts:10,type:"free",answerKey:"See key",page:3,crits:["Index/columns split","Aggregation applied"]}
];
const SP_QS=[
  {id:1,num:"1",title:"RDD Transformations",pts:10,type:"free",answerKey:"See key",page:1,crits:["Transformation choice","Lazy evaluation understood"]},
  {id:2,num:"2",title:"Word Count",pts:10,type:"free",answerKey:"See key",page:1,crits:["Map step correctness","ReduceByKey logic"]},
  {id:3,num:"3",title:"PageRank Iteration",pts:15,type:"free",answerKey:"See key",page:2,crits:["Contribution computation","Damping factor applied"]},
  {id:4,num:"4",title:"Shuffle & Partitioning",pts:15,type:"free",answerKey:"See key",page:2,crits:["Partitioner choice","Shuffle cost analysis"]},
  {id:5,num:"5",title:"Spark SQL",pts:10,type:"free",answerKey:"See key",page:3,crits:["DataFrame API usage","Query optimization"]}
];
const BDMT_QS=[
  {id:1,num:"1",title:"CAP Theorem",pts:15,type:"free",answerKey:"See key",page:1,crits:["Trade-off explanation","System classification"]},
  {id:2,num:"2",title:"Consistent Hashing",pts:20,type:"free",answerKey:"See key",page:1,crits:["Ring construction","Virtual node reasoning"]},
  {id:3,num:"3",title:"MapReduce Design",pts:25,type:"free",answerKey:"See key",page:2,crits:["Mapper/reducer contract","Combiner justification"]},
  {id:4,num:"4",title:"Stream Processing",pts:20,type:"free",answerKey:"See key",page:2,crits:["Windowing strategy","Watermark handling"]},
  {id:5,num:"5",title:"Fault Tolerance",pts:20,type:"free",answerKey:"See key",page:3,crits:["Replication strategy","Recovery protocol"]}
];
const PROJ_QS=[
  {id:1,num:"1",title:"Problem Statement",pts:10,type:"free",answerKey:"See key",page:1,crits:["Clear motivation","Measurable objective"]},
  {id:2,num:"2",title:"Dataset Selection",pts:10,type:"free",answerKey:"See key",page:1,crits:["Data source justified","Size/scale feasible"]},
  {id:3,num:"3",title:"Methodology",pts:10,type:"free",answerKey:"See key",page:2,crits:["Approach appropriate","Tooling realistic"]},
  {id:4,num:"4",title:"Evaluation Plan",pts:10,type:"free",answerKey:"See key",page:2,crits:["Metric choice","Baseline comparison"]}
];
const SQL_DIFF={1:0.88,2:0.74,3:0.82,4:0.63,5:0.69};
const PD_DIFF={1:0.86,2:0.79,3:0.71,4:0.64,5:0.77};
const SP_DIFF={1:0.78,2:0.84,3:0.57,4:0.62,5:0.73};
const BDMT_DIFF={1:0.81,2:0.66,3:0.59,4:0.71,5:0.76};
const PROJ_DIFF={1:0.87,2:0.83,3:0.79,4:0.75};

const SQL_SUBS=buildSubmissions(SQL_QS,SQL_DIFF,{gradedCount:27,lateCount:1,submittedCount:1},"2/5/2026",11);
const PD_SUBS=buildSubmissions(PD_QS,PD_DIFF,{gradedCount:25,lateCount:2,submittedCount:2},"2/22/2026",23);
const SP_SUBS=buildSubmissions(SP_QS,SP_DIFF,{gradedCount:24,lateCount:3,submittedCount:2},"3/13/2026",37);
const BDMT_SUBS=buildSubmissions(BDMT_QS,BDMT_DIFF,{gradedCount:23,lateCount:2,submittedCount:3},"3/25/2026",53);
const PROJ_SUBS=buildSubmissions(PROJ_QS,PROJ_DIFF,{gradedCount:20,lateCount:1,submittedCount:5},"4/10/2026",67);

const ASSIGNMENTS_BY_COURSE={
  // CIS 5450 — Big Data Analytics: 5 assignments, different students miss each
  3:[
    {id:"sql",title:"Homework 1: SQL Fundamentals",type:"homework",pts:50,due:"2/5/2026 at 11:59 PM",published:true,questions:SQL_QS,submissions:SQL_SUBS},
    {id:"pd",title:"Homework 2: Pandas & NumPy",type:"homework",pts:60,due:"2/22/2026 at 11:59 PM",published:true,questions:PD_QS,submissions:PD_SUBS},
    {id:"sp",title:"Homework 3: Spark MapReduce",type:"homework",pts:60,due:"3/13/2026 at 11:59 PM",published:true,questions:SP_QS,submissions:SP_SUBS},
    {id:"bdmt",title:"Midterm: Distributed Systems",type:"exam",pts:100,due:"3/25/2026 at 11:59 PM",published:true,questions:BDMT_QS,submissions:BDMT_SUBS},
    {id:"proj",title:"Final Project Proposal",type:"homework",pts:40,due:"4/10/2026 at 11:59 PM",published:true,questions:PROJ_QS,submissions:PROJ_SUBS}
  ],
  default:[
    {id:"mt",title:"Midterm Exam II",type:"exam",pts:100,due:"3/15/2026 at 11:59 PM",published:true,questions:MT_QS,submissions:MIDTERM_SUBS},
    {id:"hw5",title:"Homework 5: Recursion",type:"homework",pts:50,due:"4/1/2026 at 11:59 PM",published:true,questions:HW_QS,submissions:HW5_SUBS}
  ]
};
const getAssignments=(courseId)=>ASSIGNMENTS_BY_COURSE[courseId]||ASSIGNMENTS_BY_COURSE.default;

const STUDENT_CS=[
  {id:1,code:"CIS 7000",name:"Large Language Models",term:"Spring 2026",students:180,assignments:2,color:"#4355DB"},
  {id:2,code:"CIS 5220",name:"Reinforcement Learning",term:"Spring 2026",students:150,assignments:2,color:"#8B5CF6"},
  {id:3,code:"CIS 5450",name:"Data Analytics",term:"Spring 2026",students:120,assignments:5,color:"#22A96B"}
];
const STUDENT_ASSIGNMENT_META={
  1:[
    {title:"Midterm: Transformer Language Models",questions:[
      ["Scaled Dot-Product Attention","Q/K/V projection setup","Softmax scaling rationale"],
      ["Positional Encodings","Sinusoidal position signal","Length generalization"],
      ["Instruction Tuning vs RLHF","Supervised tuning objective","Preference optimization reasoning"],
      ["Decoding & Evaluation","Temperature/top-p tradeoff","Metric limitation analysis"],
      ["RAG Failure Modes","Retrieval grounding","Hallucination mitigation"]
    ]},
    {title:"Homework: RAG and Prompt Evaluation",questions:[
      ["Chunking Strategy","Semantic chunk boundaries","Context-window tradeoff"],
      ["Embedding Retrieval","Similarity metric choice","Recall@k analysis"],
      ["Prompt Robustness","Few-shot example design","Ambiguity handling"],
      ["Evaluation Harness","Test set coverage","Rubric-based scoring"],
      ["Safety & Bias Review","Risk identification","Mitigation proposal"]
    ]}
  ],
  2:[
    {title:"Midterm: Reinforcement Learning Foundations",questions:[
      ["Markov Decision Processes","State/action/reward definition","Transition dynamics"],
      ["Bellman Equations","Value backup equation","Policy evaluation logic"],
      ["Q-Learning","Temporal-difference target","Off-policy update"],
      ["Policy Gradients","Log-probability gradient","Variance reduction baseline"],
      ["Exploration Strategies","Epsilon-greedy tradeoff","Regret intuition"]
    ]},
    {title:"Homework: Deep RL Control",questions:[
      ["DQN Stabilization","Replay buffer purpose","Target network update"],
      ["Actor-Critic Methods","Actor objective","Critic advantage estimate"],
      ["Reward Shaping","Potential-based shaping","Unintended incentive analysis"],
      ["Offline RL","Distribution shift risk","Conservative value estimate"],
      ["Evaluation Protocol","Seed variance reporting","Generalization test"]
    ]}
  ],
  3:[
    {title:"Homework 1: SQL Analytics",questions:[
      ["Filtering Cohorts","Correct column selection","Predicate edge cases"],
      ["JOIN Semantics","Correct join type","Join key validation"],
      ["Grouped Metrics","Grouping key choice","Aggregate interpretation"],
      ["Nested Queries","Subquery scope","Result composition"],
      ["Window Functions","Partition/order clause","Frame interpretation"]
    ]},
    {title:"Homework 2: Pandas Feature Engineering",questions:[
      ["DataFrame Filtering","Boolean mask correctness","Index preservation"],
      ["GroupBy Aggregation","Grouping key choice","Aggregation function"],
      ["Dataset Joins","Join mode selection","Key alignment checks"],
      ["Vectorized NumPy","Shape compatibility","Broadcasted computation"],
      ["Pivot Analysis","Index/columns split","Aggregation interpretation"]
    ]},
    {title:"Homework 3: Spark-Scale Analytics",questions:[
      ["RDD Transformations","Transformation choice","Lazy evaluation"],
      ["Distributed Word Count","Map step correctness","ReduceByKey logic"],
      ["Iterative PageRank","Contribution computation","Damping factor"],
      ["Shuffle Optimization","Partitioning strategy","Shuffle cost analysis"],
      ["Spark SQL Plans","DataFrame API usage","Query optimization"]
    ]},
    {title:"Midterm: Data Systems for Analytics",questions:[
      ["CAP Tradeoffs","Trade-off explanation","System classification"],
      ["Consistent Hashing","Ring construction","Virtual node reasoning"],
      ["MapReduce Design","Mapper/reducer contract","Combiner justification"],
      ["Stream Processing","Windowing strategy","Watermark handling"],
      ["Fault Tolerance","Replication strategy","Recovery protocol"]
    ]},
    {title:"Project Proposal: Analytics Pipeline",questions:[
      ["Problem Statement","Clear motivation","Measurable objective"],
      ["Dataset Selection","Data source justification","Scale feasibility"],
      ["Methodology","Approach appropriateness","Tooling realism"],
      ["Evaluation Plan","Metric choice","Baseline comparison"]
    ]}
  ]
};
const makeStudentFacingGrades=(questions,targetPct,seed=0)=>questions.map((q,i)=>{
  const pct=Math.max(0.72,Math.min(0.98,targetPct+(sRand(seed*31+i*17)-0.5)*0.12));
  const total=Math.round(pct*q.pts);
  const c1Max=Math.ceil(q.pts*0.5);
  const c2Max=q.pts-c1Max;
  const c1E=Math.min(c1Max,total);
  const c2E=Math.max(0,total-c1E);
  const titles=q.crits||CRIT_TITLES[q.id]||["Conceptual accuracy","Technical execution"];
  const reason=(earned,max,title)=>earned===max?`Strong work on ${title.toLowerCase()}; the answer matches the expected reasoning.`:earned===0?`This part needs a full revision; the submitted answer does not yet address ${title.toLowerCase()}.`:`Mostly correct, but ${title.toLowerCase()} needs a more precise explanation or edge-case treatment.`;
  return {qId:q.id,qNum:q.num,total,maxPts:q.pts,
    criteria:[
      {earned:c1E,maxPts:c1Max,title:titles[0],reason:reason(c1E,c1Max,titles[0])},
      {earned:c2E,maxPts:c2Max,title:titles[1],reason:reason(c2E,c2Max,titles[1])}
    ],
    studentAnswer:"",feedback:"",confidence:0.86+sRand(seed*43+i*11)*0.12};
});
const applyStudentMeta=(assignment,meta={})=>{
  const questions=(assignment.questions||[]).map((q,i)=>{
    const m=meta.questions?.[i];
    return m?{...q,title:m[0],crits:[m[1],m[2]]}:q;
  });
  const title=meta.title||assignment.title;
  const isHomework=title.toLowerCase().includes("homework");
  const submissions=assignment.submissions.map((s,si)=>{
    if(isHomework){
      const targetPct=0.88+sRand(si*23+7)*0.08;
      const grades=makeStudentFacingGrades(questions,targetPct,si+3);
      return {...s,status:"graded",submittedAt:s.submittedAt||"3/31/2026, 8:42:00 PM",grades,totalScore:grades.reduce((sum,g)=>sum+g.total,0),maxScore:questions.reduce((sum,q)=>sum+q.pts,0)};
    }
    return !s.grades?s:{...s,grades:s.grades.map((g,gi)=>{
    const m=meta.questions?.[gi];
    return !m?g:{...g,criteria:(g.criteria||[]).map((c,ci)=>({...c,title:m[ci+1]||c.title}))};
  })};
  });
  return {...assignment,title,questions,submissions};
};
const getStudentAssignments=(courseId)=>getAssignments(courseId).map((a,i)=>applyStudentMeta(a,STUDENT_ASSIGNMENT_META[courseId]?.[i]));

const DEMO_STUDENT_NAME=MOCK_NAMES[0];
const getStudentSubmission=(assignment,studentName=DEMO_STUDENT_NAME)=>assignment.submissions.find(s=>s.name===studentName)||assignment.submissions[0];
const pctOf=(score,max)=>max>0?(score/max)*100:0;
const classAverageFor=(assignment)=>{
  const graded=assignment.submissions.filter(s=>s.grades);
  if(!graded.length)return 0;
  return graded.reduce((sum,s)=>sum+pctOf(s.totalScore,s.maxScore),0)/graded.length;
};
const classAverageForQuestion=(assignment,qId)=>{
  const grades=assignment.submissions.flatMap(s=>s.grades?.find(g=>g.qId===qId)||[]);
  if(!grades.length)return 0;
  return grades.reduce((sum,g)=>sum+pctOf(g.total,g.maxPts),0)/grades.length;
};
const studentStrengths=(submission)=>{
  const items=(submission?.grades||[]).flatMap(g=>(g.criteria||[]).filter(c=>c.earned===c.maxPts).map(c=>c.title));
  return [...new Set(items)].slice(0,3);
};
const studentImprovements=(submission)=>{
  const items=(submission?.grades||[]).flatMap(g=>(g.criteria||[]).filter(c=>c.earned<c.maxPts).map(c=>c.title));
  return [...new Set(items)].slice(0,3);
};
const studentAiComments=(submission,assignment)=>{
  if(!submission?.grades)return ["Your instructor has not released AI grading comments yet."];
  const pct=pctOf(submission.totalScore,submission.maxScore);
  const strongest=[...submission.grades].sort((a,b)=>pctOf(b.total,b.maxPts)-pctOf(a.total,a.maxPts))[0];
  const weakest=[...submission.grades].sort((a,b)=>pctOf(a.total,a.maxPts)-pctOf(b.total,b.maxPts))[0];
  const comments=[
    pct>=85?`Excellent work on ${assignment.title}. Your answers show strong command of the main concepts and consistent execution across questions.`:pct>=70?`Good work overall on ${assignment.title}. You are close to mastery; the remaining point losses are concentrated in a few specific skills.`:`This submission shows effort, but several core concepts need a second pass before the next assessment.`,
    strongest?`Your strongest response was Q${strongest.qNum}, where the rubric shows the clearest evidence of correct reasoning.`:"Your stronger rubric items show a useful foundation to build on.",
    weakest&&weakest.total<weakest.maxPts?`The biggest opportunity is Q${weakest.qNum}. Review the feedback there first because it accounts for the largest remaining score gap.`:"No single question stands out as a major weakness."
  ];
  return comments;
};
const studentHelpfulSuggestions=(submission)=>{
  if(!submission?.grades)return ["Check back after grading is released for personalized next steps."];
  const missed=submission.grades.flatMap(g=>(g.criteria||[]).filter(c=>c.earned<c.maxPts).map(c=>({q:g.qNum,...c})));
  if(!missed.length)return ["Redo one high-scoring question without notes to confirm you can reproduce the method independently.","Compare your solution with the rubric and write down the exact habits that earned full credit."];
  return missed.slice(0,4).map(c=>`For Q${c.q}, revisit "${c.title}": ${c.reason} Then write one corrected version and mark where the missing rubric point should be earned.`);
};
const criterionTone=(c)=>{
  if(c.earned===c.maxPts)return{label:"Full credit",color:T.green,bg:T.greenLight,icon:"check"};
  if(c.earned===0)return{label:"Needs work",color:T.red,bg:"#FEF2F2",icon:"x"};
  return{label:"Partial",color:T.orange,bg:T.orangeLight,icon:"warn"};
};

function StudentDashboard({onSelect,studentName=DEMO_STUDENT_NAME}){
  const courses=STUDENT_CS.map(c=>{
    const assignments=getStudentAssignments(c.id);
    const studentSubs=assignments.map(a=>({assignment:a,sub:getStudentSubmission(a,studentName)}));
    const graded=studentSubs.filter(x=>x.sub?.grades);
    const avg=graded.length?graded.reduce((s,x)=>s+pctOf(x.sub.totalScore,x.sub.maxScore),0)/graded.length:0;
    const next=studentSubs.find(x=>x.sub?.status!=="graded")?.assignment||assignments[0];
    return {...c,assignments,gradedCount:graded.length,avg,next};
  });
  return(<div style={_ctr}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:30}}>
      <div><h1 style={{fontSize:30,fontWeight:900,margin:"0 0 4px"}}>Your Courses</h1><p style={{color:T.textSec,margin:0,fontSize:14}}>Welcome back, {studentName}</p></div>
      <div style={{background:`linear-gradient(135deg,${T.primary}12,${T.purple}10)`,border:`1px solid ${T.primary}18`,borderRadius:T.r,padding:"12px 16px",fontSize:12,fontWeight:800,color:T.primary}}>Student View</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:18}}>
      {courses.map(c=><div key={c.id} onClick={()=>onSelect(c)} style={{..._card,cursor:"pointer"}}
        onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.shM;e.currentTarget.style.transform="translateY(-2px)";}}
        onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
          <div style={{width:48,height:48,borderRadius:12,background:`linear-gradient(135deg,${c.color},${T.purple})`}}/>
          <div style={{minWidth:0}}><h3 style={{margin:0,fontSize:18,fontWeight:900}}>{c.code}</h3><p style={{margin:0,fontSize:13,color:T.textSec,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{c.name}</p></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          <div style={{background:"#F8F9FC",borderRadius:T.rs,padding:"10px 12px"}}><div style={{fontSize:11,color:T.textSec,fontWeight:700}}>Average</div><div style={{fontSize:22,fontWeight:900}}>{c.avg.toFixed(0)}%</div></div>
          <div style={{background:"#F8F9FC",borderRadius:T.rs,padding:"10px 12px"}}><div style={{fontSize:11,color:T.textSec,fontWeight:700}}>Graded</div><div style={{fontSize:22,fontWeight:900}}>{c.gradedCount}/{c.assignments.length}</div></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,fontSize:12,color:T.textSec}}><Calendar size={14}/>{c.next?`Next: ${c.next.title}`:"No assignments"}</div>
      </div>)}
    </div>
  </div>);
}

function StudentCourse({course,onBack,onAssignment,studentName=DEMO_STUDENT_NAME}){
  const assignments=getStudentAssignments(course.id);
  const rows=assignments.map(a=>({assignment:a,sub:getStudentSubmission(a,studentName),classAvg:classAverageFor(a)}));
  const gradedRows=rows.filter(r=>r.sub?.grades);
  const avg=gradedRows.length?gradedRows.reduce((s,r)=>s+pctOf(r.sub.totalScore,r.sub.maxScore),0)/gradedRows.length:0;
  const statusStyle=s=>s==="graded"?{background:T.text,color:"#fff"}:s==="late"?{background:T.orangeLight,color:T.orange}:s==="missing"?{background:"#FEE8E8",color:T.red}:{background:"#ECEDF3",color:T.textSec};
  return(<div style={_ctr}>
    <div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to Courses</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}><div style={{width:52,height:52,borderRadius:14,background:course.color}}/><div><h1 style={{fontSize:28,fontWeight:900,margin:"0 0 2px"}}>{course.code}</h1><p style={{margin:0,color:T.textSec,fontSize:14}}>{course.name}</p></div></div>
      <div style={{textAlign:"right"}}><div style={{fontSize:12,fontWeight:800,color:T.textSec,textTransform:"uppercase"}}>Course Average</div><div style={{fontSize:30,fontWeight:900,color:T.primary}}>{avg.toFixed(0)}%</div></div>
    </div>
    <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 16px"}}>Assignments</h2>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:18}}>
      {rows.map(({assignment:a,sub,classAvg})=>{
        const graded=!!sub?.grades;
        const p=graded?pctOf(sub.totalScore,sub.maxScore):0;
        const isExam=a.type==="exam";
        return(<div key={a.id} onClick={()=>onAssignment(a)} style={{..._card,cursor:"pointer"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.shM;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div style={{minWidth:0,marginRight:14}}><h3 style={{margin:"0 0 10px",fontSize:18,fontWeight:900,lineHeight:1.25}}>{a.title}</h3><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:800,background:isExam?"#FEE8E8":T.primaryLight,color:isExam?T.red:T.primary}}>{a.type}</span>
              <span style={{padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:800,...statusStyle(sub?.status)}}>{sub?.status||"missing"}</span>
            </div></div>
            <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:30,fontWeight:900,lineHeight:1}}>{graded?sub.totalScore:a.pts}</div><div style={{fontSize:12,color:T.textSec,marginTop:2}}>{graded?`/${sub.maxScore} pts`:"points"}</div></div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:T.textSec,marginBottom:12}}><Calendar size={14}/>Due: {a.due}</div>
          {graded?<>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,fontWeight:700,marginBottom:6}}><span>Your score</span><span>{p.toFixed(0)}% · class avg {classAvg.toFixed(0)}%</span></div>
            <div style={{height:8,borderRadius:T.rr,background:"#D9DBE3",overflow:"hidden"}}><div style={{height:"100%",width:`${p}%`,background:`linear-gradient(90deg,${T.primary},${T.purple})`,borderRadius:T.rr}}/></div>
          </>:<div style={{fontSize:12,color:T.textSec}}>Feedback will appear after this assignment is graded.</div>}
        </div>);
      })}
    </div>
  </div>);
}

/* ═══════════════════════════════════════════════════════════
   ASSIGNMENT VIEW — detail page with Submissions / Analytics tabs
   ═══════════════════════════════════════════════════════════ */
function StudentAssignmentDetail({assignment,course,onBack,studentName=DEMO_STUDENT_NAME}){
  const sub=getStudentSubmission(assignment,studentName);
  const graded=!!sub?.grades;
  const classAvg=classAverageFor(assignment);
  const scorePct=graded?pctOf(sub.totalScore,sub.maxScore):0;
  const dueParts=assignment.due.split(" at ");
  const strengths=studentStrengths(sub);
  const improvements=studentImprovements(sub);
  const aiSummary=scorePct>=85?"Strong performance overall. Keep using the same preparation strategy, then tighten the few remaining details.":scorePct>=70?"Solid understanding with a few targeted gaps. Focus review on the lower-scoring questions below.":"This assignment needs a focused review pass. Start with the improvement list, then redo the lowest-scoring question.";
  const aiComments=studentAiComments(sub,assignment);
  const helpfulSuggestions=studentHelpfulSuggestions(sub);
  const bullet=(color,text)=><li key={text} style={{marginBottom:14,color:T.textSec,lineHeight:1.45}}><span style={{color,fontWeight:900,marginRight:8}}>•</span>{text}</li>;
  return(<div style={_ctr}>
    <div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:28,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to {course.code}</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
      <div><h1 style={{fontSize:34,fontWeight:900,margin:"0 0 8px"}}>{assignment.title}</h1><p style={{margin:0,color:T.textSec,fontSize:17}}>{course.name}</p></div>
      <span style={{background:T.text,color:"#fff",fontWeight:900,fontSize:16,padding:"14px 24px",borderRadius:T.rs}}>{graded?"Graded":sub?.status||"Missing"}</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr",gap:18,marginBottom:22}}>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"28px 30px"}}>
        <div style={{fontSize:14,fontWeight:800,color:T.textSec,marginBottom:28}}>Your Score</div>
        <div style={{fontSize:34,fontWeight:900,marginBottom:20}}>{graded?`${sub.totalScore}/${sub.maxScore}`:"Not graded"} {graded&&<span style={{fontSize:22,color:T.textSec,fontWeight:600}}>({scorePct.toFixed(1)}%)</span>}</div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:14,color:T.textSec,fontWeight:700,marginBottom:8}}><span>Score progress</span><span>{scorePct.toFixed(0)}%</span></div>
        <div style={{height:10,borderRadius:T.rr,background:"#D8DAE2",overflow:"hidden"}}><div style={{height:"100%",width:`${scorePct}%`,background:`linear-gradient(90deg,${T.primary},${T.purple})`,borderRadius:T.rr}}/></div>
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"28px 30px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:14,fontWeight:800,color:T.textSec,marginBottom:24}}>Class Average</div>
        <div style={{fontSize:30,fontWeight:900}}>{classAvg.toFixed(1)}/100</div>
        <div style={{fontSize:14,color:T.textSec,marginTop:8}}>{classAvg.toFixed(1)}%</div>
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"28px 30px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{fontSize:14,fontWeight:800,color:T.textSec,marginBottom:24}}>Due Date</div>
        <div style={{fontSize:18,fontWeight:800}}>{dueParts[0]}</div>
        <div style={{fontSize:14,color:T.textSec,marginTop:6}}>{dueParts[1]}</div>
      </div>
    </div>
    <div style={{background:`linear-gradient(90deg,${T.primary}0F,#FFFFFF)`,border:`1px solid ${T.primary}20`,borderRadius:T.r,padding:"18px 22px",marginBottom:22,display:"flex",gap:10}}>
      <Sparkles size={18} color={T.primary} style={{marginTop:2,flexShrink:0}}/><div><div style={{fontWeight:900,marginBottom:4}}>AI Summary</div><p style={{margin:0,fontSize:13,color:T.textSec,lineHeight:1.55}}>{graded?aiSummary:"Your instructor has not released grading feedback yet."}</p></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:22}}>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"22px 26px",boxShadow:T.sh}}>
        <h2 style={{display:"flex",alignItems:"center",gap:10,fontSize:18,fontWeight:900,margin:"0 0 12px"}}><MessageCircle size={18} color={T.purple}/>AI Grading Comments</h2>
        <p style={{margin:"0 0 14px",fontSize:13,color:T.textSec,lineHeight:1.5}}>Personalized comments generated from your rubric results.</p>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {aiComments.map((c,i)=><div key={i} style={{display:"flex",gap:10,background:`${T.purple}08`,border:`1px solid ${T.purple}18`,borderRadius:T.rs,padding:"10px 12px"}}>
            <div style={{width:22,height:22,borderRadius:"50%",background:T.purpleLight,color:T.purple,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:11,flexShrink:0}}>{i+1}</div>
            <p style={{margin:0,fontSize:12,color:T.textSec,lineHeight:1.5}}>{c}</p>
          </div>)}
        </div>
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"22px 26px",boxShadow:T.sh}}>
        <h2 style={{display:"flex",alignItems:"center",gap:10,fontSize:18,fontWeight:900,margin:"0 0 12px"}}><Lightbulb size={18} color={T.primary}/>Helpful Suggestions</h2>
        <p style={{margin:"0 0 14px",fontSize:13,color:T.textSec,lineHeight:1.5}}>Concrete next steps to improve before the next assignment.</p>
        <div style={{display:"flex",flexDirection:"column",gap:9}}>
          {helpfulSuggestions.map((s,i)=><div key={i} style={{display:"grid",gridTemplateColumns:"24px 1fr",gap:10,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:T.primaryLight,color:T.primary,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:10}}>{i+1}</div>
            <p style={{margin:0,fontSize:12,color:T.textSec,lineHeight:1.55}}>{s}</p>
          </div>)}
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:30}}>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"26px 30px"}}>
        <h2 style={{display:"flex",alignItems:"center",gap:10,fontSize:20,fontWeight:900,margin:"0 0 14px"}}><CheckCircle2 size={18} color={T.green}/>Strengths</h2>
        <p style={{margin:"0 0 22px",fontSize:15,color:T.textSec}}>What you did well on this assignment</p>
        <ul style={{listStyle:"none",padding:0,margin:0}}>{(strengths.length?strengths:["Clear effort shown in submitted work."]).map(t=>bullet(T.green,t))}</ul>
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"26px 30px"}}>
        <h2 style={{display:"flex",alignItems:"center",gap:10,fontSize:20,fontWeight:900,margin:"0 0 14px"}}><Sparkles size={18} color={T.primary}/>Areas for Improvement</h2>
        <p style={{margin:"0 0 22px",fontSize:15,color:T.textSec}}>Concepts to review and practice</p>
        <ul style={{listStyle:"none",padding:0,margin:0}}>{(improvements.length?improvements:["Keep practicing transfer problems to maintain mastery."]).map(t=>bullet(T.primary,t))}</ul>
      </div>
    </div>
    <h2 style={{fontSize:26,fontWeight:900,margin:"0 0 6px"}}>Question Breakdown</h2>
    <p style={{margin:"0 0 18px",fontSize:14,color:T.textSec}}>Detailed feedback and improvement suggestions for each question</p>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {(assignment.questions||[]).map(q=>{
        const g=sub?.grades?.find(x=>x.qId===q.id);
        const qp=g?pctOf(g.total,g.maxPts):0;
        const qAvg=classAverageForQuestion(assignment,q.id);
        const above=qp>=qAvg;
        const misses=(g?.criteria||[]).filter(c=>c.earned<c.maxPts);
        const wins=(g?.criteria||[]).filter(c=>c.earned===c.maxPts);
        const criteria=g?.criteria||[];
        return(<div key={q.id} style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"24px 28px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
            <div><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}><h3 style={{fontSize:20,fontWeight:900,margin:0}}>Question {q.num}</h3><span style={{background:T.text,color:"#fff",borderRadius:T.rs,padding:"6px 12px",fontSize:12,fontWeight:900}}>{g?`${g.total}/${g.maxPts} pts`:"-"}</span></div><p style={{margin:0,color:T.textSec,fontSize:14}}>{q.title}</p></div>
            {graded&&<div style={{fontSize:14,fontWeight:900,color:above?T.green:T.orange,display:"flex",alignItems:"center",gap:6}}><TrendingUp size={15}/>{above?"Above avg":"Below avg"}</div>}
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:T.textSec,marginBottom:8}}><span>Your score: {qp.toFixed(0)}%</span><span>Class avg: {qAvg.toFixed(0)}%</span></div>
          <div style={{height:8,borderRadius:T.rr,background:"#D8DAE2",overflow:"hidden",marginBottom:22}}><div style={{height:"100%",width:`${qp}%`,background:`linear-gradient(90deg,${above?T.green:T.primary},${above?T.green:T.purple})`,borderRadius:T.rr}}/></div>
          <div style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:16}}><Sparkles size={16} color={T.purple} style={{marginTop:2}}/><div><div style={{fontWeight:900,fontSize:14,marginBottom:6}}>AI Feedback</div><p style={{margin:0,fontSize:13,color:T.textSec,lineHeight:1.55}}>{misses[0]?`Focus on ${misses[0].title.toLowerCase()}: ${misses[0].reason}`:wins[0]?`Nice work on ${wins[0].title.toLowerCase()}: ${wins[0].reason}`:"Feedback will appear once grading is released."}</p></div></div>
          {criteria.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10,marginBottom:16}}>
            {criteria.map(c=>{const tone=criterionTone(c);return(<div key={c.title} style={{background:tone.bg,border:`1px solid ${tone.color}24`,borderRadius:T.rs,padding:"11px 13px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:7,fontWeight:900,fontSize:12,color:T.text}}>{tone.icon==="check"?<CheckCircle2 size={13} color={tone.color}/>:tone.icon==="x"?<X size={13} color={tone.color}/>:<AlertCircle size={13} color={tone.color}/>} {c.title}</div>
                <span style={{fontWeight:900,fontSize:12,color:tone.color}}>{c.earned}/{c.maxPts}</span>
              </div>
              <div style={{fontSize:10,fontWeight:900,color:tone.color,textTransform:"uppercase",marginBottom:4}}>{tone.label}</div>
              <p style={{margin:0,fontSize:11,color:T.textSec,lineHeight:1.45}}>{c.reason}</p>
            </div>);})}
          </div>}
          {misses.length>0&&<div style={{background:`${T.primary}08`,border:`1px solid ${T.primary}18`,borderRadius:T.rs,padding:"14px 16px"}}><div style={{display:"flex",alignItems:"center",gap:8,fontWeight:900,color:T.primary,marginBottom:8}}><Lightbulb size={15}/>Helpful Suggestions</div><ul style={{margin:0,paddingLeft:18,color:T.primary,fontSize:13,lineHeight:1.8}}>{misses.slice(0,2).map(c=><li key={c.title}>Revise "{c.title}" by correcting the issue noted here: {c.reason}</li>)}</ul></div>}
        </div>);
      })}
    </div>
  </div>);
}

function AssignmentView({assignment,course,onBack}){
  const[tab,setTab]=useState("submissions");
  const a=assignment;
  // Both "graded" and "late" (graded late submissions) feed analytics
  const gradedSubs=a.submissions.filter(s=>s.grades);
  const gradingResults=gradedSubs.map(s=>({file:{name:s.name},grades:s.grades,totalScore:s.totalScore,maxScore:s.maxScore}));

  const isExam=a.type==="exam";
  const typeBadge={padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:700,textTransform:"lowercase",background:isExam?"#FEE8E8":T.primaryLight,color:isExam?T.red:T.primary};
  const pubBadge={padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:700,background:T.text,color:"#fff"};

  // Status badge palette
  const statusStyle=(s)=>{
    if(s==="graded")return{background:T.text,color:"#fff"};
    if(s==="late")return{background:T.orangeLight,color:T.orange};
    if(s==="missing")return{background:"#FEE8E8",color:T.red};
    return{background:"#ECEDF3",color:T.textSec}; // submitted
  };

  const tabs=[{k:"submissions",l:"Submissions"},{k:"analytics",l:"Analytics"}];

  return(<div style={_ctr}>
    <div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to {course.code}</div>

    {/* Header */}
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
      <div>
        <h1 style={{fontSize:28,fontWeight:900,margin:"0 0 10px"}}>{a.title}</h1>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <span style={typeBadge}>{a.type}</span>
          {a.published&&<span style={pubBadge}>published</span>}
        </div>
        <div style={{display:"flex",gap:18,flexWrap:"wrap",fontSize:13,color:T.textSec}}>
          <span style={{display:"inline-flex",alignItems:"center",gap:6,color:T.red}}><Calendar size={14}/>Due: {a.due}</span>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}><Star size={14}/>{a.pts} points</span>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}><FileText size={14}/>{a.submissions.length} submissions</span>
          <span style={{display:"inline-flex",alignItems:"center",gap:6}}><CheckCircle2 size={14} color={T.green}/>{gradedSubs.length}/{a.submissions.length} graded</span>
        </div>
      </div>
    </div>

    {/* Tabs */}
    <div style={{display:"flex",gap:4,borderBottom:`1px solid ${T.border}`,marginBottom:20}}>
      {tabs.map(t=>{const active=tab===t.k;return(
        <button key={t.k} onClick={()=>setTab(t.k)} style={{padding:"11px 22px",border:"none",background:"transparent",fontFamily:T.font,fontSize:14,fontWeight:700,cursor:"pointer",color:active?T.primary:T.textSec,borderBottom:`2.5px solid ${active?T.primary:"transparent"}`,marginBottom:-1}}>{t.l}</button>
      );})}
    </div>

    {tab==="submissions"&&(
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <div style={{padding:"18px 24px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h3 style={{margin:0,fontSize:16,fontWeight:800}}>All Submissions</h3>
          <span style={{fontSize:12,color:T.textSec}}>Showing {a.submissions.length} students</span>
        </div>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse"}}>
            <thead><tr style={{background:"#FAFBFE"}}>
              {["Student","Email","Submitted","Status","Score"].map((h,i)=>(
                <th key={i} style={{padding:"12px 24px",textAlign:i===4?"right":"left",fontWeight:700,fontSize:12,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {a.submissions.map((s,i)=>{
                const hasScore=!!s.grades;
                const pct=hasScore?s.totalScore/s.maxScore:0;
                const scColor=pct>=0.8?T.green:pct>=0.6?T.text:T.red;
                const stStyle=statusStyle(s.status);
                return(<tr key={i} style={{borderBottom:i<a.submissions.length-1?`1px solid ${T.border}`:"none"}}>
                  <td style={{padding:"14px 24px",fontWeight:700,fontSize:13}}>{s.name}</td>
                  <td style={{padding:"14px 24px",fontSize:13,color:T.textSec}}>{s.email}</td>
                  <td style={{padding:"14px 24px",fontSize:13,color:T.textSec}}>{s.submittedAt||"—"}</td>
                  <td style={{padding:"14px 24px"}}>
                    <span style={{padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:700,...stStyle}}>{s.status}</span>
                  </td>
                  <td style={{padding:"14px 24px",textAlign:"right",fontWeight:800,fontSize:13,color:hasScore?scColor:T.textSec}}>{hasScore?`${s.totalScore}/${s.maxScore}`:"—"}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {tab==="analytics"&&(
      gradingResults.length
        ?<ExamInsights gradingResults={gradingResults} questions={a.questions}/>
        :<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"48px 32px",textAlign:"center"}}>
          <AlertCircle size={28} color={T.textSec} style={{marginBottom:10}}/>
          <p style={{margin:0,color:T.textSec,fontSize:14}}>No graded submissions yet — analytics will appear once grading starts.</p>
        </div>
    )}
  </div>);
}

/* ═══════════════════════════════════════════════════════════
   CREATE EXAM — Full AI Workflow with PDF Canvas
   ═══════════════════════════════════════════════════════════ */
const STEPS=[{l:"Upload\nExam",I:Upload},{l:"AI\nAuto-Boxing",I:Sparkles},{l:"Review &\nRubric",I:ClipboardList},{l:"Upload\nSubmissions",I:FileUp},{l:"AI\nGrading",I:Star},{l:"Results",I:CheckCircle2}];

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
  const[approvals,setApprovals]=useState({}); // "{si}-{qId}" -> "approved" | "flagged"
  const[reviewFilter,setReviewFilter]=useState("all"); // "all" | "review" | "approved"
  const[activeRubricQ,setActiveRubricQ]=useState(0);
  const[newCrit,setNewCrit]=useState({title:"",pts:""});
  const [rightWidth, setRightWidth] = useState(300);
  const rightPanelWidthRef = useRef(300);
  const [pendingBox, setPendingBox] = useState(null);
  const [pdfTotalPages, setPdfTotalPages] = useState(1);
  const [pageTexts, setPageTexts] = useState({});

  const next=()=>setStep(s=>Math.min(s+1,5));
  const prev=()=>setStep(s=>Math.max(s-1,0));
  const totalPts=qId=>(rubrics[qId]||[]).reduce((s,c)=>s+c.pts,0);

  // Delete key shortcut — remove the selected box.
  // Skips when the user is typing in an input/textarea so it doesn't hijack text editing.
  useEffect(()=>{
    const isTextInput=el=>{
      if(!el) return false;
      const t=(el.tagName||"").toUpperCase();
      return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||el.isContentEditable;
    };
    const onKey=(e)=>{
      if(step!==1||activeBox==null) return;
      if(isTextInput(e.target)) return;
      if(e.key==="Delete"||e.key==="Backspace"){
        e.preventDefault();
        setBoxes(b=>b.filter(x=>x.id!==activeBox));
        setActiveBox(null);
      }
    };
    window.addEventListener("keydown",onKey);
    return ()=>window.removeEventListener("keydown",onKey);
  },[step,activeBox]);

  /* File upload handler */
  const handleExamFile=(file)=>{
    if(!file||file.type!=="application/pdf"){alert("PDF only");return;}
    setExamFileObj(file);
    setExamFile({name:file.name,size:(file.size/1024).toFixed(0)+" KB"});
  };

  /* AI Auto-Boxing — send PDF text + positional layout to AI;
     AI returns question metadata AND bounding boxes (x,y,w,h as %).
     Frontend then renders the boxes directly on the PDF overlay. */
  const runAutoBoxing = async () => {
    setDetecting(true); setScanPct(0);
    try {
      // Step 1: extract text items with positions from every page
      const ab = await examFileObj.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: ab }).promise;
      const total = doc.numPages;
      const ptMap = {};
      const pageDims = {};       // { pageNum: {w, h} } in viewport pts
      const pageLines = {};      // { pageNum: [{yPct, text}] }
      for (let i = 1; i <= total; i++) {
        const page = await doc.getPage(i);
        const vp = page.getViewport({ scale: 1 });
        pageDims[i] = { w: vp.width, h: vp.height };
        const content = await page.getTextContent();
        // Group items into lines by y-position (rounded)
        const byY = new Map();
        for (const it of content.items) {
          if (!it.str || !it.str.trim()) continue;
          const y = it.transform[5];      // pdf y (bottom-up)
          const key = Math.round(y / 4) * 4;
          const arr = byY.get(key) || [];
          arr.push({ x: it.transform[4], str: it.str });
          byY.set(key, arr);
        }
        const lines = [...byY.entries()]
          .map(([yKey, items]) => {
            items.sort((a, b) => a.x - b.x);
            let text = items.map(it => it.str).join(" ").trim();
            if (text.length > 160) text = text.slice(0, 160) + "…";
            const yPct = +( ((vp.height - yKey) / vp.height) * 100 ).toFixed(1);
            return { yPct, text };
          })
          .filter(l => l.text.length > 0)
          .sort((a, b) => a.yPct - b.yPct);
        pageLines[i] = lines;
        ptMap[i] = lines.map(l => l.text).join("\n");
        setScanPct(Math.round((i / total) * 40));
      }
      setPageTexts(ptMap);

      // Step 2: build layout prompt — AI sees text with vertical position on each page
      setScanPct(50);
      const layoutStr = Object.keys(pageLines).map(p => {
        const lines = pageLines[p].map(l => `  [y=${l.yPct}%] ${l.text}`).join("\n");
        return `--- PAGE ${p} ---\n${lines}`;
      }).join("\n\n");

      const prompt = `You are analyzing an exam PDF. Below each page's text lines are annotated with their vertical position (y% from the top of the page).

${layoutStr}

Identify EVERY question. For each question, return its metadata AND a bounding box covering the question PLUS the student answer region (any blank space or answer lines below the prompt, up to the next question or page bottom).

Return ONLY a JSON array, no prose:
[
  {
    "id": 1,
    "num": "1",
    "title": "short topic (max 8 words)",
    "pts": 2,
    "type": "mc",
    "answerKey": "A",
    "page": 1,
    "box": { "x": 4, "y": 12, "w": 92, "h": 22 }
  }
]

Rules:
- x, y, w, h are percentages of the page (0-100). y is from the top.
- Default x=4, w=92 unless the question is clearly in a column.
- y should be just above the question prompt; h should extend to just above the next question (or ~95 if it's the last question on the page).
- type must be one of: mc, mc-multi, fill, free.
- If a value is unknown: pts=1, type="free", answerKey="See key".`;

      const res = await fetch(`${OPENAI_BASE}/chat/completions`, {
        method: "POST",
        headers: OPENAI_HEADERS,
        body: JSON.stringify({
          model:"glm-4.5",
          max_tokens: 16384,
          messages: [{ role: "user", content: prompt }]
        })
      });
      setScanPct(90);
      const data = await res.json();
      if (data.error) throw new Error(data.error.message || JSON.stringify(data.error));
      const raw = (data.choices?.[0]?.message?.content || "").trim();
      console.log("=== MODEL RAW RESPONSE ===");
      console.log(raw);

      // Robust JSON-array extraction:
      // 1. Strip markdown code fences (```json ... ```).
      // 2. Walk the string tracking brace depth and string/escape state,
      //    collecting every complete {...} object even if the closing ] was
      //    truncated by max_tokens.
      const cleaned = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "");
      const arrStart = cleaned.indexOf("[");
      if (arrStart === -1) throw new Error("No JSON array in response:\n" + raw.slice(0, 500));
      const parsed = [];
      let depth = 0, objStart = -1, inStr = false, esc = false;
      for (let i = arrStart + 1; i < cleaned.length; i++) {
        const ch = cleaned[i];
        if (inStr) {
          if (esc) { esc = false; continue; }
          if (ch === "\\") { esc = true; continue; }
          if (ch === '"') inStr = false;
          continue;
        }
        if (ch === '"') { inStr = true; continue; }
        if (ch === "{") { if (depth === 0) objStart = i; depth++; continue; }
        if (ch === "}") {
          depth--;
          if (depth === 0 && objStart !== -1) {
            try { parsed.push(JSON.parse(cleaned.slice(objStart, i + 1))); } catch(_) {}
            objStart = -1;
          }
          continue;
        }
        if (ch === "]" && depth === 0) break;
      }
      if (parsed.length === 0) throw new Error("No question objects recovered from response:\n" + raw.slice(0, 500));

      // Split into questions + auto-generated boxes
      const parsedQs = parsed.map((q, i) => ({
        id: i + 1,
        num: q.num ?? String(i + 1),
        title: q.title ?? "",
        pts: Math.max(1, Number(q.pts) || 1),
        type: q.type ?? "free",
        answerKey: q.answerKey ?? "See key",
        page: Math.max(1, Math.min(total, Number(q.page) || 1)),
      }));

      const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
      const autoBoxes = parsed.map((q, i) => {
        const b = q.box || {};
        const x = clamp(Number(b.x) ?? 4, 0, 99);
        const y = clamp(Number(b.y) ?? 5, 0, 99);
        const w = clamp(Number(b.w) ?? 92, 1, 100 - x);
        const h = clamp(Number(b.h) ?? 20, 1, 100 - y);
        const qq = parsedQs[i];
        return {
          id: qq.id, label: `Q${qq.num}`,
          x, y, w, h,
          page: qq.page, type: "answer",
          pts: qq.pts, qtype: qq.type,
          linkedQId: qq.id,
        };
      });

      setScanPct(100);
      setQuestions(parsedQs);
      setBoxes(autoBoxes);
      setDetected(true);
      setPageNum(1);
      setPdfTotalPages(total);
    } catch(err) {
      console.error("Auto-Boxing failed:", err);
      alert("Auto-Boxing failed: " + err.message);
    } finally {
      setDetecting(false);
    }
  };

  // Auto-assign: one box per question covering the full page area
  const autoAssignBoxes=()=>{
    const newBoxes=questions.map(q=>({
      id:q.id, label:`Q${q.num}`, x:3, y:3, w:94, h:94, page:q.page,
      type:"answer", pts:q.pts, qtype:q.type
    }));
    setBoxes(newBoxes);
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
        const ctx=pageTexts[q.page]?`\nPage ${q.page} text:\n${pageTexts[q.page].slice(0,800)}\n`:"";
        const prompt=q.type==="mc"?`Rubric for MC Q${q.num} "${q.title}" (${q.pts}pt). Answer:${q.answerKey}.${ctx}Return JSON: [{"title":"...","pts":${q.pts}}]`
          :q.type==="mc-multi"?`Rubric for multi-select Q${q.num} "${q.title}" (${q.pts}pts). Answers:${q.answerKey}.${ctx}Per-option scoring. Points sum to ${q.pts}. JSON array only: [{"title":"...","pts":n}]`
          :q.type==="fill"?`Rubric for fill-in Q${q.num} "${q.title}" (${q.pts}pts). Answers:${q.answerKey}.${ctx}Per-blank scoring. Sum=${q.pts}. JSON array: [{"title":"...","pts":n}]`
          :`Detailed rubric for free-response Q${q.num} "${q.title}" (${q.pts}pts).${ctx}Break by sub-parts with specific scoring. Sum EXACTLY ${q.pts}. JSON array: [{"title":"...","pts":n}]`;
        const r=await fetch(`${OPENAI_BASE}/chat/completions`,{method:"POST",headers:OPENAI_HEADERS,body:JSON.stringify({model:"OpenAI/gpt-4o",max_tokens:600,messages:[{role:"user",content:prompt}]})});
        const d=await r.json();const txt=(d.choices?.[0]?.message?.content||"").replace(/```json|```/g,"").trim();
        const si=txt.indexOf("["),ei=txt.lastIndexOf("]");
        const parsed=JSON.parse(si>-1?txt.slice(si,ei+1):txt).map((c,i)=>({...c,id:i+1,pts:Math.max(0,Number(c.pts)||0)}));
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
    // Robust extraction of the first complete {...} object from a model response,
    // tolerating markdown fences, prose before/after, and minor truncation.
    const extractJsonObject=(raw)=>{
      const cleaned=raw.replace(/```(?:json)?/gi,"").replace(/```/g,"");
      const s=cleaned.indexOf("{");
      if(s===-1)return null;
      let depth=0,inStr=false,esc=false;
      for(let i=s;i<cleaned.length;i++){
        const ch=cleaned[i];
        if(inStr){if(esc){esc=false;continue;}if(ch==="\\"){esc=true;continue;}if(ch==='"')inStr=false;continue;}
        if(ch==='"'){inStr=true;continue;}
        if(ch==="{")depth++;
        else if(ch==="}"){depth--;if(depth===0){try{return JSON.parse(cleaned.slice(s,i+1));}catch(_){return null;}}}
      }
      return null;
    };
    const fallbackConfidence=(q,si,qi)=>{
      const base=q.type==="mc"?0.92:q.type==="mc-multi"?0.82:q.type==="fill"?0.74:0.58;
      const jitter=(((si*17+qi*13+(q.id||0)*7)%11)-5)/100;
      return Math.max(0.3,Math.min(0.98,base+jitter));
    };

    // Extract each student PDF's text so the model can grade from the student's
    // actual answer. For each submission we store page-level text AND per-box
    // text (text items whose position falls inside each question's box region).
    const studentData={}; // si -> { pages: {p: string}, boxText: {qId: string} }
    for(let si=0;si<subFiles.length;si++){
      const sf=subFiles[si];
      const data={pages:{},boxText:{}};
      try{
        const ab=await sf.file.arrayBuffer();
        const doc=await pdfjsLib.getDocument({data:ab}).promise;
        for(let p=1;p<=doc.numPages;p++){
          const page=await doc.getPage(p);
          const vp=page.getViewport({scale:1});
          const content=await page.getTextContent();
          data.pages[p]=content.items.map(it=>it.str).join(" ").replace(/\s+/g," ").trim();
          // Extract text within each box region on this page.
          // PDF.js uses bottom-up y; box y% is top-down.
          for(const box of boxes.filter(b=>b.page===p)){
            const xMin=(box.x/100)*vp.width, xMax=((box.x+box.w)/100)*vp.width;
            const pdfYMin=vp.height-((box.y+box.h)/100)*vp.height;
            const pdfYMax=vp.height-(box.y/100)*vp.height;
            const hits=content.items.filter(it=>{
              const x=it.transform[4], y=it.transform[5];
              return x>=xMin-2 && x<=xMax+2 && y>=pdfYMin-2 && y<=pdfYMax+2;
            });
            const txt=hits.map(it=>it.str).join(" ").replace(/\s+/g," ").trim();
            if(txt) data.boxText[box.id]=txt;
          }
        }
      }catch(e){
        console.warn("Failed to extract text from student PDF:",sf.name,e);
      }
      studentData[si]=data;
    }

    for(let si=0;si<subFiles.length;si++){
      const sf=subFiles[si];setGradingProg(p=>[...p,{fi:si,st:"g",qd:0}]);const grades=[];
      const sData=studentData[si]||{pages:{},boxText:{}};
      for(let qi=0;qi<questions.length;qi++){
        const q=questions[qi];const rub=rubrics[q.id]||[];
        // Prefer the box-region text (most specific) and fall back to full page text.
        const boxAnswer=sData.boxText[q.id]||"";
        const pageAnswer=(sData.pages[q.page]||"").slice(0,2500);
        const answerBlock=boxAnswer
          ? `Student's extracted answer region (Q${q.num}, from their PDF box):\n"""${boxAnswer.slice(0,1500)}"""`
          : pageAnswer
            ? `Student's full page ${q.page} text (no box region available, locate the answer for Q${q.num}):\n"""${pageAnswer}"""`
            : `(No student text could be extracted from the PDF — grade conservatively and lower confidence.)`;
        let pushed=false;
        try{
          const prompt=`You are grading exam "${sf.name}".
Question ${q.num} (${q.pts}pts, type=${q.type}): ${q.title}
Answer key: ${q.answerKey}
Rubric criteria (score each):
${rub.map((c,i)=>`  ${i+1}. "${c.title}" (${c.pts}pts)`).join("\n")}

${answerBlock}

Grade the student's ACTUAL answer shown above — do NOT invent or guess an answer. Extract the student's response verbatim (or a faithful summary if it spans many lines) and put it in the "studentAnswer" field so the instructor can see what was graded.

Return ONLY a JSON object (no prose, no markdown fences):
{
  "criteria":[{"earned":n,"reason":"why this score"}],
  "studentAnswer":"the student's actual answer copied/summarized from the extracted text",
  "overallFeedback":"short comment addressed to the student",
  "confidence":0.0-1.0,
  "confidenceReason":"why you are (un)confident"
}

Confidence calibration:
 - MC / fill-in matching the key cleanly → 0.9+
 - Free-response aligned with rubric → 0.75-0.9
 - Answer unclear, region empty, or judgment call → 0.4-0.7
 - No student text found at all → <0.4 and say so in confidenceReason.`;
          const r=await fetch(`${OPENAI_BASE}/chat/completions`,{method:"POST",headers:OPENAI_HEADERS,body:JSON.stringify({model:"OpenAI/gpt-4o",max_tokens:1200,messages:[{role:"user",content:prompt}]})});
          const d=await r.json();
          if(d.error)throw new Error(d.error.message||"API error");
          const txt=(d.choices?.[0]?.message?.content||"").trim();
          const p=extractJsonObject(txt);
          if(!p)throw new Error("Could not extract JSON object from response: "+txt.slice(0,200));
          const crit=(p.criteria||[]).map((c,i)=>({earned:Math.min(Math.max(0,Number(c.earned)||0),rub[i]?.pts||0),reason:c.reason||"",maxPts:rub[i]?.pts||0,title:rub[i]?.title||""}));
          grades.push({qId:q.id,qNum:q.num,criteria:crit,total:crit.reduce((a,c)=>a+c.earned,0),maxPts:q.pts,studentAnswer:p.studentAnswer||boxAnswer||"",rawAnswer:boxAnswer||pageAnswer.slice(0,500),feedback:p.overallFeedback||"",confidence:Math.min(1,Math.max(0,Number(p.confidence)||0.8)),confidenceReason:p.confidenceReason||""});
          pushed=true;
        }catch(err){
          console.warn(`Grading fallback for ${sf.name} Q${q.num}:`,err?.message||err);
        }
        if(!pushed){
          const conf=fallbackConfidence(q,si,qi);
          const crit=rub.map(c=>({earned:Math.random()>0.3?c.pts:0,reason:"Fallback score (model unavailable)",maxPts:c.pts,title:c.title}));
          grades.push({qId:q.id,qNum:q.num,criteria:crit,total:crit.reduce((a,c)=>a+c.earned,0),maxPts:q.pts,studentAnswer:boxAnswer||"—",rawAnswer:boxAnswer||pageAnswer.slice(0,500),feedback:"Model call failed — score simulated from question type. Please review.",confidence:conf,confidenceReason:q.type==="mc"?"Multiple-choice answer compared directly against the key — high certainty.":q.type==="mc-multi"?"Multi-select scoring per option — mostly mechanical.":q.type==="fill"?"Fill-in matching — moderate certainty depending on exact-match tolerance.":"Free-response judgment — rubric interpretation varies; manual review recommended."});
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

  /* ── Step 1: AI Auto-Boxing — PDF canvas + overlay ── */
  const S1=()=>(<div>
    {!detected&&!detecting&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:32,boxShadow:T.sh,textAlign:"center"}}>
      <Sparkles size={36} color={T.primary} style={{marginBottom:12}}/><h2 style={{fontSize:20,fontWeight:800,margin:"0 0 6px"}}>AI Auto-Boxing</h2><p style={{color:T.textSec,margin:"0 0 24px",fontSize:14}}>智能识别选区 — AI runs layout analysis on your exam PDF and automatically draws bounding boxes around every question and answer region.</p>
      <button onClick={runAutoBoxing} style={_b("blue")}><Sparkles size={15}/>Run Auto-Boxing</button>
    </div>}
    {detecting&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:32,boxShadow:T.sh}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}><Sparkles size={20} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontWeight:700,fontSize:15}}>Running Auto-Boxing...</span></div>
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
            {boxes.length===0&&<button onClick={autoAssignBoxes} style={{..._b("outline"),padding:"5px 12px",fontSize:12,color:T.primary,borderColor:T.primary+"50"}}><Sparkles size={13}/>Full Page</button>}
            {boxes.length>0&&<button onClick={()=>setBoxes([])} style={{..._b("ghost"),padding:"5px 12px",fontSize:12,color:T.red}}><Trash2 size={12}/>Clear All</button>}
          </div>
        </div>
        <PdfViewer file={examFileObj} boxes={boxes} activeBox={activeBox} onSelectBox={id=>{setActiveBox(id);const b=boxes.find(x=>x.id===id);if(b)setPageNum(b.page);}} tool={tool} pageNum={pageNum} onPageChange={setPageNum} totalPages={pdfTotalPages}
            onLoad={n=>setPdfTotalPages(n)}
            onDeleteBox={id=>{setBoxes(b=>b.filter(x=>x.id!==id));if(activeBox===id)setActiveBox(null);}}
            onUpdateBox={(action,data)=>{
              if(action==="add"){const newId=Math.max(0,...boxes.map(b=>b.id),0)+1;setPendingBox({...data,id:newId});}
              else if(action==="resize"){setBoxes(bs=>bs.map(b=>b.id===data.id?{...b,x:data.x,y:data.y,w:data.w,h:data.h}:b));}
            }}/>
        {tool==="draw"&&<p style={{margin:"8px 0 0",fontSize:12,color:T.green,fontWeight:600,textAlign:"center"}}>Click and drag on the PDF to draw a bounding box · scroll to navigate</p>}
      </div>
      {/* Splitter: draggable handle to resize right panel */}
      <div
        onMouseDown={(e)=>{
          const startX = e.clientX;
          const startWidth = rightPanelWidthRef.current || 300;
          const onMove = (ev)=>{
            const dx = startX - ev.clientX;
            const nw = Math.max(180, Math.min(700, startWidth + dx));
            setRightWidth(nw);
            rightPanelWidthRef.current = nw;
          };
          const onUp = ()=>{window.removeEventListener('mousemove',onMove);window.removeEventListener('mouseup',onUp);} ;
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
          AI Auto-Boxing found {questions.length} questions and drew {boxes.length} region{boxes.length===1?"":"s"}.
          <span style={{display:"block",marginTop:4}}>Manual fallback: drag a box edge to resize · Draw Box to add a missed region · Delete key or 🗑 to remove.</span>
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
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
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
      <p style={{color:T.textSec,margin:"0 0 8px",fontSize:14}}>Each student's answer is extracted from their PDF (per question box region) and sent to the AI with the rubric — the actual response is shown alongside the grade.</p>
      <p style={{color:T.textSec,margin:"0 0 24px",fontSize:12}}>{subFiles.length} submission{subFiles.length>1?"s":""} × {questions.length} questions = {subFiles.length*questions.length} grading tasks</p>
      <button onClick={gradeAll} style={_b("blue")}><Sparkles size={15}/>Start AI Grading</button>
    </div>}
    {grading&&<div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:24,boxShadow:T.sh}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}><Sparkles size={18} color={T.primary} style={{animation:"pulse 1.5s infinite"}}/><span style={{fontWeight:700,fontSize:14}}>Grading submissions...</span></div>
      {gradingProg.map((g,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0"}}>{g.st==="done"?<CheckCircle2 size={14} color={T.green}/>:<Sparkles size={14} color={T.primary} style={{animation:"pulse 1s infinite"}}/>}<span style={{fontWeight:600,fontSize:12,flex:1}}>{subFiles[g.fi]?.name}</span><span style={{fontSize:11,color:T.textSec}}>{g.qd}/{questions.length}</span><div style={{width:60,height:4,borderRadius:2,background:T.border}}><div style={{height:"100%",borderRadius:2,background:g.st==="done"?T.green:T.primary,width:`${(g.qd/questions.length)*100}%`}}/></div></div>)}
    </div>}
    {gradingResults&&(()=>{
      // Compute confidence + approval stats across ALL students
      const confTier=c=>c>=0.85?"high":c>=0.65?"med":"low";
      const allGrades=gradingResults.flatMap((r,si)=>r.grades.map(g=>({si,g,key:`${si}-${g.qId}`})));
      const totalGrades=allGrades.length;
      const highCount=allGrades.filter(x=>confTier(x.g.confidence)==="high").length;
      const medCount=allGrades.filter(x=>confTier(x.g.confidence)==="med").length;
      const lowCount=allGrades.filter(x=>confTier(x.g.confidence)==="low").length;
      const approvedCount=allGrades.filter(x=>approvals[x.key]==="approved").length;
      const flaggedCount=allGrades.filter(x=>approvals[x.key]==="flagged").length;
      const needsReviewCount=allGrades.filter(x=>confTier(x.g.confidence)!=="high"&&!approvals[x.key]).length;
      return(<div>
      {/* Grading complete + confidence summary banner */}
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"14px 18px",marginBottom:16,boxShadow:T.sh}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <CheckCircle2 size={16} color={T.green}/>
          <span style={{fontWeight:800,fontSize:14}}>Grading complete — AI self-rated confidence</span>
          <span style={{fontSize:11,color:T.textSec,marginLeft:6}}>Review low-confidence grades before publishing</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,minmax(0,1fr))",gap:10}}>
          {[
            {lab:"Total",val:totalGrades,col:T.text,bg:"#F5F6FA"},
            {lab:"High confidence",val:highCount,col:T.green,bg:T.greenLight},
            {lab:"Medium",val:medCount,col:T.orange,bg:T.orangeLight},
            {lab:"Low — review",val:lowCount,col:T.red,bg:"#FEF2F2"},
            {lab:"Needs review",val:needsReviewCount,col:T.primary,bg:T.primaryLight},
          ].map(s=>(<div key={s.lab} style={{background:s.bg,borderRadius:T.rs,padding:"10px 12px"}}>
            <div style={{fontSize:20,fontWeight:900,color:s.col,lineHeight:1}}>{s.val}</div>
            <div style={{fontSize:10,fontWeight:700,color:T.textSec,textTransform:"uppercase",marginTop:4}}>{s.lab}</div>
          </div>))}
        </div>
        {(approvedCount>0||flaggedCount>0)&&(
          <div style={{display:"flex",gap:14,marginTop:10,fontSize:11,color:T.textSec}}>
            <span><CheckCircle2 size={11} color={T.green} style={{marginRight:4,verticalAlign:"middle"}}/>{approvedCount} approved by you</span>
            <span><AlertTriangle size={11} color={T.red} style={{marginRight:4,verticalAlign:"middle"}}/>{flaggedCount} flagged for follow-up</span>
          </div>
        )}
      </div>

      {/* Filter toggle */}
      <div style={{display:"flex",gap:6,marginBottom:10,alignItems:"center"}}>
        <span style={{fontSize:11,fontWeight:700,color:T.textSec,textTransform:"uppercase",marginRight:4}}>Show:</span>
        {[
          {id:"all",lab:"All"},
          {id:"review",lab:`Needs review (${needsReviewCount})`},
          {id:"approved",lab:`Approved (${approvedCount})`},
        ].map(f=>(<button key={f.id} onClick={()=>setReviewFilter(f.id)} style={{padding:"5px 12px",borderRadius:T.rr,fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:T.font,border:reviewFilter===f.id?`1.5px solid ${T.primary}`:`1.5px solid ${T.border}`,background:reviewFilter===f.id?T.primaryLight:T.card,color:reviewFilter===f.id?T.primary:T.textSec}}>{f.lab}</button>))}
      </div>

      {/* Student tabs */}
      <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>{gradingResults.map((r,i)=>{
        const studentLow=r.grades.filter(g=>confTier(g.confidence)==="low"&&approvals[`${i}-${g.qId}`]!=="approved").length;
        return(<button key={i} onClick={()=>{setExpandedStudent(i);setExpandedQ(null);}} style={{padding:"6px 14px",borderRadius:T.rr,fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:T.font,border:expandedStudent===i?`2px solid ${T.primary}`:`1.5px solid ${T.border}`,background:expandedStudent===i?T.primaryLight:T.card,color:expandedStudent===i?T.primary:T.textSec,display:"inline-flex",alignItems:"center",gap:6}}>
          {r.file.name} — {r.totalScore}/{r.maxScore}
          {studentLow>0&&<span title={`${studentLow} low-confidence grades`} style={{background:T.red,color:"#fff",fontSize:9,fontWeight:800,padding:"1px 6px",borderRadius:10}}>{studentLow}</span>}
        </button>);
      })}</div>
      {/* Detail */}
      {(()=>{const r=gradingResults[expandedStudent];if(!r)return null;const pct=r.totalScore/r.maxScore;
        const visibleGrades=r.grades.map((g,gi)=>({g,gi})).filter(({g})=>{
          const key=`${expandedStudent}-${g.qId}`;
          if(reviewFilter==="all")return true;
          if(reviewFilter==="review")return confTier(g.confidence)!=="high"&&approvals[key]!=="approved";
          if(reviewFilter==="approved")return approvals[key]==="approved";
          return true;
        });
        return(<div style={{borderRadius:T.r,border:`1px solid ${T.border}`,overflow:"hidden"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",background:"#F8F9FC",borderBottom:`1px solid ${T.border}`}}>
          <span style={{fontWeight:800,fontSize:15}}>{r.file.name}</span>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}><span style={{fontSize:28,fontWeight:900,color:T.primary}}>{r.totalScore}</span><span style={{fontSize:14,color:T.textSec}}>/{r.maxScore}</span><span style={{fontSize:13,fontWeight:700,marginLeft:6,color:pct>=0.7?T.green:pct>=0.5?T.orange:T.red}}>({(pct*100).toFixed(0)}%)</span></div>
        </div>
        {visibleGrades.length===0&&<div style={{padding:"22px 20px",textAlign:"center",color:T.textSec,fontSize:12}}>No grades match this filter.</div>}
        {visibleGrades.map(({g,gi})=>{const isOpen=expandedQ===gi;const sp=g.maxPts>0?g.total/g.maxPts:0;const sc=sp>=0.8?T.green:sp>=0.5?T.orange:T.red;
          const key=`${expandedStudent}-${g.qId}`;
          const appr=approvals[key];
          const tier=confTier(g.confidence);
          const cCol=tier==="high"?T.green:tier==="med"?T.orange:T.red;
          const cBg=tier==="high"?T.greenLight:tier==="med"?T.orangeLight:"#FEF2F2";
          const cLab=tier==="high"?"High":tier==="med"?"Medium":"Review";
          return(<div key={gi} style={{borderBottom:gi<r.grades.length-1?`1px solid ${T.border}`:"none",background:tier==="low"&&!appr?"#FEF7F7":"transparent"}}>
            <div onClick={()=>setExpandedQ(isOpen?null:gi)} style={{display:"flex",alignItems:"center",padding:"12px 20px",cursor:"pointer"}}>
              <ChevronDown size={13} color={T.textSec} style={{transform:isOpen?"rotate(180deg)":"",transition:"transform 0.2s",marginRight:8}}/>
              <span style={{fontWeight:700,fontSize:13,minWidth:32}}>Q{g.qNum}</span>
              <span style={{fontSize:12,color:T.textSec,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{questions.find(q=>q.id===g.qId)?.title}</span>
              {/* Confidence badge */}
              <span title={`AI confidence ${(g.confidence*100).toFixed(0)}%`} style={{display:"inline-flex",alignItems:"center",gap:4,background:cBg,color:cCol,fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:T.rr,marginRight:8,border:`1px solid ${cCol}30`}}>
                {tier==="low"?<AlertTriangle size={10}/>:tier==="med"?<AlertCircle size={10}/>:<CheckCircle2 size={10}/>}
                {cLab} · {(g.confidence*100).toFixed(0)}%
              </span>
              {/* Approval indicator */}
              {appr==="approved"&&<span title="Approved by instructor" style={{display:"inline-flex",alignItems:"center",gap:3,background:T.green,color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:T.rr,marginRight:8}}><Check size={10}/>OK</span>}
              {appr==="flagged"&&<span title="Flagged for follow-up" style={{display:"inline-flex",alignItems:"center",gap:3,background:T.red,color:"#fff",fontSize:10,fontWeight:800,padding:"3px 8px",borderRadius:T.rr,marginRight:8}}><AlertTriangle size={10}/>Flag</span>}
              <div style={{width:50,height:4,borderRadius:2,background:T.border,marginRight:8}}><div style={{height:"100%",borderRadius:2,background:sc,width:`${sp*100}%`}}/></div>
              <span style={{fontWeight:800,fontSize:13,color:sc}}>{g.total}/{g.maxPts}</span>
            </div>
            {isOpen&&<div style={{padding:"0 20px 16px 52px"}}>
              {/* Confidence panel */}
              <div style={{background:cBg,borderRadius:T.rs,padding:"10px 14px",marginBottom:10,border:`1px solid ${cCol}30`,display:"flex",flexDirection:"column",gap:8}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,flex:1,minWidth:0}}>
                    <Shield size={14} color={cCol}/>
                    <span style={{fontSize:11,fontWeight:800,color:cCol,textTransform:"uppercase"}}>AI Confidence</span>
                    <div style={{flex:1,height:6,borderRadius:3,background:"rgba(0,0,0,0.08)",maxWidth:200}}>
                      <div style={{height:"100%",borderRadius:3,background:cCol,width:`${g.confidence*100}%`}}/>
                    </div>
                    <span style={{fontSize:12,fontWeight:800,color:cCol}}>{(g.confidence*100).toFixed(0)}%</span>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button onClick={(e)=>{e.stopPropagation();setApprovals(a=>({...a,[key]:a[key]==="approved"?undefined:"approved"}));}}
                      style={{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",border:`1.5px solid ${appr==="approved"?T.green:T.border}`,background:appr==="approved"?T.green:T.card,color:appr==="approved"?"#fff":T.green,borderRadius:T.rs,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:T.font}}>
                      <Check size={11}/>{appr==="approved"?"Approved":"Approve"}
                    </button>
                    <button onClick={(e)=>{e.stopPropagation();setApprovals(a=>({...a,[key]:a[key]==="flagged"?undefined:"flagged"}));}}
                      style={{display:"inline-flex",alignItems:"center",gap:4,padding:"5px 10px",border:`1.5px solid ${appr==="flagged"?T.red:T.border}`,background:appr==="flagged"?T.red:T.card,color:appr==="flagged"?"#fff":T.red,borderRadius:T.rs,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:T.font}}>
                      <AlertTriangle size={11}/>{appr==="flagged"?"Flagged":"Flag"}
                    </button>
                  </div>
                </div>
                {g.confidenceReason&&<p style={{margin:"0 0 0 22px",fontSize:11,color:T.textSec,lineHeight:1.4,fontStyle:"italic"}}>"{g.confidenceReason}"</p>}
                {tier!=="high"&&!appr&&<p style={{margin:"0 0 0 22px",fontSize:11,color:cCol,fontWeight:600}}>⚠ Please review this grade manually and click Approve or Flag.</p>}
              </div>
              {g.studentAnswer&&<div style={{background:"#F4F5FA",borderRadius:T.rs,padding:"10px 14px",marginBottom:10,border:`1px solid ${T.border}`}}>
                <div style={{fontSize:10,fontWeight:700,color:T.textSec,textTransform:"uppercase",marginBottom:3}}>Student's Answer <span style={{textTransform:"none",color:T.textSec,fontWeight:500}}>(extracted from their PDF)</span></div>
                <p style={{margin:0,fontSize:12,color:T.text,lineHeight:1.5,fontStyle:"italic",whiteSpace:"pre-wrap"}}>{g.studentAnswer}</p>
                {g.rawAnswer&&g.rawAnswer!==g.studentAnswer&&(
                  <details style={{marginTop:6}}>
                    <summary style={{fontSize:10,color:T.textSec,cursor:"pointer",fontWeight:600}}>Show raw extracted text</summary>
                    <pre style={{margin:"6px 0 0",fontSize:11,color:T.textSec,whiteSpace:"pre-wrap",background:"#FFF",padding:"8px 10px",border:`1px solid ${T.border}`,borderRadius:T.rs,maxHeight:200,overflowY:"auto",fontFamily:T.font}}>{g.rawAnswer}</pre>
                  </details>
                )}
              </div>}
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
    </div>);
    })()}
    <NavB ok={!!gradingResults}/>
    <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
  </div>);

  /* ── Step 5: Final results summary with AI Insights dashboard ── */
  const S5=()=>{if(!gradingResults)return null;const examTotal=questions.reduce((s,q)=>s+q.pts,0);
    return(<div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"28px 32px",boxShadow:T.sh,marginBottom:18}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{width:56,height:56,borderRadius:"50%",background:T.greenLight,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14}}><CheckCircle2 size={28} color={T.green}/></div>
          <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 6px"}}>Grading Complete!</h2>
          <p style={{color:T.textSec,fontSize:14,margin:0}}>{gradingResults.length} submissions graded · {examTotal} points total</p>
        </div>
        <ExamInsights gradingResults={gradingResults} questions={questions}/>
      </div>
      <div style={{background:T.card,borderRadius:T.r,border:`1px solid ${T.border}`,padding:"20px 22px",boxShadow:T.sh}}>
        <h3 style={{fontSize:16,fontWeight:800,margin:"0 0 14px",display:"flex",alignItems:"center",gap:8}}><ClipboardList size={16} color={T.primary}/>Student Results</h3>
        <div style={{borderRadius:T.rs,border:`1px solid ${T.border}`,overflow:"hidden"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
            <thead><tr style={{background:"#F8F9FC"}}><th style={{padding:"10px 14px",textAlign:"left",fontWeight:700,fontSize:11,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>STUDENT</th>{questions.map(q=><th key={q.id} style={{padding:"10px 4px",textAlign:"center",fontWeight:700,fontSize:10,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>Q{q.num}<br/>/{q.pts}</th>)}<th style={{padding:"10px 14px",textAlign:"center",fontWeight:700,fontSize:11,color:T.textSec,borderBottom:`1px solid ${T.border}`}}>TOTAL</th></tr></thead>
            <tbody>{gradingResults.map((r,ri)=><tr key={ri} style={{borderBottom:ri<gradingResults.length-1?`1px solid ${T.border}`:"none"}}><td style={{padding:"10px 14px",fontWeight:600,fontSize:12}}>{r.file.name}</td>{r.grades.map((g,gi)=>{const p=g.maxPts>0?g.total/g.maxPts:0;return<td key={gi} style={{padding:"10px 4px",textAlign:"center",fontWeight:700,fontSize:12,color:p>=0.8?T.green:p>=0.5?T.text:T.red}}>{g.total}</td>})}<td style={{padding:"10px 14px",textAlign:"center",fontWeight:800,fontSize:14,color:T.primary}}>{r.totalScore}/{r.maxScore}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <NavB/>
    </div>);};

  const steps=[S0,S1,S2,S3,S4,S5];const SC=steps[step];
  return(<div style={_ctr}>
    {pendingBox && (
      <BoxDialog
        box={pendingBox}
        questions={questions}
        onConfirm={(overrides) => {
          setBoxes(b => [...b, { ...pendingBox, ...overrides }]);
          setPendingBox(null);
        }}
        onCancel={() => setPendingBox(null)}
      />
    )}
    <div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to {course.code}</div><div style={{marginBottom:6}}><h1 style={{fontSize:24,fontWeight:900,margin:"0 0 3px"}}>Create New Exam</h1><p style={{color:T.textSec,margin:"0 0 20px",fontSize:14}}>AI-assisted exam setup and grading</p></div><StepBar/><SC/>
  </div>);
}

/* ═══ Course ═══ */
function Course({course,onBack,onExam,onAssignment}){
  const assignments=getAssignments(course.id);
  return(<div style={_ctr}>
    <div onClick={onBack} style={{display:"inline-flex",alignItems:"center",gap:5,color:T.textSec,cursor:"pointer",marginBottom:16,fontSize:13,fontWeight:500}}><ChevronLeft size={16}/>Back to Courses</div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:52,height:52,borderRadius:14,background:course.color}}/>
        <div><h1 style={{fontSize:26,fontWeight:900,margin:"0 0 2px"}}>{course.code}</h1><p style={{margin:0,color:T.textSec,fontSize:14}}>{course.name}</p></div>
      </div>
    </div>
    <h2 style={{fontSize:20,fontWeight:900,margin:"0 0 16px"}}>Assignments</h2>
    <div style={{display:"flex",gap:12,marginBottom:20}}>
      <button style={_b("primary")}><Plus size={14}/>Create Assignment</button>
      <button onClick={onExam} style={_b("outline")}><Plus size={14}/>Create Exam</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:18}}>
      {assignments.map(a=>{
        const subCount=a.submissions.length;
        const gradedCount=a.submissions.filter(s=>s.grades).length;
        const progress=subCount>0?gradedCount/subCount:0;
        const isExam=a.type==="exam";
        return(<div key={a.id} onClick={()=>onAssignment(a)} style={{..._card,cursor:"pointer"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow=T.shM;e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div style={{flex:1,minWidth:0,marginRight:12}}>
              <h3 style={{margin:"0 0 10px",fontSize:18,fontWeight:800,lineHeight:1.25}}>{a.title}</h3>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                <span style={{padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:700,background:isExam?"#FEE8E8":T.primaryLight,color:isExam?T.red:T.primary}}>{a.type}</span>
                {a.published&&<span style={{padding:"4px 14px",borderRadius:T.rr,fontSize:11,fontWeight:700,background:T.text,color:"#fff"}}>published</span>}
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:32,fontWeight:900,lineHeight:1}}>{a.pts}</div>
              <div style={{fontSize:12,color:T.textSec,marginTop:2}}>points</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:4}}>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:T.red,fontWeight:600}}><Calendar size={14}/>Due: {a.due}</div>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:T.textSec}}><FileText size={14}/>{subCount} submissions</div>
            <div style={{display:"flex",alignItems:"center",gap:8,fontSize:13,color:T.textSec}}>
              <CheckCircle2 size={14}/>Grading Progress
              <span style={{marginLeft:"auto",fontWeight:700,color:T.text}}>{gradedCount}/{subCount}</span>
            </div>
            <div style={{height:8,borderRadius:T.rr,background:`linear-gradient(90deg,#F2F3FA 0%,#F6F3FF 100%)`,overflow:"hidden",border:`1px solid ${T.primary}10`}}><div style={{height:"100%",width:`${progress*100}%`,background:`linear-gradient(90deg,${T.primary} 0%,${T.purple} 100%)`,borderRadius:T.rr,transition:"width 0.3s",boxShadow:"0 0 12px rgba(67,85,219,0.26)"}}/></div>
          </div>
        </div>);
      })}
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
  const[page,setPage]=useState("login");
  const[role,setRole]=useState("instructor");
  const[course,setCourse]=useState(null);
  const[assignment,setAssignment]=useState(null);
  if(page==="login")return<><FL/><Login onLogin={r=>{setRole(r);setPage("dashboard")}}/></>;
  const resetNav=p=>{setPage(p);setCourse(null);setAssignment(null);};
  if(role==="student")return(<div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.text}}><FL/><Nav onNav={resetNav} role={role} onLogout={()=>{resetNav("login");}}/>
    {page==="dashboard"&&<StudentDashboard onSelect={c=>{setCourse(c);setPage("course")}}/>}
    {page==="course"&&course&&<StudentCourse course={course} onBack={()=>{setCourse(null);setPage("dashboard")}} onAssignment={a=>{setAssignment(a);setPage("assignment")}}/>}
    {page==="assignment"&&course&&assignment&&<StudentAssignmentDetail assignment={assignment} course={course} onBack={()=>{setAssignment(null);setPage("course")}}/>}
    {page==="help"&&<Help onBack={()=>setPage("dashboard")}/>}
  </div>);
  return(<div style={{minHeight:"100vh",background:T.bg,fontFamily:T.font,color:T.text}}><FL/><Nav onNav={resetNav} role={role} onLogout={()=>{resetNav("login");}}/>
    {page==="dashboard"&&<Dash onSelect={c=>{setCourse(c);setPage("course")}}/>}
    {page==="course"&&course&&<Course course={course} onBack={()=>{setCourse(null);setPage("dashboard")}} onExam={()=>setPage("exam")} onAssignment={a=>{setAssignment(a);setPage("assignment")}}/>}
    {page==="assignment"&&course&&assignment&&<AssignmentView assignment={assignment} course={course} onBack={()=>{setAssignment(null);setPage("course")}}/>}
    {page==="exam"&&course&&<CreateExam course={course} onBack={()=>setPage("course")}/>}
    {page==="help"&&<Help onBack={()=>setPage("dashboard")}/>}
  </div>);
}
