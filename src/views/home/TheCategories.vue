<template>
  import { Card, CardContent } from "@/components/ui/card" import { TabsContent,
  TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs" import { Trophy,
  Zap, Dice1Icon as Dice, Radio } from 'lucide-react' export function
  BettingCategories() { return (
  <section className="py-20 bg-linear-to-b from-card to-surface-active">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-center text-white mb-12">
        Explore Our Betting Universe
      </h2>
      <Tabs default-value="sport" class-name="w-full max-w-4xl mx-auto">
        <TabsList
          class-name="grid w-full grid-cols-4 bg-surface-sunken/50 rounded-full p-1"
        >
          <TabsTrigger
            value="sport"
            class-name="rounded-full data-[state=active]:bg-purple-600"
            >Sport</TabsTrigger
          >
          <TabsTrigger
            value="crash"
            class-name="rounded-full data-[state=active]:bg-purple-600"
            >Crash</TabsTrigger
          >
          <TabsTrigger
            value="virtuals"
            class-name="rounded-full data-[state=active]:bg-purple-600"
            >Virtuals</TabsTrigger
          >
          <TabsTrigger
            value="live"
            class-name="rounded-full data-[state=active]:bg-purple-600"
            >Live</TabsTrigger
          >
        </TabsList>
        <div className="mt-8">
          <TabsContent value="sport">
            <CategoryContent
              icon="{<Trophy"
              class-name="w-10 h-10 text-yellow-400"
            />} title="Sports Betting" description="From football to esports,
            bet on your favorite teams and athletes." />
          </TabsContent>
          <TabsContent value="crash">
            <CategoryContent
              icon="{<Zap"
              class-name="w-10 h-10 text-red-400"
            />} title="Crash Games" description="Experience the thrill of
            fast-paced crash games with instant results." />
          </TabsContent>
          <TabsContent value="virtuals">
            <CategoryContent
              icon="{<Dice"
              class-name="w-10 h-10 text-red-400"
            />} title="Virtual Sports" description="Enjoy round-the-clock action
            with our virtual sports simulations." />
          </TabsContent>
          <TabsContent value="live">
            <CategoryContent
              icon="{<Radio"
              class-name="w-10 h-10 text-blue-400"
            />} title="Live Betting" description="Get in on the action with
            real-time odds and live streaming." />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </section>
  ) } function CategoryContent({ icon, title, description }) { return (
  <Card
    class-name="bg-surface-sunken/30 border-none shadow-lg hover:shadow-xl transition-shadow"
  >
    <CardContent class-name="p-6">
      <div className="flex items-center space-x-4">
        <div className="bg-background p-3 rounded-full">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
  ) }
</template>
