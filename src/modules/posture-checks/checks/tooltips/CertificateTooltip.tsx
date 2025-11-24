import FullTooltip from "@components/FullTooltip";
import { ShieldCheck } from "lucide-react";
import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

export const CertificateTooltip = ({ children }: Props) => {
  return (
    <FullTooltip
      className={"w-full"}
      interactive={false}
      content={
        <div className={"text-neutral-300 flex items-center text-sm gap-1.5"}>
          <ShieldCheck size={14} className={"text-amber-400"} />
          <span>Certificate Check: Active</span>
        </div>
      }
    >
      {children}
    </FullTooltip>
  );
};

