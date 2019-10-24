import React from 'react';

const App = () => {
  React.useEffect(() => {
    SerialPort.list((err, ports) => {
      console.log(ports);
    });
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
