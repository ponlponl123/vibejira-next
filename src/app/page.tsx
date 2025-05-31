"use client"
import React from "react";
import Nav from "@/components/nav"
import { useAppContext } from "@/contexts/appContext";
import { Avatar, Button, Progress, Radio, RadioGroup, RangeCalendar, ScrollShadow, Select, SelectItem, SlotsToClasses } from "@heroui/react"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import {today, getLocalTimeZone} from "@internationalized/date";
import users from "@/data/sample-assignees";
import clsx from "clsx";

export default function Home() {
  const { fetching, setFetching } = useAppContext();
  const [selectedTimeFilter, setSelectedTimeFilter] = React.useState("weekly");
  const radio_style: SlotsToClasses<"base" | "label" | "description" | "wrapper" | "hiddenInput" | "labelWrapper" | "control"> = {
    wrapper: clsx("hidden"),
    labelWrapper: clsx("group-data-[selected=true]:bg-primary group-hover:bg-foreground/10 px-3 py-2 rounded-xl"),
    label: clsx("text-xs font-semibold group-data-[selected=true]:text-white")
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 pb-8 md:pb-10">
      <h1 className="text-3xl font-semibold flex gap-4 items-center">
        Dashboard
        <Button size="sm" variant={fetching?'flat':'solid'} isDisabled={fetching}><ArrowsClockwiseIcon className={fetching?"animate-spin":""} /> Refresh{fetching&&"ing..."}</Button>
      </h1>
      <ScrollShadow className="max-w-full" style={{
        scrollbarWidth: 'thin',
        scrollBehavior: 'smooth',
        scrollbarGutter: 'stable',
        scrollbarColor: 'rgb(var(--foreground), 0.1) transparent'
      }} orientation="horizontal">
        <Nav />
      </ScrollShadow>
      <div className="flex flex-wrap gap-x-12 gap-y-4 w-full p-2">
        <div className="flex flex-col">
          <RadioGroup label="Filter by Last Updated" orientation="horizontal" classNames={{
            label: "text-sm"
          }} value={selectedTimeFilter} onValueChange={setSelectedTimeFilter}>
            <Radio value="weekly" classNames={radio_style}>Last Week</Radio>
            <Radio value="monthly" classNames={radio_style}>Last Month</Radio>
            <Radio value="yearly" classNames={radio_style}>Last Year</Radio>
            <Radio value="all" classNames={radio_style}>All</Radio>
            <Radio value="custom" classNames={radio_style}>Range</Radio>
          </RadioGroup>
          {
            selectedTimeFilter === "custom" && (
              <div className="p-4">
                <RangeCalendar
                  aria-label="Date (Uncontrolled)"
                  defaultValue={{
                    start: today(getLocalTimeZone()),
                    end: today(getLocalTimeZone()).add({weeks: 1}),
                  }}
                />
              </div>
            )
          }
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm text-foreground-500">Filter by Assignee</span>
          <Select
            className="min-w-3xs w-full"
            classNames={{
              label: "group-data-[filled=true]:-translate-y-5",
              trigger: "min-h-14",
              listboxWrapper: "max-h-[400px]",
            }}
            items={users}
            size="sm"
            radius="lg"
            listboxProps={{
              itemClasses: {
                base: [
                  "rounded-xl",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              },
            }}
            popoverProps={{
              classNames: {
                base: "before:bg-default-200",
                content: "p-0 border-small border-divider bg-background",
              },
            }}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item?.data?.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item?.data?.avatar}
                  />
                  <div className="flex flex-col">
                    <span>{item?.data?.name}</span>
                    <span className="text-default-500 text-tiny">({item?.data?.email})</span>
                  </div>
                </div>
              ));
            }}
            variant="bordered"
          >
            {(user) => (
              <SelectItem key={user.id} textValue={user.name}>
                <div className="flex gap-2 items-center">
                  <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={user.avatar} />
                  <div className="flex flex-col">
                    <span className="text-small">{user.name}</span>
                    <span className="text-tiny text-default-400">{user.email}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </div>
      </div>
      <div id="dashboard-content" className="flex-grow w-full">
        {
          fetching ? <div className="w-full flex flex-col gap-4 items-center justify-center p-24 max-md:p-12">
            <h1>Fetching...</h1>
            <Progress isIndeterminate aria-label="Loading..." className="max-w-24" size="sm" />
          </div> : <>
          </>
        }
      </div>
    </section>
  );
}
