import Header from "./Header"
import Footer from "./Footer";
import ListPOs from "./components/ListPOs";
import ListParts from "./components/ListParts";
import PreparePO from "./components/PreparePO";
import SubmitPO from "./components/SubmitPO";
import PurchaseOrder from "./components/PurchaseOrder";


function App() {
  
  return(
    <>
    <Header/>
      <div className="App">
        <h1>Parts Sale App</h1>
        <ListParts />
        <PurchaseOrder />
         <ListPOs />
      </div>
    <Footer/>
    </>
  );
}

export default App
