import { parseISO, format } from "date-fns";

// Function to convert date string
export function formatDateTime(dateString: string | undefined): string {
  if (!dateString) {
    return "Error Loading Date";
  }
  // Parse the ISO date string
  const date = parseISO(dateString);

  // Format the date to the desired format
  const formattedDate = format(date, "MMM dd, HH:mm");

  return formattedDate;
}
