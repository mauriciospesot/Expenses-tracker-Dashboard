import Table from "./Table.jsx";
import NewExpenseModal from "./NewExpenseModal";
import { ExpenseContext } from "../store/expense-context.jsx";
import { useRef, useEffect, useState, useContext } from "react";

export default function AllExpenses({ label }) {
  const {
    immutableExpenses,
    temporalExpenses,
    loading,
    setTemporalExpenses,
    editExpense,
    cancelExpenseEdit,
    saveExpenseEdit,
    searchExpenses,
    deleteExpenses,
  } = useContext(ExpenseContext);

  const [total, setTotal] = useState(0);
  const [generalFilterIsOpen, setGeneralFilterIsOpen] = useState(false);
  const [selectedExpenseTableItems, setSelectedExpenseTableItem] = useState([]);
  const [filterState, setFilterState] = useState({
    month: {
      options: [],
      selected: [],
      opened: false,
    },
    year: {
      options: [],
      selected: [],
      opened: false,
    },
    owner: {
      options: [],
      selected: [],
      opened: false,
    },
    credit_card: {
      options: [],
      selected: [],
      opened: false,
    },
    quota: {
      options: [],
      selected: [],
      opened: false,
    },
  });

  // The column keys must be identical to the database columns.
  let columns = {
    name: "Expense name",
    month: "Month",
    year: "Year",
    owner: "Owner",
    category: "Category",
    description: "Description",
    credit_card: "Credit Card",
    quota: "Quota",
    price: "Price",
  };

  const name = useRef();
  const month = useRef();
  const year = useRef();
  const owner = useRef();
  const category = useRef();
  const description = useRef();
  const credit_card = useRef();
  const quota = useRef();
  const price = useRef();
  const modal = useRef();

  useEffect(() => {
    let expenseMonths = [];
    let expenseYears = [];
    let expenseOwners = [];
    let expenseCreditCards = [];
    let expenseQuotas = [];

    immutableExpenses.map((expense) => {
      expenseMonths.push(expense.month);
      expenseYears.push(expense.year);
      expenseOwners.push(expense.owner);
      expenseCreditCards.push(expense.credit_card);
      expenseQuotas.push(expense.quota);
    });

    setFilterState((prevFilters) => {
      const updateFilters = {
        month: {
          ...prevFilters.month,
          options: [...Array.from(new Set(expenseMonths))],
        },
        year: {
          ...prevFilters.year,
          options: [...Array.from(new Set(expenseYears))],
        },
        owner: {
          ...prevFilters.owner,
          options: [...Array.from(new Set(expenseOwners))],
        },
        credit_card: {
          ...prevFilters.credit_card,
          options: [...Array.from(new Set(expenseCreditCards))],
        },
        quota: {
          ...prevFilters.quota,
          options: [...Array.from(new Set(expenseQuotas))],
        },
      };

      return updateFilters;
    });
  }, [immutableExpenses]);

  useEffect(() => {
    const totalTemp = temporalExpenses.reduce(
      (sum, expense) => sum + +expense.price,
      0
    );
    setTotal(totalTemp);
  }, [temporalExpenses]);

  function handleSelectedExpenses(id, event) {
    setSelectedExpenseTableItem((prevSelectedExpenseTableItems) => {
      let updateSelectedExpenseTableItems;

      if (!event.target.checked) {
        updateSelectedExpenseTableItems = prevSelectedExpenseTableItems.filter(
          (item) => item.id !== id
        );
      } else {
        updateSelectedExpenseTableItems = [
          ...prevSelectedExpenseTableItems,
          {
            checkBoxValue: event.target.checked,
          },
        ];
      }

      return updateSelectedExpenseTableItems;
    });
  }

  function handleDeleteButton(index) {
    deleteExpense(index);
  }

  function handleEditButton(index) {
    editExpense(index);
  }

  function handleCancelEditButton(expense, index) {
    cancelExpenseEdit(expense, index);
  }

  function handleSaveEditButton(index) {
    const changes = {
      month: month.current.value,
      year: year.current.value,
      owner: owner.current.value,
      name: name.current.value,
      category: category.current.value,
      description: description.current.value,
      credit_card: credit_card.current.value,
      quota: quota.current.value,
      price: price.current.value,
      edit: false,
    };
    saveExpenseEdit(changes, index);
  }

  function handleMonthFilterIsOpen() {
    setFilterState((prevFilterState) => {
      const updateFilterState = {
        ...prevFilterState,
        month: {
          ...prevFilterState.month,
          opened: !prevFilterState.month.opened,
        },
      };

      return updateFilterState;
    });
  }

  function handleOwnerFilterIsOpen() {
    setFilterState((prevFilterState) => {
      const updateFilterState = {
        ...prevFilterState,
        owner: {
          ...prevFilterState.owner,
          opened: !prevFilterState.owner.opened,
        },
      };

      return updateFilterState;
    });
  }

  function handleCreditCardFilterIsOpen() {
    setFilterState((prevFilterState) => {
      const updateFilterState = {
        ...prevFilterState,
        credit_card: {
          ...prevFilterState.credit_card,
          opened: !prevFilterState.credit_card.opened,
        },
      };

      return updateFilterState;
    });
  }

  function handleQuotaFilterIsOpen() {
    setFilterState((prevFilterState) => {
      const updateFilterState = {
        ...prevFilterState,
        quota: {
          ...prevFilterState.quota,
          opened: !prevFilterState.quota.opened,
        },
      };

      return updateFilterState;
    });
  }

  function handleYearFilterIsOpen() {
    setFilterState((prevFilterState) => {
      const updateFilterState = {
        ...prevFilterState,
        year: {
          ...prevFilterState.year,
          opened: !prevFilterState.year.opened,
        },
      };

      return updateFilterState;
    });
  }

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

  function handleSelectValue(event, columnName) {
    setFilterState((prevFilters) => {
      let updateFilters = { ...prevFilters };
      if (
        !event.target.checked &&
        prevFilters[columnName].selected.includes(event.target.value)
      ) {
        updateFilters[columnName].selected = prevFilters[
          columnName
        ].selected.filter((value) => value != event.target.value);
      } else if (event.target.checked) {
        updateFilters = { ...prevFilters };
        updateFilters[columnName] = {
          ...prevFilters[columnName],
          selected: [...prevFilters[columnName].selected, event.target.value],
        };
      }

      return updateFilters;
    });
  }

  function handleApplyFilter() {
    setTemporalExpenses(() => {
      const updateExpenses = immutableExpenses.filter(
        (expense) =>
          (filterState["month"].selected == 0 ||
            filterState["month"].selected.includes(expense["month"])) &&
          (filterState["year"].selected == 0 ||
            filterState["year"].selected.includes(expense["year"])) &&
          (filterState["owner"].selected == 0 ||
            filterState["owner"].selected.includes(expense["owner"])) &&
          (filterState["credit_card"].selected == 0 ||
            filterState["credit_card"].selected.includes(
              expense["credit_card"]
            )) &&
          (filterState["quota"].selected == 0 ||
            filterState["quota"].selected.includes(expense["quota"]))
      );

      return updateExpenses;
    });
  }

  function handleClearFilters() {
    setTemporalExpenses(immutableExpenses);
    window.location.reload();
  }

  function handleGeneralFilterIsOpen() {
    setGeneralFilterIsOpen((prevFilterIsOpen) => !prevFilterIsOpen);
  }

  const handleDeleteItems = (expenseIds) => {
    deleteExpenses(expenseIds);
  };

  return (
    <>
      <NewExpenseModal ref={modal} title="Create New Expense"></NewExpenseModal>
      <div className="w-full bg-secondaryGray-300">
        <div className="mt-16">
          <h1 className="m-5 ml-9 text-4xl font-bold">{label}</h1>
          <div className="overflow-x-auto mb-12 shadow-md sm:rounded-3xl mx-6">
            <div className="flex justify-between bg-white">
              <div className="flex justify-normal m-5 p-3">
                <input
                  onChange={searchExpenses}
                  type="text"
                  id="table-search"
                  className="w-80 rounded-full border-[1.5px] border-stroke bg-secondaryGray-300 px-5 py-3 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                  placeholder="Search for expenses"
                />
                <button onClick={handleClearFilters} className="ml-3">
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
            />
          </div>
        </div>
      </div>
    </>
  );
}
