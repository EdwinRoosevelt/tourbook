const DUMMY_CONTENT = {
  tourId: "ADF87954",
  details: {
    title: "Paris - 2022",
    description:
      "Join us to celebrate a magical New Year with us in Paris, France",
    budget: "2,100",
    dates: [new Date(2022, 4, 26), new Date(2022, 4, 30)],
    days: 3,
    venue: "Paris, France",
    organizers: ["Edwin Roosevelt"],
    maximumHead: 10,
  },
  plan: [
    [
      {
        type: "TRAVEL",
        details: ["Train", "Yelagiri Exp"],
        time: ["Night"],
        cost: true,
      },
      {
        type: "STAY",
        details: ["OYO", "345678"],
        time: ["Night"],
        cost: true,
      },
      {
        type: "STAY",
      },
    ],
    [
      {
        type: "VISIT",
        details: ["Central Park"],
        time: ["Evening"],
        cost: false,
      },
    ],
  ],
  expenses: {
    list: [
      {
        title: "Hotel",
        description: "L'amby Bay",
        total: ["1000", ""],
        perHead: "2,000",
      },
      {
        title: "Train Ticket",
        description: "Kovai Ecpress",
        total: "700 x 2 way",
        perHead: "1,400",
      },
    ],
    total: "3,500",
  },
  onboarders: [
    {
      name: "Edwin Roosevelt B",
      status: "confirm",
      color: "success",
    },
    {
      name: "Radha Krishnan",
      status: "pending",
      color: "warning",
    },
    {
      name: "Haresh Ulagam",
      status: "interested",
      color: "danger",
    },
  ],
};

export default function handler(req, res) {
  res.status(200).json(DUMMY_CONTENT);
}
