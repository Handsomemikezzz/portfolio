import { currentInterests } from "@/content/journal";

export function InterestNotes() {
  return (
    <ul className="interest-notes">
      {currentInterests.map((interest, index) => (
        <li key={interest.id}>
          <span className="index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
