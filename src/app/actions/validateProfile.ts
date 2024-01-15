'use server';

import { UserNameInputState, userNameSchema } from '@/components/userNameInput/types';
import { UserResponse, getProfile } from '@/dataLayer/getProfile';

export async function validateProfile(_: any, formData: FormData): Promise<UserNameInputState> {
    const userName = formData.get('userName');
    const schemaResponse = userNameSchema.safeParse({ userName });

    if (schemaResponse.success) {
        const { userName } = schemaResponse?.data;
        const profile = await getProfile(userName);
        if ((profile as UserResponse)?.message === 'Not Found') {
            return {
                message: 'this github username is invalid ',
                status: 'error',
                data: '',
            };
        } else {
            // we could just redirect here...
            // redirect(`/user/${userName}`);
            return {
                message: 'All good in the hood',
                status: 'success',
                data: userName,
            };
        }
    } else {
        return {
            message: 'input is invalid ',
            status: 'error',
            data: '',
        };
    }
}
