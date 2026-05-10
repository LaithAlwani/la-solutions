import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { siteConfig } from "@/lib/site-config";

type Props = {
  preview: string;
  children: React.ReactNode;
};

const BRAND = "#FF6A00";
const INK = "#0F1115";
const MUTED = "#6B7077";
const BORDER = "#E5E7EB";

export function EmailLayout({ preview, children }: Props) {
  const logoSrc = `${siteConfig.seo.siteUrl}/logo_300dpi.png`;
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: "#F4F5F7",
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          margin: 0,
          padding: "32px 0",
          color: INK,
        }}
      >
        <Container
          style={{
            maxWidth: 560,
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid ${BORDER}`,
          }}
        >
          {/* Orange header bar */}
          <Section
            style={{
              backgroundColor: BRAND,
              padding: "20px 28px",
              display: "table",
              width: "100%",
            }}
          >
            <table width="100%" cellPadding={0} cellSpacing={0} role="presentation">
              <tbody>
                <tr>
                  <td align="left" valign="middle">
                    <Img
                      src={logoSrc}
                      width={36}
                      height={36}
                      alt="LA Solutions"
                      style={{
                        display: "block",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 6,
                        padding: 4,
                      }}
                    />
                  </td>
                  <td align="right" valign="middle">
                    <Text
                      style={{
                        margin: 0,
                        color: "#FFFFFF",
                        fontSize: 13,
                        fontWeight: 600,
                        letterSpacing: 1.4,
                        textTransform: "uppercase",
                      }}
                    >
                      {siteConfig.company.name}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Body */}
          <Section style={{ padding: "32px 28px" }}>{children}</Section>

          {/* Footer */}
          <Hr style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: 0 }} />
          <Section style={{ padding: "20px 28px", backgroundColor: "#FAFAFB" }}>
            <Text style={{ margin: 0, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
              {siteConfig.company.legalName} · {siteConfig.contact.city}, {siteConfig.contact.region}
              <br />
              <Link href={`mailto:${siteConfig.contact.email}`} style={{ color: BRAND }}>
                {siteConfig.contact.email}
              </Link>
              {siteConfig.contact.phone ? ` · ${siteConfig.contact.phone}` : null}
            </Text>
            <Text style={{ margin: "10px 0 0", fontSize: 11, color: MUTED }}>
              You're receiving this email because you contacted {siteConfig.company.name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export const EMAIL_COLORS = { BRAND, INK, MUTED, BORDER };
