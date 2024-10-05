const API_URL = "http://localhost:3000";

export const getExpenses = async () => {
  const response = await fetch(`http://localhost:3000/expenses`);
  const data = await response.json();
  return data;
};

export const createExpenses = async (expenses) => {
  const response = await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenses),
  });
  const data = await response.json();
  return data;
};
