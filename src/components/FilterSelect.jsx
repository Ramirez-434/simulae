export default function FilterSelect({ value, onChange, options, label }) {
  return (
    <div className="w-full mt-2">
      {label && <label className="text-xs text-slate-400 font-medium mb-1 block">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-900/50 dark:bg-slate-900/50 bg-white/5 border border-slate-700/50 rounded-md p-2 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-500 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
