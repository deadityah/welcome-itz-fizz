// Sample data for demo purposes.

export interface Stat {
  value: string;
  label: string;
  description?: string;
  detail: string;
}

export const stats: Stat[] = [
  {
    value: "47%",
    label: "Faster delivery times",
    detail:
      "Routes re-plan every few minutes from live traffic and load data, cutting idle hours at every hub.",
  },
  {
    value: "31%",
    label: "Fewer missed deliveries",
    detail:
      "Timed alerts and live tracking let receivers plan ahead, so fewer parcels come back to the depot.",
  },
  {
    value: "62%",
    label: "More on-time arrivals",
    detail:
      "Each parcel is scheduled against real network conditions, then re-timed if a train or hub runs late.",
  },
  {
    value: "26%",
    label: "Lower shipping costs",
    detail:
      "Fuller loads and fewer repeat trips cut the cost of every parcel, without slowing any delivery down.",
  },
];

export const statsFootnote = "*Sample data";
