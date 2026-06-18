// Static film-grain overlay. Texture lives in .grain (globals.css) so it stays
// out of the JS bundle and never blocks pointer events.
export default function Grain() {
  return <div className="grain" aria-hidden />;
}
