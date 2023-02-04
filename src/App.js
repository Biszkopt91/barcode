import logo from './logo.svg';
import './App.css';
import Quagga from '@ericblade/quagga2';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#barcode-scanner')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : [
          "code_128_reader",
          "ean_reader",
          "ean_8_reader",
          "code_39_reader",
          "code_39_vin_reader",
          "codabar_reader",
          "upc_reader",
          "upc_e_reader",
          "i2of5_reader",
          "2of5_reader",
          "code_93_reader",
        ],
        debug: {
          drawBoundingBox: false,
          showFrequency: false,
          drawScanline: true,
          showPattern: false
      }
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
        Quagga.onDetected((data) => {
          console.log(data.codeResult.code);
        });
    });
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="barcode-scanner" width="300px" height="400px" border="">

        </div>
      </header>
    </div>
  );
}



export default App;
