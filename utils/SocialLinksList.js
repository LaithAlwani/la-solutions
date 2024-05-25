import {FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaLinkedin} from "react-icons/fa"
const size=28
const SocialLinksList = [
  {
    path: "https://github.com/LaithAlwani",
    label: "Github Account",
    icon: <FaGithubSquare size={size} />,
    alt: "github link",
  },
  {
    path: "https://www.linkedin.com/in/laith-alwani/",
    label: "Linkedin Account",
    icon: <FaLinkedin size={size} />,
    alt: "linkedin link",
  },
  {
    path: "https://www.facebook.com/AlwaniLaith",
    label: "Facebook Account",
    icon: <FaFacebookSquare size={size} />,
    alt: "facebook link",
  },
  {
    path: "https://www.instagram.com/laitho15/",
    label: "Instagram Account",
    icon: <FaInstagramSquare size={size} />,
    alt: "instagram link",
  },
];

export default SocialLinksList;
