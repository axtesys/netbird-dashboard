import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/Accordion";
import Button from "@components/Button";
import Code from "@components/Code";
import Separator from "@components/Separator";
import { SelectDropdown } from "@components/select/SelectDropdown";
import Steps from "@components/Steps";
import TabsContentPadding, { TabsContent } from "@components/Tabs";
import { pkgsDownloadUrl } from "@utils/netbird";
import { DownloadIcon, ExternalLinkIcon, PackageOpenIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { OperatingSystem } from "@/interfaces/OperatingSystem";
import {
  NetBirdUpCommand,
  RoutingPeerSetupKeyInfo,
} from "@/modules/setup-netbird-modal/SetupModal";

type Props = {
  setupKey?: string;
  setupKeyContent?: React.ReactNode;
  setupKeyPlaceholder?: string;
  showSetupKeyInfo?: boolean;
  hostname?: string;
};

// AXTESYS CHANGE: Linux installs via the axtesys HomeBrew tap (recommended,
// CLI-only — brew casks are macOS-only) with a direct deb/rpm/binary download
// alongside. Upstream's install.sh and apt-repo options are dropped — we host
// neither an install script nor a Debian repo.
export default function LinuxTab({
  setupKey,
  setupKeyContent,
  setupKeyPlaceholder,
  showSetupKeyInfo = false,
  hostname,
}: Readonly<Props>) {
  const usingSetupKey = !!setupKey || !!setupKeyPlaceholder;
  const keyStep = 4;
  const runStep = setupKeyContent ? 5 : 4;
  const [linuxUrl, setLinuxUrl] = useState(
    pkgsDownloadUrl("linux/amd64/netbird.deb"),
  );
  return (
    <TabsContent value={String(OperatingSystem.LINUX)}>
      <TabsContentPadding>
        <p className={"font-medium flex gap-3 items-center text-base"}>
          <PackageOpenIcon size={16} />
          Install on Linux
        </p>
        <Steps>
          <Steps.Step step={1}>
            <p>Install HomeBrew</p>
            <div className={"flex gap-4 mt-1"}>
              <Link href={"https://brew.sh/"} passHref target={"_blank"}>
                <Button variant={"primary"}>
                  <ExternalLinkIcon size={14} />
                  HomeBrew Installation Guide
                </Button>
              </Link>
            </div>
          </Steps.Step>
          <Steps.Step step={2}>
            <p>Add the axtesys tap and install NetBird</p>
            <Code
              codeToCopy={[
                `brew tap axtesys/netbird https://github.com/axtesys/netbird-homebrew-tap.git`,
                `brew install axtesys/netbird/netbird`,
              ].join("\n")}
            >
              <Code.Comment># add the axtesys tap</Code.Comment>
              <Code.Line>
                brew tap axtesys/netbird
                https://github.com/axtesys/netbird-homebrew-tap.git
              </Code.Line>
              <Code.Line>brew install axtesys/netbird/netbird</Code.Line>
            </Code>
          </Steps.Step>
          <Steps.Step step={3}>
            <p>Start the NetBird daemon</p>
            <Code
              codeToCopy={[
                `sudo netbird service install`,
                `sudo netbird service start`,
              ].join("\n")}
            >
              <Code.Line>sudo netbird service install</Code.Line>
              <Code.Line>sudo netbird service start</Code.Line>
            </Code>
          </Steps.Step>
          {setupKeyContent && (
            <Steps.Step step={keyStep}>{setupKeyContent}</Steps.Step>
          )}
          <Steps.Step step={runStep} line={false}>
            <p>
              Run NetBird {!usingSetupKey && "and log in the browser"}
              {showSetupKeyInfo && <RoutingPeerSetupKeyInfo />}
            </p>
            <NetBirdUpCommand
              setupKey={setupKey}
              setupKeyPlaceholder={setupKeyPlaceholder}
              hostname={hostname}
            />
          </Steps.Step>
        </Steps>
      </TabsContentPadding>
      <Separator />
      <TabsContentPadding>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <DownloadIcon size={16} />
              Download package directly (deb / rpm / binary)
            </AccordionTrigger>
            <AccordionContent>
              <div className={"flex gap-4 mt-1"}>
                <SelectDropdown
                  value={linuxUrl}
                  className={"w-[200px]"}
                  onChange={setLinuxUrl}
                  placeholder={"Select package"}
                  options={[
                    {
                      label: "DEB · amd64",
                      value: pkgsDownloadUrl("linux/amd64/netbird.deb"),
                    },
                    {
                      label: "DEB · arm64",
                      value: pkgsDownloadUrl("linux/arm64/netbird.deb"),
                    },
                    {
                      label: "RPM · amd64",
                      value: pkgsDownloadUrl("linux/amd64/netbird.rpm"),
                    },
                    {
                      label: "RPM · arm64",
                      value: pkgsDownloadUrl("linux/arm64/netbird.rpm"),
                    },
                    {
                      label: "Binary · amd64",
                      value: pkgsDownloadUrl("linux/amd64/netbird.tar.gz"),
                    },
                    {
                      label: "Binary · arm64",
                      value: pkgsDownloadUrl("linux/arm64/netbird.tar.gz"),
                    },
                  ]}
                />
                <Link
                  href={linuxUrl}
                  passHref
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  <Button variant={"primary"}>
                    <DownloadIcon size={14} />
                    Download NetBird
                  </Button>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContentPadding>
    </TabsContent>
  );
}
