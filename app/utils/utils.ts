export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const rtf = new Intl.RelativeTimeFormat("en", {
  localeMatcher: "best fit",
  numeric: "always",
  style: "long",
});

export const getRelativeTime = (fromDate: Date): string => {
  const now = Date.now();
  const fromTime = fromDate.getTime();
  const timeDiff = Math.floor((now - fromTime) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ] as const;

  for (const interval of intervals) {
    const time = Math.floor(timeDiff / interval.seconds);
    if (time >= 1) {
      return rtf.format(-time, interval.label);
    }
  }

  return "now";
};
