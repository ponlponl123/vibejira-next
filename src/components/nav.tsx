"use client"
import { useAppContext } from '@/contexts/appContext'
import { Chip, Tab, Tabs } from '@heroui/react'
import { BellRingingIcon, CheckFatIcon, ClockIcon, HourglassHighIcon, QuestionMarkIcon, XIcon } from '@phosphor-icons/react/dist/ssr'
import clsx from 'clsx'
import React from 'react'

function Nav() {
    const { tickets } = useAppContext();
    const tab_div = clsx("flex items-center space-x-2 group-not-data-[selected=true]:text-[var(--selected-color)]")
    return (
        <nav>
            <Tabs aria-label="Tabs" radius='full' color="primary" variant="light"
                classNames={{
                    cursor: "disabled-default-transition bg-(--selected-color)",
                    base: "border-b-4 border-foreground/0",
                    tabList: "pb-0"
                }}
            >
                <Tab
                    key="ongoing"
                    style={{"--selected-color": "#7828C8"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <BellRingingIcon />
                            <span>Ongoing Issues</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="ongoing").length.toString()}</Chip>
                        </div>
                    }
                />
                <Tab
                    key="pending"
                    style={{"--selected-color": "#F5A524"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <HourglassHighIcon />
                            <span>Triage Pending</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="pending").length.toString()}</Chip>
                        </div>
                    }
                />
                <Tab
                    key="waiting"
                    style={{"--selected-color": "#06B7DB"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <ClockIcon />
                            <span>Waiting</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="waiting").length.toString()}</Chip>
                        </div>
                    }
                />
                <Tab
                    key="done"
                    style={{"--selected-color": "#12A150"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <CheckFatIcon />
                            <span>Done</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="done").length.toString()}</Chip>
                        </div>
                    }
                />
                <Tab
                    key="rejected"
                    style={{"--selected-color": "#F31260"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <XIcon />
                            <span>Rejected</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="rejected").length.toString()}</Chip>
                        </div>
                    }
                />
                <Tab
                    key="not_issue"
                    style={{"--selected-color": "#71717A"} as React.CSSProperties}
                    title={
                        <div className={tab_div}>
                            <QuestionMarkIcon />
                            <span>Not RCCL Issue</span>
                            <Chip size="sm" variant="faded">{tickets.filter(ticket=>ticket.type==="unknown").length.toString()}</Chip>
                        </div>
                    }
                />
            </Tabs>
        </nav>
    )
}

export default Nav