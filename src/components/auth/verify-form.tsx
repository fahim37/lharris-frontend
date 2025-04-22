"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { verifyCode } from "@/app/actions/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function VerifyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");

  async function onSubmit() {
    if (code.length !== 4) {
      toast.success("Please enter a valid 4-digit code.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await verifyCode(code);

      if (result.success) {
        toast("Your account has been verified.");
        router.push("/dashboard");
      } else {
        toast.error("Invalid verification code.");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Enter authentication code</h1>
      </div>

      <div className="space-y-6">
        <p className="text-center">
          Enter the 4-digit that we have sent via the
          <br />
          Email · user@gmail.com
        </p>

        <div className="flex justify-center py-4">
          <InputOTP
            value={code}
            onChange={setCode}
            maxLength={4}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    {...slot}
                    className="h-14 w-14 text-xl"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
        </div>

        <Button
          onClick={onSubmit}
          disabled={isLoading || code.length !== 4}
          className="mx-auto mt-6 block h-12 w-40 bg-[#0a1155] hover:bg-[#0a1155]/90"
        >
          Submit Code
        </Button>
      </div>
    </div>
  );
}
