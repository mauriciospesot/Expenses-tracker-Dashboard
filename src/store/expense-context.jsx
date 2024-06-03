import { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext({
  immutableExpenses: [],
  temporalExpenses: [],
  loading: false,
  setLoading: () => {},
  setExpenses: () => {},
  setTemporalExpenses: () => {},
  searchExpenses: () => {},
  deleteExpenses: () => {},
  editExpense: () => {},
  cancelExpenseEdit: () => {},
  saveExpenseEdit: () => {},
});

export default function ExpenseContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [temporalExpenses, setTemporalExpenses] = useState([]);
  const [immutableExpenses, setImmutableExpenses] = useState([]);

  const loadExpenses = async () => {
    setLoading((prevLoadingState) => {
      const updateLoading = !prevLoadingState;

      return updateLoading;
    });
    const response = await fetch(`http://localhost:3000/expenses`);
    const data = await response.json();
    setExpenses(data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    setImmutableExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    setTemporalExpenses(immutableExpenses);
  }, [immutableExpenses]);

  function handleSearchExpenses(event) {
    let updateExpenses;
    if (event.target.value === "") {
      setTemporalExpenses(immutableExpenses);
    } else {
      setTemporalExpenses(() => {
        updateExpenses = immutableExpenses.filter((item) =>
          item.name.toLowerCase().includes(event.target.value.toLowerCase())
        );

        return updateExpenses;
      });
    }
  }

  const deleteExpenses = async (expenseIds) => {
    console.log(JSON.stringify(expenseIds));
    const response = await fetch(`http://localhost:3000/delete-expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseIds),
    });

    const data = await response.json();

    if (data.status === "200") {
      loadExpenses();
    }

    return data;
  };

  function handleEditExpense(index) {
    setTemporalExpenses((prevExpense) => {
      const updateExpense = [...prevExpense];
      updateExpense[index].edit = true;
      return updateExpense;
    });
  }

  function handleCancelEdit(expense, index) {
    setTemporalExpenses((prevExpense) => {
      const updateExpense = [...prevExpense];
      updateExpense[index].edit = false;

      return updateExpense;
    });
  }

  function handleSaveEdit(changes, index) {
    setExpenses((prevExpense) => {
      const updateExpense = [...prevExpense];
      updateExpense[index] = changes;

      return updateExpense;
    });
  }

  const ctxValue = {
    immutableExpenses,
    temporalExpenses,
    loading,
    setLoading,
    setExpenses,
    setTemporalExpenses,
    searchExpenses: handleSearchExpenses,
    deleteExpenses: deleteExpenses,
    editExpense: handleEditExpense,
    cancelExpenseEdit: handleCancelEdit,
    saveExpenseEdit: handleSaveEdit,
  };

  return (
    <ExpenseContext.Provider value={ctxValue}>
      {children}
    </ExpenseContext.Provider>
  );
}
