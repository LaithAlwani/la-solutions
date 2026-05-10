import { Heading, Link, Section, Text, Hr } from "@react-email/components";
import * as React from "react";
import type { ContactInput } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";
import { EmailLayout, EMAIL_COLORS } from "./components/email-layout";

type Props = { data: ContactInput };

export default function ContactConfirmation({ data }: Props) {
  const firstName = (data.name.split(" ")[0] || data.name).trim();
  return (
    <EmailLayout preview={`Thanks for contacting ${siteConfig.company.name}, ${firstName}`}>
      <Heading
        as="h1"
        style={{ margin: "0 0 12px", fontSize: 22, color: EMAIL_COLORS.INK, fontWeight: 700 }}
      >
        Thanks, {firstName} — we got your message.
      </Heading>
      <Text style={{ margin: "0 0 20px", fontSize: 15, color: EMAIL_COLORS.INK, lineHeight: 1.6 }}>
        We'll review your project and get back to you within one business day. If it's urgent, you
        can reach us directly at{" "}
        <Link href={`mailto:${siteConfig.contact.email}`} style={{ color: EMAIL_COLORS.BRAND }}>
          {siteConfig.contact.email}
        </Link>
        .
      </Text>

      <Section
        style={{
          marginTop: 20,
          padding: 16,
          backgroundColor: "#F7F8FA",
          borderRadius: 8,
          border: `1px solid ${EMAIL_COLORS.BORDER}`,
        }}
      >
        <Text
          style={{
            margin: 0,
            fontSize: 11,
            color: EMAIL_COLORS.MUTED,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          What you sent us
        </Text>
        {data.service ? (
          <Text style={{ margin: "10px 0 0", fontSize: 13, color: EMAIL_COLORS.INK }}>
            <strong>Service interest:</strong> {data.service}
          </Text>
        ) : null}
        {data.budget ? (
          <Text style={{ margin: "4px 0 0", fontSize: 13, color: EMAIL_COLORS.INK }}>
            <strong>Budget:</strong> {data.budget}
          </Text>
        ) : null}
        <Text
          style={{
            margin: "12px 0 0",
            fontSize: 13,
            color: EMAIL_COLORS.INK,
            whiteSpace: "pre-wrap",
            lineHeight: 1.6,
          }}
        >
          {data.message}
        </Text>
      </Section>

      <Hr style={{ border: "none", borderTop: `1px solid ${EMAIL_COLORS.BORDER}`, margin: "28px 0 18px" }} />

      <Text style={{ margin: 0, fontSize: 13, color: EMAIL_COLORS.MUTED, lineHeight: 1.6 }}>
        While you wait, you can browse our full pricing on the{" "}
        <Link href={`${siteConfig.seo.siteUrl}/services`} style={{ color: EMAIL_COLORS.BRAND }}>
          services page
        </Link>{" "}
        or follow us on{" "}
        {siteConfig.socials.map((s, i) => (
          <React.Fragment key={s.platform}>
            <Link href={s.url} style={{ color: EMAIL_COLORS.BRAND }}>
              {s.platform[0].toUpperCase() + s.platform.slice(1)}
            </Link>
            {i < siteConfig.socials.length - 1 ? " · " : ""}
          </React.Fragment>
        ))}
        .
      </Text>
      <Text style={{ margin: "18px 0 0", fontSize: 13, color: EMAIL_COLORS.INK }}>
        — The {siteConfig.company.name} team
      </Text>
    </EmailLayout>
  );
}
