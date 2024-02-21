'use client';
import { HydrationProvider, Client } from 'react-hydration-provider';
import ActivityCalendar, { Activity } from 'react-activity-calendar';
import { Options } from '@/types';

export function Graph({ data, options }: { data?: Activity[]; options?: Options }) {
    // todo - how do i pull these from the theme instead of hardcoding?
    const colorScale = ['#161B22', '#0D4429', '#016D32', '#27A641', '#3AD353'];
    return (
        <div className='p-3 bg-background rounded'>
            <HydrationProvider>
                <Client>
                    {/* debug container */}
                    {/* <div className='flex bg-slate-700 w-[800px] h-[200px] rounded-lg' /> */}
                    <ActivityCalendar
                        theme={{ light: colorScale, dark: colorScale }}
                        data={data || []}
                        {...options}
                    />
                </Client>
            </HydrationProvider>
        </div>
    );
}
