import MainContainer from "./components/MainContainer.jsx";
import SideBar from "./components/SideBar.jsx";

export default function App() {
  function handleOpenExpenses() {
    console.log("Expenses opened");
  }

  return (
    <div className="font-dmsans">
      <div className="flex">
        <SideBar onOpen={handleOpenExpenses}></SideBar>
        <MainContainer></MainContainer>
      </div>
    </div>
  );
}
