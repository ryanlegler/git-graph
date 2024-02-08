'use client';
import { HydrationProvider, Client } from 'react-hydration-provider';
import ActivityCalendar, { Activity } from 'react-activity-calendar';
import { Options } from '@/types';

export function Graph({ data, options }: { data?: Activity[]; options?: Options }) {
    console.log('🚀 ~ Graph ~ options:', options);
    console.log('🚀 ~ Graph ~ data:', data);
    const colorScaleDark = ['#00429d', '#1f58a6', '#376ead', '#ffa59e', '#dd4c65'];
    const colorScaleLight = ['#f9ed69', '#f08a5d', '#b83b5e', '#6a2c70', '#3c1642'];

    return (
        <div className='p-3 bg-black rounded'>
            <HydrationProvider>
                <Client>
                    <ActivityCalendar
                        theme={{ light: colorScaleLight, dark: colorScaleDark }}
                        data={data || []}
                        {...options}
                    />
                </Client>
            </HydrationProvider>
        </div>
    );
}
