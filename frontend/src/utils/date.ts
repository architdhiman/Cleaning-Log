export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

export const baseURL = "http://localhost:5000/api";