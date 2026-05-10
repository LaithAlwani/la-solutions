import { Button, Heading, Section, Text, Hr } from "@react-email/components";
import * as React from "react";
import type { ContactInput } from "@/lib/schemas";
import { EmailLayout, EMAIL_COLORS } from "./components/email-layout";

type Props = { data: ContactInput };

const labelStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 11,
  color: EMAIL_COLORS.MUTED,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  fontWeight: 600,
};
const valueStyle: React.CSSProperties = {
  margin: "2px 0 0",
  fontSize: 14,
  color: EMAIL_COLORS.INK,
  lineHeight: 1.5,
};

export default function ContactNotification({ data }: Props) {
  const submittedAt = new Date().toLocaleString("en-CA", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Toronto",
  });

  return (
    <EmailLayout preview={`New inquiry from ${data.name}`}>
      <Heading
        as="h1"
        style={{ margin: "0 0 6px", fontSize: 22, color: EMAIL_COLORS.INK, fontWeight: 700 }}
      >
        New project inquiry
      </Heading>
      <Text style={{ margin: "0 0 24px", fontSize: 13, color: EMAIL_COLORS.MUTED }}>
        Submitted {submittedAt}
      </Text>

      <Section>
        <Field label="Name" value={data.name} />
        <Field label="Email" value={data.email} />
        {data.phone ? <Field label="Phone" value={data.phone} /> : null}
        {data.company ? <Field label="Company" value={data.company} /> : null}
        {data.service ? <Field label="Service interest" value={data.service} /> : null}
        {data.budget ? <Field label="Budget" value={data.budget} /> : null}
      </Section>

      <Hr style={{ border: "none", borderTop: `1px solid ${EMAIL_COLORS.BORDER}`, margin: "20px 0" }} />

      <Text style={labelStyle}>Message</Text>
      <Section
        style={{
          marginTop: 8,
          padding: 16,
          backgroundColor: "#F7F8FA",
          borderRadius: 8,
          border: `1px solid ${EMAIL_COLORS.BORDER}`,
        }}
      >
        <Text style={{ margin: 0, fontSize: 14, color: EMAIL_COLORS.INK, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
          {data.message}
        </Text>
      </Section>

      <Section style={{ marginTop: 28, textAlign: "center" }}>
        <Button
          href={`mailto:${data.email}?subject=Re:%20Your%20inquiry%20to%20LA%20Solutions`}
          style={{
            backgroundColor: EMAIL_COLORS.BRAND,
            color: "#FFFFFF",
            padding: "12px 22px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          Reply to {data.name.split(" ")[0]}
        </Button>
      </Section>
    </EmailLayout>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Section style={{ marginBottom: 14 }}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </Section>
  );
}
