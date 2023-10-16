import CategoriesForm from "../components/CategoriesForm";
import AdsNavbar from "../components/AdsNavbar";
import UsersList from "../components/UsersList";

const Admin = () => {
  return (
    <>
      <AdsNavbar />
      <UsersList />
      <CategoriesForm />
    </>
  );
};

export default Admin;
