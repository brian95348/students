import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader";
import './loader.css'

function Loader({loading}) {

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="loader-container">
      <div style={{textAlign:'center'}}>
        <h4 style={{fontWeight:'100'}}>loading...</h4>
      </div>
      <BarLoader color={'black'} loading={loading} css={override} size={150} />
    </div>
  );
}

export default Loader;
