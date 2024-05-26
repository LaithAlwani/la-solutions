import Image from "next/image";
import styles from "./page.module.css";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <div className={styles.contactFormContainer}>
        <div className={styles.contactFormWrapper}>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
