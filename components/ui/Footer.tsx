export function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-8">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <span className="font-mono text-xs text-[#555555]">
          © {new Date().getFullYear()} Nicholas William Hadiwijaya
        </span>
        <a
          href="#top"
          className="font-mono text-xs text-[#555555] hover:text-[#00d9b8] transition-colors duration-200"
        >
          back to top ↑
        </a>
      </div>
    </footer>
  );
}
