import Image from "next/image";
import "@/styles/solution.css";

export default function () {
  return (
    <ul className="solutions-list">
      <li>
        <div className="image-wrapper">
          <Image src={"/images/seo1.png"} alt="" fill />
        </div>
        <h3>SEO</h3>
      </li>
      <li>
        <div className="image-wrapper">
          <Image src={"/images/app-dev.png"} alt="" fill />
        </div>
        <h3>Responsive Design</h3>
      </li>
      <li>
        <div className="image-wrapper">
          <Image src={"/images/performance.png"} alt="" fill />
        </div>
        <h3>Preformance</h3>
      </li>
      <li>
        <div className="image-wrapper">
          <Image src={"/images/database.png"} alt="" fill />
        </div>
        <h3>Database</h3>
      </li>
      <li>
        <div className="image-wrapper">
          <Image src={"/images/crm.png"} alt="" fill />
        </div>
        <h3>headless CRM</h3>
      </li>
      <li>
        <div className="image-wrapper">
          <Image src={"/images/support.png"} alt="" fill />
        </div>
        <h3>Support</h3>
      </li>
      
    </ul>
  );
}
