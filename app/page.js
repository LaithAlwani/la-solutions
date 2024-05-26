import Image from "next/image";
import styles from "./page.module.css";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <>
      <section>
        <div className={styles.banner}>
          <div className="container">
            <div class={styles["custom-shape-divider-bottom-1716742249"]}>
              <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none">
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  class="shape-fill"></path>
              </svg>
            </div>
            <h1>A Modren Take on Web Development</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugit nesciunt
              ipsum hic odio qui dolorum deserunt maiores culpa, distinctio ratione dolore eligendi
              nostrum eius esse quia suscipit repudiandae debitis. 
            </p>
            <button>Contact</button>
          </div>
        </div>
      </section>
      <section className={styles.contactFormContainer}>
        <div className={styles.contactFormWrapper}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
