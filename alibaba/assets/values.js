const values = [
  {
    id: "apple",
    label: "Apple",
  },
  {
    id: "gillette",
    label: "Gillette",
  },
  {
    id: "mastercard",
    label: "Mastercard",
  },
  {
    id: "the-walt-disney-company",
    label: "The Walt Disney Company",
  },
  {
    id: "facebook",
    label: "Facebook",
  },
  {
    id: "louis-vuitton",
    label: "Louis Vuitton",
  },
];

export default (value) => {
  if (!value.length) {
    return [];
  }
  return values.filter(
    (el) => el.label.toLowerCase().search(value.toLowerCase()) >= 0
  );
};
