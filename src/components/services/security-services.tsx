"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function SecurityServices() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">(
    "residential"
  );

  return (
    <div className="text-white p-4 mt-10 container">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="rounded-full border-2 border-primary p-1 inline-flex">
          <button
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
              activeTab === "residential"
                ? "bg-primary text-[#0a1155]"
                : "text-primary"
            }`}
            onClick={() => setActiveTab("residential")}
          >
            Residential Security
          </button>
          <button
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-colors ${
              activeTab === "commercial"
                ? "bg-primary text-[#0a1155]"
                : "text-primary"
            }`}
            onClick={() => setActiveTab("commercial")}
          >
            Commercial Security
          </button>
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {/* 24/7 Patrol Services */}
        <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col">
          <div className="text-primary mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 15 H40 V45 H20 Z"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M25 10 V15 M35 10 V15"
                stroke="#f0d878"
                strokeWidth="2"
              />
              <path
                d="M15 25 H25 M15 35 H25"
                stroke="#f0d878"
                strokeWidth="2"
              />
              <circle
                cx="30"
                cy="25"
                r="5"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path d="M25 35 H35" stroke="#f0d878" strokeWidth="2" />
              <path d="M30 30 V40" stroke="#f0d878" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">24/7 Patrol Services</h3>
          <p className="text-primary mb-4">
            Regular security checks by trained personnel
          </p>

          <div className="space-y-2 mb-6 flex-grow">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Daily property inspection</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Incident reporting</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>GPS-verified visits</span>
            </div>
          </div>

          <button className="bg-[#0a1155] text-white py-3 rounded-md w-full hover:bg-[#0c1670] transition-colors">
            Learn More
          </button>
        </div>

        {/* Smart Camera Systems */}
        <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col">
          <div className="text-primary mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 15 H30 V40 H20 Z"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="25" cy="20" r="2" fill="#f0d878" />
              <circle cx="25" cy="25" r="2" fill="#f0d878" />
              <circle cx="25" cy="30" r="2" fill="#f0d878" />
              <circle cx="25" cy="35" r="2" fill="#f0d878" />
              <path
                d="M30 25 L40 20 L40 35 L30 30 Z"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M40 25 Q45 20 50 25"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M40 30 Q45 35 50 30"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Smart Camera Systems</h3>
          <p className="text-primary mb-4">
            24/7 video monitoring and recording
          </p>

          <div className="space-y-2 mb-6 flex-grow">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Motion detection alerts</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Cloud storage</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Mobile app access</span>
            </div>
          </div>

          <button className="bg-[#0a1155] text-white py-3 rounded-md w-full hover:bg-[#0c1670] transition-colors">
            Learn More
          </button>
        </div>

        {/* Alarm Response */}
        <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col">
          <div className="text-primary mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="20"
                y="10"
                width="20"
                height="40"
                rx="5"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <rect
                x="25"
                y="15"
                width="10"
                height="20"
                rx="2"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="30"
                cy="40"
                r="3"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Alarm Response</h3>
          <p className="text-primary mb-4">
            Rapid response to alarm activations
          </p>

          <div className="space-y-2 mb-6 flex-grow">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>30-minute response time</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Police coordination</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Incident reports</span>
            </div>
          </div>

          <button className="bg-[#0a1155] text-white py-3 rounded-md w-full hover:bg-[#0c1670] transition-colors">
            Learn More
          </button>
        </div>

        {/* Smart Lock Systems */}
        <div className="bg-[#FFFFFF1A] rounded-lg p-6 flex flex-col">
          <div className="text-primary mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="15"
                y="20"
                width="20"
                height="30"
                rx="2"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <circle
                cx="25"
                cy="35"
                r="5"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M35 30 H45 V40 H35 Z"
                stroke="#f0d878"
                strokeWidth="2"
                fill="none"
              />
              <path d="M40 25 V30" stroke="#f0d878" strokeWidth="2" />
              <path d="M40 40 V45" stroke="#f0d878" strokeWidth="2" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-2">Smart Lock Systems</h3>
          <p className="text-primary mb-4">Advanced access control solutions</p>

          <div className="space-y-2 mb-6 flex-grow">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Keyless entry</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Access logs</span>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>Remote control</span>
            </div>
          </div>

          <button className="bg-[#0a1155] text-white py-3 rounded-md w-full hover:bg-[#0c1670] transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
