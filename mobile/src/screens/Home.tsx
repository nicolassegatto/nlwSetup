import { View, Text, ScrollView } from "react-native";
import { day_size, HabitDay } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesPerYear } from "../utils/GenerateDatesPerYear";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]
const datesFromYearStart = generateDatesPerYear();

const minimumSummaryDateSize = 18 * 4
const amountOfDaysToFill = minimumSummaryDateSize - datesFromYearStart.length

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((day, i) => (
            <Text key={`${day}-${i}`}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{ width: day_size }}
            >
              {day}
            </Text>
          ))
        }
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        <View className=" flex-row flex-wrap">
          {
            datesFromYearStart.map(date => (
              <HabitDay key={date.toISOString()} />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
              <View
                key={i}
                className="opacity-40 bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
                style={{ width: day_size, height: day_size }}
              />
            ))
          }

        </View>
      </ScrollView>


    </View>
  )
}