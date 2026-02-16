import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/Accordion";
import Button from "@components/Button";
import Code from "@components/Code";
import { SelectDropdown } from "@components/select/SelectDropdown";
import Separator from "@components/Separator";
import Steps from "@components/Steps";
import TabsContentPadding, { TabsContent } from "@components/Tabs";
import { getNetBirdUpCommand } from "@utils/netbird";
import {
  BeerIcon,
  DownloadIcon,
  ExternalLinkIcon,
  PackageOpenIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { OperatingSystem } from "@/interfaces/OperatingSystem";
import {
  HostnameParameter,
  RoutingPeerSetupKeyInfo,
  SetupKeyParameter,
} from "@/modules/setup-netbird-modal/SetupModal";

type Props = {
  setupKey?: string;
  showSetupKeyInfo?: boolean;
  hostname?: string;
};

export default function LinuxTab({
  setupKey,
  showSetupKeyInfo = false,
  hostname,
}: Readonly<Props>) {
  const [linuxUrl, setLinuxUrl] = useState(
    "https://netbird.axtesys.it/pkgs/linux/amd64",
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
            <p>Download the .deb package</p>
            <div className={"flex gap-4 mt-1 flex-wrap"}>
              <SelectDropdown
                value={linuxUrl}
                className={"w-[170px]"}
                onChange={setLinuxUrl}
                placeholder={"Select architecture"}
                options={[
                  {
                    label: "64-Bit",
                    value: "https://netbird.axtesys.it/pkgs/linux/amd64",
                  },
                  {
                    label: "ARM64",
                    value: "https://netbird.axtesys.it/pkgs/linux/arm64",
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
          </Steps.Step>
          <Steps.Step step={2}>
            <p>Install the package</p>
            <Code>
              <Code.Line>sudo dpkg -i netbird*.deb</Code.Line>
            </Code>
          </Steps.Step>
          <Steps.Step step={3} line={false}>
            <p>
              Run NetBird {!setupKey && "and log in the browser"}
              {showSetupKeyInfo && <RoutingPeerSetupKeyInfo />}
            </p>
            <Code>
              <Code.Line>
                {getNetBirdUpCommand()}
                <SetupKeyParameter setupKey={setupKey} />
                <HostnameParameter hostname={hostname} />
              </Code.Line>
            </Code>
          </Steps.Step>
        </Steps>
      </TabsContentPadding>
      <Separator />
      <TabsContentPadding>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <BeerIcon size={16} /> Install with HomeBrew
            </AccordionTrigger>
            <AccordionContent>
              <Steps>
                <Steps.Step step={1}>
                  <p>Download and install HomeBrew</p>
                  <div className={"flex gap-4"}>
                    <Link href={"https://brew.sh/"} passHref target={"_blank"}>
                      <Button variant={"primary"}>
                        <ExternalLinkIcon size={14} />
                        HomeBrew Installation Guide
                      </Button>
                    </Link>
                  </div>
                </Steps.Step>
                <Steps.Step step={2}>
                  <p>Install NetBird</p>
                  <Code>
                    <Code.Line>brew install netbirdio/tap/netbird</Code.Line>
                  </Code>
                </Steps.Step>
                <Steps.Step step={3}>
                  <p>Start NetBird daemon</p>
                  <Code>
                    <Code.Line>sudo netbird service install</Code.Line>
                    <Code.Line>sudo netbird service start</Code.Line>
                  </Code>
                </Steps.Step>
                <Steps.Step step={4} line={false}>
                  <p>
                    Run NetBird {!setupKey && "and log in the browser"}
                    {showSetupKeyInfo && <RoutingPeerSetupKeyInfo />}
                  </p>
                  <Code>
                    <Code.Line>
                      {getNetBirdUpCommand()}
                      <SetupKeyParameter setupKey={setupKey} />
                      <HostnameParameter hostname={hostname} />
                    </Code.Line>
                  </Code>
                </Steps.Step>
              </Steps>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContentPadding>
    </TabsContent>
  );
}