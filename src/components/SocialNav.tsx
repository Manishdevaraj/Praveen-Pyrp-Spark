//@ts-nocheck
// SocialNavBar.tsx
import { FaYoutube, FaFacebookF, FaInstagram, FaTwitter, FaGooglePlay } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { useFirebase } from '@/Services/context';

const SocialNavBar = () => {

  const {setting}=useFirebase();
  if(!setting)
  {
    return;
  }


  return (
    <div className="w-full bg-purple-100 py-4 px-6 flex flex-wrap justify-center gap-4">

      {setting[0]?.WhatsappNo && <SocialButton
        icon={<BsWhatsapp className="text-green-500" />}
        label={`${setting[0]?.CellNO}`}
        href={`https://wa.me/${setting[0]?.WhatsappNo}`}
      />}
      
        {setting[0]?.YouTube&&<SocialButton
          icon={<FaYoutube className="text-red-600" />}
          label="YouTube"
          href= {setting[0]?.YouTube || "#"}
        />}
        
      {setting[0]?.facebook&&<SocialButton
        icon={<FaFacebookF className="text-blue-600" />}
        label="Facebook"
        href={setting[0]?.facebook   || "#"}
      />}

      {setting[0]?.instagram&&<SocialButton
        icon={<FaInstagram className="text-pink-600" />}
        label="Instagram"
        href= {setting[0]?.instagram || "#"}
      />}

      {setting[0]?.PlayStore &&<SocialButton
        icon={<FaGooglePlay className="text-sky-500" />}
        label="Google Play Store"
        href= {setting[0]?.PlayStore || "#"}
      />}
    </div>
  );
};

const SocialButton = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 hover:scale-105 transition-transform"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
};

export default SocialNavBar;
