'use server';

import { userNameSchema } from '@/components/userNameInput/types';
import { UserResponse, getProfile } from '@/dataLayer/getProfile';
import { redirect } from 'next/navigation';

export async function validateProfile(_: any, formData: FormData): Promise<string> {
    const userName = formData.get('userName');
    const schemaResponse = userNameSchema.safeParse(userName);

    if (schemaResponse.success) {
        const userName = schemaResponse?.data;
        const profile = await getProfile(userName);
        if ((profile as UserResponse)?.message === 'Not Found') {
            return 'this github username is invalid';
        } else {
            redirect(`/user/${userName}`);
        }
    } else {
        return 'input is invalid ';
    }
}
