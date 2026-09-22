import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-intro not-found">
      <span className="eyebrow mono">404 / LOST ON THE WAY</span>
      <h1>
        这里还没有
        <br />
        留下记录<span className="brand-dot">。</span>
      </h1>
      <p>这页可能搬走了，也可能还没写。回作品集继续逛逛吧。</p>
      <Link className="button button-dark" href="/projects">
        回到作品集 <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
