const CustomSpinner = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-[3px]">
      <div className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/90 px-8 py-7 shadow-xl shadow-slate-900/10">
        {/* Spinner */}
        <div className="relative h-12 w-12">
          {/* Background ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />

          {/* Animated ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600 border-r-indigo-500" />

          {/* Center glow */}
          <div className="absolute inset-[11px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30" />
        </div>
      </div>
    </div>
  );
};

export default CustomSpinner;