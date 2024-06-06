import Table from "./Table.jsx";
import NewExpenseModal from "./NewExpenseModal";
import { ExpenseContext } from "../store/expense-context.jsx";
import { useRef, useEffect, useState, useContext } from "react";

const Alert = ({ show, message, status, action }) => {
  let color = "";

  if (status === "success") {
    color = "bg-teal-100 border-teal-200 text-teal-800";
  } else if (status === "info") {
    color = "bg-indigo-100 border-indigo-200 text-indigo-800";
  } else if (status === "error") {
    color = "bg-red-100 border-red-200 text-red-800";
  }

  return (
    <div
      className={`fixed top-1/8 left-1/2 -translate-x-1/2 transition-transform rounded-sm duration-500 ease-in-out transform ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } mt-2 border ${color} text-sm p-4`}
      role="alert"
    >
      <span className="font-bold">{action}</span> {message}
    </div>
  );
};

export default function AllExpenses({ label }) {
  const {
    temporalExpenses,
    updateExpense,
    setExpenses,
    searchExpenses,
    deleteExpenses,
    createExpenses,
  } = useContext(ExpenseContext);

  const [selectedExpenseTableItems, setSelectedExpenseTableItem] = useState([]);
  const [alertState, setAlertState] = useState({
    isVisible: false,
    message: "",
    status: "",
  });

  useEffect(() => {
    if (alertState.isVisible) {
      const timer = setTimeout(() => {
        setAlertState((prevAlertState) => {
          const updateAlertState = { ...prevAlertState, isVisible: false };

          return updateAlertState;
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [alertState]);

  // The column keys must be identical to the database columns.
  let columns = {
    name: { label: "Expense name", dataType: "text" },
    month: { label: "Month", dataType: "text" },
    year: { label: "Year", dataType: "text" },
    owner: { label: "Owner", dataType: "text" },
    category: { label: "Category", dataType: "text" },
    description: { label: "Description", dataType: "text" },
    credit_card: { label: "Credit Card", dataType: "text" },
    quota: { label: "Quota", dataType: "text" },
    price: { label: "Price", dataType: "currency" },
  };

  const modal = useRef();

  function handleOpenNewExpenseModal() {
    modal.current.open();
  }

  function handleDeleteExpenses() {
    const expensesToRemove = selectedExpenseTableItems
      .filter((item) => item.checkBoxValue)
      .map((item) => item.tableIndex);
    deleteExpenses(expensesToRemove);

    setSelectedExpenseTableItem([]);
  }

  const handleDeleteItems = async (expenseIds) => {
    const data = await deleteExpenses(expenseIds);
    console.log(data);

    if (data.status === "200") {
      setAlertState({
        isVisible: true,
        message: "The expense was successfully deleted!",
        status: "success",
        action: "Deleted!",
      });
    }
  };

  const handleUpdateRow = async (updatedRow) => {
    const response = await updateExpense(updatedRow);

    if (response.status === "200") {
      setAlertState({
        isVisible: true,
        message: "The expense was successfully updated!",
        status: "success",
        action: "Updated!",
      });
    }
    return response;
  };

  const handleCreateExpense = async (newExpenses) => {
    const response = await createExpenses(newExpenses);

    if (response.status === "200") {
      setAlertState({
        isVisible: true,
        message: "The expense was successfully inserted!",
        status: "success",
        action: "Inserted!",
      });

      setExpenses((prevExpenses) => {
        const updateExpenses = [...prevExpenses, ...response.body.expenses];

        return updateExpenses;
      });
    }
  };

  return (
    <>
      <NewExpenseModal
        ref={modal}
        title="Create New Expense"
        onCreateExpenses={handleCreateExpense}
      ></NewExpenseModal>
      <div className="w-full bg-secondaryGray-300">
        <div className="mt-16">
          <h1 className="m-5 ml-9 text-4xl font-bold">{label}</h1>
          <div className="overflow-x-auto mb-12 shadow-md sm:rounded-3xl mx-6">
            <Alert
              show={alertState.isVisible}
              message={alertState.message}
              status={alertState.status}
              action={alertState.action}
            />

            <div className="flex justify-between bg-white">
              <div className="flex justify-normal m-5 p-3">
                <input
                  onChange={searchExpenses}
                  type="text"
                  id="table-search"
                  className="w-80 rounded-full border-[1.5px] border-stroke bg-secondaryGray-300 px-5 py-3 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  placeholder="Search for expenses"
                />
                <button className="ml-3">
                  <svg
                    className="h-6 w-6 text-gray-500 hover:text-color-brand-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M20.9987 4.5C20.9869 4.06504 20.8956 3.75346 20.672 3.5074C20.2111 3 19.396 3 17.7657 3H6.23433C4.60404 3 3.7889 3 3.32795 3.5074C2.86701 4.0148 2.96811 4.8008 3.17033 6.3728C3.22938 6.8319 3.3276 7.09253 3.62734 7.44867C4.59564 8.59915 6.36901 10.6456 8.85746 12.5061C9.08486 12.6761 9.23409 12.9539 9.25927 13.2614C9.53961 16.6864 9.79643 19.0261 9.93278 20.1778C10.0043 20.782 10.6741 21.2466 11.226 20.8563C12.1532 20.2006 13.8853 19.4657 14.1141 18.2442C14.1986 17.7934 14.3136 17.0803 14.445 16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 7L15 13M21 13L15 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button onClick={handleDeleteExpenses} className="ml-3">
                  <svg
                    className="h-6 w-6 text-gray-500 hover:text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    color={"#000000"}
                    fill={"none"}
                  >
                    <path
                      d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 16.5L9.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14.5 16.5L14.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleOpenNewExpenseModal}
                className="bg-color-brand-600 rounded-xl px-3 mt-10 mr-7 mb-5 font-semibold text-white text-sm font- hover:bg-color-brand-500"
              >
                + Add expense
              </button>
            </div>
            <Table
              columns={columns}
              data={temporalExpenses}
              hasSelectRow={true}
              onDelete={handleDeleteItems}
              hasTotal={true}
              hasActions={true}
              onUpdatedRow={handleUpdateRow}
            />
          </div>
        </div>
      </div>
    </>
  );
}
