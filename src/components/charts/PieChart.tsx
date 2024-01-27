import { PieChart } from '@mui/x-charts/PieChart';
import './charts.css';
import { COLORS } from '../../constant';

const CustomPieChart: React.FC<any> = ({stats}) => {
    return (
        stats && (
            <div style={{backgroundColor: 'white', margin: '1% 0 0 1%', width: '100%', height: '350px' }}>
                <PieChart
                    className='pie-chart'
                    series={[
                        {
                            data: stats.map((stat: any, index: any) => ({
                                ...stat,
                                color: COLORS[index % COLORS.length],
                            })),
                            outerRadius: 100,
                        },
                    ]}
                    width={500}
                    height={350}
                    margin={{top:0}}
                    sx={{justifyContent: 'center', height: '100%'}}
                />
            </div>
        )
  );
};

export default CustomPieChart;