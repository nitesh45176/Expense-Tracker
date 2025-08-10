import moment from 'moment'

export const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for(let i = 0; i < Math.min(words.length, 2); i++){
     initials += words[i][0];
  }

  return initials.toUpperCase()
}

// EXPENSE CHART DATA PREPARATION
export const prepareExpenseBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const grouped = {};

  data.forEach(item => {
    const category = item?.category || "Unknown";
    const amount = Number(item?.amount) || 0;

    if (grouped[category]) {
      grouped[category] += amount;
    } else {
      grouped[category] = amount;
    }
  });

  return Object.entries(grouped).map(([category, amount]) => ({
    category,
    amount,
  }));
};

// INCOME CHART DATA PREPARATION - FIXED VERSION
export const prepareIncomeChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const grouped = {};

  data.forEach(item => {
    const source = item?.source || "Unknown";
    const amount = Number(item?.amount) || 0;

    if (grouped[source]) {
      grouped[source] += amount;
    } else {
      grouped[source] = amount;
    }
  });

  return Object.entries(grouped).map(([source, amount]) => ({
    name: source, // For pie charts
    source: source, // For bar charts
    amount: amount,
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('DD MMM'),
    amount: Number(item?.amount) || 0,
    source: item?.source
  }))
  return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

  const chartData = sortedData.map((item) => ({
    category: moment(item?.date).format('DD MMM'),
    amount: Number(item?.amount) || 0,
    source: item?.source
  }))
  return chartData;
}  

export const addThousandsSeperator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};