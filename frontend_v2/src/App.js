import './App.css';
import { LoginComponent } from './feature/login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import AseLayout from './general/AseLayout';
import { AddDelivery } from './feature/delivery/add/AddDelivery';
import { UpdateDelivery } from './feature/delivery/update/UpdateDelivery';
import { UpdateBox } from './feature/box/update/UpdateBox';
import { UpdateUser } from './feature/user/update/UpdateUser';
import { TrackDelivery } from './feature/delivery/track/TrackDelivery';
import { AddBox } from './feature/box/add/AddBox';
import { DeleteBox } from './feature/box/delete/DeleteBox';
import { DeleteDelivery } from './feature/delivery/delete/DeleteDelivery';
import { DeleteUser } from './feature/user/delete/DeleteUser';
import { AddUser } from './feature/user/add/AddUser';
import { ListDeliveryForDispatcher } from './feature/delivery/list/dispatcher/ListDeliveryForDispatcher';
import { ScanQr } from './feature/scanqr/ScanQr';
import { ListBoxForDispatcher } from './feature/box/list/dispatcher/ListBoxForDispatcher';
import { ListDeliveryForDeliverer } from './feature/delivery/list/deliverer/ListDeliveryForDeliverer';
import { ListActiveDeliveryForCustomer } from './feature/delivery/list/customer/active/ListActiveDeliveryForCustomer';
import { ListPastDeliveryForCustomer } from './feature/delivery/list/customer/past/ListPastDeliveryForCustomer';
import { ListUser } from './feature/user/list/ListUser';
import { loadState } from './localstorage/LocalStorage';



function App() {

  const getComponent = (component) => {
    let response = loadState("login");
    if(response == true){
      return component;
    }else{
      return <LoginComponent />;
    }
  }

  return (
    <BrowserRouter>
      <AseLayout>
        <Routes>
          <Route exact path="/login" element={<LoginComponent />} />
          <Route exact path="/home" element={getComponent(<h1>Deneme</h1>)} />
          <Route exact path="/list/delivery" element={<h1>Deneme</h1>} />
          <Route exact path="/delivery/list/dispatcher/all" element={getComponent(<ListDeliveryForDispatcher />)} />
          <Route exact path="/box/list/all" element={getComponent(<ListBoxForDispatcher />)} />
          <Route exact path="/list/deliverer" element={getComponent(<ListDeliveryForDeliverer />)} />
          <Route exact path="/list/customer/active" element={getComponent(<ListActiveDeliveryForCustomer />)} />
          <Route exact path="/list/user" element={getComponent(<ListUser />)} />
          <Route exact path="/list/customer/past" element={getComponent(<ListPastDeliveryForCustomer />)} />
          <Route exact path="/delivery/create" element={getComponent(<AddDelivery />)} />
          <Route exact path="/delivery/track" element={getComponent(<TrackDelivery />)} />
          <Route exact path="/box/create" element={getComponent(<AddBox/>)} />
          <Route exact path="/user/register" element={getComponent(<AddUser />)} />
          <Route exact path="/box/delete" element={getComponent(<DeleteBox />)} />
          <Route exact path="/delivery/delete" element={getComponent(<DeleteDelivery />)} />
          <Route exact path="/user/delete" element={getComponent(<DeleteUser />)}/>
          <Route exact path="/delivery/update" element={getComponent(<UpdateDelivery />)} />
          <Route exact path="/box/update" element={getComponent(<UpdateBox />)} />
          <Route exact path="/user/update" element={getComponent(<UpdateUser />)} />
          <Route exact path="/scanqr" element={getComponent(<ScanQr />)} />
          <Route exact path="/logout" element={<h1>Bye ...</h1>} />
        </Routes>
      </AseLayout>
    </BrowserRouter>
  );
}

export default App;
