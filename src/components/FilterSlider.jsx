export default function FilterSlider({ value, onChange, options, label }) {
  return (
    <div className="w-full mt-2">
      {label && <label className="text-xs text-slate-400 font-medium mb-1 block">{label}</label>}
      <input 
        type="range" 
        min={0} 
        max={options.length - 1} 
        step={1} 
        value={options.indexOf(value)} 
        onChange={(e) => onChange(options[Number(e.target.value)])}
        className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between mt-1 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
        {options.map((opt) => (
          <span key={opt} className={value === opt ? "text-emerald-400" : ""}>{opt}</span>
        ))}
      </div>
    </div>
  );
}
