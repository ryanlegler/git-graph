import { LoadingSpinner } from '@/components/loadingSpinner';

export default function LoadingPage() {
    return (
        <div className='flex items-center justify-center h-full'>
            <LoadingSpinner />
            <div className='spotlight origin-center' />
        </div>
    );
}
