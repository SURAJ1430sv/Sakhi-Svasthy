import { useState, useEffect } from "react";
import { 
  add, 
  sub, 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  getDay, 
  isBefore, 
  isSameDay, 
  isWithinInterval, 
  addDays, 
  parse,
  isValid
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PeriodData } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";

interface PeriodCalendarProps {
  periodData: PeriodData[];
}

export default function PeriodCalendar({ periodData }: PeriodCalendarProps) {
  const { language } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState<Date[]>([]);
  const [averageCycleLength, setAverageCycleLength] = useState<number>(28);
  const [nextPeriodPrediction, setNextPeriodPrediction] = useState<Date | null>(null);
  const [currentCycleDay, setCurrentCycleDay] = useState<number>(1);
  
  // Calculate day grids for current month
  useEffect(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Calculate additional days for full calendar grid (starting with Sunday)
    const startDay = getDay(monthStart);
    const prevDays = startDay === 0 ? [] : Array.from({ length: startDay }, (_, i) => 
      sub(monthStart, { days: startDay - i })
    ).reverse();
    
    // Add days to fill the end of the grid (6 rows x 7 days)
    const totalGridCells = 42; // 6 rows x 7 days
    const nextDays = Array.from(
      { length: totalGridCells - daysInMonth.length - prevDays.length },
      (_, i) => add(monthEnd, { days: i + 1 })
    );
    
    setDays([...prevDays, ...daysInMonth, ...nextDays]);
  }, [currentDate]);
  
  // Calculate predictions and cycle stats based on period data
  useEffect(() => {
    if (periodData && periodData.length > 0) {
      // Sort by start date
      const sortedPeriods = [...periodData].sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
      
      // Calculate average cycle length if we have at least 2 periods
      if (sortedPeriods.length >= 2) {
        let totalDays = 0;
        let countIntervals = 0;
        
        for (let i = 1; i < sortedPeriods.length; i++) {
          const prevStartDate = new Date(sortedPeriods[i-1].startDate);
          const currentStartDate = new Date(sortedPeriods[i].startDate);
          
          if (isValid(prevStartDate) && isValid(currentStartDate)) {
            const daysDiff = Math.round((currentStartDate.getTime() - prevStartDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysDiff > 0 && daysDiff < 60) { // Reasonable cycle range
              totalDays += daysDiff;
              countIntervals++;
            }
          }
        }
        
        if (countIntervals > 0) {
          const calculatedAverage = Math.round(totalDays / countIntervals);
          setAverageCycleLength(calculatedAverage);
        }
      }
      
      // Predict next period based on the most recent one
      const lastPeriod = sortedPeriods[sortedPeriods.length - 1];
      if (lastPeriod && lastPeriod.startDate) {
        const lastPeriodStart = new Date(lastPeriod.startDate);
        if (isValid(lastPeriodStart)) {
          const nextPeriod = add(lastPeriodStart, { days: averageCycleLength });
          setNextPeriodPrediction(nextPeriod);
          
          // Calculate current day in cycle
          const today = new Date();
          const daysSinceLastPeriod = Math.round(
            (today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysSinceLastPeriod >= 0 && daysSinceLastPeriod < averageCycleLength) {
            setCurrentCycleDay(daysSinceLastPeriod + 1);
          } else {
            // If we're past the expected next period, calculate based on prediction
            const daysIntoCycle = Math.round(
              (today.getTime() - nextPeriod.getTime()) / (1000 * 60 * 60 * 24)
            ) + 1;
            
            if (daysIntoCycle > 0) {
              setCurrentCycleDay(daysIntoCycle);
            } else {
              setCurrentCycleDay(averageCycleLength + daysIntoCycle);
            }
          }
        }
      }
    }
  }, [periodData, averageCycleLength]);
  
  const prevMonth = () => {
    setCurrentDate(sub(currentDate, { months: 1 }));
  };
  
  const nextMonth = () => {
    setCurrentDate(add(currentDate, { months: 1 }));
  };
  
  const isInPeriod = (date: Date): boolean => {
    if (!periodData || periodData.length === 0) return false;
    
    return periodData.some(period => {
      const startDate = new Date(period.startDate);
      
      // If there's an end date, check if the date is within the period
      if (period.endDate) {
        const endDate = new Date(period.endDate);
        return isWithinInterval(date, { start: startDate, end: endDate });
      }
      
      // If there's a cycle length but no end date, create an end date
      if (period.cycleLength) {
        const calculatedEndDate = addDays(startDate, period.cycleLength - 1);
        return isWithinInterval(date, { start: startDate, end: calculatedEndDate });
      }
      
      // If there's no end date or cycle length, check if it's the start date
      return isSameDay(date, startDate);
    });
  };
  
  const isPredictedPeriod = (date: Date): boolean => {
    if (!nextPeriodPrediction) return false;
    
    // Predict period for the average duration (or use 5 days as default duration)
    const averageDuration = periodData.reduce((sum, period) => 
      sum + (period.cycleLength || 5), 0) / periodData.length || 5;
    
    const predictedEndDate = addDays(nextPeriodPrediction, Math.floor(averageDuration));
    
    return isWithinInterval(date, {
      start: nextPeriodPrediction,
      end: predictedEndDate
    });
  };
  
  const getDayClassName = (date: Date): string => {
    const today = new Date();
    let className = "day-circle";
    
    if (isSameDay(date, today)) {
      className += " today";
    }
    
    if (isInPeriod(date)) {
      className += " period";
    } else if (isPredictedPeriod(date) && !isBefore(date, today)) {
      className += " predicted";
    }
    
    return className;
  };
  
  const getNextPeriodInDays = (): number => {
    if (!nextPeriodPrediction) return 0;
    
    const today = new Date();
    return Math.round(
      (nextPeriodPrediction.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };
  
  const weekdays = language === 'hi' 
    ? ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'] 
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const cycleProgressPercentage = Math.round((currentCycleDay / averageCycleLength) * 100);
  
  return (
    <Card className="bg-white rounded-xl shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading font-semibold">
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 hover:bg-neutral-100 rounded-full transition"
              onClick={prevMonth}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 hover:bg-neutral-100 rounded-full transition"
              onClick={nextMonth}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekdays.map((day, index) => (
            <div key={index} className="text-neutral-500 text-sm">{day}</div>
          ))}
        </div>
        
        <div className="period-calendar grid grid-cols-7 gap-1 mb-6">
          {days.map((day, index) => (
            <div key={index} className="flex justify-center py-1">
              <div className={getDayClassName(day)}>
                {format(day, "d")}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center mb-6">
          <div className="flex items-center mr-4">
            <span className="inline-block w-3 h-3 bg-primary rounded-full mr-2"></span>
            <span className="text-sm">Period</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="inline-block w-3 h-3 border border-dashed border-primary rounded-full mr-2"></span>
            <span className="text-sm">Predicted</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 border-2 border-secondary rounded-full mr-2"></span>
            <span className="text-sm">Today</span>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Cycle Insights</h4>
          <p className="text-sm text-neutral-600 mb-3">
            {periodData.length >= 2 
              ? `Your average cycle length is ${averageCycleLength} days, which is within the normal range.` 
              : "Track at least two periods to see your cycle predictions."}
          </p>
          <div className="w-full bg-neutral-200 rounded-full h-2 mb-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${Math.min(cycleProgressPercentage, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Current cycle: Day {currentCycleDay}</span>
            {nextPeriodPrediction && (
              <span>Next period in: {getNextPeriodInDays()} days</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
