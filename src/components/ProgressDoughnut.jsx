import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Chart.js에 필요한 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressDoughnut = ({ completeCount, totalWords }) => {
  const remainingCount = totalWords - completeCount;
  
  const data = {
    labels: ["완료", "남은 것"],
    datasets: [
      {
        data: [completeCount, remainingCount],
        backgroundColor: ["#3B82F6", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "50%", // 이 부분이 도넛 비율
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  return (
    <div className="w-32 h-32">
      <Doughnut options={options} data={data} />
    </div>
  );
};

export default ProgressDoughnut;
