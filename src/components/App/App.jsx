import React from 'react';

const App = () => {
  const [arduinoPort, setArduinoPort] = React.useState(null);

  React.useEffect(() => {
    let readPorts;

    if (!arduinoPort) {
      // Read ports every 1s
      readPorts = setInterval(() => {
        SerialPort.list().then(ports => {
          ports.forEach(port => {
            if (port.manufacturer && port.manufacturer.toLowerCase().includes('arduino')) {
              const comName = port.comName.toString();
              setArduinoPort(new SerialPort(comName, { baudRate: 9600, autoOpen: false }));
            }
          });
        });
      }, 1000);
    } else {
      // Setup port
      const { Readline } = SerialPort.parsers;
      const parser = arduinoPort.pipe(new Readline({ delimiter: '\n' }));

      arduinoPort.open(() => {
        console.log(`Port open`);
      });

      arduinoPort.on('close', () => {
        console.log(`Port disconnected`);
        setArduinoPort(null);
      });

      parser.on('data', data => {
        console.log(data);
      });
    }

    return () => clearInterval(readPorts);
  }, [arduinoPort]);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

export default App;
