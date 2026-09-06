import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  Dumbbell,
  Droplets,
  BookOpen,
  Code2,
  Moon,
  Flower2,
  Cat,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Info,
  Pencil,
} from "lucide-react";

// ---------- design tokens ----------
const INK = "#2C2A28";
const MINT_TOP = "#BFE7DD";
const MINT_BOT = "#EFF8F2";
const CARD = "#FFFFFF";
const PLUM = "#9C6C9A";
const PLUM_DEEP = "#7E4F7E";
const PLUM_SOFT = "#E7D5E6";
const PLUM_MED = "#C9A0C7";
const ORANGE = "#E8944A";
const CREAM = "#FBF3E7";
const RED = "#D9614F";
const MUTED = "#8A9490";

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;600;700&family=Fredoka:wght@500;600;700&display=swap');";

// ---------- activity catalog ----------
const ICON_CATALOG = [
  { key: "exercise", label: "ออกกำลังกาย", Icon: Dumbbell },
  { key: "water", label: "ดื่มน้ำ", Icon: Droplets },
  { key: "read", label: "อ่านหนังสือ", Icon: BookOpen },
  { key: "code", label: "ฝึกโค้ด", Icon: Code2 },
  { key: "sleep", label: "นอนให้พอ", Icon: Moon },
  { key: "meditate", label: "นั่งสมาธิ", Icon: Flower2 },
];

const iconFor = (key) =>
  (ICON_CATALOG.find((c) => c.key === key) || ICON_CATALOG[0]).Icon;

// ---------- small UI atoms ----------
function Screen({ children }) {
  return (
    <div
      className="w-full h-full flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${MINT_TOP} 0%, ${MINT_BOT} 100%)`,
        fontFamily: "'Kanit', sans-serif",
        color: INK,
      }}
    >
      {children}
    </div>
  );
}

function TopBar({ title, onBack, rightAction }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 pt-6 pb-2 shrink-0">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: INK, color: "white" }}
          >
            <ArrowLeft size={18} />
          </button>
        ) : (
          <div className="w-9 h-9 shrink-0" />
        )}
        {title && (
          <h1 className="text-xl font-semibold leading-tight">{title}</h1>
        )}
      </div>
      {rightAction ? (
        rightAction
      ) : (
        <div className="w-9 h-9 shrink-0" />
      )}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, tone = "plum" }) {
  const bg = tone === "plum" ? PLUM : ORANGE;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-full py-3.5 font-semibold text-white transition active:scale-[0.98]"
      style={{
        background: disabled ? PLUM_MED : bg,
        boxShadow: disabled ? "none" : `0 6px 16px ${PLUM}55`,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style }) {
  return (
    <div
      className="rounded-3xl p-5"
      style={{ background: CARD, boxShadow: "0 8px 24px rgba(40,60,55,0.08)", ...style }}
    >
      {children}
    </div>
  );
}

// ---------- Home ----------
function HomeScreen({ go }) {
  return (
    <Screen>
      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-10">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center relative"
            style={{ border: `2px dashed ${INK}55` }}
          >
            <Cat size={56} color={INK} strokeWidth={1.5} />
            <Sparkles
              size={22}
              color={INK}
              className="absolute -top-1 -left-1"
              strokeWidth={1.5}
            />
          </div>
          <div className="text-center leading-tight">
            <p className="text-3xl font-semibold" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              21 Days
            </p>
            <p className="text-sm" style={{ color: MUTED }}>
              with me
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => go("activities")}
            className="w-full rounded-2xl py-5 text-lg font-semibold"
            style={{ background: CARD, boxShadow: "0 8px 20px rgba(40,60,55,0.10)" }}
          >
            กิจกรรมของฉัน
          </button>
        </div>
      </div>
      <p className="text-center text-xs pb-5" style={{ color: MUTED }}>
        สร้างนิสัยใหม่ ทีละ 21 วัน ไปด้วยกันกับแมวน้อยของคุณ
      </p>
    </Screen>
  );
}

// ---------- Activities grid ----------
function ActivitiesScreen({ activities, go, back, onResetAll }) {
  return (
    <Screen>
      <TopBar title="กิจกรรมของคุณ" onBack={back} />
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="grid grid-cols-2 gap-4 mt-2">
          {activities.map((a) => {
            const Icon = iconFor(a.icon);
            const pct = Math.round((a.completedDays.length / 21) * 100);
            return (
              <button
                key={a.id}
                onClick={() => go("tracker", a.id)}
                className="rounded-3xl p-4 flex flex-col items-center gap-2 text-left"
                style={{ background: CARD, boxShadow: "0 8px 20px rgba(40,60,55,0.08)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: CREAM }}
                >
                  <Icon size={28} color={ORANGE} strokeWidth={1.8} />
                </div>
                <p className="w-full text-sm font-medium text-center truncate">{a.name}</p>
                <p className="text-xs" style={{ color: MUTED }}>
                  {pct}% ใน 21 วัน
                </p>
              </button>
            );
          })}
          <button
            onClick={() => go("addIcon")}
            className="rounded-3xl flex items-center justify-center aspect-square"
            style={{ background: CARD, boxShadow: "0 8px 20px rgba(40,60,55,0.08)" }}
          >
            <Plus size={30} color={INK} />
          </button>
        </div>
        {activities.length === 0 && (
          <p className="text-center text-sm mt-8" style={{ color: MUTED }}>
            ยังไม่มีกิจกรรม — แตะ + เพื่อเริ่มสร้างนิสัยใหม่
          </p>
        )}
        {activities.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("ล้างข้อมูลกิจกรรมทั้งหมดที่บันทึกไว้ในเครื่องนี้?")) {
                onResetAll();
              }
            }}
            className="w-full text-center text-xs mt-8 underline"
            style={{ color: MUTED }}
          >
            ล้างข้อมูลทั้งหมด
          </button>
        )}
      </div>
    </Screen>
  );
}

// ---------- Add flow: pick icon ----------
function AddIconScreen({ draft, setDraft, go, back }) {
  return (
    <Screen>
      <TopBar title="เลือกกิจกรรมที่สนใจ" onBack={back} />
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        <div className="grid grid-cols-2 gap-4 mt-2">
          {ICON_CATALOG.map(({ key, label, Icon }) => {
            const selected = draft.icon === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setDraft((d) => ({ ...d, icon: key, name: label }));
                }}
                className="rounded-3xl p-5 flex flex-col items-center gap-3 aspect-square justify-center"
                style={{
                  background: CARD,
                  boxShadow: selected
                    ? `0 0 0 3px ${PLUM}, 0 8px 20px rgba(40,60,55,0.08)`
                    : "0 8px 20px rgba(40,60,55,0.08)",
                }}
              >
                <Icon size={36} color={ORANGE} strokeWidth={1.6} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="px-5 pb-8">
        <PrimaryButton disabled={!draft.icon} onClick={() => go("addDetails")}>
          ถัดไป
        </PrimaryButton>
      </div>
    </Screen>
  );
}

// ---------- Add flow: name + description ----------
function AddDetailsScreen({ draft, setDraft, go, back }) {
  return (
    <Screen>
      <TopBar onBack={back} />
      <div className="flex-1 overflow-y-auto px-6">
        <h1 className="text-2xl font-semibold text-center mb-6">กิจกรรม</h1>
        <label className="block text-sm font-medium mb-2">ชื่อกิจกรรม</label>
        <input
          value={draft.name}
          onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          placeholder="กรอกชื่อกิจกรรม"
          className="w-full rounded-2xl px-4 py-3 mb-6 outline-none"
          style={{ background: CARD, boxShadow: "0 4px 14px rgba(40,60,55,0.08)" }}
        />
        <label className="block text-sm font-medium mb-2">รายละเอียด</label>
        <textarea
          value={draft.description}
          onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          placeholder="กรอกรายละเอียดของกิจกรรม"
          rows={5}
          className="w-full rounded-2xl px-4 py-3 outline-none resize-none"
          style={{ background: CARD, boxShadow: "0 4px 14px rgba(40,60,55,0.08)" }}
        />
      </div>
      <div className="px-6 py-8">
        <PrimaryButton disabled={!draft.name.trim()} onClick={() => go("addCalendar")}>
          ถัดไป
        </PrimaryButton>
      </div>
    </Screen>
  );
}

// ---------- Add flow: pick start date ----------
const MONTH_NAMES = [
  "มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
  "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
];
const DOW = ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];

function AddCalendarScreen({ draft, setDraft, go, back, onCreate }) {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => {
    const first = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    // convert Sun=0..Sat=6 to Mon=0..Sun=6
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < startOffset; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
    }
    return arr;
  }, [viewDate]);

  const selected = draft.startDate;

  return (
    <Screen>
      <TopBar onBack={back} />
      <div className="flex-1 flex flex-col px-6">
        <h1 className="text-2xl font-semibold text-center mb-6">เลือกวันที่จะเริ่มต้น</h1>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() =>
                setViewDate((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))
              }
            >
              <ChevronLeft size={18} />
            </button>
            <p className="font-semibold">
              {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear() + 543}
            </p>
            <button
              onClick={() =>
                setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2" style={{ color: MUTED }}>
            {DOW.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const isPast = d < today;
              const isSelected = selected && d.toDateString() === selected.toDateString();
              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => setDraft((dr) => ({ ...dr, startDate: d }))}
                  className="rounded-full aspect-square flex items-center justify-center"
                  style={{
                    color: isPast ? "#00000030" : isSelected ? "white" : INK,
                    background: isSelected ? PLUM : "transparent",
                    fontWeight: isSelected ? 600 : 400,
                  }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </Card>
      </div>
      <div className="px-6 py-8">
        <PrimaryButton disabled={!selected} onClick={onCreate}>
          เริ่ม
        </PrimaryButton>
      </div>
    </Screen>
  );
}

// ---------- Tracker ----------
function CircleProgress({ pct, size = 168 }) {
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={PLUM_SOFT}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={PLUM}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}

function TrackerScreen({ activity, back, onComplete, onSkip, onRemove, go }) {
  const [toast, setToast] = useState(null); // {type:'success'|'failed'}
  const [showFailModal, setShowFailModal] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1100);
    return () => clearTimeout(t);
  }, [toast]);

  const pct = (activity.completedDays.length / 21) * 100;
  const finished = activity.currentDay > 21;

  const handleComplete = () => {
    if (finished) return;
    onComplete(activity.id);
    setToast({ type: "success" });
  };
  const handleSkip = () => {
    if (finished) return;
    const willReachThreeFails =
      activity.missedDays.length + 1 >= 3 || activity.missStreak + 1 >= 3;
    if (willReachThreeFails) {
      setShowFailModal(true);
    } else {
      onSkip(activity.id);
      setToast({ type: "failed" });
    }
  };

  const handleConfirmFailRemoval = () => {
    setShowFailModal(false);
    onSkip(activity.id);
  };

  const handleRemove = () => {
    if (window.confirm(`ต้องการลบกิจกรรม "${activity.name}" หรือไม่?`)) {
      onRemove(activity.id);
    }
  };

  const Icon = iconFor(activity.icon);

  return (
    <Screen>
      <TopBar
        title="การติดตามกิจกรรม"
        onBack={back}
        rightAction={
          <button
            onClick={() => go("activityDetail", activity.id)}
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition active:scale-95"
            style={{ background: CARD, color: INK, boxShadow: "0 4px 12px rgba(40,60,55,0.10)" }}
            aria-label="ดูรายละเอียดกิจกรรม"
          >
            <Info size={18} />
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: CREAM }}>
            <Icon size={18} color={ORANGE} />
          </div>
          <p className="font-medium">{activity.name}</p>
        </div>

        <div className="my-2">
          <CircleProgress pct={pct} />
        </div>

        {finished ? (
          <Card style={{ marginTop: 8, textAlign: "center" }}>
            <p className="font-semibold mb-1">ครบ 21 วันแล้ว! 🎉</p>
            <p className="text-sm" style={{ color: MUTED }}>
              เธอทำสำเร็จ {activity.completedDays.length} วัน จาก 21 วัน เก่งมากเลยนะ
            </p>
          </Card>
        ) : (
          <p className="text-sm mt-1 mb-4" style={{ color: MUTED }}>
            วันที่ {Math.min(activity.currentDay, 21)} จาก 21
          </p>
        )}

        <Card style={{ width: "100%", marginTop: 12 }}>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => {
              const done = activity.completedDays.includes(day);
              const missed = activity.missedDays.includes(day);
              const isToday = day === activity.currentDay && !finished;
              let bg = PLUM_SOFT;
              let color = PLUM_DEEP;
              if (done) {
                bg = PLUM;
                color = "white";
              } else if (missed) {
                bg = "#EADCD9";
                color = RED;
              }
              return (
                <div
                  key={day}
                  className="rounded-full aspect-square flex items-center justify-center text-xs font-semibold relative"
                  style={{
                    background: bg,
                    color,
                    boxShadow: isToday ? `0 0 0 2px ${INK}` : "none",
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </Card>

        {finished ? (
          <div className="w-full mt-6">
            <PrimaryButton onClick={handleRemove}>
              ลบกิจกรรมนี้
            </PrimaryButton>
          </div>
        ) : (
          <div className="w-full flex gap-3 mt-6">
            <button
              onClick={handleSkip}
              className="flex-1 rounded-full py-3 font-semibold border"
              style={{ borderColor: RED + "66", color: RED }}
            >
              วันนี้พลาด
            </button>
            <div className="flex-[1.4]">
              <PrimaryButton onClick={handleComplete}>สำเร็จ</PrimaryButton>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-3xl px-10 py-8 flex flex-col items-center gap-3"
            style={{
              background: toast.type === "success" ? PLUM : "#4B5A54",
              color: "white",
              boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
            }}
          >
            {toast.type === "success" ? (
              <CheckCircle2 size={40} />
            ) : (
              <XCircle size={40} />
            )}
            <p className="text-xl font-bold">
              {toast.type === "success" ? "Success!" : "Failed"}
            </p>
          </div>
        </div>
      )}

      {showFailModal && (
        <div className="absolute inset-0 flex items-end" style={{ background: "rgba(20,25,23,0.45)" }}>
          <div
            className="w-full rounded-t-3xl p-6 flex flex-col items-center gap-4"
            style={{ background: CARD }}
          >
            <XCircle size={48} color={RED} />
            <div className="text-center">
              <p className="text-lg font-bold" style={{ color: RED }}>
                พลาดกิจกรรมครบ 3 วันแล้ว
              </p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: MUTED }}>
                คุณพลาดกิจกรรม "{activity.name}" ครบ 3 ครั้งแล้ว<br />
                กิจกรรมนี้จึงถูกยกเลิกและนำออกจากรายการของคุณ
              </p>
            </div>
            <div className="w-full">
              <PrimaryButton onClick={handleConfirmFailRemoval}>
                รับทราบ
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}

// ---------- Activity Detail ----------
function ActivityDetailScreen({ activity, onUpdate, back }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(activity.name);
  const [description, setDescription] = useState(activity.description || "");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setName(activity.name);
    setDescription(activity.description || "");
  }, [activity]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 1200);
    return () => clearTimeout(t);
  }, [toast]);

  const handleSave = () => {
    if (!name.trim()) return;
    onUpdate(activity.id, (a) => ({
      ...a,
      name: name.trim(),
      description: description.trim(),
    }));
    setIsEditing(false);
    setToast(true);
  };

  const handleCancel = () => {
    setName(activity.name);
    setDescription(activity.description || "");
    setIsEditing(false);
  };

  const Icon = iconFor(activity.icon);
  const formattedDate = activity.startDate
    ? new Date(activity.startDate).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "ไม่ได้ระบุ";

  return (
    <Screen>
      <TopBar
        title={isEditing ? "แก้ไขกิจกรรม" : "รายละเอียดกิจกรรม"}
        onBack={isEditing ? handleCancel : back}
        rightAction={
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition active:scale-95"
              style={{ background: CARD, color: INK, boxShadow: "0 4px 12px rgba(40,60,55,0.10)" }}
              aria-label="แก้ไขข้อมูลกิจกรรม"
            >
              <Pencil size={17} />
            </button>
          ) : null
        }
      />
      <div className="flex-1 overflow-y-auto px-6 pb-6 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: CREAM, boxShadow: "0 8px 20px rgba(40,60,55,0.08)" }}
          >
            <Icon size={40} color={ORANGE} strokeWidth={1.8} />
          </div>
          {!isEditing ? (
            <h2 className="text-xl font-bold text-center">{activity.name}</h2>
          ) : (
            <div className="w-full">
              <label className="block text-xs font-semibold mb-1 text-center" style={{ color: MUTED }}>
                ชื่อกิจกรรม
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="กรอกชื่อกิจกรรม"
                className="w-full text-center font-bold text-lg rounded-2xl px-4 py-2.5 outline-none"
                style={{ background: CARD, boxShadow: "0 4px 14px rgba(40,60,55,0.08)" }}
              />
            </div>
          )}
        </div>

        <Card>
          <p className="text-xs font-semibold mb-2" style={{ color: MUTED }}>
            รายละเอียดกิจกรรม
          </p>
          {!isEditing ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {activity.description && activity.description.trim()
                ? activity.description
                : "ไม่มีรายละเอียดเพิ่มเติม"}
            </p>
          ) : (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="กรอกรายละเอียดของกิจกรรม"
              rows={4}
              className="w-full rounded-2xl px-4 py-3 outline-none resize-none text-sm"
              style={{
                background: "#F9FAF9",
                border: `1px solid ${PLUM_SOFT}`,
              }}
            />
          )}
        </Card>

        {!isEditing ? (
          <Card>
            <div className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: "#00000010" }}>
              <span className="text-sm" style={{ color: MUTED }}>วันที่เริ่มต้น</span>
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: "#00000010" }}>
              <span className="text-sm" style={{ color: MUTED }}>ความคืบหน้า</span>
              <span className="text-sm font-medium">วันที่ {Math.min(activity.currentDay, 21)} / 21</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-sm" style={{ color: MUTED }}>สำเร็จแล้ว</span>
              <span className="text-sm font-medium" style={{ color: PLUM_DEEP }}>
                {activity.completedDays.length} วัน
              </span>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <PrimaryButton disabled={!name.trim()} onClick={handleSave}>
              บันทึกการแก้ไข
            </PrimaryButton>
            <button
              onClick={handleCancel}
              className="w-full rounded-full py-3 text-sm font-medium"
              style={{ color: MUTED }}
            >
              ยกเลิก
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-3xl px-8 py-6 flex flex-col items-center gap-2"
            style={{
              background: PLUM,
              color: "white",
              boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
            }}
          >
            <CheckCircle2 size={36} />
            <p className="text-lg font-bold">บันทึกสำเร็จ</p>
          </div>
        </div>
      )}
    </Screen>
  );
}

// ---------- root app ----------
const emptyDraft = () => ({
  icon: "",
  name: "",
  description: "",
  startDate: null,
});

function makeActivity(draft) {
  const id = `act_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  return {
    id,
    icon: draft.icon,
    name: draft.name.trim(),
    description: draft.description,
    startDate: draft.startDate,
    currentDay: 1,
    completedDays: [],
    missedDays: [],
    missStreak: 0,
  };
}

const STORAGE_KEY = "meow21_activities_v1";

const SEED_ACTIVITIES = [
  {
    id: "seed_1",
    icon: "exercise",
    name: "ออกกำลังกาย",
    description: "ยกเวท 20 นาทีทุกเย็น",
    startDate: new Date(),
    currentDay: 5,
    completedDays: [1, 2, 4],
    missedDays: [3],
    missStreak: 0,
  },
  {
    id: "seed_2",
    icon: "water",
    name: "ดื่มน้ำให้ครบ",
    description: "ดื่มน้ำ 8 แก้วต่อวัน",
    startDate: new Date(),
    currentDay: 3,
    completedDays: [1, 2],
    missedDays: [],
    missStreak: 0,
  },
];

// Load saved activities from localStorage, restoring Date objects.
// Falls back to the seed demo data on first run or if storage is empty/corrupt.
function loadActivities() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_ACTIVITIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_ACTIVITIES;
    return parsed.map((a) => ({
      ...a,
      startDate: a.startDate ? new Date(a.startDate) : null,
    }));
  } catch (e) {
    console.warn("Could not read saved activities, using defaults.", e);
    return SEED_ACTIVITIES;
  }
}

export default function App() {
  const [stack, setStack] = useState([{ screen: "home" }]);
  const [activities, setActivities] = useState(loadActivities);
  const [draft, setDraft] = useState(emptyDraft());

  // Persist activities to localStorage whenever they change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (e) {
      console.warn("Could not save activities to localStorage.", e);
    }
  }, [activities]);

  const top = stack[stack.length - 1];

  const go = (screen, payload) => setStack((s) => [...s, { screen, payload }]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  const goHomeReset = () => {
    setDraft(emptyDraft());
    setStack([{ screen: "home" }]);
  };

  const updateActivity = (id, updater) =>
    setActivities((arr) => arr.map((a) => (a.id === id ? updater(a) : a)));

  const onComplete = (id) =>
    updateActivity(id, (a) => ({
      ...a,
      completedDays: [...a.completedDays, a.currentDay],
      currentDay: a.currentDay + 1,
      missStreak: 0,
    }));

  const onSkip = (id) => {
    const act = activities.find((a) => a.id === id);
    if (!act) return;
    const newStreak = act.missStreak + 1;
    const newMissed = [...act.missedDays, act.currentDay];

    if (newMissed.length >= 3 || newStreak >= 3) {
      setActivities((arr) => arr.filter((a) => a.id !== id));
      setStack((s) => {
        const next = s.filter((item) => !(item.screen === "tracker" && item.payload === id));
        return next.length > 0 ? next : [{ screen: "home" }, { screen: "activities" }];
      });
    } else {
      updateActivity(id, (a) => ({
        ...a,
        missedDays: newMissed,
        currentDay: a.currentDay + 1,
        missStreak: newStreak,
      }));
    }
  };

  const onRemove = (id) => {
    setActivities((arr) => arr.filter((a) => a.id !== id));
    setStack((s) => {
      const next = s.filter((item) => !(item.screen === "tracker" && item.payload === id));
      return next.length > 0 ? next : [{ screen: "home" }, { screen: "activities" }];
    });
  };

  const onResetAll = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Could not clear saved activities.", e);
    }
    setActivities([]);
  };

  const onCreate = () => {
    const newAct = makeActivity(draft);
    setActivities((arr) => [...arr, newAct]);
    setDraft(emptyDraft());
    setStack([{ screen: "home" }, { screen: "activities" }, { screen: "tracker", payload: newAct.id }]);
  };

  let body = null;
  if (top.screen === "home") body = <HomeScreen go={go} />;
  else if (top.screen === "activities")
    body = (
      <ActivitiesScreen
        activities={activities}
        go={go}
        back={back}
        onResetAll={onResetAll}
      />
    );
  else if (top.screen === "addIcon")
    body = <AddIconScreen draft={draft} setDraft={setDraft} go={go} back={back} />;
  else if (top.screen === "addDetails")
    body = <AddDetailsScreen draft={draft} setDraft={setDraft} go={go} back={back} />;
  else if (top.screen === "addCalendar")
    body = (
      <AddCalendarScreen
        draft={draft}
        setDraft={setDraft}
        go={go}
        back={back}
        onCreate={onCreate}
      />
    );
  else if (top.screen === "tracker") {
    const activity = activities.find((a) => a.id === top.payload) || activities[0];
    body = activity ? (
      <TrackerScreen
        activity={activity}
        back={back}
        onComplete={onComplete}
        onSkip={onSkip}
        onRemove={onRemove}
        go={go}
      />
    ) : (
      <ActivitiesScreen
        activities={activities}
        go={go}
        back={back}
        onResetAll={onResetAll}
      />
    );
  } else if (top.screen === "activityDetail") {
    const activity = activities.find((a) => a.id === top.payload) || activities[0];
    body = activity ? (
      <ActivityDetailScreen
        activity={activity}
        onUpdate={updateActivity}
        back={back}
      />
    ) : (
      <ActivitiesScreen
        activities={activities}
        go={go}
        back={back}
        onResetAll={onResetAll}
      />
    );
  }

  return (
    <div className="w-full flex items-center justify-center py-4" style={{ minHeight: 640 }}>
      <style>{FONT_IMPORT}</style>
      <div
        className="relative w-full max-w-sm rounded-[2.5rem] overflow-hidden"
        style={{ height: 720, boxShadow: "0 20px 60px rgba(20,30,27,0.25)" }}
      >
        {body}
      </div>
    </div>
  );
}
