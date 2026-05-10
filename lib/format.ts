const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function formatCAD(value: number): string {
  return cad.format(value);
}

export function unitSuffix(unit: "one-time" | "per-month" | "per-project" | undefined): string {
  return unit === "per-month" ? "/mo" : "";
}

export function formatStartingAt(price: number, unit: "one-time" | "per-month" | "per-project" | undefined): string {
  return `Starting at ${formatCAD(price)}${unitSuffix(unit)}`;
}
