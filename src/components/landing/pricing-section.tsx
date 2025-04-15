"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"
import Image from "next/image";

type PricingPeriod = "monthly" | "yearly";

export default function PricingSection() {
  const [period, setPeriod] = useState<PricingPeriod>("monthly");
  const [isChecked, setIsChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsChecked(checked);
    setPeriod(checked ? "yearly" : "monthly");
  };
  console.log(period)

  return (
    <section className="container pb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-white mb-2">
          Powerful features for
          <br />
          powerful creators
        </h2>
        <p className="text-gray-300">Choose a plan that&apos;s right for you</p>
        <div className="flex justify-center items-center mt-6 gap-4">
          <div className="flex items-center gap-4 bg-[#0a1155] rounded-full p-1">
            <p className={`text-[16px] text-white ${period === "monthly" ? 'opacity-100' : 'opacity-50'} `}>Pay Monthly</p>
            <div className="flex items-center space-x-2">
              <Switch id="pricing" checked={isChecked} onCheckedChange={handleSwitchChange} />
            </div>
            <div className="relative">
              <p className={`text-[16px] text-white ${period === "yearly" ? 'opacity-100' : 'opacity-50'} `}>Pay Yearly</p>
              <div className="text-primary flex items-center absolute -bottom-12 -right-44">
                <Image
                  src="/assets/arrowprice.png"
                  alt="arrow"
                  width={450}
                  height={200}
                  className="w-24 h-20"
                />
                <span className="text-sm">Save 25%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic Plan */}
        <div className="bg-blue-900/30 rounded-lg p-6 flex flex-col">
          <h3 className="text-white font-medium mb-4">Basic</h3>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl font-bold text-primary">$49</span>
            <span className="text-gray-300 text-sm mb-1">/Month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <PricingFeature>Weekly Visits</PricingFeature>
            <PricingFeature>7-Day Storage</PricingFeature>
            <PricingFeature>Email Alerts</PricingFeature>
            <PricingFeature>Basic Reports</PricingFeature>
            <PricingFeature>1 User Access</PricingFeature>
          </ul>
          <Button className="bg-primary hover:bg-primary text-black w-full">
            Choose Plan
          </Button>
        </div>

        {/* Professional Plan */}
        <div className="bg-primary rounded-lg p-6 flex flex-col relative">
          <h3 className="text-black font-medium mb-4">Professional</h3>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl font-bold text-blue-900">$99</span>
            <span className="text-blue-900/70 text-sm mb-1">/Month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <PricingFeature variant="pro">Daily Visits</PricingFeature>
            <PricingFeature variant="pro">30-Day Storage</PricingFeature>
            <PricingFeature variant="pro">SMS + Email Alerts</PricingFeature>
            <PricingFeature variant="pro">Detailed Reports</PricingFeature>
            <PricingFeature variant="pro">5 User Access</PricingFeature>
            <PricingFeature variant="pro">24/7 Support</PricingFeature>
          </ul>
          <Button className="bg-blue-900 hover:bg-blue-800 text-white w-full">
            Choose Plan
          </Button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-blue-900/30 rounded-lg p-6 flex flex-col">
          <h3 className="text-white font-medium mb-4">Enterprise</h3>
          <div className="flex items-end gap-1 mb-6">
            <span className="text-4xl font-bold text-yellow-400">$199</span>
            <span className="text-gray-300 text-sm mb-1">/Month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <PricingFeature>Custom Schedule</PricingFeature>
            <PricingFeature>Unlimited Storage</PricingFeature>
            <PricingFeature>Priority Support</PricingFeature>
            <PricingFeature>Advanced Analytics</PricingFeature>
            <PricingFeature>Unlimited Users</PricingFeature>
            <PricingFeature>API Access</PricingFeature>
            <PricingFeature>Custom Integration</PricingFeature>
          </ul>
          <Button className="bg-primary hover:bg-yellow-500 text-black w-full">
            Choose Plan
          </Button>
        </div>
      </div>
    </section>
  );
}

function PricingFeature({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "pro";
}) {
  return (
    <li className="flex items-center gap-2">
      <div
        className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center",
          variant === "pro" ? "bg-blue-900" : "bg-primary"
        )}
      >
        <Check
          className={cn(
            "h-3 w-3",
            variant === "pro" ? "text-white" : "text-black"
          )}
        />
      </div>
      <span
        className={cn(
          "text-sm",
          variant === "pro" ? "text-black" : "text-white"
        )}
      >
        {children}
      </span>
    </li>
  );
}
