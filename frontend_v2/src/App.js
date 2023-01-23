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


function App() {
  return (
    <BrowserRouter>
      <AseLayout>
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route exact path="/home" element={<h1>Deneme</h1>} />
          <Route exact path="/list/delivery" element={<h1>Deneme</h1>} />
          <Route exact path="/delivery/list/dispatcher/all" element={<ListDeliveryForDispatcher/>} />
          <Route exact path="/box/list/all" element={<ListBoxForDispatcher/>} />
          <Route exact path="/list/deliverer" element={<ListDeliveryForDeliverer/>} />
          <Route exact path="/list/customer/active" element={<ListActiveDeliveryForCustomer/>} />
          <Route exact path="/list/user" element={<ListUser/>} />
          <Route exact path="/list/customer/past" element={<ListPastDeliveryForCustomer/>} />
          <Route exact path="/delivery/create" element={<AddDelivery />} />
          <Route exact path="/delivery/track" element={<TrackDelivery />} />
          <Route exact path="/box/create" element={<AddBox />} />
          <Route exact path="/user/register" element={<AddUser />} />
          <Route exact path="/box/delete" element={<DeleteBox />} />
          <Route exact path="/delivery/delete" element={<DeleteDelivery />} />
          <Route exact path="/user/delete" element={<DeleteUser />} />
          <Route exact path="/delivery/update" element={<UpdateDelivery />} />
          <Route exact path="/box/update" element={<UpdateBox />} />
          <Route exact path="/user/update" element={<UpdateUser />} />
          <Route exact path="/scanqr" element={<ScanQr/>} />
        </Routes>
      </AseLayout>
    </BrowserRouter>
  );
}

export default App;
