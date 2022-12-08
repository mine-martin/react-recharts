import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const data = [];

for (let i = 30; i >= 0; i--) {
  data.push({
    date: subDays(new Date(), i).toISOString().substring(0, 10),
    value: 1 + Math.random()
  })
}


export default function Home() {
  return <>

    <h1>React Charts</h1>

    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>

        <defs>
          <linearGradient id='color' x1='0' y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB118" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#FFB118" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey='value' stroke='#FFB118' fill='url(#color)' />

        <XAxis dataKey='date'
          axisLine={false}
          tickLine={false}
          tickFormatter={str => {
            const date = parseISO(str);
            if (date.getDate() % 5 === 0) {
              return format(date, "MMM,d");
            }
            return " ";
          }}
        />

        <YAxis dataKey='value' axisLine={false} tickLine={false}
          tickFormatter={number => `$ ${number.toFixed(3)}`}
          tickCount={7} />

        <Tooltip content={<ToolTip />} />

        <CartesianGrid opacity={0.1} vertical={false} />

      </AreaChart>
    </ResponsiveContainer>
  </>
}

const ToolTip = ({ active, payload, label }) => { // label is x value, payload is array of value
  if (active) {
    return (
      <div className="customToolTip">
        <h4>{format(parseISO(label), "eeee, MMM, d")}</h4>
        <p>$ {payload[0].value.toFixed(4)} USD</p>
      </div>
    )
  }
  return null;
}