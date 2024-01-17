import { StyledFlex } from '@/components/ui/flex';

export default async function IframeTest() {
    return (
        <StyledFlex direction='vertical' hAlign='center'>
            <iframe
                height='800px'
                width='100%'
                src='https://git-graph.vercel.app/embed/ryanlegler?hideColorLegend=true'></iframe>
        </StyledFlex>
    );
}
