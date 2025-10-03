// pages/tools/index.js
import { useState } from 'react';
import Layout from '../../components/Layout';

// Currency symbols mapping
const CURRENCY_SYMBOLS = {
  USD: '$',
  INR: '₹',
  EUR: '€'
};

// All available tools with their configurations
const ALL_TOOLS = [
  // FINANCE TOOLS
  {
    id: "compound-interest",
    name: "Compound Interest Calculator",
    description: "Calculate how your savings grow with compound interest over time.",
    category: "finance",
    icon: "📈",
    component: CompoundInterestCalculator,
  },
  {
    id: "savings-goal",
    name: "Savings Goal Calculator",
    description: "Determine monthly savings needed to reach your financial goal.",
    category: "finance",
    icon: "🎯",
    component: SavingsGoalCalculator,
  },
  {
    id: "loan-emi",
    name: "Loan EMI Calculator",
    description: "Calculate your monthly loan payments (EMI) with interest breakdown.",
    category: "finance",
    icon: "🏦",
    component: LoanEMICalculator,
  },
  {
    id: "retirement-planner",
    name: "Retirement Planning Calculator",
    description: "Plan how much you need to save for a comfortable retirement.",
    category: "finance",
    icon: "🏖️",
    component: RetirementCalculator,
  },
  {
    id: "investment-return",
    name: "Investment Return Calculator",
    description: "Calculate returns on your investments with different interest rates.",
    category: "finance",
    icon: "💰",
    component: InvestmentReturnCalculator,
  },
  {
    id: "tip-calculator",
    name: "Tip & Bill Splitter",
    description: "Calculate tips and split bills among friends.",
    category: "finance",
    icon: "🧾",
    component: TipCalculator,
  },

  // TECH & CODE TOOLS
  {
    id: "hex-to-rgb",
    name: "Hex to RGB Converter",
    description: "Convert color codes between HEX and RGB formats.",
    category: "tech",
    icon: "🎨",
    component: HexToRGBConverter,
  },
  {
    id: "base64-encoder",
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode text to/from Base64 format.",
    category: "tech",
    icon: "🔐",
    component: Base64Tool,
  },
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    description: "Format, validate and beautify JSON data.",
    category: "tech",
    icon: "📋",
    component: JSONFormatter,
  },
  {
    id: "password-generator",
    name: "Strong Password Generator",
    description: "Generate secure random passwords with custom options.",
    category: "tech",
    icon: "🔑",
    component: PasswordGenerator,
  },
  {
    id: "word-counter",
    name: "Word & Character Counter",
    description: "Count words, characters, sentences and reading time.",
    category: "tech",
    icon: "📝",
    component: WordCounter,
  },

  // LIFE HACKS & PRODUCTIVITY
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index and health status.",
    category: "lifehacks",
    icon: "⚖️",
    component: BMICalculator,
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate your exact age in years, months, days and hours.",
    category: "lifehacks",
    icon: "🎂",
    component: AgeCalculator,
  },
  {
    id: "pomodoro-timer",
    name: "Pomodoro Timer",
    description: "Stay focused with the Pomodoro Technique timer.",
    category: "lifehacks",
    icon: "⏱️",
    component: PomodoroTimer,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between different units of measurement.",
    category: "lifehacks",
    icon: "📏",
    component: UnitConverter,
  },
  {
    id: "grade-calculator",
    name: "Grade Calculator",
    description: "Calculate your GPA and final grades.",
    category: "lifehacks",
    icon: "🎓",
    component: GradeCalculator,
  },

  // STATISTICS & DATA
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages, increase/decrease and more.",
    category: "statistics",
    icon: "📊",
    component: PercentageCalculator,
  },
  {
    id: "average-calculator",
    name: "Average & Mean Calculator",
    description: "Calculate mean, median, mode and range of numbers.",
    category: "statistics",
    icon: "🔢",
    component: AverageCalculator,
  },
  {
    id: "random-number",
    name: "Random Number Generator",
    description: "Generate random numbers within a specified range.",
    category: "statistics",
    icon: "🎲",
    component: RandomNumberGenerator,
  },
  {
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate days between dates and add/subtract days.",
    category: "statistics",
    icon: "📅",
    component: DateCalculator,
  },
  {
    id: "time-zone-converter",
    name: "Time Zone Converter",
    description: "Convert time between different time zones worldwide.",
    category: "statistics",
    icon: "🌍",
    component: TimeZoneConverter,
  },
];

const categories = [
  { id: 'all', name: 'All Tools' },
  { id: 'finance', name: 'Personal Finance' },
  { id: 'tech', name: 'Tech & Code' },
  { id: 'lifehacks', name: 'Life Hacks' },
  { id: 'statistics', name: 'Statistics & Data' },
];

export default function ToolsIndex() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTools = activeCategory === 'all'
    ? ALL_TOOLS
    : ALL_TOOLS.filter(tool => tool.category === activeCategory);

  const openTool = (tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTool(null), 300);
  };

  return (
    <Layout title="Tools | Rohit Hegde" description="A collection of 20+ online tools for finance, tech, and life optimization.">
      <div className="min-h-screen bg-dark-navy text-lightest-slate py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <header className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-bright-blue mb-4">
              The Digital Toolkit
            </h1>
            <p className="text-xl text-light-slate">
              Curated tools to amplify your financial, technological, and creative life.
            </p>
          </header>

          {/* Category Navigation */}
          <nav className="mb-10 sticky top-16 z-40 bg-dark-navy/95 pt-4">
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-lg font-medium transition-colors pb-2 ${
                    activeCategory === category.id
                      ? 'text-white border-b-2 border-bright-blue'
                      : 'text-light-slate hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <hr className="border-white/10 mt-2" />
          </nav>
          
          {/* Tools Grid */}
          <h2 className="text-3xl font-bold text-lightest-slate mb-8 border-l-4 border-bright-blue pl-4">
            Available Tools ({filteredTools.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onSelect={openTool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <p className="text-center text-light-slate text-xl mt-12">
              No tools found in this category.
            </p>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedTool && (
        <ToolModal tool={selectedTool} onClose={closeModal} />
      )}
    </Layout>
  );
}

// Tool Card Component
function ToolCard({ tool, onSelect }) {
  return (
    <button 
      onClick={() => onSelect(tool)}
      className="block p-6 bg-dark-navy/50 rounded-xl shadow-xl border border-white/10 hover:border-bright-blue transition-all duration-300 w-full text-left hover:transform hover:scale-105"
    >
      <div className="text-4xl mb-4">{tool.icon}</div>
      <h3 className="text-xl font-bold text-lightest-slate mb-2">
        {tool.name}
      </h3>
      <p className="text-light-slate text-base mb-4">
        {tool.description}
      </p>
      <span className="text-bright-blue font-semibold text-sm hover:underline">
        Launch Tool →
      </span>
    </button>
  );
}

// Modal Component
function ToolModal({ tool, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-bright-blue/30">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Tool Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{tool.icon}</span>
              <div>
                <h2 className="text-3xl font-extrabold text-bright-blue">{tool.name}</h2>
                <p className="text-light-slate mt-1">{tool.description}</p>
              </div>
            </div>
          </div>

          {/* Tool Body */}
          <div className="p-6">
            <tool.component />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TOOL COMPONENTS ====================

// 1. Compound Interest Calculator
function CompoundInterestCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(10);
  const [frequency, setFrequency] = useState(12);

  const calculateCI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    const amount = p * Math.pow((1 + r/n), n*t);
    const interest = amount - p;

    return { amount: amount.toFixed(2), interest: interest.toFixed(2) };
  };

  const result = calculateCI();

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField 
          label={`Principal Amount (${CURRENCY_SYMBOLS[currency]})`} 
          value={principal} 
          onChange={setPrincipal} 
          type="number" 
        />
        <InputField 
          label="Annual Interest Rate (%)" 
          value={rate} 
          onChange={setRate} 
          type="number" 
          step="0.1" 
        />
        <InputField 
          label="Time Period (Years)" 
          value={time} 
          onChange={setTime} 
          type="number" 
        />
        <SelectField
          label="Compound Frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: 1, label: 'Annually' },
            { value: 2, label: 'Semi-annually' },
            { value: 4, label: 'Quarterly' },
            { value: 12, label: 'Monthly' },
            { value: 365, label: 'Daily' },
          ]}
        />
      </div>

      <ResultCard
        title="Total Amount"
        value={`${CURRENCY_SYMBOLS[currency]}${result.amount}`}
        subtitle={`Interest Earned: ${CURRENCY_SYMBOLS[currency]}${result.interest}`}
      />
    </div>
  );
}

// 2. Savings Goal Calculator
function SavingsGoalCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [goalAmount, setGoalAmount] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthsToGoal, setMonthsToGoal] = useState(24);
  const [interestRate, setInterestRate] = useState(5);

  const calculate = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings);
    const months = parseFloat(monthsToGoal);
    const rate = parseFloat(interestRate) / 100 / 12;

    const remaining = goal - current;
    const monthlyPayment = remaining / ((Math.pow(1 + rate, months) - 1) / rate);

    return monthlyPayment.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField 
          label={`Goal Amount (${CURRENCY_SYMBOLS[currency]})`} 
          value={goalAmount} 
          onChange={setGoalAmount} 
          type="number" 
        />
        <InputField 
          label={`Current Savings (${CURRENCY_SYMBOLS[currency]})`} 
          value={currentSavings} 
          onChange={setCurrentSavings} 
          type="number" 
        />
        <InputField 
          label="Months to Reach Goal" 
          value={monthsToGoal} 
          onChange={setMonthsToGoal} 
          type="number" 
        />
        <InputField 
          label="Expected Annual Return (%)" 
          value={interestRate} 
          onChange={setInterestRate} 
          type="number" 
          step="0.1" 
        />
      </div>

      <ResultCard
        title="Monthly Savings Required"
        value={`${CURRENCY_SYMBOLS[currency]}${calculate()}`}
        subtitle={`To reach your goal of ${CURRENCY_SYMBOLS[currency]}${goalAmount} in ${monthsToGoal} months`}
      />
    </div>
  );
}

// 3. Loan EMI Calculator
function LoanEMICalculator() {
  const [currency, setCurrency] = useState('USD');
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const calculate = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    return {
      emi: emi.toFixed(2),
      total: totalAmount.toFixed(2),
      interest: totalInterest.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField 
          label={`Loan Amount (${CURRENCY_SYMBOLS[currency]})`} 
          value={loanAmount} 
          onChange={setLoanAmount} 
          type="number" 
        />
        <InputField 
          label="Interest Rate (% per annum)" 
          value={interestRate} 
          onChange={setInterestRate} 
          type="number" 
          step="0.1" 
        />
        <InputField 
          label="Loan Tenure (Years)" 
          value={tenure} 
          onChange={setTenure} 
          type="number" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Monthly EMI" value={`${CURRENCY_SYMBOLS[currency]}${result.emi}`} />
        <ResultCard title="Total Interest" value={`${CURRENCY_SYMBOLS[currency]}${result.interest}`} />
        <ResultCard title="Total Payment" value={`${CURRENCY_SYMBOLS[currency]}${result.total}`} />
      </div>
    </div>
  );
}

// 4. Retirement Planning Calculator
function RetirementCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(3000);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const calculate = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const totalNeeded = monthlyExpense * 12 * yearsInRetirement;
    const monthlySavings = totalNeeded / (yearsToRetirement * 12);

    return {
      totalNeeded: totalNeeded.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} type="number" />
        <InputField label="Retirement Age" value={retirementAge} onChange={setRetirementAge} type="number" />
        <InputField 
          label={`Monthly Expense After Retirement (${CURRENCY_SYMBOLS[currency]})`} 
          value={monthlyExpense} 
          onChange={setMonthlyExpense} 
          type="number" 
        />
        <InputField label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} type="number" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultCard 
          title="Total Retirement Fund Needed" 
          value={`${CURRENCY_SYMBOLS[currency]}${result.totalNeeded}`} 
        />
        <ResultCard 
          title="Monthly Savings Required" 
          value={`${CURRENCY_SYMBOLS[currency]}${result.monthlySavings}`} 
        />
      </div>
    </div>
  );
}

// 5. Investment Return Calculator
function InvestmentReturnCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [finalValue, setFinalValue] = useState(15000);
  const [years, setYears] = useState(5);

  const calculate = () => {
    const profit = finalValue - initialInvestment;
    const roi = ((finalValue - initialInvestment) / initialInvestment) * 100;
    const annualizedReturn = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;

    return {
      profit: profit.toFixed(2),
      roi: roi.toFixed(2),
      annualizedReturn: annualizedReturn.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField 
          label={`Initial Investment (${CURRENCY_SYMBOLS[currency]})`} 
          value={initialInvestment} 
          onChange={setInitialInvestment} 
          type="number" 
        />
        <InputField 
          label={`Final Value (${CURRENCY_SYMBOLS[currency]})`} 
          value={finalValue} 
          onChange={setFinalValue} 
          type="number" 
        />
        <InputField label="Investment Period (Years)" value={years} onChange={setYears} type="number" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Total Profit" value={`${CURRENCY_SYMBOLS[currency]}${result.profit}`} />
        <ResultCard title="ROI" value={`${result.roi}%`} />
        <ResultCard title="Annualized Return" value={`${result.annualizedReturn}%`} />
      </div>
    </div>
  );
}

// 6. Tip Calculator
function TipCalculator() {
  const [currency, setCurrency] = useState('USD');
  const [billAmount, setBillAmount] = useState(100);
  const [tipPercent, setTipPercent] = useState(15);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const calculate = () => {
    const tip = (billAmount * tipPercent) / 100;
    const total = billAmount + tip;
    const perPerson = total / numberOfPeople;

    return {
      tip: tip.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2)
    };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <CurrencySelector currency={currency} onChange={setCurrency} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField 
          label={`Bill Amount (${CURRENCY_SYMBOLS[currency]})`} 
          value={billAmount} 
          onChange={setBillAmount} 
          type="number" 
        />
        <InputField label="Tip Percentage (%)" value={tipPercent} onChange={setTipPercent} type="number" />
        <InputField label="Number of People" value={numberOfPeople} onChange={setNumberOfPeople} type="number" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Tip Amount" value={`${CURRENCY_SYMBOLS[currency]}${result.tip}`} />
        <ResultCard title="Total Bill" value={`${CURRENCY_SYMBOLS[currency]}${result.total}`} />
        <ResultCard title="Per Person" value={`${CURRENCY_SYMBOLS[currency]}${result.perPerson}`} />
      </div>
    </div>
  );
}

// 7. Hex to RGB Converter
function HexToRGBConverter() {
  const [hex, setHex] = useState('#00BFFF');
  const [rgb, setRgb] = useState('');

  const convertHexToRgb = (hexValue) => {
    const cleanHex = hexValue.replace('#', '');
    
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    
    return 'Invalid Hex';
  };

  const handleChange = (value) => {
    setHex(value);
    setRgb(convertHexToRgb(value));
  };

  useState(() => setRgb(convertHexToRgb(hex)), []);

  return (
    <div className="space-y-6">
      <InputField 
        label="HEX Color Code" 
        value={hex} 
        onChange={handleChange} 
        placeholder="#FFFFFF" 
      />
      
      <div className="bg-gray-800/50 p-6 rounded-lg">
        <p className="text-light-slate mb-2">RGB Value:</p>
        <p className="text-2xl font-bold text-white mb-4">{rgb}</p>
        <div 
          className="h-24 w-full rounded-lg border-2 border-white/20"
          style={{ backgroundColor: hex }}
        />
      </div>
    </div>
  );
}

// 8. Base64 Encoder/Decoder
function Base64Tool() {
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (error) {
      setOutput('Error: Invalid input');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setMode('encode')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'encode' ? 'bg-bright-blue text-dark-navy' : 'bg-gray-700 text-white'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            mode === 'decode' ? 'bg-bright-blue text-dark-navy' : 'bg-gray-700 text-white'
          }`}
        >
          Decode
        </button>
      </div>

      <TextAreaField 
        label={mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'} 
        value={input} 
        onChange={setInput} 
        rows={4}
      />

      <button
        onClick={handleConvert}
        className="w-full py-3 bg-bright-blue text-dark-navy font-bold rounded-lg hover:bg-bright-blue/80 transition-colors"
      >
        Convert
      </button>

      {output && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-light-slate mb-2">Result:</p>
          <p className="text-white break-all">{output}</p>
        </div>
      )}
    </div>
  );
}

// 9. JSON Formatter
function JSONFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
      setOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <TextAreaField 
        label="Paste JSON Here" 
        value={input} 
        onChange={setInput} 
        rows={6}
        placeholder='{"name": "John", "age": 30}'
      />

      <button
        onClick={formatJSON}
        className="w-full py-3 bg-bright-blue text-dark-navy font-bold rounded-lg hover:bg-bright-blue/80 transition-colors"
      >
        Format & Validate JSON
      </button>

      {error && (
        <div className="bg-red-900/30 border border-red-500 p-4 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {output && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-light-slate mb-2">Formatted JSON:</p>
          <pre className="text-white text-sm overflow-x-auto">{output}</pre>
        </div>
      )}
    </div>
  );
}

// 10. Password Generator
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('Please select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  return (
    <div className="space-y-6">
      <InputField 
        label="Password Length" 
        value={length} 
        onChange={setLength} 
        type="number" 
        min="4"
        max="50"
      />

      <div className="space-y-3">
        <CheckboxField 
          label="Include Uppercase Letters (A-Z)" 
          checked={includeUppercase} 
          onChange={setIncludeUppercase} 
        />
        <CheckboxField 
          label="Include Lowercase Letters (a-z)" 
          checked={includeLowercase} 
          onChange={setIncludeLowercase} 
        />
        <CheckboxField 
          label="Include Numbers (0-9)" 
          checked={includeNumbers} 
          onChange={setIncludeNumbers} 
        />
        <CheckboxField 
          label="Include Symbols (!@#$%)" 
          checked={includeSymbols} 
          onChange={setIncludeSymbols} 
        />
      </div>

      <button
        onClick={generatePassword}
        className="w-full py-3 bg-bright-blue text-dark-navy font-bold rounded-lg hover:bg-bright-blue/80 transition-colors"
      >
        Generate Password
      </button>

      {password && (
        <div className="bg-gray-800/50 p-4 rounded-lg">
          <p className="text-light-slate mb-2">Generated Password:</p>
          <p className="text-2xl font-mono text-white break-all">{password}</p>
        </div>
      )}
    </div>
  );
}

// 11. Word Counter
function WordCounter() {
  const [text, setText] = useState('');

  const getStats = () => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words.length / 200); // Average reading speed

    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      <TextAreaField 
        label="Enter or Paste Your Text" 
        value={text} 
        onChange={setText} 
        rows={8}
        placeholder="Start typing..."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Words" value={stats.words} />
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces} />
        <StatCard label="Sentences" value={stats.sentences} />
        <StatCard label="Paragraphs" value={stats.paragraphs} />
        <StatCard label="Reading Time" value={`${stats.readingTime} min`} />
      </div>
    </div>
  );
}

// 12. BMI Calculator
function BMICalculator() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState('metric'); // metric or imperial

  const calculateBMI = () => {
    let bmi;
    if (unit === 'metric') {
      bmi = weight / Math.pow(height / 100, 2);
    } else {
      bmi = (weight / Math.pow(height, 2)) * 703;
    }

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    return { bmi: bmi.toFixed(1), category };
  };

  const result = calculateBMI();

  return (
    <div className="space-y-6">
      <SelectField
        label="Unit System"
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'metric', label: 'Metric (kg, cm)' },
          { value: 'imperial', label: 'Imperial (lbs, inches)' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField 
          label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'} 
          value={weight} 
          onChange={setWeight} 
          type="number" 
        />
        <InputField 
          label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'} 
          value={height} 
          onChange={setHeight} 
          type="number" 
        />
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg text-center">
        <p className="text-light-slate mb-2">Your BMI</p>
        <p className="text-5xl font-bold text-white mb-2">{result.bmi}</p>
        <p className="text-xl text-bright-blue">{result.category}</p>
      </div>
    </div>
  );
}

// 13. Age Calculator
function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01');

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    
    const years = now.getFullYear() - birth.getFullYear();
    const months = now.getMonth() - birth.getMonth();
    const days = now.getDate() - birth.getDate();
    
    const totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor((now - birth) / (1000 * 60 * 60));
    const totalMinutes = Math.floor((now - birth) / (1000 * 60));

    return { years, months, days, totalDays, totalHours, totalMinutes };
  };

  const age = calculateAge();

  return (
    <div className="space-y-6">
      <InputField 
        label="Birth Date" 
        value={birthDate} 
        onChange={setBirthDate} 
        type="date" 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Years" value={age.years} />
        <StatCard label="Months" value={age.months} />
        <StatCard label="Days" value={age.days} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Days" value={age.totalDays.toLocaleString()} />
        <StatCard label="Total Hours" value={age.totalHours.toLocaleString()} />
        <StatCard label="Total Minutes" value={age.totalMinutes.toLocaleString()} />
      </div>
    </div>
  );
}

// 14. Pomodoro Timer
function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useState(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            alert(isBreak ? 'Break time is over!' : 'Work session complete! Take a break.');
            if (!isBreak) {
              setMinutes(5);
              setIsBreak(true);
            } else {
              setMinutes(25);
              setIsBreak(false);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setIsBreak(false);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-gray-800/50 p-8 rounded-lg">
        <p className="text-light-slate mb-4">{isBreak ? 'Break Time' : 'Work Time'}</p>
        <p className="text-7xl font-bold text-white mb-6">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={toggle}
            className="px-8 py-3 bg-bright-blue text-dark-navy font-bold rounded-lg hover:bg-bright-blue/80 transition-colors"
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// 15. Unit Converter
function UnitConverter() {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [category, setCategory] = useState('length');

  const conversions = {
    length: {
      meters: 1,
      kilometers: 0.001,
      feet: 3.28084,
      miles: 0.000621371,
      inches: 39.3701,
      centimeters: 100
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      pounds: 2.20462,
      ounces: 35.274
    },
    temperature: {
      celsius: (v) => v,
      fahrenheit: (v) => (v * 9/5) + 32,
      kelvin: (v) => v + 273.15
    }
  };

  const convert = () => {
    if (category === 'temperature') {
      const celsius = fromUnit === 'celsius' ? value :
                      fromUnit === 'fahrenheit' ? (value - 32) * 5/9 :
                      value - 273.15;
      
      return toUnit === 'celsius' ? celsius :
             toUnit === 'fahrenheit' ? (celsius * 9/5) + 32 :
             celsius + 273.15;
    }

    const baseValue = value / conversions[category][fromUnit];
    return baseValue * conversions[category][toUnit];
  };

  return (
    <div className="space-y-6">
      <SelectField
        label="Category"
        value={category}
        onChange={(val) => {
          setCategory(val);
          setFromUnit(Object.keys(conversions[val])[0]);
          setToUnit(Object.keys(conversions[val])[1]);
        }}
        options={[
          { value: 'length', label: 'Length' },
          { value: 'weight', label: 'Weight' },
          { value: 'temperature', label: 'Temperature' }
        ]}
      />

      <InputField label="Value" value={value} onChange={setValue} type="number" step="0.01" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="From"
          value={fromUnit}
          onChange={setFromUnit}
          options={Object.keys(conversions[category]).map(unit => ({
            value: unit,
            label: unit.charAt(0).toUpperCase() + unit.slice(1)
          }))}
        />
        <SelectField
          label="To"
          value={toUnit}
          onChange={setToUnit}
          options={Object.keys(conversions[category]).map(unit => ({
            value: unit,
            label: unit.charAt(0).toUpperCase() + unit.slice(1)
          }))}
        />
      </div>

      <ResultCard
        title="Result"
        value={`${convert().toFixed(4)} ${toUnit}`}
      />
    </div>
  );
}

// 16. Grade Calculator
function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { name: 'Assignment 1', grade: 85, weight: 20 },
    { name: 'Midterm', grade: 90, weight: 30 },
    { name: 'Final', grade: 88, weight: 50 }
  ]);

  const addAssignment = () => {
    setAssignments([...assignments, { name: `Assignment ${assignments.length + 1}`, grade: 0, weight: 10 }]);
  };

  const updateAssignment = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const calculateGrade = () => {
    const totalWeight = assignments.reduce((sum, a) => sum + parseFloat(a.weight || 0), 0);
    const weightedSum = assignments.reduce((sum, a) => sum + (parseFloat(a.grade || 0) * parseFloat(a.weight || 0)), 0);
    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(2) : 0;
  };

  return (
    <div className="space-y-6">
      {assignments.map((assignment, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800/30 rounded-lg">
          <InputField 
            label="Name" 
            value={assignment.name} 
            onChange={(val) => updateAssignment(index, 'name', val)} 
          />
          <InputField 
            label="Grade (%)" 
            value={assignment.grade} 
            onChange={(val) => updateAssignment(index, 'grade', val)} 
            type="number" 
          />
          <InputField 
            label="Weight (%)" 
            value={assignment.weight} 
            onChange={(val) => updateAssignment(index, 'weight', val)} 
            type="number" 
          />
        </div>
      ))}

      <button
        onClick={addAssignment}
        className="w-full py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
      >
        + Add Assignment
      </button>

      <ResultCard
        title="Final Grade"
        value={`${calculateGrade()}%`}
      />
    </div>
  );
}

// 17. Percentage Calculator
function PercentageCalculator() {
  const [number, setNumber] = useState(100);
  const [percentage, setPercentage] = useState(20);

  const calculate = () => {
    const result = (number * percentage) / 100;
    const increase = parseFloat(number) + result;
    const decrease = parseFloat(number) - result;

    return { result, increase, decrease };
  };

  const calc = calculate();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Number" value={number} onChange={setNumber} type="number" />
        <InputField label="Percentage (%)" value={percentage} onChange={setPercentage} type="number" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title={`${percentage}% of ${number}`} value={calc.result.toFixed(2)} />
        <ResultCard title={`${number} + ${percentage}%`} value={calc.increase.toFixed(2)} />
        <ResultCard title={`${number} - ${percentage}%`} value={calc.decrease.toFixed(2)} />
      </div>
    </div>
  );
}

// 18. Average Calculator
function AverageCalculator() {
  const [numbers, setNumbers] = useState('10, 20, 30, 40, 50');

  const calculate = () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (nums.length === 0) return { mean: 0, median: 0, mode: 0, range: 0, sum: 0, count: 0 };

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    const sorted = [...nums].sort((a, b) => a - b);
    const median = nums.length % 2 === 0
      ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2
      : sorted[Math.floor(nums.length / 2)];

    const range = Math.max(...nums) - Math.min(...nums);

    return { mean, median, range, sum, count: nums.length };
  };

  const result = calculate();

  return (
    <div className="space-y-6">
      <TextAreaField 
        label="Enter Numbers (comma-separated)" 
        value={numbers} 
        onChange={setNumbers} 
        rows={3}
        placeholder="10, 20, 30, 40, 50"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard label="Mean (Average)" value={result.mean.toFixed(2)} />
        <StatCard label="Median" value={result.median.toFixed(2)} />
        <StatCard label="Range" value={result.range.toFixed(2)} />
        <StatCard label="Sum" value={result.sum.toFixed(2)} />
        <StatCard label="Count" value={result.count} />
      </div>
    </div>
  );
}

// 19. Random Number Generator
function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState([]);

  const generate = () => {
    const nums = [];
    for (let i = 0; i < count; i++) {
      nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    setResults(nums);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="Minimum" value={min} onChange={setMin} type="number" />
        <InputField label="Maximum" value={max} onChange={setMax} type="number" />
        <InputField label="How Many?" value={count} onChange={setCount} type="number" min="1" max="100" />
      </div>

      <button
        onClick={generate}
        className="w-full py-3 bg-bright-blue text-dark-navy font-bold rounded-lg hover:bg-bright-blue/80 transition-colors"
      >
        Generate Random Numbers
      </button>

      {results.length > 0 && (
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <p className="text-light-slate mb-3">Generated Numbers:</p>
          <div className="flex flex-wrap gap-3">
            {results.map((num, idx) => (
              <span key={idx} className="px-4 py-2 bg-bright-blue text-dark-navy font-bold rounded-lg">
                {num}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 20. Date Calculator
function DateCalculator() {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    return { days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears };
  };

  const diff = calculateDifference();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Start Date" value={startDate} onChange={setStartDate} type="date" />
        <InputField label="End Date" value={endDate} onChange={setEndDate} type="date" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Days" value={diff.days} />
        <StatCard label="Weeks" value={diff.weeks} />
        <StatCard label="Months" value={diff.months} />
        <StatCard label="Years" value={diff.years} />
      </div>
    </div>
  );
}

// 21. Time Zone Converter
function TimeZoneConverter() {
  const [time, setTime] = useState('12:00');
  const [fromZone, setFromZone] = useState('UTC');
  const [toZone, setToZone] = useState('America/New_York');

  const timeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Kolkata',
    'Australia/Sydney'
  ];

  const convert = () => {
    try {
      const date = new Date(`2024-01-01T${time}:00`);
      return new Date(date.toLocaleString('en-US', { timeZone: toZone })).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid time';
    }
  };

  return (
    <div className="space-y-6">
      <InputField label="Time" value={time} onChange={setTime} type="time" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="From Time Zone"
          value={fromZone}
          onChange={setFromZone}
          options={timeZones.map(tz => ({ value: tz, label: tz }))}
        />
        <SelectField
          label="To Time Zone"
          value={toZone}
          onChange={setToZone}
          options={timeZones.map(tz => ({ value: tz, label: tz }))}
        />
      </div>

      <ResultCard
        title={`Time in ${toZone}`}
        value={convert()}
      />
    </div>
  );
}

// ==================== REUSABLE COMPONENTS ====================

function CurrencySelector({ currency, onChange }) {
  return (
    <div className="flex gap-3 mb-4">
      {['USD', 'INR', 'EUR'].map((curr) => (
        <button
          key={curr}
          onClick={() => onChange(curr)}
          className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
            currency === curr
              ? 'bg-bright-blue text-dark-navy'
              : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          {curr} ({CURRENCY_SYMBOLS[curr]})
        </button>
      ))}
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', step = '1', min, max, placeholder }) {
  return (
    <div>
      <label className="block text-light-slate text-sm font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        min={min}
        max={max}
        placeholder={placeholder}
        className="shadow appearance-none border border-white/20 rounded w-full py-3 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-bright-blue"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, rows = 4, placeholder }) {
  return (
    <div>
      <label className="block text-light-slate text-sm font-bold mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="shadow appearance-none border border-white/20 rounded w-full py-3 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-bright-blue resize-none"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-light-slate text-sm font-bold mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow border border-white/20 rounded w-full py-3 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-bright-blue"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-bright-blue bg-gray-800 border-white/20 rounded focus:ring-bright-blue"
      />
      <span className="text-light-slate">{label}</span>
    </label>
  );
}

function ResultCard({ title, value, subtitle }) {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg text-center">
      <p className="text-light-slate text-sm mb-2">{title}</p>
      <p className="text-3xl font-extrabold text-white mb-1">{value}</p>
      {subtitle && <p className="text-light-slate text-sm mt-2">{subtitle}</p>}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg text-center">
      <p className="text-light-slate text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}