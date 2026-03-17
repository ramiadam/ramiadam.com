export function Footer() {
  return (
    <footer className="px-6 md:px-10 lg:px-16 py-8 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground/50">
          &copy; {new Date().getFullYear()} Rami Adam
        </p>
        <p className="text-[11px] tracking-widest uppercase text-muted-foreground/30">
          Made in KSA
        </p>
      </div>
    </footer>
  )
}
