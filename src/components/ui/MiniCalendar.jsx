import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatMonthYear } from "@/utils/dateFormatter";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

export default function KalenderMini({ tugas = [] }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const changeMonth = (direction) => {
    setCurrentMonth(
      direction === 1 ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1),
    );
  };

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);

  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = [];
  let day = startDate;

  while (day <= endDate) {
    const currentDay = day;

    const hasTugas = tugas.some((t) =>
      isSameDay(new Date(t.deadline), currentDay),
    );

    days.push(
      <motion.div
        key={currentDay.toString()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className={`flex h-14 flex-col items-center justify-center rounded-lg border text-sm font-semibold transition-colors
          ${
            !isSameMonth(currentDay, monthStart)
              ? "text-primary/40 border-secondary/30"
              : "text-primary border-primary"
          }`}
      >
        <span>{currentDay.getDate()}</span>

        {hasTugas && (
          <div className="mt-1 flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
        )}
      </motion.div>,
    );

    day = addDays(day, 1);
  }

  return (
    <div className="rounded-2xl border border-primary/50 bg-white p-4 shadow text-primary">
      <div className="mb-4 flex items-center gap-2 text-indigo-900">
        <Calendar className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Kalender Tugas</h2>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => changeMonth(-1)}
          className="rounded-lg p-2 hover:bg-indigo-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-indigo-900">
          {formatMonthYear(currentMonth)}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          className="rounded-lg p-2 hover:bg-indigo-50 transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
        {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentMonth.toString()}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-1"
        >
          {days}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}