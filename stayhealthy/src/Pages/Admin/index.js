import React, { useEffect } from "react";
import { message, Tabs } from "antd";
import UsersList from "./UsersList";
import DoctorsList from "./DoctorsList";
import { useDispatch } from "react-redux";
import { showLoader } from "../../redux/loaderReducer";
import { GetUserById } from "../../apicalls/users";

function Admin() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const checkIsAdmin = async () => {
    try {
      dispatch(showLoader(true));
      const response = await GetUserById(user.id);
      dispatch(showLoader(false));
      if (response.success && response.data.role === "admin") {
        setIsAdmin(true);
      } else {
        throw new Error("You are not an admin");
      }
    } catch (error) {
      dispatch(showLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);
  return (
    isAdmin && <div className="bg-white p-1">
      <Tabs>
        <Tabs.TabPane tab="Users" key="1">
          <UsersList />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Doctors" key="2">
          <DoctorsList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;