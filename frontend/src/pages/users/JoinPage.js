import BasicMenu from "../../components/BasicMenu";
import JoinComponent from "../../components/user/JoinComponent";

const JoinPage = () => {
  return (
    <div className=" top-0 left-0 z-[1055] flex-col h-full w-full">
      <div className="flex flex-wrap w-full h-full justify-center items-center border-2">
        <JoinComponent></JoinComponent>
      </div>
    </div>
  );
};

export default JoinPage;
