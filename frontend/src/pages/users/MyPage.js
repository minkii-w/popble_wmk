import { Outlet, useNavigate, useParams } from "react-router-dom";
import MyPageComponent from "../../components/user/MyPageComponent";

const MyPage = () => {
  return (
    <MyPageComponent>
      <Outlet></Outlet>
    </MyPageComponent>
  );
};

export default MyPage;
