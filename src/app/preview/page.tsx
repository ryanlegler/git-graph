export default async function Preview() {
    return (
        <div className='flex gap-10 flex-col justify-center items-center h-screen'>
            <h1 className='text-3xl font-bold'>Preview</h1>
            <iframe
                frameBorder='0'
                height='157px'
                width='692px'
                src='http://localhost:3000/embed/ryanlegler?hideColorLegend=false&showWeekdayLabels=true&hideMonthLabels=false&hideTotalCount=false&blockMargin=2&blockRadius=0&blockSize=10&fontSize=14&weekStart=4&year=2024'
            ></iframe>
        </div>
    );
}
