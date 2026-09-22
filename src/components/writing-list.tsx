import { writing } from "@/content/writing";

export function WritingList() {
  return (
    <ol className="writing-list">
      {writing.map((post) => (
        <li key={post.id}>
          <time className="mono" dateTime={post.date}>
            {post.date.replaceAll("-", ".")}
          </time>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            <div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
            <span className="writing-arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only">（在新标签页打开）</span>
          </a>
        </li>
      ))}
    </ol>
  );
}
