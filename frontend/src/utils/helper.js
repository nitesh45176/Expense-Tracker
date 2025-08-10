
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

export const prepareExpenseBarChartData = (data = []) => {
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

export const prepareExpenseLineChartData = (data = []) => {
     const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

      const chartData = sortedData.map((item) => ({
         month: moment(item?.date).format('DD MMM'),
         amount:item?.amount,
         source: item?.source
      }))
      return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
      const sortedData = [...data].sort((a,b) => new Date(a.date) - new Date(b.date))

      const chartData = sortedData.map((item) => ({
         category: moment(item?.date).format('DD MMM'),
         amount:item?.amount,
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
