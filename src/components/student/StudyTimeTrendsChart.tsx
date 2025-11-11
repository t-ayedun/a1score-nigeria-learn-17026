import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';

interface StudyTimeTrendsChartProps {
  data: Array<{ date: string; hours: number; sessions: number }>;
}

export function StudyTimeTrendsChart({ data }: StudyTimeTrendsChartProps) {
  const chartData = data.map(item => ({
    ...item,
    hours: Math.round(item.hours * 10) / 10
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Study Time Trends
        </CardTitle>
        <CardDescription>
          Your daily study hours over the past 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="h-48 md:h-64 flex items-center justify-center text-muted-foreground text-sm md:text-base">
            No study sessions yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={window.innerWidth < 768 ? 200 : 300} className="h-48 md:h-auto">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: window.innerWidth < 768 ? 8 : 10 }}
                angle={-45}
                textAnchor="end"
                height={window.innerWidth < 768 ? 60 : 80}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ 
                  value: 'Hours', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: 'hsl(var(--muted-foreground))'
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
                formatter={(value: any, name: string) => [
                  name === 'hours' ? `${value}h` : value,
                  name === 'hours' ? 'Study Time' : 'Sessions'
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="hsl(var(--secondary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--secondary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
