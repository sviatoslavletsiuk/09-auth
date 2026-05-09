import Link from "next/link";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.headerLink} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
