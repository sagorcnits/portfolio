import { IntroOverlay } from "./intro-overlay";
import {
  getNextIntroPhrase,
  INTRO_PHRASE_KEY,
  INTRO_PHRASES,
} from "./intro-phrases";
import styles from "./intro-sequence.module.css";

const intro = `.${styles.intro}`;
const page = (tag: string) => `html:has(${intro}) #top>${tag}`;

// All phrase sets are server-rendered hidden; this picks one and reveals it via an
// injected style. Same HTML on server and client (no hydration mismatch), decided
// once per load, and it runs right after the overlay markup, so no other phrase can flash.
const pick = `(function(){var k=0;try{k=(${getNextIntroPhrase.toString()})(${INTRO_PHRASES.length},${JSON.stringify(INTRO_PHRASE_KEY)})}catch(e){}var s=document.createElement("style");s.textContent=".${styles.phrase}[data-phrase='"+k+"']{display:block}";document.head.appendChild(s)})()`;

// Releases the paused intro once the font is ready (or after 300ms at most).
// Runs inline, before hydration, so the timeline never waits on React.
const release = `${intro}.${styles.intro},${intro}.${styles.intro} *,${page("header")},${page("main")}{animation-play-state:running}`;
const script = `(function(){var d=0;function go(){if(d)return;d=1;var s=document.createElement("style");s.textContent=${JSON.stringify(release)};document.head.appendChild(s)}if(document.fonts&&document.fonts.ready){document.fonts.ready.then(go);setTimeout(go,300)}else go()})()`;

// Without JS nothing would release or unmount the intro: skip it entirely.
const noJs = `${intro}{display:none}.${styles.phrase}[data-phrase='0']{display:block}html{overflow:auto!important}${page("header")},${page("main")}{animation:none!important}`;

/*
 * Cinematic load intro. Mount once in the root layout, before {children}:
 *   <IntroSequence />
 * Removing that line (and this folder) leaves the site exactly as it was.
 */
export function IntroSequence() {
  return (
    <>
      <IntroOverlay />
      <script dangerouslySetInnerHTML={{ __html: pick + ";" + script }} />
      <noscript>
        <style>{noJs}</style>
      </noscript>
    </>
  );
}
