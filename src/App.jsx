import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  // Swap currency pairs and corresponding values
  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  // Convert amount to the selected target currency
  const convertCurrency = () => {
    if (amount <= 0 || !currencyInfo[to]) return;
    const conversionResult = (amount * currencyInfo[to]).toFixed(2);
    setConvertedAmount(parseFloat(conversionResult));
  };

  // Reset the form to allow reuse
  const resetForm = () => {
    setAmount(0);
    setConvertedAmount(0);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convertCurrency();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(newAmount) => setAmount(newAmount)}
              />
            </div>
            <div className="relative w-full h-0.5 my-4">
              <button
                type="button"
                aria-label="Swap Currencies"
                className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-700"
                onClick={swapCurrencies}
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            {!convertedAmount && (
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            )}

            {/* Conditionally render the "Reuse" button only if conversion has occurred */}
            {convertedAmount > 0 && (
              <button
                type="button"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={resetForm}
              >
                Another Currency
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
