import Image from "next/image";

/*
 * Intro shown on every full load/reload. Server-rendered and driven purely by
 * CSS keyframes (`.splash*` in globals.css), so it paints before hydration and
 * never flashes the page underneath. It ends with `visibility: hidden`, so it
 * never blocks clicks once done.
 */
export function Splash() {
  return (
    <div aria-hidden="true" className="splash bg-background">
      <div className="splash-mark">
        <div className="splash-glow" />
        <Image
          src="/brand/s-logo.webp"
          alt=""
          width={840}
          height={840}
          preload
          sizes="(min-width: 768px) 420px, 70vw"
          className="splash-logo"
        />
      </div>
    </div>
  );
}
