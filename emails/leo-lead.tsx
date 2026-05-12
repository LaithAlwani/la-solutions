import { Button, Heading, Section, Text, Hr } from "@react-email/components";
import * as React from "react";
import type { LeoLeadInput } from "@/lib/schemas";
import { EmailLayout, EMAIL_COLORS } from "./components/email-layout";

type Props = { data: LeoLeadInput };

const eyebrowStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  color: EMAIL_COLORS.brand,
  letterSpacing: 1.8,
  textTransform: "uppercase",
  fontWeight: 700,
};

const fieldLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 10,
  color: EMAIL_COLORS.muted2,
  letterSpacing: 1.6,
  textTransform: "uppercase",
  fontWeight: 600,
};

const fieldValueStyle: React.CSSProperties = {
  margin: "3px 0 0",
  fontSize: 14,
  color: EMAIL_COLORS.fg,
  lineHeight: 1.5,
};

const turnLabelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 10,
  color: EMAIL_COLORS.muted2,
  letterSpacing: 1.4,
  textTransform: "uppercase",
  fontWeight: 700,
};

export default function LeoLead({ data }: Props) {
  const submittedAt = new Date().toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  });
  const displayName = data.name?.trim() || "Visitor";

  return (
    <EmailLayout preview={`Leo lead — ${displayName} (${data.email})`}>
      <Text style={eyebrowStyle}>Leo · Chat Lead</Text>
      <Heading
        as="h1"
        style={{
          margin: "8px 0 6px",
          fontSize: 24,
          color: EMAIL_COLORS.fg,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: -0.3,
        }}
      >
        {displayName} wants the team to follow up.
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 12, color: EMAIL_COLORS.muted2 }}>
        Captured via Leo · {submittedAt}
      </Text>

      <Section>
        <FieldRow label="Email" value={data.email} link={`mailto:${data.email}`} />
        {data.name ? <FieldRow label="Name" value={data.name} /> : null}
        {data.language ? (
          <FieldRow
            label="Reply language"
            value={data.language === "fr" ? "Français" : "English"}
          />
        ) : null}
      </Section>

      <Hr style={{ border: "none", borderTop: `1px solid ${EMAIL_COLORS.border}`, margin: "20px 0" }} />

      <Text style={fieldLabelStyle}>Conversation</Text>
      <Section style={{ marginTop: 12 }}>
        {data.conversation.length === 0 ? (
          <Text style={{ margin: 0, fontSize: 13, color: EMAIL_COLORS.muted, fontStyle: "italic" }}>
            No conversation captured yet.
          </Text>
        ) : (
          data.conversation.map((turn, i) => (
            <Section
              key={i}
              style={{
                marginBottom: 10,
                padding: 14,
                backgroundColor:
                  turn.role === "user" ? EMAIL_COLORS.surface2 : EMAIL_COLORS.bg,
                borderRadius: 10,
                border: `1px solid ${EMAIL_COLORS.border}`,
              }}
            >
              <Text style={turnLabelStyle}>
                {turn.role === "user" ? displayName : "Leo"}
              </Text>
              <Text
                style={{
                  margin: "6px 0 0",
                  fontSize: 13,
                  color: EMAIL_COLORS.fg,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {turn.content}
              </Text>
            </Section>
          ))
        )}
      </Section>

      <Section style={{ marginTop: 24, textAlign: "left" }}>
        <Button
          href={`mailto:${data.email}?subject=${encodeURIComponent("Re: Your chat with Leo")}`}
          style={{
            backgroundColor: EMAIL_COLORS.brand,
            color: "#ffffff",
            padding: "13px 24px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-block",
            boxShadow: "0 8px 24px -10px rgba(255, 106, 0, 0.6)",
          }}
        >
          Reply to {displayName} →
        </Button>
      </Section>
    </EmailLayout>
  );
}

function FieldRow({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <Section style={{ marginBottom: 14 }}>
      <Text style={fieldLabelStyle}>{label}</Text>
      <Text style={fieldValueStyle}>
        {link ? (
          <a
            href={link}
            style={{
              color: EMAIL_COLORS.fg,
              textDecoration: "none",
              borderBottom: `1px dashed ${EMAIL_COLORS.muted2}`,
            }}
          >
            {value}
          </a>
        ) : (
          value
        )}
      </Text>
    </Section>
  );
}
