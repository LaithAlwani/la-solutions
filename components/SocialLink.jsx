import Link from "next/link";

export default function SocialLink({ link }) {
  const { path, label, icon } = link;
  return (
    <Link href={path} target="_blank" rel="noreferrer" aria-label={label}>
      {icon}
    </Link>
  );
}
