export default function timeFormatAgo(timestamp: string): string {
  const currentDate = new Date();
  const inputDate = new Date(timestamp);
  const timeDifference = currentDate.getTime() - inputDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    if (hoursDifference === 0) {
      const minutesDifference = Math.floor(timeDifference / (1000 * 60));
      return `${minutesDifference} ${
        minutesDifference === 1 ? "minute" : "minutes"
      } ago`;
    }
    return `${hoursDifference} ${hoursDifference === 1 ? "hour" : "hours"} ago`;
  }

  if (daysDifference < 7) {
    return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
  }

  const weeksDifference = Math.floor(daysDifference / 7);
  if (weeksDifference < 4) {
    return `${weeksDifference} ${weeksDifference === 1 ? "week" : "weeks"} ago`;
  }

  const monthsDifference = Math.floor(daysDifference / 30);
  if (monthsDifference < 12) {
    return `${monthsDifference} ${
      monthsDifference === 1 ? "month" : "months"
    } ago`;
  }

  const yearsDifference = Math.floor(daysDifference / 365);
  return `${yearsDifference} ${yearsDifference === 1 ? "year" : "years"} ago`;
}

// Example usage
// const timestamp = "2024-03-10T13:11:17.571+00:00";
// const formattedTimeAgo = timeAgo(timestamp);
// console.log(formattedTimeAgo);
