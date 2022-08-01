/* Package */
import { useEffect } from "react";

/* Modules */
import { StartModalProps } from "../../../typings/typedb";

/* Components */
import Loading from "../../../pages/Loading";

const StartModal = ({ setStatus }: StartModalProps) => {
  useEffect(() => {
    setTimeout(() => {
      setStatus("READY");
    }, 6000);
  }, []);

  return (
    <>
      <Loading></Loading>
    </>
  );
};

export default StartModal;
