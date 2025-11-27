import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/Accordion";
import Code from "@components/Code";
import Separator from "@components/Separator";
import Steps from "@components/Steps";
import TabsContentPadding, { TabsContent } from "@components/Tabs";
import { IconBrandUbuntu } from "@tabler/icons-react";
import { getNetBirdUpCommand } from "@utils/netbird";
import {DownloadIcon, TerminalSquareIcon} from "lucide-react";
import React from "react";
import { OperatingSystem } from "@/interfaces/OperatingSystem";
import {
  HostnameParameter,
  RoutingPeerSetupKeyInfo,
  SetupKeyParameter,
} from "@/modules/setup-netbird-modal/SetupModal";
import Link from "next/link";
import Button from "@components/Button";

type Props = {
  setupKey?: string;
  showSetupKeyInfo?: boolean;
  hostname?: string;
};

// AXTESYS CHANGE: Customize Linux installation instructions
export default function LinuxTab({
  setupKey,
  showSetupKeyInfo = false,
  hostname,
}: Readonly<Props>) {
  return (
    <TabsContent value={String(OperatingSystem.LINUX)}>
        <TabsContentPadding>
            <p className={"font-medium flex gap-3 items-center text-base"}>
                <TerminalSquareIcon size={16} />
                Install with Command-line
            </p>
            <Steps>
                <Steps.Step step={1}>
                    <p>
                        Download .deb files from here:
                    </p>
                    <div className={"flex gap-4 mt-1 flex-wrap"}>
                        <Link
                            href={"https://exchange.axtesys.at/index.php/f/6820"}
                            passHref
                            target={"_blank"}
                        >
                            <Button variant={"primary"}>
                                <DownloadIcon size={14} />
                                Download NetBird
                            </Button>
                        </Link>
                    </div>
                </Steps.Step>
                <Steps.Step step={2}>
                    <Code>
                        <Code.Line>dpkg -i ~/Downloads/netbird_0.60.3-axt.2_linux_amd64.deb</Code.Line>
                        <Code.Line>dpkg -i ~/Downloads/netbird-ui_0.60.3-axt.2_linux_amd64.deb</Code.Line>
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
      {/*<TabsContentPadding>*/}
      {/*  <p className={"font-medium flex gap-3 items-center text-base"}>*/}
      {/*    <TerminalSquareIcon size={16} />*/}
      {/*    Install with Command-line*/}
      {/*  </p>*/}
      {/*  <Steps>*/}
      {/*    <Steps.Step step={1}>*/}
      {/*      <Code>curl -fsSL https://pkgs.netbird.io/install.sh | sh</Code>*/}
      {/*    </Steps.Step>*/}
      {/*    <Steps.Step step={2} line={false}>*/}
      {/*      <p>*/}
      {/*        Run NetBird {!setupKey && "and log in the browser"}*/}
      {/*        {showSetupKeyInfo && <RoutingPeerSetupKeyInfo />}*/}
      {/*      </p>*/}
      {/*      <Code>*/}
      {/*        <Code.Line>*/}
      {/*          {getNetBirdUpCommand()}*/}
      {/*          <SetupKeyParameter setupKey={setupKey} />*/}
      {/*          <HostnameParameter hostname={hostname} />*/}
      {/*        </Code.Line>*/}
      {/*      </Code>*/}
      {/*    </Steps.Step>*/}
      {/*  </Steps>*/}
      {/*</TabsContentPadding>*/}
      {/*<Separator />*/}
      {/*<TabsContentPadding>*/}
      {/*  <Accordion type="single" collapsible>*/}
      {/*    <AccordionItem value="item-1">*/}
      {/*      <AccordionTrigger>*/}
      {/*        <IconBrandUbuntu size={16} />*/}
      {/*        Install manually on Ubuntu*/}
      {/*      </AccordionTrigger>*/}
      {/*      <AccordionContent>*/}
      {/*        <Steps>*/}
      {/*          <Steps.Step step={1}>*/}
      {/*            <p>Add our repository</p>*/}
      {/*            <Code>*/}
      {/*              <Code.Line>sudo apt-get update</Code.Line>*/}
      {/*              <Code.Line>*/}
      {/*                sudo apt install ca-certificates curl gnupg -y*/}
      {/*              </Code.Line>*/}
      {/*              <Code.Line>*/}
      {/*                curl -sSL https://pkgs.netbird.io/debian/public.key | sudo*/}
      {/*                gpg --dearmor --output*/}
      {/*                /usr/share/keyrings/netbird-archive-keyring.gpg*/}
      {/*              </Code.Line>*/}
      {/*              <Code.Line>*/}
      {/*                {`echo 'deb [signed-by=/usr/share/keyrings/netbird-archive-keyring.gpg] https://pkgs.netbird.io/debian stable main' | sudo tee /etc/apt/sources.list.d/netbird.list`}*/}
      {/*              </Code.Line>*/}
      {/*            </Code>*/}
      {/*          </Steps.Step>*/}
      {/*          <Steps.Step step={2}>*/}
      {/*            <p>Install NetBird</p>*/}
      {/*            <Code*/}
      {/*              codeToCopy={[*/}
      {/*                `sudo apt-get update`,*/}
      {/*                `sudo apt-get install netbird`,*/}
      {/*                `sudo apt-get install netbird-ui`,*/}
      {/*              ].join("\n")}*/}
      {/*            >*/}
      {/*              <Code.Line>sudo apt-get update</Code.Line>*/}
      {/*              <Code.Comment># for CLI only</Code.Comment>*/}
      {/*              <Code.Line>sudo apt-get install netbird</Code.Line>*/}
      {/*              <Code.Comment># for GUI package</Code.Comment>*/}
      {/*              <Code.Line>sudo apt-get install netbird-ui</Code.Line>*/}
      {/*            </Code>*/}
      {/*          </Steps.Step>*/}
      {/*          <Steps.Step step={3} line={false}>*/}
      {/*            <p>*/}
      {/*              Run NetBird {!setupKey && "and log in the browser"}*/}
      {/*              {showSetupKeyInfo && <RoutingPeerSetupKeyInfo />}*/}
      {/*            </p>*/}
      {/*            <Code>*/}
      {/*              <Code.Line>*/}
      {/*                {getNetBirdUpCommand()}*/}
      {/*                <SetupKeyParameter setupKey={setupKey} />*/}
      {/*                <HostnameParameter hostname={hostname} />*/}
      {/*              </Code.Line>*/}
      {/*            </Code>*/}
      {/*          </Steps.Step>*/}
      {/*        </Steps>*/}
      {/*      </AccordionContent>*/}
      {/*    </AccordionItem>*/}
      {/*  </Accordion>*/}
      {/*</TabsContentPadding>*/}
    </TabsContent>
  );
}
