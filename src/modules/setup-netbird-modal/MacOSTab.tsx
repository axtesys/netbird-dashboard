import Button from "@components/Button";
import Code from "@components/Code";
import Steps from "@components/Steps";
import TabsContentPadding, { TabsContent } from "@components/Tabs";
import { GRPC_API_ORIGIN } from "@utils/netbird";
import { ExternalLinkIcon, PackageOpenIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
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

// AXTESYS CHANGE: macOS installs exclusively via the axtesys HomeBrew tap
// (CLI formula + upstream-signed UI cask). Upstream's direct
// installer and install.sh options are dropped — we host neither.
export default function MacOSTab({
  setupKey,
  setupKeyContent,
  setupKeyPlaceholder,
  showSetupKeyInfo,
  hostname,
}: Readonly<Props>) {
  const usingSetupKeyParam = !!setupKey || !!setupKeyPlaceholder;
  const mgmtStep = 4;
  const keyStep = GRPC_API_ORIGIN ? 5 : 4;
  const runStep = keyStep + (setupKeyContent ? 1 : 0);
  return (
    <TabsContent value={String(OperatingSystem.APPLE)}>
      <TabsContentPadding>
        <p className={"font-medium flex gap-3 items-center text-base"}>
          <PackageOpenIcon size={16} />
          Install on macOS
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
                `brew install --cask axtesys/netbird/netbird-ui`,
              ].join("\n")}
            >
              <Code.Comment># add the axtesys tap</Code.Comment>
              <Code.Line>
                brew tap axtesys/netbird
                https://github.com/axtesys/netbird-homebrew-tap.git
              </Code.Line>
              <Code.Comment># CLI only</Code.Comment>
              <Code.Line>brew install axtesys/netbird/netbird</Code.Line>
              <Code.Comment># GUI package</Code.Comment>
              <Code.Line>
                brew install --cask axtesys/netbird/netbird-ui
              </Code.Line>
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

          {GRPC_API_ORIGIN && (
            <Steps.Step step={mgmtStep}>
              <p>
                {`Click on "Settings" then "Advanced Settings" from the NetBird icon in your system tray and enter the following "Management URL"`}
              </p>
              <Code>
                <Code.Line>{GRPC_API_ORIGIN}</Code.Line>
              </Code>
            </Steps.Step>
          )}

          {setupKeyContent && (
            <Steps.Step step={keyStep}>{setupKeyContent}</Steps.Step>
          )}

          <Steps.Step step={runStep} line={false}>
            <p>
              Run NetBird {!usingSetupKeyParam && "and log in the browser"}
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
    </TabsContent>
  );
}
