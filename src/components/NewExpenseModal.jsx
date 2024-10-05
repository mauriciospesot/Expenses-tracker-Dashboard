import { forwardRef, useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const inputStyle =
  "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none focus:border-color-brand-500 focus:outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter";
const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
const NewExpenseModal = forwardRef(function Modal(
  { title, onCreateExpenses },
  ref
) {
  const dialog = useRef();
  const month = useRef();
  const year = useRef();
  const owner = useRef();
  const expenseName = useRef();
  const category = useRef();
  const description = useRef();
  const payment = useRef();
  const quota = useRef();
  const price = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
  });

  const handleAddExpense = async () => {
    let newExpenses = [];
    const initMonth = month.current.value;
    let initMonthIndex = MONTHS.findIndex((x) => x == initMonth);
    let initYear = +year.current.value;

    for (let index = 0; index < +quota.current.value; index++) {
      let newExpense = {
        month: MONTHS[initMonthIndex++],
        year: String(initYear),
        owner: owner.current.value,
        name: expenseName.current.value,
        category: category.current.value,
        description: description.current.value,
        payment: payment.current.value,
        quota:
          +quota.current.value === 0 || +quota.current.value === 1
            ? 1
            : index + 1 + "/" + +quota.current.value,
        price: price.current.value,
      };

      newExpenses.push(newExpense);
      if (initMonthIndex > 11) {
        initYear++;
        initMonthIndex = 0;
      }
    }

    onCreateExpenses(newExpenses);
  };

  return createPortal(
    <dialog className="bg-white rounded" id="modal" ref={dialog}>
      <div className="">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <form method="dialog" id="modal-actions">
              <button
                type="submit"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </form>
          </div>
          <div className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <div className="flex">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Expense
                  </label>
                  <span className="text-red-600 font-bold ">*</span>
                </div>
                <input
                  ref={expenseName}
                  type="text"
                  name="name"
                  id="name"
                  className={inputStyle}
                  placeholder="Type expense"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="Payment"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Year
                </label>
                <select ref={year} id="Payment" className={inputStyle}>
                  <option defaultValue="">Select year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="Payment"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Month
                </label>
                <select ref={month} id="Payment" className={inputStyle}>
                  <option defaultValue="">Select month</option>
                  <option value="Enero">Enero</option>
                  <option value="Febrero">Febrero</option>
                  <option value="Marzo">Marzo</option>
                  <option value="Abril">Abril</option>
                  <option value="Mayo">Mayo</option>
                  <option value="Junio">Junio</option>
                  <option value="Julio">Julio</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Septiembre">Septiembre</option>
                  <option value="Octubre">Octubre</option>
                  <option value="Noviembre">Noviembre</option>
                  <option value="Diciembre">Diciembre</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="Payment"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Payment
                </label>
                <select
                  ref={payment}
                  id="Payment"
                  className={inputStyle}
                >
                  <option defaultValue="">Select Payment</option>
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Price
                </label>
                <input
                  ref={price}
                  type="number"
                  name="price"
                  id="price"
                  className={inputStyle}
                  placeholder="3500.65"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <select ref={category} id="category" className={inputStyle}>
                  <option defaultValue="">Select category</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Supermercado">Supermercado</option>
                  <option value="Facturas">Facturas</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Roticeria">Roticeria</option>
                  <option value="Bar">Bar</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Bebé">Bebé</option>
                  <option value="Entretenimiento">Entretenimiento</option>
                  <option value="Construccion">Construccion</option>
                  <option value="Taller">Taller</option>
                  <option value="Regalo">Regalo</option>
                  <option value="Herramientas">Herramientas</option>
                  <option value="Auto">Auto</option>
                  <option value="Prestamo">Prestamo</option>
                  <option value="Desconocido">Desconocido</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Quota
                </label>
                <input
                  ref={quota}
                  type="number"
                  name="quota"
                  id="quota"
                  className={inputStyle}
                  placeholder="3"
                  required=""
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="Payment"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Owner
                </label>
                <select ref={owner} id="person" className={inputStyle}>
                  <option defaultValue="">Select owner</option>
                  <option value="Mauri">Mauri</option>
                  <option value="Pau">Pau</option>
                  <option value="Compartido">Compartido</option>
                </select>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  ref={description}
                  id="description"
                  rows="4"
                  className={inputStyle}
                  placeholder="Write expense description here"
                ></textarea>
              </div>
            </div>
            <form
              className="flex content-center"
              method="dialog"
              id="modal-actions"
            >
              <button
                onClick={handleAddExpense}
                type="submit"
                className="text-white font-semibold inline-flex items-center bg-color-brand-600 hover:bg-color-brand-500 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default NewExpenseModal;
