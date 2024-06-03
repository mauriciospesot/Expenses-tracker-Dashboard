import CreditCardExpenses from "./CreditCardExpenses.jsx";
import ExpenseContextProvider from "../store/expense-context.jsx";

export default function MainContainer() {
  return (
    <ExpenseContextProvider>
      <CreditCardExpenses></CreditCardExpenses>
    </ExpenseContextProvider>
  );
}
