import { useState } from "react";

const CLINIC = { name: "Bayside Physiotherapy", location: "Melbourne, VIC", physios: 4, patients: 186 };
const NETWORK = { total: 1800, participating: 342 };
const BT = 10;

const PHYSIO = { name: "Dr. Anika Sharma", title: "Senior Physiotherapist", specialties: ["Musculoskeletal", "Sports Rehabilitation"], yearsExp: 8, avatar: "AS" };

const ADMIN_RECORDS = [
  { id: 1, patient: "Sarah M.", area: "Lumbar Spine", phase: "Rehabilitation", physio: "Dr. Sharma", shared: true },
  { id: 2, patient: "James K.", area: "Right Shoulder", phase: "Acute", physio: "Dr. Sharma", shared: false },
  { id: 3, patient: "Emily R.", area: "Left Knee", phase: "Discharge", physio: "Dr. Chen", shared: true },
  { id: 4, patient: "David L.", area: "Cervical Spine", phase: "Rehabilitation", physio: "Dr. Patel", shared: false },
  { id: 5, patient: "Maria S.", area: "Right Ankle", phase: "Acute", physio: "Dr. Chen", shared: true },
  { id: 6, patient: "Oliver T.", area: "Cervical Spine", phase: "Acute", physio: "Dr. Sharma", shared: false },
  { id: 7, patient: "Grace W.", area: "Left Shoulder", phase: "Rehabilitation", physio: "Dr. Sharma", shared: true },
  { id: 8, patient: "Nathan B.", area: "Right ACL", phase: "Rehabilitation", physio: "Dr. Patel", shared: true },
];

const MOCK_APPOINTMENTS = [
  { id: 1, time: "9:00 AM", patient: "Tom W.", type: "Initial Assessment", age: 34, isNew: false, hasExt: true, history: { visits: 8, lastVisit: "2026-03-28", area: "Lower Back - L4/L5", phase: "Rehabilitation", romS: "Flexion: 40\u00b0", romC: "Flexion: 62\u00b0", painS: "7/10", painC: "4/10", reported: "Improving with exercises, occasional morning stiffness" } },
  { id: 2, time: "9:45 AM", patient: "Lisa P.", type: "Follow-up", age: 52, isNew: false, hasExt: false, history: null },
  { id: 3, time: "10:30 AM", patient: "Mark H.", type: "Initial Assessment", age: 28, isNew: false, hasExt: true, history: { visits: 3, lastVisit: "2026-04-10", area: "Right Shoulder - Rotator Cuff", phase: "Acute", romS: "Abduction: 90\u00b0", romC: "Abduction: 110\u00b0", painS: "8/10", painC: "6/10", reported: "Pain with overhead movements, difficulty sleeping on right side" } },
  { id: 4, time: "11:15 AM", patient: "Anna C.", type: "Follow-up", age: 45, isNew: true, hasExt: false, history: null },
  { id: 5, time: "2:00 PM", patient: "Robert J.", type: "Initial Assessment", age: 61, isNew: false, hasExt: true, history: { visits: 12, lastVisit: "2026-04-05", area: "Bilateral Knees - OA", phase: "Rehabilitation", romS: "L Flex: 95\u00b0, R Flex: 100\u00b0", romC: "L Flex: 112\u00b0, R Flex: 118\u00b0", painS: "6/10", painC: "3/10", reported: "Walking tolerance improved to 30 min, stairs still difficult" } },
];

const INIT_MY_PATIENTS = [
  { id: 101, patient: "Lisa P.", age: 52, area: "Right Hip - Bursitis", sessions: 6, nextVisit: "2026-04-22", phase: "Rehabilitation", painS: "6/10", painC: "3/10", romS: "Flexion: 80\u00b0", romC: "Flexion: 105\u00b0", reported: "Much better walking, still stiff in mornings", credits: 3 },
  { id: 102, patient: "Oliver T.", age: 38, area: "Cervical Spine - Whiplash", sessions: 4, nextVisit: "2026-04-24", phase: "Acute", painS: "8/10", painC: "6/10", romS: "Rotation: 40\u00b0", romC: "Rotation: 55\u00b0", reported: "Headaches reducing, neck still tight after driving", credits: 4 },
  { id: 103, patient: "Grace W.", age: 67, area: "Left Shoulder - Frozen", sessions: 10, nextVisit: "2026-04-25", phase: "Rehabilitation", painS: "7/10", painC: "4/10", romS: "Abduction: 60\u00b0", romC: "Abduction: 95\u00b0", reported: "Can reach overhead shelf again, still painful at end range", credits: 3 },
  { id: 104, patient: "Nathan B.", age: 29, area: "Right ACL - Post-op", sessions: 14, nextVisit: "2026-04-28", phase: "Rehabilitation", painS: "5/10", painC: "2/10", romS: "Flexion: 90\u00b0", romC: "Flexion: 130\u00b0", reported: "Running at 70% capacity, confident in stability", credits: 4 },
  { id: 105, patient: "Sophie K.", age: 44, area: "Lumbar Spine - Disc", sessions: 8, nextVisit: "2026-04-29", phase: "Discharge", painS: "9/10", painC: "2/10", romS: "Flexion: 30\u00b0", romC: "Flexion: 70\u00b0", reported: "Back to full work duties, occasional tightness after long sits", credits: 3 },
];

const BENCH = [
  { label: "Avg Treatment Duration", clinic: "6.2 wks", you: "5.9 wks", net: "5.8 wks", cTrend: "above", yTrend: "above" },
  { label: "Patient Retention Rate", clinic: "72%", you: "78%", net: "68%", cTrend: "above", yTrend: "above" },
  { label: "Rebooking Rate", clinic: "81%", you: "85%", net: "76%", cTrend: "above", yTrend: "above" },
  { label: "Avg Sessions / Episode", clinic: "8.4", you: "7.6", net: "7.9", cTrend: "above", yTrend: "below" },
  { label: "Discharge Completion", clinic: "64%", you: "58%", net: "71%", cTrend: "below", yTrend: "below" },
  { label: "Patient Outcome Score", clinic: "7.8/10", you: "8.2/10", net: "7.5/10", cTrend: "above", yTrend: "above" },
];

const BENCH_CATS = [
  { icon: "\u23f1", title: "Treatment Efficiency", desc: "Duration, sessions per episode, discharge completion rates" },
  { icon: "\ud83d\udcc8", title: "Patient Outcomes", desc: "Pain reduction trajectories, ROM improvement, patient-reported scores" },
  { icon: "\ud83d\udd01", title: "Retention & Rebooking", desc: "Return rates, rebooking patterns, patient loyalty metrics" },
  { icon: "\ud83c\udfaf", title: "Specialty Benchmarks", desc: "Condition-specific comparisons across musculoskeletal, sports, neuro" },
];

// Access tier thresholds
const TIERS = [
  { min: 0, max: 0, label: "No Access", color: "#EF4444", fields: [] },
  { min: 1, max: 4, label: "Basic", color: "#F59E0B", fields: ["area", "phase"] },
  { min: 5, max: 9, label: "Standard", color: "#3B82F6", fields: ["area", "phase", "rom", "pain"] },
  { min: 10, max: Infinity, label: "Full", color: "#10B981", fields: ["area", "phase", "rom", "pain", "reported"] },
];

const getTier = (credits) => TIERS.find(t => credits >= t.min && credits <= t.max) || TIERS[0];

const I = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Chart: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Settings: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
  Lock: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Unlock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Shield: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ArrowUp: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
  ArrowDown: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  Star: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Info: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  Eye: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Network: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/></svg>,
  Clock: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Alert: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Help: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Upload: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
  Rewind: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/></svg>,
};

const C = { pri: "#1B3A5C", priLt: "#E8EFF6", acc: "#E84393", bg: "#F8F9FB", white: "#FFF", brd: "#E2E8F0", brdL: "#F1F5F9", txt: "#1A202C", txtS: "#64748B", txtM: "#94A3B8", ok: "#10B981", okBg: "#ECFDF5", warn: "#F59E0B", warnBg: "#FFFBEB", err: "#EF4444", errBg: "#FEF2F2" };

export default function KineticPrototype() {
  const [role, setRole] = useState("admin");
  const [adminPage, setAdminPage] = useState("dashboard");
  const [physioPage, setPhysioPage] = useState("appointments");
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [credits, setCredits] = useState(0);
  const [isFounder, setIsFounder] = useState(false);
  const [animC, setAnimC] = useState(false);
  const [showOptIn, setShowOptIn] = useState(false);
  const [showLeave, setShowLeave] = useState(false);
  const [showPatPop, setShowPatPop] = useState(null);
  const [showReqSent, setShowReqSent] = useState(false);
  const [showInfoTip, setShowInfoTip] = useState(false);
  const [sharedIds, setSharedIds] = useState([]);
  const [showSharePre, setShowSharePre] = useState(null);
  const [decayed, setDecayed] = useState(false);

  const bu = credits >= BT;
  const tier = getTier(credits);

  const handleOptIn = () => { setIsOptedIn(true); setIsFounder(true); setShowOptIn(false); };
  const handleLeave = () => { setIsOptedIn(false); setCredits(0); setIsFounder(false); setShowLeave(false); setSharedIds([]); setDecayed(false); };
  const handleSharePat = (p) => {
    const e = isFounder ? p.credits * 2 : p.credits;
    setCredits(v => v + e); setSharedIds(v => [...v, p.id]); setShowSharePre(null);
    setAnimC(true); setTimeout(() => setAnimC(false), 1200); setDecayed(false);
  };
  const handleReqShare = () => { setShowReqSent(true); setTimeout(() => setShowReqSent(false), 3000); };
  const handleDecay = () => { setCredits(v => Math.floor(v / 2)); setDecayed(true); };
  const handleResetDecay = () => { setDecayed(false); };

  // Styles
  const ss = {
    app: { fontFamily: "'DM Sans', -apple-system, sans-serif", background: C.bg, minHeight: "100vh", color: C.txt, fontSize: "14px", lineHeight: 1.5 },
    topBar: { background: C.pri, color: C.white, padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
    logo: { display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "17px", letterSpacing: "-0.3px" },
    logoMark: { width: "28px", height: "28px", borderRadius: "8px", background: `linear-gradient(135deg, ${C.acc}, #FF6B9D)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800 },
    roleSw: { display: "flex", background: "rgba(255,255,255,0.12)", borderRadius: "8px", padding: "3px", gap: "2px" },
    roleBtn: (a) => ({ padding: "6px 16px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 500, fontFamily: "inherit", background: a ? C.white : "transparent", color: a ? C.pri : "rgba(255,255,255,0.7)", transition: "all 0.2s" }),
    layout: { display: "flex", minHeight: "calc(100vh - 48px)" },
    side: { width: "220px", background: C.white, borderRight: `1px solid ${C.brd}`, padding: "16px 0", flexShrink: 0, display: "flex", flexDirection: "column" },
    sideLabel: { fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.txtM, padding: "8px 16px 6px" },
    navItem: (a) => ({ display: "flex", alignItems: "center", gap: "10px", padding: "9px 16px", cursor: "pointer", border: "none", background: a ? C.priLt : "transparent", color: a ? C.pri : C.txtS, fontWeight: a ? 600 : 400, fontSize: "13.5px", fontFamily: "inherit", width: "100%", textAlign: "left", borderLeft: a ? `3px solid ${C.pri}` : "3px solid transparent", transition: "all 0.15s" }),
    main: { flex: 1, padding: "28px 32px", overflow: "auto" },
    title: { fontSize: "22px", fontWeight: 700, letterSpacing: "-0.3px", marginBottom: "4px" },
    sub: { fontSize: "13.5px", color: C.txtS, marginBottom: "24px" },
    card: { background: C.white, borderRadius: "10px", border: `1px solid ${C.brd}`, padding: "20px", marginBottom: "16px" },
    cardT: { fontSize: "14px", fontWeight: 600, marginBottom: "12px" },
    badge: (t) => {
      const m = { founder: { bg: C.warnBg, c: "#D97706", b: "#FDE68A" }, active: { bg: C.okBg, c: "#059669", b: "#A7F3D0" }, inactive: { bg: C.errBg, c: C.err, b: "#FECACA" }, info: { bg: C.priLt, c: C.pri, b: `${C.pri}20` }, "new": { bg: "#EDE9FE", c: "#7C3AED", b: "#DDD6FE" }, shared: { bg: C.okBg, c: "#059669", b: "#A7F3D0" }, pending: { bg: C.warnBg, c: "#D97706", b: "#FDE68A" }, basic: { bg: C.warnBg, c: "#D97706", b: "#FDE68A" }, standard: { bg: "#DBEAFE", c: "#2563EB", b: "#93C5FD" }, full: { bg: C.okBg, c: "#059669", b: "#A7F3D0" } };
      const v = m[t] || m.info; return { background: v.bg, color: v.c, border: `1px solid ${v.b}`, padding: "3px 10px", borderRadius: "100px", fontSize: "11.5px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" };
    },
    btn: (v) => {
      const b = { padding: "8px 18px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: "6px", transition: "all 0.15s" };
      if (v === "primary") return { ...b, background: C.pri, color: C.white };
      if (v === "accent") return { ...b, background: C.acc, color: C.white };
      if (v === "danger") return { ...b, background: C.err, color: C.white };
      if (v === "dangerOutline") return { ...b, background: "transparent", color: C.err, border: `1px solid ${C.err}` };
      if (v === "ghost") return { ...b, background: "transparent", color: C.txtS, border: `1px solid ${C.brd}` };
      if (v === "small") return { ...b, padding: "5px 12px", fontSize: "12px", background: C.pri, color: C.white };
      if (v === "warn") return { ...b, background: C.warn, color: C.white };
      return b;
    },
    th: { textAlign: "left", padding: "10px 12px", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: C.txtM, borderBottom: `1px solid ${C.brd}` },
    td: { padding: "12px", borderBottom: `1px solid ${C.brdL}`, fontSize: "13.5px", verticalAlign: "middle" },
    modal: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
    modalC: { background: C.white, borderRadius: "14px", padding: "28px", maxWidth: "520px", width: "92%", maxHeight: "85vh", overflow: "auto" },
    progBar: { height: "6px", borderRadius: "3px", background: C.brd, position: "relative", overflow: "hidden" },
    progFill: (pct, col) => ({ position: "absolute", top: 0, left: 0, bottom: 0, width: `${Math.min(pct, 100)}%`, background: col || C.pri, borderRadius: "3px", transition: "width 0.6s ease" }),
    statGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" },
    statCard: (hl) => ({ background: hl ? C.priLt : C.white, borderRadius: "10px", border: `1px solid ${hl ? C.pri + "30" : C.brd}`, padding: "16px", textAlign: "center" }),
    statVal: (hl) => ({ fontSize: "28px", fontWeight: 700, color: hl ? C.pri : C.txt, letterSpacing: "-0.5px" }),
    statLbl: { fontSize: "12px", color: C.txtS, marginTop: "4px" },
    locked: { filter: "blur(5px)", pointerEvents: "none", userSelect: "none", opacity: 0.4 },
  };

  // Locked field overlay
  const LockedField = ({ label, nextTier }) => (
    <div style={{ padding: "10px 14px", background: "#F8FAFC", borderRadius: "6px", border: `1px dashed ${C.brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.txtM, fontSize: "13px" }}><I.Lock /> {label}</div>
      <span style={{ fontSize: "11px", color: C.txtM }}>Requires {nextTier}+ credits</span>
    </div>
  );

  // Access tier indicator
  const TierIndicator = ({ credits: cr }) => {
    const t = getTier(cr);
    const tierKey = t.label === "Basic" ? "basic" : t.label === "Standard" ? "standard" : t.label === "Full" ? "full" : "inactive";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={ss.badge(tierKey)}>{t.label} Access</span>
        <span style={{ fontSize: "11.5px", color: C.txtM }}>
          {t.label === "Basic" && "Area + Phase only"}
          {t.label === "Standard" && "Area + Phase + ROM + Pain"}
          {t.label === "Full" && "All fields including patient-reported"}
        </span>
      </div>
    );
  };

  // Access tier visual for dashboard
  const TierLadder = () => (
    <div style={ss.card}>
      <div style={ss.cardT}>Access Tiers</div>
      <div style={{ fontSize: "12.5px", color: C.txtS, marginBottom: "14px" }}>Your access depth scales with your contribution. More credits = more complete patient history.</div>
      <div style={{ display: "grid", gap: "8px" }}>
        {[
          { range: "1\u20134 credits", label: "Basic", color: "#F59E0B", bg: C.warnBg, fields: "Treatment area, Phase", current: credits >= 1 && credits <= 4 },
          { range: "5\u20139 credits", label: "Standard", color: "#3B82F6", bg: "#DBEAFE", fields: "Basic + ROM scores, Pain scores", current: credits >= 5 && credits <= 9 },
          { range: "10+ credits", label: "Full", color: "#10B981", bg: C.okBg, fields: "Standard + Patient-reported outcomes + Benchmark", current: credits >= 10 },
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: t.current ? t.bg : C.bg, borderRadius: "8px", border: t.current ? `2px solid ${t.color}` : `1px solid ${C.brd}`, transition: "all 0.3s" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: t.current ? t.color : C.brd, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontWeight: 600, fontSize: "13px", color: t.current ? t.color : C.txtS }}>{t.label}</span>
                <span style={{ fontSize: "11.5px", color: C.txtM }}>{t.range}</span>
                {t.current && <span style={{ fontSize: "10.5px", fontWeight: 700, color: t.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>Current</span>}
              </div>
              <div style={{ fontSize: "12px", color: C.txtM, marginTop: "2px" }}>{t.fields}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NetBar = () => {
    if (!isOptedIn) return (<div style={{ ...ss.card, background: C.errBg, border: "1px solid #FECACA", padding: "14px 18px", display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}><I.Lock /><span>Your clinic is <strong>not participating</strong> in the Sharing Network.</span></div>);
    return (
      <div style={{ ...ss.card, background: C.priLt, border: `1px solid ${C.pri}20`, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "13px", flexWrap: "wrap" }}>
          <I.Network />
          <span>Credits: <strong style={{ color: C.pri }}>{credits}</strong></span>
          <span style={{ color: C.brd }}>|</span>
          <TierIndicator credits={credits} />
          {isFounder && <><span style={{ color: C.brd }}>|</span><span style={ss.badge("founder")}><I.Star /> 2x</span></>}
        </div>
        <span style={{ fontSize: "11.5px", color: C.txtS }}>Read-only</span>
      </div>
    );
  };

  // ============================================================
  // ADMIN
  // ============================================================
  const AdminDashboard = () => (
    <div>
      <div style={ss.title}>Network Dashboard</div>
      <div style={ss.sub}>{CLINIC.name} &middot; {CLINIC.location}</div>
      <div style={{ ...ss.card, background: isOptedIn ? `linear-gradient(135deg, ${C.priLt}, ${C.white})` : C.errBg, border: isOptedIn ? `1px solid ${C.pri}25` : "1px solid #FECACA", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: isOptedIn ? C.pri : C.err, display: "flex", alignItems: "center", justifyContent: "center", color: C.white }}>{isOptedIn ? <I.Unlock /> : <I.Lock />}</div>
          <div><div style={{ fontWeight: 600, fontSize: "15px" }}>{isOptedIn ? "Network Active" : "Not Participating"}</div><div style={{ fontSize: "12.5px", color: C.txtS }}>{isOptedIn ? "Sharing and receiving patient history" : "No access to shared patient history"}</div></div>
          {isOptedIn && isFounder && <span style={ss.badge("founder")}><I.Star /> Founder 2x</span>}
        </div>
        {!isOptedIn && <button style={ss.btn("primary")} onClick={() => setShowOptIn(true)}>Join Network</button>}
      </div>
      <div style={ss.statGrid}>
        <div style={ss.statCard(true)}>
          <div style={{ ...ss.statVal(true), transition: "transform 0.3s", transform: animC ? "scale(1.15)" : "scale(1)" }}>{credits}</div>
          <div style={ss.statLbl}>Clinic Credits</div>
          {isOptedIn && credits > 0 && <div style={{ marginTop: "6px" }}><TierIndicator credits={credits} /></div>}
          {isOptedIn && <div style={{ marginTop: "8px" }}><div style={ss.progBar}><div style={ss.progFill((credits / BT) * 100, tier.color)} /></div><div style={{ fontSize: "11px", color: C.txtM, marginTop: "4px" }}>{bu ? "Full access + Benchmark" : `${BT - credits} to Full access`}</div></div>}
        </div>
        <div style={ss.statCard(false)}><div style={ss.statVal(false)}>{sharedIds.length}</div><div style={ss.statLbl}>Records Shared</div></div>
        <div style={ss.statCard(false)}><div style={ss.statVal(false)}>{NETWORK.participating}</div><div style={ss.statLbl}>Clinics in Network</div></div>
      </div>

      {/* Decay simulation */}
      {isOptedIn && credits > 0 && (
        <div style={{ ...ss.card, background: C.warnBg, border: "1px solid #FDE68A", padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px" }}>
              <I.Clock />
              <div>
                <strong>Credit Decay:</strong> Credits older than 6 months decay to 50%.
                {decayed && <span style={{ color: C.err, fontWeight: 600 }}> (Decay simulated: {credits} credits remaining)</span>}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {!decayed ? (
                <button style={ss.btn("warn")} onClick={handleDecay}><I.Rewind /> Simulate 6-Month Decay</button>
              ) : (
                <button style={ss.btn("ghost")} onClick={() => { setCredits(v => v * 2); setDecayed(false); }}>Undo Simulation</button>
              )}
            </div>
          </div>
          {decayed && (
            <div style={{ marginTop: "12px", padding: "12px", background: "rgba(255,255,255,0.7)", borderRadius: "8px", fontSize: "12.5px", color: C.txtS }}>
              <strong>Impact of decay:</strong> Access tier dropped to <strong style={{ color: tier.color }}>{tier.label}</strong>.
              {!bu && <> Benchmark dashboard is now <strong style={{ color: C.err }}>locked</strong>.</>}
              {credits === 0 && <> All patient history access <strong style={{ color: C.err }}>revoked</strong>.</>}
              {credits > 0 && <> Share more records to restore full access.</>}
            </div>
          )}
        </div>
      )}

      {/* Access tiers */}
      {isOptedIn && <TierLadder />}

      {/* Record status */}
      {isOptedIn && (
        <div style={ss.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <div style={ss.cardT}>Record Sharing Status</div>
            <div style={{ fontSize: "12.5px", color: C.txtS }}>Therapists manage sharing from their patient lists</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr><th style={ss.th}>Patient</th><th style={ss.th}>Area</th><th style={ss.th}>Therapist</th><th style={ss.th}>Phase</th><th style={{ ...ss.th, textAlign: "right" }}>Status</th></tr></thead>
            <tbody>{ADMIN_RECORDS.map(r => (
              <tr key={r.id}><td style={ss.td}>{r.patient}</td><td style={ss.td}>{r.area}</td><td style={{ ...ss.td, color: C.txtS }}>{r.physio}</td><td style={ss.td}><span style={ss.badge("info")}>{r.phase}</span></td><td style={{ ...ss.td, textAlign: "right" }}>{r.shared ? <span style={ss.badge("shared")}><I.Check /> Shared</span> : <span style={ss.badge("pending")}>Not shared</span>}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {isOptedIn && (
        <div style={ss.card}>
          <div style={ss.cardT}>Data Boundaries</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div style={{ padding: "14px", background: C.okBg, borderRadius: "8px" }}><div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "8px", color: "#059669" }}>Shared (Standard)</div><div style={{ fontSize: "12.5px", color: C.txtS, lineHeight: 1.6 }}>Treatment area & diagnosis<br/>Phase (acute / rehab / discharge)<br/>ROM & pain scores<br/>Patient-reported outcomes</div></div>
            <div style={{ padding: "14px", background: C.errBg, borderRadius: "8px" }}><div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "8px", color: C.err }}>Never Shared</div><div style={{ fontSize: "12.5px", color: C.txtS, lineHeight: 1.6 }}>Clinic name or identity<br/>Treating therapist name<br/>Treatment methods<br/>Clinical notes<br/>Billing information</div></div>
          </div>
        </div>
      )}
    </div>
  );

  const BenchContent = ({ isPhysio }) => (
    <div>
      <div style={ss.title}>Benchmark Dashboard</div>
      <div style={ss.sub}>Compare against {NETWORK.participating} clinics{isPhysio ? " (read-only)" : ""}</div>
      {(!isOptedIn || !bu) ? (
        <div>
          <div style={{ ...ss.card, marginBottom: "16px" }}><div style={ss.cardT}>What Benchmark Covers</div><div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>{BENCH_CATS.map((c, i) => (<div key={i} style={{ padding: "14px", background: C.bg, borderRadius: "8px" }}><div style={{ fontSize: "18px", marginBottom: "6px" }}>{c.icon}</div><div style={{ fontWeight: 600, fontSize: "13.5px", marginBottom: "4px" }}>{c.title}</div><div style={{ fontSize: "12px", color: C.txtS, lineHeight: 1.5 }}>{c.desc}</div></div>))}</div></div>
          <div style={{ ...ss.card, textAlign: "center", padding: "48px 40px" }}>
            <div style={{ color: C.txtM, marginBottom: "8px" }}><I.Lock /></div>
            <div style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}>{!isOptedIn ? (isPhysio ? "Clinic Has Not Joined" : "Join to Access Benchmarks") : `${BT - credits} More Credits to Unlock`}</div>
            <div style={{ fontSize: "13px", color: C.txtS, maxWidth: "400px", margin: "0 auto 16px" }}>{!isOptedIn ? (isPhysio ? "Your clinic admin has not joined. Benchmark requires network participation." : "Join and share records to compare your clinic.") : `Reach ${BT} credits (Full tier) to unlock the benchmark dashboard.`}</div>
            {!isPhysio && !isOptedIn && <button style={ss.btn("primary")} onClick={() => setShowOptIn(true)}>Join Network</button>}
            {isOptedIn && !bu && <div style={{ maxWidth: "280px", margin: "0 auto" }}><div style={ss.progBar}><div style={ss.progFill((credits / BT) * 100, C.acc)} /></div><div style={{ fontSize: "12px", color: C.txtM, marginTop: "6px" }}>{credits} / {BT}</div></div>}
            <div style={{ marginTop: "28px", filter: "blur(6px)", pointerEvents: "none", opacity: 0.4 }}>{BENCH.slice(0, 3).map((c, i) => (<div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", borderBottom: `1px solid ${C.brdL}` }}><span>{c.label}</span><span>{c.clinic}</span><span>{c.net}</span></div>))}</div>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ ...ss.card, background: C.okBg, border: "1px solid #A7F3D0", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}><I.Check /><span>Real-time data from <strong>{NETWORK.participating} clinics</strong>.</span></div>
          <div style={ss.card}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr><th style={ss.th}>Metric</th>{isPhysio && <th style={{ ...ss.th, textAlign: "center" }}>You</th>}<th style={{ ...ss.th, textAlign: "center" }}>Clinic</th><th style={{ ...ss.th, textAlign: "center" }}>Network</th><th style={{ ...ss.th, textAlign: "center" }}>Status</th></tr></thead>
              <tbody>{BENCH.map((c, i) => { const tr = isPhysio ? c.yTrend : c.cTrend; return (<tr key={i}><td style={{ ...ss.td, fontWeight: 500 }}>{c.label}</td>{isPhysio && <td style={{ ...ss.td, textAlign: "center", fontWeight: 700, color: C.pri }}>{c.you}</td>}<td style={{ ...ss.td, textAlign: "center", fontWeight: isPhysio ? 400 : 600, color: isPhysio ? C.txtS : C.txt }}>{c.clinic}</td><td style={{ ...ss.td, textAlign: "center", color: C.txtS }}>{c.net}</td><td style={{ ...ss.td, textAlign: "center" }}>{tr === "below" ? <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: C.err }}><I.ArrowDown /> Below</span> : <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: C.ok }}><I.ArrowUp /> Above</span>}</td></tr>); })}</tbody>
            </table>
          </div>
          <div style={{ ...ss.card, background: C.priLt, border: `1px solid ${C.pri}15` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}><I.Info /><span style={{ fontWeight: 600, fontSize: "13.5px" }}>{isPhysio ? "Your Insight" : "Clinic Insight"}</span></div>
            <div style={{ fontSize: "13px", color: C.txtS, lineHeight: 1.6 }}>{isPhysio ? <>Your <strong>Discharge Completion (58%)</strong> is below both clinic (64%) and network (71%) averages. Your <strong>Patient Outcome Score (8.2/10)</strong> is your strongest metric.</> : <>Your <strong>Discharge Completion (64%)</strong> is below the network average of 71%. Clinics with structured discharge protocols report 12-15% higher rates.</>}</div>
          </div>
        </div>
      )}
    </div>
  );

  const AdminSettings = () => (
    <div>
      <div style={ss.title}>Network Settings</div>
      <div style={ss.sub}>Manage participation in the Kinetic Sharing Network</div>
      <div style={ss.card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}><div><div style={{ fontWeight: 600, fontSize: "15px" }}>Network Participation</div><div style={{ fontSize: "13px", color: C.txtS, marginTop: "2px" }}>{isOptedIn ? "Your clinic is active" : "Not participating"}</div></div><span style={ss.badge(isOptedIn ? "active" : "inactive")}>{isOptedIn ? "Active" : "Inactive"}</span></div>
        {isOptedIn ? (<div><div style={{ padding: "16px", background: C.priLt, borderRadius: "8px", marginBottom: "16px", fontSize: "13px", lineHeight: 1.7 }}><strong>Status:</strong><br/>Credits: <strong>{credits}</strong> ({tier.label} tier){isFounder && <span style={{ color: C.warn }}> Founder 2x</span>}<br/>Records shared: <strong>{sharedIds.length}</strong><br/>Benchmark: <strong>{bu ? "Unlocked" : "Locked"}</strong></div><button style={ss.btn("dangerOutline")} onClick={() => setShowLeave(true)}>Leave Network</button></div>) : <button style={ss.btn("primary")} onClick={() => setShowOptIn(true)}>Join Network</button>}
      </div>
      <div style={ss.card}>
        <div style={{ ...ss.cardT, display: "flex", alignItems: "center", gap: "8px" }}><I.Shield /> Data Boundaries</div>
        <div style={{ display: "grid", gap: "6px" }}>
          {[{ l: "Clinic Identity", sh: false }, { l: "Therapist Names", sh: false }, { l: "Treatment Methods", sh: false }, { l: "Clinical Notes", sh: false }, { l: "Billing Data", sh: false }, { l: "Diagnosis & Area", sh: true }, { l: "Phase Description", sh: true }, { l: "ROM & Pain Scores", sh: true }, { l: "Patient-Reported Outcomes", sh: true }].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: item.sh ? C.okBg : C.errBg, borderRadius: "6px", fontSize: "13px" }}><span style={{ display: "flex", alignItems: "center", gap: "8px" }}>{item.sh ? <I.Eye /> : <I.EyeOff />} {item.l}</span><span style={{ fontWeight: 600, fontSize: "12px", color: item.sh ? C.ok : C.err }}>{item.sh ? "Shared" : "Never"}</span></div>
          ))}
        </div>
      </div>
    </div>
  );

  // ============================================================
  // PHYSIO
  // ============================================================
  const PhysioAppts = () => (
    <div>
      <NetBar />
      <div style={ss.title}>Today's Appointments</div>
      <div style={ss.sub}>Tuesday, 22 April 2026 &middot; {MOCK_APPOINTMENTS.length} patients</div>
      <div style={{ display: "grid", gap: "10px" }}>
        {MOCK_APPOINTMENTS.map(a => {
          const can = isOptedIn && credits > 0;
          return (
            <div key={a.id} style={{ ...ss.card, marginBottom: 0, cursor: "pointer", transition: "all 0.15s", borderLeft: a.hasExt && can ? `3px solid ${C.pri}` : a.hasExt && !can ? `3px solid ${C.brd}` : "3px solid transparent" }} onClick={() => setShowPatPop(a)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: C.priLt, display: "flex", alignItems: "center", justifyContent: "center", color: C.pri, fontWeight: 700, fontSize: "15px" }}>{a.patient.charAt(0)}</div>
                  <div><div style={{ fontWeight: 600, fontSize: "14.5px" }}>{a.patient}<span style={{ fontWeight: 400, color: C.txtS, marginLeft: "8px", fontSize: "13px" }}>Age {a.age}</span></div><div style={{ fontSize: "12.5px", color: C.txtS }}>{a.time} &middot; {a.type}</div></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {a.isNew && <span style={ss.badge("new")}>First Visit</span>}
                  {a.hasExt && can && <span style={ss.badge(tier.label === "Full" ? "full" : tier.label === "Standard" ? "standard" : "basic")}><I.Network /> {tier.label} Access</span>}
                  {a.hasExt && !can && <span style={ss.badge("inactive")}><I.Lock /> Locked</span>}
                  {!a.hasExt && !a.isNew && <span style={{ fontSize: "12px", color: C.txtM }}>No external history</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const PhysioMyPat = () => (
    <div>
      <NetBar />
      <div style={ss.title}>My Patients</div>
      <div style={ss.sub}>Active patients under your care</div>
      <div style={ss.card}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={ss.th}>Patient</th><th style={ss.th}>Condition</th><th style={ss.th}>Phase</th><th style={ss.th}>Sessions</th><th style={ss.th}>Next Visit</th>{isOptedIn && <th style={{ ...ss.th, textAlign: "right" }}>Network</th>}</tr></thead>
          <tbody>{INIT_MY_PATIENTS.map(p => {
            const done = sharedIds.includes(p.id);
            return (<tr key={p.id}><td style={ss.td}><div style={{ display: "flex", alignItems: "center", gap: "10px" }}><div style={{ width: "32px", height: "32px", borderRadius: "8px", background: C.priLt, display: "flex", alignItems: "center", justifyContent: "center", color: C.pri, fontWeight: 600, fontSize: "13px" }}>{p.patient.charAt(0)}</div><div><div style={{ fontWeight: 500 }}>{p.patient}</div><div style={{ fontSize: "12px", color: C.txtM }}>Age {p.age}</div></div></div></td><td style={ss.td}>{p.area}</td><td style={ss.td}><span style={ss.badge(p.phase === "Discharge" ? "active" : "info")}>{p.phase}</span></td><td style={ss.td}>{p.sessions}</td><td style={ss.td}>{p.nextVisit}</td>{isOptedIn && <td style={{ ...ss.td, textAlign: "right" }}>{done ? <span style={ss.badge("shared")}><I.Check /> Shared</span> : <button style={ss.btn("small")} onClick={e => { e.stopPropagation(); setShowSharePre(p); }}><I.Upload /> Share</button>}</td>}</tr>);
          })}</tbody>
        </table>
      </div>
    </div>
  );

  // ============================================================
  // MODALS
  // ============================================================
  const PatPopup = ({ apt }) => {
    const can = isOptedIn && credits > 0;
    const h = apt.history;
    const t = tier;
    const hasField = (f) => t.fields.includes(f);
    return (
      <div style={ss.modal} onClick={() => { setShowPatPop(null); setShowInfoTip(false); }}>
        <div style={{ ...ss.modalC, maxWidth: "600px" }} onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: C.priLt, display: "flex", alignItems: "center", justifyContent: "center", color: C.pri, fontWeight: 700, fontSize: "18px" }}>{apt.patient.charAt(0)}</div>
              <div><div style={{ fontSize: "18px", fontWeight: 700 }}>{apt.patient}<span style={{ fontWeight: 400, color: C.txtS, fontSize: "14px", marginLeft: "8px" }}>Age {apt.age}</span></div><div style={{ fontSize: "13px", color: C.txtS }}>{apt.time} &middot; {apt.type}</div></div>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: C.txtM, padding: "4px" }} onClick={() => { setShowPatPop(null); setShowInfoTip(false); }}><I.X /></button>
          </div>

          {apt.hasExt && can && (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={ss.badge("active")}><I.Network /> External History</span>
                  <span style={{ fontSize: "12.5px", color: C.txtS }}>{h.visits} prior visits</span>
                </div>
                <TierIndicator credits={credits} />
              </div>

              {/* Always visible: area + phase */}
              {hasField("area") && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
                  <div><div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: C.txtM, marginBottom: "3px" }}>Treatment Area</div><div style={{ fontSize: "14px", fontWeight: 500 }}>{h.area}</div></div>
                  <div><div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: C.txtM, marginBottom: "3px" }}>Phase</div><span style={ss.badge("info")}>{h.phase}</span></div>
                  <div><div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: C.txtM, marginBottom: "3px" }}>Last Visit</div><div>{h.lastVisit}</div></div>
                  <div><div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: C.txtM, marginBottom: "3px" }}>Total Visits</div><div>{h.visits}</div></div>
                </div>
              )}

              {/* ROM + Pain: Standard+ */}
              {hasField("rom") ? (
                <div style={{ padding: "14px", background: C.bg, borderRadius: "8px", marginBottom: "12px" }}>
                  <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "10px" }}>Objective Measurements</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div><div style={{ fontSize: "11px", color: C.txtM }}>ROM (Start)</div><div>{h.romS}</div></div>
                    <div><div style={{ fontSize: "11px", color: C.txtM }}>ROM (Current)</div><div style={{ fontWeight: 600, color: C.ok }}>{h.romC}</div></div>
                    <div><div style={{ fontSize: "11px", color: C.txtM }}>Pain (Start)</div><div>{h.painS}</div></div>
                    <div><div style={{ fontSize: "11px", color: C.txtM }}>Pain (Current)</div><div style={{ fontWeight: 600, color: C.ok }}>{h.painC}</div></div>
                  </div>
                </div>
              ) : (
                <LockedField label="Objective Measurements (ROM, Pain)" nextTier="5" />
              )}

              {/* Patient reported: Full only */}
              {hasField("reported") ? (
                <div style={{ padding: "14px", background: C.bg, borderRadius: "8px", marginBottom: "12px", marginTop: hasField("rom") ? 0 : "8px" }}>
                  <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "4px" }}>Patient-Reported Outcome</div>
                  <div style={{ fontSize: "13px", color: C.txtS, fontStyle: "italic" }}>"{h.reported}"</div>
                </div>
              ) : (
                <div style={{ marginTop: "8px" }}><LockedField label="Patient-Reported Outcome" nextTier="10" /></div>
              )}

              {/* Upgrade nudge */}
              {t.label !== "Full" && (
                <div style={{ marginTop: "12px", padding: "12px 14px", background: C.priLt, borderRadius: "8px", fontSize: "12.5px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <I.Info />
                  <span>You have <strong>{t.label}</strong> access. Share more records from <strong>My Patients</strong> to unlock {t.label === "Basic" ? "ROM and pain scores (5+ credits)" : "patient-reported outcomes (10+ credits)"}.</span>
                </div>
              )}

              {/* Redacted */}
              <div style={{ padding: "10px 14px", background: C.errBg, borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: C.txtS, marginTop: "12px" }}><I.Shield /><span>Source clinic: <strong style={{ color: C.err }}>[REDACTED]</strong> &middot; Therapist: <strong style={{ color: C.err }}>[REDACTED]</strong> &middot; Methods: <strong style={{ color: C.err }}>[REDACTED]</strong></span></div>
            </div>
          )}

          {apt.hasExt && !can && (
            <div style={{ padding: "28px", textAlign: "center" }}>
              <div style={{ color: C.txtM, marginBottom: "10px" }}><I.Lock /></div>
              <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>External History Exists but Locked</div>
              <div style={{ fontSize: "13px", color: C.txtS, marginBottom: "20px", maxWidth: "380px", margin: "0 auto 20px" }}>This patient has records from another clinic, but your clinic {!isOptedIn ? "has not joined the Sharing Network" : "has no access credits"}.</div>
              <button style={ss.btn("accent")} onClick={handleReqShare}><I.Send /> Request Admin to Enable Sharing</button>
              {showReqSent && <div style={{ marginTop: "12px", padding: "10px", background: C.okBg, borderRadius: "8px", fontSize: "13px", color: "#059669" }}>Request sent to clinic admin.</div>}
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: C.pri, fontSize: "13px", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }} onClick={() => setShowInfoTip(!showInfoTip)}><I.Help /> What is the Sharing Network?</button>
                {showInfoTip && <div style={{ marginTop: "10px", padding: "14px", background: C.bg, borderRadius: "8px", fontSize: "12.5px", color: C.txtS, lineHeight: 1.7 }}><strong>What gets shared:</strong> Treatment area, diagnosis, phase, ROM/pain scores, patient-reported outcomes.<br/><br/><strong>Never shared:</strong> Clinic name, therapist identity, treatment methods, clinical notes, billing.<br/><br/><strong>How it works:</strong> When your clinic joins and contributes records, therapists can view incoming patients' history. Access depth scales with contribution level.</div>}
              </div>
            </div>
          )}

          {!apt.hasExt && (
            <div style={{ padding: "28px", textAlign: "center" }}><div style={{ fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>{apt.isNew ? "First Visit \u2014 No Prior Records" : "No External History"}</div><div style={{ fontSize: "13px", color: C.txtS }}>{apt.isNew ? "First physiotherapy visit. No prior records in the network." : `${apt.patient} has no records from other participating clinics.`}</div></div>
          )}
        </div>
      </div>
    );
  };

  const SharePreModal = ({ p }) => (
    <div style={ss.modal} onClick={() => setShowSharePre(null)}>
      <div style={ss.modalC} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "4px" }}>Share Patient Record</div>
        <div style={{ fontSize: "13px", color: C.txtS, marginBottom: "20px" }}>Review data for <strong>{p.patient}</strong>.</div>
        <div style={{ background: C.bg, borderRadius: "8px", padding: "16px", marginBottom: "16px" }}>
          <div style={{ fontWeight: 600, fontSize: "13px", marginBottom: "12px", color: C.ok }}>Data to be shared:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
            <div><div style={{ fontSize: "11px", color: C.txtM, textTransform: "uppercase", letterSpacing: "0.05em" }}>Treatment Area</div><div style={{ fontWeight: 500 }}>{p.area}</div></div>
            <div><div style={{ fontSize: "11px", color: C.txtM, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phase</div><span style={ss.badge("info")}>{p.phase}</span></div>
            <div><div style={{ fontSize: "11px", color: C.txtM, textTransform: "uppercase", letterSpacing: "0.05em" }}>ROM</div><div>{p.romS} &rarr; <strong style={{ color: C.ok }}>{p.romC}</strong></div></div>
            <div><div style={{ fontSize: "11px", color: C.txtM, textTransform: "uppercase", letterSpacing: "0.05em" }}>Pain</div><div>{p.painS} &rarr; <strong style={{ color: C.ok }}>{p.painC}</strong></div></div>
            <div style={{ gridColumn: "1 / -1" }}><div style={{ fontSize: "11px", color: C.txtM, textTransform: "uppercase", letterSpacing: "0.05em" }}>Patient-Reported</div><div style={{ fontStyle: "italic" }}>"{p.reported}"</div></div>
          </div>
        </div>
        <div style={{ background: C.errBg, borderRadius: "8px", padding: "12px 14px", marginBottom: "16px", fontSize: "12.5px", display: "flex", alignItems: "center", gap: "8px" }}><I.Shield /><span>Your clinic name, your name, treatment methods, and clinical notes are <strong>never shared</strong>.</span></div>
        <div style={{ background: C.priLt, borderRadius: "8px", padding: "12px 14px", marginBottom: "20px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><I.Star /><span>Earn <strong style={{ color: C.pri }}>+{isFounder ? p.credits * 2 : p.credits} credits</strong>{isFounder ? " (Founder 2x)" : ""}.</span></div>
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}><button style={ss.btn("ghost")} onClick={() => setShowSharePre(null)}>Cancel</button><button style={ss.btn("primary")} onClick={() => handleSharePat(p)}><I.Upload /> Confirm Share</button></div>
      </div>
    </div>
  );

  // ============================================================
  const aN = [{ id: "dashboard", label: "Dashboard", icon: <I.Dashboard /> }, { id: "benchmark", label: "Benchmark", icon: <I.Chart /> }, { id: "settings", label: "Settings", icon: <I.Settings /> }];
  const pN = [{ id: "appointments", label: "Appointments", icon: <I.Calendar /> }, { id: "mypatients", label: "My Patients", icon: <I.Users /> }, { id: "benchmark", label: "Benchmark", icon: <I.Chart /> }];
  const nav = role === "admin" ? aN : pN;
  const pg = role === "admin" ? adminPage : physioPage;
  const setPg = role === "admin" ? setAdminPage : setPhysioPage;
  const renderPg = () => {
    if (role === "admin") { if (adminPage === "dashboard") return <AdminDashboard />; if (adminPage === "benchmark") return <BenchContent isPhysio={false} />; if (adminPage === "settings") return <AdminSettings />; }
    else { if (physioPage === "appointments") return <PhysioAppts />; if (physioPage === "mypatients") return <PhysioMyPat />; if (physioPage === "benchmark") return <><NetBar /><BenchContent isPhysio={true} /></>; }
  };

  return (
    <div style={ss.app}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={ss.topBar}>
        <div style={ss.logo}><div style={ss.logoMark}>K</div><span>Kinetic</span><span style={{ fontSize: "12px", fontWeight: 400, opacity: 0.6, marginLeft: "4px" }}>Sharing Network</span></div>
        <div style={ss.roleSw}><button style={ss.roleBtn(role === "admin")} onClick={() => setRole("admin")}>Clinic Admin</button><button style={ss.roleBtn(role === "physio")} onClick={() => setRole("physio")}>Physiotherapist</button></div>
      </div>
      <div style={ss.layout}>
        <div style={ss.side}>
          <div style={ss.sideLabel}>{role === "admin" ? "Administration" : "Clinical"}</div>
          {nav.map(item => <button key={item.id} style={ss.navItem(pg === item.id)} onClick={() => setPg(item.id)}>{item.icon}<span>{item.label}</span></button>)}
          <div style={{ marginTop: "auto", padding: "16px" }}>
            {role === "physio" && (<div style={{ padding: "14px", background: C.priLt, borderRadius: "8px", marginBottom: "10px" }}><div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 700, fontSize: "13px" }}>{PHYSIO.avatar}</div><div><div style={{ fontWeight: 600, fontSize: "13px" }}>{PHYSIO.name}</div><div style={{ fontSize: "11px", color: C.txtS }}>{PHYSIO.title}</div></div></div><div style={{ fontSize: "11.5px", color: C.txtS, lineHeight: 1.6 }}>{PHYSIO.specialties.join(", ")}<br/>{PHYSIO.yearsExp} years experience</div></div>)}
            <div style={{ padding: "14px", background: C.bg, borderRadius: "8px", fontSize: "12px", color: C.txtS, lineHeight: 1.5 }}><div style={{ fontWeight: 600, marginBottom: "4px", color: C.txt, fontSize: "12.5px" }}>{CLINIC.name}</div>{CLINIC.location}<br/>{CLINIC.physios} physiotherapists<br/>{CLINIC.patients} patients/month</div>
          </div>
        </div>
        <div style={ss.main}>{renderPg()}</div>
      </div>

      {showOptIn && (<div style={ss.modal} onClick={() => setShowOptIn(false)}><div style={ss.modalC} onClick={e => e.stopPropagation()}><div style={{ fontSize: "20px", fontWeight: 700, marginBottom: "4px" }}>Join the Kinetic Sharing Network</div><div style={{ fontSize: "13.5px", color: C.txtS, marginBottom: "20px" }}>Share patient history across clinics to improve continuity of care.</div><div style={{ padding: "14px", background: C.warnBg, borderRadius: "8px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}><I.Star /><div style={{ fontSize: "13px" }}><strong>Founder Bonus:</strong> <strong>2x credits</strong> for 12 months.</div></div><div style={{ marginBottom: "20px" }}><div style={{ fontWeight: 600, fontSize: "14px", marginBottom: "10px" }}>How it works:</div>{["Share records to earn credits \u2014 access depth scales with contribution", "1\u20134 credits: Basic (area + phase) | 5\u20139: Standard (+ROM, pain) | 10+: Full (+patient-reported, benchmark)", "Credits decay after 6 months \u2014 continue sharing to maintain access", "Clinic name, therapist names, and treatment methods are never shared"].map((t, i) => (<div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px", color: C.txtS, marginBottom: "6px" }}><span style={{ color: C.ok, marginTop: "2px", flexShrink: 0 }}><I.Check /></span>{t}</div>))}</div><div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}><button style={ss.btn("ghost")} onClick={() => setShowOptIn(false)}>Not Now</button><button style={ss.btn("primary")} onClick={handleOptIn}>Join Network</button></div></div></div>)}

      {showLeave && (<div style={ss.modal} onClick={() => setShowLeave(false)}><div style={ss.modalC} onClick={e => e.stopPropagation()}><div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}><div style={{ width: "40px", height: "40px", borderRadius: "10px", background: C.errBg, display: "flex", alignItems: "center", justifyContent: "center", color: C.err }}><I.Alert /></div><div style={{ fontSize: "18px", fontWeight: 700 }}>Leave the Sharing Network?</div></div><div style={{ fontSize: "13.5px", color: C.txtS, marginBottom: "20px" }}>Immediate and affects your entire clinic.</div><div style={{ background: C.errBg, borderRadius: "8px", padding: "16px", marginBottom: "20px" }}><div style={{ fontWeight: 600, fontSize: "13.5px", color: C.err, marginBottom: "10px" }}>You will lose:</div><div style={{ display: "grid", gap: "8px" }}>{[{ l: `${credits} credits (${tier.label} tier)`, d: "Reset to zero. Cannot be recovered." }, { l: "All patient history access", d: "Therapists lose all shared record access." }, { l: bu ? "Benchmark dashboard" : "Benchmark progress", d: bu ? "Lose all benchmark analytics." : `${credits}/${BT} progress resets.` }, { l: isFounder ? "Founder status (2x)" : "Early adopter eligibility", d: isFounder ? "Cannot be restored." : "Only during early window." }].map((item, i) => (<div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "13px" }}><span style={{ color: C.err, marginTop: "2px", flexShrink: 0 }}><I.X /></span><div><strong>{item.l}</strong><br/><span style={{ color: C.txtS }}>{item.d}</span></div></div>))}</div></div><div style={{ background: C.warnBg, borderRadius: "8px", padding: "12px 14px", marginBottom: "20px", fontSize: "13px", display: "flex", alignItems: "center", gap: "8px" }}><I.Info /><span>Previously shared records <strong>remain in the network</strong>.</span></div><div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}><button style={ss.btn("ghost")} onClick={() => setShowLeave(false)}>Cancel</button><button style={ss.btn("danger")} onClick={handleLeave}>Leave Network</button></div></div></div>)}

      {showPatPop && <PatPopup apt={showPatPop} />}
      {showSharePre && <SharePreModal p={showSharePre} />}
    </div>
  );
}
