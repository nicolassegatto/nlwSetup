import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesPerYear } from "../utils/GenerateDatesPerYear"
import { DaysHabits } from "./DaysHabits"

const weekDaysTable = ["D", "S", "T", "Q", "Q", "S", "S"]
const summaryDates = generateDatesPerYear()

const minimumSummaryDateSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length

type SummaryProps = {
  id: string
  date: string
  completed: number
  amount: number
}[]

export function SummaryTable() {

  const [summary, setSummary] = useState<SummaryProps>([])

  useEffect(()=>{
    api.get('summary').then(res => {
      setSummary(res.data)
    })
  }, [])


  return (
    <div className="w-full flex">

      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDaysTable.map((day, i) => {
          return (
            <div key={`${day}-${i}`} className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
              {day}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })

          return (
            <DaysHabits
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}

        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return (
            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
          )
        })}
      </div>
    </div>
  )
}