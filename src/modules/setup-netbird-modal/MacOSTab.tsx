import Button from "@components/Button";
import Code from "@components/Code";
import Steps from "@components/Steps";
import TabsContentPadding, { TabsContent } from "@components/Tabs";
import { getNetBirdUpCommand, GRPC_API_ORIGIN } from "@utils/netbird";
import { BeerIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
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

export default function MacOSTab({
  setupKey,
  showSetupKeyInfo,
  hostname,
}: Readonly<Props>) {
  return (
    <TabsContent value={String(OperatingSystem.APPLE)}>
      <TabsContentPadding>
        <p className={"font-medium flex gap-3 items-center text-base"}>
          <BeerIcon size={16} />
          Install with HomeBrew
        </p>
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
            <p>Add the brew tap</p>
            <Code>
              <Code.Line>brew tap axtesys-gmbh/netbird https://github.com/axtesys-GmbH/netbird-homebrew-tap.git</Code.Line>
            </Code>
          </Steps.Step>
          <Steps.Step step={3}>
            <p>Install NetBird</p>
            <Code
              codeToCopy={[
                `brew install axtesys-gmbh/netbird/netbird`,
                `brew install --cask axtesys-gmbh/netbird/netbird-ui`,
              ].join("\n")}
            >
              <Code.Comment># for CLI only</Code.Comment>
              <Code.Line>brew install axtesys-gmbh/netbird/netbird</Code.Line>
              <Code.Comment># for GUI package</Code.Comment>
              <Code.Line>
                brew install --cask axtesys-gmbh/netbird/netbird-ui
              </Code.Line>
            </Code>
          </Steps.Step>
          <Steps.Step step={4}>
            <p>Start NetBird daemon</p>
            <Code>
              <Code.Line>sudo netbird service install</Code.Line>
              <Code.Line>sudo netbird service start</Code.Line>
            </Code>
          </Steps.Step>

          {GRPC_API_ORIGIN && (
            <Steps.Step step={5}>
              <p>
                {`Click on "Settings" then "Advanced Settings" from the NetBird icon in your system tray and enter the following "Management URL"`}
              </p>
              <Code>
                <Code.Line>{GRPC_API_ORIGIN}</Code.Line>
              </Code>
            </Steps.Step>
          )}

          {setupKey ? (
            <Steps.Step step={GRPC_API_ORIGIN ? 6 : 5} line={false}>
              <p>
                Run NetBird{" "}
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
          ) : (
            <>
              <Steps.Step step={GRPC_API_ORIGIN ? 6 : 5}>
                <p>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  Click on "Connect" from the NetBird icon in your system tray
                </p>
              </Steps.Step>
              <Steps.Step step={GRPC_API_ORIGIN ? 7 : 6} line={false}>
                <p>Sign up using your email address</p>
              </Steps.Step>
            </>
          )}
        </Steps>
      </TabsContentPadding>
    </TabsContent>
  );
}