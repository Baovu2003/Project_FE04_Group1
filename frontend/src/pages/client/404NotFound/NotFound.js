import React from "react";

import "./NotFound.css";

function NotFound() {
  // const dispatch = useDispatch();

  // const goBack = () => {
  //   dispatch(siderActions({
  //     selectedKey: ["DashBoard1"],
  //     openKey: ["dashBoard"],
  //   }));
  //   window.history.back();
  // };

  // return (
  //   <div className="not-found-container">
  //     <Result
  //       status="404"
  //       title="404"
  //       subTitle="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
  //       extra={
  //         <Button type="primary" onClick={goBack} className="btn btn-primary">
  //           Quay lại Trang Chủ
  //         </Button>
  //       }
  //     />
  //   </div>
  // );
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="not-found-container">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
        <button className="btn btn-primary" onClick={goBack}>
          Quay lại Trang Trước
        </button>
      </div>
    </div>
  );
}

export default NotFound;
