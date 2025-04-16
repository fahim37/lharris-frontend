import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactInformation = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-[24px] md:text-[32px] font-normal text-primary text-center">
        Other Ways to Reach Us
      </h2>

      {/* Phone Support */}
      <div className="bg-[#FFFFFF1A] rounded-xl shadow p-6 space-y-4 items-center gap-4">
        <div className="flex items-center gap-4">
          <Phone className="h-6 w-6 text-primary" />
          <span className="text-xl text-primary font-normal">
            Phone Support
          </span>
        </div>
        <div className="text-white">
          <p className="text-[12px] md:text-[16px] font-semibold mb-2">
            24/7 Hotline: 1-800-SECURE-NOW
          </p>
          <p className="text-[12px] md:text-[16px] font-semibold">
            Non-Emergency: 1-800-HELP-SEC
          </p>
        </div>
      </div>

      {/* Office Location */}
      <div className="bg-[#FFFFFF1A] rounded-xl shadow p-6 space-y-4">
        <div className="flex items-center gap-4">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="text-xl text-primary font-normal">
            Office Location
          </span>
        </div>

        <div className="rounded-md overflow-hidden w-full h-40">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.2330282147735!2d-111.90251528475836!3d33.56661415084715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b73e427fc7615%3A0xa7d0d17f6c6bc355!2sBeaver%20Creek%20Park!5e0!3m2!1sen!2sus!4v1713269512644!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          ></iframe>
        </div>
        <div className="text-white text-[12px] md:text-[16px] font-semibold">
          123 Security Lane, Safe City, SC
        </div>
      </div>

      {/* Email */}
      <div className="bg-[#FFFFFF1A] rounded-xl shadow p-6 space-y-4 items-center gap-4">
        <div className="flex items-center gap-4">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-xl text-primary font-normal">Email</span>
        </div>
        <div className="text-white">
          <p className="text-[12px] md:text-[16px] font-semibold mb-2">
            support@securitypro.com
          </p>
          <p className="text-[12px] md:text-[16px] font-semibold">
            (Response within 2 hours)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
