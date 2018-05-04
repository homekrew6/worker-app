import React from "react";
import App from "./js/App";

export class App1 extends React.Component {
state = { isReady: false };


  render() {
    return <App />;
  }
}


// App1.propTypes = {
//   auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = state => ({
//   auth: state.auth
// });

// const mapDispatchToProps = dispatch => ({
//  checkAuth: cb => dispatch(checkAuth(cb)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App1);

export default App1;
