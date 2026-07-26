import React from "react";
import { CATEGORY_STYLES } from "@/lib/api";

export default function CategoryBadge({ code }) {
  const cls = CATEGORY_STYLES[code] || "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-extrabold tracking-wide ${cls}`}>
      {code}
    </span>
  );
}
