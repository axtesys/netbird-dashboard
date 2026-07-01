import Button from "@components/Button";
import HelpText from "@components/HelpText";
import { Label } from "@components/Label";
import { ModalClose, ModalFooter } from "@components/modal/Modal";
import Paragraph from "@components/Paragraph";
import { ShieldCheck } from "lucide-react";
import * as React from "react";
import { useState } from "react";
import { CertificateCheck } from "@/interfaces/PostureCheck";
import { PostureCheckCard } from "@/modules/posture-checks/ui/PostureCheckCard";

type Props = {
  value?: CertificateCheck;
  onChange: (value: CertificateCheck | undefined) => void;
  disabled?: boolean;
};

export const PostureCheckCertificate = ({
  value,
  onChange,
  disabled,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <PostureCheckCard
      open={open}
      setOpen={setOpen}
      key={open ? 1 : 0}
      active={value !== undefined}
      title={"Client Certificate"}
      description={
        "Restrict access to peers with a valid client certificate."
      }
      icon={<ShieldCheck size={18} />}
      iconClass={"bg-gradient-to-tr from-amber-500 to-amber-400"}
      modalWidthClass={"max-w-lg"}
      onReset={() => onChange(undefined)}
    >
      <CheckContent
        value={value}
        onChange={(v) => {
          onChange(v);
          setOpen(false);
        }}
        disabled={disabled}
      />
    </PostureCheckCard>
  );
};

const CheckContent = ({ value, onChange, disabled }: Props) => {
  return (
    <>
      <div className={"flex flex-col px-8 gap-3 pb-6"}>
        <div>
          <Label>Client Certificate Verification</Label>
          <HelpText>
            When enabled, only peers that present a valid client certificate
            will be allowed to connect.
          </HelpText>
          <div className={"mt-4 p-4 bg-nb-gray-930 rounded-md border border-nb-gray-900"}>
            <Paragraph className={"text-sm text-nb-gray-300"}>
              This check requires no additional configuration. Simply enable it
              to enforce client certificate verification for all peers subject
              to policies using this posture check.
            </Paragraph>
          </div>
        </div>
      </div>
      <ModalFooter className={"items-center"}>
        <div className={"w-full"}>
          <Paragraph className={"text-sm mt-auto text-nb-gray-400"}>
            Ensure your peers are configured with valid client certificates
            before enabling this check.
          </Paragraph>
        </div>
        <div className={"flex gap-3 w-full justify-end"}>
          <ModalClose asChild={true}>
            <Button variant={"secondary"}>Cancel</Button>
          </ModalClose>
          <Button
            variant={"primary"}
            disabled={disabled}
            onClick={() => {
              onChange({});
            }}
          >
            Enable
          </Button>
        </div>
      </ModalFooter>
    </>
  );
};

